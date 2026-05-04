import { useMemo, useState } from "react";
import { siteData } from "../../data/generated";
import { TACTIC_NAMES_SHORT, TACTIC_ORDER } from "../../lib";

type CoverageTier = "full" | "partial" | "documented" | "gap" | "na";

type CoverageVendor = {
  key: string;
  name: string;
  product: string;
  url: string;
  type: string;
  chains: ReadonlyArray<string>;
  description: string;
  technique_ids: ReadonlyArray<string>;
};

type CoverageTechniqueLite = {
  id: string;
  name: string;
  parent_tactics: ReadonlyArray<string>;
  maturity: string;
  chains: ReadonlyArray<string>;
};

type CoverageTacticLite = {
  id: string;
  name: string;
  techniques: ReadonlyArray<string>;
};

type CoverageCell = {
  coverage: CoverageTier;
  detector_id?: string;
  field?: string;
  note?: string;
};

type CoverageMatrixData = {
  vendors: ReadonlyArray<CoverageVendor>;
  techniques: ReadonlyArray<CoverageTechniqueLite>;
  tactics: ReadonlyArray<CoverageTacticLite>;
  matrix: Record<string, Record<string, CoverageCell>>;
  stats: {
    vendor_count: number;
    technique_count: number;
    edge_count: number;
    vendors_by_type: Record<string, number>;
    coverage_by_tier: Record<string, number>;
  };
};

const TIER_ORDER: readonly CoverageTier[] = ["full", "partial", "documented", "gap", "na"];
const TIER_LABEL: Record<CoverageTier, string> = {
  full: "Full",
  partial: "Partial",
  documented: "Documented",
  gap: "Gap",
  na: "N/A",
};

export default function CoverageMatrix({
  onOpenTechnique,
  onOpenDoc,
}: {
  onOpenTechnique: (id: string) => void;
  onOpenDoc: (path: string) => void;
}) {
  const matrix = siteData.coverageMatrix as CoverageMatrixData | null;

  // Fall back to the legacy single-vendor table if the matrix data hasn't
  // been built yet (e.g. dev server before `npm run site:data`).
  if (!matrix) {
    return (
      <div className="section-heading">
        <p className="eyebrow">Coverage</p>
        <h2>Coverage matrix not built.</h2>
        <p>
          Run <code>python3 tools/build_coverage.py</code> (or{" "}
          <code>npm run site:data</code>) to populate{" "}
          <code>tools/coverage.json</code>.
        </p>
      </div>
    );
  }

  const [tierFilter, setTierFilter] = useState<CoverageTier | "all">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [tacticFilter, setTacticFilter] = useState<string>("all");

  const vendors = matrix.vendors;
  const techniques = matrix.techniques;
  const tactics = matrix.tactics;
  const cells = matrix.matrix;
  const stats = matrix.stats;

  const vendorTypes = useMemo(() => {
    const set = new Set<string>();
    for (const v of vendors) if (v.type) set.add(v.type);
    return Array.from(set).sort();
  }, [vendors]);

  const filteredVendors = useMemo(() => {
    if (typeFilter === "all") return vendors;
    return vendors.filter((v) => v.type === typeFilter);
  }, [vendors, typeFilter]);

  const filteredTechniques = useMemo(() => {
    if (tacticFilter === "all") return techniques;
    return techniques.filter((t) => (t.parent_tactics ?? []).includes(tacticFilter));
  }, [techniques, tacticFilter]);

  // Group Techniques by their primary parent Tactic for visual separation.
  const techniqueGroups = useMemo(() => {
    const groups: Array<{ tactic: { id: string; name: string }; items: typeof techniques }> = [];
    for (const t of tactics) {
      const items = filteredTechniques.filter(
        (tech) => (tech.parent_tactics ?? [])[0] === t.id,
      );
      if (items.length > 0) groups.push({ tactic: { id: t.id, name: t.name }, items });
    }
    return groups;
  }, [tactics, filteredTechniques]);

  const cellTier = (vendorKey: string, techId: string): CoverageTier | null => {
    const cell = cells[vendorKey]?.[techId];
    return cell ? (cell.coverage as CoverageTier) : null;
  };

  const cellMatchesTierFilter = (tier: CoverageTier | null): boolean => {
    if (tierFilter === "all") return tier !== null;
    return tier === tierFilter;
  };

  return (
    <>
      <div className="section-heading">
        <p className="eyebrow">Coverage</p>
        <h2>Vendor × Technique coverage matrix.</h2>
        <p>
          {stats.vendor_count} vendors mapped against {stats.technique_count} OAK
          Techniques — {stats.edge_count} declared coverage edges. OAK publishes
          honest gaps alongside covered surfaces. Click any cell to open the
          Technique; click a vendor name for product details.
        </p>
      </div>

      <div className="cov-stat-row">
        {TIER_ORDER.map((tier) => {
          const n = stats.coverage_by_tier[tier] ?? 0;
          if (n === 0) return null;
          return (
            <button
              type="button"
              key={tier}
              className={"cov-stat-pill cov-tier-" + tier + (tierFilter === tier ? " active" : "")}
              onClick={() => setTierFilter(tierFilter === tier ? "all" : tier)}
              title={`Filter cells with tier "${TIER_LABEL[tier]}"`}
            >
              <strong>{n}</strong> {TIER_LABEL[tier].toLowerCase()}
            </button>
          );
        })}
        {tierFilter !== "all" && (
          <button type="button" className="cov-stat-pill cov-reset"
                  onClick={() => setTierFilter("all")}>
            Clear tier
          </button>
        )}
      </div>

      <div className="cov-filter-bar">
        <label className="cov-filter">
          <span>Vendor type</span>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All ({vendors.length})</option>
            {vendorTypes.map((t) => {
              const n = vendors.filter((v) => v.type === t).length;
              return <option key={t} value={t}>{t} ({n})</option>;
            })}
          </select>
        </label>

        <label className="cov-filter">
          <span>Tactic</span>
          <select value={tacticFilter} onChange={(e) => setTacticFilter(e.target.value)}>
            <option value="all">All ({techniques.length})</option>
            {tactics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.id.replace("OAK-", "")} {t.name} ({(t.techniques ?? []).length})
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="cov-stat-pill cov-doc"
          onClick={() => onOpenDoc("COVERAGE.md")}
        >
          Methodology
        </button>
      </div>

      <div className="cov-matrix-wrap">
        <table className="cov-matrix">
          <thead>
            <tr>
              <th className="cov-corner">Vendor</th>
              {techniqueGroups.map((group) => (
                <th
                  key={group.tactic.id}
                  className="cov-tactic-header"
                  colSpan={group.items.length}
                  title={group.tactic.name}
                >
                  {group.tactic.id.replace("OAK-", "")} {group.tactic.name}
                </th>
              ))}
            </tr>
            <tr>
              <th className="cov-corner cov-corner-sub" />
              {techniqueGroups.flatMap((group) =>
                group.items.map((t) => (
                  <th
                    key={t.id}
                    className="cov-tech-header"
                    title={`${t.id} — ${t.name}`}
                    onClick={() => onOpenTechnique(t.id)}
                  >
                    <span className="cov-tech-id">{t.id.replace("OAK-T", "")}</span>
                  </th>
                )),
              )}
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor) => (
              <tr key={vendor.key}>
                <td className="cov-vendor-cell">
                  <a
                    href={vendor.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cov-vendor-link"
                    title={vendor.description}
                  >
                    {vendor.name}
                  </a>
                  <span className="cov-vendor-type">{vendor.type}</span>
                </td>
                {techniqueGroups.flatMap((group) =>
                  group.items.map((t) => {
                    const tier = cellTier(vendor.key, t.id);
                    const cell = cells[vendor.key]?.[t.id];
                    const matches = cellMatchesTierFilter(tier);
                    const cls = tier
                      ? `cov-cell cov-tier-${tier}` + (matches ? "" : " cov-dim")
                      : "cov-cell cov-empty";
                    const title = tier
                      ? `${vendor.name} × ${t.id} — ${TIER_LABEL[tier]}` +
                        (cell?.detector_id ? ` (${cell.detector_id})` : "") +
                        (cell?.field ? ` (${cell.field})` : "")
                      : `${vendor.name} × ${t.id} — not declared`;
                    return (
                      <td
                        key={t.id}
                        className={cls}
                        title={title}
                        onClick={() => tier && onOpenTechnique(t.id)}
                      >
                        {tier ? <span className="cov-cell-dot" /> : null}
                      </td>
                    );
                  }),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-heading" style={{ marginTop: "48px" }}>
        <p className="eyebrow">Per-vendor detail</p>
        <h2>Vendor coverage breakdown.</h2>
        <p>
          For vendor outreach: each card lists the Techniques the vendor covers,
          grouped by coverage tier. Hand-curate{" "}
          <code>coverage/manifest.yml</code> to update.
        </p>
      </div>
      <div className="cov-vendor-cards">
        {filteredVendors.map((vendor) => {
          const byTier: Record<CoverageTier, string[]> = {
            full: [], partial: [], documented: [], gap: [], na: [],
          };
          for (const tid of vendor.technique_ids) {
            const t = cells[vendor.key]?.[tid]?.coverage as CoverageTier | undefined;
            if (t) byTier[t].push(tid);
          }
          const total = vendor.technique_ids.length;
          return (
            <div key={vendor.key} className="cov-vendor-card">
              <div className="cov-vendor-card-head">
                <a href={vendor.url || "#"} target="_blank" rel="noopener noreferrer">
                  {vendor.name}
                </a>
                <span className="cov-vendor-type">{vendor.type}</span>
              </div>
              <p className="cov-vendor-desc">{vendor.description}</p>
              <div className="cov-vendor-stats">
                {TIER_ORDER.map((tier) => {
                  const ids = byTier[tier];
                  if (ids.length === 0) return null;
                  return (
                    <details key={tier} className={`cov-tier-${tier}`}>
                      <summary>
                        <span className="cov-cell-dot" /> {ids.length} {TIER_LABEL[tier].toLowerCase()}
                      </summary>
                      <div className="cov-vendor-tids">
                        {ids.map((tid) => (
                          <button
                            key={tid}
                            type="button"
                            className="cov-vendor-tid"
                            onClick={() => onOpenTechnique(tid)}
                          >
                            {tid}
                          </button>
                        ))}
                      </div>
                    </details>
                  );
                })}
              </div>
              <p className="cov-vendor-total">{total} declared edges total</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

