# Validator liveness-fault griefing cohort — Ethereum L1 (primary), Solana, Cosmos — 2022–2025

**Loss:** **Passive griefing (cloud-provider outages):** unquantified aggregate of inactivity-leak penalties and forfeited proposal/MEV rewards across affected validators during major cloud-provider outage events. A single Ethereum validator with a 32 ETH effective balance that is offline for 36 hours during an inactivity-leak period incurs an approximate penalty of 0.5–1 ETH-equivalent (varying with the duration of the non-finality period and the validator's effective balance); thousands of validators affected simultaneously during a cloud-provider outage multiply the aggregate. **Active griefing (DDoS/eclipse):** no publicly documented incident with a quantified loss figure as of v0.1; the surface is characterised in consensus research and Ethereum R&D forums.
**OAK Techniques observed:** **OAK-T14.006** (Validator/Proposer Liveness-Fault Griefing) — canonical anchor case. Distinct from **OAK-T14.001** (Slashing-Condition Exploit) at the *penalty-mechanism* level: T14.001 triggers a one-time slash of the validator's stake via a slashable offence (double-signing, surround-voting); T14.006 triggers a continuous inactivity-leak penalty that grows quadratically with offline duration without requiring a slashable offence. Distinct from **OAK-T14.005** (Builder Censorship MEV): T14.005 targets specific transactions for MEV profit; T14.006 targets the validator itself.
**Attribution:** **passive: infrastructure-provider (no adversary).** Cloud-provider outages (AWS, Hetzner, Google Cloud) are the attributed cause of the passive-griefing edge case — the "adversary" is the infrastructure-provider outage, not a malicious actor. **Active: no publicly attributed adversary as of v0.1.** Active DDoS-induced liveness-fault events are discussed in consensus research but lack a named-perpetrator public incident.
**Key teaching point:** The liveness-fault surface is a **standing economic risk** for Proof-of-Stake validators that materialises when the validator's infrastructure fails — whether due to an active adversary (DDoS, network partition) or a passive infrastructure event (cloud-provider outage, data-centre power loss). The distinction between active and passive griefing is forensically meaningful but economically irrelevant to the validator: the inactivity-leak penalty is identical regardless of cause. Infrastructure diversity (multi-cloud, multi-region, multi-ISP) and validator-client failover architecture are the load-bearing mitigations.

## Summary

Validator liveness-fault griefing encompasses both active-adversary and passive-infrastructure events that cause a Proof-of-Stake validator to miss attestations, block proposals, or other consensus duties, triggering consensus-layer penalties. On Ethereum, the primary penalty mechanism is the **inactivity leak** — a quadratic penalty that activates when the Beacon Chain fails to finalise for 4+ epochs and penalises offline validators increasingly the longer they remain offline. The inactivity leak is designed to restore chain finality by reducing the stake of offline validators until the online validators regain a two-thirds supermajority; the economic consequence for an individual offline validator can be material for extended offline durations.

The griefing surface has four distinguishable sub-classes:
1. **DDoS / network-partition attack on validator infrastructure (active).** The adversary directs a DDoS attack against the validator's beacon node or execution client, causing missed attestations and proposals.
2. **Eclipse / network-view poisoning (active).** The adversary isolates the validator's beacon node from the honest P2P network, causing the validator to attest to a minority fork or fail to see the canonical chain head.
3. **Correlation-penalty multiplier exploitation (active).** The adversary induces simultaneous downtime across multiple validators operated by the same entity, amplifying the penalty through Ethereum's correlation-penalty multiplier.
4. **Operator-side infrastructure failure (passive).** Cloud-provider outages, data-centre power loss, or networking-fabric failures cause liveness faults without an active adversary.

The passive-griefing edge case is the most extensively documented sub-class: major cloud-provider outages (Hetzner data-centre incidents, AWS regional failures) have caused mass liveness faults across the Ethereum validator set. A material fraction of Ethereum validators are hosted on Hetzner bare-metal servers; a single Hetzner data-centre outage can affect thousands of validators simultaneously.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020–2022 | Ethereum Beacon Chain liveness-fault penalties (inactivity leak, correlation penalty) characterised in consensus research; validator-downtime griefing discussed in Ethereum R&D forums | T14.006 (consensus-layer surface) |
| 2022–2025 | Multiple cloud-provider outage events (Hetzner data-centre incidents, AWS us-east-1 outages, Google Cloud regional failures) cause mass liveness faults across Ethereum validators; the passive-griefing edge case is the most extensively documented sub-class | T14.006 (passive griefing) |
| 2022–2025 | Lido node-operator diversity program expands — deliberate diversification across cloud providers, geographies, and client implementations to mitigate the correlated-liveness-fault risk that would concentrate in a single-operator staking pool | (defender-side architectural response) |
| 2025 | SSV Network / DVT operator-side correlated downtime incidents — multiple operators in a single validator's DVT cluster experience simultaneous downtime due to shared cloud-provider infrastructure or coordinated maintenance windows | T14.006 (DVT correlation surface) |
| Continuing | Active DDoS-induced liveness-fault events remain rarer in the public record than passive infrastructure-failure events; the surface is characterised in consensus research but lacks a named-perpetrator public incident as of v0.1 | (ongoing surface) |

## Realised extraction

**Passive griefing (cloud-provider outages):** unquantified aggregate of inactivity-leak penalties and forfeited proposal/MEV rewards across thousands of affected validators during major cloud-provider outage events. Per-validator penalty: a validator offline for 36 hours during an inactivity-leak period incurs an approximate penalty of 0.5–1 ETH-equivalent, scaling with the offline duration (quadratic penalty) and the validator's effective balance. **Active griefing (DDoS/eclipse):** no publicly documented incident with a quantified loss figure as of v0.1.

## Public references

See citations in corresponding technique file.

## What this example tells contributors writing future Technique pages

- **The passive/active distinction is forensically meaningful but economically irrelevant.** Future T14.006 worked examples should record the cause of the liveness-fault event (cloud-provider outage, DDoS, eclipse, operator error) as a separate dimension from the economic consequence (inactivity-leak penalty, forfeited rewards). The validator's loss is identical regardless of cause; the mitigation surface differs.
- **Infrastructure-provider concentration is the standing liveness-fault surface.** Future T14.006 risk assessment should quantify the fraction of validators on each cloud provider, in each geographic region, and on each ISP — the concentration metrics are load-bearing T14.006 risk indicators independent of whether an active adversary exploits the surface.
- **DVT redistributes the liveness-fault surface rather than eliminating it.** Future T14.006 work on DVT architectures should assess whether the operator set's infrastructure diversity spans providers, regions, and network paths; a DVT cluster with all operators on the same cloud provider has the same T14.006 surface as a single-operator validator on that provider.

## References

- Ethereum Beacon Chain specification (ethereum/consensus-specs): inactivity-leak mechanism, correlation-penalty multiplier, offline-slashing parameters.
- Beaconcha.in validator-participation-rate data and inactivity-leak tracking.
- Rated Network validator-performance analytics (liveness-fault rate and infrastructure-concentration metrics).
- SSV Network DVT documentation and operator-set liveness-fault post-mortems (2025).
- Lido node-operator diversity program documentation and cloud-provider-outage incident post-mortems (2022–2025).
- `[daian2019flashboys]` — foundational consensus-layer characterisation.
- `[zhou2023sok]` — academic taxonomy covering consensus-layer liveness-fault surfaces.
