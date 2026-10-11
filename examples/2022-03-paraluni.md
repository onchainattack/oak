# Paraluni MasterChef reentrancy exploit — BNB Chain — 2022-03-13

**Loss:** approximately \$1.7M drained across multiple transactions from Paraluni's MasterChef contract `[certikparaluni]`.
**OAK Techniques observed:** OAK-T9.001 (Oracle Price Manipulation — original mapping, **not supported by the sources**; CertiK does not describe a price-oracle component). OAK-T9.002 (Flash-Loan-Funded Attack — the attacker borrowed about 157,000 USDT and 157,000 BUSD from PancakeSwap to fund the LP position `[certikparaluni]`).
**Attribution:** **unattributed** pseudonymous; the attacker has not been publicly identified. Funds were not returned; CertiK reports 660 ETH deposited into Tornado Cash in 12 installments `[certikparaluni]`.
**Corrected 2026-10-11:** the mechanism was an unvalidated pool ID combined with a reentrancy flaw via a malicious token, not pool-price/oracle manipulation; removed the unsourced post-mortem and analyst references.
**Key teaching point:** A MasterChef-style contract entry point that accepts caller-supplied token addresses and pool IDs without checking that they match, and lacks reentrancy protection, lets an attacker-created token run code mid-deposit and get the same LP position credited twice.

## Summary

On 2022-03-13 at 00:04:30 UTC the attacker exploited Paraluni's MasterChef contract. Per CertiK, two flaws combined: `depositByAddLiquidity()` did not validate that the `_pid` pool ID matched the supplied `_tokens`, and the contract lacked reentrancy protection `[certikparaluni]`. The attacker created two malicious tokens, UBT and UGT; UBT's `transferFrom()` called MasterChef's `deposit()` before internal state was updated, so the same 155,935 LP tokens were credited twice, creating two `userInfo` records, and the attacker withdrew through both paths `[certikparaluni]`.

The attacker borrowed about 157,000 USDT and 157,000 BUSD from PancakeSwap to build the LP position, then removed liquidity, repaid the flash loans and kept about 310,000 USDT and 310,000 BUSD. The proceeds were swapped to ETH, bridged from BSC to Ethereum and 660 ETH was deposited into Tornado Cash `[certikparaluni]`.

## Timeline (UTC)

| When | Event |
|---|---|
| 2022-03-13 00:04:30 | MasterChef exploit begins; about \$1.7M taken over several transactions `[certikparaluni]` |
| After | Proceeds bridged to Ethereum; 660 ETH to Tornado Cash in 12 installments `[certikparaluni]` |

## Public references

- `[certikparaluni]` — CertiK, "Paraluni Exploit" (2022-03): <https://www.certik.com/resources/blog/4mPLWLwyKG4xy30x65uLgw-paraluni-exploit>
- Cross-reference: T9.002 at `techniques/T9.002-flash-loan-funded-attack.md`; T9.005 (Reentrancy) at `techniques/T9.005-reentrancy.md` is the better mechanism match.
