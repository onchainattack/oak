# Multi-block MEV TWAP oracle manipulation cohort — EVM — 2021–2025

**Corrected 2026-10-11:** Removed the claim that jaredfromsubway.eth is a multi-block TWAP-manipulation operator (unsupported; it is not tied to this class by any source found); Inverse Finance is described per its sources (capital-intensive SushiSwap/Keep3r TWAP manipulation, not proven proposer-controlled); the research record now cites the Mackinga-Nadahalli-Wattenhofer paper, and the Flashbots / EigenPhi / Zhou et al. references are marked unverified.

**Loss:** no single headline loss figure attributable solely to multi-block MEV TWAP manipulation at v0.1; individual TWAP exploits (e.g., Inverse Finance 2022-04-02, ~\$15.6M `[redstoneinverse]`) demonstrate the TWAP-window-concentration sub-shape (T17.004). Inverse's price manipulation persisted across two blocks (N and N+1) and was submitted as a bundle directly to miners `[redstoneinverse]`, but the sources do not describe proposer collusion, so it is not an established T17.005 case. The proposer-collusion multi-block attack (MMEV) was described academically in April 2022 `[mackingatwap]`. The class is documented at the MEV-research and audit-finding layer — the structural vulnerability is well-characterised; operational exploits are likely embedded within known TWAP-manipulation incidents whose proposer-level forensic record has not been fully disaggregated.
**OAK Techniques observed:** **OAK-T17.005** (TWAP Oracle Manipulation via Multi-Block MEV) — primary; the canonical anchor for the proposer-controlled multi-block MEV staging surface. The technique exploits proposer control across consecutive blocks to "grind" a TWAP oracle toward a target price with lower per-block capital requirements than single-block manipulation. **OAK-T17.004** (TWAP / Time-Window Manipulation Against DAO Treasury / Vesting Math) — structurally adjacent; T17.004 covers the TWAP-window-settlement surface; T17.005 covers the proposer-controlled multi-block sequencing mechanism. **OAK-T9.001** (Oracle Price Manipulation) — co-occurring; the upstream price-manipulation primitive, staged via multi-block proposer control rather than single-transaction flash-loan capital. **OAK-T14.005** (Builder Censorship MEV Extraction) — adjacent at the builder/proposer layer; multi-block MEV extraction via proposer control is the same infrastructure surface.
**Attribution:** **pseudonymous** — no named operator of a proposer-controlled multi-block TWAP attack was found in the sources consulted. (A prior claim naming jaredfromsubway.eth as a known multi-block operator is removed as unsupported.)
**Key teaching point:** **Multi-block MEV TWAP manipulation via proposer control represents a more capital-efficient attack path than single-block TWAP manipulation: the attacker controls the block proposer slot for N consecutive blocks, spreading the price movement across N blocks with ~1/N capital per block compared to a single-block manipulation.** The attack class is structurally more dangerous than single-block oracle manipulation because it relaxes the capital constraint from "must move the price within one block" to "must influence the proposer across N consecutive blocks."

## Summary

Single-block TWAP oracle manipulation requires the attacker to move the price significantly within a single block and unwind within the same block — a capital-intensive operation typically requiring flash-loan-scale capital (billions of dollars of notional to move a major pool's TWAP). Multi-block MEV TWAP manipulation relaxes this constraint: if the attacker controls the block proposer for multiple consecutive blocks (via MEV-Boost builder coordination, validator collusion, or proposer-bribery via bribery protocols like MEV-Boost), the attacker can spread the price movement across N blocks, achieving the same cumulative TWAP distortion with a fraction of the single-block capital requirement.

The technique's surface was characterised academically by Mackinga, Nadahalli and Wattenhofer, who describe a multi-block MEV attack in which the attacker colludes with a miner or proposer who can produce two consecutive blocks, making TWAP manipulation far cheaper `[mackingatwap]`. The earlier attribution to Flashbots research (2021-2023) is unverified here. The core insight:

1. A TWAP oracle computes a time-weighted average price over a configurable lookback window (e.g., 30 minutes of blocks).
2. In a single block, manipulating the TWAP requires moving the spot price far enough that the single-block contribution to the weighted average is material — requiring large capital.
3. Across N consecutive blocks under the same proposer's control, the attacker can contribute N blocks of manipulated price data to the TWAP window with more modest per-block capital — the cumulative effect across N blocks is material even if any single block's contribution would be negligible.
4. The attacker's profit is realized against a lending market or derivative protocol that consumes the manipulated TWAP as its price reference — the attacker deposits collateral at the manipulated (inflated) TWAP price and borrows against it, or holds a derivative position that settles at the manipulated TWAP.

The technique composes (does not replace) T9.001 and T17.004: the oracle manipulation primitive is the same; the staging mechanism (proposer-controlled multi-block sequencing) is the T17.005 surface.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-04-12 | Mackinga, Nadahalli, Wattenhofer, "TWAP Oracle Attacks: Easier Done than Said?" received by IACR ePrint (2022/445) `[mackingatwap]` | T17.005 (surface characterisation) |
| 2021–2023 | MEV-Boost builder ecosystem matures; multi-block proposer control becomes operationally feasible via builder coordination and proposer-bribery protocols | T17.005 (operational feasibility) |
| 2022-04-02 | Inverse Finance TWAP manipulation (~\$15.6M): attacker raised INV price ~50x in a low-liquidity SushiSwap pool via a bundle sent directly to miners, funded with 901 ETH from Tornado Cash; price persisted across blocks N and N+1 `[redstoneinverse]` | T17.004 (T17.005 not established) |
| 2022–2025 | Further literature (Zhou et al. 2023 SoK; EigenPhi analysis) is cited in earlier drafts but not verified here | T17.005 (research consolidation, unverified) |

## Realised extraction

No single incident attributed solely to T17.005 at v0.1; Inverse Finance 2022-04 is a related TWAP-manipulation incident, not an established T17.005 case. The class is documented at the MEV-research layer.

## Public references

- `[mackingatwap]` — Mackinga, Nadahalli, Wattenhofer, "TWAP Oracle Attacks: Easier Done than Said?", IACR ePrint 2022/445 (received 2022-04-12): <https://eprint.iacr.org/2022/445>
- `[redstoneinverse]` — RedStone, "Oracle Attacks #1 — Inverse Finance, \$15M stolen" (2022-08-03): <https://www.redstone.finance/blog/oracle-attacks-1-inverse-finance-15m-stolen/>
- Flashbots multi-block MEV research (2021-2023) — unverified, no URL found
- Zhou et al., "SoK: Decentralized Finance (DeFi) Attacks" (2023) — academic taxonomy including multi-block MEV surface
- EigenPhi multi-block MEV bundle analysis — unverified, no URL found
- MEV-Boost relay data and builder-concentration research
- See `techniques/T17.005-multi-block-mev-twap-oracle-manipulation.md` for full technique characterisation
