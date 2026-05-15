#!/usr/bin/env python3
"""Shared constants and helpers for OAK quality tools."""

from __future__ import annotations

import re
from collections import defaultdict
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent

# --- Regex patterns ---

ID_RE = re.compile(
    r"\bOAK-(?:T\d+(?:\.\d+){0,2}|G\d{2}|M\d{2}|S\d{2}|DS-\d{2})\b"
)
PLACEHOLDER_RE = re.compile(r"\bOAK-(?:G|T|M|S)nn\b")
TECHNIQUE_REF_RE = re.compile(r"\bOAK-T\d+(?:\.\d+){1,2}\b")
ACTOR_REF_RE = re.compile(r"\bOAK-G\d{2}\b")
EXAMPLE_REF_RE = re.compile(r"examples/[A-Za-z0-9._-]+\.md")

ATTRIBUTION_HEADER_RE = re.compile(
    r"^\*\*OAK-Gnn:\*\*\s*(.+?)$", re.MULTILINE
)
ACTOR_LINK_RE = re.compile(
    r"\.\./actors/(OAK-G\d{2})-[A-Za-z0-9._-]+\.md"
)
ATTRIBUTION_NEGATION_RE = re.compile(
    r"\b(unattributed|not\s+(?:yet\s+)?attributed|no\s+attribution|attribution\s+pending)\b",
    re.IGNORECASE,
)
ATTR_STRENGTH_RE = re.compile(
    r"\*\*(confirmed|inferred-strong|inferred-weak|pseudonymous|unattributed)\b"
)

H2_RE = re.compile(r"^## (.+?)$", re.MULTILINE)
MAPS_TO_RE = re.compile(r"^\*\*Maps to Techniques:\*\*\s*(.+?)$", re.MULTILINE)

NO_ANCHOR_PHRASES = (
    "no public anchor",
    "no public incidents",
    "no canonical example",
    "anchor pending",
    "pending field anchor",
)


# --- File-ID extraction ---

def technique_id_from_filename(filename: str) -> str | None:
    m = re.match(r"^(T\d+(?:\.\d+){1,2})-", filename)
    return f"OAK-{m.group(1)}" if m else None


def actor_id_from_filename(filename: str) -> str | None:
    m = re.match(r"^(OAK-G\d{2})", filename)
    return m.group(1) if m else None


def mitigation_id_from_filename(filename: str) -> str | None:
    m = re.match(r"^(OAK-M\d{2})", filename)
    return m.group(1) if m else None


# --- Section extraction ---

def section_body(text: str, heading: str) -> str | None:
    """Return the body of a `## heading` section, or None if not present."""
    pattern = re.compile(
        rf"^## {re.escape(heading)}\s*$(.+?)(?=^## |\Z)",
        re.MULTILINE | re.DOTALL,
    )
    m = pattern.search(text)
    return m.group(1) if m else None


def has_no_anchor_marker(body: str | None) -> bool:
    if body is None:
        return False
    lower = body.lower()
    return any(phrase in lower for phrase in NO_ANCHOR_PHRASES)


# --- Reference collection ---

def collect_oak_refs(text: str, pattern: re.Pattern[str]) -> set[str]:
    cleaned = PLACEHOLDER_RE.sub("", text)
    return set(pattern.findall(cleaned))


def collect_example_refs(text: str) -> set[str]:
    return set(EXAMPLE_REF_RE.findall(text))


# --- Inventory ---

def build_inventory() -> dict[str, set[str]]:
    inv: dict[str, set[str]] = {
        "tactics": set(),
        "techniques": set(),
        "actors": set(),
        "mitigations": set(),
        "software": set(),
        "datasources": set(),
    }

    for f in (REPO / "tactics").glob("T*.md"):
        m = re.match(r"^(T\d+)-", f.name)
        if m:
            inv["tactics"].add(f"OAK-{m.group(1)}")

    for f in (REPO / "techniques").glob("T*.md"):
        m = re.match(r"^(T\d+(?:\.\d+){1,2})-", f.name)
        if m:
            inv["techniques"].add(f"OAK-{m.group(1)}")

    for f in (REPO / "actors").glob("OAK-G*.md"):
        m = re.match(r"^(OAK-G\d{2})", f.name)
        if m:
            inv["actors"].add(m.group(1))

    for f in (REPO / "mitigations").glob("OAK-M*.md"):
        m = re.match(r"^(OAK-M\d{2})", f.name)
        if m:
            inv["mitigations"].add(m.group(1))

    for f in (REPO / "software").glob("OAK-S*.md"):
        m = re.match(r"^(OAK-S\d{2})", f.name)
        if m:
            inv["software"].add(m.group(1))

    for f in (REPO / "data-sources").glob("OAK-DS-*.md"):
        m = re.match(r"^(OAK-DS-\d{2})", f.name)
        if m:
            inv["datasources"].add(m.group(1))

    return inv


def parse_taxonomy_gaps_candidates() -> tuple[set[str], set[str]]:
    """Collect candidate IDs proposed in TAXONOMY-GAPS.md.

    Returns (numbered_candidates, placeholder_slots).
    """
    candidates: set[str] = set()
    placeholders: set[str] = set()
    path = REPO / "TAXONOMY-GAPS.md"
    if not path.exists():
        return candidates, placeholders
    text = path.read_text(encoding="utf-8")

    for m in re.finditer(r"\bT(\d+)\.(\d+)\.(\d+)\b", text):
        candidates.add(f"OAK-T{m.group(1)}.{m.group(2)}.{m.group(3)}")
    for m in re.finditer(r"\bT(\d+)\.(\d+)\b(?!\.\d)", text):
        candidates.add(f"OAK-T{m.group(1)}.{m.group(2)}")
    for m in re.finditer(r"\bT\d+\.x\b", text):
        placeholders.add(m.group(0))
    return candidates, placeholders
