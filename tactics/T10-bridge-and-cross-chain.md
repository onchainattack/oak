# OAK-T10 — Bridge and Cross-Chain

**Phase:** Realization (cross-chain infrastructure layer)
**Adjacent tactics:** T7 (Laundering — proceeds typically routed across chains), T9 (Smart-Contract Exploit — bridge contracts can also be vulnerable to oracle/access-control flaws independent of bridge-specific patterns)

## Scope

Bridge and Cross-Chain covers attack classes specific to the infrastructure that moves value between chains. Bridges produced more than \$2B in losses in 2022 alone, making this category — alongside T9 — one of the two largest classes of public DeFi losses by aggregate dollar value. T10 is intentionally distinct from T9 (Smart-Contract Exploit) because the failure modes that are *unique to bridges* — validator-set compromise, message-verification bypass, cross-chain replay — have detection signals and mitigations that do not transfer cleanly from the single-chain protocol-exploit setting.

Within OAK, T10 is also the connective tissue between operator-behaviour Tactics (T1–T8) and OAK Threat Actors. The Lazarus Group (`actors/OAK-G01-lazarus.md`) has chosen bridges as a primary target class through 2022–2025 because the attack surface combines off-chain entry vectors (social engineering against validator operators) with on-chain extraction at high dollar value — the highest-leverage targeting profile in the space.

## What defenders observe

- Sudden large outflows from a bridge's locked-asset side, often paired with corresponding mint events on the unlocked side, that are not preceded by legitimate user-side bridge interactions.
- Authorisation events (signed validator messages, multisig approvals, MPC-protocol completions) executed by parties whose key-management posture has been recently reported as anomalous (off-chain compromise indicators).
- Post-upgrade behaviour changes in bridge contracts that alter message-verification semantics — a recurring T10.002 antecedent.
- Downstream laundering chains (T7.001 Tornado Cash, cross-chain hops) consistent with the operator profile of OAK-G01 or other tracked Groups.

## Relationship to other tactics

T10 is operationally adjacent to T9: a bridge can also be vulnerable to T9-class smart-contract exploits (Wormhole's missing-guardian-validation flaw is canonically T9.004 *and* operationally a bridge incident). Where the failure mode is bridge-specific (validator-set, message-verification, cross-chain replay), it belongs in T10. Where the failure mode is generic protocol-layer (oracle manipulation, access-control on a non-bridge function), it belongs in T9. Cases that span both are cross-referenced in the per-Technique pages.

T10 chains directly into T7 (Laundering): bridge-extraction proceeds are typically laundered through mixers (T7.001) and through cross-chain hops, with `[ofac2022tornado]` and Tornado Cash usage by Lazarus-attributed actors documented across Ronin and Harmony Horizon.

## Techniques in this Tactic (v0.1)

- OAK-T10.001 — Validator / Signer Key Compromise
- OAK-T10.002 — Message-Verification Bypass
- OAK-T10.003 — Cross-Chain Replay

## Maintainer notes

T10 in v0.1 covers three Technique classes with strong public forensic records. Emerging classes that may warrant their own Techniques in v0.x updates: optimistic-bridge fraud-proof gap exploitation; light-client verification bypass; cross-chain-message ordering attacks. Liquidity-provider loss-of-funds via bridge pause/wind-down is a risk class but not an attack class, and is intentionally out of scope for OAK.

The Wormhole Feb 2022 case is classified primarily under T9.004 (access-control misconfiguration in the verification logic) with T10 cross-references, because the underlying flaw is generic access-control rather than bridge-specific. Contributors writing future bridge cases should preserve this distinction.
