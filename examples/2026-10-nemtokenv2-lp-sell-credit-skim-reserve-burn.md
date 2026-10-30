# NEM (NemTokenV2) — transfers into the LP pair were credited as sells, skimmed back out, and the credits used to burn the pool's reserves — NEM / BNB Chain — 2026-10-22

**Loss:** **~\$821,920 USDT** (SlowMist).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*. NemTokenV2 credited any transfer into the PancakeSwap pair as sell volume without checking that a swap settled. The credit survived `skim()` returning the tokens, and `flushLpSellRecycle()` then burned pre-existing LP reserves. The attacker repeated transfer → skim → flush 42 times, synced the lower NEM reserve and sold into the inflated price. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)).

**Attribution:** **pseudonymous** (`0xfd92…b6`).

**Key teaching point:** **A transfer to a pair is not a sell.** Token logic that burns from the pool on inferred trading activity hands control of the reserves to anyone who can fake the inference.

## Summary

SlowMist flagged the exploit on 2026-10-22; victim pair `0x840e…12b8`.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2113206749524316486>; <https://www.rektradar.xyz/web3-daily-exploits-22-oct-2026-nem-820k-lp-burn-reserve-manip/>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** SlowMist's trace analysis; RektRadar describes the same LP-burn reserve manipulation.

## Public references

- `[slowmistnem2026]` — SlowMist TI alert (2026-10-22): <https://x.com/SlowMist_Team/status/2113206749524316486>
- `[bscscannem2026]` — exploit transaction: <https://bscscan.com/tx/0xfb093c96c0094cbcca10801f97ed2e5ed3d96550ce64b544df5a349545723f91>
