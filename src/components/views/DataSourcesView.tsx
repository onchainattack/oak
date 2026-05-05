import { siteData } from "../../data/generated";

export default function DataSourcesView({
  openDoc,
}: {
  openDoc: (path: string) => void;
}) {
  const dataSources = (siteData as unknown as { dataSources?: ReadonlyArray<{
    id: string;
    title: string;
    file: string;
    layer: string;
    chains: ReadonlyArray<string>;
    description: string;
    techniques: ReadonlyArray<string>;
  }> }).dataSources ?? [];

  return (
    <>
      <div className="section-heading">
        <p className="eyebrow">Telemetry inputs</p>
        <h2>Data Sources.</h2>
        <p>
          The defender-side feeds OAK Techniques are detected against — on-chain
          events, mempool flows, off-chain CTI. Each source lists its access
          path and the Techniques that depend on it.
        </p>
      </div>

      <div className="data-source-grid">
        {dataSources.map((ds) => (
          <button
            type="button"
            className="data-source-card"
            key={ds.id}
            onClick={() => openDoc(`data-sources/${ds.file}`)}
          >
            <span>{ds.id}</span>
            <strong>{ds.title.replace(/^OAK-DS-\d+\s+—\s+/, "")}</strong>
            {ds.description && <p>{ds.description}</p>}
            <div className="data-source-meta">
              {ds.layer && <em>{ds.layer}</em>}
              {ds.chains.slice(0, 2).map((c) => (
                <em key={c}>{c}</em>
              ))}
              {ds.techniques.length > 0 && (
                <em className="data-source-tech-count">
                  {ds.techniques.length} Technique{ds.techniques.length === 1 ? "" : "s"}
                </em>
              )}
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
