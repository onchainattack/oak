# Set Protocol — `actualizeFee()` rounded unit shares up by one with no fee minted, and issue-then-redeem pocketed the difference — Set Protocol vault / Ethereum — 2026-10-06

**Loss:** **~5.08 ETH (~\$13.7K)**, per SlowMist.

**OAK Techniques observed:** **OAK-T9.011** (Precision-Loss / Rounding Attack — *primary*, per SlowMist. `actualizeFee()` recalculated `unitShares` with **upward rounding even though no fee was minted**, moving it from 4,927 to 4,928. The attacker issued set tokens before the update and redeemed the same quantity after it, taking the collateral created by the one-unit increase; **Uniswap v4 flash accounting** supplied temporary liquidity to scale it. See [`techniques/T9.011-precision-loss-rounding-attack.md`](../techniques/T9.011-precision-loss-rounding-attack.md)). Preparation and cash-out: **OAK-T7.001** (Tornado Cash funding of the attacker EOA; 0.75 ETH sent through MetaBridge; traced by OAK).

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
| 2026-10-06 07:17:35 (traced by OAK) | Before the exploit, the attacker EOA receives 0.09787518 ETH from the Tornado Cash 0.1 ETH pool (tx [`0x691b04f78de9469b2abfb6b32219bab211a190269b65c213d7d10fbfa6b9f7cc`](https://etherscan.io/tx/0x691b04f78de9469b2abfb6b32219bab211a190269b65c213d7d10fbfa6b9f7cc)). | T7.001 |
| 2026-10-06 07:36:47 (traced by OAK) | The exploit transaction lands. The attack contract borrows 25,044.67345809 ETH from the Uniswap v4 pool manager, issues, redeems, repays, and forwards the 5.08314866 ETH profit to the attacker EOA. | **T9.011** |
| 2026-10-06 08:21:23 to 16:43:47 (traced by OAK) | The EOA sends 4.9 ETH to a swap helper contract `0x254a023bf5e9099e1472402ad59748086d6632bd` (0.47344328 ETH and 69,957.07424517 BANA come back) and 0.75076744 ETH into MetaBridge. | — |
| 2026-10-06 08:07 | SlowMist posts its alert. No project statement, pause or fix is found in the cited source (undisclosed). | response |

Key addresses:

- Attacker EOA — [`0x506440728d84eb22809dc9464bc8189618a1c5b6`](https://etherscan.io/address/0x506440728d84eb22809dc9464bc8189618a1c5b6)
- Swap helper (traced by OAK) — [`0x254a023bf5e9099e1472402ad59748086d6632bd`](https://etherscan.io/address/0x254a023bf5e9099e1472402ad59748086d6632bd)
- Attack contract — [`0x016feaaa25ab8325e233bc8a2c25055bee0b2f6e`](https://etherscan.io/address/0x016feaaa25ab8325e233bc8a2c25055bee0b2f6e)
- Victim Set Protocol vault — [`0x5b67871c3a857de81a1ca0f9f7945e5670d986dc`](https://etherscan.io/address/0x5b67871c3a857de81a1ca0f9f7945e5670d986dc)
- Vulnerable contract — [`0x54e8371c1ec43e58fb53d4ef4ed463c17ba8a6be`](https://etherscan.io/address/0x54e8371c1ec43e58fb53d4ef4ed463c17ba8a6be)

## Fund flow

Ethereum only, traced by OAK with `tools/explorer.py` (Blockscout, keyless) on 2026-10-30, window 2026-10-06 to 2026-10-11. Edges marked *traced by OAK* were checked on-chain.

```oak-flow
as_of: 2026-10-30T14:20Z
nodes:
  - {id: tc, chain: ethereum, address: 0x12d66f87a04a9e220743712ce6d9bb1b5616b8fc, role: mixer, label: "Tornado Cash 0.1 ETH pool"}
  - {id: eoa, chain: ethereum, address: 0x506440728d84eb22809dc9464bc8189618a1c5b6, role: attacker-eoa, label: "Attacker EOA"}
  - {id: atk, chain: ethereum, address: 0x016feaaa25ab8325e233bc8a2c25055bee0b2f6e, role: attack-contract, label: "Attack contract"}
  - {id: v4, chain: ethereum, address: 0x000000000004444c5dc75cb358380d2e3de08a90, role: dex, label: "Uniswap v4 pool manager (flash liquidity)"}
  - {id: vault, chain: ethereum, address: 0x5b67871c3a857de81a1ca0f9f7945e5670d986dc, role: victim, label: "Set Protocol vault"}
  - {id: help, chain: ethereum, address: 0x254a023bf5e9099e1472402ad59748086d6632bd, role: intermediary, label: "Swap helper contract"}
  - {id: p1, chain: ethereum, address: 0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640, role: dex, label: "USDC/WETH pool"}
  - {id: p2, chain: ethereum, address: 0x1221b9d4ce1fc45fa03156a0657425a8ddc222ef, role: dex, label: "BANA pool"}
  - {id: mb, chain: ethereum, address: 0x0439e60f02a8900a951603950d8d4527f400c3f1, role: bridge, label: "MetaBridge"}
edges:
  - {from: tc, to: eoa, asset: ETH, amount: 0.09787518, tx: 0x691b04f78de9469b2abfb6b32219bab211a190269b65c213d7d10fbfa6b9f7cc, time: 2026-10-06T07:17:35Z, technique: T7.001, verified: oak}
  - {from: v4, to: atk, asset: "ETH (flash, repaid in the same transaction)", amount: 25044.67345809, tx: 0xaca5f83ff3a206209f3d213c33d04e6febe345f6ad52ef476bd1c0ee1505ba65, time: 2026-10-06T07:36:47Z, technique: T9.011, verified: oak}
  - {from: atk, to: vault, asset: "WETH (issue)", amount: 25044.67345809, tx: 0xaca5f83ff3a206209f3d213c33d04e6febe345f6ad52ef476bd1c0ee1505ba65, time: 2026-10-06T07:36:47Z, technique: T9.011, verified: oak}
  - {from: vault, to: atk, asset: "WETH (redeem)", amount: 25049.75660675, tx: 0xaca5f83ff3a206209f3d213c33d04e6febe345f6ad52ef476bd1c0ee1505ba65, time: 2026-10-06T07:36:47Z, technique: T9.011, verified: oak}
  - {from: atk, to: eoa, asset: ETH, amount: 5.08314866, tx: 0xaca5f83ff3a206209f3d213c33d04e6febe345f6ad52ef476bd1c0ee1505ba65, time: 2026-10-06T07:36:47Z, technique: T9.011, verified: oak}
  - {from: eoa, to: help, asset: ETH, amount: 4.9, tx: 0x75647f9bc55c40df0624d0d869bd5756529d79020427e7e61e8d89311e9661ea, time: 2026-10-06T08:21:23Z, verified: oak}
  - {from: help, to: p1, asset: WETH, amount: 4.42655672, tx: 0x75647f9bc55c40df0624d0d869bd5756529d79020427e7e61e8d89311e9661ea, time: 2026-10-06T08:21:23Z, verified: oak}
  - {from: help, to: p2, asset: USDC, amount: 12000, tx: 0x75647f9bc55c40df0624d0d869bd5756529d79020427e7e61e8d89311e9661ea, time: 2026-10-06T08:21:23Z, verified: oak}
  - {from: help, to: eoa, asset: BANA, amount: 69957.07424517, tx: 0x38e8b1f11a6e49244ec3f8ebc0e223e34e20da0171d6047ae6070ec59f989478, time: 2026-10-06T08:44:23Z, verified: oak}
  - {from: help, to: eoa, asset: ETH, amount: 0.47344328, tx: 0xc3d0eb1da723ce06ba3541b31bb543f4a8a06f31bb3d01a84ad411da3c4f667a, time: 2026-10-06T08:44:35Z, verified: oak}
  - {from: eoa, to: mb, asset: ETH, amount: 0.75076744, tx: 0xca676a4185efcbbffbcbb2e702e64c1df54fe2376465599ae0781ab80bbd27a1, time: 2026-10-06T16:43:47Z, verified: oak}
```

What the trace adds beyond the sources:

- **The loss is confirmed.** In one transaction (07:36:47 UTC) the attack contract sent 25,044.67345809 WETH to the vault and got 25,049.75660675 WETH back, a difference of **5.08314866 ETH**, which matches SlowMist's 5.08 ETH. The same 25,044.67345809 ETH, borrowed from the Uniswap v4 pool manager and repaid in the same transaction, supplied the temporary liquidity.
- **The ETH went to the attacker EOA the same transaction.** `0x016feaaa…` forwarded all 5.08314866 ETH to `0x506440728d84eb22809dc9464bc8189618a1c5b6`.
- **Funding.** The EOA was funded 19 minutes earlier by a 0.09787518 ETH Tornado Cash withdrawal.
- **Use of the proceeds.** The EOA sent 4.9 ETH to a swap helper contract (only the EOA calls it; it sold 4.42655672 WETH for USDC, bought BANA with 12,000 USDC, and returned 0.47344328 ETH and 69,957.07424517 BANA to the EOA) and 0.75076744 ETH into MetaBridge at 16:43:47. Inflows (0.09787518 + 5.08314866 + 0.47344328) less outflows (4.9 + 0.75076744) leave about 0.0036 ETH, roughly the gas the EOA paid; its balance now is 8.352e-05 ETH. The helper's role is read from the transfer pattern; the tool carries no label for it.
- **The vulnerable contract is the Set token.** The two token-only legs involving `0x54e8371c1ec43e58fb53d4ef4ed463c17ba8a6be` (ETHEMAAPY, 37,872.408793 minted and burned) and a second token (BACOL) are flagged `trusted: false` only because they are not on OAK's allowlist, so they were left out of the edges. The matching WETH legs are in the block.

Limits and open points:

- **Bridge destination.** The 0.75076744 ETH went through MetaBridge (the tool labels `0x0439e60f…` as a MetaMask bridge); the destination chain and address were not followed, and the next hops on Ethereum show only router and fee transfers.
- **Residual BANA.** 69,957.07424517 BANA stayed with the EOA through the window. No sale was seen.
- **No project or issuer action** appears in the sources, so no freeze or recovery edge is drawn.

## Root-cause evidence

- **Technique:** OAK-T9.011
- **Source:** <https://x.com/SlowMist_Team/status/2107382337654951943>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist: `actualizeFee()` rounded `unitShares` up (4,927 → 4,928) with no fee minted; issue-before / redeem-after extracted the difference. No project post-mortem.

## Public references

- `[slowmistsetprotocol2026]` — SlowMist on X, Set Protocol alert (2026-10-06): <https://x.com/SlowMist_Team/status/2107382337654951943>
