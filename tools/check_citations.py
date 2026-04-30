#!/usr/bin/env python3
"""
check_citations.py — validate citations.bib structure and cross-reference
citation keys cited from tactics/ and techniques/ markdown.

Usage:
    python tools/check_citations.py [path/to/citations.bib]

Exit codes:
    0 — all checks pass
    1 — bib parse failure or cross-reference miss
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

try:
    import bibtexparser
except ImportError:
    print(
        "ERROR: bibtexparser not installed. Run: pip install bibtexparser",
        file=sys.stderr,
    )
    sys.exit(1)


CITATION_KEY_RE = re.compile(r"`\[([a-z][a-z0-9_]{4,})\]`")
ALLOWED_FIELDS_HINT = {
    "author",
    "title",
    "year",
    "journal",
    "booktitle",
    "publisher",
    "doi",
    "url",
    "note",
    "eprint",
    "archiveprefix",
    "primaryclass",
    "howpublished",
    "month",
}


def load_bib(path: Path) -> tuple[set[str], list[dict]]:
    with path.open("r", encoding="utf-8") as fh:
        db = bibtexparser.load(fh)
    keys = set()
    bad = []
    for entry in db.entries:
        key = entry.get("ID")
        if not key:
            bad.append(("missing-ID", entry))
            continue
        if key in keys:
            bad.append(("duplicate-ID", entry))
        keys.add(key)
    return keys, bad


EXCLUDED_PREFIXES = (".git/", ".local-venv/", "node_modules/", ".venv/")


def collect_cited_keys(root: Path) -> dict[str, list[str]]:
    """Return key -> list of files that cite it. Scans every .md under root."""
    cited: dict[str, list[str]] = {}
    for md in root.rglob("*.md"):
        rel = md.relative_to(root).as_posix()
        if any(rel.startswith(p) for p in EXCLUDED_PREFIXES):
            continue
        text = md.read_text(encoding="utf-8")
        for key in CITATION_KEY_RE.findall(text):
            cited.setdefault(key, []).append(rel)
    return cited


def main() -> int:
    bib_path = Path(sys.argv[1] if len(sys.argv) > 1 else "citations.bib")
    if not bib_path.exists():
        print(f"ERROR: {bib_path} not found", file=sys.stderr)
        return 1

    bib_keys, bad = load_bib(bib_path)
    if bad:
        for kind, entry in bad:
            print(f"ERROR: {kind}: {entry!r}", file=sys.stderr)
        return 1

    cited = collect_cited_keys(Path("."))

    missing = sorted(k for k in cited if k not in bib_keys)
    if missing:
        print("ERROR: cited keys missing from citations.bib:", file=sys.stderr)
        for k in missing:
            sources = ", ".join(sorted(set(cited[k])))
            print(f"  [{k}]  cited in: {sources}", file=sys.stderr)
        return 1

    unused = sorted(k for k in bib_keys if k not in cited)
    print(f"OK: {len(bib_keys)} bib entries, {len(cited)} cited keys, all resolved.")
    if unused:
        print(f"NOTE: {len(unused)} bib entries not yet cited: {', '.join(unused)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
