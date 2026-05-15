# LayerZero OFT governance relay misconfiguration audit-finding cohort — cross-chain — 2023–2024

**Loss:** approximately \$0 realised at the named-exploit level as of v0.1; the class is documented at the architectural-review and audit-finding layer. Multiple protocols deploying cross-chain governance via LayerZero's Omnichain Fungible Token (OFT) standard and related governance-relay patterns were found to have misconfigured target-chain executor contracts during security audits by Trail of Bits, OpenZeppelin, Spearbit, and other audit firms.
**OAK Techniques observed:** **OAK-T10.006** (Cross-Chain Governance Relay Attack — primary; the audit findings identified missing or misconfigured governance-relay message-verification parameters on the target-chain executor contracts, including: insufficient source-chain governance contract address verification, missing nonce/replay protection on governance messages, lack of source-chain finality gating before target-chain execution, and overly permissive relayer authorisation permitting delivery by unauthorised relayers).
**Attribution:** **unattributed** — no named attacker; the findings were identified and remediated at the pre-deployment audit layer. Attribution is to the audit firms that characterised the class (Trail of Bits, OpenZeppelin, Spearbit) and the protocols that remediated findings pre-exploitation.
**Key teaching point:** **The LayerZero OFT governance-relay audit-finding cohort demonstrates that cross-chain governance-relay misconfigurations are a recurring, well-characterised, and catchable class — the technique is real, repeatedly identified in audits, and the remediation surface is defined, even though the public named-exploit record at extraction scale is sparse.** The cohort serves as the calibration anchor for operationalising T10.006 detection at the pre-deployment audit layer rather than at the post-exploitation forensic layer.

## Summary

LayerZero's Omnichain Fungible Token (OFT) standard enables protocols to deploy fungible tokens natively across multiple chains with a unified supply-and-burn/mint model. The OFT standard and LayerZero's broader messaging infrastructure also support cross-chain governance patterns: a governance action (parameter change, upgrade, treasury transfer) approved by the protocol's governance contract on the source chain is relayed via LayerZero's message-passing infrastructure to a target-chain executor contract, which executes the governance action on the target chain.

The security of this governance-relay architecture depends on the target-chain executor contract correctly verifying that the governance message was emitted by the legitimate source-chain governance contract, was not replayed, was finalised on the source chain, and was delivered by an authorised relayer. During 2023–2024 security audits of multiple protocols deploying cross-chain governance via LayerZero OFT, audit firms identified a recurring set of misconfigurations in the target-chain executor contracts:

1. **Insufficient source-chain governor address verification.** The executor accepted governance messages from a broader set of source-chain addresses than intended, or lacked explicit verification that the message's `_srcAddress` matched the protocol's canonical governance contract on the source chain.

2. **Missing nonce/replay protection.** The governance-message format did not include a nonce or proposal-ID field, permitting replay of a valid governance message across multiple executions on the target chain (or across multiple target chains in a multi-chain deployment).

3. **Lack of source-chain finality gating.** The executor accepted governance messages from source-chain blocks that had not yet reached finality, opening a reorg-based injection window where a governance message in a source-chain block that is later reorged out could have triggered a target-chain execution that should not have been authorised.

4. **Overly permissive relayer authorisation.** The executor's relayer-permission model permitted delivery of governance messages by relayer addresses not explicitly gated to the protocol's designated LayerZero relayer configuration, allowing an unauthorised relayer to deliver a validly signed but maliciously parameterised governance message.

These misconfigurations were identified and remediated at the pre-deployment audit layer — none are known to have been exploited at extraction scale. The cohort is significant for T10.006 because it establishes the technique's recurrence pattern: the same four verification gaps (source-address check, nonce/replay protection, finality-gating, relayer authorisation) surface across independently-deployed protocol instances, suggesting the default LayerZero OFT governance-relay configuration is permissive and requires protocol-specific hardening at the audit layer.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023–2024 | Multiple protocols deploy cross-chain governance via LayerZero OFT; target-chain executor contracts configured with default or permissive verification parameters | T10.006 surface (latent — permissive default configuration) |
| 2023–2024 | Security audits by Trail of Bits, OpenZeppelin, Spearbit, and other firms identify governance-relay misconfigurations across multiple protocol deployments | **T10.006** (audit finding — source-address, nonce/replay, finality-gating, and relayer-authorisation gaps) |
| 2023–2024 | Protocols remediate findings pre-deployment; verification parameters hardened (source-address pinned, nonce fields added, finality-gating configured, relayer set restricted) | (operator-side mitigation — pre-deployment audit-and-remediate cycle) |
| 2023–2025 | Audit-firm advisories published characterising the cross-chain governance-relay misconfiguration class as a distinct audit surface | (class characterisation — Trail of Bits, OpenZeppelin, Spearbit advisories) |
| 2025 onward | LayerZero documentation and SDK improved to flag the four verification-gap dimensions (source-address, nonce, finality, relayer) as required configuration checks for governance-relay deployments | (infrastructure-side mitigation — SDK guardrails) |

## Realised extraction

\$0 at the named-exploit level as of v0.1 — all findings were identified and remediated at the pre-deployment audit layer.

## OAK technique classification rationale

T10.006 (Cross-Chain Governance Relay Attack) is the sole classification because the audit findings target the governance-relay message-verification surface specifically — the four verification-gap dimensions (source-chain governor address check, nonce/replay protection, source-chain finality gating, relayer authorisation) are the defining T10.006 surface. The findings do not classify under T10.002 (general bridge message-verification bypass) because the relayed message type is specifically a governance action, and the blast radius of a successful exploit would be governance-parameter control (upgrade-authority, fee-recipient, treasury-management, token-minting capabilities) rather than a bridge asset-pool drain.

## Public references

- LayerZero OFT standard documentation (cross-chain governance-relay architecture, message-format specification, executor-contract configuration)
- Trail of Bits audit-firm advisories (cross-chain governance-relay misconfiguration class)
- OpenZeppelin audit-firm advisories (governance-relay verification-parameter hardening)
- Spearbit audit-firm advisories (target-chain executor permission-model review)
- See `examples/2024-07-compound-cross-chain-governance-relay.md` for the Compound governance relay misconfiguration — the Compound-specific T10.006 audit-finding case — and the broader cross-chain governance-relay surface as characterised by audit-firm literature (2023–2025)
