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
  refs-unpinned — the file cites something, but nothing it cites is a specific
                  page: every URL (inline, or behind a citations.bib key) is a
                  site's home page, a placeholder, or missing. A reader cannot
                  open the source of any claim. Block-explorer links do not
                  count as a source for the narrative.

Report-only by default. `npm run check` runs it as `--ci --max 0` over the first
two tiers: the unsourced backlog was cleared in 2026-10, so any such finding
fails the check. `refs-unpinned` is a third tier added 2026-11-27 after
QUALITY-REVIEW.md found 401 bib keys pointing at home pages. It is gated by date:
an example dated UNPINNED_CUTOFF or later fails the check; older ones are
reported (`--tier refs-unpinned --list`) and are the backlog to work down.

`--bib` lists the citations.bib entries themselves that are unpinned.

Usage:
    python3 tools/check_sourcing.py                  # summary + counts by year
    python3 tools/check_sourcing.py --list           # every flagged file
    python3 tools/check_sourcing.py --tier unsourced # one tier only
    python3 tools/check_sourcing.py --since 2024     # recent entries first
    python3 tools/check_sourcing.py --json
    python3 tools/check_sourcing.py --ci --max 253   # fail if it gets worse
    python3 tools/check_sourcing.py --bib            # unpinned citations.bib entries
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
ANYKEY_RE = re.compile(r"\[@?([A-Za-z][A-Za-z0-9_:-]{3,})\]")
URL_RE = re.compile(r"https?://[^\s<>)\]`\"']+")
ENTRY_RE = re.compile(r"@\w+\{([^,\s]+),(.*?)\n\}", re.S)
EXPLORER_RE = re.compile(
    r"scan\.|explorer|mempool\.space|blockscout|solscan|tronscan|nearblocks|xrpscan|hypurrscan|intel\.arkm\.com|platform\.arkhamintelligence|debank"
)
PLACEHOLDER_RE = re.compile(r"example\.(invalid|com|org)|localhost|oak-pending")
PROFILE_HOSTS = {"x.com", "twitter.com", "medium.com", "t.me", "github.com", "youtube.com",
                 "linkedin.com", "facebook.com", "reddit.com", "warpcast.com"}
# Examples dated on or after this month fail the check when unpinned.
UNPINNED_CUTOFF = "2026-09"


def pinned(url):
    """Is this URL a specific page (not a home page, a placeholder or an explorer)?"""
    m = re.match(r"https?://([^/?#]+)([^?#]*)(\?[^#]*)?", url.rstrip(".,;:"))
    if not m:
        return False
    host, path, query = m.group(1).lower(), m.group(2), m.group(3) or ""
    if PLACEHOLDER_RE.search(host + path) or EXPLORER_RE.search(host):
        return False
    if host in ("doi.org", "arxiv.org") or host.endswith(".doi.org"):
        return len(path) > 1
    # A language or section stub (/en, /blog, /news/) is still not a page about anything.
    segs = [x for x in path.split("/") if x]
    if not segs and len(query) < 4:
        return False
    # A profile or account page (x.com/zachxbt, medium.com/compound-finance) is not a post.
    if len(segs) == 1 and re.sub(r"^(www|mobile)\.", "", host) in PROFILE_HOSTS:
        return False
    if len(segs) == 1 and not query and re.fullmatch(r"[a-z]{2}(-[a-z]{2})?|blog|news|research|press|security|insights|reports?|resources|index\.html?", segs[0], re.I):
        return False
    return True


def bib_entries():
    """key -> (url or None, has DOI/eprint)."""
    out = {}
    with open(BIB, encoding="utf-8") as fh:
        for m in ENTRY_RE.finditer(fh.read()):
            body = m.group(2)
            u = re.search(r"\burl\s*=\s*\{([^}]+)\}", body)
            ident = re.search(r"\b(doi|eprint|isbn)\s*=\s*\{([^}]+)\}", body)
            out[m.group(1)] = (u.group(1).strip() if u else None, bool(ident))
    return out


def key_pinned(entry):
    url, ident = entry
    return ident or bool(url and pinned(url))
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
    entries = bib_entries()
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
        else:
            cited = {k for k in ANYKEY_RE.findall(text) if k in entries}
            if not any(pinned(u) for u in URL_RE.findall(text)) and \
               not any(key_pinned(entries[k]) for k in cited):
                out.append({"file": fn, "tier": "refs-unpinned",
                            "has_refs_section": bool(m),
                            "gated": fn[:7] >= UNPINNED_CUTOFF and fn[4] == "-" and fn[5:7].isdigit(),
                            "keys": sorted(cited)})
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--list", action="store_true")
    ap.add_argument("--tier", choices=["unsourced", "refs-hollow", "refs-unpinned"])
    ap.add_argument("--bib", action="store_true", help="list unpinned citations.bib entries")
    ap.add_argument("--since", metavar="YEAR")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--ci", action="store_true")
    ap.add_argument("--max", type=int, default=0)
    args = ap.parse_args()

    if args.bib:
        entries = bib_entries()
        bad = {k: e[0] for k, e in entries.items() if not key_pinned(e)}
        if args.json:
            print(json.dumps({"entries": len(entries), "unpinned": bad}, indent=2))
        else:
            print(f"citations.bib — {len(entries)} entries, {len(bad)} unpinned "
                  f"(home page, placeholder or no URL)")
            for k, u in sorted(bad.items()):
                print(f"  {k:<40} {u or '(no url)'}")
        return 0

    findings = scan()
    if args.tier:
        findings = [f for f in findings if f["tier"] == args.tier]
    if args.since:
        findings = [f for f in findings if f["file"][:4] >= args.since]

    total = len([f for f in os.listdir(EXAMPLES) if f.endswith(".md")])
    unsourced = [f for f in findings if f["tier"] == "unsourced"]
    hollow = [f for f in findings if f["tier"] == "refs-hollow"]
    unpinned = [f for f in findings if f["tier"] == "refs-unpinned"]
    gated = [f for f in unpinned if f.get("gated")]

    if args.json:
        print(json.dumps({"examples": total, "unsourced": len(unsourced),
                          "refs_hollow": len(hollow), "refs_unpinned": len(unpinned),
                          "refs_unpinned_gated": len(gated), "findings": findings},
                         indent=2))
    else:
        print(f"OAK sourcing check — {total} examples")
        print(f"  unsourced    : {len(unsourced)}"
              f" ({100*len(unsourced)//max(total,1)}%) — nothing citable anywhere in the file")
        print(f"  refs-hollow  : {len(hollow)}"
              f" — body cites something, Public references section does not")
        print(f"  refs-unpinned: {len(unpinned)}"
              f" — every source is a home page, a placeholder or URL-less"
              f" ({len(gated)} dated {UNPINNED_CUTOFF}+, which fail the check)")
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

    failing = unsourced + hollow + gated
    if args.ci and len(failing) > args.max:
        print(f"\nFAIL: {len(failing)} flagged, budget is {args.max}.",
              file=sys.stderr)
        for f in failing:
            print(f"  [{f['tier']}] {f['file']}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
