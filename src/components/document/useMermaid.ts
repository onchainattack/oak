import { useEffect } from "react";
import { mermaidSource } from "./mermaidSource";

function isMermaidBlock(el: HTMLElement): boolean {
  if (el.matches("pre code.language-mermaid, pre code.language-sequenceDiagram")) return true;
  const text = (el.textContent ?? "").trimStart();
  return /^(sequenceDiagram|graph\s|flowchart\s|classDiagram|stateDiagram|erDiagram|gantt|pie\b|gitGraph|mindmap|timeline|journey|quadrantChart|xychart-beta|block-beta|sankey-beta|requirementDiagram|C4Context|C4Container|C4Component|C4Dynamic|C4Deployment|architecture-beta)\b/.test(text);
}

function mermaidTheme() {
  return {
    startOnLoad: false,
    theme: "base" as const,
    fontFamily: '"Geist", ui-sans-serif, system-ui, sans-serif',
    themeVariables: {
      fontSize: "14px",
      darkColor: "#e8e9ec",
      primaryColor: "#161618",
      primaryBorderColor: "rgba(232,233,236,0.16)",
      primaryTextColor: "#e8e9ec",
      secondaryColor: "#111114",
      secondaryBorderColor: "rgba(232,233,236,0.08)",
      secondaryTextColor: "#b8bac0",
      tertiaryColor: "rgba(0,255,209,0.08)",
      tertiaryBorderColor: "rgba(0,255,209,0.4)",
      tertiaryTextColor: "#00ffd1",
      lineColor: "#747780",
      textColor: "#e8e9ec",
      mainBkg: "#111114",
      actorBkg: "#161618",
      actorBorder: "rgba(232,233,236,0.16)",
      actorTextColor: "#e8e9ec",
      actorLineColor: "#747780",
      signalColor: "#00ffd1",
      signalTextColor: "#e8e9ec",
      labelBoxBkgColor: "#111114",
      labelBoxBorderColor: "rgba(232,233,236,0.08)",
      labelTextColor: "#b8bac0",
      loopTextColor: "#b8bac0",
      noteBkgColor: "#111114",
      noteBorderColor: "rgba(232,233,236,0.08)",
      noteTextColor: "#b8bac0",
      activationBkgColor: "rgba(0,255,209,0.08)",
      activationBorderColor: "rgba(0,255,209,0.4)",
      sequenceNumberColor: "#8b8e96",
    },
  };
}

type Mermaid = Awaited<typeof import("mermaid")>["default"];
let mermaidPromise: Promise<Mermaid> | null = null;
let diagramId = 0;
function getMermaid(): Promise<Mermaid> {
  mermaidPromise ??= import("mermaid").then(({ default: mermaid }) => {
    mermaid.initialize(mermaidTheme());
    return mermaid;
  }).catch((error) => {
    mermaidPromise = null;
    throw error;
  });
  return mermaidPromise;
}

/** Render only this document's diagrams and retain readable, scrollable labels. */
export function useMermaid(containerRef: React.RefObject<HTMLElement | null>, ready: boolean, contentKey: string) {
  useEffect(() => {
    const container = containerRef.current;
    if (!ready || !container) return;
    let cancelled = false;

    for (const code of container.querySelectorAll<HTMLElement>("pre code")) {
      if (!isMermaidBlock(code)) continue;
      const pre = code.closest("pre");
      if (!pre) continue;
      const language = code.className.match(/language-(\w+)/)?.[1];
      const source = mermaidSource(code.textContent ?? "", language);
      const wrapper = document.createElement("div");
      wrapper.className = "mermaid-diagram";
      wrapper.dataset.source = source;
      wrapper.textContent = "Rendering diagram…";
      wrapper.setAttribute("aria-busy", "true");
      wrapper.tabIndex = 0;
      wrapper.setAttribute("role", "region");
      wrapper.setAttribute("aria-label", "Diagram — scroll to explore");
      pre.replaceWith(wrapper);
    }

    // Unprocessed wrappers also cover React StrictMode's effect replay.
    const wrappers = Array.from(container.querySelectorAll<HTMLElement>(".mermaid-diagram:not([data-rendered])"));
    if (wrappers.length === 0) return;

    const render = async () => {
      for (const wrapper of wrappers) {
        if (cancelled || !wrapper.isConnected) return;
        const source = wrapper.dataset.source ?? "";
        try {
          const mermaid = await getMermaid();
          await document.fonts.ready;
          if (cancelled || !wrapper.isConnected) return;
          const result = await mermaid.render(`oak-diagram-${++diagramId}`, source);
          if (cancelled || !wrapper.isConnected) return;
          wrapper.innerHTML = result.svg;
          wrapper.dataset.rendered = "true";
          wrapper.removeAttribute("aria-busy");
          const svg = wrapper.querySelector("svg");
          const width = svg?.viewBox.baseVal.width;
          if (svg && width) {
            svg.style.width = `${Math.ceil(width)}px`;
            svg.style.maxWidth = "none";
          }
          result.bindFunctions?.(wrapper);
        } catch (error) {
          if (cancelled || !wrapper.isConnected) return;
          wrapper.classList.add("mermaid-fallback");
          wrapper.removeAttribute("aria-busy");
          wrapper.setAttribute("aria-label", "Diagram source — rendering unavailable");
          wrapper.textContent = source;
          console.error("Diagram rendering failed", error);
        }
      }
    };
    void render();
    return () => { cancelled = true; };
  }, [ready, contentKey, containerRef]);
}
