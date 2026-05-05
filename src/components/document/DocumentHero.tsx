import { useState } from "react";
import { cleanInlineText } from "../../lib";

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

export default function DocumentHero({
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

