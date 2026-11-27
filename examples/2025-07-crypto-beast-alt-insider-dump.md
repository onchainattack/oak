# $ALT token — 45 connected wallets sold \$11M+ into a market-cap crash after an influencer denied involvement — 2025-07-14

**Loss:** Market cap fell from \$190M to \$3M on 2025-07-14, and 45+ connected wallets sold \$11M+ of $ALT that day, per [ZachXBT's thread opener](https://x.com/zachxbt/status/1947641028720398488). A [cryptonews.net report (6 August 2025)](https://cryptonews.net/news/security/31387868/) gives the price move as \$0.19 to \$0.003 within a few hours, a 97% drop, and says the 45 wallets held 3% of all $ALT. Losses to retail buyers: undisclosed.

**OAK Techniques observed:** **OAK-T3.004** (Influencer-Amplified Promotion-and-Dump, *primary*, per ZachXBT's allegation). The investigator says a crypto influencer's wallet and 45 wallets that sold during the crash share one funding source, while the influencer denied being behind the token ([ZachXBT](https://x.com/zachxbt/status/1947641028720398488); [cryptonews.net](https://cryptonews.net/news/security/31387868/)). See [`techniques/T3.004-influencer-amplified-promotion-and-dump.md`](../techniques/T3.004-influencer-amplified-promotion-and-dump.md). The opened pages do not describe the promotion itself (its channels, dates or content), so that half of the Technique is undisclosed here.

**Attribution:** **inferred-weak.** ZachXBT, an independent on-chain investigator, says the wallets are connected to the X account @cryptobeastreal. Per [cryptonews.net](https://cryptonews.net/news/security/31387868/), the link is a Celestia wallet address the account's owner once posted as his own and later deleted. The influencer said the crash came from big traders, not from him, per the same report. No court or regulator action is reported on the opened pages.

**Key teaching point:** **Cluster the sellers by funding source before accepting a denial.** If wallets that sell together trace back to an address the promoter has publicly claimed, a "not me" post does not change who controlled the supply. Check this from the wallet's first funding transaction, not from the promoter's statements.

## Summary

On 2025-07-14 the price of $ALT fell from \$0.19 to \$0.003 ([cryptonews.net](https://cryptonews.net/news/security/31387868/)). On 2025-07-22 ZachXBT opened a thread titled as an investigation into how the @cryptobeastreal account scammed followers by lying about not being behind the crash, saying 45+ connected insider wallets sold \$11M+ on 2025-07-14 ([X post](https://x.com/zachxbt/status/1947641028720398488)). Per [cryptonews.net](https://cryptonews.net/news/security/31387868/), the investigator linked the wallets to a Celestia address the influencer had posted and deleted; from May to July 2025 that address sent funds to smaller wallets through Binance, KuCoin, HTX and Sideshift, and on 2025-07-14 the smaller wallets sold a large amount of $ALT within minutes. Only the first post of the thread and one news report were opened for this file; the thread's remaining posts, including any addresses, were not.

## Timeline (UTC)

Stages: **Funding** (May to July 2025), **Take** (the sell-off), **Response** (denial and disclosure). Dates come from the cited pages; times are undisclosed except where shown.

| When | What happened | OAK |
|---|---|---|
| May to July 2025 | A Celestia wallet the influencer had linked to himself sends funds to smaller wallets through Binance, KuCoin, HTX and Sideshift ([cryptonews.net](https://cryptonews.net/news/security/31387868/)); the wallet addresses are undisclosed on the opened pages | none — funding of the wallet cluster |
| Before 2025-07-14 | Promotion of $ALT to followers: not described on the opened pages. Undisclosed | **T3.004** (alleged) |
| 2025-07-14 | $ALT falls from \$0.19 to \$0.003 within a few hours; the 45 wallets sell \$11M+ within minutes ([cryptonews.net](https://cryptonews.net/news/security/31387868/); [ZachXBT](https://x.com/zachxbt/status/1947641028720398488)) | **T3.004** |
| After 2025-07-14 | The influencer says the crash was caused by big traders, not him, and deactivates his X account for a short period ([cryptonews.net](https://cryptonews.net/news/security/31387868/)) | none — denial |
| 2025-07-22 12:53 | ZachXBT publishes the investigation thread ([X post](https://x.com/zachxbt/status/1947641028720398488)) | disclosure |
| By 2025-08-06 | The account's owner returns under another username ([cryptonews.net](https://cryptonews.net/news/security/31387868/)) | none |

Key addresses: the Celestia funding address and the 45 selling wallets are not printed on the pages opened for this file. Undisclosed here; the full list is in ZachXBT's thread, which this file does not reproduce.

## Root-cause evidence

- **Technique:** OAK-T3.004
- **Source:** <https://x.com/zachxbt/status/1947641028720398488>; <https://cryptonews.net/news/security/31387868/>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** ZachXBT's thread, relayed by one news report, ties the sellers to one funding wallet and says that wallet was linked to the influencer. The findings are the investigator's, published eight days after the crash, and the influencer disputes them. No second independent trace was opened.

## Public references

- ZachXBT, [thread opener on the $ALT crash](https://x.com/zachxbt/status/1947641028720398488) (2025-07-22).
- cryptonews.net, ["Crypto Beast Returns After $ALT Crash, ZachXBT Probes"](https://cryptonews.net/news/security/31387868/) (2025-08-06, republishing cryptonewsz.com).
