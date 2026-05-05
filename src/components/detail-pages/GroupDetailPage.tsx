import { siteData } from "../../data/generated";
import { techniqueById } from "../../lib";
import { reportIssueUrl } from "../../routing";
import type { Technique } from "../../types";
import Breadcrumb from "../layout/Breadcrumb";
import InlineMarkdown from "../document/InlineMarkdown";

export default function GroupDetailPage({
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
            {/* Attribution status shown in full in the header below — no need to truncate it here. */}
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
            <h2>Description</h2>
            <InlineMarkdown path={`actors/${actor.file}`} onOpenDoc={onOpenDoc} />
          </section>

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

          {/* description moved up; no duplicate section here */}
        </article>
      </div>
      </section>
  );
}

