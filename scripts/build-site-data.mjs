import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

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
  return {
    title,
    file,
    year: file.match(/^(\d{4})/)?.[1] ?? "",
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

const citationCount = (await readFile(rel("citations.bib"), "utf8")).match(
  /@\w+\s*\{/g,
)?.length ?? 0;

const documentSpecs = [
  "README.md",
  "CHANGELOG.md",
  "CODE_OF_CONDUCT.md",
  "CONTRIBUTING.md",
  "CORRECTIONS.md",
  "COVERAGE.md",
  "CROSSWALK.md",
  "DISCLAIMER.md",
  "GLOSSARY.md",
  "PEER-REVIEW.md",
  "PRIOR-ART.md",
  "ROADMAP.md",
  "SECURITY.md",
  "TAXONOMY-GAPS.md",
  ...(await listMarkdownFiles("tactics")).map((file) => `tactics/${file}`),
  ...(await listMarkdownFiles("techniques")).map((file) => `techniques/${file}`),
  ...(await listMarkdownFiles("examples")).map((file) => `examples/${file}`),
  ...(await listMarkdownFiles("actors")).map((file) => `actors/${file}`),
  ...(await listMarkdownFiles("data-sources")).map((file) => `data-sources/${file}`),
  ...(await listMarkdownFiles("mitigations")).map((file) => `mitigations/${file}`),
  ...(await listMarkdownFiles("software")).map((file) => `software/${file}`),
];

const specDocPaths = (await listSpecFiles("specs")).map(
  (file) => `specs/${file}`,
);

const documents = Object.fromEntries(
  await Promise.all([
    ...documentSpecs.map(async (docPath) => {
      const raw = await readFile(rel(docPath), "utf8");
      const markdown = cleanMarkdownEscapes(raw);
      const documentMeta = extractDocumentMeta(markdown);
      return [
        docPath,
        {
          path: docPath,
          title: titleFromMarkdown(markdown, docPath),
          toc: tocFromMarkdown(documentMeta.markdown),
          meta: documentMeta.meta,
          html: linkifyOakIds(addHeadingIds(marked.parse(documentMeta.markdown))),
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
    techniques: techniques.length,
    mitigations: mitigations.length,
    software: software.length,
    examples: examples.length,
    actors: actors.length,
    citations: citationCount,
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
  // Lightweight document index: per-document title + path + meta + toc; HTML body is loaded lazily.
  documentIndex: Object.fromEntries(
    Object.entries(documents).map(([key, doc]) => [
      key,
      { path: doc.path, title: doc.title, toc: doc.toc, meta: doc.meta },
    ]),
  ),
  intro: firstParagraphAfter(await readFile(rel("README.md"), "utf8"), "# OAK"),
};

const banner = "/* This file is generated by scripts/build-site-data.mjs. */";
await mkdir(rel("src/data"), { recursive: true });
await writeFile(
  rel("src/data/generated.ts"),
  `${banner}\nexport const siteData = ${JSON.stringify(siteData, null, 2)} as const;\n`,
);

// Heavy document HTML map — split into a separate module so vite can code-split it.
// Loaded on demand via dynamic import when MarkdownDocument is rendered.
const documentBodies = Object.fromEntries(
  Object.entries(documents).map(([key, doc]) => [key, doc.html]),
);
// Refresh the og:description meta in index.html from current stats so social
// previews stay honest without manual editing. Idempotent — only rewrites
// the file if the rendered string actually changed.
{
  const s = siteData.stats;
  const description =
    `Open vendor-neutral knowledge base of adversary Tactics and Techniques `
    + `observed against on-chain assets. v0.1: ${s.tactics} Tactics, `
    + `${s.techniques} Techniques, ${s.mitigations} Mitigations, `
    + `${s.software} Software, ${s.actors} Threat Actors, `
    + `${s.examples} worked examples, ${s.citations} citations, `
    + `${s.relationships} relationships.`;
  const indexPath = rel("index.html");
  const indexHtml = await readFile(indexPath, "utf8");
  const updated = indexHtml.replace(
    /(<meta property="og:description" content=")[^"]+(")/,
    `$1${description}$2`,
  );
  if (updated !== indexHtml) {
    await writeFile(indexPath, updated);
  }
}

await writeFile(
  rel("src/data/documents.ts"),
  `${banner}\nexport const documentBodies: Record<string, string> = ${JSON.stringify(documentBodies, null, 2)};\n`,
);
