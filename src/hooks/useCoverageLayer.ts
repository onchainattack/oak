import { useEffect, useMemo, useState } from "react";

// Coverage Layer — a Navigator-equivalent overlay applied on top of the
// matrix. JSON shape is intentionally compatible with the MITRE ATT&CK
// Navigator layer spec subset:
//
//   {
//     "name": "My team coverage",
//     "description": "what this layer represents",
//     "techniques": [
//       { "techniqueID": "OAK-T1.001", "color": "#00ffd1", "comment": "full" },
//       { "techniqueID": "OAK-T11.003", "color": "#e6c14a", "score": 0.5 }
//     ]
//   }
//
// Layer is held in component state + persisted to localStorage under the
// 'oak.layer.v1' key so it survives reloads. Clearing wipes both.

type RawTechniqueEntry = {
  techniqueID?: string;
  color?: string;
  score?: number;
  comment?: string;
};

export type CoverageLayer = {
  name: string;
  description: string;
  byTechnique: Record<string, { color?: string; score?: number; comment?: string }>;
};

const STORAGE_KEY = "oak.layer.v1";

function loadFromStorage(): CoverageLayer | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CoverageLayer;
  } catch {
    return null;
  }
}

export function useCoverageLayer() {
  const [layer, setLayer] = useState<CoverageLayer | null>(() =>
    typeof window === "undefined" ? null : loadFromStorage(),
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (layer) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(layer));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [layer]);

  const loadFromText = (text: string) => {
    try {
      const parsed = JSON.parse(text);
      const techniques = Array.isArray(parsed.techniques) ? parsed.techniques : [];
      const byTechnique: CoverageLayer["byTechnique"] = {};
      for (const entry of techniques as RawTechniqueEntry[]) {
        if (!entry.techniqueID) continue;
        // Accept both bare ID (e.g. "T1.001" with optional OAK- prefix) and
        // OAK-style full IDs. Normalise.
        const id = entry.techniqueID.startsWith("OAK-")
          ? entry.techniqueID
          : `OAK-${entry.techniqueID}`;
        byTechnique[id] = {
          color: entry.color,
          score: entry.score,
          comment: entry.comment,
        };
      }
      const next: CoverageLayer = {
        name: typeof parsed.name === "string" ? parsed.name : "Untitled layer",
        description: typeof parsed.description === "string" ? parsed.description : "",
        byTechnique,
      };
      setLayer(next);
      setError("");
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to parse layer JSON");
      return false;
    }
  };

  const clearLayer = () => {
    setLayer(null);
    setError("");
  };

  const exportLayer = useMemo(() => {
    if (!layer) return null;
    return {
      name: layer.name,
      description: layer.description,
      domain: "oak-onchain-attack",
      techniques: Object.entries(layer.byTechnique).map(([id, v]) => ({
        techniqueID: id,
        ...(v.color !== undefined ? { color: v.color } : {}),
        ...(v.score !== undefined ? { score: v.score } : {}),
        ...(v.comment !== undefined ? { comment: v.comment } : {}),
      })),
    };
  }, [layer]);

  return { layer, error, loadFromText, clearLayer, exportLayer };
}
