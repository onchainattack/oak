import { useEffect, useState } from "react";
import {
  docPathToUrl,
  groupRouteFromPath,
  markdownRouteFromPath,
  mitigationRouteFromPath,
  navigateTo,
  softwareRouteFromPath,
  techniqueRouteFromPath,
  workspaceRouteFromPath,
} from "../routing";
import type { WorkspaceView } from "../types";

// All app-level routing state plus the popstate / hash-legacy listener and
// the navigation helpers that mutate URL + state in lockstep. App.tsx is
// the only consumer; pulled out so the App component reads as a UI shell
// rather than a router implementation.
export function useAppRouting() {
  const [docPath, setDocPath] = useState(markdownRouteFromPath);
  const [techniqueRoute, setTechniqueRoute] = useState(techniqueRouteFromPath);
  const [mitigationRoute, setMitigationRoute] = useState(mitigationRouteFromPath);
  const [softwareRoute, setSoftwareRoute] = useState(softwareRouteFromPath);
  const [groupRoute, setGroupRoute] = useState(groupRouteFromPath);
  const [activeView, setActiveView] = useState<WorkspaceView>(workspaceRouteFromPath);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const clearAllRoutes = () => {
    setDocPath("");
    setTechniqueRoute("");
    setMitigationRoute("");
    setSoftwareRoute("");
    setGroupRoute("");
  };

  const navigateView = (view: WorkspaceView) => {
    navigateTo(view === "about" ? "" : view);
    setActiveView(view);
    clearAllRoutes();
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDoc = (path: string) => {
    navigateTo(docPathToUrl(path));
    clearAllRoutes();
    setDocPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openTechnique = (id: string) => {
    navigateTo(`technique/${id}`);
    clearAllRoutes();
    setTechniqueRoute(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openMitigation = (id: string) => {
    navigateTo(`mitigation/${id}`);
    clearAllRoutes();
    setMitigationRoute(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openSoftware = (id: string) => {
    navigateTo(`software/${id}`);
    clearAllRoutes();
    setSoftwareRoute(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openGroup = (id: string) => {
    navigateTo(`group/${id}`);
    clearAllRoutes();
    setGroupRoute(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Normalize legacy hash URLs once at boot — strip `#/` and rewrite to
    // a clean pathname so old links keep resolving.
    if (window.location.hash && window.location.hash.startsWith("#/")) {
      const stripped = window.location.hash.replace(/^#\/?/, "");
      const target = `/${stripped.replace(/\.md$/, "").replace(/^([^/]+\.md)$/, (_m, p) => `document/${p.replace(/\.md$/, "")}`)}`;
      window.history.replaceState(null, "", target);
    }
    const onPopState = () => {
      const nextDocPath = markdownRouteFromPath();
      const nextTechnique = techniqueRouteFromPath();
      const nextMitigation = mitigationRouteFromPath();
      const nextSoftware = softwareRouteFromPath();
      const nextGroup = groupRouteFromPath();
      setDocPath(nextDocPath);
      setTechniqueRoute(nextTechnique);
      setMitigationRoute(nextMitigation);
      setSoftwareRoute(nextSoftware);
      setGroupRoute(nextGroup);
      if (!nextDocPath && !nextTechnique && !nextMitigation && !nextSoftware && !nextGroup) {
        setActiveView(workspaceRouteFromPath());
      }
    };
    onPopState();
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return {
    docPath,
    techniqueRoute,
    mitigationRoute,
    softwareRoute,
    groupRoute,
    activeView,
    sidebarOpen,
    setActiveView,
    setSidebarOpen,
    clearAllRoutes,
    navigateView,
    openDoc,
    openTechnique,
    openMitigation,
    openSoftware,
    openGroup,
  };
}
