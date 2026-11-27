# Tornado Cash withdrawals spent on Magic: The Gathering cards — suspected Uranium Finance proceeds — Ethereum — 2023

**Loss:** 11,200+ ETH (about \$25M) withdrawn from Tornado Cash over 2023 by one person, most of it spent on Magic: The Gathering (MTG) cards, per [ZachXBT](https://x.com/zachxbt/status/1732790450350703052). The source of funds is an inference: the Uranium Finance exploit (about \$50M, April 2021; see [2021-04-uranium-finance.md](2021-04-uranium-finance.md)). In February 2025 ZachXBT put the portion laundered through cards at \$10.5M ([post](https://twitter.com/zachxbt/status/1894242208779256020)); the two figures are different measures and are not reconciled in the sources.

**OAK Techniques observed:** **OAK-T7.001** (Mixer-Routed Hop — *primary*; withdrawals from Tornado Cash in 100 ETH increments, per [The Block](https://www.theblock.co/news/defi/2023-12-08-uranium-finance-hacker-may-have-cashed-out-via-magic-the-gathering-cards-zachxbt-says-266790)). **OAK-T7.002** (CEX Deposit-Address Layering — some funds went to deposit addresses at Kraken, Bitpay and Coinbase, per The Block). **OAK-T8.003** (On-Chain Transaction Graph De-Anonymization — the link to the Uranium hacker rests on deposit/withdrawal timing and amounts). The conversion into physical collectibles through a broker has no OAK Technique; none of the rejected candidates fit.

**Attribution:** **inferred-weak** — ZachXBT links the card buyer to the Uranium Finance exploiter by timing and amount; The Block (relayed) says the timing suggests they might well be the same person. The thread itself says the analysis could be incorrect, per a [relayed summary](https://threadreaderapp.com/scrolly/1732790450350703052). Later US prosecution of the Uranium exploiter is covered in [2021-2023-uranium-finance-exploit-seizure.md](2021-2023-uranium-finance-exploit-seizure.md).

**Key teaching point:** **Exchanges, brokers and sellers of high-value collectibles should flag buyers who pay upfront in crypto, overpay and stay anonymous, and screen payers for Tornado Cash exposure.** The Block reports the buyer paid 5-10% over market, sent crypto to the broker upfront and never revealed identity to sellers.

## Summary

On December 7, 2023 ZachXBT [posted](https://x.com/zachxbt/status/1732790450350703052) that he had monitored someone who withdrew 11,200+ ETH from Tornado Cash during the year and spent most of it on MTG cards. Per [The Block](https://www.theblock.co/news/defi/2023-12-08-uranium-finance-hacker-may-have-cashed-out-via-magic-the-gathering-cards-zachxbt-says-266790), the ETH was swapped to WETH, moved to a new address, swapped to USDC and partly used to buy cards through an unnamed US-based broker; some funds went to Kraken, Bitpay and Coinbase. A [relayed summary of the thread](https://threadreaderapp.com/scrolly/1732790450350703052) adds that withdrawals went to 11 addresses and that the broker was identified through a matching Instagram username and OpenSea profile. The post links the funds to the Uranium hack through Tornado Cash deposits and withdrawals in March 2023.

## Timeline (UTC)

Stages: **Take** (2021 exploit, see sibling file) → **Preparation/Money** (mixer, swaps) → **Cash-out** (cards, exchanges) → **Response** (public analysis). Times are undisclosed; dates are from the cited pages.

| When | What happened | OAK |
|---|---|---|
| 2021-04-28 | Uranium Finance exploited, about \$50M ([The Block](https://www.theblock.co/news/defi/2023-12-08-uranium-finance-hacker-may-have-cashed-out-via-magic-the-gathering-cards-zachxbt-says-266790)) | see [sibling](2021-04-uranium-finance.md) |
| 2023-03-06 and 2023-03-14 | Per ZachXBT, the Uranium hacker deposits 52 x 100 ETH to Tornado Cash on each date ([The Block](https://www.theblock.co/news/defi/2023-12-08-uranium-finance-hacker-may-have-cashed-out-via-magic-the-gathering-cards-zachxbt-says-266790)) | T7.001 |
| 2023-03-07 and 2023-03-15 | The monitored person receives 52 x 100 ETH from Tornado Cash (same source) | T7.001, T8.003 |
| 2023 (dates undisclosed) | ETH to WETH, to a new address, to USDC; USDC to a US-based MTG broker; buyer pays 5-10% over market, upfront (same source) | — |
| 2023 (dates undisclosed) | Some funds sent to Kraken, Bitpay and Coinbase deposit addresses (same source) | T7.002 |
| 2023-12-07 | ZachXBT publishes the analysis ([X](https://x.com/zachxbt/status/1732790450350703052)) | response |
| 2025-02-25 | ZachXBT notes \$31M seized by US law enforcement and \$10.5M laundered via cards ([X](https://twitter.com/zachxbt/status/1894242208779256020)) | response |

Key addresses: full addresses are in the thread but not on the pages opened for this pass; undisclosed here.

## Root-cause evidence

- **Technique:** OAK-T7.001
- **Source:** <https://www.theblock.co/news/defi/2023-12-08-uranium-finance-hacker-may-have-cashed-out-via-magic-the-gathering-cards-zachxbt-says-266790>; <https://x.com/zachxbt/status/1732790450350703052>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** One investigator's thread, relayed by The Block the next day. The link to the Uranium exploit is timing and amount matching, not proof; the thread contents beyond its first post were read through a summary.

## Public references

- The Block, "Uranium Finance hacker may have cashed out via 'Magic: The Gathering' cards, ZachXBT says" (2023-12-08): <https://www.theblock.co/news/defi/2023-12-08-uranium-finance-hacker-may-have-cashed-out-via-magic-the-gathering-cards-zachxbt-says-266790>
- ZachXBT, thread opening (2023-12-07): <https://x.com/zachxbt/status/1732790450350703052>
- Thread Reader summary of the thread: <https://threadreaderapp.com/scrolly/1732790450350703052>
- ZachXBT (2025-02-25): <https://twitter.com/zachxbt/status/1894242208779256020>
