# Cross-chain replay vulnerability cohort — multi-chain — 2022–2025 (cohort)

**Loss:** no single canonical dollar-extraction anchor at v0.1. Cross-chain replay is primarily documented as a **contributing factor** in bridge-security literature and as a **near-miss / architecture-review finding** rather than as the primary failure mode in headline bridge incidents. The largest public bridge incidents (Ronin, Wormhole, Nomad, BNB Bridge, Harmony Horizon) had key-compromise (T10.001) or message-verification-bypass (T10.002) as their primary failure mode. Cross-chain replay has appeared as a contributing factor in smaller-scale bridge incidents and as a documented near-miss in operator post-mortems where replay was identified and patched before exploitation. The case is structured as a **cohort-level architecture-review example** (parallel to the T10.004 optimistic-bridge fraud-proof gap cohort example) because the public-record evidence base for T10.003 is at the architecture-review and academic-literature layer rather than at the dollar-extraction-event layer.

**OAK Techniques observed:** **OAK-T10.003** (Cross-Chain Replay — primary; a valid authorisation message generated on one chain or for one bridge instance is replayable on a different chain or against a different bridge instance because the message lacks sufficient binding — chain ID, instance address, per-instance nonce — to prevent reuse outside its intended scope). **OAK-T10.002** (Message Verification Bypass — structurally adjacent when the replay succeeds because the verifying contract accepts a message whose scope-binding fields were not validated against the verifying chain's context).

**Attribution:** **unattributed (architecture-review / near-miss class — no single threat-actor cluster applies).** Cross-chain replay is a bridge-architecture vulnerability class, not an operator-attribution class. Individual smaller-scale replay incidents are pseudonymous and not centrally catalogued; the class is characterised in academic bridge-security literature and in audit-firm bridge-architecture reviews.

**Key teaching point:** **Every signed cross-chain message must include chain ID, instance address, and per-instance nonce — and every verifying contract must validate all three fields.** A message that is structurally valid on chain A should be structurally invalid on chain B by construction. The canonical mitigation — full message-scope binding — is a one-time architecture decision at bridge-design time; retrofitting it post-deployment is difficult because the message format is typically baked into the bridge's signing scheme and changing it requires a migration of all in-flight messages.

## Summary

Cross-chain bridge protocols typically rely on signed messages to authorise asset transfers between chains. A message is generated on chain A (e.g., "lock 100 USDC in the bridge contract on Ethereum"), signed by an authorised party (validator set, relayer, oracle), and submitted on chain B (e.g., "release 100 USDC from the bridge contract on BSC"). The attack surface is the scope of the message: if the message's signed payload does not include sufficient binding to its intended scope (which chain, which bridge instance, which nonce), a message that is valid in one context can be replayed in a different context where it should not be accepted.

The canonical message-scope fields that prevent replay:

- **Chain ID** (EIP-155 chain identifier): binds the message to a specific chain. A message signed for Ethereum (chain ID 1) should be rejected on BSC (chain ID 56) because the chain ID in the signed payload does not match the verifying chain's chain ID.
- **Instance address** (the deployed bridge contract address on the destination chain): binds the message to a specific bridge instance. Two bridge instances in the same operator family that share signing keys but have different deployed contract addresses should accept only messages whose instance-address field matches their own address.
- **Per-instance nonce** (a monotonically increasing counter scoped to the bridge instance): prevents replay of a message that is valid for the correct chain and instance — a nonce that has already been consumed should reject any subsequent message carrying the same nonce.

The absence of any one of these three fields creates a replay surface:

- **Missing chain ID:** a message signed for the Ethereum bridge can be replayed against the BSC bridge instance of the same operator family, provided the bridges share signing keys and accept structurally similar message formats.
- **Missing instance address:** two bridge instances on the same chain (e.g., an upgraded bridge contract deployed alongside the original) that share signing keys will both accept messages valid for either instance.
- **Missing nonce:** a valid message can be replayed against the *same* bridge instance on the *same* chain — the simplest replay case and the one most commonly caught in pre-deployment review.

Cross-chain replay is less commonly the *primary* failure mode in headline bridge incidents because the dominant bridge failure modes at scale are key compromise (T10.001) and message-verification bypass (T10.002). Replay is typically a contributing factor: an attacker who has already obtained a valid signed message (via key compromise or via observation of a legitimate user's message) amplifies the damage by replaying it across instances. The class is well-characterised in academic bridge-security literature (`[zhou2023sok]`) and in audit-firm bridge-specialist practice (Halborn, Trail of Bits bridge-architecture review methodology), and the mitigation is canonical and well-understood — full message-scope binding at bridge-design time.

## Timeline (cohort-scale)

| When | Event | OAK ref |
|---|---|---|
| 2020–2021 | First multi-chain bridge deployments; some early bridge designs lack full message-scope binding (chain ID, instance address, per-instance nonce) | (standing T10.003 surface) |
| 2022 | Academic bridge-security surveys characterise cross-chain replay as a recurring vulnerability class (`[zhou2023sok]`) | **T10.003 (class characterisation)** |
| 2022–2024 | Bridge-architecture review methodology matures; audit firms (Halborn, Trail of Bits) include message-scope-binding completeness as a standard review item | (defender-side methodology maturation) |
| 2022–2025 | Smaller-scale replay incidents documented in operator post-mortems and in forensic-provider write-ups; no headline-scale replay-only incident lands on the public record | (sub-threshold incidents) |
| 2024–2025 | Well-binding-by-default becomes the standard bridge-design pattern; new bridge deployments include chain ID + instance address + nonce in every signed message by default | (mitigation standardisation) |
| 2025 (v0.1 cutoff) | T10.003 documented as a completeness Technique for the Bridge Tactic; class is real, mitigation is canonical, but no clean extraction-scale anchor exists | (OAK characterisation) |

## What defenders observed

- **Message-scope binding completeness is a one-time architecture decision.** The three canonical fields (chain ID, instance address, per-instance nonce) must be included in the signed message payload at bridge-design time and validated by the verifying contract at every destination. Retro-fitting message-scope binding post-deployment is a protocol migration, not a parameter change — it requires all in-flight messages to be re-signed under the new scheme.
- **Shared signing keys across bridge instances amplify the replay surface.** Two bridge instances that share signing keys but do not include instance-address binding in their message formats are replay-vulnerable by construction. The mitigation is either per-instance signing keys (which eliminates key-sharing as a replay amplifier) or instance-address binding in the message payload (which makes messages scope-bound even when keys are shared).
- **The replay surface is detectable in pre-deployment review but not at runtime.** A bridge whose message format lacks chain ID, instance address, or nonce is replay-vulnerable before any attack occurs — the vulnerability is structural, not event-driven. Runtime detection of replay attacks is possible (monitor for messages whose nonce has already been consumed, or whose scope fields do not match the verifying chain/instance) but the higher-leverage mitigation is pre-deployment design review.

## What this example tells contributors writing future Technique pages

- **T10.003 is included as a completeness move for the Bridge Tactic.** A Bridge Tactic that covered only validator compromise (T10.001) and message-verification bypass (T10.002) would leave a structurally distinct attack class uncatalogued. The Technique is documented because the failure mode is real, the mitigation is canonical, and a defender or auditor reviewing a bridge specification needs to ask the relevant question regardless of whether a famous incident matches.
- **Well-binding-by-default is a v0.1 bridge-design standard, not a universal property of deployed bridges.** Bridges deployed before approximately 2023 may lack full message-scope binding. Defenders auditing older bridge deployments should verify the message-binding scheme explicitly rather than assume it.

## Public references

- `[zhou2023sok]` — academic taxonomy of DeFi / on-chain attack classes; classifies cross-chain replay as a recurring bridge-vulnerability class.
- Halborn. *Bridge-Security Architecture Review Methodology.* 2022 onward — audit-firm bridge-specialist practice; message-scope-binding completeness as a standard review item — `[halbornbridgesecurity]`.
- Trail of Bits. *Bridge-Security Audit Methodology.* 2022 onward — audit-firm bridge-specialist practice including cross-chain replay review — `[tobbridgesecurity]`.
- Cross-reference: T10.001 (Validator Signer Key Compromise) at `techniques/T10.001-validator-signer-key-compromise.md` — the dominant bridge failure mode at scale; T10.002 (Message Verification Bypass) at `techniques/T10.002-message-verification-bypass.md` — the second dominant bridge failure mode.

### Proposed new BibTeX entries

```bibtex
@misc{halbornbridgesecurity,
  author = {{Halborn}},
  title = {Bridge-Security Architecture Review Methodology},
  year = {2022},
  note = {Audit-firm bridge-specialist practice; message-scope-binding completeness as standard review item.},
}

@misc{tobbridgesecurity,
  author = {{Trail of Bits}},
  title = {Bridge-Security Audit Methodology — Cross-Chain Replay Review},
  year = {2022},
  note = {Audit-firm bridge-specialist practice including cross-chain replay vulnerability review.},
}
```
