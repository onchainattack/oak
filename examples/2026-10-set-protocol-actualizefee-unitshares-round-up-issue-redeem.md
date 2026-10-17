# Set Protocol — `actualizeFee()` rounded unit shares up by one with no fee minted, and issue-then-redeem pocketed the difference — Set Protocol vault / Ethereum — 2026-10-06

**Loss:** **~5.08 ETH (~\$13.7K)**, per SlowMist.

**OAK Techniques observed:** **OAK-T9.011** (Precision-Loss / Rounding Attack — *primary*, per SlowMist. `actualizeFee()` recalculated `unitShares` with **upward rounding even though no fee was minted**, moving it from 4,927 to 4,928. The attacker issued set tokens before the update and redeemed the same quantity after it, taking the collateral created by the one-unit increase; **Uniswap v4 flash accounting** supplied temporary liquidity to scale it. See [`techniques/T9.011-precision-loss-rounding-attack.md`](../techniques/T9.011-precision-loss-rounding-attack.md)).

**Attribution:** **pseudonymous.**

**Key teaching point:** **Round against the caller, and do not recompute when nothing changed.** A no-op fee update that still re-rounds a per-unit value hands a free unit to anyone who can straddle it; flash liquidity turns one unit into a payable amount.

## Summary

On 2026-10-06 an attack contract issued into a Set Protocol vault (`0x5b67…986dc`), triggered the fee actualisation that bumped `unitShares` by one, and redeemed, repeating with flash-accounted liquidity (tx `0xaca5f83f…ba65`).

## Root-cause evidence

- **Technique:** OAK-T9.011
- **Source:** <https://x.com/SlowMist_Team/status/2107382337654951943>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist: `actualizeFee()` rounded `unitShares` up (4,927 → 4,928) with no fee minted; issue-before / redeem-after extracted the difference. No project post-mortem.

## Public references

- `[slowmistsetprotocol2026]` — SlowMist on X, Set Protocol alert (2026-10-06): <https://x.com/SlowMist_Team/status/2107382337654951943>
