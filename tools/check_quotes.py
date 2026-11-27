#!/usr/bin/env python3
"""check_quotes.py — is each quoted string in an example really in a cited source?

For every example given, fetch its cited sources (inline URLs, plus the URLs of
citation keys resolved through citations.bib), and look for each quoted string
of 15 characters or more in the fetched text. Reports the quotes it cannot find
and the sources it could not read.

    python3 tools/check_quotes.py examples/2026-11-fluidkey-*.md
    python3 tools/check_quotes.py --json examples/...
    python3 tools/check_quotes.py --ci examples/...     # exit 1 if any quote is unverified

Needs the network, so it is not part of `npm run check`. Run it on every new or
edited example before committing (`npm run check:quotes -- <files>`).

What a miss means. Either the words are a paraphrase and must lose their
quotation marks, or the source could not be read (HTTP 403, a thread reply whose
own URL is not cited, a PDF). Strings in quotes that are labels, not quotations
(flow-block labels, titles in the reference list, code identifiers), are skipped.
X posts are read through api.fxtwitter.com, which returns the post, its article
and the post it quotes, but not the replies in a thread: cite each post's URL.
"""
from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import subprocess
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / "tools" / ".source-cache"
BIB = ROOT / "citations.bib"

URL_RE = re.compile(r"https?://[^\s<>)\]`\"']+")
X_RE = re.compile(r"https://(?:x|twitter)\.com/([^/]+)/status/(\d+)")
QUOTE_RE = re.compile(r"\"([^\"\n]{15,400})\"")
KEY_RE = re.compile(r"\[@?([a-z][a-z0-9_-]{3,})\]")
SKIP_HOST_RE = re.compile(
    r"scan\.|explorer|mempool\.space|blockscout|solscan|tronscan|nearblocks|xrpscan|hypurrscan|hyperliquid\.xyz|arkm\.com"
)


def norm(t: str) -> str:
    t = unicodedata.normalize("NFKC", t)
    for a, b in (("’", "'"), ("‘", "'"), ("“", '"'), ("”", '"'), ("\\$", "$"), ("\\_", "_"), ("\\*", "*"),
                 ("–", "-"), ("—", "-"), ("`", "")):
        t = t.replace(a, b)
    return re.sub(r"\s+", " ", t).lower()


def bib_urls() -> dict[str, str]:
    out: dict[str, str] = {}
    if not BIB.exists():
        return out
    for m in re.finditer(r"@\w+\{([^,\s]+),(.*?)\n\}", BIB.read_text(encoding="utf-8"), re.S):
        u = re.search(r"url\s*=\s*\{([^}]+)\}", m.group(2))
        if u:
            out[m.group(1)] = u.group(1).strip()
    return out


def fetch(url: str) -> tuple[str, str]:
    """Return (status, text). Cached on disk; delete tools/.source-cache to refetch."""
    CACHE.mkdir(exist_ok=True)
    p = CACHE / hashlib.sha1(url.encode()).hexdigest()
    if p.exists():
        status, _, text = p.read_text(encoding="utf-8", errors="replace").partition("\n")
        return status, text
    m = X_RE.match(url)
    if m:
        raw = subprocess.run(["curl", "-s", "--max-time", "30", f"https://api.fxtwitter.com/{m.group(1)}/status/{m.group(2)}"],
                             capture_output=True, text=True).stdout
        try:
            tweet = json.loads(raw).get("tweet") or {}
            text = json.dumps(tweet, ensure_ascii=False).replace("\\n", " ").replace('\\"', '"')
            status = "200" if tweet else "404"
        except json.JSONDecodeError:
            status, text = "error", ""
    else:
        raw = subprocess.run(["curl", "-sL", "--max-time", "40", "-w", "\n%{http_code}", url],
                             capture_output=True, text=True, errors="replace").stdout
        body, _, status = raw.rpartition("\n")
        body = re.sub(r"<script.*?</script>|<style.*?</style>", " ", body, flags=re.S)
        text = html.unescape(re.sub(r"<[^>]+>", " ", body)) if status == "200" else ""
    text = re.sub(r"\s+", " ", text)
    p.write_text(f"{status}\n{text}", encoding="utf-8")
    return status, text


def quotes_of(text: str) -> list[str]:
    """Quoted strings that claim to be someone's words. Flow blocks, reference lists and code are skipped."""
    text = re.sub(r"```.*?```", "", text, flags=re.S)
    text = re.split(r"^## (?:Public )?[Rr]eferences", text, flags=re.M)[0]
    text = text.replace("“", '"').replace("”", '"')
    out = []
    for q in QUOTE_RE.findall(text):
        if q.count("**") or q.strip().startswith((",", ".", ")", ";")) or q.strip().endswith(("(", ",")):
            continue  # text between two quotations, not a quotation
        out.append(q)
    return sorted(set(out))


def check(path: Path, bib: dict[str, str]) -> dict:
    text = path.read_text(encoding="utf-8")
    urls = {u.rstrip(".,;:") for u in URL_RE.findall(text)}
    urls |= {bib[k] for k in KEY_RE.findall(text) if k in bib}
    urls = sorted(u for u in urls if not SKIP_HOST_RE.search(u.split("/")[2]))
    corpus, unreadable = "", []
    for u in urls:
        status, body = fetch(u)
        if status != "200" or len(body) < 200:
            unreadable.append({"url": u, "status": status})
        else:
            corpus += " " + norm(body)
    quotes = quotes_of(text)
    missing = [q for q in quotes if norm(q).strip(" .,;:") not in corpus]
    return {"file": path.name, "sources": len(urls), "unreadable": unreadable, "quotes": len(quotes), "not_found": missing}


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("files", nargs="+", type=Path)
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--ci", action="store_true", help="exit 1 when any quote is not found")
    args = ap.parse_args()

    bib = bib_urls()
    results = [check(p, bib) for p in args.files]
    if args.json:
        json.dump(results, sys.stdout, indent=1, ensure_ascii=False)
    else:
        for r in results:
            print(f"{r['file']}: {r['sources']} sources ({len(r['unreadable'])} unreadable), "
                  f"{r['quotes']} quotes, {len(r['not_found'])} not found")
            for u in r["unreadable"]:
                print(f"    unreadable [{u['status']}] {u['url']}")
            for q in r["not_found"]:
                print(f"    ? \"{q[:160]}\"")
    bad = sum(len(r["not_found"]) for r in results)
    return 1 if args.ci and bad else 0


if __name__ == "__main__":
    sys.exit(main())
