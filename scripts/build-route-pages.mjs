import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { TOP_LEVEL_DOCUMENTS } from "./site-documents.mjs";

const root = process.cwd();
const baseUrl = "https://onchainattack.org";
const siteName = "OAK — OnChain Attack Knowledge";
const distDir = path.join(root, "dist");

// Worked-example links carried on a Technique page. Techniques anchored by
// hundreds of incidents would otherwise emit a link wall; the remainder stays
// reachable through /incidents/.
const EXAMPLE_LINK_CAP = 60;

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const cleanMarkdownEscapes = (value) =>
  value.replace(/\\([\\`*_{}\[\]()#+\-.!|>~$])/g, "$1");

const stripInlineMarkdown = (value) =>
  cleanMarkdownEscapes(value)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,;:!?]|$)/g, "$1$2")
    .replace(/(^|[\s(])_([^_\n]+)_(?=[\s).,;:!?]|$)/g, "$1$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

const truncate = (value, max = 160) => {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
};

const titleFromMarkdown = (text, fallback) =>
  stripInlineMarkdown(text.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? fallback);

const descriptionFromMarkdown = (text, fallback) => {
  const body = text
    .replace(/^#\s+.+$/m, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && !line.match(/^\*\*[^:*]+:\*\*/));
  const paragraph = body.find((line) => stripInlineMarkdown(line).length > 80) ?? fallback;
  return truncate(stripInlineMarkdown(paragraph));
};

const readMarkdownMeta = async (sourceFile, fallbackTitle, fallbackDescription) => {
  if (!sourceFile) return { title: fallbackTitle, description: fallbackDescription };
  const text = await readFile(path.isAbsolute(sourceFile) ? sourceFile : path.join(root, sourceFile), "utf8");
  const title = titleFromMarkdown(text, fallbackTitle);
  return {
    title,
    description: descriptionFromMarkdown(text, fallbackDescription ?? title),
  };
};

// `content` carries the pre-rendered payload: `doc` is the repo-relative
// markdown path whose rendered body belongs on this route, `sections` are
// link lists (crawl paths), `kicker`/`intro` are short framing lines.
const route = (pathname, title, description, priority = 0.5, content = {}) => ({
  pathname,
  title,
  description: truncate(description),
  priority,
  doc: content.doc ?? "",
  kicker: content.kicker ?? "",
  intro: content.intro ?? "",
  sections: content.sections ?? [],
});

const canonicalUrlForPath = (pathname) => `${baseUrl}${pathname === "/" ? "/" : `${pathname}/`}`;

// Search results truncate a title at roughly 60 characters, and Bing flags
// anything longer. Keep the full brand suffix where it fits, fall back to the
// short one, and clamp the page title itself only when even that overflows.
const TITLE_MAX = 60;
const HOME_TITLE = "OAK — OnChain Attack Knowledge: crypto attack taxonomy";

const clampWords = (value, max) =>
  value.length <= max
    ? value
    : value
        .slice(0, max)
        .replace(/\s+\S*$/, "")
        .replace(/[\s\-—–:(,;/]+$/, "");

const composeTitle = (title) => {
  if (title === siteName) return HOME_TITLE;
  const full = `${title} · ${siteName}`;
  if (full.length <= TITLE_MAX) return full;
  const short = `${title} · OAK`;
  if (short.length <= TITLE_MAX) return short;
  return `${clampWords(title, TITLE_MAX - " · OAK".length)} · OAK`;
};

// ---------------------------------------------------------------------------
// Pre-rendered snapshot
//
// Each route entrypoint ships the page's real content as HTML inside #root.
// Crawlers that never execute JS — Bing, Yandex, GPTBot, ClaudeBot,
// PerplexityBot, and Google's first indexing pass — index that snapshot
// instead of an empty container. src/main.tsx empties #root before React
// mounts, so the SPA behaves exactly as before; the snapshot is also what a
// visitor sees while the bundle downloads.
// ---------------------------------------------------------------------------

const PRERENDER_CSS = `
#root .pr{max-width:940px;margin:0 auto;padding:28px 20px 72px;line-height:1.62;color:#e8e9ec;background:#0a0a0c}
#root .pr a{color:#00ffd1;text-decoration:none}
#root .pr a:hover{text-decoration:underline}
#root .pr-head{display:flex;flex-wrap:wrap;gap:8px 18px;align-items:baseline;padding-bottom:14px;border-bottom:1px solid rgba(232,233,236,.12)}
#root .pr-brand{font-weight:600;letter-spacing:-.01em}
#root .pr-nav{display:flex;flex-wrap:wrap;gap:14px;font-size:.9rem}
#root .pr-nav a{color:#b8bac0}
#root .pr-kicker{margin:22px 0 0;font-family:"Geist Mono",ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:#8b8e96}
#root .pr-main h1{margin:6px 0 14px;font-size:1.9rem;line-height:1.2;letter-spacing:-.02em}
#root .pr-intro{color:#b8bac0;margin:0 0 18px}
#root .pr-meta{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px 18px;margin:0 0 22px;padding:14px 16px;border:1px solid rgba(232,233,236,.1);border-radius:10px;background:rgba(255,255,255,.02)}
#root .pr-meta dt{font-size:.72rem;letter-spacing:.07em;text-transform:uppercase;color:#8b8e96}
#root .pr-meta dd{margin:2px 0 0;font-size:.92rem}
#root .pr-body h2{margin:30px 0 8px;font-size:1.22rem;letter-spacing:-.01em}
#root .pr-body h3{margin:22px 0 6px;font-size:1.02rem}
#root .pr-body table{width:100%;border-collapse:collapse;margin:16px 0;font-size:.9rem;display:block;overflow-x:auto}
#root .pr-body th,#root .pr-body td{border:1px solid rgba(232,233,236,.12);padding:7px 10px;text-align:left;vertical-align:top}
#root .pr-body code{font-family:"Geist Mono",ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.88em;background:rgba(255,255,255,.05);border-radius:4px;padding:1px 5px}
#root .pr-body pre{overflow-x:auto;padding:12px 14px;border:1px solid rgba(232,233,236,.1);border-radius:10px;background:rgba(255,255,255,.02)}
#root .pr-body pre code{background:none;padding:0}
#root .pr-body blockquote{margin:16px 0;padding:2px 0 2px 14px;border-left:2px solid rgba(0,255,209,.4);color:#b8bac0}
#root .pr-body img{max-width:100%;height:auto}
#root .pr-section{margin:30px 0 0}
#root .pr-section h2{font-size:1.05rem;margin:0 0 10px;padding-bottom:6px;border-bottom:1px solid rgba(232,233,236,.1)}
#root .pr-list{margin:0;padding:0;list-style:none;display:grid;gap:5px}
#root .pr-list li{font-size:.93rem}
#root .pr-note{color:#8b8e96;font-size:.85em}
#root .pr-foot{margin-top:48px;padding-top:16px;border-top:1px solid rgba(232,233,236,.12);display:flex;flex-wrap:wrap;gap:14px;font-size:.86rem}
#root .pr-foot a{color:#b8bac0}
`.trim();

const NAV_LINKS = [
  { href: "/matrix/", label: "Matrix" },
  { href: "/incidents/", label: "Incidents" },
  { href: "/actors/", label: "Threat actors" },
  { href: "/mitigations/", label: "Mitigations" },
  { href: "/software/", label: "Software" },
  { href: "/datasources/", label: "Data sources" },
  { href: "/coverage/", label: "Coverage & gaps" },
  { href: "/contribute/", label: "Contribute" },
];

const FOOTER_LINKS = [
  { href: "https://github.com/onchainattack/oak", label: "Source repository" },
  { href: "/tools/oak.json", label: "JSON export" },
  { href: "/tools/oak-stix.json", label: "STIX 2.1 bundle" },
  { href: "/citations.bib", label: "Citations (BibTeX)" },
  { href: "/document/METHODOLOGY/", label: "Methodology" },
  { href: "/document/GLOSSARY/", label: "Glossary" },
  { href: "/document/CHANGELOG/", label: "Changelog" },
  { href: "/document/DISCLAIMER/", label: "Disclaimer" },
];

const oak = JSON.parse(await readFile(path.join(root, "tools/oak.json"), "utf8"));
const investigationFiles = (await readdir(path.join(root, "investigations")))
  .filter((file) => file.endsWith(".md"))
  .sort();
const documentRender = JSON.parse(
  await readFile(path.join(root, "tools/document-render.json"), "utf8"),
);

const exampleSlug = (file) => file.replace(/\.md$/, "");
const exampleRoute = (file) => `/document/examples/${exampleSlug(file)}/`;

// Repo-relative source path → canonical site route. Drives href rewriting so
// the snapshot links to the route surface rather than to raw `.md` files.
const routeForSource = new Map();
const registerSource = (sourceFile, target) => {
  if (sourceFile) routeForSource.set(sourceFile.replace(/^\.\//, ""), target);
};

for (const tactic of oak.tactics ?? []) registerSource(tactic.source_file, `/tactic/${tactic.id}/`);
for (const technique of oak.techniques ?? []) registerSource(technique.source_file, `/technique/${technique.id}/`);
for (const mitigation of oak.mitigations ?? []) registerSource(mitigation.source_file, `/mitigation/${mitigation.id}/`);
for (const sw of oak.software ?? []) registerSource(sw.source_file, `/software/${sw.id}/`);
for (const group of oak.groups ?? []) registerSource(group.source_file, `/group/${group.id}/`);
for (const example of oak.examples ?? []) {
  if (example.file) registerSource(`examples/${example.file}`, exampleRoute(example.file));
}
for (const dataSource of oak.data_sources ?? oak.dataSources ?? []) {
  if (!dataSource.source_file) continue;
  const slug = path.basename(dataSource.source_file).replace(/\.md$/, "");
  registerSource(dataSource.source_file, `/document/data-sources/${slug}/`);
}
for (const doc of TOP_LEVEL_DOCUMENTS) registerSource(`${doc}.md`, `/document/${doc}/`);
for (const file of investigationFiles) {
  registerSource(`investigations/${file}`, `/document/investigations/${file.replace(/\.md$/, "")}/`);
}
registerSource("README.md", "/");

const ABSOLUTE_HREF = /^(https?:|mailto:|tel:|data:|#|\/)/;

const resolveRepoPath = (docPath, href) => {
  const base = docPath.includes("/") ? docPath.slice(0, docPath.lastIndexOf("/")) : "";
  return path.posix.normalize(path.posix.join(base, href)).replace(/^(\.\/|\/)+/, "");
};

// Markdown bodies link to sibling files (`../techniques/T5.009-….md`). Relative
// hrefs would resolve against the route directory, so every in-repo link is
// rewritten to its route — or, failing that, anchored at the site root where
// copy-static-content.mjs places the raw file.
const rewriteLinks = (html, docPath) =>
  html.replace(/\s(href|src)="([^"]*)"/g, (match, attr, value) => {
    if (!value || ABSOLUTE_HREF.test(value)) return match;
    const [target, hash] = value.split("#");
    if (!target) return match;
    const resolved = resolveRepoPath(docPath, target);
    const mapped = routeForSource.get(resolved);
    const anchored = resolved.startsWith("public/")
      ? `/${resolved.slice("public/".length)}`
      : `/${resolved}`;
    return ` ${attr}="${mapped ?? anchored}${hash ? `#${hash}` : ""}"`;
  });

const linkList = (links) =>
  `<ul class="pr-list">${links
    .map(
      ({ href, label, note }) =>
        `<li><a href="${escapeHtml(href)}">${escapeHtml(label)}</a>${
          note ? ` <span class="pr-note">— ${escapeHtml(note)}</span>` : ""
        }</li>`,
    )
    .join("")}</ul>`;

const sectionMarkup = ({ title, links, note }) =>
  links?.length
    ? `<section class="pr-section"><h2>${escapeHtml(title)}</h2>${linkList(links)}${
        note ? `<p class="pr-note">${escapeHtml(note)}</p>` : ""
      }</section>`
    : "";

// The rendered body keeps its own <h1> when the source file opens with markup
// before the title (README's banner). The route already prints an <h1>, so drop
// the first one from the body rather than shipping two.
const dropLeadingHeading = (html) => html.replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*/, "");

const documentMarkup = (docPath) => {
  const doc = documentRender[docPath];
  if (!doc) return "";
  const meta = (doc.meta ?? []).length
    ? `<dl class="pr-meta">${doc.meta
        .map(
          ({ label, value }) =>
            `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`,
        )
        .join("")}</dl>`
    : "";
  return `${meta}<div class="pr-body">${dropLeadingHeading(rewriteLinks(doc.html, docPath))}</div>`;
};

const prerenderMarkup = (meta) =>
  `<div class="pr">` +
  `<header class="pr-head"><a class="pr-brand" href="/">${escapeHtml(siteName)}</a>` +
  `<nav class="pr-nav" aria-label="Sections">${NAV_LINKS.map(
    ({ href, label }) => `<a href="${href}">${escapeHtml(label)}</a>`,
  ).join("")}</nav></header>` +
  `<main class="pr-main">` +
  (meta.kicker ? `<p class="pr-kicker">${escapeHtml(meta.kicker)}</p>` : "") +
  `<h1>${escapeHtml(meta.title)}</h1>` +
  (meta.intro ? `<p class="pr-intro">${escapeHtml(meta.intro)}</p>` : "") +
  documentMarkup(meta.doc) +
  meta.sections.map(sectionMarkup).join("") +
  `</main>` +
  `<footer class="pr-foot">${FOOTER_LINKS.map(
    ({ href, label }) => `<a href="${href}">${escapeHtml(label)}</a>`,
  ).join("")}</footer>` +
  `</div>`;

const htmlForRoute = (template, meta) => {
  const canonicalUrl = canonicalUrlForPath(meta.pathname);
  const fullTitle = composeTitle(meta.title);
  // Replacement callbacks, not replacement strings — descriptions carry dollar
  // amounts ("$1.5M"), and `$1` in a replacement string is a capture group.
  const swap = (html, pattern, value) => html.replace(pattern, () => value);
  return [
    [/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(fullTitle)}</title>`],
    [/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`],
    [
      /<meta\s+name="description"\s+content="[^"]+"\s*\/>/,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    ],
    [
      /<meta property="og:title" content="[^"]+"\s*\/?>/,
      `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
    ],
    [
      /<meta property="og:description" content="[^"]+"\s*\/?>/,
      `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    ],
    [
      /<meta property="og:url" content="[^"]+"\s*\/?>/,
      `<meta property="og:url" content="${canonicalUrl}" />`,
    ],
    [
      /<meta name="twitter:title" content="[^"]+"\s*\/?>/,
      `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`,
    ],
    [
      /<meta name="twitter:description" content="[^"]+"\s*\/?>/,
      `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    ],
    [/<\/head>/, `  <style id="pr-style">${PRERENDER_CSS}</style>\n  </head>`],
    [/<div id="root"><\/div>/, `<div id="root">${prerenderMarkup(meta)}</div>`],
  ].reduce((html, [pattern, value]) => swap(html, pattern, value), template);
};

const writeRoute = async (template, meta) => {
  const outDir =
    meta.pathname === "/" ? distDir : path.join(distDir, meta.pathname.replace(/^\/+/, ""));
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), htmlForRoute(template, meta), "utf8");
};

// --- lookups for the related-link sections ---------------------------------

const byId = (items) => new Map((items ?? []).map((item) => [item.id, item]));
const techniqueById = byId(oak.techniques);
const tacticById = byId(oak.tactics);
const mitigationById = byId(oak.mitigations);
const softwareById = byId(oak.software);
const groupById = byId(oak.groups);

const indexBy = (items, key) => {
  const index = new Map();
  for (const item of items ?? []) {
    for (const id of item[key] ?? []) {
      if (!index.has(id)) index.set(id, []);
      index.get(id).push(item);
    }
  }
  return index;
};

const mitigationsByTechnique = indexBy(oak.mitigations, "maps_to_techniques");
const softwareByTechnique = indexBy(oak.software, "observed_techniques");
const softwareByGroup = indexBy(oak.software, "used_by_groups");
const examplesByTechnique = indexBy(oak.examples, "techniques");

const techniqueLink = (id) => ({
  href: `/technique/${id}/`,
  label: `${id} ${techniqueById.get(id)?.name ?? ""}`.trim(),
});
const tacticLink = (id) => ({
  href: `/tactic/${id}/`,
  label: `${id} ${tacticById.get(id)?.name ?? ""}`.trim(),
});
const mitigationLink = (id) => ({
  href: `/mitigation/${id}/`,
  label: `${id} ${mitigationById.get(id)?.name ?? ""}`.trim(),
});
const softwareLink = (id) => ({
  href: `/software/${id}/`,
  label: `${id} ${softwareById.get(id)?.name ?? ""}`.trim(),
});
const groupLink = (id) => ({
  href: `/group/${id}/`,
  label: `${id} ${groupById.get(id)?.name ?? ""}`.trim(),
});
const exampleLink = (example) => ({
  href: exampleRoute(example.file),
  label: stripInlineMarkdown(example.title ?? exampleSlug(example.file)),
});

const byDateDesc = (a, b) => String(b.file).localeCompare(String(a.file));

const exampleSection = (examples, title = "Worked examples") => {
  const sorted = [...examples].sort(byDateDesc);
  const shown = sorted.slice(0, EXAMPLE_LINK_CAP);
  return {
    title: `${title} (${sorted.length})`,
    links: shown.map(exampleLink),
    note:
      sorted.length > shown.length
        ? `${sorted.length - shown.length} further examples are listed under /incidents/.`
        : "",
  };
};

const stats = {
  tactics: (oak.tactics ?? []).length,
  techniques: (oak.techniques ?? []).length,
  mitigations: (oak.mitigations ?? []).length,
  software: (oak.software ?? []).length,
  groups: (oak.groups ?? []).length,
  examples: (oak.examples ?? []).length,
};

// The home route overwrites dist/index.html, so a re-run would otherwise read
// its own output back as the template and nest one snapshot inside the next.
// Reset the container and drop the injected stylesheet to keep this idempotent.
const stripSnapshot = (html) =>
  html
    .replace(/\s*<style id="pr-style">[\s\S]*?<\/style>/, "")
    .replace(/<div id="root">[\s\S]*<\/div>(?=\s*<\/body>)/, '<div id="root"></div>');

const template = stripSnapshot(await readFile(path.join(distDir, "index.html"), "utf8"));

const routes = [
  route(
    "/",
    siteName,
    "Open vendor-neutral taxonomy of on-chain adversary behavior.",
    1.0,
    {
      doc: "README.md",
      intro:
        `${stats.tactics} Tactics, ${stats.techniques} Techniques, ${stats.mitigations} Mitigations, ` +
        `${stats.software} Software entries, ${stats.groups} Threat Actors and ${stats.examples} worked examples ` +
        `of adversary behavior observed against on-chain assets.`,
      sections: [
        { title: "Browse", links: NAV_LINKS },
        {
          title: `Tactics (${stats.tactics})`,
          links: (oak.tactics ?? []).map((tactic) => ({
            ...tacticLink(tactic.id),
            note: tactic.phase,
          })),
        },
      ],
    },
  ),
  route(
    "/matrix",
    "Matrix",
    "Browse OAK Tactics and Techniques as an ATT&CK-style matrix for on-chain adversary behavior.",
    0.9,
    {
      intro:
        `Every OAK Tactic with the Techniques filed under it — ${stats.techniques} Techniques across ` +
        `${stats.tactics} Tactics.`,
      sections: (oak.tactics ?? []).map((tactic) => ({
        title: `${tactic.id} ${tactic.name}`,
        links: [
          { href: `/tactic/${tactic.id}/`, label: `${tactic.id} — Tactic overview`, note: tactic.phase },
          ...(tactic.techniques ?? []).map(techniqueLink),
        ],
      })),
    },
  ),
  route(
    "/incidents",
    "Incidents",
    "Explore worked examples of crypto, DeFi, NFT, bridge, exchange, and laundering incidents mapped to OAK Techniques.",
    0.8,
    {
      intro: `${stats.examples} worked examples, each mapped to the OAK Techniques it demonstrates.`,
      sections: (() => {
        const byYear = new Map();
        for (const example of [...(oak.examples ?? [])].sort(byDateDesc)) {
          const year = String(example.date_prefix ?? example.file ?? "").slice(0, 4) || "undated";
          if (!byYear.has(year)) byYear.set(year, []);
          byYear.get(year).push(example);
        }
        return [...byYear.entries()].map(([year, examples]) => ({
          title: `${year} (${examples.length})`,
          links: examples.map(exampleLink),
        }));
      })(),
    },
  ),
  route(
    "/actors",
    "Threat Actors",
    "Browse OAK threat actor entries and their observed on-chain attack Techniques.",
    0.8,
    {
      intro: `${stats.groups} threat actor entries, each with an explicit attribution-strength label.`,
      sections: [
        {
          title: `Threat actors (${stats.groups})`,
          links: (oak.groups ?? []).map((group) => ({
            ...groupLink(group.id),
            note: truncate(stripInlineMarkdown(group.attribution_status ?? ""), 90),
          })),
        },
      ],
    },
  ),
  route(
    "/mitigations",
    "Mitigations",
    "Browse defender controls and mitigations mapped to OAK on-chain attack Techniques.",
    0.7,
    {
      intro: `${stats.mitigations} defender controls, each mapped to the Techniques it blunts.`,
      sections: [
        {
          title: `Mitigations (${stats.mitigations})`,
          links: (oak.mitigations ?? []).map((mitigation) => ({
            ...mitigationLink(mitigation.id),
            note: [mitigation.class, `${(mitigation.maps_to_techniques ?? []).length} Techniques`]
              .filter(Boolean)
              .join(", "),
          })),
        },
      ],
    },
  ),
  route(
    "/software",
    "Software",
    "Browse malware, drainers, ransomware, and other software entries mapped to OAK Techniques.",
    0.7,
    {
      intro: `${stats.software} drainer kits, malware families, and tooling observed in on-chain attacks.`,
      sections: [
        {
          title: `Software (${stats.software})`,
          links: (oak.software ?? []).map((sw) => ({
            ...softwareLink(sw.id),
            note: sw.type,
          })),
        },
      ],
    },
  ),
  route(
    "/coverage",
    "Coverage & Gaps",
    "Review OAK coverage statistics, taxonomy gaps, and research backlog signals.",
    0.7,
    {
      intro:
        "What the corpus covers, what it does not, and where the taxonomy is still thin — " +
        "coverage per Technique, known gaps, and the open research backlog.",
      sections: [
        {
          title: "Coverage documents",
          links: [
            { href: "/document/COVERAGE/", label: "Coverage — detection coverage per Technique" },
            { href: "/document/TAXONOMY-GAPS/", label: "Taxonomy gaps — proposed and rejected Techniques" },
            { href: "/document/CROSSWALK/", label: "Crosswalk — mapping to MITRE ATT&CK and other frameworks" },
            { href: "/document/PEER-REVIEW/", label: "Peer review — external review status" },
            { href: "/document/ROADMAP/", label: "Roadmap" },
          ],
        },
      ],
    },
  ),
  route(
    "/datasources",
    "Data Sources",
    "Browse the on-chain, off-chain, and vendor data sources OAK Techniques are detected from.",
    0.7,
    {
      intro:
        `${(oak.data_sources ?? []).length} data sources — the telemetry each Technique's detection ` +
        `logic reads from, with access paths and covered chains.`,
      sections: [
        {
          title: `Data sources (${(oak.data_sources ?? []).length})`,
          links: (oak.data_sources ?? []).map((dataSource) => ({
            href: `/document/data-sources/${path.basename(dataSource.source_file).replace(/\.md$/, "")}/`,
            label: `${dataSource.id} ${dataSource.name}`,
            note: [dataSource.layer, (dataSource.chains ?? []).join(", ")].filter(Boolean).join(" · "),
          })),
        },
      ],
    },
  ),
  route(
    "/contribute",
    "Contribute",
    "Learn how to contribute examples, Techniques, mitigations, and corrections to OAK.",
    0.5,
    {
      doc: "CONTRIBUTING.md",
      sections: [
        {
          title: "Also relevant",
          links: [
            { href: "/document/CODE_OF_CONDUCT/", label: "Code of conduct" },
            { href: "/document/SECURITY/", label: "Security policy" },
            { href: "/document/CORRECTIONS/", label: "Corrections log" },
            { href: "/document/VERSIONING/", label: "Versioning policy" },
            { href: "https://github.com/onchainattack/oak/issues", label: "Open an issue on GitHub" },
          ],
        },
      ],
    },
  ),
];

for (const tactic of oak.tactics ?? []) {
  const meta = await readMarkdownMeta(
    tactic.source_file,
    `${tactic.id} ${tactic.name}`,
    `${tactic.id} ${tactic.name}: OAK Tactic in the on-chain adversary behavior taxonomy.`,
  );
  routes.push(
    route(`/tactic/${tactic.id}`, meta.title, meta.description, 0.7, {
      doc: tactic.source_file,
      kicker: `Tactic · ${tactic.id}${tactic.phase ? ` · ${tactic.phase}` : ""}`,
      sections: [
        {
          title: `Techniques (${(tactic.techniques ?? []).length})`,
          links: (tactic.techniques ?? []).map(techniqueLink),
        },
        { title: "Adjacent Tactics", links: (tactic.adjacent_tactics ?? []).map(tacticLink) },
      ],
    }),
  );
}

for (const technique of oak.techniques ?? []) {
  const meta = await readMarkdownMeta(
    technique.source_file,
    `${technique.id} ${technique.name}`,
    `${technique.id} ${technique.name}: OAK Technique in the on-chain adversary behavior taxonomy.`,
  );
  const examples = examplesByTechnique.get(technique.id) ?? [];
  routes.push(
    route(`/technique/${technique.id}`, meta.title, meta.description, 0.7, {
      doc: technique.source_file,
      kicker: `Technique · ${technique.id}${technique.maturity ? ` · ${technique.maturity}` : ""}`,
      sections: [
        { title: "Parent Tactics", links: (technique.parent_tactics ?? []).map(tacticLink) },
        {
          title: "Mitigations",
          links: (mitigationsByTechnique.get(technique.id) ?? []).map((m) => mitigationLink(m.id)),
        },
        {
          title: "Software observed using this Technique",
          links: (softwareByTechnique.get(technique.id) ?? []).map((s) => softwareLink(s.id)),
        },
        ...(examples.length ? [exampleSection(examples)] : []),
      ],
    }),
  );
}

for (const mitigation of oak.mitigations ?? []) {
  const meta = await readMarkdownMeta(
    mitigation.source_file,
    `${mitigation.id} ${mitigation.name}`,
    `${mitigation.id} ${mitigation.name}: OAK Mitigation mapped to on-chain attack Techniques.`,
  );
  routes.push(
    route(`/mitigation/${mitigation.id}`, meta.title, meta.description, 0.6, {
      doc: mitigation.source_file,
      kicker: `Mitigation · ${mitigation.id}${mitigation.class ? ` · ${mitigation.class}` : ""}`,
      sections: [
        {
          title: `Techniques mitigated (${(mitigation.maps_to_techniques ?? []).length})`,
          links: (mitigation.maps_to_techniques ?? []).map(techniqueLink),
        },
      ],
    }),
  );
}

for (const sw of oak.software ?? []) {
  const meta = await readMarkdownMeta(
    sw.source_file,
    `${sw.id} ${sw.name}`,
    `${sw.id} ${sw.name}: OAK Software entry mapped to observed adversary Techniques.`,
  );
  routes.push(
    route(`/software/${sw.id}`, meta.title, meta.description, 0.6, {
      doc: sw.source_file,
      kicker: `Software · ${sw.id}${sw.type ? ` · ${sw.type}` : ""}`,
      sections: [
        {
          title: `Techniques observed (${(sw.observed_techniques ?? []).length})`,
          links: (sw.observed_techniques ?? []).map(techniqueLink),
        },
        { title: "Used by", links: (sw.used_by_groups ?? []).map(groupLink) },
      ],
    }),
  );
}

for (const group of oak.groups ?? []) {
  const meta = await readMarkdownMeta(
    group.source_file,
    `${group.id} ${group.name ?? "Threat Actor"}`,
    `${group.id}: OAK Threat Actor entry mapped to observed on-chain attack Techniques.`,
  );
  routes.push(
    route(`/group/${group.id}`, meta.title, meta.description, 0.6, {
      doc: group.source_file,
      kicker: `Threat actor · ${group.id}`,
      sections: [
        {
          title: "Software used",
          links: (softwareByGroup.get(group.id) ?? []).map((s) => softwareLink(s.id)),
        },
      ],
    }),
  );
}

// Data sources are reached as documents, not as their own entity route. The
// app opens them via openDoc("data-sources/<file>") and routing.ts has no
// /data-source/<id> pattern — an unknown path falls through to the "about"
// view, so emitting /data-source/OAK-DS-nn/ would publish indexable URLs that
// render the wrong page. Emit the document path the SPA actually handles.
for (const dataSource of oak.data_sources ?? oak.dataSources ?? []) {
  if (!dataSource.source_file) continue;
  const slug = path.basename(dataSource.source_file).replace(/\.md$/, "");
  const meta = await readMarkdownMeta(
    dataSource.source_file,
    `${dataSource.id} ${dataSource.name}`,
    `${dataSource.id} ${dataSource.name}: OAK Data Source entry.`,
  );
  routes.push(
    route(`/document/data-sources/${slug}`, meta.title, meta.description, 0.5, {
      doc: dataSource.source_file,
      kicker: `Data source · ${dataSource.id}${dataSource.layer ? ` · ${dataSource.layer}` : ""}`,
    }),
  );
}

for (const doc of TOP_LEVEL_DOCUMENTS) {
  const meta = await readMarkdownMeta(
    `${doc}.md`,
    doc.replace(/_/g, " "),
    `${doc.replace(/_/g, " ")}: OAK source document.`,
  );
  routes.push(
    route(`/document/${doc}`, meta.title, meta.description, 0.5, {
      doc: `${doc}.md`,
      kicker: "Document",
    }),
  );
}

for (const file of investigationFiles) {
  const slug = file.replace(/\.md$/, "");
  const meta = await readMarkdownMeta(
    path.join("investigations", file),
    slug,
    `${slug}: OAK investigation write-up.`,
  );
  routes.push(
    route(`/document/investigations/${slug}`, meta.title, meta.description, 0.5, {
      doc: `investigations/${file}`,
      kicker: "Investigation",
    }),
  );
}

for (const example of oak.examples ?? []) {
  if (!example.file) continue;
  const slug = exampleSlug(example.file);
  const meta = await readMarkdownMeta(
    path.join("examples", example.file),
    example.title ?? slug,
    `${example.title ?? slug}: worked example in the OAK incident corpus.`,
  );
  routes.push(
    route(`/document/examples/${slug}`, meta.title, meta.description, 0.4, {
      doc: `examples/${example.file}`,
      kicker: `Worked example${example.date_prefix ? ` · ${example.date_prefix}` : ""}`,
      sections: [
        {
          title: `Techniques demonstrated (${(example.techniques ?? []).length})`,
          links: (example.techniques ?? []).map(techniqueLink),
        },
      ],
    }),
  );
}

const uniqueRoutes = [...new Map(routes.map((meta) => [meta.pathname, meta])).values()].sort(
  (a, b) => b.priority - a.priority || a.pathname.localeCompare(b.pathname),
);

await Promise.all(uniqueRoutes.map((meta) => writeRoute(template, meta)));
const withBody = uniqueRoutes.filter((meta) => meta.doc || meta.sections.some((s) => s.links?.length));
console.log(
  `OK: wrote ${uniqueRoutes.length} route entrypoint(s) to dist/ — ` +
    `${withBody.length} carry a pre-rendered content snapshot.`,
);
