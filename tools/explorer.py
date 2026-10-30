#!/usr/bin/env python3
"""
explorer.py — keyless on-chain lookups and fund tracing for OAK examples.

Why this exists: a timeline that says "where the funds went: undisclosed"
often means only that the cited sources stopped looking. The chain itself
is public. This tool lets an agent (or a person) follow the money from an
incident's seed addresses and emit edges in the `oak-flow` shape that
tools/check_flow.py validates, marked `verified: oak`.

Providers (no API key needed; hosts in tools/chains.json):
    EVM      Blockscout REST v2 (ethereum, base, arbitrum, optimism, polygon, gnosis)
             Etherscan v2 is used instead when ETHERSCAN_API_KEY is set (any EVM chain)
    bitcoin  mempool.space REST
    others   not yet implemented: the command says so instead of guessing

Responses are cached under .cache/explorer/ (gitignored), so re-running a
trace is free and reproducible. Requests are paced and retried on 429/5xx.

Commands (all print JSON to stdout):
    explorer.py tx <chain> <hash>
        One transaction: sender, receiver, native value, token transfers,
        internal (contract) value transfers.
    explorer.py transfers <chain> <address> [--limit N]
        Recent incoming and outgoing transfers of an address.
    explorer.py info <chain> <address>
        Contract or EOA, explorer name/tags, balance.
    explorer.py trace <chain> <seed> [<seed>...] [--hops 2] [--min-amount X]
                      [--asset SYMBOL] [--after ISO] [--before ISO] [--limit N] [--yaml]
        Breadth-first walk over OUTGOING transfers from the seeds. Stops at
        addresses labelled in tools/address_labels.yaml or tagged by the
        explorer (mixer, bridge, exchange), and at --hops. Prints candidate
        oak-flow nodes and edges (verified: oak). --yaml prints a block ready
        to paste into `## Fund flow`; review it before you do. Edges are
        aggregated per from/to/asset (tx = first, tx_count, time_last);
        --raw keeps one edge per transfer.
        Token transfers of counterfeit tokens (no price, <1000 holders, not
        allowlisted) are skipped and counted: around large thefts, poisoning
        bots emit fake "ETH"/"USDT" Transfer events to lookalike addresses.

Examples:
    python3 tools/explorer.py tx ethereum 0x53bd38b816c23e74134786c29a8c18d792777998a3b9326047b583100e88e2f3
    python3 tools/explorer.py trace ethereum 0x5227f603c1ee34ce3c06efe6477003bdfccb2f8c --hops 1 --min-amount 1000 --asset ETH --yaml
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import deque
from decimal import Decimal
from pathlib import Path

import yaml

REPO = Path(__file__).resolve().parent.parent
CACHE = REPO / ".cache" / "explorer"
CHAINS = json.loads((REPO / "tools" / "chains.json").read_text(encoding="utf-8"))
LABELS_FILE = REPO / "tools" / "address_labels.yaml"

UA = "OAK-explorer/1 (+https://onchainattack.org)"
MIN_INTERVAL = 0.25          # seconds between live requests (keyless tiers)
_last_request = 0.0

# Explorer tag words that mean "stop tracing here, this is an endpoint".
ENDPOINT_HINTS = {
    "tornado": "mixer", "mixer": "mixer", "railgun": "mixer",
    "bridge": "bridge", "wormhole": "bridge", "layerzero": "bridge", "stargate": "bridge",
    "across": "bridge", "thorchain": "bridge", "cctp": "bridge",
    "binance": "cex-deposit", "okx": "cex-deposit", "coinbase": "cex-deposit", "kraken": "cex-deposit",
    "bybit": "cex-deposit", "kucoin": "cex-deposit", "htx": "cex-deposit", "huobi": "cex-deposit",
    "gate.io": "cex-deposit", "mexc": "cex-deposit", "bitget": "cex-deposit", "exchange": "cex-deposit",
    "uniswap": "dex", "sushiswap": "dex", "pancake": "dex", "1inch": "dex", "0x protocol": "dex",
    "cow protocol": "dex", "aave": "lending",
}


class ExplorerError(Exception):
    pass


# --------------------------------------------------------------------------- http

def http_json(url: str, params: dict | None = None, *, cache: bool = True, post: dict | None = None):
    global _last_request
    if params:
        url = f"{url}?{urllib.parse.urlencode(params)}"
    key_src = url + (json.dumps(post, sort_keys=True) if post else "")
    # never let an API key end up in a cache file name or a printed error
    redacted = url.replace(os.environ.get("ETHERSCAN_API_KEY", "\0"), "***")
    path = CACHE / (hashlib.sha1(key_src.encode()).hexdigest() + ".json")
    if cache and path.exists():
        return json.loads(path.read_text(encoding="utf-8"))
    data = json.dumps(post).encode() if post else None
    headers = {"User-Agent": UA, "Accept": "application/json"}
    if post:
        headers["Content-Type"] = "application/json"
    body = None
    for attempt in range(5):
        wait = MIN_INTERVAL - (time.time() - _last_request)
        if wait > 0:
            time.sleep(wait)
        _last_request = time.time()
        try:
            req = urllib.request.Request(url, data=data, headers=headers)
            with urllib.request.urlopen(req, timeout=40) as r:
                body = json.loads(r.read().decode("utf-8"))
            break
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503, 504) and attempt < 4:
                time.sleep(2 ** attempt)
                continue
            raise ExplorerError(f"HTTP {e.code} for {redacted}") from e
        except (urllib.error.URLError, TimeoutError) as e:
            if attempt < 4:
                time.sleep(2 ** attempt)
                continue
            raise ExplorerError(f"network error for {redacted}: {e}") from e
    if cache:
        CACHE.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(body), encoding="utf-8")
    return body


# --------------------------------------------------------------------------- labels

def load_labels() -> dict[tuple[str, str], dict]:
    if not LABELS_FILE.exists():
        return {}
    raw = yaml.safe_load(
        # quote hex so YAML keeps addresses as strings
        __import__("re").sub(r"(?<![\w'\"])(0x[0-9a-fA-F]{40})(?![\w'\"])", r"'\1'", LABELS_FILE.read_text(encoding="utf-8"))
    ) or {}
    out = {}
    for chain, entries in raw.items():
        for e in entries or []:
            out[(chain, str(e["address"]).lower())] = e
            if e.get("role") == "token":
                TOKEN_ALLOW[str(e["address"]).lower()] = e
    return out


TOKEN_ALLOW: dict[str, dict] = {}


def endpoint_role(text: str) -> str | None:
    t = (text or "").lower()
    for hint, role in ENDPOINT_HINTS.items():
        if hint in t:
            return role
    return None


# --------------------------------------------------------------------------- units

def scaled(value, decimals) -> Decimal:
    try:
        return Decimal(str(value)) / (Decimal(10) ** int(decimals or 0))
    except Exception:
        return Decimal(0)


def num(d: Decimal):
    """Decimal → int/float for JSON/YAML, keeping it readable."""
    if d == d.to_integral_value():
        return int(d)
    return float(round(d, 8))


# --------------------------------------------------------------------------- blockscout (EVM)

def bs_base(chain: str) -> str:
    base = CHAINS.get(chain, {}).get("blockscout")
    if not base:
        raise ExplorerError(f"no keyless EVM provider configured for '{chain}' yet (see tools/chains.json)")
    return base + "/api/v2"


def bs_addr(obj) -> tuple[str, str, bool]:
    """Blockscout address object → (address, name/tags text, is_contract)."""
    if not obj:
        return "", "", False
    tags = " ".join(t.get("name", "") or t.get("label", "") for t in (obj.get("metadata") or {}).get("tags", []) or [])
    name = " ".join(x for x in (obj.get("name") or "", tags,
                                " ".join(p.get("display_name", "") for p in obj.get("public_tags") or [])) if x)
    return (obj.get("hash") or "").lower(), name.strip(), bool(obj.get("is_contract"))


def bs_token_trusted(tok: dict) -> bool:
    """Counterfeit tokens are the norm around big thefts: address-poisoning
    bots emit Transfer events of fake "ETH"/"USDT"/"USDC" contracts that copy
    the real symbol and use lookalike addresses. A token counts only if the
    explorer prices it or it has a real holder base, or it is allowlisted in
    tools/address_labels.yaml (role: token)."""
    if not tok:
        return False
    addr = (tok.get("address_hash") or tok.get("address") or "").lower()
    if (TOKEN_ALLOW.get(addr)):
        return True
    if tok.get("exchange_rate"):
        return True
    try:
        return int(tok.get("holders_count") or tok.get("holders") or 0) >= 1000
    except (TypeError, ValueError):
        return False


def bs_tx(chain: str, h: str) -> dict:
    base = bs_base(chain)
    native = CHAINS[chain].get("native", "ETH")
    t = http_json(f"{base}/transactions/{h}")
    frm, frm_name, _ = bs_addr(t.get("from"))
    to, to_name, _ = bs_addr(t.get("to"))
    transfers = []
    if Decimal(t.get("value") or 0) > 0:
        transfers.append({"from": frm, "to": to, "asset": native, "amount": num(scaled(t["value"], 18)), "kind": "native"})
    for it in _bs_pages(f"{base}/transactions/{h}/internal-transactions", max_items=500):
        if Decimal(it.get("value") or 0) > 0:
            a, _, _ = bs_addr(it.get("from"))
            b, _, _ = bs_addr(it.get("to"))
            transfers.append({"from": a, "to": b, "asset": native, "amount": num(scaled(it["value"], 18)), "kind": "internal"})
    for it in _bs_pages(f"{base}/transactions/{h}/token-transfers", max_items=500):
        a, _, _ = bs_addr(it.get("from"))
        b, _, _ = bs_addr(it.get("to"))
        tok = it.get("token") or {}
        total = it.get("total") or {}
        transfers.append({"from": a, "to": b, "asset": tok.get("symbol") or tok.get("address_hash", "?"),
                          "token": (tok.get("address_hash") or tok.get("address") or "").lower(),
                          "trusted": bs_token_trusted(tok),
                          "amount": num(scaled(total.get("value") or 0, total.get("decimals") or tok.get("decimals") or 0)),
                          "kind": "token"})
    return {"chain": chain, "tx": h, "time": t.get("timestamp"), "status": t.get("status"),
            "from": frm, "from_name": frm_name, "to": to, "to_name": to_name,
            "method": t.get("method"), "transfers": transfers}


def _bs_pages(url: str, params: dict | None = None, max_items: int = 200):
    params = dict(params or {})
    n = 0
    while True:
        d = http_json(url, params)
        for it in d.get("items", []):
            yield it
            n += 1
            if n >= max_items:
                return
        nxt = d.get("next_page_params")
        if not nxt:
            return
        params = {**params, **nxt}


def bs_transfers(chain: str, address: str, limit: int = 200) -> list[dict]:
    base = bs_base(chain)
    native = CHAINS[chain].get("native", "ETH")
    a = address.lower()
    out = []
    for it in _bs_pages(f"{base}/addresses/{address}/token-transfers", max_items=limit):
        f, fn, _ = bs_addr(it.get("from"))
        t, tn, _ = bs_addr(it.get("to"))
        tok = it.get("token") or {}
        total = it.get("total") or {}
        out.append({"tx": it.get("transaction_hash") or it.get("tx_hash"), "time": it.get("timestamp"),
                    "from": f, "from_name": fn, "to": t, "to_name": tn,
                    "asset": tok.get("symbol") or "?", "token": (tok.get("address_hash") or tok.get("address") or "").lower(),
                    "trusted": bs_token_trusted(tok),
                    "amount": num(scaled(total.get("value") or 0, total.get("decimals") or tok.get("decimals") or 0)),
                    "direction": "out" if f == a else "in", "kind": "token"})
    for it in _bs_pages(f"{base}/addresses/{address}/transactions", max_items=limit):
        if Decimal(it.get("value") or 0) <= 0:
            continue
        f, fn, _ = bs_addr(it.get("from"))
        t, tn, _ = bs_addr(it.get("to"))
        out.append({"tx": it.get("hash"), "time": it.get("timestamp"), "from": f, "from_name": fn, "to": t, "to_name": tn,
                    "asset": native, "amount": num(scaled(it["value"], 18)),
                    "direction": "out" if f == a else "in", "kind": "native"})
    for it in _bs_pages(f"{base}/addresses/{address}/internal-transactions", max_items=limit):
        if Decimal(it.get("value") or 0) <= 0:
            continue
        f, fn, _ = bs_addr(it.get("from"))
        t, tn, _ = bs_addr(it.get("to"))
        out.append({"tx": it.get("transaction_hash"), "time": it.get("timestamp"), "from": f, "from_name": fn,
                    "to": t, "to_name": tn, "asset": native, "amount": num(scaled(it["value"], 18)),
                    "direction": "out" if f == a else "in", "kind": "internal"})
    out.sort(key=lambda x: x.get("time") or "")
    return out


def bs_info(chain: str, address: str) -> dict:
    d = http_json(f"{bs_base(chain)}/addresses/{address}")
    a, name, is_contract = bs_addr(d)
    return {"chain": chain, "address": a or address.lower(), "name": name, "is_contract": is_contract,
            "balance": num(scaled(d.get("coin_balance") or 0, 18)), "native": CHAINS[chain].get("native"),
            "implementations": [i.get("address") or i.get("address_hash") for i in d.get("implementations") or []]}


# --------------------------------------------------------------------------- mempool.space (bitcoin)

def mp_base() -> str:
    return CHAINS["bitcoin"]["mempool"]


def _mp_norm(t: dict, focus: str | None = None) -> dict:
    ins = [{"address": v.get("prevout", {}).get("scriptpubkey_address", ""), "btc": num(scaled(v.get("prevout", {}).get("value", 0), 8))}
           for v in t.get("vin", [])]
    outs = [{"address": v.get("scriptpubkey_address", ""), "btc": num(scaled(v.get("value", 0), 8))} for v in t.get("vout", [])]
    st = t.get("status") or {}
    when = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(st["block_time"])) if st.get("block_time") else None
    r = {"chain": "bitcoin", "tx": t.get("txid"), "time": when, "block": st.get("block_height"),
         "inputs": ins, "outputs": outs, "fee_btc": num(scaled(t.get("fee", 0), 8))}
    if focus:
        sent = sum(Decimal(str(i["btc"])) for i in ins if i["address"] == focus)
        r["direction"] = "out" if sent > 0 else "in"
    return r


def mp_tx(txid: str) -> dict:
    return _mp_norm(http_json(f"{mp_base()}/tx/{txid}"))


def mp_transfers(address: str, limit: int = 200) -> list[dict]:
    out, last = [], None
    while len(out) < limit:
        url = f"{mp_base()}/address/{address}/txs" + (f"/chain/{last}" if last else "")
        page = http_json(url)
        if not page:
            break
        for t in page:
            n = _mp_norm(t, address)
            if n["direction"] == "out":
                # one edge per output that does not return to the sender (change)
                for o in n["outputs"]:
                    if o["address"] and o["address"] != address:
                        out.append({"tx": n["tx"], "time": n["time"], "from": address, "to": o["address"],
                                    "asset": "BTC", "amount": o["btc"], "direction": "out", "kind": "utxo"})
            else:
                got = Decimal(sum(Decimal(str(o["btc"])) for o in n["outputs"] if o["address"] == address))
                src = next((i["address"] for i in n["inputs"] if i["address"]), "")
                out.append({"tx": n["tx"], "time": n["time"], "from": src, "to": address,
                            "asset": "BTC", "amount": num(got), "direction": "in", "kind": "utxo"})
        if len(page) < 25:
            break
        last = page[-1]["txid"]
    return out[:limit]


def mp_info(address: str) -> dict:
    d = http_json(f"{mp_base()}/address/{address}", cache=False)
    cs, ms = d.get("chain_stats", {}), d.get("mempool_stats", {})
    bal = (cs.get("funded_txo_sum", 0) - cs.get("spent_txo_sum", 0)
           + ms.get("funded_txo_sum", 0) - ms.get("spent_txo_sum", 0))
    return {"chain": "bitcoin", "address": address, "balance": num(scaled(bal, 8)), "native": "BTC",
            "tx_count": cs.get("tx_count", 0) + ms.get("tx_count", 0)}


# --------------------------------------------------------------------------- etherscan v2 (optional, keyed)

def es_key() -> str | None:
    return os.environ.get("ETHERSCAN_API_KEY") or None


def es_call(chain: str, params: dict):
    cid = CHAINS.get(chain, {}).get("chainid")
    if not cid:
        raise ExplorerError(f"no chainid for {chain}")
    d = http_json("https://api.etherscan.io/v2/api", {"chainid": cid, **params, "apikey": es_key()})
    if str(d.get("status")) == "0" and "No transactions" not in str(d.get("message")):
        raise ExplorerError(f"etherscan: {d.get('message')}: {d.get('result')}")
    return d.get("result") or []


def es_transfers(chain: str, address: str, limit: int = 200) -> list[dict]:
    a = address.lower()
    native = CHAINS[chain].get("native", "ETH")
    out = []
    base = {"module": "account", "address": address, "page": 1, "offset": min(limit, 1000), "sort": "asc"}
    for it in es_call(chain, {**base, "action": "tokentx"}):
        out.append({"tx": it["hash"], "time": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(int(it["timeStamp"]))),
                    "from": it["from"].lower(), "to": it["to"].lower(), "asset": it.get("tokenSymbol") or "?",
                    "token": it.get("contractAddress", "").lower(),
                    "trusted": it.get("contractAddress", "").lower() in TOKEN_ALLOW,
                    "amount": num(scaled(it["value"], it.get("tokenDecimal") or 0)),
                    "direction": "out" if it["from"].lower() == a else "in", "kind": "token"})
    for action, kind in (("txlist", "native"), ("txlistinternal", "internal")):
        for it in es_call(chain, {**base, "action": action}):
            if int(it.get("value") or 0) <= 0:
                continue
            out.append({"tx": it["hash"], "time": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(int(it["timeStamp"]))),
                        "from": it["from"].lower(), "to": (it.get("to") or "").lower(), "asset": native,
                        "amount": num(scaled(it["value"], 18)),
                        "direction": "out" if it["from"].lower() == a else "in", "kind": kind})
    out.sort(key=lambda x: x["time"])
    return out


# --------------------------------------------------------------------------- dispatch

def family(chain: str) -> str:
    if chain not in CHAINS:
        raise ExplorerError(f"unknown chain '{chain}'; known: {', '.join(k for k in CHAINS if not k.startswith('_'))}")
    return CHAINS[chain]["family"]


def get_tx(chain: str, h: str) -> dict:
    f = family(chain)
    if f == "evm":
        return bs_tx(chain, h)
    if f == "utxo":
        return mp_tx(h)
    raise ExplorerError(f"tx lookup for {chain} is not implemented yet")


def get_transfers(chain: str, address: str, limit: int) -> list[dict]:
    f = family(chain)
    if f == "evm":
        if es_key():
            return es_transfers(chain, address, limit)
        return bs_transfers(chain, address, limit)
    if f == "utxo":
        return mp_transfers(address, limit)
    raise ExplorerError(f"transfer listing for {chain} is not implemented yet")


def get_info(chain: str, address: str) -> dict:
    f = family(chain)
    if f == "evm":
        return bs_info(chain, address)
    if f == "utxo":
        return mp_info(address)
    raise ExplorerError(f"address info for {chain} is not implemented yet")


# --------------------------------------------------------------------------- trace

def trace(chain: str, seeds: list[str], hops: int, min_amount: float, asset: str | None,
          after: str | None, before: str | None, limit: int, include_unverified: bool = False) -> dict:
    labels = load_labels()
    skipped_fake = 0
    is_evm = family(chain) == "evm"
    norm = (lambda a: a.lower()) if is_evm else (lambda a: a)
    nodes: dict[str, dict] = {}
    edges: list[dict] = []
    seen_edges: set[tuple] = set()

    def node_for(addr: str, name: str = "", role_hint: str | None = None) -> str:
        addr = norm(addr)
        if addr in nodes:
            return nodes[addr]["id"]
        lab = labels.get((chain, addr))
        if addr in ("0x0000000000000000000000000000000000000000", "0x000000000000000000000000000000000000dead"):
            role_hint = "burn"
        role = (lab or {}).get("role") or role_hint or endpoint_role(name) or "intermediary"
        n = {"id": f"a{len(nodes) + 1}", "chain": chain, "address": addr, "role": role}
        label = (lab or {}).get("label") or name
        if label:
            n["label"] = label
        nodes[addr] = n
        return n["id"]

    for s in seeds:
        node_for(s, role_hint="attacker-receiver")
    queue = deque((norm(s), 0) for s in seeds)
    expanded: set[str] = set()
    while queue:
        addr, depth = queue.popleft()
        if addr in expanded or depth >= hops:
            continue
        expanded.add(addr)
        for t in get_transfers(chain, addr, limit):
            if t["direction"] != "out" or not t.get("to"):
                continue
            if t.get("kind") == "token" and not t.get("trusted") and not include_unverified:
                skipped_fake += 1
                continue
            if asset and t["asset"].upper() != asset.upper():
                continue
            if t["amount"] <= 0 or t["amount"] < min_amount:
                # zero-value transfers out of an address are almost always
                # address poisoning (transferFrom of 0 by a third party)
                continue
            if after and (t.get("time") or "") < after:
                continue
            if before and (t.get("time") or "") > before:
                continue
            key = (t["tx"], t["from"], t["to"], t["asset"], t["amount"])
            if key in seen_edges:
                continue
            seen_edges.add(key)
            to_id = node_for(t["to"], t.get("to_name", ""))
            edges.append({"from": nodes[norm(addr)]["id"], "to": to_id, "asset": t["asset"], "amount": t["amount"],
                          "tx": t["tx"], "time": t.get("time"), "verified": "oak"})
            role = nodes[norm(t["to"])]["role"]
            if role in ("intermediary", "attacker-holding", "attacker-receiver", "unknown"):
                # endpoints (dex, bridge, mixer, cex, burn) are not expanded
                queue.append((norm(t["to"]), depth + 1))
    return {"chain": chain, "seeds": seeds, "hops": hops,
            "as_of": time.strftime("%Y-%m-%dT%H:%MZ", time.gmtime()),
            "skipped_unverified_token_transfers": skipped_fake,
            "nodes": list(nodes.values()), "edges": edges}


def aggregate(result: dict) -> dict:
    """Collapse edges with the same from/to/asset into one: amounts summed,
    first tx kept as `tx`, `tx_count` and `time_last` added. A graph needs
    "sold 9.4M PLUME into this pool in 14 swaps", not 14 arrows."""
    groups: dict[tuple, dict] = {}
    for e in result["edges"]:
        k = (e["from"], e["to"], e["asset"])
        g = groups.get(k)
        if not g:
            groups[k] = {**e, "tx_count": 1, "time_last": e.get("time")}
            continue
        g["amount"] = num(Decimal(str(g["amount"])) + Decimal(str(e["amount"])))
        g["tx_count"] += 1
        if (e.get("time") or "") < (g.get("time") or ""):
            g["time"], g["tx"] = e.get("time"), e["tx"]
        if (e.get("time") or "") > (g.get("time_last") or ""):
            g["time_last"] = e.get("time")
    edges = sorted(groups.values(), key=lambda e: e.get("time") or "")
    for e in edges:
        if e["tx_count"] == 1:
            e.pop("tx_count"); e.pop("time_last")
    return {**result, "edges": edges}


def to_flow_yaml(result: dict) -> str:
    lines = [f"as_of: {result['as_of']}", "nodes:"]
    for n in result["nodes"]:
        parts = [f"id: {n['id']}", f"chain: {n['chain']}", f"address: {n['address']}", f"role: {n['role']}"]
        if n.get("label"):
            parts.append(f"label: {json.dumps(n['label'])}")
        lines.append("  - {" + ", ".join(parts) + "}")
    lines.append("edges:")
    for e in result["edges"]:
        t = (e.get("time") or "").replace(".000000Z", "Z")
        lines.append("  - {" + ", ".join([
            f"from: {e['from']}", f"to: {e['to']}", f"asset: {json.dumps(e['asset'])}", f"amount: {e['amount']}",
            f"tx: {e['tx']}", f"time: {t}"]
            + ([f"tx_count: {e['tx_count']}", f"time_last: {(e.get('time_last') or '').replace('.000000Z', 'Z')}"]
               if e.get("tx_count") else [])
            + ["verified: oak"]) + "}")
    return "\n".join(lines)


# --------------------------------------------------------------------------- cli

def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser(description=(__doc__ or "").split("\n\n")[0])
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("tx"); p.add_argument("chain"); p.add_argument("hash")
    p = sub.add_parser("transfers"); p.add_argument("chain"); p.add_argument("address"); p.add_argument("--limit", type=int, default=200)
    p = sub.add_parser("info"); p.add_argument("chain"); p.add_argument("address")
    p = sub.add_parser("trace"); p.add_argument("chain"); p.add_argument("seeds", nargs="+")
    p.add_argument("--hops", type=int, default=2); p.add_argument("--min-amount", type=float, default=0.0)
    p.add_argument("--asset"); p.add_argument("--after"); p.add_argument("--before")
    p.add_argument("--limit", type=int, default=2000); p.add_argument("--yaml", action="store_true")
    p.add_argument("--raw", action="store_true", help="one edge per transfer instead of per from/to/asset")
    p.add_argument("--include-unverified-tokens", action="store_true",
                   help="also follow tokens with no price and few holders (usually address-poisoning fakes)")
    a = ap.parse_args(argv)
    try:
        load_labels()
        if a.cmd == "tx":
            out = get_tx(a.chain, a.hash)
        elif a.cmd == "transfers":
            out = get_transfers(a.chain, a.address, a.limit)
        elif a.cmd == "info":
            out = get_info(a.chain, a.address)
        else:
            load_labels()
            out = trace(a.chain, a.seeds, a.hops, a.min_amount, a.asset, a.after, a.before, a.limit,
                        a.include_unverified_tokens)
            if not a.raw:
                out = aggregate(out)
            if a.yaml:
                print(to_flow_yaml(out))
                return 0
    except ExplorerError as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        return 2
    print(json.dumps(out, indent=2, default=str))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
