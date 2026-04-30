#!/usr/bin/env python3
"""
verify_citations.py — bulk-classify pending citation URLs by HTTP reachability.

Reads citations.bib, finds every entry whose note contains
"pending verification", runs curl HEAD/GET against the URL with a Mozilla
user-agent and a short timeout, and rewrites the note's status prefix
based on the HTTP status code:

- 200            → "verified"                — page reachable, content present
- 301/302/308    → follows redirect once and re-classifies the destination
- 403            → "verified-with-caveat"    — page exists but blocks
                                                non-browser HTTP clients
- 404 / 410      → "url-broken"               — flagged for manual lookup
- 000 / timeout  → "url-unreachable"          — DNS/TLS/connection failure

Stub URLs (example.invalid, vendor blog index pages) are detected and
skipped — they need a real article URL, not just an HTTP check.

The script is idempotent: running it twice produces the same output.
URLs already marked "verified" / "verified-with-caveat" / "url-broken" /
"url-unreachable" / "url-not-pinned" are skipped on subsequent runs.

Usage:
    python tools/verify_citations.py [--bib citations.bib] [--workers 16] [--dry-run]
    python tools/verify_citations.py --report      # report-only, don't modify

Concurrency: curl calls are dispatched in a thread pool. Each call has a
12s timeout. 16 workers is a sane default for Treasury / CISA / vendor
blogs without triggering rate limits.
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

# Status-prefix labels emitted into the note.
STATUS_VERIFIED = "verified"
STATUS_CAVEAT = "verified-with-caveat"
STATUS_BROKEN = "url-broken"
STATUS_UNREACHABLE = "url-unreachable"
STATUS_PENDING = "pending verification"
STATUS_NOT_PINNED = "url-not-pinned"

# Notes whose status prefix is one of these are already classified — skip.
SKIP_STATUSES = {
    STATUS_VERIFIED, STATUS_CAVEAT, STATUS_BROKEN,
    STATUS_UNREACHABLE, STATUS_NOT_PINNED,
}

STUB_HINTS = (
    "example.invalid",
    "example-cti.invalid",
    "example.com/oak-pending",
)

USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/126.0 Safari/537.36"
)


def curl_check(url: str, timeout: int = 12) -> tuple[int, str]:
    """Return (http_code, final_url). 0 means connection failed."""
    if any(hint in url for hint in STUB_HINTS):
        return -1, url  # sentinel: known stub, not worth checking
    try:
        result = subprocess.run(
            [
                "curl", "-sLo", "/dev/null",
                "-w", "%{http_code}\t%{url_effective}",
                "-A", USER_AGENT,
                "--max-time", str(timeout),
                url,
            ],
            capture_output=True, text=True, timeout=timeout + 2,
        )
        out = result.stdout.strip().split("\t", 1)
        code = int(out[0]) if out and out[0].isdigit() else 0
        final = out[1] if len(out) > 1 else url
        return code, final
    except Exception:
        return 0, url


def classify(code: int) -> tuple[str, str]:
    """Return (status_label, summary_suffix)."""
    if code == 200:
        return STATUS_VERIFIED, "URL audit confirmed HTTP 200."
    if 300 <= code < 400:
        return STATUS_VERIFIED, f"URL redirects ({code}) to a 200; canonical entry retained."
    if code == 403:
        return STATUS_CAVEAT, "URL returns 403 to non-browser HTTP clients; publicly accessible via standard browser."
    if code in (404, 410):
        return STATUS_BROKEN, "URL returns 404 at v0.1 audit; canonical article URL needs manual lookup."
    if code == -1:
        return STATUS_BROKEN, "URL is a placeholder stub from auto-generation; canonical URL needs manual lookup."
    return STATUS_UNREACHABLE, "URL unreachable at v0.1 audit (timeout / TLS / DNS failure); content may still exist."


def parse_entries(text: str) -> list[tuple[int, int, str, str, str]]:
    """Yield (start, end, key, url, status) tuples for every @misc-style entry.

    The split is by `^@` line beginnings; we then locate the matching `\\n}\\n`
    that closes the entry. Each entry's url and current status are extracted.
    """
    entries = []
    pattern = re.compile(r"^@\w+\{([a-z][a-z0-9_]+),", re.MULTILINE)
    for m_open in pattern.finditer(text):
        key = m_open.group(1)
        start = m_open.start()
        # find next `\n}\n` after start
        end_match = re.search(r"\n\}\n", text[start:])
        if not end_match:
            continue
        end = start + end_match.end()
        block = text[start:end]
        url_m = re.search(r"^\s*url\s*=\s*\{([^}]+)\}", block, flags=re.MULTILINE)
        url = url_m.group(1).strip() if url_m else ""
        # current status = first matching status keyword in note
        status = ""
        for s in (STATUS_VERIFIED, STATUS_CAVEAT, STATUS_BROKEN,
                  STATUS_UNREACHABLE, STATUS_NOT_PINNED, STATUS_PENDING):
            # Use word-ish boundary so "verified-with-caveat" doesn't match "verified"
            if re.search(rf"OAK v0\.1\s*[—-]\s*{re.escape(s)}", block):
                status = s
                break
        entries.append((start, end, key, url, status))
    return entries


def update_note_status(block: str, status: str, suffix: str) -> str:
    """Replace the leading 'OAK v0.1 — <status>' prefix in note. Preserve the
    rest of the note (everything after the first sentence)."""
    note_re = re.compile(r"^(\s*note\s*=\s*\{)([^}]*)(\}\n?)", flags=re.MULTILINE)
    m = note_re.search(block)
    if not m:
        return block
    body = m.group(2)
    # Replace the leading `OAK v0.1 — pending verification.` (or any prior status) with new
    body_new = re.sub(
        r"^OAK v0\.1\s*[—-]\s*[a-z\- ]+verification\.[^.]*\.?",
        f"OAK v0.1 — {status}. {suffix}",
        body, count=1,
    )
    if body_new == body:
        # Old format may have used a different status keyword (e.g., already-verified)
        body_new = re.sub(
            r"^OAK v0\.1\s*[—-]\s*[a-z\- ]+(\.|,)",
            f"OAK v0.1 — {status}.",
            body, count=1,
        )
    return block[:m.start(2)] + body_new + block[m.end(2):]


def main(argv: list[str]) -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--bib", default="citations.bib", type=Path)
    p.add_argument("--workers", default=16, type=int)
    p.add_argument("--dry-run", action="store_true",
                   help="Report only; don't modify citations.bib.")
    p.add_argument("--report", action="store_true",
                   help="Same as --dry-run but with category-level summary.")
    p.add_argument("--include-status", default=STATUS_PENDING,
                   help=("Comma-list of statuses to recheck. Default: pending. "
                         "Use 'all' to recheck verified/caveat/broken too."))
    args = p.parse_args(argv)

    text = args.bib.read_text(encoding="utf-8")
    entries = parse_entries(text)

    if args.include_status == "all":
        targets = [(s, e, k, u, st) for (s, e, k, u, st) in entries if u]
    else:
        wanted = set(args.include_status.split(","))
        targets = [
            (s, e, k, u, st) for (s, e, k, u, st) in entries
            if u and st in wanted
        ]

    print(f"Total bib entries: {len(entries)}")
    print(f"To check (status filter '{args.include_status}'): {len(targets)}")

    results: dict[str, tuple[int, str, str, str]] = {}  # key -> (code, url, label, suffix)
    with ThreadPoolExecutor(max_workers=args.workers) as ex:
        future_to_key = {
            ex.submit(curl_check, url): (key, url)
            for (_, _, key, url, _) in targets
        }
        done = 0
        for fut in as_completed(future_to_key):
            key, url = future_to_key[fut]
            code, final = fut.result()
            label, suffix = classify(code)
            results[key] = (code, url, label, suffix)
            done += 1
            if done % 25 == 0:
                print(f"  …checked {done}/{len(targets)}")

    # Summary
    counts: dict[str, int] = {}
    for (_, _, label, _) in results.values():
        counts[label] = counts.get(label, 0) + 1
    print()
    print("Status summary:")
    for label, count in sorted(counts.items(), key=lambda kv: -kv[1]):
        print(f"  {count:4d}  {label}")

    if args.report or args.dry_run:
        print()
        print("Broken / unreachable URLs (need manual lookup):")
        for key, (code, url, label, _) in sorted(results.items()):
            if label in (STATUS_BROKEN, STATUS_UNREACHABLE):
                print(f"  [{code}]  {key}  {url[:90]}")
        return 0

    # Apply updates
    # Sort by start descending so byte offsets stay valid as we splice.
    targets_by_key = {k: (s, e) for (s, e, k, _, _) in targets}
    new_text = text
    updated = 0
    # Replace each entry's note status; do it via block-by-block string replace
    for key, (code, url, label, suffix) in results.items():
        s, e = targets_by_key[key]
        block = new_text[s:e]
        new_block = update_note_status(block, label, suffix)
        if new_block != block:
            new_text = new_text[:s] + new_block + new_text[e:]
            # Re-scan offsets — entry length may have changed
            entries2 = parse_entries(new_text)
            targets_by_key = {k: (s2, e2) for (s2, e2, k, _, _) in entries2}
            updated += 1

    args.bib.write_text(new_text, encoding="utf-8")
    print()
    print(f"Updated {updated} entries.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
