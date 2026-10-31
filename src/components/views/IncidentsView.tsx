import { hrefForDoc } from "../../routing";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { siteData } from "../../data/generated";
import { cleanInlineText } from "../../lib";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Date filters live in the query string (?year=2026&month=10&day=29) so a
// filtered view can be linked to.
const initialParam = (key: string) => {
  if (typeof window === "undefined") return "all";
  return new URLSearchParams(window.location.search).get(key) || "all";
};

// Year × month grid linking the static month hubs (/incidents/YYYY/MM/).
// Recent years are shown; older ones sit in a <details> (still in the DOM, so
// crawlers follow every link).
const VISIBLE_YEARS = 4;

function HubCalendar() {
  const counts = new Map<string, number>(siteData.incidentHubs.map(([ym, n]) => [ym, n]));
  const years = [...new Set(siteData.incidentHubs.map(([ym]) => ym.slice(0, 4)))].sort().reverse();
  const max = Math.max(1, ...counts.values());
  const row = (year: string) => (
    <div className="hub-row" key={year}>
      <a className="hub-year" href={`/incidents/${year}/`}>{year}</a>
      {MONTHS.map((label, i) => {
        const ym = `${year}-${String(i + 1).padStart(2, "0")}`;
        const n = counts.get(ym);
        return n ? (
          <a
            key={ym}
            className="hub-cell"
            href={`/incidents/${year}/${ym.slice(5)}/`}
            title={`${label} ${year}: ${n} incident${n === 1 ? "" : "s"}`}
            style={{ "--hub-heat": String(0.12 + 0.6 * Math.sqrt(n / max)) } as CSSProperties}
          >
            {n}
          </a>
        ) : (
          <span key={ym} className="hub-cell hub-empty" aria-hidden="true" />
        );
      })}
    </div>
  );
  return (
    <section className="hub-calendar" aria-label="Incidents by month">
      <div className="hub-row hub-head" aria-hidden="true">
        <span className="hub-year">year</span>
        {MONTHS.map((m) => <span key={m} className="hub-cell">{m}</span>)}
      </div>
      {years.slice(0, VISIBLE_YEARS).map(row)}
      {years.length > VISIBLE_YEARS && (
        <details className="hub-more">
          <summary>All years ({years[years.length - 1]}–{years[VISIBLE_YEARS]})</summary>
          {years.slice(VISIBLE_YEARS).map(row)}
        </details>
      )}
    </section>
  );
}

export default function IncidentsView({ openDoc }: { openDoc: (path: string) => void }) {
  const [yearFilter, setYearFilter] = useState<string>(() => initialParam("year"));
  const [monthFilter, setMonthFilter] = useState<string>(() => initialParam("month"));
  const [dayFilter, setDayFilter] = useState<string>(() => initialParam("day"));
  const [techFilter, setTechFilter] = useState<string>("all");
  const [actorFilter, setActorFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"year-desc" | "year-asc">("year-desc");

  const allYears = useMemo(
    () => [...new Set(siteData.examples.map((e) => e.year).filter(Boolean))].sort().reverse(),
    [],
  );
  const allMonths = useMemo(
    () =>
      [...new Set(
        siteData.examples
          .filter((e) => yearFilter === "all" || e.year === yearFilter)
          .map((e) => e.month)
          .filter(Boolean),
      )].sort(),
    [yearFilter],
  );
  const allDays = useMemo(
    () =>
      yearFilter === "all" || monthFilter === "all"
        ? []
        : [...new Set(
            siteData.examples
              .filter((e) => e.year === yearFilter && e.month === monthFilter)
              .map((e) => e.day)
              .filter(Boolean),
          )].sort(),
    [yearFilter, monthFilter],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const set = (key: string, value: string) =>
      value === "all" ? params.delete(key) : params.set(key, value);
    set("year", yearFilter);
    set("month", monthFilter);
    set("day", dayFilter);
    const query = params.toString();
    const target = window.location.pathname + (query ? `?${query}` : "");
    if (target !== window.location.pathname + window.location.search) {
      window.history.replaceState(window.history.state, "", target);
    }
  }, [yearFilter, monthFilter, dayFilter]);

  const allActorIds = useMemo(
    () => [...new Set(siteData.examples.flatMap((e) => e.actors as readonly string[]))].sort(),
    [],
  );

  const filtered = useMemo(() => {
    let list = siteData.examples.filter((e) => e.techniques.length > 0);
    if (yearFilter !== "all") list = list.filter((e) => e.year === yearFilter);
    if (monthFilter !== "all") list = list.filter((e) => e.month === monthFilter);
    if (dayFilter !== "all") list = list.filter((e) => e.day === dayFilter);
    if (techFilter !== "all") {
      list = list.filter((e) => (e.techniques as readonly string[]).some((t) => t.startsWith(techFilter)));
    }
    if (actorFilter !== "all") {
      list = list.filter((e) => (e.actors as readonly string[]).includes(actorFilter));
    }
    list = [...list].sort((a, b) => {
      // Full date first; within the same date, fall back to file name so the
      // order is stable.
      const cmp = a.date.localeCompare(b.date) || a.file.localeCompare(b.file);
      return sortBy === "year-asc" ? cmp : -cmp;
    });
    return list;
  }, [yearFilter, monthFilter, dayFilter, techFilter, actorFilter, sortBy]);

  return (
    <>
      <div className="section-heading">
        <p className="eyebrow">Worked examples</p>
        <h1>Incidents — the proof layer</h1>
        <p>
          Every entry ties an OAK Technique to a real, cited incident — loss size,
          laundering path, recovery outcome, attribution strength.
        </p>
      </div>
      <HubCalendar />
      <div className="incidents-controls">
        <label className="chip-group">
          <span>year</span>
          <select
            value={yearFilter}
            onChange={(e) => { setYearFilter(e.target.value); setMonthFilter("all"); setDayFilter("all"); }}
          >
            <option value="all">all years</option>
            {allYears.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <label className="chip-group">
          <span>month</span>
          <select
            value={monthFilter}
            onChange={(e) => { setMonthFilter(e.target.value); setDayFilter("all"); }}
          >
            <option value="all">all months</option>
            {allMonths.map((m) => <option key={m} value={m}>{MONTHS[Number(m) - 1]}</option>)}
          </select>
        </label>
        <label className="chip-group">
          <span>day</span>
          <select
            value={dayFilter}
            disabled={allDays.length === 0}
            title={allDays.length === 0 ? "Pick a year and a month first" : undefined}
            onChange={(e) => setDayFilter(e.target.value)}
          >
            <option value="all">all days</option>
            {allDays.map((d) => <option key={d} value={d}>{Number(d)}</option>)}
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
          onClick={() => { setYearFilter("all"); setMonthFilter("all"); setDayFilter("all"); setTechFilter("all"); setActorFilter("all"); setSortBy("year-desc"); }}
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
          <a className="example-card" key={example.file} href={hrefForDoc(`examples/${example.file}`)}>
            <span>{example.date}</span>
            <strong className="example-card-title">{example.title}</strong>
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
          </a>
        ))}
        {filtered.length === 0 && (
          <p className="empty-row">No incidents match the current filters.</p>
        )}
      </div>
    </>
  );
}
