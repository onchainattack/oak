# KyberSwap Elastic — rounding error in swap math left tick liquidity double-counted, drained concentrated-liquidity pools on many chains — KyberSwap Elastic / multi-chain — 2023-11-22

**Loss:** about \$55.2M taken from Elastic pools, of which about \$48.67M went to the primary exploiter and about \$6.56M to front-running ("mimicking") bots; 2,367 liquidity providers were affected, per the [KyberSwap post-mortem](https://blog.kyberswap.com/post-mortem-kyberswap-elastic-exploit/). Press at the time reported about \$47M ([The Block](https://www.theblock.co/post/264756/kyberswap-recovers-4-7-million-after-exploit)) and [BlockSec](https://blocksec.com/blog/kyberswap-incident-masterful-exploitation-of-rounding-errors-with-exceedingly-subtle-calculations) "over \$48 million". Recovered: about \$5.17M from two front-run bot operators who agreed to return 90% for a 10% bounty, plus about \$706k of locked assets recovered with security researchers (post-mortem). KyberSwap later distributed treasury grants it says covered 100% of affected funds for users who applied (post-mortem update).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*, per the post-mortem and BlockSec: a rounding error in the swap math made the pool miss a tick crossing and keep stale liquidity values). **OAK-T9.002** (Flash-Loan-Enabled Exploit — the primary exploiter borrowed ETHx from Uniswap V3 per the post-mortem; BlockSec describes a 2,000 WETH Aave flash loan in the transaction it analyses). See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md).

**Attribution:** **pseudonymous.** The post-mortem labels the primary exploiter's addresses; no source opened for this file names a person.

**Key teaching point:** **Test concentrated-liquidity swap math at tick boundaries against an independent model, including rounding direction.** Per the post-mortem the root cause was "a discrepancy between the cross-tick estimation and final price calculation" that earlier audits had not found; BlockSec traces it to a rounding direction in the reinvestment step.

## Summary

KyberSwap Elastic was a concentrated-liquidity AMM deployed on many chains. On 2023-11-22 an attacker used a precisely sized swap to trigger a double rounding error in the swap math. The pool's computed price moved past the next tick, but the contract did not register that the tick had been crossed, so the pool kept stale liquidity values and the attacker swapped back against the corrupted state ([post-mortem](https://blog.kyberswap.com/post-mortem-kyberswap-elastic-exploit/)). BlockSec's analysis of a transaction on its Phalcon links describes the same effect as liquidity being double-counted ([BlockSec](https://blocksec.com/blog/kyberswap-incident-masterful-exploitation-of-rounding-errors-with-exceedingly-subtle-calculations)). KyberSwap suspended liquidity additions on 13 networks, offered the exploiter a 10% bounty on chain, and later published the post-mortem on 2024-02-07. Days later the exploiter posted an on-chain message demanding control of the company ([The Block](https://www.theblock.co/post/265429/kyber-hacker-control-message)).

## Timeline (UTC)

Stages: **Flaw** (latent), **Take**, **Money**, **Response**. The post-mortem gives dates but no times of day. Sources differ on the attack date: the post-mortem says 2023-11-22, BlockSec says 2023-11-23.

| When | What happened | OAK |
|---|---|---|
| Before 2023-11-22 (undisclosed) | Elastic swap math contains the cross-tick estimation / final price discrepancy; post-mortem says prior audits did not identify it | **T9.016** |
| 2023-11-22 | Primary exploiter flash-borrows ETHx from Uniswap V3 (post-mortem) | T9.002 |
| 2023-11-22 | In pool [`0xcbec1e9407f1910c86f261eaeac27d85c0479e8c`](https://etherscan.io/address/0xcbec1e9407f1910c86f261eaeac27d85c0479e8c) the exploiter swaps ETHx for USDC to move the current tick to 305000, mints a position between ticks 305000 and 305408, removes part of it, then swaps 244,080,034,447,359,999,999 units; the computed price passes tick 305408 without the crossing being registered. Swapping USDC back extracts 493,638,353,608,983,793,765 ETHx; after repaying the loan the net profit is 32,359,711,420 USDC and 2,548,804,968,791,375,657 ETHx (post-mortem). Exploit tx [`0x396a83df7361519416a6dc960d394e689dd0f158095cbc6a6c387640716f5475`](https://etherscan.io/tx/0x396a83df7361519416a6dc960d394e689dd0f158095cbc6a6c387640716f5475) | **T9.016** |
| 2023-11-22/23 | Same class of drain on other Elastic deployments; BlockSec analyses a separate Ethereum transaction [`0x485e08dc2b6a4b3aeadcb89c3d18a37666dc7d9424961a2091d6b3696792f0f3`](https://etherscan.io/tx/0x485e08dc2b6a4b3aeadcb89c3d18a37666dc7d9424961a2091d6b3696792f0f3) against pool [`0xfd7b111aa83b9b6f547e617c7601efd997f64703`](https://etherscan.io/address/0xfd7b111aa83b9b6f547e617c7601efd997f64703) (frxETH/WETH) | **T9.016**, T9.002 |
| 2023-11-22 | Front-running bots and copycats take a further share, about \$6.56M in total (post-mortem) | T9.016 |
| 2023-11-22 onward | Post-mortem says the exploiters moved assets to several wallets across multiple networks within minutes; destinations beyond that undisclosed there | — |
| 2023-11-22/23 | Liquidity additions paused on 13 networks; users alerted on X, Telegram, Discord and the website; on-chain message offers a 10% bounty; only the operators of two front-run bots responded (post-mortem) | response |
| 2023-11-26 | About \$4.67M returned by the bot operators to KyberSwap's Polygon address ([The Block](https://www.theblock.co/post/264756/kyberswap-recovers-4-7-million-after-exploit)); post-mortem totals recovery at about \$5.17M including Avalanche | response |
| 2023-11-30 (article date) | Primary exploiter sends an on-chain message, tx [`0x0479da9d6a3a29b294d6337630ea0a482e7ec7223f3b6e6d72442f6c450264d4`](https://etherscan.io/tx/0x0479da9d6a3a29b294d6337630ea0a482e7ec7223f3b6e6d72442f6c450264d4), demanding control of the entity that operates Kyber and temporary control of KyberDAO governance, with a 2023-12-10 deadline ([The Block](https://www.theblock.co/post/265429/kyber-hacker-control-message)) | none — extortion demand, no OAK Technique fits |
| 2023-12-02 | KyberSwap announces treasury grants for users with unrecovered losses ([Cointelegraph](https://cointelegraph.com/news/kyberswap-hacker-bridges-stolen-funds)) | response |
| 2024-02-26 | Per PeckShield, relayed by Cointelegraph, the attacker's wallet bridges 798.8 ETH from Arbitrum to Ethereum; the article gives no full addresses | T7.003 |
| 2024-02-07 | Post-mortem published; says grants covering 100% of affected funds were distributed to applicants | response |

Key addresses (from the post-mortem, Exploiter 1 confirmed list, the primary exploiter):

- [`0x50275E0B7261559cE1644014d4b78D4AA63BE836`](https://etherscan.io/address/0x50275E0B7261559cE1644014d4b78D4AA63BE836)
- [`0xC9B826BAD20872EB29f9b1D8af4BefE8460b50c6`](https://etherscan.io/address/0xC9B826BAD20872EB29f9b1D8af4BefE8460b50c6)
- Front-run bot operator that returned funds ("Exploiter 2", confirmed) — [`0xae7e16cAa7a4d572FfF09924Bf077a89485850Cb`](https://etherscan.io/address/0xae7e16cAa7a4d572FfF09924Bf077a89485850Cb)
- The post-mortem lists further confirmed and suspected addresses for all five exploiter groups; they are not repeated here.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://blog.kyberswap.com/post-mortem-kyberswap-elastic-exploit/>; <https://blocksec.com/blog/kyberswap-incident-masterful-exploitation-of-rounding-errors-with-exceedingly-subtle-calculations>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** The operator's post-mortem describes the swap sequence, the double rounding error and the stale liquidity state. BlockSec independently attributes the flaw to the rounding direction of `deltaL` in `estimateIncrementalLiquidity` (`mulDivFloor` where rounding up was needed). The two descriptions differ in detail (cross-tick estimation versus reinvestment rounding); the post-mortem does not name a function. The post-mortem does not state the chain of the main exploit transaction; the linked transaction is on Etherscan.

## Public references

- KyberSwap, "KyberSwap Elastic Exploit Post Mortem and User Support with 100% Coverage via the Treasury Grant Program" (published 2024-02-07): <https://blog.kyberswap.com/post-mortem-kyberswap-elastic-exploit/>
- BlockSec, "KyberSwap Incident: Masterful Exploitation of Rounding Errors with Exceedingly Subtle Calculations": <https://blocksec.com/blog/kyberswap-incident-masterful-exploitation-of-rounding-errors-with-exceedingly-subtle-calculations>
- The Block, "KyberSwap recovers \$4.7 million after exploit" (2023-11-27): <https://www.theblock.co/post/264756/kyberswap-recovers-4-7-million-after-exploit>
- The Block, "KyberSwap hacker demands full control over Kyber in bizarre on-chain message" (2023-11-30): <https://www.theblock.co/post/265429/kyber-hacker-control-message>
- Cointelegraph, "KyberSwap hacker bridges stolen funds": <https://cointelegraph.com/news/kyberswap-hacker-bridges-stolen-funds>
