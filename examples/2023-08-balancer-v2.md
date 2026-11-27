# Balancer V2 boosted pools — linear-pool rounding-down inflated the cached token rate, drained days after a public warning — Balancer V2 / Ethereum, Optimism, Fantom — 2023-08-27

**Loss:** **>\$2.12M** across Ethereum, Optimism and Fantom (Balancer about \$1M, the Balancer fork Beethoven X about \$1.1M), per [BlockSec](https://blocksec.com/blog/tiny-rounding-down-big-fund-losses-an-in-depth-analysis-of-the-recent-balancer-incident). Press at the time reported less: nearly \$900,000, with the attacker address holding \$893,978 in DAI ([Cointelegraph](https://cointelegraph.com/news/balancer-exploited-900k-after-vulnerability-warning)), and \$979,000 in DAI across three transactions ([The Block](https://www.theblock.co/news/ecosystems/2023-08-28-balancer-vulnerability-exploit-247665)). Recovery: undisclosed in the opened sources.

**OAK Techniques observed:** **OAK-T9.011** (Precision-Loss Rounding Attack — *primary*). In the Linear Pool `onSwap`, when `amountOut` is small relative to the scaling factor, `_downscaleDown` rounds it to zero, so the pool keeps the input and pays nothing; this inflates the pool balance and, through `_updateTokenRateCache`, the boosted pool's cached rate ([BlockSec](https://blocksec.com/blog/tiny-rounding-down-big-fund-losses-an-in-depth-analysis-of-the-recent-balancer-incident)). BlockSec also names a second bug, a rate reset on zero supply, and argues both were needed. [Immunefi](https://immunefi.com/blog/bug-fix-reviews/balancer-rounding-error/) describes the same rounding error in `ERC4626LinearPools` combined with flash swaps. See [`techniques/T9.011-precision-loss-rounding-attack.md`](../techniques/T9.011-precision-loss-rounding-attack.md). **OAK-T9.002** (Flash-Loan-Enabled Exploit): the analysed attack borrowed 300,000 USDC from Aave ([BlockSec](https://blocksec.com/blog/tiny-rounding-down-big-fund-losses-an-in-depth-analysis-of-the-recent-balancer-incident)). The earlier version of this file filed the case under T9.005 (reentrancy); no opened source describes re-entry.

**Attribution:** **pseudonymous.** Address believed to belong to the attacker: [`0xB23711b9D92C0f1c7b211c4E2DC69791c2df38c1`](https://etherscan.io/address/0xB23711b9D92C0f1c7b211c4E2DC69791c2df38c1) ([Cointelegraph](https://cointelegraph.com/news/balancer-exploited-900k-after-vulnerability-warning)). BlockSec names a Fantom attacker, [`0x64e08fa89c2bae9f123cc8a293775f0e6cc86760`](https://ftmscan.com/address/0x64e08fa89c2bae9f123cc8a293775f0e6cc86760), and calls it an experienced repeat attacker.

**Key teaching point:** **Rounding direction in swap math must favour the pool on every path, and a pool that cannot be paused cannot be protected after a public warning.** Balancer said it was "unable to pause affected pools" ([Cointelegraph](https://cointelegraph.com/news/balancer-exploited-900k-after-vulnerability-warning)); the fix and the withdraw warning had to rely on users acting in time.

## Summary

A whitehat reported the bug through Immunefi on 2023-08-11, and Balancer paid a 1,000,000 USDC bounty ([Immunefi](https://immunefi.com/blog/bug-fix-reviews/balancer-rounding-error/)). On 2023-08-22 Balancer disclosed a critical vulnerability in boosted pools and told users to withdraw; about 1.4% of total assets (over \$5M) were then at risk, and by 2023-08-24 at least \$2.8M (0.42% of TVL) remained at risk ([Cointelegraph](https://cointelegraph.com/news/balancer-exploited-900k-after-vulnerability-warning)). The attacks began on 2023-08-27 ([BlockSec](https://blocksec.com/blog/tiny-rounding-down-big-fund-losses-an-in-depth-analysis-of-the-recent-balancer-incident)), and Balancer posted that mitigations had "drastically reduced risks" but it was unable to pause affected pools ([The Block](https://www.theblock.co/news/ecosystems/2023-08-28-balancer-vulnerability-exploit-247665)). Balancer published its post-mortem on 2023-09-14 ([Immunefi](https://immunefi.com/blog/bug-fix-reviews/balancer-rounding-error/)); it was not opened for this pass.

## Timeline (UTC)

Stages: **Flaw** (rounding in linear pools), **Preparation** (Fantom funds staged), **Take** (flash loan, batch swap), **Money** (DAI to attacker address), **Response** (warning, mitigation). Times of day are not on opened pages and are undisclosed.

| When | What happened | OAK |
|---|---|---|
| Before 2023-08-11 (undisclosed) | Linear Pool rounding-down and zero-supply rate reset exist in deployed boosted pools ([BlockSec](https://blocksec.com/blog/tiny-rounding-down-big-fund-losses-an-in-depth-analysis-of-the-recent-balancer-incident)) | **T9.011** |
| 2023-08-11 | Whitehat reports the bug via Immunefi ([Immunefi](https://immunefi.com/blog/bug-fix-reviews/balancer-rounding-error/)) | response |
| 2023-08-22 | Balancer discloses the vulnerability and recommends withdrawing from or migrating out of affected pools ([Cointelegraph](https://cointelegraph.com/news/balancer-exploited-900k-after-vulnerability-warning)) | response |
| About 163 days before the Fantom attack (exact date undisclosed) | Funds for the Fantom attack are prepared: [`0x576a7964941e36e08e1a75da2721566e7e859fb9dfafbaefae0a5f73bb612389`](https://ftmscan.com/tx/0x576a7964941e36e08e1a75da2721566e7e859fb9dfafbaefae0a5f73bb612389) ([BlockSec](https://blocksec.com/blog/tiny-rounding-down-big-fund-losses-an-in-depth-analysis-of-the-recent-balancer-incident)) | — |
| 2023-08-27 | Ethereum attack: flash-loans 300,000 USDC from Aave, drains aUSDC, runs a `batchSwap` across `bb-a-USDC` and `bb-a-USD`, redeems to DAI, USDC and USDT and repays; profit 114,324 DAI and 253,461 USDT. Analysed tx [`0x2a027c8b915c3737942f512fc5d26fd15752d0332353b3059de771a35a606c2d`](https://etherscan.io/tx/0x2a027c8b915c3737942f512fc5d26fd15752d0332353b3059de771a35a606c2d) ([BlockSec](https://blocksec.com/blog/tiny-rounding-down-big-fund-losses-an-in-depth-analysis-of-the-recent-balancer-incident)) | **T9.011**, T9.002 |
| 2023-08-27 | Same method on Optimism, tx [`0xbbd83630207dacc27d5608bd6c9bb2f9f5d45bcca8955ab58834cc154a2dabf6`](https://optimistic.etherscan.io/tx/0xbbd83630207dacc27d5608bd6c9bb2f9f5d45bcca8955ab58834cc154a2dabf6); Fantom, tx [`0x9388c13b5abeecb0a67159af60ca2a223293d587d12ba6b474480019b4440cab`](https://ftmscan.com/tx/0x9388c13b5abeecb0a67159af60ca2a223293d587d12ba6b474480019b4440cab); Beethoven X hit less than 12 hours after the first Balancer attack ([BlockSec](https://blocksec.com/blog/tiny-rounding-down-big-fund-losses-an-in-depth-analysis-of-the-recent-balancer-incident)) | **T9.011** |
| 2023-08-27 | Attacker address receives two DAI transfers of \$636,812 and \$257,527 ([Cointelegraph](https://cointelegraph.com/news/balancer-exploited-900k-after-vulnerability-warning)); onward movement undisclosed | — |
| 2023-08-27 | Balancer: aware of an exploit, mitigations reduced risk, unable to pause affected pools ([The Block](https://www.theblock.co/news/ecosystems/2023-08-28-balancer-vulnerability-exploit-247665)) | response |

Key addresses:

- Attacker (Ethereum, per Cointelegraph) — [`0xB23711b9D92C0f1c7b211c4E2DC69791c2df38c1`](https://etherscan.io/address/0xB23711b9D92C0f1c7b211c4E2DC69791c2df38c1)
- Fantom attacker (per BlockSec) — [`0x64e08fa89c2bae9f123cc8a293775f0e6cc86760`](https://ftmscan.com/address/0x64e08fa89c2bae9f123cc8a293775f0e6cc86760)
- Ethereum attack trace tx — [`0x945cd2720316a7b9b43d0099818dc9c38f882aafe3211bbf63474b4d22e58398`](https://etherscan.io/tx/0x945cd2720316a7b9b43d0099818dc9c38f882aafe3211bbf63474b4d22e58398)

## Root-cause evidence

- **Technique:** OAK-T9.011
- **Source:** <https://blocksec.com/blog/tiny-rounding-down-big-fund-losses-an-in-depth-analysis-of-the-recent-balancer-incident>; <https://immunefi.com/blog/bug-fix-reviews/balancer-rounding-error/>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** BlockSec traces the attack at function level (`onSwap`, `_downscaleDown`, `_updateTokenRateCache`); Immunefi independently describes a rounding error in `ERC4626LinearPools` plus flash swaps. Balancer's own post-mortem (2023-09-14) was not opened, so the operator's account is not yet checked against these.

## Public references

- BlockSec, "Tiny rounding down, big fund losses: an in-depth analysis of the recent Balancer incident" (2023-09-14): <https://blocksec.com/blog/tiny-rounding-down-big-fund-losses-an-in-depth-analysis-of-the-recent-balancer-incident>
- Immunefi, "Balancer Rounding Error Bugfix Review" (2023-10-12): <https://immunefi.com/blog/bug-fix-reviews/balancer-rounding-error/>
- Cointelegraph, "Balancer exploited for \$900K after vulnerability warning" (2023-08-27): <https://cointelegraph.com/news/balancer-exploited-900k-after-vulnerability-warning>
- The Block, "Balancer confirms exploit after previous warning of a vulnerability" (2023-08-28): <https://www.theblock.co/news/ecosystems/2023-08-28-balancer-vulnerability-exploit-247665>
