# Fake Ledger Live — counterfeit "Ledger Live Web3" app in the Microsoft Store drained victims' bitcoin — Microsoft Store / Bitcoin — 2023-11-05

**Loss:** **16.8 BTC (~\$588K)** received across 38 transactions at one address, per [Cointelegraph](https://cointelegraph.com/news/fake-ledger-live-app-sneaks-into-microsoft-app-store-as-victims-lose-half-a-million). [CoinDesk](https://www.coindesk.com/business/2023/11/06/microsoft-listing-fake-ledger-app-leads-to-590k-of-bitcoin-stolen-by-hackers) adds \$180,000 on Ethereum and BNB Smart Chain for about \$770,000 in total; [Bitdefender](https://www.bitdefender.com/en-us/blog/hotforsecurity/rogue-developer-steals-768-000-in-crypto-with-fake-ledger-live-app) gives \$768,000.

**OAK Techniques observed:** none — a counterfeit desktop application in an official app store. The Technique for fake security-tool browser extensions covers extensions, and no opened page describes how the app took funds (see Root-cause evidence).

**Attribution:** **unattributed** — one Bitcoin collection address is public ([Cointelegraph](https://cointelegraph.com/news/fake-ledger-live-app-sneaks-into-microsoft-app-store-as-victims-lose-half-a-million)); no operator is named.

**Key teaching point:** **Install hardware-wallet software only from the vendor's own site and verify the file hash; a store listing is not proof.** Ledger says the only safe place to get Ledger Live is ledger.com ([Cointelegraph](https://cointelegraph.com/news/fake-ledger-live-app-sneaks-into-microsoft-app-store-as-victims-lose-half-a-million)), and recommends comparing the installer's hash to the one it publishes ([Bitdefender](https://www.bitdefender.com/en-us/blog/hotforsecurity/rogue-developer-steals-768-000-in-crypto-with-fake-ledger-live-app)).

## Summary

A fake app named "Ledger Live Web3" was listed in the Microsoft Store as early as 2023-10-19 ([Cointelegraph](https://cointelegraph.com/news/fake-ledger-live-app-sneaks-into-microsoft-app-store-as-victims-lose-half-a-million)). ZachXBT raised the alarm on 2023-11-05 ([Bitdefender](https://www.bitdefender.com/en-us/blog/hotforsecurity/rogue-developer-steals-768-000-in-crypto-with-fake-ledger-live-app)). Bitdefender says the developer amended their own version of the open-source Ledger Live before submitting it and that the review team missed red flags. [CoinDesk](https://www.coindesk.com/business/2023/11/06/microsoft-listing-fake-ledger-app-leads-to-590k-of-bitcoin-stolen-by-hackers) says it was unclear how Microsoft approved it. A Microsoft spokesperson told Cointelegraph, "We have removed this application".

## Timeline (UTC)

Stages: **Entry** (listing), **Execution** (inbound payments), **Money** (consolidation), **Response** (alert, removal). The app's mechanism is undisclosed in the pages opened.

| When | What happened | OAK |
|---|---|---|
| By 2023-10-19 | The fake app is listed in the Microsoft Store ([Cointelegraph](https://cointelegraph.com/news/fake-ledger-live-app-sneaks-into-microsoft-app-store-as-victims-lose-half-a-million)). | none — counterfeit app in an official store |
| 2023-10-24 | First inbound transaction to the collection address, \$5,210 ([Cointelegraph](https://cointelegraph.com/news/fake-ledger-live-app-sneaks-into-microsoft-app-store-as-victims-lose-half-a-million)). | none — counterfeit app in an official store |
| 2023-10-24 to 2023-11-05 | 38 inbound BTC transactions ([CoinDesk](https://www.coindesk.com/business/2023/11/06/microsoft-listing-fake-ledger-app-leads-to-590k-of-bitcoin-stolen-by-hackers)); the largest, \$81,200, is on 2023-11-04 ([Cointelegraph](https://cointelegraph.com/news/fake-ledger-live-app-sneaks-into-microsoft-app-store-as-victims-lose-half-a-million)). | none — counterfeit app in an official store |
| 2023-11 (before 2023-11-06) | The funds are consolidated and split across wallets, per [CoinDesk](https://www.coindesk.com/business/2023/11/06/microsoft-listing-fake-ledger-app-leads-to-590k-of-bitcoin-stolen-by-hackers); about \$115,200 had left the address in two transactions and about 13.5 BTC remained ([Cointelegraph](https://cointelegraph.com/news/fake-ledger-live-app-sneaks-into-microsoft-app-store-as-victims-lose-half-a-million)). | — |
| 2023-11-05 | ZachXBT alerts on X ([Bitdefender](https://www.bitdefender.com/en-us/blog/hotforsecurity/rogue-developer-steals-768-000-in-crypto-with-fake-ledger-live-app)). | response |
| After 2023-11-05 (date undisclosed) | Microsoft removes the app ([Cointelegraph](https://cointelegraph.com/news/fake-ledger-live-app-sneaks-into-microsoft-app-store-as-victims-lose-half-a-million)). | response |

Key addresses:

- Collection address (38 inbound transactions) — [`bc1qg05gw43elzqxqnll8vs8x47ukkhudwyncxy64q`](https://mempool.space/address/bc1qg05gw43elzqxqnll8vs8x47ukkhudwyncxy64q)
- Address where funds were split ([CoinDesk](https://www.coindesk.com/business/2023/11/06/microsoft-listing-fake-ledger-app-leads-to-590k-of-bitcoin-stolen-by-hackers)) — [`bc1qtntflhe6f58lenv8chwuw8w55wxudwsvv549ah`](https://mempool.space/address/bc1qtntflhe6f58lenv8chwuw8w55wxudwsvv549ah)

## Root-cause evidence

- **Technique:** none — counterfeit app in an official store
- **Source:** <https://cointelegraph.com/news/fake-ledger-live-app-sneaks-into-microsoft-app-store-as-victims-lose-half-a-million>; <https://www.coindesk.com/business/2023/11/06/microsoft-listing-fake-ledger-app-leads-to-590k-of-bitcoin-stolen-by-hackers>; <https://www.bitdefender.com/en-us/blog/hotforsecurity/rogue-developer-steals-768-000-in-crypto-with-fake-ledger-live-app>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Three outlets agree on the listing, the 16.8 BTC and the Microsoft removal. None of the opened pages says whether victims typed a seed phrase or connected a wallet, so the extraction mechanism is undisclosed. The Microsoft review failure is reported but unexplained.

## Public references

- Cointelegraph, "Fake Ledger Live app sneaks into Microsoft's app store, \$588K stolen": <https://cointelegraph.com/news/fake-ledger-live-app-sneaks-into-microsoft-app-store-as-victims-lose-half-a-million>
- CoinDesk, "Microsoft Listing Fake Ledger App Leads to \$590K of Bitcoin Stolen by Hackers" (2023-11-06): <https://www.coindesk.com/business/2023/11/06/microsoft-listing-fake-ledger-app-leads-to-590k-of-bitcoin-stolen-by-hackers>
- Bitdefender, "Rogue Developer Steals \$768,000 in Crypto with Fake Ledger Live App" (2023-11-08): <https://www.bitdefender.com/en-us/blog/hotforsecurity/rogue-developer-steals-768-000-in-crypto-with-fake-ledger-live-app>
