#!/usr/bin/env python3
"""
source_diversity.py — citation-publisher distribution report.

OAK is heavy on a small number of forensic providers (Chainalysis,
SlowMist, ZachXBT, Halborn). The risk is over-reliance: if one provider
shifts narrative, our corpus drifts. This script counts citations per
publisher and surfaces over-concentration plus under-used adjacent
providers (Beosin, Cyvers, Match Systems, Quantstamp, OpenZeppelin
Defender, GoPlus, etc.) that have substantial public reporting OAK
under-cites.

Usage:
    python3 tools/source_diversity.py
    python3 tools/source_diversity.py --json

Exit code is always 0; this is a reporting tool.
"""

from __future__ import annotations

import json
import re
import sys
from collections import Counter
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent

# Common publisher-prefix tokens used in the OAK cite-key convention
# (lowercased, no spaces). New providers that appear sub-threshold are
# surfaced as candidates to use more.
KNOWN_PROVIDERS = {
    "chainalysis": "Chainalysis",
    "slowmist": "SlowMist",
    "halborn": "Halborn",
    "peckshield": "PeckShield",
    "trmlabs": "TRM Labs",
    "trm": "TRM Labs",
    "elliptic": "Elliptic",
    "openzeppelin": "OpenZeppelin",
    "trailofbits": "Trail of Bits",
    "tob": "Trail of Bits",
    "blocksec": "BlockSec",
    "quillaudits": "QuillAudits",
    "certora": "Certora",
    "certik": "CertiK",
    "beosin": "Beosin",
    "cyvers": "Cyvers",
    "matchsystems": "Match Systems",
    "consensus": "ConsenSys",
    "consensys": "ConsenSys",
    "consensysdiligence": "ConsenSys Diligence",
    "fbi": "FBI",
    "doj": "U.S. DOJ",
    "treasury": "U.S. Treasury / OFAC",
    "ofac": "U.S. Treasury / OFAC",
    "sec": "U.S. SEC",
    "cftc": "U.S. CFTC",
    "cisa": "CISA",
    "nca": "U.K. NCA",
    "europol": "Europol",
    "trmexit": "TRM Labs",
    "zachxbt": "ZachXBT",
    "lookonchain": "Lookonchain",
    "scamsniffer": "ScamSniffer",
    "bubblemaps": "Bubblemaps",
    "spotonchain": "SpotOnChain",
    "arkham": "Arkham",
    "whalealert": "Whale Alert",
    "mandiant": "Mandiant",
    "recordedfuture": "Recorded Future",
    "kaspersky": "Kaspersky",
    "groupib": "Group-IB",
    "checkpoint": "Check Point",
    "sentinelone": "SentinelOne",
    "bitdefender": "Bitdefender",
    "proofpoint": "Proofpoint",
    "stepsecurity": "StepSecurity",
    "safedep": "SafeDep",
    "goplus": "GoPlus",
    "rugcheck": "rugcheck.solana",
    "tokensniffer": "TokenSniffer",
    "metasleuth": "MetaSleuth",
    "panews": "PANews",
    "panewslab": "PANews Lab",
    "theblock": "The Block",
    "coindesk": "CoinDesk",
    "decrypt": "Decrypt",
    "cointelegraph": "Cointelegraph",
    "blockworks": "Blockworks",
    "cryptoslate": "CryptoSlate",
    "ambcrypto": "AMBCrypto",
    "cryptopolitan": "Cryptopolitan",
    "dlnews": "DL News",
    "wired": "Wired",
    "reuters": "Reuters",
    "bloomberg": "Bloomberg",
    "ft": "Financial Times",
    "wsj": "Wall Street Journal",
    "nyt": "New York Times",
    "washingtonpost": "Washington Post",
    "haaretz": "Haaretz",
    "timesofisrael": "Times of Israel",
    "jpost": "Jerusalem Post",
    "bleepingcomputer": "BleepingComputer",
    "krebsonsecurity": "Krebs on Security",
    "techcrunch": "TechCrunch",
    "theguardian": "The Guardian",
    "vice": "Vice",
    "404media": "404 Media",
    "futurism": "Futurism",
    "npr": "NPR",
    "pbs": "PBS",
    "yahoofinance": "Yahoo Finance",
    "cnbc": "CNBC",
    "newsweek": "Newsweek",
    "aljazeera": "Al Jazeera",
    "intelnews": "IntelNews",
    "bitruefinance": "Bitrue",
    "kucoin": "KuCoin News",
    "rekt": "Rekt News",
    "rektnews": "Rekt News",
}


def parse_bib_authors(bib_text: str) -> list[str]:
    authors: list[str] = []
    for m in re.finditer(
        r"@\w+\{[^,]+,(.*?)(?=\n@\w+\{|$)",
        bib_text,
        re.DOTALL,
    ):
        body = m.group(1)
        am = re.search(r"author\s*=\s*\{\{([^}]+)\}\}", body)
        if not am:
            continue
        authors.append(am.group(1).strip())
    return authors


def parse_bib_keys(bib_text: str) -> list[str]:
    return re.findall(r"@\w+\{([^,]+),", bib_text)


def normalize(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", s.lower())


def main() -> int:
    args = sys.argv[1:]
    output_json = "--json" in args

    bib_path = REPO / "citations.bib"
    if not bib_path.exists():
        print("ERROR: citations.bib not found", file=sys.stderr)
        return 1
    bib_text = bib_path.read_text(encoding="utf-8")

    # Find which keys are actually cited (vs orphan entries). Any `[key]` in
    # the markdown corpus counts as cited; uncited bib entries are excluded
    # from the diversity report so the picture reflects in-use sources.
    cited_keys: set[str] = set()
    for md in REPO.rglob("*.md"):
        rel = md.relative_to(REPO).as_posix()
        if rel.startswith(("node_modules/", "dist/", ".git/")):
            continue
        text = md.read_text(encoding="utf-8")
        for k in re.findall(r"`\[([a-z][a-z0-9_]{4,})\]`", text):
            cited_keys.add(k)

    # Map cite-keys to providers via key prefix. Conservative: only count if
    # the key starts with a known provider token.
    keys = parse_bib_keys(bib_text)
    counts: Counter[str] = Counter()
    unmatched_keys: list[str] = []
    for key in keys:
        if key not in cited_keys:
            continue
        norm_key = normalize(key)
        matched = False
        # Try longest prefix match first to avoid partial collisions.
        for prefix in sorted(KNOWN_PROVIDERS, key=len, reverse=True):
            if norm_key.startswith(prefix):
                counts[KNOWN_PROVIDERS[prefix]] += 1
                matched = True
                break
        if not matched:
            unmatched_keys.append(key)

    total_cited = sum(counts.values())
    top_providers = counts.most_common(20)
    top3_share = sum(c for _, c in top_providers[:3]) / total_cited if total_cited else 0
    top10_share = sum(c for _, c in top_providers[:10]) / total_cited if total_cited else 0
    hhi = sum((c / total_cited) ** 2 for _, c in counts.items()) if total_cited else 0

    if output_json:
        print(json.dumps({
            "total_cited_with_known_provider": total_cited,
            "unmatched_key_count": len(unmatched_keys),
            "providers": dict(counts.most_common()),
            "top3_share": round(top3_share, 3),
            "top10_share": round(top10_share, 3),
            "hhi": round(hhi, 3),
        }, indent=2))
        return 0

    print(f"Source diversity — {total_cited} citations matched to known providers")
    print(f"  Top-3 share:  {top3_share:.1%}")
    print(f"  Top-10 share: {top10_share:.1%}")
    print(f"  HHI:          {hhi:.3f}  (1.0 = single provider, 0.0 = perfect diversity)")
    if top3_share > 0.5:
        print(f"  ⚠ over-concentration: top-3 providers carry > 50% of citations")
    if hhi > 0.15:
        print(f"  ⚠ high concentration: HHI > 0.15 (rough monopoly threshold)")
    print()

    print(f"Top {min(20, len(top_providers))} providers:")
    for name, count in top_providers:
        share = count / total_cited if total_cited else 0
        bar = "█" * max(1, round(share * 40))
        print(f"  {name:<28} {count:>4}  {share:>5.1%}  {bar}")
    print()

    # Surface under-used known providers (in vocabulary, < 3 citations)
    under_used = [
        name for prefix, name in KNOWN_PROVIDERS.items()
        if counts.get(name, 0) < 3
    ]
    under_used = sorted(set(under_used))
    if under_used:
        print(f"Known providers with < 3 citations ({len(under_used)} candidates for broader sourcing):")
        for name in under_used[:30]:
            print(f"  - {name} ({counts.get(name, 0)})")
        if len(under_used) > 30:
            print(f"  - ... and {len(under_used) - 30} more")
        print()

    if unmatched_keys:
        print(f"Cite keys not mapped to a known provider: {len(unmatched_keys)} (extend KNOWN_PROVIDERS in this script if these are recurring publishers).")
        for k in unmatched_keys[:10]:
            print(f"  - {k}")
        if len(unmatched_keys) > 10:
            print(f"  - ... and {len(unmatched_keys) - 10} more")

    return 0


if __name__ == "__main__":
    sys.exit(main())
