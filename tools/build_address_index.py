#!/usr/bin/env python3
"""
build_address_index.py — index every full on-chain address across examples.

Why this exists: the same attacker wallet showing up in two incidents is one
of the strongest links a defender can get (OAK-T8.001, cluster reuse). The
Binance theft (2026-10) shared a laundering address with the Bitget exploit
(2026-09), but nothing in OAK could notice that by itself. This builds
tools/addresses.json (address → incidents and roles) for the site's "seen in
other incidents" block and for agents, and prints the shared addresses.

Sources, per example:
    - nodes of the `## Fund flow` oak-flow block (with their roles)
    - explorer links anywhere in the file (etherscan.io/address/…, solscan, …)

Addresses whose role is shared infrastructure (mixer pools, DEX pools,
bridges, exchanges, issuers, tokens, burn) are indexed but not reported as
cluster links: two thefts using Tornado Cash are not related by that alone.

Usage:
    python3 tools/build_address_index.py            # write tools/addresses.json, print summary
    python3 tools/build_address_index.py --shared   # also list every shared non-infrastructure address
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from check_flow import parse_flow  # noqa: E402

REPO = Path(__file__).resolve().parent.parent
EXAMPLES = REPO / "examples"
OUT = REPO / "tools" / "addresses.json"
CHAINS = json.loads((REPO / "tools" / "chains.json").read_text(encoding="utf-8"))

INFRA_ROLES = {"mixer", "dex", "bridge", "cex-deposit", "issuer-freeze", "lending", "burn", "token"}

# explorer host → chain, for addresses that appear only as links
HOST_CHAIN = {
    "etherscan.io": "ethereum", "basescan.org": "base", "arbiscan.io": "arbitrum",
    "optimistic.etherscan.io": "optimism", "polygonscan.com": "polygon", "bscscan.com": "bsc",
    "snowtrace.io": "avalanche", "snowscan.xyz": "avalanche", "gnosisscan.io": "gnosis",
    "lineascan.build": "linea", "scrollscan.com": "scroll", "blastscan.io": "blast",
    "solscan.io": "solana", "tronscan.org": "tron", "mempool.space": "bitcoin",
}
LINK_RE = re.compile(
    r"https?://(?:www\.)?([a-z0-9.-]+)/(?:#/)?(?:address|account)/([0-9A-Za-z]{25,64})"
)
EVM_RE = re.compile(r"^0x[0-9a-fA-F]{40}$")


def key(chain: str, addr: str) -> str:
    fam = CHAINS.get(chain, {}).get("family")
    return addr.lower() if fam == "evm" or EVM_RE.match(addr) else addr


def build() -> dict:
    index: dict[str, dict] = {}

    def add(addr: str, chain: str, file: str, role: str | None, label: str | None):
        k = key(chain, addr)
        entry = index.setdefault(k, {"chains": [], "incidents": []})
        if chain and chain not in entry["chains"]:
            entry["chains"].append(chain)
        for inc in entry["incidents"]:
            if inc["file"] == file:
                if role and not inc.get("role"):
                    inc["role"] = role
                if label and not inc.get("label"):
                    inc["label"] = label
                return
        rec = {"file": file}
        if role:
            rec["role"] = role
        if label:
            rec["label"] = label
        entry["incidents"].append(rec)

    for p in sorted(EXAMPLES.glob("*.md")):
        text = p.read_text(encoding="utf-8")
        try:
            flow = parse_flow(text) or {}
        except ValueError:
            flow = {}
        for n in flow.get("nodes") or []:
            if isinstance(n, dict) and n.get("address"):
                add(str(n["address"]), str(n.get("chain", "")).lower(), p.name, n.get("role"), n.get("label"))
        for host, addr in LINK_RE.findall(text):
            chain = HOST_CHAIN.get(host)
            if chain:
                add(addr, chain, p.name, None, None)
    return index


def label_roles() -> dict[str, str]:
    """address → role from tools/address_labels.yaml (any chain section)."""
    import yaml
    path = REPO / "tools" / "address_labels.yaml"
    if not path.exists():
        return {}
    raw = re.sub(r"(?<![\w'\"])(0x[0-9a-fA-F]{40})(?![\w'\"])", r"'\1'", path.read_text(encoding="utf-8"))
    out = {}
    for entries in (yaml.safe_load(raw) or {}).values():
        for e in entries or []:
            out[str(e["address"]).lower()] = e.get("role", "")
    return out


def shared(index: dict) -> list[tuple[str, dict]]:
    known = label_roles()
    out = []
    for addr, e in index.items():
        if len(e["incidents"]) < 2:
            continue
        if any(i.get("role") in INFRA_ROLES for i in e["incidents"]) or known.get(addr.lower()) in INFRA_ROLES:
            continue
        out.append((addr, e))
    return sorted(out, key=lambda x: -len(x[1]["incidents"]))


def main(argv: list[str]) -> int:
    index = build()
    # mark labelled infrastructure in the index itself, so the site skips it too
    for addr, role in label_roles().items():
        if addr in index and role in INFRA_ROLES:
            index[addr]["infrastructure"] = role
    OUT.write_text(json.dumps(index, indent=1, sort_keys=True) + "\n", encoding="utf-8")
    links = shared(index)
    print(f"OAK address index — {len(index)} addresses; {len(links)} shared across incidents (non-infrastructure)")
    if "--shared" in argv:
        for addr, e in links:
            print(f"  {addr}  ({', '.join(e['chains'])})")
            for i in e["incidents"]:
                print(f"    - {i['file']}  {i.get('role', '')} {i.get('label', '')}".rstrip())
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
