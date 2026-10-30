# Set Protocol — `actualizeFee()` rounded unit shares up by one with no fee minted, and issue-then-redeem pocketed the difference — Set Protocol vault / Ethereum — 2026-10-06

**Loss:** **~5.08 ETH (~\$13.7K)**, per SlowMist.

**OAK Techniques observed:** **OAK-T9.011** (Precision-Loss / Rounding Attack — *primary*, per SlowMist. `actualizeFee()` recalculated `unitShares` with **upward rounding even though no fee was minted**, moving it from 4,927 to 4,928. The attacker issued set tokens before the update and redeemed the same quantity after it, taking the collateral created by the one-unit increase; **Uniswap v4 flash accounting** supplied temporary liquidity to scale it. See [`techniques/T9.011-precision-loss-rounding-attack.md`](../techniques/T9.011-precision-loss-rounding-attack.md)).

**Attribution:** **pseudonymous.**

**Key teaching point:** **Round against the caller, and do not recompute when nothing changed.** A no-op fee update that still re-rounds a per-unit value hands a free unit to anyone who can straddle it; flash liquidity turns one unit into a payable amount.

## Summary

On 2026-10-06 an attack contract issued into a Set Protocol vault ([`0x5b67871c3a857de81a1ca0f9f7945e5670d986dc`](https://etherscan.io/address/0x5b67871c3a857de81a1ca0f9f7945e5670d986dc)), triggered the fee actualisation that bumped `unitShares` by one, and redeemed, repeating with flash-accounted liquidity (tx [`0xaca5f83ff3a206209f3d213c33d04e6febe345f6ad52ef476bd1c0ee1505ba65`](https://etherscan.io/tx/0xaca5f83ff3a206209f3d213c33d04e6febe345f6ad52ef476bd1c0ee1505ba65)).

## Timeline (UTC)

Read it as three stages. **Flaw**: `actualizeFee()` re-rounds `unitShares` upward even when no fee is minted. **Take**: issue before the update, redeem after it, using flash-accounted liquidity to scale a one-unit gain. **After**: only an alert is public. The only source is SlowMist's alert; exact transaction time is not given.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-06 (undisclosed) | The vulnerable contract [`0x54e8371c1ec43e58fb53d4ef4ed463c17ba8a6be`](https://etherscan.io/address/0x54e8371c1ec43e58fb53d4ef4ed463c17ba8a6be) is live with `actualizeFee()` recalculating `unitShares` with upward rounding even when no fee was minted. Since when is not stated. | **T9.011** (flaw) |
| Before 2026-10-06 (undisclosed) | Preparation: the attacker EOA [`0x506440728d84eb22809dc9464bc8189618a1c5b6`](https://etherscan.io/address/0x506440728d84eb22809dc9464bc8189618a1c5b6) deploys the attack contract [`0x016feaaa25ab8325e233bc8a2c25055bee0b2f6e`](https://etherscan.io/address/0x016feaaa25ab8325e233bc8a2c25055bee0b2f6e). Funding source and deployment time are not published. | — |
| 2026-10-06 (time undisclosed) | In one transaction ([`0xaca5f83ff3a206209f3d213c33d04e6febe345f6ad52ef476bd1c0ee1505ba65`](https://etherscan.io/tx/0xaca5f83ff3a206209f3d213c33d04e6febe345f6ad52ef476bd1c0ee1505ba65)) the attack contract issues set tokens from the vault [`0x5b67871c3a857de81a1ca0f9f7945e5670d986dc`](https://etherscan.io/address/0x5b67871c3a857de81a1ca0f9f7945e5670d986dc) before the fee update, using Uniswap v4 flash accounting as temporary liquidity. | **T9.011** |
| 2026-10-06 (same transaction) | `actualizeFee()` runs and raises `unitShares` from 4,927 to 4,928 although no fee was minted. | **T9.011** |
| 2026-10-06 (same transaction) | The attacker redeems the same quantity after the update and takes the collateral created by the one-unit increase. The loss is about 5.08 ETH (about \$13.7K). | **T9.011** |
| After the exploit | Where the ETH went is not published in the cited source. | — |
| 2026-10-06 08:07 | SlowMist posts its alert. No project statement, pause or fix is found in the cited source (undisclosed). | response |

Key addresses:

- Attacker EOA — [`0x506440728d84eb22809dc9464bc8189618a1c5b6`](https://etherscan.io/address/0x506440728d84eb22809dc9464bc8189618a1c5b6)
- Attack contract — [`0x016feaaa25ab8325e233bc8a2c25055bee0b2f6e`](https://etherscan.io/address/0x016feaaa25ab8325e233bc8a2c25055bee0b2f6e)
- Victim Set Protocol vault — [`0x5b67871c3a857de81a1ca0f9f7945e5670d986dc`](https://etherscan.io/address/0x5b67871c3a857de81a1ca0f9f7945e5670d986dc)
- Vulnerable contract — [`0x54e8371c1ec43e58fb53d4ef4ed463c17ba8a6be`](https://etherscan.io/address/0x54e8371c1ec43e58fb53d4ef4ed463c17ba8a6be)

## Root-cause evidence

- **Technique:** OAK-T9.011
- **Source:** <https://x.com/SlowMist_Team/status/2107382337654951943>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist: `actualizeFee()` rounded `unitShares` up (4,927 → 4,928) with no fee minted; issue-before / redeem-after extracted the difference. No project post-mortem.

## Public references

- `[slowmistsetprotocol2026]` — SlowMist on X, Set Protocol alert (2026-10-06): <https://x.com/SlowMist_Team/status/2107382337654951943>
