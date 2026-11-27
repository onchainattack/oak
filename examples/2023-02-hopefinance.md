# Hope Finance — multisig re-points the swap router to a fake contract and drains the launch reward pool — Hope Finance / Arbitrum — 2023-02-20

**Loss:** **~\$1.86M** per CertiK and Rekt: 477 WETH plus 1,061,759 USDC went to the receiving address, laundered as 1,095 ETH ([CertiK](https://www.certik.com/resources/blog/1XPwR6BKCMjwmpI2G5PK5z-hope-finance); [Rekt](https://rekt.news/hope-finance-rekt)). Cointelegraph reported about \$2M stolen, of which \$1.86M went to Tornado Cash ([Cointelegraph](https://cointelegraph.com/news/hope-finance-exploit-results-in-2m-stolen-from-users-funds)). No recovery is reported in the opened pages.

**OAK Techniques observed:** **OAK-T5.005** (Treasury-Management Exit — *primary, closest available fit*). Three of the four multisig owners approved a `setRouter()` call that pointed the SwapHelper at an unverified router; CertiK concluded this makes an external key compromise unlikely and the multisig likely controlled by one person or a small group ([CertiK](https://www.certik.com/resources/blog/1XPwR6BKCMjwmpI2G5PK5z-hope-finance)). That is misuse of standing multisig authority rather than a code flaw, which is what the technique page describes; the technique page frames it around outflows presented as treasury spending, so the fit is by control surface. See [`techniques/T5.005-treasury-management-exit.md`](../techniques/T5.005-treasury-management-exit.md). **OAK-T7.003** (Cross-Chain Bridge Laundering — proceeds bridged to Ethereum through Celer; [CertiK](https://www.certik.com/resources/blog/1XPwR6BKCMjwmpI2G5PK5z-hope-finance)). **OAK-T7.001** (Mixer-Routed Hop — deposited into Tornado Cash).

**Attribution:** **unattributed.** Hope Finance's own Twitter account named one individual as the scammer and posted identity documents; CertiK could not verify this and said the accusation could be misdirection, and Rekt said it is impossible to know whether that person is responsible ([CertiK](https://www.certik.com/resources/blog/1XPwR6BKCMjwmpI2G5PK5z-hope-finance); [Rekt](https://rekt.news/hope-finance-rekt)). OAK does not name the person.

**Key teaching point:** **A multisig that can swap a swap-routing dependency by a single transaction is not a control on a launch pool.** The router change was approved by owners of the team's own multisig, so the only checks that could have stopped it are a timelock on router changes, a verified-source requirement for the new router, and signers who are independent of each other ([CertiK](https://www.certik.com/resources/blog/1XPwR6BKCMjwmpI2G5PK5z-hope-finance)).

## Summary

Hope Finance was an Arbitrum Tomb-fork whose GenesisRewardPool was drained shortly after its launch, which CertiK says was scheduled for 14:00 UTC on 2023-02-20 ([CertiK](https://www.certik.com/resources/blog/1XPwR6BKCMjwmpI2G5PK5z-hope-finance); [Rekt](https://rekt.news/hope-finance-rekt)). An unverified fake router was deployed, the multisig re-pointed the SwapHelper (TradingHelper) at it, the fake router was configured so the proceeds of `OpenTrade()` went to the attacker's receiving address, and `OpenTrade()` was called for the WETH pool and the USDC pool. The funds were swapped to 1,095 ETH, bridged to Ethereum with Celer and deposited into Tornado Cash ([CertiK](https://www.certik.com/resources/blog/1XPwR6BKCMjwmpI2G5PK5z-hope-finance); [Rekt](https://rekt.news/hope-finance-rekt)). CertiK flagged it and Hope Finance announced an exit scam on Twitter; Cointelegraph's report is dated 2023-02-21 ([Cointelegraph](https://cointelegraph.com/news/hope-finance-exploit-results-in-2m-stolen-from-users-funds)).

The sources disagree on small points. CertiK says three of four multisig owners confirmed the router change and that one approving wallet was then removed as an owner; Rekt says all three owners of the multisig approved it ([CertiK](https://www.certik.com/resources/blog/1XPwR6BKCMjwmpI2G5PK5z-hope-finance); [Rekt](https://rekt.news/hope-finance-rekt)). On the USDC path, Rekt says the `_uSDC` address was left empty, so USDC was sent to the attacker instead of being swapped; CertiK says the `_USDC` value was left blank ([Rekt](https://rekt.news/hope-finance-rekt); [CertiK](https://www.certik.com/resources/blog/1XPwR6BKCMjwmpI2G5PK5z-hope-finance)). Cointelegraph's description is shorter: CertiK told it the TradingHelper was changed so that calls to OpenTrade on the GenesisRewardPool sent funds to the scammer ([Cointelegraph](https://cointelegraph.com/news/hope-finance-exploit-results-in-2m-stolen-from-users-funds)). The audits: Cognitos passed the code despite flagging two major issues unrelated to the mechanism, and AuditRateTech appears to have deleted its report ([Rekt](https://rekt.news/hope-finance-rekt)).

## Timeline (UTC)

Sources give dates but not clock times except the scheduled launch; none are invented. Stages: **Flaw** → **Preparation** → **Execution** → **Money** → **Response**.

| When | What happened | OAK |
|---|---|---|
| Before 2023-02-20 | The team's four-owner multisig can change the SwapHelper's router with three confirmations; CertiK says this gave no real protection against centralisation ([CertiK](https://www.certik.com/resources/blog/1XPwR6BKCMjwmpI2G5PK5z-hope-finance)) | **T5.005** |
| Before 2023-02-20 (time undisclosed) | Attacker EOA [`0x4481a3539be6c2dedf7a71b77e93bf44b64a9113`](https://arbiscan.io/address/0x4481a3539be6c2dedf7a71b77e93bf44b64a9113) deploys the unverified fake router [`0x1994fb46ca626e0910a96705de3563f4e78c8caa`](https://arbiscan.io/address/0x1994fb46ca626e0910a96705de3563f4e78c8caa) ([CertiK](https://www.certik.com/resources/blog/1XPwR6BKCMjwmpI2G5PK5z-hope-finance)). Rekt gives only the deployment tx prefix `0xf188` | — |
| 2023-02-20 (before launch; time undisclosed) | Multisig-approved transaction [`0xc9ee5ed274a788f68a1e19852ccaadda7caa06e2070f80efd656a2882d6b77eb`](https://arbiscan.io/tx/0xc9ee5ed274a788f68a1e19852ccaadda7caa06e2070f80efd656a2882d6b77eb) updates the SwapHelper to the fake router ([Rekt](https://rekt.news/hope-finance-rekt)); CertiK describes this as a `setRouter()` call by the pool creator address | **T5.005** |
| 2023-02-20 (time undisclosed) | Configuration of the fake router so that the swap output address is the receiving address; CertiK links [`0x1b4753f761a8cd646c3072c1d983f9b857077a1dfdbbd75ecb0744e60f9b9e13`](https://arbiscan.io/tx/0x1b4753f761a8cd646c3072c1d983f9b857077a1dfdbbd75ecb0744e60f9b9e13) for the swap | **T5.005** |
| 2023-02-20 (time undisclosed) | `OpenTrade()` drains the GenesisRewardPool: WETH drain [`0x322044859fa8e000c300a193ee3cac98e029a2c64255de45249b8610858c0679`](https://arbiscan.io/tx/0x322044859fa8e000c300a193ee3cac98e029a2c64255de45249b8610858c0679) (477 WETH) and USDC drain [`0x98a6be8dce5b10b8e2a738972e297da4c689a1e77659cdfa982732c21fa34cb5`](https://arbiscan.io/tx/0x98a6be8dce5b10b8e2a738972e297da4c689a1e77659cdfa982732c21fa34cb5) ([Rekt](https://rekt.news/hope-finance-rekt)) | **T5.005** |
| 2023-02-20 onward (hashes undisclosed) | Swap to 1,095 ETH, bridge to Ethereum via Celer, deposit into Tornado Cash ([CertiK](https://www.certik.com/resources/blog/1XPwR6BKCMjwmpI2G5PK5z-hope-finance); [Rekt](https://rekt.news/hope-finance-rekt)) | **T7.003**, **T7.001** |
| 2023-02-20 to 2023-02-21 | CertiK detects the incident; Hope Finance announces an exit scam and posts emergency-withdraw instructions ([CertiK](https://www.certik.com/resources/blog/1XPwR6BKCMjwmpI2G5PK5z-hope-finance); [Cointelegraph](https://cointelegraph.com/news/hope-finance-exploit-results-in-2m-stolen-from-users-funds)) | response |

Key addresses:

- Attacker EOA and caller of `OpenTrade()` — [`0x4481a3539be6c2dedf7a71b77e93bf44b64a9113`](https://arbiscan.io/address/0x4481a3539be6c2dedf7a71b77e93bf44b64a9113) ([CertiK](https://www.certik.com/resources/blog/1XPwR6BKCMjwmpI2G5PK5z-hope-finance))
- Fake router — [`0x1994fb46ca626e0910a96705de3563f4e78c8caa`](https://arbiscan.io/address/0x1994fb46ca626e0910a96705de3563f4e78c8caa)
- Receiving address — [`0x957d354d853a1ff03dda608f3577d24ea18fcece`](https://arbiscan.io/address/0x957d354d853a1ff03dda608f3577d24ea18fcece) ([Rekt](https://rekt.news/hope-finance-rekt))
- Preparation address that created the pool — [`0xdfcb9a03fbe9f616ee6827cd1b753238d53c6145`](https://arbiscan.io/address/0xdfcb9a03fbe9f616ee6827cd1b753238d53c6145) ([Rekt](https://rekt.news/hope-finance-rekt))
- Hope Finance multisig — [`0x8ebd0574d37d77bdda1a40cdf3289c9770309aa7`](https://arbiscan.io/address/0x8ebd0574d37d77bdda1a40cdf3289c9770309aa7)
- GenesisRewardPool — [`0x1fc2ac2651e1959d9ae86c6b2270aaf3d799e56c`](https://arbiscan.io/address/0x1fc2ac2651e1959d9ae86c6b2270aaf3d799e56c) ([Rekt](https://rekt.news/hope-finance-rekt))

## Root-cause evidence

- **Technique:** OAK-T5.005 (closest fit; see above)
- **Source:** <https://www.certik.com/resources/blog/1XPwR6BKCMjwmpI2G5PK5z-hope-finance>; <https://rekt.news/hope-finance-rekt>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** CertiK and Rekt agree on the fake router, the multisig-approved re-pointing and the `OpenTrade()` drain, and give transactions. They differ on owner counts and variable names (above). Who held the multisig keys is not established.

## Public references

- CertiK, "Hope Finance" analysis: <https://www.certik.com/resources/blog/1XPwR6BKCMjwmpI2G5PK5z-hope-finance>
- Rekt, "Hope Finance - REKT" (2023-02-22): <https://rekt.news/hope-finance-rekt>
- Cointelegraph (2023-02-21): <https://cointelegraph.com/news/hope-finance-exploit-results-in-2m-stolen-from-users-funds>
