#!/usr/bin/env python3
"""
check_known.py — fast "is this incident already in OAK?" lookup.

As the corpus grows, agents and contributors keep re-discovering incidents
that are already documented. This script takes a free-text query (incident
description, victim name, year, actor) and returns the top-N candidates
already in `examples/` ranked by relevance, plus a verdict on whether the
query is likely already covered or worth adding.

Usage:
    python3 tools/check_known.py "Bybit February 2025 Lazarus"
    python3 tools/check_known.py "Lido stETH depeg 2022"
    python3 tools/check_known.py --threshold 4 "Renzo ezETH depeg"
    python3 tools/check_known.py --json "Mango Markets Eisenberg"

Exit codes:
    0 — no strong match found (likely safe to add).
    1 — strong match found; investigate before adding to avoid duplicate.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
H1_RE = re.compile(r"^#\s+(.+?)$", re.MULTILINE)
LOSS_RE = re.compile(r"^\*\*Loss[^:]*:\*\*\s*(.+?)$", re.MULTILINE)
ACTOR_RE = re.compile(r"\bOAK-G\d{2}\b")
TECH_RE = re.compile(r"\bOAK-T\d+(?:\.\d+){0,2}\b")
YEAR_RE = re.compile(r"\b(?:19|20)\d{2}\b")
TOKEN_RE = re.compile(r"[A-Za-z][A-Za-z0-9]{2,}")
STOPWORDS = {
    "the", "and", "for", "from", "with", "this", "that", "are", "was", "were",
    "has", "had", "have", "been", "via", "into", "onto", "out", "off", "exchange",
    "incident", "case", "attack", "compromise", "operator", "user", "users",
}


def tokens(text: str) -> set[str]:
    return {t.lower() for t in TOKEN_RE.findall(text) if t.lower() not in STOPWORDS and len(t) > 2}


def index_examples() -> list[dict]:
    items: list[dict] = []
    for path in sorted((REPO / "examples").glob("*.md")):
        if path.name.lower() == "readme.md":
            continue
        text = path.read_text(encoding="utf-8")
        title_m = H1_RE.search(text)
        title = title_m.group(1).strip() if title_m else path.stem
        loss_m = LOSS_RE.search(text)
        loss_snippet = loss_m.group(1)[:120] if loss_m else ""
        years = sorted(set(YEAR_RE.findall(text)[:5]))
        actors = sorted(set(ACTOR_RE.findall(text)))
        techniques = sorted(set(TECH_RE.findall(text)))
        first_ym_m = re.match(r"^(\d{4})(?:-(\d{2}))?", path.name)
        ym = ""
        if first_ym_m:
            ym = first_ym_m.group(1) + (f"-{first_ym_m.group(2)}" if first_ym_m.group(2) else "")
        items.append({
            "file": path.name,
            "rel": f"examples/{path.name}",
            "title": title,
            "year_month": ym,
            "actors": actors,
            "techniques": techniques,
            "loss": loss_snippet,
            "haystack_tokens": tokens(title + " " + path.stem + " " + loss_snippet),
        })
    return items


def score(query_tokens: set[str], query_str: str, item: dict) -> int:
    haystack_text = (item["title"] + " " + item["file"] + " " + item["loss"]).lower()
    overlap = len(query_tokens & item["haystack_tokens"])
    bonus = 0
    if query_str.lower() in haystack_text:
        bonus += 5
    # Year alignment: any year in the query that matches the example's year-month
    q_years = set(YEAR_RE.findall(query_str))
    if q_years and item["year_month"][:4] in q_years:
        bonus += 2
    # OAK ID exact match
    for ref in ACTOR_RE.findall(query_str) + TECH_RE.findall(query_str):
        if ref in item["actors"] or ref in item["techniques"]:
            bonus += 3
    return overlap + bonus


def main() -> int:
    args = sys.argv[1:]
    if not args:
        print("usage: check_known.py [--threshold N] [--top N] [--json] <query>", file=sys.stderr)
        return 2

    threshold = 3
    top_n = 5
    output_json = False
    query_parts: list[str] = []
    i = 0
    while i < len(args):
        a = args[i]
        if a == "--threshold" and i + 1 < len(args):
            threshold = int(args[i + 1])
            i += 2
        elif a == "--top" and i + 1 < len(args):
            top_n = int(args[i + 1])
            i += 2
        elif a == "--json":
            output_json = True
            i += 1
        else:
            query_parts.append(a)
            i += 1
    query = " ".join(query_parts).strip()
    if not query:
        print("ERROR: empty query", file=sys.stderr)
        return 2

    q_tokens = tokens(query)
    items = index_examples()
    scored = []
    for item in items:
        s = score(q_tokens, query, item)
        if s > 0:
            scored.append((s, item))
    scored.sort(key=lambda p: (-p[0], p[1]["file"]))
    top = scored[:top_n]

    best = top[0][0] if top else 0
    verdict = "STRONG_MATCH" if best >= threshold else ("WEAK_MATCH" if best > 0 else "NO_MATCH")

    if output_json:
        print(json.dumps({
            "query": query,
            "verdict": verdict,
            "best_score": best,
            "threshold": threshold,
            "candidates": [
                {"score": s, "rel": it["rel"], "title": it["title"], "year_month": it["year_month"], "actors": it["actors"]}
                for s, it in top
            ],
        }, indent=2))
    else:
        print(f"Query: {query}")
        print(f"Verdict: {verdict} (best score {best}, threshold {threshold})")
        if not top:
            print("\nNo lexical overlap with any existing example. Proceed with research.")
        else:
            print(f"\nTop {len(top)} candidates:")
            for s, it in top:
                actors_str = ", ".join(it["actors"]) if it["actors"] else "—"
                print(f"  [{s:>3}]  {it['rel']}")
                print(f"         {it['title']}")
                print(f"         year={it['year_month']}  actors={actors_str}")
        if verdict == "STRONG_MATCH":
            print("\n→ This incident is likely already documented. Inspect the top candidate before adding a duplicate.")
        elif verdict == "WEAK_MATCH":
            print("\n→ Partial overlap. Likely a related but distinct case — proceed but cross-reference the existing entry.")
        else:
            print("\n→ Looks new. Safe to research and add.")

    return 1 if verdict == "STRONG_MATCH" else 0


if __name__ == "__main__":
    sys.exit(main())
