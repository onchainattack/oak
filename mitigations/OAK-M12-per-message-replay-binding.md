# OAK-M12 — Per-Message Replay Binding

**Class:** architecture
**Audience:** protocol, designer (bridge / cross-chain)

**Maps to Techniques:** OAK-T10.002, OAK-T10.003

## Description

Per-message replay binding is the canonical bridge-architecture mitigation against cross-chain message replay. The defining rule is that *every* signed cross-chain message includes, at minimum, three identifiers in its signed payload: (1) the *destination chain ID* (e.g., EIP-155 chain identifier on EVM destinations, equivalent canonical identifier on non-EVM destinations); (2) the *deployed-instance contract address* on that destination chain; and (3) a *per-instance nonce* (or other monotonically-incrementing or per-message-unique identifier) that the destination contract verifies and consumes. Together, these three fields make the signed message unambiguously bound to a single (chain, instance, position-in-message-order) tuple, so that a message valid for one tuple is *invalid* for any other.

The mitigation exists because the attack surface is structural to multi-chain deployments: bridge operators routinely deploy the *same* signing-key set across the *same* contract code on *multiple* chain-instance pairs (Ethereum mainnet + a fork; mainnet + a testnet; mainnet + an L2 instance; multiple sister bridges sharing a validator set). A signed message that omits any of the three binding fields can be replayed against any deployment that shares the signer set — the canonical T10.003 (Cross-Chain Replay) Technique.

Per-message replay binding is also the most-direct defence against a subclass of T10.002 (Message-Verification Bypass) where the bypass is structural rather than a verification-function bug: the verification function may be correct, but if the *signed payload* lacks chain-ID and instance-address fields, a payload valid on one chain is *legitimately* valid on another, and the verification function cannot reject it without a binding to verify against. The mitigation here is to fix the payload, not the verification function.

The mitigation is well-understood in academic literature and in industry bridge-security surveys; the failure mode is operational rather than theoretical — operators deploying multi-instance bridges without explicit per-instance binding under deployment time-pressure, or sharing signing keys across instances "for operational simplicity." OAK documents the mitigation here as a standing architectural requirement for any multi-chain bridge deployment.

## How it applies

- **OAK-T10.002 (Message-Verification Bypass):** for the *structural* subclass of T10.002 — where the verification function operates on a payload that itself lacks chain-ID / instance-address binding — the canonical mitigation is to add the binding to the signed payload (not to patch the verification function). The structural subclass is distinct from the verification-function-bug subclass that T10.002 also covers; OAK-M12 specifically addresses the former.
- **OAK-T10.003 (Cross-Chain Replay):** the canonical mitigation. Include chain ID, deployed-contract address, and per-instance nonce in every signed cross-chain message, by design; document the message-binding scheme as part of the bridge specification; never share signing keys across instances without explicit per-instance binding.

## Limitations

The mitigation depends on *every* relying contract verifying the binding — a single instance that omits the chain-ID or instance-address check breaks the binding for every signer-set-sharing peer. Older bridge contracts deployed before the threat was widely understood often lack the binding and cannot be retrofitted without a contract upgrade; the upgrade path itself is a T10.002 (verification-function correctness across upgrade paths) surface.

The per-instance nonce primitive must be carefully designed to handle out-of-order delivery, retry semantics, and gas-failure-then-resubmit cases; a too-strict monotonic-nonce design creates a denial-of-service surface where a single stuck message blocks all subsequent messages. Bitmap-based or per-message-hash-tracked nonce designs are common alternatives, each with trade-offs that the bridge specification must document.

OAK-M12 does not address the broader T10.002 surface where the verification *function* is buggy (constructor-uninitialised verification roots, incorrect signature aggregation, faulty light-client header validation — see T10.005). For the verification-function-correctness subclass, the canonical mitigation is the audit-and-runtime-invariants combination documented under T10.002 mitigations directly.

The mitigation does not protect against *signing-key compromise* (T10.001) — a compromised signer can produce a correctly-bound message that the verification function correctly accepts. Per-message replay binding closes the *replay* surface; key-compromise mitigation is OAK-T10.001 territory (validator-set thresholding + HSM enforcement + rotation).

## Reference implementations

- **EIP-712 / EIP-155 chain-ID binding** — canonical EVM primitives for chain-ID inclusion in signed payloads; the lower-level building block on which bridge-side per-message binding is constructed.
- **LayerZero Endpoint per-chain trustedRemote configuration + per-message nonce** — production multi-instance binding example.
- **Wormhole VAA (Verified Action Approval) format** — chain-ID, emitter-address, and sequence-number fields baked into the signed payload; canonical example of the three-field binding pattern.
- **Axelar General Message Passing (GMP) source-chain-ID + source-address binding** — production example.
- **CCIP (Chainlink Cross-Chain Interoperability Protocol)** — chain-ID + sender + per-message nonce binding; production multi-chain mainstream deployment.
- **Cosmos IBC packet structure (source / destination chain + channel + sequence)** — the canonical non-EVM example of the same binding pattern.

## Citations

- `[zhou2023sok]` — academic taxonomy; classifies cross-chain replay as a recurring class and motivates the per-message binding mitigation.
- `[mandiantnomad2022]` — Nomad 2022 incident; canonical T10.002 verification-function-correctness worked example. Demonstrates the failure mode adjacent to (but distinct from) the structural-binding subclass that OAK-M12 mitigates.
- `[bhuptanioptbridges2022]` — bridge-class survey; characterises the cross-chain replay surface and the canonical mitigations.
- `[halbornnomadoptimistic2022]` — Halborn write-up of the Nomad-class verification surface; supporting industry forensic context.
