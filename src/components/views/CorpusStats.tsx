import { useMemo } from "react";
import { siteData } from "../../data/generated";
import { ATTRIBUTION_COLORS, ATTRIBUTION_ORDER, TACTIC_NAMES_SHORT, TACTIC_ORDER } from "../../lib";

type CovStats = NonNullable<typeof siteData.coverage>;

export default function CorpusStats({ openDoc }: { openDoc: (path: string) => void }) {
  const cov = siteData.coverage as CovStats | null;
  if (!cov) return null;

  const tacticCounts = cov.examplesByTactic as Record<string, number>;
  const yearCounts = cov.examplesByYear as Record<string, number>;
  const ymCounts = cov.examplesByYearMonth as Record<string, number>;
  const attributionCounts = cov.attributionDistribution as Record<string, number>;
  const actorCounts = cov.examplesByActor as Record<string, number>;
  const actorTitles = cov.actorTitles as Record<string, string>;

  const years = useMemo(() => Object.keys(yearCounts).sort(), [yearCounts]);

  const yearTacticMatrix = useMemo(() => {
    const m: Record<string, Record<string, number>> = {};
    for (const y of years) m[y] = {};
    const examples = siteData.examples as unknown as ReadonlyArray<{ year?: string; techniques: ReadonlyArray<string> }>;
    for (const ex of examples) {
      if (!ex.year) continue;
      const y = String(ex.year);
      if (!m[y]) m[y] = {};
      const tactics = new Set<string>();
      for (const t of ex.techniques) {
        const m2 = /^OAK-(T\d+)\./.exec(t);
        if (m2) tactics.add(m2[1]);
      }
      for (const tac of tactics) m[y][tac] = (m[y][tac] ?? 0) + 1;
    }
    return m;
  }, [years]);

  const maxYearTactic = useMemo(() => {
    let max = 0;
    for (const y of years) for (const t of TACTIC_ORDER) {
      const v = yearTacticMatrix[y]?.[t] ?? 0;
      if (v > max) max = v;
    }
    return max;
  }, [years, yearTacticMatrix]);

  const maxTacticTotal = useMemo(
    () => Math.max(...TACTIC_ORDER.map((t) => tacticCounts[t] ?? 0), 1),
    [tacticCounts],
  );

  const recentMonths = useMemo(() => Object.keys(ymCounts).sort().slice(-18), [ymCounts]);
  const maxYm = useMemo(() => Math.max(...recentMonths.map((m) => ymCounts[m] ?? 0), 1), [recentMonths, ymCounts]);

  const totalExamples = (siteData.stats as { examples: number }).examples;
  const attributionTotal = Object.values(attributionCounts).reduce((a, b) => a + (b ?? 0), 0);

  // Heat-map cells: zero gets the panel background (via .heatmap-zero class);
  // 1+ scales accent opacity from 0.25 → 1.0 against the densest cell. Keeps
  // the chart on a single OAK-accent ramp instead of a generic blue gradient.
  const heatColor = (v: number) => {
    if (v === 0) return "";
    const t = Math.min(1, v / Math.max(maxYearTactic, 1));
    const opacity = 0.25 + t * 0.75;
    return `rgba(0, 255, 209, ${opacity.toFixed(2)})`;
  };

  const recentExamples = useMemo(() => {
    const examples = siteData.examples as unknown as ReadonlyArray<{ file: string; title: string; year?: string }>;
    return [...examples]
      .sort((a, b) => b.file.localeCompare(a.file))
      .slice(0, 10);
  }, []);

  return (
    <div className="corpus-stats">
      <div className="section-heading">
        <p className="eyebrow">Corpus stats</p>
        <h2>Where the worked-example corpus is thick or thin.</h2>
        <p>
          Auto-generated from <code>tools/build_stats.py</code> at build time —
          last regenerated {new Date(siteData.generatedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-num">{totalExamples}</div>
          <div className="stat-label">Worked examples</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{(siteData.stats as { citations: number }).citations}</div>
          <div className="stat-label">Citations</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{(cov.emptyTactics as unknown as string[]).length}</div>
          <div className="stat-label">Empty Tactics</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{(attributionCounts.confirmed ?? 0) + (attributionCounts["inferred-strong"] ?? 0)}</div>
          <div className="stat-label">Confirmed + inferred-strong</div>
        </div>
      </div>

      <div className="stats-section">
        <h3>Examples per Tactic</h3>
        <div className="bar-chart">
          {TACTIC_ORDER.map((t) => {
            const count = tacticCounts[t] ?? 0;
            const pct = (count / maxTacticTotal) * 100;
            return (
              <div className="bar-row" key={t}>
                <div className="bar-label" title={TACTIC_NAMES_SHORT[t]}>
                  <strong>{t}</strong> <span>{TACTIC_NAMES_SHORT[t]}</span>
                </div>
                <div className="bar-track">
                  <div
                    className={count === 0 ? "bar-fill bar-fill-zero" : "bar-fill"}
                    style={{ width: `${Math.max(pct, count > 0 ? 1 : 0)}%` }}
                  />
                </div>
                <div className="bar-count">{count}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="stats-section">
        <h3>Year × Tactic density</h3>
        <p className="stats-hint">
          Heat-map of how many incidents map to each (year, Tactic) cell. Cell intensity scales to the densest cell ({maxYearTactic}). Empty cells indicate either no public anchor case or a mis-mapping to an adjacent Tactic.
        </p>
        <div className="heatmap-wrap">
          <table className="heatmap">
            <thead>
              <tr>
                <th></th>
                {TACTIC_ORDER.map((t) => <th key={t} title={TACTIC_NAMES_SHORT[t]}>{t}</th>)}
                <th>Σ</th>
              </tr>
            </thead>
            <tbody>
              {years.map((y) => {
                const total = yearCounts[y] ?? 0;
                return (
                  <tr key={y}>
                    <th>{y}</th>
                    {TACTIC_ORDER.map((t) => {
                      const v = yearTacticMatrix[y]?.[t] ?? 0;
                      const bg = heatColor(v);
                      return (
                        <td
                          key={t}
                          className={v === 0 ? "heatmap-zero" : ""}
                          style={bg ? { background: bg } : undefined}
                          title={`${y} × ${t}: ${v}`}
                        >
                          {v > 0 ? v : ""}
                        </td>
                      );
                    })}
                    <td className="heatmap-total">{total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="stats-section">
        <h3>Recent corpus growth (last 18 months)</h3>
        <div className="bar-chart-vert">
          {recentMonths.map((m) => {
            const count = ymCounts[m] ?? 0;
            const pct = (count / maxYm) * 100;
            return (
              <div className="bar-vert" key={m} title={`${m}: ${count} incidents`}>
                <div className="bar-vert-fill" style={{ height: `${pct}%` }} />
                <div className="bar-vert-label">{m.slice(2)}</div>
                <div className="bar-vert-count">{count}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="stats-section">
        <h3>Attribution-strength distribution</h3>
        <div className="stack-bar" role="img" aria-label="Attribution strength distribution">
          {ATTRIBUTION_ORDER.map((s) => {
            const v = attributionCounts[s] ?? 0;
            if (!v || !attributionTotal) return null;
            const pct = (v / attributionTotal) * 100;
            return (
              <div
                className="stack-seg"
                key={s}
                style={{ width: `${pct}%`, background: ATTRIBUTION_COLORS[s] }}
                title={`${s}: ${v} (${pct.toFixed(1)}%)`}
              >
                <span className="stack-seg-label">{v}</span>
              </div>
            );
          })}
        </div>
        <div className="stack-legend">
          {ATTRIBUTION_ORDER.map((s) => {
            const v = attributionCounts[s] ?? 0;
            if (!v) return null;
            return (
              <span className="stack-legend-item" key={s}>
                <span className="stack-legend-swatch" style={{ background: ATTRIBUTION_COLORS[s] }} />
                <strong>{s}</strong> {v} ({((v / attributionTotal) * 100).toFixed(1)}%)
              </span>
            );
          })}
        </div>
      </div>

      <div className="stats-section">
        <h3>Top attributed actors</h3>
        <div className="actor-list">
          {Object.entries(actorCounts).slice(0, 10).map(([id, count]) => (
            <div className="actor-row" key={id}>
              <strong>{id}</strong>
              <span>{actorTitles[id] ?? "?"}</span>
              <span className="actor-count">{count} examples</span>
            </div>
          ))}
        </div>
        <p className="stats-hint">
          {(cov.inactiveActors as unknown as string[]).length > 0
            ? `${(cov.inactiveActors as unknown as string[]).length} actor card(s) without attributed examples: ${(cov.inactiveActors as unknown as string[]).join(", ")}.`
            : "All actor cards have at least one attributed example."}
        </p>
      </div>

      <div className="stats-section">
        <h3>Recently added</h3>
        <p className="stats-hint">Latest 10 worked examples by incident date.</p>
        <div className="recent-list">
          {recentExamples.map((ex) => (
            <button
              key={ex.file}
              type="button"
              className="recent-item"
              onClick={() => openDoc(`examples/${ex.file}`)}
            >
              <span className="recent-date">{ex.file.slice(0, 7)}</span>
              <span className="recent-title">{ex.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
