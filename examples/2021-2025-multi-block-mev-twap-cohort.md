# Multi-block MEV TWAP oracle manipulation cohort — EVM — 2021–2025

**Loss:** no single headline loss figure attributable solely to multi-block MEV TWAP manipulation at v0.1; individual composable exploits (e.g., inverse Finance TWAP 2022-04, ~$15.6M) demonstrate the TWAP-window-concentration sub-shape (T17.004) but the specific proposer-controlled multi-block MEV staging surface (T17.005) was characterised primarily in Flashbots research literature (2021-2023). The class is documented at the MEV-research and audit-finding layer — the structural vulnerability is well-characterised; operational exploits are likely embedded within known TWAP-manipulation incidents whose proposer-level forensic record has not been fully disaggregated.
**OAK Techniques observed:** **OAK-T17.005** (TWAP Oracle Manipulation via Multi-Block MEV) — primary; the canonical anchor for the proposer-controlled multi-block MEV staging surface. The technique exploits proposer control across consecutive blocks to "grind" a TWAP oracle toward a target price with lower per-block capital requirements than single-block manipulation. **OAK-T17.004** (TWAP / Time-Window Manipulation Against DAO Treasury / Vesting Math) — structurally adjacent; T17.004 covers the TWAP-window-settlement surface; T17.005 covers the proposer-controlled multi-block sequencing mechanism. **OAK-T9.001** (Oracle Price Manipulation) — co-occurring; the upstream price-manipulation primitive, staged via multi-block proposer control rather than single-transaction flash-loan capital. **OAK-T14.005** (Builder Censorship MEV Extraction) — adjacent at the builder/proposer layer; multi-block MEV extraction via proposer control is the same infrastructure surface.
**Attribution:** **pseudonymous** at the MEV-searcher level. Known multi-block MEV bot operators include jaredfromsubway.eth and equivalents. The builder/relayer infrastructure (MEV-Boost, Flashbots, bloXroute, Eden Network) is identifiable; underlying human identity requires off-chain intelligence.
**Key teaching point:** **Multi-block MEV TWAP manipulation via proposer control represents a more capital-efficient attack path than single-block TWAP manipulation: the attacker controls the block proposer slot for N consecutive blocks, spreading the price movement across N blocks with ~1/N capital per block compared to a single-block manipulation.** The attack class is structurally more dangerous than single-block oracle manipulation because it relaxes the capital constraint from "must move the price within one block" to "must influence the proposer across N consecutive blocks."

## Summary

Single-block TWAP oracle manipulation requires the attacker to move the price significantly within a single block and unwind within the same block — a capital-intensive operation typically requiring flash-loan-scale capital (billions of dollars of notional to move a major pool's TWAP). Multi-block MEV TWAP manipulation relaxes this constraint: if the attacker controls the block proposer for multiple consecutive blocks (via MEV-Boost builder coordination, validator collusion, or proposer-bribery via bribery protocols like MEV-Boost), the attacker can spread the price movement across N blocks, achieving the same cumulative TWAP distortion with a fraction of the single-block capital requirement.

The technique's surface was characterised by Flashbots research in 2021-2023 as part of the broader multi-block MEV literature. The core insight:

1. A TWAP oracle computes a time-weighted average price over a configurable lookback window (e.g., 30 minutes of blocks).
2. In a single block, manipulating the TWAP requires moving the spot price far enough that the single-block contribution to the weighted average is material — requiring large capital.
3. Across N consecutive blocks under the same proposer's control, the attacker can contribute N blocks of manipulated price data to the TWAP window with more modest per-block capital — the cumulative effect across N blocks is material even if any single block's contribution would be negligible.
4. The attacker's profit is realized against a lending market or derivative protocol that consumes the manipulated TWAP as its price reference — the attacker deposits collateral at the manipulated (inflated) TWAP price and borrows against it, or holds a derivative position that settles at the manipulated TWAP.

The technique composes (does not replace) T9.001 and T17.004: the oracle manipulation primitive is the same; the staging mechanism (proposer-controlled multi-block sequencing) is the T17.005 surface.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021 | Flashbots publishes foundational multi-block MEV research characterising the proposer-controlled multi-block sequencing surface | T17.005 (surface characterisation) |
| 2021–2023 | MEV-Boost builder ecosystem matures; multi-block proposer control becomes operationally feasible via builder coordination and proposer-bribery protocols | T17.005 (operational feasibility) |
| 2022-04 | Inverse Finance TWAP manipulation (~$15.6M) — TWAP-window-concentration sub-shape (T17.004); the proposer-level forensic record is consistent with multi-block MEV staging but the public attribution record does not disaggregate the proposer-control layer | T17.004 + T17.005 (composed) |
| 2022–2025 | Academic and audit-firm literature (Zhou et al. 2023 SoK; Flashbots MEV research; EigenPhi multi-block MEV analysis) characterises multi-block TWAP grinding as a distinct sub-class with lower capital requirements than single-block manipulation | T17.005 (research consolidation) |

## Realised extraction

No single incident attributed solely to T17.005 at v0.1; composable with T17.004 (Inverse Finance 2022-04). The class is documented at the MEV-research layer.

## Public references

- Flashbots multi-block MEV research (2021-2023)
- Zhou et al., "SoK: Decentralized Finance (DeFi) Attacks" (2023) — academic taxonomy including multi-block MEV surface
- EigenPhi multi-block MEV bundle analysis
- MEV-Boost relay data and builder-concentration research
- See `techniques/T17.005-multi-block-mev-twap-oracle-manipulation.md` for full technique characterisation
