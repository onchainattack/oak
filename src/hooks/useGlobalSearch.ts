import { useMemo, useState } from "react";
import { siteData } from "../data/generated";
import type { SearchResult } from "../types";

// Search across all primary axes — Tactics, Techniques, Incidents, Actors,
// Mitigations, Software. Pure derivation off the corpus + query string;
// returns the controlled query/setQuery pair plus the precomputed results.
// Capped at 14 hits total, with per-axis caps so a generic word doesn't
// flood one axis at the expense of cross-axis discovery.
export function useGlobalSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo<SearchResult[]>(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];

    const tacticResults = siteData.tactics
      .filter((t) =>
        [t.id, t.name, t.phase].join(" ").toLowerCase().includes(needle),
      )
      .slice(0, 3)
      .map((t) => {
        const idShort = t.id.replace("OAK-", "");
        const docKey = Object.keys(siteData.documentIndex).find(
          (k) => k.startsWith(`tactics/${idShort}-`),
        );
        return {
          kind: "Tactic" as const,
          title: `${t.id} — ${t.name}`,
          subtitle: `${t.techniques.length} techniques · ${t.phase}`,
          path: docKey ?? `tactics/${idShort}.md`,
        };
      });

    const techniqueResults = siteData.techniques
      .filter((technique) =>
        [
          technique.id,
          technique.name,
          technique.maturity,
          technique.firstDocumented,
          ...technique.chains,
          ...technique.aliases,
        ]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      )
      .slice(0, 5)
      .map((technique) => {
        const matchedAlias = (technique.aliases as readonly string[]).find((a) =>
          a.toLowerCase().includes(needle),
        );
        const nameMatches = technique.name.toLowerCase().includes(needle);
        const chains = technique.chains.slice(0, 2).join(" / ") || technique.maturity;
        const subtitle = matchedAlias && !nameMatches
          ? `alias "${matchedAlias}" · ${chains}`
          : chains;
        return {
          kind: "Technique" as const,
          title: `${technique.id} — ${technique.name}`,
          subtitle,
          path: technique.id,
        };
      });

    const exampleResults = siteData.examples
      .filter((example) =>
        [example.title, example.file, example.loss, ...example.techniques, ...example.actors]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      )
      .slice(0, 4)
      .map((example) => ({
        kind: "Incident" as const,
        title: example.title,
        subtitle: [example.year, ...example.techniques.slice(0, 2)].filter(Boolean).join(" · "),
        path: `examples/${example.file}`,
      }));

    const actorResults = siteData.actors
      .filter((actor) =>
        [actor.id, actor.title, actor.status, ...actor.observedTechniques]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      )
      .slice(0, 3)
      .map((actor) => ({
        kind: "Actor" as const,
        title: actor.title,
        subtitle: actor.status || "attribution profile",
        path: `actors/${actor.file}`,
      }));

    const mitigationResults = siteData.mitigations
      .filter((m) =>
        [m.id, m.name, m.class, ...(m.audience as readonly string[]), ...(m.mapsToTechniques as readonly string[])]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      )
      .slice(0, 3)
      .map((m) => ({
        kind: "Mitigation" as const,
        title: `${m.id} — ${m.name}`,
        subtitle: `${m.class} · maps to ${m.mapsToTechniques.length} technique${m.mapsToTechniques.length === 1 ? "" : "s"}`,
        path: m.id,
      }));

    const softwareResults = siteData.software
      .filter((s) =>
        [s.id, s.name, s.type, ...(s.aliases as readonly string[] ?? []), ...(s.usedByGroups as readonly string[])]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      )
      .slice(0, 3)
      .map((s) => ({
        kind: "Software" as const,
        title: `${s.id} — ${s.name}`,
        subtitle: s.usedByGroups.length > 0 ? `${s.type} · ${s.usedByGroups.join(", ")}` : s.type,
        path: s.id,
      }));

    return [
      ...tacticResults,
      ...techniqueResults,
      ...exampleResults,
      ...actorResults,
      ...mitigationResults,
      ...softwareResults,
    ].slice(0, 14);
  }, [query]);

  return { query, setQuery, results };
}
