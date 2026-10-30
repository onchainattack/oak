#!/usr/bin/env python3
"""
check_mitigations.py — mitigations must say what, how and why, tied to real cases.

Why this exists: OAK's Mitigations sections were largely generic prose
("structurally distinct prompt class…") that no defender could act on, and
the one control that would have stopped the 2026-10 Binance theft (custodial
signers refusing EIP-7702 authorizations) was not in OAK at all. A mitigation
is only useful if it states what to do, how to do it, and why: which real
incident it would have stopped, and at which step. The "why" is checkable:
it is a link to an example.

Rules:
  Mitigation files (mitigations/OAK-Mnn-*.md):
    - `## How it applies` links to at least one example (../examples/…).
      Hard for OAK-M49 and later; earlier files are reported as legacy.
  Technique pages (techniques/T*.md), section `## Mitigations`:
    - at least one bullet links to an example. Hard for any Technique that
      is the root-cause Technique of an example dated HARD_FROM or later
      (new incidents bring a concrete mitigation with them); others legacy.
    - if the section has a `### What would have stopped …` subsection, every
      bullet in it links to an example (hard, always).

Usage:
    python3 tools/check_mitigations.py            # validate
    python3 tools/check_mitigations.py --legacy   # also list legacy gaps
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
TECH = REPO / "techniques"
MITS = REPO / "mitigations"
EXAMPLES = REPO / "examples"

HARD_FROM = "2026-11"
FIRST_STRICT_M = 49

EX_LINK = re.compile(r"\]\((?:\.\./)?examples/[^)]+\.md\)")
SECTION = lambda name: re.compile(rf"^## {name}\s*$(.*?)(?=^## |\Z)", re.S | re.M)
STOPPED = re.compile(r"^### What would have stopped[^\n]*$(.*?)(?=^### |\Z)", re.S | re.M)
RC_TECH = re.compile(r"^- \*\*Technique:\*\*\s*OAK-(T\d+\.\d{3}(?:\.\d{3})?)", re.M)
BULLET = re.compile(r"^- .+?(?=^- |\Z)", re.S | re.M)


def techniques_needing_concrete() -> dict[str, list[str]]:
    """Technique → new examples (dated >= HARD_FROM) whose root cause it is."""
    need: dict[str, list[str]] = {}
    for p in EXAMPLES.glob("*.md"):
        if p.name[:7] < HARD_FROM or not re.match(r"^\d{4}-\d{2}-", p.name):
            continue
        for t in RC_TECH.findall(p.read_text(encoding="utf-8")):
            need.setdefault(t, []).append(p.name)
    return need


def main(argv: list[str]) -> int:
    errors: list[str] = []
    legacy: list[str] = []

    for p in sorted(MITS.glob("OAK-M*.md")):
        m = re.match(r"OAK-M(\d+)", p.name)
        sec = SECTION("How it applies").search(p.read_text(encoding="utf-8"))
        ok = bool(sec and EX_LINK.search(sec.group(1)))
        if not ok:
            msg = f"{p.name}: `## How it applies` links no example (what would this have stopped?)"
            (errors if m and int(m.group(1)) >= FIRST_STRICT_M else legacy).append(msg)

    need = techniques_needing_concrete()
    for p in sorted(TECH.glob("T*.md")):
        tid = p.name.split("-")[0]
        text = p.read_text(encoding="utf-8")
        sec = SECTION("Mitigations").search(text)
        body = sec.group(1) if sec else ""
        if not EX_LINK.search(body):
            msg = f"{p.name}: `## Mitigations` has no bullet tied to a real example"
            if tid in need:
                errors.append(msg + f" (required: root cause of {', '.join(sorted(need[tid]))})")
            else:
                legacy.append(msg)
        st = STOPPED.search(body)
        if st:
            for b in BULLET.findall(st.group(1)):
                if not EX_LINK.search(b):
                    errors.append(f"{p.name}: a 'What would have stopped' bullet cites no example: {b.strip()[:80]}…")

    for e in errors:
        print(f"  {e}")
    if "--legacy" in argv:
        for e in legacy:
            print(f"  (legacy) {e}")
    print(f"OAK mitigations — {len(errors)} failing; {len(legacy)} legacy sections without a concrete, case-tied mitigation")
    if errors:
        print("FAIL")
        return 1
    print("OK")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
