import type { Tactic } from "../../types";

const KILL_CHAIN_PRIMARY: readonly string[] = ["OAK-T1","OAK-T2","OAK-T3","OAK-T4","OAK-T5","OAK-T6","OAK-T7","OAK-T8"];

export default function KillChainBanner({
  tactics,
  active,
  onSelect,
}: {
  tactics: readonly Tactic[];
  active: string;
  onSelect: (id: string) => void;
}) {
  const byId = new Map<string, Tactic>(tactics.map((t) => [t.id, t]));
  const primary = KILL_CHAIN_PRIMARY.map((id) => byId.get(id)).filter(Boolean) as Tactic[];
  const auxiliary = tactics.filter((t) => !KILL_CHAIN_PRIMARY.includes(t.id));

  return (
    <div className="kill-chain">
      <div className="kc-header">
        <span className="kc-label">Operator-behaviour kill chain</span>
        <button
          type="button"
          className={"kc-all" + (active === "all" ? " active" : "")}
          onClick={() => onSelect("all")}
        >
          All tactics
        </button>
      </div>
      <ol className="kc-primary">
        {primary.map((tactic, i) => (
          <li key={tactic.id} className="kc-step">
            <button
              type="button"
              className={"kc-chip" + (active === tactic.id ? " active" : "")}
              onClick={() => onSelect(tactic.id)}
              title={`${tactic.name} — ${tactic.phase}`}
            >
              <span className="kc-num">{tactic.id.replace("OAK-", "")}</span>
              <span className="kc-name">{tactic.name}</span>
            </button>
            {i < primary.length - 1 && <span className="kc-arrow" aria-hidden>→</span>}
          </li>
        ))}
      </ol>
      <div className="kc-aux">
        <span className="kc-label">Auxiliary realization tracks (parallel)</span>
        <div className="kc-aux-row">
          {auxiliary.map((tactic) => (
            <button
              type="button"
              key={tactic.id}
              className={"kc-aux-chip" + (active === tactic.id ? " active" : "")}
              onClick={() => onSelect(tactic.id)}
              title={`${tactic.name} — ${tactic.phase}`}
            >
              <span className="kc-num">{tactic.id.replace("OAK-", "")}</span>
              <span className="kc-name">{tactic.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

