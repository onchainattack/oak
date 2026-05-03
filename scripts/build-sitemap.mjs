import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const baseUrl = "https://onchainattack.org";
const oak = JSON.parse(await readFile(path.join(root, "tools/oak.json"), "utf8"));

const today = new Date().toISOString().slice(0, 10);

const urls = [];
const push = (loc, priority = 0.6, changefreq = "weekly") => {
  urls.push({ loc, lastmod: today, changefreq, priority });
};

// Clean, history-routed URLs (no `#/`, no `.md` suffix). Direct navigation is
// supported via the GitHub Pages 404.html SPA-redirect trick.

// Top-level views
push(`${baseUrl}/`, 1.0, "weekly");
push(`${baseUrl}/matrix`, 0.9, "daily");
push(`${baseUrl}/incidents`, 0.8, "weekly");
push(`${baseUrl}/actors`, 0.8, "weekly");
push(`${baseUrl}/mitigations`, 0.7, "weekly");
push(`${baseUrl}/software`, 0.7, "weekly");
push(`${baseUrl}/coverage`, 0.7, "weekly");
push(`${baseUrl}/contribute`, 0.5, "monthly");

// Per-Technique
for (const t of oak.techniques ?? []) {
  push(`${baseUrl}/technique/${t.id}`, 0.7, "monthly");
}

// Per-Mitigation
for (const m of oak.mitigations ?? []) {
  push(`${baseUrl}/mitigation/${m.id}`, 0.6, "monthly");
}

// Per-Software
for (const s of oak.software ?? []) {
  push(`${baseUrl}/software/${s.id}`, 0.6, "monthly");
}

// Per-Group
for (const g of oak.groups ?? []) {
  push(`${baseUrl}/group/${g.id}`, 0.6, "monthly");
}

// Per-Tactic
for (const t of oak.tactics ?? []) {
  push(`${baseUrl}/tactic/${t.id}`, 0.7, "monthly");
}

// Per-Data-Source
for (const ds of oak.data_sources ?? oak.dataSources ?? []) {
  push(`${baseUrl}/data-source/${ds.id}`, 0.5, "monthly");
}

// Top-level documents (markdown pages indexed via the in-app viewer; .md is
// stripped from the URL surface and restored at lookup time)
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
  push(`${baseUrl}/document/${doc}`, 0.5, "monthly");
}

// Worked examples — each example file is its own indexable page
for (const ex of oak.examples ?? []) {
  if (ex.file) {
    const slug = ex.file.replace(/\.md$/, "");
    push(`${baseUrl}/document/examples/${slug}`, 0.4, "monthly");
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

await mkdir(path.join(root, "public"), { recursive: true });
await writeFile(path.join(root, "public", "sitemap.xml"), xml, "utf8");
console.log(`OK: wrote public/sitemap.xml — ${urls.length} URLs`);
