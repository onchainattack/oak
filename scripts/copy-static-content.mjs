import { cp, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "dist");

const copyTargets = [
  "actors",
  "data-sources",
  "examples",
  "mitigations",
  "software",
  "tactics",
  "techniques",
  "README.md",
  "CHANGELOG.md",
  "CODE_OF_CONDUCT.md",
  "CONTRIBUTING.md",
  "CORRECTIONS.md",
  "COVERAGE.md",
  "CROSSWALK.md",
  "DISCLAIMER.md",
  "GLOSSARY.md",
  "PRIOR-ART.md",
  "PEER-REVIEW.md",
  "ROADMAP.md",
  "SECURITY.md",
  "TAXONOMY-GAPS.md",
  "LICENSE-code",
  "LICENSE-content",
  "citations.bib",
  "tools/oak.json",
  "tools/oak-stix.json",
];

await mkdir(outDir, { recursive: true });

for (const target of copyTargets) {
  await cp(path.join(root, target), path.join(outDir, target), {
    recursive: true,
    force: true,
  });
}
