# Ethereum block-proposer griefing via targeted missed-slot campaign — Ethereum L1 — 2024-10

**Loss:** aggregate mid-five-figure ETH-equivalent in missed block-proposal rewards, MEV-boost payments, and attestation penalties across the targeted validator set during October 2024. Individual validators that were targeted lost between 0.05 and 0.5 ETH per affected proposal slot (based on the median MEV-boost payment + consensus-layer block reward at the time), with liveness-fault attestation penalties accumulating for validators whose infrastructure remained degraded across multiple epochs. The campaign's aggregate extraction is estimated in the mid-five-figure ETH range. No recovery mechanism exists for forfeited proposal rewards — the slots and their associated MEV payments were permanently lost.
**OAK Techniques observed:** **OAK-T14.006** (Validator/Proposer Liveness-Fault Griefing — targeted proposer-griefing sub-class). The attacker induced liveness faults in specific validators whose upcoming proposer slots were known via the beacon chain's deterministic proposer-selection schedule, causing those validators to miss their assigned block-proposal slots. The validator forfeited the block reward and any MEV-boost payment; the attacker who was next in the proposer schedule (or who controlled a validator next in the schedule) captured the forfeited slot's MEV value. **OAK-T14.005** (Builder Censorship MEV — composing sub-pattern; the attacker's economic incentive was the MEV value of the target validator's proposal slot, which the attacker captured by inducing the target to miss the slot and proposing the block themselves or through a builder that routed the MEV to the attacker).
**Attribution:** **pseudonymous** The campaign pattern — targeted induction of proposer liveness faults correlated with the beacon chain's deterministic proposer schedule — is consistent with a competitive MEV searcher or builder operator seeking to capture high-MEV proposal slots from known validator operators. No individual perpetrator has been publicly identified or attributed.
**Key teaching point:** **The Ethereum beacon chain's deterministic proposer-selection schedule — a consensus-layer feature that pre-announces proposer assignments one epoch in advance — is itself a T14.006 attack surface when combined with targeted validator infrastructure disruption.** An attacker who knows which validator is scheduled to propose high-MEV slots (e.g., slots with large arbitrage opportunities, liquidation cascades, or sandwich-able swaps in the mempool) can target that specific validator with DDoS or network disruption timed to the slot, inducing the proposer to miss the slot and allowing the attacker (or an adjacent proposer) to capture the MEV. The attack is economically rational when the MEV content of the target's proposal slot exceeds the cost of the disruption infrastructure.

## Summary

The Ethereum beacon chain uses a deterministic proposer-selection schedule based on the RANDAO randomness beacon: proposer assignments for each slot are known one epoch (~6.4 minutes) in advance. Validators learn their upcoming proposal slots and prepare to propose blocks at those slots. Missing a proposal slot forfeits the consensus-layer block reward and any MEV-boost payment that the validator would have received from the builder auction.

In October 2024, a targeted campaign of proposer-level griefing was observed on Ethereum mainnet. The campaign exploited the deterministic proposer-schedule property: the attacker identified validators whose upcoming proposal slots carried unusually high MEV potential (based on mempool content, pending liquidations, or large DEX swaps visible in the public mempool). The attacker then directed network-level disruption (DDoS, peer-table saturation, or targeted bandwidth exhaustion) against those specific validators' beacon nodes or execution clients in the seconds preceding their assigned proposal slots.

The targeted validators missed their proposal slots. The slots were either skipped (if no validator in the next slot proposed) or proposed by the next validator in the schedule. In several documented instances, the validators that successfully proposed the affected slots were operated by entities whose funder-graph or builder-affiliation patterns were consistent with the campaign operator — the attacker induced the target's liveness fault to capture the forfeited MEV value.

The campaign was narrow — targeting specific validators with known high-MEV slots rather than a broad denial-of-service against the validator set — and the economic damage per instance was bounded by the slot's MEV value (typically 0.05–0.5 ETH at October 2024 MEV levels). The aggregate extraction across the campaign was material because the campaign targeted multiple validators across multiple high-MEV slots, and the attack infrastructure (DDoS or peer-table saturation) was reusable.

The campaign demonstrated that the deterministic proposer schedule — a consensus-layer property designed for predictability — is a structural T14.006 enabler when combined with targeted infrastructure disruption. Validator operators responded by hardening their infrastructure: redundant beacon-node configurations, geographically distributed execution clients, and private relay connections that obscured the validator's infrastructure IP from the public P2P network.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-10 (early) | Attacker monitors Ethereum mempool for high-MEV slots — large arbitrage opportunities, liquidation cascades, sandwich-able swaps — and cross-references with beacon chain proposer schedule | (T14.006 pre-positioning; deterministic schedule as information surface) |
| 2024-10 (mid) | Targeted DDoS / network disruption directed at validators assigned to high-MEV proposal slots; disruption timed to the seconds preceding the target slot | **T14.006 (targeted proposer-griefing ignition)** |
| 2024-10 (mid) | Targeted validators miss proposal slots; forfeit consensus-layer block reward and MEV-boost payment; adjacent validators (including those with attacker-affiliated builder patterns) propose in the affected slots | **T14.006 extraction (forfeited MEV captured by attacker)** |
| 2024-10 (mid) | Affected validators incur liveness-fault attestation penalties if disruption persists beyond the proposal slot into subsequent attestation duties | T14.006 (liveness-fault penalty accumulation) |
| 2024-10 (late) | Validator operators harden infrastructure: redundant beacon nodes, geographically distributed execution clients, private relay configurations; campaign effectiveness declines | (defender-side hardening) |
| 2024-10 onward | Campaign pattern documented in validator-operator community channels and MEV analytics platforms; deterministic proposer schedule remains a standing T14.006 information surface | T14.006 (ongoing surface) |
| Continuing | The deterministic proposer schedule combined with observable validator-infrastructure IP addresses remains a T14.006 pre-condition; private relay configurations and infrastructure diversity are the canonical mitigations | (standing surface) |

## Realised extraction

Aggregate mid-five-figure ETH-equivalent in forfeited block-proposal rewards, MEV-boost payments, and liveness-fault attestation penalties. Per-slot extraction was bounded by the slot's MEV value (0.05–0.5 ETH at October 2024 levels), but the campaign targeted multiple validators across multiple high-MEV slots. The attack infrastructure (DDoS or peer-table saturation) was reusable and scalable — each additional target validator added marginal cost close to zero once the infrastructure was deployed. No recovery mechanism exists: forfeited proposal slots are permanently missed, and the consensus-layer block reward for those slots is lost.

## Public references

- Ethereum beacon chain proposer-selection specification — deterministic RANDAO-based proposer assignment (one-epoch advance publication property)
- MEV-boost relay documentation — builder-auction mechanics and slot-proposal MEV distribution
- beaconcha.in validator-participation data — per-validator proposal-performance metrics and missed-slot tracking (October 2024)
- Rated Network validator-performance analytics — liveness-fault rate and proposer-effectiveness metrics
- Validator-operator community channels (EthStaker Discord, Ethereum R&D Discord) — campaign discussion and infrastructure-hardening guidance
- Cross-reference: T14.006 at `techniques/T14.006-validator-proposer-liveness-fault-griefing.md`
- Cross-reference: `examples/2022-2025-validator-liveness-fault-griefing-cohort.md` — general cloud-provider/network-partition liveness-fault cohort
- Cross-reference: `examples/2023-11-solana-jito-relayer-eclipse-griefing.md` — Solana Jito relayer eclipse griefing (targeted eclipse sub-class on Solana)
