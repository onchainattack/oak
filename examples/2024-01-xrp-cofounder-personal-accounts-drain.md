# XRP — private keys of a Ripple co-founder's personal accounts used to move XRP to exchanges — XRP Ledger — 2024-01-30

**Loss:** **213M XRP (about \$112.5M)** per [CryptoSlate](https://cryptoslate.com/ripple-co-founder-chris-larsens-xrp-wallet-hacked-for-estimated-112-million/) and [crypto.news](https://crypto.news/zachxbt-tracks-over-100m-in-xrp-sent-to-exchanges-by-chris-larsen/), both relaying ZachXBT's tracing; CryptoSlate says the amount was not confirmed by the victim or Ripple-related individuals. A later report gives **283M XRP** for the same January 2024 theft, citing a forfeiture complaint ([Cointelegraph, 2025-03-07](https://cointelegraph.com/news/ripple-co-founder-larsen-150m-xrp-theft-password-manager-breach)). The figures are not reconciled on the opened pages. Per [crypto.news](https://crypto.news/zachxbt-tracks-over-100m-in-xrp-sent-to-exchanges-by-chris-larsen/), the victim said a significant portion was frozen and nearly all affected funds had been converted out of XRP.

**OAK Techniques observed:** **OAK-T11.006.001** (User-Initiated Plaintext-Equivalent Seed Storage, *primary*, reported). ZachXBT said the theft resulted from storing private keys in the LastPass password manager, citing a forfeiture complaint filed by US law enforcement; [Cointelegraph](https://cointelegraph.com/news/ripple-co-founder-larsen-150m-xrp-theft-password-manager-breach) says it saw only a screenshot of that complaint, so the cause rests on ZachXBT's account. See [`techniques/T11.006.001-user-initiated-plaintext-seed-storage.md`](../techniques/T11.006.001-user-initiated-plaintext-seed-storage.md). In January 2024 the vector was unestablished: [CryptoSlate](https://cryptoslate.com/ripple-co-founder-chris-larsens-xrp-wallet-hacked-for-estimated-112-million/) says ZachXBT speculated about compromised keys and the victim did not describe the method. The exchange off-ramp is mapped to no Technique: the opened pages name the exchanges but not the deposit-address structure.

**Attribution:** **unattributed.** No page opened for this file names the thief. Exchanges named as destinations: see the timeline.

**Key teaching point:** **Do not keep signing keys in a password manager, and watch known high-value accounts for outflows.** A WhiteBIT alert to the XRP Ledger Foundation team on 2024-01-30 was the first detection reported on the opened pages ([CryptoSlate](https://cryptoslate.com/ripple-co-founder-chris-larsens-xrp-wallet-hacked-for-estimated-112-million/)). Exchanges froze part of the funds only after they were told which addresses to block.

## Summary

The accounts were the personal XRP accounts of a Ripple co-founder, not Ripple's corporate wallets: he said so in his own post, and said Ripple wallets were never compromised ([CryptoSlate](https://cryptoslate.com/ripple-co-founder-chris-larsens-xrp-wallet-hacked-for-estimated-112-million/); [crypto.news](https://crypto.news/zachxbt-tracks-over-100m-in-xrp-sent-to-exchanges-by-chris-larsen/)). On 2024-01-30 the exchange WhiteBIT alerted the XRP Ledger Foundation team to suspicious deposits, and the team informed the victim. On 2024-01-31 ZachXBT published the transfers and the victim posted a statement. ZachXBT traced the XRP to MEXC, Gate, Binance, Kraken, OKX, HTX and HitBTC. In March 2025 ZachXBT shared a screenshot of a forfeiture complaint that he said tied the theft to keys stored in LastPass ([Cointelegraph](https://cointelegraph.com/news/ripple-co-founder-larsen-150m-xrp-theft-password-manager-breach)).

## Timeline (UTC)

Stages: **Flaw** (key storage), **Take** (transfers), **Money** (exchanges), **Response**. The opened pages give dates, not times. This file earlier called the source account a Ripple hot wallet; the opened pages say it was personal.

| When | What happened | OAK |
|---|---|---|
| Before 2024-01-30 (undisclosed) | Per the March 2025 report, the victim's private keys were stored in LastPass before being destroyed; the report ties this to LastPass breaches in August and November 2022 ([Cointelegraph](https://cointelegraph.com/news/ripple-co-founder-larsen-150m-xrp-theft-password-manager-breach)). Reported by ZachXBT from a screenshot | **T11.006.001** (reported) |
| 2024-01-30 | XRP is moved out of the victim's accounts; WhiteBIT alerts the XRP Ledger Foundation team to suspicious deposits ([CryptoSlate](https://cryptoslate.com/ripple-co-founder-chris-larsens-xrp-wallet-hacked-for-estimated-112-million/)). Source address named by [crypto.news](https://crypto.news/zachxbt-tracks-over-100m-in-xrp-sent-to-exchanges-by-chris-larsen/): [`rJNLz3A1qPKfWCtJLPhmMZAfBkutC2Qojm`](https://xrpscan.com/account/rJNLz3A1qPKfWCtJLPhmMZAfBkutC2Qojm). Transaction hashes: undisclosed | **T11.006.001** (reported) |
| 2024-01-30 to 2024-01-31 | ZachXBT traces the XRP to MEXC, Gate, Binance, Kraken, OKX, HTX and HitBTC, and identifies 8 addresses in total, not listed in the article ([crypto.news](https://crypto.news/zachxbt-tracks-over-100m-in-xrp-sent-to-exchanges-by-chris-larsen/); [CryptoSlate](https://cryptoslate.com/ripple-co-founder-chris-larsens-xrp-wallet-hacked-for-estimated-112-million/)) | none — destination deposit addresses undisclosed |
| 2024-01-31 | The victim posts that exchanges were notified to freeze the affected addresses and that law enforcement is involved ([CryptoSlate](https://cryptoslate.com/ripple-co-founder-chris-larsens-xrp-wallet-hacked-for-estimated-112-million/)); a follow-up says nearly all affected funds were converted out of XRP and a significant portion was frozen ([crypto.news](https://crypto.news/zachxbt-tracks-over-100m-in-xrp-sent-to-exchanges-by-chris-larsen/)) | response |
| 2025-03-07 | ZachXBT shares a screenshot of a forfeiture complaint that he says ties the theft to keys stored in LastPass; the report gives 283M XRP ([Cointelegraph](https://cointelegraph.com/news/ripple-co-founder-larsen-150m-xrp-theft-password-manager-breach)) | disclosure |

Key addresses:

- Source account, per crypto.news — [`rJNLz3A1qPKfWCtJLPhmMZAfBkutC2Qojm`](https://xrpscan.com/account/rJNLz3A1qPKfWCtJLPhmMZAfBkutC2Qojm). That page says the wallet was reportedly activated by the co-founder.
- Destination and intermediate addresses: undisclosed on the opened pages.

## Root-cause evidence

- **Technique:** OAK-T11.006.001
- **Source:** <https://cointelegraph.com/news/ripple-co-founder-larsen-150m-xrp-theft-password-manager-breach>; <https://cryptoslate.com/ripple-co-founder-chris-larsens-xrp-wallet-hacked-for-estimated-112-million/>; <https://crypto.news/zachxbt-tracks-over-100m-in-xrp-sent-to-exchanges-by-chris-larsen/>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** The victim confirmed unauthorized access to personal XRP accounts but gave no method. The LastPass cause comes from ZachXBT's reading of a forfeiture-complaint screenshot, relayed by one outlet 13 months later; the complaint itself was not opened. The amount differs between reports (213M and 283M XRP).

## Public references

- CryptoSlate, ["Ripple co-founder Chris Larsen's XRP wallet hacked for estimated $112 million"](https://cryptoslate.com/ripple-co-founder-chris-larsens-xrp-wallet-hacked-for-estimated-112-million/) (2024-01-31).
- crypto.news, ["ZachXBT tracks over $100M in XRP sent to exchanges by Chris Larsen"](https://crypto.news/zachxbt-tracks-over-100m-in-xrp-sent-to-exchanges-by-chris-larsen/); the page's own date is inconsistent (2025-01-30 header, 2024-01-31 embedded posts).
- Cointelegraph, ["Ripple co-founder Larsen's $150M XRP theft linked to LastPass breach"](https://cointelegraph.com/news/ripple-co-founder-larsen-150m-xrp-theft-password-manager-breach) (2025-03-07).
