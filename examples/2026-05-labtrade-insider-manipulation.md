# LABtrade — alleged insider OTC, vesting and CEX-deposit supply control behind a $6B FDV pump — $LAB token / CEXs — 2026-05-14

**Loss:** Undisclosed. No opened page quantifies holder losses. Reported price moves: the token rose over 350% in under 72 hours to about a $6B fully diluted valuation, then fell more than 65% within hours ([Bitcoin.com News](https://news.bitcoin.com/zachxbt-lab-token-insider-control-bitget-investigation-2026/)); on 2026-07-08 ZachXBT wrote that LAB "dumped 85% down to just under $2 from $14 ($14B FDV) in past 24 hrs" ([X](https://x.com/zachxbt/status/2074801441500184621)). All figures are allegations from ZachXBT's investigation as relayed by the press.

**OAK Techniques observed:** **OAK-T3.006** (Insider Multi-Vector Supply Extraction — *primary, alleged*. Per [The Block](https://www.theblock.co/news/ecosystems/2026-05-14-zachxbt-alleges-95-insider-control-of-lab-token-in-investigation-into-ai-terminals-6-billion-fdv-project-401290): private loan and OTC contracts, a cliff change from three to nine months for some participants, an undisclosed market-maker arrangement, and 226 million LAB deposited to Bitget addresses. See [`techniques/T3.006-insider-multi-vector-supply-extraction.md`](../techniques/T3.006-insider-multi-vector-supply-extraction.md)). An influencer-promotion Technique is not declared: the pages show KOL unlocks conditioned on posting promotions, but no source shows a KOL-driven dump.

**Attribution:** **inferred-weak** — allegations by ZachXBT against the project team and an unnamed market maker; The Block and Bitcoin.com report that no response from LABtrade or the named exchanges appears on the pages.

**Key teaching point:** **Check float and unlock terms against an independent source before treating a CEX-listed token's price as market-formed.** Per [The Block](https://www.theblock.co/news/ecosystems/2026-05-14-zachxbt-alleges-95-insider-control-of-lab-token-in-investigation-into-ai-terminals-6-billion-fdv-project-401290), CoinGecko, RootData and CoinMarketCap reported different float figures, so no consistent supply data was public.

## Summary

On 2026-05-14 ZachXBT published a thread ([X, post 1](https://x.com/zachxbt/status/2054898749923860819)) on "opaque private loans/OTC, unilateral vesting changes, market maker coordination, unknown float, and >95% supply control" behind $LAB's rise to a $6B FDV. The Block reports the token had its TGE in October 2025. Per [The Block](https://www.theblock.co/news/ecosystems/2026-05-14-zachxbt-alleges-95-insider-control-of-lab-token-in-investigation-into-ai-terminals-6-billion-fdv-project-401290) and [Bitcoin.com News](https://news.bitcoin.com/zachxbt-lab-token-insider-control-bitget-investigation-2026/), the allegations are:

- **Loans and OTC:** a private contract at 7.5% monthly for six months, signed by a co-founder for The Lab Management Ltd., a BVI-registered company, with repayment on default in LAB at market price; OTC offers at 60% to 80% discounts, some conditional on promotional posts. The borrower wallet is the same address used for LAB's public buybacks (the address is not printed on the opened pages).
- **Vesting:** a cliff changed from three to nine months for some participants without their consent; creators waited months for marketing payouts.
- **CEX deposits:** 226 million LAB deposited to Bitget addresses in March to April 2026; nearly 100 million LAB (about $482 million per The Block, about $480 million per Bitcoin.com) moved from Bitget to 10 addresses on 11 to 12 May.
- **Market maker:** an unnamed counterparty with undisclosed terms; the sibling file linked below carries the exchange-side allegations.
- **RIVER link:** a signer on several LAB team multisigs was funded by an insider ZachXBT linked on-chain to RIVER manipulation, who received more than $12 million of RIVER across two CEX deposit addresses ([The Block](https://www.theblock.co/news/ecosystems/2026-05-14-zachxbt-alleges-95-insider-control-of-lab-token-in-investigation-into-ai-terminals-6-billion-fdv-project-401290)).

Related OAK file: [`2026-05-lab-bitget-market-maker-insider-supply-cohort.md`](2026-05-lab-bitget-market-maker-insider-supply-cohort.md).

## Timeline (UTC)

Dates come from the cited pages; times of day are undisclosed except the posts' timestamps.

| When | What happened | OAK |
|---|---|---|
| 2025-10 | LAB TGE ([The Block](https://www.theblock.co/news/ecosystems/2026-05-14-zachxbt-alleges-95-insider-control-of-lab-token-in-investigation-into-ai-terminals-6-billion-fdv-project-401290)) | background |
| From 2026-01 | A co-founder solicits OTC buyers in a public Telegram group; later pitches offer 60% to 80% discounts ([The Block](https://www.theblock.co/news/ecosystems/2026-05-14-zachxbt-alleges-95-insider-control-of-lab-token-in-investigation-into-ai-terminals-6-billion-fdv-project-401290)) | **T3.006** |
| 2026-03 to 2026-04 | 226 million LAB deposited to Bitget addresses and left dormant (same page) | **T3.006** |
| Early 2026-05 | Price rises over 350% in under 72 hours to about $6B FDV, then falls more than 65% within hours ([Bitcoin.com News](https://news.bitcoin.com/zachxbt-lab-token-insider-control-bitget-investigation-2026/)) | **T3.006** |
| 2026-05-11 to 2026-05-12 | Nearly 100 million LAB moved from Bitget to 10 addresses within a 12-hour window (The Block; Bitcoin.com News) | **T3.006** |
| 2026-05-14 12:16 UTC | ZachXBT publishes the thread ([X](https://x.com/zachxbt/status/2054898749923860819)) | disclosure |
| 2026-05-14 | No response from LABtrade or the named exchanges is reported; ZachXBT urges Bitget, Binance and Gate to freeze insider profits or delist ([The Block](https://www.theblock.co/news/ecosystems/2026-05-14-zachxbt-alleges-95-insider-control-of-lab-token-in-investigation-into-ai-terminals-6-billion-fdv-project-401290)) | response |
| 2026-07-08 10:23 UTC | ZachXBT: LAB fell 85% in 24 hours; "no action was taken by Binance, Bitget, & Gate earlier" ([X](https://x.com/zachxbt/status/2074801441500184621)) | response |

Key addresses: none printed in full on the opened pages. The signer and borrower addresses listed in the earlier version of this file were not on any opened page and have been removed.

## Root-cause evidence

- **Technique:** OAK-T3.006
- **Source:** <https://x.com/zachxbt/status/2054898749923860819>; <https://www.theblock.co/news/ecosystems/2026-05-14-zachxbt-alleges-95-insider-control-of-lab-token-in-investigation-into-ai-terminals-6-billion-fdv-project-401290>; <https://news.bitcoin.com/zachxbt-lab-token-insider-control-bitget-investigation-2026/>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** One investigator's thread, relayed by two outlets that both frame the figures as allegations. Only post 1 of the thread was opened; the loan contract, email screenshot and wallet clusters in later posts were not seen. No party's response is reported.

## Public references

- ZachXBT, thread post 1 (2026-05-14): <https://x.com/zachxbt/status/2054898749923860819>
- ZachXBT, "Update 2" (2026-07-08): <https://x.com/zachxbt/status/2074801441500184621>
- The Block, "ZachXBT alleges 95% insider control of LAB token..." (2026-05-14): <https://www.theblock.co/news/ecosystems/2026-05-14-zachxbt-alleges-95-insider-control-of-lab-token-in-investigation-into-ai-terminals-6-billion-fdv-project-401290>
- Bitcoin.com News (2026-05-15): <https://news.bitcoin.com/zachxbt-lab-token-insider-control-bitget-investigation-2026/>
