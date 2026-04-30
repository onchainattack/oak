# OAK-DS-09 — Funder Graph (Derived)

**Layer:** derived (from on-chain transfer events)
**Chains:** EVM, Solana, cross-chain
**Typical access path:** custom graph indexer; vendor cluster-attribution products (Chainalysis Reactor, TRM Forensics, Elliptic Investigator) provide curated funder-graph access.

## Description

Records the per-address graph of funding sources, computed from raw transfer events. For each address, the funder graph identifies the set of upstream addresses that have sent funds to it (directly or via N hops), allowing defenders to detect operator clusters that share funding ancestors. The most important *derived* Data Source in OAK because the underlying detection methodology for OAK-T3.001, T8.001, and the broader Group-attribution (`actors/`) axis depends on it.

## What data

- Per-address funding-source set (parameterised by hop depth).
- Per-cluster aggregate metrics (number of distinct addresses, cumulative inflow / outflow, time-of-first-funding distribution).
- Cross-incident continuity: the same funding-source cluster appearing across multiple incident-flagged target addresses.

## Where defenders access it

Vendor cluster-attribution products (canonical commercial source); custom graph databases built on top of raw transfer-event indexes (The Graph, Dune, Allium); academic-style graph computation per `[liu2025sybil]`.

## Techniques that depend on this Data Source

- OAK-T3.001 — Sybil-Bundled Launch (funder-graph-rooted-at-early-buyers).
- OAK-T8.001 — Common-Funder Cluster Reuse (cross-incident funder-graph continuity).
- OAK-Gnn (Threat Actors axis) — wallet-cluster attribution depends on funder-graph computation.
- OAK-T7.002, T7.003 — laundering attribution depends on tracing via funder-graph backwards from off-ramp addresses.

## Maintainer notes

The hop-depth parameter is the primary calibration knob: shallow funder-graphs miss indirect funding paths; deep funder-graphs produce false-positive clusters. Per-chain calibration is appropriate; v0.1 does not publish reference depth values.
