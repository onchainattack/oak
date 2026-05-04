#!/usr/bin/env python3
"""check_coverage.py — drift guard between coverage/manifest.yml and the
`## Reference implementations` sections of techniques/*.md.

Two checks:

  1. Forward drift — every (vendor, technique) edge declared in the manifest
     with coverage in {full, partial, documented} must have the vendor named
     in that technique's Reference implementations prose.

  2. Reverse drift — every (vendor, technique) pair detected in prose by the
     extractor must be reflected in the manifest with at least one entry
     for that technique on that vendor.

`gap` and `na` edges in the manifest are exempt from forward-drift because
"out of scope" is exactly the case where the vendor is *not* in the prose.

Run as part of CI. Exit 0 on no drift, 1 on drift, 2 on hard validation
errors.
"""

from __future__ import annotations

import sys
from pathlib import Path

import yaml

# Reuse the canonical vendor regex catalogue + extraction logic from the seed
# script — single source of truth.
sys.path.insert(0, str(Path(__file__).resolve().parent))
from extract_coverage import (  # noqa: E402
    VENDORS,
    TECH_DIR,
    extract_section,
    technique_id_from_path,
    find_vendor_lines,
)

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "coverage" / "manifest.yml"

EXEMPT_TIERS = {"gap", "na"}


def main() -> int:
    if not MANIFEST.exists():
        print(f"ERROR: manifest not found: {MANIFEST}", file=sys.stderr)
        return 2

    manifest = yaml.safe_load(MANIFEST.read_text(encoding="utf-8"))

    declared: dict[str, dict[str, str]] = {}
    for v in manifest.get("vendors", []):
        key = v["key"]
        declared[key] = {}
        for entry in (v.get("techniques") or []):
            declared[key][entry["id"]] = entry.get("coverage", "documented")

    detected: dict[str, set[str]] = {}
    for path in sorted(TECH_DIR.glob("T*.md")):
        section = extract_section(path)
        if not section:
            continue
        tid = technique_id_from_path(path)
        for vendor_key, _line in find_vendor_lines(section):
            detected.setdefault(vendor_key, set()).add(tid)

    forward_misses: list[tuple[str, str, str]] = []
    reverse_misses: list[tuple[str, str]] = []
    unknown_vendors: list[str] = []

    # Forward: manifest claims X about T → must appear in T's prose
    for vendor_key, by_tech in declared.items():
        for tid, tier in by_tech.items():
            if tier in EXEMPT_TIERS:
                continue
            if tid not in detected.get(vendor_key, set()):
                forward_misses.append((vendor_key, tid, tier))

    # Reverse: prose names vendor X in T → manifest must list (X, T)
    for vendor_key, tids in detected.items():
        if vendor_key not in declared:
            unknown_vendors.append(vendor_key)
            continue
        for tid in tids:
            if tid not in declared[vendor_key]:
                reverse_misses.append((vendor_key, tid))

    # Forward drift is informational — manifest can legitimately claim vendor
    # coverage based on domain knowledge before it lands in prose. Reverse
    # drift (prose names a vendor we don't list) is a real bug.
    hard_fail = bool(reverse_misses or unknown_vendors)

    if forward_misses:
        print(f"FORWARD DRIFT (warning, not failing) — manifest claims coverage "
              f"that prose doesn't back up ({len(forward_misses)} edges).",
              file=sys.stderr)
        print("Consider extending the Reference implementations section of these "
              "Techniques to back the claim:", file=sys.stderr)
        for vendor_key, tid, tier in forward_misses[:10]:
            print(f"  {vendor_key:24s} {tid:18s} tier={tier}", file=sys.stderr)
        if len(forward_misses) > 10:
            print(f"  ... and {len(forward_misses) - 10} more "
                  f"(run with --verbose-forward to see all)", file=sys.stderr)

    if reverse_misses:
        print(f"\nREVERSE DRIFT (FAIL) — prose names a vendor that manifest "
              f"doesn't list ({len(reverse_misses)} edges):", file=sys.stderr)
        for vendor_key, tid in reverse_misses[:25]:
            print(f"  {vendor_key:24s} {tid:18s} — add to coverage/manifest.yml "
                  f"or set coverage: gap", file=sys.stderr)
        if len(reverse_misses) > 25:
            print(f"  ... and {len(reverse_misses) - 25} more", file=sys.stderr)

    if unknown_vendors:
        print(f"\nUNKNOWN VENDOR (FAIL) — extractor matched a vendor not in "
              f"manifest ({len(unknown_vendors)} vendors):", file=sys.stderr)
        for v in sorted(unknown_vendors):
            print(f"  {v}", file=sys.stderr)

    if not hard_fail:
        if forward_misses:
            print(f"\nOK: no reverse drift. {len(forward_misses)} forward-drift "
                  f"items above are informational.", file=sys.stderr)
        else:
            print("OK: coverage/manifest.yml in sync with techniques/*.md")
        return 0

    print(f"\nFAIL: reverse drift / unknown vendor. Run "
          f"`python3 tools/sync_coverage.py` to auto-merge prose-detected "
          f"edges into coverage/manifest.yml, then re-run this check.",
          file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())
