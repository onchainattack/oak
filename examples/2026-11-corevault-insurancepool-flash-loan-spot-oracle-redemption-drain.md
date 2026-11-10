# CoreVault / InsurancePool (BNIX / OSK) — flash loan pushed a thin PancakeSwap spot price into the redemption oracle and inflated a principal redemption about 33× — CoreVault / BNB Chain — 2026-11-03

**Loss:** **~\$112.2K net to the attacker (160.26 BNB)** per CertiKAlert and Onchain Lens; TenArmor says "approximately \$112.3K". The gross depletion of the InsurancePool is higher: Onchain Lens 260.21 BNB (~\$180.3K), DefimonAlerts ~259 BNB (~\$181K). The difference is the cost of the round trip through the manipulated pool, not funds returned. The flash loan was repaid inside the same transaction. No fund return or recovery was found. No project statement found (see What is not known).

**OAK Techniques observed:** **OAK-T9.001** (Oracle Price Manipulation, *primary*. `redeemPrincipal()` priced the BNB payout from a PancakeSwap WBNB/USDT spot price, via `OracleLib.getAccountingPrices`, whose 3-source median fell back to the manipulated spot when the TWAP and average windows were unfilled, per DefimonAlerts. See [`techniques/T9.001-oracle-price-manipulation.md`](../techniques/T9.001-oracle-price-manipulation.md)). **OAK-T9.002** (Flash-Loan-Enabled Exploit. About 207,358 WBNB was flash-borrowed from Lista DAO's Moolah and repaid in the same transaction; read by OAK from the transfer logs. See [`techniques/T9.002-flash-loan-enabled-exploit.md`](../techniques/T9.002-flash-loan-enabled-exploit.md)).

**Attribution:** **pseudonymous** (attacker EOA [`0xD3565b191b28B49Cc517189B984dacDB1FF05304`](https://bscscan.com/address/0xD3565b191b28B49Cc517189B984dacDB1FF05304); no one has attributed it to a named actor).

**Key teaching point:** **A function that pays out from a pooled reserve must not price the payout from a spot price that one flash-loaned swap can move.** The "median of three sources" looked safe, but when two sources were empty it degraded to the one source an attacker can control. An oracle that cannot fill its TWAP window should revert the redemption, not fall back to spot; a cap on the size of a single redemption against the reserve would also have bounded the loss.

## Summary

On 2026-11-03 at 21:50:20 UTC an attacker deployed a contract on BNB Chain and ran the whole attack inside that one deployment transaction. It flash-borrowed about 207,358 WBNB, sold 195,000 WBNB into the PancakeSwap WBNB/USDT pair for about 13.79M USDT, which inflated the WBNB-per-USD price that CoreVault's oracle read, and then called a redemption that paid BNB at the inflated rate. The redemption was about 33× normal size and paid about 260 BNB out of the InsurancePool through the Treasury. The attacker bought the WBNB back, repaid the loan and kept 160.26 BNB. TenArmor alerted at 01:40 UTC on 2026-11-04, CertiKAlert at 02:33 and Onchain Lens at 02:36; DefimonAlerts published the code-level root cause at 04:43. No project statement was found.

## Timeline (UTC)

Read it as four stages. **Flaw**: the redemption oracle degrades to spot. **Preparation**: attacker EOA deploys the attack contract. **Take**: one transaction flash-borrows, moves the price, redeems, reverses and repays. **Money and response**: BNB goes to a receiver wallet; alerts. The attack time is from the transaction on BNB Chain (read by OAK); alert times are from the X posts.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-03 (since when: undisclosed) | CoreVault (a BNB-farming vault; implementation `0x11d9df62…` per DefimonAlerts, full address not published) prices BNB principal redemptions in `redeemPrincipal()` as `bnbAmount = redeemableUsd × wbnbPerUsd / 1e18` (`CoreVaultFarming.sol:378-381`), with `wbnbPerUsd` from `OracleLib.getAccountingPrices`. Its 3-source median degrades to the PancakeSwap spot price when the TWAP and average windows are unfilled (DefimonAlerts). | **T9.001** |
| 2026-11-03, before 21:50:20 (time undisclosed) | Preparation: attacker EOA [`0xD3565b191b28B49Cc517189B984dacDB1FF05304`](https://bscscan.com/address/0xD3565b191b28B49Cc517189B984dacDB1FF05304) sends earlier transactions (its nonce is 3 at the attack; funding source and earlier transactions not reviewed by OAK: undisclosed). | — |
| 2026-11-03 21:50:20 | Attack transaction [`0x072a10a579e2a8afa26a681205a2aaaa38f74bcb9d1064b12bd9e9ebe2c598b3`](https://bscscan.com/tx/0x072a10a579e2a8afa26a681205a2aaaa38f74bcb9d1064b12bd9e9ebe2c598b3) is a contract creation by the attacker EOA; the attack contract is [`0x92f521a7fb4bc7eb5b3951667ce58c261e52f542`](https://bscscan.com/address/0x92f521a7fb4bc7eb5b3951667ce58c261e52f542). Step 1: the contract receives **207,358.41046848 WBNB** from [`0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c`](https://bscscan.com/address/0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c) (Lista DAO Moolah per Onchain Lens and DefimonAlerts; the address label is not checked by OAK). | **T9.002** |
| same tx | Step 2: the contract sends **195,000 WBNB** into the PancakeSwap WBNB/USDT pair [`0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae`](https://bscscan.com/address/0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae) and receives **13,791,474.30333088 USDT**. The spot WBNB-per-USD price the oracle reads is now far from the market. | **T9.001** |
| same tx | Step 3: the attack contract triggers the redemption. `redeemPrincipal()` takes the inflated price (about 33× the normal payout), and `Treasury.payoutBnb` → `InsurancePool.withdrawReserve` pay out about **260.21 BNB** (Onchain Lens; DefimonAlerts ~260 BNB). The OSK transfers in the same tx come from the vault-side address [`0xfc1b8abb7414b68daf2b64604f0ac3b8ef159ef5`](https://bscscan.com/address/0xfc1b8abb7414b68daf2b64604f0ac3b8ef159ef5) to many small recipients; their meaning is not explained in the sources. The BNB payout itself is a native transfer and is not visible over public RPC. | **T9.001** |
| same tx | Step 4: the contract sends the 13,791,474.30333088 USDT back to the pair and receives **194,901.16511467 WBNB**, then returns **207,358.41046848 WBNB** to the lender. The round trip leaves the pair 98.84 WBNB richer (consistent with swap fees; not itemised in the sources); the attacker keeps **160.26 BNB**. | **T9.002** |
| 2026-11-04 01:40:52 | TenArmor alerts: "suspicious attack involving #InsurancePool #CoreVault contracts on #BSC", ~\$112.3K. | — |
| 2026-11-04 02:33:34 | CertiKAlert: flash-loan-funded oracle attack, redemption inflated ~33×, attacker left with 160.26 BNB (~\$112.2K). | — |
| 2026-11-04 02:36:48 | Onchain Lens lists the sequence (borrow ~\$143.6M WBNB from Moolah, swap, 260.21 BNB withdrawal, reverse, repay, keep 160.26 BNB). | — |
| 2026-11-04 04:43:16 | DefimonAlerts publishes the code-level root cause. | — |
| Not published | Where the 160.26 BNB went after the transaction (OAK checked the balances on 2026-11-10, see Fund flow), pause, fix, statement, bounty offer or recovery: undisclosed. | response |

Key addresses:

- Attacker EOA — [`0xD3565b191b28B49Cc517189B984dacDB1FF05304`](https://bscscan.com/address/0xD3565b191b28B49Cc517189B984dacDB1FF05304)
- Attack contract (created in the attack tx) — [`0x92f521a7fb4bc7eb5b3951667ce58c261e52f542`](https://bscscan.com/address/0x92f521a7fb4bc7eb5b3951667ce58c261e52f542)
- "Funds destination" per rektradar (the sources do not say how it relates to the attacker; no BNB movement into it was verified by OAK) — [`0x028491B55D0E18aA81aB3324688E42f91BbadaCC`](https://bscscan.com/address/0x028491B55D0E18aA81aB3324688E42f91BbadaCC)
- "Victim" per DefimonAlerts (a contract) — [`0xf40e0d525003fb6c6a9a7d79734a87a465053df1`](https://bscscan.com/address/0xf40e0d525003fb6c6a9a7d79734a87a465053df1)
- Flash-loan source (Lista DAO Moolah per Onchain Lens and DefimonAlerts) — [`0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c`](https://bscscan.com/address/0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c)
- Manipulated pool, PancakeSwap WBNB/USDT — [`0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae`](https://bscscan.com/address/0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae)
- OSK-sending address seen in the attack tx — [`0xfc1b8abb7414b68daf2b64604f0ac3b8ef159ef5`](https://bscscan.com/address/0xfc1b8abb7414b68daf2b64604f0ac3b8ef159ef5)
- CoreVault implementation — only the short form `0x11d9df62…` is published; the full address is not given in the sources

## Fund flow

BNB Chain leg, traced by OAK with `tools/explorer.py` on 2026-11-10 from the token transfer logs of the attack transaction. The BNB payout from the InsurancePool and the attacker's 160.26 BNB are native transfers, which are not visible over public RPC, so those edges are relayed from the alerts. On 2026-11-10 an RPC balance check showed 0 BNB on the attacker EOA, the attack contract and [`0x028491B55D0E18aA81aB3324688E42f91BbadaCC`](https://bscscan.com/address/0x028491B55D0E18aA81aB3324688E42f91BbadaCC); where the BNB went is not traced.

```oak-flow
as_of: 2026-11-10T12:00Z
nodes:
  - {id: atk, chain: bsc, address: 0xD3565b191b28B49Cc517189B984dacDB1FF05304, role: attacker-eoa, label: "Attacker EOA"}
  - {id: exp, chain: bsc, address: 0x92f521a7fb4bc7eb5b3951667ce58c261e52f542, role: attack-contract, label: "Attack contract (created in the attack tx)"}
  - {id: moo, chain: bsc, address: 0x8f73b65b4caaf64fba2af91cc5d4a2a1318e5d8c, role: lending, label: "Flash-loan source (Lista DAO Moolah per alerts)"}
  - {id: pool, chain: bsc, address: 0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae, role: intermediary, label: "PancakeSwap WBNB/USDT pair"}
  - {id: ins, chain: bsc, role: vulnerable-contract, label: "CoreVault InsurancePool (address not published)"}
edges:
  - {from: moo, to: exp, asset: WBNB, amount: 207358.41046848, tx: 0x072a10a579e2a8afa26a681205a2aaaa38f74bcb9d1064b12bd9e9ebe2c598b3, time: 2026-11-03T21:50:20Z, technique: T9.002, verified: oak}
  - {from: exp, to: pool, asset: WBNB, amount: 195000, tx: 0x072a10a579e2a8afa26a681205a2aaaa38f74bcb9d1064b12bd9e9ebe2c598b3, time: 2026-11-03T21:50:20Z, technique: T9.001, verified: oak}
  - {from: pool, to: exp, asset: USDT, amount: 13791474.30333088, tx: 0x072a10a579e2a8afa26a681205a2aaaa38f74bcb9d1064b12bd9e9ebe2c598b3, time: 2026-11-03T21:50:20Z, technique: T9.001, verified: oak}
  - {from: ins, to: exp, asset: BNB, amount: 260.21, time: 2026-11-03T21:50:20Z, technique: T9.001, verified: source, source: onchainlenscv2026}
  - {from: pool, to: exp, asset: WBNB, amount: 194901.16511467, tx: 0x072a10a579e2a8afa26a681205a2aaaa38f74bcb9d1064b12bd9e9ebe2c598b3, time: 2026-11-03T21:50:20Z, technique: T9.002, verified: oak}
  - {from: exp, to: moo, asset: WBNB, amount: 207358.41046848, tx: 0x072a10a579e2a8afa26a681205a2aaaa38f74bcb9d1064b12bd9e9ebe2c598b3, time: 2026-11-03T21:50:20Z, technique: T9.002, verified: oak}
```

What the trace adds beyond the sources:

- **Everything inside one transaction.** The EOA's contract creation both receives and repays the 207,358.41046848 WBNB; the loan has no fee in the logs (same amount out and back).
- **Price move.** 195,000 WBNB went into the pair for 13,791,474.30333088 USDT, about \$70.7 per WBNB paid in USDT at the pair's own depth, after which 13,791,474.30333088 USDT bought back 194,901.16511467 WBNB.
- **Match with the alerts.** The 207K WBNB borrowed and 195K WBNB dumped match DefimonAlerts (~207K, 195K). Onchain Lens's "~\$143.6M" notional for the loan is consistent with 207K WBNB at roughly \$690 per WBNB (not independently priced by OAK).
- **Limits.** The BNB leg (InsurancePool to attacker, and the attacker's 160.26 BNB afterwards) is not visible over public RPC and was not traced. No address links the "funds destination" `0x028491B55D0E18aA81aB3324688E42f91BbadaCC` to the BNB.

## Root-cause evidence

- **Technique:** OAK-T9.001
- **Source:** <https://x.com/DefimonAlerts/status/2117840075291513155>; <https://x.com/CertiKAlert/status/2117807437357183374>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** DefimonAlerts (2026-11-04 04:43 UTC) gives the code-level mechanism: `redeemPrincipal()` computes the payout from `wbnbPerUsd` taken from `OracleLib.getAccountingPrices`, whose median degrades to the manipulated spot when the TWAP and average windows are unfilled, then `Treasury.payoutBnb` → `InsurancePool.withdrawReserve`. CertiKAlert independently describes a flash-loan-funded oracle attack that inflated a CoreVault redemption ~33× and depleted the InsurancePool. OAK's reading of the attack transaction confirms the flash loan, the 195,000 WBNB sale into the WBNB/USDT pair and the repayment. The source-code lines and function names are DefimonAlerts' reading; OAK did not read the verified contract source and the project has not confirmed the root cause, so the label stays below `confirmed`.

## What is not known

- No official CoreVault, BNIX or OSK statement, pause notice or post-mortem was found at 2026-11-10; the root cause, fix and any compensation are undisclosed.
- The loss is a range: \$112.2K net to the attacker (CertiKAlert, Onchain Lens) against ~\$181K gross depletion of the InsurancePool (DefimonAlerts, Onchain Lens).
- Where the 160.26 BNB went. rektradar names a "funds destination" wallet, but OAK found 0 BNB there on 2026-11-10 and no source explains the link.
- The full CoreVault implementation address (only `0x11d9df62…` is published), the InsurancePool and Treasury addresses, and the purpose of the OSK transfers in the attack transaction.
- How the attacker EOA was funded and its earlier transactions.

## Public references

- `[tenarmorcv2026]` — TenArmor on X, CoreVault / InsurancePool attack alert (2026-11-04): <https://x.com/TenArmorAlert/status/2117794176079376390>
- `[certikcv2026]` — CertiKAlert on X, CoreVault flash-loan oracle attack (2026-11-04): <https://x.com/CertiKAlert/status/2117807437357183374>
- `[onchainlenscv2026]` — Onchain Lens on X, attack sequence (2026-11-04): <https://x.com/OnchainLens/status/2117808252352344346>
- `[defimoncv2026]` — DefimonAlerts on X, code-level root cause (2026-11-04): <https://x.com/DefimonAlerts/status/2117840075291513155>
- `[rektradarcv2026]` — rektradar, Web3 Daily Exploits 4 Nov 2026 (secondary): <https://www.rektradar.xyz/web3-daily-exploits-04-nov-2026-corevault-112k-oracle-flash/>
