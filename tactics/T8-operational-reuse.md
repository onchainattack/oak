# OAK-T8 — Operational Reuse

**Phase:** Cross-incident
**Adjacent tactics:** T1 (Token Genesis), T7 (Laundering)

## Scope

Operational Reuse covers the ways adversaries reuse infrastructure — wallets, deployment patterns, funding sources, off-chain assets — across multiple incidents. From a defender's perspective, T8 is the Tactic that makes the cumulative cost of detection drop over time: each newly attributed incident provides priors for the next, and operators who reuse infrastructure can be tracked across campaigns even when individual tokens are short-lived.

## What defenders observe

- Common funding-source addresses appearing across the genesis events of multiple adversarial tokens.
- Reused deployment patterns: identical compiler metadata, identical constructor parameter shapes, identical proxy/admin role mappings across nominally unrelated tokens.
- Off-chain reuse: shared social handles, shared promotional venues, shared landing-page templates linked by analytics or hosting fingerprints.

## Relationship to other tactics

T8 is the connective tissue between incidents. A T7 laundering destination that becomes a T1 funder for a new token is the canonical T8 pattern — and is the strongest available signal that an investigator is tracking an operator, not a one-off.

## Techniques in this Tactic (v0.1)

- OAK-T8.001 — Common-Funder Cluster Reuse

## Maintainer notes

T8 detection benefits most from longitudinal datasets. v0.1 documents the patterns that are stable across known operator campaigns; future versions will add Techniques tied to specific operator behaviors as those become independently citable.
