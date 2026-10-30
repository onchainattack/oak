# NEM (NemTokenV2) — transfers into the LP pair were credited as sells, skimmed back out, and the credits used to burn the pool's reserves — NEM / BNB Chain — 2026-10-21

**Loss:** **~\$821,920 USDT** (SlowMist).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*. NemTokenV2 credited any transfer into the PancakeSwap pair as sell volume without checking that a swap settled. The credit survived `skim()` returning the tokens, and `flushLpSellRecycle()` then burned pre-existing LP reserves. The attacker repeated transfer → skim → flush 42 times, synced the lower NEM reserve and sold into the inflated price. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)).

**Attribution:** **pseudonymous** ([`0xfd929b0f270dfea6c4827262b4e2bf6ea50fe9b6`](https://bscscan.com/address/0xfd929b0f270dfea6c4827262b4e2bf6ea50fe9b6)).

**Key teaching point:** **A transfer to a pair is not a sell.** Token logic that burns from the pool on inferred trading activity hands control of the reserves to anyone who can fake the inference.

## Summary

The exploit ran on 2026-10-21 at 03:28 UTC (on-chain time, traced by OAK); SlowMist flagged it on 2026-10-22; victim pair [`0x840e19dcca541ee0b55a3c67e900a39d523b12b8`](https://bscscan.com/address/0x840e19dcca541ee0b55a3c67e900a39d523b12b8).

## Timeline (UTC)

Read it as three stages. **Flaw**: the token counts any transfer into its pair as a sell, and those credits let anyone burn pool reserves. **Take**: 42 rounds of transfer, skim and flush, then one sale into the inflated price. **Aftermath**: no team response found. Exact times are not published; SlowMist's alert is at 2026-10-22 09:52.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-21 (undisclosed) | NemTokenV2 ([`0x9cf0e3ad4efa7ab602d7b5a38c55795cfa777777`](https://bscscan.com/address/0x9cf0e3ad4efa7ab602d7b5a38c55795cfa777777)) credits any transfer of NEM into the PancakeSwap USDT/NEM pair ([`0x840e19dcca541ee0b55a3c67e900a39d523b12b8`](https://bscscan.com/address/0x840e19dcca541ee0b55a3c67e900a39d523b12b8)) as sell volume, without checking that a swap settled. The credit stays valid after `skim()` pulls the tokens back out. The permissionless `flushLpSellRecycle()` then burns part of the pair's existing NEM balance and calls `sync()`, so the recorded NEM reserve falls while the USDT reserve stays. Since when the code was live is not stated. | **T9.016** (flaw) |
| Before 2026-10-21 (undisclosed) | The attacker EOA ([`0xfd929b0f270dfea6c4827262b4e2bf6ea50fe9b6`](https://bscscan.com/address/0xfd929b0f270dfea6c4827262b4e2bf6ea50fe9b6)) is a fresh address funded through Tornado Cash (RektRadar). It deploys an attack contract ([`0x5e6d1f40be466dd2facc94a26818948ecd3b1ca2`](https://bscscan.com/address/0x5e6d1f40be466dd2facc94a26818948ecd3b1ca2)). Some reconstructions also use flash loans from Moolah, Venus and Pancake V3/V4. | — |
| 2026-10-21 03:28:50 (traced by OAK; the sources imply 2026-10-22, see the trace notes; one transaction [`0xfb093c96c0094cbcca10801f97ed2e5ed3d96550ce64b544df5a349545723f91`](https://bscscan.com/tx/0xfb093c96c0094cbcca10801f97ed2e5ed3d96550ce64b544df5a349545723f91)) | The attack contract repeats transfer, skim, flush 42 times, cutting the pair's NEM balance to near zero while the USDT reserve is untouched. | **T9.016** |
| 2026-10-21 03:28:50 (same transaction) | It sells the remaining NEM at the inflated price and takes about \$821,920 USDT from the pool (SlowMist). DefimonAlerts puts the net at about \$726K after loan repayment. Traced by OAK: the pool lost 821,920.43721855 USDT net, 21 USDT lenders were repaid 95,613.33609375 USDT more than they lent, and the attacker EOA received 726,307.1011248 USDT. | **T9.016** |
| Undisclosed | Where the USDT went is not clearly published. One early detection reported funds bridged to Ethereum (RektRadar); no holding address is given. OAK could not trace past the attacker EOA (public BSC RPC refuses log queries); as of 2026-10-30 that EOA holds 0 USDT. | — |
| 2026-10-22 09:52 | SlowMist publishes the alert and root cause; CertiK, Phalcon and Defimon also report it. No team statement, pause, bounty or recovery was observed at RektRadar's cutoff. | — |

Key addresses:

- Attacker EOA (received 726,307.1011248 USDT, traced by OAK): [`0xfd929b0f270dfea6c4827262b4e2bf6ea50fe9b6`](https://bscscan.com/address/0xfd929b0f270dfea6c4827262b4e2bf6ea50fe9b6)
- Attack contract: [`0x5e6d1f40be466dd2facc94a26818948ecd3b1ca2`](https://bscscan.com/address/0x5e6d1f40be466dd2facc94a26818948ecd3b1ca2)
- Vulnerable token contract (NemTokenV2): [`0x9cf0e3ad4efa7ab602d7b5a38c55795cfa777777`](https://bscscan.com/address/0x9cf0e3ad4efa7ab602d7b5a38c55795cfa777777)
- Victim pair (PancakeSwap USDT/NEM): [`0x840e19dcca541ee0b55a3c67e900a39d523b12b8`](https://bscscan.com/address/0x840e19dcca541ee0b55a3c67e900a39d523b12b8)

## Fund flow

BNB Chain leg, traced by OAK on 2026-10-30 from the single exploit transaction with `tools/explorer.py` (public JSON-RPC fallback; `tx` lists every Transfer log). Edges marked `oak` were checked on-chain. The transaction also emits NEM, WBNB, vWBNB, aBnbWBNB and variableDebtBnbUSDT logs. The tool marks them `trusted: false` (the WBNB log is the real WBNB contract, flagged only because the allowlist lists a different WBNB address). They are collateral and borrow legs that net out inside the transaction, so they are excluded from the edges, as are the zero-value USDT logs from the pair.

```oak-flow
as_of: 2026-10-30T13:00Z
nodes:
  - {id: lend, chain: bsc, role: lending, label: "21 flash-loan USDT lenders"}
  - {id: pool, chain: bsc, address: 0x840e19dcca541ee0b55a3c67e900a39d523b12b8, role: vulnerable-contract, label: "PancakeSwap USDT/NEM pair (victim)"}
  - {id: atk, chain: bsc, address: 0x5e6d1f40be466dd2facc94a26818948ecd3b1ca2, role: attack-contract, label: "Attack contract"}
  - {id: eoa, chain: bsc, address: 0xfd929b0f270dfea6c4827262b4e2bf6ea50fe9b6, role: attacker-eoa, label: "Attacker EOA"}
edges:
  - {from: lend, to: atk, asset: USDT, amount: 235785000, tx: 0xfb093c96c0094cbcca10801f97ed2e5ed3d96550ce64b544df5a349545723f91, time: 2026-10-21T03:28:50Z, verified: oak}
  - {from: atk, to: pool, asset: USDT, amount: 235785000, tx: 0xfb093c96c0094cbcca10801f97ed2e5ed3d96550ce64b544df5a349545723f91, time: 2026-10-21T03:28:50Z, technique: T9.016, verified: oak}
  - {from: pool, to: atk, asset: USDT, amount: 236606920.43721855, tx: 0xfb093c96c0094cbcca10801f97ed2e5ed3d96550ce64b544df5a349545723f91, time: 2026-10-21T03:28:50Z, technique: T9.016, verified: oak}
  - {from: atk, to: lend, asset: USDT, amount: 235880613.33609375, tx: 0xfb093c96c0094cbcca10801f97ed2e5ed3d96550ce64b544df5a349545723f91, time: 2026-10-21T03:28:50Z, verified: oak}
  - {from: atk, to: eoa, asset: USDT, amount: 726307.1011248, tx: 0xfb093c96c0094cbcca10801f97ed2e5ed3d96550ce64b544df5a349545723f91, time: 2026-10-21T03:28:50Z, verified: oak}
```

What the trace adds beyond the sources:

- **The numbers reconcile.** In the one transaction the pair paid out 236,606,920.43721855 USDT and took in 235,785,000 USDT, a net loss of 821,920.43721855 USDT, matching SlowMist's ~\$821,920. The attack contract repaid its 21 USDT lenders 235,880,613.33609375 USDT against 235,785,000 borrowed (95,613.33609375 USDT of fees) and sent 726,307.1011248 USDT to the attacker EOA, matching DefimonAlerts' ~\$726K net. 821,920.43721855 minus 95,613.33609375 equals 726,307.1011248.
- **Date conflict.** The chain puts the exploit at 2026-10-21 03:28:50 UTC. The sources (RektRadar, SlowMist alert at 2026-10-22 09:52) read as 2026-10-22. OAK keeps the on-chain time; the title date is left as published.
- **Lenders.** The 21 lender addresses are not individually labelled by OAK, so the Moolah, Venus and Pancake V3/V4 attribution in the timeline is not checked here.
- **The EOA today.** As of 2026-10-30 the attacker EOA holds 0 USDT and 0.00037608145 BNB, at nonce 52, and its code is an EIP-7702 delegation to `0x63c0c19a282a1b52b07dd5a65b58948a07dae32b`. That is its current state, not shown to be the state at exploit time.

Not traced:

- **Onward movement.** The public BSC RPC nodes reject `eth_getLogs` queries ("limit exceeded" or HTTP 403), so `transfers` and `trace` return nothing for the attacker EOA, and native BNB is invisible. Where the 726,307 USDT went is therefore unknown to OAK.
- **Tornado Cash funding and a bridge to Ethereum** are claimed by RektRadar without a chain or address, and OAK cannot check them, so no edge is written.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2113206749524316486>; <https://www.rektradar.xyz/web3-daily-exploits-22-oct-2026-nem-820k-lp-burn-reserve-manip/>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** SlowMist's trace analysis; RektRadar describes the same LP-burn reserve manipulation.

## Public references

- `[slowmistnem2026]` — SlowMist TI alert (2026-10-22): <https://x.com/SlowMist_Team/status/2113206749524316486>
- `[bscscannem2026]` — exploit transaction: <https://bscscan.com/tx/0xfb093c96c0094cbcca10801f97ed2e5ed3d96550ce64b544df5a349545723f91>
