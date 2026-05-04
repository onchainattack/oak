import type { WorkspaceView } from "./types";

// HTML5 history routing. URLs are clean (`/matrix`, `/technique/OAK-T11.001`,
// `/document/CHANGELOG`) — no hash fragment, no `.md` suffix in the URL.
// Backwards-compat: legacy hash URLs (`/#/...`) are normalised at boot.
export const currentPath = () => {
  const raw = window.location.pathname.replace(/^\/?/, "").replace(/\/+$/, "");
  if (raw) return raw;
  const hashRaw = window.location.hash.replace(/^#\/?/, "").replace(/\/+$/, "");
  return hashRaw;
};

export const markdownRouteFromPath = () => {
  const raw = currentPath();
  // /document/<path> → <path>.md (always restore .md for the documentBodies lookup)
  const docMatch = raw.match(/^document\/(.+)$/);
  if (docMatch) {
    const p = docMatch[1];
    return p.endsWith(".md") ? p : `${p}.md`;
  }
  // Legacy / direct: also accept `<path>.md` and `<path>.json|.bib` raw paths.
  return raw.endsWith(".md") || raw.endsWith(".json") || raw.endsWith(".bib") ? raw : "";
};

export const techniqueRouteFromPath = () => {
  const raw = currentPath();
  const match = raw.match(/^technique\/(OAK-T\d+\.\d{3})$/);
  return match ? match[1] : "";
};

export const mitigationRouteFromPath = () => {
  const raw = currentPath();
  const match = raw.match(/^mitigation\/(OAK-M\d+)$/);
  return match ? match[1] : "";
};

export const softwareRouteFromPath = () => {
  const raw = currentPath();
  const match = raw.match(/^software\/(OAK-S\d+)$/);
  return match ? match[1] : "";
};

export const groupRouteFromPath = () => {
  const raw = currentPath();
  const match = raw.match(/^group\/(OAK-G\d+)$/);
  return match ? match[1] : "";
};

export const workspaceRouteFromPath = (): WorkspaceView => {
  const raw = currentPath();
  return ["about", "matrix", "incidents", "actors", "mitigations", "software", "coverage", "contribute"].includes(raw)
    ? (raw as WorkspaceView)
    : "about";
};

export const navigateTo = (path: string) => {
  const cleanPath = path.replace(/^\/+/, "").replace(/\/+$/, "");
  const target = cleanPath ? `/${cleanPath}/` : "/";
  if (window.location.pathname + window.location.search !== target) {
    window.history.pushState(null, "", target);
  }
};

export const docPathToUrl = (mdPath: string) => {
  // documentBodies uses .md path; URL surface drops the .md.
  const stripped = mdPath.replace(/\.md$/, "");
  return `document/${stripped}`;
};

export const resolveMarkdownHref = (currentPath: string, href = "") => {
  if (
    !href ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  if (!href.endsWith(".md")) {
    return href;
  }

  // Resolve relative .md href against the document's filesystem path.
  // Returns the canonical filesystem path (e.g. `examples/2025-02-bybit.md`)
  // — the click handler maps this to the in-app `/document/...` route.
  const base = currentPath.includes("/") ? currentPath.split("/").slice(0, -1).join("/") : "";
  const normalized = new URL(href, `https://oak.local/${base ? `${base}/` : ""}`).pathname.replace(
    /^\//,
    "",
  );
  return normalized;
};

export const REPO_URL = "https://github.com/onchainattack/oak";
export const reportIssueUrl = (kind: string, path: string, title: string) => {
  const liveUrl = typeof window !== "undefined" ? window.location.href : "";
  const cleanTitle = title.replace(/[`*_\[\]]/g, "").slice(0, 80);
  const issueTitle = `[correction] ${kind}: ${cleanTitle}`;
  // Pre-fills the `template=correction.yml` form on the GitHub side. The
  // `doc-path` and `live-url` fields are mapped by ID to the YAML form.
  const params = new URLSearchParams({
    template: "correction.yml",
    title: issueTitle,
    "doc-path": path,
    "live-url": liveUrl,
  });
  return `${REPO_URL}/issues/new?${params.toString()}`;
};
