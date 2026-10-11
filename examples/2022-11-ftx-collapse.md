# FTX exchange collapse — multi-chain (CEX) — 2022-11-11 (Chapter 11 filing)

**Loss:** approximately \$8B+ in customer deposits misappropriated and commingled with Alameda Research trading capital. The Chapter 11 petitions were filed 2022-11-11 with John Ray III replacing Bankman-Fried as CEO [forklogch11]. The US DOJ, in the Sam Bankman-Fried criminal trial (November 2023), established billions of dollars of losses to customers, investors and lenders [sdnysbf] (the ~\$8B customer figure is widely reported but not stated in the cited release). Post-bankruptcy recovery efforts achieved projected recovery above 100% of petition-date claims in nominal USD terms [cryptopotato24], though recovery in crypto-denominated terms remained partial.
**OAK Techniques observed:** **OAK-T5.005** (Treasury-Management Exit — FTX management, led by CEO Sam Bankman-Fried, directed the commingling of customer deposits with Alameda Research's trading capital and the use of customer funds for proprietary trading, venture investments, political donations, real-estate purchases, and personal expenditures; the operational structure of FTX's treasury was that customer deposits flowed into Alameda-controlled bank accounts with no segregation, making the entire customer deposit base the "treasury" from which the extraction was drawn). **OAK-T11.005** (Operator-Side Fake-Platform Fraud — FTX represented itself to customers and regulators as a legitimate, custody-segregated exchange while operating an internal structure — commingled customer-and-proprietary funds, a backdoor that allowed Alameda to draw unlimited credit against FTX's order book — that made the exchange effectively a fake platform whose customer-protection representations were unsupported by its operational architecture).
**Attribution:** **confirmed** (CEO / founder of FTX and Alameda Research), **Gary Wang** (FTX CTO / co-founder), **Caroline Ellison** (CEO of Alameda Research), **Nishad Singh** (FTX Director of Engineering). Bankman-Fried, Wang, Ellison, and Singh were indicted by the US DOJ. Wang, Ellison, and Singh pleaded guilty to fraud and conspiracy charges and cooperated with prosecutors. Bankman-Fried was convicted on all seven counts (wire fraud, conspiracy to commit wire fraud, conspiracy to commit securities fraud, conspiracy to commit commodities fraud, and conspiracy to commit money laundering) on 2023-11-02 and sentenced to 25 years in federal prison on 2024-03-28.
**Key teaching point:** **FTX is the largest fraud in cryptocurrency history by notional customer loss and the canonical worked example of a centralised-exchange treasury-management exit (OAK-T5.005) at the largest scale on the public record.** The FTX collapse anchors the structural lesson that the absence of on-chain proof-of-reserves, combined with an unregulated offshore corporate structure and a single-CEO-controlled group of affiliated entities that commingle customer and proprietary capital, is the architectural pre-condition for an exchange-side treasury exit at platform scale. The FTX collapse also drove the post-2023 industry norm-shift toward Proof-of-Reserves (PoR), exchange-side asset-segregation regulation (MiCA in the EU, HK VASP regime), and the accelerated development of on-chain custody and self-custody tooling that defines the post-FTX regulatory and security landscape.

**Corrected 2026-10-11:** Removed unsourced figures (\$8.7B liabilities vs \$1.2B assets, \$5B/~500 investments, \$100M political donations, \$300M property, Binance FTT sale sizes, the Anthropic/Solana attribution of recovery); the reorganisation plan was confirmed in October 2024 with FTX projecting \$14.7-16.5B of distributable assets [cryptopotato24].

## Summary

FTX was a Bahamas-registered cryptocurrency exchange founded in 2019 by Sam Bankman-Fried (SBF) and Gary Wang, both former quantitative traders at Jane Street Capital. FTX rapidly became one of the world's largest cryptocurrency exchanges by reported trading volume, reaching a peak valuation of \$32B in January 2022. Alameda Research, a quantitative trading firm also founded by Bankman-Fried in 2017, operated as the primary market-maker on FTX and was the largest single counterparty on the exchange's order book.

The operational architecture of FTX and Alameda — revealed in the post-collapse investigation by John Ray III (the Enron-experienced restructuring CEO appointed after the Chapter 11 filing) — was that customer deposits were not segregated from proprietary capital. FTX customer fiat deposits flowed into bank accounts controlled by Alameda Research, not by FTX itself. Alameda used these customer funds for proprietary trading, venture investments, political donations, real-estate purchases and personal expenditures (specific dollar figures stated in earlier drafts are unverified and were removed). Additionally, FTX's codebase contained a "backdoor" — a special exemption in the exchange's risk engine that allowed Alameda's trading account to maintain a negative balance without being liquidated, effectively providing Alameda an unlimited line of credit drawn against FTX customer deposits.

The collapse was triggered by a CoinDesk article on 2022-11-02, which published a leaked Alameda Research balance sheet from June 2022 showing that a substantial portion of Alameda's assets (\$5.8B out of \$14.6B total) consisted of FTT — FTX's own native exchange token, which FTX and Alameda had created and could effectively print at will. The balance sheet implied that Alameda was insolvent on a mark-to-market basis without the FTT token's circular value. A public Twitter feud between SBF and Binance CEO Changpeng Zhao (CZ) ensued. On 2022-11-06, CZ announced that Binance would liquidate its FTT position (earlier drafts' size and equity-exit figures are unverified).

CZ's announcement triggered a bank run: FTX customers withdrew approximately \$6B from the exchange in 72 hours (2022-11-06 to 2022-11-08). By 2022-11-08, FTX had exhausted its liquid reserves and halted customer withdrawals. On 2022-11-08, CZ announced a non-binding letter of intent for Binance to acquire FTX, contingent on due diligence. The next day (2022-11-09), Binance walked away from the deal after reviewing FTX's books, issuing a statement: "Our hope was to be able to support FTX's customers to provide liquidity, but the issues are beyond our control or ability to help."

On 2022-11-11, FTX, Alameda Research, and approximately 130 affiliated entities filed for Chapter 11 bankruptcy protection in the District of Delaware. SBF resigned as CEO and was replaced by John Ray III. SBF was arrested in the Bahamas in December 2022 at the request of the US DOJ. The DOJ unsealed an 8-count indictment charging SBF with wire fraud, conspiracy to commit wire fraud, conspiracy to commit securities fraud, conspiracy to commit commodities fraud, and conspiracy to commit money laundering.

Gary Wang (FTX CTO), Caroline Ellison (Alameda CEO), and Nishad Singh (FTX Director of Engineering) pleaded guilty to related charges and cooperated extensively with prosecutors, providing testimony at SBF's trial. Their testimony established that SBF directed the commingling of customer funds, the construction of the Alameda backdoor, and the misrepresentation of FTX's financial position to investors, lenders, and customers.

SBF was convicted on all seven counts on 2023-11-02 following a five-week trial in the Southern District of New York (Judge Lewis Kaplan presiding). On 2024-03-28, he was sentenced to 25 years in federal prison with forfeiture of over \$11 billion [sdnysbf].

FTX projected \$14.7-16.5B of distributable assets under its plan of reorganisation, which the bankruptcy court confirmed in October 2024 and which projected about 119% recovery of allowed claims for most creditors [cryptopotato24].

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2019-05 | FTX exchange launched by SBF and Gary Wang; Alameda Research primary market-maker from day one | (standing T11.005 surface: commingled architecture from inception) |
| 2019-2022 | Customer deposits flow into Alameda-controlled bank accounts; backdoor exempts Alameda from liquidation | T5.005 (treasury-management exit via ongoing customer-fund misappropriation) |
| 2022-11-02 | CoinDesk publishes leaked Alameda balance sheet showing \$5.8B in FTT assets; insolvency implied | (market-discipline trigger) |
| 2022-11-06 | CZ announces Binance will liquidate its FTT position; bank run begins | (bank-run trigger) |
| 2022-11-06 to 2022-11-08 | ~\$6B in customer withdrawals; FTX's liquid reserves exhausted | (bank run) |
| 2022-11-08 | FTX halts withdrawals; CZ announces non-binding Binance acquisition LOI | (crisis point) |
| 2022-11-09 | Binance walks away after due-diligence review: "issues beyond our control or ability to help" | (rescue failure) |
| 2022-11-11 | FTX / Alameda / ~130 affiliates file Chapter 11 bankruptcy; SBF resigns; John Ray III appointed CEO [forklogch11] | T5.005 (platform exit) |
| 2022-12 | SBF arrested in the Bahamas; US DOJ unseals 8-count indictment | (DOJ action) |
| 2023-11-02 | SBF convicted on all 7 counts (SDNY, Judge Kaplan) | (DOJ conviction) |
| 2024-03-28 | SBF sentenced to 25 years federal prison; >\$11B forfeiture [sdnysbf] | (sentencing) |

## Realised extraction

Approximately \$8B in customer deposits (widely reported figure; not stated in the cited DOJ release). The estate projected \$14.7-16.5B of distributable assets [cryptopotato24]. Recovery in crypto-denominated terms — i.e., whether creditors receive the BTC/ETH equivalent of their deposited value rather than the November 2022 USD value — remained partial and was a subject of creditor litigation and public debate through 2025.

## T5.005 classification

FTX is the largest-scale canonical anchor for OAK-T5.005 (Treasury-Management Exit) at the centralised-exchange layer. The treasury from which the extraction occurred was the entire customer deposit base — approximately \$8B at the time of the collapse. The extraction was not a single-transaction event (T5.001) but a multi-year process of ongoing commingling and misappropriation, structurally closer to a slow-drain (T5.002) in temporal distribution, though the total volume extracted places it in the treasury-management-exit class rather than the LP-drain class.

## T11.005 classification

FTX is the canonical anchor for OAK-T11.005 (Operator-Side Fake-Platform Fraud) at the centralised-exchange sub-shape. The exchange represented itself to customers and regulators as a legitimate, segregated-custody platform while operating an internal architecture that made those representations false. The distinction from BitConnect (T11.005 — the platform was entirely fake from inception, with no genuine exchange operation) is that FTX did operate a genuine exchange with real trading volume and market-making, but the **custody-and-treasury architecture** was fake: customer funds were not held in segregated custody but were commingled with and drained by Alameda. This is the "partially-operational fake platform" sub-shape of T11.005 — a genuine exchange whose treasury and custody representations were fraudulent — that v0.1 taxonomy must accommodate alongside the "entirely fake from inception" sub-shape (BitConnect, OneCoin).

## Cross-reference — T11.005.003

OAK-T11.005.003 (Compound-Operated Investment-Fraud Platforms) classifies the **HyperVerse / HyperFund / HyperTech cluster** — a multi-year Ponzi scheme operated by pseudonymous Australian actors that defrauded investors of approximately \$1.7-1.9B globally (Australian ASIC estimate, 2024). While FTX and the HyperVerse cluster are both T11.005-classified, FTX sits at the CEX sub-shape and HyperVerse / HyperFund at the **compound-operated investment-platform** sub-shape (multiple interconnected entities, MLM recruitment, and fake mining / trading-bot claims across a multi-year window). The two cases jointly anchor the distinction between "exchange with fraudulent treasury" (FTX, T5.005-led) and "multi-platform Ponzi network" (HyperVerse, T11.005.003-led) within the broader T11.005 Technique.

## Public references

- US DOJ (SDNY), Indictment of Samuel Bankman-Fried, 22 Cr. 673 (LAK), December 13, 2022 (unsealed)
- US DOJ, Superseding Indictment, 23 Cr. 102 (LAK), February 22, 2023
- US DOJ, Verdict — United States v. Samuel Bankman-Fried, November 2, 2023
- US DOJ, Sentencing — United States v. Samuel Bankman-Fried, March 28, 2024 (25 years, \$11B forfeiture) `[sdnysbf]`
- FTX Trading Ltd., Chapter 11 Voluntary Petition, District of Delaware, Case No. 22-11068 (JTD), November 11, 2022
- John Ray III, Declaration in Support of Chapter 11 Petitions and First-Day Motions, November 17, 2022
- CoinDesk, "Divisions in Sam Bankman-Fried's Crypto Empire Blur on His Trading Titan Alameda's Balance Sheet," November 2, 2022 (Ian Allison)
- SBF Twitter (@SBF_FTX) thread, November 7-10, 2022
- CZ (Changpeng Zhao) Twitter (@cz_binance) thread, November 6-9, 2022
- SEC v. Samuel Bankman-Fried, Complaint, 22-cv-10512, SDNY, December 13, 2022
- CFTC v. Samuel Bankman-Fried, FTX Trading Ltd., and Alameda Research LLC, Complaint, 22-cv-10512, SDNY, December 13, 2022
- FTX Bankruptcy — Amended Plan of Reorganisation, confirmed October 2024
- `[sdnysbf]` — U.S. Attorney's Office SDNY, "Samuel Bankman-Fried Sentenced To 25 Years In Prison": <https://www.justice.gov/usao-sdny/pr/samuel-bankman-fried-sentenced-25-years-prison>
- `[axiosray]` — Axios, "FTX's new chief takes aim at former CEO Sam Bankman-Fried" (2022-11-18): <https://www.axios.com/2022/11/18/ftx-bankruptcy-john-ray-sbf>
- `[forklogch11]` — ForkLog, "FTX Group files for bankruptcy, Sam Bankman-Fried resigns as CEO" (2022-11-11): <https://forklog.com/en/ftx-group-files-for-bankruptcy-sam-bankman-fried-resigns-as-ceo/>
- `[cryptopotato24]` — CryptoPotato, "Court Approves FTX Reorganization Plan, Here's What's Next for Creditors" (2024-10): <https://cryptopotato.com/court-approves-ftx-reorganization-plan-heres-whats-next-for-creditors/>
