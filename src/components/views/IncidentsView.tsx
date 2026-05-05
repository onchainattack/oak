import { useMemo, useState } from "react";
import { siteData } from "../../data/generated";
import { cleanInlineText } from "../../lib";

export default function IncidentsView({ openDoc }: { openDoc: (path: string) => void }) {
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [techFilter, setTechFilter] = useState<string>("all");
  const [actorFilter, setActorFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"year-desc" | "year-asc">("year-desc");

  const allYears = useMemo(
    () => [...new Set(siteData.examples.map((e) => e.year).filter(Boolean))].sort().reverse(),
    [],
  );
  const allActorIds = useMemo(
    () => [...new Set(siteData.examples.flatMap((e) => e.actors as readonly string[]))].sort(),
    [],
  );

  const filtered = useMemo(() => {
    let list = siteData.examples.filter((e) => e.techniques.length > 0);
    if (yearFilter !== "all") list = list.filter((e) => e.year === yearFilter);
    if (techFilter !== "all") {
      list = list.filter((e) => (e.techniques as readonly string[]).some((t) => t.startsWith(techFilter)));
    }
    if (actorFilter !== "all") {
      list = list.filter((e) => (e.actors as readonly string[]).includes(actorFilter));
    }
    list = [...list].sort((a, b) => {
      const cmp = (a.year ?? "").localeCompare(b.year ?? "");
      return sortBy === "year-asc" ? cmp : -cmp;
    });
    return list;
  }, [yearFilter, techFilter, actorFilter, sortBy]);

  return (
    <>
      <div className="section-heading">
        <p className="eyebrow">Worked examples</p>
        <h2>Incidents — the proof layer</h2>
        <p>
          Every entry ties an OAK Technique to a real, cited incident — loss size,
          laundering path, recovery outcome, attribution strength.
        </p>
      </div>
      <div className="incidents-controls">
        <label className="chip-group">
          <span>year</span>
          <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
            <option value="all">all years</option>
            {allYears.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <label className="chip-group">
          <span>tactic</span>
          <select value={techFilter} onChange={(e) => setTechFilter(e.target.value)}>
            <option value="all">all tactics</option>
            {siteData.tactics.map((t) => (
              <option key={t.id} value={t.id.replace("OAK-", "")}>{t.id} {t.name}</option>
            ))}
          </select>
        </label>
        <label className="chip-group">
          <span>actor</span>
          <select value={actorFilter} onChange={(e) => setActorFilter(e.target.value)}>
            <option value="all">any actor</option>
            {allActorIds.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </label>
        <label className="chip-group">
          <span>sort</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "year-desc" | "year-asc")}>
            <option value="year-desc">newest first</option>
            <option value="year-asc">oldest first</option>
          </select>
        </label>
        <button
          type="button"
          className="reset-button"
          onClick={() => { setYearFilter("all"); setTechFilter("all"); setActorFilter("all"); setSortBy("year-desc"); }}
        >
          Reset
        </button>
      </div>
      <div className="result-strip">
        <strong>{filtered.length}</strong>
        <span>of {siteData.examples.length} incidents</span>
      </div>
      <div className="example-grid">
        {filtered.map((example) => (
          <button
            type="button"
            className="example-card"
            key={example.file}
            onClick={() => openDoc(`examples/${example.file}`)}
          >
            <span>{example.year}</span>
            <h3>{example.title}</h3>
            <p>
              {example.loss
                ? cleanInlineText(example.loss.replace(/^approximately\s+/i, "").replace(/\*\*/g, ""))
                : "Loss, recovery, attribution, and technique mapping documented in the example."}
            </p>
            <div className="example-meta">
              {example.techniques.slice(0, 3).map((technique) => (
                <code key={technique}>{technique}</code>
              ))}
              {example.techniques.length > 3 && (
                <span className="example-meta-more">+{example.techniques.length - 3} more</span>
              )}
              {example.actors.slice(0, 1).map((actor) => (
                <code key={actor}>{actor}</code>
              ))}
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="empty-row">No incidents match the current filters.</p>
        )}
      </div>
    </>
  );
}
