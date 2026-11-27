> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no attack to record: OpenSea's 2023-08-17 decision to stop enforcing creator royalties is a published product-policy change, with no theft, exploit or manipulation. It is kept here, outside `examples/`, and can return if a source documents an incident.

# OpenSea — Operator Filter creator-fee enforcement tool retired by the marketplace — Ethereum and other chains — 2023-08-17

**Loss:** none. This is a published product-policy change, not a theft or exploit ([Cointelegraph, 2023-08-18](https://cointelegraph.com/news/opensea-disable-on-chain-royalty-enforcement-tool); [Decrypt, 2023-08-18](https://decrypt.co/152878/opensea-make-creator-royalties-optional-nft-trades)). The cost to creators is lost optional-fee income, which no opened page quantifies.

**OAK Techniques observed:** none — no attack occurred. OpenSea announced that it would stop enforcing creator fees; marketplaces and traders acted within the published policy. The OAK royalty-bypass Technique page lists this event as context and describes itself as an industry policy problem rather than an exploit; the event is kept here as a defender reference, not as an attack.

**Attribution:** **confirmed** as an operator decision: OpenSea's founder and CEO announced it ([Cointelegraph](https://cointelegraph.com/news/opensea-disable-on-chain-royalty-enforcement-tool)). There is no attacker.

**Key teaching point:** **A creator who depends on a marketplace to enforce fees should not rely on that marketplace's tool staying in place; enforce at the collection contract or budget for optional fees.** OpenSea said the filter "relied on opt-in from the entire ecosystem, which didn't happen" ([Cointelegraph](https://cointelegraph.com/news/opensea-disable-on-chain-royalty-enforcement-tool)).

## Summary

On 2023-08-17 OpenSea announced it would sunset its Operator Filter, an on-chain tool introduced in November 2022 as a code snippet that let creators restrict sales to marketplaces that enforced creator fees ([Cointelegraph](https://cointelegraph.com/news/opensea-disable-on-chain-royalty-enforcement-tool)). OpenSea's [post on X](https://twitter.com/opensea/status/1692224339481932226) (read through the post API, 2023-08-17 17:18 UTC) lists three lessons: the filter depended on opt-in from the whole ecosystem, which did not happen; creators and collectors care about having a choice over creator fees; and creator fees are one of many revenue streams for creators.

Per [Cointelegraph](https://cointelegraph.com/news/opensea-disable-on-chain-royalty-enforcement-tool) the CEO said marketplaces such as Blur, Dew and LooksRare integrated the Seaport Protocol to get around OpenSea's blocklist, and that the filter's restrictions "come at the expense of decentralized ownership." [Decrypt](https://decrypt.co/152878/opensea-make-creator-royalties-optional-nft-trades) says creators can still set a preferred fee but buyers can choose whether to pay it. Creators and some competitors criticised the change; SuperRare's CEO said it was unfortunate to see a trend going back on royalties as an industry ([Decrypt](https://decrypt.co/152878/opensea-make-creator-royalties-optional-nft-trades)).

## Timeline (UTC)

**Flaw** (voluntary adoption) → **Take** (none) → **Money** (none) → **Response** (policy change). Dates are from the opened pages; times are undisclosed except the X post.

| When | What happened | OAK |
|---|---|---|
| 2022-11 | OpenSea introduces the Operator Filter ([Cointelegraph](https://cointelegraph.com/news/opensea-disable-on-chain-royalty-enforcement-tool)) | — |
| 2023-08-17 17:18 | OpenSea posts its lessons on the filter on X ([post](https://twitter.com/opensea/status/1692224339481932226)); the sunset is announced on this date per [Decrypt](https://decrypt.co/152878/opensea-make-creator-royalties-optional-nft-trades) | — |
| 2023-08-31 | Creator fees become optional for new collections and the filter is sunset ([Decrypt](https://decrypt.co/152878/opensea-make-creator-royalties-optional-nft-trades)) | — |
| 2024-02-29 | Collections using the filter and existing collections on non-Ethereum chains keep creator-fee enforcement until this date; fees optional platform-wide after it ([Decrypt](https://decrypt.co/152878/opensea-make-creator-royalties-optional-nft-trades)) | — |

Key addresses: none. Other file-level claims in the earlier version (a CORI multisig transfer in early 2023, a 2022-11-08 launch date) are on no opened page and were removed; Cointelegraph does not mention CORI.

Related files: [`2022-11-x2y2-looksrare-royalty-optional.md`](2022-11-x2y2-looksrare-royalty-optional.md), [`2024-01-nft-royalty-bypass.md`](2024-01-nft-royalty-bypass.md).

## Root-cause evidence

- **Technique:** none — no attack
- **Source:** <https://twitter.com/opensea/status/1692224339481932226>; <https://cointelegraph.com/news/opensea-disable-on-chain-royalty-enforcement-tool>; <https://decrypt.co/152878/opensea-make-creator-royalties-optional-nft-trades>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** The operator's own post and two news reports agree on the announcement date, the 2023-08-31 effective date and the 2024-02-29 grace date. The operator's stated reason is that opt-in never became ecosystem-wide.

## Public references

- OpenSea on X (2023-08-17): <https://twitter.com/opensea/status/1692224339481932226>
- Cointelegraph, OpenSea disables on-chain royalty enforcement tool (2023-08-18): <https://cointelegraph.com/news/opensea-disable-on-chain-royalty-enforcement-tool>
- Decrypt, OpenSea to make creator royalties optional (2023-08-18): <https://decrypt.co/152878/opensea-make-creator-royalties-optional-nft-trades>
