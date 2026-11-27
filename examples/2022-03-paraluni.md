# Paraluni — unvalidated token inputs and reentrancy in MasterChef `depositByAddLiquidity()` credit one LP position twice — Paraluni / BNB Chain — 2022-03-13

**Loss:** about \$1.7M stolen in multiple transactions, per [CertiK](https://www.certik.com/resources/blog/4mPLWLwyKG4xy30x65uLgw-paraluni-exploit). Not returned: Paraluni offered the attacker a reward for returning the funds and received no response, per [CertiK](https://www.certik.com/resources/blog/4mPLWLwyKG4xy30x65uLgw-paraluni-exploit).

**OAK Techniques observed:** **OAK-T9.005** (Reentrancy, primary: `depositByAddLiquidity()` called attacker-controlled token contracts whose `transferFrom()` re-entered MasterChef `deposit()` before state was updated, per [CertiK](https://www.certik.com/resources/blog/4mPLWLwyKG4xy30x65uLgw-paraluni-exploit) and [BlockSec](https://blocksec.com/blog/not-all-tokens-are-good-the-quick-analysis-of-the-paraluni-attack); see [`techniques/T9.005-reentrancy.md`](../techniques/T9.005-reentrancy.md)). **OAK-T9.002** (Flash-Loan-Enabled Exploit: about 157,000 USDT and 157,000 BUSD borrowed from PancakeSwap to build the LP position, per [CertiK](https://www.certik.com/resources/blog/4mPLWLwyKG4xy30x65uLgw-paraluni-exploit)). **OAK-T7.003** (Cross-Chain Bridge Laundering: ETH bridged from BSC to Ethereum, per CertiK). **OAK-T7.001** (Mixer-Routed Hop: 660 ETH deposited into Tornado in 12 instalments, per CertiK).

**Attribution:** **unattributed**. Neither opened page identifies the attacker. CertiK prints the attacker address only in shortened form (`0x94bc1..`), so it is not reproduced here.

**Key teaching point:** **A MasterChef-style entry point that accepts caller-supplied token addresses must check them against the pool the `_pid` selects, and must be reentrancy-guarded.** CertiK's conclusion cites the "lack of reentrancy prevention in the key functions for fund operations"; BlockSec names "the lack of the verification of passed tokens" as the other root cause. With both checks missing, a token the attacker created ran code in the middle of a deposit.

## Summary

CertiK dates the exploit to 2022-03-13 00:04:30 UTC [(CertiK)](https://www.certik.com/resources/blog/4mPLWLwyKG4xy30x65uLgw-paraluni-exploit). The attacker borrowed about 157,000 USDT and 157,000 BUSD from PancakeSwap, put them into ParaPair and received 155,935 LP tokens. They then called `depositByAddLiquidity()` with `_pid` 18 and `_tokens` set to the two attacker-created tokens UGT and UBT. During that call UBT's `transferFrom()` called MasterChef `deposit()` before internal state was updated, so the same 155,935 LP tokens were deposited twice and two `userInfo` records were created, per CertiK. After removing liquidity and repaying the flash loans, the attacker held 310,000 USDT and 310,000 BUSD, per CertiK.

[BlockSec](https://blocksec.com/blog/not-all-tokens-are-good-the-quick-analysis-of-the-paraluni-attack) describes the same two flaws (unverified passed-in tokens and reentrancy) on a transaction that used pool index 9 and the BTCB-WBNB pool; CertiK's walk-through uses `_pid` 18 and USDT/BUSD. The two pages do not say whether these are the same transaction or separate ones.

## Timeline (UTC)

Stages: flaw, preparation, execution, money, response. The exploit time is CertiK's; BlockSec dates the attack 2022-03-13 in UTC+8. Other times are undisclosed.

| When | What happened | OAK |
|---|---|---|
| Before 2022-03-13 (undisclosed) | MasterChef `depositByAddLiquidity()` does not validate `_pid` against the supplied tokens and has no reentrancy protection ([CertiK](https://www.certik.com/resources/blog/4mPLWLwyKG4xy30x65uLgw-paraluni-exploit)) | **T9.005** |
| Before the exploit (undisclosed) | Attacker creates tokens UGT and UBT ([CertiK](https://www.certik.com/resources/blog/4mPLWLwyKG4xy30x65uLgw-paraluni-exploit)) | none (preparation) |
| 2022-03-13 00:04:30 | Flash loan of about 157,000 USDT and 157,000 BUSD from PancakeSwap; 155,935 LP tokens received ([CertiK](https://www.certik.com/resources/blog/4mPLWLwyKG4xy30x65uLgw-paraluni-exploit)) | **T9.002** |
| 2022-03-13 (same attack) | `depositByAddLiquidity()` with `_pid` 18 and `_tokens` [UGT, UBT]; UBT `transferFrom()` re-enters `deposit()`; the same LP tokens are credited twice; withdrawn through both records ([CertiK](https://www.certik.com/resources/blog/4mPLWLwyKG4xy30x65uLgw-paraluni-exploit)) | **T9.005** |
| After the exploit (undisclosed times) | Flash loans repaid; attacker keeps 310,000 USDT and 310,000 BUSD; BNB swapped to ETH and bridged from BSC to Ethereum ([CertiK](https://www.certik.com/resources/blog/4mPLWLwyKG4xy30x65uLgw-paraluni-exploit)) | T7.003 |
| After the bridge (undisclosed times) | 660 ETH deposited into Tornado in 12 instalments ([CertiK](https://www.certik.com/resources/blog/4mPLWLwyKG4xy30x65uLgw-paraluni-exploit)) | T7.001 |
| After the exploit (undisclosed date) | Paraluni contacts the attacker on-chain and offers a reward for return; no response ([CertiK](https://www.certik.com/resources/blog/4mPLWLwyKG4xy30x65uLgw-paraluni-exploit)) | response |

Key addresses (CertiK prints the attacker, attack transaction, attack contract and MasterChef only in shortened form, so they are not given here):

- UGT token (attacker-created): [`0xbc5db89ce5ab8035a71c6cd1cd0f0721ad28b508`](https://bscscan.com/address/0xbc5db89ce5ab8035a71c6cd1cd0f0721ad28b508)
- UBT token (attacker-created): [`0xca2ca459ec6e4f58ad88aeb7285d2e41747b9134`](https://bscscan.com/address/0xca2ca459ec6e4f58ad88aeb7285d2e41747b9134)
- Example attack transaction on BSC per BlockSec: [`0xf2bba649019ce40a67f0fb74e5e800257d359d9094b6ba6faea14ffa4d3446b1`](https://bscscan.com/tx/0xf2bba649019ce40a67f0fb74e5e800257d359d9094b6ba6faea14ffa4d3446b1)

## Root-cause evidence

- **Technique:** OAK-T9.005
- **Source:** <https://www.certik.com/resources/blog/4mPLWLwyKG4xy30x65uLgw-paraluni-exploit>; <https://blocksec.com/blog/not-all-tokens-are-good-the-quick-analysis-of-the-paraluni-attack>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** CertiK and BlockSec independently describe the same two flaws, unvalidated tokens and reentrancy through an attacker token's `transferFrom()`. The two write-ups use different pool IDs and tokens, so which transactions they cover is not settled. The operator's own post-mortem was not found.

## Public references

- CertiK, "Paraluni Exploit" (2022-03): <https://www.certik.com/resources/blog/4mPLWLwyKG4xy30x65uLgw-paraluni-exploit>
- BlockSec, "Not All Tokens Are Good: The Quick Analysis of the Paraluni Attack": <https://blocksec.com/blog/not-all-tokens-are-good-the-quick-analysis-of-the-paraluni-attack>
