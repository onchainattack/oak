# OAK-DS-02 — DEX Pool Creation and Liquidity Events

**Layer:** on-chain
**Chains:** EVM, Solana
**Typical access path:** DEX-factory pool-creation events (Uniswap V2 / V3 PoolCreated, Sushiswap, Raydium, Orca); liquidity-add and liquidity-remove events at each pool.

## Description

Records the lifecycle of DEX liquidity pools: creation, liquidity provision, liquidity removal. The destination of LP tokens at provision time is the canonical "who controls liquidity" signal, and the size and timing of liquidity removal events is the canonical OAK-T5.001 (Hard LP Drain) signal.

## What data

- Pool creation event (token pair, factory address, initial reserves).
- Liquidity-add events with LP token mint destinations.
- Liquidity-remove events with LP token burn sources.
- Pool reserve snapshots over time.

## Where defenders access it

DEX-specific factory contracts (event logs); indexers (The Graph subgraphs for major DEXes, Dune); per-DEX analytics platforms.

## Techniques that depend on this Data Source

- OAK-T2.001 — Single-Sided Liquidity Plant (initial-reserve composition).
- OAK-T2.002 — Locked-Liquidity Spoof (LP token destination + locker-contract analysis).
- OAK-T5.001 — Hard LP Drain (single-event large outflow detection).
- OAK-T5.002 — Slow LP Trickle Removal (windowed cumulative outflow detection).

## Maintainer notes

Concentrated-liquidity DEXes (Uniswap V3, equivalent) require per-tick analysis rather than simple total-reserve snapshots; the underlying data is the same but the detection-methodology calibration differs.
