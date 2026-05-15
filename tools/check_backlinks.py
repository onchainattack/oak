#!/usr/bin/env python3
"""
check_backlinks.py — validate reverse references and bidirectional consistency
between worked examples and the taxonomy entries that classify them.

Forward references (example -> Technique / Actor / Mitigation / Software) are
checked by tools/check_linkage.py. This script checks the other direction:

  1. Technique -> Example anchors: each technique file should list at least one
     canonical worked example in its `## Real-world examples` section, OR
     explicitly mark "no public anchor at v0.x".
  2. Actor -> Example anchors: each actor file should list at least one
     attributed incident in its `## Observed Examples` section, OR mark "no
     public incidents at v0.x".
  3. Actor bidirectional: if an example references OAK-Gnn, the actor file's
     `## Observed Examples` section must reference that example's path.
  4. Technique bidirectional (soft): warn when an example references a
     technique whose `## Real-world examples` section does not link back.
     This is a warning rather than a hard fail because not every example is
     a canonical anchor for every technique it touches.
  5. Mitigation metadata: each mitigation file's `**Maps to Techniques:**`
     line should resolve to real techniques (or candidates from TAXONOMY-GAPS).
  6. Software metadata: each software file's `**Used by Groups:**` and
     `**Observed Techniques:**` lines should resolve.

Usage:
    python3 tools/check_backlinks.py [--quiet] [--strict-techniques]

Default mode treats technique-bidirectional as a warning. With
--strict-techniques every technique reference produces a hard failure if not
back-linked.

Exit codes:
    0 — all hard checks pass
    1 — at least one hard defect found (orphan actor backlink, missing actor
        observed examples, broken mitigation/software metadata)
"""

from __future__ import annotations

import re
import sys
from collections import defaultdict
from pathlib import Path

from common import (
    REPO,
    TECHNIQUE_REF_RE,
    ACTOR_REF_RE,
    EXAMPLE_REF_RE,
    ATTRIBUTION_HEADER_RE,
    ACTOR_LINK_RE,
    ATTRIBUTION_NEGATION_RE,
    MAPS_TO_RE,
    section_body,
    has_no_anchor_marker,
    collect_oak_refs,
    collect_example_refs,
    build_inventory,
    parse_taxonomy_gaps_candidates,
    technique_id_from_filename,
    actor_id_from_filename,
    mitigation_id_from_filename,
)

SOFTWARE_REF_RE = re.compile(r"\bOAK-S\d{2}\b")
USED_BY_GROUPS_RE = re.compile(r"^\*\*Used by Groups:\*\*\s*(.+?)$", re.MULTILINE)
OBSERVED_TECH_RE = re.compile(
    r"^\*\*Observed Techniques:\*\*\s*(.+?)$", re.MULTILINE
)


def software_id_from_filename(filename: str) -> str | None:
    m = re.match(r"^(OAK-S\d{2})", filename)
    return m.group(1) if m else None


def main() -> int:
    args = sys.argv[1:]
    quiet = "--quiet" in args
    strict_tech = "--strict-techniques" in args

    inv = build_inventory()
    candidates = parse_taxonomy_gaps_candidates()[0]
    valid_techniques = inv["techniques"] | candidates

    examples_dir = REPO / "examples"
    examples = sorted(examples_dir.glob("*.md"))
    examples = [e for e in examples if e.name.lower() != "readme.md"]

    example_actors: dict[str, set[str]] = {}
    example_techniques: dict[str, set[str]] = {}

    for ex in examples:
        text = ex.read_text(encoding="utf-8")
        rel = f"examples/{ex.name}"
        attribution_actors: set[str] = set()
        for m in ATTRIBUTION_HEADER_RE.finditer(text):
            line = m.group(1)
            if ATTRIBUTION_NEGATION_RE.search(line):
                continue
            attribution_actors |= set(ACTOR_REF_RE.findall(line))
        attribution_actors |= set(ACTOR_LINK_RE.findall(text))
        example_actors[rel] = attribution_actors
        example_techniques[rel] = collect_oak_refs(text, TECHNIQUE_REF_RE)

    actor_attributed_in: dict[str, set[str]] = defaultdict(set)
    for ex_path, actors in example_actors.items():
        for a in actors:
            actor_attributed_in[a].add(ex_path)

    technique_referenced_in: dict[str, set[str]] = defaultdict(set)
    for ex_path, techs in example_techniques.items():
        for t in techs:
            technique_referenced_in[t].add(ex_path)

    actor_observed: dict[str, set[str]] = {}
    actor_no_anchor: dict[str, bool] = {}
    for f in sorted((REPO / "actors").glob("OAK-G*.md")):
        aid = actor_id_from_filename(f.name)
        if not aid:
            continue
        text = f.read_text(encoding="utf-8")
        body = section_body(text, "Observed Examples")
        if body is None:
            actor_observed[aid] = set()
            actor_no_anchor[aid] = False
        else:
            actor_observed[aid] = collect_example_refs(body)
            actor_no_anchor[aid] = has_no_anchor_marker(body)

    tech_examples: dict[str, set[str]] = {}
    tech_no_anchor: dict[str, bool] = {}
    for f in sorted((REPO / "techniques").glob("T*.md")):
        tid = technique_id_from_filename(f.name)
        if not tid:
            continue
        text = f.read_text(encoding="utf-8")
        body = section_body(text, "Real-world examples")
        if body is None:
            tech_examples[tid] = set()
            tech_no_anchor[tid] = False
        else:
            tech_examples[tid] = collect_example_refs(body)
            tech_no_anchor[tid] = has_no_anchor_marker(body)

    mitigation_maps: dict[str, set[str]] = {}
    for f in sorted((REPO / "mitigations").glob("OAK-M*.md")):
        mid = mitigation_id_from_filename(f.name)
        if not mid:
            continue
        text = f.read_text(encoding="utf-8")
        m = MAPS_TO_RE.search(text)
        if m:
            mitigation_maps[mid] = collect_oak_refs(m.group(1), TECHNIQUE_REF_RE)
        else:
            mitigation_maps[mid] = set()

    software_groups: dict[str, set[str]] = {}
    software_techs: dict[str, set[str]] = {}
    for f in sorted((REPO / "software").glob("OAK-S*.md")):
        sid = software_id_from_filename(f.name)
        if not sid:
            continue
        text = f.read_text(encoding="utf-8")
        gm = USED_BY_GROUPS_RE.search(text)
        software_groups[sid] = (
            collect_oak_refs(gm.group(1), ACTOR_REF_RE) if gm else set()
        )
        tm = OBSERVED_TECH_RE.search(text)
        software_techs[sid] = (
            collect_oak_refs(tm.group(1), TECHNIQUE_REF_RE) if tm else set()
        )

    # ----- Reporting -----
    print(
        f"OAK backlink check — {len(examples)} examples, {len(inv['techniques'])} "
        f"techniques, {len(inv['actors'])} actors, {len(inv['mitigations'])} "
        f"mitigations, {len(inv['software'])} software"
    )
    print()

    hard_fail = 0
    warnings = 0

    # 1. Actor anchor + bidirectional
    actor_problems: list[str] = []
    for aid in sorted(inv["actors"]):
        listed = actor_observed.get(aid, set())
        attributed = actor_attributed_in.get(aid, set())
        no_anchor = actor_no_anchor.get(aid, False)

        if not listed and not no_anchor and attributed:
            actor_problems.append(
                f"{aid}: ## Observed Examples is empty but examples attribute "
                f"this actor: {sorted(attributed)}"
            )
            hard_fail += 1
        elif not listed and not no_anchor and not attributed:
            actor_problems.append(
                f"{aid}: ## Observed Examples is empty and no examples attribute "
                f"this actor (consider adding 'no public incidents at v0.x' marker)"
            )
            warnings += 1

        missing_backlinks = sorted(attributed - listed)
        if missing_backlinks and not no_anchor:
            for path in missing_backlinks:
                actor_problems.append(
                    f"{aid}: example {path} attributes this actor but is not "
                    f"listed in ## Observed Examples"
                )
                hard_fail += 1

        missing_forward = sorted(listed - attributed)
        for path in missing_forward:
            ex_file = REPO / path
            if not ex_file.exists():
                actor_problems.append(
                    f"{aid}: ## Observed Examples lists {path} but file does not exist"
                )
                hard_fail += 1
            else:
                actor_problems.append(
                    f"{aid}: ## Observed Examples lists {path} but example body "
                    f"does not reference {aid}"
                )
                warnings += 1

    if actor_problems:
        print(f"ACTOR BACKLINK ISSUES — {len(actor_problems)}:")
        for p in actor_problems:
            print(f"  {p}")
        print()

    # 2. Technique anchor (and optional bidirectional in strict mode)
    tech_problems: list[str] = []
    for tid in sorted(inv["techniques"]):
        listed = tech_examples.get(tid, set())
        referenced = technique_referenced_in.get(tid, set())
        no_anchor = tech_no_anchor.get(tid, False)

        if not listed and not no_anchor:
            if referenced:
                tech_problems.append(
                    f"{tid}: ## Real-world examples is empty but {len(referenced)} "
                    f"example(s) reference this technique (e.g. "
                    f"{sorted(referenced)[0]})"
                )
                hard_fail += 1
            else:
                tech_problems.append(
                    f"{tid}: ## Real-world examples is empty and no example "
                    f"references this technique"
                )
                warnings += 1

        if strict_tech:
            missing = sorted(referenced - listed)
            for path in missing:
                tech_problems.append(
                    f"{tid}: example {path} references this technique but is "
                    f"not listed in ## Real-world examples"
                )
                hard_fail += 1

        for path in sorted(listed):
            if not (REPO / path).exists():
                tech_problems.append(
                    f"{tid}: ## Real-world examples lists {path} but file does not exist"
                )
                hard_fail += 1

    if tech_problems:
        print(f"TECHNIQUE BACKLINK ISSUES — {len(tech_problems)}:")
        for p in tech_problems[:50]:
            print(f"  {p}")
        if len(tech_problems) > 50:
            print(f"  ... and {len(tech_problems) - 50} more")
        print()

    # 3. Mitigation metadata
    mit_problems: list[str] = []
    for mid in sorted(inv["mitigations"]):
        maps = mitigation_maps.get(mid, set())
        if not maps:
            mit_problems.append(f"{mid}: missing **Maps to Techniques:** metadata line")
            warnings += 1
            continue
        for tref in sorted(maps):
            if tref not in valid_techniques:
                mit_problems.append(
                    f"{mid}: **Maps to Techniques:** references {tref} which is "
                    f"not a defined technique nor a TAXONOMY-GAPS candidate"
                )
                hard_fail += 1

    if mit_problems:
        print(f"MITIGATION METADATA ISSUES — {len(mit_problems)}:")
        for p in mit_problems:
            print(f"  {p}")
        print()

    # 4. Software metadata
    sw_problems: list[str] = []
    for sid in sorted(inv["software"]):
        groups = software_groups.get(sid, set())
        techs = software_techs.get(sid, set())
        for g in sorted(groups):
            if g not in inv["actors"]:
                sw_problems.append(
                    f"{sid}: **Used by Groups:** references {g} which is not a "
                    f"defined actor"
                )
                hard_fail += 1
        for t in sorted(techs):
            if t not in valid_techniques:
                sw_problems.append(
                    f"{sid}: **Observed Techniques:** references {t} which is not "
                    f"a defined technique nor a TAXONOMY-GAPS candidate"
                )
                hard_fail += 1

    if sw_problems:
        print(f"SOFTWARE METADATA ISSUES — {len(sw_problems)}:")
        for p in sw_problems:
            print(f"  {p}")
        print()

    # ----- Summary -----
    if not quiet:
        print("ROLL-UP")
        empty_anchors = sum(
            1
            for tid in inv["techniques"]
            if not tech_examples.get(tid) and not tech_no_anchor.get(tid)
        )
        marked_no_anchor = sum(1 for v in tech_no_anchor.values() if v)
        print(
            f"  Techniques without canonical example anchor: {empty_anchors} "
            f"(plus {marked_no_anchor} explicitly marked no-anchor)"
        )
        empty_actors = sum(
            1
            for aid in inv["actors"]
            if not actor_observed.get(aid) and not actor_no_anchor.get(aid)
        )
        actors_no_marker = sum(1 for v in actor_no_anchor.values() if v)
        print(
            f"  Actors without observed-example anchor: {empty_actors} "
            f"(plus {actors_no_marker} explicitly marked no-anchor)"
        )

        unused_mitigations = [
            mid for mid in inv["mitigations"] if not mitigation_maps.get(mid)
        ]
        print(f"  Mitigations without Maps-to-Techniques: {len(unused_mitigations)}")
        unused_software = [
            sid for sid in inv["software"] if not software_techs.get(sid)
        ]
        print(f"  Software without Observed-Techniques: {len(unused_software)}")
        print()

    print(f"Hard failures: {hard_fail}  |  Warnings: {warnings}")
    return 1 if hard_fail else 0


if __name__ == "__main__":
    sys.exit(main())
