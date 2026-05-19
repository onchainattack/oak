#!/usr/bin/env python3
"""
detect_ai_tells.py — Scan OAK markdown content for AI-generated text markers.

Usage:
    python3 tools/detect_ai_tells.py                    # scan defaults, print flagged files
    python3 tools/detect_ai_tells.py --json             # JSON output
    python3 tools/detect_ai_tells.py --threshold 10     # only files with >= 10 hits
    python3 tools/detect_ai_tells.py --file some.md     # single file
    python3 tools/detect_ai_tells.py --fix              # auto-fix safe substitutions in-place
    python3 tools/detect_ai_tells.py --ci               # CI mode: JSON, exit 1 if violations > limit
    python3 tools/detect_ai_tells.py --ci --max-score 20  # CI with custom per-file limit
"""

import re
import os
import sys
import json
import argparse
from collections import Counter, defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SCAN_DIRS = [
    "examples",
    "techniques",
    "tactics",
    "actors",
    "mitigations",
    "software",
    "investigations",
    "article-assets",
]

# ── Detection categories ──────────────────────────────────────────────

PATTERNS = {
    "canonical_padding": [
        (r"is the canonical \d{4}\s+(?:case|example|worked|anchor)", 2,
         "'is the canonical <year> <noun>'"),
        (r"serves as the\s+\w+\s+\w+\s+for", 1,
         "'serves as the X Y for'"),
        (r"extends the\s+\w+\s+class\s+(?:beyond|across|into)", 2,
         "'extends the X class beyond/across/into'"),
        (r"collectively establish that\s", 2,
         "'collectively establish that'"),
        (r"anchors the\s+.+?\bcell\b", 2,
         "'anchors the ... cell'"),
    ],

    "structural_overuse": [
        (r"\bstructurally\s+\w+\s+(?:distinct|informative|significant|analogous|identical|separate|notable|similar)\b", 2,
         "'structurally <adj>'"),
        (r"\bThe\s+\w+\s+lesson\s+(?:here|is that)\b", 1,
         "'The X lesson here/is that'"),
        (r"\bThis\s+(?:is|represents|demonstrates|reinforces)\s+the\s+\w+\s+", 1,
         "'This represents/demonstrates the X'"),
        (r"\b(?:the\s+)?broader\s+(?:\d{4}[-–]\d{4}\s+)?\w+\s+pattern\b", 1,
         "'the broader X pattern'"),
        (r"\bdistinct from\b.{0,80}\bdistinct from\b", 2,
         "'distinct from ... distinct from' in same sentence"),
    ],

    "em_dash_clusters": [
        (r"(?:[^.!?\n]{80,400}?(?:—)[^.!?\n]*?){3,}", 2,
         "3+ em-dashes in a single sentence"),
        (r"—[^—\n]{20,80}—[^—\n]{20,80}—", 3,
         "triple em-dash parenthetical nesting (same line)"),
    ],

    "academic_padding": [
        (r"\b(?:It is\s+\w+\s+to\s+\w+|What is\s+\w+\s+is that|The fact that)\b", 1,
         "Academic padding phrase"),
        (r"\b(?:notable|noteworthy|instructive|illuminating)\s+(?:that|is|—)\b", 2,
         "'notable/noteworthy/instructive that'"),
        (r"\b(?:in other words|to put it differently|that is to say)\b", 1,
         "'in other words / that is to say'"),
        (r"\b(?:a|the)\s+(?:nuanced|granular|fine-grained)\s+\w+\b", 1,
         "'a nuanced/granular X'"),
    ],

    "formulaic_endings": [
        (r"\bThe\s+\w+\s+case\s+(?:demonstrates|illustrates|highlights|underscores|reveals)\s+that\b", 2,
         "'The X case demonstrates/illustrates that'"),
        (r"\bthis\s+case\s+(?:serves|stands)\s+as\s+(?:a|an|the)\b", 2,
         "'this case serves/stands as a/the'"),
        (r"\b(?:Taken together|Collectively,|In sum,|All told,)\b", 1,
         "'Taken together/Collectively/In sum'"),
    ],

    "bold_overload": [
        (r"\*\*[^*]+\*\*.{0,20}\*\*[^*]+\*\*.{0,20}\*\*[^*]+\*\*.{0,20}\*\*[^*]+\*\*", 2,
         "4+ bold phrases in close proximity"),
        (r"(?:\*\*[^*]+\*\*\s*[,;.]?\s*){5,}", 2,
         "5+ consecutive bold-then-plain sequences"),
    ],

    "llm_hedging": [
        (r"\b(?:would\s+be|would\s+have|would\s+not)\b.{0,60}\b(?:if|had|were)\b", 1,
         "'would be/have ... if/had/were'"),
        (r"\bcould\s+(?:potentially|arguably|conceivably|plausibly)\b", 2,
         "'could potentially/arguably' — stacked hedging"),
    ],

    "llm_formatting": [
        (r"^\*\*Prompt:\*\*", 1,
         "'**Prompt:**' — image-gen artifact"),
        (r"\[IMAGE \d", 1,
         "'[IMAGE N]' placeholder"),
        (r"^\s*[-–—]\s*\*\*[^*]+\*\*\s*[-–—]\s*", 1,
         "Dash-bold-title-dash list entry"),
    ],

    "bridging_overuse": [
        (r"\bthis is the\s+\w+\s+(?:analogue|equivalent|version|variant)\b", 2,
         "'this is the X analogue/equivalent'"),
        (r"\bthe\s+\w+\s+case\s+(?:generalise|extend|appl)y\s+beyond\b", 1,
         "'the X case generalises beyond'"),
        (r"\b(?:For|In)\s+OAK.s\s+broader\b", 1,
         "'For/In OAK's broader'"),
    ],
}

# ── Auto-fix substitutions ────────────────────────────────────────────

REPLACEMENTS = [
    # ═══ ONLY safe, context-independent substitutions below ═══
    # Each line must preserve meaning and grammatical correctness
    # when applied blindly to any sentence.

    # Hedging removal (safe: the sentence remains grammatical without these)
    (r"\bIt is worth noting that\s+", ""),
    (r"\bIt is notable that\s+", ""),
    (r"\bIt is noteworthy that\s+", ""),
    (r"\bIt should be noted that\s+", ""),
    (r"\bit is instructive to note that\s+", ""),

    # Double hedging → single (safe: meaning preserved, one word shorter)
    (r"\bcan potentially\b", "can"),
    (r"\bcould potentially\b", "could"),
    (r"\bmay potentially\b", "may"),
    (r"\bmight potentially\b", "might"),

    # Wordy connectors → compact (safe: grammatical equivalence)
    (r"\bin order to\b", "to"),
    (r"\bdue to the fact that\b", "because"),

    # Empty academic connector removal (safe: sentence flows without them)
    (r"\b(?:This|That) is to say,?\s+", ""),
    (r"\bto put it differently,?\s+", ""),
    (r"\bin other words,?\s+", ""),

    # Formulaic summation openers (safe: sentence starts fine without them)
    # Sentence-initial only (capital letter required)
    (r"(?:^|\.\s+)Taken together,?\s*", ". "),
    (r"(?:^|\.\s+)Collectively,?\s+these\b", ". These"),
    (r"(?:^|\.\s+)In sum,?\s*", ". "),
    (r"(?:^|\.\s+)All told,?\s*", ". "),

    # Empty qualifiers → simpler (safe: same referent, less AI)
    (r"\ba nuanced understanding of\b", "an understanding of"),
    (r"\ba granular view of\b", "a view of"),

    # ═══ END SAFE REPLACEMENTS ═══
    # DO NOT add replacements that rewrite sentence structure,
    # remove content-bearing words (e.g. "canonical", "case", "example"),
    # or operate on multi-word phrases that depend on surrounding context.
]

# ── OAK metadata line patterns (bold-overload false positives) ────────

_OAK_META_TERMS = [
    r"OAK Techniques observed",
    r"OAK-[TGMS]\d+(?:\.\d+)*",
    r"OAK-Gnn",
    r"Loss",
    r"Attribution",
    r"Key teaching point",
    r"Parent Tactics?",
    r"Maturity",
    r"Chains",
    r"First documented",
    r"Aliases",
    r"Adjacent Techniques",
    r"Adjacent Tactics",
    r"Adjacent tactics",
    r"Adjacent Groups",
    r"Maps to Techniques",
    r"Used by Groups",
    r"Observed Techniques",
    r"Observed Examples",
    r"Real-world examples",
    r"Realised extraction",
    r"Notional damage",
    r"Recovery",
    r"Status",
    r"Phase \d",
    r"OAK-G\d",
]
_OAK_META_COMBINED = "|".join(_OAK_META_TERMS)
OAK_METADATA_LINE = re.compile(
    rf"^\s*\*\*\s*(?:{_OAK_META_COMBINED})", re.IGNORECASE
)


def is_oak_metadata_line(line_text):
    return bool(OAK_METADATA_LINE.search(line_text))


# ── OAK list-entry dash pattern (em_dash_clusters false positives) ─────

_OAK_LIST_DASH_LINE = re.compile(
    r"^\s*(?:\d+[.)]\s+\S|\d+\s+-\s+\S|-\s+\S)", re.IGNORECASE
)
_OAK_LIST_DASH_EM = re.compile(r"—")


def is_oak_list_dash_line(line_text):
    """Any markdown list item (ordered or unordered) that contains em-dashes
    is structured data, not parenthetical prose nesting."""
    if not _OAK_LIST_DASH_LINE.match(line_text):
        return False
    return bool(_OAK_LIST_DASH_EM.search(line_text))


# ── Image prompt line (em_dash_clusters false positive) ────────────────

_IMAGE_PROMPT_LINE = re.compile(r"^\s*\*\*Prompt:\*\*", re.IGNORECASE)


def is_image_prompt_line(line_text):
    """'**Prompt:**' lines are image-gen artifacts, not prose."""
    return bool(_IMAGE_PROMPT_LINE.search(line_text))


# ── OAK title-line dash pattern (em_dash_clusters false positives) ─────

_OAK_TITLE_DASH_LINE = re.compile(
    r"^#{1,3}\s+.*?—", re.IGNORECASE
)


def is_oak_title_dash_line(line_text):
    """Title lines like '# Title — subtitle — chain — date' use dashes
    as structured field separators, not parenthetical nesting."""
    return bool(_OAK_TITLE_DASH_LINE.search(line_text))


# ── Sentence opener repetition detector ───────────────────────────────

def check_repeated_openers(text, window=3):
    hits = []
    sentences = re.split(r'(?<=[.!?])\s+(?=[A-Z])', text)
    for i in range(len(sentences) - window + 1):
        openers = []
        for s in sentences[i:i+window]:
            words = s.strip().split()[:3]
            openers.append(" ".join(words[:2]).lower())
        if len(set(openers)) == 1:
            hits.append({
                "line": -1,
                "opener": openers[0],
                "sentences": [s.strip()[:80] for s in sentences[i:i+window]],
            })
    return hits


# ── Scanner ───────────────────────────────────────────────────────────

def scan_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()
    lines = text.split("\n")

    hits = []
    for category, pattern_list in PATTERNS.items():
        for pattern, severity, description in pattern_list:
            for m in re.finditer(pattern, text, re.IGNORECASE):
                pos = m.start()
                line_num = text[:pos].count("\n") + 1
                snippet = m.group(0)[:120]

                if category == "bold_overload":
                    line_text = lines[line_num - 1] if line_num <= len(lines) else ""
                    if is_oak_metadata_line(line_text):
                        continue
                    match_lines = snippet.split("\n")
                    if any(is_oak_metadata_line(ml) for ml in match_lines):
                        continue

                if category == "em_dash_clusters":
                    line_text = lines[line_num - 1] if line_num <= len(lines) else ""
                    if is_oak_list_dash_line(line_text):
                        continue
                    if is_oak_title_dash_line(line_text):
                        continue
                    if is_oak_metadata_line(line_text):
                        continue
                    if is_image_prompt_line(line_text):
                        continue

                hits.append({
                    "file": filepath,
                    "line": line_num,
                    "category": category,
                    "severity": severity,
                    "description": description,
                    "match": snippet,
                })

    opener_hits = check_repeated_openers(text)
    for oh in opener_hits:
        hits.append({
            "file": filepath,
            "line": -1,
            "category": "repeated_openers",
            "severity": 2,
            "description": f"3+ consecutive sentences open with '{oh['opener']}'",
            "match": " ... ".join(oh["sentences"]),
        })

    return hits


def auto_fix(text):
    """Apply only safe, context-independent substitutions."""
    for pattern, replacement in REPLACEMENTS:
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)

    # Clean up: collapse 3+ blank lines → 2 (safe: never touches content)
    text = re.sub(r'\n{3,}', '\n\n', text)

    return text


def scan_directory(directory):
    all_hits = []
    file_count = 0
    dir_path = os.path.join(ROOT, directory)
    if not os.path.isdir(dir_path):
        return all_hits, file_count

    for root, _, files in os.walk(dir_path):
        for fname in files:
            if fname.endswith(".md"):
                file_count += 1
                hits = scan_file(os.path.join(root, fname))
                all_hits.extend(hits)
    return all_hits, file_count


def scan_directories(dirs):
    all_hits = []
    files_scanned = 0
    for d in dirs:
        hits, count = scan_directory(d)
        all_hits.extend(hits)
        files_scanned += count
    return all_hits, files_scanned


def print_report(all_hits, files_scanned, threshold):
    by_file = defaultdict(list)
    for h in all_hits:
        by_file[h["file"]].append(h)

    flagged = 0
    for filepath in sorted(by_file.keys()):
        hits = by_file[filepath]
        score = sum(h["severity"] for h in hits)
        if score >= threshold:
            flagged += 1
            relpath = os.path.relpath(filepath, ROOT)
            print(f"\n{'='*70}")
            print(f"{relpath}  [score: {score}]")
            print(f"{'='*70}")
            hits.sort(key=lambda h: h["line"])
            for h in hits:
                cat_short = h["category"][:20]
                sev_mark = "●" if h["severity"] == 3 else ("◉" if h["severity"] == 2 else "○")
                print(f"  L{h['line']:>5} {sev_mark} [{cat_short:<20}] {h['description']}")
                print(f"         → {h['match'][:90]}")

    print(f"\n{'='*70}")
    print(f"Files scanned: {files_scanned}")
    print(f"Files flagged (score ≥ {threshold}): {flagged}")
    print(f"Total hits: {len(all_hits)}")

    cat_counts = Counter(h["category"] for h in all_hits)
    if cat_counts:
        print(f"\nTop AI-tell categories:")
        for cat, count in cat_counts.most_common(10):
            sev_avg = sum(h["severity"] for h in all_hits if h["category"] == cat) / count
            print(f"  {count:>4}  [{cat:<25}] avg severity {sev_avg:.1f}")


def run_ci(args):
    """CI mode: scan, report JSON, exit non-zero if violations exceed limit."""
    all_hits, files_scanned = scan_directories(args.dirs)

    by_file = defaultdict(list)
    for h in all_hits:
        by_file[h["file"]].append(h)

    violations = []
    for filepath, hits in by_file.items():
        score = sum(h["severity"] for h in hits)
        if score > args.max_score:
            violations.append({
                "file": os.path.relpath(filepath, ROOT),
                "score": score,
                "max_allowed": args.max_score,
                "hits": len(hits),
                "categories": list(set(h["category"] for h in hits)),
            })

    result = {
        "files_scanned": files_scanned,
        "total_hits": len(all_hits),
        "max_score_per_file": args.max_score,
        "violations": len(violations),
        "violation_details": sorted(violations, key=lambda v: v["score"], reverse=True),
    }

    print(json.dumps(result, indent=2))
    if violations:
        sys.exit(1)
    sys.exit(0)


def main():
    parser = argparse.ArgumentParser(description="Detect AI-generated text markers in OAK corpus")
    parser.add_argument("--json", action="store_true", help="Output as JSON")
    parser.add_argument("--threshold", type=int, default=3,
                        help="Minimum severity score to flag a file (default: 3)")
    parser.add_argument("--file", type=str, help="Scan a single file")
    parser.add_argument("--fix", action="store_true",
                        help="Auto-fix safe substitutions in-place")
    parser.add_argument("--ci", action="store_true",
                        help="CI mode: JSON output, exit 1 if any file exceeds --max-score")
    parser.add_argument("--max-score", type=int, default=30,
                        help="Per-file severity limit for CI mode (default: 30)")
    parser.add_argument("--dirs", nargs="+", default=SCAN_DIRS,
                        help="Directories to scan")
    args = parser.parse_args()

    if args.ci:
        run_ci(args)
        return

    if args.fix:
        print("Auto-fix mode — applying safe substitutions + em-dash splitting...")
        _hits, files_scanned = scan_directories(args.dirs)
        by_file = defaultdict(list)
        for h in _hits:
            by_file[h["file"]].append(h)
        fixed_count = 0
        for filepath in sorted(by_file.keys()):
            with open(filepath, "r", encoding="utf-8") as f:
                original = f.read()
            fixed = auto_fix(original)
            if fixed != original:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(fixed)
                relpath = os.path.relpath(filepath, ROOT)
                score_before = sum(h["severity"] for h in by_file[filepath])
                # Quick rescan to show improvement
                after_hits = scan_file(filepath)
                score_after = sum(h["severity"] for h in after_hits)
                print(f"  {relpath}: {score_before} → {score_after}")
                fixed_count += 1
        print(f"Fixed {fixed_count} file(s) out of {files_scanned} scanned.")
        return

    if args.file:
        filepath = os.path.join(ROOT, args.file) if not args.file.startswith("/") else args.file
        all_hits = scan_file(filepath)
        files_scanned = 1
    else:
        all_hits, files_scanned = scan_directories(args.dirs)

    if args.json:
        print(json.dumps({
            "files_scanned": files_scanned,
            "total_hits": len(all_hits),
            "threshold": args.threshold,
            "hits": all_hits,
        }, indent=2))
    else:
        print_report(all_hits, files_scanned, args.threshold)


if __name__ == "__main__":
    main()
