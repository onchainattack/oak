# MEV-Boost Relay Operator Trust-Surface and MEV Theft Risk — Ethereum — 2022–2025

**Loss:** structural — no confirmed relay-operator MEV theft at dollar-extraction scale through v0.1. The loss is measured in the trust-surface magnitude: MEV-Boost relays process a large majority of Ethereum blocks post-Merge (no figure sourced here). A relay-software flaw was exploited by a malicious proposer on 2023-04-03 to take roughly \$20M (Flashbots) to \$25M+ (The Block) from sandwich/MEV bots. A relay-operator compromise or malicious-relay scenario could redirect MEV from searchers and builders at scale with no cryptographic enforcement preventing the theft — only reputation and economic incentive alignment.
**OAK Techniques observed:** **OAK-T14.002** (MEV-Boost Relay Censorship / Manipulation — the relay operator's trusted position in the block-production pipeline is the load-bearing T14.002 surface. The relay receives blinded blocks from builders, selects the highest-value block, and forwards it to the proposer — the relay operator could theoretically steal block contents, censor builders, or manipulate block selection for MEV extraction.) **OAK-T14.005** (Builder/Relay Collusion / Censorship for MEV Extraction — structurally adjacent; the relay-operator trust surface composes with the builder-trust surface; a colluding relay+builder pair could extract MEV from the proposer and the broader transaction-supply chain.)
**Attribution:** **unattributed** — trust-model vulnerability rather than attributed attack. Relay operators (Flashbots, bloXroute, Agnostic, Ultrasound, Eden, Aestus, Manifold, Titan) are known entities; no relay operator has publicly been accused of MEV theft (the 2023-04-03 theft was by a proposer exploiting relay software).

**Corrected 2026-10-11:** The April 2023 MEV-Boost incident was an exploited relay-software flaw (~\$20M–\$25M+ stolen), not an unexploited equivocation bug; the unsourced Flashbots-relay-sunset claim and the relay-share/flow figures were removed.

**Key teaching point:** **MEV-Boost relay operators occupy a structurally trusted position in the Ethereum block-production pipeline with no cryptographic enforcement preventing MEV theft.** The relay sees unblinded block contents after the proposer commits to a head but before the block is published; the relay could theoretically unbundle a builder's block, extract individual MEV transactions, and front-run them, or could fabricate a block that appears to be from a legitimate builder. The only enforcement against relay misbehaviour is reputation and the threat of the proposer-builder separation architecture being redesigned to remove the trusted relay — a social/economic enforcement surface, not a cryptographic one. Enshrined PBS (proposer-builder separation at the protocol layer) is the canonical long-term mitigation. The T14.002 relay-operator trust surface is open until enshrined PBS removes the relay from the trust model.

## Summary

MEV-Boost is the dominant block-production middleware for Ethereum post-Merge (September 2022). The architecture separates block *building* (performed by specialised builders who construct blocks to maximise MEV extraction) from block *proposing* (performed by validators who select a block and propose it to the network). Between the builder and the proposer sits the **relay**: a trusted intermediary that receives blocks from builders, validates them, selects the highest-value block according to the proposer's preferences, and forwards it to the proposer.

The relay operator trust surface arises from the relay's position in this pipeline:

1. **The relay sees block contents before the proposer.** MEV-Boost uses a blinded-block protocol: builders send blinded blocks (with the header visible but the body hidden) to the relay; the proposer selects a blinded header; the relay then reveals the body. At the moment the proposer commits to a header, the relay — which holds the unblinded body — has a timing advantage: it knows the block's contents before the block is published to the network.

2. **The relay could unbundle and front-run MEV transactions.** A malicious relay operator could receive a builder's block, identify the MEV-extracting transactions within it, construct a competing block with the same MEV extraction but with the profit directed to the relay, and forward the competing block to the proposer — or could front-run the block's MEV transactions on the network before the block is published.

3. **The relay could censor builders.** A relay operator could refuse to forward blocks from specific builders, reducing competition and enabling a favoured builder to capture a larger share of MEV. This censorship surface compounds with the builder-level censorship surface (OFAC compliance, sanctioned-address filtering) already documented in T14.005.

4. **The relay could fabricate blocks.** A relay could construct a block that masquerades as coming from a legitimate builder but contains relay-extracted MEV, exploiting the proposer's trust that the relay is faithfully representing builder-submitted blocks.

The enforcement against relay misbehaviour is purely social and economic:

- **Reputation:** Relay operators are known entities; a confirmed MEV-theft incident would destroy the relay's reputation and eliminate its builder and proposer traffic.
- **Economic incentive alignment:** Relay operators are incentivised to maintain trust because their business model depends on continued builder and proposer participation.
- **No cryptographic enforcement:** There is no zero-knowledge proof, TEE attestation, or protocol-level enforcement that prevents a relay from stealing MEV. The relay's trusted position is enforced only by the expectation of future honest behaviour.

The earlier text claimed Flashbots announced a sunset of its relay in 2023–2024; no such announcement was found and the claim was removed. Enshrined PBS would move the relay function into the Ethereum protocol itself, eliminating the trusted-third-party relay operator. As of v0.1, enshrined PBS remains in the research and specification phase.

Several relay-operator vulnerability disclosures and bounty reports have been published (2022–2025), including:

- **MEV-Boost relay exploit by a malicious proposer (2023-04-03):** Per Flashbots' post-mortem, a malicious proposer exploited a flaw in the open-source mev-boost-relay code: the relay revealed block contents once a proposer signed a header without verifying the header's validity, letting the proposer take about \$20M from sandwich bots (The Block reported \$25M+). The flaw affected most mev-boost relays and was patched; Flashbots changed the relay to publish the signed block before forwarding its contents. The incident shows the relay-proposer protocol contains trust assumptions exploitable when spec and implementation diverge. The earlier text's description of this as a non-exploited, responsibly disclosed bug by "low-carb-crusader" is unsupported.
- **Relay-operator bounty disclosures:** Individual relay operators have disclosed and patched vulnerabilities in their relay software; the responsible-disclosure pattern confirms that relay software is attack surface, even though the operators themselves are assumed honest.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-09 | Ethereum Merge; MEV-Boost becomes the dominant block-production middleware; relay operators (Flashbots, bloXroute, etc.) occupy trusted position in the pipeline | T14.002 (surface creation) |
| 2022-10–2023 | Multi-relay ecosystem develops; relay-operator trust surface documented in Ethereum research literature | T14.002 |
| 2023-04-03 | Malicious proposer exploits mev-boost-relay header-validation flaw; ~\$20M–\$25M+ taken from MEV bots; relay patched | T14.002 (relay-protocol surface) |
| 2024–2025 | Relay-operator security bounty disclosures; ongoing relay trust-model analysis in Ethereum R&D | T14.002 |
| Continuing | Enshrined PBS remains in research/specification phase through v0.1; relay trust surface persists | T14.002 (structurally open) |

## Public references

- Flashbots MEV-Boost specification and relay documentation (2022–2024)
- Ethereum Foundation enshrined PBS research (2023–2025)
- Ethereum R&D relay trust-model analysis and multi-relay ecosystem development
- See `techniques/T14.002-mev-boost-relay-attack.md` for Technique definition
- `[mevpm0403]` — Flashbots Collective, "Post mortem: April 3rd, 2023 mev-boost relay incident and related timing issue": <https://collective.flashbots.net/t/post-mortem-april-3rd-2023-mev-boost-relay-incident-and-related-timing-issue/1540>
- `[mevblock25m]` — The Block, "Ethereum MEV bots lose over \$25 million in sophisticated attack" (2023-04): <https://www.theblock.co/post/224482/ethereum-mev-bots-lose-over-25-million-in-sophisticated-attack>
- `[mevforklog]` — Forklog, "MEV bot operators lose \$25M in exploit" (2023-04): <https://forklog.com/en/mev-bot-operators-lose-25m-in-exploit/>

## Discussion

The MEV-Boost relay trust surface is the canonical illustration of T14.002's structural premise: **a trusted intermediary in the block-production pipeline whose honest behaviour is enforced only by reputation and economic incentive alignment, not by cryptographic primitive**. The relay sees unblinded block contents; the relay selects which block the proposer receives; the relay could theoretically steal MEV, censor builders, or fabricate blocks. The absence of dollar-extraction-scale relay-theft incidents through v0.1 reflects the economic incentive alignment (relay operators value their ongoing business more than a one-time MEV theft) rather than the absence of a trust surface.

The enshrined PBS mitigation — moving the relay function into the Ethereum protocol layer — would eliminate the trusted-third-party relay operator and replace it with protocol-enforced separation between builder, proposer, and the block-forwarding function. Until enshrined PBS is deployed, the relay-operator trust surface persists across the ~90%+ of Ethereum blocks that flow through MEV-Boost relays.

The case is structurally distinct from the MEV-Boost equivocation and builder-censorship cases already in the T14 corpus: equivocation (2023-mev-boost-equivocation.md) is a *protocol-client vulnerability* exploited by a *proposer*; builder censorship (2022-2025-tornado-cash-ofac-builder-censorship.md, 2025-01-mev-boost-relay-censorship.md) is a *relay-policy* decision. The relay-operator trust surface is the *standing trust-model vulnerability* that exists independently of any specific exploit or policy decision — it is the structural property that the relay's trusted position creates.
