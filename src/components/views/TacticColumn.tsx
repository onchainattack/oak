import type { CSSProperties } from "react";
import { techniqueById } from "../../lib";
import type { Tactic } from "../../types";
import TacticGlyph from "../glyphs/TacticGlyph";

export default function TacticColumn({
  tactic,
  techniqueIds,
  onOpenTechnique,
  layerByTechnique,
}: {
  tactic: Tactic;
  techniqueIds: readonly string[];
  onOpenTechnique: (id: string) => void;
  // Optional coverage-layer tint per technique ID — `color` paints the
  // card border + background-tint; `comment` becomes the tooltip.
  layerByTechnique?: Record<string, { color?: string; score?: number; comment?: string }>;
}) {
  return (
    <article className="tactic-column">
      <header>
        <div className="tactic-heading">
          <TacticGlyph id={tactic.id} />
          <span>{tactic.id}</span>
          <h3>{tactic.name}</h3>
        </div>
        <div className="tactic-meta">
          <small>{techniqueIds.length}</small>
        </div>
      </header>
      <div className="technique-list">
        {techniqueIds.map((id) => {
          const technique = techniqueById.get(id);
          if (!technique) return null;

          const layerHit = layerByTechnique?.[id];
          const layerStyle = layerHit?.color
            ? {
                "--layer-color": layerHit.color,
                borderColor: layerHit.color,
                background: `color-mix(in srgb, ${layerHit.color} 12%, transparent)`,
              }
            : undefined;
          return (
            <button
              type="button"
              className={"technique-card" + (layerHit ? " has-layer" : "")}
              key={id}
              onClick={() => onOpenTechnique(technique.id)}
              title={layerHit?.comment ?? undefined}
              style={layerStyle as CSSProperties | undefined}
            >
              <span>{technique.id}</span>
              <strong>{technique.name}</strong>
              {technique.aliases.length > 0 && (
                <em className="card-aka">aka {technique.aliases[0]}</em>
              )}
              <small>
                {technique.maturity || "documented"} · {technique.chains.slice(0, 2).join(" / ")}
              </small>
            </button>
          );
        })}
        {techniqueIds.length === 0 && (
          <div className="empty-column">No techniques match the current filters.</div>
        )}
      </div>
    </article>
  );
}

