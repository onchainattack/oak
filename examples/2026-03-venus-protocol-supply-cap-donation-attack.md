# Venus Protocol — direct token donations bypass the THE supply cap and inflate collateral value, leaving bad debt on thin liquidity — Venus Protocol (Core Pool) / BNB Chain — 2026-03-15

**Loss:** **~\$2.15M in bad debt** (about 1.18M CAKE and 1.84M THE), per [Venus's post-mortem](https://community.venus.io/t/the-market-incident-post-mortem/5712) as summarised by [rekt.news](https://rekt.news/venus-protocol-rekt4) and [The Block](https://www.theblock.co/news/ecosystems/2026-03-15-venus-protocol-left-with-roughly-2m-in-bad-debt-after-exploit-manipulates-thenas-the-token-price-393622). The post-mortem itself gives about \$2.15M in one section, about \$2.18M in another and about \$2M in its conclusion. The assets taken from Venus were worth \$5.07M, per EmberCN as relayed by [The Block](https://www.theblock.co/news/ecosystems/2026-03-15-venus-protocol-left-with-roughly-2m-in-bad-debt-after-exploit-manipulates-thenas-the-token-price-393622); rekt.news says the widely reported \$3.7M is net extracted after liquidation. Venus says it will cover the bad debt ([rekt.news](https://rekt.news/venus-protocol-rekt4)).

**OAK Techniques observed:** **OAK-T9.011** (Precision-Loss Rounding Attack, whose aliases include "donation attack" — *primary*. Supply caps were enforced only on the `mint` path, so ~36M THE sent directly to the vTHE contract raised the exchange rate about 3.81x without minting vTokens and without any cap check, per [BlockSec](https://blocksec.com/blog/venus-thena-donation-attack) and the [post-mortem](https://community.venus.io/t/the-market-incident-post-mortem/5712). OAK maps the donation primitive here; the page is written for ERC-4626 share-price rounding, so the fit is by alias, not by rounding. See [`techniques/T9.011-precision-loss-rounding-attack.md`](../techniques/T9.011-precision-loss-rounding-attack.md)). **OAK-T9.001** (Oracle Price Manipulation — *secondary*. Buying THE on thin markets pushed the price the oracle accepted from about \$0.26 toward about \$0.51, which let the position borrow against inflated collateral, per [BlockSec](https://blocksec.com/blog/venus-thena-donation-attack)). A cross-venue arbitrage Technique is not declared: no opened page describes a victim cohort on a lagging venue.

**Attribution:** **unattributed.** The primary supplier address is [`0x1a35bd28efd46cfc46c2136f878777d69ae16231`](https://bscscan.com/address/0x1a35bd28efd46cfc46c2136f878777d69ae16231); it was funded from Tornado Cash (7,447 ETH across 77 Tornado Cash transactions from June 2025, per [rekt.news](https://rekt.news/venus-protocol-rekt4)). No identity is published in the opened pages.

**Key teaching point:** **Enforce a supply cap on every path that raises a market's balance, not only on `mint`, and cap how much of an illiquid asset one wallet can supply.** Venus's post-mortem lists "enforce supply cap checks on all balance increases" as a short-term fix ([post-mortem](https://community.venus.io/t/the-market-incident-post-mortem/5712)). The same donation vector was raised in a May 2023 Code4rena audit and judged supported behaviour, per [The Block](https://www.theblock.co/news/ecosystems/2026-03-15-venus-protocol-left-with-roughly-2m-in-bad-debt-after-exploit-manipulates-thenas-the-token-price-393622) and the post-mortem as quoted by [rekt.news](https://rekt.news/venus-protocol-rekt4).

## Summary

On 2026-03-15 an address that had built a THE position over about nine months, to about 84% of the 14.5M supply cap, sent about 36M THE straight to the vTHE contract. That inflated the exchange rate about 3.81x, and the position then borrowed CAKE and BNB in a recursive borrow, swap and donate loop while the THE price rose on thin markets ([post-mortem](https://community.venus.io/t/the-market-incident-post-mortem/5712), [BlockSec](https://blocksec.com/blog/venus-thena-donation-attack)). When buying stopped, THE fell to about \$0.22 and the collateral was liquidated into an order book too thin to cover the debt. An on-chain researcher flagged the attack first, ahead of Venus's first statement ([The Block](https://www.theblock.co/news/ecosystems/2026-03-15-venus-protocol-left-with-roughly-2m-in-bad-debt-after-exploit-manipulates-thenas-the-token-price-393622), [rekt.news](https://rekt.news/venus-protocol-rekt4)).

## Timeline (UTC)

Stages: **Flaw** (cap enforced only on mint, known since 2023), **Preparation** (nine-month accumulation), **Execution** (donation and borrow loop), **Money** (borrowed assets, liquidation), **Response**. Times are from the [post-mortem](https://community.venus.io/t/the-market-incident-post-mortem/5712) and [BlockSec](https://blocksec.com/blog/venus-thena-donation-attack).

| When | What happened | OAK |
|---|---|---|
| 2023-05 | A Code4rena audit contest of Venus Isolated Pools documents the donation attack as finding M-10 with a proof of concept; the team calls it supported behaviour with "no negative side effects" ([rekt.news](https://rekt.news/venus-protocol-rekt4)) | **T9.011** (standing surface) |
| 2025-02 | A donation attack on Venus's ZKSync deployment manipulates the wUSDM exchange rate; net loss \$716,789 ([rekt.news](https://rekt.news/venus-protocol-rekt4)). The article says the BNB Chain Core Pool shared the vulnerability and was not patched | T9.011 (earlier incident) |
| 2025-06 onward | The attacker's wallet receives 7,447 ETH (about \$16.29M) across 77 Tornado Cash transactions, deposits it on Aave, borrows about \$9.92M and buys THE ([rekt.news](https://rekt.news/venus-protocol-rekt4)) | — |
| 2026-03-15 11:00 | The primary address holds 12,234,411 THE, about 84% of the 14.5M cap | — |
| 2026-03-15 ~11:55 | The attack contract, in one transaction ([`0x4f477e941c12bbf32a58dc12db7bb0cb4d31d41ff25b2457e6af3c15d7f5663f`](https://bscscan.com/tx/0x4f477e941c12bbf32a58dc12db7bb0cb4d31d41ff25b2457e6af3c15d7f5663f)), donates about 36M THE to vTHE and borrows CAKE and BNB | **T9.011** |
| 2026-03-15 ~11:55 to ~12:32 | The oracle's BoundValidator rejects the spiking Binance feed for about 37 minutes, until both feeds converge near \$0.51 | **T9.001** |
| 2026-03-15 ~12:00 to 12:42 | Borrow, swap, donate loop; supplied THE rises from 49,525,348 (341% of cap) to a peak of 53,230,145 (367%) at block 86738236 | **T9.011**, T9.001 |
| 2026-03-15 12:04 | The attack contract's position is liquidated | — |
| 2026-03-15 after 12:42 | THE falls to about \$0.22; about 42M THE is liquidated into a thin book; bad debt about \$2.15M | — |
| 2026-03-15 (undisclosed time) | Venus pauses THE borrows and withdrawals and sets collateral factors to zero in at-risk markets, including BCH, LTC, UNI, AAVE, POL, FIL, TWT and lisUSD ([post-mortem](https://community.venus.io/t/the-market-incident-post-mortem/5712)). rekt.news puts Venus's first statement about two hours after the researcher's alert | response |
| 2026-03-17 | Venus publishes the post-mortem; remediation list includes a governance proposal for the bad debt, coordination with law enforcement on the funding trail, and a full re-audit of the core pool | response |
| Undisclosed | Funds taken from Venus: no exit path, Tornado Cash use or bridge movement was visible as of rekt.news's publication on 2026-03-18 | undisclosed |

Key addresses:

- Primary supplier / attacker wallet — [`0x1a35bd28efd46cfc46c2136f878777d69ae16231`](https://bscscan.com/address/0x1a35bd28efd46cfc46c2136f878777d69ae16231)
- Attack contract — [`0x737bc98f1d34e19539c074b8ad1169d5d45da619`](https://bscscan.com/address/0x737bc98f1d34e19539c074b8ad1169d5d45da619)
- Attacker EOA (per [BlockSec](https://blocksec.com/blog/venus-thena-donation-attack) and Quill Audits via [rekt.news](https://rekt.news/venus-protocol-rekt4)) — [`0x43c743e316f40d4511762eedf6f6d484f67b2f82`](https://bscscan.com/address/0x43c743e316f40d4511762eedf6f6d484f67b2f82)
- Tornado Cash-funded wallet (per BlockSec) — [`0x7a79969a0b9d51d922c4810d2950560360f6f234`](https://bscscan.com/address/0x7a79969a0b9d51d922c4810d2950560360f6f234)
- Venus Core Pool Liquidator (per BlockSec) — [`0x0870793286aada55d39ce7f82fb2766e8004cf43`](https://bscscan.com/address/0x0870793286aada55d39ce7f82fb2766e8004cf43)

## Attacker profit

Sources agree the on-chain result looks unprofitable. BlockSec puts the attacker's retained assets at about \$5.21M against \$9.92M invested ([BlockSec](https://blocksec.com/blog/venus-thena-donation-attack)). The post-mortem says off-chain accounts, including other wallets or CEX positions, are being investigated ([post-mortem](https://community.venus.io/t/the-market-incident-post-mortem/5712)). rekt.news presents a CEX short-position theory as unverified and notes nothing on-chain shows such a position. Whether the strategy made money is therefore undisclosed.

## Root-cause evidence

- **Technique:** OAK-T9.011
- **Source:** <https://community.venus.io/t/the-market-incident-post-mortem/5712>; <https://blocksec.com/blog/venus-thena-donation-attack>; <https://rekt.news/venus-protocol-rekt4>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Venus's post-mortem states that direct transfers to the market contract raise the exchange rate without passing `mintAllowed()`, where caps are enforced, and that thin THE liquidity let the attacker push the oracle price; BlockSec's independent write-up matches the sequence and gives the transaction and addresses. Open: the post-mortem's own bad-debt figures disagree, and the attacker's off-chain position is undisclosed.

## Public references

- Venus, "THE Market Incident Post-Mortem" (2026-03-17): <https://community.venus.io/t/the-market-incident-post-mortem/5712>
- BlockSec, "Venus Thena donation attack": <https://blocksec.com/blog/venus-thena-donation-attack>
- rekt.news, "Venus Protocol - Rekt IV" (2026-03-18): <https://rekt.news/venus-protocol-rekt4>
- The Block, "Venus Protocol left with roughly \$2M in bad debt after exploit manipulates Thena's THE token price" (2026-03-15): <https://www.theblock.co/news/ecosystems/2026-03-15-venus-protocol-left-with-roughly-2m-in-bad-debt-after-exploit-manipulates-thenas-the-token-price-393622>
