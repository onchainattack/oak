import { useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";
import FundFlowGraph from "./FundFlowGraph";
import type { Flow } from "./layout";

/**
 * Mount interactive fund-flow graphs into the placeholders that the site
 * build emits for ```oak-flow blocks (scripts/build-site-data.mjs). The data
 * travels in the placeholder's data-flow attribute; the static edge table
 * next to it stays as the no-JS / prerender fallback.
 */
export function useFundFlow(containerRef: React.RefObject<HTMLElement | null>, ready: boolean, contentKey: string) {
  useEffect(() => {
    const container = containerRef.current;
    if (!ready || !container) return;
    const mounted: { el: HTMLElement; root: Root }[] = [];
    for (const el of container.querySelectorAll<HTMLElement>(".oak-flow-graph[data-flow]:not([data-mounted])")) {
      let flow: Flow;
      try {
        flow = JSON.parse(el.dataset.flow ?? "");
      } catch {
        continue;
      }
      el.dataset.mounted = "true";
      el.textContent = "";
      const root = createRoot(el);
      root.render(<FundFlowGraph flow={flow} />);
      mounted.push({ el, root });
    }
    return () => {
      for (const { el, root } of mounted) {
        root.unmount();
        delete el.dataset.mounted;
      }
    };
  }, [ready, contentKey, containerRef]);
}
