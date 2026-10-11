# Ethereum Beacon Chain Inactivity-Leak Griefing and Correlation-Penalty Economics — 2022–2025

**Loss:** structural — the inactivity leak penalises validators that fail to make timely correct target votes while the chain is not finalising. In the 2023-05-12 finality-delay event (nine epochs without finality, per secondary summaries of the Prysm post-mortem), the Prysm report estimated about 28 ETH lost to the leak plus roughly 50 ETH in missed attestation rewards, on an assumption of 65% of validators offline for eight epochs; this is the report's estimate, not a measured total.
**OAK Techniques observed:** **OAK-T14.006** (Validator/Proposer Liveness-Fault Griefing — the leak is a liveness-fault penalty surface.) **OAK-T14.001** (Slashing Condition Exploit — structurally adjacent; the leak is a non-slashing penalty.) **OAK-T14.003** (LST/LRT Depeg Cascade — indirectly adjacent; validators run on behalf of LST/LRT holders carry the penalty.)
**Attribution:** **unattributed** — the inactivity leak is a protocol mechanism, not an attack. No griefing incident is documented; the May 2023 events were a client bug.

**Key teaching point:** **The inactivity leak is designed to restore finality by progressively draining non-participating validators until online validators hold about two-thirds of the stake; it is a liveness-fault penalty whose cost falls on the non-participants.** Because penalties accrue on validators that are offline, a griefing scenario would need the attacker to cause the *victim's* validators to go offline (for example a DoS), not merely to keep the attacker's own validators offline.

**Corrected 2026-10-11:** the original said the May 2023 event was a ~25-minute loss from a consensus-client bug causing validators to "lose sync", that the inactivity leak penalises all validators including online competitors, and that an attacker could impose penalties by keeping their own validators offline; sources show two events (2023-05-11, four epochs; 2023-05-12, nine epochs, which triggered the leak) caused by a Prysm caching problem, and that the leak penalises non-participants while online validators lose attestation rewards only.

## Summary

Per the Upgrading Ethereum book, the beacon chain enters an inactivity leak when it has not finalised a checkpoint for more than four epochs. During the leak attesters earn no attestation rewards (attestation penalties still apply), and each validator has an inactivity score that rises when it misses a correct, timely target vote, so the penalty grows roughly quadratically. Non-participants lose stake until online validators hold about two-thirds of the total, which lets finality resume; penalties continue briefly after finality returns to build a buffer. A validator online roughly 80% of the time keeps its score near zero. Validators are ejected when effective balance falls to 16 ETH. The no-reward rule for attesters during a leak is described as a deterrent against attackers who might deliberately trigger one.

The May 2023 events were not attacks. Per summaries of the Prysm post-mortem, a first incident on 2023-05-11 (about 20:19 UTC) delayed finality by four epochs and a longer second stall on 2023-05-12 lasted nine epochs and triggered an inactivity penalty; both recovered without intervention. The root cause was a Prysm cache that filled up and forced repeated regeneration of the same state, with Teku also affected; fixes shipped in Prysm v4.0.4 and Teku 23.6.0. The original file's "about 25 minutes" figure is the four-epoch (~25.6 min) delay threshold, not a measured outage.

A griefing surface exists in principle, because causing victim validators to go offline during a finality delay imposes quadratic penalties on them. No such attack is documented in the cited sources, and the original's description of competitors being penalised while online, or of attackers extending the event by sitting out, is not supported.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-05-11 | First finality-delay event (four epochs), Prysm cache issue | T14.006 (organic) |
| 2023-05-12 | Second event (nine epochs); inactivity leak triggered; recovers without intervention | T14.006 (canonical inactivity-leak event) |
| 2023-06 | Teku 23.6.0 ships fix for the May non-finality issue; Prysm v4.0.4 fix | (client response) |

## Public references

- `[eth2bookinactivity]` — Upgrading Ethereum, "Inactivity Leak": <https://eth2book.info/latest/part2/incentives/inactivity/>
- `[prysmpostmortem]` — Offchain Labs, "Post-Mortem Report: Ethereum Mainnet Finality (05/11/2023)": <https://medium.com/offchainlabs/post-mortem-report-ethereum-mainnet-finality-05-11-2023-95e271dfd8b2>
- `[tekurelease236]` — Consensys Teku, release 23.6.0 notes: <https://github.com/ConsenSys/teku/releases/tag/23.6.0>
- `[etherscanfinality]` — Etherscan blog, "Battle-Testing Ethereum's Finality": <https://medium.com/etherscan-blog/battle-testing-ethereums-finality-8909ac1b8ab1>
- See `techniques/T14.006-validator-proposer-liveness-fault-griefing.md` for Technique definition.

## Discussion

The leak is a standing T14.006 surface at the protocol-economic layer: its cost falls on validators that are absent. Whether an adversary can profitably induce absence in a competitor, and how the cost compares to the attacker's own reward loss while finality is delayed, is a research question this file does not answer. The load-bearing mitigations noted by the sources are client diversity (the May 2023 bug affected Prysm and Teku behaviour) and the leak's own design.
