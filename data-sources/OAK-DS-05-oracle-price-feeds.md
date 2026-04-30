# OAK-DS-05 — Oracle Price Feeds and Oracle-Input Trades

**Layer:** on-chain
**Chains:** EVM, Solana, cross-chain
**Typical access path:** Chainlink / Pyth / API3 / TWAP-on-DEX feed contracts (price-update events); per-feed input-venue trade events.

## Description

Records oracle price updates and the input-venue trades that feed them. Critical for OAK-T9.001 detection because the canonical attack pattern moves the oracle's reported price through trades on its input venues; the oracle-side telemetry is the leading indicator of an in-progress oracle-manipulation event.

## What data

- Oracle feed price-update events (timestamp, asset, price, source).
- Per-input-venue trade events (where the feed sources from a DEX or CEX).
- Feed metadata: TWAP window length, deviation threshold, input-venue list.

## Where defenders access it

Oracle-protocol-specific event logs (Chainalink AggregatorV3 events; Pyth account updates; etc.); per-feed input-venue trade telemetry via DS-07.

## Techniques that depend on this Data Source

- OAK-T9.001 — Oracle Price Manipulation (primary; both oracle-side and input-venue-side signals).

## Maintainer notes

Multi-venue cross-reference (compare oracle-reported price against a wider-liquidity reference such as CEX mid or multi-venue TWAP) is the canonical real-time detection methodology and requires both DS-05 (oracle-side) and DS-07 (input-venue-side) telemetry.
