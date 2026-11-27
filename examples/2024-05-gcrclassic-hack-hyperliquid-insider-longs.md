# GCRClassic X account takeover — posts from a hijacked account after pre-opened Hyperliquid longs — X / Hyperliquid — 2024-05-26

**Loss:** **no victim loss figure published.** The harm is market manipulation by an account takeover. [Cointelegraph](https://cointelegraph.com/news/memecoin-team-gcr-hack-zachxbt) reports the ORDI position netted roughly $34,000 and the ETHFI position lost $3,500 before it was closed; [Web3 is Going Just Great](https://www.web3isgoinggreat.com/single/cat-memecoin-team-hacks-gcr) gives the same figures. The $2.3M and $1M figures are position sizes, not profit.

**OAK Techniques observed:** **OAK-T15.006** (Impersonation via Verified Social-Account Compromise — *primary*; per [Cointelegraph](https://cointelegraph.com/news/memecoin-team-gcr-hack-zachxbt) ZachXBT attributed the breach to a SIM swap, and posts about ORDI and ETHFI were then made from the account. See [`techniques/T15.006-impersonation-via-verified-social-account-compromise.md`](../techniques/T15.006-impersonation-via-verified-social-account-compromise.md)). **Market half: not mapped.** Opening leveraged perp longs minutes before an attacker-caused post has no Technique in OAK: it is neither a perp-book manipulation nor a promoter-led dump, and the extraction was perp PnL. Candidate gap: derivatives pre-positioning ahead of an attacker-caused information release.

**Attribution:** **inferred-weak** — ZachXBT links the team behind the Solana memecoin CAT to the hack and to the Hyperliquid positions ([ZachXBT, X](https://x.com/zachxbt/status/1795082820177498349)). Cointelegraph reports the evidence as an investigator's findings, and the team's response is not on the opened pages. No charges are reported.

**Key teaching point:** **Treat a sudden token call from a hacked or recovering influencer account as unverified, and watch for perp positions opened minutes earlier on the same assets.** The Hyperliquid positions were visible on-chain before the posts, which is how the link was drawn.

## Summary

On 2024-05-26 the X account of @GCRClassic was taken over. ZachXBT posted on 2024-05-27 that minutes before the hack an address tied to the team behind the CAT meme coin opened $2.3M ORDI and $1M ETHFI longs on Hyperliquid ([ZachXBT, X](https://x.com/zachxbt/status/1795082820177498349)). Per [Cointelegraph](https://cointelegraph.com/news/memecoin-team-gcr-hack-zachxbt), the team had on 2024-05-24 allegedly manipulated its own coin launch to control more than 63% of CAT supply and sold more than $5 million of CAT, with part of the funds deposited into Hyperliquid. A post about ORDI from the account spiked the price; a second post about ETHFI did not move the market as expected and the position was closed at a $3,500 loss. [Web3 is Going Just Great](https://www.web3isgoinggreat.com/single/cat-memecoin-team-hacks-gcr) notes ZachXBT said positions on centralized exchanges, which are not publicly visible, may also exist.

## Timeline (UTC)

Stages: **Preparation** (funding and positions), **Entry** (account takeover), **Execution** (posts), **Response**. Exact times undisclosed on opened pages.

| When | What happened | OAK |
|---|---|---|
| 2024-05-24 | Team allegedly manipulates its own CAT launch to hold more than 63% of supply, sells over $5M of CAT ([Cointelegraph](https://cointelegraph.com/news/memecoin-team-gcr-hack-zachxbt)) | — |
| 2024-05-26, minutes before the takeover | Address tied to the team opens $2.3M ORDI and $1M ETHFI longs on Hyperliquid ([ZachXBT, X](https://x.com/zachxbt/status/1795082820177498349)) | none — no Technique for derivatives pre-positioning |
| 2024-05-26 | @GCRClassic X account taken over; ZachXBT attributes it to a SIM swap ([Cointelegraph](https://cointelegraph.com/news/memecoin-team-gcr-hack-zachxbt)) | **T15.006** |
| 2024-05-26 | Posts about ORDI (price spikes, about $34,000 gained) and ETHFI (market does not react, $3,500 lost, position closed) | **T15.006** |
| 2024-05-27 | ZachXBT publishes the investigation ([thread start](https://x.com/zachxbt/status/1795082820177498349)) | response |

Key addresses: none printed in full on the opened pages (undisclosed). The thread's later posts, which may carry them, were not opened.

## Root-cause evidence

- **Technique:** OAK-T15.006
- **Source:** <https://x.com/zachxbt/status/1795082820177498349>; <https://cointelegraph.com/news/memecoin-team-gcr-hack-zachxbt>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** ZachXBT's thread ties the address to the team and the positions to the account takeover; Cointelegraph reports the SIM-swap claim. The takeover method is the investigator's attribution, not confirmed by the account owner on opened pages, and the owner's own statement was not opened.

## Public references

- ZachXBT, 2024-05-27, thread start (X): <https://x.com/zachxbt/status/1795082820177498349>
- Cointelegraph, 2024-05-27: <https://cointelegraph.com/news/memecoin-team-gcr-hack-zachxbt>
- Web3 is Going Just Great, 2024-05-27: <https://www.web3isgoinggreat.com/single/cat-memecoin-team-hacks-gcr>
