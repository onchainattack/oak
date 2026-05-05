import { siteData } from "../../data/generated";
import { techniqueById } from "../../lib";
import { reportIssueUrl } from "../../routing";
import Breadcrumb from "../layout/Breadcrumb";
import DetectionSpecSection, { type SpecRecord } from "../document/DetectionSpecSection";
import InlineMarkdown from "../document/InlineMarkdown";
import DocumentToc from "../document/DocumentToc";
import RelationshipGraph from "../views/RelationshipGraph";

export default function TechniqueDetailPage({
  techniqueId,
  onClose,
  onOpenDoc,
}: {
  techniqueId: string;
  onClose: () => void;
  onOpenDoc: (path: string) => void;
  onOpenTechnique: (id: string) => void;       // accepted for symmetry with other detail-page signatures; unused inside this view
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

  const allSpecs =
    (siteData.specs as unknown as readonly SpecRecord[] | undefined) ?? [];
  const specsByTechnique =
    (siteData.specsByTechnique as unknown as Record<string, readonly string[]> | undefined) ?? {};
  const techniqueSpecs = (specsByTechnique[techniqueId] ?? [])
    .map((sid) => allSpecs.find((s) => s.spec_id === sid))
    .filter((s): s is SpecRecord => Boolean(s));

  return (
    <section className="document-page technique-detail-page">
      <Breadcrumb onBack={onClose} items={breadcrumb} />

      <div className="document-layout">
        <aside className="document-sidebar">

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
          <DocumentToc
            path={technique.sourcePath}
            extraItems={[
              ...(techniqueSpecs.length > 0 ? [{ label: "Detection spec", slug: "detection-spec" }] : []),
              { label: `Software (${relatedSoftware.length})`, slug: "section-software" },
              { label: `Threat Actors (${relatedActors.length})`, slug: "section-threat-actors" },
              { label: `Worked Examples (${relatedExamples.length})`, slug: "section-worked-examples" },
              ...((relatedMitigations.length + relatedSoftware.length + relatedActors.length) > 0
                ? [{ label: "Relationship neighborhood", slug: "section-relationship" }]
                : []),
            ]}
          />
          <div className="detail-actions">
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

          {/* Full description first — primary content of the page. */}
          <section className="technique-detail-section technique-detail-section-description">
            <InlineMarkdown path={technique.sourcePath} onOpenDoc={onOpenDoc} />
          </section>

          {/* Detection specs sit right after the description — they ARE the
              technical guidance for this Technique. */}
          {techniqueSpecs.map((spec) => (
            <DetectionSpecSection
              key={spec.spec_id}
              spec={spec}
              onOpenDoc={onOpenDoc}
              onOpenExample={(slug) => onOpenDoc(`examples/${slug}.md`)}
            />
          ))}

          {/* Mitigations cards section dropped — markdown body's own
              '## Mitigations' section already lists them with per-Technique
              prose context. The cards-form was a strict duplicate. */}
          <section id="section-software" className="technique-detail-section">
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

          <section id="section-threat-actors" className="technique-detail-section">
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

          <section id="section-worked-examples" className="technique-detail-section">
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

          {/* Relationship graph last — visual aggregation of everything above. */}
          {(relatedMitigations.length + relatedSoftware.length + relatedActors.length) > 0 && (
            <section id="section-relationship" className="technique-detail-section">
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

          {/* Provenance section dropped — its three fields (firstDocumented,
              aliases, chains) all live in the sidebar already. */}
        </article>
      </div>
      </section>
  );
}

