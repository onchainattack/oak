import { useMemo } from "react";
import { siteData } from "../../data/generated";
import { techniqueById } from "../../lib";
import { reportIssueUrl } from "../../routing";
import type { Technique } from "../../types";
import Icon from "../layout/Icon";
import Breadcrumb from "../layout/Breadcrumb";
import InlineMarkdown from "../document/InlineMarkdown";
import RelationshipGraph from "../views/RelationshipGraph";

export default function SoftwareDetailPage({
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

