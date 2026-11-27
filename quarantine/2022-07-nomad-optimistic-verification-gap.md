> **MERGED 2026-11-27 into `examples/2022-08-nomad-bridge.md`** — a second entry for the same incident; its claims about an absent or unfunded challenger network are on no opened page. Not part of the OAK corpus; kept for the record.

**Merged into:** 2022-08-nomad-bridge

# Nomad's optimistic verification design — a design property, not an incident — Nomad / EVM — 2022

**Loss:** none attributable to this page. No opened source reports funds lost because a watcher, challenger or fraud-proof process failed at Nomad. The August 2022 loss of over \$190M is documented in [`2022-08-nomad-bridge.md`](2022-08-nomad-bridge.md).

**OAK Techniques observed:** none — the opened pages describe a design (optimistic message verification with a timer) and one separate exploit caused by a zero trusted root; none documents a failed or absent challenger network. The rejected Technique for optimistic-bridge fraud-proof gaps is named in words only.

**Attribution:** **unattributed** (no attack described).

**Key teaching point:** **Check which layer actually failed before filing a bridge incident under its design.** At Nomad the on-chain check accepted the zero root as proven, so the optimistic timer was never what stood between an attacker and the funds; a watcher network would not have been the control that failed.

## Summary

[Halborn's deeper dive](https://halborn.com/the-nomad-bridge-hack-a-deeper-dive) says message roots are propagated to remote chains "via the optimistic mechanism," that "Messages may not be processed before the root's optimistic timer has elapsed," and that the check "is intended to return true if and only if a valid root's optimistic timeout period has finished." It does not give the timer length and never mentions watchers. [Mandiant](https://cloud.google.com/blog/topics/threat-intelligence/dissecting-nomad-bridge-hack) says Nomad "relies on an 'off-chain' agent called _Updater_ for validating those messages," and does not discuss watchers or fraud proofs.

Both pages put the loss on a different cause: Halborn says replicas initialised with a zero committed root had `confirmAt[bytes32(0)]` set to 1, so `acceptableRoot(bytes32(0))` returned true and unproven messages passed. Nothing opened says a watcher was absent, funded or unfunded, or that a challenge was attempted or censored. The earlier version of this file claimed an unfunded, unbonded challenger network and an unjustified window; no opened page says either, and those claims are removed.

This file duplicates the incident in [`2022-08-nomad-bridge.md`](2022-08-nomad-bridge.md), which is the one to keep.

## Timeline (UTC)

No attack. The only dated events are those of the sibling incident file.

| When | What happened | OAK |
|---|---|---|
| 2022-06-21 (per Nomad's post-mortem as quoted by [Halborn](https://halborn.com/the-nomad-bridge-hack-a-deeper-dive)) | Upgrade introduced the implementation bug | — |
| 2022-08-01 | Exploit started in Ethereum block 15259101 ([Halborn](https://halborn.com/the-nomad-bridge-hack-a-deeper-dive)); see [`2022-08-nomad-bridge.md`](2022-08-nomad-bridge.md) | — |

Key addresses: none.

## Root-cause evidence

- **Technique:** none
- **Source:** <https://halborn.com/the-nomad-bridge-hack-a-deeper-dive>; <https://cloud.google.com/blog/topics/threat-intelligence/dissecting-nomad-bridge-hack>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** The opened pages describe the optimistic timer and an off-chain Updater, and attribute the loss to the zero-root bug. They do not document any failure of a challenge or watcher layer.

## Public references

- [Halborn, "The Nomad Bridge Hack: A Deeper Dive"](https://halborn.com/the-nomad-bridge-hack-a-deeper-dive)
- [Mandiant / Google Cloud, "Decentralized Robbery"](https://cloud.google.com/blog/topics/threat-intelligence/dissecting-nomad-bridge-hack)
