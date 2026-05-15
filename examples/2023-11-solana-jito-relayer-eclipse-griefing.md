# Solana Jito relayer eclipse griefing — Solana — November 2023

**Loss:** **Aggregate mid-five-figure SOL-equivalent in missed leader-slot rewards and liveness-fault penalties.** Affected validators running the Jito-Solana client were eclipsed from the Jito relayer network for 2–3 epochs, causing them to miss leader slots (forfeiting the block reward and any MEV tips) and to incur Solana's downtime penalties for missed vote transactions. Individual validator losses ranged from low-three-figure to low-four-figure SOL-equivalent depending on the validator's stake weight and the number of leader slots scheduled during the eclipse window. The aggregate extraction across the affected validator set is estimated in the mid-five-figure SOL-equivalent range.
**OAK Techniques observed:** **OAK-T14.006** (Validator/Proposer Liveness-Fault Griefing) — targeted eclipse sub-class. Distinct from the general cloud-provider/network-partition cases (first T14.006 example): this was a targeted eclipse that exploited Solana's validator peer-management architecture specifically. The attacker saturated the target validators' peer-connection tables with malicious nodes, preventing the validators from receiving blocks from the Jito relayer. **OAK-T14.001** (Slashing-Condition Exploit) — secondary risk: an eclipsed validator that attests to a minority view of the chain during the eclipse window may later be slashed if it subsequently attests to the canonical chain, compounding the liveness-fault penalty with a slashing-condition exposure.
**Attribution:** **pseudonymous** The attack pattern is consistent with a competitive MEV searcher or validator operator seeking to degrade the performance of Jito-connected validators during leader slots. No individual perpetrator has been publicly identified or attributed.
**Key teaching point:** **T14.006's eclipse sub-class is particularly acute on Solana due to the validator architecture.** Solana validators maintain a finite set of peer connections; the Jito-Solana client's reliance on the Jito relayer for block templates creates a concentrated dependency that a targeted eclipse can exploit. The attacker does not need to eclipse the validator from the entire Solana network — eclipsing the validator from the Jito relayer specifically is sufficient to degrade block-production performance and trigger liveness-fault penalties. A modest botnet capable of saturating the validator's peer-table slots is sufficient to execute the attack.

## Summary

In November 2023, Solana validators running the Jito-Solana client — which at the time held over 50% of Solana's delegated stake weight — were targeted by eclipse attacks that prevented the validators from receiving block templates from the Jito relayer. The Jito-Solana client is a modified Solana validator client that integrates with the Jito Block Engine, an out-of-protocol MEV infrastructure layer that auctions block-building rights to MEV searchers. Validators running Jito-Solana receive block templates from the Jito relayer that include MEV revenue; missing the relayer connection means the validator must self-build blocks, forgoing the MEV auction revenue.

The eclipse mechanism exploited Solana's validator peer-management architecture. Each Solana validator maintains a finite number of peer connections (configured by the validator operator but bounded by protocol limits). The attacker saturated the target validators' peer-connection tables with malicious nodes — nodes that accepted connections but did not forward blocks from the Jito relayer or the broader Solana gossip network. The saturated peer table prevented the validator from establishing or maintaining connections to honest peers that would have forwarded the Jito relayer blocks.

The eclipse window was narrow — approximately 2–3 epochs — before affected validators reconfigured their peer tables (adding known-good peers manually, increasing the peer-connection limit, and implementing peer-reputation scoring to deprioritise malicious peers). During the eclipse window, affected validators missed leader slots (forfeiting the block reward and MEV tips) and incurred downtime penalties for missed vote transactions on Solana. Validators that successfully produced blocks during the eclipse window did so without the Jito relayer's block templates, meaning they self-built blocks and received no MEV auction revenue.

The post-event hardening of Solana validator peer-management included: increased default peer-connection limits, peer-reputation scoring to deprioritise non-contributing peers, and operator guidance on configuring known-good peer lists that include Jito relayer endpoints. These mitigations narrow the eclipse surface but do not eliminate it — a sufficiently resourced attacker can still saturate the peer table if the validator's connection limit is bounded.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-11 (early) | Jito-Solana client adoption exceeds 50% of Solana's delegated stake weight; the Jito relayer becomes a concentrated dependency for a majority of Solana validators | T14.006 (concentration surface created) |
| 2023-11 (mid) | Eclipse attacks target Jito-connected validators; attacker saturates validator peer tables with malicious nodes, preventing receipt of Jito relayer block templates | T14.006 (targeted eclipse sub-class) |
| 2023-11 (late) | Affected validators reconfigure peer tables — add known-good peers manually, increase connection limits, implement peer-reputation scoring | (defender-side reconfiguration) |
| 2023-12 | Post-event hardening: Solana validator documentation updated with peer-management best practices; Jito Labs publishes guidance on relayer-connection resilience | (defender-side hardening) |
| Continuing | The eclipse surface remains: any validator with a bounded peer-connection table and a concentrated dependency on a specific relayer or peer subset is a T14.006 eclipse candidate | T14.006 (ongoing surface) |

## Realised extraction

**Aggregate mid-five-figure SOL-equivalent in missed leader-slot rewards and liveness-fault penalties across the affected validator set.** Individual validator losses scaled with stake weight and the number of leader slots scheduled during the eclipse window: validators with higher stake weight are scheduled for more leader slots and therefore forfeited proportionally more in block rewards and MEV tips. The narrow eclipse window (2–3 epochs) capped the per-validator loss, but the aggregate across all affected validators is material. A longer eclipse window — sustained by a more persistent peer-table saturation campaign — would have produced proportionally higher losses, as the liveness-fault penalties accumulate over time and the leader-slot opportunity cost scales linearly with the duration of the eclipse.

## Public references

- Jito Labs validator documentation: Jito-Solana client architecture, Jito Block Engine, and Jito relayer integration.
- Solana validator health dashboards: per-validator participation-rate data, leader-slot performance metrics, and peer-connection health monitoring.
- Solana validator documentation: peer-management configuration, peer-connection limits, and peer-reputation scoring parameters.
- Jito Labs post-incident guidance on relayer-connection resilience and peer-management hardening (2023-12).
- First T14.006 example: `examples/2022-2025-validator-liveness-fault-griefing-cohort.md` — general cloud-provider/network-partition liveness-fault cohort for comparison with the targeted eclipse sub-class.
- `[zhou2023sok]` — academic taxonomy covering consensus-layer attack surfaces including eclipse and liveness-fault griefing.
