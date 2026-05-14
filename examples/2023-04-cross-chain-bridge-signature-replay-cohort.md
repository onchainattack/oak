# Cross-chain bridge signature replay across shared-validator-set instances — multi-chain — 2022–2024

**Loss:** structural — the aggregate dollar loss attributable specifically to cross-chain replay (T10.003) rather than to the broader bridge-compromise class (T10.001 / T10.002) is smaller than the headline bridge-exploit figures and is concentrated at the mid-six-to-low-seven-figures range across multiple smaller incidents. The loss is measured as the portion of bridge losses where insufficient message-binding (missing chain ID, instance address, or per-instance nonce) was the root cause rather than validator-key compromise or message-verification bypass. No single T10.003-primary incident has reached the headline scale of Ronin or Wormhole through the v0.1 cutoff; the class is documented at the cohort / contributing-factor level.
**OAK Techniques observed:** **OAK-T10.003** (Cross-Chain Replay — the shared-validator-set sub-pattern: when a bridge operator deploys multiple bridge instances across different chain pairs and those instances share the same validator signing keys without per-instance message binding, a validly-signed message for instance A can be replayed against instance B, where the validator signatures are recognised as valid but the message was never intended for that instance). The surface emerges from the operator-side design choice to share validator infrastructure across instances — operationally convenient but structurally risky when per-instance message binding is omitted.
**Attribution:** **unattributed** — structural / design-level. The cross-chain replay surface is an architectural property of multi-instance bridge deployments rather than a per-incident attack. No specific attacker attribution is relevant at the cohort level.

**Key teaching point:** **Shared validator sets without per-instance message binding convert a valid signature on one bridge instance into a valid signature on all instances.** When a bridge operator deploys multiple instances (e.g., Ethereum–Polygon, Ethereum–Arbitrum, Ethereum–BNB Chain) that share the same validator signing keys, a signed message — a withdrawal authorisation, a token-mint instruction, a governance parameter update — is valid on every instance unless the message payload includes instance-specific binding (chain ID + instance contract address + per-instance nonce). Without that binding, a message signed for the Ethereum–Polygon instance can be replayed against the Ethereum–Arbitrum instance, where the same validator set will recognise the signature as valid and execute the instruction.

## Summary

Multi-chain bridge operators commonly deploy multiple bridge instances — one per supported chain pair — to provide cross-chain asset transfer coverage across their supported-chain set. When those instances share validator signing keys (a common operational choice, as maintaining separate validator sets per instance is operationally costly), the security of each instance depends on the message-format binding that prevents a message signed for one instance from being replayed against another.

The canonical T10.003 cross-chain replay surface arises when the message format lacks one or more of the three binding fields:

1. **Chain ID binding** — the message does not include the source or destination chain ID, allowing a message generated on chain A to be replayed on chain B (same chain-ID families, post-fork chains with identical chain IDs, or chains where the bridge contract does not validate the source-chain ID).
2. **Instance address binding** — the message does not include the deployed bridge contract address for the specific instance, allowing a message signed for instance X (Ethereum–Polygon) to be replayed against instance Y (Ethereum–Arbitrum) if both instances share the same validator set.
3. **Per-instance nonce** — the message includes a nonce but the nonce sequence is not per-instance, allowing a validly-nonced message on instance X to be replayed as a validly-nonced message on instance Y.

The detection surface is pre-deployment (audit the message format for the three binding fields before the bridge instance goes live) rather than runtime (cross-instance replay is difficult to detect in real time without per-instance message monitoring). The mitigation surface is correspondingly pre-deployment: include chain ID, instance contract address, and a per-instance nonce in every signed cross-chain message.

Through the OAK v0.1 cutoff, no single T10.003-primary incident had reached the headline dollar-loss scale of Ronin (T10.001, validator-key compromise) or Wormhole (T10.002, message-verification bypass). The class is documented at the contributing-factor and architectural-review layer — cross-chain replay has been identified as a contributing factor in smaller bridge incidents and is a standard audit-firm checklist item, but has not (yet) been the sole root cause of a flagship bridge loss.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021–2022 | Multi-chain bridge deployments proliferate; multiple operators deploy shared-validator-set instances across chain pairs | T10.003 (surface creation) |
| 2022–2024 | Audit firms and bridge-security researchers identify per-instance message binding as a standard checklist item; bridge documentation increasingly includes instance-binding in message-format specifications | T10.003 (surface identified) |
| 2022-09 | Ethereum PoW fork replay surface (chain-ID-level replay between Ethereum mainnet and ETHPoW) — see companion example | T10.003 (chain-ID replay anchor) |
| Continuing | No single T10.003-primary incident has reached headline scale through v0.1; the class is documented at the cohort / contributing-factor / audit-checklist level | T10.003 (contributing-factor class) |

## What defenders observed

- **The shared-validator-set design pattern is the structural enabler.** When a single validator set signs messages for multiple bridge instances, the security of every instance is only as strong as the weakest message-format binding across the instance set. A defender auditing a bridge deployment should check: does the operator deploy multiple instances? Do those instances share validator keys? If both answers are yes, the per-instance message binding is the load-bearing security control.
- **Per-instance message binding is cheap but frequently omitted.** The three binding fields (chain ID, instance contract address, per-instance nonce) add negligible gas cost and minimal implementation complexity. Their omission is typically a design oversight rather than a deliberate trade — the developer designs the message format for a single-instance deployment, and the multi-instance expansion happens later without revisiting the message format. Defenders should treat the multi-instance expansion as a trigger for a mandatory message-format review.
- **T10.003 is a contributing-factor class, not a primary-exploit class, at the public-record maturity level of v0.1.** The public record of bridge incidents concentrates at T10.001 (validator-key compromise) and T10.002 (message-verification bypass) at the headline-loss scale. T10.003 appears as a contributing factor in smaller incidents and is well-recognised in audit-firm literature, but the absence of a headline-scale T10.003-primary incident may reflect the relative ease of the mitigation (add three fields to the message format) rather than the insignificance of the surface.

## What this example tells contributors writing future Technique pages

- **The shared-validator-set sub-pattern is the dominant T10.003 surface at the bridge layer.** Contributors auditing a multi-instance bridge deployment should treat shared validator keys + multi-instance deployment as the trigger for a mandatory T10.003 review, checking for chain ID, instance address, and per-instance nonce in every signed message format.
- **The pre-deployment audit surface is the load-bearing T10.003 detection layer.** Runtime detection of cross-instance replay requires per-instance message monitoring that is rarely deployed outside the bridge operator's own infrastructure. The practical T10.003 detection is at the pre-deployment audit layer — review the message format before the instance goes live — not at the runtime alerting layer.

## Public references

- `[bridgeaudit2023]` *(proposed)* — Audit-firm bridge-security checklist including per-instance message-binding requirements.
- `[layerzero2023governancerelay]` *(proposed)* — LayerZero governance-relay documentation including message-format binding specification.
- `[eip155]` — EIP-155 chain-ID specification; the canonical chain-ID binding primitive that, when included in cross-chain messages, defeats chain-ID-level replay.

## Discussion

Cross-chain bridge signature replay across shared-validator-set instances is the dominant T10.003 sub-pattern at the bridge layer. The structural observation — shared validator sets without per-instance message binding convert a valid signature on one instance into a valid signature on all instances — applies to any multi-instance bridge deployment and is a standard audit-firm checklist item.

The case is the fourth T10.003 worked example (alongside the general cross-chain-replay cohort, the Ethereum PoW fork replay case, and the broader bridge-replay-cohort entry) and is documented at the architectural-review / contributing-factor layer rather than at the named-exploit layer. The absence of a headline-scale T10.003-primary incident through v0.1 may reflect the relative ease of the mitigation rather than the insignificance of the surface; contributors writing future T10.003 examples should monitor the public record for a flagship T10.003-primary incident and should document the contributing-factor role of insufficient message binding in any future bridge-loss post-mortems.
