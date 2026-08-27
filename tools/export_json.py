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
         "class": "detection|architecture|operational|venue|wallet-ux|user-behavioural",
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
      "groups": [
        {"id": "OAK-Gnn", "name": "...", "aliases": [...],
         "attribution_status": "...", "first_observed": "...", "active": "...",
         "source_file": "..."}
      ],
      "data_sources": [
        {"id": "OAK-DS-nn", "name": "...", "layer": "...", "chains": [...],
         "access_path": "...", "source_file": "..."}
      ],
      "examples": [
        {"id": "<slug>", "file": "<slug>.md", "title": "...",
         "date_prefix": "YYYY-MM", "techniques": ["OAK-Tn.NNN", ...],
         "attribution": "confirmed|inferred-strong|inferred-weak|pseudonymous|unattributed",
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
    python tools/export_json.py [--out tools/oak.json] [--version 0.7.0]

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

# --- groups (threat actors) ----------------------------------------------
GROUP_ID_RE = re.compile(r"^# (OAK-G\d+) — (.+?)$", re.MULTILINE)
ATTR_STATUS_RE = re.compile(r"^\*\*Attribution status:\*\*\s*(.+?)$", re.MULTILINE)
FIRST_OBSERVED_CRYPTO_RE = re.compile(
    r"^\*\*First observed in crypto:\*\*\s*(.+?)$", re.MULTILINE
)

# --- data sources --------------------------------------------------------
DATASOURCE_ID_RE = re.compile(r"^# (OAK-DS-\d+) — (.+?)$", re.MULTILINE)
LAYER_RE = re.compile(r"^\*\*Layer:\*\*\s*(.+?)$", re.MULTILINE)
ACCESS_PATH_RE = re.compile(r"^\*\*Typical access path:\*\*\s*(.+?)$", re.MULTILINE)

# --- examples ------------------------------------------------------------
EXAMPLE_H1_RE = re.compile(r"^#\s+(.+?)\s*$", re.MULTILINE)
# Same field semantics as tools/check_tags.py so the export cannot disagree
# with the validator about what an example declares.
EXAMPLE_FIELD_RE = re.compile(
    r"\*\*OAK Techniques observed:\*\*(.*?)(?=\n\*\*|\n##|\Z)", re.S
)
EXAMPLE_TAG_RE = re.compile(r"OAK-(T\d+(?:\.\d+)*)")
# The attribution block, then the first strength label inside it. Scanning the
# whole block rather than the first few characters matters: cohort examples
# open with "**mixed** (per-case strength labels follow)" and then list the
# per-case labels, which a prefix-anchored pattern misses entirely.
EXAMPLE_ATTR_BLOCK_RE = re.compile(
    r"\*\*Attribution:\*\*(.*?)(?=\n\*\*|\n##|\Z)", re.S
)
EXAMPLE_ATTR_RE = re.compile(
    r"\*\*(mixed|confirmed|inferred-strong|inferred-weak|pseudonymous|unattributed)\b",
    re.I,
)
EXAMPLE_DATE_RE = re.compile(r"^(\d{4}(?:-\d{2})?)")

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
class Group:
    id: str
    name: str
    aliases: list[str] = field(default_factory=list)
    attribution_status: str = ""
    first_observed: str = ""
    active: str = ""
    source_file: str = ""


@dataclass
class DataSource:
    id: str
    name: str
    layer: str = ""
    chains: list[str] = field(default_factory=list)
    access_path: str = ""
    source_file: str = ""


@dataclass
class Example:
    id: str
    file: str
    title: str = ""
    date_prefix: str = ""
    techniques: list[str] = field(default_factory=list)
    attribution: str = ""
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


def parse_group(path: Path) -> Group:
    text = path.read_text(encoding="utf-8")
    m = GROUP_ID_RE.search(text)
    if not m:
        raise ValueError(f"{path}: cannot find group id header (`# OAK-Gnn — Name`)")
    g = Group(id=m.group(1), name=m.group(2).strip(), source_file=str(path))
    if (ma := ALIASES_RE.search(text)):
        g.aliases = [a.strip(' "') for a in _split_csv_with_parens(ma.group(1))]
    if (mas := ATTR_STATUS_RE.search(text)):
        g.attribution_status = mas.group(1).strip()
    if (mf := FIRST_OBSERVED_CRYPTO_RE.search(text)):
        g.first_observed = mf.group(1).strip()
    if (mac := ACTIVE_RE.search(text)):
        g.active = mac.group(1).strip()
    return g


def parse_data_source(path: Path) -> DataSource:
    text = path.read_text(encoding="utf-8")
    m = DATASOURCE_ID_RE.search(text)
    if not m:
        raise ValueError(
            f"{path}: cannot find data-source id header (`# OAK-DS-nn — Name`)"
        )
    ds = DataSource(id=m.group(1), name=m.group(2).strip(), source_file=str(path))
    if (ml := LAYER_RE.search(text)):
        ds.layer = ml.group(1).strip()
    if (mc := CHAINS_RE.search(text)):
        ds.chains = [c.strip() for c in _split_csv_with_parens(mc.group(1))]
    if (mp := ACCESS_PATH_RE.search(text)):
        ds.access_path = mp.group(1).strip()
    return ds


def parse_example(path: Path) -> Example:
    """Parse a worked example into its export shape.

    Structural validity is enforced by tools/check_linkage.py, so this is
    deliberately forgiving: a malformed example degrades to empty metadata
    rather than failing the whole export and taking the site build with it.
    """
    text = path.read_text(encoding="utf-8")
    ex = Example(
        id=path.stem,
        file=path.name,
        source_file=str(path),
    )
    if (mh := EXAMPLE_H1_RE.search(text)):
        ex.title = mh.group(1).strip()
    if (md := EXAMPLE_DATE_RE.match(path.stem)):
        ex.date_prefix = md.group(1)
    if (mf := EXAMPLE_FIELD_RE.search(text)):
        ex.techniques = sorted(
            {f"OAK-{tag}" for tag in EXAMPLE_TAG_RE.findall(mf.group(1))}
        )
    if (mb := EXAMPLE_ATTR_BLOCK_RE.search(text)):
        if (ma := EXAMPLE_ATTR_RE.search(mb.group(1))):
            ex.attribution = ma.group(1).lower()
    return ex


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", default="tools/oak.json", type=Path)
    parser.add_argument("--version", default="0.7.0")
    parser.add_argument("--root", default=".", type=Path)
    args = parser.parse_args(argv)

    root = args.root.resolve()
    tactics_dir = root / "tactics"
    techniques_dir = root / "techniques"
    mitigations_dir = root / "mitigations"
    software_dir = root / "software"
    examples_dir = root / "examples"
    actors_dir = root / "actors"
    data_sources_dir = root / "data-sources"

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

    # Each Technique has one canonical home Tactic — derived from its
    # filename prefix (T1.001 → OAK-T1). The full parent_tactics list
    # stays available on the Technique itself for cross-reference UI;
    # the matrix view consumes tactic.techniques and now only shows the
    # Technique under its single home Tactic, not in every cross-listed
    # column. Cross-listings produced 27 visible duplicates in v0.6.
    by_tactic: dict[str, list[str]] = {}
    for t in techniques:
        m = re.match(r"OAK-(T\d+)\.", t.id)
        home_tactic = f"OAK-{m.group(1)}" if m else (t.parent_tactics[0] if t.parent_tactics else "")
        if home_tactic:
            by_tactic.setdefault(home_tactic, []).append(t.id)
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

    groups: list[Group] = []
    if actors_dir.is_dir():
        for p in sorted(actors_dir.glob("OAK-G*.md")):
            try:
                groups.append(parse_group(p))
            except Exception as exc:
                print(f"ERROR parsing {p}: {exc}", file=sys.stderr)
                return 1

    data_sources: list[DataSource] = []
    if data_sources_dir.is_dir():
        for p in sorted(data_sources_dir.glob("OAK-DS-*.md")):
            try:
                data_sources.append(parse_data_source(p))
            except Exception as exc:
                print(f"ERROR parsing {p}: {exc}", file=sys.stderr)
                return 1

    examples: list[Example] = []
    if examples_dir.is_dir():
        for p in sorted(examples_dir.glob("*.md")):
            try:
                examples.append(parse_example(p))
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

    # source_file is emitted repo-relative. Absolute paths made the published
    # export depend on where it was built (a local checkout vs. the CI runner's
    # /home/runner/work/... tree), which is noise for consumers and makes two
    # builds of identical content differ. Consumers already accept relative
    # paths: scripts/build-route-pages.mjs resolves either form.
    for entity in (
        *tactics, *techniques, *mitigations, *software,
        *groups, *data_sources, *examples,
    ):
        if entity.source_file:
            try:
                entity.source_file = str(Path(entity.source_file).relative_to(root))
            except ValueError:
                pass

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
        "groups": [g.__dict__ for g in groups],
        "data_sources": [d.__dict__ for d in data_sources],
        "examples": [e.__dict__ for e in examples],
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
        f"{len(groups)} groups, {len(data_sources)} data sources, "
        f"{len(examples)} examples, {len(relationships)} relationships."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
