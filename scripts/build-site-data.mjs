import { readFile, readdir, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import { TOP_LEVEL_DOCUMENTS } from "./site-documents.mjs";
import { buildRouteMap, rewriteRelativeLinks } from "./site-links.mjs";
import { monthHubs } from "./seo.mjs";

const root = process.cwd();
const rel = (...parts) => path.join(root, ...parts);

const idNumber = (id) =>
  id
    .match(/\d+/g)
    ?.map((part) => part.padStart(3, "0"))
    .join(".") ?? id;

const titleFromMarkdown = (text, fallback) => {
  const match = text.match(/^#\s+(.+)$/m);
  return cleanInlineText(match?.[1]?.trim() ?? fallback);
};

const cleanMarkdownEscapes = (value) =>
  value.replace(/\\([\\`*_{}\[\]()#+\-.!|>~$])/g, "$1");

const stripInlineMarkdown = (value) =>
  cleanMarkdownEscapes(value)
    // [text](url) → text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // **bold** / __bold__ → bold
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    // *italic* / _italic_ → italic (avoid matching bare * inside words)
    .replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,;:!?]|$)/g, "$1$2")
    .replace(/(^|[\s(])_([^_\n]+)_(?=[\s).,;:!?]|$)/g, "$1$2")
    // `code` → code
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

const cleanInlineText = (value) =>
  cleanMarkdownEscapes(value)
    .replace(/\s+/g, " ")
    .trim();

const tocFromMarkdown = (text) =>
  [...text.matchAll(/^##\s+(.+)$/gm)]
    .map((match) => cleanInlineText(match[1].replace(/[#`*_]/g, "")))
    .slice(0, 12);

const slugify = (value) =>
  cleanInlineText(value.replace(/<[^>]+>/g, ""))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const addHeadingIds = (html) =>
  html.replace(/<h([2-3])>(.*?)<\/h\1>/g, (_match, depth, content) => {
    const id = slugify(content);
    return `<h${depth} id="${id}">${content}</h${depth}>`;
  });

// Convert OAK-{T|M|S|G} identifier mentions inside the rendered HTML into
// clickable in-app links. Skips mentions already inside a tag (href attr,
// inside <a>, inside <code class="..."> with an attribute, etc) by only
// touching text nodes outside HTML element boundaries.
const ID_PATTERNS = [
  // Order matters — longer (Technique sub-IDs OAK-Tnn.NNN) before short OAK-Tnn.
  { re: /\bOAK-T(\d{1,2}\.\d{3}(?:\.\d{3})?)\b/g, route: "technique" },
  { re: /\bOAK-M(\d{2,})\b/g, route: "mitigation" },
  { re: /\bOAK-S(\d{2,})\b/g, route: "software" },
  { re: /\bOAK-G(\d{2,})\b/g, route: "group" },
];
const linkifyOakIds = (html) => {
  // Split HTML into tag and text segments; transform only text segments.
  const parts = html.split(/(<[^>]+>)/g);
  // Track whether we're inside an <a> or <code> — don't linkify text inside those.
  let depthAnchor = 0;
  let depthCode = 0;
  for (let i = 0; i < parts.length; i += 1) {
    const seg = parts[i];
    if (seg.startsWith("<")) {
      const isClose = seg.startsWith("</");
      const tag = seg.match(/^<\/?(\w+)/)?.[1]?.toLowerCase();
      if (tag === "a") depthAnchor += isClose ? -1 : 1;
      if (tag === "code") depthCode += isClose ? -1 : 1;
      continue;
    }
    if (depthAnchor > 0 || depthCode > 0) continue; // inside <a>/<code> — leave alone
    let text = seg;
    for (const { re, route } of ID_PATTERNS) {
      text = text.replace(re, (match) => {
        const slug = match; // OAK-Txx.yyy or OAK-Mxx etc — kept verbatim
        return `<a href="/${route}/${slug}/" class="oak-id-link" data-oak-id="${slug}">${match}</a>`;
      });
    }
    parts[i] = text;
  }
  return parts.join("");
};

const splitMetaValue = (label, rawValue) => {
  const value = stripInlineMarkdown(rawValue);

  if (label === "Loss" && value.includes(" Recovery:")) {
    const [loss, recovery] = value.split(/\s+Recovery:\s+/, 2);
    return [
      { label: "Loss", value: loss },
      { label: "Recovery", value: recovery },
    ];
  }

  if (label === "OAK-Gnn" && value.includes("Attribution status:")) {
    const [actor, attribution] = value.split(/\s+Attribution status:\s+/, 2);
    return [
      { label: "Actor", value: actor },
      { label: "Attribution status", value: attribution },
    ];
  }

  return [{ label, value }];
};

const extractDocumentMeta = (markdown) => {
  const lines = markdown.split("\n");
  const body = [];
  const meta = [];
  let inLeadingMeta = false;
  let titleSeen = false;

  for (const line of lines) {
    if (!titleSeen) {
      body.push(line);
      if (line.startsWith("# ")) titleSeen = true;
      continue;
    }

    if (!line.trim() && !inLeadingMeta) {
      body.push(line);
      continue;
    }

    const match = line.match(/^\*\*([^:*]+):\*\*\s*(.+)$/);
    if (match && !line.startsWith("## ")) {
      inLeadingMeta = true;
      meta.push(...splitMetaValue(cleanInlineText(match[1]), match[2]));
      continue;
    }

    inLeadingMeta = false;
    body.push(line);
  }

  return {
    markdown: body
      .join("\n")
      .replace(/^#\s+.+\n+/, "")
      .replace(/\n{3,}/g, "\n\n"),
    meta,
  };
};

const firstParagraphAfter = (text, marker) => {
  const [, rest = ""] = text.split(marker, 2);
  return rest
    .split(/\n##\s+/)[0]
    .replace(/\s+/g, " ")
    .trim();
};

const listMarkdownFiles = async (dir) =>
  (await readdir(rel(dir)))
    .filter((name) => name.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b));

const listSpecFiles = async (dir) =>
  (await readdir(rel(dir)))
    .filter((name) => name.endsWith(".yml"))
    .sort((a, b) => a.localeCompare(b));

const readMarkdownCollection = async (dir, filter = () => true) => {
  const files = (await listMarkdownFiles(dir)).filter(filter);
  return Promise.all(
    files.map(async (file) => {
      const text = await readFile(rel(dir, file), "utf8");
      return { file, text };
    }),
  );
};

marked.use({
  gfm: true,
  breaks: false,
  mangle: false,
  headerIds: false,
});

// Fund-flow blocks (```oak-flow, validated by tools/check_flow.py) render as
// a Mermaid graph plus an edge table with full, linked addresses and txs.
// The YAML is parsed once by tools/export_json.py; the renderer looks the
// parsed flow up by the document being rendered, so JS needs no YAML parser.
const chains = JSON.parse(await readFile(rel("tools/chains.json"), "utf8"));
const flowsByDoc = Object.fromEntries(
  JSON.parse(await readFile(rel("tools/oak.json"), "utf8"))
    .examples.filter((e) => e.fund_flow && (e.fund_flow.edges ?? []).length)
    .map((e) => [`examples/${e.file}`, e.fund_flow]),
);
let renderingDoc = "";

// Cross-incident address links (tools/build_address_index.py). Appended to an
// example page when one of its addresses also appears in another example;
// shared infrastructure (mixers, DEX pools, exchanges, issuers) is left out.
const INFRA_ROLES = new Set(["mixer", "dex", "bridge", "cex-deposit", "issuer-freeze", "lending", "burn", "token"]);
let addressIndex = {};
try {
  addressIndex = JSON.parse(await readFile(rel("tools/addresses.json"), "utf8"));
} catch {
  addressIndex = {};
}
const sharedAddressesHtml = (docPath) => {
  if (!docPath.startsWith("examples/")) return "";
  const file = docPath.slice("examples/".length);
  const rows = [];
  for (const [addr, entry] of Object.entries(addressIndex)) {
    const incidents = entry.incidents ?? [];
    if (incidents.length < 2 || !incidents.some((i) => i.file === file)) continue;
    if (entry.infrastructure || incidents.some((i) => INFRA_ROLES.has(i.role))) continue;
    const others = incidents.filter((i) => i.file !== file);
    const url = explorerUrl(entry.chains?.[0], "address", addr);
    const code = `<code>${escapeHtml(addr)}</code>`;
    rows.push(
      `<li>${url ? `<a href="${escapeHtml(url)}" rel="noopener">${code}</a>` : code} also appears in ` +
        others.map((o) => `<a href="${escapeHtml(o.file)}">${escapeHtml(o.file.replace(/\.md$/, ""))}</a>`).join(", ") +
        `</li>`,
    );
  }
  return rows.length
    ? `<h2 id="addresses-seen-in-other-incidents">Addresses seen in other incidents</h2><p>Same address, different incident: a candidate cluster link (OAK-T8.001). Generated from tools/addresses.json.</p><ul>${rows.join("")}</ul>`
    : "";
};

const escapeHtml = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const explorerUrl = (chain, kind, value) => {
  const tpl = chains[String(chain).toLowerCase()]?.[kind];
  return tpl && value ? tpl.replace(kind === "tx" ? "{t}" : "{a}", value) : "";
};
const formatAmount = (n) =>
  typeof n === "number" ? n.toLocaleString("en-US", { maximumFractionDigits: 4 }) : String(n ?? "");

const renderFlow = (flow) => {
  const nodes = flow.nodes ?? [];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  // Interactive graph data (src/components/document/fundflow). Explorer URLs
  // are resolved here so the client needs no chain table.
  const data = {
    as_of: flow.as_of,
    nodes: nodes.map((n) => ({ ...n, explorer: explorerUrl(n.chain, "address", n.address) || undefined })),
    edges: (flow.edges ?? []).map((e) => ({ ...e, txUrl: explorerUrl(byId[e.from]?.chain, "tx", e.tx) || undefined })),
  };
  const nodeCell = (id) => {
    const n = byId[id] ?? { id };
    const name = escapeHtml(n.label || n.role || id);
    if (!n.address) return name;
    const url = explorerUrl(n.chain, "address", n.address);
    const code = `<code>${escapeHtml(n.address)}</code>`;
    return `${name}<br/>${url ? `<a href="${escapeHtml(url)}" rel="noopener">${code}</a>` : code}`;
  };
  const rows = (flow.edges ?? []).map((e) => {
    const chain = byId[e.from]?.chain;
    const txUrl = explorerUrl(chain, "tx", e.tx);
    const tx = e.tx
      ? txUrl ? `<a href="${escapeHtml(txUrl)}" rel="noopener"><code>${escapeHtml(e.tx)}</code></a>` : `<code>${escapeHtml(e.tx)}</code>`
      : "";
    const count = e.tx_count > 1 ? ` (×${e.tx_count})` : "";
    const verified = e.verified === "oak" ? "traced by OAK" : `per <code>${escapeHtml(e.source ?? "")}</code>`;
    return `<tr><td>${escapeHtml(e.time ?? "")}</td><td>${nodeCell(e.from)}</td><td>${nodeCell(e.to)}</td>` +
      `<td>${escapeHtml([formatAmount(e.amount), e.asset].filter(Boolean).join(" "))}${count}</td>` +
      `<td>${escapeHtml(e.technique ?? "")}</td><td>${tx}</td><td>${verified}</td></tr>`;
  });
  return `<div class="oak-flow-graph" data-flow="${escapeHtml(JSON.stringify(data))}"></div>` +
    `<details class="flow-table-wrap"><summary>All transfers as a table (${rows.length})</summary>` +
    `<div class="table-scroll"><table class="flow-table"><thead><tr><th>Time (UTC)</th><th>From</th><th>To</th>` +
    `<th>Amount</th><th>OAK</th><th>Tx</th><th>Basis</th></tr></thead><tbody>${rows.join("")}</tbody></table></div></details>`;
};

marked.use({
  renderer: {
    code({ text, lang }) {
      if (lang !== "oak-flow") return false;
      const flow = flowsByDoc[renderingDoc];
      return flow ? renderFlow(flow) : `<pre><code>${escapeHtml(text)}</code></pre>`;
    },
  },
});

const oak = JSON.parse(await readFile(rel("tools/oak.json"), "utf8"));
const tactics = [...oak.tactics]
  .sort((a, b) => idNumber(a.id).localeCompare(idNumber(b.id)))
  .map((tactic) => ({
    id: tactic.id,
    name: tactic.name,
    phase: tactic.phase,
    techniques: [...tactic.techniques].sort((a, b) =>
      idNumber(a).localeCompare(idNumber(b)),
    ),
  }));

const techniques = [...oak.techniques]
  .sort((a, b) => idNumber(a.id).localeCompare(idNumber(b.id)))
  .map((technique) => ({
    id: technique.id,
    name: technique.name,
    parentTactics: technique.parent_tactics,
    maturity: technique.maturity,
    chains: technique.chains,
    firstDocumented: technique.first_documented,
    aliases: technique.aliases,
    sourcePath: path.relative(root, technique.source_file),
  }));

const mitigations = [...(oak.mitigations ?? [])]
  .sort((a, b) => idNumber(a.id).localeCompare(idNumber(b.id)))
  .map((mitigation) => ({
    id: mitigation.id,
    name: mitigation.name,
    class: mitigation.class,
    audience: mitigation.audience,
    mapsToTechniques: mitigation.maps_to_techniques,
    sourcePath: path.relative(root, mitigation.source_file),
  }));

const software = [...(oak.software ?? [])]
  .sort((a, b) => idNumber(a.id).localeCompare(idNumber(b.id)))
  .map((sw) => ({
    id: sw.id,
    name: sw.name,
    type: sw.type,
    aliases: sw.aliases,
    active: sw.active,
    firstObserved: sw.first_observed,
    hostPlatforms: sw.host_platforms,
    usedByGroups: sw.used_by_groups,
    observedTechniques: sw.observed_techniques,
    sourcePath: path.relative(root, sw.source_file),
  }));

const relationships = oak.relationships ?? [];

const examples = (await readMarkdownCollection("examples")).map(({ file, text }) => {
  const title = titleFromMarkdown(text, file.replace(/\.md$/, ""));
  const loss = text.match(/\*\*Loss:\*\*\s*([^*]+?)(?:\*\*|$)/s)?.[1]?.trim() ?? "";
  // Month comes from the file name (YYYY-MM-slug). The day is taken from a
  // YYYY-MM-DD in the title only when it falls in that same month, so a
  // title that cites a later disclosure date cannot move the incident.
  const [, year = "", month = ""] = file.match(/^(\d{4})(?:-(\d{2})-)?/) ?? [];
  const day =
    (month &&
      [...title.matchAll(/(\d{4})-(\d{2})-(\d{2})/g)].find(
        ([, y, m]) => y === year && m === month,
      )?.[3]) ||
    "";
  return {
    title,
    file,
    year,
    month,
    day,
    date: [year, month, day].filter(Boolean).join("-"),
    techniques: [...new Set(text.match(/OAK-T\d+\.\d{3}/g) ?? [])].sort((a, b) =>
      idNumber(a).localeCompare(idNumber(b)),
    ),
    actors: [...new Set(text.match(/OAK-G\d{2}/g) ?? [])].sort(),
    loss: loss.replace(/\s+/g, " ").slice(0, 180),
  };
});

const actors = (await readMarkdownCollection("actors", (file) => file !== "README.md")).map(
  ({ file, text }) => ({
    id: titleFromMarkdown(text, file).match(/OAK-G\d{2}/)?.[0] ?? file,
    title: titleFromMarkdown(text, file),
    file,
    status: stripInlineMarkdown(
      text.match(/\*\*Attribution status:\*\*\s*([^—\n]+)/)?.[1] ?? "",
    ),
    observedTechniques: [...new Set(text.match(/OAK-T\d+\.\d{3}/g) ?? [])].sort((a, b) =>
      idNumber(a).localeCompare(idNumber(b)),
    ),
  }),
);

const dataSources = (await readMarkdownCollection("data-sources", (file) => file !== "README.md")).map(
  ({ file, text }) => {
    const title = titleFromMarkdown(text, file.replace(/\.md$/, ""));
    const id = title.match(/OAK-DS-\d+/)?.[0] ?? file;
    const layer = stripInlineMarkdown(text.match(/\*\*Layer:\*\*\s*([^\n]+)/)?.[1] ?? "");
    const chains = stripInlineMarkdown(text.match(/\*\*Chains:\*\*\s*([^\n]+)/)?.[1] ?? "")
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    const description = stripInlineMarkdown(
      text.match(/## Description\s*\n+([\s\S]+?)(?=\n##|\n#|$)/)?.[1]?.trim() ?? "",
    ).slice(0, 320);
    const techniques = [...new Set(text.match(/OAK-T\d+\.\d{3}(?:\.\d{3})?/g) ?? [])].sort();
    return { id, title, file, layer, chains, description, techniques };
  },
);

const coverageText = await readFile(rel("COVERAGE.md"), "utf8");
const coverageRows = coverageText
  .split("\n")
  .filter((line) => line.startsWith("| OAK-T") && line.includes(" | "))
  .map((line) => line.split("|").map((cell) => cell.trim()).filter(Boolean))
  .filter((cells) => cells.length >= 4)
  .map(([technique, status, implementation, notes]) => ({
    technique,
    status,
    implementation,
    notes,
  }));

// "Citations" means references the corpus actually cites, not the size of
// citations.bib. The two differ in both directions: 757 keys are documented
// inline in a page's own references section and never enter the bib, and some
// bib entries are not yet cited anywhere. Counting the bib file understated the
// evidence base and labelled it as something it was not. Same key regex and the
// same definition of "cited" as tools/check_citations.py, so the site number
// and the validator's number agree.
const CITATION_KEY_RE = /`\[([a-z][a-z0-9_]{4,})\]`/g;
const bibEntryCount = (await readFile(rel("citations.bib"), "utf8")).match(
  /@\w+\s*\{/g,
)?.length ?? 0;

// Relative `.md` hrefs in the markdown bodies must become site routes before
// the HTML is embedded — see scripts/site-links.mjs for why this is shared with
// the prerenderer rather than reimplemented.
const routeForSource = buildRouteMap(oak, await listMarkdownFiles("investigations"));
const unmappedMarkdown = new Set();

const documentSpecs = [
  "README.md",
  ...TOP_LEVEL_DOCUMENTS.map((doc) => `${doc}.md`),
  ...(await listMarkdownFiles("tactics")).map((file) => `tactics/${file}`),
  ...(await listMarkdownFiles("techniques")).map((file) => `techniques/${file}`),
  ...(await listMarkdownFiles("examples")).map((file) => `examples/${file}`),
  ...(await listMarkdownFiles("investigations")).map((file) => `investigations/${file}`),
  ...(await listMarkdownFiles("actors")).map((file) => `actors/${file}`),
  ...(await listMarkdownFiles("data-sources")).map((file) => `data-sources/${file}`),
  ...(await listMarkdownFiles("mitigations")).map((file) => `mitigations/${file}`),
  ...(await listMarkdownFiles("software")).map((file) => `software/${file}`),
];

const citedKeys = new Set();
for (const docPath of documentSpecs) {
  const body = await readFile(rel(docPath), "utf8");
  for (const [, key] of body.matchAll(CITATION_KEY_RE)) citedKeys.add(key);
}
const citationCount = citedKeys.size;

const specDocPaths = (await listSpecFiles("specs")).map(
  (file) => `specs/${file}`,
);

const documents = Object.fromEntries(
  await Promise.all([
    ...documentSpecs.map(async (docPath) => {
      const raw = await readFile(rel(docPath), "utf8");
      const markdown = cleanMarkdownEscapes(raw);
      const documentMeta = extractDocumentMeta(markdown);
      renderingDoc = docPath;
      return [
        docPath,
        {
          path: docPath,
          title: titleFromMarkdown(markdown, docPath),
          toc: tocFromMarkdown(documentMeta.markdown),
          meta: documentMeta.meta,
          html: rewriteRelativeLinks(
            linkifyOakIds(addHeadingIds(marked.parse(documentMeta.markdown))) + sharedAddressesHtml(docPath),
            docPath,
            routeForSource,
            unmappedMarkdown,
          ),
        },
      ];
    }),
    ...specDocPaths.map(async (docPath) => {
      const raw = await readFile(rel(docPath), "utf8");
      const specIdMatch = raw.match(/^spec_id:\s*(\S+)/m);
      const techMatch = raw.match(/^oak_techniques:\s*\[([^\]]+)\]/m);
      const title = specIdMatch
        ? `${specIdMatch[1]} (${docPath.replace(/^specs\//, "")})`
        : docPath;
      return [
        docPath,
        {
          path: docPath,
          title,
          toc: [],
          meta: techMatch
            ? [{ label: "Techniques", value: techMatch[1].trim() }]
            : [],
          html: raw,
        },
      ];
    }),
  ]),
);

// Detailed coverage stats — computed by tools/build_stats.py and read here.
// Single source of truth for per-Tactic / year-month / attribution density.
let coverageStats = null;
try {
  const raw = await readFile(rel("tools/stats.json"), "utf8");
  coverageStats = JSON.parse(raw);
} catch (err) {
  console.warn(
    "build-site-data: tools/stats.json not found — run "
    + "`python3 tools/build_stats.py --json > tools/stats.json` first. "
    + "Continuing without coverage stats.",
  );
}

// Multi-vendor coverage matrix — produced by tools/build_coverage.py from
// coverage/manifest.yml. Single source of truth for the /coverage page's
// vendor × Technique matrix.
let coverageMatrix = null;
try {
  const raw = await readFile(rel("tools/coverage.json"), "utf8");
  coverageMatrix = JSON.parse(raw);
} catch (err) {
  console.warn(
    "build-site-data: tools/coverage.json not found — run "
    + "`python3 tools/build_coverage.py` first. "
    + "Continuing without coverage matrix.",
  );
}

// Detection specs — produced by tools/build_specs.py from specs/*.yml. Drives
// the per-Technique "Detection spec" tab. Carries full parsed body so the UI
// renders structured sections without re-parsing YAML in the browser.
let specsPayload = { specs: [], by_technique: {} };
try {
  const raw = await readFile(rel("tools/specs.json"), "utf8");
  specsPayload = JSON.parse(raw);
} catch (err) {
  console.warn(
    "build-site-data: tools/specs.json not found — run "
    + "`python3 tools/build_specs.py` first. "
    + "Continuing without detection specs.",
  );
}

// Lightweight metadata index — keeps initial JS bundle small.
const siteData = {
  generatedAt: new Date().toISOString(),
  stats: {
    tactics: tactics.length,
    // Active Techniques only; deprecated IDs are tombstones kept under the never-reuse rule.
    techniques: techniques.filter((t) => t.maturity !== "deprecated").length,
    deprecatedTechniques: techniques.filter((t) => t.maturity === "deprecated").length,
    mitigations: mitigations.length,
    software: software.length,
    examples: examples.length,
    actors: actors.length,
    citations: citationCount,
    bibEntries: bibEntryCount,
    coverageRows: coverageRows.length,
    relationships: relationships.length,
    documents: Object.keys(documents).length,
  },
  coverage: coverageStats
    ? {
        examplesByTactic: coverageStats.examples_by_tactic,
        examplesByYear: coverageStats.examples_by_year,
        examplesByYearMonth: coverageStats.examples_by_year_month,
        attributionDistribution: coverageStats.attribution_distribution,
        examplesByActor: coverageStats.examples_by_actor,
        actorTitles: coverageStats.actor_titles,
        inactiveActors: coverageStats.inactive_actors,
        emptyTactics: coverageStats.empty_tactics,
        anchorDebt: coverageStats.anchor_debt,
        taxonomyGapProposals: coverageStats.taxonomy_gap_proposals,
      }
    : null,
  tactics,
  techniques,
  mitigations,
  software,
  relationships,
  examples: examples.sort((a, b) => b.file.localeCompare(a.file)),
  actors: actors.sort((a, b) => a.id.localeCompare(b.id)),
  dataSources: dataSources.sort((a, b) => a.id.localeCompare(b.id)),
  coverageRows,
  coverageMatrix,
  specs: specsPayload.specs ?? [],
  specsByTechnique: specsPayload.by_technique ?? {},
  // Lightweight document index: per-document title + path + toc. The HTML body and
  // the header meta rows (2.2 MB across all documents) live in public/doc-html/.
  documentIndex: Object.fromEntries(
    Object.entries(documents).map(([key, doc]) => [
      key,
      { path: doc.path, title: doc.title, toc: doc.toc },
    ]),
  ),
  // Month hubs (/incidents/YYYY/MM/, static pages): [ym, single-incident count].
  incidentHubs: [...monthHubs(oak.examples).entries()].map(([ym, examples]) => [ym, examples.length]),
  intro: firstParagraphAfter(await readFile(rel("README.md"), "utf8"), "# OAK"),
};

const banner = "/* This file is generated by scripts/build-site-data.mjs. */";
await mkdir(rel("src/data"), { recursive: true });
await writeFile(
  rel("src/data/generated.ts"),
  `${banner}\nexport const siteData = ${JSON.stringify(siteData, null, 2)} as const;\n`,
);

// Document HTML, one small JSON file per document under public/doc-html/, fetched
// on demand by useDocumentHtml. It used to be one 13 MB module holding every
// body, which each document page had to download before it could render; for
// Googlebot's renderer that meant an empty page and "Crawled – currently not
// indexed" on most of the corpus. Gitignored; regenerated per build.
await rm(rel("public/doc-html"), { recursive: true, force: true });
for (const [key, doc] of Object.entries(documents)) {
  const out = rel("public/doc-html", `${key.replace(/\.md$/, "")}.json`);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, JSON.stringify({ html: doc.html, meta: doc.meta ?? [] }));
}

// Same rendered bodies, plus title/meta, as a plain JSON artifact. Consumed by
// scripts/build-route-pages.mjs to pre-render each route entrypoint's content
// into static HTML — the build step runs in Node, so it cannot import the .ts
// module above. Regenerated per build; gitignored.
await writeFile(
  rel("tools/document-render.json"),
  JSON.stringify(
    Object.fromEntries(
      Object.entries(documents).map(([key, doc]) => [
        key,
        { title: doc.title, meta: doc.meta, html: doc.html },
      ]),
    ),
  ),
);

// A `.md` href that survived rewriting is a URL the site advertises and
// robots.txt disallows — the exact shape Search Console reports as "blocked by
// robots.txt". This is a hard failure rather than a warning: it was a warning
// nobody read that let ~2,000 of them ship. A hit means either a gap in the
// route map (scripts/site-links.mjs) or a genuinely broken in-repo link.
if (unmappedMarkdown.size > 0) {
  console.error(
    `FAIL: ${unmappedMarkdown.size} unmapped .md link(s) would ship in embedded HTML.`,
  );
  for (const entry of [...unmappedMarkdown].sort().slice(0, 20)) {
    console.error(`  ${entry}`);
  }
  if (unmappedMarkdown.size > 20) {
    console.error(`  … and ${unmappedMarkdown.size - 20} more`);
  }
  console.error(
    "Fix the link, or register the source in buildRouteMap() in scripts/site-links.mjs.",
  );
  process.exit(1);
}
console.log("OK: no raw .md links left in embedded document HTML");
