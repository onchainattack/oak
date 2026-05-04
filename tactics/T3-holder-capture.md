# OAK-T3 — Holder Capture

**Phase:** Pre-launch / Launch
**Adjacent tactics:** T2 (Liquidity Establishment), T5 (Value Extraction)

## Scope

Holder Capture covers the ways adversarial tokens manufacture the appearance of organic demand in order to attract real holders. From a defender's perspective, the question is whether early holder activity reflects independent demand or coordinated activity originating from a small number of related funding sources.

## What defenders observe

- Clusters of early-buyer addresses funded from a common source ahead of launch.
- Trading patterns whose volume profile is inconsistent with the token's holder count, social footprint, or external venue presence.
- Coordinated price action — sharp upward moves driven by a small set of related addresses, often with publicly observable promotion happening in parallel.

## Relationship to other tactics

T3 turns a deployed token (T1) with set-up liquidity (T2) into a token that real users discover and buy. This is the inflection where retail exposure begins — and therefore where the dollar-loss potential of downstream tactics (T5) becomes material.

## Techniques in this Tactic (v0.1)

- OAK-T3.001 — Sybil-Bundled Launch
- OAK-T3.002 — Wash-Trade Volume Inflation
- OAK-T3.003 — Coordinated Pump-and-Dump

## Maintainer notes

Detection at T3 leans heavily on cluster analysis (common-funder graphs, time-correlated trade patterns). Coverage in v0.1 reflects what is observable on a single chain; multi-venue coordination remains a partial gap.
