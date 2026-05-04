#!/usr/bin/env python3
"""extract_coverage.py — one-shot scraper that reads the
`## Reference implementations` section of every techniques/*.md and emits a
draft coverage manifest.

The output is intentionally a *draft*: free-form prose doesn't perfectly
encode every nuance (tier, partial-with-caveats, vendor-product distinction,
etc.). The draft is committed to coverage/manifest.yml as a seed and then
hand-curated. Subsequent runs of tools/check_coverage.py guard the manifest
against drift from the prose.

Usage:
    python3 tools/extract_coverage.py            # writes coverage/manifest.draft.yml
    python3 tools/extract_coverage.py --stats    # prints vendor × technique stats
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TECH_DIR = ROOT / "techniques"
OUT_FILE = ROOT / "coverage" / "manifest.draft.yml"

# Canonical vendor catalogue: (manifest key, regex pattern matching the
# phrasing used in the prose). Keep keys snake_case for stable IDs.
VENDORS = [
    ("mg-detectors-rs", r"`mg-detectors-rs`"),
    ("goplus",          r"\bGoPlus(?:\s+(?:token-security\s+API|API|Security))?\b"),
    ("rugcheck",        r"\bRugCheck\b"),
    ("tokensniffer",    r"\bToken\s*Sniffer\b"),
    ("honeypot-is",     r"\bHoneypot\.is\b"),
    ("slither",         r"\bSlither\b"),
    ("mythx",           r"\bMythX\b"),
    ("mythril",         r"\bMythril\b"),
    ("securify",        r"\bSecurify\b"),
    ("forta",           r"\bForta\b"),
    ("oz-defender",     r"\bOpenZeppelin\s+Defender\b"),
    ("openzeppelin",    r"\bOpenZeppelin\b(?!\s+Defender)"),
    ("blocksec",        r"\bBlockSec\b|\bPhalconHQ\b"),
    ("certora",         r"\bCertora\b"),
    ("rv",              r"\bRuntime\s+Verification\b"),
    ("halmos",          r"\bHalmos\b"),
    ("kontrol",         r"\bKontrol\b"),
    ("echidna",         r"\bEchidna\b"),
    ("foundry-invariant", r"\bFoundry(?:\s+invariant)?\b"),
    ("trail-of-bits",   r"\bTrail\s+of\s+Bits\b"),
    ("halborn",         r"\bHalborn\b"),
    ("consensys-diligence", r"\bConsenSys\s+Diligence\b"),
    ("quantstamp",      r"\bQuantstamp\b"),
    ("ottersec",        r"\bOSEC\b|\bOtterSec\b"),
    ("certik",          r"\bCertiK\b"),
    ("hexens",          r"\bHexens\b"),
    ("code4rena",       r"\bCode4rena\b"),
    ("sherlock",        r"\bSherlock\b"),
    ("cantina",         r"\bCantina\b"),
    ("chainalysis",     r"\bChainalysis\b"),
    ("trm-labs",        r"\bTRM(?:\s+Labs)?\b"),
    ("elliptic",        r"\bElliptic\b"),
    ("nansen",          r"\bNansen\b"),
    ("dappradar",       r"\bDappRadar\b"),
    ("bitscrunch",      r"\bbitsCrunch\b"),
    ("dexscreener",     r"\bDexScreener\b|\bDEX\s+Screener\b"),
    ("etherscan",       r"\bEtherscan\b"),
    ("bscscan",         r"\bBscScan\b"),
    ("tenderly",        r"\bTenderly\b"),
    ("mandiant",        r"\bMandiant\b"),
    ("stroz-friedberg", r"\bStroz\s+Friedberg\b"),
    ("microsoft-mstic", r"\bMicrosoft\s+Threat\s+Intelligence\b|\bSapphire\s+Sleet\b|\bStorm-1811\b"),
    ("unit42",          r"\bUnit\s*42\b"),
    ("sentinelone",     r"\bSentinelOne\b"),
    ("jamf",            r"\bJamf\b"),
    ("elastic",         r"\bElastic\b"),
    ("zeroshadow",      r"\bZeroShadow\b|\bSEAL\s*911\b"),
]

# Coverage state markers, in order of specificity (first match wins).
COVERAGE_MARKERS = [
    (r"coverage\s+\*\*gap\*\*|coverage\s+gap\b|out\s+of\s+scope", "gap"),
    (r"\bN/?A\b",                                                  "na"),
    (r"coverage\s+\*\*partial\*\*|\bpartial(?:\s+coverage)?\b",   "partial"),
    (r"\bemerging\b|\bcalibration\s+(?:in\s+progress|target)\b",  "partial"),
    # If a detector ID like D01 / D05 appears, treat as full coverage.
    (r"\bD\d{2}\b",                                                "full"),
    (r"\bfull\s+coverage\b|\bhigh\s+recall\b",                    "full"),
]

# Detector-id extraction (mg-detectors-rs uses Dxx; Slither uses kebab-case
# detector IDs like reentrancy-eth, arbitrary-send-eth, etc.).
DETECTOR_ID_PATTERNS = [
    (re.compile(r"`mg-detectors-rs`\s+—\s+(D\d{2})"),   "mg-id"),
    (re.compile(r"detector_id[:=]\s*['\"]?([\w-]+)"),    "detector-id"),
]

TECH_ID_RE = re.compile(r"techniques/(T[\d.]+)")


def extract_section(path: Path) -> str:
    """Return the body of the `## Reference implementations` section."""
    text = path.read_text(encoding="utf-8")
    m = re.search(r"^## Reference implementations\s*\n(.*?)(?=^## )", text, re.M | re.S)
    return m.group(1).strip() if m else ""


def technique_id_from_path(path: Path) -> str:
    """`techniques/T1.001-modifiable-tax.md` → `OAK-T1.001`."""
    stem = path.stem  # T1.001-modifiable-tax
    head = stem.split("-", 1)[0]
    return f"OAK-{head}"


def find_vendor_lines(section: str) -> list[tuple[str, str]]:
    """Split section into bullets, return [(vendor_key, line)]."""
    out: list[tuple[str, str]] = []
    for raw in section.splitlines():
        line = raw.strip()
        if not line.startswith("-"):
            continue
        for vendor_key, pattern in VENDORS:
            if re.search(pattern, line):
                out.append((vendor_key, line))
    return out


def coverage_for_line(line: str) -> str:
    for pattern, state in COVERAGE_MARKERS:
        if re.search(pattern, line, re.I):
            return state
    # Default to "documented" — a vendor was named but no explicit state was
    # given. Hand-curation will resolve these.
    return "documented"


def detector_id_for_line(line: str) -> str | None:
    for pattern, _ in DETECTOR_ID_PATTERNS:
        m = pattern.search(line)
        if m:
            return m.group(1)
    return None


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--stats", action="store_true",
                        help="Print vendor × coverage stats and exit")
    parser.add_argument("--out", default=str(OUT_FILE))
    args = parser.parse_args()

    files = sorted(TECH_DIR.glob("T*.md"))
    by_vendor: dict[str, list[dict]] = defaultdict(list)

    for path in files:
        section = extract_section(path)
        if not section:
            continue
        tech_id = technique_id_from_path(path)
        for vendor_key, line in find_vendor_lines(section):
            entry = {
                "id": tech_id,
                "coverage": coverage_for_line(line),
            }
            det = detector_id_for_line(line)
            if det:
                entry["detector_id"] = det
            entry["_evidence"] = line  # so curators can see the source line
            by_vendor[vendor_key].append(entry)

    if args.stats:
        rows = []
        for vendor_key, entries in sorted(by_vendor.items(), key=lambda kv: -len(kv[1])):
            buckets = defaultdict(int)
            for e in entries:
                buckets[e["coverage"]] += 1
            rows.append((vendor_key, len(entries), dict(buckets)))
        max_v = max(len(r[0]) for r in rows)
        for vendor_key, total, buckets in rows:
            print(f"{vendor_key:{max_v}}  total={total:>3}  " +
                  "  ".join(f"{k}={v}" for k, v in sorted(buckets.items())))
        return 0

    # Emit YAML manually — small, fixed structure, no PyYAML dep.
    out = ["# coverage/manifest.draft.yml — auto-generated by tools/extract_coverage.py",
           "# Hand-curate from this draft into coverage/manifest.yml.",
           "# Each entry maps a vendor (or product line) to the OAK Techniques",
           "# it claims coverage for, with one of {full, partial, gap, na, documented}",
           "# per Technique. The `documented` state means the vendor is named in the",
           "# Reference implementations prose but no explicit coverage word was given.",
           "",
           "vendors:"]

    for vendor_key, entries in sorted(by_vendor.items()):
        out.append(f"  - key: {vendor_key}")
        out.append(f"    techniques:")
        seen = set()
        for e in sorted(entries, key=lambda x: x["id"]):
            if e["id"] in seen:
                continue
            seen.add(e["id"])
            line = f"      - {{ id: {e['id']}, coverage: {e['coverage']}"
            if e.get("detector_id"):
                line += f", detector_id: {e['detector_id']}"
            line += " }"
            out.append(line)
            out.append(f"        # evidence: {e['_evidence'][:120].replace(chr(10), ' ')}")
    out.append("")

    Path(args.out).parent.mkdir(parents=True, exist_ok=True)
    Path(args.out).write_text("\n".join(out), encoding="utf-8")
    print(f"OK: wrote {args.out} — {sum(len(v) for v in by_vendor.values())} vendor-technique edges across {len(by_vendor)} vendors")
    return 0


if __name__ == "__main__":
    sys.exit(main())
