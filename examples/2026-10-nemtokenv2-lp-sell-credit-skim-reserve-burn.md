# NEM (NemTokenV2) — transfers into the LP pair were credited as sells, skimmed back out, and the credits used to burn the pool's reserves — NEM / BNB Chain — 2026-10-22

**Loss:** **~\$821,920 USDT** (SlowMist).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*. NemTokenV2 credited any transfer into the PancakeSwap pair as sell volume without checking that a swap settled. The credit survived `skim()` returning the tokens, and `flushLpSellRecycle()` then burned pre-existing LP reserves. The attacker repeated transfer → skim → flush 42 times, synced the lower NEM reserve and sold into the inflated price. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)).

**Attribution:** **pseudonymous** ([`0xfd929b0f270dfea6c4827262b4e2bf6ea50fe9b6`](https://bscscan.com/address/0xfd929b0f270dfea6c4827262b4e2bf6ea50fe9b6)).

**Key teaching point:** **A transfer to a pair is not a sell.** Token logic that burns from the pool on inferred trading activity hands control of the reserves to anyone who can fake the inference.

## Summary

SlowMist flagged the exploit on 2026-10-22; victim pair [`0x840e19dcca541ee0b55a3c67e900a39d523b12b8`](https://bscscan.com/address/0x840e19dcca541ee0b55a3c67e900a39d523b12b8).

## Timeline (UTC)

Read it as three stages. **Flaw**: the token counts any transfer into its pair as a sell, and those credits let anyone burn pool reserves. **Take**: 42 rounds of transfer, skim and flush, then one sale into the inflated price. **Aftermath**: no team response found. Exact times are not published; SlowMist's alert is at 2026-10-22 09:52.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-22 (undisclosed) | NemTokenV2 ([`0x9cf0e3ad4efa7ab602d7b5a38c55795cfa777777`](https://bscscan.com/address/0x9cf0e3ad4efa7ab602d7b5a38c55795cfa777777)) credits any transfer of NEM into the PancakeSwap USDT/NEM pair ([`0x840e19dcca541ee0b55a3c67e900a39d523b12b8`](https://bscscan.com/address/0x840e19dcca541ee0b55a3c67e900a39d523b12b8)) as sell volume, without checking that a swap settled. The credit stays valid after `skim()` pulls the tokens back out. The permissionless `flushLpSellRecycle()` then burns part of the pair's existing NEM balance and calls `sync()`, so the recorded NEM reserve falls while the USDT reserve stays. Since when the code was live is not stated. | **T9.016** (flaw) |
| Before 2026-10-22 (undisclosed) | The attacker EOA ([`0xfd929b0f270dfea6c4827262b4e2bf6ea50fe9b6`](https://bscscan.com/address/0xfd929b0f270dfea6c4827262b4e2bf6ea50fe9b6)) is a fresh address funded through Tornado Cash (RektRadar). It deploys an attack contract ([`0x5e6d1f40be466dd2facc94a26818948ecd3b1ca2`](https://bscscan.com/address/0x5e6d1f40be466dd2facc94a26818948ecd3b1ca2)). Some reconstructions also use flash loans from Moolah, Venus and Pancake V3/V4. | — |
| 2026-10-22 (a few hours before the 09:52 alert; one transaction [`0xfb093c96c0094cbcca10801f97ed2e5ed3d96550ce64b544df5a349545723f91`](https://bscscan.com/tx/0xfb093c96c0094cbcca10801f97ed2e5ed3d96550ce64b544df5a349545723f91)) | The attack contract repeats transfer, skim, flush 42 times, cutting the pair's NEM balance to near zero while the USDT reserve is untouched. | **T9.016** |
| 2026-10-22 (same transaction) | It sells the remaining NEM at the inflated price and takes about \$821,920 USDT from the pool (SlowMist). DefimonAlerts puts the net at about \$726K after loan repayment. | **T9.016** |
| Undisclosed | Where the USDT went is not clearly published. One early detection reported funds bridged to Ethereum (RektRadar); no holding address is given. | — |
| 2026-10-22 09:52 | SlowMist publishes the alert and root cause; CertiK, Phalcon and Defimon also report it. No team statement, pause, bounty or recovery was observed at RektRadar's cutoff. | — |

Key addresses:

- Attacker EOA: [`0xfd929b0f270dfea6c4827262b4e2bf6ea50fe9b6`](https://bscscan.com/address/0xfd929b0f270dfea6c4827262b4e2bf6ea50fe9b6)
- Attack contract: [`0x5e6d1f40be466dd2facc94a26818948ecd3b1ca2`](https://bscscan.com/address/0x5e6d1f40be466dd2facc94a26818948ecd3b1ca2)
- Vulnerable token contract (NemTokenV2): [`0x9cf0e3ad4efa7ab602d7b5a38c55795cfa777777`](https://bscscan.com/address/0x9cf0e3ad4efa7ab602d7b5a38c55795cfa777777)
- Victim pair (PancakeSwap USDT/NEM): [`0x840e19dcca541ee0b55a3c67e900a39d523b12b8`](https://bscscan.com/address/0x840e19dcca541ee0b55a3c67e900a39d523b12b8)

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2113206749524316486>; <https://www.rektradar.xyz/web3-daily-exploits-22-oct-2026-nem-820k-lp-burn-reserve-manip/>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** SlowMist's trace analysis; RektRadar describes the same LP-burn reserve manipulation.

## Public references

- `[slowmistnem2026]` — SlowMist TI alert (2026-10-22): <https://x.com/SlowMist_Team/status/2113206749524316486>
- `[bscscannem2026]` — exploit transaction: <https://bscscan.com/tx/0xfb093c96c0094cbcca10801f97ed2e5ed3d96550ce64b544df5a349545723f91>
