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

const documents = Object.fromEntries(
  await Promise.all(
    documentSpecs.map(async (docPath) => {
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
          html: addHeadingIds(marked.parse(documentMeta.markdown)),
        },
      ];
    }),
  ),
);

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
  tactics,
  techniques,
  mitigations,
  software,
  relationships,
  examples: examples.sort((a, b) => b.file.localeCompare(a.file)),
  actors: actors.sort((a, b) => a.id.localeCompare(b.id)),
  coverageRows,
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
await writeFile(
  rel("src/data/documents.ts"),
  `${banner}\nexport const documentBodies: Record<string, string> = ${JSON.stringify(documentBodies, null, 2)};\n`,
);
