# Ethereum Beacon Chain finality loss event — Ethereum — 2023-05-11 to 2023-05-12

**Loss:** no direct financial extraction. The Beacon Chain experienced a temporary loss of finality across two epochs (#200,750 and #200,751, spanning approximately 25 minutes on 2023-05-11, with a second shorter finality-loss period on 2023-05-12). During the non-finality window, the chain continued to propose blocks and accumulate attestations but could not finalise epochs — transactions were included in blocks but were not economically final. No double-spend, MEV extraction, or validator-slashing event occurred. The primary impact was operational: all Ethereum validators experienced reduced attestation rewards during the non-finality period, and the event demonstrated that a consensus-client bug — not a slashing condition or an adversarial attack — was capable of inducing a cross-client finality stall in a live, economically-secured PoS network at the Ethereum mainnet scale.

**OAK Techniques observed:** **OAK-T14.003** (Restaking / Shared-Security Cascading Risk — broadly construed as consensus-layer liveness-failure surface; the event was produced by a consensus-client attestation-processing bug that caused a supermajority of validators on the Prysm and Teku clients to fail to process attestations from the Lighthouse client, leading to a drop in attestation participation below the two-thirds finality threshold). The event was not a restaking incident in the narrow sense (no AVS, no restaked ETH was involved), but it exercises the same consensus-layer liveness-failure sub-surface that T14.003 captures: a bug in a supermajority client's attestation-processing logic was sufficient to cause a chain-wide liveness failure even though no individual validator double-signed, no slashing condition was triggered, and no adversarial manipulation of the consensus protocol occurred. The incident is the T14.003 anchor for the **consensus-client-bug-induced liveness failure** sub-pattern: finality stalls produced by attestation-processing divergence between supermajority and minority consensus clients, distinct from the T14.001 slashing-condition surface and the T14.002 MEV-Boost relay-attack surface.

**Attribution:** **unattributed** The finality loss was caused by a bug in the Prysm and Teku consensus clients' attestation-processing logic, not by an attacker. The Ethereum Foundation, client teams, and community researchers published detailed post-mortems. No adversarial attribution applies; the incident is a protocol-layer operational event.

**Key teaching point:** **A consensus-client attestation-processing bug in a supermajority client is a chain-liveness threat surface that is structurally distinct from the slashing-condition surface (T14.001) and the MEV-Boost relay-attack surface (T14.002).** The May 2023 finality loss occupied a third category of PoS validator/staking risk: the consensus protocol functioned correctly given the inputs it received, but the supermajority clients' attestation-processing logic prevented those clients from receiving and processing a sufficient volume of valid attestations to reach the two-thirds finality threshold. The structural lesson is that PoS finality depends on **client-diversity attestation-propagation compatibility**, not just on honest-majority assumptions or slashing-condition enforcement. A supermajority client that diverges from the minority client in attestation-processing behaviour can cause a chain-wide liveness failure even when every validator is operating honestly and no slashing condition has been triggered.

## Summary

The Ethereum Beacon Chain experienced two periods of finality loss in May 2023. The first and more severe period occurred on 2023-05-11 across epochs 200,750 and 200,751, lasting approximately 25 minutes. During this period, the chain continued to propose blocks and accumulate attestations, but the attestation participation rate fell below the two-thirds supermajority threshold required for finality. A second, shorter finality-loss period occurred on 2023-05-12, lasting approximately 8 minutes.

The root cause was a consensus-client attestation-processing bug. A post-mortem by the Ethereum Foundation and client teams identified that Prysm and Teku — which together represented a supermajority of the validator set — were failing to process attestations from the Lighthouse consensus client under specific timing conditions. The bug was in the attestation-packing and gossip-validation logic: Prysm and Teku rejected Lighthouse-produced attestations that were packed in a format that the Prysm/Teku implementations incorrectly treated as invalid. Because Prysm+Teku were the supermajority, the attestations they rejected were not counted toward the two-thirds finality threshold, even though those attestations were valid under the Ethereum consensus specification. The minority clients (Lighthouse, Lodestar, Nimbus) processed all attestations correctly, but their combined attestation weight was insufficient to reach finality without participation from the supermajority clients.

The incident was resolved without a hard fork or protocol-level intervention. Client teams identified the bug, patched their attestation-processing logic, and released updated client versions within hours. Validators that upgraded to the patched versions resumed normal attestation processing, and finality was restored. No validators were slashed, no transactions were reversed, and no on-chain funds were lost.

The incident is the most significant Ethereum consensus-layer liveness event through 2025 and is the canonical T14.003 anchor for the consensus-client-bug-induced liveness-failure sub-pattern. It demonstrates that the client-diversity property of a PoS network is not only a defence against single-client slashing bugs (the conventional client-diversity argument) but also a defence against single-client attestation-processing divergence causing chain-wide liveness failure — and that the latter defence is only effective if no client (or client family) holds a supermajority of validators.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| Pre-2023-05-11 | Prysm and Teku hold supermajority of Ethereum validators; attestation-processing bug exists in both clients' gossip-validation logic | (standing T14.003 pre-condition — supermajority client concentration) |
| 2023-05-11 ~16:15 UTC | Beacon Chain fails to finalise epoch 200,750; attestation participation drops below two-thirds threshold | **T14.003 liveness failure** |
| 2023-05-11 ~16:15–16:40 UTC | Chain continues to propose blocks but cannot finalise; epochs 200,750 and 200,751 pass without finality (approx. 25 min) | (non-finality window) |
| 2023-05-11 ~16:40 UTC | Finality restored as attestation-participation recovers (attestation-gossip backlog clears) | (recovery) |
| 2023-05-12 ~13:00 UTC | Second finality-loss period; shorter duration (~8 min); same root cause | (repeat occurrence) |
| 2023-05-12–13 | Client teams identify the attestation-processing bug in Prysm/Teku; patches developed and released | (incident response) |
| 2023-05-13 onward | Patched client versions deployed; finality restored and stable; Ethereum Foundation publishes post-mortem | (remediation) |
| 2023-05 to 2023-06 | Community discussion of client-diversity imperative; increased attention to minority-client usage and supermajority-bug risk | (community hardening) |

## What defenders observed

- **Finality-stall was visible at the protocol level in real time.** The Beacon Chain's finality-checkpoint progression — which is a publicly observable metric — flatlined for two epochs. Any observer running a Beacon Chain node (or using a block explorer that surfaces finality-checkpoint data) could observe the stall. The defender-observable signal is that a flatlining finality checkpoint while blocks continue to be proposed is a consensus-layer liveness-failure indicator, not a network-partition indicator (which would also stop block production).
- **Client-diversity was the mitigation that was present but insufficient.** Ethereum had four interoperating consensus clients (Prysm, Teku, Lighthouse, Nimbus; Lodestar was also in development), and their diversity ensured that the bug did not produce a chain split — all clients continued to agree on the canonical chain head. But diversity alone did not prevent the liveness failure because two clients (Prysm+Teku) held a supermajority. The defender lesson is that client-diversity for safety (no chain split) and client-diversity for liveness (no single client or client family can block finality) are different targets, and the latter requires that no client holds a supermajority, not merely that multiple clients exist.
- **No slashing condition triggered — the consensus protocol functioned correctly.** The validators that failed to process Lighthouse attestations were not slashed; they simply missed attestation rewards. The attestations that were rejected by Prysm/Teku were valid under the specification; the bug was that Prysm/Teku incorrectly rejected them. This distinguishes the event from T14.001 (slashing-condition exploit, where a validator enters a slashable state) and from T14.002 (MEV-Boost relay attack, where the relay withholds or manipulates blocks). The T14.003 surface — consensus-client implementation divergence causing liveness failure — is a third, structurally distinct risk category.
- **Recovery was automatic once the attestation backlog cleared.** No protocol-level intervention (hard fork, state rollback, or manual inclusion of a finality-checkpoint vote) was required. The finality loss resolved when the attestation-gossip backlog cleared naturally as validators rebroadcast pending attestations and the two-thirds threshold was met. This is a positive operational property of the Gasper finality protocol: temporary liveness failures self-resolve once the condition causing the participation deficit is removed, without requiring an out-of-band recovery procedure.

## What this example tells contributors writing future Technique pages

- **T14.003 (Restaking / Shared-Security Cascading Risk) captures a consensus-layer liveness-failure surface that is broader than the literal "restaking AVS slashing" case.** The May 2023 finality loss is not a restaking incident — no AVS, no EigenLayer, no restaked ETH — but it exercises the same underlying consensus-layer property that the T14.003 sub-surface is about: a failure mode that propagates through the consensus protocol's participation and finality mechanics without requiring a slashing condition to trigger. Future T14.003 page expansions should include both the restaking-specific cascading-risk cases (AVS slashing propagation through restaked ETH) and the consensus-client-bug-induced liveness-failure cases (like this one), because both exercise the same structural property of the consensus protocol.
- **Client-diversity as a mitigation has a liveness dimension and a safety dimension.** The conventional framing of Ethereum client diversity is safety-focused: if one client has a bug that produces an invalid block, validators running other clients will reject it, preventing a chain split. The May 2023 event demonstrated the liveness dimension: if a supermajority of validators run clients that share a bug, those clients can collectively fail to process valid messages from the minority, causing a finality stall even though no invalid block was produced and no slashing condition triggered. Both dimensions should be surfaced in the T14 mitigation taxonomy.

## Public references

- Ethereum Foundation. *"May 2023 Finality Loss Post-Mortem."* 2023-05 — the canonical post-mortem documenting the attestation-processing bug and the client-diversity root cause — `[efinalityloss2023]`.
- Prysmatic Labs. *"Post-Mortem: May 2023 Finality Issues."* 2023-05 — Prysm client team post-mortem of the attestation-rejection bug — `[prysmfinality2023]`.
- CoinDesk. *"Ethereum Suffers Two Finality Issues in 24 Hours."* 2023-05 — contemporaneous reporting on the finality-loss event — `[coindeskfinality2023]`.
- The Block. *"Ethereum's Finality Issues: What Happened and What's Next."* 2023-05 — contemporaneous analysis of the client-diversity implications — `[theblockfinality2023]`.
- Cross-reference: T14.001 slashing-condition examples at `examples/2023-03-rocket-pool-validator-slashing.md` (operator-procedural-error slashing) and the T14.002 MEV-Boost relay examples; the May 2023 finality loss is structurally distinct from both.

### Proposed new BibTeX entries

```bibtex
@misc{efinalityloss2023,
  author = {{Ethereum Foundation}},
  title = {May 2023 Finality Loss Post-Mortem},
  year = {2023},
  month = may,
  note = {Canonical post-mortem documenting the attestation-processing bug and client-diversity implications.},
}

@misc{prysmfinality2023,
  author = {{Prysmatic Labs}},
  title = {Post-Mortem: May 2023 Finality Issues — Prysm Client},
  year = {2023},
  month = may,
  note = {Prysm client-team post-mortem of the attestation-rejection bug.},
}
```
