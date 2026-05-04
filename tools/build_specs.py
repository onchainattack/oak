#!/usr/bin/env python3
"""build_specs.py — validate and aggregate OAK Detection Specs.

Each `specs/*.yml` is a vendor-neutral detection spec for an OAK Technique
(language-agnostic pseudocode + structured detection logic). Specs live
inside this repo alongside `techniques/*.md` because they are derivative
of the Technique scope and would drift if separated.

This tool:

  1. Validates every spec against the schema (required fields, ID
     resolution, fixture / mitigation cross-references).
  2. Emits `tools/specs.json` — single-file aggregate consumed by the
     OAK site (specs render on the Technique page) and by oak-mcp
     (`oak_get_detection_spec` tool, future).

Run as part of `npm run site:data`.

Validation errors fail the build with non-zero exit. Cross-reference
warnings (spec mentions a Mitigation that doesn't exist yet) are reported
but don't fail.

Usage:
    python3 tools/build_specs.py
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
SPECS_DIR = ROOT / "specs"
TECH_DIR = ROOT / "techniques"
MIT_DIR = ROOT / "mitigations"
EXAMPLES_DIR = ROOT / "examples"
OAK_JSON = ROOT / "tools" / "oak.json"
OUT = ROOT / "tools" / "specs.json"

REQUIRED_TOP = {
    "oak_techniques", "spec_id", "version", "maturity", "maintainer",
    "license", "scope", "data_sources", "detection_logic",
    "parameters", "output_alert", "test_fixtures",
}
VALID_MATURITY = {"draft", "review", "stable"}
VALID_LICENSE = {"Apache-2.0", "MIT", "CC-BY-SA-4.0"}


def fail(msg: str) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(1)


def warn(msg: str) -> None:
    print(f"WARN:  {msg}", file=sys.stderr)


def technique_filename_id(filename: str) -> str:
    """`T3.002-wash-trade-volume-inflation.md` → `OAK-T3.002`."""
    head = filename.split("-", 1)[0]
    return f"OAK-{head}"


def main() -> int:
    if not SPECS_DIR.exists():
        print("OK: no specs/ directory yet — nothing to build.")
        Path(OUT).write_text(json.dumps({"specs": [], "generated_at": _now()}, indent=2))
        return 0

    if not OAK_JSON.exists():
        fail(f"{OAK_JSON} not found — run `python3 tools/export_json.py` first.")

    oak = json.loads(OAK_JSON.read_text(encoding="utf-8"))
    technique_ids = {t["id"] for t in (oak.get("techniques") or [])}
    mitigation_ids = {m["id"] for m in (oak.get("mitigations") or [])}
    example_files = {p.name for p in EXAMPLES_DIR.glob("*.md")} if EXAMPLES_DIR.exists() else set()

    specs = []
    seen_spec_ids: set[str] = set()
    seen_technique_pairs: set[tuple[str, ...]] = set()
    errors: list[str] = []
    warnings: list[str] = []

    for spec_path in sorted(SPECS_DIR.glob("*.yml")):
        try:
            data = yaml.safe_load(spec_path.read_text(encoding="utf-8"))
        except yaml.YAMLError as e:
            errors.append(f"{spec_path.name}: YAML parse error: {e}")
            continue

        rel = spec_path.relative_to(ROOT)

        # 1. Required top-level fields.
        missing = REQUIRED_TOP - set(data.keys())
        if missing:
            errors.append(f"{rel}: missing required fields: {sorted(missing)}")
            continue

        # 2. spec_id uniqueness.
        sid = data["spec_id"]
        if sid in seen_spec_ids:
            errors.append(f"{rel}: duplicate spec_id {sid}")
            continue
        seen_spec_ids.add(sid)

        # 3. maturity / license.
        if data["maturity"] not in VALID_MATURITY:
            errors.append(f"{rel}: invalid maturity={data['maturity']} "
                          f"(allowed: {sorted(VALID_MATURITY)})")
        if data["license"] not in VALID_LICENSE:
            errors.append(f"{rel}: invalid license={data['license']} "
                          f"(allowed: {sorted(VALID_LICENSE)})")

        # 4. oak_techniques resolution.
        techs = data["oak_techniques"]
        if not isinstance(techs, list) or not techs:
            errors.append(f"{rel}: oak_techniques must be a non-empty list")
            techs = []
        for tid in techs:
            if tid not in technique_ids:
                errors.append(f"{rel}: oak_techniques references unknown {tid}")

        pair = tuple(sorted(techs))
        if pair in seen_technique_pairs:
            warnings.append(f"{rel}: another spec already covers {pair} — "
                            f"is this an overlap?")
        seen_technique_pairs.add(pair)

        # 5. detection_logic shape.
        dl = data["detection_logic"]
        if not isinstance(dl, dict):
            errors.append(f"{rel}: detection_logic must be a mapping")
        else:
            if not dl.get("description") or not str(dl["description"]).strip():
                errors.append(f"{rel}: detection_logic.description required")
            if not dl.get("pseudocode") or not str(dl["pseudocode"]).strip():
                errors.append(f"{rel}: detection_logic.pseudocode required "
                              f"(this is the canonical, language-agnostic essence)")

        # 6. mitigation cross-references (warn-only — mitigation may be
        # documented in this PR but not yet exported into oak.json).
        for m in (data.get("mitigations") or []):
            mid = m.get("id") if isinstance(m, dict) else m
            if mid and mid not in mitigation_ids:
                warnings.append(f"{rel}: references unknown mitigation {mid}")

        # 7. test_fixtures: positive must be non-empty for stable maturity.
        fixtures = data["test_fixtures"]
        if not isinstance(fixtures, dict):
            errors.append(f"{rel}: test_fixtures must be a mapping")
            fixtures = {"positive": [], "negative": []}
        positives = fixtures.get("positive") or []
        if data["maturity"] == "stable" and not positives:
            errors.append(f"{rel}: maturity=stable requires non-empty "
                          f"test_fixtures.positive")
        for fx in positives:
            ref = fx.get("reference") if isinstance(fx, dict) else None
            if ref:
                ref_name = Path(ref).name
                if ref_name not in example_files:
                    warnings.append(f"{rel}: positive fixture references "
                                    f"unknown example file: {ref}")

        specs.append({
            "spec_id": sid,
            "path": str(rel),
            "oak_techniques": techs,
            "version": data.get("version", ""),
            "maturity": data["maturity"],
            "maintainer": data.get("maintainer", ""),
            "license": data["license"],
            "scope_description": (data["scope"].get("description")
                                  if isinstance(data["scope"], dict) else ""),
            "data_sources": [ds.get("id") if isinstance(ds, dict) else ds
                             for ds in (data.get("data_sources") or [])],
            "parameter_count": len(data.get("parameters") or {}),
            "fixture_counts": {
                "positive": len(positives),
                "negative": len(fixtures.get("negative") or []),
            },
            "reference_impl_count": len(data.get("reference_implementations") or []),
            "mitigation_ids": [
                (m.get("id") if isinstance(m, dict) else m)
                for m in (data.get("mitigations") or [])
            ],
            # Full spec body — used by the site renderer to display the page.
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
            "techniques_covered": sorted({tid for s in specs for tid in s["oak_techniques"]}),
        },
        "generated_at": _now(),
    }
    Path(OUT).write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"OK: wrote {OUT.relative_to(ROOT)} — {len(specs)} spec(s) covering "
          f"{len(payload['stats']['techniques_covered'])} OAK Technique(s)")
    if warnings:
        print(f"     {len(warnings)} warning(s) reported above.")
    return 0


def _index_by_technique(specs: list[dict]) -> dict[str, list[str]]:
    out: dict[str, list[str]] = {}
    for s in specs:
        for tid in s["oak_techniques"]:
            out.setdefault(tid, []).append(s["spec_id"])
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
