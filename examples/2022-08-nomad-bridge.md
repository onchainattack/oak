# Nomad Bridge — Ethereum / Moonbeam / Avalanche / Evmos — 2022-08-01

**Loss:** \~\$190M extracted; \~\$22M recovered post-event.
**OAK Techniques observed:** OAK-T10.002 (Message-Verification Bypass) — primary.
**Attribution:** initial single-attacker exploit followed by widespread "mob attack" copy-paste exploitation by hundreds of distinct addresses. A key suspect in the initial exploit was extradited to the United States in 2024 per `[trmlabs2024nomadextradition]` (see Public References).

## Summary

On August 1, 2022, a routine contract upgrade to the Nomad Bridge initialised the contract's "trusted root" value to `0x00`. Because `0x00` was also the sentinel value used to indicate an *untrusted* root, the bridge's `process()` verification function consequently treated all incoming messages as already-proven. The first attacker discovered the exploit and extracted assets; within hours, hundreds of distinct addresses had copy-pasted the exploit transaction — substituting only their own destination address — and continued draining the bridge in what the Mandiant write-up `[mandiantnomad2022]` characterised as a "decentralized robbery." The total loss was \~\$190M across ETH, USDC, WBTC, and various ERC-20 tokens. \~\$22M was subsequently returned by some of the participating addresses in response to a 10% bounty offered by the Nomad team.

For OAK's purposes, Nomad is the canonical T10.002 case because the failure mode is unambiguous from the public record (the trusted-root-vs-untrusted-root collision is documented in multiple post-mortems), the dollar loss is large, and the multi-actor "mob attack" exploitation pattern is unique to T10.002 (when the underlying flaw is templable, the attack stops being attributable to a single actor and becomes opportunistic).

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-event | Nomad deploys a routine contract upgrade; trusted-root state initialised to `0x00` | (precursor) |
| 2022-08-01 (T+0) | First attacker discovers the verification flaw and extracts assets | **T10.002 initial exploit** |
| 2022-08-01 (T+0 to T+~hours) | Hundreds of distinct addresses copy-paste the exploit transaction with their own destination address; \~\$190M total drained | **T10.002 "mob attack"** |
| 2022-08-02 onward | Nomad team announces incident; offers 10% bounty for return of funds | (response) |
| Following weeks | \~\$22M returned by some participating addresses | (partial recovery) |
| 2024 | Key suspect in the initial single-attacker exploit extradited to the United States (per TRM Labs reporting) | (legal status) |

## What defenders observed

- **Pre-event (audit / upgrade-review layer):** the trusted-root-vs-untrusted-root collision was introduced by an upgrade. Pre-deployment review of the upgrade's effect on verification-state initialisation would have identified the issue. This is the canonical T10.002 pre-deployment signal.
- **At-event (single-attacker phase):** a single transaction processed an invalid-proof message — the kind of event that a post-upgrade smoke-test simulating a randomly-chosen invalid message would have caught immediately.
- **At-event (mob-attack phase):** repeated processing of structurally-identical exploit transactions from distinct senders within minutes — the canonical T10.002 multi-actor signature. This is the runtime detection signal that catches T10.002 *during* an active exploit, but at that point the bridge is already being drained.

## What this example tells contributors writing future Technique pages

- **T10.002 detection lives at audit / upgrade review.** Once the flaw is in production, the only meaningful detection signal is the multi-actor exploitation pattern, by which point the bridge is already being drained. T10.002 mitigation is overwhelmingly pre-deployment.
- **The "mob attack" signature is unique to T10.002.** When the verification flaw is templable, attribution fragments across hundreds of opportunistic actors with mixed motivations (financial, "I'm just experimenting", "I'll return it"). Contributors writing future T10.002 examples should expect the multi-actor pattern when the underlying flaw is templable; single-actor T10.002 cases (Wormhole — see `examples/2022-02-wormhole.md`) are the exception rather than the rule.
- **Partial recovery via bounty is realistic for T10.002.** Some "mob attack" participants are not professional adversaries and will return funds in response to a published bounty — particularly when their addresses are identifiable (e.g., funded from a CEX with KYC). Contributors should not characterise post-event recovery as "lucky"; for T10.002 mob-attack cases it is a structural feature.

## Public references

- `[mandiantnomad2022]` — Mandiant / Google Cloud forensic write-up (primary citation).
- [Halborn — Explained: The Nomad Hack (August 2022)](https://www.halborn.com/blog/post/explained-the-nomad-hack-august-2022) — technical post-mortem.
- [Immunefi — Hack Analysis: Nomad Bridge, August 2022](https://medium.com/immunefi/hack-analysis-nomad-bridge-august-2022-5aa63d53814a) — second technical post-mortem.
- [TRM Labs — Key Suspect in \$190M Nomad Bridge Exploit Extradited to the United States](https://www.trmlabs.com/resources/blog/key-suspect-in-190m-nomad-bridge-exploit-extradited-to-the-united-states) — 2024 update on the legal status of the initial single-attacker case.

## Discussion

Nomad is structurally important to OAK because the multi-actor "mob attack" signature is unique to the T10.002 templable-flaw class and complicates the standard attribution framing OAK provides through `actors/`. Contributors writing future T10.002 examples should preserve the **single-attacker vs mob-attack** distinction explicitly: the initial exploiter is potentially attributable; the mob-attack participants are typically not, and many are not professional adversaries. OAK's framework does not currently provide a clean way to express "this incident has a single-actor primary attacker plus opportunistic multi-actor secondary participants" — a v0.x consideration for the OAK-Gnn axis.
