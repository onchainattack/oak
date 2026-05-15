# Optimistic-bridge fraud-proof gap cohort — multi-chain — 2022–2025 (cohort)

**Loss:** no single canonical dollar-extraction anchor at v0.1. Optimistic-bridge fraud-proof gaps are documented at the **architecture-review layer** rather than via headline loss incidents. The Nomad bridge incident (August 2022, ~$190M) is catalogued under T10.002 because its proximate failure was a verification-predicate bug (`0x00` trusted-root initialisation), not a fraud-proof-window failure — the optimistic verification mechanism was bypassed entirely rather than out-raced. No headline bridge incident through v0.1 has had "the fraud-proof window was too short" or "the challenger network was absent" as the primary failure mode producing a quantified extraction at the T10.001/T10.002 scale. The case is structured as a **cohort-level architecture-review example** because the public-record evidence base for T10.004 is at the architecture-review, academic-literature, and audit-firm-practice layer.

**OAK Techniques observed:** **OAK-T10.004** (Optimistic-Bridge Fraud-Proof Gap — primary; the gap between the architectural assumption of a 1-of-N honest, live, economically-motivated challenger and the deployed reality where challengers may be absent, censored, under-incentivised, or technically blocked from filing a valid proof). **OAK-T10.002** (Message Verification Bypass — structurally adjacent when the fraud-proof gap enables a message that should have been challenged to pass unchallenged).

**Attribution:** **unattributed** Optimistic-bridge fraud-proof gaps are a bridge-architecture vulnerability class, not an operator-attribution class. The class is characterised in bridge-architecture literature (Nomad/Connext original architecture write-ups by Arjun Bhuptani, Halborn Nomad analysis, academic dispute-game liveness-incentive analysis) and in audit-firm bridge-specialist practice.

**Key teaching point:** **The 1-of-N honest-verifier assumption of optimistic bridges reduces to 0-of-N unless at least one funded, bonded, technically-capable challenger is actually running.** The gap between the architectural assumption and the deployed reality is the T10.004 surface: a fraud-proof system whose challenge window is sized without a response-time-budget analysis, whose challenger set is not publicly identified or bonded, or whose fraud-proof path has never been exercised end-to-end in production is a standing bridge-risk surface independent of the bridge's code quality.

## Summary

Optimistic bridges (and optimistic rollup bridges) rely on a fraud-proof challenge window to detect and reject invalid messages. The architectural model is: messages are optimistically accepted, a challenge window opens during which any honest observer (a "watcher," "verifier," or "fraud-prover") can submit a fraud proof demonstrating that a message is invalid, and if a valid proof arrives within the window, the message is rejected. The security guarantee rests on the assumption that at least one honest, live, economically-motivated challenger exists — the "1-of-N honest verifier assumption."

T10.004 covers four sub-cases where that assumption fails in practice:

1. **Absent challenger network (sub-case a).** No economically-incentivised challenger actually monitors the bridge. The bridge documentation specifies that "any honest observer can challenge" but no entity is funded, bonded, or operationally committed to doing so. The 1-of-N honest-verifier assumption reduces to 0-of-N. This gap is the most common T10.004 finding in bridge-architecture reviews: the challenger role is specified aspirationally but not operationalised.

2. **Inadequate challenge window (sub-case b).** The challenge window is too short for realistic challenger response time. For cross-chain optimistic bridges, the challenger must: detect the invalid message on the destination chain, construct a fraud proof (which may require retrieving and verifying data from the source chain), and submit the proof on the destination chain — all within the challenge window. If the window is shorter than the sum of source-chain-finality time + cross-chain-proof-construction time + destination-chain-inclusion latency + human-escalation time, the window is inadequately sized.

3. **Fraud-proof system bugs (sub-case c).** The fraud-proof contract itself contains bugs — incorrect state-transition reproduction, gas griefing vectors, missing dispute-game branches, incorrect bond-slashing logic — that prevent valid challenges from being processed even when a challenger is present and timely. This sub-case overlaps with T10.002 (the verification-predicate bug class) but is specific to the fraud-proof contract's own correctness rather than the primary message-verification logic.

4. **Censorship / liveness defeat (sub-case d).** The challenger's fraud-proof transaction can be censored by the same entity whose messages it would dispute — the canonical self-censorship gap. If the bridge operator (or a sequencer, or a block-builder) can exclude fraud-proof transactions from blocks, the challenger's liveness is defeated regardless of the window size or the challenger's bond.

Documented architecture-review findings through 2022–2025 include:

- **Nomad bridge (2022).** Halborn's analysis of the Nomad bridge architecture documented the optimistic-verification mechanism and its dependence on watcher liveness. The Nomad bridge's August 2022 exploit bypassed the optimistic mechanism entirely (the `0x00` trusted-root initialisation bug, catalogued under T10.002), but the architecture-review literature on the Nomad watcher-set liveness is the canonical T10.004 reference for sub-case (a).
- **Connext / Nomad architecture documents.** Arjun Bhuptani's original optimistic-bridge architecture write-ups describe the 1-of-N honest-verifier assumption explicitly and the economic conditions under which it holds — the foundational bridge-architecture literature that defines the T10.004 surface.
- **L2BEAT bridge-stage classifications.** L2BEAT's per-bridge "stage" classifications include fraud-proof maturity as a classification dimension, surfacing bridges whose fraud-proof systems are deployed but not yet proven (no successful challenge history, challenger set not identified or bonded).
- **Academic dispute-game analysis.** The `[hollowvictory2025]` paper characterises liveness-incentive insufficiency in dispute games as a strategic-exploit surface — an attacker who can economically exhaust or out-race the challenger set can cause a valid challenge to fail even when the challenge is correctly constructed and timely submitted.

## Timeline (cohort-scale)

| When | Event | OAK ref |
|---|---|---|
| 2021–2022 | First optimistic bridge architectures deploy (Nomad, Connext, Hop Protocol); challenger networks are specified aspirationally but not always operationally funded or bonded | (standing T10.004 surface) |
| 2022-08 | Nomad bridge exploit (~$190M); proximate cause is T10.002 (`0x00` trusted-root initialisation), but Halborn's analysis documents the optimistic-verification mechanism and watcher-liveness dependence as a distinct architectural surface | **T10.004 (architecture-review anchoring)** |
| 2022–2023 | Arjun Bhuptani's optimistic-bridge architecture write-ups characterise the 1-of-N honest-verifier assumption; academic bridge-security literature formalises the challenger-liveness surface | (class characterisation) |
| 2023–2025 | L2BEAT publishes per-bridge "stage" classifications including fraud-proof maturity; multiple bridges are classified as having fraud-proof systems that are deployed but not operationally proven | (defender-side classification) |
| 2024–2025 | Academic dispute-game liveness-incentive analysis (`[hollowvictory2025]`) formalises strategic challenger-exhaustion as a T10.004 sub-case | (academic characterisation) |
| 2025 (v0.1 cutoff) | No headline-scale T10.004 incident lands; class documented at architecture-review layer; T10.004 included as a completeness Technique for the Bridge Tactic | (OAK characterisation) |

## What defenders observed

- **The challenger network must be a first-class operational dependency, not an aspirational footnote.** A bridge whose documentation says "any honest observer can challenge" but whose challenger set is unnamed, unbonded, and unfunded is relying on an assumption that has not been operationalised. Defenders auditing optimistic bridges should require: named challenger operator(s), published bond balances, liveness telemetry (last-heartbeat, last-successful-challenge), and a demonstrated successful challenge on testnet or via adversarial drill.
- **The challenge window must be sized from a written response-time-budget analysis.** Convention-based windows (e.g., "30 minutes") without a documented analysis of source-chain finality, cross-chain proof construction time, destination-chain inclusion latency under congestion, and human escalation time are T10.004-suspect.
- **A fraud-proof system that has never processed a successful challenge is operationally unproven.** Code review of the fraud-proof contract is necessary but not sufficient — the end-to-end path (detect invalid message → construct proof → submit within window → proof processed correctly) must be exercised in a representative environment. A "cold" fraud-proof path is a standing operational risk independent of code correctness.

## What this example tells contributors writing future Technique pages

- **T10.004 is documented at the architecture-review layer because the bridge ecosystem has not yet produced a headline-scale fraud-proof-window failure — the gap is known, characterised, and mitigatable before a flagship incident occurs.** This is the ideal state for a defender-perspective taxonomy: the failure mode is characterised in the literature, the early-warning signals are observable, and the mitigations are deployable now. The Technique is included in v0.1 for the same reason T10.003 is included: a Bridge Tactic without the fraud-proof-gap class would be structurally incomplete.
- **The boundary between T10.004(c) (fraud-proof system bugs) and T10.002 (message-verification bypass) is the contract surface.** T10.002 covers bugs in the primary message-verification logic; T10.004(c) covers bugs in the *challenge-processing* logic that prevent a valid challenge from being processed. The two are structurally distinct: a bug-free primary verification predicate + a buggy fraud-proof system = a bridge that correctly accepts messages but cannot be corrected when it incorrectly accepts one.

## Public references

- Halborn. *"Nomad Bridge — Optimistic Verification and Watcher Liveness Analysis."* 2022 — the canonical architecture-review reference for the Nomad optimistic-verification mechanism and its watcher-liveness dependence — `[halbornnomadoptimistic2022]`.
- Arjun Bhuptani. *"Optimistic Bridges — Architecture and Security Model."* 2022 — the foundational optimistic-bridge architecture write-ups characterising the 1-of-N honest-verifier assumption — `[bhuptanioptbridges2022]`.
- L2BEAT. *Bridge-Stage Classifications.* 2023 onward — per-bridge "stage" classifications including fraud-proof maturity as a classification dimension — `[l2beatbridges]`.
- `[hollowvictory2025]` — academic dispute-game liveness-incentive analysis; formalises strategic challenger-exhaustion as a T10.004 sub-case.
- Cross-reference: T10.002 (Message Verification Bypass) at `techniques/T10.002-message-verification-bypass.md` — the verification-predicate-bug class that T10.004 is structurally distinct from; the Nomad August 2022 incident is the canonical T10.002 anchor but is also the architecture-review reference for the T10.004 watcher-liveness surface.

### Proposed new BibTeX entries

```bibtex
@misc{halbornnomadoptimistic2022,
  author = {{Halborn}},
  title = {Nomad Bridge — Optimistic Verification and Watcher Liveness Analysis},
  year = {2022},
  note = {Canonical architecture-review reference for the Nomad optimistic-verification mechanism and watcher-liveness dependence.},
}

@misc{bhuptanioptbridges2022,
  author = {{Arjun Bhuptani}},
  title = {Optimistic Bridges — Architecture and Security Model},
  year = {2022},
  note = {Foundational optimistic-bridge architecture write-ups characterising the 1-of-N honest-verifier assumption.},
}

@misc{l2beatbridges,
  author = {{L2BEAT}},
  title = {Bridge-Stage Classifications — Fraud-Proof Maturity},
  year = {2023},
  note = {Per-bridge stage classifications including fraud-proof system maturity scoring.},
}
```
