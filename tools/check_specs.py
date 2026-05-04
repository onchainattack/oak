#!/usr/bin/env python3
"""check_specs.py — coverage validator: every Technique should have at
least one OAK Detection Spec, and every spec must reference a canonical
Technique.

Two checks:

  1. Forward drift — every spec_id in tools/specs.json references at
     least one OAK-Tn[.NNN[.NNN]] ID present in tools/oak.json. (Already
     enforced by build_specs.py at write time, re-checked here for CI
     paranoia.)

  2. Coverage gap — every Technique in tools/oak.json should have at
     least one spec covering it. Gaps are reported with per-Tactic
     breakdown so the priority queue is obvious.

Default exit policy:
  - Forward-drift errors → exit 1 (hard fail).
  - Coverage gaps         → exit 0 by default (advisory). Pass
                             --strict to fail on any gap, or
                             --require-maturity {stable,emerging,...}
                             to fail only on gaps for Techniques at or
                             above the named maturity.

Usage:
    python3 tools/check_specs.py
    python3 tools/check_specs.py --json
    python3 tools/check_specs.py --by-tactic
    python3 tools/check_specs.py --gaps-only
    python3 tools/check_specs.py --strict
    python3 tools/check_specs.py --require-maturity stable
"""

from __future__ import annotations

import argparse
import json
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OAK_JSON = ROOT / "tools" / "oak.json"
SPECS_JSON = ROOT / "tools" / "specs.json"

MATURITY_ORDER = ["draft", "emerging", "observed", "stable"]


def fail(msg: str) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(2)


def load_oak() -> dict:
    if not OAK_JSON.exists():
        fail(f"{OAK_JSON.relative_to(ROOT)} not found — run `python3 tools/export_json.py` first.")
    return json.loads(OAK_JSON.read_text(encoding="utf-8"))


def load_specs() -> dict:
    if not SPECS_JSON.exists():
        fail(f"{SPECS_JSON.relative_to(ROOT)} not found — run `python3 tools/build_specs.py` first.")
    return json.loads(SPECS_JSON.read_text(encoding="utf-8"))


def maturity_at_or_above(actual: str, threshold: str) -> bool:
    if threshold not in MATURITY_ORDER:
        return False
    if actual not in MATURITY_ORDER:
        return False
    return MATURITY_ORDER.index(actual) >= MATURITY_ORDER.index(threshold)


def technique_tactic_key(tid: str) -> str:
    """OAK-T9.006.001 → OAK-T9; OAK-T1 → OAK-T1."""
    head = tid.split(".", 1)[0]
    return head


def build_report(oak: dict, specs_payload: dict) -> dict:
    techniques = oak.get("techniques") or []
    tactics = oak.get("tactics") or []
    tactic_name = {t["id"]: t.get("name", t["id"]) for t in tactics}

    technique_index = {t["id"]: t for t in techniques}
    specs = specs_payload.get("specs") or []
    by_technique = specs_payload.get("by_technique") or {}

    # Forward-drift: every Technique referenced by a spec must exist.
    drift_errors: list[str] = []
    for s in specs:
        for tid in s.get("oak_techniques") or []:
            if tid not in technique_index:
                drift_errors.append(
                    f"spec {s.get('spec_id')} references unknown Technique {tid}"
                )

    # Coverage: which Techniques have ≥1 spec, which don't.
    covered: set[str] = set()
    for tid, spec_ids in by_technique.items():
        if spec_ids:
            covered.add(tid)

    gaps_by_tactic: dict[str, list[dict]] = defaultdict(list)
    covered_by_tactic: dict[str, list[dict]] = defaultdict(list)

    for t in sorted(techniques, key=lambda x: x["id"]):
        tac = technique_tactic_key(t["id"])
        bucket = covered_by_tactic if t["id"] in covered else gaps_by_tactic
        bucket[tac].append({
            "id": t["id"],
            "name": t.get("name", ""),
            "maturity": t.get("maturity") or "draft",
            "covered": t["id"] in covered,
            "spec_ids": list(by_technique.get(t["id"], [])),
        })

    all_tactic_ids = sorted(
        set(gaps_by_tactic) | set(covered_by_tactic),
        key=lambda x: int(x.replace("OAK-T", "")),
    )

    tactic_summary = []
    for tac in all_tactic_ids:
        cov = len(covered_by_tactic.get(tac, []))
        gap = len(gaps_by_tactic.get(tac, []))
        tactic_summary.append({
            "tactic": tac,
            "name": tactic_name.get(tac, tac),
            "covered": cov,
            "total": cov + gap,
            "ratio": (cov / (cov + gap)) if (cov + gap) > 0 else 0.0,
        })

    return {
        "drift_errors": drift_errors,
        "totals": {
            "technique_count": len(techniques),
            "spec_count": len(specs),
            "covered_techniques": len(covered),
            "uncovered_techniques": len(techniques) - len(covered),
            "coverage_ratio": (len(covered) / len(techniques)) if techniques else 0.0,
        },
        "tactic_summary": tactic_summary,
        "gaps_by_tactic": dict(gaps_by_tactic),
        "covered_by_tactic": dict(covered_by_tactic),
    }


def print_human(report: dict, gaps_only: bool, by_tactic: bool) -> None:
    t = report["totals"]
    print(f"OAK Detection Specs coverage")
    print(f"  Techniques: {t['technique_count']}")
    print(f"  Specs:      {t['spec_count']}")
    print(f"  Covered:    {t['covered_techniques']} ({t['coverage_ratio']:.1%})")
    print(f"  Gaps:       {t['uncovered_techniques']}")
    print()

    if report["drift_errors"]:
        print("FORWARD DRIFT — specs reference unknown Techniques:")
        for e in report["drift_errors"]:
            print(f"  ✗ {e}")
        print()

    print("Per-Tactic coverage:")
    for row in report["tactic_summary"]:
        ratio = row["ratio"]
        bar = "✅" if ratio == 1.0 else ("🟡" if ratio > 0 else "⚪")
        print(f"  {bar} {row['tactic']:<6} {row['name']:<42} {row['covered']:>2}/{row['total']:<2}  ({ratio:.0%})")
    print()

    if by_tactic or gaps_only:
        print("Gaps:")
        any_gap = False
        for tac in sorted(report["gaps_by_tactic"], key=lambda x: int(x.replace("OAK-T", ""))):
            entries = report["gaps_by_tactic"][tac]
            if not entries:
                continue
            any_gap = True
            print(f"  {tac}:")
            for e in entries:
                print(f"    [{e['maturity']:<8}] {e['id']:<14} {e['name']}")
        if not any_gap:
            print("  (none)")
        print()


def main() -> int:
    ap = argparse.ArgumentParser(description="OAK Detection Specs coverage validator")
    ap.add_argument("--json", action="store_true", help="machine-readable output")
    ap.add_argument("--by-tactic", action="store_true", help="show per-Tactic gap list")
    ap.add_argument("--gaps-only", action="store_true", help="only show un-spec'd Techniques")
    ap.add_argument("--strict", action="store_true",
                    help="fail (exit 1) on any coverage gap")
    ap.add_argument("--require-maturity", choices=MATURITY_ORDER,
                    help="fail (exit 1) if any Technique at/above this maturity is un-spec'd")
    args = ap.parse_args()

    oak = load_oak()
    specs = load_specs()
    report = build_report(oak, specs)

    # Forward-drift is always a hard fail.
    drift = bool(report["drift_errors"])

    # Coverage gating: --strict or --require-maturity.
    gating_failure = False
    if args.strict and report["totals"]["uncovered_techniques"] > 0:
        gating_failure = True
    if args.require_maturity:
        for entries in report["gaps_by_tactic"].values():
            for e in entries:
                if maturity_at_or_above(e["maturity"], args.require_maturity):
                    gating_failure = True
                    break
            if gating_failure:
                break

    if args.json:
        print(json.dumps(report, indent=2))
    else:
        print_human(report, gaps_only=args.gaps_only, by_tactic=args.by_tactic)
        if drift:
            print("FAIL: forward-drift errors must be fixed before merge.", file=sys.stderr)
        if gating_failure:
            mode = "--strict" if args.strict else f"--require-maturity {args.require_maturity}"
            print(f"FAIL: coverage gating ({mode}) — un-spec'd Techniques present.", file=sys.stderr)

    if drift:
        return 1
    if gating_failure:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
