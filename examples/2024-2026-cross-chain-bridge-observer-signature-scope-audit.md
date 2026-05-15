# Cross-Chain Bridge Observer Signature Scope Audit — 2024–2026

**Loss:** Pre-exploit audit finding. No individual loss event tied to this specific audit; the THORChain Router exploit (May 2026, $10.4M) is the first confirmed production exploitation of a T10.008-flagged surface.
**OAK Techniques observed:** OAK-T10.008 (Bridge Observer Signature Scope Truncation) — primary; OAK-T10.002 (Message Verification Bypass) — structurally distinct but co-occurring in bridge audit scopes.
**Attribution:** **unattributed** — this is a protocol-level vulnerability class, not an individual attacker-attributed incident.

**Key teaching point:** T10.008 names a signature-engineering defect that is discoverable pre-exploit at the protocol-source level. The audit methodology — enumerate `GetSignablePayload()` return fields vs. full `ObservedTx` struct fields — applies to every bridge with an observer/relayer network. This example documents the audit methodology, the structural conditions that create T10.008 surfaces, and the pre-exploit detection approach that could have prevented the THORChain May 2026 exploitation.

## Summary

Between 2024 and early 2026, security researchers auditing cross-chain bridge observer/relayer protocols identified a recurring architectural defect: the function that produces the bytes to be signed by observers (`GetSignablePayload()` or equivalent) returned only the inner transaction data, while semantically-meaningful wrapper fields — direction flags, destination addresses, chain identifiers, migration/vault-churn slots — sat outside the signed boundary.

The defect is structural, not implementation-specific. It arises from a design decision present in multiple bridge protocols: the observer witnesses a full observation struct (`ObservedTx`) containing both the underlying transaction data (sender, recipient, amount, token) and wrapper metadata (direction, chain, memo, slot), but the signing function was scoped to only the inner transaction data because the wrapper fields were originally considered "routing metadata" rather than "execution-affecting parameters."

The audit finding demonstrated that a malicious proposer (or relayer, or validator) could modify these unsigned wrapper fields — flipping a direction flag from inbound to outbound, replacing a destination address with an attacker-controlled address, or changing the migration slot — and the existing observer signatures would remain cryptographically valid because the modified bytes were never part of the signed payload. Consensus would accept the forged observation as authentic.

## Pre-exploit audit methodology

The audit methodology for detecting T10.008 surfaces pre-exploit proceeds in five steps:

1. **Source-level payload coverage enumeration.** For a target bridge protocol, locate the function that returns the bytes observers sign (typically named `GetSignablePayload()`, `SignableBytes()`, `Digest()`, or equivalent). Enumerate every field name in the returned struct or serialised bytes. This is the *signed set S*.

2. **Full execution-struct field enumeration.** Locate the full observation/event struct that is committed to consensus and whose fields influence on-chain execution. Enumerate every field name that (a) appears in the committed observation struct and (b) influences execution (direction, destination, chain identifier, asset, memo, vault slot, migration sequence number, fee). This is the *execution set E*.

3. **Unsigned execution field identification.** Compute the set difference: *U = E − S*. These are the fields that influence execution but are not covered by observer signatures. Any non-empty *U* is a T10.008 surface. The severity is proportional to the execution impact of the unsigned fields — a direction flag is critical; a non-execution-affecting metadata field is informational.

4. **Wrapper-vs-inner inconsistency test (runtime).** For each committed observation, verify that the wrapper metadata is semantically consistent with the inner signed transaction. An outbound direction flag paired with a deposit inner transaction is impossible and indicates forgery. A destination address that differs from the inner transaction recipient is impossible.

5. **Multi-observer wrapper divergence test (runtime).** For each observed event, compare the wrapper metadata committed by the proposer against the wrapper metadata witnessed by other observers who signed the same event. Divergence on unsigned fields from a single proposer indicates forgery.

## Bridges audited and findings

The audit methodology was applied to several major cross-chain bridge protocols between 2024 and early 2026. THORChain's Bifrost protocol was identified as having *U = {direction, destination, chain, memo, migration_slot}* — five execution-affecting fields outside the `GetSignablePayload()` boundary, including the direction flag that distinguishes deposits from withdrawals. This finding was the pre-exploit identification of the surface that would be exploited in May 2026.

Other bridges audited during this period had varying *U* sets. Protocols that had designed their signing scope to cover the full observation struct had *U = ∅* and were not vulnerable to T10.008. Protocols with *U ≠ ∅* were notified through responsible disclosure channels.

## What defenders observed

- **T10.008 surfaces are discoverable pre-exploit.** The audit methodology requires only access to the bridge's observer protocol source code, which is open-source for most major bridges. The gap between `GetSignablePayload()` coverage and full observation struct execution-relevant fields is computable without running a node.
- **Empty *U* is the design target.** A bridge observer protocol where `GetSignablePayload()` covers every execution-relevant field in the observation struct has no T10.008 surface. This is a binary design property: either the signature scope covers execution-relevant metadata or it doesn't.
- **Post-upgrade regression is a persistent risk.** When a bridge protocol upgrade adds new fields to the observation struct, those fields must be added to `GetSignablePayload()` coverage in the same upgrade. A protocol that previously had *U = ∅* can acquire *U ≠ ∅* through an upgrade that adds execution-relevant fields without expanding the signing scope.
- **Runtime detection is the defense-in-depth complement.** Multi-observer wrapper comparison catches forged observations even if the protocol-level audit is incomplete. If other observers witnessed different wrapper metadata than what the proposer committed, the proposer forged the unsigned fields.

## Public references

- THORChain `thornode` repository — `GetSignablePayload()` implementation and post-exploit patch (`af46db22`).
- `[OAK-2026-001]` THORChain Router Exploit investigation.
- Bridge observer protocol documentation: THORChain Bifrost, Chainlink CCIP, Wormhole Guardian Network, Axelar General Message Passing.
