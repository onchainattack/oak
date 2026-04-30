# OAK-DS-08 — Bridge Validator Messages and VAAs

**Layer:** on-chain (consumption) + off-chain (signature aggregation)
**Chains:** cross-chain bridges (Wormhole, LayerZero, Axelar, Hyperlane, Across, Synapse, etc.)
**Typical access path:** per-bridge consumption-side event logs; bridge-operator-published guardian / validator message archives where available.

## Description

Records cross-chain authorisation messages: the signed payloads (often called VAAs — Validator Action Approvals — in Wormhole-style architectures, or generic threshold-signed messages in MPC-style bridges) that authorise asset movements across chains. Critical for OAK-T10 detection across all three Techniques.

## What data

- Per-message: source chain, destination chain, payload, signing key set / threshold satisfied.
- Bridge-contract consumption events (where the message is processed).
- Guardian / validator key-set composition over time.

## Where defenders access it

Bridge-protocol-specific archives (some publish guardian message archives publicly); bridge-contract consumption-event logs via RPC; specialist tooling (Wormhole Explorer, LayerZero Scan) for enriched views.

## Techniques that depend on this Data Source

- OAK-T10.001 — Validator / Signer Key Compromise (key-set-composition anomaly detection).
- OAK-T10.002 — Message-Verification Bypass (malformed-or-forged-payload consumption detection).
- OAK-T10.003 — Cross-Chain Replay (per-message-binding / nonce / chain-ID-binding verification).

## Maintainer notes

Bridge-protocol heterogeneity is high — the "validator message" abstraction varies substantially between Wormhole-style guardian sets, LayerZero-style oracle+relayer architecture, and MPC-style threshold-signing schemes. Per-bridge access methodology is necessary; OAK does not at v0.1 publish a normalised cross-bridge schema.
