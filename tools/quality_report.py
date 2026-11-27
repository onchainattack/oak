#!/usr/bin/env python3
"""quality_report.py — measure content quality across examples/, by stratum.

Report only: always exits 0. It does not replace the gates in `npm run check`;
it counts what those gates do not look at (or only look at for recent files),
so a review can see where the corpus is weak.

    python3 tools/quality_report.py            # markdown tables
    python3 tools/quality_report.py --json     # raw numbers and per-file flags
    python3 tools/quality_report.py --links    # also probe every inline URL (network, cached)
    python3 tools/quality_report.py --sample 45 --seed 20261127   # stratified sample for a deep review

Strata are era x kind. Kind follows the checkers: a file named YYYY-MM-... is a
single incident (SINGLE_INCIDENT_RE in check_timeline.py); YYYY-YYYY-... is a
cohort; anything else is year-only. Cohort and year-only files are skipped by the
timeline, fund-flow and shortened-address gates, which is why they are split out.
"""
from __future__ import annotations

import argparse
import concurrent.futures
import json
import random
import re
import sys
import urllib.error
import urllib.request
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlparse

sys.path.insert(0, str(Path(__file__).resolve().parent))
from check_timeline import FUNDS_RE, SECTION_RE, SINGLE_INCIDENT_RE, TRUNC_RE  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
EXAMPLES = ROOT / "examples"
CACHE = ROOT / "tools" / ".link-cache.json"

COHORT_RE = re.compile(r"^\d{4}-\d{4}-")
URL_RE = re.compile(r"https?://[^\s<>)\]`\"']+")
BIBKEY_RE = re.compile(r"`\[[a-z0-9][a-z0-9_-]+\]`|\[@?[a-z][a-z0-9]+\d{4}[a-z0-9]*\]")
QUOTE_RE = re.compile(r"[\"“]([^\"“”\n]{15,400})[\"”]")
CONF_RE = re.compile(r"^- \*\*Confidence:\*\*\s*([a-z-]+)", re.M | re.I)
SRCTYPE_RE = re.compile(r"^- \*\*Source type:\*\*\s*([a-z-]+)", re.M | re.I)
ATTR_RE = re.compile(r"\*\*Attribution:\*\*\s*\**\s*([a-z-]+)", re.I)
LOSS_RE = re.compile(r"\*\*Loss:\*\*(.*)")
USD_RE = re.compile(r"\$\s?([0-9][0-9,.]*)\s?(B|billion|M|million|K|thousand)?", re.I)
EXPLORER_HOST_RE = re.compile(
    r"scan\.|explorer|mempool\.space|blockscout|solscan|tronscan|nearblocks|xrpscan|hypurrscan|arkm\.com|debank"
)
# A capitalised two-word name within reach of an accusation word. Candidates for a human look, not a verdict.
PERSON_RE = re.compile(
    r"\b([A-Z][a-z]{2,}\s[A-Z][a-z]{2,})\b[^.\n]{0,80}\b(arrested|charged|accused|indicted|scammer|fraudster|perpetrator|suspect)\b"
)

ERAS = ["≤2020", "2021–2023", "2024–2025", "2026-01…08", "2026-09+"]


def era_of(name: str) -> str:
    year = int(name[:4])
    if year <= 2020:
        return ERAS[0]
    if year <= 2023:
        return ERAS[1]
    if year <= 2025:
        return ERAS[2]
    if SINGLE_INCIDENT_RE.match(name) and name[:7] >= "2026-09":
        return ERAS[4]
    return ERAS[3]


def kind_of(name: str) -> str:
    if COHORT_RE.match(name):
        return "cohort"
    if SINGLE_INCIDENT_RE.match(name):
        return "single"
    return "year-only"


def loss_usd(text: str) -> float:
    m = LOSS_RE.search(text)
    if not m:
        return 0.0
    best = 0.0
    for num, unit in USD_RE.findall(m.group(1).replace("\\$", "$")):
        try:
            v = float(num.replace(",", "").rstrip("."))
        except ValueError:
            continue
        v *= {"b": 1e9, "billion": 1e9, "m": 1e6, "million": 1e6, "k": 1e3, "thousand": 1e3}.get(unit.lower(), 1)
        best = max(best, v)
    return best


def measure(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    name = path.name
    urls = [u.rstrip(".,;:") for u in URL_RE.findall(text)]
    source_urls = [u for u in urls if not EXPLORER_HOST_RE.search(urlparse(u).netloc + urlparse(u).path[:12])]
    hosts = {urlparse(u).netloc.lower().removeprefix("www.") for u in source_urls}
    timeline = SECTION_RE.search(text)
    flow = re.search(r"```oak-flow\n(.*?)```", text, re.S)
    flow_body = flow.group(1) if flow else ""
    attr = ATTR_RE.search(text)
    conf = CONF_RE.search(text)
    stype = SRCTYPE_RE.search(text)
    attr_label = attr.group(1).lower() if attr else ""
    people = []
    if attr_label in ("unattributed", "pseudonymous"):
        people = sorted({m.group(1) for m in PERSON_RE.finditer(text)})
    return {
        "file": name,
        "era": era_of(name),
        "kind": kind_of(name),
        "lines": text.count("\n") + 1,
        "loss_usd": loss_usd(text),
        "urls": len(source_urls),
        "hosts": len(hosts),
        "bibkeys": len(set(BIBKEY_RE.findall(text))),
        "no_url": not source_urls,
        "single_publisher": len(hosts) == 1,
        "timeline": bool(timeline),
        "timeline_oak_col": bool(timeline and re.search(r"\|\s*OAK\s*\|", timeline.group(1))),
        "funds_row": bool(timeline and FUNDS_RE.search(timeline.group(1))),
        "key_addresses": bool(re.search(r"^#{0,3}\s*\**Key addresses", text, re.M | re.I)),
        "root_cause": "## Root-cause evidence" in text,
        "confidence": conf.group(1).lower() if conf else "",
        "source_type": stype.group(1).lower() if stype else "",
        "flow": bool(flow),
        "edges_oak": len(re.findall(r"verified:\s*oak", flow_body)),
        "edges_source": len(re.findall(r"verified:\s*source", flow_body)),
        "truncated": len([m for m in TRUNC_RE.finditer(text)]),
        "quotes": len(QUOTE_RE.findall(text)),
        "attribution": attr_label,
        "people_candidates": people,
        "source_urls": sorted(set(source_urls)),
    }


BOOL_COLS = [
    ("no_url", "no URL"),
    ("single_publisher", "one publisher"),
    ("timeline_oak_col", "technique per step"),
    ("funds_row", "funds row"),
    ("key_addresses", "key addresses"),
    ("root_cause", "root-cause evidence"),
    ("flow", "fund flow"),
]


def table(rows: list[dict]) -> list[str]:
    groups: dict[tuple[str, str], list[dict]] = defaultdict(list)
    for r in rows:
        groups[(r["era"], r["kind"])].append(r)
    out = ["| Era | Kind | Files | " + " | ".join(h for _, h in BOOL_COLS) + " | shortened ids | quotes/file |",
           "|---|---|---|" + "---|" * (len(BOOL_COLS) + 2)]
    for era in ERAS:
        for kind in ("single", "cohort", "year-only"):
            g = groups.get((era, kind))
            if not g:
                continue
            n = len(g)
            cells = [f"{sum(1 for r in g if r[c])} ({100 * sum(1 for r in g if r[c]) // n}%)" for c, _ in BOOL_COLS]
            trunc = sum(1 for r in g if r["truncated"])
            out.append(f"| {era} | {kind} | {n} | " + " | ".join(cells) + f" | {trunc} | {sum(r['quotes'] for r in g) / n:.1f} |")
    return out


def probe(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "oak-quality-report/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            return str(resp.status)
    except urllib.error.HTTPError as e:
        return str(e.code)
    except Exception as e:  # noqa: BLE001 - any network failure is a result here
        return type(e).__name__


def check_links(rows: list[dict]) -> dict[str, str]:
    cache = json.loads(CACHE.read_text()) if CACHE.exists() else {}
    urls = sorted({u for r in rows for u in r["source_urls"] if "x.com/" not in u and "twitter.com/" not in u})
    todo = [u for u in urls if u not in cache]
    with concurrent.futures.ThreadPoolExecutor(max_workers=16) as pool:
        for u, status in zip(todo, pool.map(probe, todo)):
            cache[u] = status
    CACHE.write_text(json.dumps(cache, indent=0, sort_keys=True))
    return {u: cache[u] for u in urls}


def sample(rows: list[dict], n: int, seed: int) -> list[dict]:
    """Stratified sample for a deep review. Half of each stratum comes from files with no URL when there are any."""
    rng = random.Random(seed)
    plan = [
        ("2026-09+", lambda r: r["era"] == "2026-09+", 8),
        ("2026-01…08", lambda r: r["era"] == "2026-01…08" and r["kind"] == "single", 6),
        ("2024–2025 single", lambda r: r["era"] == "2024–2025" and r["kind"] == "single", 8),
        ("2021–2023 single", lambda r: r["era"] == "2021–2023" and r["kind"] == "single", 8),
        ("≤2020", lambda r: r["era"] == "≤2020", 4),
        ("cohort / year-only", lambda r: r["kind"] != "single", 6),
    ]
    scale = n / 45
    picked: list[dict] = []
    seen: set[str] = set()
    top = sorted(rows, key=lambda r: -r["loss_usd"])[:10]
    for r in rng.sample(top, min(len(top), round(5 * scale))):
        picked.append({**r, "stratum": "top-10 by loss"})
        seen.add(r["file"])
    for label, pred, k in plan:
        k = max(1, round(k * scale))
        pool = sorted((r for r in rows if pred(r) and r["file"] not in seen), key=lambda r: r["file"])
        bare = [r for r in pool if r["no_url"]]
        rest = [r for r in pool if not r["no_url"]]
        take = rng.sample(bare, min(len(bare), k // 2))
        take += rng.sample(rest, min(len(rest), k - len(take)))
        for r in take:
            picked.append({**r, "stratum": label})
            seen.add(r["file"])
    return picked


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--links", action="store_true", help="probe inline source URLs (network; cached in tools/.link-cache.json)")
    ap.add_argument("--sample", type=int, metavar="N", help="print a stratified sample of about N files")
    ap.add_argument("--seed", type=int, default=20261127)
    args = ap.parse_args()

    rows = [measure(p) for p in sorted(EXAMPLES.glob("*.md"))]

    if args.sample:
        for r in sample(rows, args.sample, args.seed):
            print(f"{r['stratum']}\t{'no-url' if r['no_url'] else 'url'}\t{r['file']}")
        return 0

    links = check_links(rows) if args.links else {}
    bad = {u: s for u, s in links.items() if not s.startswith(("2", "3")) and s not in ("401", "403", "429")}

    if args.json:
        json.dump({"files": rows, "links": links}, sys.stdout, indent=1, ensure_ascii=False)
        return 0

    n = len(rows)
    print(f"# OAK quality report: {n} examples\n")
    print("\n".join(table(rows)))
    conf = Counter(r["confidence"] or "(no section)" for r in rows)
    print("\n**Root-cause confidence:** " + ", ".join(f"{k} {v}" for k, v in conf.most_common()))
    st = Counter((r["confidence"], r["source_type"]) for r in rows if r["confidence"])
    print("**Confidence by source type:** " + ", ".join(f"{c}/{s} {v}" for (c, s), v in sorted(st.items())))
    eo, es = sum(r["edges_oak"] for r in rows), sum(r["edges_source"] for r in rows)
    print(f"**Fund-flow edges:** {eo} verified by OAK, {es} relayed from a source, in {sum(1 for r in rows if r['flow'])} files")
    trunc = [r for r in rows if r["truncated"]]
    print(f"**Shortened addresses or hashes:** {len(trunc)} files ({sum(1 for r in trunc if r['kind'] != 'single')} of them cohort or year-only, which no gate scans)")
    ppl = [r for r in rows if r["people_candidates"]]
    print(f"**Named-person candidates in unattributed or pseudonymous files (for a human look):** {len(ppl)} files")
    thin = [r for r in rows if r["no_url"] and r["bibkeys"] == 0]
    print(f"**No URL and no citation key:** {len(thin)} files")
    if links:
        by_status = Counter(bad.values())
        files_bad = [r["file"] for r in rows if any(u in bad for u in r["source_urls"])]
        print(f"**Links:** {len(links)} probed (x.com skipped), {len(bad)} failing in {len(files_bad)} files: "
              + ", ".join(f"{k} {v}" for k, v in by_status.most_common()))
    return 0


if __name__ == "__main__":
    sys.exit(main())
