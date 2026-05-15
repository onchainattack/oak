#!/usr/bin/env python3
"""
batch_actor_link.py — Auto-add OAK-Gnn: fields to example files with
confirmed/inferred-strong attribution but no actor link.

Only searches the metadata section (before ## Summary) for actor mentions,
and applies negation filters to avoid false positives.

Usage:
    python3 tools/batch_actor_link.py [--dry-run]
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent

# Regex patterns
ATTR_STRENGTH_RE = re.compile(
    r"\*\*(confirmed|inferred-strong|inferred-weak|pseudonymous|unattributed)\b"
)
ACTOR_LINK_RE = re.compile(
    r"\.\./actors/(OAK-G\d{2})-[A-Za-z0-9._-]+\.md"
)
ATTRIBUTION_HEADER_RE = re.compile(
    r"^\*\*OAK-Gnn:\*\*\s*(.+?)$", re.MULTILINE
)
ATTRIBUTION_LINE_RE = re.compile(
    r"^(\*\*Attribution:\*\*.*)$", re.MULTILINE
)
H1_RE = re.compile(r"^# (.+)$", re.MULTILINE)

# Phrases that negate a DPRK/Lazarus attribution in nearby text.
# Must be specific negation + actor ref to avoid matching unrelated "not" (e.g., "not a per-victim loss").
DPRK_NEGATION_RE = re.compile(
    r"(?:\bnot\s+(?:OAK-G01\b|a\s+DPRK\b|DPRK[- ]aligned\b|Lazarus\b)[^)]*?)"
    r"|(?:\bdistinct\s+from\s+(?:the\s+)?(?:broader\s+)?(?:OAK-G01\b|DPRK\b|Lazarus\b)[^)]*?)"
    r"|(?:\bdistinguishing\s+it\s+(?:cleanly\s+)?from\s+(?:the\s+)?(?:OAK-G01\b|DPRK\b|Lazarus\b)[^)]*?)",
    re.IGNORECASE,
)
# DPRK used only as a temporal reference, not attribution
DPRK_TEMPORAL_RE = re.compile(
    r"pre-Lazarus\s+era",
    re.IGNORECASE,
)

# Files where DPRK/Lazarus/Tornado Cash is mentioned in metadata but is NOT the
# attributed actor (comparison, tool mention, one-of-many, etc.)
MANUAL_EXCLUSIONS = {
    # Tornado Cash mentioned only as a laundering tool, not as the subject
    "2022-01-wonderland-sifu-patryn.md",
    "2023-2026-fake-firmware-update-phishing-cohort.md",
    "2023-2026-fake-dex-clone-frontend-cohort.md",
    # DPRK mentioned as one of many possible laundering sources, not primary actor
    "2024-01-defi-bluechip-yield-laundering.md",
}


def metadata_section(text: str) -> str:
    """Return the portion of the file before the first ## heading."""
    m = re.search(r"\n## ", text)
    if m:
        return text[:m.start()]
    return text[:2000]


def h1_title(text: str) -> str:
    """Extract the H1 title from the file."""
    m = H1_RE.search(text)
    return m.group(1).strip() if m else ""


def find_missing_files() -> list[Path]:
    """Return list of example files with confirmed/inferred-strong attr but no actor link."""
    examples_dir = REPO / "examples"
    missing = []
    for f in sorted(examples_dir.glob("*.md")):
        if f.name.lower() == "readme.md":
            continue
        text = f.read_text(encoding="utf-8")
        m = ATTR_STRENGTH_RE.search(text)
        if not m:
            continue
        label = m.group(1).lower()
        if label not in ("confirmed", "inferred-strong"):
            continue
        has_actor_link = bool(ACTOR_LINK_RE.search(text))
        has_gnn_header = bool(ATTRIBUTION_HEADER_RE.search(text))
        if not has_actor_link and not has_gnn_header:
            missing.append(f)
    return missing


def _match_dprk(meta: str, title: str) -> bool:
    """Check if DPRK/Lazarus is legitimately attributed in the metadata."""
    # Must mention Lazarus or DPRK
    if not (re.search(r"\bLazarus\b", meta, re.IGNORECASE) or
            re.search(r"\bDPRK\b", meta) or
            "North Korea" in meta):
        return False

    # Negation check: "not OAK-G01", "distinct from DPRK/Lazarus", etc.
    if DPRK_NEGATION_RE.search(meta):
        return False

    # Temporal reference only: "pre-Lazarus era"
    if DPRK_TEMPORAL_RE.search(meta):
        return False

    # Skip if a more specific DPRK sub-group is mentioned in metadata
    if (re.search(r"\bBlueNoroff\b", meta) or
        re.search(r"\bAndariel\b", meta) or
        re.search(r"\bKimsuky\b", meta) or
        "APT43" in meta):
        return False

    return True


def _match_tornado_cash(meta: str, title: str) -> bool:
    """Check if Tornado Cash is the subject, not just a tool mention."""
    if "Tornado Cash" not in meta:
        return False

    # Tornado Cash should appear in the H1 title or be the primary subject
    if "Tornado Cash" in title or "tornado-cash" in title.lower():
        return True

    # If Tornado Cash appears in the Attribution line, it's likely the actor
    attr_m = ATTRIBUTION_LINE_RE.search(meta)
    if attr_m and "Tornado Cash" in attr_m.group(1):
        return True

    return False


def find_actor_for_file(filepath: Path) -> tuple[str | None, str | None, str | None]:
    """Search the metadata section for actor mentions. Returns (oak_id, full_name, slug)."""
    text = filepath.read_text(encoding="utf-8")

    if ACTOR_LINK_RE.search(text):
        return None, None, None

    # Check manual exclusion list
    if filepath.name in MANUAL_EXCLUSIONS:
        return None, None, None

    meta = metadata_section(text)
    title = h1_title(text)

    # Check DPRK/Lazarus (OAK-G01) — must pass negation/temporal filters
    if _match_dprk(meta, title):
        return ("OAK-G01", "Lazarus Group / DPRK-attributed", "OAK-G01-lazarus")

    # Check Tornado Cash (OAK-G02) — must be the subject, not just a tool
    if _match_tornado_cash(meta, title):
        return ("OAK-G02", "Tornado Cash", "OAK-G02-tornado-cash")

    # Check sub-groups (before generic Lazarus is checked above)
    if re.search(r"\bBlueNoroff\b", meta, re.IGNORECASE):
        return ("OAK-G08", "BlueNoroff", "OAK-G08-bluenoroff")
    if re.search(r"\bAndariel\b", meta, re.IGNORECASE):
        return ("OAK-G09", "Andariel", "OAK-G09-andariel")
    if re.search(r"\bKimsuky\b", meta, re.IGNORECASE) or "APT43" in meta:
        return ("OAK-G07", "APT43 / Kimsuky", "OAK-G07-kimsuky")

    # Iranian operators
    if re.search(r"\bIranian (cyber )?operators?\b", meta, re.IGNORECASE):
        return ("OAK-G13", "Iranian Operators", "OAK-G13-iranian-operators")
    if "Iran-based" in meta:
        return ("OAK-G13", "Iranian Operators", "OAK-G13-iranian-operators")

    # Russian/ransomware groups — use word boundaries for single words
    actor_checks = [
        (r"\bGarantex\b", "OAK-G03", "Garantex", "OAK-G03-garantex"),
        (r"\bConti\b", "OAK-G04", "Conti", "OAK-G04-conti"),
        (r"\bLockBit\b", "OAK-G05", "LockBit", "OAK-G05-lockbit"),
        (r"\bAkira\b", "OAK-G16", "Akira", "OAK-G16-akira"),
        (r"\bBlackByte\b", "OAK-G17", "BlackByte", "OAK-G17-blackbyte"),
        (r"\bKarakurt\b", "OAK-G18", "Karakurt", "OAK-G18-karakurt"),
    ]
    for pattern, oak_id, full_name, slug in actor_checks:
        if re.search(pattern, meta, re.IGNORECASE):
            return (oak_id, full_name, slug)

    # Multi-word phrases
    if "Evil Corp" in meta:
        return ("OAK-G06", "Evil Corp", "OAK-G06-evil-corp")
    if "Black Basta" in meta:
        return ("OAK-G11", "Black Basta", "OAK-G11-black-basta")

    return None, None, None


def add_oak_gnn_line(filepath: Path, oak_id: str, full_name: str, slug: str) -> bool:
    """Add OAK-Gnn: line before the Attribution: line. Returns True on success."""
    text = filepath.read_text(encoding="utf-8")

    m = ATTRIBUTION_LINE_RE.search(text)
    if not m:
        print(f"  SKIP {filepath.name}: no **Attribution:** line found")
        return False

    pos = m.start()
    new_line = f'**OAK-Gnn:** [{oak_id} {full_name}](../actors/{slug}.md).\n'
    new_text = text[:pos] + new_line + text[pos:]

    if "--dry-run" in sys.argv:
        print(f"  WOULD ADD {oak_id} to {filepath.name}")
        return True

    filepath.write_text(new_text, encoding="utf-8")
    print(f"  ADDED {oak_id} to {filepath.name}")
    return True


def main():
    print("Scanning for missing actor links...")
    missing = find_missing_files()
    print(f"Found {len(missing)} example files with missing actor links.\n")

    results = {}
    processed = 0
    skipped = 0
    dry_run = "--dry-run" in sys.argv

    for i, f in enumerate(missing, 1):
        oak_id, full_name, slug = find_actor_for_file(f)
        if oak_id:
            print(f"[{i}/{len(missing)}] {f.name}")
            if add_oak_gnn_line(f, oak_id, full_name, slug):
                results[oak_id] = results.get(oak_id, 0) + 1
                processed += 1
        else:
            skipped += 1

    if dry_run:
        print(f"\n--- DRY-RUN RESULTS ---")
    else:
        print(f"\n--- RESULTS ---")
    print(f"Files with actor added: {processed}")
    print(f"Skipped (no identifiable actor): {skipped}")
    print(f"\nBy actor:")
    for oak_id in sorted(results.keys()):
        print(f"  {oak_id}: {results[oak_id]} files")

    # Warn if total processed + skipped != total missing
    total = processed + skipped
    if total != len(missing):
        print(f"\nWARNING: processed ({processed}) + skipped ({skipped}) = {total} != {len(missing)}")
        print("Some files were not accounted for!")

    return 0


if __name__ == "__main__":
    sys.exit(main())
