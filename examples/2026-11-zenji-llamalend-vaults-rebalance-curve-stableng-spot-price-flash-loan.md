# Zenji — a permissionless rebalance() valued and unwound the vault position through one Curve StableNG pool, so a flash-loan swap made it sell at a bad price — Zenji (ZenSats) leveraged LlamaLend vaults / Ethereum — 2026-11-08

**Loss:** **~\$4.9K** net to the attacker (DefimonAlerts: ~\$4.9K to ~\$4.95K; OAK's trace of the exploit transaction shows exactly **4,951.395279 USDT** sent to the attacker EOA). DefimonAlerts also says **~\$8.36K** was drained from the Curve pool; OAK did not verify that figure. Zenji has published no loss statement that OAK could find.

**OAK Techniques observed:** **OAK-T9.001** (Oracle / Price Manipulation, *primary*. The vault's `rebalance()` read the Curve crvUSD/USDT StableNG pool's own `get_virtual_price` and `calc_withdraw_one_coin` to value its StakeDAO Curve-LP position and its LTV/strategy-debt ratio, and then unwound through the same pool. The attacker skewed that pool with a flash-loan swap right before the call. See [`techniques/T9.001-oracle-price-manipulation.md`](../techniques/T9.001-oracle-price-manipulation.md)). **OAK-T9.002** (Flash-Loan-Enabled Exploit: 7,237,500 USDT flash-borrowed from Morpho and repaid in the same transaction; traced by OAK).

**Attribution:** **pseudonymous** (attacker EOA [`0x22161ac9d7cfeef020fa91f3eda41c75818a24f9`](https://etherscan.io/address/0x22161ac9d7cfeef020fa91f3eda41c75818a24f9); no one has attributed it to a named actor).

**Key teaching point:** **A rebalance that anyone can trigger must not take both its "is the position out of band" signal and its swap price floor from the pool it is about to trade in.** The `minOut` check reused the same manipulable pool quote, so it protected nothing. A price source the attacker cannot move inside one transaction (a time-weighted or independent oracle), or a caller allowlist on `rebalance()`, would have stopped the vault from selling collateral into a pool the attacker had just skewed. The loss is small, but the pattern is the same one that drains larger leveraged vaults.

## Summary

On 2026-11-08 at 16:40:23 UTC the attacker used one contract to flash-borrow 7,237,500 USDT from Morpho and swap it into the Curve crvUSD/USDT StableNG pool, which pushed the pool far off balance. In the same transaction it called the permissionless `rebalance()` on Zenji's leveraged LlamaLend vaults. The vaults read the skewed pool as "out of band", withdrew LP and sold crvUSD through that pool at a bad price. The attacker then swapped back, repaid Morpho and kept 4,951.395279 USDT. DefimonAlerts published the alert on 2026-11-09 at 07:28 UTC; RektRadar repeated it the same day. The patch status is not clear (see What is not known).

## Timeline (UTC)

Read it as four stages. **Flaw**: `rebalance()` is permissionless and trusts the pool it trades in. **Preparation**: none visible on chain; the attacker's own funding is undisclosed. **Take**: one flash-loan transaction skews the pool, forces both vaults to rebalance, then reverses the swap. **Money and response**: profit stays on the attacker EOA; alert and repository activity. The transaction time and transfers were traced by OAK on Ethereum; alert times are from the X post and GitHub.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-08 (since when: undisclosed) | The vaults `ZenjiWstEthLlamaUsdtStakeDao` [`0x23f189de34eed95f6303cff1c77f7676f211dd2c`](https://etherscan.io/address/0x23f189de34eed95f6303cff1c77f7676f211dd2c) and the WBTC vault [`0x18e2f4f2e6565187fce73ecc707579e5f7933f74`](https://etherscan.io/address/0x18e2f4f2e6565187fce73ecc707579e5f7933f74) expose a permissionless `rebalance()`. Per DefimonAlerts it values the StakeDAO Curve-LP strategy and the LTV/strategy-debt ratio from the crvUSD/USDT StableNG pool's `get_virtual_price` and `calc_withdraw_one_coin`, and unwinds through the same pool. | **T9.001** |
| 2026-11-08 16:40:23 | One transaction, [`0x79fa5b304186be7eaa19a59f57b82e1fa942afee92da45ae73afe27ee817d701`](https://etherscan.io/tx/0x79fa5b304186be7eaa19a59f57b82e1fa942afee92da45ae73afe27ee817d701), sent from the attacker EOA. The attack contract [`0xc5972e0854f0a999ee6f652faff7041a0213bad2`](https://etherscan.io/address/0xc5972e0854f0a999ee6f652faff7041a0213bad2) flash-borrows **7,237,500 USDT** from Morpho [`0xbbbbbbbbbb9cc5e90e3b3af64bdaf62c37eeffcb`](https://etherscan.io/address/0xbbbbbbbbbb9cc5e90e3b3af64bdaf62c37eeffcb). | **T9.002** |
| 2026-11-08 16:40:23 (same tx) | The contract swaps the 7,237,500 USDT into the Curve pool [`0x390f3595bca2df7d23783dfd126427cceb997bf4`](https://etherscan.io/address/0x390f3595bca2df7d23783dfd126427cceb997bf4) and receives **7,138,299.91163591 crvUSD**, leaving the pool heavily skewed. | **T9.001** |
| 2026-11-08 16:40:23 (same tx) | `rebalance()` runs on both vaults against the skewed pool. The transfer log shows the wstETH vault selling 283.0466159 crvUSD for 0.2086348 wstETH and the WBTC vault selling 3,277.06372904 crvUSD for 0.1010479 WBTC, after withdrawing StakeDAO LP (763.29 and 9,470.85 crvUSDUSDT-f respectively) and paying crvUSD into the pool. Per DefimonAlerts the swap floor reused the pool's own quote and gave no protection. | **T9.001** |
| 2026-11-08 16:40:23 (same tx) | The contract swaps the 7,138,299.91163591 crvUSD back and receives **7,242,451.395279 USDT**, repays Morpho 7,237,500 USDT and sends the remaining **4,951.395279 USDT** to the attacker EOA. | T9.001, T9.002 |
| 2026-11-08 16:10:50 | Commit [`df541b7`](https://github.com/NateBrune/ZenSats-contracts/commit/df541b7aeb21180bff5e3377cabff616430e0d40) lands in the ZenSats contracts repository: it makes the coverage-restoring swap arm of `rebalance` revert unless coverage returns inside the band. This is **30 minutes before** the exploit transaction, and its message does not mention an exploit, so it is not shown to be the fix for this attack. | response |
| 2026-11-09 07:28 | DefimonAlerts posts the alert ("Loss ~\$4.9K (2026-11-08)") with the transaction, attacker and victim links. | response |
| 2026-11-09 | RektRadar's daily brief repeats the alert and describes the commit as a patch published "shortly after the alert", which the commit time contradicts. | response |
| Not published | Pause of the vaults, a post-mortem, statement or refunds: undisclosed. | response |

Key addresses:

- Attacker EOA — [`0x22161ac9d7cfeef020fa91f3eda41c75818a24f9`](https://etherscan.io/address/0x22161ac9d7cfeef020fa91f3eda41c75818a24f9)
- Attack contract (flash-loan receiver) — [`0xc5972e0854f0a999ee6f652faff7041a0213bad2`](https://etherscan.io/address/0xc5972e0854f0a999ee6f652faff7041a0213bad2)
- Victim vault, wstETH / LlamaLend / USDT / StakeDAO — [`0x23f189de34eed95f6303cff1c77f7676f211dd2c`](https://etherscan.io/address/0x23f189de34eed95f6303cff1c77f7676f211dd2c)
- Victim vault, WBTC — [`0x18e2f4f2e6565187fce73ecc707579e5f7933f74`](https://etherscan.io/address/0x18e2f4f2e6565187fce73ecc707579e5f7933f74)
- Manipulated Curve crvUSD/USDT StableNG pool — [`0x390f3595bca2df7d23783dfd126427cceb997bf4`](https://etherscan.io/address/0x390f3595bca2df7d23783dfd126427cceb997bf4)
- Flash-loan source, Morpho — [`0xbbbbbbbbbb9cc5e90e3b3af64bdaf62c37eeffcb`](https://etherscan.io/address/0xbbbbbbbbbb9cc5e90e3b3af64bdaf62c37eeffcb)
- Funds' destination after the attacker EOA — not traced (see What is not known)

## Fund flow

Traced by OAK with `tools/explorer.py` on 2026-11-10 from the transfer log of the single exploit transaction. Every edge marked `verified: oak` was read from that log. Only the principal legs are listed; the vault-to-LP and gauge mint/burn transfers are omitted. The vault-to-pool edges are the crvUSD each vault paid into the pool. The attacker's later movements were not traced.

```oak-flow
as_of: 2026-11-10T12:00Z
nodes:
  - {id: atk, chain: ethereum, address: 0x22161ac9d7cfeef020fa91f3eda41c75818a24f9, role: attacker-eoa, label: "Attacker EOA"}
  - {id: exp, chain: ethereum, address: 0xc5972e0854f0a999ee6f652faff7041a0213bad2, role: attack-contract, label: "Attack contract"}
  - {id: mor, chain: ethereum, address: 0xbbbbbbbbbb9cc5e90e3b3af64bdaf62c37eeffcb, role: lending, label: "Morpho (flash loan)"}
  - {id: pool, chain: ethereum, address: 0x390f3595bca2df7d23783dfd126427cceb997bf4, role: intermediary, label: "Curve crvUSD/USDT StableNG pool"}
  - {id: v1, chain: ethereum, address: 0x23f189de34eed95f6303cff1c77f7676f211dd2c, role: vulnerable-contract, label: "Zenji wstETH vault"}
  - {id: v2, chain: ethereum, address: 0x18e2f4f2e6565187fce73ecc707579e5f7933f74, role: vulnerable-contract, label: "Zenji WBTC vault"}
edges:
  - {from: mor, to: exp, asset: USDT, amount: 7237500, tx: 0x79fa5b304186be7eaa19a59f57b82e1fa942afee92da45ae73afe27ee817d701, time: 2026-11-08T16:40:23Z, technique: T9.002, verified: oak}
  - {from: exp, to: pool, asset: USDT, amount: 7237500, tx: 0x79fa5b304186be7eaa19a59f57b82e1fa942afee92da45ae73afe27ee817d701, time: 2026-11-08T16:40:23Z, technique: T9.001, verified: oak}
  - {from: pool, to: exp, asset: crvUSD, amount: 7138299.91163591, tx: 0x79fa5b304186be7eaa19a59f57b82e1fa942afee92da45ae73afe27ee817d701, time: 2026-11-08T16:40:23Z, technique: T9.001, verified: oak}
  - {from: v1, to: pool, asset: crvUSD, amount: 283.0466159, tx: 0x79fa5b304186be7eaa19a59f57b82e1fa942afee92da45ae73afe27ee817d701, time: 2026-11-08T16:40:23Z, technique: T9.001, verified: oak}
  - {from: v2, to: pool, asset: crvUSD, amount: 3277.06372904, tx: 0x79fa5b304186be7eaa19a59f57b82e1fa942afee92da45ae73afe27ee817d701, time: 2026-11-08T16:40:23Z, technique: T9.001, verified: oak}
  - {from: exp, to: pool, asset: crvUSD, amount: 7138299.91163591, tx: 0x79fa5b304186be7eaa19a59f57b82e1fa942afee92da45ae73afe27ee817d701, time: 2026-11-08T16:40:23Z, technique: T9.001, verified: oak}
  - {from: pool, to: exp, asset: USDT, amount: 7242451.395279, tx: 0x79fa5b304186be7eaa19a59f57b82e1fa942afee92da45ae73afe27ee817d701, time: 2026-11-08T16:40:23Z, technique: T9.001, verified: oak}
  - {from: exp, to: mor, asset: USDT, amount: 7237500, tx: 0x79fa5b304186be7eaa19a59f57b82e1fa942afee92da45ae73afe27ee817d701, time: 2026-11-08T16:40:23Z, technique: T9.002, verified: oak}
  - {from: exp, to: atk, asset: USDT, amount: 4951.395279, tx: 0x79fa5b304186be7eaa19a59f57b82e1fa942afee92da45ae73afe27ee817d701, time: 2026-11-08T16:40:23Z, technique: T9.001, verified: oak}
```

What the trace adds beyond the sources:

- **Exact profit.** The final transfer sends 4,951.395279 USDT from the attack contract to the attacker EOA, which matches DefimonAlerts' "~\$4.95K".
- **Flash loan.** 7,237,500 USDT comes in from Morpho and the same amount goes back in the same transaction.
- **Pool round trip.** The pool pays out 7,138,299.91163591 crvUSD for the first swap and 7,242,451.395279 USDT for the reverse. The 4,951.395279 USDT difference over the loan is the attacker's gain; the vaults' crvUSD sales, made at the skewed price, fed the spread.
- **Both vaults hit.** The log shows each vault sending crvUSD into the pool during the same transaction: 283.0466159 from the wstETH vault and 3,277.06372904 from the WBTC vault.
- **Limits.** The attacker's USDT after the transaction, and any onward movement, were not traced. The \$8.36K pool-drain figure was not reproduced.

## Root-cause evidence

- **Technique:** OAK-T9.001
- **Source:** <https://x.com/DefimonAlerts/status/2119693714272497877>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** DefimonAlerts (2026-11-09) describes the mechanism in detail: permissionless `rebalance()`, valuation and unwind from the same StableNG pool, a flash-loaned skew, and a `minOut` that reuses the pool quote. OAK's own reading of the exploit transaction matches it: Morpho flash loan, a 7.2M USDT swap into the pool, both vaults paying crvUSD into the pool, the reverse swap and a 4,951.395279 USDT profit. This is third-party analysis of unverified contract code, and Zenji has not confirmed it, so it stays `reported`. The vault source was not reviewed by OAK.

## What is not known

- Zenji / ZenSats has published no post-mortem or statement that OAK could find. Whether the vaults were paused, whether depositors were made whole, and the vaults' total value at the time are undisclosed.
- Whether commit `df541b7` is a fix for this attack. It is timestamped 2026-11-08T16:10:50Z, before the exploit, and its message describes a different hardening. No later fix commit was identified.
- DefimonAlerts' "~\$8.36K drained from the Curve pool" and the split of loss between depositors and the pool's liquidity providers.
- Where the 4,951.395279 USDT went after the attacker EOA.

## Public references

- `[defimonzenji2026]` — DefimonAlerts on X, Zenji alert with transaction, attacker and victim (2026-11-09): <https://x.com/DefimonAlerts/status/2119693714272497877>
- `[rektradarzenji2026]` — RektRadar, Web3 Daily Exploits 9 Nov 2026 (2026-11-09): <https://www.rektradar.xyz/web3-daily-exploits-09-nov-2026-ankr-304k-bridge-zenji-5k-oracle/>
- `[zensatsrebalance2026]` — ZenSats contracts, commit `df541b7` "fix(rebalance): arm 3 must restore the coverage band" (2026-11-08): <https://github.com/NateBrune/ZenSats-contracts/commit/df541b7aeb21180bff5e3377cabff616430e0d40>
- `[oaktracezenji2026]` — OAK on-chain trace of the exploit transaction on Etherscan: <https://etherscan.io/tx/0x79fa5b304186be7eaa19a59f57b82e1fa942afee92da45ae73afe27ee817d701>
