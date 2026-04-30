# OAK-DS-11 — Mempool and Pre-Block Order Flow

**Layer:** mempool / pre-block
**Chains:** EVM (primary), Solana (validator-side mempool access)
**Typical access path:** private mempool subscriptions (Flashbots Protect, MEV-Share, BloXroute); public-mempool monitoring (less reliable post-private-pool-adoption); validator-side telemetry where accessible.

## Description

Records pending transactions and pre-block order flow — the "what is about to be confirmed" surface that sandwich-MEV operators (T5.004) operate on, and that some pre-event detection (T9.002 flash-loan setup; T9.001 oracle-input-trade staging) requires. Substantially less universally-accessible than on-chain Data Sources because much modern transaction flow is routed through private mempools specifically to defeat front-running.

## What data

- Pending transactions: hash, sender, recipient, calldata, gas price, time-of-observation.
- MEV-bundle submissions where visible (Flashbots Protect, MEV-Share).
- Pre-block ordering signals from validator-side telemetry (where access is granted).

## Where defenders access it

Private-mempool subscription products (Flashbots, BloXroute, Eden Network); public-mempool monitoring (residual visibility); validator-side telemetry (proprietary); MEV-analytics platforms (EigenPhi, Flashbots Explorer) for derived data.

## Techniques that depend on this Data Source

- OAK-T5.004 — Sandwich / MEV Extraction (pre-event order-flow visibility for the victim swap).
- OAK-T9.002 — Flash-Loan-Enabled Exploit (potentially detectable pre-confirmation if the flash-loan setup is visible in mempool, though most modern attacks are routed through private mempools).

## Maintainer notes

Mempool visibility has degraded over time as private mempools have grown; pre-2022 detection methodology assumed broad public-mempool visibility, which no longer reflects production reality. Contributors writing OAK Techniques whose detection signals depend on mempool data should explicitly note the visibility-via-private-mempool caveat.
