# OAK-DS-04 — Permit / Permit2 Off-Chain Signatures

**Layer:** off-chain (signature) + on-chain (consumption)
**Chains:** EVM (primary)
**Typical access path:** wallet-side telemetry (signing-flow logs); on-chain `Permit` / Permit2 `transferFrom` consumption events.

## Description

Records EIP-2612 `permit` and Uniswap Permit2 signed authorisations. Distinct from DS-03 (on-chain `Approval` events) because the authority artefact lives off-chain as a signed payload until consumed on-chain by the holder of the signature. The off-chain payload contains the full authority scope (spender, token, value, deadline, nonce) and is the canonical detection surface for OAK-T4.001 — but only at the wallet-UX layer, since the on-chain consumption event arrives after the authority has already been granted.

## What data

- Off-chain: EIP-712 typed-data signed payloads (wallet-vendor telemetry where available).
- On-chain: `Permit(owner, spender, value, deadline)` consumption events; Permit2 `transferFrom` calls.
- Signature payload fields: spender address, token contract, value (often `uint256.max`), deadline, nonce.

## Where defenders access it

Wallet-vendor signing-flow telemetry (proprietary to each wallet); on-chain consumption events via standard RPC / event-log access; specialist wallet extensions (Pocket Universe, Rabby Detection Cloud) provide pre-sign simulation.

## Techniques that depend on this Data Source

- OAK-T4.001 — Permit2 Signature-Based Authority Misuse (primary).
- OAK-T4.002 — Compromised Front-End Permit Solicitation (the malicious front-end produces the same DS-04 artefacts; the differentiation is at the entry-vector / DS-12 layer).

## Maintainer notes

Pre-sign simulation at the wallet UX is the highest-leverage layer for T4.001 mitigation, because by the time the on-chain consumption event lands, the funds are already gone. Wallet vendors with rich permit-payload simulation (Rabby, Pocket Universe) provide the defender's most actionable telemetry surface.
