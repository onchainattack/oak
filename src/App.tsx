import { useEffect, useMemo, useState, type ReactNode } from "react";
import { siteData } from "./data/generated";
import { documentBodies } from "./data/documents";

type Tactic = (typeof siteData.tactics)[number];
type Technique = (typeof siteData.techniques)[number];
type WorkspaceView = "about" | "matrix" | "incidents" | "actors" | "mitigations" | "software" | "coverage" | "contribute";
type IconName =
  | "matrix"
  | "technique"
  | "incident"
  | "actor"
  | "coverage"
  | "citation"
  | "why"
  | "who"
  | "how"
  | "contribute"
  | "market"
  | "evidence";
type SearchResult = {
  kind: "Tactic" | "Technique" | "Incident" | "Actor" | "Mitigation" | "Software" | "Doc";
  title: string;
  subtitle: string;
  path: string;
};

const techniqueById = new Map<string, Technique>(
  siteData.techniques.map((technique) => [technique.id, technique]),
);
const chainOptions = ["all", "EVM", "Solana", "cross-chain", "chain-agnostic"];

const includes = (value: string, query: string) => value.toLowerCase().includes(query.toLowerCase());

const cleanInlineText = (value: string) =>
  value
    .replace(/\\([\\`*_{}\[\]()#+\-.!|>~$])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

const tacticVariant = (id: string) => Number(id.match(/OAK-T(\d+)/)?.[1] ?? 0);

function TacticGlyph({ id }: { id: string }) {
  const n = tacticVariant(id);

  return (
    <span className="tactic-glyph" aria-hidden="true">
      <svg viewBox="0 0 48 48" focusable="false">
        {n === 1 /* Token Genesis — mint arrow into token contract */ && (
          <>
            <rect x="12" y="20" width="24" height="20" rx="2" />
            <path d="M24 6v14M18 14l6 6 6-6" />
            <path d="M18 30h12" className="fill-accent" />
          </>
        )}
        {n === 2 /* Liquidity Establishment — AMM curve x*y=k */ && (
          <>
            <path d="M8 40h32M10 40v-30" />
            <path d="M14 36c0-14 8-22 22-22" />
            <circle cx="36" cy="14" r="2.5" className="fill-accent" />
          </>
        )}
        {n === 3 /* Holder Capture — concentric voting power */ && (
          <>
            <circle cx="24" cy="24" r="16" />
            <circle cx="24" cy="24" r="10" />
            <circle cx="24" cy="24" r="4" className="fill-accent" />
          </>
        )}
        {n === 4 /* Access Acquisition — phishing hook + key */ && (
          <>
            <path d="M30 8c0 8-12 8-12 18 0 6 4 10 10 10s10-4 10-10" />
            <circle cx="14" cy="34" r="5" />
            <path d="M18 34h14" />
            <path d="M30 32v4M34 32v4" className="fill-accent" />
          </>
        )}
        {n === 5 /* Value Extraction — vault draining */ && (
          <>
            <path d="M10 12h20v18H10z" />
            <circle cx="20" cy="21" r="3" className="fill-accent" />
            <path d="M30 21h12" />
            <path d="M38 17l4 4-4 4" />
          </>
        )}
        {n === 6 /* Defense Evasion — split mask */ && (
          <>
            <path d="M24 8L40 18v8c0 8-7 14-16 16-9-2-16-8-16-16v-8Z" />
            <path d="M24 8v32" />
            <circle cx="16" cy="22" r="2" className="fill-accent" />
            <circle cx="32" cy="22" r="2" />
          </>
        )}
        {n === 7 /* Laundering — cyclic arrows / tumbler */ && (
          <>
            <path d="M14 18a12 12 0 0 1 22 0" />
            <path d="M34 30a12 12 0 0 1-22 0" />
            <path d="M30 14l6 4-6 4" className="fill-accent" />
            <path d="M18 34l-6-4 6-4" className="fill-accent" />
          </>
        )}
        {n === 8 /* Operational Reuse — cluster of nodes */ && (
          <>
            <circle cx="14" cy="14" r="4" />
            <circle cx="34" cy="14" r="4" />
            <circle cx="14" cy="34" r="4" />
            <circle cx="34" cy="34" r="4" className="fill-accent" />
            <path d="M14 18v12M34 18v12M18 14h12M18 34h12" />
          </>
        )}
        {n === 9 /* Smart-Contract Exploit — broken brackets */ && (
          <>
            <path d="M16 10l-8 14 8 14M32 10l8 14-8 14" />
            <path d="M22 18l4 14" className="fill-accent" />
            <circle cx="24" cy="24" r="2.5" className="fill-accent" />
          </>
        )}
        {n === 10 /* Bridge / Cross-Chain — two chains linked */ && (
          <>
            <rect x="6" y="20" width="14" height="8" rx="4" />
            <rect x="28" y="20" width="14" height="8" rx="4" />
            <path d="M16 24h16" />
            <circle cx="24" cy="24" r="2.5" className="fill-accent" />
          </>
        )}
        {n === 11 /* Custody / Signing — vault + key */ && (
          <>
            <rect x="8" y="14" width="22" height="22" rx="2" />
            <circle cx="19" cy="25" r="3" className="fill-accent" />
            <path d="M19 28v4" className="fill-accent" />
            <path d="M34 18l4-4M34 22l4-4M34 26l4-4M34 30l4-4" />
          </>
        )}
        {n === 12 /* NFT — picture frame with image */ && (
          <>
            <rect x="8" y="8" width="32" height="32" rx="2" />
            <circle cx="18" cy="18" r="3" className="fill-accent" />
            <path d="M12 36l10-12 6 6 8-10 4 4v12Z" className="fill-accent" />
          </>
        )}
        {n === 13 /* Account Abstraction — nested smart account */ && (
          <>
            <rect x="6" y="6" width="36" height="36" rx="3" />
            <rect x="14" y="14" width="20" height="20" rx="2" />
            <rect x="20" y="20" width="8" height="8" className="fill-accent" />
          </>
        )}
        {n === 14 /* Validator / Staking — staking pyramid */ && (
          <>
            <path d="M24 6l16 28H8Z" />
            <path d="M14 26h20M18 18h12" />
            <circle cx="24" cy="34" r="3" className="fill-accent" />
            <path d="M8 40h32" />
          </>
        )}
        {n === 15 /* Off-chain Entry-Vector — laptop with phishing hook entering screen */ && (
          <>
            <rect x="10" y="14" width="28" height="18" rx="1" />
            <path d="M6 36h36l-2 4H8z" />
            <path d="M30 6c0 6-8 6-8 12 0 3 2 5 5 5" />
            <circle cx="27" cy="23" r="2.5" className="fill-accent" />
          </>
        )}
        {n === 16 /* Governance / Voting — ballot box with ballot slot + checkmark ballot dropping in */ && (
          <>
            <rect x="8" y="22" width="32" height="20" rx="1" />
            <rect x="18" y="20" width="12" height="3" />
            <rect x="16" y="6" width="16" height="14" rx="1" />
            <path d="M20 13l3 3 5-6" className="fill-accent" />
          </>
        )}
      </svg>
    </span>
  );
}

const techniqueMatches = (
  technique: Technique,
  query: string,
  chainFilter: string,
  maturityFilter: string,
) => {
  const haystack = [
    technique.id,
    technique.name,
    technique.firstDocumented,
    technique.maturity,
    ...technique.chains,
    ...technique.aliases,
  ].join(" ");

  const queryOk = !query.trim() || includes(haystack, query.trim());
  const chainOk =
    chainFilter === "all" ||
    technique.chains.some((chain) => includes(chain, chainFilter)) ||
    includes(technique.name, chainFilter);
  const maturityOk = maturityFilter === "all" || technique.maturity === maturityFilter;

  return queryOk && chainOk && maturityOk;
};

// HTML5 history routing. URLs are clean (`/matrix`, `/technique/OAK-T11.001`,
// `/document/CHANGELOG`) — no hash fragment, no `.md` suffix in the URL.
// Backwards-compat: legacy hash URLs (`/#/...`) are normalised at boot.
const currentPath = () => {
  const raw = window.location.pathname.replace(/^\/?/, "").replace(/\/+$/, "");
  if (raw) return raw;
  const hashRaw = window.location.hash.replace(/^#\/?/, "").replace(/\/+$/, "");
  return hashRaw;
};

const markdownRouteFromPath = () => {
  const raw = currentPath();
  // /document/<path> → <path>.md (always restore .md for the documentBodies lookup)
  const docMatch = raw.match(/^document\/(.+)$/);
  if (docMatch) {
    const p = docMatch[1];
    return p.endsWith(".md") ? p : `${p}.md`;
  }
  // Legacy / direct: also accept `<path>.md` and `<path>.json|.bib` raw paths.
  return raw.endsWith(".md") || raw.endsWith(".json") || raw.endsWith(".bib") ? raw : "";
};

const techniqueRouteFromPath = () => {
  const raw = currentPath();
  const match = raw.match(/^technique\/(OAK-T\d+\.\d{3})$/);
  return match ? match[1] : "";
};

const mitigationRouteFromPath = () => {
  const raw = currentPath();
  const match = raw.match(/^mitigation\/(OAK-M\d+)$/);
  return match ? match[1] : "";
};

const softwareRouteFromPath = () => {
  const raw = currentPath();
  const match = raw.match(/^software\/(OAK-S\d+)$/);
  return match ? match[1] : "";
};

const groupRouteFromPath = () => {
  const raw = currentPath();
  const match = raw.match(/^group\/(OAK-G\d+)$/);
  return match ? match[1] : "";
};

const workspaceRouteFromPath = (): WorkspaceView => {
  const raw = currentPath();
  return ["about", "matrix", "incidents", "actors", "mitigations", "software", "coverage", "contribute"].includes(raw)
    ? (raw as WorkspaceView)
    : "about";
};

const navigateTo = (path: string) => {
  const target = `/${path.replace(/^\/+/, "")}`;
  if (window.location.pathname + window.location.search !== target) {
    window.history.pushState(null, "", target);
  }
};

const docPathToUrl = (mdPath: string) => {
  // documentBodies uses .md path; URL surface drops the .md.
  const stripped = mdPath.replace(/\.md$/, "");
  return `document/${stripped}`;
};

const resolveMarkdownHref = (currentPath: string, href = "") => {
  if (
    !href ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  if (!href.endsWith(".md")) {
    return href;
  }

  // Resolve relative .md href against the document's filesystem path.
  // Returns the canonical filesystem path (e.g. `examples/2025-02-bybit.md`)
  // — the click handler maps this to the in-app `/document/...` route.
  const base = currentPath.includes("/") ? currentPath.split("/").slice(0, -1).join("/") : "";
  const normalized = new URL(href, `https://oak.local/${base ? `${base}/` : ""}`).pathname.replace(
    /^\//,
    "",
  );
  return normalized;
};

// Build a prefilled GitHub-issue URL pointing at the `correction.yml` template.
// Used by the "Report inaccuracy" button on every document view so a reader
// who spots a factual error / attribution dispute / missing source can file a
// structured correction in one click without leaving the site.
const REPO_URL = "https://github.com/onchainattack/oak";
const reportIssueUrl = (kind: string, path: string, title: string) => {
  const liveUrl = typeof window !== "undefined" ? window.location.href : "";
  const cleanTitle = title.replace(/[`*_\[\]]/g, "").slice(0, 80);
  const issueTitle = `[correction] ${kind}: ${cleanTitle}`;
  // Pre-fills the `template=correction.yml` form on the GitHub side. The
  // `doc-path` and `live-url` fields are mapped by ID to the YAML form.
  const params = new URLSearchParams({
    template: "correction.yml",
    title: issueTitle,
    "doc-path": path,
    "live-url": liveUrl,
  });
  return `${REPO_URL}/issues/new?${params.toString()}`;
};

// Categorize actors into broad classes. Title-prefix matching keeps it data-driven.
const ACTOR_CATEGORIES: Array<{ id: string; label: string; match: (id: string, title: string) => boolean }> = [
  { id: "dprk", label: "DPRK / state-aligned", match: (_id, t) => /lazarus|trader|kimsuky|apt43|bluenoroff|andariel|dprk/i.test(t) },
  { id: "iran", label: "Iran-nexus", match: (_id, t) => /iran|muddywater|charming|pioneer|kitten|apt35/i.test(t) },
  { id: "ransomware", label: "Russian-ecosystem ransomware", match: (_id, t) => /lockbit|alphv|blackcat|black\s*basta|royal|blacksuit|akira|ransomhub|blackbyte|conti|cl0p|fin11|evil\s*corp|karakurt/i.test(t) },
  { id: "laundering", label: "Laundering infrastructure", match: (_id, t) => /garantex|grinex|laundering|a7a5/i.test(t) },
  { id: "drainer", label: "Drainer-as-a-service", match: (_id, t) => /drainer|inferno|angel|pink|monkey|venom|vanilla|chick/i.test(t) },
  { id: "affiliate", label: "Affiliate collectives", match: (_id, t) => /scattered|spider|unc3944|octo|tempest|0ktapus/i.test(t) },
  { id: "other", label: "Other", match: () => true },
];

function ActorsView({ openGroup }: { openGroup: (id: string) => void }) {
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

function IncidentsView({ openDoc }: { openDoc: (path: string) => void }) {
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
                <em key={technique}>{technique}</em>
              ))}
              {example.actors.slice(0, 1).map((actor) => (
                <em key={actor}>{actor}</em>
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

function InlineMarkdown({ path }: { path: string }) {
  const indexEntry = siteData.documentIndex[path as keyof typeof siteData.documentIndex];
  const html = documentBodies[path];
  if (!indexEntry || typeof html !== "string") {
    return <p className="document-state">Markdown content not available for this entry.</p>;
  }
  return (
    <div
      className="markdown-body markdown-shell"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function Breadcrumb({
  items,
  onBack,
}: {
  items: Array<{ label: string; onClick?: () => void }>;
  onBack: () => void;
}) {
  return (
    <div className="breadcrumb">
      <button type="button" className="breadcrumb-back" onClick={onBack} aria-label="Back">
        ←
      </button>
      <ol className="breadcrumb-trail">
        {items.map((item, idx) => (
          <li key={idx}>
            {item.onClick ? (
              <button type="button" onClick={item.onClick}>{item.label}</button>
            ) : (
              <span>{item.label}</span>
            )}
            {idx < items.length - 1 && <span className="breadcrumb-sep" aria-hidden>›</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}

function BlockTicker() {
  const [block, setBlock] = useState<number>(() => {
    // Approximate: Ethereum block height as of Apr 2026 ~ 21.4M, +1 every 12s
    const ETH_GENESIS = new Date("2015-07-30T15:26:13Z").getTime();
    const elapsed = Date.now() - ETH_GENESIS;
    return Math.floor(elapsed / 12000);
  });

  useEffect(() => {
    const id = setInterval(() => setBlock((b) => b + 1), 12000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="block-ticker" title="Approximate Ethereum block height (illustrative)">
      <span className="bt-dot" />
      <span className="bt-label">BLOCK</span>
      <span className="bt-num">{block.toLocaleString("en-US").replace(/,/g, " ")}</span>
    </div>
  );
}

function LogoMark() {
  const shards = [
    { x: 38, y: 30, s: 3, op: 1 },
    { x: 33, y: 30, s: 3, op: 0.85 },
    { x: 28, y: 30, s: 2.5, op: 0.7 },
    { x: 22, y: 30, s: 2.5, op: 0.55 },
    { x: 17, y: 30, s: 2, op: 0.45 },
    { x: 12, y: 31, s: 2, op: 0.35 },
    { x: 7, y: 31, s: 1.5, op: 0.28 },
    { x: 35, y: 25, s: 2, op: 0.6 },
    { x: 30, y: 35, s: 2, op: 0.5 },
  ];
  return (
    <a className="logo-lockup" href="/" aria-label="OAK home">
      <span className="oak-logo-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" focusable="false" xmlns="http://www.w3.org/2000/svg">
          <polygon
            className="mark-hex"
            points="42,4 60,18 60,46 42,60 24,46 24,18"
          />
          <rect className="mark-row" x="29" y="18" width="22" height="3" />
          <rect className="mark-row mark-row-breach" x="41" y="30" width="10" height="3" />
          <rect className="mark-row" x="29" y="42" width="22" height="3" />
          {shards.map((shard, i) => (
            <rect
              key={i}
              className="mark-shard"
              x={shard.x}
              y={shard.y}
              width={shard.s}
              height={shard.s}
              opacity={shard.op ?? 1}
            />
          ))}
        </svg>
      </span>
      <span className="brand-text">
        <strong>OAK</strong>
        <small>OnChain Attack Knowledge</small>
      </span>
    </a>
  );
}

function TopSearch({
  value,
  onChange,
  results,
  onOpenDoc,
  onOpenTechnique,
  onOpenMitigation,
  onOpenSoftware,
}: {
  value: string;
  onChange: (value: string) => void;
  results: SearchResult[];
  onOpenDoc: (path: string) => void;
  onOpenTechnique: (id: string) => void;
  onOpenMitigation: (id: string) => void;
  onOpenSoftware: (id: string) => void;
}) {
  const hasQuery = value.trim().length > 0;

  return (
    <div className="top-search-wrap">
      <label className="top-search">
        <span>Search</span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Technique, actor, mitigation, software, incident..."
        />
      </label>
      {hasQuery && (
        <div className="search-popover">
          {results.length > 0 ? (
            results.map((result) => (
              <button
                key={`${result.kind}-${result.path}`}
                type="button"
                onClick={() => {
                  if (result.kind === "Technique") {
                    onOpenTechnique(result.path);
                    onChange("");
                    return;
                  }
                  if (result.kind === "Mitigation") {
                    onOpenMitigation(result.path);
                    onChange("");
                    return;
                  }
                  if (result.kind === "Software") {
                    onOpenSoftware(result.path);
                    onChange("");
                    return;
                  }
                  onOpenDoc(result.path);
                  onChange("");
                }}
              >
                <span>{result.kind}</span>
                <strong>{result.title}</strong>
                <small>{result.subtitle}</small>
              </button>
            ))
          ) : (
            <div className="search-empty">No direct matches. Try a technique ID, actor, chain, or incident name.</div>
          )}
        </div>
      )}
    </div>
  );
}

function Icon({ name }: { name: IconName }) {
  return (
    <span className="ui-icon" aria-hidden="true">
      <svg viewBox="0 0 48 48" focusable="false">
        {name === "matrix" && (
          <g>
            <rect x="6" y="8" width="9" height="9" rx="1.5" />
            <rect x="19.5" y="8" width="9" height="9" rx="1.5" className="fill-accent" />
            <rect x="33" y="8" width="9" height="9" rx="1.5" />
            <rect x="6" y="19.5" width="9" height="9" rx="1.5" />
            <rect x="19.5" y="19.5" width="9" height="9" rx="1.5" />
            <rect x="33" y="19.5" width="9" height="9" rx="1.5" className="fill-accent" />
            <rect x="6" y="31" width="9" height="9" rx="1.5" className="fill-accent" />
            <rect x="19.5" y="31" width="9" height="9" rx="1.5" />
            <rect x="33" y="31" width="9" height="9" rx="1.5" />
          </g>
        )}
        {name === "technique" && (
          <g>
            <path d="M11 7h22l4 4v30H11Z" />
            <path d="M16 18l-3 3 3 3M32 18l3 3-3 3M22 27l4-12" />
          </g>
        )}
        {name === "incident" && (
          <g>
            <path d="M24 6l16 8v9c0 11-7 16-16 19-9-3-16-8-16-19v-9Z" />
            <path d="M24 16l-4 9h6l-3 8" className="fill-accent" />
          </g>
        )}
        {name === "actor" && (
          <g>
            <path d="M24 8c-7 0-11 5-11 11v3h22v-3c0-6-4-11-11-11Z" />
            <path d="M13 22h22v6c0 6-5 12-11 12S13 34 13 28Z" />
            <circle cx="20" cy="29" r="1.6" className="fill-accent" />
            <circle cx="28" cy="29" r="1.6" className="fill-accent" />
          </g>
        )}
        {name === "coverage" && (
          <g>
            <path d="M24 5l16 6v10c0 11-7 18-16 22-9-4-16-11-16-22V11Z" />
            <path d="M16 23l6 6 11-12" />
          </g>
        )}
        {name === "citation" && (
          <g>
            <path d="M9 9h17l6 6v24H9Z" />
            <path d="M26 9v6h6" />
            <path d="M14 22l3-4 3 4-3 4ZM23 22l3-4 3 4-3 4Z" className="fill-accent" />
            <path d="M14 33h17" />
            <path d="M37 16l4 4-4 4" />
          </g>
        )}
        {name === "why" && (
          <g>
            <circle cx="16" cy="20" r="9" />
            <circle cx="32" cy="28" r="9" />
            <path d="M16 20h16" />
          </g>
        )}
        {name === "who" && (
          <g>
            <circle cx="14" cy="16" r="4" />
            <circle cx="34" cy="16" r="4" />
            <circle cx="24" cy="32" r="4" />
            <path d="M14 21v6M34 21v6M24 25v0" />
            <path d="M16 26h16M14 28l8 4M34 28l-8 4" />
          </g>
        )}
        {name === "how" && (
          <g>
            <rect x="6" y="20" width="9" height="9" rx="1.5" />
            <rect x="19.5" y="20" width="9" height="9" rx="1.5" />
            <rect x="33" y="20" width="9" height="9" rx="1.5" />
            <path d="M15 24.5h4M28.5 24.5h4" />
            <path d="M17 22.5l2 2-2 2M30.5 22.5l2 2-2 2" className="fill-accent" />
          </g>
        )}
        {name === "contribute" && (
          <g>
            <circle cx="13" cy="11" r="4" />
            <circle cx="13" cy="37" r="4" />
            <circle cx="35" cy="24" r="4" />
            <path d="M13 15v18" />
            <path d="M13 24h12c4 0 6-2 6-5v-3" />
          </g>
        )}
        {name === "market" && (
          <g>
            <path d="M6 41h36" />
            <path d="M11 19v18M11 22v12h-3v-12ZM11 22v12h3v-12Z" className="fill-accent" />
            <path d="M22 12v25M22 16v18h-3v-18ZM22 16v18h3v-18Z" />
            <path d="M33 25v12M33 28v6h-3v-6ZM33 28v6h3v-6Z" className="fill-accent" />
          </g>
        )}
        {name === "evidence" && (
          <g>
            <circle cx="20" cy="22" r="11" />
            <path d="M20 16v12M14 22h12" />
            <path d="M28 30l10 10" />
          </g>
        )}
      </svg>
    </span>
  );
}
function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

type GraphNode = {
  id: string;
  name: string;
  x: number;
  y: number;
  kind: "mitigation" | "software" | "actor";
};

function RelationshipGraph({
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

const TACTIC_NAMES_SHORT: Record<string, string> = {
  T1: "Token Genesis",
  T2: "Liquidity Establishment",
  T3: "Holder Capture",
  T4: "Access Acquisition",
  T5: "Value Extraction",
  T6: "Defense Evasion",
  T7: "Laundering",
  T8: "Operational Reuse",
  T9: "Smart-Contract Exploit",
  T10: "Bridge / Cross-Chain",
  T11: "Custody / Signing",
  T12: "NFT-Specific",
  T13: "Account Abstraction",
  T14: "Validator / Staking",
  T15: "Off-chain Entry-Vector",
  T16: "Governance / Voting",
};

const TACTIC_ORDER = ["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12","T13","T14","T15","T16"];
const ATTRIBUTION_ORDER = ["confirmed","inferred-strong","inferred-weak","pseudonymous","unattributed","(missing)"];
// Attribution colors derive from OAK's single accent (electric teal) with
// decreasing opacity for decreasing rigor; lower-rigor categories fall onto
// muted gray so the visual emphasis stays on the strong-attribution share.
const ATTRIBUTION_COLORS: Record<string, string> = {
  "confirmed": "rgba(0, 255, 209, 1)",
  "inferred-strong": "rgba(0, 255, 209, 0.7)",
  "inferred-weak": "rgba(0, 255, 209, 0.4)",
  "pseudonymous": "rgba(184, 186, 192, 0.55)",
  "unattributed": "rgba(139, 142, 150, 0.4)",
  "(missing)": "rgba(139, 142, 150, 0.25)",
};

type CovStats = NonNullable<typeof siteData.coverage>;

function CorpusStats({ openDoc }: { openDoc: (path: string) => void }) {
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

function CoverageMatrix({
  onOpenTechnique,
  onOpenDoc,
}: {
  onOpenTechnique: (id: string) => void;
  onOpenDoc: (path: string) => void;
}) {
  const [statusFilter, setStatusFilter] = useState<"all" | "full" | "partial" | "gap">("all");

  const rows = useMemo(() => {
    return siteData.coverageRows
      .map((row) => {
        const idMatch = row.technique.match(/^(OAK-T\d+(?:\.\d+)?)/);
        const id = idMatch ? idMatch[1] : "";
        const name = row.technique.replace(/^OAK-T\d+(?:\.\d+)?\s*[—-]?\s*/, "").trim();
        const isTechnique = /\./.test(id);
        return { id, name, status: row.status, impl: row.implementation, notes: row.notes, isTechnique };
      })
      .filter((row) => row.isTechnique);
  }, []);

  const filtered = useMemo(() => {
    if (statusFilter === "all") return rows;
    return rows.filter((r) => r.status === statusFilter);
  }, [rows, statusFilter]);

  const counts = useMemo(() => {
    const c = { full: 0, partial: 0, gap: 0 };
    for (const r of rows) {
      if (r.status === "full") c.full++;
      else if (r.status === "partial") c.partial++;
      else if (r.status === "gap") c.gap++;
    }
    return c;
  }, [rows]);

  const total = counts.full + counts.partial + counts.gap;
  const fullPct = total > 0 ? Math.round((counts.full / total) * 100) : 0;
  const partialPct = total > 0 ? Math.round((counts.partial / total) * 100) : 0;
  const gapPct = total > 0 ? 100 - fullPct - partialPct : 0;

  return (
    <>
      <div className="section-heading">
        <p className="eyebrow">Coverage</p>
        <h2>Per-Technique reference-implementation status.</h2>
        <p>
          OAK deliberately publishes detection gaps alongside covered techniques.
          {" "}
          {rows.length} sub-Techniques scored against the v0.1 reference implementation
          (<code>mg-detectors-rs</code>); v0.5 expands to a multi-vendor matrix per the roadmap.
        </p>
      </div>
      <div className="coverage-summary">
        <div className="coverage-bar" aria-hidden>
          <div className="cov-seg cov-full" style={{ width: `${fullPct}%` }} />
          <div className="cov-seg cov-partial" style={{ width: `${partialPct}%` }} />
          <div className="cov-seg cov-gap" style={{ width: `${gapPct}%` }} />
        </div>
        <div className="coverage-legend">
          <button
            type="button"
            className={"cov-pill cov-full" + (statusFilter === "full" ? " active" : "")}
            onClick={() => setStatusFilter(statusFilter === "full" ? "all" : "full")}
          >
            <strong>{counts.full}</strong> full
          </button>
          <button
            type="button"
            className={"cov-pill cov-partial" + (statusFilter === "partial" ? " active" : "")}
            onClick={() => setStatusFilter(statusFilter === "partial" ? "all" : "partial")}
          >
            <strong>{counts.partial}</strong> partial
          </button>
          <button
            type="button"
            className={"cov-pill cov-gap" + (statusFilter === "gap" ? " active" : "")}
            onClick={() => setStatusFilter(statusFilter === "gap" ? "all" : "gap")}
          >
            <strong>{counts.gap}</strong> gap
          </button>
          {statusFilter !== "all" && (
            <button type="button" className="cov-pill cov-reset" onClick={() => setStatusFilter("all")}>
              Show all
            </button>
          )}
          <button
            type="button"
            className="cov-pill cov-doc"
            onClick={() => onOpenDoc("COVERAGE.md")}
          >
            View raw COVERAGE.md
          </button>
        </div>
      </div>
      <div className="coverage-table-wrap">
        <table className="coverage-table">
          <thead>
            <tr>
              <th>Technique</th>
              <th>Status</th>
              <th>Implementation</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr
                key={row.id}
                className={`cov-row cov-row-${row.status}`}
                onClick={() => onOpenTechnique(row.id)}
                title="Open technique"
              >
                <td>
                  <span className="cov-id">{row.id}</span>
                  <span className="cov-name">{row.name}</span>
                </td>
                <td>
                  <span className={`cov-pill cov-${row.status} small`}>{row.status}</span>
                </td>
                <td><code>{row.impl}</code></td>
                <td>{row.notes}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={4} style={{ textAlign: "center", padding: "32px", color: "var(--muted)" }}>No techniques match.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

const KILL_CHAIN_PRIMARY: readonly string[] = ["OAK-T1","OAK-T2","OAK-T3","OAK-T4","OAK-T5","OAK-T6","OAK-T7","OAK-T8"];

function KillChainBanner({
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

function TacticColumn({
  tactic,
  techniqueIds,
  onOpenTechnique,
}: {
  tactic: Tactic;
  techniqueIds: readonly string[];
  onOpenTechnique: (id: string) => void;
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

          return (
            <button
              type="button"
              className="technique-card"
              key={id}
              onClick={() => onOpenTechnique(technique.id)}
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

type DocumentMetaItem = {
  readonly label: string;
  readonly value: string;
};

const primaryMetaLabels: Record<string, string[]> = {
  Incident: ["Loss", "Recovery", "Actor", "Attribution status", "OAK Techniques observed"],
  Technique: ["Parent Tactics", "Maturity", "Chains", "First documented", "Aliases"],
  Actor: ["Attribution status", "Observed Techniques"],
  Tactic: ["Phase"],
  Document: [],
};

const metaDisplayValue = (value: string) =>
  cleanInlineText(value)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1");

const shortMetaValue = (value: string, maxLength = 150) => {
  const display = metaDisplayValue(value);
  return display.length > maxLength ? `${display.slice(0, maxLength).trim()}...` : display;
};

const splitMeta = (kind: string, meta: readonly DocumentMetaItem[] = []) => {
  const primaryLabels = primaryMetaLabels[kind] ?? [];
  const isLong = (item: DocumentMetaItem) => metaDisplayValue(item.value).length > 220;

  const notes = meta.filter(
    (item) => !primaryLabels.includes(item.label) && isLong(item),
  );
  const noteSet = new Set(notes);

  const primaryFromLabels = meta.filter(
    (item) => primaryLabels.includes(item.label) && !isLong(item),
  );
  const primary =
    primaryFromLabels.length > 0
      ? primaryFromLabels
      : meta.filter((item) => !isLong(item)).slice(0, 4);
  const primarySet = new Set(primary);

  const secondary = meta.filter(
    (item) => !primarySet.has(item) && !noteSet.has(item),
  );

  return { primary, secondary, notes };
};

function DocumentHero({
  kind,
  path,
  title,
  meta,
}: {
  kind: string;
  path: string;
  title: string;
  meta: readonly DocumentMetaItem[];
}) {
  const { primary, secondary, notes } = splitMeta(kind, meta);
  const [contextOpen, setContextOpen] = useState(false);
  const hasContext = secondary.length > 0 || notes.length > 0;

  return (
    <header className="document-hero">
      <div>
        <span className="document-kind">{kind}</span>
        <h1>{title}</h1>
        <code>{path}</code>
      </div>
      {primary.length > 0 && (
        <section className="document-facts" aria-label="Document metadata">
          {primary.slice(0, 3).map((item) => (
            <div key={item.label}>
              <span>{item.label}</span>
              <strong>{shortMetaValue(item.value)}</strong>
            </div>
          ))}
        </section>
      )}
      {hasContext && (
        <button
          type="button"
          className="document-context-toggle"
          onClick={() => setContextOpen((v) => !v)}
        >
          {contextOpen ? "Hide context" : `Show context (${secondary.length + notes.length})`}
        </button>
      )}
      {hasContext && contextOpen && (
        <>
          {secondary.length > 0 && (
            <div className="document-chip-row">
              {secondary.slice(0, 8).map((item) => (
                <span key={item.label}>
                  {item.label}: {shortMetaValue(item.value, 70)}
                </span>
              ))}
            </div>
          )}
          {notes.length > 0 && (
            <section className="document-notes" aria-label="Context notes">
              {notes.slice(0, 3).map((item) => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <p>{metaDisplayValue(item.value)}</p>
                </article>
              ))}
            </section>
          )}
        </>
      )}
    </header>
  );
}

function MarkdownDocument({
  path,
  onClose,
  onOpenDoc,
}: {
  path: string;
  onClose: () => void;
  onOpenDoc: (path: string) => void;
}) {
  const indexEntry = siteData.documentIndex[path as keyof typeof siteData.documentIndex];
  const html = documentBodies[path];
  const loadState: "loaded" | "missing" = typeof html === "string" ? "loaded" : "missing";

  const documentKind = path.startsWith("examples/")
    ? "Incident"
    : path.startsWith("techniques/")
      ? "Technique"
      : path.startsWith("actors/")
        ? "Actor"
        : path.startsWith("tactics/")
          ? "Tactic"
          : path.startsWith("mitigations/")
            ? "Mitigation"
            : path.startsWith("software/")
              ? "Software"
              : "Document";

  const docBreadcrumb = [
    { label: documentKind === "Document" ? "Documents" : `${documentKind}s`, onClick: onClose },
    { label: indexEntry?.title ?? path },
  ];

  return (
    <section className="document-page">
      <Breadcrumb onBack={onClose} items={docBreadcrumb} />

      <div className="document-layout">
        <aside className="document-sidebar">
          <span>{documentKind}</span>
          <strong>{indexEntry?.title ?? path}</strong>
          <code>{path}</code>
          {indexEntry?.toc && indexEntry.toc.length > 0 && (
            <nav>
              {indexEntry.toc.map((item) => {
                const slug = item
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "");
                return (
                  <a
                    key={item}
                    href={`#${slug}`}
                    onClick={(event) => {
                      event.preventDefault();
                      const heading = window.document.querySelector(`#${CSS.escape(slug)}`);
                      if (heading) {
                        heading.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                  >
                    {item}
                  </a>
                );
              })}
            </nav>
          )}
          <div className="detail-actions detail-actions-stack">
            <a
              className="button button-secondary"
              href={reportIssueUrl(documentKind, path, indexEntry?.title ?? path)}
              target="_blank"
              rel="noreferrer"
            >
              Report inaccuracy
            </a>
            <a
              className="button button-secondary"
              href={`${REPO_URL}/blob/main/${path}`}
              target="_blank"
              rel="noreferrer"
            >
              View source on GitHub
            </a>
          </div>
        </aside>

        <article className="markdown-shell">
          {!indexEntry && (
            <p className="document-state">
              This document is not in the precompiled site bundle yet.
            </p>
          )}
          {indexEntry && loadState === "missing" && (
            <p className="document-state">Document body not available.</p>
          )}
          {indexEntry && loadState === "loaded" && typeof html === "string" && !path.endsWith(".md") && (
            <pre className="raw-document">
              <code>{html}</code>
            </pre>
          )}
          {indexEntry && loadState === "loaded" && typeof html === "string" && path.endsWith(".md") && (
            <>
              <DocumentHero
                kind={documentKind}
                path={path}
                title={indexEntry.title}
                meta={indexEntry.meta ?? []}
              />
              <div
                className="markdown-body"
                onClick={(event) => {
                  const target = event.target;
                  if (!(target instanceof HTMLAnchorElement)) return;
                  const href = target.getAttribute("href") ?? "";
                  const resolvedHref = resolveMarkdownHref(path, href);
                  // Intra-corpus markdown link → open in-app via the React
                  // router instead of letting the browser navigate to the
                  // raw .md file.
                  const isExternal =
                    resolvedHref.startsWith("http://") ||
                    resolvedHref.startsWith("https://") ||
                    resolvedHref.startsWith("mailto:") ||
                    resolvedHref.startsWith("#");
                  const docTarget = !isExternal && resolvedHref.endsWith(".md") ? resolvedHref : "";
                  if (!docTarget) return;
                  event.preventDefault();
                  onOpenDoc(docTarget);
                }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </>
          )}
        </article>
      </div>
      </section>
  );
}

function TechniqueDetailPage({
  techniqueId,
  onClose,
  onOpenDoc,
  onOpenTechnique,
}: {
  techniqueId: string;
  onClose: () => void;
  onOpenDoc: (path: string) => void;
  onOpenTechnique: (id: string) => void;
}) {
  const technique = techniqueById.get(techniqueId);
  const breadcrumb = [
    { label: "Matrix", onClick: onClose },
    { label: technique ? `${technique.id} ${technique.name}` : techniqueId },
  ];
  if (!technique) {
    return (
      <section className="document-page">
      <Breadcrumb onBack={onClose} items={breadcrumb} />
        <div className="document-layout">
          <article className="document-content">
            <h1>Technique not found</h1>
            <p>
              <code>{techniqueId}</code> is not in the current OAK build. The relationship graph and
              identifier may have moved.
            </p>
          </article>
        </div>
      </section>
    );
  }

  const parentTactics = technique.parentTactics
    .map((parentId) => siteData.tactics.find((tac) => tac.id === parentId))
    .filter((tac): tac is (typeof siteData.tactics)[number] => Boolean(tac));

  const relatedMitigations = siteData.mitigations
    .filter((m) => (m.mapsToTechniques as readonly string[]).includes(techniqueId))
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id));

  const relatedSoftware = siteData.software
    .filter((s) => (s.observedTechniques as readonly string[]).includes(techniqueId))
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id));

  const relatedExamples = siteData.examples
    .filter((e) => (e.techniques as readonly string[]).includes(techniqueId))
    .slice()
    .sort((a, b) => b.file.localeCompare(a.file));

  const relatedActors = siteData.actors
    .filter((a) => (a.observedTechniques as readonly string[]).includes(techniqueId))
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id));

  return (
    <section className="document-page technique-detail-page">
      <Breadcrumb onBack={onClose} items={breadcrumb} />

      <div className="document-layout">
        <aside className="document-sidebar">
          <span>Technique</span>
          <strong>
            {technique.id} — {technique.name}
          </strong>
          <code>{technique.sourcePath}</code>
          <div className="technique-detail-meta">
            <small>
              <strong>Maturity:</strong> {technique.maturity || "documented"}
            </small>
            {technique.chains.length > 0 && (
              <small>
                <strong>Chains:</strong> {technique.chains.join(", ")}
              </small>
            )}
            {technique.firstDocumented && (
              <small>
                <strong>First documented:</strong> {technique.firstDocumented}
              </small>
            )}
            {technique.aliases.length > 0 && (
              <small>
                <strong>Aliases:</strong> {technique.aliases.join(", ")}
              </small>
            )}
          </div>
          <div className="detail-actions">
            <button
              type="button"
              className="button button-primary"
              onClick={() => onOpenDoc(technique.sourcePath)}
            >
              Open full markdown
            </button>
            <a
              className="button button-secondary"
              href={reportIssueUrl("Technique", technique.sourcePath, `${technique.id} — ${technique.name}`)}
              target="_blank"
              rel="noreferrer"
            >
              Report inaccuracy
            </a>
          </div>
        </aside>

        <article className="document-content technique-detail-content">
          <header className="technique-detail-header">
            <p className="eyebrow">{technique.id}</p>
            <h1>{technique.name}</h1>
            {technique.aliases.length > 0 && (
              <p className="aka-banner">
                <span className="aka-label">also known as</span>
                {technique.aliases.map((alias, idx) => (
                  <span className="aka-tag" key={alias}>
                    {alias}
                    {idx < technique.aliases.length - 1 ? "" : ""}
                  </span>
                ))}
              </p>
            )}
            {parentTactics.length > 0 && (
              <p className="technique-detail-tactic">
                Parent {parentTactics.length === 1 ? "tactic" : "tactics"}:{" "}
                {parentTactics.map((tac, idx) => (
                  <span key={tac.id}>
                    <strong>{tac.id}</strong> — {tac.name}
                    {idx < parentTactics.length - 1 ? "; " : ""}
                  </span>
                ))}
              </p>
            )}
          </header>

          {(relatedMitigations.length + relatedSoftware.length + relatedActors.length) > 0 && (
            <section className="technique-detail-section">
              <h2>Relationship neighborhood</h2>
              <RelationshipGraph
                centerId={technique.id}
                centerLabel={technique.name}
                mitigations={relatedMitigations.map((m) => ({ id: m.id, name: m.name }))}
                software={relatedSoftware.map((s) => ({ id: s.id, name: s.name }))}
                actors={relatedActors.map((a) => ({ id: a.id, name: a.title.replace(/^OAK-G\d{2}\s+[—-]\s+/, "") }))}
                onOpenMitigation={(id) => {
                  const m = siteData.mitigations.find((x) => x.id === id);
                  if (m) onOpenDoc(m.sourcePath);
                }}
                onOpenSoftware={(id) => {
                  const s = siteData.software.find((x) => x.id === id);
                  if (s) onOpenDoc(s.sourcePath);
                }}
                onOpenActor={(id) => {
                  const a = siteData.actors.find((x) => x.id === id);
                  if (a) onOpenDoc(`actors/${a.file}`);
                }}
              />
            </section>
          )}

          <section className="technique-detail-section">
            <h2>Mitigations ({relatedMitigations.length})</h2>
            {relatedMitigations.length === 0 ? (
              <p className="empty-row">No mapped Mitigations yet — see TAXONOMY-GAPS.md.</p>
            ) : (
              <div className="mitigation-grid">
                {relatedMitigations.map((m) => (
                  <button
                    type="button"
                    className="mitigation-card"
                    key={m.id}
                    onClick={() => onOpenDoc(m.sourcePath)}
                  >
                    <span>{m.id}</span>
                    <strong>{m.name}</strong>
                    <small>{m.class} · {m.audience.slice(0, 2).join(" / ")}</small>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="technique-detail-section">
            <h2>Software ({relatedSoftware.length})</h2>
            {relatedSoftware.length === 0 ? (
              <p className="empty-row">No mapped Software yet.</p>
            ) : (
              <div className="software-grid">
                {relatedSoftware.map((s) => (
                  <button
                    type="button"
                    className="software-card"
                    key={s.id}
                    onClick={() => onOpenDoc(s.sourcePath)}
                  >
                    <span>{s.id}</span>
                    <strong>{s.name}</strong>
                    <small>
                      {s.type}
                      {s.usedByGroups.length > 0 && ` · ${s.usedByGroups.join(", ")}`}
                    </small>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="technique-detail-section">
            <h2>Threat Actors ({relatedActors.length})</h2>
            {relatedActors.length === 0 ? (
              <p className="empty-row">No mapped Threat Actors yet.</p>
            ) : (
              <div className="actor-strip">
                {relatedActors.map((actor) => (
                  <button
                    type="button"
                    className="actor-card"
                    key={actor.id}
                    onClick={() => onOpenDoc(`actors/${actor.file}`)}
                  >
                    <span>{actor.id}</span>
                    <strong>{actor.title.replace(/^OAK-G\d{2}\s+—\s+/, "")}</strong>
                    <small>{actor.status || "attribution profile"}</small>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="technique-detail-section">
            <h2>Worked Examples ({relatedExamples.length})</h2>
            {relatedExamples.length === 0 ? (
              <p className="empty-row">No worked examples yet — contributions welcome via PR.</p>
            ) : (
              <ul className="technique-detail-examples">
                {relatedExamples.map((example) => (
                  <li key={example.file}>
                    <button
                      type="button"
                      className="link-row"
                      onClick={() => onOpenDoc(`examples/${example.file}`)}
                    >
                      <strong>{example.title}</strong>
                      <small>
                        {example.year && `${example.year} · `}
                        {example.loss}
                      </small>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {(technique.aliases.length > 0 || technique.firstDocumented) && (
            <section className="technique-detail-section">
              <h2>Provenance</h2>
              <dl className="technique-detail-dl">
                {technique.firstDocumented && (
                  <>
                    <dt>First documented</dt>
                    <dd>{technique.firstDocumented}</dd>
                  </>
                )}
                {technique.aliases.length > 0 && (
                  <>
                    <dt>Aliases</dt>
                    <dd>{technique.aliases.join(", ")}</dd>
                  </>
                )}
                {technique.chains.length > 0 && (
                  <>
                    <dt>Chains</dt>
                    <dd>{technique.chains.join(", ")}</dd>
                  </>
                )}
              </dl>
            </section>
          )}

          <section className="technique-detail-section">
            <h2>Full description</h2>
            <InlineMarkdown path={technique.sourcePath} />
          </section>
        </article>
      </div>
      </section>
  );
}

function MitigationDetailPage({
  mitigationId,
  onClose,
  onOpenDoc,
  onOpenTechnique,
}: {
  mitigationId: string;
  onClose: () => void;
  onOpenDoc: (path: string) => void;
  onOpenTechnique: (id: string) => void;
}) {
  const mitigation = siteData.mitigations.find((m) => m.id === mitigationId);
  const breadcrumb = [
    { label: "Mitigations", onClick: onClose },
    { label: mitigation ? `${mitigation.id} ${mitigation.name}` : mitigationId },
  ];
  if (!mitigation) {
    return (
      <section className="document-page">
      <Breadcrumb onBack={onClose} items={breadcrumb} />
        <div className="document-layout">
          <article className="document-content">
            <h1>Mitigation not found</h1>
            <p><code>{mitigationId}</code> is not in the current OAK build.</p>
          </article>
        </div>
      </section>
    );
  }

  const mappedTechniques = mitigation.mapsToTechniques
    .map((id) => techniqueById.get(id))
    .filter((t): t is Technique => Boolean(t))
    .sort((a, b) => a.id.localeCompare(b.id));

  return (
    <section className="document-page technique-detail-page">
      <Breadcrumb onBack={onClose} items={breadcrumb} />
      <div className="document-layout">
        <aside className="document-sidebar">
          <span>Mitigation</span>
          <strong>{mitigation.id} — {mitigation.name}</strong>
          <code>{mitigation.sourcePath}</code>
          <div className="technique-detail-meta">
            <small><strong>Class:</strong> {mitigation.class}</small>
            {mitigation.audience.length > 0 && (
              <small><strong>Audience:</strong> {mitigation.audience.join(", ")}</small>
            )}
            <small><strong>Maps to:</strong> {mappedTechniques.length} {mappedTechniques.length === 1 ? "Technique" : "Techniques"}</small>
          </div>
          <div className="detail-actions">
            <button
              type="button"
              className="button button-primary"
              onClick={() => onOpenDoc(mitigation.sourcePath)}
            >
              Open full markdown
            </button>
            <a
              className="button button-secondary"
              href={reportIssueUrl("Mitigation", mitigation.sourcePath, `${mitigation.id} — ${mitigation.name}`)}
              target="_blank"
              rel="noreferrer"
            >
              Report inaccuracy
            </a>
          </div>
        </aside>
        <article className="document-content technique-detail-content">
          <header className="technique-detail-header">
            <p className="eyebrow">{mitigation.id}</p>
            <h1>{mitigation.name}</h1>
            <p className="technique-detail-tactic">
              <strong>{mitigation.class}</strong> · audience: {mitigation.audience.join(", ")}
            </p>
          </header>

          <section className="technique-detail-section">
            <h2>Techniques mitigated ({mappedTechniques.length})</h2>
            {mappedTechniques.length === 0 ? (
              <p className="empty-row">No mapped Techniques.</p>
            ) : (
              <div className="technique-grid">
                {mappedTechniques.map((t) => (
                  <button
                    type="button"
                    className="technique-card"
                    key={t.id}
                    onClick={() => onOpenTechnique(t.id)}
                  >
                    <span>{t.id}</span>
                    <strong>{t.name}</strong>
                    <small>
                      {t.maturity || "documented"} · {t.chains.slice(0, 2).join(" / ")}
                    </small>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="technique-detail-section">
            <h2>Full description</h2>
            <InlineMarkdown path={mitigation.sourcePath} />
          </section>
        </article>
      </div>
      </section>
  );
}

function SoftwareDetailPage({
  softwareId,
  onClose,
  onOpenDoc,
  onOpenTechnique,
  onOpenGroup,
}: {
  softwareId: string;
  onClose: () => void;
  onOpenDoc: (path: string) => void;
  onOpenTechnique: (id: string) => void;
  onOpenGroup: (id: string) => void;
}) {
  const software = siteData.software.find((s) => s.id === softwareId);
  const breadcrumb = [
    { label: "Software", onClick: onClose },
    { label: software ? `${software.id} ${software.name}` : softwareId },
  ];
  if (!software) {
    return (
      <section className="document-page">
      <Breadcrumb onBack={onClose} items={breadcrumb} />
        <div className="document-layout">
          <article className="document-content">
            <h1>Software not found</h1>
            <p><code>{softwareId}</code> is not in the current OAK build.</p>
          </article>
        </div>
      </section>
    );
  }

  const observedTechniques = software.observedTechniques
    .map((id) => techniqueById.get(id))
    .filter((t): t is Technique => Boolean(t))
    .sort((a, b) => a.id.localeCompare(b.id));

  const usedByGroups = software.usedByGroups
    .map((gid) => siteData.actors.find((a) => a.id === gid))
    .filter((a): a is (typeof siteData.actors)[number] => Boolean(a))
    .sort((a, b) => a.id.localeCompare(b.id));

  return (
    <section className="document-page technique-detail-page">
      <Breadcrumb onBack={onClose} items={breadcrumb} />
      <div className="document-layout">
        <aside className="document-sidebar">
          <span>Software</span>
          <strong>{software.id} — {software.name}</strong>
          <code>{software.sourcePath}</code>
          <div className="technique-detail-meta">
            <small><strong>Type:</strong> {software.type}</small>
            {software.active && (
              <small><strong>Active:</strong> {software.active.slice(0, 60)}{software.active.length > 60 ? "…" : ""}</small>
            )}
            {software.firstObserved && (
              <small><strong>First observed:</strong> {software.firstObserved.slice(0, 60)}{software.firstObserved.length > 60 ? "…" : ""}</small>
            )}
            {software.hostPlatforms.length > 0 && (
              <small><strong>Platforms:</strong> {software.hostPlatforms.slice(0, 3).join(", ")}</small>
            )}
          </div>
          <div className="detail-actions">
            <button
              type="button"
              className="button button-primary"
              onClick={() => onOpenDoc(software.sourcePath)}
            >
              Open full markdown
            </button>
            <a
              className="button button-secondary"
              href={reportIssueUrl("Software", software.sourcePath, `${software.id} — ${software.name}`)}
              target="_blank"
              rel="noreferrer"
            >
              Report inaccuracy
            </a>
          </div>
        </aside>
        <article className="document-content technique-detail-content">
          <header className="technique-detail-header">
            <p className="eyebrow">{software.id}</p>
            <h1>{software.name}</h1>
            <p className="technique-detail-tactic">
              <strong>{software.type}</strong>
              {software.aliases.length > 0 && ` · aliases: ${software.aliases.slice(0, 3).join(", ")}`}
            </p>
          </header>

          <section className="technique-detail-section">
            <h2>Used by Groups ({usedByGroups.length})</h2>
            {usedByGroups.length === 0 ? (
              <p className="empty-row">Not yet linked to a Group entry.</p>
            ) : (
              <div className="actor-strip">
                {usedByGroups.map((actor) => (
                  <button
                    type="button"
                    className="actor-card"
                    key={actor.id}
                    onClick={() => onOpenGroup(actor.id)}
                  >
                    <span>{actor.id}</span>
                    <strong>{actor.title.replace(/^OAK-G\d{2}\s+—\s+/, "")}</strong>
                    <small>{actor.status || "attribution profile"}</small>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="technique-detail-section">
            <h2>Observed Techniques ({observedTechniques.length})</h2>
            {observedTechniques.length === 0 ? (
              <p className="empty-row">No mapped Techniques.</p>
            ) : (
              <div className="technique-grid">
                {observedTechniques.map((t) => (
                  <button
                    type="button"
                    className="technique-card"
                    key={t.id}
                    onClick={() => onOpenTechnique(t.id)}
                  >
                    <span>{t.id}</span>
                    <strong>{t.name}</strong>
                    <small>
                      {t.maturity || "documented"} · {t.chains.slice(0, 2).join(" / ")}
                    </small>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="technique-detail-section">
            <h2>Full description</h2>
            <InlineMarkdown path={software.sourcePath} />
          </section>
        </article>
      </div>
      </section>
  );
}

function GroupDetailPage({
  groupId,
  onClose,
  onOpenDoc,
  onOpenTechnique,
  onOpenSoftware,
}: {
  groupId: string;
  onClose: () => void;
  onOpenDoc: (path: string) => void;
  onOpenTechnique: (id: string) => void;
  onOpenSoftware: (id: string) => void;
}) {
  const actor = siteData.actors.find((a) => a.id === groupId);
  const breadcrumb = [
    { label: "Threat actors", onClick: onClose },
    { label: actor ? actor.title : groupId },
  ];
  if (!actor) {
    return (
      <section className="document-page">
      <Breadcrumb onBack={onClose} items={breadcrumb} />
        <div className="document-layout">
          <article className="document-content">
            <h1>Threat Actor not found</h1>
            <p><code>{groupId}</code> is not in the current OAK build.</p>
          </article>
        </div>
      </section>
    );
  }

  const observedTechniques = (actor.observedTechniques as readonly string[])
    .map((id) => techniqueById.get(id))
    .filter((t): t is Technique => Boolean(t))
    .sort((a, b) => a.id.localeCompare(b.id));

  const usesSoftware = siteData.software
    .filter((s) => (s.usedByGroups as readonly string[]).includes(groupId))
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id));

  const groupExamples = siteData.examples
    .filter((e) => (e.actors as readonly string[]).includes(groupId))
    .slice()
    .sort((a, b) => b.file.localeCompare(a.file));

  return (
    <section className="document-page technique-detail-page">
      <Breadcrumb onBack={onClose} items={breadcrumb} />
      <div className="document-layout">
        <aside className="document-sidebar">
          <span>Threat Actor</span>
          <strong>{actor.title}</strong>
          <code>actors/{actor.file}</code>
          <div className="technique-detail-meta">
            {actor.status && (
              <small><strong>Attribution:</strong> {actor.status.slice(0, 80)}{actor.status.length > 80 ? "…" : ""}</small>
            )}
            <small><strong>Observed Techniques:</strong> {observedTechniques.length}</small>
            <small><strong>Uses Software:</strong> {usesSoftware.length}</small>
            <small><strong>Worked Examples:</strong> {groupExamples.length}</small>
          </div>
          <div className="detail-actions">
            <button
              type="button"
              className="button button-primary"
              onClick={() => onOpenDoc(`actors/${actor.file}`)}
            >
              Open full markdown
            </button>
            <a
              className="button button-secondary"
              href={reportIssueUrl("Actor", `actors/${actor.file}`, `${actor.id} — ${actor.title}`)}
              target="_blank"
              rel="noreferrer"
            >
              Report inaccuracy
            </a>
          </div>
        </aside>
        <article className="document-content technique-detail-content">
          <header className="technique-detail-header">
            <p className="eyebrow">{actor.id}</p>
            <h1>{actor.title.replace(/^OAK-G\d{2}\s+—\s+/, "")}</h1>
            {actor.status && (
              <p className="technique-detail-tactic">{actor.status}</p>
            )}
          </header>

          <section className="technique-detail-section">
            <h2>Software used ({usesSoftware.length})</h2>
            {usesSoftware.length === 0 ? (
              <p className="empty-row">No directly-mapped Software entries.</p>
            ) : (
              <div className="software-grid">
                {usesSoftware.map((s) => (
                  <button
                    type="button"
                    className="software-card"
                    key={s.id}
                    onClick={() => onOpenSoftware(s.id)}
                  >
                    <span>{s.id}</span>
                    <strong>{s.name}</strong>
                    <small>{s.type}</small>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="technique-detail-section">
            <h2>Observed Techniques ({observedTechniques.length})</h2>
            {observedTechniques.length === 0 ? (
              <p className="empty-row">No mapped Techniques.</p>
            ) : (
              <div className="technique-grid">
                {observedTechniques.map((t) => (
                  <button
                    type="button"
                    className="technique-card"
                    key={t.id}
                    onClick={() => onOpenTechnique(t.id)}
                  >
                    <span>{t.id}</span>
                    <strong>{t.name}</strong>
                    <small>
                      {t.maturity || "documented"} · {t.chains.slice(0, 2).join(" / ")}
                    </small>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="technique-detail-section">
            <h2>Worked Examples ({groupExamples.length})</h2>
            {groupExamples.length === 0 ? (
              <p className="empty-row">No worked examples reference this Group.</p>
            ) : (
              <ul className="technique-detail-examples">
                {groupExamples.map((example) => (
                  <li key={example.file}>
                    <button
                      type="button"
                      className="link-row"
                      onClick={() => onOpenDoc(`examples/${example.file}`)}
                    >
                      <strong>{example.title}</strong>
                      <small>
                        {example.year && `${example.year} · `}
                        {example.loss}
                      </small>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="technique-detail-section">
            <h2>Full description</h2>
            <InlineMarkdown path={`actors/${actor.file}`} />
          </section>
        </article>
      </div>
      </section>
  );
}

function App() {
  const [docPath, setDocPath] = useState(markdownRouteFromPath);
  const [techniqueRoute, setTechniqueRoute] = useState(techniqueRouteFromPath);
  const [mitigationRoute, setMitigationRoute] = useState(mitigationRouteFromPath);
  const [softwareRoute, setSoftwareRoute] = useState(softwareRouteFromPath);
  const [groupRoute, setGroupRoute] = useState(groupRouteFromPath);
  const [activeTactic, setActiveTactic] = useState("all");
  const [activeView, setActiveView] = useState<WorkspaceView>(workspaceRouteFromPath);
  const [query, setQuery] = useState("");
  const [chainFilter, setChainFilter] = useState("all");
  const [maturityFilter, setMaturityFilter] = useState("all");
  const [relationshipFilter, setRelationshipFilter] = useState<string>("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const clearAllRoutes = () => {
    setDocPath("");
    setTechniqueRoute("");
    setMitigationRoute("");
    setSoftwareRoute("");
    setGroupRoute("");
  };
  const navigateView = (view: WorkspaceView) => {
    navigateTo(view === "about" ? "" : view);
    setActiveView(view);
    clearAllRoutes();
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openDoc = (path: string) => {
    navigateTo(docPathToUrl(path));
    clearAllRoutes();
    setDocPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openTechnique = (id: string) => {
    navigateTo(`technique/${id}`);
    clearAllRoutes();
    setTechniqueRoute(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openMitigation = (id: string) => {
    navigateTo(`mitigation/${id}`);
    clearAllRoutes();
    setMitigationRoute(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openSoftware = (id: string) => {
    navigateTo(`software/${id}`);
    clearAllRoutes();
    setSoftwareRoute(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openGroup = (id: string) => {
    navigateTo(`group/${id}`);
    clearAllRoutes();
    setGroupRoute(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Normalize legacy hash URLs once at boot — strip `#/` and rewrite to a
    // clean pathname so old links keep resolving.
    if (window.location.hash && window.location.hash.startsWith("#/")) {
      const stripped = window.location.hash.replace(/^#\/?/, "");
      const target = `/${stripped.replace(/\.md$/, "").replace(/^([^/]+\.md)$/, (_m, p) => `document/${p.replace(/\.md$/, "")}`)}`;
      window.history.replaceState(null, "", target);
    }
    const onPopState = () => {
      const nextDocPath = markdownRouteFromPath();
      const nextTechnique = techniqueRouteFromPath();
      const nextMitigation = mitigationRouteFromPath();
      const nextSoftware = softwareRouteFromPath();
      const nextGroup = groupRouteFromPath();
      setDocPath(nextDocPath);
      setTechniqueRoute(nextTechnique);
      setMitigationRoute(nextMitigation);
      setSoftwareRoute(nextSoftware);
      setGroupRoute(nextGroup);
      if (!nextDocPath && !nextTechnique && !nextMitigation && !nextSoftware && !nextGroup) {
        setActiveView(workspaceRouteFromPath());
      }
    };
    onPopState();
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Update document.title based on current route — improves browser-tab + sharing UX
  useEffect(() => {
    const baseTitle = "OAK — OnChain Attack Knowledge";
    let pageLabel = "";
    if (techniqueRoute) {
      const t = techniqueById.get(techniqueRoute);
      pageLabel = t ? `${t.id} ${t.name}` : techniqueRoute;
    } else if (mitigationRoute) {
      const m = siteData.mitigations.find((x) => x.id === mitigationRoute);
      pageLabel = m ? `${m.id} ${m.name}` : mitigationRoute;
    } else if (softwareRoute) {
      const s = siteData.software.find((x) => x.id === softwareRoute);
      pageLabel = s ? `${s.id} ${s.name}` : softwareRoute;
    } else if (groupRoute) {
      const g = siteData.actors.find((x) => x.id === groupRoute);
      pageLabel = g ? g.title : groupRoute;
    } else if (docPath) {
      const idx = siteData.documentIndex[docPath as keyof typeof siteData.documentIndex];
      pageLabel = (idx as { title?: string } | undefined)?.title ?? docPath;
    } else {
      const viewLabel: Record<string, string> = {
        about: "Overview",
        matrix: "Matrix",
        incidents: "Incidents",
        actors: "Threat Actors",
        mitigations: "Mitigations",
        software: "Software",
        coverage: "Coverage & Gaps",
        contribute: "Contribute",
      };
      pageLabel = viewLabel[activeView] ?? "";
    }
    document.title = pageLabel ? `${pageLabel} · ${baseTitle}` : baseTitle;
  }, [activeView, techniqueRoute, mitigationRoute, softwareRoute, groupRoute, docPath]);
  const maturityOptions = useMemo(
    () => ["all", ...Array.from(new Set(siteData.techniques.map((technique) => technique.maturity).filter(Boolean)))],
    [],
  );

  const relationshipTechniqueScope = useMemo<Set<string> | null>(() => {
    if (relationshipFilter === "all") return null;
    if (relationshipFilter.startsWith("OAK-M")) {
      const m = siteData.mitigations.find((x) => x.id === relationshipFilter);
      return m ? new Set<string>(m.mapsToTechniques as readonly string[]) : new Set();
    }
    if (relationshipFilter.startsWith("OAK-S")) {
      const s = siteData.software.find((x) => x.id === relationshipFilter);
      return s ? new Set<string>(s.observedTechniques as readonly string[]) : new Set();
    }
    if (relationshipFilter.startsWith("OAK-G")) {
      const g = siteData.actors.find((x) => x.id === relationshipFilter);
      return g ? new Set<string>(g.observedTechniques as readonly string[]) : new Set();
    }
    return null;
  }, [relationshipFilter]);

  const filteredTechniqueIds = useMemo(
    () =>
      new Set(
        siteData.techniques
          .filter((technique) => techniqueMatches(technique, query, chainFilter, maturityFilter))
          .filter((technique) => !relationshipTechniqueScope || relationshipTechniqueScope.has(technique.id))
          .map((technique) => technique.id),
      ),
    [chainFilter, maturityFilter, query, relationshipTechniqueScope],
  );

  const visibleTactics = useMemo(() => {
    const tacticScope =
      activeTactic === "all"
        ? siteData.tactics
        : siteData.tactics.filter((tactic) => tactic.id === activeTactic);

    return tacticScope.map((tactic) => ({
      tactic,
      techniqueIds: tactic.techniques.filter((id) => filteredTechniqueIds.has(id)),
    }));
  }, [activeTactic, filteredTechniqueIds]);

  const visibleTechniqueCount = visibleTactics.reduce(
    (total, item) => total + item.techniqueIds.length,
    0,
  );

  const featuredExamples = siteData.examples
    .filter((example) => example.techniques.length > 0)
    .slice(0, 8);

  const searchResults = useMemo<SearchResult[]>(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];

    const tacticResults = siteData.tactics
      .filter((t) =>
        [t.id, t.name, t.phase].join(" ").toLowerCase().includes(needle),
      )
      .slice(0, 3)
      .map((t) => {
        // Try to find the tactic doc — its key in documentIndex looks like "tactics/T1-token-genesis.md"
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
        // Surface matching alias if the match was on alias rather than name
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

  let detailNode: ReactNode = null;
  if (techniqueRoute) {
    detailNode = (
      <TechniqueDetailPage
        techniqueId={techniqueRoute}
        onOpenDoc={openDoc}
        onOpenTechnique={openTechnique}
        onClose={() => {
          window.location.hash = "/matrix";
          clearAllRoutes();
          setActiveView("matrix");
        }}
      />
    );
  } else if (mitigationRoute) {
    detailNode = (
      <MitigationDetailPage
        mitigationId={mitigationRoute}
        onOpenDoc={openDoc}
        onOpenTechnique={openTechnique}
        onClose={() => {
          window.location.hash = "/mitigations";
          clearAllRoutes();
          setActiveView("mitigations");
        }}
      />
    );
  } else if (softwareRoute) {
    detailNode = (
      <SoftwareDetailPage
        softwareId={softwareRoute}
        onOpenDoc={openDoc}
        onOpenTechnique={openTechnique}
        onOpenGroup={openGroup}
        onClose={() => {
          window.location.hash = "/software";
          clearAllRoutes();
          setActiveView("software");
        }}
      />
    );
  } else if (groupRoute) {
    detailNode = (
      <GroupDetailPage
        groupId={groupRoute}
        onOpenDoc={openDoc}
        onOpenTechnique={openTechnique}
        onOpenSoftware={openSoftware}
        onClose={() => {
          window.location.hash = "/actors";
          clearAllRoutes();
          setActiveView("actors");
        }}
      />
    );
  } else if (docPath) {
    detailNode = (
      <MarkdownDocument
        path={docPath}
        onOpenDoc={openDoc}
        onClose={() => {
          window.location.hash = "/matrix";
          setDocPath("");
          setActiveView("matrix");
        }}
      />
    );
  }

  const navGroups: Array<{ label: string; items: Array<[WorkspaceView, string]> }> = [
    {
      label: "start",
      items: [
        ["about", "Overview"],
        ["matrix", "Matrix"],
      ],
    },
    {
      label: "browse",
      items: [
        ["incidents", "Incidents"],
        ["actors", "Threat actors"],
        ["mitigations", "Mitigations"],
        ["software", "Software"],
      ],
    },
    {
      label: "ship",
      items: [
        ["coverage", "Coverage & gaps"],
        ["contribute", "Contribute"],
      ],
    },
  ];
  const navItems = navGroups.flatMap((g) => g.items);

  return (
    <main className="app-shell">
      <button
        type="button"
        className="sidebar-burger"
        aria-label="Toggle navigation"
        aria-expanded={sidebarOpen}
        onClick={() => setSidebarOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>
      {sidebarOpen && (
        <div className="sidebar-scrim" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}
      <aside className={"oak-sidebar" + (sidebarOpen ? " is-open" : "")}>
        <div className="sb-logo">
          <LogoMark />
        </div>
        <nav className="sb-nav">
          {navGroups.map((group) => (
            <div className="sb-group" key={group.label}>
              <div className="sb-group-label">{group.label}</div>
              {group.items.map(([view, label]) => (
                <button
                  className={"sb-link" + (activeView === view ? " active" : "")}
                  key={view}
                  type="button"
                  onClick={() => navigateView(view)}
                >
                  <span className="sb-link-label">{label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="sb-foot">
          <a href="https://github.com/onchainattack/oak" target="_blank" rel="noreferrer" className="sb-link sb-link-ext">
            <span className="sb-link-tag">↗</span>
            <span className="sb-link-label">GitHub</span>
          </a>
          <BlockTicker />
        </div>
      </aside>

      <div className="app-content">
        <header className="app-header">
          <nav className="topbar">
            <span className="topbar-route">
              <span className="route-tag">OAK://</span>
              <span className="route-name">{(navItems.find(([v]) => v === activeView)?.[1] ?? activeView).toLowerCase()}</span>
            </span>
            <TopSearch
              value={query}
              onChange={setQuery}
              results={searchResults}
              onOpenDoc={openDoc}
              onOpenTechnique={openTechnique}
              onOpenMitigation={openMitigation}
              onOpenSoftware={openSoftware}
            />
            <a className="topbar-version" href="https://github.com/onchainattack/oak/blob/main/CHANGELOG.md" target="_blank" rel="noreferrer" title="Schema version + content snapshot date — see VERSIONING.md">
              schema 0.1 · {new Date(siteData.generatedAt).toISOString().slice(0, 10)}
            </a>
          </nav>
        </header>

      {detailNode}

      {!detailNode && activeView === "about" && (
        <section className="overview-hero">
          <p className="eyebrow">schema 0.1 · content {new Date(siteData.generatedAt).toISOString().slice(0, 10)} · open · community-comment</p>
          <h1>An open taxonomy of on-chain attack behavior.</h1>
          <p className="overview-lede">
            OAK is a vendor-neutral knowledge base of adversary tactics and techniques
            observed against on-chain assets. Stable identifiers
            (<code>OAK-Tn.NNN</code>) so investigators can attribute findings, vendors can
            map detections to specific techniques, and risk teams can specify procurement
            requirements as a coverage matrix — a common language across exchanges,
            audit firms, threat-intel teams, and protocol defenders.
          </p>
          <div className="hero-actions">
            <button type="button" className="button button-primary" onClick={() => navigateView("matrix")}>
              Explore the matrix
            </button>
            <button type="button" className="button button-secondary" onClick={() => navigateView("incidents")}>
              Read incidents
            </button>
            <button type="button" className="button button-ghost" onClick={() => navigateView("coverage")}>
              See coverage gaps
            </button>
          </div>

          <div className="howto-grid">
            <article className="howto-step">
              <span className="step-num">01</span>
              <h3>Browse the matrix</h3>
              <p>Pick a tactic — access, extraction, laundering, custody compromise, bridge abuse, NFT abuse, or protocol exploit.</p>
              <button type="button" onClick={() => navigateView("matrix")}>Open matrix →</button>
            </article>
            <article className="howto-step">
              <span className="step-num">02</span>
              <h3>Open a technique</h3>
              <p>Each technique page lists indicators, detection signals, mitigations, related software, threat actors, and citations.</p>
              <button type="button" onClick={() => openDoc("techniques/T11.001-third-party-signing-vendor-compromise.md")}>Example technique →</button>
            </article>
            <article className="howto-step">
              <span className="step-num">03</span>
              <h3>Validate against incidents</h3>
              <p>Worked examples ground the technique in real cases — loss size, laundering path, recovery outcome, attribution strength.</p>
              <button type="button" onClick={() => openDoc("examples/2025-02-bybit.md")}>Example incident →</button>
            </article>
          </div>

          <div className="overview-stats">
            <StatCard label="tactics" value={siteData.stats.tactics} />
            <StatCard label="techniques" value={siteData.stats.techniques} />
            <StatCard label="mitigations" value={siteData.stats.mitigations} />
            <StatCard label="software" value={siteData.stats.software} />
            <StatCard label="actors" value={siteData.stats.actors} />
            <StatCard label="examples" value={siteData.stats.examples} />
            <StatCard label="citations" value={siteData.stats.citations} />
            <StatCard label="relationships" value={siteData.stats.relationships} />
          </div>

          <p className="overview-disclaimer">
            Not a scanner. Not a threat feed. Not a vendor scorecard. The shared language
            underneath those tools.
          </p>
        </section>
      )}

      <section className="section matrix-section" hidden={!!detailNode || activeView !== "matrix"} id="matrix">
        <div className="section-heading">
          <p className="eyebrow">Tactics x Techniques</p>
          <h2>OAK Matrix</h2>
          <p>
            A market-native attack matrix spanning token launch abuse, wallet access,
            laundering, smart-contract exploitation, custody, bridges, NFTs, account
            abstraction, and validator infrastructure.
          </p>
        </div>

        <div className="matrix-console">
          <label className="matrix-search-field">
            <span>Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try: Lazarus, oracle, bridge, EVM, T11.001"
            />
          </label>
          <div className="chip-group">
            <span>Surface</span>
            <div>
              {chainOptions.map((option) => (
                <button
                  className={chainFilter === option ? "active" : ""}
                  key={option}
                  type="button"
                  onClick={() => setChainFilter(option)}
                >
                  {option === "all" ? "All surfaces" : option}
                </button>
              ))}
            </div>
          </div>
          <div className="chip-group">
            <span>Maturity</span>
            <div>
              {maturityOptions.map((option) => (
                <button
                  className={maturityFilter === option ? "active" : ""}
                  key={option}
                  type="button"
                  onClick={() => setMaturityFilter(option)}
                >
                  {option === "all" ? "All maturity" : option}
                </button>
              ))}
            </div>
          </div>
          <label className="chip-group relationship-filter">
            <span>Relationship</span>
            <select
              value={relationshipFilter}
              onChange={(e) => setRelationshipFilter(e.target.value)}
            >
              <option value="all">Any (no filter)</option>
              <optgroup label="Mitigated by…">
                {siteData.mitigations.map((m) => (
                  <option key={m.id} value={m.id}>{m.id} — {m.name}</option>
                ))}
              </optgroup>
              <optgroup label="Used by software…">
                {siteData.software.map((s) => (
                  <option key={s.id} value={s.id}>{s.id} — {s.name}</option>
                ))}
              </optgroup>
              <optgroup label="Observed in group…">
                {siteData.actors.map((g) => (
                  <option key={g.id} value={g.id}>{g.id} — {g.title}</option>
                ))}
              </optgroup>
            </select>
          </label>
          <button
            type="button"
            className="reset-button"
            onClick={() => {
              setQuery("");
              setActiveTactic("all");
              setChainFilter("all");
              setMaturityFilter("all");
              setRelationshipFilter("all");
            }}
          >
            Reset
          </button>
        </div>

        <KillChainBanner
          tactics={siteData.tactics}
          active={activeTactic}
          onSelect={setActiveTactic}
        />

        <div className="result-strip">
          <strong>{visibleTechniqueCount}</strong>
          <span>
            techniques shown across {visibleTactics.length} tactic
            {visibleTactics.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="matrix-grid">
          {visibleTactics.map(({ tactic, techniqueIds }) => (
            <TacticColumn
              tactic={tactic}
              techniqueIds={techniqueIds}
              key={tactic.id}
              onOpenTechnique={openTechnique}
            />
          ))}
        </div>
      </section>


      <section className="section" hidden={!!detailNode || activeView !== "incidents"} id="examples">
        <IncidentsView openDoc={openDoc} />
      </section>

      <section className="section actors-section" hidden={!!detailNode || activeView !== "actors"} id="actors">
        <ActorsView openGroup={openGroup} />
      </section>

      <section className="section mitigations-section" hidden={!!detailNode || activeView !== "mitigations"} id="mitigations">
        <div className="section-heading">
          <p className="eyebrow">Mitigations</p>
          <h2>Reusable defences mapped to techniques</h2>
          <p>
            Each mitigation maps many-to-many to techniques, so a vendor or risk team can
            specify procurement requirements as a coverage matrix rather than a long
            inline list. Classes are <strong>detection</strong>, <strong>architecture</strong>,
            <strong> operational</strong>, <strong>venue</strong>, and <strong>wallet-ux</strong>.
          </p>
        </div>
        <div className="mitigation-grid">
          {siteData.mitigations.map((mitigation) => (
            <button
              type="button"
              className="mitigation-card"
              key={mitigation.id}
              onClick={() => openMitigation(mitigation.id)}
            >
              <span>{mitigation.id}</span>
              <strong>{mitigation.name}</strong>
              <small>
                {mitigation.class} · maps to {mitigation.mapsToTechniques.length} technique
                {mitigation.mapsToTechniques.length === 1 ? "" : "s"}
              </small>
            </button>
          ))}
        </div>
      </section>

      <section className="section software-section" hidden={!!detailNode || activeView !== "software"} id="software">
        <div className="section-heading">
          <p className="eyebrow">Software</p>
          <h2>Named tools, kits, and malware families</h2>
          <p>
            Software is tracked separately from threat actors because the same kit is
            often rented across operators. Categories include drainer-kits,
            DPRK malware families, commodity infostealers, and crypto-specific tooling
            with documented weaknesses.
          </p>
        </div>
        <div className="software-grid">
          {siteData.software.map((sw) => (
            <button
              type="button"
              className="software-card"
              key={sw.id}
              onClick={() => openSoftware(sw.id)}
            >
              <span>{sw.id}</span>
              <strong>{sw.name}</strong>
              <small>
                {sw.type}
                {sw.usedByGroups.length > 0 && ` · ${sw.usedByGroups.join(", ")}`}
              </small>
            </button>
          ))}
        </div>
      </section>

      <section className="section contributor-section" hidden={!!detailNode || activeView !== "contribute"} id="contributors">
        <div className="section-heading">
          <p className="eyebrow">Contributors</p>
          <h2>How the corpus gets better</h2>
          <p>
            OAK should become more useful without becoming noisier. Contributions need
            stable IDs, real examples, public citations, attribution-strength language,
            and honest coverage status.
          </p>
        </div>
        <div className="contributor-grid">
          <button type="button" onClick={() => openDoc("CONTRIBUTING.md")}>
            <Icon name="contribute" />
            <span>Process</span>
            <strong>Submit a technique or example</strong>
            <small>Use the PR process and keep source quality high.</small>
          </button>
          <button type="button" onClick={() => openDoc("TAXONOMY-GAPS.md")}>
            <Icon name="matrix" />
            <span>Backlog</span>
            <strong>Work from named taxonomy gaps</strong>
            <small>Prefer filling documented holes over inventing overlapping names.</small>
          </button>
          <button type="button" onClick={() => openDoc("COVERAGE.md")}>
            <Icon name="coverage" />
            <span>Coverage</span>
            <strong>Correct full / partial / gap claims</strong>
            <small>Coverage is a buyer-facing promise, so it has to stay conservative.</small>
          </button>
        </div>
      </section>

      <section className="section coverage-panel" hidden={!!detailNode || activeView !== "coverage"} id="coverage">
        <CorpusStats openDoc={openDoc} />
        <CoverageMatrix
          onOpenTechnique={openTechnique}
          onOpenDoc={openDoc}
        />
      </section>

      <footer className="app-foot">
        <div className="foot-section">
          <span className="foot-section-label">framework</span>
          <a href="#" onClick={(e) => { e.preventDefault(); openDoc("CHANGELOG.md"); }}>Changelog</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openDoc("ROADMAP.md"); }}>Roadmap</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openDoc("VERSIONING.md"); }}>Versioning</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openDoc("BACKLOG.md"); }}>Backlog</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openDoc("TAXONOMY-GAPS.md"); }}>Gaps</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openDoc("RESEARCH-CADENCE.md"); }}>Cadence</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openDoc("COVERAGE-TARGETS.md"); }}>Targets</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openDoc("GLOSSARY.md"); }}>Glossary</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openDoc("PRIOR-ART.md"); }}>Prior art</a>
        </div>
        <div className="foot-section">
          <span className="foot-section-label">data</span>
          <a href="/tools/oak.json" target="_blank" rel="noreferrer">JSON export</a>
          <a href="/tools/oak-stix.json" target="_blank" rel="noreferrer">STIX 2.1 bundle</a>
          <a href="/citations.bib" target="_blank" rel="noreferrer">citations.bib</a>
        </div>
        <div className="foot-section">
          <span className="foot-section-label">community</span>
          <a href="https://github.com/onchainattack/oak" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://github.com/onchainattack/oak-mcp" target="_blank" rel="noreferrer">oak-mcp (AI integration)</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openDoc("CONTRIBUTING.md"); }}>Contributing</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openDoc("CODE_OF_CONDUCT.md"); }}>Code of conduct</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openDoc("SECURITY.md"); }}>Security</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openDoc("PEER-REVIEW.md"); }}>Peer review</a>
        </div>
        <div className="foot-section">
          <span className="foot-section-label">legal</span>
          <a href="#" onClick={(e) => { e.preventDefault(); openDoc("DISCLAIMER.md"); }}>Disclaimer</a>
          <a href="#" onClick={(e) => { e.preventDefault(); openDoc("CORRECTIONS.md"); }}>Corrections & takedowns</a>
          <span className="foot-meta">CC-BY-SA 4.0 content · MIT tooling</span>
        </div>
        <div className="foot-bar">
          <span>
            <span className="foot-tag">OAK//</span>
            schema 0.1 · content {new Date(siteData.generatedAt).toISOString().slice(0, 10)} · onchainattack.org
          </span>
        </div>
      </footer>
      </div>
    </main>
  );
}

export default App;
