import { useRef } from "react";
import type { CoverageLayer } from "../../hooks/useCoverageLayer";

// Compact UI for loading / clearing / exporting a coverage layer that
// tints the matrix cells. Sits above the Matrix view.

export default function CoverageLayerPanel({
  layer,
  error,
  onLoadText,
  onClear,
  exportLayer,
}: {
  layer: CoverageLayer | null;
  error: string;
  onLoadText: (text: string) => boolean;
  onClear: () => void;
  exportLayer: object | null;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const text = await file.text();
    onLoadText(text);
  };

  const handleExport = () => {
    if (!exportLayer) return;
    const blob = new Blob([JSON.stringify(exportLayer, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `oak-layer-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const techniqueCount = layer
    ? Object.keys(layer.byTechnique).length
    : 0;

  return (
    <div className="cov-layer-panel">
      <div className="cov-layer-panel-head">
        <strong>Coverage layer</strong>
        <small>
          Tint matrix cells with a JSON layer (Navigator-compatible).
          Persists in browser storage; share by exporting + sending the file.
        </small>
      </div>
      <div className="cov-layer-panel-row">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
          style={{ display: "none" }}
        />
        <button
          type="button"
          className="cov-stat-pill cov-doc"
          onClick={() => fileInputRef.current?.click()}
        >
          {layer ? "Replace layer…" : "Load layer JSON…"}
        </button>
        {layer && (
          <>
            <span className="cov-layer-active">
              <span className="cov-layer-dot" /> {layer.name}
              <em>{techniqueCount} technique{techniqueCount === 1 ? "" : "s"}</em>
            </span>
            <button type="button" className="cov-stat-pill cov-doc" onClick={handleExport}>
              Export
            </button>
            <button type="button" className="cov-stat-pill cov-reset" onClick={onClear}>
              Clear
            </button>
          </>
        )}
      </div>
      {error && <p className="cov-layer-error">⚠ {error}</p>}
    </div>
  );
}
