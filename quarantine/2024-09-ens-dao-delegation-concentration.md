> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from its sources and found a governance design risk, not an attack: two ENS forum posts that describe concentrated voting power in ENS DAO. No opened page reports a hostile proposal, a coordinated delegation cluster or a loss. The Technique it was written for, OAK-T16.003, was deprecated the same day for having no documented incident. The file can return if a source documents an attack that used this concentration.

# ENS DAO — voting power concentrated among top delegates, no hostile proposal documented — ENS DAO / Ethereum — 2023–2025

**Loss:** **\$0.** No source opened describes a proposal that moved funds or changed control against the DAO's will.

**OAK Techniques observed:** none — no opened source describes voting power gathered by delegation from many wallets and used to push a proposal. The sources describe concentration of influence among delegates and low participation, which is a governance-design property, not an attack. The delegation-cluster vote-takeover Technique (see [`techniques/T16.003-delegation-cluster-vote-takeover.md`](../techniques/T16.003-delegation-cluster-vote-takeover.md)) is not claimed.

**Attribution:** **unattributed** — nobody is accused of anything in the sources.

**Key teaching point:** **Measure, continuously, how many delegates it takes to reach quorum and 51% of votes.** The ENS governance dashboard announcement lists exactly these two measures as planned metrics ([ENS forum, kpk, 2023-08-03](https://discuss.ens.domains/t/ens-dao-governance-dashboard/17591)). A DAO that tracks them sees the concentration before a contested vote, not during it.

## Summary

This file records a structural observation, not an incident. In August 2023 the user kpk announced a Dune-based ENS DAO governance dashboard, organised into general delegation statistics, delegates, delegation variations and non-delegated token holders, with planned metrics for the number of delegates who control 51% of the voting power and the number of delegates capable of providing quorum, no figures given ([ENS forum](https://discuss.ens.domains/t/ens-dao-governance-dashboard/17591)). In a reply on 2023-08-08, alisha.eth wrote that delegates receive voting power from delegators, and asked how many wallets delegate to the top six delegates ([ENS forum](https://discuss.ens.domains/t/ens-dao-governance-dashboard/17591)).

On 2025-12-09 the author accessor.eth published "An Introduction on the Decentralized State of ENS DAO". It says the DAO has a highly concentrated distribution of governance influence and that apathy lowers the effective quorum. Its figure of 76.2% of voting power held by the top decile is labelled in the post's table as across the DAOs studied, so it is not an ENS-only measurement ([ENS forum](https://discuss.ens.domains/t/an-introduction-on-the-decentralized-state-of-ens-dao/21709)). The post links, without reproducing it, a proposal to replace the Working Groups with the ENS Admin Panel ([ENS forum](https://discuss.ens.domains/t/an-introduction-on-the-decentralized-state-of-ens-dao/21709)).

No opened page reports a coordinated delegation cluster, a hostile proposal, or any loss. The earlier version of this file asserted ENS Foundation and named-delegate holdings, a claim that it was a fourth T16.003 worked example and a launch date; none of that is on an opened page and it was removed.

## Timeline (UTC)

**Flaw**: delegation concentrates influence. **Execution**, **money** and **response**: none occurred. Dates come from the forum posts.

| When | What happened | OAK |
|---|---|---|
| 2023-08-03 | kpk posts the ENS DAO governance dashboard, planning metrics for delegates needed for 51% and for quorum ([ENS forum](https://discuss.ens.domains/t/ens-dao-governance-dashboard/17591)). | — |
| 2025-12-09 | accessor.eth publishes the analysis of concentrated influence and low effective quorum ([ENS forum](https://discuss.ens.domains/t/an-introduction-on-the-decentralized-state-of-ens-dao/21709)). | — |
| — | Entry, preparation, execution and funds: none. No proposal, address or transaction is described. | — |
| — | Response: none; no incident. | — |

Key addresses: none. No source opened prints an address.

## Root-cause evidence

- **Technique:** none
- **Source:** <https://discuss.ens.domains/t/ens-dao-governance-dashboard/17591>; <https://discuss.ens.domains/t/an-introduction-on-the-decentralized-state-of-ens-dao/21709>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** Two community forum posts describe delegation concentration and low participation. Neither describes an attack, and neither is an incident post-mortem. Who the top delegates are, and how many hold quorum, is not given in either post.

## Public references

- `[ensforumdash2023]` — ENS DAO forum, kpk, "ENS DAO Governance Dashboard" (2023-08-03): <https://discuss.ens.domains/t/ens-dao-governance-dashboard/17591>
- `[ensforumstate2025]` — ENS DAO forum, accessor.eth, "An Introduction on the Decentralized State of ENS DAO" (2025-12-09): <https://discuss.ens.domains/t/an-introduction-on-the-decentralized-state-of-ens-dao/21709>
