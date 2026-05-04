import { useMemo, useState } from "react";

type GraphNode = {
  id: string;
  name: string;
  x: number;
  y: number;
  kind: "mitigation" | "software" | "actor";
};

export default function RelationshipGraph({
  centerId,
  centerLabel,
  mitigations,
  software,
  actors,
  onOpenMitigation,
  onOpenSoftware,
  onOpenActor,
}: {
  centerId: string;
  centerLabel: string;
  mitigations: { id: string; name: string }[];
  software: { id: string; name: string }[];
  actors: { id: string; name: string }[];
  onOpenMitigation: (id: string) => void;
  onOpenSoftware: (id: string) => void;
  onOpenActor: (id: string) => void;
}) {
  const W = 920;
  const H = 480;
  const cx = W / 2;
  const cy = H / 2;
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const placeArc = (
    items: { id: string; name: string }[],
    kind: GraphNode["kind"],
    startAngle: number,
    endAngle: number,
    radius: number,
  ): GraphNode[] => {
    if (items.length === 0) return [];
    if (items.length === 1) {
      const a = (startAngle + endAngle) / 2;
      return [{ ...items[0], kind, x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) }];
    }
    const step = (endAngle - startAngle) / (items.length - 1);
    return items.map((item, i) => {
      const a = startAngle + step * i;
      return { ...item, kind, x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
    });
  };

  // Place each axis on its own arc range. More items = larger arc.
  const RAD_OUTER = Math.min(W, H) * 0.42;
  const RAD_INNER = Math.min(W, H) * 0.36;

  // Mitigations: left half (top-down arc)
  const mitNodes = placeArc(mitigations, "mitigation", Math.PI * 0.55, Math.PI * 1.45, RAD_OUTER);
  // Software: right half (top-down arc)
  const swNodes = placeArc(software, "software", Math.PI * -0.45, Math.PI * 0.45, RAD_INNER);
  // Actors: top arc
  const actorNodes = placeArc(actors, "actor", Math.PI * -0.95, Math.PI * -0.55, RAD_OUTER);

  const allNodes = [...mitNodes, ...swNodes, ...actorNodes];

  const isDimmed = (nodeId: string) =>
    hoveredId !== null && hoveredId !== nodeId && hoveredId !== "center";
  const isHighlighted = (nodeId: string) => hoveredId === nodeId;

  const colorByKind = {
    mitigation: "#00ffd1",
    software: "#ff7a70",
    actor: "#ffb84a",
  };

  const renderEdge = (node: GraphNode) => {
    const color = colorByKind[node.kind];
    const dimmed = isDimmed(node.id);
    const highlighted = isHighlighted(node.id) || hoveredId === "center";
    return (
      <line
        key={`edge-${node.id}`}
        x1={cx}
        y1={cy}
        x2={node.x}
        y2={node.y}
        stroke={color}
        strokeWidth={highlighted ? 2 : 1}
        opacity={dimmed ? 0.08 : highlighted ? 0.85 : 0.45}
        style={{ transition: "all 180ms ease" }}
      />
    );
  };

  const onNodeClick = (node: GraphNode) => {
    if (node.kind === "mitigation") onOpenMitigation(node.id);
    else if (node.kind === "software") onOpenSoftware(node.id);
    else if (node.kind === "actor") onOpenActor(node.id);
  };

  const renderNode = (node: GraphNode) => {
    const color = colorByKind[node.kind];
    const dimmed = isDimmed(node.id);
    const highlighted = isHighlighted(node.id);
    const idShort = node.id.replace("OAK-", "");
    // chip width based on label length
    const charWidth = 7.5;
    const chipW = idShort.length * charWidth + 14;
    const chipH = 22;
    return (
      <g
        key={node.id}
        className={"rg-node" + (highlighted ? " is-hovered" : "")}
        onClick={() => onNodeClick(node)}
        onMouseEnter={() => setHoveredId(node.id)}
        onMouseLeave={() => setHoveredId(null)}
        style={{ cursor: "pointer", opacity: dimmed ? 0.25 : 1, transition: "opacity 180ms ease" }}
      >
        {/* chip background */}
        <rect
          x={node.x - chipW / 2}
          y={node.y - chipH / 2}
          width={chipW}
          height={chipH}
          rx={6}
          fill="rgba(15, 15, 18, 0.95)"
          stroke={color}
          strokeWidth={highlighted ? 2 : 1.2}
          style={{ transition: "all 180ms ease" }}
        />
        <text
          x={node.x}
          y={node.y + 4}
          textAnchor="middle"
          fill={color}
          fontSize={11}
          fontFamily="var(--mono)"
          fontWeight={600}
          style={{ pointerEvents: "none" }}
        >
          {idShort}
        </text>
        {/* full name on hover */}
        {highlighted && (
          <text
            x={node.x}
            y={node.y + chipH / 2 + 14}
            textAnchor="middle"
            fill="var(--ink-strong)"
            fontSize={10}
            fontFamily="var(--mono)"
            fontWeight={500}
            style={{ pointerEvents: "none" }}
          >
            {node.name.length > 36 ? node.name.slice(0, 34) + "…" : node.name}
          </text>
        )}
        <title>{`${node.id} — ${node.name}`}</title>
      </g>
    );
  };

  const centerHovered = hoveredId === "center";

  return (
    <div className="relationship-graph">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Relationship neighborhood">
        {/* Edges (drawn first, behind nodes) */}
        {allNodes.map(renderEdge)}

        {/* Center node */}
        <g
          onMouseEnter={() => setHoveredId("center")}
          onMouseLeave={() => setHoveredId(null)}
          style={{ cursor: "default" }}
        >
          <circle
            cx={cx}
            cy={cy}
            r={36}
            fill="rgba(0, 255, 209, 0.06)"
            stroke="#00ffd1"
            strokeWidth={centerHovered ? 3 : 2}
            style={{ transition: "all 200ms ease" }}
          />
          {/* pulsing inner ring */}
          <circle
            cx={cx}
            cy={cy}
            r={36}
            fill="none"
            stroke="#00ffd1"
            strokeWidth={1}
            opacity={0.4}
          >
            <animate attributeName="r" values="36;48;36" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
          <text
            x={cx}
            y={cy - 2}
            textAnchor="middle"
            fill="#00ffd1"
            fontSize={12}
            fontFamily="var(--mono)"
            fontWeight={700}
          >
            {centerId.replace("OAK-", "")}
          </text>
          <text
            x={cx}
            y={cy + 14}
            textAnchor="middle"
            fill="var(--ink)"
            fontSize={9}
            fontFamily="var(--mono)"
          >
            {centerLabel.length > 30 ? centerLabel.slice(0, 28) + "…" : centerLabel}
          </text>
        </g>

        {/* Nodes (drawn on top) */}
        {allNodes.map(renderNode)}
      </svg>
      <div className="rg-legend">
        <span className="rg-legend-item">
          <span className="rg-key rg-key-m" />
          <span>Mitigations · {mitigations.length}</span>
        </span>
        <span className="rg-legend-item">
          <span className="rg-key rg-key-s" />
          <span>Software · {software.length}</span>
        </span>
        <span className="rg-legend-item">
          <span className="rg-key rg-key-g" />
          <span>Threat Actors · {actors.length}</span>
        </span>
        <span className="rg-legend-hint">hover to focus · click to open</span>
      </div>
    </div>
  );
}

