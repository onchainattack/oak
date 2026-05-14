# Big Daddy Ape Club NFT rug pull — Solana — 2022-01-10

**Loss:** approximately 9,136 SOL extracted from Big Daddy Ape Club (BDAC) NFT mint proceeds on Solana on 2022-01-10, worth roughly $1.3M at then-prevailing SOL prices (~$140/SOL). The BDAC collection was marketed as a 2,222-piece generative ape PFP drop on Solana with publicly-stated roadmap promises (metaverse integration, community treasury, holder-exclusive airdrops). Within hours of the mint reaching its stated sell-out, the operators deleted the project's Discord server, Twitter account, and website; the 9,136 SOL in mint proceeds was transferred out of the project treasury wallet through a chain of intermediate addresses. The incident occurred one day after the Frosties NFT rug pull (2022-01-09, also on Solana, ~$1.1M), marking the first documented back-to-back Solana NFT rug-pull pair on consecutive days — a structural signal for the NFT-mint-rug wave that characterised the early-2022 Solana NFT ecosystem. No on-chain recovery was achieved.
**OAK Techniques observed:** **OAK-T1.003** broadly construed as the residual-authority pattern (the operators retained mint-authority and treasury-withdrawal authority over the BDAC program and used that retained authority to execute the exit, despite public roadmap promises and marketing claims to the contrary — structurally identical to the Frosties T1.003 framing one day earlier); **OAK-T12.x** (NFT rug-pull sub-class — currently covered as a contributor-discussed sub-pattern of T12, not a separately-numbered Technique at v0.1) as the structural classification of an NFT-mint-proceeds exit; **OAK-T5.001** (Hard LP Drain / Rug Pull — the operators drained all mint proceeds from the project treasury in a single exit event, structurally the hard-rug shape); **OAK-T7.003** (Cross-Chain Bridge Laundering — mint proceeds routed through cross-chain hops and CEX deposit layering consistent with the post-extraction pattern documented across the contemporaneous Solana NFT rug cohort). The BDAC case chains with **OAK-T8.001** (Cluster Reuse) at the cross-project level: the BDAC deployer wallet was linked on-chain to at least one other Solana NFT project that exhibited the same mint-then-disappear pattern within the same January 2022 window.
**Attribution:** **pseudonymous** (civil-litigation track). The BDAC operators operated under pseudonyms and disappeared after the rug; no criminal charges were filed at the time of the incident. A civil lawsuit was subsequently filed in US federal court (Southern District of New York) against John Doe defendants associated with the BDAC project, alleging fraud and conversion. The civil-litigation track provides partial attribution material — wallet addresses, on-chain transaction graphs, and forensic-wallet evidence entered the court record — but at the OAK v0.1 cutoff, no named-individual criminal attribution had been established. The pseudonymous-attribution tier is structurally higher than unattributed (because civil-litigation forensic material is on the public record) but lower than confirmed-by-arrest (because no criminal charges produced named-defendant identification).
**Key teaching point:** **Back-to-back NFT rugs on consecutive days across different projects are a structural signal that the NFT-mint-rug vector is a scalable operator playbook, not a one-off operator error.** The BDAC rug on 2022-01-10, following Frosties on 2022-01-09, demonstrated that the Solana NFT mint-rug playbook was being replicated by independent operators in real time — the similarity of the playbook (hype-driven mint, sell-out claim, social-media deletion, cross-chain proceeds routing) across unaffiliated operators is the structural evidence that the NFT rug vector had reached operator-playbook maturity by January 2022. The defender-side lesson is that a single high-profile NFT rug in a given ecosystem should be treated as a leading indicator of near-term copycat rugs in the same ecosystem, not as an isolated event.

## Summary

Big Daddy Ape Club launched its mint on 2022-01-10 on Solana, marketing itself as a blue-chip-calibre generative PFP collection of 2,222 unique ape NFTs. The project's pre-mint marketing — conducted primarily via Twitter and Discord — promised a suite of post-mint utility features: metaverse-ready 3D avatar integration, a community-governed treasury funded from mint proceeds, and holder-exclusive airdrops of companion NFT collections. The mint was priced at 2 SOL per NFT for the public-sale tranche, with a total raise target of approximately 4,444 SOL at the stated full-sell-out; in practice, the mint collected 9,136 SOL (~$1.3M) from collectors who sent SOL to the project's mint address.

The mint concluded within hours on 2022-01-10 with the operators publicly claiming a sell-out. Shortly thereafter, the project's Discord server was deleted, the project's Twitter account was deactivated, and the project's website went offline. The 9,136 SOL in mint proceeds was transferred out of the primary project treasury wallet to a chain of intermediate Solana addresses, and from there began moving toward cross-chain bridge and CEX deposit surfaces — a post-extraction routing pattern structurally consistent with the Frosties laundering chain executed one day earlier.

The pseudonymous security researcher Civik published a wallet-level forensic thread on Twitter within hours of the rug, tracing the BDAC treasury outflow through the intermediate-wallet chain and identifying the on-chain linkage between the BDAC deployer wallet and at least one other Solana NFT project that had executed the same mint-then-disappear pattern in the same January 2022 window. The Civik thread became the primary public forensic record for the BDAC rug and was subsequently cited in the civil complaint filed in the Southern District of New York.

The BDAC rug, paired with the Frosties rug one day earlier, crystallised the "Solana NFT rug wave" narrative in the crypto press and triggered a wave of community-side caution about Solana NFT mint participation that persisted through Q1 2022. The two cases together — same ecosystem, same week, structurally identical playbook, different operator clusters — are load-bearing evidence that the NFT mint-rug vector was an operator-playbook-scale phenomenon by January 2022, not a series of unconnected one-off operator failures.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-mint (late 2021–early Jan 2022) | BDAC operators build Discord, Twitter, and web presence; market the project's roadmap (metaverse integration, community treasury, airdrops); accrue follower base in the Solana NFT community | (standing T1.003 surface — operator retains mint/treasury authority) |
| 2022-01-10 (mint opens) | BDAC mint goes live on Solana at 2 SOL/NFT; collectors send SOL to project mint address | (mint collection phase) |
| 2022-01-10 (mint sells out) | Operators claim sell-out of 2,222 NFTs; 9,136 SOL collected (~$1.3M) | (mint completion) |
| 2022-01-10 (within hours of sell-out) | Discord server deleted; Twitter account deactivated; website taken offline | **T6 (Defense Evasion — social-presence removal)** |
| 2022-01-10 (post-deletion) | 9,136 SOL transferred from primary treasury wallet to intermediate-wallet chain | **T5.001 (Hard LP Drain / hard-rug extraction)** |
| 2022-01-10 onward | SOL proceeds begin routing toward cross-chain bridge surfaces and CEX deposit addresses | **T7.003 (Cross-Chain Bridge Laundering)** |
| 2022-01-10 (within hours) | Civik publishes wallet-level forensic thread on Twitter tracing the treasury outflow and wallet-chain | (community forensic response) |
| 2022-01-10 onward | Crypto press (CoinTelegraph, Decrypt, The Block) publishes coverage of the BDAC rug and the Frosties+BDAC back-to-back pair | (public record) |
| 2022 (Q1-Q2) | Civil lawsuit filed in SDNY against John Doe BDAC operators alleging fraud and conversion; forensic material (wallet addresses, transaction graphs) entered into court record | (civil-litigation attribution material) |
| 2022-01 onward | Community-side NFT-mint caution in the Solana ecosystem intensifies; Frosties+BDAC pair becomes canonical reference for the Solana NFT rug wave | (ecosystem impact) |

## What defenders observed

- **The mint-proceeds treasury was operator-controlled from the moment of collection.** As with Frosties, there was no on-chain escrow, no delivery-conditioned release, and no third-party custody over the mint proceeds. The 9,136 SOL was in the operators' wallet from the first mint transaction onward; the exit was a matter of operator decision, not a contract exploit. The defender-observable signal at pre-mint due-diligence time is the *absence of any on-chain constraint on mint-proceeds outflows* — a signal that was equally available to BDAC and Frosties mint participants and was not acted upon in either case.
- **The Frosties+BDAC back-to-back timing is itself a structural signal.** Two Solana NFT rugs on consecutive days, by different operator clusters, executing the same playbook — this is evidence of an *operator-playbook diffusion pattern*, not a one-off operator failure. Defenders monitoring NFT-mint risk in a given ecosystem should treat a single high-profile rug as a leading indicator of near-term copycat rugs; the Frosties rug on 2022-01-09 was publicly known by the time the BDAC mint opened on 2022-01-10, and the BDAC operators either were not deterred by the Frosties news or explicitly used it as cover.
- **Social-presence deletion as a defense-evasion signal is detectable but only post-hoc.** Discord deletion, Twitter deactivation, and website takedown are post-rug T6 signals that confirm the exit and prevent community coordination for recovery or attribution. They are not pre-rug signals — the social presence was active and promotional until the moment of exit — and therefore do not provide pre-trade defense surface.
- **The Civik forensic thread demonstrates that community-side wallet tracing can produce attribution material within hours of a rug.** Civik's wallet-chain trace — linking the BDAC deployer to another Solana NFT project with the same mint-then-disappear pattern — was published within hours and became the load-bearing forensic record for both the community response and the subsequent civil litigation. The operational lesson for community-side defenders is that rapid wallet-graph analysis against known rug-pull patterns can compress the attribution latency from weeks (traditional forensic-provider timeline) to hours (community-researcher timeline), though the resulting attribution material is partial (wallet clusters, not named individuals) without the judicial-process follow-through that the Frosties criminal case achieved.

## What this example tells contributors writing future Technique pages

- **T1.003 residual-authority framing applies across the NFT rug-pull class regardless of proxy-pattern involvement.** The Frosties and BDAC cases share the T1.003 residual-authority pattern even though neither involved proxy contracts or EIP-1967 admin slots: the operators retained mint-and-treasury authority over the project despite public promises to the contrary. The T1.003 technique page's proxy-backdoor framing captures the most technically complex sub-class but the residual-authority concept generalises to any operator-retained authority that contradicts surface-level claims. Contributors writing NFT rug-pull examples should preserve the T1.003 tag with the "broadly construed" framing used in the Frosties and BDAC examples.
- **The back-to-back rug-pull pair is a distinct forensic artefact from the standalone rug pull.** Frosties (2022-01-09) and BDAC (2022-01-10) are individually documented as separate worked examples, but the pair-as-a-pair is itself a forensic signal — evidence of operator-playbook diffusion velocity. Contributors writing future worked examples that occur in close temporal proximity to a structurally-similar incident in the same ecosystem should cross-reference the proximate case explicitly and preserve the pair-level signal, as both Frosties and BDAC do.
- **Civil-litigation attribution material is a tier between pseudonymous and confirmed-by-arrest.** BDAC has wallet addresses and transaction graphs on the civil court record (SDNY John Doe complaint) but no criminal charges producing named-defendant identification. This is a meaningful attribution tier — above purely pseudonymous (where no judicial record exists) and below confirmed-by-arrest (where criminal charges name defendants). Contributors should preserve this tier in the attribution-strength taxonomy rather than collapsing civil-litigation-track cases into pseudonymous.

## Public references

- Civik (pseudonymous). Twitter thread, 2022-01-10 — wallet-level forensic trace of BDAC treasury outflow and intermediate-wallet chain; the primary community-side forensic record — `[civikbdac2022]`.
- CoinTelegraph. *"Big Daddy Ape Club: NFT collectors accuse Solana project of stealing $1.3M."* 2022-01 — contemporaneous reporting on the BDAC rug and its relationship to the Frosties incident — `[cointelegraphbdac2022]`.
- Decrypt. *"Solana NFT Project Big Daddy Ape Club Pulls the Rug for $1.3M."* 2022-01 — contemporaneous reporting citing the 9,136 SOL figure and the social-presence deletion timeline — `[decryptbdac2022]`.
- The Block. *"Solana NFT project Big Daddy Ape Club accused of $1.3 million rug pull."* 2022-01 — contemporaneous reporting on the BDAC rug and ecosystem impact — `[theblockbdac2022]`.
- US District Court, Southern District of New York. *John Doe civil complaint* re: Big Daddy Ape Club, filed 2022 — civil-litigation record providing wallet addresses and transaction-graph forensic material on the public court docket — `[sdnybdac2022]`.
- Companion-citation note: the Frosties worked example at `examples/2022-01-frosties.md` is cross-referenced as the proximate temporal pair; the DOJ Frosties indictment (US v. Nguyen and Llacuna, SDNY 2022) is the criminal-jurisdiction counterpart to the BDAC civil litigation.

### Proposed new BibTeX entries

```bibtex
@misc{civikbdac2022,
  author = {{Civik (pseudonymous)}},
  title = {Big Daddy Ape Club — wallet-level forensic trace},
  year = {2022},
  month = jan,
  note = {Twitter thread, 2022-01-10. Primary community-side forensic record of the BDAC treasury outflow and intermediate-wallet chain.},
}

@misc{cointelegraphbdac2022,
  title = {Big Daddy Ape Club: NFT collectors accuse Solana project of stealing \$1.3M},
  author = {{CoinTelegraph}},
  year = {2022},
  month = jan,
  note = {Contemporaneous reporting on the BDAC rug; cited for the headline loss figure and the Frosties temporal-pair framing.},
}

@misc{decryptbdac2022,
  title = {Solana NFT Project Big Daddy Ape Club Pulls the Rug for \$1.3M},
  author = {{Decrypt}},
  year = {2022},
  month = jan,
  note = {Contemporaneous reporting; cited for the 9,136 SOL figure and the social-presence deletion timeline.},
}

@misc{theblockbdac2022,
  title = {Solana NFT project Big Daddy Ape Club accused of \$1.3 million rug pull},
  author = {{The Block}},
  year = {2022},
  month = jan,
  note = {Contemporaneous reporting on the BDAC rug and ecosystem impact.},
}

@misc{sdnybdac2022,
  author = {{U.S. District Court for the Southern District of New York}},
  title = {Civil complaint — Big Daddy Ape Club (John Doe defendants)},
  year = {2022},
  note = {Civil-litigation record providing wallet addresses and transaction-graph forensic material on the public court docket.},
}
```
