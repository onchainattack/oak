#!/usr/bin/env python3
"""
check_flow.py — validate the `## Fund flow` section of worked examples.

Why this exists: a timeline in prose cannot be drawn, queried, or joined
across incidents. The fund-flow block makes the money machine-readable:
who sent what to whom, in which transaction, and whether OAK traced it
itself (`verified: oak`) or relays a source (`verified: source`). It is
exported to oak.json as `fund_flow`, drawn as a graph on the site, and
feeds the cross-incident address index (tools/build_address_index.py).

Format — one fenced `oak-flow` YAML block inside `## Fund flow`:

    ## Fund flow

    ```oak-flow
    as_of: 2026-10-30T06:25Z
    nodes:
      - {id: b14, chain: ethereum, address: 0x28c6…(40 hex), role: victim-hot-wallet, label: Binance 14}
      - {id: tc, chain: ethereum, role: mixer, label: Tornado Cash}
    edges:
      - {from: b14, to: rcv, asset: ETH, amount: 167464, tx: 0x53bd…(64 hex),
         time: 2026-10-29T20:24:23Z, technique: T13.004, verified: oak}
    ```

Nodes: `id`, `chain`, `role` required; `address` optional (a pooled endpoint
such as "Tornado Cash" may have none) but must be complete when present.
Edges: `from`, `to`, `asset`, `verified` required; `verified: oak` requires
`tx`; `verified: source` requires `source`, a citekey from Public references.

Usage:
    python3 tools/check_flow.py                  # validate all examples
    python3 tools/check_flow.py --file <path>    # validate one file (hook mode)
"""

from __future__ import annotations

import datetime as _dt
import re
import sys
from pathlib import Path

import yaml

REPO = Path(__file__).resolve().parent.parent
EXAMPLES = REPO / "examples"

REQUIRED_FROM = "2026-11"   # single-incident examples dated >= this must carry the section

ROLES = {
    "attacker-eoa", "attack-contract", "attacker-receiver", "attacker-holding",
    "victim", "victim-hot-wallet", "vulnerable-contract",
    "mixer", "bridge", "cex-deposit", "dex", "lending", "issuer-freeze", "returned", "burn",
    "intermediary", "unknown",
}
VERIFIED = {"oak", "source"}

SECTION_RE = re.compile(r"^## Fund flow\s*$(.*?)(?=^## |\Z)", re.S | re.M)
BLOCK_RE = re.compile(r"```oak-flow\s*\n(.*?)```", re.S)
TECH_FIELD_RE = re.compile(r"\*\*OAK Techniques observed:\*\*(.*?)(?=\n\*\*|\n##|\Z)", re.S)
TAG_RE = re.compile(r"(?:OAK-)?(T\d+\.\d{3}(?:\.\d{3})?)")
CITEKEY_RE = re.compile(r"`\[([A-Za-z0-9_:-]+)\]`")
SINGLE_INCIDENT_RE = re.compile(r"^\d{4}-\d{2}-")
HEX_TOKEN_RE = re.compile(r"(?<![\w'\"])(0x[0-9a-fA-F]+|[0-9a-fA-F]{64})(?![\w'\"….])")

# Full-length identifiers per chain family. EVM addresses 40 hex, tx 64 hex;
# Bitcoin txids 64 hex (no 0x); Solana base58 32–44; Tron base58 starting with T.
EVM_ADDR = re.compile(r"^0x[0-9a-fA-F]{40}$")
EVM_TX = re.compile(r"^0x[0-9a-fA-F]{64}$")
HEX_TX = re.compile(r"^[0-9a-fA-F]{64}$")
BTC_ADDR = re.compile(r"^(bc1[0-9a-z]{25,87}|[13][1-9A-HJ-NP-Za-km-z]{25,34})$")
B58 = re.compile(r"^[1-9A-HJ-NP-Za-km-z]{32,44}$")
SOL_SIG = re.compile(r"^[1-9A-HJ-NP-Za-km-z]{64,90}$")
TRON_ADDR = re.compile(r"^T[1-9A-HJ-NP-Za-km-z]{33}$")
XRP_ADDR = re.compile(r"^r[1-9A-HJ-NP-Za-km-z]{24,34}$")

EVM_CHAINS = {"ethereum", "base", "arbitrum", "optimism", "polygon", "bsc", "avalanche",
              "gnosis", "linea", "scroll", "zksync", "blast", "mantle", "sonic", "hyperevm",
              "unichain", "berachain", "sei", "monad"}


def addr_ok(chain: str, a: str) -> bool:
    if chain in EVM_CHAINS:
        return bool(EVM_ADDR.match(a))
    if chain == "bitcoin":
        return bool(BTC_ADDR.match(a))
    if chain == "solana":
        return bool(B58.match(a))
    if chain == "tron":
        return bool(TRON_ADDR.match(a))
    if chain == "xrp":
        return bool(XRP_ADDR.match(a))
    return "…" not in a and "..." not in a and len(a) >= 20


def tx_ok(chain: str, t: str) -> bool:
    if chain in EVM_CHAINS:
        return bool(EVM_TX.match(t))
    if chain in ("bitcoin", "tron", "xrp"):
        return bool(HEX_TX.match(t))
    if chain == "solana":
        return bool(SOL_SIG.match(t))
    return "…" not in t and "..." not in t and len(t) >= 40


def parse_flow(text: str) -> dict | None:
    """Return the parsed oak-flow block ({as_of, nodes, edges}) or None.
    Raises ValueError on YAML that does not parse."""
    m = SECTION_RE.search(text)
    if not m:
        return None
    b = BLOCK_RE.search(m.group(1))
    if not b:
        return {}
    # YAML reads 0x… as an integer; quote hex identifiers before parsing so
    # addresses and hashes survive intact.
    raw = HEX_TOKEN_RE.sub(lambda h: f"'{h.group(1)}'", b.group(1))
    try:
        data = yaml.safe_load(raw) or {}
    except yaml.YAMLError as e:
        raise ValueError(f"oak-flow YAML does not parse: {e}") from e
    if not isinstance(data, dict):
        raise ValueError("oak-flow block must be a mapping with nodes and edges")
    # YAML turns timestamps into datetimes; keep everything JSON-plain, with
    # times as ISO-8601 UTC strings and identifiers as strings.
    for coll in ("nodes", "edges"):
        for item in data.get(coll) or []:
            if isinstance(item, dict):
                for k, v in list(item.items()):
                    if isinstance(v, (_dt.datetime, _dt.date)):
                        item[k] = _iso(v)
                    elif k in ("address", "tx", "id", "from", "to") and v is not None and not isinstance(v, str):
                        item[k] = str(v)
    if isinstance(data.get("as_of"), (_dt.datetime, _dt.date)):
        data["as_of"] = _iso(data["as_of"])
    return data


def _iso(v) -> str:
    if isinstance(v, _dt.datetime):
        if v.tzinfo is not None:
            v = v.astimezone(_dt.timezone.utc).replace(tzinfo=None)
        return v.isoformat(timespec="seconds") + "Z"
    return v.isoformat()


def check_text(name: str, text: str) -> list[str]:
    errs: list[str] = []
    try:
        flow = parse_flow(text)
    except ValueError as e:
        return [str(e)]
    if flow is None:
        if SINGLE_INCIDENT_RE.match(name) and name[:7] >= REQUIRED_FROM:
            errs.append(f"missing ## Fund flow (required for examples dated {REQUIRED_FROM} or later)")
        return errs
    if flow == {}:
        return ["## Fund flow has no ```oak-flow block"]
    nodes = flow.get("nodes") or []
    edges = flow.get("edges") or []
    if not nodes or not edges:
        errs.append("oak-flow needs at least one node and one edge")
    tf = TECH_FIELD_RE.search(text)
    declared = set(TAG_RE.findall(tf.group(1))) if tf else set()
    citekeys = set(CITEKEY_RE.findall(text))
    ids: dict[str, dict] = {}
    for i, n in enumerate(nodes, 1):
        if not isinstance(n, dict):
            errs.append(f"node {i}: not a mapping"); continue
        nid, chain, role = n.get("id"), str(n.get("chain", "")).lower(), n.get("role")
        if not nid or not chain or not role:
            errs.append(f"node {i}: id, chain and role are required")
            continue
        if nid in ids:
            errs.append(f"node {nid}: duplicate id")
        ids[nid] = n
        if role not in ROLES:
            errs.append(f"node {nid}: role '{role}' not one of {sorted(ROLES)}")
        a = n.get("address")
        if a and not addr_ok(chain, a):
            errs.append(f"node {nid}: address '{a}' is not a full {chain} address")
    for i, e in enumerate(edges, 1):
        if not isinstance(e, dict):
            errs.append(f"edge {i}: not a mapping"); continue
        tag = f"edge {i} ({e.get('from')}→{e.get('to')})"
        for k in ("from", "to", "asset", "verified"):
            if not e.get(k):
                errs.append(f"{tag}: missing {k}")
        for end in ("from", "to"):
            if e.get(end) and e[end] not in ids:
                errs.append(f"{tag}: '{e[end]}' is not a node id")
        v = e.get("verified")
        if v and v not in VERIFIED:
            errs.append(f"{tag}: verified '{v}' not one of {sorted(VERIFIED)}")
        chain = str(ids.get(str(e.get("from")), {}).get("chain", "")).lower()
        t = e.get("tx")
        if t and not tx_ok(chain, t):
            errs.append(f"{tag}: tx '{t}' is not a full {chain} transaction id")
        if v == "oak" and not t:
            errs.append(f"{tag}: verified: oak requires the tx")
        if v == "source":
            src = e.get("source")
            if not src:
                errs.append(f"{tag}: verified: source requires source (a Public references citekey)")
            elif src not in citekeys:
                errs.append(f"{tag}: source '{src}' is not a citekey in Public references")
        tech = e.get("technique")
        if tech:
            t_id = TAG_RE.search(str(tech))
            if t_id and declared and t_id.group(1) not in declared:
                errs.append(f"{tag}: technique {t_id.group(1)} not declared in **OAK Techniques observed:**")
    return errs


def main(argv: list[str]) -> int:
    if "--file" in argv:
        files = [Path(argv[argv.index("--file") + 1])]
    else:
        files = sorted(EXAMPLES.glob("*.md"))
    failures = with_flow = 0
    for p in files:
        text = p.read_text(encoding="utf-8")
        if SECTION_RE.search(text):
            with_flow += 1
        errs = check_text(p.name, text)
        if errs:
            failures += 1
            print(f"  {p.name}:")
            for e in errs:
                print(f"    - {e}")
    if "--file" not in argv:
        print(f"OAK fund flow — {len(files)} examples; {with_flow} with a flow block")
    if failures:
        print(f"FAIL: {failures} example(s) with fund-flow errors")
        return 1
    if "--file" not in argv:
        print("OK")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
