# X7 Finance — `claimRewards()` with an empty array added the same ETH balance to total rewards again and again — X7 Finance (X7Pioneer) / Ethereum — 2026-10-08

**Loss:** **~6.78 ETH (~\$16.5K)**, per SlowMist.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*, per SlowMist. In `X7Pioneer.claimRewards()`, `totalRewards` grows by `address(this).balance - lastETHBalance` on every call, but `lastETHBalance` is only updated when `claimable > 0`. Calling with an empty array leaves `claimable` at 0, so the same unaccounted balance is re-added each time and the per-token reward inflates. The attacker donated ETH first to enlarge the delta. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)).

**Attribution:** **pseudonymous.**

**Key teaching point:** **Update the checkpoint on every path that reads it.** A "new income since last time" delta is only safe if *last time* moves whenever the delta is counted, not only when someone is paid.

## Summary

On 2026-10-08 an attacker repeatedly called `claimRewards()` on X7Pioneer ([`0x70000299ee8910ccacd97b1bb560e34f49c9e4f7`](https://etherscan.io/address/0x70000299ee8910ccacd97b1bb560e34f49c9e4f7)) with an empty token list after donating ETH, inflating `totalRewards`, then claimed the inflated rewards (tx [`0xc98056d6ab55ef898189da5fa1fb08b968cb84ca99528d171f8240836b21766d`](https://etherscan.io/tx/0xc98056d6ab55ef898189da5fa1fb08b968cb84ca99528d171f8240836b21766d)).

## Timeline (UTC)

Only the SlowMist alert time is public.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-08 (undisclosed) | In X7Pioneer ([`0x70000299ee8910ccacd97b1bb560e34f49c9e4f7`](https://etherscan.io/address/0x70000299ee8910ccacd97b1bb560e34f49c9e4f7)), `claimRewards()` adds `address(this).balance - lastETHBalance` to `totalRewards` on every call but updates `lastETHBalance` only when `claimable > 0`. Since when is not stated. | **T9.016** |
| 2026-10-08 (time undisclosed) | The attacker ([`0xc79352119a7cf6efbfabbd7e6b013b79687bacf2`](https://etherscan.io/address/0xc79352119a7cf6efbfabbd7e6b013b79687bacf2)) donates ETH to enlarge the delta, then calls `claimRewards()` repeatedly with an empty array, inflating `totalRewards`, and claims the inflated rewards ([`0xc98056d6ab55ef898189da5fa1fb08b968cb84ca99528d171f8240836b21766d`](https://etherscan.io/tx/0xc98056d6ab55ef898189da5fa1fb08b968cb84ca99528d171f8240836b21766d)). | **T9.016** |
| 2026-10-08 09:55:59 | **Traced by OAK:** the exploit transaction creates the attack contract and the attacker receives **6.78026763 ETH**, matching SlowMist's ~6.78 ETH. | **T9.016** |
| 2026-10-08 10:04 to 10:24 | **Traced by OAK:** the attacker moves the proceeds on. 3.3 ETH goes to Tornado Cash in six deposits, 1.75 ETH goes through a LI.FI bridge call, and 1.723 ETH goes to one wallet that forwards nothing within the window. | — |
| 2026-10-08 10:28 | SlowMist publishes its alert. No project statement or fix appears in the cited sources. | response |

Key addresses:

- Attacker — [`0xc79352119a7cf6efbfabbd7e6b013b79687bacf2`](https://etherscan.io/address/0xc79352119a7cf6efbfabbd7e6b013b79687bacf2)
- Attack contract (traced by OAK, created in the exploit tx) — [`0xaa0cad88ac3f76beb9a0f1ba661916d7716d5f4a`](https://etherscan.io/address/0xaa0cad88ac3f76beb9a0f1ba661916d7716d5f4a)
- Holding wallet (traced by OAK) — [`0x1572cc5a965e6c2f980eca7f6cc63971a9b80eb3`](https://etherscan.io/address/0x1572cc5a965e6c2f980eca7f6cc63971a9b80eb3)
- Bridge wallet (traced by OAK) — [`0x314b7e4e69fc3ed0b519b5fd835a4adc9abbf335`](https://etherscan.io/address/0x314b7e4e69fc3ed0b519b5fd835a4adc9abbf335)
- Victim and vulnerable contract (X7Pioneer) — [`0x70000299ee8910ccacd97b1bb560e34f49c9e4f7`](https://etherscan.io/address/0x70000299ee8910ccacd97b1bb560e34f49c9e4f7)

## Fund flow

Ethereum leg, traced by OAK with `tools/explorer.py` (Blockscout, keyless) on 2026-10-30. Edges marked `verified: oak` were checked on-chain. Zero-value transfers of the X7PIONEER token were excluded. Address-poisoning bots sent the attacker lookalike transfers (for example from `0x157c5e97a3bffff2d11dd94a0722917eb9b80eb3`, and fake-ETH events to `0x1572f5d80e2745b1a9bc7087bb89697038080eb3` and `0x314bf5dd7ee31773b834936e2027b4c98a8df335`), which are not hops of the attacker's funds.

```oak-flow
as_of: 2026-10-30T14:30Z
nodes:
  - {id: fund, chain: ethereum, address: 0xe7351fd770a37282b91d153ee690b63579d6dd7f, role: unknown, label: "Unlabelled funder"}
  - {id: atk, chain: ethereum, address: 0xc79352119a7cf6efbfabbd7e6b013b79687bacf2, role: attacker-eoa, label: "Attacker"}
  - {id: ac, chain: ethereum, address: 0xaa0cad88ac3f76beb9a0f1ba661916d7716d5f4a, role: attack-contract, label: "Attack contract (flash-swap WETH)"}
  - {id: x7, chain: ethereum, address: 0x70000299ee8910ccacd97b1bb560e34f49c9e4f7, role: vulnerable-contract, label: "X7Pioneer"}
  - {id: hold, chain: ethereum, address: 0x1572cc5a965e6c2f980eca7f6cc63971a9b80eb3, role: attacker-holding, label: "Holding wallet (no onward transfer seen)"}
  - {id: tc, chain: ethereum, address: 0xd90e2f925da726b50c4ed8d0fb90ad053324f31b, role: mixer, label: "Tornado Cash router"}
  - {id: br, chain: ethereum, address: 0x314b7e4e69fc3ed0b519b5fd835a4adc9abbf335, role: intermediary, label: "Bridge wallet"}
  - {id: lifi, chain: ethereum, address: 0x1231deb6f5749ef6ce6943a275a1d3e7486f4eae, role: bridge, label: "LI.FI Diamond (Mayan route)"}
edges:
  - {from: fund, to: atk, asset: ETH, amount: 0.16096677, tx: 0x72d94e8367a25c27d7b381ec899711115489468ffa3eeca2556c17149e3fa56b, time: 2026-10-08T09:11:23Z, verified: oak}
  - {from: atk, to: ac, asset: "creates attack contract and runs exploit", tx: 0xc98056d6ab55ef898189da5fa1fb08b968cb84ca99528d171f8240836b21766d, time: 2026-10-08T09:55:59Z, technique: T9.016, verified: oak}
  - {from: ac, to: x7, asset: ETH, amount: 26.96317061, tx: 0xc98056d6ab55ef898189da5fa1fb08b968cb84ca99528d171f8240836b21766d, time: 2026-10-08T09:55:59Z, technique: T9.016, verified: oak}
  - {from: ac, to: atk, asset: ETH, amount: 6.78026763, tx: 0xc98056d6ab55ef898189da5fa1fb08b968cb84ca99528d171f8240836b21766d, time: 2026-10-08T09:55:59Z, technique: T9.016, verified: oak}
  - {from: atk, to: hold, asset: ETH, amount: 1.723, tx: 0x403b86f3d009591695d8e15be788b999077cec62c308e016305f93ba55b0c295, time: 2026-10-08T10:04:23Z, tx_count: 2, time_last: 2026-10-08T10:05:23Z, verified: oak}
  - {from: atk, to: tc, asset: ETH, amount: 3.3, tx: 0xdfce6ad5f06b35a94a979bef05788d1d06206f03be00980a5bd63e795a16e383, time: 2026-10-08T10:11:23Z, tx_count: 6, time_last: 2026-10-08T10:15:59Z, verified: oak}
  - {from: atk, to: br, asset: ETH, amount: 1.75, tx: 0x65b8568882bb41316cb14cb305c22872860506b137924ab690457382282fb281, time: 2026-10-08T10:23:59Z, verified: oak}
  - {from: br, to: lifi, asset: ETH, amount: 1.75, tx: 0xa892aab832796dddd384289179364eaa40f5674a47e77eb9f0347ee0c127f810, time: 2026-10-08T10:24:47Z, verified: oak}
```

What the trace adds beyond the sources:

- **The attack ran through a freshly created contract**, `0xaa0cad88ac3f76beb9a0f1ba661916d7716d5f4a`. It flash-swapped 26.96317061 WETH, unwrapped it and donated it to X7Pioneer, and then the attacker received **6.78026763 ETH**. That matches SlowMist's ~6.78 ETH. The attacker's net is the 6.78 ETH received, and the donated 26.96 ETH was repaid from the same transaction (the contract returned 26.97665219 WETH to the pool).
- **Funding.** The attacker's gas came from an unlabelled address, `0xe7351fd770a37282b91d153ee690b63579d6dd7f`, 0.16096677 ETH about 45 minutes before the exploit. The attacker also paid 0.15 ETH to a Blur marketplace proxy before the exploit; that is not treated as a laundering hop.
- **Dispositions within 30 minutes:** 3.3 ETH to Tornado Cash (six deposits: 0.1, 0.1, 0.1, 1, 1, 1), 1.75 ETH bridged via `startBridgeTokensViaMayan` on LI.FI, 1.723 ETH to a holding wallet that showed no outgoing transfer through 2026-10-13.
- **Limit.** The bridge destination chain and address are not visible on Ethereum. The Mayan leg is likely cross-chain, but OAK did not trace it, so nothing is claimed beyond the LI.FI deposit.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2108142452888776907>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist: `lastETHBalance` updates only when `claimable > 0`, so empty-array calls re-add the same balance delta to `totalRewards`. No project post-mortem.

## Public references

- `[slowmistx72026]` — SlowMist on X, X7 Finance alert (2026-10-08): <https://x.com/SlowMist_Team/status/2108142452888776907>
