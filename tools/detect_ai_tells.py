#!/usr/bin/env python3
"""
detect_ai_tells.py — Scan OAK markdown content for AI-generated text markers.

Usage:
    python3 tools/detect_ai_tells.py                  # scan defaults, print flagged files
    python3 tools/detect_ai_tells.py --json           # JSON output
    python3 tools/detect_ai_tells.py --threshold 10   # only files with >= 10 hits
    python3 tools/detect_ai_tells.py --file examples/some-file.md  # single file
    python3 tools/detect_ai_tells.py --fix            # auto-fix safe substitutions
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

# Pattern: (regex, severity, description)
# severity: 1=weak tell, 2=medium, 3=strong tell

PATTERNS = {
    # ── 1. Overused AI sentence skeletons ──
    "canonical_padding": [
        (r"is the canonical \d{4}\s+(?:case|example|worked|anchor)", 2,
         "'is the canonical <year> <noun>' — LLM favourite"),
        (r"serves as the\s+\w+\s+\w+\s+for", 1,
         "'serves as the X Y for' — formulaic framing"),
        (r"extends the\s+\w+\s+class\s+(?:beyond|across|into)", 2,
         "'extends the X class beyond/across/into' — AI taxonomy tic"),
        (r"collectively establish that\s", 2,
         "'collectively establish that' — LLM orchestration phrase"),
        (r"anchors the\s+.+?\bcell\b", 2,
         "'anchors the ... cell' — matrix-coverage LLM tic"),
    ],

    # ── 2. Structural / distinct / informative overuse ──
    "structural_overuse": [
        (r"\bstructurally\s+\w+\s+(?:distinct|informative|significant|analogous|identical|separate|notable|similar)\b", 2,
         "'structurally <adj>' — overused AI qualifier"),
        (r"\bThe\s+\w+\s+lesson\s+(?:here|is that)\b", 1,
         "'The X lesson here/is that' — didactic AI tic"),
        (r"\bThis\s+(?:is|represents|demonstrates|reinforces)\s+the\s+\w+\s+", 1,
         "'This represents the X ...' — low-effort transition"),
        (r"\b(?:the\s+)?broader\s+(?:\d{4}[-–]\d{4}\s+)?\w+\s+pattern\b", 1,
         "'the broader X pattern' — context-stretching LLM move"),
        (r"\bdistinct from\b.{0,80}\bdistinct from\b", 2,
         "'distinct from ... distinct from' repeated in same sentence"),
    ],

    # ── 3. Em-dash abuse ──
    "em_dash_clusters": [
        # 3+ em-dashes in a single sentence (80-400 char window)
        (r"(?:[^.!?\n]{80,400}?(?:—|—)[^.!?\n]*?){3,}", 2,
         "3+ em-dashes in a single sentence — AI breathlessness"),
        # Parenthetical em-dash pair with internal em-dash
        (r"—[^—]{20,80}—[^—]{20,80}—", 3,
         "triple em-dash parenthetical nesting — LLM run-on"),
    ],

    # ── 4. Academic padding ──
    "academic_padding": [
        (r"\b(?:It is\s+\w+\s+to\s+\w+|What is\s+\w+\s+is that|The fact that)\b", 1,
         "Academic padding phrase — 'It is X to Y', 'What is X is that'"),
        (r"\b(?:notable|noteworthy|instructive|illuminating)\s+(?:that|is|—)\b", 2,
         "'notable/noteworthy/instructive/illuminating that' — AI valorization"),
        (r"\b(?:in other words|to put it differently|that is to say)\b", 1,
         "'in other words / that is to say' — LLM rephrasing tic"),
        (r"\b(?:a|the)\s+(?:nuanced|granular|fine-grained)\s+\w+\b", 1,
         "'a nuanced/granular X' — empty qualifier"),
    ],

    # ── 5. Formulaic conclusion openers ──
    "formulaic_endings": [
        (r"\bThe\s+\w+\s+case\s+(?:demonstrates|illustrates|highlights|underscores|reveals)\s+that\b", 2,
         "'The X case demonstrates that' — formulaic conclusion opener"),
        (r"\bthis\s+case\s+(?:serves|stands)\s+as\s+(?:a|an|the)\b", 2,
         "'this case serves/stands as a/the' — AI conclusion tic"),
        (r"\b(?:Taken together|Collectively,|In sum,|All told,)\b", 1,
         "'Taken together / Collectively / In sum' — LLM summation tic"),
    ],

    # ── 6. Bold-italic formatting abuse ──
    "bold_overload": [
        (r"\*\*[^*]+\*\*.{0,20}\*\*[^*]+\*\*.{0,20}\*\*[^*]+\*\*.{0,20}\*\*[^*]+\*\*", 2,
         "4+ bold phrases in close proximity — AI emphasis sprawl"),
        (r"(?:\*\*[^*]+\*\*\s*[,;.]?\s*){5,}", 2,
         "5+ consecutive bold-then-plain sequences — LLM list-in-prose"),
    ],

    # ── 7. Repeated sentence openers ──
    # Detected programmatically, not via regex

    # ── 8. Future-tense/would hedging (LLM speculation tic) ──
    "llm_hedging": [
        (r"\b(?:would\s+be|would\s+have|would\s+not)\b.{0,60}\b(?:if|had|were)\b", 1,
         "'would be/have ... if/had/were' — LLM counterfactual hedging cluster"),
        (r"\bcould\s+(?:potentially|arguably|conceivably|plausibly)\b", 2,
         "'could potentially/arguably/conceivably' — stacked hedging"),
    ],

    # ── 9. LLM-specific formatting artifacts ──
    "llm_formatting": [
        (r"^\*\*Prompt:\*\*", 1,
         "'**Prompt:**' line — DALL-E/image-gen prompt artifact (article-assets)"),
        (r"\[IMAGE \d", 1,
         "'[IMAGE N]' placeholder — AI-assisted content scaffolding"),
        (r"^\s*[-–—]\s*\*\*[^*]+\*\*\s*[-–—]\s*", 1,
         "Dash-bold-title-dash — LLM list-entry pattern"),
    ],

    # ── 10. Overused bridging phrases ──
    "bridging_overuse": [
        (r"\bthis is the\s+\w+\s+(?:analogue|equivalent|version|variant)\b", 2,
         "'this is the X analogue/equivalent' — AI bridging tic"),
        (r"\bthe\s+\w+\s+case\s+(?:generalise|extend|appl)y\s+beyond\b", 1,
         "'the X case generalises beyond' — AI scope-stretching"),
        (r"\b(?:For|In)\s+OAK.s\s+broader\b", 1,
         "'For/In OAK's broader' — self-referential AI tic"),
    ],
}

# ── Safe auto-fixes ────────────────────────────────────────────────────

# Only substitutions that don't change meaning.
REPLACEMENTS = [
    # Remove "it is worth noting that" / "it is notable that"
    (r"\bIt is worth noting that\s+", ""),
    (r"\bIt is notable that\s+", ""),
    (r"\bIt is noteworthy that\s+", ""),
    # "can potentially" → "can"
    (r"\bcan potentially\b", "can"),
    # "in order to" → "to"
    (r"\bin order to\b", "to"),
    # "due to the fact that" → "because"
    (r"\bdue to the fact that\b", "because"),
    # Double hedging: "could potentially" → "could"
    (r"\bcould potentially\b", "could"),
    # "at the time of writing" → omit (it's obvious)
    (r",?\s*at the time of writing\b", ""),
    # "it should be noted that" → omit
    (r"\bIt should be noted that\s+", ""),
    # "in the context of" → "in" (when it fits)
    (r"\bin the broader context of\b", "in"),
]

# ── Sentence opener repetition detector ────────────────────────────────

def check_repeated_openers(text, window=3):
    """Flag 3+ consecutive sentences starting with the same 2-3 words."""
    hits = []
    sentences = re.split(r'(?<=[.!?])\s+(?=[A-Z])', text)
    for i in range(len(sentences) - window + 1):
        openers = []
        for s in sentences[i:i+window]:
            words = s.strip().split()[:3]
            openers.append(" ".join(words[:2]).lower())
        # Check if all openers in the window share the same first 2 words
        if len(set(openers)) == 1:
            hits.append({
                "line": -1,  # approximate
                "opener": openers[0],
                "sentences": [s.strip()[:80] for s in sentences[i:i+window]],
            })
    return hits


# ── Scanner ────────────────────────────────────────────────────────────

def scan_file(filepath):
    """Scan a single file and return all hits."""
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()
    lines = text.split("\n")

    hits = []
    for category, pattern_list in PATTERNS.items():
        for pattern, severity, description in pattern_list:
            for m in re.finditer(pattern, text, re.IGNORECASE):
                # Find line number
                pos = m.start()
                line_num = text[:pos].count("\n") + 1
                snippet = m.group(0)[:100]
                hits.append({
                    "file": filepath,
                    "line": line_num,
                    "category": category,
                    "severity": severity,
                    "description": description,
                    "match": snippet,
                })

    # Repeated opener check
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
    """Apply safe auto-fix substitutions."""
    for pattern, replacement in REPLACEMENTS:
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)
    return text


def scan_directory(directory):
    """Scan all .md files in a directory recursively."""
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


def print_report(all_hits, files_scanned, threshold):
    """Human-readable report grouped by file, with severity scoring."""
    # Aggregate by file
    by_file = defaultdict(list)
    for h in all_hits:
        by_file[h["file"]].append(h)

    total_score = 0
    flagged = 0

    for filepath in sorted(by_file.keys()):
        hits = by_file[filepath]
        score = sum(h["severity"] for h in hits)
        total_score += score
        if score >= threshold:
            flagged += 1
            relpath = os.path.relpath(filepath, ROOT)
            print(f"\n{'='*70}")
            print(f"{relpath}  [score: {score}]")
            print(f"{'='*70}")
            # Group by line
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
    print(f"Cumulative severity score across all files: {total_score}")

    # Category summary
    cat_counts = Counter(h["category"] for h in all_hits)
    if cat_counts:
        print(f"\nTop AI-tell categories:")
        for cat, count in cat_counts.most_common(10):
            sev_avg = sum(h["severity"] for h in all_hits if h["category"] == cat) / count
            print(f"  {count:>4}  [{cat:<25}] avg severity {sev_avg:.1f}")


def main():
    parser = argparse.ArgumentParser(description="Detect AI-generated text markers in OAK corpus")
    parser.add_argument("--json", action="store_true", help="Output as JSON")
    parser.add_argument("--threshold", type=int, default=3,
                        help="Minimum severity score to flag a file (default: 3)")
    parser.add_argument("--file", type=str, help="Scan a single file instead of directories")
    parser.add_argument("--fix", action="store_true",
                        help="Auto-fix safe substitutions in-place")
    parser.add_argument("--dirs", nargs="+", default=SCAN_DIRS,
                        help="Directories to scan (default: standard content dirs)")
    args = parser.parse_args()

    if args.fix:
        print("Auto-fix mode — applying safe substitutions to flagged files...")
        all_hits, _ = scan_directories(args.dirs)
        by_file = set(h["file"] for h in all_hits)
        for filepath in sorted(by_file):
            with open(filepath, "r", encoding="utf-8") as f:
                original = f.read()
            fixed = auto_fix(original)
            if fixed != original:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(fixed)
                print(f"  Fixed: {os.path.relpath(filepath, ROOT)}")
        print("Done.")
        return

    if args.file:
        filepath = os.path.join(ROOT, args.file) if not args.file.startswith("/") else args.file
        all_hits = scan_file(filepath)
        files_scanned = 1
    else:
        all_hits = []
        files_scanned = 0
        for d in args.dirs:
            hits, count = scan_directory(d)
            all_hits.extend(hits)
            files_scanned += count

    if args.json:
        print(json.dumps({
            "files_scanned": files_scanned,
            "total_hits": len(all_hits),
            "threshold": args.threshold,
            "hits": all_hits,
        }, indent=2))
    else:
        print_report(all_hits, files_scanned, args.threshold)


def scan_directories(dirs):
    all_hits = []
    files_scanned = 0
    for d in dirs:
        hits, count = scan_directory(d)
        all_hits.extend(hits)
        files_scanned += count
    return all_hits, files_scanned


if __name__ == "__main__":
    main()
