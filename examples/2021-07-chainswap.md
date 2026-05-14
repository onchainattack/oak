# ChainSwap bridge token-deployment exploit — multi-chain (Ethereum, BSC, Polygon) — 2021-07-02 and 2021-07-11

**Loss:** approximately $8M cumulative across two separate exploit events on July 2 and July 11, 2021. The July 2 exploit extracted ~$800K; the July 11 exploit extracted the larger balance across Ethereum, BSC, and Polygon deployments. Aggregate loss from both events is ~$8M per the industry-forensic consensus (SlowMist, Peckshield, CertiK triangulation).
**OAK Techniques observed:** **OAK-T10.002** (Message Verification Bypass — the attacker exploited a flaw in ChainSwap's cross-chain token-deployment verification logic, allowing the deployment of a malicious token contract that the bridge's destination-chain verification accepted as a legitimate bridged token; the forged cross-chain message authorised the minting of wrapped assets under attacker control). **OAK-T7.001** (Mixer-Routed Hop — proceeds from the July 11 exploit were partially routed through Tornado Cash). **OAK-T9.004** (Access-Control Misconfiguration — at the bridge-contract layer: the token-deployment authorisation logic on the destination chain did not adequately verify the provenance of the deployment message against the canonical source-chain token registry).
**Attribution:** **pseudonymous-unattributed** — no named-individual attribution; no public G01 / state-actor attribution. The attacker's funding cluster was traced through Tornado Cash; the on-chain trail terminates at the mixer boundary.
**Key teaching point:** **Cross-chain token-deployment authorisation is a first-class bridge security surface.** ChainSwap's token-deployment path allowed an attacker to deploy a token contract on the destination chain that the bridge subsequently treated as the canonical representation of a bridged asset. The structural failure was the absence of a registry-level check mapping source-chain tokens to their verified destination-chain counterparts — a control that post-ChainSwap bridges (Wormhole, LayerZero, Across) now implement as a standard deployment precondition.

## Summary

ChainSwap was a cross-chain bridge protocol supporting token transfers between Ethereum, BSC, Polygon, and other EVM chains. In July 2021, the protocol suffered two exploits in close succession:

1. **July 2, 2021:** An attacker exploited a vulnerability in the bridge's token-deployment verification to deploy malicious tokens on destination chains, extracting approximately $800K. ChainSwap paused the bridge, patched the immediate flaw, and resumed operations.

2. **July 11, 2021:** A second attacker (or the same operator under a different funding cluster) exploited a related flaw in the patched deployment-verification logic. This second exploit extracted approximately $7.2M across Ethereum, BSC, and Polygon deployments, bringing the cumulative loss to ~$8M.

The load-bearing structural flaw was the bridge's cross-chain token-deployment authorisation: the destination-chain contract accepted a cross-chain message claiming "deploy token X on chain Y" and deployed the token without verifying that the source-chain message originated from a canonical, registry-gated token address. The attacker was able to craft a message that the bridge's verification logic accepted as authorising a malicious deployment, minting wrapped assets under attacker control.

ChainSwap subsequently engaged a third-party auditor for a full protocol review and implemented a token-registry-level verification gate before resuming operations. The incident is the canonical 2021 worked example for the **cross-chain token-deployment authorisation** sub-pattern within T10.002, structurally distinct from the Poly Network (August 2021, message-verification logic error) and Thorchain (July 2021, validator-signer-key compromise) T10.002 sub-classes.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-July 2021 | ChainSwap operates cross-chain bridge with token-deployment path lacking canonical-token-registry verification | T10.002 surface (latent) |
| 2021-07-02 | First exploit: attacker exploits deployment-verification flaw; ~$800K extracted | T10.002 + T9.004 |
| 2021-07-02 | ChainSwap pauses bridge; deploys patch | (operator response) |
| 2021-07-11 | Second exploit: attacker exploits related flaw in patched logic; ~$7.2M extracted across ETH/BSC/Polygon | T10.002 + T9.004 (second event) |
| 2021-07-11 onward | Proceeds partially routed through Tornado Cash | T7.001 |
| Post-July 2021 | ChainSwap commissions full audit; token-registry verification gate implemented; bridge resumes operation | (remediation) |

## What defenders observed

- **Cross-chain token-deployment authorisation is a first-class verification surface.** The bridge's destination-chain contract accepted a cross-chain message as authority to deploy a token; the message's provenance was not gated by a canonical-token-registry check. Post-ChainSwap bridges implement registry-level verification as a standard deployment precondition.
- **Patch-and-re-exploit within 9 days indicates the root-cause was under-specified.** The July 2 patch closed the specific exploit path without addressing the broader deployment-authorisation architecture; the July 11 exploit found a related path through the patched logic. Defenders auditing bridge protocols should verify that post-incident patches address the root-cause class, not just the demonstrated exploit instance.

## What this example tells contributors writing future Technique pages

- **ChainSwap is the canonical 2021 T10.002 worked example for the cross-chain token-deployment authorisation sub-pattern.** Structurally distinct from Poly Network (message-verification bypass in the relay-contract logic) and Thorchain (validator-signer-key compromise). Future T10.002 contributions should preserve the sub-pattern distinction.
- **The two-event structure is a defender-side signal for root-cause completeness.** Patch-and-re-exploit within a short window indicates the root-cause class was not fully addressed in the first patch cycle. Contributors writing bridge-incident examples should record whether the incident involved a single or multiple exploit events.

## Public references

- `[slowmistchainswap2021]` — SlowMist forensic analysis of the July 2021 ChainSwap exploits.
- `[peckshieldchainswap2021]` — Peckshield on-chain trace of the July 11 exploit.
- `[certikchainswap2021]` — CertiK post-incident analysis of the token-deployment verification flaw.
- `[cointelegraphchainswap2021]` — Cointelegraph coverage of the ~$8M cumulative loss.

## Discussion

ChainSwap July 2021 is the canonical 2021 T10.002 worked example for the cross-chain token-deployment authorisation sub-pattern. It structurally complements Poly Network August 2021 (message-verification bypass in relay-contract logic) and Thorchain July 2021 (validator-signer-key compromise) as the third canonical T10 2021 sub-class anchor. The three together span T10.001 (signer-key), T10.002 message-bypass (Poly), and T10.002 deployment-authorisation (ChainSwap) sub-patterns and close the T10 2021 near-threshold coverage gap at v0.1.

The case is included at the "valid but not exhaustively elaborated" level of detail consistent with the v0.1 standard for long-tail bridge incidents where the technical root-cause is well-documented across multiple industry forensic providers but the operator attribution is pseudonymous.
