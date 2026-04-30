#!/usr/bin/env python3
"""
export_json.py — serialize OAK Tactics, Techniques, Mitigations, Software,
Groups, and Data Sources to a single machine-readable JSON document, with
explicit relationship edges.

Output schema (v2):

    {
      "schema_version": "2",
      "oak_version": "<version string>",
      "generated_at": "<ISO-8601>",
      "tactics": [...],
      "techniques": [...],
      "mitigations": [
        {"id": "OAK-MNN", "name": "...",
         "class": "detection|architecture|operational|venue|wallet-ux",
         "audience": ["...", ...],
         "maps_to_techniques": ["OAK-Tn.NNN", ...],
         "citations": [...],
         "source_file": "..."}
      ],
      "software": [
        {"id": "OAK-SNN", "name": "...", "type": "...",
         "aliases": [...], "active": "...", "first_observed": "...",
         "host_platforms": [...],
         "used_by_groups": ["OAK-Gnn", ...],
         "observed_techniques": ["OAK-Tn.NNN", ...],
         "citations": [...],
         "source_file": "..."}
      ],
      "relationships": [
        {"type": "mitigates",  "source": "OAK-MNN",  "target": "OAK-Tn.NNN"},
        {"type": "uses",       "source": "OAK-SNN",  "target": "OAK-Tn.NNN"},
        {"type": "uses",       "source": "OAK-Gnn",  "target": "OAK-SNN"},
        ...
      ]
    }

Tactics, Techniques retain v1 shape under v2 to preserve consumer compat.

Usage:
    python tools/export_json.py [--out tools/oak.json] [--version 0.1.0-draft]

Exits non-zero on any parse error so it can be wired into CI.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

TACTIC_ID_RE = re.compile(r"^# (OAK-T\d+) — (.+?)$", re.MULTILINE)
TECHNIQUE_ID_RE = re.compile(r"^# (OAK-T\d+\.\d{3}(?:\.\d{3})?) — (.+?)$", re.MULTILINE)
MITIGATION_ID_RE = re.compile(r"^# (OAK-M\d+) — (.+?)$", re.MULTILINE)
SOFTWARE_ID_RE = re.compile(r"^# (OAK-S\d+) — (.+?)$", re.MULTILINE)

PHASE_RE = re.compile(r"^\*\*Phase:\*\*\s*(.+?)$", re.MULTILINE)
ADJACENT_RE = re.compile(r"^\*\*Adjacent tactics:\*\*\s*(.+?)$", re.MULTILINE)
PARENTS_RE = re.compile(r"^\*\*Parent Tactics:\*\*\s*(.+?)$", re.MULTILINE)
MATURITY_RE = re.compile(r"^\*\*Maturity:\*\*\s*(.+?)$", re.MULTILINE)
CHAINS_RE = re.compile(r"^\*\*Chains:\*\*\s*(.+?)$", re.MULTILINE)
FIRST_DOC_RE = re.compile(r"^\*\*First documented:\*\*\s*(.+?)$", re.MULTILINE)
ALIASES_RE = re.compile(r"^\*\*Aliases:\*\*\s*(.+?)$", re.MULTILINE)

# Mitigation-specific
CLASS_RE = re.compile(r"^\*\*Class:\*\*\s*(.+?)$", re.MULTILINE)
AUDIENCE_RE = re.compile(r"^\*\*Audience:\*\*\s*(.+?)$", re.MULTILINE)
MAPS_TO_RE = re.compile(r"^\*\*Maps to Techniques:\*\*\s*(.+?)$", re.MULTILINE)

# Software-specific
TYPE_RE = re.compile(r"^\*\*Type:\*\*\s*(.+?)$", re.MULTILINE)
ACTIVE_RE = re.compile(r"^\*\*Active:\*\*\s*(.+?)$", re.MULTILINE)
FIRST_OBSERVED_RE = re.compile(r"^\*\*First observed:\*\*\s*(.+?)$", re.MULTILINE)
USED_BY_GROUPS_RE = re.compile(r"^\*\*Used by Groups:\*\*\s*(.+?)$", re.MULTILINE)
HOST_PLATFORMS_RE = re.compile(r"^\*\*Host platforms:\*\*\s*(.+?)$", re.MULTILINE)
OBSERVED_TECHNIQUES_RE = re.compile(r"^\*\*Observed Techniques:\*\*\s*(.+?)$", re.MULTILINE)

CITATION_KEY_RE = re.compile(r"`\[([a-z][a-z0-9_]{4,})\]`")
TACTIC_REF_IN_TEXT_RE = re.compile(r"OAK-T\d+(?!\.\d)")
TECHNIQUE_REF_IN_TEXT_RE = re.compile(r"(?:OAK-)?T\d+\.\d{3}(?:\.\d{3})?")
GROUP_REF_IN_TEXT_RE = re.compile(r"OAK-G\d+")


@dataclass
class Tactic:
    id: str
    name: str
    phase: str = ""
    adjacent_tactics: list[str] = field(default_factory=list)
    techniques: list[str] = field(default_factory=list)
    source_file: str = ""


@dataclass
class Technique:
    id: str
    name: str
    parent_tactics: list[str] = field(default_factory=list)
    maturity: str = ""
    chains: list[str] = field(default_factory=list)
    first_documented: str = ""
    aliases: list[str] = field(default_factory=list)
    citations: list[str] = field(default_factory=list)
    source_file: str = ""


@dataclass
class Mitigation:
    id: str
    name: str
    klass: str = ""
    audience: list[str] = field(default_factory=list)
    maps_to_techniques: list[str] = field(default_factory=list)
    citations: list[str] = field(default_factory=list)
    source_file: str = ""


@dataclass
class Software:
    id: str
    name: str
    type: str = ""
    aliases: list[str] = field(default_factory=list)
    active: str = ""
    first_observed: str = ""
    host_platforms: list[str] = field(default_factory=list)
    used_by_groups: list[str] = field(default_factory=list)
    observed_techniques: list[str] = field(default_factory=list)
    citations: list[str] = field(default_factory=list)
    source_file: str = ""


def _split_csv_with_parens(s: str) -> list[str]:
    """Split a comma-separated string, ignoring commas inside parentheses."""
    parts, buf, depth = [], [], 0
    for ch in s:
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth = max(0, depth - 1)
        if ch == "," and depth == 0:
            parts.append("".join(buf).strip())
            buf = []
        else:
            buf.append(ch)
    if buf:
        parts.append("".join(buf).strip())
    return [p for p in parts if p]


def _norm_t_id(raw: str) -> str:
    """Normalize a Technique ref to canonical OAK-Tn.NNN form."""
    raw = raw.strip()
    return raw if raw.startswith("OAK-") else f"OAK-{raw}"


def _extract_tactic_ids(text: str) -> list[str]:
    return TACTIC_REF_IN_TEXT_RE.findall(text)


def _extract_technique_ids(text: str) -> list[str]:
    seen = []
    for m in TECHNIQUE_REF_IN_TEXT_RE.findall(text):
        nid = _norm_t_id(m)
        if nid not in seen:
            seen.append(nid)
    return seen


def _extract_group_ids(text: str) -> list[str]:
    seen = []
    for m in GROUP_REF_IN_TEXT_RE.findall(text):
        if m not in seen:
            seen.append(m)
    return seen


def _section_citations(text: str, section_header: str = "## Citations") -> list[str]:
    parts = text.split(section_header, 1)
    if len(parts) != 2:
        return []
    head = parts[1].split("\n## ", 1)[0]
    return sorted(set(CITATION_KEY_RE.findall(head)))


def parse_tactic(path: Path) -> Tactic:
    text = path.read_text(encoding="utf-8")
    m = TACTIC_ID_RE.search(text)
    if not m:
        raise ValueError(f"{path}: cannot find tactic id header (`# OAK-Tn — Name`)")
    tac = Tactic(id=m.group(1), name=m.group(2).strip(), source_file=str(path))
    if (mp := PHASE_RE.search(text)):
        tac.phase = mp.group(1).strip()
    if (ma := ADJACENT_RE.search(text)):
        tac.adjacent_tactics = _extract_tactic_ids(ma.group(1))
    return tac


def parse_technique(path: Path) -> Technique:
    text = path.read_text(encoding="utf-8")
    m = TECHNIQUE_ID_RE.search(text)
    if not m:
        raise ValueError(
            f"{path}: cannot find technique id header (`# OAK-Tn.NNN — Name`)"
        )
    t = Technique(id=m.group(1), name=m.group(2).strip(), source_file=str(path))
    if (mp := PARENTS_RE.search(text)):
        t.parent_tactics = _extract_tactic_ids(mp.group(1))
    if (mm := MATURITY_RE.search(text)):
        t.maturity = mm.group(1).strip().split()[0]
    if (mc := CHAINS_RE.search(text)):
        t.chains = [c.strip() for c in _split_csv_with_parens(mc.group(1))]
    if (mf := FIRST_DOC_RE.search(text)):
        t.first_documented = mf.group(1).strip()
    if (ma := ALIASES_RE.search(text)):
        raw = ma.group(1).strip()
        t.aliases = [a.strip(' "') for a in _split_csv_with_parens(raw)]
    t.citations = _section_citations(text)
    return t


def parse_mitigation(path: Path) -> Mitigation:
    text = path.read_text(encoding="utf-8")
    m = MITIGATION_ID_RE.search(text)
    if not m:
        raise ValueError(f"{path}: cannot find mitigation id header (`# OAK-MNN — Name`)")
    mit = Mitigation(id=m.group(1), name=m.group(2).strip(), source_file=str(path))
    if (mc := CLASS_RE.search(text)):
        mit.klass = mc.group(1).strip()
    if (ma := AUDIENCE_RE.search(text)):
        mit.audience = [a.strip() for a in _split_csv_with_parens(ma.group(1))]
    if (mt := MAPS_TO_RE.search(text)):
        mit.maps_to_techniques = _extract_technique_ids(mt.group(1))
    mit.citations = _section_citations(text)
    return mit


def parse_software(path: Path) -> Software:
    text = path.read_text(encoding="utf-8")
    m = SOFTWARE_ID_RE.search(text)
    if not m:
        raise ValueError(f"{path}: cannot find software id header (`# OAK-SNN — Name`)")
    sw = Software(id=m.group(1), name=m.group(2).strip(), source_file=str(path))
    if (mt := TYPE_RE.search(text)):
        sw.type = mt.group(1).strip()
    if (ma := ALIASES_RE.search(text)):
        sw.aliases = [a.strip(' "') for a in _split_csv_with_parens(ma.group(1))]
    if (mac := ACTIVE_RE.search(text)):
        sw.active = mac.group(1).strip()
    if (mfo := FIRST_OBSERVED_RE.search(text)):
        sw.first_observed = mfo.group(1).strip()
    if (mhp := HOST_PLATFORMS_RE.search(text)):
        sw.host_platforms = [p.strip() for p in _split_csv_with_parens(mhp.group(1))]
    if (mug := USED_BY_GROUPS_RE.search(text)):
        sw.used_by_groups = _extract_group_ids(mug.group(1))
    if (mot := OBSERVED_TECHNIQUES_RE.search(text)):
        sw.observed_techniques = _extract_technique_ids(mot.group(1))
    sw.citations = _section_citations(text)
    return sw


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", default="tools/oak.json", type=Path)
    parser.add_argument("--version", default="0.1.0-draft")
    parser.add_argument("--root", default=".", type=Path)
    args = parser.parse_args(argv)

    root = args.root.resolve()
    tactics_dir = root / "tactics"
    techniques_dir = root / "techniques"
    mitigations_dir = root / "mitigations"
    software_dir = root / "software"

    if not tactics_dir.is_dir() or not techniques_dir.is_dir():
        print(f"ERROR: {tactics_dir} or {techniques_dir} missing", file=sys.stderr)
        return 1

    tactics: list[Tactic] = []
    for p in sorted(tactics_dir.glob("T*-*.md")):
        try:
            tactics.append(parse_tactic(p))
        except Exception as exc:
            print(f"ERROR parsing {p}: {exc}", file=sys.stderr)
            return 1

    techniques: list[Technique] = []
    for p in sorted(techniques_dir.glob("T*.md")):
        try:
            techniques.append(parse_technique(p))
        except Exception as exc:
            print(f"ERROR parsing {p}: {exc}", file=sys.stderr)
            return 1

    by_tactic: dict[str, list[str]] = {}
    for t in techniques:
        for parent in t.parent_tactics:
            by_tactic.setdefault(parent, []).append(t.id)
    for tac in tactics:
        tac.techniques = sorted(by_tactic.get(tac.id, []))

    mitigations: list[Mitigation] = []
    if mitigations_dir.is_dir():
        for p in sorted(mitigations_dir.glob("OAK-M*.md")):
            try:
                mitigations.append(parse_mitigation(p))
            except Exception as exc:
                print(f"ERROR parsing {p}: {exc}", file=sys.stderr)
                return 1

    software: list[Software] = []
    if software_dir.is_dir():
        for p in sorted(software_dir.glob("OAK-S*.md")):
            try:
                software.append(parse_software(p))
            except Exception as exc:
                print(f"ERROR parsing {p}: {exc}", file=sys.stderr)
                return 1

    relationships: list[dict[str, str]] = []
    for m in mitigations:
        for tid in m.maps_to_techniques:
            relationships.append({"type": "mitigates", "source": m.id, "target": tid})
    for s in software:
        for tid in s.observed_techniques:
            relationships.append({"type": "uses", "source": s.id, "target": tid})
        for gid in s.used_by_groups:
            relationships.append({"type": "uses", "source": gid, "target": s.id})

    document = {
        "schema_version": "2",
        "oak_version": args.version,
        "generated_at": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        "tactics": [tac.__dict__ for tac in tactics],
        "techniques": [t.__dict__ for t in techniques],
        "mitigations": [
            {
                "id": m.id,
                "name": m.name,
                "class": m.klass,
                "audience": m.audience,
                "maps_to_techniques": m.maps_to_techniques,
                "citations": m.citations,
                "source_file": m.source_file,
            }
            for m in mitigations
        ],
        "software": [s.__dict__ for s in software],
        "relationships": relationships,
    }

    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(
        json.dumps(document, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(
        f"OK: wrote {args.out} — {len(tactics)} tactics, {len(techniques)} techniques, "
        f"{len(mitigations)} mitigations, {len(software)} software, "
        f"{len(relationships)} relationships."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
