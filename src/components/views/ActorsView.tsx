import { useMemo } from "react";
import { siteData } from "../../data/generated";

const ACTOR_CATEGORIES: Array<{ id: string; label: string; match: (id: string, title: string) => boolean }> = [
  { id: "dprk", label: "DPRK / state-aligned", match: (_id, t) => /lazarus|trader|kimsuky|apt43|bluenoroff|andariel|dprk/i.test(t) },
  { id: "iran", label: "Iran-nexus", match: (_id, t) => /iran|muddywater|charming|pioneer|kitten|apt35/i.test(t) },
  { id: "ransomware", label: "Russian-ecosystem ransomware", match: (_id, t) => /lockbit|alphv|blackcat|black\s*basta|royal|blacksuit|akira|ransomhub|blackbyte|conti|cl0p|fin11|evil\s*corp|karakurt/i.test(t) },
  { id: "laundering", label: "Laundering infrastructure", match: (_id, t) => /garantex|grinex|laundering|a7a5/i.test(t) },
  { id: "drainer", label: "Drainer-as-a-service", match: (_id, t) => /drainer|inferno|angel|pink|monkey|venom|vanilla|chick/i.test(t) },
  { id: "affiliate", label: "Affiliate collectives", match: (_id, t) => /scattered|spider|unc3944|octo|tempest|0ktapus/i.test(t) },
  { id: "other", label: "Other", match: () => true },
];

export default function ActorsView({ openGroup }: { openGroup: (id: string) => void }) {
  const grouped = useMemo(() => {
    const buckets: Record<string, typeof siteData.actors[number][]> = {};
    ACTOR_CATEGORIES.forEach((c) => { buckets[c.id] = []; });
    for (const actor of siteData.actors) {
      const t = actor.title;
      for (const c of ACTOR_CATEGORIES) {
        if (c.match(actor.id, t)) {
          buckets[c.id].push(actor);
          break;
        }
      }
    }
    return buckets;
  }, []);

  return (
    <>
      <div className="section-heading">
        <p className="eyebrow">Threat actors</p>
        <h2>Attribution without flattening the market</h2>
        <p>
          Each entry carries an explicit attribution-strength label —{" "}
          <code>confirmed</code>, <code>inferred-strong</code>, or <code>inferred-weak</code> —
          calibrated against cited evidence.
        </p>
      </div>
      {ACTOR_CATEGORIES.map((cat) => {
        const list = grouped[cat.id];
        if (!list || list.length === 0) return null;
        return (
          <div key={cat.id} className="actor-category">
            <div className="actor-category-label">
              <span>{cat.label}</span>
              <span className="actor-category-count">{list.length}</span>
            </div>
            <div className="actor-strip">
              {list.map((actor) => (
                <button
                  type="button"
                  className="actor-card"
                  key={actor.id}
                  onClick={() => openGroup(actor.id)}
                >
                  <span>{actor.id}</span>
                  <strong>{actor.title.replace(/^OAK-G\d{2}\s+—\s+/, "")}</strong>
                  <small>{actor.status || "attribution profile"}</small>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
