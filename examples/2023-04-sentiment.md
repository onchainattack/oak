# Sentiment — read-only reentrancy inflates a Balancer LP oracle price and drains lending pools — Sentiment / Arbitrum — 2023-04-04

**Loss:** **almost \$1M** in USDC, USDT, Bitcoin and Ether ([DL News](https://www.dlnews.com/articles/defi/arbitrum-defi-sentiment-hacker-recovery-bounty/)); Sentiment's post-mortem gives no total, only amounts: 461,000 USDC, 361,000 USDT, 81 WETH and 125,000 FRAX borrowed, and 580,000 USDC, 360,000 USDT and 80 WETH withdrawn ([Sentiment post-mortem](https://hackmd.io/@sentimentxyz/SJCySo1z2)). **Returned:** two transfers of 414 ETH (about \$771,000 per Cointelegraph) and 51.75 ETH to Sentiment's recovery address; Cointelegraph reports about \$870K, roughly 90%, recovered ([Cointelegraph](https://cointelegraph.com/news/sentiment-recovers-870k-after-negotiations-with-the-hacker)). Sentiment had \$2M of coverage from Sherlock ([DL News](https://www.dlnews.com/articles/defi/arbitrum-defi-sentiment-hacker-recovery-bounty/)).

**OAK Techniques observed:** **OAK-T9.010** (Read-Only Reentrancy — *primary*). The attacker called Balancer's `exitPool` asking for ETH. Balancer burns the LP tokens and sends ETH through a low-level `call()` before updating its internal balances. In that window Sentiment's `WeightedBalancerLPOracle.getPrice()` read a reduced `totalSupply()` against stale balances and priced the LP token far too high; because `getPrice()` was a `view` function it could not carry a reentrancy guard ([Sentiment post-mortem](https://hackmd.io/@sentimentxyz/SJCySo1z2)). See [`techniques/T9.010-read-only-reentrancy.md`](../techniques/T9.010-read-only-reentrancy.md). **OAK-T9.002** (Flash-Loan-Enabled Exploit — the position was funded with an Aave v3 flash loan; [post-mortem](https://hackmd.io/@sentimentxyz/SJCySo1z2)). **OAK-T7.003** (Cross-Chain Bridge Laundering — the attacker converted proceeds to Ether and bridged them from Arbitrum to Ethereum mainnet; [DL News](https://www.dlnews.com/articles/defi/arbitrum-defi-sentiment-hacker-recovery-bounty/)).

**Attribution:** **unattributed** — the post-mortem lists an attacker EOA and contract, but no source names a person ([post-mortem](https://hackmd.io/@sentimentxyz/SJCySo1z2)).

**Key teaching point:** **A protocol that prices collateral from another protocol's pool state must check that pool is not mid-operation before it reads.** Sentiment's fix made `getPrice()` state-mutating and added a `checkReentrancy()` call that makes a no-op `manageUserBalance` call to the Balancer Vault, which reverts if the Vault's reentrancy lock is active ([post-mortem](https://hackmd.io/@sentimentxyz/SJCySo1z2)).

## Summary

At 17:50 UTC on 2023-04-04 an attacker contract took an Aave v3 flash loan of 606 WBTC, 10,050.1 WETH and 18,000,000 USDC, opened a Sentiment account, and deposited 50 WETH into a Balancer 33/33/33 WETH-WBTC-USDC pool for 221.214516 LP tokens, then added the rest of the loan to the pool for about 130,600.98 LP tokens. It then called `exitPool` requesting ETH instead of WETH. When the ETH transfer handed control to the attacker's contract, the LP tokens were already burned but the pool balances were not updated, and the oracle price rose from about 0.220 ETH to about 3.55 ETH per LP token. Against that inflated collateral the attacker borrowed from Sentiment's lending pools, swapped 120,000 FRAX for about 119,949 USDC to help repay the loan, withdrew from the Sentiment account, repaid the flash loan and moved the rest to its EOA ([Sentiment post-mortem](https://hackmd.io/@sentimentxyz/SJCySo1z2); Halborn's shorter description of the same steps: [Halborn](https://www.halborn.com/blog/post/explained-the-sentiment-hack-march-2023)).

Sentiment identified the issue at 18:00 UTC, mitigated it at 19:26 UTC and resolved it at 04:35 UTC on 2023-04-05. It left an on-chain message offering a 10% bounty ($95,000) if the funds were returned by 08:00 UTC on 2023-04-06 ([DL News](https://www.dlnews.com/articles/defi/arbitrum-defi-sentiment-hacker-recovery-bounty/)). The attacker returned funds in two ETH transfers ([Cointelegraph](https://cointelegraph.com/news/sentiment-recovers-870k-after-negotiations-with-the-hacker)). The date the returns were made is undisclosed in the opened pages beyond Cointelegraph's publication on 2023-04-06.

## Timeline (UTC)

Times are from Sentiment's post-mortem unless a row cites another source. Stages: **Flaw** → **Take** → **Money** → **Response**.

| When | What happened | OAK |
|---|---|---|
| Before 2023-04-04 | `WeightedBalancerLPOracle.getPrice()` is a `view` function that reads Balancer pool state without a reentrancy-context check ([post-mortem](https://hackmd.io/@sentimentxyz/SJCySo1z2)). DL News reports the bug class was found over a year earlier by ChainSecurity ([DL News](https://www.dlnews.com/articles/defi/arbitrum-defi-sentiment-hacker-recovery-bounty/)) | **T9.010** |
| 2023-04-04 17:50 | Exploit transaction [`0xa9ff2b587e2741575daf893864710a5cbb44bb64ccdc487a100fa20741e0f74d`](https://arbiscan.io/tx/0xa9ff2b587e2741575daf893864710a5cbb44bb64ccdc487a100fa20741e0f74d): Aave v3 flash loan, LP deposit, `exitPool` for ETH, borrow against the inflated price, repay | **T9.002**, **T9.010** |
| 2023-04-04 (after the exploit; time undisclosed) | Proceeds moved to the attacker EOA ([post-mortem](https://hackmd.io/@sentimentxyz/SJCySo1z2)); funds converted to Ether and bridged from Arbitrum to Ethereum ([DL News](https://www.dlnews.com/articles/defi/arbitrum-defi-sentiment-hacker-recovery-bounty/)). Bridge, and the exact time, undisclosed | **T7.003** |
| 2023-04-04 18:00 | Sentiment identifies the issue | response |
| 2023-04-04 19:26 | Mitigation transaction [`0xbeedfeb88f2d83eb9e26f586bf6001c29627202cd539ca93e99f1bd11d61ac25`](https://arbiscan.io/tx/0xbeedfeb88f2d83eb9e26f586bf6001c29627202cd539ca93e99f1bd11d61ac25) | response |
| By 2023-04-05 12:14 (time undisclosed) | On-chain bounty message in [`0x464c4d204a63c251033791ae631a435be3133301a9675fcd9cc0f6a383d432a1`](https://etherscan.io/tx/0x464c4d204a63c251033791ae631a435be3133301a9675fcd9cc0f6a383d432a1): 10% (\$95,000) for return by 08:00 UTC on 2023-04-06; the same amount to anyone who helps find and prosecute the thief ([DL News](https://www.dlnews.com/articles/defi/arbitrum-defi-sentiment-hacker-recovery-bounty/)) | response |
| 2023-04-05 04:35 | Resolution transaction [`0xfa324fb23cdac4b94f3dfb0071bc3075cde29917178753a720ef7905a21cc0e7`](https://arbiscan.io/tx/0xfa324fb23cdac4b94f3dfb0071bc3075cde29917178753a720ef7905a21cc0e7) deploys the modified oracle | response |
| By 2023-04-06 (transaction hashes undisclosed) | Attacker returns 414 ETH and then 51.75 ETH to Sentiment's recovery address ([Cointelegraph](https://cointelegraph.com/news/sentiment-recovers-870k-after-negotiations-with-the-hacker)) | response |

Key addresses (from the [Sentiment post-mortem](https://hackmd.io/@sentimentxyz/SJCySo1z2)):

- Attacker EOA — [`0xdd0cdb4c3b887bc533957bc32463977e432e49c3`](https://arbiscan.io/address/0xdd0cdb4c3b887bc533957bc32463977e432e49c3)
- Attacker contract — [`0x9f626F5941FAfe0A5b839907d77fbBD5d0deA9D0`](https://arbiscan.io/address/0x9f626F5941FAfe0A5b839907d77fbBD5d0deA9D0)
- Sentiment account used by the attacker — [`0xdf346f8d160424c79cb8e8b49b13dd0ca61c3b8c`](https://arbiscan.io/address/0xdf346f8d160424c79cb8e8b49b13dd0ca61c3b8c)
- Modified Balancer oracle (the fix) — [`0xC0Fc3193Bf2176D1DA6D2F24C14996766f46eB67`](https://arbiscan.io/address/0xC0Fc3193Bf2176D1DA6D2F24C14996766f46eB67)

## Root-cause evidence

- **Technique:** OAK-T9.010
- **Source:** <https://hackmd.io/@sentimentxyz/SJCySo1z2>; <https://www.halborn.com/blog/post/explained-the-sentiment-hack-march-2023>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** The operator's post-mortem names the function, the Balancer behaviour (burn, then `call()`, then balance update) and the oracle price change, and links the transactions. Halborn independently describes the same `exitPool` callback sequence. Cointelegraph noted on 2023-04-06 that some analysts still suggested a re-entry attack and others a bug; the post-mortem settles it as view-only reentrancy.

## Public references

- Sentiment, post-mortem: <https://hackmd.io/@sentimentxyz/SJCySo1z2>
- Halborn, "Explained: The Sentiment Hack (March 2023)": <https://www.halborn.com/blog/post/explained-the-sentiment-hack-march-2023>
- DL News (2023-04-05): <https://www.dlnews.com/articles/defi/arbitrum-defi-sentiment-hacker-recovery-bounty/>
- Cointelegraph (2023-04-06): <https://cointelegraph.com/news/sentiment-recovers-870k-after-negotiations-with-the-hacker>
