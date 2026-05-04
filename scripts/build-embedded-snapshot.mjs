#!/usr/bin/env node
/**
 * build-embedded-snapshot.mjs — produce tools/embedded.json, a single composed
 * artifact that downstream consumers (oak-mcp v0.2+) fetch at runtime instead
 * of reassembling oak.json + N markdown bodies on every install.
 *
 * Output shape mirrors what oak-mcp/scripts/fetch-data.mjs LOCAL mode wrote:
 *   { oak, docs, fetchedAt, source }
 * where `oak` is the canonical tools/oak.json and `docs` is a map of
 * <relative path> → <markdown body> for every body referenced from oak.json.
 *
 * Run as part of `npm run site:data`. The artifact is served at
 * https://onchainattack.org/tools/embedded.json after copy-static-content.mjs
 * places it under dist/.
 */

import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const OUT_FILE = path.join(root, "tools", "embedded.json");

async function readLocalText(rel) {
  return readFile(path.join(root, rel), "utf8");
}

async function listLocalDir(rel) {
  return (await readdir(path.join(root, rel))).filter((f) => f.endsWith(".md"));
}

const oak = JSON.parse(await readLocalText("tools/oak.json"));

const docs = {};

const dirs = [
  "tactics",
  "techniques",
  "examples",
  "actors",
  "data-sources",
  "mitigations",
  "software",
];
for (const d of dirs) {
  const files = await listLocalDir(d);
  for (const f of files) {
    const key = `${d}/${f}`;
    docs[key] = await readLocalText(key);
  }
}

const topLevel = [
  "README.md",
  "GLOSSARY.md",
  "TAXONOMY-GAPS.md",
  "CROSSWALK.md",
  "PRIOR-ART.md",
  "VERSIONING.md",
  "CHANGELOG.md",
  "COVERAGE.md",
  "ROADMAP.md",
  "CONTRIBUTING.md",
  "STATS.md",
  "BACKLOG.md",
];
for (const f of topLevel) {
  try {
    docs[f] = await readLocalText(f);
  } catch {}
}

const data = {
  oak,
  docs,
  fetchedAt: new Date().toISOString(),
  source: "build-embedded-snapshot.mjs",
};

await writeFile(OUT_FILE, JSON.stringify(data, null, 2), "utf8");

const bytes = (await readFile(OUT_FILE)).byteLength;
console.log(
  `OK: wrote tools/embedded.json — ${oak.tactics?.length ?? 0} tactics, ${
    oak.techniques?.length ?? 0
  } techniques, ${Object.keys(docs).length} bodies, ${(bytes / 1024 / 1024).toFixed(2)} MB`,
);
