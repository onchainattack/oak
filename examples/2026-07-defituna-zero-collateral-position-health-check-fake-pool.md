# DeFiTuna — a zero-collateral leveraged position, swapped through an attacker-made pool, rounded to zero value and passed the health check, leaving a ~\$570K USDC lending-pool deficit — DeFiTuna (Solana) — 2026-07-16

**Loss:** **\$569,601 USDC** per [CertiK](https://www.certik.com/blog/defituna-incident-analysis); about \$570K per [BlockSec](https://blocksec.com/blog/web3-security-barnbridge-defituna-exploits); **\$580,000** is the figure DeFiTuna gave, reported by [Crypto Briefing](https://cryptobriefing.com/defituna-lending-pools-exploited-580k/). The USDC lending pool was left with a matching deficit. On 2026-07-28 DeFiTuna [said](https://x.com/DeFiTuna/status/2082007922578731391) withdrawals were open for affected lenders and that losses were socialized across all USDC lending pool depositors.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*, per CertiK and BlockSec. The position was valued at zero after a rounding step, and the health check treated a zero total as healthy without requiring zero debt. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). Rounding was a trigger; OAK does not tag the rounding-attack Technique, whose page describes share-price manipulation in vaults, because no opened page describes that pattern here.

**Attribution:** **unattributed.** [CertiK](https://www.certik.com/blog/defituna-incident-analysis) lists nine attacker addresses and no identity. No named individual or group is linked in the opened pages.

**Key teaching point:** **A solvency check must fail closed: a position with outstanding debt is never healthy, whatever its computed value, and the pool the swap actually runs through must be validated, not only the normal market pool.** [BlockSec](https://blocksec.com/blog/web3-security-barnbridge-defituna-exploits) states the fix as "A zero-value position with outstanding debt is never healthy." Here the price-deviation check inspected a different pool from the one the swap used, and the health check then accepted a zero total.

## Summary

DeFiTuna is a Solana protocol with lending and leveraged spot positions. On 2026-07-16 an attacker created a nearly empty TUNA/USDC Fusion pool, placed two limit orders in it, and opened a spot position with zero collateral that borrowed about 569,601 USDC from the lending pool. The borrowed USDC was swapped through a Jupiter route into the attacker's pool and returned about 0.000494 TUNA. The position was valued at under one unit, truncated to zero, and `is_healthy()` accepted it. The attackers then withdrew the USDC from their limit-order positions ([CertiK](https://www.certik.com/blog/defituna-incident-analysis), [BlockSec](https://blocksec.com/blog/web3-security-barnbridge-defituna-exploits)). DeFiTuna [disclosed](https://cryptobriefing.com/defituna-lending-pools-exploited-580k/) the loss and said it had identified and mitigated the attack vector.

## Timeline (UTC)

Stages: **Flaw** (health check), **Preparation** (fake pool, limit orders), **Take** (zero-collateral borrow, swap, withdrawal), **Money** (bridge, Railgun), **Response**. The only time given is CertiK's attack-transaction timestamp, which the page does not say is UTC.

| When | What happened | OAK |
|---|---|---|
| Before 2026-07-16 (undisclosed) | `compute_total_and_debt()` rounds its result down and `to_num::<u64>()` drops the fractional part, so a value of about 0.91 becomes 0. `is_healthy()` treats a zero total as healthy without requiring zero debt ([CertiK](https://www.certik.com/blog/defituna-incident-analysis); [BlockSec](https://blocksec.com/blog/web3-security-barnbridge-defituna-exploits)). Whether the code is what Sec3 audited is unknown ([SigintZero](https://sigintzero.com/blog/defituna-580k-lending-exploit)). | **T9.016** |
| 2026-07-16 before the attack (times undisclosed) | The attacker creates a nearly empty TUNA/USDC Fusion pool and places two sell-side limit orders totalling 0.001052 TUNA at tick about 208,640. CertiK says the pool's initial price was close to the oracle price; BlockSec says on-chain evidence shows an extreme initial price (about 1.149 billion USDC per TUNA) and flags this as at odds with the project's statement. Funding of the attacker addresses is undisclosed. | — |
| 2026-07-16 05:48:12 (timezone not stated) | Attack transaction: the attacker calls `Open_and_increase_tuna_spot_position_jupiter` with zero collateral and borrows about 569,601 USDC net of fees. The pre-swap check validates the normal market pool, not the attacker's pool. The swap returns 494 raw units of TUNA, the position is valued at zero and passes `is_healthy()` ([CertiK](https://www.certik.com/blog/defituna-incident-analysis)). BlockSec analyses a different transaction and notes that several attack transactions were executed. | **T9.016** |
| 2026-07-16 | Each of two attackers withdraws about 284,280.48 USDC from the malicious limit-order positions ([CertiK](https://www.certik.com/blog/defituna-incident-analysis)). | — |
| After 2026-07-16 (dates undisclosed) | Funds from two attacker addresses are bridged from Solana to Ethereum through Mayan; 140 ETH is deposited into Railgun. As of 2026-07-20 the wallet below still held 291,696 DAI and 5 ETH ([CertiK](https://www.certik.com/blog/defituna-incident-analysis)). | T7.003 |
| 2026-07-16 | DeFiTuna discloses the loss, says the attack vector was identified and mitigated and that it is working to recover the funds ([Crypto Briefing](https://cryptobriefing.com/defituna-lending-pools-exploited-580k/), [SigintZero](https://sigintzero.com/blog/defituna-580k-lending-exploit)). | response |
| 2026-07-28 | DeFiTuna opens withdrawals for affected lenders and socializes losses across all USDC lending pool depositors ([DeFiTuna on X](https://x.com/DeFiTuna/status/2082007922578731391)). | response |

Key addresses (all as printed by [CertiK](https://www.certik.com/blog/defituna-incident-analysis)):

- DeFiTuna program — [`tuna4uSQZncNeeiAMKbstuxA9CUkHH6HmC64wgmnogD`](https://solscan.io/account/tuna4uSQZncNeeiAMKbstuxA9CUkHH6HmC64wgmnogD)
- Damaged USDC vault — [`D76dDcSU5HnAGqVEZCDLyGgLpTp4xZuqeZyVDtUdDv55`](https://solscan.io/account/D76dDcSU5HnAGqVEZCDLyGgLpTp4xZuqeZyVDtUdDv55)
- Attacker 1 — [`9ytGWP8tCRF1keREJ5VHqBpSuM9MZYwm3oFQQa1SvESb`](https://solscan.io/account/9ytGWP8tCRF1keREJ5VHqBpSuM9MZYwm3oFQQa1SvESb)
- Attacker 2 / fake pool — [`917DKTphW3rhBG5gsJpwKsNGisNV2dx74uUFd8HBEjtg`](https://solscan.io/account/917DKTphW3rhBG5gsJpwKsNGisNV2dx74uUFd8HBEjtg)
- Attacker 3 — [`7hiHL8AgDuLNVDQLfN3GHdLAEeCN1F7uz6nSANRvFJst`](https://solscan.io/account/7hiHL8AgDuLNVDQLfN3GHdLAEeCN1F7uz6nSANRvFJst)
- Attacker 4 — [`BK9aTnKfPNnnj45Me5ACrky2vexzUrZHRzr4BjmQpH3c`](https://solscan.io/account/BK9aTnKfPNnnj45Me5ACrky2vexzUrZHRzr4BjmQpH3c)
- Attacker 5 — [`8P3H7Hy98LWhw5QhuXdoigVdAzPCYRTYjdtQQKhGwvqD`](https://solscan.io/account/8P3H7Hy98LWhw5QhuXdoigVdAzPCYRTYjdtQQKhGwvqD)
- Attacker 6 — [`GrXBhM6Ty6YxubFp8zubtJF12WXmKj1dhMyakRPeaDpo`](https://solscan.io/account/GrXBhM6Ty6YxubFp8zubtJF12WXmKj1dhMyakRPeaDpo)
- Attacker 7 — [`F4xUroPaHro4gb2JAqa3e93E7DdZytRQJ4L2cHT5E53p`](https://solscan.io/account/F4xUroPaHro4gb2JAqa3e93E7DdZytRQJ4L2cHT5E53p)
- Attacker 8 — [`ETGhosPrFApbiiKXDpxrhBz7J2MdTA3dxnL2Nkio9vEX`](https://solscan.io/account/ETGhosPrFApbiiKXDpxrhBz7J2MdTA3dxnL2Nkio9vEX)
- Attacker 9 — [`4ZKkGZuoXqgSHbmsJXUib3dgn5WNhzbPEXrxuMYJ5oQ3`](https://solscan.io/account/4ZKkGZuoXqgSHbmsJXUib3dgn5WNhzbPEXrxuMYJ5oQ3)
- Ethereum holding wallet (291,696 DAI and 5 ETH as of 2026-07-20) — [`0x509B9D094A6C26D716aaC131E8aDee5B16B86d3e`](https://etherscan.io/address/0x509B9D094A6C26D716aaC131E8aDee5B16B86d3e)
- Attack transaction (CertiK) — [`124ibr7NU7AtJdeZ1WJjJy5YathNiBtCnV554uwJtkc7qEXeF64dmCziv4QoiEEMRG6EmCRx8ec2LkARpWH3kvEG`](https://solscan.io/tx/124ibr7NU7AtJdeZ1WJjJy5YathNiBtCnV554uwJtkc7qEXeF64dmCziv4QoiEEMRG6EmCRx8ec2LkARpWH3kvEG)
- Attack transaction analysed by BlockSec — [`4x33DqVjUB4zUJEtnmmVgFNV9mnULhcLiwXqGmJKfFJZmSk47oT4zcjvrXoBn9U94MsfR18QsqKUJZGVtydMEXj1`](https://solscan.io/tx/4x33DqVjUB4zUJEtnmmVgFNV9mnULhcLiwXqGmJKfFJZmSk47oT4zcjvrXoBn9U94MsfR18QsqKUJZGVtydMEXj1)
- Railgun deposit, 140 ETH — [`0xbbb20a9c80a9a6ffbf1b93315ae06b2562dfe1c96c2c74a10da76c1a245b4085`](https://etherscan.io/tx/0xbbb20a9c80a9a6ffbf1b93315ae06b2562dfe1c96c2c74a10da76c1a245b4085)

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://www.certik.com/blog/defituna-incident-analysis>; <https://blocksec.com/blog/web3-security-barnbridge-defituna-exploits>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** CertiK and BlockSec, two independent firms, describe the same chain: zero-collateral borrow, swap through an attacker-created pool, value rounded to zero, health check accepting the zero total. BlockSec states "The health check logic treated `total == 0` as a healthy state without requiring `debt == 0`." They differ on the fake pool's initial price and on the loss figure (\$569,601 vs about \$570K vs DeFiTuna's \$580K). DeFiTuna has not published a post-mortem in the pages opened. Neither firm's page was independently checked on-chain by OAK.

## Public references

- CertiK, "DefiTuna Incident Analysis": <https://www.certik.com/blog/defituna-incident-analysis>
- BlockSec, "~\$1.35M Lost: BarnBridge, DeFiTuna" (DeFiTuna section): <https://blocksec.com/blog/web3-security-barnbridge-defituna-exploits>
- Crypto Briefing, "DeFiTuna lending pools exploited for \$580K, creating deficit in USDC pool": <https://cryptobriefing.com/defituna-lending-pools-exploited-580k/>
- SigintZero, "DefiTuna Exploit: \$580K Drained From Solana Lending Pool" (updated 2026-07-20): <https://sigintzero.com/blog/defituna-580k-lending-exploit>
- DeFiTuna on X, withdrawals reopened, losses socialized (2026-07-28): <https://x.com/DeFiTuna/status/2082007922578731391>
