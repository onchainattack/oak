import { useMemo, type ReactNode } from "react";
import { siteData } from "./data/generated";
import { chainOptions, techniqueMatches } from "./lib";
import type { WorkspaceView } from "./types";
import ActorsView from "./components/views/ActorsView";
import DataSourcesView from "./components/views/DataSourcesView";
import IncidentsView from "./components/views/IncidentsView";
import CorpusStats from "./components/views/CorpusStats";
import CoverageMatrix from "./components/views/CoverageMatrix";
import KillChainBanner from "./components/views/KillChainBanner";
import TacticColumn from "./components/views/TacticColumn";
import MarkdownDocument from "./components/document/MarkdownDocument";
import BlockTicker from "./components/layout/BlockTicker";
import LogoMark from "./components/layout/LogoMark";
import TopSearch from "./components/layout/TopSearch";
import Icon from "./components/layout/Icon";
import StatCard from "./components/layout/StatCard";
import TechniqueDetailPage from "./components/detail-pages/TechniqueDetailPage";
import MitigationDetailPage from "./components/detail-pages/MitigationDetailPage";
import SoftwareDetailPage from "./components/detail-pages/SoftwareDetailPage";
import GroupDetailPage from "./components/detail-pages/GroupDetailPage";
import { useAppRouting } from "./hooks/useAppRouting";
import { useDocumentMeta } from "./hooks/useDocumentMeta";
import { useGlobalSearch } from "./hooks/useGlobalSearch";
import { useMatrixFilters } from "./hooks/useMatrixFilters";
import { useCoverageLayer } from "./hooks/useCoverageLayer";
import CoverageLayerPanel from "./components/views/CoverageLayerPanel";

function App() {
  const {
    docPath,
    techniqueRoute,
    mitigationRoute,
    softwareRoute,
    groupRoute,
    activeView,
    sidebarOpen,
    setActiveView,
    setSidebarOpen,
    clearAllRoutes,
    navigateView,
    openDoc,
    openTechnique,
    openMitigation,
    openSoftware,
    openGroup,
  } = useAppRouting();

  useDocumentMeta({
    activeView,
    techniqueRoute,
    mitigationRoute,
    softwareRoute,
    groupRoute,
    docPath,
  });

  const { query, setQuery, results: searchResults } = useGlobalSearch();

  const {
    activeTactic, setActiveTactic,
    chainFilter, setChainFilter,
    maturityFilter, setMaturityFilter,
    relationshipFilter, setRelationshipFilter,
  } = useMatrixFilters();
  const coverageLayer = useCoverageLayer();

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


  let detailNode: ReactNode = null;
  if (techniqueRoute) {
    detailNode = (
      <TechniqueDetailPage
        techniqueId={techniqueRoute}
        onOpenDoc={openDoc}
        onOpenTechnique={openTechnique}
        onClose={() => navigateView("matrix")}
      />
    );
  } else if (mitigationRoute) {
    detailNode = (
      <MitigationDetailPage
        mitigationId={mitigationRoute}
        onOpenDoc={openDoc}
        onOpenTechnique={openTechnique}
        onClose={() => navigateView("mitigations")}
      />
    );
  } else if (softwareRoute) {
    detailNode = (
      <SoftwareDetailPage
        softwareId={softwareRoute}
        onOpenDoc={openDoc}
        onOpenTechnique={openTechnique}
        onOpenGroup={openGroup}
        onClose={() => navigateView("software")}
      />
    );
  } else if (groupRoute) {
    detailNode = (
      <GroupDetailPage
        groupId={groupRoute}
        onOpenDoc={openDoc}
        onOpenTechnique={openTechnique}
        onOpenSoftware={openSoftware}
        onClose={() => navigateView("actors")}
      />
    );
  } else if (docPath) {
    detailNode = (
      <MarkdownDocument
        path={docPath}
        onOpenDoc={openDoc}
        onClose={() => navigateView("matrix")}
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
        ["datasources", "Data Sources"],
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
        aria-expanded={sidebarOpen ? "true" : "false"}
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
          <a href="https://github.com/onchainattack/oak" target="_blank" rel="noopener noreferrer" className="sb-link sb-link-ext">
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
            <a className="topbar-version" href="https://github.com/onchainattack/oak/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer" title="Schema version + content snapshot date — see VERSIONING.md">
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

        <CoverageLayerPanel
          layer={coverageLayer.layer}
          error={coverageLayer.error}
          onLoadText={coverageLayer.loadFromText}
          onClear={coverageLayer.clearLayer}
          exportLayer={coverageLayer.exportLayer}
        />

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
              layerByTechnique={coverageLayer.layer?.byTechnique}
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

      <section className="section data-sources-section" hidden={!!detailNode || activeView !== "datasources"} id="datasources">
        <DataSourcesView openDoc={openDoc} />
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
          <a href="/tools/oak.json" target="_blank" rel="noopener noreferrer">JSON export</a>
          <a href="/tools/oak-stix.json" target="_blank" rel="noopener noreferrer">STIX 2.1 bundle</a>
          <a href="/citations.bib" target="_blank" rel="noopener noreferrer">citations.bib</a>
        </div>
        <div className="foot-section">
          <span className="foot-section-label">community</span>
          <a href="https://github.com/onchainattack/oak" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://github.com/onchainattack/oak-mcp" target="_blank" rel="noopener noreferrer">oak-mcp (AI integration)</a>
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
