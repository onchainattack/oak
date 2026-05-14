# MEV-Boost Relay Bid Withholding and Builder Auction Gaming — Ethereum L1 — 2022–2025

**Loss:** structural / trust-surface — the MEV-Boost relay operator occupies a trusted position in the PBS pipeline with visibility into unblinded block contents and builder bids. A relay operator who withholds, delays, or reorders builder bids can extract MEV from the information asymmetry or sell the advantage to an allied builder. No confirmed extraction event with named-relay attribution at the time of writing, but the surface is characterised in MEV-Boost design documentation as a standing trust assumption: the relay is trusted not to exploit its bid-visibility position. The structural loss is the MEV that *could* be extracted through relay-level bid manipulation — bounded above by the per-slot MEV-boost payment to the proposer (which the relay sees before the proposer does) and the per-block builder-bid value (which the relay sees before other builders do).

**OAK Techniques observed:** **OAK-T14.002** (MEV-Boost Relay Attack — the relay's trusted position in the bid-auction pipeline is the T14.002 surface. Bid withholding, bid unbundling, and bid-timing manipulation are sub-classes of T14.002 that operate at the relay layer rather than at the builder layer). **OAK-T14.005** (Builder Censorship MEV Extraction — structurally adjacent; a relay that withholds a specific builder's bids effectively censors that builder from the auction, creating a relay-level censorship surface that compounds with builder-level T14.005 censorship.)

**Attribution:** **protocol-design** — the MEV-Boost relay architecture creates the surface; no named entity has been confirmed to have exploited it at the time of writing. The Flashbots relay (the dominant relay through 2023) and Ultra Sound Relay (the dominant relay post-Flashbots-relay-sunset in 2024) are the relevant relay operators whose trusted position constitutes the standing surface.

**Key teaching point:** **The MEV-Boost relay's bid-visibility position is a structural T14.002 surface: the relay sees every builder's bid, knows which bid will win before the proposer does, and can manipulate the auction outcome by withholding, delaying, or reordering bids.** Unlike the builder (T14.005), which decides what transactions to include, the relay sees the outcome of the builder competition and can intervene at the auction-resolution layer — a more leveraged intervention point. The structural lesson is that **PBS trust concentrates at the relay**: a single relay operator who controls the bid-auction pipeline for a material fraction of slots has the *capacity* to extract MEV from the auction itself, independent of any builder-level extraction. The mitigation is relay diversity — no single relay should control enough of the slot auction to make bid-manipulation profitable at scale — and ultimately protocol-level enshrined PBS that removes the relay trust assumption entirely.

## Summary

Under Ethereum's Proposer-Builder Separation (PBS) architecture as implemented through MEV-Boost, blocks are constructed by builders, delivered to proposers (validators) through relays, and signed by proposers. The relay sits between the builder and the proposer as a trusted intermediary: the builder submits a block bid (an execution payload header plus a bid value) to the relay; the relay selects the highest bid, presents the header to the proposer, and after the proposer signs, releases the full payload and distributes the block.

The relay occupies a uniquely privileged position in this pipeline:

1. **Bid visibility.** The relay sees every builder's bid — the block value, the transaction content (in unblinded form for the winning bid), and the builder's identity. The relay knows which builder is winning the auction before the proposer does.

2. **Bid-timing control.** The relay receives bids on a rolling basis during the slot and can choose when to close the auction and present the winning bid to the proposer. A relay that delays presenting the winning bid can give an allied builder additional time to outbid the current leader.

3. **Bid-withholding capacity.** The relay can selectively withhold a specific builder's bid from the auction — presenting the proposer with only a subset of the bids received — effectively censoring that builder from the slot.

4. **Unblinding foreknowledge.** For the winning bid, the relay receives the unblinded execution payload (the full transaction list) after the proposer signs. The relay could front-run the unblinded transactions before the block is broadcast, extracting MEV from the transaction content before the public mempool sees it.

The relay's trusted position is not cryptographically enforced — it is a social-contract trust assumption. The protocol relies on the relay operator to behave honestly: to select the highest bid, to present the bid to the proposer promptly, to not front-run the unblinded payload, and to not sell its bid-visibility advantage to an allied builder. A relay operator who violates any of these assumptions is executing a T14.002 attack.

The documented sub-classes of relay-level bid manipulation include:

- **Bid unbundling.** The relay receives a bundle from Builder A, decomposes the bundle into its constituent transactions, and forwards the individual transactions to Builder B (an allied builder), who reconstructs the MEV extraction at a lower bid, winning the auction. Builder A's bundle is "unbundled" and its MEV is extracted by Builder B with relay complicity.

- **Bid sniping.** The relay tips an allied builder to the current highest bid before the auction closes, allowing the allied builder to submit a marginally higher bid ("snipe") and win the slot.

- **Timing-game exploitation.** The relay delays closing the auction as long as possible (approaching the slot boundary) to maximise the time available for an allied builder to construct a winning bid, while other builders' bids are held in the relay's queue unactioned.

- **Payload front-running.** After the proposer signs the block header, the relay receives the unblinded payload and could execute front-running transactions against the payload's content before distributing the block to the P2P network.

The Flashbots relay sunset in 2023–2024 is contextually significant: Flashbots operated the dominant open-source MEV-Boost relay, and its decision to wind down the relay (partly driven by OFAC-compliance concerns and the broader relay-operator legal-risk surface) shifted market share to Ultra Sound Relay, Agnostic Relay, and BloXroute. The relay-market reconfiguration reshuffled but did not eliminate the T14.002 trust surface — every relay operator, regardless of which entity operates it, occupies the same structurally-privileged bid-visibility position.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020–2021 | MEV-Boost architecture designed; relay introduced as trusted intermediary between builder and proposer | T14.002 (design-level surface) |
| 2022-09 | Ethereum Merge; MEV-Boost becomes operational; Flashbots relay dominates with ~90%+ market share | T14.002 (operational surface) |
| 2022-08 to 2023 | OFAC sanctions on Tornado Cash; Flashbots relay censors sanctioned transactions; relay-trust surface gains regulatory dimension alongside the MEV dimension | T14.002 + T14.005 |
| 2023–2024 | Flashbots announces relay sunset; Ultra Sound Relay, Agnostic Relay, and BloXroute gain market share; relay-market diversification reduces but does not eliminate single-relay trust concentration | T14.002 (market reconfiguration) |
| 2024–2025 | MEV-Boost relay-operator trust surface remains a standing T14.002 risk; enshrined PBS (EIP-7732) proposed as protocol-layer mitigation | T14.002 (ongoing) |
| Continuing | Relay bid-manipulation surface persists through v0.1; enshrined PBS deployment would eliminate the relay trust assumption at the protocol layer | T14.002 (structurally open) |

## Public references

- Flashbots MEV-Boost relay specification: relay API, bid-auction mechanics, and trust assumptions documented at `github.com/flashbots/mev-boost`
- Ethereum PBS roadmap: enshrined PBS (EIP-7732) design removing the relay trust assumption
- MEV research literature characterising relay-level trust and auction-manipulation surfaces (`[daian2019flashboys]`, `[zhou2023sok]`)
- Relay-operator market-share data: mevboost.pics, relayscan.io, MEV-Boost relay transparency dashboards
- See `techniques/T14.002-mev-boost-relay-attack.md` and `techniques/T14.005-builder-censorship-mev-extraction.md` for Technique definitions

## Discussion

T14.002 is unique among the T14 Techniques in that the attack surface is a **protocol-design trust assumption** rather than a **smart-contract vulnerability** (T14.001, T14.004) or an **economic-incentive alignment** (T14.005, T14.006). The relay is trusted because the protocol as currently deployed cannot operate without a trusted intermediary between builder and proposer. The trust assumption is acknowledged in the MEV-Boost specification, and the relay operator is expected to behave honestly because reputational damage from exploiting the position would exceed the one-time MEV gain — a social-contract enforcement mechanism, not a cryptographic one.

The relay's trusted position compounds with builder concentration (T14.005) to create a joint trust surface: when one relay and one builder dominate their respective layers, the joint relay+builder entity has near-total control over block content for its slots — the relay can exclude rival builders from the auction (T14.002), and the builder can censor transactions (T14.005), with neither surface constrained by protocol-level enforcement. The Flashbots relay's 90%+ market share in 2022–2023, combined with Flashbots Builder's dominant builder position, created exactly this joint concentration — though Flashbots' open-source ethos and documented OFAC-compliance rationale distinguish its position from a purely profit-driven joint monopoly.

The long-term mitigation is enshrined PBS (EIP-7732): the relay function becomes a protocol-level mechanism rather than an external trusted service, eliminating the relay-operator trust assumption. Under enshrined PBS, the proposer receives builder bids directly through a protocol-enforced auction mechanism, and the relay's bid-visibility advantage is eliminated because there is no external relay. Until enshrined PBS deploys, the T14.002 surface is structurally open, and relay diversity (no single relay above a configurable market-share threshold) is the load-bearing operational mitigation.

The example is included at the `emerging` maturity level for T14.002: the surface is well-characterised in protocol-design documentation, and the relay-market dynamics (Flashbots sunset, Ultra Sound rise, relay diversification) are well-documented, but no confirmed extraction event with named-relay attribution has been publicly documented. The relay trust surface is the canonical "documented but not yet exploited" T14 sub-class — a surface that every protocol designer acknowledges but that no attacker has (publicly) demonstrated.
