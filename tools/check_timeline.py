#!/usr/bin/env python3
"""
check_timeline.py — validate the `## Timeline` section of worked examples.

Why this exists: an example is only useful end to end if a reader can follow
the incident step by step — how the attacker got in, what they prepared, what
executed, where the money went, and what the response was — and see which OAK
Technique each step is. The month-end sweep of 2026-10-30 wrote 40-odd lean
examples without that table, and the Binance entry could not be read as a
sequence. This makes the table a build requirement for single incidents.

Format:

    ## Timeline (UTC)

    | When | Event | OAK ref |
    |---|---|---|
    | 2026-10-29 20:20 | One tx carries 50 7702 authorizations ... | **T13.004** |
    | 2026-10-29 21:01 | Tether freezes the receiver | response |

Rules for examples whose file name starts with YYYY-MM (single incidents).
They are hard failures for examples dated HARD_FROM or later and for any
example that has no timeline at all; older examples whose existing table
breaks a rule are reported as legacy (`--legacy` lists them) until the
backfill in ROADMAP clears them:
    - a `## Timeline` section exists, with a table whose header has an OAK column
    - at least 3 rows
    - every OAK-Tn.nnn in the OAK column is declared in **OAK Techniques observed:**
    - each Technique named in `## Root-cause evidence` appears in the OAK column
    - no shortened address or hash (`0xad99…298b`) anywhere in the file, unless
      the same line says the full value was "not published"
A step whose detail is not public stays in the table and says "undisclosed";
it is not left out. Addresses are public evidence: write them in full.

Warning only: no row covers where the funds went (an OAK-T7 ref, or a row that
says the funds were frozen / held / returned / not moved).

Usage:
    python3 tools/check_timeline.py           # validate (exit 1 on hard failures)
    python3 tools/check_timeline.py --warn    # also print fund-flow warnings
    python3 tools/check_timeline.py --file <path>   # one file (hook mode)
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
EXAMPLES = REPO / "examples"

HARD_FROM = "2026-09"

SINGLE_INCIDENT_RE = re.compile(r"^\d{4}-\d{2}-")
SECTION_RE = re.compile(r"^## Timeline[^\n]*$(.*?)(?=^## |\Z)", re.S | re.M)
TECH_FIELD_RE = re.compile(r"\*\*OAK Techniques observed:\*\*(.*?)(?=\n\*\*|\n##|\Z)", re.S)
ROOT_CAUSE_RE = re.compile(r"^## Root-cause evidence\s*$(.*?)(?=^## |\Z)", re.S | re.M)
RC_TECH_RE = re.compile(r"^- \*\*Technique:\*\*\s*(OAK-T\d+(?:\.\d+)*)", re.M)
TAG_RE = re.compile(r"(?:OAK-)?(T\d+\.\d{3}(?:\.\d{3})?)")
TRUNC_RE = re.compile(r"\b(?:0x)?[0-9a-fA-F]{3,12}(?:…|\.\.\.)[0-9a-fA-F]{2,12}\b")
FUNDS_RE = re.compile(r"\bT7\.\d{3}|frozen|freez|held|returned|not moved|unmoved|launder|bridged|swapped|mixer|tornado", re.I)


def table_rows(section: str) -> tuple[list[str], list[list[str]]]:
    lines = [l.strip() for l in section.splitlines() if l.strip().startswith("|")]
    if len(lines) < 2:
        return [], []
    split = lambda l: [c.strip() for c in l.strip("|").split("|")]
    header = [h.lower() for h in split(lines[0])]
    rows = [split(l) for l in lines[2:] if not re.fullmatch(r"\|?[\s:|-]+\|?", l)]
    return header, rows


def check_file(path: Path) -> tuple[list[str], list[str]]:
    text = path.read_text(encoding="utf-8")
    errs: list[str] = []
    warns: list[str] = []
    for n, line in enumerate(text.splitlines(), 1):
        if TRUNC_RE.search(line) and "not published" not in line:
            errs.append(f"line {n}: shortened address/hash {TRUNC_RE.search(line).group(0)} — write it in full")
            break
    m = SECTION_RE.search(text)
    if not m:
        return errs + ["missing ## Timeline (required for single-incident examples)"], []
    header, rows = table_rows(m.group(1))
    oak_col = next((i for i, h in enumerate(header) if "oak" in h), None)
    if oak_col is None:
        return errs + ["## Timeline table has no OAK column"], []
    if len(rows) < 3:
        errs.append(f"## Timeline has {len(rows)} row(s); at least 3 required")
    tf = TECH_FIELD_RE.search(text)
    declared = {f"OAK-{t}" for t in TAG_RE.findall(tf.group(1))} if tf else set()
    in_table = set()
    for r in rows:
        cell = r[oak_col] if oak_col < len(r) else ""
        in_table |= {f"OAK-{t}" for t in TAG_RE.findall(cell)}
    undeclared = sorted(t for t in in_table if declared and t not in declared)
    if undeclared:
        errs.append(f"## Timeline references Technique(s) not declared in **OAK Techniques observed:**: {', '.join(undeclared)}")
    rc = ROOT_CAUSE_RE.search(text)
    if rc:
        for t in RC_TECH_RE.findall(rc.group(1)):
            if t not in in_table:
                errs.append(f"root-cause Technique {t} does not appear in the ## Timeline OAK column")
    if not any(FUNDS_RE.search(" ".join(r)) for r in rows):
        warns.append("no ## Timeline row says where the funds went (T7 ref, or frozen / held / returned / not moved)")
    return errs, warns


def main(argv: list[str]) -> int:
    if "--file" in argv:
        one = Path(argv[argv.index("--file") + 1])
        files = [one] if SINGLE_INCIDENT_RE.match(one.name) else []
    else:
        files = sorted(p for p in EXAMPLES.glob("*.md") if SINGLE_INCIDENT_RE.match(p.name))
    failures = 0
    warned = 0
    legacy: list[str] = []
    for p in files:
        errs, warns = check_file(p)
        hard = p.name[:7] >= HARD_FROM or any(e.startswith("missing ## Timeline") for e in errs)
        if errs and not hard:
            legacy.append(f"  {p.name}: " + "; ".join(errs))
            errs = []
        if errs:
            failures += 1
            print(f"  {p.name}:")
            for e in errs:
                print(f"    - {e}")
        if warns:
            warned += 1
            if "--warn" in argv:
                print(f"  {p.name}: (warning) {warns[0]}")
    if "--legacy" in argv:
        print("\n".join(legacy))
    print(f"OAK timelines — {len(files)} single-incident examples; {failures} failing; "
          f"{len(legacy)} legacy (pre-{HARD_FROM}) tables to fix; {warned} without a fund-flow row")
    if failures:
        print(f"FAIL: {failures} example(s) with timeline errors")
        return 1
    print("OK")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
