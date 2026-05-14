# OAK-T7 — Laundering

**Phase:** Post-extraction
**Adjacent tactics:** T5 (Value Extraction), T8 (Operational Reuse)

## Scope

Laundering covers the post-extraction movement of assets, intended to obscure the trail between the extraction event and the eventual off-ramp. From a defender's perspective, T7 is where forensic analysis hands off to compliance and law-enforcement workflows — the question shifts from "what happened" to "where did the value go, and who can intervene where."

## What defenders observe

- Movement patterns that route extracted assets through services or contracts whose explicit purpose is to break the linkage between source and destination addresses.
- Use of cross-chain bridges in ways that introduce traceability gaps and require multi-chain attribution to follow.
- Patterned deposit-and-withdrawal timing across services consistent with attempts to defeat heuristics that link deposits and withdrawals.

## Relationship to other tactics

T7 follows T5. T7 paths often map back to T8 (Operational Reuse) — laundering destinations frequently reappear as funding sources for the next adversarial-token deployment, closing the loop into a new T1.

## Techniques in this Tactic (v0.1)

- OAK-T7.001 — Mixer-Routed Hop
- OAK-T7.002 — CEX Deposit Layering
- OAK-T7.003 — Cross-Chain Bridge Laundering
- OAK-T7.004 — NFT Wash-Laundering
- OAK-T7.005 — Privacy-Chain Hops
- OAK-T7.006 — DeFi Yield-Strategy Laundering

## Maintainer notes

T7 detection in v0.1 is graph-only — MG covers laundering inferentially via cluster analysis, not via direct mixer-protocol heuristics. This is a documented coverage gap; partial Reference-implementation entries are expected.
