# TENDRIL — sell hook burned the pair's own tokens and synced reserves before the seller's transfer arrived, draining the USDT side — TENDRIL tax token / PancakeSwap V2 / BNB Chain — 2026-11-04

**Loss:** **~\$555K** (about 555K USDT from the TENDRIL/USDT pair, per CertiK Alert; OAK's trace of the exploit transaction nets the pair at 555,670.55 USDT). ExVul puts the attacker's own profit at no more than ~181,910 USDT after costs; DefimonAlerts says payout addresses received ~\$541K. No recovery or operator statement found.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*, per ExVul and CertiK. Every taxed TENDRIL sell called `PoolControl.sellToken(A)`, which called the sender-restricted `TENDRIL.controlburn(2A)` on the pair itself and then `pair.sync()`, before the seller's outer 70% transfer reached the pair. The pair's synchronized TENDRIL reserve fell to 6,678 wei, so the delayed input withdrew almost all the USDT. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). **OAK-T9.002** (Flash-Loan-Enabled Exploit — ~30.64M USDT borrowed from the PancakeSwap Infinity Vault and repaid inside the same transaction, traced by OAK). **OAK-T7.001** (Mixer funding — DefimonAlerts reports the exploit contract was funded via Tornado Cash; not checked by OAK).

**Attribution:** **pseudonymous** (exploit deployer [`0xb81e4aafa347b27112b7f6f5de6cf7cd516021ff`](https://bscscan.com/address/0xb81e4aafa347b27112b7f6f5de6cf7cd516021ff), profit beneficiary [`0xb87cf5ab84d0ab9545358cd30229627305331373`](https://bscscan.com/address/0xb87cf5ab84d0ab9545358cd30229627305331373)).

**Key teaching point:** **A token hook must never change the pair's balance and call `sync()` in the middle of a swap.** The `msg.sender` checks on `controlburn` only proved the call came from the Token and PoolControl contracts, and an ordinary seller controls that whole path. Any burn from a liquidity pair belongs outside the sell path, or must be removed.

## Summary

TENDRIL is a Flap-style tax token on BNB Chain with a 30% tax on transfers. On a taxed sell the token calls `PoolControl.sellToken`, which calls a restricted `controlburn` on the PancakeSwap V2 pair and then `pair.sync()`. This happens before the seller's remaining 70% arrives at the pair. An attacker contract flash-borrowed about 30.64M USDT, ran a fee-on-transfer swap through the thin TENDRIL/USDT pair, and let the hook crush the pair's TENDRIL reserve. The delayed input then withdrew nearly all USDT. The loan was repaid in the same transaction. ExVul alerted at 2026-11-05 05:58 UTC, DefimonAlerts at 06:29 and CertiK Alert at 07:22. RektRadar summarised it on 2026-11-05 and found no official project statement.

## Timeline (UTC)

**Flaw** (token design), **Prep** (exploit contract), **Take** (one transaction), **Money** (flash-loan repayment and profit), **Response**. The attack time is the block time from OAK's lookup; alert times are the post timestamps.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-04 (deployment date undisclosed) | TENDRIL ships with a sell hook: each taxed sell calls `PoolControl.sellToken(A)`, which calls `controlburn(2A)` to debit the V2 pair's own balance and then `pair.sync()`, all before the seller's outer 70% transfer arrives. The caller checks only authenticate the immediate Token and PoolControl contracts. | **T9.016** |
| Before 2026-11-04 16:02 (undisclosed) | Exploit contract [`0xc8cb6a2aa825a576e1470479046056fe414ee0f8`](https://bscscan.com/address/0xc8cb6a2aa825a576e1470479046056fe414ee0f8) is deployed from the deployer EOA, reportedly funded via Tornado Cash (DefimonAlerts). | T7.001 |
| 2026-11-04 16:02:45 | One transaction [`0xfdff4fba4327821c204af07944076ecaaee163a994398fdf4063d08712e40059`](https://bscscan.com/tx/0xfdff4fba4327821c204af07944076ecaaee163a994398fdf4063d08712e40059). The contract borrows 30,641,402.46969337 USDT from the PancakeSwap Infinity Vault, pushes 4,097,517.64098935 USDT into the TENDRIL/USDT pair through fee-on-transfer swaps, and triggers the hook. The pair loses its TENDRIL reserve to the burn and sync, and the delayed swap pays out 4,421,023.35746928 USDT. | **T9.016**, T9.002 |
| 2026-11-04 16:02:45 | The vault is repaid 30,641,402.46969337 USDT and 308,959.36754317 USDT goes to [`0xb87cf5ab84d0ab9545358cd30229627305331373`](https://bscscan.com/address/0xb87cf5ab84d0ab9545358cd30229627305331373). DefimonAlerts counts ~\$541K across payout addresses. Movement after the transaction is not traced by OAK. | — |
| 2026-11-05 05:58 to 07:22 | ExVul, DefimonAlerts and CertiK Alert publish the root cause and loss. Early monitoring cited ~\$309K (TenArmorAlert, via RektRadar). | response |
| By 2026-11-05 | No pause, statement or recovery plan from the TENDRIL team found by RektRadar. | response |

Key addresses:

- Exploit deployer — [`0xb81e4aafa347b27112b7f6f5de6cf7cd516021ff`](https://bscscan.com/address/0xb81e4aafa347b27112b7f6f5de6cf7cd516021ff)
- Exploit contract — [`0xc8cb6a2aa825a576e1470479046056fe414ee0f8`](https://bscscan.com/address/0xc8cb6a2aa825a576e1470479046056fe414ee0f8)
- Profit beneficiary — [`0xb87cf5ab84d0ab9545358cd30229627305331373`](https://bscscan.com/address/0xb87cf5ab84d0ab9545358cd30229627305331373)
- Victim TENDRIL/USDT pair — [`0x5de082471f2a9f01a61e467a32837dee830d99e0`](https://bscscan.com/address/0x5de082471f2a9f01a61e467a32837dee830d99e0)
- TENDRIL token — [`0xb1afdfd850da168f2cc9f742e11cdda5273973d2`](https://bscscan.com/address/0xb1afdfd850da168f2cc9f742e11cdda5273973d2)
- PoolControl (tax controller) — [`0xd00be871eb7a5cb8a69aea41e4c95affc92e54fe`](https://bscscan.com/address/0xd00be871eb7a5cb8a69aea41e4c95affc92e54fe)
- Flash-loan source, PancakeSwap Infinity Vault — [`0x238a358808379702088667322f80ac48bad5e6c4`](https://bscscan.com/address/0x238a358808379702088667322f80ac48bad5e6c4)

## Fund flow

```oak-flow
as_of: 2026-11-10T00:00Z
nodes:
  - {id: vault, chain: bsc, address: 0x238a358808379702088667322f80ac48bad5e6c4, role: lending, label: "PancakeSwap Infinity Vault (flash loan)"}
  - {id: atk, chain: bsc, address: 0xc8cb6a2aa825a576e1470479046056fe414ee0f8, role: attack-contract, label: "Exploit contract"}
  - {id: pair, chain: bsc, address: 0x5de082471f2a9f01a61e467a32837dee830d99e0, role: vulnerable-contract, label: "TENDRIL/USDT PancakeSwap V2 pair (victim)"}
  - {id: ben, chain: bsc, address: 0xb87cf5ab84d0ab9545358cd30229627305331373, role: attacker-receiver, label: "Profit beneficiary"}
edges:
  - {from: vault, to: atk, asset: USDT, amount: 30641402.46969337, tx: 0xfdff4fba4327821c204af07944076ecaaee163a994398fdf4063d08712e40059, time: 2026-11-04T16:02:45Z, verified: oak}
  - {from: atk, to: pair, asset: USDT, amount: 4097517.64098935, tx: 0xfdff4fba4327821c204af07944076ecaaee163a994398fdf4063d08712e40059, time: 2026-11-04T16:02:45Z, technique: T9.016, verified: oak}
  - {from: pair, to: atk, asset: USDT, amount: 4421023.35746928, tx: 0xfdff4fba4327821c204af07944076ecaaee163a994398fdf4063d08712e40059, time: 2026-11-04T16:02:45Z, technique: T9.016, verified: oak}
  - {from: atk, to: vault, asset: USDT, amount: 30641402.46969337, tx: 0xfdff4fba4327821c204af07944076ecaaee163a994398fdf4063d08712e40059, time: 2026-11-04T16:02:45Z, verified: oak}
  - {from: atk, to: ben, asset: USDT, amount: 308959.36754317, tx: 0xfdff4fba4327821c204af07944076ecaaee163a994398fdf4063d08712e40059, time: 2026-11-04T16:02:45Z, verified: oak}
```

What the trace adds beyond the sources:

- **The numbers reconcile.** The exploit contract took in 35,062,425.83 USDT and paid out the same, with no flash-loan fee visible in the USDT transfers. Inside the same transaction the pair also sent 696,494.466819 USDT to the PoolControl contract (the hook's sell) and got 464,329.644546 back. Net for the pair: 555,670.55 USDT lost, matching CertiK's ~\$555K.
- **Beneficiary share differs from sources.** Only 308,959.37 USDT reaches the beneficiary in this transaction. ExVul reports a further 30K USDT paid to a hard-coded beneficiary. DefimonAlerts' ~\$541K across payout addresses is not reproduced by OAK.
- **Tax wallets.** PoolControl forwarded 46,432.9644546, 69,649.4466819 and 116,082.4111365 USDT to three other addresses in the same transaction. OAK has not identified them.
- **A smaller USDT transfer** of 14,546.34893676 USDT went from the exploit contract to 0x893eaf48db1e4f94e2de370d94b405c8001ccf50 for a purchase of other tokens (TVS and others); OAK did not follow it.

Not traced: where the beneficiary's USDT went after the transaction.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/exvulsec/status/2118221337617383455>; <https://x.com/CertiKAlert/status/2118242639212658985>; <https://x.com/DefimonAlerts/status/2118229071972684057>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** ExVul and CertiK independently describe the same defect: the sell hook debits the pair's token balance and syncs reserves before the remaining sell input arrives, so the delayed input withdraws almost all USDT. ExVul adds the function path (`PoolControl.sellToken`, `TENDRIL.controlburn`, `pair.sync()`) and the 6,678 wei reserve. DefimonAlerts frames it instead as spot-price manipulation of the auto-liquidation sell; OAK follows the ExVul and CertiK reading, which matches the on-chain transfers (the pair's TENDRIL reserve, not a price, is what failed). Contract source was not reviewed by OAK. No operator statement.

## Public references

- `exvul2026tendril` — ExVul, alert thread (2026-11-05): <https://x.com/exvulsec/status/2118221337617383455>
- `defimon2026tendril` — DefimonAlerts, alert (2026-11-05): <https://x.com/DefimonAlerts/status/2118229071972684057>
- `certik2026tendril` — CertiK Alert (2026-11-05): <https://x.com/CertiKAlert/status/2118242639212658985>
- `rektradar2026tendril` — RektRadar, "Web3 Daily Exploits, 5 Nov 2026: TENDRIL" (2026-11-05): <https://www.rektradar.xyz/web3-daily-exploits-05-nov-2026-tendril-555k-sell-hook/>
- `bscscan2026tendrilTx` — BscScan, exploit transaction: <https://bscscan.com/tx/0xfdff4fba4327821c204af07944076ecaaee163a994398fdf4063d08712e40059>
