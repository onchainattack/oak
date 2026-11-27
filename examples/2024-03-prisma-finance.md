# Prisma Finance — unvalidated flash-loan callback input in MigrateTroveZap let attackers reopen other users' troves with less collateral — Prisma / Ethereum — 2024-03-28

**Loss:** sources differ. **3,479.24 ETH (about $12M)** per Prisma's [post-mortem](https://hackmd.io/@PrismaRisk/PostMortem0328) (its own proceeds table lists 3,395.88 ETH plus 52.32 wstETH, so its totals do not fully reconcile); **about $11.6M** per [Rekt](https://rekt.news/prismafi-rekt), which counts 3,258 wstETH; **about $12.3M** per [CertiK](https://www.certik.com/resources/blog/prisma-finance-incident-analysis), of which the primary attacker accounts for about $11.6M and two copycat wallets for over $700,000. Return: **not confirmed.** One receiving address left an on-chain message calling itself a white-hat rescue ([Rekt](https://rekt.news/prismafi-rekt)); CertiK says no bounty was confirmed at time of writing ([CertiK](https://www.certik.com/resources/blog/prisma-finance-incident-analysis)).

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*; the flaw is insufficient input validation in `onFlashloan()` of `MigrateTroveZap`, which acted on troves whose owners had approved the zap, using attacker-supplied data ([Prisma post-mortem](https://hackmd.io/@PrismaRisk/PostMortem0328))). See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md). **OAK-T9.002** (Flash-Loan-Enabled Exploit — the attacker called the debt token's flash loan directly with crafted input instead of the `migrateTrove()` path ([Prisma post-mortem](https://hackmd.io/@PrismaRisk/PostMortem0328), [CertiK](https://www.certik.com/resources/blog/prisma-finance-incident-analysis))). **OAK-T7.001** (Mixer-Routed Hop — CertiK says the primary attacker sent 1,850 ETH to Tornado Cash ([CertiK](https://www.certik.com/resources/blog/prisma-finance-incident-analysis))).

**Attribution:** **pseudonymous.** Three exploiter EOAs; Exploiter 1 is primary, Exploiters 2 and 3 copied it ([Prisma post-mortem](https://hackmd.io/@PrismaRisk/PostMortem0328)). Exploiter 1's wallet was funded via FixedFloat ([Prisma post-mortem](https://hackmd.io/@PrismaRisk/PostMortem0328)). No named actor.

**Key teaching point:** **Any callback reachable through a public function (here a flash loan that any user can trigger by paying a fee) must authenticate who initiated it and re-check that the migrated position's collateral and debt match the position it replaces.** Prisma's post-mortem attributes the root cause to calling `flashloan()` directly and to the contract allowing a collateral mismatch between the old and new positions ([Prisma post-mortem](https://hackmd.io/@PrismaRisk/PostMortem0328)). It also warns that open zap approvals stay exposed to the issue after unpausing.

## Summary

`MigrateTroveZap` moves a user's trove between TroveManagers. On 2024-03-28 the exploiter skipped the migrate function and called the flash loan directly with crafted data, so `onFlashloan()` ran without proper checks ([Prisma post-mortem](https://hackmd.io/@PrismaRisk/PostMortem0328)). A victim trove was closed and reopened in the same TroveManager with the same debt but less collateral; in the example transaction a trove with 1,745.08 wstETH and 1,442,100 mkUSD debt came back with 463.18 wstETH and 1,443,398 mkUSD, and the difference stayed in the zap ([Prisma post-mortem](https://hackmd.io/@PrismaRisk/PostMortem0328)). The exploiter then opened a small trove, migrated it through the zap to absorb the leftover collateral, closed it and kept the proceeds ([Prisma post-mortem](https://hackmd.io/@PrismaRisk/PostMortem0328), [CertiK](https://www.certik.com/resources/blog/prisma-finance-incident-analysis)). The victim had approved the zap five days earlier ([Rekt](https://rekt.news/prismafi-rekt)). The emergency multisig paused the protocol at 12:51 UTC and users were told to revoke approvals ([Prisma post-mortem](https://hackmd.io/@PrismaRisk/PostMortem0328)).

## Timeline (UTC)

Stages: **Flaw** → **Preparation** → **Take** → **Money** → **Response**. Times are 2024-03-28 from the [Prisma post-mortem](https://hackmd.io/@PrismaRisk/PostMortem0328).

| When | What happened | OAK |
|---|---|---|
| Before 2024-03-28 | `MigrateTroveZap` deployed with an unvalidated `onFlashloan()` callback; victims had granted it approval (one victim approved five days earlier per [Rekt](https://rekt.news/prismafi-rekt)) | **T9.004** |
| 11:15 | Exploiter 1 wallet funded via FixedFloat: [`0xe55bd15d2bd17c0a97356f612480887df91bc483f6affae8edd06a6d08b60f53`](https://etherscan.io/tx/0xe55bd15d2bd17c0a97356f612480887df91bc483f6affae8edd06a6d08b60f53) | — |
| 11:22 | Exploiter 1 contract deployed: [`0x1319a80286b9c229a2d7566e21d7476b792956e4b59ee00d26449b6b77f2bcd0`](https://etherscan.io/tx/0x1319a80286b9c229a2d7566e21d7476b792956e4b59ee00d26449b6b77f2bcd0) | — |
| 11:25 | Exploiter 1 starts the exploit: [`0x00c503b595946bccaea3d58025b5f9b3726177bbdc9674e634244135282116c7`](https://etherscan.io/tx/0x00c503b595946bccaea3d58025b5f9b3726177bbdc9674e634244135282116c7) | **T9.004**, **T9.002** |
| 11:29 / 11:51 | Community member alerts Prisma on Discord; Prisma announces a potential incident on Twitter | response |
| 12:11 | Users advised to revoke delegate approval | response |
| 12:41 | Exploiter 2 first transaction: [`0xce3cdc7c29eb7dfc565f5d99034789e80c1cd3278adafa26af6f3d21c8412c59`](https://etherscan.io/tx/0xce3cdc7c29eb7dfc565f5d99034789e80c1cd3278adafa26af6f3d21c8412c59) | T9.004 |
| 12:49 | Exploiter 3 first transaction: [`0x0e38dd693ddbc2f62282932f36a4b8de75f8ea1da530532af26698b4eda9a110`](https://etherscan.io/tx/0x0e38dd693ddbc2f62282932f36a4b8de75f8ea1da530532af26698b4eda9a110) | T9.004 |
| 12:51 | Emergency multisig calls `Paused()`: [`0x1a35836eec322195046387fd0aa43f945aa484c062b8b1442166db6860d733ae`](https://etherscan.io/tx/0x1a35836eec322195046387fd0aa43f945aa484c062b8b1442166db6860d733ae) | response |
| Same day (times undisclosed) | Exploiter 1 proceeds to three wallets: 757.69 ETH ([`0x699095a9d3858a40ed3a0ea75f2ecd378f0abd69332abcc46e929ad284e9f4a3`](https://etherscan.io/tx/0x699095a9d3858a40ed3a0ea75f2ecd378f0abd69332abcc46e929ad284e9f4a3)), 1,500 ETH ([`0xca1ade2aa1b65b04b9c7de8a48c49ecfd9ea0bc930a671ba7c6663798bb6aaf1`](https://etherscan.io/tx/0xca1ade2aa1b65b04b9c7de8a48c49ecfd9ea0bc930a671ba7c6663798bb6aaf1)), 1,000 ETH ([`0x8bf9483e958e823a48fda42635851e7bab53e5142825c1f63d2c6d096db41c23`](https://etherscan.io/tx/0x8bf9483e958e823a48fda42635851e7bab53e5142825c1f63d2c6d096db41c23)); Exploiter 2 138.19 ETH ([`0x632847f8bdf3721d9b866052c36191d79c6e07240bd7368a0f427260d2f5dd2b`](https://etherscan.io/tx/0x632847f8bdf3721d9b866052c36191d79c6e07240bd7368a0f427260d2f5dd2b)); Exploiter 3 52.32 wstETH ([`0xd3bf99b6b4f201ae5724f1c3ef181f695893d41f38434758c6d1fcb556213ca9`](https://etherscan.io/tx/0xd3bf99b6b4f201ae5724f1c3ef181f695893d41f38434758c6d1fcb556213ca9)) ([post-mortem](https://hackmd.io/@PrismaRisk/PostMortem0328)) | — |
| After the drain (times undisclosed) | CertiK: 1,850 ETH (about $6.5M) sent to Tornado Cash; the two copycat wallets withdrew from Tornado Cash ([CertiK](https://www.certik.com/resources/blog/prisma-finance-incident-analysis)) | T7.001 |
| After the drain | White-hat-rescue on-chain message: [`0xc2825fd6dd05e8ec9f271d63efdebd06e78296afc0813c65788790567916d209`](https://etherscan.io/tx/0xc2825fd6dd05e8ec9f271d63efdebd06e78296afc0813c65788790567916d209) ([Rekt](https://rekt.news/prismafi-rekt)) | response |

Key addresses (printed in full by the [post-mortem](https://hackmd.io/@PrismaRisk/PostMortem0328) unless noted):

- Exploiter 1 EOA — [`0x7E39E3B3ff7ADef2613d5Cc49558EAB74B9a4202`](https://etherscan.io/address/0x7E39E3B3ff7ADef2613d5Cc49558EAB74B9a4202)
- Exploiter 1 contract — [`0xd996073019c74b2fb94ead236e32032405bc027c`](https://etherscan.io/address/0xd996073019c74b2fb94ead236e32032405bc027c)
- Exploiter 2 EOA — [`0x7Fe83f45e0f53651b3ED9650d2a2C67D8855e385`](https://etherscan.io/address/0x7Fe83f45e0f53651b3ED9650d2a2C67D8855e385); contract [`0x4148310fe4544e82f176570C6c7B649290a90E17`](https://etherscan.io/address/0x4148310fe4544e82f176570C6c7B649290a90E17)
- Exploiter 3 EOA — [`0x7C9FC6E2B908e858F30c5c71a20273315Efd5cf8`](https://etherscan.io/address/0x7C9FC6E2B908e858F30c5c71a20273315Efd5cf8); contract [`0x1b8A9F9F5a1d9cB1C28D9120F9c2bD073ccfAC04`](https://etherscan.io/address/0x1b8A9F9F5a1d9cB1C28D9120F9c2bD073ccfAC04)
- Exploiter 1 receiving wallets — [`0x2d413803a6eC3Cb1ed1a93BF90608f63b157507a`](https://etherscan.io/address/0x2d413803a6eC3Cb1ed1a93BF90608f63b157507a), [`0x57f7033F84894770F876bf64772E7EBA48990D65`](https://etherscan.io/address/0x57f7033F84894770F876bf64772E7EBA48990D65), [`0x5d0064f3B54C8899Ab797445551058Be460C03C6`](https://etherscan.io/address/0x5d0064f3B54C8899Ab797445551058Be460C03C6)
- MigrateTroveZap (mkUSD) — [`0xcC7218100da61441905e0c327749972e3CBee9EE`](https://etherscan.io/address/0xcC7218100da61441905e0c327749972e3CBee9EE); (ULTRA) [`0xC3eAf094e2586965244aB6534f6Dc69c6C16b5D5`](https://etherscan.io/address/0xC3eAf094e2586965244aB6534f6Dc69c6C16b5D5)
- Example victim trove owner — [`0x56A201b872B50bBdEe0021ed4D1bb36359D291ED`](https://etherscan.io/address/0x56A201b872B50bBdEe0021ed4D1bb36359D291ED)
- Prisma emergency multisig — [`0x7A28A80DcE1733944Db5dC50dc2c5147eC993C5A`](https://etherscan.io/address/0x7A28A80DcE1733944Db5dC50dc2c5147eC993C5A)

## Root-cause evidence

- **Technique:** OAK-T9.004
- **Source:** <https://hackmd.io/@PrismaRisk/PostMortem0328>; <https://rekt.news/prismafi-rekt>; <https://www.certik.com/resources/blog/prisma-finance-incident-analysis>
- **Source type:** operator
- **Confidence:** corroborated
- **Evidence:** The operator post-mortem, Rekt (citing ExVul) and CertiK all place the flaw in missing validation of `onFlashloan()` data in `MigrateTroveZap`. Rekt and CertiK differ on loss and on the stranded collateral (about 1,282 vs 1,281 wstETH, a gap CertiK itself flags). The post-mortem gives no code fix or reimbursement plan.

## Public references

- Prisma Risk, post-mortem of 2024-03-28: <https://hackmd.io/@PrismaRisk/PostMortem0328>
- Rekt, "PrismaFi - REKT" (2024-03-28): <https://rekt.news/prismafi-rekt>
- CertiK, "Prisma Finance Incident Analysis": <https://www.certik.com/resources/blog/prisma-finance-incident-analysis>
