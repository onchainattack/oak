# DSJ Exchange (DSJEX) / BG Wealth Sharing — alleged $150M+ Ponzi collapse and cross-chain laundering — Ethereum / Tron / Solana — 2026-04-27

**Loss:** More than $150M of inflows, which ZachXBT says is "likely significantly higher" ([Bitcoinist](https://bitcoinist.com/zachxbt-150m-dsj-crypto-ponzi-collapses/), [X](https://x.com/zachxbt/status/2051645845993648517)). More than $92M was laundered across chains between 2026-04-27 and 2026-05-03. Frozen: Tether froze $38.4M on 2026-05-04 and more than $3.1M was frozen at other services and exchanges, over $41.5M in total (Bitcoinist).

**OAK Techniques observed:** **OAK-T11.005.002** (Fake-Custodian / Fake-Asset-Manager Fraud — *primary*. Per [Bitcoinist](https://bitcoinist.com/zachxbt-150m-dsj-crypto-ponzi-collapses/), the scheme promised daily returns of 1.3% to 2.6% plus referral and rank bonuses, and ZachXBT called DSJ a "fake trading platform" fronted by an investment group, BG. See [`techniques/T11.005.002-fake-custodian-fake-asset-manager-fraud.md`](../techniques/T11.005.002-fake-custodian-fake-asset-manager-fraud.md)). **OAK-T7.003** (Cross-Chain Bridge Laundering — Bitcoinist lists Tokenlon swaps, Bridgers and Butter Network, plus USDT0 bridging). **OAK-T7.002** (CEX Deposit-Address Layering — funds were consolidated across hundreds of addresses into multiple deposit addresses; Cobo received $63M in total, per Bitcoinist). A mixer is not declared: no opened page mentions one.

**Attribution:** **unattributed** — the operators are described by ZachXBT as a fake platform with a purported CEO; no charges or sanctions appear on the opened pages. The identity of the front figure is not repeated here.

**Key teaching point:** **Exchanges and stablecoin issuers should treat a burst of consolidations from rotating hot wallets into many deposit addresses as a freeze trigger.** Here, per [Bitcoinist](https://bitcoinist.com/zachxbt-150m-dsj-crypto-ponzi-collapses/), timing analysis of Solana and Tron deposits to Binance matched them to Tron withdrawals, and a ZachXBT-led initiative with Tether, Binance Security, OKX and US law enforcement froze over $41.5M.

## Summary

On 2026-05-05 ZachXBT wrote that the $150M+ DSJ Exchange / BG Wealth Sharing Ponzi "collapsed last week" and that illicit actors had laundered $92M+ across chains from 2026-04-27 to 2026-05-03 ([X](https://x.com/zachxbt/status/2051645845993648517)). Per [Bitcoinist](https://bitcoinist.com/zachxbt-150m-dsj-crypto-ponzi-collapses/) the scheme reportedly ran from 2025, rotated domains and hot wallets, recruited through social channels and a Hong Kong messaging app, and had withdrawals disabled before users were asked for more money: ZachXBT wrote "withdrawals had already been disabled". On 2026-05-02 the purported CEO allegedly posted a video promising an IPO and demanding a 12% "tax" on balances. Bitcoinist also reports that US law enforcement seized a BG-linked domain on 2026-04-23.

## Timeline (UTC)

Times of day are undisclosed on the opened pages.

| When | What happened | OAK |
|---|---|---|
| From 2025 (reported) | Platform promises 1.3% to 2.6% daily returns with referral and rank bonuses; domains and hot wallets rotated ([Bitcoinist](https://bitcoinist.com/zachxbt-150m-dsj-crypto-ponzi-collapses/)) | **T11.005.002** |
| 2026-04-23 | US law enforcement seizes a BG-linked domain (Bitcoinist) | response |
| 2026-04-27 to 2026-05-03 | $92M+ laundered across chains; $93M+ of outflows traced from consolidations to multiple deposit addresses; routes include Tokenlon swaps, Bridgers, Butter Network, USDT0 bridging and USDD wrapping (Bitcoinist; [X](https://x.com/zachxbt/status/2051645845993648517)) | **T7.003**, **T7.002** |
| 2026-05-02 | Purported CEO allegedly demands a 12% "tax" on balances (Bitcoinist) | **T11.005.002** |
| 2026-05-04 | Tether freezes $38.4M (Bitcoinist) | response |
| 2026-05-05 12:51 UTC | ZachXBT posts that more than $41.5M has been frozen with Tether, Binance Security, OKX and US law enforcement ([X](https://x.com/zachxbt/status/2051645845993648517)) | response |

Key addresses: Bitcoinist says ZachXBT published Ethereum and Tron hot wallets but reproduces none; no address or transaction hash is printed in full on an opened page.

## Root-cause evidence

- **Technique:** OAK-T11.005.002
- **Source:** <https://x.com/zachxbt/status/2051645845993648517>; <https://bitcoinist.com/zachxbt-150m-dsj-crypto-ponzi-collapses/>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** An investigator's thread (only post 1 opened) and one news relay of it; the wallet lists and the laundering graph were not seen. The "Ponzi" label and the route list are ZachXBT's as relayed; no operator statement or charge is on the opened pages.

## Public references

- ZachXBT, thread post 1 (2026-05-05): <https://x.com/zachxbt/status/2051645845993648517>
- Bitcoinist, "ZachXBT: $150M DSJ Crypto Ponzi Collapses, $41.5M Frozen": <https://bitcoinist.com/zachxbt-150m-dsj-crypto-ponzi-collapses/>
