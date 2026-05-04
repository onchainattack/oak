import type { SearchResult } from "../../types";

export default function TopSearch({
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
