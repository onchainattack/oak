#!/usr/bin/env python3
"""
check_targets.py — verify the corpus meets per-Tactic minimum-coverage targets.

Each Tactic has a documented minimum incident count per active year (see
COVERAGE-TARGETS.md). This script flags Tactic / year cells under target so
the gap is visible and CI can prevent quiet-debt accumulation.

Usage:
    python3 tools/check_targets.py             # report + non-zero exit if any P0 (zero-incident year) failure
    python3 tools/check_targets.py --strict    # non-zero exit on any P0 or P1 (under-target) failure
    python3 tools/check_targets.py --json      # machine-readable

Exit codes:
    0 — corpus meets targets at the configured strictness level
    1 — at least one target violation
"""

from __future__ import annotations

import datetime as dt
import json
import re
import sys
from collections import Counter
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent

YEAR_RE = re.compile(r"^(\d{4})")
TECH_RE = re.compile(r"\bOAK-T(\d+)\.\d+(?:\.\d+)?\b")

# Mirror of build_backlog.py thresholds. Single source of truth would live in
# COVERAGE-TARGETS.md but the markdown table is awkward to parse; for now both
# files keep these hardcoded and a docs comment notes they must stay in sync.
COVERAGE_TARGETS = [
    ("T1", "Token Genesis", 2020, 5),
    ("T2", "Liquidity Establishment", 2020, 3),
    ("T3", "Holder Capture", 2021, 2),
    ("T4", "Access Acquisition", 2020, 4),
    ("T5", "Value Extraction", 2020, 4),
    ("T6", "Defense Evasion", 2022, 2),
    ("T7", "Laundering", 2018, 4),
    ("T8", "Operational Reuse", 2020, 3),
    ("T9", "Smart-Contract Exploit", 2020, 5),
    ("T10", "Bridge / Cross-Chain", 2021, 3),
    ("T11", "Custody / Signing", 2018, 3),
    ("T12", "NFT-Specific", 2021, 2),
    ("T13", "Account Abstraction", 2024, 3),
    ("T14", "Validator / Staking", 2023, 3),
    ("T15", "Off-chain Entry-Vector / Pre-Positioning", 2017, 3),
    ("T16", "Governance / Voting Manipulation", 2021, 2),
    ("T17", "Market Manipulation", 2020, 3),
]


def parse_examples():
    out = []
    for p in sorted((REPO / "examples").glob("*.md")):
        if p.name.lower() == "readme.md":
            continue
        text = p.read_text(encoding="utf-8")
        m = YEAR_RE.match(p.name)
        year = int(m.group(1)) if m else None
        tactics = {int(t) for t in TECH_RE.findall(text)}
        out.append({"name": p.name, "year": year, "tactics": tactics})
    return out


def main() -> int:
    args = sys.argv[1:]
    strict = "--strict" in args
    output_json = "--json" in args

    examples = parse_examples()
    counts: Counter[tuple[int, int]] = Counter()
    for e in examples:
        if e["year"] is None:
            continue
        for t in e["tactics"]:
            counts[(e["year"], t)] += 1

    current_year = dt.date.today().year
    p0: list[dict] = []
    p1: list[dict] = []

    for tactic_id, name, active_since, min_per_year in COVERAGE_TARGETS:
        t_num = int(tactic_id[1:])
        for year in range(max(active_since, 2020), current_year + 1):
            actual = counts.get((year, t_num), 0)
            row = {"tactic": tactic_id, "name": name, "year": year, "actual": actual, "target": min_per_year}
            if actual == 0 and year < current_year:  # current year still in progress
                p0.append(row)
            elif 0 < actual < min_per_year:
                p1.append(row)

    if output_json:
        print(json.dumps({"p0": p0, "p1": p1, "current_year": current_year, "strict": strict}, indent=2))
    else:
        print(f"Coverage-target check — {len(examples)} examples, {len(COVERAGE_TARGETS)} Tactics")
        print(f"Active-year window: 2020-{current_year - 1} (current year {current_year} excluded as in-progress)")
        print()
        if p0:
            print(f"P0 — {len(p0)} (Tactic, year) cells with ZERO incidents in an active year:")
            for r in p0[:30]:
                print(f"  {r['tactic']:<5} {r['year']}  ({r['name']})  actual=0 target≥{r['target']}")
            if len(p0) > 30:
                print(f"  ... and {len(p0) - 30} more")
        else:
            print("P0 — clean (no empty active-year cells)")
        print()
        if p1:
            print(f"P1 — {len(p1)} (Tactic, year) cells under target:")
            for r in p1[:30]:
                print(f"  {r['tactic']:<5} {r['year']}  ({r['name']})  actual={r['actual']} target≥{r['target']}")
            if len(p1) > 30:
                print(f"  ... and {len(p1) - 30} more")
        else:
            print("P1 — clean (all active-year cells meet per-Tactic minimum)")
        print()
        print(f"Run `python3 tools/build_backlog.py > BACKLOG.md` to regenerate the contributor backlog.")

    return 1 if p0 or (strict and p1) else 0


if __name__ == "__main__":
    sys.exit(main())
