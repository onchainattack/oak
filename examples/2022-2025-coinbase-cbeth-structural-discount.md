# Coinbase cbETH Structural Discount and Liquid Staking Token Pricing Surface — Ethereum — 2022–2025

**Loss:** structural — at launch cbETH traded at a discount to ETH (up to ~8% per Decrypt, 2022-09-09, versus ~3% for Lido's stETH), imposing an exit cost on holders who sold on secondary markets rather than waiting for Ethereum withdrawals. The magnitude in later years is not established by the cited sources.
**OAK Techniques observed:** **OAK-T14.004** (Liquid Restaking / Liquid Staking Token Pricing Manipulation — the cbETH discount is a pricing surface created by redemption friction; no manipulation is documented.) **OAK-T14.003** (LST/LRT Depeg Cascade — structurally adjacent; cbETH's discount is a single-asset discount rather than a cascade.)
**Attribution:** **unattributed** — no attacker; the discount is a market outcome rather than an adversarial extraction.

**Key teaching point:** **cbETH's early discount illustrates how redemption friction and counterparty perception, not an attack, can hold a liquid staking token below its underlying value.** Analysts quoted by Decrypt attributed the 2022 discount to redemption requiring KYC and a Coinbase account, counterparty and regulatory exposure, concern that Coinbase could freeze cbETH, and a reward model that differed from competitors'. After Ethereum withdrawals opened, redemptions became the arbitrage route that narrows such gaps.

**Corrected 2026-10-11:** the original said cbETH has no redemption mechanism, that Coinbase never implemented one, and that a 1-7% discount persisted through 2025; sources show Coinbase enabled withdrawals within 24 hours of Shapella (April 2023), with cbETH redemptions surging, and the post-Shapella discount about 1%; the persistent-discount claim and "thin liquidity / passive holders" causes are unsourced and removed.

## Summary

Coinbase launched cbETH (Coinbase Wrapped Staked ETH) in late August 2022 as a liquid representation of ETH staked through Coinbase. Its exchange rate to ETH rises over time to reflect staking rewards. Per Decrypt (2022-09-09), cbETH traded at a discount of up to 8% to ETH shortly after launch, against about 3% for stETH. Galaxy Digital's Alex Thorn linked it to redemption requiring KYC and a Coinbase account and to Coinbase's larger regulatory footprint (counterparty risk); ARK Invest raised the possibility of Coinbase freezing cbETH when legally required; analysts also cited a different reward model.

After Ethereum's Shapella upgrade (April 2023), Bankless reported that Coinbase enabled withdrawals within 24 hours of Shapella deploying to mainnet and that cbETH redemptions surged, hitting 35.6k on 2023-04-13, with net minting positive on multiple days. Coinbase Institutional's 2023-04-14 commentary noted cbETH and stETH still trading around a 1% discount shortly after the upgrade and expected gaps to close; Coin Metrics suggested the post-upgrade supply decline could partly reflect users arbitraging the cbETH discount. Llamarisk found cbETH traded slightly below fair value briefly after Shapella and later stabilised relative to ETH.

The case shows the T14.004 pricing surface in its chronic form (a discount driven by exit friction) rather than an adversarial one, and it narrows when an at-par redemption path is available.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-08 (late) | Coinbase launches cbETH | T14.004 (surface creation) |
| 2022-09-09 | Decrypt reports cbETH at up to ~8% discount to ETH, stETH ~3% | T14.004 (structural discount) |
| 2023-04 | Shapella enables ETH withdrawals; Coinbase enables cbETH withdrawals within 24 hours; redemptions surge (35.6k on 04-13) | T14.004 (redemption path opens) |
| 2023-04-14 | Coinbase Institutional: cbETH and stETH ~1% below ETH, gaps expected to close | T14.004 |

## Public references

- `[decryptcbeth]` — Decrypt, "Coinbase's Ethereum Staking Token Is Trading at a Discount—Here's Why" (2022-09-09): <https://decrypt.co/109396/coinbase-ethereum-staking-token-trading-discount-why>
- `[banklessshapella]` — Bankless, "ETH Withdrawals One Week Later": <https://www.bankless.com/eth-withdrawals-one-week-later>
- `[coinbaseshapella]` — Coinbase Institutional, "Better backdrop after Shapella" (2023-04-14): <https://www.coinbase.com/institutional/research-insights/research/weekly-market-commentary/better-backdrop-after-shapella-april-14-2023>
- `[coinmetrics203]` — Coin Metrics, "State of the Network: Issue 203": <https://coinmetrics.substack.com/p/state-of-the-network-issue-203>
- `[llamariskcbeth]` — LlamaRisk, collateral risk assessment of cbETH: <https://llamarisk.com/research/risk-collateral-risk-assessment-coinbase-wrapped-staked-eth-cbeth>

## Discussion

cbETH is an illustration of a redemption-friction discount, not an incident. The defender lesson is that a low-friction at-par redemption path is the main thing that closes such discounts. Contributors should note this file records no attack and consider whether it belongs under a technique page rather than as a worked incident.
