import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const baseUrl = "https://onchainattack.org";
const siteName = "OAK — OnChain Attack Knowledge";
const distDir = path.join(root, "dist");

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

const route = (pathname, title, description, priority = 0.5) => ({
  pathname,
  title,
  description: truncate(description),
  priority,
});

const canonicalUrlForPath = (pathname) => `${baseUrl}${pathname === "/" ? "/" : `${pathname}/`}`;

const htmlForRoute = (template, { pathname, title, description }) => {
  const canonicalUrl = canonicalUrlForPath(pathname);
  const fullTitle = title === siteName ? siteName : `${title} · ${siteName}`;
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(fullTitle)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]+(" \/>)/, `$1${canonicalUrl}$2`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]+"\s*\/>/,
      `<meta name="description" content="${escapeHtml(description)}" />`,
    )
    .replace(/(<meta property="og:title" content=")[^"]+("(\s*\/?>))/, `$1${escapeHtml(fullTitle)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]+("(\s*\/?>))/, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]+("(\s*\/?>))/, `$1${canonicalUrl}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]+("(\s*\/?>))/, `$1${escapeHtml(fullTitle)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]+("(\s*\/?>))/, `$1${escapeHtml(description)}$2`);
};

const writeRoute = async (template, meta) => {
  if (meta.pathname === "/") return;
  const outDir = path.join(distDir, meta.pathname.replace(/^\/+/, ""));
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), htmlForRoute(template, meta), "utf8");
};

const oak = JSON.parse(await readFile(path.join(root, "tools/oak.json"), "utf8"));
const template = await readFile(path.join(distDir, "index.html"), "utf8");
const routes = [
  route("/", siteName, "Open vendor-neutral taxonomy of on-chain adversary behavior.", 1.0),
  route("/matrix", "Matrix", "Browse OAK Tactics and Techniques as an ATT&CK-style matrix for on-chain adversary behavior.", 0.9),
  route("/incidents", "Incidents", "Explore worked examples of crypto, DeFi, NFT, bridge, exchange, and laundering incidents mapped to OAK Techniques.", 0.8),
  route("/actors", "Threat Actors", "Browse OAK threat actor entries and their observed on-chain attack Techniques.", 0.8),
  route("/mitigations", "Mitigations", "Browse defender controls and mitigations mapped to OAK on-chain attack Techniques.", 0.7),
  route("/software", "Software", "Browse malware, drainers, ransomware, and other software entries mapped to OAK Techniques.", 0.7),
  route("/coverage", "Coverage & Gaps", "Review OAK coverage statistics, taxonomy gaps, and research backlog signals.", 0.7),
  route("/contribute", "Contribute", "Learn how to contribute examples, Techniques, mitigations, and corrections to OAK.", 0.5),
];

for (const tactic of oak.tactics ?? []) {
  const meta = await readMarkdownMeta(
    tactic.source_file,
    `${tactic.id} ${tactic.name}`,
    `${tactic.id} ${tactic.name}: OAK Tactic in the on-chain adversary behavior taxonomy.`,
  );
  routes.push(route(`/tactic/${tactic.id}`, meta.title, meta.description, 0.7));
}

for (const technique of oak.techniques ?? []) {
  const meta = await readMarkdownMeta(
    technique.source_file,
    `${technique.id} ${technique.name}`,
    `${technique.id} ${technique.name}: OAK Technique in the on-chain adversary behavior taxonomy.`,
  );
  routes.push(route(`/technique/${technique.id}`, meta.title, meta.description, 0.7));
}

for (const mitigation of oak.mitigations ?? []) {
  const meta = await readMarkdownMeta(
    mitigation.source_file,
    `${mitigation.id} ${mitigation.name}`,
    `${mitigation.id} ${mitigation.name}: OAK Mitigation mapped to on-chain attack Techniques.`,
  );
  routes.push(route(`/mitigation/${mitigation.id}`, meta.title, meta.description, 0.6));
}

for (const sw of oak.software ?? []) {
  const meta = await readMarkdownMeta(
    sw.source_file,
    `${sw.id} ${sw.name}`,
    `${sw.id} ${sw.name}: OAK Software entry mapped to observed adversary Techniques.`,
  );
  routes.push(route(`/software/${sw.id}`, meta.title, meta.description, 0.6));
}

for (const group of oak.groups ?? []) {
  const meta = await readMarkdownMeta(
    group.source_file,
    `${group.id} ${group.name ?? "Threat Actor"}`,
    `${group.id}: OAK Threat Actor entry mapped to observed on-chain attack Techniques.`,
  );
  routes.push(route(`/group/${group.id}`, meta.title, meta.description, 0.6));
}

for (const dataSource of oak.data_sources ?? oak.dataSources ?? []) {
  const meta = await readMarkdownMeta(
    dataSource.source_file,
    `${dataSource.id} ${dataSource.name}`,
    `${dataSource.id} ${dataSource.name}: OAK Data Source entry.`,
  );
  routes.push(route(`/data-source/${dataSource.id}`, meta.title, meta.description, 0.5));
}

const documents = [
  "CHANGELOG",
  "ROADMAP",
  "TAXONOMY-GAPS",
  "GLOSSARY",
  "PRIOR-ART",
  "COVERAGE",
  "CROSSWALK",
  "CONTRIBUTING",
  "CODE_OF_CONDUCT",
  "SECURITY",
  "PEER-REVIEW",
  "DISCLAIMER",
  "CORRECTIONS",
  "VERSIONING",
];

for (const doc of documents) {
  const meta = await readMarkdownMeta(
    `${doc}.md`,
    doc.replace(/_/g, " "),
    `${doc.replace(/_/g, " ")}: OAK source document.`,
  );
  routes.push(route(`/document/${doc}`, meta.title, meta.description, 0.5));
}

for (const example of oak.examples ?? []) {
  if (!example.file) continue;
  const slug = example.file.replace(/\.md$/, "");
  const meta = await readMarkdownMeta(
    path.join("examples", example.file),
    example.title ?? slug,
    `${example.title ?? slug}: worked example in the OAK incident corpus.`,
  );
  routes.push(route(`/document/examples/${slug}`, meta.title, meta.description, 0.4));
}

const uniqueRoutes = [...new Map(routes.map((meta) => [meta.pathname, meta])).values()].sort(
  (a, b) => b.priority - a.priority || a.pathname.localeCompare(b.pathname),
);

await Promise.all(uniqueRoutes.map((meta) => writeRoute(template, meta)));
console.log(`OK: wrote ${uniqueRoutes.length - 1} route entrypoint(s) to dist/`);
