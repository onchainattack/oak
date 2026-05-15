# Q1–Q2 2026 Access-Control and Authorisation-Gap Cohort — Sweat Foundation, Ekubo, Giddy, Aftermath Perps — Aggregate ~$7.3M

**OAK Techniques observed:** OAK-T9.004

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** Sweat Foundation ~$3.5M (refund-logic exploit on Near — `refund_first` and `refund_second` functions lacking authorisation checks); Ekubo ~$1.4M (improper access control on Ethereum); Giddy ~$1.3M (incomplete EIP-712 signature coverage — missing message-type validation enabling replay across typed-data domains); Aftermath Perps ~$1.14M (fee-accounting logic flaw on Sui — attacker manipulated fee-calculation path to extract value). Aggregate ~$7.3M across four incidents, April–May 2026.

**Key teaching point:** Four access-control and authorisation-gap incidents spanning four chains (Near, Ethereum, Ethereum, Sui) in a six-week window demonstrate that T9.004 (Access-Control Misconfiguration) is the most pervasive exploit class in DeFi — it manifests as a missing function-access modifier (Sweat Foundation), an improperly-scoped authorisation check (Ekubo), an incomplete cryptographic signature domain (Giddy), and a fee-accounting path without access control (Aftermath Perps). The structural thread is **a function that should have been gated behind an authorisation check — and wasn't.**

## Summary

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2026-04-23 | Giddy: incomplete EIP-712 signature coverage exploited for ~$1.3M; attacker replays signatures across typed-data domains because the contract's `domainSeparator` check omits a message-type field | **T9.004** (incomplete EIP-712 domain coverage — missing message-type binding) |
| 2026-04-29 | Sweat Foundation: `refund_first` and `refund_second` logic exploit on Near drains ~$3.5M; refund functions lack caller-authorisation checks — anyone can invoke the refund path for any account | **T9.004** (missing function-access modifier on refund entrypoints) |
| 2026-04-29 | Aftermath Perps: fee-accounting logic flaw on Sui; attacker manipulates the fee-calculation path to extract ~$1.14M | **T9.004** (fee-accounting path without access control), **T9.011** (fee-arithmetic manipulation) |
| 2026-05-05 | Ekubo: improper access control exploit on Ethereum; ~$1.4M extracted via a function whose authorisation check gates the wrong subject | **T9.004** (improper access-control configuration) |

## Sweat Foundation — Permissionless Refund Functions

On April 29, 2026, Sweat Foundation on Near was exploited for ~$3.5M via two refund functions — `refund_first` and `refund_second` — that lacked caller-authorisation checks. The functions were designed to process refunds for protocol users but were callable by any address for any target account. The attacker invoked the refund path repeatedly, draining value that should have been gated behind a caller-is-owner or authorised-operator check.

The incident is structurally identical to the permissionless-function sub-pattern of T9.004 that claimed TrustedVolumes ($5.87M, `registerAllowedOrderSigner()` without owner modifier) and Volo ($3.5M, single admin key) — a function that performs a value-transferring operation without verifying that the caller has the right to trigger it.

**OAK mapping:** T9.004 (missing function-access modifier — permissionless refund functions on Near).

## Ekubo — Improper Access Control

On May 5, 2026, Ekubo on Ethereum was exploited for ~$1.4M via an improper access-control exploit. The attacker called a function whose authorisation check was present but misconfigured — the check gated the wrong subject or verified a condition the attacker could satisfy without authorisation. The incident is one of two access-control exploits within 24 hours (alongside SQ Protocol on BSC, ~$346K, May 12) and reflects the persistence of the misvalidated-authorisation sub-pattern of T9.004.

**OAK mapping:** T9.004 (improper access-control configuration — authorisation check gating wrong subject).

## Giddy — Incomplete EIP-712 Signature Coverage

On April 23, 2026, Giddy on Ethereum was exploited for ~$1.3M via incomplete EIP-712 signature coverage. The protocol used EIP-712 typed-data signatures for transaction authorisation but the `domainSeparator` construction omitted a message-type identifier. The attacker exploited this gap to replay a signature signed for one message type (e.g., a staking approval) in a different message-type context (e.g., a token transfer), because the contract's signature-verification path did not bind the signature to its intended message type.

This is a subtle T9.004 variant: the access-control check (signature verification) is present and technically correct for the individual message, but the **signature domain is insufficiently scoped** — the signature is valid across multiple message types because the domain separator does not include a type identifier. The attacker does not forge a signature; they replay a legitimately-signed message in a context the signer did not intend.

**OAK mapping:** T9.004 (incomplete EIP-712 domain coverage — missing message-type binding in `domainSeparator`). Structurally distinct from T9.005 (Reentrancy) and T9.006 (Signature Replay) — this is a domain-separation failure, not a replay of the same signed message.

## Aftermath Perps — Fee-Accounting Logic Flaw

On April 29, 2026, Aftermath Perps on Sui was exploited for ~$1.14M via a fee-accounting logic flaw. The attacker manipulated the fee-calculation path — either by exploiting an integer-arithmetic rounding error in the fee computation (T9.011 sub-pattern) or by invoking a fee-adjustment function that lacked proper access control (T9.004 sub-pattern). The incident is notable as one of the first significant perpetuals-protocol exploits on Sui and demonstrates that the fee-accounting surface is a load-bearing security boundary independent of the oracle and liquidation infrastructure.

**OAK mapping:** T9.004 (fee-accounting path without access control) + T9.011 (potential fee-arithmetic manipulation — integer-division rounding in fee calculation).

## Public references

- Sweat Foundation: DeFiLlama classification as "Refund_first & Refund_second Logic Exploit" on Near
- Ekubo: DeFiLlama classification as "Improper Access Control Exploit" on Ethereum
- Giddy: DeFiLlama classification as "Incomplete EIP-712 Signature Coverage" on Ethereum
- Aftermath Perps: DeFiLlama classification as "Fee-Accounting Logic Flaw" on Sui
- Cross-reference: T9.004 at `techniques/T9.004-access-control-misconfiguration.md`; T9.011 at `techniques/T9.011-precision-loss-rounding-attack.md`

## Discussion

The Q1–Q2 2026 access-control cohort demonstrates that **T9.004 is not one attack pattern but a family of related authorisation failures**, each of which can be eliminated by a specific, well-understood mitigation:

| Sub-pattern | Canonical case | Mitigation |
|---|---|---|
| Missing function-access modifier | Sweat Foundation (`refund_first`, `refund_second`) | `require(msg.sender == owner)` or role-based access control |
| Misvalidated authorisation subject | Ekubo (check gating wrong subject) | Verify the authorisation check gates the correct entity |
| Incomplete cryptographic domain binding | Giddy (missing EIP-712 message-type in domain separator) | Include all message-type identifiers in the domain separator |
| Fee-accounting path without access control | Aftermath Perps | Gate fee-adjustment functions behind admin or timelock access |

The Giddy case is the most technically instructive: EIP-712 domain separators are the cryptographic boundary between "this signature authorises operation X on contract Y" and "this signature could authorise anything on contract Y." Omitting the message-type identifier from the domain separator collapses the type-specific scoping and makes every signed message valid for every message type. The fix is a one-line addition to the `domainSeparator` construction; the exploit is undetectable until a message is replayed across types.

The Sweat Foundation case is the simplest and most devastating: two functions, both permissionless, both moving value. The `refund_first` / `refund_second` naming suggests a two-phase refund architecture where the authorisation check was intended to be in one phase and was omitted from the other — or was planned for a future upgrade that never shipped. The pattern echoes TrustedVolumes' `registerAllowedOrderSigner()` — a function whose name describes what it does (registers a signer) without the access-control modifier that constrains who can do it.
