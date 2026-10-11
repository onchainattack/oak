# 2021–2024 Rekt.Uncovered Incidents Cohort

**OAK Techniques observed:** OAK-T9.001, OAK-T9.002, OAK-T9.004, OAK-T9.007, OAK-T9.011, OAK-T5.003, OAK-T5.005, OAK-T10.002, OAK-T11.001
**Attribution:** **unattributed** (aggregate cohort of 21 incidents by multiple operators).

**Corrected 2026-10-11:** Anyswap mechanism (ECDSA nonce reuse, not forged-signature acceptance), MonoX mechanism (same-asset swap, not a vDIN loop), Bondly (wallet compromised, no deployer-key claim), aggregate totals (recomputed from the table), and the BSC-dominance claim were fixed.

**Loss:** Aggregate ~\$153.2M (sum of the per-incident figures in the table below, as listed on the rekt.news leaderboard `[rektlb]`) across 21 incidents spanning 2021–2024, distributed across Ethereum, BSC, Polygon, Arbitrum, RSK, Terra, xDai, and Base. Individual losses range from \$330K (Merlin Labs) to \$31.4M (MonoX) `[rektlb]`. The 2021 batch accounts for ~\$103.5M (about 68% of aggregate); the largest 2021 items are MonoX (\$31.4M, Polygon/Ethereum) and XToken (\$24M, Ethereum), with BSC projects (bEarn, Autoshark, BurgerSwap, Merlin Labs, Levyathan) summing to ~\$27.8M. The 2022–2024 batch (~\$49.7M) reflects more varied exploit surfaces on mainnet protocols.

**Key teaching point:** These 21 incidents complete the 2020–2024 rekt.news leaderboard coverage. The 2021 batch includes a cluster of BSC projects (bEarn, Autoshark, BurgerSwap, Merlin Labs) exploited in the two weeks of 2021-05-17 to 2021-05-29 per the leaderboard dates `[rektlb]`; the earlier characterisation of them as PancakeBunny derivatives was unsourced and is removed. The 2022–2024 batch shifts toward mainnet protocols with more varied exploit surfaces: contract upgrade regressions (Astroport, Unizen), context-verification bypasses (Superfluid), parameter-ordering authorization breaks (Deus DAO), and collateral-minting logic flaws (Shezmu). Several of these (Astroport, Deus DAO, Merlin Labs) were third-exploit-on-same-protocol cases — the structural signal is that a previously exploited protocol has elevated re-exploit probability.

## Summary

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2021-05-12 | XToken: flash-loan-enabled exploit of xSNXa and xBNT wrapper contracts; $24M via manipulated price oracle feeding the wrapper's mint/redeem logic | **T9.002** |
| 2021-05-17 | bEarn Fi: BSC flash-loan vault-share manipulation; $18M via PancakeSwap BNB/BUSD price manipulation feeding bVault strategy contracts | **T9.002** |
| 2021-05-24 | Autoshark: PancakeBunny-fork flash-loan exploit on BSC; $745K via SHARK/WBNB pool price manipulation in yield-compounding vault | **T9.002** |
| 2021-05-28 | BurgerSwap: BSC DEX pair-manipulation attack; $7.2M via fake token deployed to manipulate swap math and drain paired assets | **T9.002** |
| 2021-06-16 | Alchemix: alETH vault debt-assignment accounting bug on Ethereum; $6.5M — ETH deposited as collateral for alETH minting had debt set to zero, allowing collateral withdrawal without repayment | **T9.004** |
| 2021-06-29 | Merlin Labs (3rd exploit): third BSC exploit in rapid succession; $330K via remaining vulnerability in staking/compounding contract after two prior patches | **T9.004** |
| 2021-07-10 | Anyswap (later Multichain): prototype V3 Router used ECDSA for its MPC wallet and reused the signing nonce (k value) across two signatures, letting the attacker derive the private key; $7.9M in stablecoins `[rektanyswap]` | **T10.002** (mapping questionable: key recovery via nonce reuse, closer to a key-compromise class) |
| 2021-07-15 | Bondly Finance: infinite-mint exploit; $5.9M profit — 373M BONDLY minted and dumped in 100,000 batches; Bondly said a wallet was compromised by an unknown party `[rektbondly]` | **T11.001** + **T5.003** |
| 2021-07-30 | Levyathan Finance: BSC yield aggregator validation gap; $1.5M via basic contract-logic errors in strategy/vault interaction on unaudited BSC fork | **T9.004** |
| 2021-11-30 | MonoX Finance: single-sided AMM price manipulation on Polygon; \$31.4M (~\$19.4M Polygon, ~\$12M Ethereum): the swap code had no check against using the same asset as input and output, so repeated swaps inflated the MONO price and the overvalued MONO drained the other pool assets `[rektmonox]` | **T9.001** |
| 2022-02-08 | Superfluid: host-contract ctx verification bypass on Ethereum/xDai; $8.7M via calldata injection in `deleteAnyFlowBad` — isCtxValid enforced only on SuperApp callbacks not host-trusted data | **T10.002** |
| 2022-10-04 | Sovryn: RSK Bitcoin-sidechain lending-contract logic flaw; $1.1M via collateral-accounting contract allowing withdrawal without proper backing | **T9.004** |
| 2022-10-11 | TempleDAO: missing `oldStaking` parameter validation in `StaxLPStaking.migrateStake()` on Ethereum; $2.3M via attacker-supplied malicious staking contract address | **T9.004** |
| 2023-02-17 | Dexible: missing caller authorization in `selfSwap()` on Arbitrum/Ethereum; $2M via crafted calldata draining any user who had approved the Dexible contract | **T9.004** |
| 2023-05-05 | Deus DAO (3rd exploit): `burnFrom` parameter-ordering authorization break on Arbitrum/BSC/Ethereum; $6.5M via transposed msgSender/account arguments in `_allowances` array enabling unauthorized burn on any DEI approver | **T9.004** |
| 2024-03-08 | Unizen: contract-upgrade unverified external call on Ethereum; $2.1M via gas-optimization upgrade introducing call path without target/calldata verification | **T9.004** |
| 2024-03-28 | Prisma Finance: migration-contract flash-loan accounting exploit on Ethereum; $11.6M via flash-loan-funded manipulation of trove-manager accounting | **T9.002** |
| 2024-07-20 | ETHTrustFund: classic rug pull on Base; $2.1M via team treasury drain after accumulating investor deposits on novel L2 | **T5.005** |
| 2024-07-30 | Astroport: known vuln reintroduced on Terra; $6.4M via ibc-hooks reentrancy (allowing illegitimate token minting) patched April 2024, accidentally reintroduced in June 2024 upgrade | **T9.007** |
| 2024-09-20 | Shezmu: vault collateral-type logic flaw on Ethereum; $4.9M via vault accepting permissionlessly-mintable collateral token — attacker minted worthless collateral, deposited, borrowed real ShezUSD | **T5.003** |
| 2024-09-25 | Bedrock: uniBTC vault exchange-rate arithmetic miscalculation on Ethereum; $2M via ETH→BTC conversion logic error allowing depositors to receive more uniBTC than warranted | **T9.011** |

## Public references

- `[rektlb]` — rekt.news, Leaderboard: <https://rekt.news/leaderboard>
- `[rektanyswap]` — Rekt, "Anyswap - REKT" (2021-07-13): <https://rekt.news/anyswap-rekt>
- `[rektbondly]` — Rekt, "Bondly - REKT" (2021-07-15): <https://rekt.news/bondly-rekt>
- `[rektmonox]` — Rekt, "MonoX - REKT" (2021-11-30): <https://rekt.news/monox-rekt>
- `[rektxtoken]` — Rekt, "XToken - REKT" (2021-05-12): <https://rekt.news/xtoken-rekt>
- `[rektalchemix]` — Rekt, "Alchemix - REKT" (2021-06-18): <https://rekt.news/alchemix-rekt>
- `[rektunizen]` — Rekt, "Unizen - Rekt" (2024-03-12): <https://rekt.news/unizen-rekt>
- `[rektastroport]` — Rekt, "Astroport - Rekt" (2024-07-31): <https://rekt.news/astroport-rekt>
- rekt.news leaderboard — 295 articles, extracted 2026-05-15
- Each protocol's rekt.news article (slugs listed above)
- Halborn analysis — Deus DAO `burnFrom` parameter-ordering vulnerability
