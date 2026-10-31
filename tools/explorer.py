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
    fallback public JSON-RPC (tools/chains.json "rpc") when the indexer is
             blocked or absent (Base, Polygon, BSC, ...): tx lookups see every
             token Transfer log; transfer listing covers allowlisted tokens
             only and needs --after/--before; native-coin hops are visible
             only inside a known tx
    avalanche Routescan (Etherscan-compatible, keyless)
    EOA native sends over RPC: nonce walk (archive eth_getTransactionCount),
             capped at 60 txs per window
    solana   public RPC: getSignaturesForAddress + getTransaction balance
             deltas (SOL and SPL tokens; USDC/USDT/wSOL trusted)
    tron     TronGrid v1: TRC20 transfers and TRX TransferContract
             (USDT/USDC trusted)
    others   (XRP, …) not yet implemented: the command says so instead of guessing

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
        # "shared": same contract address on every EVM chain (e.g. a swap executor)
        chains = [c for c, v in CHAINS.items() if not c.startswith("_") and v.get("family") == "evm"] if chain == "shared" else [chain]
        for e in entries or []:
            for c in chains:
                out[(c, str(e["address"]).lower())] = e
            if e.get("role") == "token":
                TOKEN_ALLOW[str(e["address"]).lower()] = e
    LABELS.update(out)
    return out


TOKEN_ALLOW: dict[str, dict] = {}
LABELS: dict[tuple[str, str], dict] = {}


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
    rs = CHAINS.get(chain, {}).get("routescan")
    if rs and not es_key():
        # Routescan: Etherscan-compatible, keyless (Avalanche C-chain)
        d = http_json(rs, params)
    else:
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


# --------------------------------------------------------------------------- public JSON-RPC (EVM fallback)
# Used where no keyless indexer answers (Blockscout behind a bot challenge,
# or none for the chain). Public nodes require a contract address in
# eth_getLogs, so transfer listing covers the allowlisted tokens in
# tools/address_labels.yaml only; native-coin transfers are not visible in
# logs and appear only inside a known tx (`tx` command).

TRANSFER_TOPIC = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
_token_meta: dict[tuple[str, str], tuple[str, int]] = {}


_rpc_dead: set[str] = set()


def rpc(chain: str, method: str, params: list, cache: bool = True):
    urls = CHAINS.get(chain, {}).get("rpc") or []
    if isinstance(urls, str):
        urls = [urls]
    if not urls:
        raise ExplorerError(f"no public RPC configured for '{chain}' (tools/chains.json)")
    last: Exception | None = None
    for url in [u for u in urls if u not in _rpc_dead] or urls:
        try:
            d = http_json(url, post={"jsonrpc": "2.0", "id": 1, "method": method, "params": params}, cache=cache)
        except ExplorerError as e:
            # a public node that rate-limits or challenges us: use the next one
            _rpc_dead.add(url)
            last = e
            continue
        if "error" in d:
            raise ExplorerError(f"rpc {method}: {d['error'].get('message')}")
        return d.get("result")
    raise ExplorerError(f"all public RPCs failed for {chain}: {last}")


def _decode_str(hexdata: str) -> str:
    b = bytes.fromhex((hexdata or "0x")[2:])
    if len(b) >= 64:
        n = int.from_bytes(b[32:64], "big")
        return b[64:64 + n].decode("utf-8", "replace")
    return b.rstrip(b"\0").decode("utf-8", "replace")


def token_meta(chain: str, token: str) -> tuple[str, int]:
    key = (chain, token)
    if key not in _token_meta:
        lab = TOKEN_ALLOW.get(token) or {}
        try:
            sym = lab.get("label") or _decode_str(rpc(chain, "eth_call", [{"to": token, "data": "0x95d89b41"}, "latest"])) or "?"
        except ExplorerError:
            sym = "?"
        try:
            dec = int(rpc(chain, "eth_call", [{"to": token, "data": "0x313ce567"}, "latest"]), 16)
        except (ExplorerError, ValueError, TypeError):
            dec = 18
        _token_meta[key] = (sym, dec)
    return _token_meta[key]


def _block_time(chain: str, number: int) -> int:
    b = rpc(chain, "eth_getBlockByNumber", [hex(number), False])
    return int(b["timestamp"], 16)


def block_at(chain: str, iso: str) -> int:
    """Last block with timestamp <= iso. Interpolation search: block times
    are near-regular, so a handful of lookups lands within a few blocks."""
    target = int(time.mktime(time.strptime(iso[:19], "%Y-%m-%dT%H:%M:%S")) - time.timezone)
    hi = int(rpc(chain, "eth_blockNumber", [], cache=False), 16)
    t_hi = _block_time(chain, hi)
    if t_hi <= target:
        return hi
    lo = max(1, hi - 2_000_000)
    t_lo = _block_time(chain, lo)
    while t_lo > target and lo > 1:
        lo = max(1, lo - (hi - lo))
        t_lo = _block_time(chain, lo)
    for _ in range(40):
        if hi - lo <= 1:
            break
        guess = lo + int((target - t_lo) * (hi - lo) / max(1, t_hi - t_lo))
        guess = min(hi - 1, max(lo + 1, guess))
        t = _block_time(chain, guess)
        if t <= target:
            lo, t_lo = guess, t
        else:
            hi, t_hi = guess, t
    return lo


def _iso(ts: int) -> str:
    return time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(ts))


def _topic_addr(a: str) -> str:
    return "0x" + "0" * 24 + a.lower()[2:]


def rpc_tx(chain: str, h: str) -> dict:
    native = CHAINS[chain].get("native", "ETH")
    t = rpc(chain, "eth_getTransactionByHash", [h])
    if not t:
        raise ExplorerError(f"tx {h} not found on {chain}")
    r = rpc(chain, "eth_getTransactionReceipt", [h])
    ts = _block_time(chain, int(t["blockNumber"], 16))
    transfers = []
    if int(t.get("value") or "0x0", 16) > 0:
        transfers.append({"from": t["from"].lower(), "to": (t.get("to") or "").lower(), "asset": native,
                          "amount": num(scaled(int(t["value"], 16), 18)), "kind": "native"})
    for lg in r.get("logs", []):
        tp = lg.get("topics") or []
        if len(tp) != 3 or tp[0] != TRANSFER_TOPIC:
            continue
        token = lg["address"].lower()
        sym, dec = token_meta(chain, token)
        transfers.append({"from": "0x" + tp[1][-40:], "to": "0x" + tp[2][-40:], "asset": sym, "token": token,
                          "trusted": token in TOKEN_ALLOW,
                          "amount": num(scaled(int(lg.get("data") or "0x0", 16), dec)), "kind": "token"})
    return {"chain": chain, "tx": h, "time": _iso(ts), "status": "ok" if r.get("status") == "0x1" else "failed",
            "from": t["from"].lower(), "to": (t.get("to") or "").lower(), "provider": "rpc",
            "note": "internal (contract) native transfers are not visible over public RPC",
            "transfers": transfers}


def _get_logs(chain: str, token: str, topics: list, lo: int, hi: int) -> list:
    """eth_getLogs in chunks: public nodes cap block ranges and result counts
    with assorted messages, so any error shrinks the chunk and retries."""
    out, start, span = [], lo, min(10_000, max(1, hi - lo + 1))
    while start <= hi:
        end = min(hi, start + span - 1)
        try:
            out += rpc(chain, "eth_getLogs", [{"address": token, "fromBlock": hex(start), "toBlock": hex(end), "topics": topics}])
            start = end + 1
        except ExplorerError:
            if span <= 50:
                raise
            span = max(50, span // 4)
    return out


def rpc_transfers(chain: str, address: str, after: str | None, before: str | None) -> list[dict]:
    if not after or not before:
        raise ExplorerError(f"{chain}: public-RPC mode needs a time window (--after and --before) to bound eth_getLogs")
    a = address.lower()
    tokens = [k for (c, k), e in LABELS.items() if c == chain and e.get("role") == "token"]
    if not tokens:
        raise ExplorerError(f"no allowlisted tokens for {chain} in tools/address_labels.yaml")
    lo, hi = block_at(chain, after), block_at(chain, before)
    out, times = [], {}
    for token in tokens:
        sym, dec = token_meta(chain, token)
        for direction, topics in (("out", [TRANSFER_TOPIC, _topic_addr(a)]), ("in", [TRANSFER_TOPIC, None, _topic_addr(a)])):
            for lg in _get_logs(chain, token, topics, lo, hi):
                bn = int(lg["blockNumber"], 16)
                if bn not in times:
                    times[bn] = _block_time(chain, bn)
                out.append({"tx": lg["transactionHash"], "time": _iso(times[bn]),
                            "from": "0x" + lg["topics"][1][-40:], "to": "0x" + lg["topics"][2][-40:],
                            "asset": sym, "token": token, "trusted": True,
                            "amount": num(scaled(int(lg.get("data") or "0x0", 16), dec)),
                            "direction": direction, "kind": "token"})
    # native sends of an EOA (contracts have no nonce-ordered sends)
    try:
        if rpc(chain, "eth_getCode", [a, "latest"]) in ("0x", "0x0", None):
            out += rpc_eoa_sends(chain, a, after, before)
    except ExplorerError as e:
        print(json.dumps({"warning": f"native sends of {a} not listed: {e}"}), file=sys.stderr)
    out.sort(key=lambda x: x["time"])
    return out


# --------------------------------------------------------------------------- EOA nonce walk (native hops over RPC)
# Public nodes cannot list an address's transactions, but an EOA's nonce
# rises by one with each transaction it sends, and archive-capable nodes
# answer eth_getTransactionCount at a past block. Binary-searching the block
# where the nonce passes k finds the k-th transaction; reading that block
# gives its recipient and native value. Cost: ~log2(range) calls per tx, so
# this is for a handful of hops, not for busy wallets (capped).

MAX_NONCE_WALK = 60


def _nonce_at(chain: str, address: str, block: int) -> int:
    return int(rpc(chain, "eth_getTransactionCount", [address, hex(block)]), 16)


def rpc_eoa_sends(chain: str, address: str, after: str, before: str) -> list[dict]:
    a = address.lower()
    native = CHAINS[chain].get("native", "ETH")
    lo, hi = block_at(chain, after), block_at(chain, before)
    n_lo, n_hi = _nonce_at(chain, a, lo), _nonce_at(chain, a, hi)
    if n_hi - n_lo > MAX_NONCE_WALK:
        raise ExplorerError(f"{a} sent {n_hi - n_lo} txs in the window; nonce walk is capped at {MAX_NONCE_WALK} "
                            f"(narrow --after/--before)")
    out = []
    left = lo
    for k in range(n_lo, n_hi):
        # smallest block b in (left, hi] with nonce(b) > k
        l, r = left, hi
        while l < r:
            mid = (l + r) // 2
            if _nonce_at(chain, a, mid) > k:
                r = mid
            else:
                l = mid + 1
        blk = rpc(chain, "eth_getBlockByNumber", [hex(l), True])
        for t in blk.get("transactions", []):
            if (t.get("from") or "").lower() == a and int(t.get("nonce", "0x0"), 16) == k:
                value = int(t.get("value") or "0x0", 16)
                if value > 0:
                    out.append({"tx": t["hash"], "time": _iso(int(blk["timestamp"], 16)), "from": a,
                                "to": (t.get("to") or "").lower(), "asset": native,
                                "amount": num(scaled(value, 18)), "direction": "out", "kind": "native"})
                break
        left = l
    return out


# --------------------------------------------------------------------------- Solana (public RPC)
# Transfers are read from balance changes: for each transaction touching
# the address, SOL and SPL-token balances before and after give who lost
# and who gained. When the address loses an amount of a mint, the accounts
# that gained the same mint in that tx are its counterparties.

SOL_TRUSTED_MINTS = {
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": "USDC",
    "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB": "USDT",
    "So11111111111111111111111111111111111111112": "wSOL",
}


def sol(method: str, params: list, cache: bool = True):
    return rpc("solana", method, params, cache=cache)


def _sol_changes(tx: dict) -> list[tuple[str, str, Decimal]]:
    """(owner, asset, delta) per account in one parsed transaction."""
    meta = tx.get("meta") or {}
    keys = [k["pubkey"] if isinstance(k, dict) else k for k in tx["transaction"]["message"]["accountKeys"]]
    out = []
    fee_payer = keys[0] if keys else ""
    for i, (pre, post) in enumerate(zip(meta.get("preBalances", []), meta.get("postBalances", []))):
        d = Decimal(post - pre)
        if i == 0:
            d += Decimal(meta.get("fee", 0))  # the fee is not a transfer
        if d:
            out.append((keys[i], "SOL", d / Decimal(10**9)))
    pre_t = {(b["accountIndex"]): b for b in meta.get("preTokenBalances", [])}
    post_t = {(b["accountIndex"]): b for b in meta.get("postTokenBalances", [])}
    for idx in set(pre_t) | set(post_t):
        b0, b1 = pre_t.get(idx), post_t.get(idx)
        ref = b1 or b0
        mint, owner = ref["mint"], ref.get("owner") or keys[idx]
        a0 = Decimal(b0["uiTokenAmount"]["amount"]) if b0 else Decimal(0)
        a1 = Decimal(b1["uiTokenAmount"]["amount"]) if b1 else Decimal(0)
        dec = int(ref["uiTokenAmount"]["decimals"])
        if a1 != a0:
            out.append((owner, mint, (a1 - a0) / (Decimal(10) ** dec)))
    _ = fee_payer
    return out


def sol_tx(sig: str) -> dict:
    tx = sol("getTransaction", [sig, {"encoding": "jsonParsed", "maxSupportedTransactionVersion": 1}])
    if not tx:
        raise ExplorerError(f"solana tx {sig} not found")
    changes = _sol_changes(tx)
    transfers = []
    for owner, asset, d in changes:
        if d < 0:
            for o2, a2, d2 in changes:
                if a2 == asset and d2 > 0 and o2 != owner:
                    sym = "SOL" if asset == "SOL" else SOL_TRUSTED_MINTS.get(asset, asset)
                    transfers.append({"from": owner, "to": o2, "asset": sym, "token": None if asset == "SOL" else asset,
                                      "trusted": asset == "SOL" or asset in SOL_TRUSTED_MINTS,
                                      "amount": num(min(-d, d2)), "kind": "native" if asset == "SOL" else "token"})
    return {"chain": "solana", "tx": sig, "time": _iso(tx["blockTime"]) if tx.get("blockTime") else None,
            "status": "ok" if not (tx.get("meta") or {}).get("err") else "failed", "transfers": transfers}


def sol_transfers(address: str, limit: int, after: str | None, before: str | None) -> list[dict]:
    sigs, cursor = [], None
    while len(sigs) < limit:
        opts = {"limit": min(1000, limit - len(sigs))}
        if cursor:
            opts["before"] = cursor
        page = sol("getSignaturesForAddress", [address, opts], cache=False)
        if not page:
            break
        sigs += page
        cursor = page[-1]["signature"]
        if after and page[-1].get("blockTime") and _iso(page[-1]["blockTime"]) < after:
            break
    out = []
    for s in sigs:
        when = _iso(s["blockTime"]) if s.get("blockTime") else ""
        if (after and when < after) or (before and when > before) or s.get("err"):
            continue
        for t in sol_tx(s["signature"])["transfers"]:
            if address in (t["from"], t["to"]):
                out.append({**t, "tx": s["signature"], "time": when,
                            "direction": "out" if t["from"] == address else "in"})
    out.sort(key=lambda x: x["time"])
    return out


# --------------------------------------------------------------------------- Tron (TronGrid, keyless)

TRON_TRUSTED = {
    "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t": "USDT",
    "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8": "USDC",
}


def tron_transfers(address: str, limit: int, after: str | None, before: str | None) -> list[dict]:
    base = CHAINS["tron"]["trongrid"]
    out = []
    params = {"limit": 200, "only_confirmed": "true"}
    if after:
        params["min_timestamp"] = int(time.mktime(time.strptime(after[:19], "%Y-%m-%dT%H:%M:%S")) - time.timezone) * 1000
    if before:
        params["max_timestamp"] = int(time.mktime(time.strptime(before[:19], "%Y-%m-%dT%H:%M:%S")) - time.timezone) * 1000
    url = f"{base}/v1/accounts/{address}/transactions/trc20"
    fp = None
    while len(out) < limit:
        d = http_json(url, {**params, **({"fingerprint": fp} if fp else {})})
        for it in d.get("data", []):
            if it.get("type", "Transfer") != "Transfer":  # TronGrid also returns Approval events
                continue
            tok = it.get("token_info") or {}
            out.append({"tx": it["transaction_id"], "time": _iso(it["block_timestamp"] // 1000),
                        "from": it["from"], "to": it["to"], "asset": tok.get("symbol") or "?",
                        "token": tok.get("address"), "trusted": tok.get("address") in TRON_TRUSTED,
                        "amount": num(scaled(it.get("value") or 0, tok.get("decimals") or 0)),
                        "direction": "out" if it["from"] == address else "in", "kind": "token"})
        fp = (d.get("meta") or {}).get("fingerprint")
        if not fp:
            break
    # native TRX transfers
    d = http_json(f"{base}/v1/accounts/{address}/transactions", params)
    for it in d.get("data", []):
        for c in (it.get("raw_data") or {}).get("contract", []):
            if c.get("type") != "TransferContract":
                continue
            v = c["parameter"]["value"]
            frm, to = _tron_b58(v.get("owner_address")), _tron_b58(v.get("to_address"))
            out.append({"tx": it["txID"], "time": _iso(it["block_timestamp"] // 1000), "from": frm, "to": to,
                        "asset": "TRX", "amount": num(scaled(v.get("amount", 0), 6)),
                        "direction": "out" if frm == address else "in", "kind": "native"})
    out.sort(key=lambda x: x["time"])
    return out[:limit]


_B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"


def _tron_b58(hexaddr: str | None) -> str:
    """TronGrid returns 41-prefixed hex; convert to base58check (T…)."""
    if not hexaddr:
        return ""
    if hexaddr.startswith("T"):
        return hexaddr
    raw = bytes.fromhex(hexaddr)
    chk = hashlib.sha256(hashlib.sha256(raw).digest()).digest()[:4]
    n = int.from_bytes(raw + chk, "big")
    s = ""
    while n:
        n, r = divmod(n, 58)
        s = _B58[r] + s
    return s


def tron_tx(txid: str) -> dict:
    base = CHAINS["tron"]["trongrid"]
    d = http_json(f"{base}/walletsolidity/gettransactioninfobyid", post={"value": txid})
    t = http_json(f"{base}/walletsolidity/gettransactionbyid", post={"value": txid})
    transfers = []
    for c in (t.get("raw_data") or {}).get("contract", []):
        if c.get("type") == "TransferContract":
            v = c["parameter"]["value"]
            transfers.append({"from": _tron_b58(v.get("owner_address")), "to": _tron_b58(v.get("to_address")),
                              "asset": "TRX", "amount": num(scaled(v.get("amount", 0), 6)), "kind": "native"})
    for lg in d.get("log", []) or []:
        tp = lg.get("topics") or []
        if len(tp) == 3 and tp[0] == TRANSFER_TOPIC[2:]:
            token = _tron_b58("41" + lg["address"])
            sym = TRON_TRUSTED.get(token, "?")
            dec = 6 if sym in ("USDT", "USDC") else 0
            transfers.append({"from": _tron_b58("41" + tp[1][-40:]), "to": _tron_b58("41" + tp[2][-40:]),
                              "asset": sym, "token": token, "trusted": token in TRON_TRUSTED,
                              "amount": num(scaled(int(lg.get("data") or "0", 16), dec)), "kind": "token"})
    ts = d.get("blockTimeStamp")
    return {"chain": "tron", "tx": txid, "time": _iso(ts // 1000) if ts else None, "transfers": transfers}


# --------------------------------------------------------------------------- dispatch

def family(chain: str) -> str:
    if chain not in CHAINS:
        raise ExplorerError(f"unknown chain '{chain}'; known: {', '.join(k for k in CHAINS if not k.startswith('_'))}")
    return CHAINS[chain]["family"]


def _blocked(e: ExplorerError) -> bool:
    return "HTTP 403" in str(e) or "no keyless EVM provider" in str(e)


def get_tx(chain: str, h: str) -> dict:
    f = family(chain)
    if f == "evm":
        try:
            return bs_tx(chain, h)
        except ExplorerError as e:
            if not _blocked(e):
                raise
            return rpc_tx(chain, h)
    if f == "utxo":
        return mp_tx(h)
    if f == "solana":
        return sol_tx(h)
    if f == "tron":
        return tron_tx(h)
    raise ExplorerError(f"tx lookup for {chain} is not implemented yet")


def get_transfers(chain: str, address: str, limit: int, after: str | None = None, before: str | None = None) -> list[dict]:
    f = family(chain)
    if f == "evm":
        if es_key():
            return es_transfers(chain, address, limit)
        if CHAINS[chain].get("routescan"):
            return es_transfers(chain, address, limit)
        try:
            return bs_transfers(chain, address, limit)
        except ExplorerError as e:
            if not _blocked(e):
                raise
            return rpc_transfers(chain, address, after, before)
    if f == "utxo":
        return mp_transfers(address, limit)
    if f == "solana":
        return sol_transfers(address, limit, after, before)
    if f == "tron":
        return tron_transfers(address, limit, after, before)
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
        for t in get_transfers(chain, addr, limit, after, before):
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
    p.add_argument("--after"); p.add_argument("--before")
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
            out = get_transfers(a.chain, a.address, a.limit, a.after, a.before)
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
