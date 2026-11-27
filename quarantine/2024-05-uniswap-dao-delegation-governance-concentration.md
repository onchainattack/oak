> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from its sources and found a governance design risk, not an attack: a Bubblemaps post about ten wallets funded by token transfer from one wallet, the 2021 BNB Chain bridge vote (which the community-backed option won), an academic paper and a 2026 vote to reclaim loaned UNI. No opened page reports a hostile proposal carried by the cluster, or a loss. The Technique it was written for, OAK-T16.003, was deprecated the same day for having no documented incident. The file can return if a source documents an attack that used this concentration.

# Uniswap DAO — a16z-linked wallet cluster and concentrated delegation, alleged conflict of interest on a 2021 bridge vote, no hostile proposal — Uniswap / Ethereum — 2021–2026

**Loss:** **\$0.** No opened source reports funds taken or a proposal that harmed the DAO.

**OAK Techniques observed:** none — the opened sources describe tokens sent from one wallet to ten, not delegation from many wallets to one delegate, and the contested vote was a choice between two bridges, not a treasury or control grab. The delegation-cluster vote-takeover Technique (see [`techniques/T16.003-delegation-cluster-vote-takeover.md`](../techniques/T16.003-delegation-cluster-vote-takeover.md)) is not claimed.

**Attribution:** **unattributed** — Bubblemaps alleges a conflict of interest by a16z; it does not allege illegal conduct, and it is the author's own analysis ([Bubblemaps](https://blog.bubblemaps.io/exposing-a16zs-hidden-control-in-uniswaps-governance/)).

**Key teaching point:** **Check whether a delegate's holdings sit in wallets that look independent.** Bubblemaps reports a cluster of ten wallets that each received 2.5 million UNI from one central wallet, 2.5 million being the proposal threshold, together holding 4.15% of supply against a 4% quorum ([Bubblemaps](https://blog.bubblemaps.io/exposing-a16zs-hidden-control-in-uniswaps-governance/)). A funding-graph view of governance voters shows this before a vote.

## Summary

On 2021-12-11 a proposal to deploy Uniswap V3 on BNB Chain was submitted. The final choice of bridge was between Wormhole, backed by the community, and LayerZero, backed by a16z; Wormhole received 28 million votes and LayerZero 17 million, of which 15 million came from a16z ([Bubblemaps](https://blog.bubblemaps.io/exposing-a16zs-hidden-control-in-uniswaps-governance/)). On 2024-09-27 Bubblemaps published its analysis of the wallet cluster, which it says could have introduced and passed proposals without broader community backing. It reports that Eddy Lazzarin of a16z said a16z controls about 55 million UNI (5.5% of supply) and had delegated about 40 million to third parties ([Bubblemaps](https://blog.bubblemaps.io/exposing-a16zs-hidden-control-in-uniswaps-governance/)). The article does not describe a hostile proposal, and the vote went to the community-backed option.

On 2025-03-15 a Rotterdam School of Management paper on Uniswap vote delegation reported that parties affiliated with a16z receive more delegations ([arXiv:2503.11940](https://arxiv.org/abs/2503.11940v1)). On 2026-05-05 DL News reported a vote to take back 12.5 million UNI (about \$42 million) loaned to the Uniswap Foundation and several top delegates in 2022-2023; the proposer said delegates held outsized voting power with little economic stake ([DL News](https://www.dlnews.com/articles/defi/uniswap-dao-votes-to-take-back-loaned-uni-tokens/)). The earlier version of this file also claimed a February 2024 fee-switch vote, named student programmes, and a multi-billion-dollar treasury; none appears on an opened page and all were removed.

## Timeline (UTC)

**Flaw**: concentrated delegation and a funded wallet cluster. **Execution**: one contested vote, no harm reported. **Money** and **response**: the token loan is taken back in 2026. Dates come from the cited pages; no times are given.

| When | What happened | OAK |
|---|---|---|
| 2022 to 2023 | 12.5 million UNI is loaned to the Uniswap Foundation and several top delegates to boost participation ([DL News](https://www.dlnews.com/articles/defi/uniswap-dao-votes-to-take-back-loaned-uni-tokens/)). | — |
| 2021-12-11 | Proposal to deploy Uniswap V3 on BNB Chain is submitted; bridge choice later narrows to Wormhole and LayerZero ([Bubblemaps](https://blog.bubblemaps.io/exposing-a16zs-hidden-control-in-uniswaps-governance/)). | — |
| Undisclosed (2021) | Wormhole 28 million votes, LayerZero 17 million including 15 million from a16z; the community-backed option wins ([Bubblemaps](https://blog.bubblemaps.io/exposing-a16zs-hidden-control-in-uniswaps-governance/)). | — |
| 2024-09-27 | Bubblemaps publishes the ten-wallet cluster analysis ([Bubblemaps](https://blog.bubblemaps.io/exposing-a16zs-hidden-control-in-uniswaps-governance/)). | — |
| 2026-05-05 | Vote to reclaim the loaned UNI, 53% in favour at publication, closing 2026-05-08 ([DL News](https://www.dlnews.com/articles/defi/uniswap-dao-votes-to-take-back-loaned-uni-tokens/)). | response |
| — | Funds: none taken. | — |

Key addresses: the Bubblemaps article names the wallets only by shortened prefixes (for example 0xb04 and 0x3c0), so no full address is recorded here.

## Root-cause evidence

- **Technique:** none
- **Source:** <https://blog.bubblemaps.io/exposing-a16zs-hidden-control-in-uniswaps-governance/>; <https://arxiv.org/abs/2503.11940v1>; <https://www.dlnews.com/articles/defi/uniswap-dao-votes-to-take-back-loaned-uni-tokens/>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** Bubblemaps' cluster analysis is the author's own and is not verified in the article. a16z's side is given only through Lazzarin's statement as relayed by Bubblemaps. The article does not say whether the 40 million delegated UNI overlaps with the cluster.

## Public references

- `[bubblemapsuni2024]` — Bubblemaps, "Exposing a16z's Hidden Control in Uniswap's Governance" (2024-09-27): <https://blog.bubblemaps.io/exposing-a16zs-hidden-control-in-uniswaps-governance/>
- `[bongaertsdelegation2025]` — Bongaerts, Lambert, Liebau, Roosenboom, "Vote Delegation in DeFi Governance," arXiv:2503.11940 (2025-03-15): <https://arxiv.org/abs/2503.11940v1>
- `[dlnewsuniloan2026]` — DL News, "Uniswap DAO votes to take back \$42m of governance tokens loaned to delegates" (2026-05-05): <https://www.dlnews.com/articles/defi/uniswap-dao-votes-to-take-back-loaned-uni-tokens/>
