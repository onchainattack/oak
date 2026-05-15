#!/usr/bin/env python3
"""
check_quality.py — semantic quality linter for OAK.

Checks beyond structural validation:
  D1. Near-duplicate titles (fuzzy matching on example H1s)
  D2. Duplicate transaction hashes across examples
  I1. Loss amount conflicts between examples and actor descriptions
  I2. Attribution label conflicts between examples and actors
  S1. Mitigation <-> Technique spec bidirectionality (mitigation symmetry)
  S2. Missing actor link for confirmed/inferred-strong attributed examples

Usage:
    python3 tools/check_quality.py [--quiet]

Exit codes:
    0 — no quality issues found
    1 — at least one issue found
"""

from __future__ import annotations

import re
import sys
from collections import defaultdict
from pathlib import Path

from common import (
    REPO,
    ATTR_STRENGTH_RE,
    ATTRIBUTION_HEADER_RE,
    ACTOR_LINK_RE,
    MAPS_TO_RE,
    TECHNIQUE_REF_RE,
    build_inventory,
    technique_id_from_filename,
    actor_id_from_filename,
    mitigation_id_from_filename,
)

# --- Regex patterns ---

H1_RE = re.compile(r"^# (.+)$", re.MULTILINE)
TX_HASH_RE = re.compile(r"0x[a-fA-F0-9]{64}")
LOSS_AMOUNT_RE = re.compile(
    r"(?:~|approximately\s+)?\$[\d.,]+\s*(?:million|billion|[KMBT]|thousand)?",
    re.IGNORECASE,
)
LOSS_VALUE_RE = re.compile(
    r"~?\$([\d.,]+)\s*([KMBT]|million|billion|thousand)?",
    re.IGNORECASE,
)
# Range like $1.46–$1.5B or $1.2M–$1.8M
LOSS_RANGE_RE = re.compile(
    r"~?\$([\d.,]+)\s*([KMBT]|million|billion|thousand)?"
    r"\s*[-–—]\s*"
    r"~?\$([\d.,]+)\s*([KMBT]|million|billion|thousand)?",
    re.IGNORECASE,
)


def _to_millions(value_str: str, unit: str | None) -> float:
    """Convert a parsed value + unit to millions USD."""
    try:
        value = float(value_str.replace(",", ""))
    except ValueError:
        return 0.0
    u = (unit or "").lower()
    if u in ("b", "billion"):
        value *= 1000
    elif u in ("t", "trillion"):
        value *= 1_000_000
    elif u in ("thousand", "k"):
        value /= 1000
    return value


def parse_loss_millions(text: str) -> float | None:
    """Extract dollar amounts from text, returning the largest found (normalized to millions USD)."""
    best: float | None = None
    for m in LOSS_RANGE_RE.finditer(text):
        v1 = _to_millions(m.group(1), m.group(2))
        v2 = _to_millions(m.group(3), m.group(4))
        for v in (v1, v2):
            if v > 0 and (best is None or v > best):
                best = v
    for m in LOSS_VALUE_RE.finditer(text):
        v = _to_millions(m.group(1), m.group(2))
        if v > 0 and (best is None or v > best):
            best = v
    return best


ACTOR_ATTR_STATUS_RE = re.compile(
    r"\*\*Attribution status:\*\*\s*\*?(confirmed|inferred-strong|inferred-weak|pseudonymous|unattributed)\b",
    re.IGNORECASE,
)


# --- Normalization helpers ---

STOP_WORDS = {
    "a", "an", "the", "in", "on", "at", "to", "for", "of", "and", "or", "via",
    "with", "from", "by", "as", "is", "was", "are", "were", "be", "has", "had",
    "its", "it",
}
KNOWN_CHAINS = {
    "ethereum", "bsc", "bnb chain", "polygon", "avalanche", "solana", "bitcoin",
    "multi-chain", "cross-chain", "arbitrum", "optimism", "base", "tron",
    "fantom", "gnosis", "celo", "near", "aptos", "sui", "thorchain",
    "nem", "xem", "multi-asset", "bch", "ltc", "xrp", "mona", "btc", "eth",
}


def tokenize_title(title: str) -> set[str]:
    """Extract distinguishing word tokens from an H1 title.

    Strips dates, chains, and common suffixes so that "Bitfloor exchange
    hot-wallet compromise — Bitcoin — 2012-05-02" and "Poloniex hot-wallet
    compromise — Bitcoin — 2014-03-06" produce distinct token sets (bitfloor vs
    poloniex) rather than matching on the shared structural words.
    """
    t = title.lower()
    # Remove parenthetical notes like (BDAC), (OUSD), etc.
    t = re.sub(r"\([^)]*\)", "", t)
    # Split on dash/emdash — the title structure is: IncidentName — Chain — Date
    parts = re.split(r"\s*[-–—]\s*", t)
    # Keep only the first part (incident name) — strip chain and date
    incident = parts[0].strip() if parts else t
    # Tokenize
    tokens = set(re.findall(r"[a-z0-9]+", incident))
    # Remove stop words and known chain names
    tokens -= STOP_WORDS
    tokens -= KNOWN_CHAINS
    return tokens


def jaccard_similarity(a: set[str], b: set[str]) -> float:
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


# --- Check functions ---

def check_duplicate_titles(examples: list[Path]) -> list[str]:
    issues: list[str] = []
    seen: list[tuple[set[str], str, str]] = []  # (tokens, filename, title)

    for path in examples:
        text = path.read_text(encoding="utf-8")
        m = H1_RE.search(text)
        if not m:
            continue
        title = m.group(1).strip()
        tok = tokenize_title(title)
        if len(tok) < 2:
            continue

        for seen_tok, seen_fn, seen_title in seen:
            sim = jaccard_similarity(tok, seen_tok)
            if sim >= 0.55:
                issues.append(
                    f"{path.name} <-> {seen_fn}:\n"
                    f"    jaccard: {sim:.2f} — \"{title[:80]}\" vs \"{seen_title[:80]}\""
                )

        seen.append((tok, path.name, title))

    return issues


def check_duplicate_tx_hashes(examples: list[Path]) -> list[str]:
    issues: list[str] = []
    hash_to_files: dict[str, set[str]] = defaultdict(set)

    for path in examples:
        text = path.read_text(encoding="utf-8")
        for m in TX_HASH_RE.finditer(text):
            h = m.group(0).lower()
            hash_to_files[h].add(path.name)

    for h, files in sorted(hash_to_files.items()):
        if len(files) > 1:
            short = h[:10] + "..." + h[-6:]
            issues.append(
                f"TX {short} appears in {len(files)} files: {', '.join(sorted(files))}"
            )

    return issues


LOSS_LINE_RE = re.compile(
    r"\*\*(?:Loss|Total\s+loss|Direct\s+loss|Volume(?:\s+\w+)?|Cumulative(?:\s+\w+)?|Loss\s+\w+)[^*]*?:\*\*\s*(.+?)(?:\n\*\*|\n\n|\Z)",
    re.IGNORECASE | re.DOTALL,
)


def extract_loss_text(text: str) -> str | None:
    """Extract the loss/volume line from an example file's frontmatter."""
    m = LOSS_LINE_RE.search(text)
    return m.group(1).strip() if m else None


def check_loss_conflicts(examples: list[Path]) -> list[str]:
    """Compare loss amounts in example files vs actor Observed Examples descriptions."""
    issues: list[str] = []

    # Build actor loss descriptions from Observed Examples
    actor_example_losses: dict[str, dict[str, float]] = defaultdict(dict)

    for f in sorted((REPO / "actors").glob("OAK-G*.md")):
        aid = actor_id_from_filename(f.name)
        if not aid:
            continue
        text = f.read_text(encoding="utf-8")

        for line in text.split("\n"):
            stripped = line.strip()
            if not stripped.startswith("- ["):
                continue
            path_m = re.search(r"examples/([A-Za-z0-9._-]+\.md)", stripped)
            if not path_m:
                continue
            ex_path = f"examples/{path_m.group(1)}"
            loss = parse_loss_millions(stripped)
            if loss is not None:
                actor_example_losses[aid][ex_path] = loss

    # Compare against example file loss amounts
    for path in examples:
        text = path.read_text(encoding="utf-8")
        loss_text = extract_loss_text(text)
        if not loss_text:
            continue
        ex_loss = parse_loss_millions(loss_text)
        if ex_loss is None:
            continue

        rel = f"examples/{path.name}"
        for aid, ex_losses in actor_example_losses.items():
            if rel in ex_losses:
                actor_loss = ex_losses[rel]
                ratio = max(ex_loss, actor_loss) / max(min(ex_loss, actor_loss), 1)
                if ratio > 1.25:  # 25%+ discrepancy
                    issues.append(
                        f"{path.name}: example says ~${ex_loss:.0f}M, "
                        f"actor {aid} description says ~${actor_loss:.0f}M "
                        f"(ratio {ratio:.2f}x)"
                    )

    return issues


def check_attribution_conflicts(examples: list[Path]) -> list[str]:
    """Compare attribution labels in examples vs actor files."""
    issues: list[str] = []

    # Build actor attribution statuses
    actor_attr: dict[str, str] = {}
    for f in sorted((REPO / "actors").glob("OAK-G*.md")):
        aid = actor_id_from_filename(f.name)
        if not aid:
            continue
        text = f.read_text(encoding="utf-8")
        m = ACTOR_ATTR_STATUS_RE.search(text)
        if m:
            actor_attr[aid] = m.group(1).lower()

    # Check each example against linked actors
    for path in examples:
        text = path.read_text(encoding="utf-8")
        ex_m = ATTR_STRENGTH_RE.search(text)
        if not ex_m:
            continue
        ex_label = ex_m.group(1).lower()

        # Find linked actors
        actors: set[str] = set()
        for m in ATTRIBUTION_HEADER_RE.finditer(text):
            actors |= set(re.findall(r"OAK-G\d{2}", m.group(1)))
        actors |= set(ACTOR_LINK_RE.findall(text))

        for aid in actors:
            if aid not in actor_attr:
                continue
            act_label = actor_attr[aid]
            if ex_label != act_label:
                # confirmed vs inferred-strong is a notable discrepancy
                severity_labels = {"confirmed", "inferred-strong", "inferred-weak"}
                if ex_label in severity_labels or act_label in severity_labels:
                    issues.append(
                        f"{path.name}: example says **{ex_label}**, "
                        f"but actor {aid} says **{act_label}**"
                    )

    return issues


def check_mitigation_symmetry() -> list[str]:
    """Verify mitigation Maps to Techniques <-> technique spec mitigations are symmetric."""
    import yaml

    issues: list[str] = []

    # Parse mitigation -> techniques from markdown
    mit_to_tech: dict[str, set[str]] = {}
    for f in sorted((REPO / "mitigations").glob("OAK-M*.md")):
        mid = mitigation_id_from_filename(f.name)
        if not mid:
            continue
        text = f.read_text(encoding="utf-8")
        m = MAPS_TO_RE.search(text)
        if m:
            mit_to_tech[mid] = set(TECHNIQUE_REF_RE.findall(m.group(1)))

    # Parse technique -> mitigations from spec YAML
    tech_to_mit: dict[str, set[str]] = {}
    for f in sorted((REPO / "specs").glob("T*.yml")):
        tid = technique_id_from_filename(f.name)
        if not tid:
            continue
        try:
            spec = yaml.safe_load(f.read_text(encoding="utf-8"))
            if spec and "mitigations" in spec:
                tech_to_mit[tid] = set(spec["mitigations"])
        except Exception:
            continue

    # Check mitigation -> technique: each referenced technique should list mitigation back
    for mid, techs in sorted(mit_to_tech.items()):
        for t in sorted(techs):
            if t not in tech_to_mit:
                issues.append(
                    f"{mid} maps to {t} but {t} has no spec file (missing mitigations: field)"
                )
            elif mid not in tech_to_mit[t]:
                issues.append(
                    f"{mid} maps to {t} but {t} spec does not list {mid} in mitigations:"
                )

    # Check technique -> mitigation: each referenced mitigation should reference technique back
    for tid, mits in sorted(tech_to_mit.items()):
        for m in sorted(mits):
            if m not in mit_to_tech:
                issues.append(
                    f"{tid} spec lists {m} in mitigations: but {m} does not map to {tid}"
                )

    return issues


def check_missing_actor_link(examples: list[Path]) -> list[str]:
    """Flag examples with confirmed/inferred-strong attribution but no actor link."""
    issues: list[str] = []

    for path in examples:
        text = path.read_text(encoding="utf-8")
        m = ATTR_STRENGTH_RE.search(text)
        if not m:
            continue
        label = m.group(1).lower()
        if label not in ("confirmed", "inferred-strong"):
            continue

        has_actor_link = bool(ACTOR_LINK_RE.search(text))
        has_gnn_header = bool(ATTRIBUTION_HEADER_RE.search(text))
        if not has_actor_link and not has_gnn_header:
            issues.append(
                f"{path.name}: attribution is **{label}** but no "
                f"**OAK-Gnn:** field or actor link found"
            )

    return issues


# --- Main ---

def main() -> int:
    quiet = "--quiet" in sys.argv[1:]

    inv = build_inventory()

    examples_dir = REPO / "examples"
    examples = sorted(examples_dir.glob("*.md"))
    examples = [e for e in examples if e.name.lower() != "readme.md"]

    print(
        f"OAK quality check — {len(examples)} examples, {len(inv['techniques'])} "
        f"techniques, {len(inv['actors'])} actors, {len(inv['mitigations'])} mitigations"
    )
    print()

    all_issues: dict[str, list[str]] = {}
    total = 0

    # D1 — duplicate titles
    dup_titles = check_duplicate_titles(examples)
    if dup_titles:
        all_issues["DUPLICATE TITLES"] = dup_titles
        total += len(dup_titles)
        print(f"DUPLICATE TITLES — {len(dup_titles)} pair(s):")
        for issue in dup_titles:
            print(f"  {issue}")
        print()

    # D2 — duplicate TX hashes
    dup_tx = check_duplicate_tx_hashes(examples)
    if dup_tx:
        all_issues["DUPLICATE TX HASHES"] = dup_tx
        total += len(dup_tx)
        print(f"DUPLICATE TX HASHES — {len(dup_tx)}:")
        for issue in dup_tx:
            print(f"  {issue}")
        print()

    # I1 — loss conflicts
    loss_issues = check_loss_conflicts(examples)
    if loss_issues:
        all_issues["LOSS CONFLICTS"] = loss_issues
        total += len(loss_issues)
        print(f"LOSS CONFLICTS — {len(loss_issues)}:")
        for issue in loss_issues:
            print(f"  {issue}")
        print()

    # I2 — attribution conflicts
    attr_issues = check_attribution_conflicts(examples)
    if attr_issues:
        all_issues["ATTRIBUTION CONFLICTS"] = attr_issues
        total += len(attr_issues)
        print(f"ATTRIBUTION CONFLICTS — {len(attr_issues)}:")
        for issue in attr_issues:
            print(f"  {issue}")
        print()

    # S1 — mitigation symmetry
    mit_sym = check_mitigation_symmetry()
    if mit_sym:
        all_issues["MITIGATION SYMMETRY"] = mit_sym
        total += len(mit_sym)
        print(f"MITIGATION SYMMETRY — {len(mit_sym)} issue(s):")
        for issue in mit_sym:
            print(f"  {issue}")
        print()

    # S2 — missing actor link
    missing_links = check_missing_actor_link(examples)
    if missing_links:
        all_issues["MISSING ACTOR LINK"] = missing_links
        total += len(missing_links)
        print(f"MISSING ACTOR LINK — {len(missing_links)}:")
        for issue in missing_links:
            print(f"  {issue}")
        print()

    if not quiet:
        print("ROLL-UP")
        for category, items in sorted(all_issues.items()):
            print(f"  {category}: {len(items)}")
        print(f"  Total issues: {total}")
        print()

    if total > 0:
        return 1
    print("OK: no quality issues found.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
