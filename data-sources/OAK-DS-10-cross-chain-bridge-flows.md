# OAK-DS-10 — Cross-Chain Bridge and Swap Flows

**Layer:** on-chain (per-chain) + derived (cross-chain attribution)
**Chains:** cross-chain bridges and DEX-style cross-chain swap protocols (THORChain, LI.FI, Across, Stargate, Synapse, Hop, Wormhole token bridge, etc.)
**Typical access path:** per-bridge inflow / outflow event logs; vendor cross-chain attribution products for the linkage layer.

## Description

Records cross-chain asset movements: deposits on the source chain, settlements on the destination chain, and (for cross-chain swap protocols) per-swap fee accrual to protocol operators. Critical for OAK-T7.003 (Cross-Chain Bridge Laundering) detection, including the protocol-economics signal (sudden fee accrual correlated with illicit-cluster inflow) introduced in the T7.003 page.

## What data

- Per-bridge deposit events (source chain, sender, amount, asset).
- Per-bridge settlement events (destination chain, recipient, amount, asset).
- Per-protocol fee accrual to node operators / liquidity providers / sequencers.
- Cross-chain attribution linkage: which deposit corresponds to which settlement.

## Where defenders access it

Per-bridge event logs via standard RPC (per-chain); vendor cross-chain attribution products (Chainalysis Reactor, TRM Forensics, Elliptic Investigator); specialist analytics (THORChain explorer, LI.FI dashboards, etc.).

## Techniques that depend on this Data Source

- OAK-T7.003 — Cross-Chain Bridge Laundering (primary).
- OAK-T10.001, T10.002, T10.003 — bridge-attack detection where the consumed messages are paired with cross-chain flows.
- OAK-Gnn (Threat Actors) — Lazarus Group attribution increasingly depends on cross-chain flow tracking post-2022.

## Maintainer notes

The cross-chain attribution layer is the hardest part: per-chain RPC data is straightforward, but linking deposits on chain A to settlements on chain B requires either protocol-cooperation (rare) or heuristic linkage (timing + amount + counterparty + per-bridge protocol semantics). Vendor coverage is the canonical access path for the linkage layer at v0.1.
