import { highlightPseudo } from "../../highlight";

export type SpecRefImpl = { target: string; url?: string; chain?: string };
export type SpecParam = { type?: string; default?: unknown; description?: string };
export type SpecBody = {
  spec_id: string;
  version?: string;
  maturity?: string;
  maintainer?: string;
  license?: string;
  scope?: string;
  data_sources?: string[];
  detection_logic?: { description?: string; pseudocode?: string };
  parameters?: Record<string, SpecParam>;
  output_alert?: string[];
  test_fixtures?: { positive?: string[]; negative?: string[] };
  false_positive_modes?: string[];
  mitigations?: string[];
  reference_implementations?: SpecRefImpl[];
};
export type SpecRecord = {
  spec_id: string;
  path: string;
  oak_techniques: readonly string[];
  version: string;
  maturity: string;
  maintainer: string;
  license: string;
  scope: string;
  body: SpecBody;
};

const formatParamDefault = (value: unknown): string => {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.length === 0 ? "[]" : JSON.stringify(value);
  return JSON.stringify(value);
};

export default function DetectionSpecSection({
  spec,
  onOpenDoc,
  onOpenExample,
}: {
  spec: SpecRecord;
  onOpenDoc: (path: string) => void;
  onOpenExample: (slug: string) => void;
}) {
  const body = spec.body;
  const params = Object.entries(body.parameters ?? {});
  const positives = body.test_fixtures?.positive ?? [];
  const negatives = body.test_fixtures?.negative ?? [];
  const fpModes = body.false_positive_modes ?? [];
  const mits = body.mitigations ?? [];
  const refImpls = body.reference_implementations ?? [];
  return (
    <section id="detection-spec" className="technique-detail-section detection-spec">
      <h2>Detection spec</h2>
      <p className="detection-spec-meta">
        <code>{spec.spec_id}</code> · v{spec.version || "0.0.0"} ·{" "}
        <strong>{spec.maturity}</strong> · {spec.license}
        {spec.maintainer && <> · maintained by <code>{spec.maintainer}</code></>}
        {" · "}
        <button type="button" className="link-row inline" onClick={() => onOpenDoc(spec.path)}>
          source ({spec.path})
        </button>
      </p>
      {body.scope && <p className="detection-spec-scope">{body.scope}</p>}

      {body.data_sources && body.data_sources.length > 0 && (
        <p className="detection-spec-tags">
          <strong>Data sources:</strong>{" "}
          {body.data_sources.map((d) => (
            <code key={d}>{d}</code>
          ))}
        </p>
      )}

      {body.detection_logic?.description && (
        <p className="detection-spec-description">{body.detection_logic.description}</p>
      )}
      {body.detection_logic?.pseudocode && (
        <pre className="detection-spec-pseudocode">
          <code
            dangerouslySetInnerHTML={{
              __html: highlightPseudo(body.detection_logic.pseudocode),
            }}
          />
        </pre>
      )}

      {params.length > 0 && (
        <div className="detection-spec-params">
          <h3>Parameters ({params.length})</h3>
          <table>
            <colgroup>
              <col className="col-name" />
              <col className="col-type" />
              <col className="col-default" />
            </colgroup>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
              </tr>
            </thead>
            <tbody>
              {params.map(([name, p]) => (
                <tr key={name}>
                  <td><code>{name}</code></td>
                  <td>{p?.type ?? "—"}</td>
                  <td><code>{formatParamDefault(p?.default)}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {body.output_alert && body.output_alert.length > 0 && (
        <p className="detection-spec-tags">
          <strong>Alert fields:</strong>{" "}
          {body.output_alert.map((f) => (
            <code key={f}>{f}</code>
          ))}
        </p>
      )}

      {(positives.length > 0 || negatives.length > 0) && (
        <div className="detection-spec-fixtures">
          <h3>Test fixtures</h3>
          {positives.length > 0 && (
            <>
              <h4>Positive ({positives.length})</h4>
              <ul>
                {positives.map((slug) => (
                  <li key={slug}>
                    <button
                      type="button"
                      className="link-row inline"
                      onClick={() => onOpenExample(slug)}
                    >
                      {slug}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          {negatives.length > 0 && (
            <>
              <h4>Negative ({negatives.length})</h4>
              <ul>
                {negatives.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {fpModes.length > 0 && (
        <div className="detection-spec-fp">
          <h3>False-positive modes ({fpModes.length})</h3>
          <ul>
            {fpModes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {mits.length > 0 && (
        <p className="detection-spec-tags">
          <strong>Mitigations:</strong>{" "}
          {mits.map((m) => (
            <code key={m}>{m}</code>
          ))}
        </p>
      )}

      {refImpls.length > 0 && (
        <div className="detection-spec-refs">
          <h3>Reference implementations ({refImpls.length})</h3>
          <p className="detection-spec-refs-note">
            Candidate vendor surfaces — listed without claiming a published
            implementation. Filled URLs link to specific public detectors
            where they exist; empty entries are aspirational.
          </p>
          <ul>
            {refImpls.map((r, idx) => (
              <li key={`${r.target}-${idx}`}>
                <code>{r.target}</code>
                {r.chain && <> — {r.chain}</>}
                {r.url ? (
                  <> — <a href={r.url} target="_blank" rel="noreferrer">{r.url}</a></>
                ) : (
                  <> — <em>vendor candidate</em></>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
