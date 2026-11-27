# Yearn iearn yUSDT — token contract wired to the Fulcrum iUSDC token instead of iUSDT, so a small deposit minted a huge supply of yUSDT — Yearn iearn legacy protocol / Ethereum — 2023-04-13

**Loss:** **~\$11.6M**, per [PeckShield as relayed by The Block](https://www.theblock.co/post/226134), which says this was PeckShield's latest estimate. [CertiK](https://www.certik.com/resources/blog/earnings-misconfigured-yearn-finance-exploit-explained) gives about \$10M and [Halborn](https://halborn.com/blog/post/explained-the-yearn-finance-hack-april-2023) about \$10M. The exploiter swapped the minted yUSDT for DAI, USDC, BUSD, TUSD and USDT, per [The Block](https://www.theblock.co/post/226134). Recovery: undisclosed in the opened sources.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*). The yUSDT contract was configured against the wrong underlying token, so its share accounting did not match what it held ([CertiK](https://www.certik.com/resources/blog/earnings-misconfigured-yearn-finance-exploit-explained)). See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md). **OAK-T7.001** (Mixer-Routed Hop — the attacker began withdrawing ETH through Tornado Cash, per [Decrypt](https://decrypt.co/126194/older-versions-of-aave-yearn-finance-exploited-11-6m)). The earlier version of this file also listed T9.002 (flash loan); no opened source says a flash loan was used, so it is dropped.

**Attribution:** **pseudonymous.** No opened source names or attributes the attacker; no attacker address is printed in any opened page.

**Key teaching point:** **A deprecated contract that still holds funds or can still mint is live attack surface, and its configuration needs the same review as a current one.** The yUSDT contract had been misconfigured since deployment about three years earlier ([The Block](https://www.theblock.co/post/226134)), and nothing was reviewing it.

## Summary

On 2023-04-13 an exploit hit yUSDT, the USDT token of Yearn's early "iearn" protocol ([Decrypt](https://decrypt.co/126194/older-versions-of-aave-yearn-finance-exploited-11-6m)). Researcher samczsun said yUSDT pointed at the Fulcrum iUSDC token instead of the iUSDT token ([The Block](https://www.theblock.co/post/226134)); [CertiK](https://www.certik.com/resources/blog/earnings-misconfigured-yearn-finance-exploit-explained) states the same ("the Fulcrum iUSDC token was used in place of the Fulcrum iUSDT token"). [PeckShield, relayed by The Block](https://www.theblock.co/post/226134), said the attacker minted 1.2 quadrillion yUSDT from roughly \$10,000. [Halborn](https://halborn.com/blog/post/explained-the-yearn-finance-hack-april-2023) describes the same deposit of 10,000 USDT and calls the wrong address a "copy-paste error". The attack used Aave V1 to carry out many swaps; Aave said V1 was not exploited ([The Block](https://www.theblock.co/post/226134), [Decrypt](https://decrypt.co/126194/older-versions-of-aave-yearn-finance-exploited-11-6m)). Yearn contributor Storm Blessed 0x said the issue seemed isolated to the iearn legacy protocol and liquidity pool, and that "Yearn v2 vaults seem not to be impacted" ([Decrypt](https://decrypt.co/126194/older-versions-of-aave-yearn-finance-exploited-11-6m)).

## Timeline (UTC)

Stages: **Flaw** (config wrong since deployment), **Take** (mint and swap out), **Money** (Tornado Cash), **Response** (Yearn statement). No opened source gives times of day or transaction hashes; those are undisclosed here.

| When | What happened | OAK |
|---|---|---|
| About 2020 (deployment) | yUSDT is deployed pointing at the Fulcrum iUSDC token instead of iUSDT; samczsun says it was broken "since deploy", over 1,000 days earlier ([Decrypt](https://decrypt.co/126194/older-versions-of-aave-yearn-finance-exploited-11-6m)) | **T9.016** |
| 2023-04-13 (time undisclosed) | The attacker deposits about \$10,000 and mints 1.2 quadrillion yUSDT, per PeckShield ([The Block](https://www.theblock.co/post/226134)). Transaction hashes undisclosed | **T9.016** |
| 2023-04-13 (time undisclosed) | The minted yUSDT is swapped for DAI, USDC, BUSD, TUSD and USDT, using Aave V1 for many of the swaps ([The Block](https://www.theblock.co/post/226134)) | **T9.016** |
| 2023-04-13 (time undisclosed) | The attacker begins withdrawing ETH through Tornado Cash; PeckShield reports 1,000 ETH (about \$1.9M) at the time of reporting ([Decrypt](https://decrypt.co/126194/older-versions-of-aave-yearn-finance-exploited-11-6m)) | T7.001 |
| 2023-04-13 | Yearn contributor says the issue looks isolated to the legacy iearn protocol and pool and that contributors are investigating ([Decrypt](https://decrypt.co/126194/older-versions-of-aave-yearn-finance-exploited-11-6m)) | response |

Key addresses:

- yUSDT contract (vulnerable) — [`0x83f798e925bcd4017eb265844fddabb448f1707d`](https://etherscan.io/address/0x83f798e925bcd4017eb265844fddabb448f1707d), printed by [CertiK](https://www.certik.com/resources/blog/earnings-misconfigured-yearn-finance-exploit-explained)
- Attacker addresses — undisclosed (none printed on an opened page)

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://www.certik.com/resources/blog/earnings-misconfigured-yearn-finance-exploit-explained>; <https://www.theblock.co/post/226134>; <https://decrypt.co/126194/older-versions-of-aave-yearn-finance-exploited-11-6m>; <https://halborn.com/blog/post/explained-the-yearn-finance-hack-april-2023>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** CertiK and Halborn independently describe the wrong underlying token (iUSDC for iUSDT) in the yUSDT contract; samczsun (via Decrypt and The Block) says the same. Yearn has not been seen by this pass to publish its own post-mortem, so the step from the misconfiguration to the minting calls is not documented at function level. The attacker's transactions are undisclosed in the opened pages.

## Public references

- The Block, "Exploit involving early version of Yearn Finance saw damages of \$11.6 million: PeckShield" (2023-04-13): <https://www.theblock.co/post/226134>
- Decrypt, "Older versions of Aave, Yearn Finance exploited for \$11.6M" (2023-04-13): <https://decrypt.co/126194/older-versions-of-aave-yearn-finance-exploited-11-6m>
- CertiK, "Earnings Misconfigured: Yearn.finance Exploit Explained": <https://www.certik.com/resources/blog/earnings-misconfigured-yearn-finance-exploit-explained>
- Halborn, "Explained: The Yearn Finance Hack (April 2023)" (2023-04-21): <https://halborn.com/blog/post/explained-the-yearn-finance-hack-april-2023>
