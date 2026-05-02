#!/usr/bin/env python3
"""
suggest_backlinks.py — generate paste-ready backlink bullets for actor and
technique anchor sections, derived from forward references in worked examples.

Use case: tools/check_backlinks.py shows that an actor's `## Observed Examples`
section is empty even though dozens of incidents in examples/ attribute that
actor. This script generates the missing bullets so a curator can review and
paste them into the actor file (or feed them through review before merging).

Output is plain markdown — no in-place file modification. The bullets are
sorted by example date (extracted from filename when possible).

Usage:
    python3 tools/suggest_backlinks.py [--actors-only] [--techniques-only]
                                       [--actor OAK-Gnn] [--technique OAK-Tn.nnn]
                                       [--only-missing]

  --only-missing  show only entries that are not already listed in the target
                  anchor section (default — show what would need to be added).

Exit code is always 0; this is a reporting tool.
"""

from __future__ import annotations

import re
import sys
from collections import defaultdict
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent

ID_RE = re.compile(
    r"\bOAK-(?:T\d+(?:\.\d+){0,2}|G\d{2}|M\d{2}|S\d{2}|DS-\d{2})\b"
)
PLACEHOLDER_RE = re.compile(r"\bOAK-(?:G|T|M|S)nn\b")
TECHNIQUE_REF_RE = re.compile(r"\bOAK-T\d+(?:\.\d+){1,2}\b")
ACTOR_REF_RE = re.compile(r"\bOAK-G\d{2}\b")
EXAMPLE_REF_RE = re.compile(r"examples/[A-Za-z0-9._-]+\.md")
H1_RE = re.compile(r"^# (.+?)$", re.MULTILINE)
DATE_PREFIX_RE = re.compile(r"^(\d{4}(?:-\d{2})?)")


def extract_title(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    m = H1_RE.search(text)
    if not m:
        return path.stem
    title = m.group(1).strip()
    if " — " in title:
        title = title.split(" — ", 1)[0].strip()
    return title


def date_key(name: str) -> tuple[int, int, str]:
    m = DATE_PREFIX_RE.match(name)
    if not m:
        return (9999, 99, name)
    parts = m.group(1).split("-")
    year = int(parts[0])
    month = int(parts[1]) if len(parts) > 1 else 99
    return (year, month, name)


def section_body(text: str, heading: str) -> str | None:
    pattern = re.compile(
        rf"^## {re.escape(heading)}\s*$(.+?)(?=^## |\Z)",
        re.MULTILINE | re.DOTALL,
    )
    m = pattern.search(text)
    return m.group(1) if m else None


def collect_oak_refs(text: str, pattern: re.Pattern[str]) -> set[str]:
    cleaned = PLACEHOLDER_RE.sub("", text)
    return set(pattern.findall(cleaned))


def index_examples() -> tuple[dict[str, set[str]], dict[str, set[str]], dict[str, str]]:
    """Build (actor->examples, technique->examples, example_path->title) indexes."""
    actor_idx: dict[str, set[str]] = defaultdict(set)
    technique_idx: dict[str, set[str]] = defaultdict(set)
    titles: dict[str, str] = {}

    for ex in sorted((REPO / "examples").glob("*.md")):
        if ex.name.lower() == "readme.md":
            continue
        text = ex.read_text(encoding="utf-8")
        rel = f"examples/{ex.name}"
        titles[rel] = extract_title(ex)
        for a in collect_oak_refs(text, ACTOR_REF_RE):
            actor_idx[a].add(rel)
        for t in collect_oak_refs(text, TECHNIQUE_REF_RE):
            technique_idx[t].add(rel)
    return actor_idx, technique_idx, titles


def existing_listed(section_path: Path, heading: str) -> set[str]:
    if not section_path.exists():
        return set()
    text = section_path.read_text(encoding="utf-8")
    body = section_body(text, heading)
    if body is None:
        return set()
    return set(EXAMPLE_REF_RE.findall(body))


def actor_path(actor_id: str) -> Path | None:
    for f in (REPO / "actors").glob(f"{actor_id}-*.md"):
        return f
    return None


def technique_path(tech_id: str) -> Path | None:
    code = tech_id[len("OAK-"):]
    for f in (REPO / "techniques").glob(f"{code}-*.md"):
        return f
    return None


def render_bullet(rel_path: str, title: str, anchor_kind: str) -> str:
    parent_relative = f"../{rel_path}"
    return f"- [`{rel_path}`]({parent_relative}) — {title}"


def main() -> int:
    args = sys.argv[1:]
    actors_only = "--actors-only" in args
    techniques_only = "--techniques-only" in args
    only_missing = "--only-missing" in args
    actor_filter = None
    technique_filter = None
    for i, a in enumerate(args):
        if a == "--actor" and i + 1 < len(args):
            actor_filter = args[i + 1]
        if a == "--technique" and i + 1 < len(args):
            technique_filter = args[i + 1]

    actor_idx, technique_idx, titles = index_examples()

    if not techniques_only:
        actor_ids = sorted(actor_idx) if not actor_filter else [actor_filter]
        for aid in actor_ids:
            attributed = actor_idx.get(aid, set())
            if not attributed:
                continue
            target = actor_path(aid)
            if target is None:
                print(f"# {aid} — actor file not found, skipping", file=sys.stderr)
                continue
            existing = existing_listed(target, "Observed Examples")
            to_add = sorted(attributed - existing, key=lambda p: date_key(Path(p).name))
            if only_missing and not to_add:
                continue
            print(f"## Suggested ## Observed Examples for {aid}  ({target.relative_to(REPO)})")
            print(f"# attributed in {len(attributed)} example(s); "
                  f"{len(existing)} already listed; {len(to_add)} to add")
            for rel in to_add:
                print(render_bullet(rel, titles.get(rel, rel), "actor"))
            if not only_missing and existing:
                print(f"# already listed ({len(existing)}):")
                for rel in sorted(existing, key=lambda p: date_key(Path(p).name)):
                    print(f"#   {rel}")
            print()

    if not actors_only:
        tech_ids = sorted(technique_idx) if not technique_filter else [technique_filter]
        for tid in tech_ids:
            referenced = technique_idx.get(tid, set())
            if not referenced:
                continue
            target = technique_path(tid)
            if target is None:
                print(f"# {tid} — technique file not found, skipping", file=sys.stderr)
                continue
            existing = existing_listed(target, "Real-world examples")
            to_add = sorted(referenced - existing, key=lambda p: date_key(Path(p).name))
            if only_missing and not to_add:
                continue
            print(f"## Suggested ## Real-world examples for {tid}  ({target.relative_to(REPO)})")
            print(f"# referenced in {len(referenced)} example(s); "
                  f"{len(existing)} already listed; {len(to_add)} to add")
            for rel in to_add:
                print(render_bullet(rel, titles.get(rel, rel), "technique"))
            if not only_missing and existing:
                print(f"# already listed ({len(existing)}):")
                for rel in sorted(existing, key=lambda p: date_key(Path(p).name)):
                    print(f"#   {rel}")
            print()

    return 0


if __name__ == "__main__":
    sys.exit(main())
