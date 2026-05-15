# DAO governance proposal-snowballing cohort — multi-proposal submission to overwhelm voter attention and divide quorum — multi-chain — 2023–2024

**Loss:** structural — the dollar-denominated loss attributable to proposal-snowballing alone (rather than to the governance-capture primitive that the snowballing enabled) is diffuse. The loss is measured as the governance-attack extraction that a snowballing campaign enabled: an attacker submits a cluster of proposals — some genuine-seeming, some diversionary — to divide voter attention across the proposal set, then passes a malicious proposal while governance participants are focused on the diversionary proposals. The snowballing is the **attention-overwhelm primitive**; the extraction is the malicious proposal payload the snowballing enables. Aggregate dollar loss across snowballing-enabled extraction events is in the low-eight-figures range when including the Tornado Cash governance and Audius incidents; per-incident attribution to the snowballing primitive specifically (rather than to the governance-capture primitive) is a boundary question.
**OAK Techniques observed:** **OAK-T16.005** (Malicious Proposal Snowballing — the multi-proposal-submission-to-overwhelm-attention sub-pattern: the attacker submits N proposals in a narrow window, where N exceeds the governance participants' review bandwidth. Some proposals are genuine-seeming (routine parameter updates); others are diversionary (controversial or attention-grabbing but low-stakes); one contains the malicious payload. The review-bandwidth constraint — voters must evaluate N proposals in a fixed voting window — converts the proposal volume into a governance-attack primitive: voters who cannot review all N proposals focus on the diversionary ones, and the malicious proposal passes with reduced scrutiny). The case anchors the review-bandwidth-overwhelm sub-pattern alongside the existing T16.005 examples (Audius, Tornado Cash governance, Curio, Unleash Protocol).
**Attribution:** **pseudonymous** — the proposal-snowballing pattern has been observed across multiple DAOs; in several cases the proposing cohort was attributed at the address-cluster level via T8.001 funding-graph analysis. Named-individual attribution is rare; the pattern is documented at the cohort level.

**Key teaching point:** **A governance system where proposal-submission cost is below the governance participants' review-bandwidth cost creates a structural snowballing surface.** The attacker pays a fixed, low per-proposal submission cost (gas + governance-token deposit if required). Governance participants pay a variable, high per-proposal review cost (time, attention, analysis). When the submission cost is materially lower than the aggregate review cost across the voter set, an attacker can submit N proposals whose collective review cost exceeds the voter set's available attention — and the malicious proposal slips through in the attention deficit. The mitigation is to raise the proposal-submission cost (higher deposit, stricter proposal-eligibility criteria) or to extend the voting window to restore the review-bandwidth-to-proposal-volume ratio.

## Summary

DAO governance systems with low proposal-submission barriers and fixed voting windows are susceptible to a structural attention-overwhelm primitive: an attacker submits a cluster of proposals in a narrow window, saturating the governance participants' review bandwidth, then passes a malicious proposal while attention is focused on diversionary or controversial proposals in the cluster.

The proposal-snowballing pattern operates at the governance-process layer rather than at the vote-acquisition layer (T16.001–T16.004). The attacker does not need to acquire more voting power — the snowballing is about ensuring that the voting power the attacker already has (or expects to have through normal governance participation) is deployed against a proposal that receives reduced scrutiny. The attack exploits the gap between the governance system's decision-throughput capacity (how many proposals can be submitted per unit time — high, because submission cost is low) and the governance participants' review-throughput capacity (how many proposals can be carefully evaluated per unit time — low, because review requires human attention).

The canonical 2023–2024 cohort includes:

- **MakerDAO / Sky Endgame proposal clusters (2023–2024).** The Endgame transition involved multiple concurrent proposals across the governance framework, creating a review-bandwidth constraint for governance participants tracking the full proposal set.
- **Arbitrum DAO governance-proposal volume (2023).** Following the Arbitrum Foundation's initial treasury allocation and subsequent community response, the governance forum experienced a high proposal volume that strained community review capacity.
- **Compound DAO multi-proposal dynamics (2024).** The Proposal 289 governance crisis (covered at `examples/2024-07-compound-vote-takeover.md`) occurred within a broader context of multiple concurrent governance proposals, and the community's attention was divided across the proposal set when the Humpy/Golden Boys proposal was submitted.

The review-bandwidth-overwhelm surface is a standing governance-design concern across the Governor-Bravo-pattern DAO ecosystem. Any DAO where (a) proposal submission cost is low, (b) the voting window is fixed and bounded, and (c) the governance-token holder set faces a real attention constraint inherits the T16.005 surface.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023–2024 | Multiple DAOs experience high governance-proposal volumes; review-bandwidth constraint emerges as a recognised governance-design concern | T16.005 (surface recognition) |
| 2023-04 | Arbitrum DAO governance crisis; high proposal volume strains community review capacity in the aftermath of the Foundation treasury-allocation dispute | T16.005 |
| 2024-07 | Compound Proposal 289 (Golden Boys / Humpy) submitted during a period of multiple concurrent governance proposals; community attention divided across proposal set | T16.005 + T16.003 |
| 2024-08 onward | MakerDAO Endgame proposal clusters continue; governance participants report review-bandwidth constraints tracking the full proposal set across the governance framework | T16.005 |
| Continuing | The review-bandwidth-to-proposal-volume ratio remains a standing governance-design concern across the DAO ecosystem through v0.1 | T16.005 (structurally open) |

## What defenders observed

- **The proposal-submission-cost-to-review-cost ratio is the load-bearing T16.005 metric.** When the cost to submit a proposal (gas + governance-token deposit) is materially lower than the aggregate cost for governance participants to review it (time × number-of-active-voters × attention-cost-per-proposal), the system has a structural snowballing surface. Defenders should track this ratio continuously and flag DAOs where the submission cost is below a calibrated threshold relative to the governance-token market cap (a proxy for the economic stakes the governance system protects).
- **Snowballing is a multiplier on the underlying governance-capture primitive.** The snowballing itself does not extract value — it amplifies the extraction probability of whatever governance-capture primitive (T16.001 flash-loan vote, T16.002 hostile-vote treasury drain, T16.003 delegation-cluster takeover, T16.004 snapshot exploitation) the attacker deploys. Defenders should treat a high proposal volume as a risk multiplier on the existing governance-capture surface, not as an independent attack class.

## Public references

- `[compoundgovernance2024]` *(proposed)* — Compound DAO governance-process documentation and the Proposal 289 aftermath.
- `[arbitrumdao2023]` *(proposed)* — Arbitrum DAO governance-proposal volume and the 2023 governance-crisis aftermath.
- `[makerdaoendgame2022]` *(proposed)* — MakerDAO Endgame governance-process documentation and the multi-proposal architecture.

## Discussion

The 2023–2024 DAO proposal-snowballing cohort is the fifth T16.005 worked example and anchors the review-bandwidth-overwhelm sub-pattern at the cohort level. The structural observation — the proposal-submission-cost-to-review-cost ratio determines the T16.005 surface magnitude — provides the forward-looking detection signal. DAOs with low submission costs, fixed voting windows, and high economic stakes inherit the surface as a standing governance-design property, and defenders should track the proposal volume against the governance participants' review bandwidth as a continuous governance-health metric.
