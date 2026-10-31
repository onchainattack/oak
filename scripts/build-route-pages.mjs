import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { TOP_LEVEL_DOCUMENTS } from "./site-documents.mjs";
import { buildRouteMap, rewriteRelativeLinks } from "./site-links.mjs";
import {
  exampleFacts, exampleSearchTitle, gitDates, lossValue, monthHubPath, monthHubTitle, monthHubs,
  yearHubPath, yearHubTitle,
} from "./seo.mjs";
import { hubCard, incidentCard, techniqueCard } from "./og-image.mjs";

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
  // <title> when it should differ from the visible <h1> (search wording).
  headTitle: content.headTitle ?? "",
  // Extra schema.org nodes for this page; a BreadcrumbList is added for all.
  jsonLd: content.jsonLd ?? [],
  crumbs: content.crumbs ?? [],
  // Static pages exist only as pre-rendered HTML: the SPA has no view for them,
  // so it must not mount over them (src/main.tsx checks data-static).
  isStatic: content.isStatic ?? false,
  // Site path of this page's social card (written under dist/og/); "" = banner.
  ogImage: content.ogImage ?? "",
  ogAlt: content.ogAlt ?? "",
});

const canonicalUrlForPath = (pathname) => `${baseUrl}${pathname === "/" ? "/" : `${pathname}/`}`;

// Search results truncate a title at roughly 60 characters, and Bing flags
// anything longer. Keep the full brand suffix where it fits, fall back to the
// short one, and clamp the page title itself only when even that overflows.
const TITLE_MAX = 60;
const HOME_TITLE = "OAK — OnChain Attack Knowledge: crypto attack taxonomy";

const clampWords = (value, max) => {
  if (value.length <= max) return value;
  let clamped = value
    .slice(0, max)
    .replace(/\s+\S*$/, "")
    .replace(/[\s\-—–:(,;/]+$/, "");
  // A cut inside a parenthetical leaves "(Developer" hanging — drop the opening
  // bracket and whatever followed it. Same for an unbalanced quote.
  const balance = (open, close) =>
    (clamped.split(open).length - 1) > (clamped.split(close).length - 1);
  if (balance("(", ")")) clamped = clamped.slice(0, clamped.lastIndexOf("("));
  if (balance("[", "]")) clamped = clamped.slice(0, clamped.lastIndexOf("["));
  if ((clamped.split('"').length - 1) % 2) clamped = clamped.slice(0, clamped.lastIndexOf('"'));
  return clamped.replace(/[\s\-—–:(,;/]+$/, "");
};

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

// Snapshot layout and typography come from the same built CSS as the app.

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

// Repo-relative source path → canonical site route. Shared with
// build-site-data.mjs so the prerendered pages and the SPA-embedded HTML
// cannot drift apart — see scripts/site-links.mjs.
const routeForSource = buildRouteMap(oak, investigationFiles);
const unmappedMarkdown = new Set();

const rewriteLinks = (html, docPath) =>
  rewriteRelativeLinks(html, docPath, routeForSource, unmappedMarkdown);

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
  return `${meta}<div class="pr-body markdown-body markdown-shell">${dropLeadingHeading(rewriteLinks(doc.html, docPath))}</div>`;
};

const prerenderMarkup = (meta) =>
  `<div class="pr">` +
  `<header class="pr-head"><a class="pr-brand" href="/">${escapeHtml(siteName)}</a>` +
  `<nav class="pr-nav" aria-label="Sections">${NAV_LINKS.map(
    ({ href, label }) => `<a href="${href}">${escapeHtml(label)}</a>`,
  ).join("")}</nav></header>` +
  `<main class="pr-main">` +
  (meta.kicker ? `<p class="pr-kicker eyebrow">${escapeHtml(meta.kicker)}</p>` : "") +
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
  const fullTitle = composeTitle(meta.headTitle || meta.title);
  const crumbs = [{ name: "OAK", path: "/" }, ...meta.crumbs];
  const graph = [
    ...(meta.pathname === "/" ? [] : [{
      "@type": "BreadcrumbList",
      itemListElement: [...crumbs, { name: meta.title, path: meta.pathname }].map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: canonicalUrlForPath(c.path.replace(/\/+$/, "") || "/"),
      })),
    }]),
    ...meta.jsonLd,
  ];
  const pageLd = graph.length
    ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c")}</script>\n  </head>`
    : "</head>";
  // Replacement callbacks, not replacement strings — descriptions carry dollar
  // amounts ("$1.5M"), and `$1` in a replacement string is a capture group.
  // A pattern that stops matching (a reformatted meta tag, a renamed element)
  // would otherwise leave every route carrying the template's own title,
  // canonical and description — silently, on all 1,000+ pages. Test for the
  // match rather than comparing before/after: a route whose replacement equals
  // what the template already holds is legitimate (the root route's title).
  const swap = (html, pattern, value) => {
    if (!pattern.test(html)) {
      throw new Error(
        `build-route-pages: no match for ${pattern} in the page template — `
          + `refusing to emit routes with stale <head> metadata.`,
      );
    }
    return html.replace(pattern, () => value);
  };
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
    ...(meta.ogImage
      ? [
          [/<meta property="og:image" content="[^"]+"\s*\/?>/, `<meta property="og:image" content="${baseUrl}${meta.ogImage}" />`],
          [/<meta name="twitter:image" content="[^"]+"\s*\/?>/, `<meta name="twitter:image" content="${baseUrl}${meta.ogImage}" />`],
          [/<meta property="og:image:alt" content="[^"]+"\s*\/?>/, `<meta property="og:image:alt" content="${escapeHtml(meta.ogAlt)}" />`],
          [/<meta name="twitter:image:alt" content="[^"]+"\s*\/?>/, `<meta name="twitter:image:alt" content="${escapeHtml(meta.ogAlt)}" />`],
          [/<meta property="og:type" content="[^"]+"\s*\/?>/, `<meta property="og:type" content="article" />`],
        ]
      : []),
    [/<\/head>/, pageLd],
    [
      /<div id="root"><\/div>/,
      `<div id="root"${meta.isStatic ? " data-static" : ""}>${prerenderMarkup(meta)}</div>`,
    ],
  ].reduce((html, [pattern, value]) => swap(html, pattern, value), template)
    // A static page needs none of the app bundle.
    .replace(meta.isStatic ? /\s*<script type="module"[^>]*src="\/assets\/[^"]+"><\/script>/ : /$^/, "");
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

const dates = gitDates(root);
const writeOg = async (sitePath, png) => {
  const out = path.join(distDir, sitePath.replace(/^\/+/, ""));
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, png);
};
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
      // The SPA has no tactic view (it would render the home page here).
      isStatic: true,
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
  const ogImage = `/og/technique/${technique.id}.png`;
  const parent = (technique.parent_tactics ?? [])[0];
  await writeOg(ogImage, techniqueCard(root, {
    id: technique.id,
    name: technique.name,
    tactic: parent ? `${parent} ${tacticById.get(parent)?.name ?? ""}`.trim() : "",
    incidents: examples.length,
  }));
  routes.push(
    route(`/technique/${technique.id}`, meta.title, meta.description, 0.7, {
      doc: technique.source_file,
      ogImage,
      ogAlt: `${technique.id} ${technique.name} — OAK Technique`,
      crumbs: (technique.parent_tactics ?? []).slice(0, 1).map((id) => ({
        name: `${id} ${tacticById.get(id)?.name ?? ""}`.trim(),
        path: `/tactic/${id}/`,
      })),
      jsonLd: [{
        "@type": "DefinedTerm",
        "@id": canonicalUrlForPath(`/technique/${technique.id}`),
        termCode: technique.id,
        name: technique.name,
        description: meta.description,
        url: canonicalUrlForPath(`/technique/${technique.id}`),
        inDefinedTermSet: { "@type": "DefinedTermSet", name: "OAK — OnChain Attack Knowledge", url: `${baseUrl}/matrix/` },
        ...(dates.last.get(technique.source_file) ? { dateModified: dates.last.get(technique.source_file) } : {}),
      }],
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

const exampleFactsByFile = new Map();
for (const example of oak.examples ?? []) {
  if (!example.file) continue;
  exampleFactsByFile.set(
    example.file,
    exampleFacts(example, await readFile(path.join(root, "examples", example.file), "utf8")),
  );
}
const hubs = monthHubs(oak.examples);

for (const example of oak.examples ?? []) {
  if (!example.file) continue;
  const slug = exampleSlug(example.file);
  const source = path.join("examples", example.file);
  const meta = await readMarkdownMeta(
    source,
    example.title ?? slug,
    `${example.title ?? slug}: worked example in the OAK incident corpus.`,
  );
  const facts = exampleFactsByFile.get(example.file);
  const searchTitle = exampleSearchTitle(facts);
  const lead = [facts.dateLabel, facts.loss && `loss ${facts.loss}`].filter(Boolean).join(" · ");
  const description = lead ? `${lead}. ${meta.description}` : meta.description;
  const hub = facts.single && hubs.has(facts.ym) ? monthHubPath(facts.ym) : "";
  const pageUrl = canonicalUrlForPath(`/document/examples/${slug}`);
  const segments = facts.h1.split(" — ");
  const chainSegment = segments.length >= 3 ? segments[segments.length - 2] : "";
  const primary = [example.root_cause_evidence?.[0]?.technique_id, ...(example.techniques ?? [])]
    .find((id) => techniqueById.has(id)) ?? "";
  const cardHeadline = `${facts.victim}${facts.verb ? ` ${facts.verb}` : ""}`;
  // H1 shape: "Victim — what happened — Victim / chains — date". Shorter H1s
  // carry no mechanism segment; use the page description then.
  const mechanism = segments.length >= 4 ? segments[1] : meta.description.replace(/…$/, "");
  const ogImage = `/og/examples/${slug}.png`;
  await writeOg(ogImage, incidentCard(root, {
    kicker: facts.single ? "INCIDENT" : "CASE STUDY",
    headline: cardHeadline,
    loss: facts.loss,
    date: facts.dateLabel,
    mechanism: (() => {
      // Descriptions taken from a table row start with "| … |" cells.
      const m = mechanism.replace(/\s*\|\s*/g, " · ").replace(/^\s*·\s*/, "");
      return m.charAt(0).toUpperCase() + m.slice(1);
    })(),
    technique: primary
      ? `${primary} ${(techniqueById.get(primary)?.name ?? "").replace(/\s*\([^)]*\)\s*$/, "")}`.trim()
      : "",
    chains: /\d{4}/.test(chainSegment) ? "" : (chainSegment.includes(" / ") ? chainSegment.split(" / ").slice(1).join(" / ") : chainSegment),
  }));
  routes.push(
    route(`/document/examples/${slug}`, meta.title, description, 0.4, {
      doc: source,
      headTitle: searchTitle,
      ogImage,
      ogAlt: [cardHeadline, facts.dateLabel, facts.loss && `loss ${facts.loss}`].filter(Boolean).join(" · "),
      kicker: `Worked example${example.date_prefix ? ` · ${example.date_prefix}` : ""}`,
      crumbs: [
        { name: "Incidents", path: "/incidents/" },
        ...(hub ? [{ name: monthHubTitle(facts.ym).replace("Crypto hacks and exploits in ", ""), path: `${hub}/` }] : []),
      ],
      jsonLd: [
        {
          "@type": "Article",
          "@id": `${pageUrl}#article`,
          headline: truncate(facts.h1, 110),
          image: `${baseUrl}${ogImage}`,
          ...(searchTitle ? { alternativeHeadline: searchTitle } : {}),
          description: truncate(description),
          url: pageUrl,
          mainEntityOfPage: pageUrl,
          ...(dates.first.get(source) ? { datePublished: dates.first.get(source) } : {}),
          ...(dates.last.get(source) ? { dateModified: dates.last.get(source) } : {}),
          author: { "@id": `${baseUrl}/#organization` },
          publisher: { "@id": `${baseUrl}/#organization` },
          isPartOf: { "@id": `${baseUrl}/#dataset` },
          inLanguage: "en",
          about: (example.techniques ?? []).map((id) => ({
            "@type": "DefinedTerm",
            "@id": canonicalUrlForPath(`/technique/${id}`),
            name: `${id} ${techniqueById.get(id)?.name ?? ""}`.trim(),
          })),
          keywords: [facts.victim, facts.verb && `${facts.victim} ${facts.verb}`, "crypto hack", "on-chain attack"]
            .filter(Boolean)
            .join(", "),
        },
      ],
      sections: [
        {
          title: `Techniques demonstrated (${(example.techniques ?? []).length})`,
          links: (example.techniques ?? []).map(techniqueLink),
        },
        ...(hub
          ? [{
              title: "More incidents",
              links: [
                { href: `${hub}/`, label: monthHubTitle(facts.ym) },
                { href: `${yearHubPath(facts.ym.slice(0, 4))}/`, label: yearHubTitle(facts.ym.slice(0, 4)) },
              ],
            }]
          : []),
      ],
    }),
  );
}

// Month and year hubs: "Crypto hacks and exploits in October 2026". Each lists
// that period's single incidents with date, loss and primary Technique. They
// are what people search for, and they give every incident a second crawl path.
const hubLink = (example) => {
  const facts = exampleFactsByFile.get(example.file);
  const technique = example.techniques?.[0];
  return {
    href: exampleRoute(example.file),
    label: exampleSearchTitle(facts) || stripInlineMarkdown(example.title ?? exampleSlug(example.file)),
    note: [facts.iso, facts.loss && `loss ${facts.loss}`, technique && `${technique} ${techniqueById.get(technique)?.name ?? ""}`.trim()]
      .filter(Boolean)
      .join(" · "),
  };
};
// Newest incident first: by the incident's own date, then by file name.
const byIncidentDateDesc = (a, b) =>
  (exampleFactsByFile.get(b.file)?.iso ?? "").localeCompare(exampleFactsByFile.get(a.file)?.iso ?? "") ||
  byDateDesc(a, b);
// The three largest incidents in a hub, for its social card.
const topByLoss = (examples) =>
  examples
    .map((example) => exampleFactsByFile.get(example.file))
    .filter((facts) => facts?.loss)
    .sort((a, b) => lossValue(b.loss) - lossValue(a.loss))
    .slice(0, 3)
    .map((facts) => ({ name: `${facts.victim}${facts.verb ? ` ${facts.verb}` : ""}`, loss: facts.loss }));
const hubOg = async (sitePath, kicker, period, examples) => {
  await writeOg(sitePath, hubCard(root, { kicker, period, count: examples.length, top: topByLoss(examples) }));
  return sitePath;
};
const hubList = (examples) => [...examples].sort(byIncidentDateDesc).map(hubLink);
const years = new Map();
for (const [ym, examples] of hubs) {
  const year = ym.slice(0, 4);
  if (!years.has(year)) years.set(year, []);
  years.get(year).push([ym, examples]);
  const title = monthHubTitle(ym);
  const period = title.replace("Crypto hacks and exploits in ", "");
  const ogImage = await hubOg(`/og/incidents/${ym}.png`, "INCIDENTS BY MONTH", period, examples);
  routes.push(
    route(monthHubPath(ym), title, `${examples.length} crypto hacks, exploits and on-chain attacks in ${title.replace("Crypto hacks and exploits in ", "")}: date, loss, how each happened (OAK Technique), timeline and attacker addresses.`, 0.6, {
      kicker: "Incidents by month",
      ogImage,
      ogAlt: `${title}: ${examples.length} incidents`,
      intro: `${examples.length} incidents. Each links to a full write-up: timeline, OAK Techniques, attacker addresses and fund flow, with sources.`,
      isStatic: true,
      crumbs: [{ name: "Incidents", path: "/incidents/" }, { name: year, path: `${yearHubPath(year)}/` }],
      jsonLd: [{
        "@type": "CollectionPage",
        name: title,
        url: canonicalUrlForPath(monthHubPath(ym)),
        isPartOf: { "@id": `${baseUrl}/#dataset` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: examples.length,
          itemListElement: [...examples].sort(byIncidentDateDesc).map((example, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: canonicalUrlForPath(exampleRoute(example.file).replace(/\/+$/, "")),
          })),
        },
      }],
      sections: [{ title: `Incidents (${examples.length})`, links: hubList(examples) }],
    }),
  );
}
for (const [year, months] of years) {
  const total = months.reduce((n, [, examples]) => n + examples.length, 0);
  const yearOg = await hubOg(`/og/incidents/${year}.png`, "INCIDENTS BY YEAR", year, months.flatMap(([, examples]) => examples));
  routes.push(
    route(yearHubPath(year), yearHubTitle(year), `${total} crypto hacks, exploits and on-chain attacks in ${year}, month by month: date, loss, mechanism, timeline and attacker addresses.`, 0.6, {
      kicker: "Incidents by year",
      ogImage: yearOg,
      ogAlt: `${yearHubTitle(year)}: ${total} incidents`,
      intro: `${total} incidents in ${year}.`,
      isStatic: true,
      crumbs: [{ name: "Incidents", path: "/incidents/" }],
      jsonLd: [{ "@type": "CollectionPage", name: yearHubTitle(year), url: canonicalUrlForPath(yearHubPath(year)), isPartOf: { "@id": `${baseUrl}/#dataset` } }],
      sections: months.map(([ym, examples]) => ({
        title: `${monthHubTitle(ym).replace("Crypto hacks and exploits in ", "")} (${examples.length})`,
        links: [{ href: `${monthHubPath(ym)}/`, label: monthHubTitle(ym) }, ...hubList(examples)],
      })),
    }),
  );
}

// The Incidents index links every hub first, so they are one click from it.
const incidentsRoute = routes.find((r) => r.pathname === "/incidents");
incidentsRoute?.sections.unshift({
  title: "Incidents by month",
  links: [...years.keys()].flatMap((year) => [
    { href: `${yearHubPath(year)}/`, label: yearHubTitle(year) },
    ...years.get(year).map(([ym, examples]) => ({
      href: `${monthHubPath(ym)}/`,
      label: monthHubTitle(ym),
      note: `${examples.length} incidents`,
    })),
  ]),
});

// RSS feed of the newest single incidents, newest first by incident date.
const xmlEscape = (value) => escapeHtml(value).replace(/'/g, "&apos;");
const feedItems = [...(oak.examples ?? [])]
  .filter((example) => example.file && exampleFactsByFile.get(example.file)?.single)
  .sort(byIncidentDateDesc)
  .slice(0, 50)
  .map((example) => {
    const facts = exampleFactsByFile.get(example.file);
    const url = canonicalUrlForPath(exampleRoute(example.file).replace(/\/+$/, ""));
    const date = dates.first.get(`examples/${example.file}`) ?? facts.iso;
    const r = routes.find((x) => x.pathname === exampleRoute(example.file).replace(/\/+$/, ""));
    return `    <item>
      <title>${xmlEscape(exampleSearchTitle(facts) || facts.h1)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${date ? `<pubDate>${new Date(`${date}T12:00:00Z`).toUTCString()}</pubDate>` : ""}
      <description>${xmlEscape(r?.description ?? facts.h1)}</description>
    </item>`;
  });
await writeFile(
  path.join(distDir, "feed.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>OAK — new crypto hacks and exploits</title>
    <link>${baseUrl}/incidents/</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Newly documented crypto hacks, exploits and on-chain attacks: mechanism, timeline, attacker addresses and fund flow.</description>
    <language>en</language>
${feedItems.join("\n")}
  </channel>
</rss>
`,
  "utf8",
);

const uniqueRoutes = [...new Map(routes.map((meta) => [meta.pathname, meta])).values()].sort(
  (a, b) => b.priority - a.priority || a.pathname.localeCompare(b.pathname),
);

await Promise.all(uniqueRoutes.map((meta) => writeRoute(template, meta)));
const withBody = uniqueRoutes.filter((meta) => meta.doc || meta.sections.some((s) => s.links?.length));
console.log(
  `OK: wrote ${uniqueRoutes.length} route entrypoint(s) to dist/ — ` +
    `${withBody.length} carry a pre-rendered content snapshot.`,
);
