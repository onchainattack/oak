# OAK-M02 — Static-Analysis Pre-Deployment

**Class:** architecture
**Audience:** protocol, designer
**Maps to Techniques:** OAK-T1.001, OAK-T1.003, OAK-T1.004, OAK-T1.005, OAK-T6.001, OAK-T6.002, OAK-T9.004, OAK-T9.005, OAK-T13.001

## Description

Static-Analysis Pre-Deployment is the discipline of running automated source-level analyses (Slither, Semgrep with smart-contract rule packs, MythX, Securify) and, for high-assurance components, formal verification (Certora Prover, Halmos, hevm symbolic execution, K-framework specifications) against a contract's source *before* mainnet deployment. The output is a machine-readable enumeration of suspicious code patterns — modifiable fee paths, residual admin authorities, missing reentrancy guards, unguarded external calls, and access-control gaps — that the project team must triage before pushing the deployment transaction.

The defensive principle is that mainnet deployment is a one-way door for the cohort of users who interact in the first hours: by the time a manual audit or a community review surfaces a finding, capital is already at risk. Pushing detection upstream of deployment converts a class of post-incident forensic work into a pre-incident developer task, where the marginal cost of fixing a finding is orders of magnitude lower than the post-deployment cost of patching, migrating, or pausing.

The mitigation is most load-bearing for invariant-class properties — "this contract has no path that lets a non-owner mint", "this lending market's solvency invariant holds across every external-call boundary", "the access-control modifier covers every state-mutating function" — that are tractable for symbolic / formal tooling and intractable for manual review on a contract-system of any non-trivial size. It is necessary but not sufficient: static analysis is upstream of audit, not a replacement for audit.

## How it applies

- **OAK-T1.001 (Modifiable Tax Function):** Slither's `arbitrary-send` and custom Semgrep rules detecting setter functions on fee state variables surface fee-mutability before it ships.
- **OAK-T1.003 (Renounced-but-not-Really):** authority-graph enumeration via Slither's `pragma`/access-control detectors plus custom rules for residual admin paths catches single-axis-renouncement-with-residual-authority before the renouncement claim is made publicly.
- **OAK-T1.004 (Blacklist / Pausable Weaponisation):** Semgrep rules over transfer-logic predicates flag any transfer path gated by a settable blacklist mapping or pause flag without an associated time-lock.
- **OAK-T1.005 (Hidden Fee-on-Transfer):** symbolic-execution tooling (hevm, Halmos) can prove or disprove fee-symmetry across the transfer matrix in a way that manual review cannot at scale.
- **OAK-T6.001 (Source-Verification Mismatch):** static-analysis tooling is the principal *consumer* of verified source — its output is meaningful only when paired with OAK-M01 binding, but conversely the value of OAK-M01 is realised through OAK-M02 downstream analysis.
- **OAK-T6.002 (Fake Audit Claim):** static-analysis output published as a project-side artefact (the Slither / formal-verification report alongside the deployment) raises the falsifiability of audit claims even where a third-party audit is absent, narrowing the surface that T6.002 exploits.
- **OAK-T9.004 (Access-Control Misconfiguration):** Slither's access-control detectors and Certora-style rules prove "every privileged function is gated by the expected role"; this is the canonical pre-deployment mitigation for T9.004.
- **OAK-T9.005 (Reentrancy):** Slither's `reentrancy-eth`, `reentrancy-no-eth`, and `reentrancy-events` detectors plus Halmos-class symbolic checks for checks-effects-interactions ordering surface reentrancy vectors before deployment; for read-only reentrancy, custom rules are required since stock detectors miss the cross-protocol case.
- **OAK-T13.001 (Paymaster Compromise):** ERC-4337-specific static-analysis rule packs (validate-paymaster-userOp surface, postOp revert paths, gas-token assumptions) catch paymaster-class bugs before the paymaster contract is registered with an EntryPoint.

## Limitations

Static analysis catches structural / pattern-level bugs (missing guards, unsafe ordering, settable state on critical paths) but is weak on *protocol-economic* failure modes (oracle-manipulation surfaces in T9.001, governance-attack surfaces in T9.003, restaking-cascade surfaces in T14.003) where the bug is in the design, not the code. Formal verification narrows that gap but requires invariant specifications that themselves can be wrong or incomplete — Certora's bound is the spec, not the contract. False-positive rates on stock detectors (Slither in particular) are high enough that triage discipline is required; teams that rubber-stamp the report are no better off than teams that skip it. And static analysis says nothing about the source-bytecode binding (OAK-M01) — analysing source that does not match the deployed bytecode is the pathological case OAK-T6.001 exploits.

## Reference implementations

- Slither (Trail of Bits, open-source) — the canonical EVM static-analysis tool; runs detector packs over Solidity source.
- Semgrep (returntocorp, open-source) — pattern-matching engine with smart-contract rule packs (`semgrep-smart-contracts`).
- MythX / Mythril (ConsenSys Diligence) — symbolic execution and SMT-backed bug-finding for EVM bytecode.
- Certora Prover — commercial formal-verification platform with declarative rule language; widely used by major DeFi protocols (Compound, Aave, MakerDAO).
- Halmos (a16z) and hevm (DappHub / Foundry) — open-source symbolic execution; suitable for invariant proofs.
- `mg-detectors-rs` — runtime-side detectors; pre-deployment static analysis is out of scope for v0.1 but pairs naturally with the runtime layer.
- OpenZeppelin Defender, Forta — runtime monitoring; complementary to OAK-M02 rather than a substitute.

## Citations

- `[owaspscstop10]` — OWASP Smart Contract Top 10 enumerates the bug classes that pre-deployment static analysis principally targets.
- `[slowmist2024report]` — industry incident corpus; OAK-M02 gaps map directly to the recurring root-cause categories.
- `[chainalysiseuler2023]` — Euler 2023 retrospective; donateToReserves access-control gap was reachable by pre-deployment formal verification with the correct invariant.
- `[halborneuler2023]` — Halborn-side technical analysis of the Euler donateToReserves path.
- `[osecpaymasters2025]` — paymaster-class static-analysis findings; relevant to T13.001 application.
- `[ozaa4337audit]` — OpenZeppelin ERC-4337 audit notes; static-analysis surface for the AA stack.
