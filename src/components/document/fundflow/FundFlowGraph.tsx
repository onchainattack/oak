import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FAMILY_LABEL,
  GAP_X,
  NODE_H,
  NODE_W,
  ROLE_FAMILY,
  ROLE_TEXT,
  fmtAmount,
  layoutFlow,
  linkLabel,
  shortAddr,
  type Flow,
  type FlowEdge,
  type Link,
} from "./layout";

type Selection = { kind: "node"; id: string } | { kind: "link"; id: string } | null;

const MIN_SCALE = 0.4;
const MAX_SCALE = 1.6;

function CopyButton({ value }: { value: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="ff-copy"
      onClick={() => {
        void navigator.clipboard?.writeText(value).then(() => {
          setDone(true);
          window.setTimeout(() => setDone(false), 1200);
        });
      }}
    >
      {done ? "Copied" : "Copy"}
    </button>
  );
}

function TransferRow({ e, nodeLabel }: { e: FlowEdge; nodeLabel: (id: string) => string }) {
  const when = e.time ? e.time.replace("T", " ").replace(/:\d\dZ$|Z$/, "") : "";
  const until = e.time_last ? ` → ${e.time_last.replace("T", " ").replace(/:\d\dZ$|Z$/, "")}` : "";
  return (
    <li className="ff-transfer">
      <div className="ff-transfer-main">
        <span className="ff-amount">
          {fmtAmount(e.amount, true)} {e.asset}
          {e.tx_count && e.tx_count > 1 ? <span className="ff-muted"> in {e.tx_count} txs</span> : null}
        </span>
        <span className="ff-muted">
          {nodeLabel(e.from)} → {nodeLabel(e.to)}
        </span>
      </div>
      <div className="ff-transfer-meta">
        {when && <span>{when}{until} UTC</span>}
        {e.technique && <code>{e.technique}</code>}
        <span className={e.verified === "oak" ? "ff-badge ff-badge-oak" : "ff-badge"}>
          {e.verified === "oak" ? "traced by OAK" : `per ${e.source ?? "source"}`}
        </span>
      </div>
      {e.tx && (
        <div className="ff-tx">
          {e.txUrl ? (
            <a href={e.txUrl} target="_blank" rel="noopener noreferrer"><code>{e.tx}</code></a>
          ) : (
            <code>{e.tx}</code>
          )}
          {e.tx_count && e.tx_count > 1 ? <span className="ff-muted"> (first of {e.tx_count})</span> : null}
        </div>
      )}
    </li>
  );
}

export default function FundFlowGraph({ flow }: { flow: Flow }) {
  const layout = useMemo(() => layoutFlow(flow), [flow]);
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<Selection>(null);
  const [scale, setScale] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  const nodeLabel = useCallback(
    (id: string) => {
      const n = layout.nodes.get(id)?.node;
      return n ? n.label || ROLE_TEXT[n.role] || n.id : id;
    },
    [layout],
  );

  const fit = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const s = Math.min(1, (vp.clientWidth - 2) / layout.width, (vp.clientHeight - 2) / layout.height);
    setScale(Math.max(MIN_SCALE, Math.round(s * 100) / 100));
  }, [layout.width]);

  // Open on the centre of the story: the receiver (or the busiest node),
  // not the empty top-left corner of a wide graph.
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const nodes = [...layout.nodes.values()];
    const deg = (id: string) => layout.links.filter((l) => l.from === id || l.to === id).length;
    const focusNode =
      nodes.find((n) => n.node.role === "attacker-receiver") ??
      nodes.reduce((a, b) => (deg(b.node.id) > deg(a.node.id) ? b : a), nodes[0]);
    if (!focusNode) return;
    vp.scrollLeft = Math.max(0, (focusNode.x + NODE_W / 2) * scale - vp.clientWidth / 2);
    vp.scrollTop = Math.max(0, (focusNode.y + NODE_H / 2) * scale - vp.clientHeight / 2);
    // only on first layout and when the size mode changes, not on every zoom step
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout, expanded]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (ev: KeyboardEvent) => ev.key === "Escape" && setExpanded(false);
    window.addEventListener("keydown", onKey);
    document.body.classList.add("ff-lock");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("ff-lock");
    };
  }, [expanded]);

  // focus = hovered node, else selected node/link endpoints
  const focus = useMemo(() => {
    const ids = new Set<string>();
    const linkIds = new Set<string>();
    const nodeId = hover ?? (selected?.kind === "node" ? selected.id : null);
    if (nodeId) {
      ids.add(nodeId);
      for (const l of layout.links) {
        if (l.from === nodeId || l.to === nodeId) {
          linkIds.add(l.id);
          ids.add(l.from);
          ids.add(l.to);
        }
      }
    } else if (selected?.kind === "link") {
      const l = layout.links.find((x) => x.id === selected.id);
      if (l) {
        linkIds.add(l.id);
        ids.add(l.from);
        ids.add(l.to);
      }
    }
    return ids.size ? { ids, linkIds } : null;
  }, [hover, selected, layout]);

  // ports: spread several links on one side of a node so they don't overlap
  const ports = useMemo(() => {
    const out = new Map<string, Link[]>();
    const inn = new Map<string, Link[]>();
    for (const l of layout.links) {
      (out.get(l.from) ?? out.set(l.from, []).get(l.from)!).push(l);
      (inn.get(l.to) ?? inn.set(l.to, []).get(l.to)!).push(l);
    }
    const y = (id: string) => layout.nodes.get(id)?.y ?? 0;
    const portY = new Map<string, { y1: number; y2: number }>();
    const spread = (list: Link[], end: "from" | "to") => {
      const sorted = [...list].sort((a, b) => y(end === "from" ? a.to : a.from) - y(end === "from" ? b.to : b.from));
      sorted.forEach((l, i) => {
        const node = layout.nodes.get(end === "from" ? l.from : l.to)!;
        const step = Math.min(10, (NODE_H - 20) / Math.max(1, sorted.length - 1));
        const off = sorted.length === 1 ? 0 : (i - (sorted.length - 1) / 2) * step;
        const cur = portY.get(l.id) ?? { y1: 0, y2: 0 };
        if (end === "from") cur.y1 = node.y + NODE_H / 2 + off;
        else cur.y2 = node.y + NODE_H / 2 + off;
        portY.set(l.id, cur);
      });
    };
    out.forEach((list) => spread(list, "from"));
    inn.forEach((list) => spread(list, "to"));
    return portY;
  }, [layout]);

  // degree per node: a fan-out labels near the targets, a fan-in near the sources
  const degree = useMemo(() => {
    const out = new Map<string, number>();
    const inn = new Map<string, number>();
    for (const l of layout.links) {
      out.set(l.from, (out.get(l.from) ?? 0) + 1);
      inn.set(l.to, (inn.get(l.to) ?? 0) + 1);
    }
    return { out, inn };
  }, [layout]);

  const geometry = useCallback(
    (l: Link) => {
      const a = layout.nodes.get(l.from)!;
      const b = layout.nodes.get(l.to)!;
      const p = ports.get(l.id)!;
      const x1 = a.x + NODE_W;
      const x2 = b.x - 6;
      const backwards = x2 <= x1;
      const dx = backwards ? 80 : Math.max(40, (x2 - x1) / 2);
      const c1x = x1 + dx;
      const c2x = backwards ? b.x - dx : x2 - dx;
      const d = `M${x1},${p.y1} C${c1x},${p.y1} ${c2x},${p.y2} ${x2},${p.y2}`;
      const fanOut = (degree.out.get(l.from) ?? 0) > 2;
      const fanIn = (degree.inn.get(l.to) ?? 0) > 2;
      const t = fanOut && !fanIn ? 0.78 : fanIn && !fanOut ? 0.22 : 0.5;
      const u = 1 - t;
      const lx = u * u * u * x1 + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * x2;
      const ly = u * u * u * p.y1 + 3 * u * u * t * p.y1 + 3 * u * t * t * p.y2 + t * t * t * p.y2;
      return { d, lx, ly };
    },
    [layout, ports, degree],
  );

  const families = useMemo(
    () => [...new Set(flow.nodes.map((n) => ROLE_FAMILY[n.role] ?? "neutral"))],
    [flow.nodes],
  );

  const selNode = selected?.kind === "node" ? layout.nodes.get(selected.id)?.node : undefined;
  const selLink = selected?.kind === "link" ? layout.links.find((l) => l.id === selected.id) : undefined;
  const nodeTransfers = selNode
    ? flow.edges.filter((e) => e.from === selNode.id || e.to === selNode.id)
    : [];

  const traced = flow.edges.filter((e) => e.verified === "oak").length;

  return (
    <div className={expanded ? "ff ff-expanded" : "ff"}>
      <div className="ff-toolbar">
        <div className="ff-legend" aria-label="Legend">
          {families.map((f) => (
            <span key={f} className={`ff-key ff-fam-${f}`}>
              <i aria-hidden="true" />
              {FAMILY_LABEL[f]}
            </span>
          ))}
          <span className="ff-key ff-key-line">
            <svg width="28" height="8" aria-hidden="true"><line x1="0" y1="4" x2="28" y2="4" /></svg>
            traced by OAK
          </span>
          <span className="ff-key ff-key-line ff-key-dashed">
            <svg width="28" height="8" aria-hidden="true"><line x1="0" y1="4" x2="28" y2="4" /></svg>
            per cited source
          </span>
        </div>
        <div className="ff-controls">
          <button type="button" onClick={() => setScale((s) => Math.max(MIN_SCALE, +(s - 0.1).toFixed(2)))} aria-label="Zoom out">−</button>
          <span className="ff-scale">{Math.round(scale * 100)}%</span>
          <button type="button" onClick={() => setScale((s) => Math.min(MAX_SCALE, +(s + 0.1).toFixed(2)))} aria-label="Zoom in">+</button>
          <button type="button" onClick={fit}>Fit</button>
          <button type="button" onClick={() => setScale(1)}>100%</button>
          <button type="button" className="ff-fullscreen" onClick={() => setExpanded((v) => !v)}>{expanded ? "Close" : "Full screen"}</button>
        </div>
      </div>

      <div
        className="ff-viewport"
        ref={viewportRef}
        tabIndex={0}
        role="region"
        aria-label="Fund-flow graph — scroll to explore, click a wallet or an arrow for details"
      >
        <div className="ff-canvas" style={{ width: layout.width * scale, height: layout.height * scale }}>
          <div
            className="ff-stage"
            style={{ width: layout.width, height: layout.height, transform: `scale(${scale})` }}
            onClick={(ev) => {
              if (ev.target === ev.currentTarget) setSelected(null);
            }}
          >
            <svg className="ff-links" width={layout.width} height={layout.height} aria-hidden="true">
              <defs>
                <marker id="ff-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                  <path d="M0,0 L8,4 L0,8 z" />
                </marker>
              </defs>
              {layout.links.map((l) => {
                const { d } = geometry(l);
                const dim = focus && !focus.linkIds.has(l.id);
                const on = focus?.linkIds.has(l.id);
                return (
                  <g key={l.id} className={`ff-link${l.verified ? "" : " ff-link-source"}${dim ? " ff-dim" : ""}${on ? " ff-on" : ""}`}>
                    <path d={d} className="ff-link-hit" onClick={() => setSelected({ kind: "link", id: l.id })} />
                    <path d={d} className="ff-link-line" markerEnd="url(#ff-arrow)" />
                  </g>
                );
              })}
            </svg>

            {layout.links.map((l) => {
              const { lx: mx, ly: my } = geometry(l);
              const lines = linkLabel(l);
              const shown = lines.slice(0, 2);
              const more = lines.length - shown.length;
              const dim = focus && !focus.linkIds.has(l.id);
              return (
                <button
                  type="button"
                  key={`label-${l.id}`}
                  className={`ff-label${l.verified ? "" : " ff-label-source"}${dim ? " ff-dim" : ""}${selected?.kind === "link" && selected.id === l.id ? " ff-selected" : ""}`}
                  style={{ left: mx, top: my, maxWidth: GAP_X + 40 }}
                  onClick={() => setSelected({ kind: "link", id: l.id })}
                  title={lines.join("\n")}
                >
                  {shown.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                  {more > 0 && <span className="ff-muted">+{more} more</span>}
                </button>
              );
            })}

            {[...layout.nodes.values()].map(({ node, x, y }) => {
              const fam = ROLE_FAMILY[node.role] ?? "neutral";
              const dim = focus && !focus.ids.has(node.id);
              const isSel = selected?.kind === "node" && selected.id === node.id;
              return (
                <button
                  type="button"
                  key={node.id}
                  className={`ff-node ff-fam-${fam}${dim ? " ff-dim" : ""}${isSel ? " ff-selected" : ""}`}
                  style={{ left: x, top: y, width: NODE_W, height: NODE_H }}
                  onMouseEnter={() => setHover(node.id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(node.id)}
                  onBlur={() => setHover(null)}
                  onClick={() => setSelected(isSel ? null : { kind: "node", id: node.id })}
                >
                  <span className="ff-node-title">{node.label || ROLE_TEXT[node.role] || node.id}</span>
                  <span className="ff-node-meta">
                    <span className="ff-role">{ROLE_TEXT[node.role] ?? node.role}</span>
                    <span className={`ff-chain ff-chain-${node.chain}`}>{node.chain}</span>
                  </span>
                  {node.address && <code className="ff-node-addr">{shortAddr(node.address)}</code>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="ff-details" aria-live="polite">
        {!selNode && !selLink && (
          <p className="ff-hint">
            Click a wallet or an arrow to see full addresses and transactions. {traced} of {flow.edges.length} transfers
            traced by OAK on-chain{flow.as_of ? `, as of ${flow.as_of.replace("T", " ")}` : ""}.
          </p>
        )}
        {selNode && (
          <div className="ff-card">
            <div className="ff-card-head">
              <strong>{selNode.label || ROLE_TEXT[selNode.role]}</strong>
              <span className="ff-muted">
                {ROLE_TEXT[selNode.role] ?? selNode.role} · {selNode.chain}
              </span>
              <button type="button" className="ff-close" onClick={() => setSelected(null)} aria-label="Close details">×</button>
            </div>
            {selNode.address ? (
              <div className="ff-address">
                {selNode.explorer ? (
                  <a href={selNode.explorer} target="_blank" rel="noopener noreferrer"><code>{selNode.address}</code></a>
                ) : (
                  <code>{selNode.address}</code>
                )}
                <CopyButton value={selNode.address} />
              </div>
            ) : (
              <p className="ff-muted">No single address: this node stands for several contracts or an off-chain action.</p>
            )}
            <ul className="ff-transfers">
              {nodeTransfers.map((e, i) => (
                <TransferRow key={`${e.from}-${e.to}-${e.asset}-${i}`} e={e} nodeLabel={nodeLabel} />
              ))}
            </ul>
          </div>
        )}
        {selLink && (
          <div className="ff-card">
            <div className="ff-card-head">
              <strong>
                {nodeLabel(selLink.from)} → {nodeLabel(selLink.to)}
              </strong>
              <span className="ff-muted">{selLink.items.length} transfer group{selLink.items.length > 1 ? "s" : ""}</span>
              <button type="button" className="ff-close" onClick={() => setSelected(null)} aria-label="Close details">×</button>
            </div>
            <ul className="ff-transfers">
              {selLink.items.map((e, i) => (
                <TransferRow key={`${e.asset}-${i}`} e={e} nodeLabel={nodeLabel} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
