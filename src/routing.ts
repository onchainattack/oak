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

// File extensions whose hrefs should be canonicalised against the
// current document's path. Anything not in this set (.png, .svg, etc.)
// passes through untouched so browsers can fetch the asset directly.
const RESOLVABLE_EXTENSIONS = [".md", ".yml", ".yaml", ".json", ".bib"];

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

  if (!RESOLVABLE_EXTENSIONS.some((ext) => href.endsWith(ext))) {
    return href;
  }

  // Resolve relative href against the document's filesystem path.
  // Returns the canonical filesystem path (e.g. `examples/2025-02-bybit.md`
  // or `specs/T1.001-modifiable-tax-function.yml`) — the click handler
  // maps this to the in-app `/document/...` route.
  const base = currentPath.includes("/") ? currentPath.split("/").slice(0, -1).join("/") : "";
  const normalized = new URL(href, `https://oak.local/${base ? `${base}/` : ""}`).pathname.replace(
    /^\//,
    "",
  );
  return normalized;
};

// Whether a resolved href points at an in-corpus document the SPA can render
// inside <MarkdownDocument>. Used by click handlers to decide between
// preventDefault + onOpenDoc(target) and letting the browser handle the link.
export const isInAppDocument = (href: string) =>
  RESOLVABLE_EXTENSIONS.some((ext) => href.endsWith(ext));

// Shared click dispatcher for any markdown body rendered via
// dangerouslySetInnerHTML. Bind once per <div> and pass the document's
// own path (for relative-href resolution) plus the in-app navigation
// callback. Handles four cases:
//   1. external (http/https/mailto) → open in a new tab.
//   2. anchor (#section)            → preventDefault + smooth scroll.
//   3. in-corpus document           → preventDefault + onOpenDoc(target).
//   4. anything else (asset path)   → fall through to the browser.
export function handleMarkdownLinkClick(
  event: { target: EventTarget | null; preventDefault: () => void },
  currentPath: string,
  onOpenDoc: (path: string) => void,
) {
  const anchor = (event.target as HTMLElement | null)?.closest?.("a");
  if (!anchor) return;
  const href = anchor.getAttribute("href") ?? "";
  if (!href) return;

  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:")
  ) {
    event.preventDefault();
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }

  if (href.startsWith("#")) {
    event.preventDefault();
    const slug = href.slice(1);
    const heading = window.document.querySelector(`#${CSS.escape(slug)}`);
    if (heading) {
      heading.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }

  // In-app entity routes inserted by linkifyOakIds during build —
  // /technique/OAK-Tn.NNN/ /mitigation/OAK-Mxx/ /software/OAK-Sxx/ /group/OAK-Gxx/.
  // navigateTo + dispatch popstate so useAppRouting picks up the new route
  // and re-renders the appropriate detail page without a full reload.
  const entityMatch = href.match(/^\/(technique|mitigation|software|group)\/(OAK-[A-Z0-9.]+)\/?$/);
  if (entityMatch) {
    event.preventDefault();
    navigateTo(`${entityMatch[1]}/${entityMatch[2]}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
    return;
  }

  const resolved = resolveMarkdownHref(currentPath, href);
  if (isInAppDocument(resolved)) {
    event.preventDefault();
    onOpenDoc(resolved);
  }
}

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
