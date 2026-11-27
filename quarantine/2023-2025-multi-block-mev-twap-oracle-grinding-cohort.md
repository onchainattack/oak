> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no attack to record: no opened page documents a multi-block proposer-collusion oracle attack; the mechanism exists only in a research paper (IACR 2022/445). It is kept here, outside `examples/`, and can return if a source documents an incident.

# Multi-block MEV TWAP oracle manipulation — research characterisation, no sourced incident — 2022

**Loss:** none documented. No opened page reports a theft, a loss figure or a named incident of multi-block TWAP manipulation in 2023–2025. An earlier version of this file gave an aggregate mid-seven-figures extraction, per-block percentages and builder-concentration claims; none of them is on a page OAK opened, so they are removed.

**OAK Techniques observed:** **OAK-T17.005** (TWAP Oracle Manipulation via Multi-Block MEV — the mechanism described in the research below, not a sourced incident). See [`techniques/T17.005-multi-block-mev-twap-oracle-manipulation.md`](../techniques/T17.005-multi-block-mev-twap-oracle-manipulation.md).

**Attribution:** **unattributed** (no incident, no actor).

**Key teaching point:** **A time-weighted average price oracle that averages over a short window can be pushed by an attacker who also controls two consecutive blocks, so a protocol that reads one should size the window and the venue's depth against that cost, not against single-block cost.** The cited paper argues that such a multi-block attack is far cheaper than previously assumed; the Uniswap v3 documentation makes the matching point that a longer lookback makes manipulation more difficult.

## Summary

This file was filed as a 2023–2025 cohort of multi-block MEV oracle-grinding incidents. No opened page names one. What the pages support is the mechanism:

- Mackinga, Nadahalli and Wattenhofer analyse manipulation of on-chain TWAP oracles that use an arithmetic mean. They describe a multi-block MEV attack in which the attacker colludes with a miner or proposer who can produce two blocks in a row, and report that this makes oracle manipulation orders of magnitude cheaper than previously known attacks. The page gives no dollar figures. [IACR ePrint 2022/445](https://eprint.iacr.org/2022/445) (received 2022-04-12).
- The [Uniswap v3 oracle documentation](https://developers.uniswap.org/docs/protocols/v3/concepts/price-oracles) says the oracle is updated at most once per block, that the large observation array makes manipulation significantly more difficult, and that anyone who pays the fees can increase the number of tracked observations, which lengthens the lookback window.

No opened page shows this attack being carried out on Ethereum mainnet, and none gives builder-concentration data. The 2022 Inverse Finance exploit is covered in [`examples/2022-04-inverse-finance-twap.md`](2022-04-inverse-finance-twap.md); the broader research file is [`examples/2021-2025-multi-block-mev-twap-cohort.md`](2021-2025-multi-block-mev-twap-cohort.md).

## Timeline (UTC)

| When | What happened | OAK |
|---|---|---|
| 2022-04-12 | The paper on cheaper TWAP-oracle attacks, including the two-consecutive-block variant, is received by the IACR ePrint archive ([source](https://eprint.iacr.org/2022/445)) | **T17.005** (mechanism characterised) |
| Before 2022-04-12 (undisclosed) | Entry, preparation, execution and fund movement for any real incident: undisclosed, no sourced incident | — |
| After the paper (undisclosed) | Response: Uniswap v3 documents that a longer lookback and more observations make manipulation more difficult ([source](https://developers.uniswap.org/docs/protocols/v3/concepts/price-oracles)) | response |

## Root-cause evidence

- **Technique:** OAK-T17.005
- **Source:** <https://eprint.iacr.org/2022/445>; <https://developers.uniswap.org/docs/protocols/v3/concepts/price-oracles>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** The paper's abstract establishes the attack design and its relative cost. It does not report a real incident, and no opened page ties a loss to it.

## Public references

- Mackinga, Nadahalli, Wattenhofer, "TWAP Oracle Attacks: Easier Done than Said?" (received 2022-04-12): <https://eprint.iacr.org/2022/445>
- Uniswap, v3 price oracles documentation: <https://developers.uniswap.org/docs/protocols/v3/concepts/price-oracles>
