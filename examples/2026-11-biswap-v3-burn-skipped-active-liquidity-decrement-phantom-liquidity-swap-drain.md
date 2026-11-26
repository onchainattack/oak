# Biswap V3 — burn() skipped the active-liquidity decrement when withdrawal amounts were zero, leaving phantom liquidity that a swap drained — Biswap V3 WBNB/BUSD pool / BNB Chain — 2026-11-24

**Loss:** **~$51K** (SlowMist TI Alert; DefimonAlerts gives ~$50.4K and 50,553 BUSD). OAK's trace of the exploit transaction shows 50,553.92284109 BUSD reaching the attacker EOA after 440.05606852 BUSD was spent on a swap for WBNB (`verified: oak`). No recovery found. Biswap statement: undisclosed (no operator post found).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*, per SlowMist. In `burn()`, when both current-price-point withdrawal components were zero, including a Y amount rounded down to zero, active liquidity was not decremented. Repeated tiny burns removed the position but left phantom liquidity that a later swap could use. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). **OAK-T9.011** (Precision-Loss / Rounding Attack — adjacent: the zero amount comes from rounding down, but the reported defect is the skipped decrement, not the rounding direction). **OAK-T9.002** (Flash-Loan-Enabled Exploit — a PancakeV3 WBNB flash loan, per DefimonAlerts; OAK sees 11,283 WBNB come in and 11,284.1283 WBNB go back to the same address).

**Attribution:** **pseudonymous** (attacker EOA [`0x1ec9d79d1a7c47c3887d8fc322c88e56b16e90a5`](https://bscscan.com/address/0x1ec9d79d1a7c47c3887d8fc322c88e56b16e90a5), named by SlowMist and DefimonAlerts; no identity attribution).

**Key teaching point:** **A concentrated-liquidity burn must update active liquidity whenever the position's range includes the current point, whether or not the withdrawn token amounts round to zero.** Liquidity bookkeeping has to be a function of the liquidity delta, never of the amounts paid out; a fuzz test that burns in dust-sized steps at the current point would have shown the pool's liquidity not returning to its starting value.

## Summary

Biswap V3 is an iZiSwap-style concentrated-liquidity pool; the affected pool is WBNB/BUSD. On 2026-11-24 an attack contract borrowed WBNB in a flash loan, minted and burned tiny positions around the current point, and then called `swapY2XDesireX` on the pool. Per DefimonAlerts the swap returned about 11,283 WBNB for 63,263 wei of BUSD. OAK's trace shows the pool paid out 50,993.98 BUSD in the transaction, and the attacker kept 50,553.92 BUSD. SlowMist's alert was posted 2026-11-25 02:23 UTC; DefimonAlerts followed at 04:35 UTC. RektRadar summarised both on 2026-11-25 and found no detailed public response from Biswap.

## Timeline (UTC)

**Flaw** (pool code), **Take** (one transaction), **Money** (BUSD to the attacker EOA), **Response**. The attack time is the block time from OAK's lookup; alert times are post timestamps. No preparation transaction (deployment, funding) was checked by OAK, and no source reports one.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-24 (deployment date undisclosed) | The pool's `burn()` skips the active-liquidity decrement when both current-price-point withdrawal components are zero (SlowMist). | **T9.016** |
| Before 2026-11-24 20:24 (undisclosed) | Attack contract [`0x6161a9ca16f213c3373c07bcc0c4b4a4705340be`](https://bscscan.com/address/0x6161a9ca16f213c3373c07bcc0c4b4a4705340be) is deployed and funded; how is undisclosed. | — |
| 2026-11-24 20:24:58 | One transaction [`0x13b8310513cc7ff91ad24a966f6ced99aa535d2aef8a231e38737401c8e7f78c`](https://bscscan.com/tx/0x13b8310513cc7ff91ad24a966f6ced99aa535d2aef8a231e38737401c8e7f78c) from the attacker EOA. A WBNB flash loan of 11,283 WBNB arrives; tiny positions are minted and burned at points -400050 and -400000 (DefimonAlerts); repeated burns leave phantom liquidity (SlowMist); `swapY2XDesireX` then pays out WBNB for almost no BUSD (DefimonAlerts: ~11,283 WBNB for 63,263 wei of BUSD). OAK sees the pool send 50,993.97890961 BUSD to the attack contract. | **T9.016**, T9.011, T9.002 |
| 2026-11-24 20:24:58 | The loan is repaid with 11,284.1283 WBNB, after the contract spends 440.05606852 BUSD to buy 0.80113549 WBNB from [`0x58f876857a02d6762e0101bb5c46a8c1ed44dc16`](https://bscscan.com/address/0x58f876857a02d6762e0101bb5c46a8c1ed44dc16). 50,553.92284109 BUSD goes to the attacker EOA. Movement afterwards is not traced. | — |
| 2026-11-25 02:23 to 04:35 | SlowMist and DefimonAlerts publish the alert. RektRadar reports no detailed Biswap response. | response |
| After 2026-11-25 | Pause, patch, user reimbursement: undisclosed. | response |

Key addresses:

- Attacker EOA — [`0x1ec9d79d1a7c47c3887d8fc322c88e56b16e90a5`](https://bscscan.com/address/0x1ec9d79d1a7c47c3887d8fc322c88e56b16e90a5)
- Attack contract — [`0x6161a9ca16f213c3373c07bcc0c4b4a4705340be`](https://bscscan.com/address/0x6161a9ca16f213c3373c07bcc0c4b4a4705340be)
- Victim Biswap V3 WBNB/BUSD pool — [`0xc83f96f87f586a858a14c89e16434460bac0b643`](https://bscscan.com/address/0xc83f96f87f586a858a14c89e16434460bac0b643)
- WBNB flash-loan source (a PancakeV3 pool per DefimonAlerts; label not checked by OAK) — [`0x172fcd41e0913e95784454622d1c3724f546f849`](https://bscscan.com/address/0x172fcd41e0913e95784454622d1c3724f546f849)
- Swap counterparty for the 440.06 BUSD (unlabelled) — [`0x58f876857a02d6762e0101bb5c46a8c1ed44dc16`](https://bscscan.com/address/0x58f876857a02d6762e0101bb5c46a8c1ed44dc16)

## Fund flow

```oak-flow
as_of: 2026-11-26T00:00Z
nodes:
  - {id: loan, chain: bsc, address: 0x172fcd41e0913e95784454622d1c3724f546f849, role: lending, label: "WBNB flash-loan source (PancakeV3 per DefimonAlerts)"}
  - {id: atkc, chain: bsc, address: 0x6161a9ca16f213c3373c07bcc0c4b4a4705340be, role: attack-contract, label: "Attack contract"}
  - {id: pool, chain: bsc, address: 0xc83f96f87f586a858a14c89e16434460bac0b643, role: vulnerable-contract, label: "Biswap V3 WBNB/BUSD pool (victim)"}
  - {id: swp, chain: bsc, address: 0x58f876857a02d6762e0101bb5c46a8c1ed44dc16, role: dex, label: "BUSD to WBNB swap counterparty (unlabelled)"}
  - {id: atk, chain: bsc, address: 0x1ec9d79d1a7c47c3887d8fc322c88e56b16e90a5, role: attacker-eoa, label: "Attacker EOA"}
edges:
  - {from: loan, to: atkc, asset: WBNB, amount: 11283, tx: 0x13b8310513cc7ff91ad24a966f6ced99aa535d2aef8a231e38737401c8e7f78c, time: 2026-11-24T20:24:58Z, technique: T9.002, verified: oak}
  - {from: pool, to: atkc, asset: BUSD, amount: 50993.97890961, tx: 0x13b8310513cc7ff91ad24a966f6ced99aa535d2aef8a231e38737401c8e7f78c, time: 2026-11-24T20:24:58Z, technique: T9.016, verified: oak}
  - {from: atkc, to: swp, asset: BUSD, amount: 440.05606852, tx: 0x13b8310513cc7ff91ad24a966f6ced99aa535d2aef8a231e38737401c8e7f78c, time: 2026-11-24T20:24:58Z, verified: oak}
  - {from: atkc, to: loan, asset: WBNB, amount: 11284.1283, tx: 0x13b8310513cc7ff91ad24a966f6ced99aa535d2aef8a231e38737401c8e7f78c, time: 2026-11-24T20:24:58Z, technique: T9.002, verified: oak}
  - {from: atkc, to: atk, asset: BUSD, amount: 50553.92284109, tx: 0x13b8310513cc7ff91ad24a966f6ced99aa535d2aef8a231e38737401c8e7f78c, time: 2026-11-24T20:24:58Z, verified: oak}
```

What the trace adds beyond the sources:

- **The BUSD reconciles.** 50,993.97890961 BUSD left the pool; 440.05606852 BUSD went to the swap and 50,553.92284109 BUSD to the attacker EOA, which matches DefimonAlerts' 50,553 BUSD.
- **~11,283 WBNB is the flash loan, not the take.** The pool received 11,282.95079277 WBNB from the attack contract and sent back 11,283.27795728 WBNB in the same transaction; net, the pool lost about 0.33 WBNB. The loan was 11,283 WBNB and repayment 11,284.1283 WBNB. The pool's loss is therefore the BUSD side.
- **Not traced:** the attacker EOA's BUSD after the transaction; native BNB transfers inside the transaction (not visible over public RPC).

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2125415036600606938>; <https://x.com/DefimonAlerts/status/2125448390561468874>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** SlowMist (burn() skips the active-liquidity decrement when both amounts are zero) and DefimonAlerts (tiny mint/burn at -400050/-400000, then `swapY2XDesireX` paying out for 63,263 wei of BUSD) describe the same sequence, and OAK's trace shows the pool paying 50,993.98 BUSD in one transaction. DefimonAlerts classifies it as "Oracle/Price Manipulation (AMM swap-math flaw)"; OAK follows SlowMist's accounting reading, since no external price was moved. Both are same-day third-party analyses, so this is not `confirmed`. Contract source and the in-transaction call trace were not reviewed by OAK. No operator statement found.

## Public references

- `slowmist2026biswap` — SlowMist TI Alert (2026-11-25): <https://x.com/SlowMist_Team/status/2125415036600606938>
- `defimon2026biswap` — DefimonAlerts, alert (2026-11-25): <https://x.com/DefimonAlerts/status/2125448390561468874>
- `rektradar2026biswap` — RektRadar, "Web3 Daily Exploits, 25 Nov 2026: Bullpen $2.6M, Ansem, Biswap $51K" (2026-11-25): <https://www.rektradar.xyz/web3-daily-exploits-25-nov-2026-bullpen-2-6m-ansem-biswap-51k/>
- `bscscan2026biswapTx` — BscScan, exploit transaction: <https://bscscan.com/tx/0x13b8310513cc7ff91ad24a966f6ced99aa535d2aef8a231e38737401c8e7f78c>
