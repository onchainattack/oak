#!/usr/bin/env python3
"""check_tags.py — validate that every example's declared Techniques resolve.

The gap this closes: check_integrity.py builds its tag -> technique mapping with

    if matched:
        tag_to_examples.setdefault(matched, set()).add(ex_fname)

and has no `else`. A tag that resolves to no technique file is silently dropped.
It is not reported as broken, and the example is not an orphan either (orphans
are examples with no OAK-T tags *anywhere*, and these have tags in prose). So an
example whose "OAK Techniques observed" field names only a bare Tactic — or
names nothing at all — is invisible to every existing check, contributes to no
Technique's example count, and gets no backlink check, while STATS.md continues
to report full coverage.

Three failure classes, in descending severity:

  EMPTY     the field exists but is blank. Nothing declared at all.
  TACTIC    the field names only Tactics (T7, T4), never a Technique (T7.001).
            Tactic-level prose references elsewhere in the file are fine and are
            not checked — this is specifically about what the field *declares*.
  UNKNOWN   the field names an ID matching no Tactic and no Technique. Either a
            typo or a reference to a taxonomy that no longer exists.

An example may declare itself unmapped on purpose — some incidents genuinely sit
outside the Technique set, and OAK's methodology asks contributors to say so
rather than force a fit. That is legitimate, but it must be *stated*, not left
blank: write "none —" plus a reason in the field. Declared-unmapped is reported
separately and does not fail the check.

Usage:
    python3 tools/check_tags.py            # report; exit 1 on any failure
    python3 tools/check_tags.py --report   # report only; always exit 0
"""

from __future__ import annotations

import os
import re
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(SCRIPT_DIR)
os.chdir(REPO)

EX_DIR = "examples"
TECH_DIR = "techniques"
TACTIC_DIR = "tactics"

FIELD_RE = re.compile(
    r"\*\*OAK Techniques observed:\*\*(.*?)(?=\n\*\*|\n##|\Z)", re.S
)
TAG_RE = re.compile(r"OAK-(T\d+(?:\.\d+)*)")
# An explicit, reasoned declaration that nothing maps. "none" alone is not
# enough — it must be followed by something, so a reason is on the record.
DECLARED_UNMAPPED_RE = re.compile(r"\bnone\b\s*[—–-]", re.I)


def technique_ids() -> set[str]:
    return {
        f.split("-", 1)[0]
        for f in os.listdir(TECH_DIR)
        if f.endswith(".md") and "-" in f
    }


def tactic_ids() -> set[str]:
    return {
        f.split("-", 1)[0]
        for f in os.listdir(TACTIC_DIR)
        if f.endswith(".md") and "-" in f
    }


def resolves_to_technique(tag: str, techs: set[str]) -> bool:
    """T9.005 resolves if techniques/T9.005-*.md exists. T9.005.001 resolves to
    itself if present, else to its parent T9.005 — sub-Techniques are not always
    given their own file."""
    if tag in techs:
        return True
    parts = tag.split(".")
    while len(parts) > 1:
        parts.pop()
        if ".".join(parts) in techs:
            return True
    return False


def main() -> int:
    report_only = "--report" in sys.argv
    techs, tactics = technique_ids(), tactic_ids()

    empty, tactic_only, unknown, declared = [], [], [], []

    for fname in sorted(os.listdir(EX_DIR)):
        if not fname.endswith(".md"):
            continue
        with open(os.path.join(EX_DIR, fname), encoding="utf-8") as fh:
            content = fh.read()

        m = FIELD_RE.search(content)
        if not m:
            empty.append((fname, "no 'OAK Techniques observed' field at all"))
            continue

        field = m.group(1)
        tags = set(TAG_RE.findall(field))

        if not tags:
            if DECLARED_UNMAPPED_RE.search(field):
                declared.append((fname, field.strip()[:70]))
            else:
                empty.append((fname, "field is blank"))
            continue

        bad = [t for t in tags if t not in tactics and not resolves_to_technique(t, techs)]
        if bad:
            unknown.append((fname, sorted(bad)))
            continue

        if not any(resolves_to_technique(t, techs) for t in tags):
            # Everything declared is a real Tactic, but nothing is a Technique.
            if DECLARED_UNMAPPED_RE.search(field):
                declared.append((fname, field.strip()[:70]))
            else:
                tactic_only.append((fname, sorted(tags)))

    print("=" * 72)
    print("OAK TAG RESOLUTION REPORT")
    print("=" * 72)
    print(f"\nTechniques: {len(techs)} · Tactics: {len(tactics)} · "
          f"Examples: {len([f for f in os.listdir(EX_DIR) if f.endswith('.md')])}")

    print(f"\n--- UNKNOWN: field names an ID that is neither Tactic nor Technique: "
          f"{len(unknown)} ---")
    for f, tags in unknown:
        print(f"  {f}\n      {tags}")

    print(f"\n--- EMPTY: field declares nothing: {len(empty)} ---")
    for f, why in empty:
        print(f"  {f}  ({why})")

    print(f"\n--- TACTIC-ONLY: field names Tactics but no Technique: "
          f"{len(tactic_only)} ---")
    for f, tags in tactic_only:
        print(f"  {f}\n      {tags}")

    print(f"\n--- DECLARED UNMAPPED (legitimate; not a failure): {len(declared)} ---")
    for f, txt in declared:
        print(f"  {f}\n      {txt}")

    fails = len(unknown) + len(empty) + len(tactic_only)
    print()
    if fails:
        print(f"FAIL: {fails} example(s) declare no resolvable Technique.")
        print("      Each is excluded from its Technique's example count and from")
        print("      the backlink check, while STATS.md reports full coverage.")
        print("      Fix by naming the Technique, or by declaring the gap")
        print("      explicitly: 'none — <reason>'.")
    else:
        print("OK: every example declares at least one resolvable Technique.")

    return 0 if (report_only or not fails) else 1


if __name__ == "__main__":
    sys.exit(main())
