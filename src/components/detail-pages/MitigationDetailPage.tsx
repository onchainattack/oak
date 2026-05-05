import { siteData } from "../../data/generated";
import { techniqueById } from "../../lib";
import { reportIssueUrl } from "../../routing";
import type { Technique } from "../../types";
import Breadcrumb from "../layout/Breadcrumb";
import InlineMarkdown from "../document/InlineMarkdown";
import DocumentToc from "../document/DocumentToc";

export default function MitigationDetailPage({
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
<button type="button" className="document-path" title="Open raw markdown" onClick={() => onOpenDoc(mitigation.sourcePath)}>{mitigation.sourcePath}</button>
          <div className="technique-detail-meta">
            <small><strong>Class:</strong> {mitigation.class}</small>
            {mitigation.audience.length > 0 && (
              <small><strong>Audience:</strong> {mitigation.audience.join(", ")}</small>
            )}
            <small><strong>Maps to:</strong> {mappedTechniques.length} {mappedTechniques.length === 1 ? "Technique" : "Techniques"}</small>
          </div>
          <DocumentToc path={mitigation.sourcePath} />
          <div className="detail-actions">
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
            {/* class + audience already shown in sidebar — header stays clean */}
          </header>

          <section className="technique-detail-section technique-detail-section-description">
            <InlineMarkdown path={mitigation.sourcePath} onOpenDoc={onOpenDoc} />
          </section>

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
        </article>
      </div>
      </section>
  );
}

