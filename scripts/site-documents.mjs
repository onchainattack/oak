// Root-level markdown documents published as routes (/document/<NAME>/).
// Shared by build-site-data.mjs (renders the body), build-route-pages.mjs
// (writes the entrypoint) and build-sitemap.mjs (lists the URL) so the three
// cannot drift — a route without a sitemap entry, or a sitemap entry without a
// page, is the failure this list exists to prevent.
//
// README.md is deliberately absent: it is the home route, "/".
export const TOP_LEVEL_DOCUMENTS = [
  "METHODOLOGY",
  "CHANGELOG",
  "ROADMAP",
  "TAXONOMY-GAPS",
  "TAXONOMY-AUDIT",
  "GLOSSARY",
  "PRIOR-ART",
  "COVERAGE",
  "COVERAGE-TARGETS",
  "CROSSWALK",
  "CALIBRATION",
  "PLS",
  "DSR",
  "SPECS",
  "STATS",
  "BACKLOG",
  "RESEARCH-CADENCE",
  "CONTRIBUTING",
  "CODE_OF_CONDUCT",
  "SECURITY",
  "PEER-REVIEW",
  "DISCLAIMER",
  "CORRECTIONS",
  "VERSIONING",
];
