import { useEffect, useMemo, useState } from "react";
import { siteData } from "../../data/generated";
import { cleanInlineText, includes, techniqueById } from "../../lib";
import { reportIssueUrl } from "../../routing";
import type { Technique } from "../../types";
import TacticGlyph from "../glyphs/TacticGlyph";
import Icon from "../layout/Icon";
import Breadcrumb from "../layout/Breadcrumb";
import DetectionSpecSection, { type SpecRecord } from "../document/DetectionSpecSection";
import InlineMarkdown from "../document/InlineMarkdown";
import RelationshipGraph from "../views/RelationshipGraph";

export default function TechniqueDetailPage({
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

          {techniqueSpecs.map((spec) => (
            <DetectionSpecSection
              key={spec.spec_id}
              spec={spec}
              onOpenDoc={onOpenDoc}
              onOpenExample={(slug) => onOpenDoc(`examples/${slug}.md`)}
            />
          ))}

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

