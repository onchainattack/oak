#!/usr/bin/env python3
"""
check_citations.py — validate citations.bib structure and cross-reference
every citation key cited across the corpus markdown.

OAK uses two citation conventions, both valid:
  1. Central bib entries in citations.bib (`@misc{key, ...}`).
  2. Self-contained inline references: a `` `[key]` `` whose source is
     documented inline in the page's own `## Citations` / `## Public
     references` / `## References` / `## Sources` section (key + title +
     URL right there in the markdown, not mirrored into citations.bib).

A cited key is therefore "resolved" if it is EITHER present in
citations.bib OR defined in a references-style section of some corpus
file. The check fails only on a *dangling* key — one referenced in prose
but documented nowhere (typically a typo or a deleted reference).

Usage:
    python tools/check_citations.py [path/to/citations.bib]

Exit codes:
    0 — all checks pass
    1 — bib parse failure or a dangling (undefined) citation key
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
# A references-style section heading: keys defined under these are "resolved".
REF_SECTION_RE = re.compile(
    r"^#{2,}\s+(?:Citations|Public\s+references|References|Sources)\b",
    re.IGNORECASE,
)
ANY_H2_RE = re.compile(r"^#{2,}\s+")
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


EXCLUDED_PREFIXES = (
    ".git/", ".local-venv/", "node_modules/", ".venv/",
    # Build output / non-public dirs — gitignored, so absent in CI; exclude
    # locally too so local runs match CI.
    "dist/", "build/", "vendor-outreach/", "coverage/",
)


def collect_keys(root: Path) -> tuple[dict[str, list[str]], set[str]]:
    """Scan every .md under root once.

    Returns (cited, defined):
      - cited:   key -> list of files that reference it anywhere.
      - defined: set of keys that appear inside a references-style section
                 (## Citations / ## Public references / ## References /
                 ## Sources) of any file — i.e. keys documented inline.
    """
    cited: dict[str, list[str]] = {}
    defined: set[str] = set()
    for md in root.rglob("*.md"):
        rel = md.relative_to(root).as_posix()
        if any(rel.startswith(p) for p in EXCLUDED_PREFIXES):
            continue
        in_refs = False
        for line in md.read_text(encoding="utf-8").splitlines():
            if ANY_H2_RE.match(line):
                in_refs = bool(REF_SECTION_RE.match(line))
            for key in CITATION_KEY_RE.findall(line):
                cited.setdefault(key, []).append(rel)
                if in_refs:
                    defined.add(key)
    return cited, defined


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

    cited, defined = collect_keys(Path("."))

    # A key resolves if it is in the central bib OR documented inline in a
    # references-style section somewhere in the corpus. Only keys that are
    # referenced but defined nowhere are dangling failures.
    dangling = sorted(
        k for k in cited if k not in bib_keys and k not in defined
    )
    if dangling:
        print(
            "ERROR: dangling citation keys (not in citations.bib and not "
            "defined in any ## Citations / ## Public references / ## References "
            "/ ## Sources section):",
            file=sys.stderr,
        )
        for k in dangling:
            sources = ", ".join(sorted(set(cited[k])))
            print(f"  [{k}]  cited in: {sources}", file=sys.stderr)
        return 1

    inline_only = sorted(k for k in defined if k not in bib_keys)
    print(
        f"OK: {len(bib_keys)} bib entries, {len(cited)} cited keys, all "
        f"resolved ({len(inline_only)} via inline reference sections)."
    )
    unused = sorted(k for k in bib_keys if k not in cited)
    if unused:
        print(f"NOTE: {len(unused)} bib entries not yet cited.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
