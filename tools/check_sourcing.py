#!/usr/bin/env python3
"""
check_sourcing.py — report worked examples whose claims rest on nothing citable.

check_citations.py answers "does every cited key resolve?" — which passes when a
file cites nothing at all. This answers the complementary question: "does this
file cite anything?"

The distinction is not academic. The KelpDAO / LayerZero entry (2026-04-18,
~$292M) carried a wrong Technique and a wrong attribution for five months
behind a Public references section that listed only descriptions of documents
that would presumably exist — "Kelp DAO official incident announcement and
post-mortem", "On-chain forensic analysis of the forged bridge message" — with
no URL and no bib key. Every existing validator passed it. The tell is not a
bad citation; it is the absence of one.

Severity tiers:
  unsourced     — no URL and no resolvable bib key ANYWHERE in the file.
  refs-hollow   — the body cites something, but the Public references section
                  itself resolves to nothing.

Report-only by default, and deliberately NOT wired into `npm run check`: the
corpus currently carries a large unsourced backlog, and a check that fails from
day one gets disabled rather than fixed. Use --ci --max <n> to ratchet a budget
downward once the sweep is under way.

Usage:
    python3 tools/check_sourcing.py                  # summary + counts by year
    python3 tools/check_sourcing.py --list           # every flagged file
    python3 tools/check_sourcing.py --tier unsourced # one tier only
    python3 tools/check_sourcing.py --since 2024     # recent entries first
    python3 tools/check_sourcing.py --json
    python3 tools/check_sourcing.py --ci --max 253   # fail if it gets worse
"""

import os
import re
import sys
import json
import argparse
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXAMPLES = os.path.join(ROOT, "examples")
BIB = os.path.join(ROOT, "citations.bib")

KEY_RE = re.compile(r"`\[([^\]]+)\]`")
REFS_RE = re.compile(r"^## Public references\s*$(.*?)(^## |\Z)", re.S | re.M)


def bib_keys():
    with open(BIB, encoding="utf-8") as fh:
        return set(re.findall(r"@\w+\{([^,]+),", fh.read()))


def resolves(text, keys):
    """Does this chunk point at anything a reader could actually go and read?"""
    if "http" in text:
        return True
    return any(k in keys for k in KEY_RE.findall(text))


def scan():
    keys = bib_keys()
    out = []
    for fn in sorted(os.listdir(EXAMPLES)):
        if not fn.endswith(".md"):
            continue
        with open(os.path.join(EXAMPLES, fn), encoding="utf-8") as fh:
            text = fh.read()
        m = REFS_RE.search(text)
        section = m.group(1) if m else ""
        if not resolves(text, keys):
            out.append({"file": fn, "tier": "unsourced",
                        "has_refs_section": bool(m)})
        elif m and not resolves(section, keys):
            out.append({"file": fn, "tier": "refs-hollow",
                        "has_refs_section": True})
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--list", action="store_true")
    ap.add_argument("--tier", choices=["unsourced", "refs-hollow"])
    ap.add_argument("--since", metavar="YEAR")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--ci", action="store_true")
    ap.add_argument("--max", type=int, default=0)
    args = ap.parse_args()

    findings = scan()
    if args.tier:
        findings = [f for f in findings if f["tier"] == args.tier]
    if args.since:
        findings = [f for f in findings if f["file"][:4] >= args.since]

    total = len([f for f in os.listdir(EXAMPLES) if f.endswith(".md")])
    unsourced = [f for f in findings if f["tier"] == "unsourced"]
    hollow = [f for f in findings if f["tier"] == "refs-hollow"]

    if args.json:
        print(json.dumps({"examples": total, "unsourced": len(unsourced),
                          "refs_hollow": len(hollow), "findings": findings},
                         indent=2))
    else:
        print(f"OAK sourcing check — {total} examples")
        print(f"  unsourced    : {len(unsourced)}"
              f" ({100*len(unsourced)//max(total,1)}%) — nothing citable anywhere in the file")
        print(f"  refs-hollow  : {len(hollow)}"
              f" — body cites something, Public references section does not")
        if unsourced:
            by_year = Counter(f["file"][:4] for f in unsourced)
            print("\n  unsourced by year:")
            for year, n in sorted(by_year.items()):
                print(f"    {year}  {n:>3}")
        if args.list:
            print()
            for f in findings:
                print(f"  [{f['tier']:<12}] {f['file']}")
        else:
            print("\n  (--list for the file names, --since 2024 for recent entries)")

    if args.ci and len(findings) > args.max:
        print(f"\nFAIL: {len(findings)} flagged, budget is {args.max}.",
              file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
