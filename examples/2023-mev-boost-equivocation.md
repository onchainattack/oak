# MEV-Boost relay equivocation attack surface — Ethereum — 2023

**Loss:** **No realized extraction at scale from the equivocation surface at v0.1 cutoff.** The MEV-Boost relay equivocation attack surface was characterized by security researchers and the Flashbots team as a theoretical-to-operational threat class against the MEV-Boost relay infrastructure. Individual relay-equivocation incidents have been documented at the research-demonstration level; no relay-level equivocation event has produced a headline-grabbing extraction. The threat surface remains open as of v0.1.
**OAK Techniques observed:** **OAK-T14.002** (MEV-Boost Relay Attack) — canonical anchor. The relay-equivocation surface is the load-bearing T14.002 sub-pattern: a malicious proposer or relay operator exploits the proposer-relay trust boundary to extract value.
**Attribution:** **unattributed** — the attack surface is characterized in research literature but no specific attributed incident anchors the class at v0.1.

**Key teaching point:** MEV-Boost's proposer-builder separation architecture introduces a relay trust boundary that did not exist in the base Ethereum protocol. The relay sees the builder's block body before the proposer commits to a head, creating an equivocation surface: a malicious relay operator or proposer can unbundle the builder's MEV extraction and extract the same value independently.

## Summary

MEV-Boost is the dominant proposer-builder separation (PBS) architecture on Ethereum post-Merge. It introduces a relay layer between block builders (who construct MEV-optimized blocks) and block proposers (validators who propose blocks). The relay receives blocks from builders, withholds the block body, and sends the block header to the proposer for signing. After the proposer signs the header, the relay reveals the body and the proposer proposes the block.

The relay equivocation surface: the relay knows the builder's block contents (including MEV extraction transactions) before the proposer commits. A malicious relay could unbundle the builder's MEV and insert its own extraction, or collude with the proposer to do so. A malicious proposer could receive the header from the relay, sign it, but then propose a different block that extracts the same MEV without sharing with the builder — equivocating on the signed commitment.

The Flashbots team and independent security researchers characterized this surface in 2022–2023. Mitigations (relay reputation systems, proposer slashing for equivocation, builder-side relay selection diversity) have been discussed and partially deployed, but the surface is architectural — it arises from the trust model of the relay as a centralizing intermediary in the PBS pipeline.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-09 | Ethereum Merge activates proof-of-stake; MEV-Boost becomes the dominant PBS architecture | T14.002 (surface creation) |
| 2022-10/12 | Security researchers characterize the relay trust model and equivocation surface; Flashbots publishes relay spec and trust assumptions | T14.002 (characterization) |
| 2023 | Relay ecosystem diversifies (Flashbots, BloXroute, Eden, Ultrasound, others); proposer relay-selection and builder relay-selection strategies evolve | T14.002 (mitigation development) |
| 2023 | Research demonstrations of equivocation-class attacks published; no production-scale extraction event confirms the surface at scale | (research) |
| Continuing | The relay trust boundary remains an architectural T14.002 surface; relay reputation, proposer commitment enforcement, and builder relay-selection diversity are the load-bearing mitigations | (ongoing surface) |

## Public references

- Flashbots MEV-Boost specification: relay architecture, trust model, and proposer commitment protocol.
- Ethereum Foundation PBS research: proposer-builder separation trust assumptions and mitigation roadmap.
- MEV research literature: academic characterization of relay equivocation and proposer-relay trust boundaries (2022–2023 vintage).
