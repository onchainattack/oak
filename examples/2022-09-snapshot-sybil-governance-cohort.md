# Snapshot.org off-chain voting Sybil-attack cohort — chain-agnostic — 2022–2025 (cohort)

**Loss:** no single canonical dollar-extraction anchor at v0.1. The Snapshot.org off-chain voting surface has been the subject of documented Sybil-attack disputes across multiple DAOs (Gitcoin DAO, ENS DAO, Bankless DAO, and smaller-DAO cohorts) through 2022–2025. Individual Snapshot vote disputes typically land at the governance-legitimacy layer (whether a vote outcome should be honoured by the operator multisig) rather than at the dollar-extraction-event layer — the off-chain vote outcome is treated as a social signal rather than as contractually-enforced treasury authority, and operator multisigs retain the power to override disputed outcomes. The absence of clean extraction-scale anchors is a structural property of the off-chain-voting surface: the vote is non-binding by design, and the monetary consequence manifests via operator-side execution (or refusal to execute), not via the vote mechanism itself.

**OAK Techniques observed:** **OAK-T16.004** (Snapshot / Off-chain Voting Exploitation — primary; the off-chain signature-aggregation-voting surface at Snapshot.org is the load-bearing attack surface exercised by Sybil-cluster voting, signature-replay risk, and voting-weight-not-anchored-to-economic-stake exploitation). **OAK-T3.001** (Sybil-Bundled Launch — the upstream Sybil-cluster mechanics that produce multi-wallet voter-eligibility sets are structurally adjacent when the Sybil cluster is created specifically to influence a Snapshot vote). **OAK-T8.001** (Cluster Reuse — funder-graph analysis applied to Snapshot voter-signature sets surfaces common-funder-cluster patterns that constitute the Sybil-attribution signal).

**Attribution:** **unattributed** Individual Snapshot-vote Sybil attackers operate under pseudonymous addresses and are rarely publicly identified. The class-level characterisation — recognition that off-chain signature-aggregation voting is structurally Sybil-attackable when voting weight is not anchored to an economic-stake-or-identity signal — emerged from DAO governance-security research and from the Snapshot.org platform team's progressive hardening of the signature scheme and voter-eligibility verification surface during 2022–2025.

**Key teaching point:** **Off-chain signature-aggregation voting is structurally Sybil-attackable by default — the vote outcome is only as binding as the operator-side commitment to honour it.** Snapshot.org-class platforms aggregate signatures, not on-chain transactions. The signature scheme can be hardened (EIP-712 with proposal-identifier binding, per-vote nonce), but the Sybil surface — multi-wallet voter-eligibility-set creation, voting weight not anchored to token holdings — cannot be closed at the signature-aggregation layer alone. The binding constraint is at the *operator-side commitment layer*: whether the protocol's multisig signers treat the Snapshot outcome as binding, and whether they publish and abide by explicit override criteria.

## Summary

Snapshot.org is the dominant off-chain governance voting platform in the Ethereum DAO ecosystem. As of v0.1, thousands of DAOs use Snapshot for governance signal votes, temperature checks, and (in some protocols) binding treasury-allocation decisions. The platform's core primitive is off-chain signature aggregation: voters sign EIP-712 typed messages declaring their vote, the platform aggregates and tallies the signatures, and the resulting outcome is presented as the community's preference. The vote itself is not an on-chain transaction — no contract enforces the outcome, no timelock gates execution, and no cryptographic finality attaches to the tally.

The T16.004 attack surface arises from four structural properties of this architecture:

1. **Sybil-susceptibility by construction.** Voter eligibility is determined by token balances at a snapshot block. An attacker who controls (or borrows) tokens across multiple addresses at the snapshot block can register multiple votes — one per address — aggregating voting weight across the Sybil cluster. The Sybil cluster is undetectable at the signature-aggregation layer because each signature is cryptographically valid; the Sybil signal is only visible via funder-graph analysis of the voter-address set.

2. **Signature-replay risk.** If the signing scheme does not bind the signature to the specific proposal-identifier and a per-vote nonce, a signature valid for one proposal can be replayed against another. Snapshot.org progressively hardened its signature scheme during 2022–2023 to include proposal-identifier binding (EIP-712 `proposalId` field) and per-vote nonce, closing the replay surface for new votes but leaving historical votes on earlier scheme versions potentially replayable.

3. **Voting-weight-not-anchored-to-economic-stake.** A voter can borrow tokens, register in the snapshot, vote, and return the borrowed tokens immediately after the snapshot block — capturing voting weight without economic exposure. This is the off-chain analogue of T16.001 (flash-loan vote takeover) transposed to the off-chain platform. Mitigation: snapshot-block selection that cannot be manipulated (multi-block window, randomised block, post-vote-close snapshot).

4. **Operator-commitment-is-not-contractual.** The protocol's multisig operators commit to executing the Snapshot outcome on-chain but are not contractually bound to do so. If a Snapshot outcome is disputed (Sybil allegations, signature-replay concerns, or a controversial result), the operators can override it. This override mechanism is a governance safety valve but also a standing surface for operator-side incentive misalignment: operators can selectively honour or ignore Snapshot outcomes based on their interests, and the off-chain vote's "binding" status is a social convention, not a cryptographic guarantee.

Documented Snapshot.org Sybil-vote disputes through 2022–2025 include:

- **Gitcoin DAO governance rounds** — multiple grant-round and governance Snapshot votes were publicly disputed on Sybil-attack grounds, with community analysis documenting common-funder-cluster signatures across voter-address sets. The Gitcoin DAO's experience with Sybil detection in its grants program (the canonical Gitcoin Sybil-detection pipeline) created a particularly well-instrumented surface for identifying Sybil clusters in Gitcoin DAO governance Snapshot votes specifically.
- **ENS DAO governance** — multiple Snapshot votes were publicly analysed for Sybil-cluster patterns, with the ENS community developing per-vote voter-address-set clustering as a standard governance-security practice.
- **Smaller-DAO cohort** — multiple DAOs across the 2022–2025 window publicly documented Snapshot vote disputes where Sybil-cluster analysis of the voter-signature set was the primary evidence for contesting the outcome. These cases rarely reach the dollar-extraction threshold because the operator multisig retains the power to override, and the monetary consequence is at the operator-commitment layer rather than at the vote-mechanism layer.

The Snapshot.org platform team progressively hardened the platform's security surface during this period: EIP-712 proposal-identifier binding, per-vote nonce, delegated-voting-weight verification, and integration with token-balance-snapshot verification services. The platform-level hardening closed the signature-replay and bare-signature-validation surfaces but does not close the Sybil surface — Sybil detection requires funder-graph analysis of voter-address sets, which lives at the governance-security-review layer rather than the platform layer.

## Timeline (cohort-scale)

| When | Event | OAK ref |
|---|---|---|
| 2020 | Snapshot.org deploys in production; off-chain signature-aggregation voting becomes available to Ethereum DAOs | (standing T16.004 surface created) |
| 2020–2022 | Snapshot adoption grows rapidly; thousands of DAOs deploy Snapshot spaces; voting-weight verification anchored to token balances at snapshot blocks | (surface scale) |
| 2022–2023 | Snapshot.org hardens signature scheme: EIP-712 proposal-identifier binding + per-vote nonce added | (platform-side signature-replay mitigation) |
| 2022–2025 | Multiple DAOs (Gitcoin DAO, ENS DAO, Bankless DAO, smaller-DAO cohort) document Snapshot vote disputes on Sybil-attack or signature-replay grounds | **T16.004 (Sybil + signature-replay exercise)** |
| 2022–2025 | Governance-security community develops per-vote voter-address-set clustering as a standard practice; funder-graph analysis applied to Snapshot voter sets | (defender-side methodology emergence) |
| 2025 (v0.1 cutoff) | No canonical dollar-extraction-scale T16.004 anchor lands; class is documented at the governance-legitimacy layer; technique held at `draft` maturity pending canonical worked example | (OAK characterisation) |

## What defenders observed

- **The Snapshot vote outcome is a governance signal, not a cryptographic commitment.** Defenders auditing DAO governance processes must distinguish between the off-chain signal vote (Snapshot) and the on-chain execution vote (the multisig transaction that honours or overrides the Snapshot result). Treating a Snapshot outcome as binding without explicit operator-side commitment criteria is a governance-process gap — not a Snapshot-platform gap.
- **Funder-graph analysis of voter-signature sets is the canonical T16.004 Sybil-detection methodology.** The same T8.001 cluster-attribution primitives that surface serial deployers and drainer affiliates surface Sybil-voter clusters in off-chain voting: common-funder-ancestor analysis across the voter-address set, deployment-time-window clustering, and counterparty-pattern reuse. The methodology is structurally identical; the application surface differs.
- **The operator-side override mechanism is both a safety valve and a standing governance-risk surface.** The fact that the operator multisig can override a disputed Snapshot outcome prevents Sybil-attacked votes from producing on-chain harm — but the same override mechanism can be abused by operators with incentive misalignment. Defenders auditing off-chain-governed protocols should require explicit override criteria and published override-event post-mortems.

## What this example tells contributors writing future Technique pages

- **T16.004 is documented at `draft` maturity because the public record concentrates at the governance-legitimacy layer, not the dollar-extraction layer.** The class is real — Sybil-attacked Snapshot votes are a recurring governance-security surface — but the canonical case where a Sybil-attacked off-chain vote produced a quantified dollar extraction has not yet landed in the OAK corpus. Future contributors should anchor T16.004 with a named incident that includes a per-vote Sybil-cluster forensic analysis and a quantified extraction outcome.
- **The boundary between T16.004 and T16.001/002/003 is the enforcement layer.** Off-chain voting (T16.004) relies on operator-side commitment; on-chain voting (T16.001/002/003) relies on cryptographic finality. The mitigation surfaces are structurally distinct: Sybil-detection methodology (funder-graph clustering) for T16.004; governance-contract design (snapshot block selection, timelock deployment) for T16.001/002/003.

## Public references

- Snapshot.org. *Platform documentation and signature-scheme specification.* 2020 onward — the canonical off-chain voting platform reference — `[snapshotdocs]`.
- Gitcoin DAO. *Governance documentation and Sybil-detection methodology.* 2022 onward — the canonical Sybil-detection pipeline applied to grant-round and governance Snapshot votes — `[gitcoindaosybil]`.
- ENS DAO. *Governance documentation and per-vote voter-address-set analysis.* 2022 onward — community-level governance-security practice — `[ensdaosnapshot]`.
- Cross-reference: T3.001 (Sybil-Bundled Launch) at `techniques/T3.001-sybil-bundled-launch.md` — the upstream Sybil-cluster mechanics that enable T16.004; T8.001 (Cluster Reuse) at `techniques/T8.001-cluster-reuse.md` — the funder-graph-attribution methodology that surfaces Sybil clusters in voter-address sets.

### Proposed new BibTeX entries

```bibtex
@misc{snapshotdocs,
  author = {{Snapshot Labs}},
  title = {Snapshot.org — Off-Chain Governance Voting Platform Documentation},
  year = {2020},
  note = {Canonical off-chain governance voting platform; EIP-712 signature scheme with proposal-identifier binding and per-vote nonce.},
}

@misc{gitcoindaosybil,
  author = {{Gitcoin DAO}},
  title = {Gitcoin DAO Governance — Sybil Detection and Snapshot Vote Disputes},
  year = {2022},
  note = {Canonical Sybil-detection pipeline applied to DAO governance Snapshot votes; per-vote voter-address-set clustering as governance-security practice.},
}
```
