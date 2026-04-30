# OAK-DS-07 — DEX Trade and Swap Events

**Layer:** on-chain
**Chains:** EVM, Solana, cross-chain
**Typical access path:** Per-DEX `Swap` events (Uniswap V2 / V3 Swap, Balancer SwapLog, Curve TokenExchange, Raydium swaps, Orca whirlpools); per-aggregator routing flows (1inch, Matcha, Jupiter).

## Description

Records DEX trades — the on-chain artefact of every swap, sandwich, wash-trade, and oracle-input-venue manipulation. The most heavily-indexed Data Source in the on-chain space; near-zero access cost via standard indexers.

## What data

- Per-trade: pool, input asset, output asset, sender, recipient, amounts, gas paid, transaction position in block.
- Aggregator-routed trades: full routing path (multiple pools per logical trade).
- Block-level ordering (transaction position) — critical for sandwich detection.

## Where defenders access it

Real-time RPC event subscription; The Graph subgraphs per major DEX; Dune / Allium / Flipside warehouse queries for cohort analysis.

## Techniques that depend on this Data Source

- OAK-T3.002 — Wash-Trade Volume Inflation (cycle and net-flow detection on the trade graph).
- OAK-T3.003 — Coordinated Pump-and-Dump (price / volume / cluster joint pattern).
- OAK-T5.004 — Sandwich / MEV Extraction (three-transaction ordering signature).
- OAK-T9.001 — Oracle Price Manipulation (input-venue-side signal alongside DS-05).
- OAK-T7.004 — NFT Wash-Laundering (NFT-specific equivalent at marketplace level).

## Maintainer notes

The block-level transaction-position field is the most-frequently-overlooked field in this Data Source; sandwich-MEV detection (T5.004) requires it. Some indexers strip transaction position by default; verify availability before relying on it.
