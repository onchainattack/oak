# Validator liveness-fault griefing cohort — Ethereum L1 (primary), Solana, Cosmos — 2022–2025

**Loss:** **Passive griefing (cloud-provider outages):** unquantified aggregate of forfeited rewards across validators taken offline by provider events; the Solana/Hetzner event (2022-11) is reported as lost rewards for delinquent stake, not slashing (`[theblockhetzner]`). No per-validator penalty figure is asserted here. **Active griefing (DDoS/eclipse):** no publicly documented incident with a quantified loss figure as of v0.1; the surface is characterised in consensus research and Ethereum R&D forums.
**OAK Techniques observed:** **OAK-T14.006** (Validator/Proposer Liveness-Fault Griefing) — canonical anchor case. Distinct from **OAK-T14.001** (Slashing-Condition Exploit) at the *penalty-mechanism* level: T14.001 triggers a one-time slash of the validator's stake via a slashable offence (double-signing, surround-voting); T14.006 triggers a continuous inactivity-leak penalty that grows quadratically with offline duration without requiring a slashable offence. Distinct from **OAK-T14.005** (Builder Censorship MEV): T14.005 targets specific transactions for MEV profit; T14.006 targets the validator itself.
**Attribution:** **unattributed** Provider events (the sourced example is Hetzner's 2022 block on Solana validators) are the attributed cause of the passive-griefing edge case — the "adversary" is the infrastructure-provider outage, not a malicious actor. **Active: no publicly attributed adversary as of v0.1.** Active DDoS-induced liveness-fault events are discussed in consensus research but lack a named-perpetrator public incident.
**Key teaching point:** The liveness-fault surface is a **standing economic risk** for Proof-of-Stake validators that materialises when the validator's infrastructure fails — whether due to an active adversary (DDoS, network partition) or a passive infrastructure event (cloud-provider outage, data-centre power loss). The distinction between active and passive griefing is forensically meaningful but economically irrelevant to the validator: the inactivity-leak penalty is identical regardless of cause. Infrastructure diversity (multi-cloud, multi-region, multi-ISP) and validator-client failover architecture are the load-bearing mitigations.

**Corrected 2026-10-11:** replaced unsourced Hetzner/AWS outage, Lido, SSV and per-validator penalty claims with the sourced Hetzner/Solana 2022 event; no sourced active-griefing incident exists.

## Summary

Validator liveness-fault griefing encompasses both active-adversary and passive-infrastructure events that cause a Proof-of-Stake validator to miss attestations, block proposals, or other consensus duties, triggering consensus-layer penalties. On Ethereum, the primary penalty mechanism is the **inactivity leak** — a quadratic penalty that activates when the Beacon Chain fails to finalise for 4+ epochs and penalises offline validators increasingly the longer they remain offline. The inactivity leak is designed to restore chain finality by reducing the stake of offline validators until the online validators regain a two-thirds supermajority; the economic consequence for an individual offline validator can be material for extended offline durations.

The griefing surface has four distinguishable sub-classes:

1. **DDoS / network-partition attack on validator infrastructure (active).** The adversary directs a DDoS attack against the validator's beacon node or execution client, causing missed attestations and proposals.
2. **Eclipse / network-view poisoning (active).** The adversary isolates the validator's beacon node from the honest P2P network, causing the validator to attest to a minority fork or fail to see the canonical chain head.
3. **Correlation-penalty multiplier exploitation (active).** The adversary induces simultaneous downtime across multiple validators operated by the same entity, amplifying the penalty through Ethereum's correlation-penalty multiplier.
4. **Operator-side infrastructure failure (passive).** Cloud-provider outages, data-centre power loss, or networking-fabric failures cause liveness faults without an active adversary.

The passive-griefing edge case is the most extensively documented sub-class: the sourced instance is Hetzner's November 2022 block of Solana activity, which took over 1,000 Solana validators offline (`[theblockhetzner]`); in August 2022 Hetzner was reportedly considering a ban on crypto node operators, at which time it hosted about 12–16% of Ethereum nodes (`[theblockhetzner]`). Claims of Hetzner data-centre or AWS outages causing mass Ethereum liveness faults were in earlier drafts and have no source found here.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020–2022 | Ethereum Beacon Chain liveness-fault penalties (inactivity leak, correlation penalty) characterised in consensus research; validator-downtime griefing discussed in Ethereum R&D forums | T14.006 (consensus-layer surface) |
| 2022-11 | Hetzner, whose terms prohibit crypto activity, blocks Solana activity on its servers; over 1,000 Solana validators go offline, delinquent stake reaching 22% per `[theblockhetzner]`. This was a provider policy action rather than an outage or an attack | T14.006 (passive, infrastructure-concentration) |
| Continuing | Active DDoS-induced liveness-fault events remain rarer in the public record than passive infrastructure-failure events; the surface is characterised in consensus research but lacks a named-perpetrator public incident as of v0.1 | (ongoing surface) |

## Realised extraction

**Passive griefing (cloud-provider outages):** unquantified aggregate of inactivity-leak penalties and forfeited proposal/MEV rewards across thousands of affected validators during major cloud-provider outage events. No per-validator penalty figure is asserted (earlier draft figure removed as unsourced). **Active griefing (DDoS/eclipse):** no publicly documented incident with a quantified loss figure as of v0.1.

## Public references

- `[theblockhetzner]` — The Block, "1,000 Solana validators go offline as Hetzner blocks server access" (2022-11-02): <https://www.theblock.co/news/ecosystems/2022-11-02-1000-solana-validators-go-offline-as-hetzner-blocks-server-access-182283>
- `[flashbotsliveness]` — Flashbots, "Understanding mev-boost liveness risks" (active-griefing and missed-slot surface): <https://writings.flashbots.net/understanding-mev-boost-liveness-risks>
- `[flashbotspm2023]` — Flashbots, "Post mortem: April 3rd, 2023 mev-boost relay incident and related timing issue": <https://collective.flashbots.net/t/post-mortem-april-3rd-2023-mev-boost-relay-incident-and-related-timing-issue/1540>

## What this example tells contributors writing future Technique pages

- **The passive/active distinction is forensically meaningful but economically irrelevant.** Future T14.006 worked examples should record the cause of the liveness-fault event (cloud-provider outage, DDoS, eclipse, operator error) as a separate dimension from the economic consequence (inactivity-leak penalty, forfeited rewards). The validator's loss is identical regardless of cause; the mitigation surface differs.
- **Infrastructure-provider concentration is the standing liveness-fault surface.** Future T14.006 risk assessment should quantify the fraction of validators on each cloud provider, in each geographic region, and on each ISP — the concentration metrics are load-bearing T14.006 risk indicators independent of whether an active adversary exploits the surface.
- **DVT redistributes the liveness-fault surface rather than eliminating it.** Future T14.006 work on DVT architectures should assess whether the operator set's infrastructure diversity spans providers, regions, and network paths; a DVT cluster with all operators on the same cloud provider has the same T14.006 surface as a single-operator validator on that provider.

## References

- Ethereum Beacon Chain specification (ethereum/consensus-specs): inactivity-leak mechanism, correlation-penalty multiplier, offline-slashing parameters.
- Beaconcha.in validator-participation-rate data and inactivity-leak tracking.
- Rated Network validator-performance analytics (liveness-fault rate and infrastructure-concentration metrics).
- `[daian2019flashboys]` — foundational consensus-layer characterisation.
- `[zhou2023sok]` — academic taxonomy covering consensus-layer liveness-fault surfaces.
