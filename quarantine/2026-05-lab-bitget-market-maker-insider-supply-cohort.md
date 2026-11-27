> **MERGED 2026-11-27 into `examples/2026-05-labtrade-insider-manipulation.md`** — a second entry for the same investigation; its four-launch cohort framing and the figures for the other three tokens are on no opened page. Not part of the OAK corpus; kept for the record.

**Merged into:** 2026-05-labtrade-insider-manipulation

# LAB and the Bitget market-maker allegations — alleged insider supply control and exchange-side market making around LAB, with RAVE, RIVER and SIREN named as the same pattern — $LAB token / Bitget — 2026-05-18

**Loss:** Undisclosed. No opened page quantifies holder losses. Reported price moves: per [Bitcoin.com News (2026-05-15)](https://news.bitcoin.com/zachxbt-lab-token-insider-control-bitget-investigation-2026/) LAB rose over 350% in under 72 hours in early May 2026 to a $6 billion fully diluted valuation and then fell more than 65% within hours; per [Bitcoin.com News (2026-05-18)](https://news.bitcoin.com/zachxbt-bitget-supply-control-manipulation-rave-river-siren-lab-2026/) it went from about $0.68 to over $4.00 in roughly five days (the two pages differ on the duration). On 2026-07-08 ZachXBT wrote that LAB "dumped 85% down to just under $2 from $14 ($14B FDV) in past 24 hrs" ([X](https://x.com/zachxbt/status/2074801441500184621)). All figures are allegations from one investigator as relayed by the press.

**OAK Techniques observed:** **OAK-T3.006** (Insider Multi-Vector Supply Extraction — *primary, alleged*. Per [Bitcoin.com News](https://news.bitcoin.com/zachxbt-lab-token-insider-control-bitget-investigation-2026/): OTC loans and discounted OTC deals, a vesting cliff extension, delayed marketing payouts and an undisclosed market-making agreement. See [`techniques/T3.006-insider-multi-vector-supply-extraction.md`](../techniques/T3.006-insider-multi-vector-supply-extraction.md)). The token-genesis and single-sided-liquidity Techniques and the hard-LP-drain Technique were considered and are not declared: no opened page describes an on-chain pool or liquidity removal, only exchange deposits and withdrawals.

**Attribution:** **inferred-weak** — allegations by ZachXBT against the project team, an unnamed market maker and the exchange Bitget. No opened page reports a regulator, court or exchange finding. [Bitcoin.com News (2026-05-18)](https://news.bitcoin.com/zachxbt-bitget-supply-control-manipulation-rave-river-siren-lab-2026/) reports ZachXBT's characterisation that Bitget said it would investigate and gave affected communities no follow-up; the page does not quote Bitget. Individuals the pages name as alleged architects or enablers are not charged, sued or sanctioned on any opened page and are described by role here.

**Key teaching point:** **Compare a listed token's float and unlock terms with an independent source, and check an exchange's deposit and withdrawal clusters, before treating its price as market-formed.** Per [The Block](https://www.theblock.co/news/ecosystems/2026-05-14-zachxbt-alleges-95-insider-control-of-lab-token-in-investigation-into-ai-terminals-6-billion-fdv-project-401290), CoinGecko, RootData and CoinMarketCap reported different float figures and the project documentation had no breakdown.

## Summary

This file records the exchange-side part of ZachXBT's May 2026 LAB allegations; the project-side allegations (loans, OTC discounts, vesting, the investigator's thread) are in [`2026-05-labtrade-insider-manipulation.md`](2026-05-labtrade-insider-manipulation.md), which is the same incident.

Per [Bitcoin.com News (2026-05-15)](https://news.bitcoin.com/zachxbt-lab-token-insider-control-bitget-investigation-2026/), ZachXBT alleges insiders control more than 95% of LAB's supply and that the spike was engineered with an unknown market maker and Bitget insiders. The same page reports that wallets linked to the LAB team deposited 96 million LAB into Bitget accounts shortly before the pump, that 226 million LAB sat dormant in Bitget addresses from March to April 2026, and that 100 million LAB (about $480 million at the reported price) moved to 10 newly created wallets within 12 hours on 2026-05-11 to 05-12. [The Block](https://www.theblock.co/news/ecosystems/2026-05-14-zachxbt-alleges-95-insider-control-of-lab-token-in-investigation-into-ai-terminals-6-billion-fdv-project-401290) gives about $482 million for the same withdrawal.

[Bitcoin.com News (2026-05-18)](https://news.bitcoin.com/zachxbt-bitget-supply-control-manipulation-rave-river-siren-lab-2026/) reports that on Monday ZachXBT accused Bitget of permitting "sketchy active market makers to defraud retail users with supply control manipulation schemes", puts the 96 million LAB deposit at about $63 million and the 100 million withdrawal at about 32% of circulating supply from Bitget's hot wallet, and says ZachXBT posted a $10,000 bounty for proof of LAB manipulation. It names RAVE, RIVER, SIREN and LAB in its headline. [The Block](https://www.theblock.co/news/ecosystems/2026-05-14-zachxbt-alleges-95-insider-control-of-lab-token-in-investigation-into-ai-terminals-6-billion-fdv-project-401290) reports ZachXBT assessing that the market maker ran a playbook previously used on RIVER, RAVE, SIREN, MYX and SKYAI, with Bitget as the main venue and Binance and Gate as secondary channels.

The [Bitcoin.com News (2026-05-18)](https://news.bitcoin.com/zachxbt-bitget-supply-control-manipulation-rave-river-siren-lab-2026/) page also reports that RAVE fell 68% as Binance and Bitget launched separate investigations and then 95% from its peak, and that RaveDAO denied involvement; that token has its own file, [`2026-04-ravedao-otc-pump-dump.md`](2026-04-ravedao-otc-pump-dump.md). No opened page carries concentration figures for RIVER or SIREN.

## Timeline (UTC)

Dates come from the cited pages; times of day are undisclosed.

| When | What happened | OAK |
|---|---|---|
| 2025-10 | LAB token generation event ([The Block](https://www.theblock.co/news/ecosystems/2026-05-14-zachxbt-alleges-95-insider-control-of-lab-token-in-investigation-into-ai-terminals-6-billion-fdv-project-401290)) | background |
| 2026-03 to 2026-04 | 226 million LAB accumulated in Bitget addresses and left dormant ([Bitcoin.com News](https://news.bitcoin.com/zachxbt-lab-token-insider-control-bitget-investigation-2026/)) | **T3.006** |
| Shortly before the pump (date undisclosed) | LAB-team-linked wallets deposit 96 million LAB (about $63 million) into Bitget ([Bitcoin.com News, 05-18](https://news.bitcoin.com/zachxbt-bitget-supply-control-manipulation-rave-river-siren-lab-2026/)) | **T3.006** |
| Early 2026-05 | Price rises from about $0.68 to over $4.00 (FDV above $6B), then falls more than 65% within hours (same page; [05-15 page](https://news.bitcoin.com/zachxbt-lab-token-insider-control-bitget-investigation-2026/)) | **T3.006** |
| 2026-05-11 to 2026-05-12 | 100 million LAB withdrawn to 10 newly created wallets within 12 hours ([Bitcoin.com News](https://news.bitcoin.com/zachxbt-lab-token-insider-control-bitget-investigation-2026/)) | **T3.006** |
| 2026-05-14 | ZachXBT publishes the investigation thread and urges Bitget, Binance and Gate to freeze insider profits or delist ([The Block](https://www.theblock.co/news/ecosystems/2026-05-14-zachxbt-alleges-95-insider-control-of-lab-token-in-investigation-into-ai-terminals-6-billion-fdv-project-401290); [X](https://x.com/zachxbt/status/2054898749923860819)) | disclosure |
| 2026-05-18 | ZachXBT accuses Bitget of permitting manipulative market makers; reportedly says Bitget answered only that it would investigate ([Bitcoin.com News](https://news.bitcoin.com/zachxbt-bitget-supply-control-manipulation-rave-river-siren-lab-2026/)) | response |
| 2026-07-08 | ZachXBT: LAB fell 85%; "no action was taken by Binance, Bitget, & Gate earlier" ([X](https://x.com/zachxbt/status/2074801441500184621)) | response |

Key addresses: none printed in full on the opened pages.

## Root-cause evidence

- **Technique:** OAK-T3.006
- **Source:** <https://news.bitcoin.com/zachxbt-lab-token-insider-control-bitget-investigation-2026/>; <https://news.bitcoin.com/zachxbt-bitget-supply-control-manipulation-rave-river-siren-lab-2026/>; <https://www.theblock.co/news/ecosystems/2026-05-14-zachxbt-alleges-95-insider-control-of-lab-token-in-investigation-into-ai-terminals-6-billion-fdv-project-401290>; <https://x.com/zachxbt/status/2054898749923860819>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** One investigator's allegations, relayed by two outlets that frame the figures as allegations. The wallet clusters were not seen on any opened page. The Crypto Times pages cited by the earlier version of this file returned 403 and were not opened. No exchange or regulator finding is reported.

## Public references

- Bitcoin.com News, "ZachXBT Says 95% of LAB Token Is Insider-Controlled..." (2026-05-15): <https://news.bitcoin.com/zachxbt-lab-token-insider-control-bitget-investigation-2026/>
- Bitcoin.com News, "ZachXBT Names RAVE, RIVER, SIREN, and LAB as Victims of Bitget-Enabled Market Maker Fraud" (2026-05-18): <https://news.bitcoin.com/zachxbt-bitget-supply-control-manipulation-rave-river-siren-lab-2026/>
- The Block, "ZachXBT alleges 95% insider control of LAB token..." (2026-05-14): <https://www.theblock.co/news/ecosystems/2026-05-14-zachxbt-alleges-95-insider-control-of-lab-token-in-investigation-into-ai-terminals-6-billion-fdv-project-401290>
- ZachXBT, thread post 1 (2026-05-14): <https://x.com/zachxbt/status/2054898749923860819>
- ZachXBT, "Update 2" (2026-07-08): <https://x.com/zachxbt/status/2074801441500184621>
