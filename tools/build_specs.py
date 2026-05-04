#!/usr/bin/env python3
"""build_specs.py — validate and aggregate OAK Detection Specs.

Specs live in `specs/Tn.NNN-*.yml` alongside `techniques/Tn.NNN-*.md`.
The spec captures detection logic in language-agnostic pseudocode plus
the minimum surrounding scaffolding (data sources, parameters, output
alert fields, fixtures, false-positive notes, mitigation cross-refs,
reference-implementation URLs). Anything that duplicates the Technique
markdown lives there, not here.

Output: `tools/specs.json` for downstream consumers (OAK site, oak-mcp).

Run as part of `npm run site:data`.

Required fields (per spec):
  oak_techniques     — list of OAK-Tn.NNN IDs (must resolve in oak.json)
  spec_id            — unique identifier
  version            — semver
  maturity           — draft | review | stable
  maintainer         — @handle
  license            — Apache-2.0 | MIT | CC-BY-SA-4.0
  scope              — string, 1–3 sentences (excludes inline)
  data_sources       — list of source IDs (free-form short identifiers)
  detection_logic    — { description, pseudocode } both strings, non-empty
  output_alert       — list of field names emitted in alerts
  test_fixtures      — { positive: [example-slugs], negative: [strings] }

Optional:
  parameters                 — { name: { type, default, description? } }
  false_positive_modes       — list of one-line strings
  mitigations                — list of OAK-Mxx IDs (resolved against oak.json)
  reference_implementations  — list of { target, url, chain? }
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
SPECS_DIR = ROOT / "specs"
EXAMPLES_DIR = ROOT / "examples"
OAK_JSON = ROOT / "tools" / "oak.json"
OUT = ROOT / "tools" / "specs.json"

REQUIRED = {
    "oak_techniques", "spec_id", "version", "maturity",
    "maintainer", "license",
    "scope", "data_sources", "detection_logic",
    "output_alert", "test_fixtures",
}
VALID_MATURITY = {"draft", "review", "stable"}
VALID_LICENSE = {"Apache-2.0", "MIT", "CC-BY-SA-4.0"}


def fail(msg: str) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(1)


def warn(msg: str) -> None:
    print(f"WARN:  {msg}", file=sys.stderr)


def main() -> int:
    if not SPECS_DIR.exists():
        Path(OUT).write_text(json.dumps({"specs": [], "generated_at": _now()}, indent=2))
        print("OK: no specs/ — wrote empty specs.json")
        return 0
    if not OAK_JSON.exists():
        fail(f"{OAK_JSON} not found — run `python3 tools/export_json.py` first.")

    oak = json.loads(OAK_JSON.read_text(encoding="utf-8"))
    technique_ids = {t["id"] for t in (oak.get("techniques") or [])}
    mitigation_ids = {m["id"] for m in (oak.get("mitigations") or [])}
    example_files = {p.stem for p in EXAMPLES_DIR.glob("*.md")} if EXAMPLES_DIR.exists() else set()

    specs: list[dict] = []
    seen_spec_ids: set[str] = set()
    errors: list[str] = []
    warnings: list[str] = []

    for spec_path in sorted(SPECS_DIR.glob("*.yml")):
        rel = spec_path.relative_to(ROOT)
        try:
            data = yaml.safe_load(spec_path.read_text(encoding="utf-8"))
        except yaml.YAMLError as e:
            errors.append(f"{rel}: YAML parse: {e}")
            continue

        missing = REQUIRED - set(data.keys())
        if missing:
            errors.append(f"{rel}: missing fields: {sorted(missing)}")
            continue

        sid = data["spec_id"]
        if sid in seen_spec_ids:
            errors.append(f"{rel}: duplicate spec_id {sid}")
            continue
        seen_spec_ids.add(sid)

        if data["maturity"] not in VALID_MATURITY:
            errors.append(f"{rel}: invalid maturity={data['maturity']}")
        if data["license"] not in VALID_LICENSE:
            errors.append(f"{rel}: invalid license={data['license']}")

        techs = data["oak_techniques"]
        if not isinstance(techs, list) or not techs:
            errors.append(f"{rel}: oak_techniques must be a non-empty list")
            techs = []
        for tid in techs:
            if tid not in technique_ids:
                errors.append(f"{rel}: unknown OAK Technique {tid}")

        if not isinstance(data["scope"], str) or not data["scope"].strip():
            errors.append(f"{rel}: scope must be a non-empty string")

        ds = data["data_sources"]
        if not isinstance(ds, list) or not all(isinstance(x, str) for x in ds):
            errors.append(f"{rel}: data_sources must be list[str]")

        dl = data["detection_logic"]
        if not isinstance(dl, dict):
            errors.append(f"{rel}: detection_logic must be a mapping")
        else:
            if not str(dl.get("description", "")).strip():
                errors.append(f"{rel}: detection_logic.description required")
            if not str(dl.get("pseudocode", "")).strip():
                errors.append(f"{rel}: detection_logic.pseudocode required (canonical artefact)")

        oa = data["output_alert"]
        if not isinstance(oa, list) or not all(isinstance(x, str) for x in oa):
            errors.append(f"{rel}: output_alert must be list[str]")

        fixtures = data["test_fixtures"]
        if not isinstance(fixtures, dict):
            errors.append(f"{rel}: test_fixtures must be a mapping")
            fixtures = {"positive": [], "negative": []}
        positives = fixtures.get("positive") or []
        if data["maturity"] == "stable" and not positives:
            errors.append(f"{rel}: maturity=stable requires non-empty test_fixtures.positive")
        for slug in positives:
            if not isinstance(slug, str):
                errors.append(f"{rel}: positive fixture must be a string slug")
                continue
            if slug not in example_files:
                warnings.append(f"{rel}: positive fixture '{slug}' has no examples/{slug}.md")

        for m in (data.get("mitigations") or []):
            if not isinstance(m, str):
                errors.append(f"{rel}: mitigations must be list[str] of OAK-Mxx IDs")
                continue
            if m not in mitigation_ids:
                warnings.append(f"{rel}: unknown mitigation {m}")

        for ri in (data.get("reference_implementations") or []):
            if not isinstance(ri, dict) or "target" not in ri or "url" not in ri:
                errors.append(f"{rel}: reference_implementations entries need {{target, url}}")

        specs.append({
            "spec_id": sid,
            "path": str(rel),
            "oak_techniques": techs,
            "version": data.get("version", ""),
            "maturity": data["maturity"],
            "maintainer": data.get("maintainer", ""),
            "license": data["license"],
            "scope": data["scope"],
            "data_sources": ds,
            "parameter_count": len(data.get("parameters") or {}),
            "fixture_counts": {
                "positive": len(positives),
                "negative": len(fixtures.get("negative") or []),
            },
            "reference_impl_count": len(data.get("reference_implementations") or []),
            "mitigation_ids": data.get("mitigations") or [],
            "body": data,
        })

    if errors:
        print("FAIL: validation errors:", file=sys.stderr)
        for e in errors:
            print(f"  {e}", file=sys.stderr)
        return 1

    for w in warnings:
        warn(w)

    payload = {
        "specs": specs,
        "by_technique": _index_by_technique(specs),
        "stats": {
            "spec_count": len(specs),
            "by_maturity": _count_by(specs, "maturity"),
            "techniques_covered": sorted({t for s in specs for t in s["oak_techniques"]}),
        },
        "generated_at": _now(),
    }
    Path(OUT).write_text(json.dumps(payload, indent=2), encoding="utf-8")
    avg_lines = _avg_yaml_lines()
    print(f"OK: wrote {OUT.relative_to(ROOT)} — {len(specs)} spec(s), "
          f"covering {len(payload['stats']['techniques_covered'])} Technique(s), "
          f"avg {avg_lines} lines/spec")
    return 0


def _avg_yaml_lines() -> int:
    files = list(SPECS_DIR.glob("*.yml"))
    if not files:
        return 0
    total = sum(len(p.read_text(encoding="utf-8").splitlines()) for p in files)
    return total // len(files)


def _index_by_technique(specs: list[dict]) -> dict[str, list[str]]:
    out: dict[str, list[str]] = {}
    for s in specs:
        for t in s["oak_techniques"]:
            out.setdefault(t, []).append(s["spec_id"])
    return out


def _count_by(items: list[dict], key: str) -> dict[str, int]:
    out: dict[str, int] = {}
    for it in items:
        out[it[key]] = out.get(it[key], 0) + 1
    return dict(sorted(out.items()))


def _now() -> str:
    from datetime import datetime, timezone
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+00:00")


if __name__ == "__main__":
    sys.exit(main())
