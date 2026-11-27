> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no attack to record: no opened page documents a multi-block proposer-collusion oracle attack; the mechanism exists only in a research paper (IACR 2022/445), and Inverse Finance, its one real member, does not involve proposer collusion per RedStone. It is kept here, outside `examples/`, and can return if a source documents an incident.

# Multi-block MEV TWAP oracle manipulation — research characterisation, no sourced incident — EVM — 2022

**Loss:** none documented. No opened page reports a loss from a proposer-colluding multi-block TWAP attack. Earlier versions of this file claimed a 2021–2025 cohort, MEV-Boost operational feasibility, and Flashbots, EigenPhi and Zhou et al. references; none is on an opened page and all are removed.

**OAK Techniques observed:** **OAK-T17.005** (TWAP Oracle Manipulation via Multi-Block MEV — the mechanism the paper below analyses, not a sourced incident). See [`techniques/T17.005-multi-block-mev-twap-oracle-manipulation.md`](../techniques/T17.005-multi-block-mev-twap-oracle-manipulation.md).

**Attribution:** **unattributed** — no operator is identified. The earlier claim naming jaredfromsubway.eth is unsupported and stays removed.

**Key teaching point:** **Do not size a TWAP window by assuming the attacker must pay for the price move in every block; per the authors, a colluding proposer who produces two consecutive blocks makes manipulation much cheaper, so use a longer window, multiple venues or a deviation check.** Source: [Mackinga, Nadahalli and Wattenhofer](https://eprint.iacr.org/2022/445), whose abstract claims orders-of-magnitude lower cost than previously known attacks.

## Summary

Verdict: no cohort. The only opened page that establishes T17.005 is a paper; no real incident anchors the Technique in the opened sources.

[Mackinga, Nadahalli and Wattenhofer, "TWAP Oracle Attacks: Easier Done than Said?"](https://eprint.iacr.org/2022/445) (IACR ePrint 2022/445, received 2022-04-12) analyses arithmetic-mean TWAP oracles. It describes a single-block attack that costs less than the usual multi-block one, and a multi-block MEV-style attack in which the attacker colludes with a miner or proposer who can produce two consecutive blocks. The page documents no real-world exploit.

The nearest real incident, Inverse Finance on 2022-04-02, is its own file: [`examples/2022-04-inverse-finance-twap.md`](2022-04-inverse-finance-twap.md). [RedStone](https://www.redstone.finance/blog/oracle-attacks-1-inverse-finance-15m-stolen/) says the attacker swapped 500 ETH for 1.7k INV in a low-liquidity SushiSwap pool, raising the price about 50x, that the transaction was sent as a bundle directly to miners without going through the mempool, and that the oracle still used the block-N price after arbitrage in block N+1. RedStone does not mention proposer collusion, so it does not establish T17.005. That file maps the incident to T17.004 and T9.001.

## Timeline (UTC)

No incident, so no incident timeline.

| When | What happened | OAK |
|---|---|---|
| 2022-04-12 | Mackinga, Nadahalli, Wattenhofer paper received by IACR ePrint ([paper](https://eprint.iacr.org/2022/445)) | — |
| 2022-04 | Inverse Finance TWAP manipulation, bundle sent to miners ([RedStone](https://www.redstone.finance/blog/oracle-attacks-1-inverse-finance-15m-stolen/)); proposer collusion not described; see its own file | none — not shown to involve proposer collusion |

## Root-cause evidence

- **Technique:** OAK-T17.005
- **Source:** <https://eprint.iacr.org/2022/445>; <https://www.redstone.finance/blog/oracle-attacks-1-inverse-finance-15m-stolen/>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** The paper establishes the attack's cost argument in theory. No opened page shows it used against a protocol. Treat T17.005 as unanchored until a source shows consecutive blocks produced by a colluding proposer and a lending or derivative loss.

## Public references

- [Mackinga, Nadahalli, Wattenhofer, "TWAP Oracle Attacks: Easier Done than Said?"](https://eprint.iacr.org/2022/445), IACR ePrint 2022/445 (received 2022-04-12).
- [RedStone, "Oracle Attacks #1 — Inverse Finance, \$15M stolen"](https://www.redstone.finance/blog/oracle-attacks-1-inverse-finance-15m-stolen/) (2022-08-03).
