#!/usr/bin/env python3
"""
build_stats.py — generate a single-page stats snapshot of the OAK corpus
from filesystem state. Use as a quick "what's in the framework right now"
report and as raw input for the static site.

Output modes:
    --markdown   (default) — STATS.md-formatted markdown to stdout
    --json                 — machine-readable JSON to stdout
    --terse                — three-line summary (counts only)

Usage:
    python3 tools/build_stats.py > STATS.md
    python3 tools/build_stats.py --json > public/stats.json
    python3 tools/build_stats.py --terse

Exit code is always 0; this is a reporting tool.
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
YEAR_MONTH_RE = re.compile(r"^(\d{4}-(?:0[1-9]|1[0-2]))")
TECH_RE = re.compile(r"\bOAK-T(\d+)(?:\.\d+){1,2}\b")
ACTOR_RE = re.compile(r"\bOAK-G\d{2}\b")
PLACEHOLDER_RE = re.compile(r"\bOAK-(?:G|T|M|S)nn\b")
ATTR_RE = re.compile(
    r"\*\*(confirmed|inferred-strong|inferred-weak|pseudonymous|unattributed)\b"
)


TACTIC_NAMES = {
    1: "Token Genesis",
    2: "Liquidity Establishment",
    3: "Holder Capture",
    4: "Access Acquisition",
    5: "Value Extraction",
    6: "Defense Evasion",
    7: "Laundering",
    8: "Operator Continuity / Attribution Signals",
    9: "Smart-Contract Exploit",
    10: "Bridge / Cross-Chain",
    11: "Custody / Signing",
    12: "NFT-Specific",
    13: "Account Abstraction",
    14: "Validator / Staking",
}


def count_files(directory: str, pattern: str) -> int:
    return len(list((REPO / directory).glob(pattern)))


def parse_examples() -> list[dict[str, object]]:
    out: list[dict[str, object]] = []
    for p in sorted((REPO / "examples").glob("*.md")):
        if p.name.lower() == "readme.md":
            continue
        text = p.read_text(encoding="utf-8")
        m = YEAR_RE.match(p.name)
        year = int(m.group(1)) if m else None
        cleaned = PLACEHOLDER_RE.sub("", text)
        tactics = {int(t) for t in TECH_RE.findall(cleaned)}
        actors = set(ACTOR_RE.findall(cleaned))
        sm = ATTR_RE.search(text)
        strength = sm.group(1) if sm else "(missing)"
        out.append(
            {"name": p.name, "year": year, "tactics": tactics, "actors": actors, "strength": strength}
        )
    return out


def actor_titles() -> dict[str, str]:
    out: dict[str, str] = {}
    for f in (REPO / "actors").glob("OAK-G*.md"):
        m = re.match(r"^(OAK-G\d{2})-(.+?)\.md$", f.name)
        if m:
            out[m.group(1)] = m.group(2)
    return out


def count_bib_entries() -> int:
    bib = (REPO / "citations.bib").read_text(encoding="utf-8")
    return sum(1 for ln in bib.splitlines() if ln.lstrip().startswith("@"))


def collect_taxonomy_gap_proposals() -> list[str]:
    path = REPO / "TAXONOMY-GAPS.md"
    if not path.exists():
        return []
    text = path.read_text(encoding="utf-8")
    seen = []
    for m in re.finditer(r"\bT(\d+)\.(\d+)(?:\.(\d+))?\b", text):
        if m.group(3):
            seen.append(f"T{m.group(1)}.{m.group(2)}.{m.group(3)}")
        else:
            seen.append(f"T{m.group(1)}.{m.group(2)}")
    seen = sorted(set(seen))
    return seen


def empty_anchor_counts() -> dict[str, int]:
    """Approximate counts: actor and technique anchor sections that look empty."""
    actors_empty = 0
    for f in (REPO / "actors").glob("OAK-G*.md"):
        text = f.read_text(encoding="utf-8")
        m = re.search(r"^## Observed Examples\s*$(.*?)(?=^## |\Z)", text, re.MULTILINE | re.DOTALL)
        body = (m.group(1) if m else "").strip()
        if not body or "examples/" not in body:
            actors_empty += 1
    tech_empty = 0
    for f in (REPO / "techniques").glob("T*.md"):
        text = f.read_text(encoding="utf-8")
        m = re.search(r"^## Real-world examples\s*$(.*?)(?=^## |\Z)", text, re.MULTILINE | re.DOTALL)
        body = (m.group(1) if m else "").strip()
        if not body or "examples/" not in body:
            tech_empty += 1
    return {"actors_no_anchor": actors_empty, "techniques_no_anchor": tech_empty}


def gather_stats() -> dict[str, object]:
    examples = parse_examples()
    actor_idx = actor_titles()

    by_tactic: Counter[int] = Counter()
    by_year: Counter[int] = Counter()
    by_year_month: dict[str, int] = Counter()
    by_attribution: Counter[str] = Counter()
    by_actor: Counter[str] = Counter()

    for e in examples:
        for t in e["tactics"]:
            by_tactic[t] += 1
        if e["year"]:
            by_year[e["year"]] += 1
            ym_match = YEAR_MONTH_RE.match(e["name"])
            if ym_match:
                by_year_month[ym_match.group(1)] += 1
        by_attribution[e["strength"]] += 1
        for a in e["actors"]:
            by_actor[a] += 1

    counts = {
        "tactics": count_files("tactics", "T*.md"),
        "techniques": count_files("techniques", "T*.md"),
        "actors": count_files("actors", "OAK-G*.md"),
        "mitigations": count_files("mitigations", "OAK-M*.md"),
        "software": count_files("software", "OAK-S*.md"),
        "data_sources": count_files("data-sources", "OAK-DS-*.md"),
        "examples": len(examples),
        "bib_entries": count_bib_entries(),
    }

    empty_tactics = [t for t in TACTIC_NAMES if t not in by_tactic]
    inactive_actors = sorted(set(actor_idx) - set(by_actor))

    return {
        "generated_at": dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
        "counts": counts,
        "examples_by_tactic": {f"T{t}": by_tactic[t] for t in sorted(by_tactic)},
        "examples_by_year": dict(sorted(by_year.items())),
        "examples_by_year_month": dict(sorted(by_year_month.items())),
        "attribution_distribution": dict(by_attribution.most_common()),
        "examples_by_actor": dict(by_actor.most_common()),
        "actor_titles": actor_idx,
        "inactive_actors": inactive_actors,
        "empty_tactics": [f"T{t}" for t in empty_tactics],
        "anchor_debt": empty_anchor_counts(),
        "taxonomy_gap_proposals": collect_taxonomy_gap_proposals(),
    }


def render_markdown(stats: dict[str, object]) -> str:
    c = stats["counts"]
    lines: list[str] = []
    lines.append("# OAK — Stats Snapshot")
    lines.append("")
    lines.append(f"_Auto-generated by `tools/build_stats.py` at {stats['generated_at']}._")
    lines.append("")
    lines.append("## Catalogue")
    lines.append("")
    lines.append(
        f"- **{c['tactics']}** Tactics · **{c['techniques']}** Techniques · "
        f"**{c['actors']}** Threat Actors · **{c['mitigations']}** Mitigations · "
        f"**{c['software']}** Software · **{c['data_sources']}** Data Sources"
    )
    lines.append(f"- **{c['examples']}** Worked Examples · **{c['bib_entries']}** bibtex entries")
    lines.append("")

    lines.append("## Examples by Tactic")
    lines.append("")
    lines.append("| Tactic | Count |")
    lines.append("| --- | ---: |")
    by_tactic = stats["examples_by_tactic"]
    for t in sorted(TACTIC_NAMES):
        key = f"T{t}"
        n = by_tactic.get(key, 0)
        flag = " ← zero" if n == 0 else ""
        lines.append(f"| {key} ({TACTIC_NAMES[t]}) | {n}{flag} |")
    lines.append("")

    lines.append("## Examples by Year")
    lines.append("")
    lines.append("| Year | Count |")
    lines.append("| --- | ---: |")
    for year, n in stats["examples_by_year"].items():
        lines.append(f"| {year} | {n} |")
    lines.append("")

    if stats["examples_by_year_month"]:
        lines.append("## Examples by Year-Month (recent dense window)")
        lines.append("")
        recent = list(stats["examples_by_year_month"].items())
        recent = recent[-24:] if len(recent) > 24 else recent
        lines.append("| Year-Month | Count |")
        lines.append("| --- | ---: |")
        for ym, n in recent:
            lines.append(f"| {ym} | {n} |")
        lines.append("")

    lines.append("## Attribution-strength Distribution")
    lines.append("")
    lines.append("| Strength | Count |")
    lines.append("| --- | ---: |")
    total = sum(stats["attribution_distribution"].values()) or 1
    for s, n in stats["attribution_distribution"].items():
        pct = round(100 * n / total, 1)
        lines.append(f"| {s} | {n} ({pct}%) |")
    lines.append("")

    lines.append("## Threat Actors")
    lines.append("")
    by_actor = stats["examples_by_actor"]
    titles = stats["actor_titles"]
    lines.append(
        f"- {len(by_actor)} of {c['actors']} actors have at least one attributed example"
    )
    lines.append("")
    lines.append("| Actor | Examples |")
    lines.append("| --- | ---: |")
    for actor_id, n in by_actor.items():
        title = titles.get(actor_id, "?")
        lines.append(f"| {actor_id} ({title}) | {n} |")
    if stats["inactive_actors"]:
        lines.append("")
        lines.append(
            f"Actors with zero attributed examples ({len(stats['inactive_actors'])}): "
            + ", ".join(stats["inactive_actors"]) + "."
        )
    lines.append("")

    lines.append("## Coverage Gaps")
    lines.append("")
    if stats["empty_tactics"]:
        lines.append(
            f"- Tactics with zero worked examples: **{', '.join(stats['empty_tactics'])}**"
        )
    debt = stats["anchor_debt"]
    lines.append(
        f"- Actors with empty `## Observed Examples` anchor: **{debt['actors_no_anchor']}** of {c['actors']}"
    )
    lines.append(
        f"- Techniques with empty `## Real-world examples` anchor: "
        f"**{debt['techniques_no_anchor']}** of {c['techniques']}"
    )
    missing_attr = stats["attribution_distribution"].get("(missing)", 0)
    if missing_attr:
        lines.append(f"- Worked examples missing attribution-strength label: **{missing_attr}**")
    lines.append("")

    lines.append("## Open TAXONOMY-GAPS Proposals")
    lines.append("")
    proposals = stats["taxonomy_gap_proposals"]
    if proposals:
        lines.append(f"_{len(proposals)} candidate sub-Technique IDs referenced in TAXONOMY-GAPS.md._")
        lines.append("")
        lines.append("```text")
        lines.append(" ".join(proposals))
        lines.append("```")
    else:
        lines.append("_No proposals tracked._")

    body = "\n".join(lines)
    body = re.sub(r"\n{3,}", "\n\n", body).rstrip() + "\n"
    return body


def render_terse(stats: dict[str, object]) -> str:
    c = stats["counts"]
    lines = [
        f"OAK corpus: {c['examples']} examples, {c['techniques']} techniques, "
        f"{c['actors']} actors, {c['bib_entries']} bib entries",
        f"Coverage gaps: {len(stats['empty_tactics'])} empty Tactics; "
        f"{stats['anchor_debt']['actors_no_anchor']} actors and "
        f"{stats['anchor_debt']['techniques_no_anchor']} techniques without backlinks",
        f"Attribution: {stats['attribution_distribution'].get('confirmed', 0)} confirmed, "
        f"{stats['attribution_distribution'].get('inferred-strong', 0)} inferred-strong, "
        f"{stats['attribution_distribution'].get('(missing)', 0)} missing label",
    ]
    return "\n".join(lines)


def main() -> int:
    args = sys.argv[1:]
    stats = gather_stats()

    if "--json" in args:
        print(json.dumps(stats, indent=2, default=list))
    elif "--terse" in args:
        print(render_terse(stats))
    else:
        sys.stdout.write(render_markdown(stats))
    return 0


if __name__ == "__main__":
    sys.exit(main())
