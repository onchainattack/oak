#!/usr/bin/env python3
"""
build_coverage_matrix.py — generate a worked-example coverage matrix from
examples/*.md, surfacing year x Tactic x attribution-strength density.

Output is plain markdown sent to stdout. Pipe into a tracked file
(e.g. COVERAGE-EXAMPLES.md) only after review — the matrix should reflect
the curated corpus state, not an arbitrary intermediate.

Tables produced:
  1. Year x Tactic incident counts (the "where is corpus thick / thin" map).
  2. Year x Attribution-strength counts.
  3. Top Actors x Year counts.
  4. Per-Technique density (which Techniques have N examples).
  5. Year-Month density (recent dense window).
  6. Empty-cell list (year-Tactic combinations with zero incidents).

Usage:
    python3 tools/build_coverage_matrix.py [--top-actors N] [--monthly]
                                           [--per-technique]

  --monthly         add a Year-Month density table covering the recent dense
                    window (last 24 months observed in the corpus).
  --per-technique   add a per-Technique table listing every Technique with
                    its example count, including zero-anchor Techniques.

Defaults: top-actors=10, no monthly, no per-technique. Exit code is always 0.
"""

from __future__ import annotations

import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent

YEAR_PREFIX_RE = re.compile(r"^(\d{4})")
TECHNIQUE_REF_RE = re.compile(r"\bOAK-T(\d+)(?:\.\d+){1,2}\b")
TACTIC_REF_RE = re.compile(r"\bOAK-T(\d+)\b")
ACTOR_REF_RE = re.compile(r"\bOAK-G\d{2}\b")
PLACEHOLDER_RE = re.compile(r"\bOAK-(?:G|T|M|S)nn\b")
ATTR_STRENGTH_RE = re.compile(
    r"\*\*(confirmed|inferred-strong|inferred-weak|pseudonymous|unattributed)\b"
)

ATTR_ORDER = ["confirmed", "inferred-strong", "inferred-weak", "pseudonymous", "unattributed", "(missing)"]
TACTIC_NAMES = {
    1: "Token Genesis",
    2: "Liquidity Establishment",
    3: "Holder Capture",
    4: "Access Acquisition",
    5: "Value Extraction",
    6: "Defense Evasion",
    7: "Laundering",
    8: "Operational Reuse",
    9: "Smart-Contract Exploit",
    10: "Bridge / Cross-Chain",
    11: "Custody / Signing",
    12: "NFT-Specific",
    13: "Account Abstraction",
    14: "Validator / Staking",
}


def actor_name_index() -> dict[str, str]:
    idx: dict[str, str] = {}
    for f in (REPO / "actors").glob("OAK-G*.md"):
        m = re.match(r"^(OAK-G\d{2})-(.+?)\.md$", f.name)
        if m:
            slug = m.group(2)
            idx[m.group(1)] = slug
    return idx


YEAR_MONTH_RE = re.compile(r"^(\d{4})-(\d{2})")
TECHNIQUE_FULL_RE = re.compile(r"\bOAK-T\d+(?:\.\d+){1,2}\b")


def parse_example(path: Path) -> dict[str, object]:
    text = path.read_text(encoding="utf-8")
    name = path.name
    year_match = YEAR_PREFIX_RE.match(name)
    year = int(year_match.group(1)) if year_match else None
    ym_match = YEAR_MONTH_RE.match(name)
    year_month = (
        f"{ym_match.group(1)}-{ym_match.group(2)}" if ym_match else None
    )
    cleaned = PLACEHOLDER_RE.sub("", text)
    tactic_codes = {int(m) for m in TECHNIQUE_REF_RE.findall(cleaned)}
    techniques = set(TECHNIQUE_FULL_RE.findall(cleaned))
    actors = set(ACTOR_REF_RE.findall(cleaned))
    strength_match = ATTR_STRENGTH_RE.search(text)
    strength = strength_match.group(1) if strength_match else "(missing)"
    return {
        "name": name,
        "year": year,
        "year_month": year_month,
        "tactics": tactic_codes,
        "techniques": techniques,
        "actors": actors,
        "strength": strength,
    }


def technique_inventory() -> list[str]:
    out: list[str] = []
    for f in sorted((REPO / "techniques").glob("T*.md")):
        m = re.match(r"^(T\d+(?:\.\d+){1,2})-", f.name)
        if m:
            out.append(f"OAK-{m.group(1)}")
    return out


def render_table(headers: list[str], rows: list[list[str]]) -> str:
    out = ["| " + " | ".join(headers) + " |"]
    out.append("| " + " | ".join("---:" if i > 0 else "---" for i in range(len(headers))) + " |")
    for r in rows:
        out.append("| " + " | ".join(r) + " |")
    return "\n".join(out)


def main() -> int:
    args = sys.argv[1:]
    top_actors = 10
    show_monthly = "--monthly" in args
    show_per_technique = "--per-technique" in args
    for i, a in enumerate(args):
        if a == "--top-actors" and i + 1 < len(args):
            top_actors = int(args[i + 1])

    examples = []
    for p in sorted((REPO / "examples").glob("*.md")):
        if p.name.lower() == "readme.md":
            continue
        examples.append(parse_example(p))

    actor_names = actor_name_index()

    years = sorted({e["year"] for e in examples if e["year"] is not None})
    tactic_codes = sorted(TACTIC_NAMES)

    # Table 1: Year x Tactic incident counts (an example contributes to each Tactic
    # whose Technique it references; double counting across Tactics is intentional —
    # this is a coverage map, not a unique-incident count).
    yt: dict[tuple[int, int], int] = Counter()
    year_totals: Counter[int] = Counter()
    tactic_totals: Counter[int] = Counter()
    for e in examples:
        if e["year"] is None:
            continue
        unique = e["tactics"] or {0}
        for t in e["tactics"]:
            yt[(e["year"], t)] += 1
            tactic_totals[t] += 1
        year_totals[e["year"]] += 1

    print("# OAK Coverage Matrix — auto-generated\n")
    print(f"_Generated by `tools/build_coverage_matrix.py` over {len(examples)} worked examples._\n")
    print("> Cells in the Year x Tactic matrix count the number of examples that map to each Tactic via Technique references; an example mapped to multiple Tactics is counted in each cell.\n")

    print("## Year x Tactic\n")
    headers = ["Year"] + [f"T{t}" for t in tactic_codes] + ["**Total**"]
    rows = []
    for y in years:
        row = [str(y)]
        for t in tactic_codes:
            v = yt.get((y, t), 0)
            row.append(str(v) if v else "·")
        row.append(f"**{year_totals[y]}**")
        rows.append(row)
    total_row = ["**Total**"] + [str(tactic_totals.get(t, 0)) for t in tactic_codes] + [f"**{sum(year_totals.values())}**"]
    rows.append(total_row)
    print(render_table(headers, rows))
    print()

    print("## Tactic legend\n")
    for t in tactic_codes:
        print(f"- T{t} — {TACTIC_NAMES[t]}")
    print()

    # Table 2: Year x Attribution-strength
    ya: dict[tuple[int, str], int] = Counter()
    for e in examples:
        if e["year"] is None:
            continue
        ya[(e["year"], e["strength"])] += 1
    print("## Year x Attribution-strength\n")
    headers = ["Year"] + ATTR_ORDER + ["Total"]
    rows = []
    for y in years:
        row = [str(y)]
        total = 0
        for s in ATTR_ORDER:
            v = ya.get((y, s), 0)
            row.append(str(v) if v else "·")
            total += v
        row.append(f"**{total}**")
        rows.append(row)
    totals = [sum(ya.get((y, s), 0) for y in years) for s in ATTR_ORDER]
    rows.append(["**Total**"] + [f"**{v}**" for v in totals] + [f"**{sum(totals)}**"])
    print(render_table(headers, rows))
    print()

    # Table 3: Top actors x Year
    actor_year: dict[tuple[str, int], int] = Counter()
    actor_totals: Counter[str] = Counter()
    for e in examples:
        if e["year"] is None:
            continue
        for a in e["actors"]:
            actor_year[(a, e["year"])] += 1
            actor_totals[a] += 1
    top = [a for a, _ in actor_totals.most_common(top_actors)]
    if top:
        print(f"## Top {len(top)} actors x Year\n")
        headers = ["Actor"] + [str(y) for y in years] + ["Total"]
        rows = []
        for a in top:
            label = f"{a} ({actor_names.get(a, '?')})"
            row = [label]
            for y in years:
                v = actor_year.get((a, y), 0)
                row.append(str(v) if v else "·")
            row.append(f"**{actor_totals[a]}**")
            rows.append(row)
        print(render_table(headers, rows))
        print()

    # Per-Technique density (optional)
    if show_per_technique:
        all_techs = technique_inventory()
        tech_count: Counter[str] = Counter()
        for e in examples:
            for t in e["techniques"]:
                tech_count[t] += 1
        print("## Per-Technique density\n")
        print("| Technique | Examples |")
        print("| --- | ---: |")
        for tid in all_techs:
            n = tech_count.get(tid, 0)
            mark = " ← zero" if n == 0 else ""
            print(f"| {tid} | {n}{mark} |")
        # Surface technique IDs cited but not in inventory (TAXONOMY-GAPS candidates)
        cited_only = sorted(
            tid for tid, n in tech_count.items()
            if tid not in all_techs and n > 0
        )
        if cited_only:
            print()
            print("_Cited in examples but not yet a Technique file (TAXONOMY-GAPS candidates):_")
            for tid in cited_only:
                print(f"- {tid}: {tech_count[tid]}")
        print()

    # Year-Month density (optional)
    if show_monthly:
        ym_count: Counter[str] = Counter()
        for e in examples:
            if e["year_month"]:
                ym_count[e["year_month"]] += 1
        if ym_count:
            print("## Year-Month density (recent 24-month window)\n")
            recent = sorted(ym_count)[-24:]
            print("| Year-Month | Examples |")
            print("| --- | ---: |")
            for ym in recent:
                print(f"| {ym} | {ym_count[ym]} |")
            print()

    # Coverage gaps: tactics with zero incidents
    empty_tactics = [t for t in tactic_codes if tactic_totals.get(t, 0) == 0]
    if empty_tactics:
        print("## Tactics with zero worked examples\n")
        for t in empty_tactics:
            print(f"- **T{t} — {TACTIC_NAMES[t]}** — no incidents in examples/. Either no public anchor case exists at v0.x or the cohort has been mis-mapped to an adjacent Tactic.")
        print()

    # Year-tactic cells with zero — surface as gaps for years where corpus exists
    print("## Year x Tactic — zero-incident cells\n")
    print(f"_Years with at least 3 incidents are reported; years below that threshold are excluded as too thin to read._\n")
    rows = []
    for y in years:
        if year_totals[y] < 3:
            continue
        empty = [f"T{t}" for t in tactic_codes if yt.get((y, t), 0) == 0]
        if empty:
            rows.append([str(y), str(year_totals[y]), ", ".join(empty)])
    if rows:
        headers = ["Year", "Total examples", "Tactics with zero coverage"]
        print(render_table(headers, rows))
    else:
        print("_(no qualifying year)_\n")
    print()

    print(f"\n_Total: {len(examples)} examples · {len(years)} years · {len(actor_totals)} attributed-actor slots_")
    return 0


if __name__ == "__main__":
    sys.exit(main())
