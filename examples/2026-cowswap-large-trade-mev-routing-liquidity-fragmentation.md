# CoW Swap / Aave interface $50M USDT→AAVE swap — extreme price impact and MEV backrun — 2026-03-12

**Loss:** an unnamed wallet swapped ~\$50.4M of USDT (held as aEthUSDT) for ~324–327 AAVE (~\$36K) through the Aave interface, which routed via CoW Swap, on 2026-03-12. The swap executed as signed: it ran through a ~\$73–74K SushiSwap AAVE/WETH pool (331.63 AAVE and 17.65 WETH), into which ~17,957 WETH was pushed (~1,017x the pool's WETH reserve). The user was not an "institution" in any source; rekt describes an anonymous whale on a phone who confirmed the trade after the Aave interface displayed an extraordinary-slippage warning (99% price impact) and required a confirmation checkbox. It was not an exploit. Downstream MEV: a ~\$12.5M backrun (rekt: a backrun, not a sandwich; the bot kept ~4,824 ETH, ~\$11.1M) and ~\$30–34M of ETH paid to Titan Builder as builder revenue. The earlier "MEV extracted ~\$50M" figure is wrong. Aave pledged to return the fees it collected on the trade (\$110,368 per rekt; Decrypt's headline cites ~\$600K).

**OAK Techniques observed:** **OAK-T5.004** (Sandwich / MEV Extraction — the "dark forest" extraction pattern: a large trade routed through thin liquidity creates a price dislocation that MEV searchers compete to arbitrage. The searchers extracted the rebalancing profit while the user bore the price impact. The incident is the canonical "liquidity-fragmentation MEV" sub-class: the trade's extreme price impact, not an attacker's sandwich, created the MEV opportunity, but the extraction mechanism is a backrun, structurally adjacent to T5.004.) **OAK-T17.001** (Cross-Venue Arbitrage Price Distortion — the price dislocation between the CoWSwap execution venue (where the trade cleared at extreme slippage) and the broader market (where the asset's true price prevailed) was arbitraged by MEV searchers, who bought the dislocated asset on CoWSwap and sold it on external venues at the true price.)

**Attribution:** **unattributed** — the swap executed as the user signed it; there was no exploit or attacker. The MEV searchers who extracted the arbitrage were acting rationally within Ethereum's MEV market structure — they observed a price dislocation and arbitraged it, as the MEV market incentivises them to do. The failure was a missing price-impact guard: rekt notes the previous Aave frontend had a ~30% hard slippage cap that was not carried into the CoW-based integration (not confirmed as deliberate), and Aave later announced "Aave Shield", a default 25% price-impact block.

**Key teaching point:** **The $50M USDT→AAVE swap is the canonical "liquidity-fragmentation MEV" anchor: a large trade routed through inadequate liquidity creates a price dislocation that the MEV market extracts, even without a sandwich attacker or a front-running bot.** The user's loss was not from a malicious adversary but from an order whose route ended in a ~\$73K pool with no effective price-impact limit (99% impact; 1.21% default slippage setting does not capture it). The structural lesson is that **an aggregator route that ends in a thin pool converts the trade's price impact into builder revenue and MEV, regardless of intent.** No malicious transaction, sandwich or oracle manipulation was involved. The mitigation is an enforced price-impact limit at the interface and solver layer, not only a slippage setting.

**Corrected 2026-10-11:** the trade was a wallet swap on 2026-03-12 (~\$50.4M USDT into a ~\$73K SushiSwap pool for ~324–327 AAVE) executed as signed after a 99%-impact warning, not an "institutional" solver-routing anomaly; MEV was a ~\$12.5M backrun plus ~\$30–34M Titan builder revenue (not ~\$50M); the CoW solver won two auctions but failed to land; Aave pledged a fee refund.

## Summary

CoWSwap is a DEX aggregator that uses batch auctions and "solvers" — third-party agents that compete to find the best execution route for user trades. Solvers are incentivised to find routes that minimise price impact, maximise output, and capture any available surplus (the difference between the execution price and the fair market price). CoWSwap's design assumes that solver competition will produce fair execution: if one solver routes through an inadequate pool, another solver will propose a better route and win the auction.

On 2026-03-12 an unnamed wallet holding ~\$50M in aEthUSDT used the Aave interface to swap USDT for AAVE. The order was routed via CoW Swap. The interface showed an extraordinary-slippage warning (Aave engineer Martin Grabina: the issue was 99% price impact, not slippage; the pre-trade quote implied fewer than 140 AAVE) and required a confirmation checkbox, which the user checked on mobile.

Per rekt, a winning CoW solver won two consecutive auctions but failed to land either transaction on-chain and abandoned the order; CoW also cited a stale hardcoded gas ceiling that rejected better-priced quotes. The order ultimately settled through a ~\$74K SushiSwap AAVE/WETH pool, returning ~327.24 AAVE (signed minimum 324.94 AAVE; ~\$36–37K). A MEV bot then backran the dislocated pools, capturing ~\$12.5M (~\$9.9M on the AAVE/WETH leg and ~\$2.6M on USDT/WETH), and ~13,087 ETH (~\$30.2M) in the harvest transaction went to Titan Builder; broader estimates put Titan's total take at ~\$34.3M.

The incident is notable for what it is **not**: not a sandwich attack (rekt: a backrun), not an oracle manipulation, and not a smart-contract exploit. Aave's Stani Kulechov said the infrastructure worked as designed; Aave pledged to return fees collected on the trade and announced a 25% default price-impact block ("Aave Shield").

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2026-03-12 | Wallet submits ~\$50.4M USDT→AAVE swap via the Aave interface (CoW Swap routing); accepts the extraordinary-slippage warning | T17.001 |
| 2026-03-12 | CoW solver wins two auctions but fails to land the transactions; order settles via a ~\$74K SushiSwap AAVE/WETH pool; ~327 AAVE received | T17.001 (price-impact dislocation) |
| 2026-03-12 | MEV bot backruns for ~\$12.5M; ~\$30–34M of ETH flows to Titan Builder | T5.004-adjacent (MEV backrun) |
| 2026-03-12 to 03-16 | Aave pledges fee return; Aave Shield announced; rekt post-mortem 2026-03-16 | (response) |

## Public references

- `[decryptcowaave2026]` — Decrypt, "Crypto Trader Loses Nearly \$50M in Aave Trade, Protocol Offers \$600K Fee Refund" (2026-03-12): <https://decrypt.co/360961/crypto-trader-loses-nearly-50m-aave-trade-600k-fee-refund>
- `[rektpriceimpact2026]` — rekt.news, "Price Impact Kills" (2026-03-16): <https://rekt.news/price-impact-kills>
- `[fintechweeklyaave2026]` — FinTech Weekly, "DeFi Slippage, Aave Swap Gone Wrong: A Trader Just Turned \$50 Million Into \$36,000" (2026-03-13): <https://www.fintechweekly.com/news/aave-swap-defi-slippage-50-million-usdt-cow-protocol-sushiswap-mev-bots-march-2026>
- `[ccncowaave2026]` — CCN, "\$50M USDT Swap Returns Only 324 AAVE — Massive DeFi Slippage Explained" (2026-03): <https://www.ccn.com/education/crypto/50m-usdt-swap-324-aave-mev-bots-34m-eth/>
- `[halbornaave50m2026]` — Halborn, "Explained: Crypto Whale Loses \$50M in Flawed Swap (March 2026)" (2026-03): <https://www.halborn.com/blog/post/explained-crypto-whale-loses-50-million-in-flawed-swap-march-2026>
- See `techniques/T5.004-sandwich-mev-extraction.md` and `techniques/T17.001-cross-venue-arbitrage-price-distortion.md` for Technique definitions

## Discussion

The swap anchors the **price-impact / aggregator-guard sub-class** adjacent to T5.004 and T17.001: the MEV opportunity was created not by an adversary but by a signed order that executed at ~99% price impact. The solver competition did not rescue the order (the winning solver failed to land it), and the interface-level guard was a warning and checkbox rather than a hard block.

The structural lesson: solver competition and slippage settings are not substitutes for an enforced price-impact limit. Aave's response (a default 25% price-impact hard block) and rekt's observation that the older frontend had a ~30% cap point to the missing control.

The incident also shows that MEV extraction here was not an attack on the user: the backrun bot and Titan Builder captured value from a dislocation the user's own order created. The user's loss was the ~99% price impact; the MEV figures describe who captured the other side, and they do not add to the user's loss.
