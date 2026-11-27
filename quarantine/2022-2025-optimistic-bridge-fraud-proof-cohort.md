> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no attack to record: no opened page documents a failure of a fraud-proof or watcher layer; its one real incident, Nomad, has its own file and is classed by the sources as an initialisation error. It is kept here, outside `examples/`, and can return if a source documents an incident.

# Optimistic-bridge watcher assumption — design description, no attack on the fraud-proof layer found — 2022

**Loss:** none attributable. An earlier version was a cohort of fraud-proof-gap architecture findings, citing Halborn, an Arjun Bhuptani write-up, L2BEAT stage classifications and an academic paper. None of those four was opened or found to say what the file claimed, so the cohort claims are removed. The one incident discussed, Nomad (about \$190M), is covered in [`examples/2022-08-nomad-bridge.md`](2022-08-nomad-bridge.md).

**OAK Techniques observed:** none — the opened pages describe a design assumption (at least one honest watcher) and no case where a challenge window was out-raced, a watcher was absent and an invalid message passed, or a fraud-proof contract failed. The Nomad loss is attributed by the opened pages to an initialisation bug in an upgrade (see [`examples/2022-08-nomad-bridge.md`](2022-08-nomad-bridge.md)).

**Attribution:** **unattributed** (no actor).

**Key teaching point:** **An optimistic bridge is only as safe as its watcher assumption, and that assumption is a property to verify, not an incident.** The [Connext docs](https://github.com/connext/gitbook-docs/blob/main/concepts/background/verification-mechanisms.md) state the trust assumption as "Assumes that at least 1 Watcher is online, honest, and able to send a transaction to chain" and list message latency as the cost. Before relying on such a bridge, ask who runs the watchers and how a dispute reaches the chain.

## Summary

Only Nomad is a bridge incident with its own file. The other member the old file named (Connext) is described only by its documentation, so there is no sourced cohort of incidents here.

What the opened pages say:

- Connext's documentation ([verification mechanisms](https://github.com/connext/gitbook-docs/blob/main/concepts/background/verification-mechanisms.md)): optimistic bridges use fraud proofs; messages stay pending through a dispute window (a "30 min delay" in its summary table) during which Watchers can dispute them; the model is 1-of-n, needing one Watcher online, and it assumes Watchers will not abuse their position to censor the system. It says censorship risk can be minimised with economic (dis)incentives. This is a design description; it reports no failure.
- The academic [SoK on cross-chain bridge security](https://arxiv.org/pdf/2312.12573) (Zhang et al.) says optimistic bridges have longer latency and need at least one honest watcher. It classes the Nomad loss (Aug-02-2022, about \$190 million) as caused by an initialisation error in which the trusted root was set to an incorrect value so anyone could pass the permission check, not as a watcher failure.
- [Halborn](https://halborn.com/the-nomad-bridge-hack-a-deeper-dive) attributes Nomad to "an implementation bug in a June 21 smart contract upgrade" in the Replica contract's message authentication. It mentions an "optimistic timer" but does not mention watchers or a challenge window length. It reports 960 transactions and 1,175 withdrawals, and over \$33M returned by whitehats as of August 15, 2022.
- [Mandiant](https://cloud.google.com/blog/topics/threat-intelligence/dissecting-nomad-bridge-hack) describes the same bug, names an off-chain "Updater" rather than watchers, does not mention fraud proofs, and puts the amount returned at about \$36 million.

None of the pages says the Nomad watcher set was absent, unfunded or unbonded, or that the challenge window was too short.

Sibling files: [`examples/2022-07-nomad-optimistic-verification-gap.md`](2022-07-nomad-optimistic-verification-gap.md) (same claim for Nomad alone) and [`examples/2022-08-nomad-bridge.md`](2022-08-nomad-bridge.md) (the incident).

## Timeline (UTC)

| When | What happened | OAK |
|---|---|---|
| 2022-06-21 | Nomad contract upgrade that [Halborn](https://halborn.com/the-nomad-bridge-hack-a-deeper-dive) says carried the bug | none — initialisation bug, not a watcher failure |
| 2022-08-01 21:32:31 | First exploit transactions, Ethereum block 15259101, per Halborn | none |
| 2022-08-01 | Bridge value falls from \$190,740,000 to \$1,794 within hours, per Halborn | none |
| 2022-08-15 | Over \$33M returned by whitehats, per Halborn | response |
| 2022 (undisclosed) | Any watcher or fraud-proof failure on any optimistic bridge: undisclosed | — |

## Root-cause evidence

- **Technique:** none
- **Source:** <https://halborn.com/the-nomad-bridge-hack-a-deeper-dive>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** The security-firm write-up places the Nomad loss in an upgrade bug. Connext's documentation states the watcher assumption as a design property. No opened page documents an attack on the dispute layer.

## Public references

- Connext docs, verification mechanisms: <https://github.com/connext/gitbook-docs/blob/main/concepts/background/verification-mechanisms.md>
- Zhang et al., SoK: Security of Cross-chain Bridges: <https://arxiv.org/pdf/2312.12573>
- Halborn, The Nomad Bridge Hack: A Deeper Dive: <https://halborn.com/the-nomad-bridge-hack-a-deeper-dive>
- Mandiant, Dissecting the Nomad Bridge Hack: <https://cloud.google.com/blog/topics/threat-intelligence/dissecting-nomad-bridge-hack>
