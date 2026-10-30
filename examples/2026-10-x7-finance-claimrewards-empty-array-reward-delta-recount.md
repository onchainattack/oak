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
| after the claim | Loss ~6.78 ETH (~\$16.5K). Where it went is not stated (undisclosed). | — |
| 2026-10-08 10:28 | SlowMist publishes its alert. No project statement or fix appears in the cited sources. | response |

Key addresses:

- Attacker — [`0xc79352119a7cf6efbfabbd7e6b013b79687bacf2`](https://etherscan.io/address/0xc79352119a7cf6efbfabbd7e6b013b79687bacf2)
- Victim and vulnerable contract (X7Pioneer) — [`0x70000299ee8910ccacd97b1bb560e34f49c9e4f7`](https://etherscan.io/address/0x70000299ee8910ccacd97b1bb560e34f49c9e4f7)

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2108142452888776907>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist: `lastETHBalance` updates only when `claimable > 0`, so empty-array calls re-add the same balance delta to `totalRewards`. No project post-mortem.

## Public references

- `[slowmistx72026]` — SlowMist on X, X7 Finance alert (2026-10-08): <https://x.com/SlowMist_Team/status/2108142452888776907>
