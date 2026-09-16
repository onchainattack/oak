// Shared repo-path → site-route mapping and relative-link rewriting.
//
// Markdown bodies link to sibling source files (`../techniques/T9.004-….md`).
// Two renderers consume those bodies — the prerendered route pages
// (build-route-pages.mjs) and the embedded HTML the SPA hydrates
// (build-site-data.mjs) — and both must rewrite those hrefs to the route
// surface. They used to carry independent copies of this logic and only the
// prerenderer had it, so the SPA shipped thousands of raw `.md` hrefs that
// robots.txt disallows; Search Console reported the site advertising URLs it
// forbids crawling. Keeping the map in one module is what stops that
// divergence coming back.

import { TOP_LEVEL_DOCUMENTS } from "./site-documents.mjs";

const ABSOLUTE_HREF = /^(https?:|mailto:|tel:|data:|#|\/)/;

const normalise = (p) => p.replace(/^\.\//, "");

// Minimal posix join+normalize; avoids importing node:path into the shared path.
const resolveRepoPath = (docPath, href) => {
  const base = docPath.includes("/") ? docPath.slice(0, docPath.lastIndexOf("/")) : "";
  const segments = `${base ? `${base}/` : ""}${href}`.split("/");
  const out = [];
  for (const seg of segments) {
    if (!seg || seg === ".") continue;
    if (seg === "..") out.pop();
    else out.push(seg);
  }
  return out.join("/");
};

/**
 * Build the repo-relative-source → canonical-route map.
 *
 * @param {object} oak            parsed tools/oak.json
 * @param {string[]} investigationFiles  basenames under investigations/
 */
export const buildRouteMap = (oak, investigationFiles = []) => {
  const routeForSource = new Map();
  const register = (sourceFile, target) => {
    if (sourceFile) routeForSource.set(normalise(sourceFile), target);
  };

  for (const tactic of oak.tactics ?? []) register(tactic.source_file, `/tactic/${tactic.id}/`);
  for (const technique of oak.techniques ?? []) register(technique.source_file, `/technique/${technique.id}/`);
  for (const mitigation of oak.mitigations ?? []) register(mitigation.source_file, `/mitigation/${mitigation.id}/`);
  for (const sw of oak.software ?? []) register(sw.source_file, `/software/${sw.id}/`);
  for (const group of oak.groups ?? []) register(group.source_file, `/group/${group.id}/`);
  for (const example of oak.examples ?? []) {
    if (example.file) {
      register(`examples/${example.file}`, `/document/examples/${example.file.replace(/\.md$/, "")}/`);
    }
  }
  for (const dataSource of oak.data_sources ?? oak.dataSources ?? []) {
    if (!dataSource.source_file) continue;
    const slug = dataSource.source_file.split("/").pop().replace(/\.md$/, "");
    register(dataSource.source_file, `/document/data-sources/${slug}/`);
  }
  for (const doc of TOP_LEVEL_DOCUMENTS) register(`${doc}.md`, `/document/${doc}/`);
  for (const file of investigationFiles) {
    register(`investigations/${file}`, `/document/investigations/${file.replace(/\.md$/, "")}/`);
  }
  register("README.md", "/");
  return routeForSource;
};

/**
 * Rewrite every in-repo relative href/src in `html` to its site route.
 *
 * Unmapped targets fall back to a root-anchored path, matching where
 * copy-static-content.mjs places the raw file. Any `.md` that reaches the
 * fallback is a real gap in the map rather than a link we want to emit —
 * `unmappedMarkdown` collects those so callers can report instead of
 * silently shipping a disallowed URL.
 */
export const rewriteRelativeLinks = (html, docPath, routeForSource, unmappedMarkdown) =>
  html.replace(/\s(href|src)="([^"]*)"/g, (match, attr, value) => {
    if (!value || ABSOLUTE_HREF.test(value)) return match;
    const [target, hash] = value.split("#");
    if (!target) return match;
    const resolved = resolveRepoPath(docPath, target);
    const mapped = routeForSource.get(resolved);
    if (!mapped && resolved.endsWith(".md") && unmappedMarkdown) {
      unmappedMarkdown.add(`${docPath} → ${resolved}`);
    }
    const anchored = resolved.startsWith("public/")
      ? `/${resolved.slice("public/".length)}`
      : `/${resolved}`;
    return ` ${attr}="${mapped ?? anchored}${hash ? `#${hash}` : ""}"`;
  });
