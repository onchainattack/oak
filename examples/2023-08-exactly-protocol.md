# Exactly Protocol cross-chain debt-ceiling bypass — Optimism — 2023-08-18

**Loss:** approximately $7.2M extracted from Exactly Protocol's Optimism deployment via a cross-chain message-validation bypass on 2023-08-18. Exactly Protocol is a cross-chain lending protocol that enforces per-user debt ceilings across chains via cross-chain message passing; the exploited surface was a peripheral contract's validation logic that failed to correctly enforce the cross-chain debt-ceiling check.
**OAK Techniques observed:** **OAK-T10.002** (Message Verification Bypass — the attacker exploited a flaw in the cross-chain message-validation logic of Exactly Protocol's peripheral contract, bypassing the cross-chain debt-ceiling check and enabling borrowing above the authorised per-user limit). **OAK-T9.004** (Access-Control Misconfiguration — at the protocol-contract layer: the peripheral contract's cross-chain message validation did not correctly enforce the debt-ceiling invariant, structurally parallel to the ChainSwap token-deployment authorisation bypass at `examples/2021-07-chainswap.md`). **OAK-T7.001** (Mixer-Routed Hop — proceeds partially routed through Tornado Cash on Optimism and Ethereum).
**Attribution:** **pseudonymous-unattributed** — no public named-individual or state-actor attribution at OAK v0.1 cutoff.
**Key teaching point:** **Cross-chain debt-ceiling enforcement is a bridge-adjacent verification surface.** Exactly Protocol's cross-chain lending architecture used cross-chain message passing to enforce per-user debt ceilings; the message validation bug allowed the attacker to bypass the ceiling, structurally parallel to the ChainSwap token-deployment authorisation bypass. The case demonstrates that cross-chain protocol security depends on correct message validation at every peripheral contract, not just on the core bridge's message-verification logic.

## Summary

Exactly Protocol is a cross-chain lending protocol on Optimism and Ethereum that enforces per-user debt ceilings across chains via cross-chain message passing. On August 18, 2023, an attacker exploited a validation flaw in one of Exactly's peripheral contracts that processed cross-chain debt-ceiling messages, enabling borrowing above the authorised per-user limit. The attacker extracted approximately $7.2M before the protocol team paused affected contracts.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2023-08-18 | Exactly Protocol operates cross-chain lending with debt-ceiling enforcement via cross-chain message passing | T10.002 surface (latent) |
| 2023-08-18 | Attacker exploits cross-chain message validation flaw in peripheral contract, bypassing debt-ceiling check | **T10.002** (execution) |
| 2023-08-18 | Attacker borrows above authorised ceiling; extracts ~$7.2M | T9.004 (extraction) |
| 2023-08-18 onward | Proceeds partially routed through Tornado Cash | T7.001 |

## Public references

- `[peckshieldexactly2023]` — PeckShield on-chain trace of the Exactly Protocol cross-chain debt-ceiling bypass.
- `[blocksectexactly2023]` — BlockSec function-level walkthrough of the cross-chain message validation flaw.

## Discussion

Exactly Protocol August 2023 is the canonical 2023 Optimism T10.002 worked example for the cross-chain debt-ceiling-bypass sub-pattern. The case complements ChainSwap July 2021 (token-deployment authorisation bypass) and Poly Network August 2021 (message-verification bypass in relay-contract logic) as a structurally distinct T10.002 sub-class: the message-validation failure was in a peripheral contract's enforcement of a cross-chain invariant (debt ceiling), not in the core bridge's message-verification logic and not in a token-deployment authorisation path. The case closes the T10×2023 near-threshold gap at v0.1.
