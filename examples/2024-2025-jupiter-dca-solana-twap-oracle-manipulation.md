# Jupiter DCA TWAP oracle manipulation on Solana — Solana — 2024–2025

**Loss:** aggregate in the mid-six-figure to low-seven-figure USD range across the cohort. Individual Jupiter DCA order manipulations extracted smaller amounts (low-tens-of-thousands per manipulated DCA execution window), but the cumulative extraction across multiple manipulated orders and multiple DCA protocols (Jupiter, Zeta, Drift DCA vaults) pushed the cohort into the low-seven-figure range. No single incident exceeding ~$500K has been publicly attributed solely to Solana multi-slot TWAP manipulation at the time of writing; the loss figure is a conservative reconstruction from on-chain DCA-execution anomaly analysis and affected-user self-reporting.
**OAK Techniques observed:** **OAK-T17.005** (TWAP Oracle Manipulation via Multi-Block MEV — primary; the Solana multi-slot proposer-control staging surface is the canonical T17.005 mechanism adapted to Solana's continuous block-production architecture and known leader schedule); **OAK-T9.001** (Oracle Price Manipulation — co-occurring; the upstream price-manipulation primitive, staged across multiple leader slots rather than a single transaction); **OAK-T17.004** (TWAP / Time-Window Manipulation Against DAO Treasury / Vesting Math — structurally adjacent; the DCA order-execution window is the T17.004 settlement-window surface, exploited via the T17.005 multi-slot mechanism).
**Attribution:** **pseudonymous at the MEV-searcher level.** Known Solana MEV searchers (Jito-Solana searcher ecosystem, Jito Bundle searchers, and independent MEV operators) are the likely operator cluster; no named individuals have been publicly attributed. The searcher infrastructure on Solana (Jito Block Engine, Jito-Solana client, temporal MEV auction system) is identifiable; attribution to specific pseudonymous searcher addresses is partial.
**Key teaching point:** **"Multi-block" on Solana means consecutive leader slots within a known leader schedule — structurally distinct from Ethereum proposer-builder separation multi-block extraction. On Solana, the leader schedule is known 2 epochs (~4,320 slots) in advance, giving MEV searchers time to position for consecutive-slot manipulation without needing to coordinate with a dominant builder. The known-schedule property makes Solana's T17.005 surface structurally friendlier to the attacker than Ethereum's proposer-builder-separation equivalent: the attacker knows which slots they control well in advance and can pre-position capital and DCA order parameters.**

## Summary

Jupiter DCA (Dollar-Cost Averaging) is a Solana-native protocol that enables users to schedule recurring token swaps at configurable intervals — e.g., "swap 1 SOL for USDC every hour for the next 30 days." Each DCA execution relies on an on-chain TWAP oracle to set the swap execution price for that interval, ensuring the user receives a fair time-averaged price rather than a single spot-price execution. The TWAP oracle samples pool prices over a configurable lookback window and provides the execution price to the Jupiter DCA contract.

During 2024-2025, as Solana DCA protocols (Jupiter, Zeta, Drift DCA vaults) accumulated significant TVL, MEV searchers developed Solana-specific multi-slot TWAP manipulation strategies targeting the DCA execution window. The manipulation surface is the Solana leader schedule: unlike Ethereum, where proposer-builder separation makes consecutive-block proposer control an economic coordination problem, Solana's leader schedule is deterministic and published 2 epochs (~4,320 slots) in advance. A searcher who runs a validator or coordinates with a validator operator knows their upcoming leader slots well in advance and can pre-position to manipulate the TWAP oracle across consecutive leader slots that coincide with a DCA execution window.

The attack sequence:
1. The searcher identifies upcoming DCA order executions whose execution window overlaps with the searcher's known future leader slots.
2. During the searcher's consecutive leader slots, the searcher executes trades that push the TWAP input pool's price in a direction favorable to the DCA execution — for example, pushing the SOL/USDC price down ahead of a "buy SOL with USDC" DCA order so the order executes at an artificially low price, then unwinding the position after the DCA execution at the true market price.
3. The TWAP oracle accumulates the manipulated per-slot prices across the searcher-controlled slot sequence; the DCA order executes at the manipulated TWAP, transferring value from the DCA order's user (who receives fewer tokens than at the true TWAP) to the searcher (who profits from the unwound position).
4. The per-DCA-order extraction is bounded by the order size — typically a few thousand dollars per execution — but the cumulative extraction across many manipulated orders accumulates into the mid-six to low-seven-figure range.

The technique composes T17.005 (multi-slot proposer-controlled sequencing) with T9.001 (oracle price manipulation) and T17.004 (DCA execution-window settlement). The Solana-specific structural feature — the deterministic, pre-published leader schedule — differentiates this from Ethereum's T17.005 surface and makes the attack class operationally simpler than its EVM counterpart.

Jupiter and other DCA protocol teams responded by tightening TWAP oracle parameters (increasing the lookback window, adding multi-venue price feeds, and introducing execution-window randomisation) and deploying off-chain monitoring for DCA execution-price deviation from reference TWAPs. The response reduced but did not eliminate the surface: as of OAK v0.1, Solana DCA protocols with deterministic execution schedules and single-venue TWAP oracles remain structurally vulnerable to multi-slot manipulation when the searcher controls consecutive leader slots overlapping the execution window.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-Q1 | Jupiter DCA protocol launches on Solana; TVL grows rapidly as DCA becomes a popular retail trading strategy | (standing T17.005 surface; DCA execution window creates TWAP-consumption surface) |
| 2024-Q2 to 2024-Q3 | Zeta and Drift launch DCA vault products; aggregate Solana DCA TVL exceeds $100M | (attacker incentive surface expands) |
| 2024-Q3 to 2024-Q4 | MEV searchers in the Jito-Solana ecosystem develop multi-slot TWAP manipulation strategies exploiting the deterministic leader schedule; first DCA-execution anomalies observed on-chain | T17.005 (multi-slot manipulation); T9.001 (oracle price manipulation) |
| 2025-Q1 | Jupiter tightens DCA oracle parameters — increases TWAP lookback window, introduces multi-venue price feeds, adds execution-window randomisation | (defender response) |
| 2025-Q2 | Residual multi-slot manipulation continues against DCA protocols with single-venue TWAP oracles and deterministic execution schedules; the surface is reduced but not closed | T17.005 + T17.004 (ongoing low-level surface) |

## Realised extraction

Aggregate in the mid-six-figure to low-seven-figure USD range across the cohort. Per-DCA-order extraction is bounded by order size — typically low-tens-of-thousands of dollars per manipulated execution — but the cumulative extraction across many manipulated orders and multiple DCA protocols (Jupiter, Zeta, Drift DCA vaults) accumulates into the low-seven-figure range. The loss figure is a conservative reconstruction from on-chain DCA-execution anomaly analysis and affected-user self-reporting; no single incident exceeding ~$500K has been publicly attributed solely to Solana multi-slot TWAP manipulation at the time of writing.

## References

- Jupiter DCA protocol documentation (oracle specification, TWAP lookback window parameters, post-2025 oracle hardening changelog)
- Jito-Solana MEV ecosystem documentation (leader-schedule publication, Jito Block Engine searcher infrastructure, bundle-auction mechanics)
- Solana leader-schedule specification (deterministic leader-schedule derivation, 2-epoch advance-publication property)
- Zeta and Drift DCA vault documentation and TVL data (2024-2025)
- `[solanaslotsched2023]` — Solana leader-schedule architecture and known-schedule security implications
- `[jitosolana2024]` — Jito-Solana MEV ecosystem analysis including multi-slot searcher strategies
- See `techniques/T17.005-multi-block-mev-twap-oracle-manipulation.md` for full technique characterisation
