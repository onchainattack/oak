import { useEffect } from "react";
import { siteData } from "../data/generated";
import { techniqueById } from "../lib";
import type { WorkspaceView } from "../types";

type DocumentMetaInput = {
  activeView: WorkspaceView;
  techniqueRoute: string;
  mitigationRoute: string;
  softwareRoute: string;
  groupRoute: string;
  docPath: string;
};

// Side-effect hook that keeps <title>, <meta name="description">, the
// canonical link, and Open Graph / Twitter tags aligned with the
// currently-rendered route. Exists outside React's render output so
// the head mutations are not rerun by component subtree changes.
export function useDocumentMeta({
  activeView,
  techniqueRoute,
  mitigationRoute,
  softwareRoute,
  groupRoute,
  docPath,
}: DocumentMetaInput) {
  useEffect(() => {
    const baseTitle = "OAK — OnChain Attack Knowledge";
    const baseDescription =
      "OAK is a common language for on-chain adversary behavior — open vendor-neutral taxonomy of crypto attack Tactics and Techniques.";
    let pageLabel = "";
    let pageDescription = baseDescription;
    if (techniqueRoute) {
      const t = techniqueById.get(techniqueRoute);
      pageLabel = t ? `${t.id} ${t.name}` : techniqueRoute;
      pageDescription = t
        ? `${t.id} ${t.name}: OAK Technique covering ${t.parentTactics.join(", ")} across ${t.chains.join(", ")} attack surfaces.`
        : `${techniqueRoute}: OAK Technique in the OnChain Attack Knowledge taxonomy.`;
    } else if (mitigationRoute) {
      const m = siteData.mitigations.find((x) => x.id === mitigationRoute);
      pageLabel = m ? `${m.id} ${m.name}` : mitigationRoute;
      pageDescription = m
        ? `${m.id} ${m.name}: OAK Mitigation for ${m.audience || "defenders"} mapped to ${m.mapsToTechniques.length} Technique(s).`
        : `${mitigationRoute}: OAK Mitigation in the OnChain Attack Knowledge taxonomy.`;
    } else if (softwareRoute) {
      const s = siteData.software.find((x) => x.id === softwareRoute);
      pageLabel = s ? `${s.id} ${s.name}` : softwareRoute;
      pageDescription = s
        ? `${s.id} ${s.name}: OAK Software entry with observed links to ${s.observedTechniques.length} Technique(s).`
        : `${softwareRoute}: OAK Software entry in the OnChain Attack Knowledge taxonomy.`;
    } else if (groupRoute) {
      const g = siteData.actors.find((x) => x.id === groupRoute);
      pageLabel = g ? g.title : groupRoute;
      pageDescription = g
        ? `${g.title}: OAK Threat Actor entry with observed links to ${g.observedTechniques.length} Technique(s).`
        : `${groupRoute}: OAK Threat Actor entry in the OnChain Attack Knowledge taxonomy.`;
    } else if (docPath) {
      const idx = siteData.documentIndex[docPath as keyof typeof siteData.documentIndex];
      pageLabel = (idx as { title?: string } | undefined)?.title ?? docPath;
      pageDescription = `${pageLabel}: source document in the OAK on-chain adversary behavior knowledge base.`;
    } else {
      const viewLabel: Record<string, string> = {
        about: "Overview",
        matrix: "Matrix",
        incidents: "Incidents",
        actors: "Threat Actors",
        mitigations: "Mitigations",
        software: "Software",
        datasources: "Data Sources",
        coverage: "Coverage & Gaps",
        contribute: "Contribute",
      };
      pageLabel = viewLabel[activeView] ?? "";
      pageDescription = `${pageLabel || "OAK"}: open vendor-neutral knowledge base of adversary Tactics and Techniques observed against on-chain assets.`;
    }
    const pageTitle = pageLabel ? `${pageLabel} · ${baseTitle}` : baseTitle;
    const canonicalPath = window.location.pathname === "/" ? "/" : `${window.location.pathname.replace(/\/+$/, "")}/`;
    const canonicalUrl = `https://onchainattack.org${canonicalPath}`;
    const setMeta = (selector: string, attribute: "name" | "property", key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attribute, key);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    document.title = pageTitle;
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", canonicalUrl);
    setMeta('meta[name="description"]', "name", "description", pageDescription);
    setMeta('meta[property="og:title"]', "property", "og:title", pageTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", pageDescription);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", pageTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", pageDescription);
  }, [activeView, techniqueRoute, mitigationRoute, softwareRoute, groupRoute, docPath]);
}
