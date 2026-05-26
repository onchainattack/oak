import { useEffect, useRef } from "react";

function isMermaidBlock(el: HTMLElement): boolean {
  if (el.matches("pre code.language-mermaid, pre code.language-sequenceDiagram")) return true;
  const text = (el.textContent ?? "").trimStart();
  return /^(sequenceDiagram|graph\s|flowchart\s|classDiagram|stateDiagram|erDiagram|gantt|pie\b|gitGraph|mindmap|timeline|journey|quadrantChart|xychart-beta|block-beta|sankey-beta|requirementDiagram|C4Context|C4Container|C4Component|C4Dynamic|C4Deployment|architecture-beta)\b/.test(text);
}

function mermaidTheme() {
  return {
    theme: "base" as const,
    fontFamily: '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    themeVariables: {
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
      lineColor: "rgba(232,233,236,0.16)",
      textColor: "#e8e9ec",
      mainBkg: "#111114",
      actorBkg: "#161618",
      actorBorder: "rgba(232,233,236,0.16)",
      actorTextColor: "#e8e9ec",
      actorLineColor: "rgba(232,233,236,0.08)",
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
let mermaidInstance: Mermaid | null = null;
async function getMermaid(): Promise<Mermaid> {
  if (mermaidInstance) return mermaidInstance;
  const mod = await import("mermaid");
  mod.default.initialize(mermaidTheme());
  mermaidInstance = mod.default;
  return mermaidInstance;
}

/**
 * After the container element has mermaid code blocks rendered by
 * dangerouslySetInnerHTML, replace them with SVG diagrams.
 */
export function useMermaid(containerRef: React.RefObject<HTMLElement | null>, ready: boolean) {
  const renderedRef = useRef<WeakSet<HTMLElement>>(new WeakSet());

  useEffect(() => {
    if (!ready || !containerRef.current) return;

    const allBlocks = containerRef.current.querySelectorAll<HTMLElement>("pre code");
    const blocks = Array.from(allBlocks).filter((el) => !renderedRef.current.has(el) && isMermaidBlock(el));
    if (blocks.length === 0) return;

    // Mark as seen and replace with mermaid containers.
    for (const codeEl of blocks) {
      const pre = codeEl.closest("pre");
      if (!pre) continue;
      renderedRef.current.add(pre);
      const raw = codeEl.textContent ?? "";

      // marked strips the language identifier (e.g. "sequenceDiagram") from
      // fenced code blocks — it becomes the class="language-XXX" attribute.
      // Mermaid needs it as the first line, so prepend it back.
      const lang = codeEl.className.match(/language-(\w+)/)?.[1];
      const source = lang ? `${lang}\n${raw}` : raw;

      const wrapper = document.createElement("div");
      wrapper.className = "mermaid-diagram";
      wrapper.textContent = source;
      pre.replaceWith(wrapper);
    }

    getMermaid()
      .then((mermaid) => mermaid.run({ querySelector: ".mermaid-diagram" }))
      .catch((err) => {
        console.error("mermaid run failed", err);
        const containers = containerRef.current?.querySelectorAll<HTMLElement>(".mermaid-diagram");
        containers?.forEach((c) => c.classList.add("mermaid-fallback"));
      });
  }, [ready, containerRef]);
}
