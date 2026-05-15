# Arbitrum One optimistic bridge validator-set gap — Ethereum / Arbitrum One — 2022–2025 (architecture-review)

**Loss:** structural — no direct dollar extraction attributable to the fraud-proof gap alone. The Arbitrum bridge has not suffered a T10.004 exploit at extraction scale as of v0.1. The loss is the **standing structural vulnerability**: the bridge's security model assumes at least one honest, live, economically-motivated validator exists to challenge invalid state roots during the challenge window, but at deployment and for a material period thereafter, Offchain Labs was the sole party operating validator infrastructure in practice.

**OAK Techniques observed:** **OAK-T10.004** (Optimistic-Bridge Fraud-Proof Gap) — primary; the Arbitrum One bridge relies on an optimistic rollup verification model where state-root proposals are accepted after a ~7-day challenge window unless a validator submits a fraud proof. The 1-of-N honest-validator assumption reduces to 0-of-N or 1-of-N (operator-only) when no independent third-party validators operate. Sub-case (a) "absent challenger network" at deployment; sub-case (d) "censorship / liveness defeat" given the sequencer's ability to potentially exclude fraud-proof transactions.

**Attribution:** **unattributed** The gap is documented in rollup-security literature (L2BEAT stage classifications, academic dispute-game analyses) and in Arbitrum's own documentation of the validator-set assumptions.

**Key teaching point:** **The Arbitrum One bridge demonstrates that optimistic-rollup fraud-proof security is only as strong as the validator set it names — and a validator set of one is structurally identical to an absent validator set from the defender's risk-modelling perspective.** The gap between the architectural assumption (any honest party can challenge) and the deployed reality (only the rollup operator runs validators) is the T10.004 surface, and it persists as a standing risk even when the fraud-proof contracts are correctly implemented.

## Summary

Arbitrum One is an optimistic rollup on Ethereum that uses a fraud-proof system to secure the bridge between L1 (Ethereum) and L2 (Arbitrum One). The bridge holds all assets deposited into the rollup — at peak, tens of billions of dollars in TVL. The security model for the bridge's asset custody relies on the optimistic verification mechanism: state-root proposals (RBlocks) are posted to L1, and any honest validator can challenge an invalid state root by submitting a fraud proof during the challenge window (~7 days). If no valid challenge arrives, the state root is finalised and assets can be withdrawn against it.

The T10.004 surface is the gap between this architectural assumption and the deployed reality:

1. **Absent independent validator set (sub-case a).** At Arbitrum One's genesis (August 2021 mainnet launch) and through the Nitro upgrade (August 2022), Offchain Labs was the sole entity operating validator infrastructure. The validator software was open-source and the protocol permitted any party to run a validator, but no independent third party publicly attested to operating a funded, bonded validator capable of submitting fraud proofs within the challenge window. The 1-of-N honest-validator assumption was effectively 1-of-1 — the rollup operator itself was the only live validator.

2. **Single-sequencer censorship risk (sub-case d).** During the period of single-sequencer operation (pre-decentralisation), the entity that produced L2 blocks (the sequencer) could, in principle, censor fraud-proof transactions submitted by an independent validator — a self-censorship gap where the block-producer and the potential fraud-proof excluder are the same entity. Arbitrum's design includes a "force-inclusion" mechanism (delayed inbox) that allows L1-submitted transactions to bypass sequencer censorship, but a validator must be operational and aware of the mechanism to use it within the challenge window.

3. **Cold fraud-proof path.** The Arbitrum bridge's fraud-proof contracts had never processed a real challenge in production at the time of the Nitro upgrade — a "cold" fraud-proof path where the dispute-game logic had been tested in simulation but not exercised under adversarial conditions on mainnet. A fraud-proof system that has never processed a successful (or unsuccessful) challenge is a T10.004 surface regardless of code-review quality — the operational readiness of the challenge infrastructure is untested.

These gaps did not result in a dollar-loss extraction from the Arbitrum bridge during the 2022–2025 window. The bridge's security was not adversarially probed at the fraud-proof layer because the sequencer produced valid state roots — there was no invalid state root to challenge. However, the T10.004 surface was structural and independent of the sequencer's honesty: had the sequencer (or a malicious state-root proposer) posted an invalid state root, the bridge would have relied on a validator set that was operationally reduced to the rollup operator itself.

The Arbitrum ecosystem has progressively addressed these gaps. L2BEAT's stage-classification framework tracks Arbitrum One's progress toward Stage 1/Stage 2 rollup maturity, which requires: (a) a functional fraud-proof system with at least one external validator running, (b) a sequencer-decentralisation roadmap with force-inclusion guarantees, and (c) a Security Council with upgrade-timelock constraints. As of the Nitro upgrade and subsequent releases (Bold dispute-game protocol, 2023–2025), Arbitrum has moved toward closing the T10.004 surface — but the structural lesson stands: optimistic bridges and rollups whose validator set is the operator themselves carry a standing T10.004 surface regardless of code quality.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-08 | Arbitrum One mainnet launch; optimistic rollup bridge deployed; Offchain Labs sole validator operator | T10.004 surface present (absent independent validators) |
| 2022-08 | Arbitrum Nitro upgrade; fraud-proof system upgraded to WebAssembly-based interactive dispute protocol; independent validators still not publicly attested at scale | T10.004 surface persists |
| 2022–2023 | L2BEAT publishes stage-classification framework; flags Optimistic Rollup fraud-proof maturity as a classification dimension; Arbitrum One classified as Stage 0/Stage 1 during this window | T10.004 surface characterised |
| 2023–2024 | Offchain Labs publishes validator documentation and incentivises third-party validators; independent validators begin operating publicly | T10.004 surface narrowing |
| 2024–2025 | Bold dispute-game protocol introduced; enhanced decentralisation roadmap published; Security Council with timelock implemented | T10.004 surface further addressed |
| Continuing | Fraud-proof contracts have not processed an adversarial challenge on mainnet as of v0.1 — the fraud-proof path remains "cold" | T10.004 surface monitoring ongoing |

## Realised extraction

$0 at the named-exploit level as of v0.1. The gap is documented at the architecture-review layer.

## Public references

- L2BEAT stage-classification framework — tracks fraud-proof maturity, validator-set composition, and sequencer-decentralisation for Arbitrum One and other optimistic rollups.
- Arbitrum Nitro documentation — describes the interactive fraud-proof protocol and validator-set assumptions.
- `[hollowvictory2025]` — academic analysis of dispute-game liveness-incentive insufficiency; relevant for the T10.004 challenger-set economics surface.
- Offchain Labs developer documentation — validator-node operation guide and challenge-window parameters.
- Cross-reference: T10.004 at `techniques/T10.004-optimistic-bridge-fraud-proof-gap.md`.
- Cross-reference: [`examples/2022-07-nomad-optimistic-verification-gap.md`](2022-07-nomad-optimistic-verification-gap.md) — Nomad optimistic bridge challenger-network gap (architecture-review anchor).
- Cross-reference: [`examples/2022-2025-optimistic-bridge-fraud-proof-cohort.md`](2022-2025-optimistic-bridge-fraud-proof-cohort.md) — Optimistic-bridge fraud-proof gap cohort, 2022–2025.

## Discussion

The Arbitrum One bridge is the highest-TVL optimistic-rollup bridge in the EVM ecosystem and the most commercially significant instantiation of the 1-of-N honest-validator assumption. The T10.004 surface is structural and applies to every optimistic rollup whose validator set is the rollup operator themselves — a condition that applies to multiple optimistic rollups at their genesis phase and for varying periods thereafter. The Arbitrum case is the canonical architecture-review anchor for the highest-TVL instance of this gap.

The case demonstrates three structural points:

- **Validator-set centrality is a first-class risk metric.** The number of independent, bonded, publicly-attested validator operators is the load-bearing metric for T10.004 risk assessment on any optimistic bridge or rollup. A validator set of one (the operator) is structurally identical to an absent validator set from the defender's risk-modelling perspective — the 1-of-N assumption is only as strong as the weakest link in the set, and a set of one has no honest-majority redundancy.

- **A "cold" fraud-proof path is a standing surface.** A fraud-proof contract that has never processed a real challenge on mainnet is operationally untested regardless of code-review quality. The defender heuristic should be: treat any optimistic bridge whose fraud-proof path is cold as carrying a T10.004 surface until the path has been exercised under adversarial conditions (adversarial drill, testnet challenge, or real-world incident).

- **Stage-classification frameworks (L2BEAT) are a defender-side T10.004 detection instrument.** The L2BEAT rollup-stage classification provides a publicly-verifiable, independently-maintained assessment of fraud-proof maturity and validator-set composition for every major optimistic rollup. Risk teams integrating optimistic bridges should consume L2BEAT-equivalent stage classifications as the primary T10.004 baseline and supplement with per-bridge validator-set membership verification.
