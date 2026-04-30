# OAK-T4 — Access Acquisition

**Phase:** Targeted compromise
**Adjacent tactics:** T5 (Value Extraction), T6 (Defense Evasion)

## Scope

Access Acquisition covers the ways adversaries gain unauthorized authority over a victim's wallet, contract, or signing surface — typically by inducing the victim to grant a permission they did not understand. From a defender's perspective, the focus is on the **post-grant artifacts**: what privileges now exist on-chain, who holds them, and what counter-actions (e.g., revocation) are available.

## What defenders observe

- Approval and permit objects pointing to addresses that cluster with known adversarial infrastructure.
- Approvals with disproportionately broad scope (e.g., unlimited allowances, many tokens at once, signature-based authorities valid for long windows).
- Front-end and signing-flow evidence (where available) showing that the victim's signing UI did not surface the actual scope of the action.

## Relationship to other tactics

T4 produces the authority that T5 (Value Extraction) consumes. Because some T4 Techniques are revocable until the moment they are exercised, T4 is the Tactic where defender intervention has the highest expected value — every revocation before exercise nullifies one downstream extraction event.

## Techniques in this Tactic (v0.1)

- OAK-T4.001 — Permit2 Signature-Based Authority Misuse
- OAK-T4.002 — Compromised Front-End Permit Solicitation

## Maintainer notes

T4 detection benefits significantly from wallet-side telemetry that is rarely public. Reference implementations should be honest about whether they detect at the on-chain authority layer, the wallet-UX layer, or both.
