# UwU Lend — sUSDe price from a fallback oracle built on Curve pool states, moved with flash-loaned funds — UwU Lend — 2024-06-10

**Loss:** **~\$19.4M** in the first exploit on 2024-06-10 per [Rekt](https://rekt.news/uwulend-rekt); [The Block](https://www.theblock.co/post/299901/uwu-lend-second-hack-this-week) says about \$20M. A **second exploit on 2024-06-13** took about \$3.7M per Beosin and BlockSec as cited by The Block, and about \$3.5M from the uDAI, uWETH, uLUSD, uFRAX, uCRVUSD and uUSDT pools per [Cointelegraph](https://cointelegraph.com/news/uwu-lend-second-hack-20m-reimbursement). Rekt reports that the Curve founder lost just over 23.5 million CRV (about \$9.85M) that he had deposited into UwU Lend, and that the attacker deposited those tokens into Curve's LlamaLend and borrowed just over 8 million crvUSD; that position was later fully hard-liquidated after crvUSD lenders repaid the debt ([Rekt](https://rekt.news/uwulend-rekt)). Rekt reports no recovery of the drained funds. UwU said, before the second exploit, that it had reimbursed over \$9.7M in total ([Cointelegraph](https://cointelegraph.com/news/uwu-lend-second-hack-20m-reimbursement)).

**OAK Techniques observed:** **OAK-T9.001** (Oracle Price Manipulation — *primary*). Rekt says UwU Lend is a fork of Aave V2 whose oracle fallback logic was changed: when the primary oracle was unavailable, the fallback priced assets from the state of several Curve pools. The attacker moved those pool states with borrowed tokens, borrowed sUSDe at a 0.99 rate and liquidated positions at an inflated 1.03 rate ([Rekt](https://rekt.news/uwulend-rekt)). See [`techniques/T9.001-oracle-price-manipulation.md`](../techniques/T9.001-oracle-price-manipulation.md). **OAK-T9.002** (Flash-Loan-Enabled Exploit — the attacker took a flash loan, per [Rekt](https://rekt.news/uwulend-rekt); The Block says the second attack used the same method). See [`techniques/T9.002-flash-loan-enabled-exploit.md`](../techniques/T9.002-flash-loan-enabled-exploit.md). **OAK-T7.001** (Mixer-Routed Hop) appears as **funding**: Rekt says the attack was funded from Tornado Cash, per Cyvers. Rekt does not say that proceeds went to Tornado Cash; it says stolen WBTC and DAI were converted to ETH in three transactions within six minutes.

**Attribution:** **pseudonymous** — attacker address [`0x841ddf093f5188989fa1524e7b893de64b421f47`](https://etherscan.io/address/0x841ddf093f5188989fa1524e7b893de64b421f47) ([Rekt](https://rekt.news/uwulend-rekt)); [The Block](https://www.theblock.co/post/299901/uwu-lend-second-hack-this-week) says analysts attribute both attacks to the same perpetrator. Rekt reports that skeptics questioned the involvement of a public figure tied to the project's founding and to earlier crypto controversies, and says it does not confirm any involvement and that it remains unclear whether the exploit was a security lapse or something more deliberate. OAK records that suspicion exists and does not name anyone; no source opened here establishes it.

**Key teaching point:** **A lending oracle must not price collateral from spot state that a flash loan can move, and a pause is not a fix while the manipulated asset is still accepted as collateral.** The first exploit came through a changed fallback oracle that read Curve pool states ([Rekt](https://rekt.news/uwulend-rekt)). CertiK told Cointelegraph that the second exploit was not the same vulnerability but a consequence of the first: the attacker still held sUSDe from June 10, and "the UwULend protocol still considered sUSDE as legitimate collateral" even while paused ([Cointelegraph](https://cointelegraph.com/news/uwu-lend-second-hack-20m-reimbursement)). Rekt adds that the code audit by PeckShield found "no high-severity or critical issues" and that the article questions how the oracle vulnerability went unnoticed.

## Summary

On 2024-06-10 an attacker took a flash loan and made large trades that moved Curve pool states, which skewed UwU Lend's fallback oracle; the attacker borrowed sUSDe at a 0.99 rate and liquidated positions at an inflated 1.03 rate, draining about \$19.4M ([Rekt](https://rekt.news/uwulend-rekt)). Beosin identified it as a flash-loan attack that manipulated the sUSDe price oracles ([The Block](https://www.theblock.co/post/299901/uwu-lend-second-hack-this-week)). UwU Lend acknowledged the exploit about an hour after it occurred and paused the protocol, and offered a 20% white-hat bounty if the attacker cooperated by 12 June 17:00 UTC ([Rekt](https://rekt.news/uwulend-rekt)).

The day after, UwU said it had identified and resolved the security vulnerability and that it was unique to the sUSDe market oracle ([The Block](https://www.theblock.co/post/299901/uwu-lend-second-hack-this-week)). On 2024-06-13, hours after reimbursements began, a second exploit by what Cyvers said were the same attackers took about \$3.5M, converted to ETH and sent to the same attacker address ([Cointelegraph](https://cointelegraph.com/news/uwu-lend-second-hack-20m-reimbursement)).

SlowMist's analysis (<https://slowmist.medium.com/analysis-of-the-uwu-lend-hack-9502b2c06dbe>) returned HTTP 403 and was not read.

## Timeline (UTC)

Stages: **Flaw** (changed fallback oracle), **Preparation** (Tornado Cash funding), **Execution** (flash loan, pool-state manipulation, borrow and liquidate), **Money** (conversion to ETH, LlamaLend position), **Response** (pause, bounty, reimbursement, second exploit). The sources give dates, not clock times, except as noted.

| When | What happened | OAK |
|---|---|---|
| Before 2024-06-10 (undisclosed) | Aave V2 fork with changed oracle fallback that prices from several Curve pool states; PeckShield audit found no high or critical issues ([Rekt](https://rekt.news/uwulend-rekt)). | **T9.001** |
| Before 2024-06-10 (undisclosed) | Attack funded from Tornado Cash, per Cyvers as relayed by [Rekt](https://rekt.news/uwulend-rekt). | T7.001 |
| 2024-06-10 | Attack transactions [`0x242a0fb4fde9de0dc2fd42e8db743cbc197ffa2bf6a036ba0bba303df296408b`](https://etherscan.io/tx/0x242a0fb4fde9de0dc2fd42e8db743cbc197ffa2bf6a036ba0bba303df296408b), [`0xb3f067618ce54bc26a960b660cfc28f9ea0315e2e9a1a855ede1508eb4017376`](https://etherscan.io/tx/0xb3f067618ce54bc26a960b660cfc28f9ea0315e2e9a1a855ede1508eb4017376) and [`0xca1bbf3b320662c89232006f1ec6624b56242850f07e0f1dadbe4f69ba0d6ac3`](https://etherscan.io/tx/0xca1bbf3b320662c89232006f1ec6624b56242850f07e0f1dadbe4f69ba0d6ac3): flash loan, Curve pool trades, sUSDe borrowed at 0.99 and liquidations at 1.03 ([Rekt](https://rekt.news/uwulend-rekt)). | **T9.001**, **T9.002** |
| 2024-06-10, within six minutes | Three transactions convert stolen WBTC and DAI to ETH; funds parked at the two holding addresses below ([Rekt](https://rekt.news/uwulend-rekt)). Rekt does not say whether it is the same three hashes as above. | — |
| 2024-06-10 | The attacker deposits the Curve founder's CRV into LlamaLend and borrows just over 8 million crvUSD; the position is later hard-liquidated ([Rekt](https://rekt.news/uwulend-rekt)). | — |
| 2024-06-10, about one hour after | UwU acknowledges the exploit and pauses; offers a 20% bounty until 12 June 17:00 UTC ([Rekt](https://rekt.news/uwulend-rekt)). | response |
| 2024-06-11 | UwU says it identified and resolved the vulnerability, which it calls unique to the sUSDe market oracle ([The Block](https://www.theblock.co/post/299901/uwu-lend-second-hack-this-week)). | response |
| 2024-06-13 | Second exploit, about \$3.5M from six pools, converted to ETH and sent to [`0x841dDf093f5188989fA1524e7B893de64B421f47`](https://etherscan.io/address/0x841dDf093f5188989fA1524e7B893de64B421f47); hashes undisclosed in the sources opened ([Cointelegraph](https://cointelegraph.com/news/uwu-lend-second-hack-20m-reimbursement)). CertiK: caused by sUSDe still counted as collateral after the pause. | **T9.002** |

Key addresses:

- Attacker EOA — [`0x841ddf093f5188989fa1524e7b893de64b421f47`](https://etherscan.io/address/0x841ddf093f5188989fa1524e7b893de64b421f47) ([Rekt](https://rekt.news/uwulend-rekt); also receiver of the second exploit per Cointelegraph)
- Stolen funds parked — [`0x48d7c1dd4214b41eda3301bca434348f8d1c5eb6`](https://etherscan.io/address/0x48d7c1dd4214b41eda3301bca434348f8d1c5eb6) and [`0x050c7e9c62bf991841827f37745ddadb563feb70`](https://etherscan.io/address/0x050c7e9c62bf991841827f37745ddadb563feb70) ([Rekt](https://rekt.news/uwulend-rekt))
- On-chain message to the attacker — [`0x172697658fc3c5c12c44595c9ea2e47b69bcb7d7ef4a7044097b537cfb05386c`](https://etherscan.io/tx/0x172697658fc3c5c12c44595c9ea2e47b69bcb7d7ef4a7044097b537cfb05386c); an on-chain offer to the attacker in [`0x31e5c9a15ce5697c9680cfdeaf5eda60379923d751d3b5eb685b28448d083f97`](https://etherscan.io/tx/0x31e5c9a15ce5697c9680cfdeaf5eda60379923d751d3b5eb685b28448d083f97) (Rekt)

## Root-cause evidence

- **Technique:** OAK-T9.001 (primary), OAK-T9.002
- **Source:** <https://rekt.news/uwulend-rekt>; <https://www.theblock.co/post/299901/uwu-lend-second-hack-this-week>; <https://cointelegraph.com/news/uwu-lend-second-hack-20m-reimbursement>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Rekt describes the changed oracle fallback and the borrow and liquidation rates and lists the transactions; The Block and Cointelegraph agree on the flash-loan oracle manipulation and add the second exploit and CertiK's reading of it. Neither the operator's own post-mortem nor SlowMist's analysis (403) was read, so the exact oracle code and the second exploit's transaction hashes are undisclosed here. Open: Rekt names Curve pools as the fallback input; the term "Sushiswap pair" in older text of this file had no support.

## Public references

- Rekt, "UwuLend - Rekt": <https://rekt.news/uwulend-rekt>
- The Block, report on UwU Lend's second hack (2024-06-13): <https://www.theblock.co/post/299901/uwu-lend-second-hack-this-week>
- Cointelegraph, "UwU Lend faces second hack during \$20M reimbursement process" (2024-06-13): <https://cointelegraph.com/news/uwu-lend-second-hack-20m-reimbursement>
