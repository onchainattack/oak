#!/usr/bin/env python3
"""
check_root_cause.py — validate the `## Root-cause evidence` section of worked
examples.

Why this exists: OAK twice published a confident root cause that the
operator's own post-mortem contradicted — KelpDAO (2026-04, filed as key
compromise for five months) and THORChain (2026-05, a Technique minted from a
same-day third-party analysis). Both files cited *something*; neither said
which source established the mechanism, so nothing could check it. This
section makes that claim explicit and machine-checkable, and is exported to
oak.json as `root_cause_evidence` so an agent can see why a classification
was assigned, not just what it is.

Format (one or more entries; each entry starts with a Technique line):

    ## Root-cause evidence

    - **Technique:** OAK-T10.001
    - **Source:** <https://...>; <https://...>
    - **Source type:** operator
    - **Confidence:** confirmed
    - **Evidence:** what the source says that establishes the mechanism.

Source type — who established the mechanism:
    operator               the affected protocol/company's own post-mortem or statement
    government             agency advisory, indictment, court record, sanctions action
    security-firm          independent forensic / security firm analysis
    independent-researcher named researcher's own analysis (gist, thread, blog)
    news                   secondary reporting

Confidence — how settled the mechanism is:
    confirmed     the operator or a government source states the mechanism
    corroborated  two or more independent sources agree (list both)
    reported      one non-operator source
    disputed      credible sources conflict; Evidence must say how

Hard rules (exit 1):
    - required fields present; source type and confidence from the lists above
    - every Source is an <https://...> URL
    - Technique ID is one the example declares in **OAK Techniques observed:**
    - confirmed  => source type operator or government
    - corroborated => at least two sources
    - examples dated on or after REQUIRED_FROM must carry the section

Usage:
    python3 tools/check_root_cause.py            # validate + coverage summary
    python3 tools/check_root_cause.py --list     # also list examples without the section
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
EXAMPLES = REPO / "examples"

REQUIRED_FROM = "2026-10"   # examples with a date prefix >= this must have the section

SOURCE_TYPES = {"operator", "government", "security-firm", "independent-researcher", "news"}
CONFIDENCE = {"confirmed", "corroborated", "reported", "disputed"}
REQUIRED = ("technique", "source", "source type", "confidence", "evidence")

SECTION_RE = re.compile(r"^## Root-cause evidence\s*$(.*?)(?=^## |\Z)", re.S | re.M)
FIELD_RE = re.compile(r"^- \*\*([A-Za-z -]+):\*\*\s*(.*)$")
URL_RE = re.compile(r"<(https?://[^>\s]+)>")
TECH_FIELD_RE = re.compile(r"\*\*OAK Techniques observed:\*\*(.*?)(?=\n\*\*|\n##|\Z)", re.S)
TAG_RE = re.compile(r"OAK-T\d+(?:\.\d+)*")
DATE_RE = re.compile(r"^(\d{4}-\d{2})")


def parse_entries(text: str) -> list[dict]:
    """Return one dict per entry: lower-cased field name -> value, plus
    'sources' (list of URLs) and 'raw_source' (the Source line as written)."""
    m = SECTION_RE.search(text)
    if not m:
        return []
    entries: list[dict] = []
    cur: dict | None = None
    for line in m.group(1).splitlines():
        fm = FIELD_RE.match(line.strip())
        if not fm:
            continue
        key, val = fm.group(1).strip().lower(), fm.group(2).strip()
        if key == "technique":
            cur = {}
            entries.append(cur)
        if cur is None:
            continue
        if key == "technique":
            tm = TAG_RE.search(val)
            val = tm.group(0) if tm else val
        if key == "source":
            cur["sources"] = URL_RE.findall(val)
            cur["raw_source"] = val
        cur[key] = val.lower() if key in ("source type", "confidence") else val
    return entries


def check_file(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8")
    errs: list[str] = []
    entries = parse_entries(text)
    has_section = bool(SECTION_RE.search(text))
    dm = DATE_RE.match(path.stem)
    if not has_section:
        if dm and dm.group(1) >= REQUIRED_FROM:
            errs.append(f"missing ## Root-cause evidence (required for examples dated {REQUIRED_FROM} or later)")
        return errs
    if not entries:
        return ["## Root-cause evidence present but has no '- **Technique:**' entry"]
    tf = TECH_FIELD_RE.search(text)
    declared = set(TAG_RE.findall(tf.group(1))) if tf else set()
    for i, e in enumerate(entries, 1):
        tag = f"entry {i}"
        for k in REQUIRED:
            if not e.get(k):
                errs.append(f"{tag}: missing **{k.capitalize()}:**")
        st, cf = e.get("source type", ""), e.get("confidence", "")
        if st and st not in SOURCE_TYPES:
            errs.append(f"{tag}: source type '{st}' not one of {sorted(SOURCE_TYPES)}")
        if cf and cf not in CONFIDENCE:
            errs.append(f"{tag}: confidence '{cf}' not one of {sorted(CONFIDENCE)}")
        srcs = e.get("sources", [])
        if e.get("source") and not srcs:
            errs.append(f"{tag}: Source must contain at least one <https://...> URL")
        tech = e.get("technique", "")
        if tech and declared and tech not in declared:
            errs.append(f"{tag}: Technique {tech} is not declared in **OAK Techniques observed:**")
        if cf == "confirmed" and st and st not in ("operator", "government"):
            errs.append(f"{tag}: confidence 'confirmed' requires source type operator or government (got '{st}')")
        if cf == "corroborated" and len(srcs) < 2:
            errs.append(f"{tag}: confidence 'corroborated' requires at least two sources")
    return errs


def main(argv: list[str]) -> int:
    files = sorted(EXAMPLES.glob("*.md"))
    failures = 0
    with_section, missing = 0, []
    by_conf: dict[str, int] = {}
    for p in files:
        errs = check_file(p)
        text = p.read_text(encoding="utf-8")
        if SECTION_RE.search(text):
            with_section += 1
            for e in parse_entries(text):
                by_conf[e.get("confidence", "?")] = by_conf.get(e.get("confidence", "?"), 0) + 1
        else:
            missing.append(p.name)
        if errs:
            failures += 1
            print(f"  {p.name}:")
            for e in errs:
                print(f"    - {e}")
    print(f"OAK root-cause evidence — {len(files)} examples")
    print(f"  with section : {with_section} ({with_section * 100 // max(len(files), 1)}%)")
    print(f"  by confidence: {dict(sorted(by_conf.items()))}")
    if "--list" in argv:
        print("  without section:")
        for n in missing:
            print(f"    {n}")
    if failures:
        print(f"FAIL: {failures} example(s) with root-cause evidence errors")
        return 1
    print("OK")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
