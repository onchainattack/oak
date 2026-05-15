#!/usr/bin/env python3
"""
check_linkage.py — validate cross-references and structural completeness across
OAK worked examples and taxonomy entries.

Checks performed:
  1. Inventory: build canonical sets of valid IDs from filenames in
     tactics/, techniques/, actors/, mitigations/, software/, data-sources/.
  2. Candidate inventory: collect "proposed v0.x" candidate IDs from
     TAXONOMY-GAPS.md so they can be referenced in examples without
     producing a false-positive broken-link error.
  3. Per-example structural: every file under examples/ must have an H1,
     a **Loss:** line, an **OAK Techniques observed:** line, an **Attribution:**
     line with a strength label, a ## Summary section, and a ## Public references
     section.
  4. Per-example reference resolution: every OAK-T*, OAK-G*, OAK-M*, OAK-S*,
     OAK-DS-* mention must resolve to (a) an existing taxonomy file,
     (b) a candidate proposed in TAXONOMY-GAPS.md, or (c) the generic
     placeholder OAK-Gnn / OAK-Tnn / OAK-Mnn / OAK-Snn.
  5. Roll-up: dump per-Tactic example counts and attribution-strength mix.

Usage:
    python3 tools/check_linkage.py [--quiet] [--rollup-only]

Exit codes:
    0 — all checks pass
    1 — at least one structural or reference defect found
"""

from __future__ import annotations

import re
import sys
from collections import Counter
from pathlib import Path

from common import (
    ID_RE,
    PLACEHOLDER_RE,
    ATTR_STRENGTH_RE,
    build_inventory,
    parse_taxonomy_gaps_candidates,
)

REPO = Path(__file__).resolve().parent.parent

H1_RE = re.compile(r"^# .+", re.MULTILINE)
LOSS_RE = re.compile(
    r"\*\*(?:Loss|Total\s+loss|Direct\s+loss|Volume(?:\s+\w+)?|Cumulative(?:\s+\w+)?|Loss\s+\w+)[^*]*?:\*\*",
    re.IGNORECASE,
)
TECHNIQUES_RE = re.compile(r"\*\*OAK Techniques observed:\*\*")
ATTRIBUTION_RE = re.compile(r"^\*\*Attribution:\*\*", re.MULTILINE)
SUMMARY_H2_RE = re.compile(r"^## Summary\b", re.MULTILINE)
REFS_H2_RE = re.compile(r"^## Public references\b", re.MULTILINE)
TACTIC_FROM_TECH_RE = re.compile(r"OAK-T(\d+)\.\d+")


def check_example_structure(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8")
    issues: list[str] = []
    if not H1_RE.search(text):
        issues.append("missing H1 title")
    if not LOSS_RE.search(text):
        issues.append("missing **Loss:** line")
    if not TECHNIQUES_RE.search(text):
        issues.append("missing **OAK Techniques observed:** line")
    if not ATTRIBUTION_RE.search(text):
        issues.append("missing **Attribution:** line")
    elif not ATTR_STRENGTH_RE.search(text):
        issues.append(
            "**Attribution:** present but no strength label "
            "(confirmed | inferred-strong | inferred-weak | pseudonymous | unattributed)"
        )
    if not SUMMARY_H2_RE.search(text):
        issues.append("missing ## Summary section")
    if not REFS_H2_RE.search(text):
        issues.append("missing ## Public references section")
    return issues


def collect_refs(text: str) -> set[str]:
    cleaned = PLACEHOLDER_RE.sub("", text)
    return set(ID_RE.findall(cleaned))


def check_example_references(
    text: str, valid_ids: set[str], candidate_ids: set[str]
) -> list[tuple[str, str]]:
    refs = collect_refs(text)
    unresolved: list[tuple[str, str]] = []
    for ref in sorted(refs):
        if ref in valid_ids:
            continue
        if ref in candidate_ids:
            continue
        unresolved.append((ref, "not defined in taxonomy and not proposed in TAXONOMY-GAPS"))
    return unresolved


def get_attribution_strength(text: str) -> str | None:
    m = ATTR_STRENGTH_RE.search(text)
    return m.group(1) if m else None


def get_tactic_codes(text: str) -> set[str]:
    return {f"T{m}" for m in TACTIC_FROM_TECH_RE.findall(text)}


def main() -> int:
    args = sys.argv[1:]
    quiet = "--quiet" in args
    rollup_only = "--rollup-only" in args

    inv = build_inventory()
    candidates, placeholders = parse_taxonomy_gaps_candidates()
    valid_ids: set[str] = set()
    for s in inv.values():
        valid_ids |= s

    examples_dir = REPO / "examples"
    examples = [
        f for f in sorted(examples_dir.glob("*.md")) if f.name.lower() != "readme.md"
    ]

    structural: dict[str, list[str]] = {}
    references: dict[str, list[tuple[str, str]]] = {}
    attribution_dist: Counter[str] = Counter()
    tactic_coverage: Counter[str] = Counter()
    candidate_refs: Counter[str] = Counter()

    for path in examples:
        text = path.read_text(encoding="utf-8")
        struct = check_example_structure(path)
        if struct:
            structural[path.name] = struct

        refs = check_example_references(text, valid_ids, candidates)
        if refs:
            references[path.name] = refs

        strength = get_attribution_strength(text)
        if strength:
            attribution_dist[strength] += 1
        else:
            attribution_dist["(missing)"] += 1

        for tactic in get_tactic_codes(text):
            tactic_coverage[tactic] += 1

        for ref in collect_refs(text):
            if ref in candidates and ref not in valid_ids:
                candidate_refs[ref] += 1

    print(
        f"OAK linkage check — {len(examples)} example files in examples/\n"
        f"Inventory: {len(inv['tactics'])} tactics, {len(inv['techniques'])} techniques, "
        f"{len(inv['actors'])} actors, {len(inv['mitigations'])} mitigations, "
        f"{len(inv['software'])} software, {len(inv['datasources'])} data sources\n"
        f"TAXONOMY-GAPS: {len(candidates)} numbered candidates + "
        f"{len(placeholders)} placeholder slots"
    )
    print()

    if not rollup_only:
        if structural:
            print(f"STRUCTURAL ISSUES — {len(structural)} file(s):")
            for fn, issues in sorted(structural.items()):
                print(f"  {fn}:")
                for issue in issues:
                    print(f"    - {issue}")
            print()

        if references:
            print(f"UNRESOLVED REFERENCES — {len(references)} file(s):")
            for fn, refs in sorted(references.items()):
                print(f"  {fn}:")
                for ref, reason in refs:
                    print(f"    - {ref}  ({reason})")
            print()

    if not quiet:
        print("ROLL-UP")
        print(f"  Examples per Tactic (via Technique mapping):")
        for tactic in sorted(tactic_coverage, key=lambda x: int(x[1:])):
            count = tactic_coverage[tactic]
            in_inv = f"OAK-{tactic}" in inv["tactics"]
            mark = "" if in_inv else "  [TACTIC NOT IN INVENTORY]"
            print(f"    OAK-{tactic}: {count} examples{mark}")
        uncovered = sorted(
            inv["tactics"] - {f"OAK-{t}" for t in tactic_coverage},
            key=lambda x: int(x.split("T")[1]),
        )
        if uncovered:
            print(f"  Tactics with 0 worked examples: {', '.join(uncovered)}")

        print(f"  Attribution strength distribution:")
        for strength, count in attribution_dist.most_common():
            print(f"    {strength}: {count}")

        if candidate_refs:
            print(f"  Candidate references in examples (resolved via TAXONOMY-GAPS):")
            for ref, count in candidate_refs.most_common():
                print(f"    {ref}: {count}")
        print()

    if structural or references:
        return 1
    print("OK: all examples pass structural and reference checks.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
