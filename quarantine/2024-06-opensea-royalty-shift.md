> **MERGED 2026-11-27 into `examples/2023-08-opensea-operator-filter-sunset.md`** — a second entry for OpenSea's 2023-08-17 royalty-enforcement change, misdated to 2024. Not part of the OAK corpus; kept for the record.

**Merged into:** 2023-08-opensea-operator-filter-sunset

# OpenSea — retires its Operator Filter and makes creator fees optional for new collections — NFT marketplace / Ethereum and other chains — 2023-08-17

**Loss:** none — no theft or exploit. The effect reported is on creators' fee income: from 2023-08-31 creators on OpenSea could no longer require buyers to pay a creator fee, and collections that had used the Operator Filter kept enforced fees only until 2024-02-29 ([Decrypt](https://decrypt.co/152878/opensea-make-creator-royalties-optional-nft-trades), [Cointelegraph](https://cointelegraph.com/news/opensea-disable-on-chain-royalty-enforcement-tool)). No opened page gives a dollar figure for the lost fees.

**OAK Techniques observed:** none — a marketplace's policy decision with no theft, fraud or exploit in the opened pages. The earlier mapping to the vendor-promise-revocation technique and to an account-abstraction technique is withdrawn: the opened pages describe a product change that OpenSea announced publicly, not an attack, and the second technique is about account abstraction and does not apply.

**Attribution:** **confirmed** — OpenSea announced the change itself ([OpenSea on X, 2023-08-17](https://twitter.com/opensea/status/1692224339481932226); [Cointelegraph](https://cointelegraph.com/news/opensea-disable-on-chain-royalty-enforcement-tool) attributes the statement to its CEO). This is a policy change, not an attack.

**Key teaching point:** **A creator-fee guarantee that depends on every marketplace opting in is a marketplace promise, not a property of the token.** OpenSea itself said the Operator Filter "relied on opt-in from the entire ecosystem, which didn't happen"; a creator who needs fees enforced has to enforce them in the collection's own contract, because a marketplace can withdraw its side.

## Summary

OpenSea announced on 2023-08-17 that from 2023-08-31 it would sunset the Operator Filter, move to optional creator fees on all secondary sales for new collections, and improve the visibility of creator-fee settings ([OpenSea on X](https://twitter.com/opensea/status/1692224339481932226), as quoted by [Decrypt](https://decrypt.co/152878/opensea-make-creator-royalties-optional-nft-trades)). The Operator Filter, introduced in November 2022, let creators block marketplaces that did not enforce creator fees ([Cointelegraph](https://cointelegraph.com/news/opensea-disable-on-chain-royalty-enforcement-tool)). Its CEO said it had lacked ecosystem support, that marketplaces including Blur, Dew and LooksRare had bypassed it through the Seaport protocol, and that creators had pushed back on it ([Cointelegraph](https://cointelegraph.com/news/opensea-disable-on-chain-royalty-enforcement-tool)). Collections using the filter, and existing collections on non-Ethereum chains, kept enforced creator fees until 2024-02-29 ([Decrypt](https://decrypt.co/152878/opensea-make-creator-royalties-optional-nft-trades), [Cointelegraph](https://cointelegraph.com/news/opensea-disable-on-chain-royalty-enforcement-tool)). Several NFT community members and the CEO of the marketplace SuperRare criticised the move ([Decrypt](https://decrypt.co/152878/opensea-make-creator-royalties-optional-nft-trades)).

The earlier version of this file dated the announcement to 2024-06-19 with phases on 2024-08-31 and 2025-01-02; no opened page supports those dates. The same event is covered in [`2023-08-opensea-operator-filter-sunset.md`](2023-08-opensea-operator-filter-sunset.md).

## Timeline (UTC)

**Policy** to **response**; there is no preparation, execution or fund movement. Dates come from the cited pages.

| When | What happened | OAK |
|---|---|---|
| 2022-11 | OpenSea introduces the Operator Filter ([Cointelegraph](https://cointelegraph.com/news/opensea-disable-on-chain-royalty-enforcement-tool)) | none — no attack |
| 2023-08-17 | OpenSea announces the sunset of the Operator Filter and optional creator fees for new collections ([OpenSea on X](https://twitter.com/opensea/status/1692224339481932226)) | none — no attack |
| 2023-08-31 | Operator Filter sunset takes effect; new collections can only state a preferred fee ([Decrypt](https://decrypt.co/152878/opensea-make-creator-royalties-optional-nft-trades)) | none — no attack |
| 2023-08-17 to 2023-08-18 | Public criticism from community members and a rival marketplace's CEO ([Decrypt](https://decrypt.co/152878/opensea-make-creator-royalties-optional-nft-trades)) | response |
| 2024-02-29 | Enforced creator fees for collections that used the filter, and for existing non-Ethereum collections, end ([Decrypt](https://decrypt.co/152878/opensea-make-creator-royalties-optional-nft-trades)) | none — no attack |

No addresses or transactions are involved; none are given on the opened pages.

## Root-cause evidence

- **Technique:** none — no attack
- **Source:** <https://twitter.com/opensea/status/1692224339481932226>; <https://cointelegraph.com/news/opensea-disable-on-chain-royalty-enforcement-tool>; <https://decrypt.co/152878/opensea-make-creator-royalties-optional-nft-trades>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** OpenSea's own post states the change and the reasons; the two news pages report the dates and the CEO's statement. They agree on 2023-08-31 and 2024-02-29. The Block's report (<https://www.theblock.co/post/246095/opensea-disables-royalty-enforcement-tool-makes-creator-fees-optional>) returned 403 and was not read.

## Public references

- OpenSea, X post (2023-08-17): <https://twitter.com/opensea/status/1692224339481932226>
- Cointelegraph, "NFT marketplace OpenSea to disable royalty enforcement tool" (2023-08-18): <https://cointelegraph.com/news/opensea-disable-on-chain-royalty-enforcement-tool>
- Decrypt, "OpenSea Will Make Creator Royalties Optional for NFT Trades" (2023-08-18): <https://decrypt.co/152878/opensea-make-creator-royalties-optional-nft-trades>
