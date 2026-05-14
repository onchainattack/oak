# OAK-T5 — Value Extraction

**Phase:** Realization
**Adjacent tactics:** T2 (Liquidity Establishment), T4 (Access Acquisition), T6 (Defense Evasion), T7 (Laundering)

## Scope

Value Extraction covers the moment when adversarial setup is converted into attacker-controlled assets. From a defender's perspective, this is the Tactic where loss is realized — meaning earlier-Tactic detection (T1, T2, T3, T4) is what prevents loss; T5 detection is what limits exposure once realization is in progress and informs response.

## What defenders observe

- Asymmetric outflow events from pools or wallets, often concentrated in a single transaction or short burst.
- Authority-exercise events whose scope matches a previously granted T4 permission.
- Price and depth dislocations consistent with the conversion of pool-side or holder-side balances into a quote asset under attacker control.

## Relationship to other tactics

T5 events are the public, observable record of the extraction. They feed forensic investigation: every T5 event has an upstream T1/T2/T3/T4 setup that, in retrospect, was the earlier-Tactic precondition. Mapping T5 events back to their predicate Tactics is the core forensic loop OAK is designed to support.

## Techniques in this Tactic (v0.1)

- OAK-T5.001 — Hard LP Drain
- OAK-T5.002 — Slow LP Trickle Removal
- OAK-T5.003 — Hidden-Mint Dilution
- OAK-T5.004 — Sandwich / MEV Extraction
- OAK-T5.005 — Treasury-Management Exit
- OAK-T5.006 — Vesting-Cliff Dump
- OAK-T5.007 — Third-Party Brand Impersonation Custodial Soft-Rug

## Maintainer notes

Slow-extraction patterns (T5.002) are partially covered in v0.1 — calibration of "slow" thresholds is an open research item; see TM-RugPull (2026) and the Discussion section in `techniques/T5.002-*.md`.
