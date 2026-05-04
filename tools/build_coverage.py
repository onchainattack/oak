#!/usr/bin/env python3
"""build_coverage.py — read coverage/manifest.yml + tools/oak.json and emit
tools/coverage.json, the data the static site renders into the Coverage
Map page.

Output shape:
{
  "vendors": [
    { "key": "goplus", "name": "...", "product": "...", "url": "...",
      "type": "...", "chains": [...], "description": "...",
      "technique_ids": ["OAK-T1.001", ...] }
  ],
  "techniques": [
    { "id": "OAK-T1.001", "name": "Modifiable Tax Function",
      "parent_tactics": ["OAK-T1"] }
  ],
  "tactics": [ { "id": "OAK-T1", "name": "Token Genesis" } ],
  "matrix": {
    "goplus": {
      "OAK-T1.001": { "coverage": "partial", "field": "slippage_modifiable" }
    }
  },
  "stats": {
    "vendor_count": 37,
    "technique_count": 98,
    "edge_count": 326,
    "vendors_by_type": { "audit-firm": 8, "static-analyzer": 4, ... },
    "coverage_by_tier": { "full": N, "partial": N, "documented": N, ... }
  }
}

Usage:
    python3 tools/build_coverage.py
"""

from __future__ import annotations

import json
import sys
from collections import Counter, defaultdict
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "coverage" / "manifest.yml"
OAK_JSON = ROOT / "tools" / "oak.json"
OUT = ROOT / "tools" / "coverage.json"

VALID_TIERS = {"full", "partial", "documented", "gap", "na"}
VALID_TYPES = {
    "runtime-risk-engine",
    "token-security-api",
    "static-analyzer",
    "formal-verification",
    "fuzzer",
    "runtime-monitoring",
    "audit-firm",
    "audit-platform",
    "forensics",
    "analytics",
    "market-data",
    "explorer",
    "dfir",
    "threat-intel",
    "simulation-tool",
}


def fail(msg: str) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(1)


def main() -> int:
    if not MANIFEST.exists():
        fail(f"manifest not found: {MANIFEST}")
    if not OAK_JSON.exists():
        fail(f"oak.json not found: {OAK_JSON} (run `python3 tools/export_json.py` first)")

    manifest = yaml.safe_load(MANIFEST.read_text(encoding="utf-8"))
    oak = json.loads(OAK_JSON.read_text(encoding="utf-8"))

    technique_ids = {t["id"]: t for t in oak.get("techniques", [])}
    tactic_ids = {t["id"]: t for t in oak.get("tactics", [])}

    vendors_out = []
    matrix: dict[str, dict] = {}
    edge_count = 0
    coverage_counts: Counter = Counter()
    type_counts: Counter = Counter()
    seen_keys: set[str] = set()

    for v in manifest.get("vendors", []):
        key = v.get("key")
        if not key:
            fail(f"vendor missing 'key': {v.get('name', 'unknown')}")
        if key in seen_keys:
            fail(f"duplicate vendor key: {key}")
        seen_keys.add(key)

        vtype = v.get("type", "")
        if vtype and vtype not in VALID_TYPES:
            fail(f"vendor {key}: unknown type '{vtype}' "
                 f"(allowed: {sorted(VALID_TYPES)})")

        techniques = v.get("techniques") or []
        per_tech: dict[str, dict] = {}
        tech_ids_for_vendor: list[str] = []
        for entry in techniques:
            tid = entry.get("id")
            if not tid:
                fail(f"vendor {key}: technique entry missing 'id'")
            if tid not in technique_ids:
                fail(f"vendor {key}: references unknown technique {tid}")
            tier = entry.get("coverage", "documented")
            if tier not in VALID_TIERS:
                fail(f"vendor {key} / {tid}: invalid coverage tier '{tier}' "
                     f"(allowed: {sorted(VALID_TIERS)})")
            cell: dict = {"coverage": tier}
            if entry.get("detector_id"):
                cell["detector_id"] = entry["detector_id"]
            if entry.get("field"):
                cell["field"] = entry["field"]
            if entry.get("note"):
                cell["note"] = entry["note"]
            per_tech[tid] = cell
            tech_ids_for_vendor.append(tid)
            edge_count += 1
            coverage_counts[tier] += 1

        matrix[key] = per_tech
        type_counts[vtype or "unknown"] += 1

        vendors_out.append({
            "key": key,
            "name": v.get("name", key),
            "product": v.get("product", ""),
            "url": v.get("url", ""),
            "type": vtype,
            "chains": v.get("chains", []),
            "description": v.get("description", ""),
            "technique_ids": tech_ids_for_vendor,
        })

    techniques_out = []
    for tid, t in sorted(technique_ids.items(), key=lambda kv: _sort_key(kv[0])):
        techniques_out.append({
            "id": tid,
            "name": t.get("name", ""),
            "parent_tactics": t.get("parent_tactics", []) or [],
            "maturity": t.get("maturity", ""),
            "chains": t.get("chains", []) or [],
        })

    tactics_out = []
    for tact_id, tact in sorted(tactic_ids.items(), key=lambda kv: _sort_key(kv[0])):
        tactics_out.append({
            "id": tact_id,
            "name": tact.get("name", ""),
            "techniques": tact.get("techniques", []) or [],
        })

    payload = {
        "vendors": sorted(vendors_out, key=lambda v: (v["type"] or "zzz", v["name"])),
        "techniques": techniques_out,
        "tactics": tactics_out,
        "matrix": matrix,
        "stats": {
            "vendor_count": len(vendors_out),
            "technique_count": len(techniques_out),
            "edge_count": edge_count,
            "vendors_by_type": dict(sorted(type_counts.items())),
            "coverage_by_tier": dict(sorted(coverage_counts.items())),
        },
        "generated_at": _now_iso(),
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(payload, indent=2), encoding="utf-8")

    s = payload["stats"]
    print(
        f"OK: wrote {OUT} — {s['vendor_count']} vendors, "
        f"{s['edge_count']} vendor-technique edges across {s['technique_count']} OAK Techniques"
    )
    print(f"  by tier:  {s['coverage_by_tier']}")
    print(f"  by type:  {s['vendors_by_type']}")
    return 0


def _sort_key(tech_id: str) -> tuple:
    """`OAK-T1.001` → (1, 1); `OAK-T13.001.003` → (13, 1, 3)."""
    body = tech_id.removeprefix("OAK-T")
    parts = []
    for chunk in body.split("."):
        try:
            parts.append(int(chunk))
        except ValueError:
            parts.append(0)
    return tuple(parts)


def _now_iso() -> str:
    from datetime import datetime, timezone
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+00:00")


if __name__ == "__main__":
    sys.exit(main())
