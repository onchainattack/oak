# OAK-M16 — Pre-Deployment Audit and Formal Verification

**Class:** architecture
**Audience:** protocol, designer

**Maps to Techniques:** OAK-T1.001, OAK-T1.003, OAK-T1.004, OAK-T6.001, OAK-T6.002, OAK-T6.003, OAK-T6.004, OAK-T9.001, OAK-T9.002, OAK-T9.003, OAK-T9.004, OAK-T9.005, OAK-T10.001, OAK-T10.002, OAK-T10.003, OAK-T10.004, OAK-T10.005

## Description

OAK-M16 is the broadest single mitigation in the OAK catalogue: independent pre-deployment audit by a named firm, paired where the contract surface is critical with post-audit formal verification (Certora, Halmos, K-framework) of stated invariants, and capped by published audit-attestation artefacts (audited-bytecode hash, audited-commit hash, scope graph, formal-verification report). Audit alone is widely understood as necessary; M16 is the more demanding compound control — audit *and* formal verification *and* machine-readable attestation — that operationalises the audit claim into something defenders downstream (wallets, risk teams, block explorers) can verify against deployed bytecode without re-auditing the project themselves.

The mitigation is intentionally cross-cutting because the failure modes it addresses span Tactics. At the contract-design layer it targets the canonical T9 classes — oracle manipulation (T9.001), flash-loan-enabled exploits (T9.002), governance attacks (T9.003), access-control misconfiguration (T9.004), reentrancy (T9.005) — each of which has a well-understood pre-deployment review surface that audit and formal verification meaningfully reduce. At the bridge layer it targets verification-predicate bugs (T10.002), cross-chain replay (T10.003), and cryptographic-primitive flaws (T10.005), where the dollar-loss-at-stake justifies the higher-cost formal-verification leg. At the token-genesis layer it targets the modifiable-authority classes (T1.001 modifiable tax, T1.003 renounced-but-not-really, T1.004 blacklist/pausable weaponization) where pre-deployment static analysis and audit catch privileged-role gaps before they reach holders. At the defense-evasion layer (T6.001–T6.004) it forms the substrate that the audit-claim Techniques attack: M16 is *what an honest project does*; T6.002 / T6.003 / T6.004 are what dishonest projects fabricate, drift from, or pre-promise without ever delivering. The audit-attestation publication component of M16 is the canonical defence that makes T6.002 / T6.003 / T6.004 detectable.

M16 is the substrate mitigation that other architecture-class mitigations (M13 challenger-bond design, M14 multi-prover redundancy, M15 threshold-signing operator separation, M17 timelock governance) all assume. None of those mitigations succeed if the underlying contracts implementing them contain access-control gaps, reentrancy, or incorrect verification predicates; M16 is what makes the rest defensible.

## How it applies

- **OAK-T9.004 / T9.005 (access-control / reentrancy):** the canonical pre-deployment audit surface; static analysis, symbolic execution, and formal verification of invariants under all reachable call paths.
- **OAK-T9.001 / T9.002 / T9.003 (oracle / flash-loan / governance):** audit review of flash-loan-resistance, oracle-architecture choices, and governance-design properties (snapshot-based voting power, quorum-with-timelock, no emergency-execution paths bypassing the lifecycle).
- **OAK-T10.002 / T10.003 / T10.004 / T10.005 (bridge):** audit by bridge-specialist firms; circuit-specialist audit for zk components; formal verification of consensus-rule encoding for light clients; published trusted-setup ceremony transcripts; verifier-contract bytecode pinning.
- **OAK-T10.001 (validator key compromise):** audit of the on-chain authorisation logic; off-chain operational-security review of validator-operator personnel security posture is adjacent (covered by OAK-M15).
- **OAK-T1.001 / T1.003 / T1.004 (token-genesis modifiable authority):** static analysis for modifiable fee functions, post-renouncement proxy-admin retention, and weaponisable blacklist/pausable hooks; audit-pass-required-before-listing as a launchpad / DEX-aggregator gating control.
- **OAK-T6.001 / T6.002 / T6.003 / T6.004 (audit-trust evasion):** publication of audited-bytecode hash, audit registry entry, and engagement-tracking attestation; each closes a specific audit-claim verification surface that the corresponding T6 Technique exploits.

## Limitations

- Audit coverage does not bound post-launch operator behaviour: the Swaprum case (real CertiK audit, ~$3M post-audit rug pull, T5.005) illustrates that audited contracts remain rug-able if operator authority is preserved.
- Audit firms vary in depth, methodology, and scope; "audited" is not a uniform signal. M16 implicitly trusts the named firm's review capacity, which is itself unevenly distributed across the v0.1 audit market.
- Formal verification scales poorly to large-codebase systems and is generally reserved for high-assurance subsets (oracle math, bridge verifier predicates, governance-quorum logic). Full-codebase formal verification is rare and expensive.
- Audit-attestation publication infrastructure is **emerging** rather than mature: most firms publish PDF reports referencing commit hashes; few publish audited-bytecode hashes in machine-readable form. T6.003 detection at scale remains a manual recompile-and-compare exercise.
- Pre-deployment audit cannot catch failure modes that require runtime context the auditor did not have: operational-security gaps at validator-operator personnel (T10.001 entry vector), supply-chain compromise at signing vendors (T11.001), wallet-distribution-channel compromise (T11.002).
- Multi-contract systems frequently audit only a subset of the deployed contracts; the unaudited adjacent contracts (treasury, upgrader, router) are the actual failure surface in many incidents. Scope-graph publication is part of M16 but is unevenly adopted.

## Reference implementations

- Audit firms with broad coverage: Halborn, Trail of Bits, OpenZeppelin, ConsenSys Diligence, CertiK, Quantstamp, Zellic, Spearbit, Cantina.
- Circuit-audit specialists for zk components: Veridise, Trail of Bits, ZK Security, Zellic, OpenZeppelin's ZK practice.
- Formal-verification platforms: Certora (the dominant deployed-protocol formal-verification platform; widely cited in DeFi formal-verification engagements), Halmos (symbolic-execution-based), K-framework (semantic-level reasoning), Runtime Verification.
- Static analysers: Slither (the de facto standard for Solidity static analysis), MythX, Mythril, Securify.
- Audit-attestation infrastructure: Sourcify-style cryptographic source verification (block-explorer side); machine-readable audit registries are emerging at audit-firm side (CertiK Skynet, Halborn published audits, OpenZeppelin Defender, Trail of Bits public-audits archive) but the bytecode-hash and engagement-tracking surfaces remain gaps.

## Citations

- `[zhou2023sok]` — academic taxonomy spanning the smart-contract failure modes M16 addresses.
- `[owaspscstop10]` — OWASP Smart Contract Top 10 (2025/2026); access-control vulnerabilities are the top category, the canonical M16 target surface.
- `[soksnarkvulns2024]` — academic SoK on SNARK vulnerabilities; quantitative justification for circuit-specialist audit and formal verification of consensus-rule encoding (T10.005 leg of M16).
- `[verichainsdragonberry2022]` — Verichains Dragonberry disclosure; worked example of a soundness bug at the cryptographic-primitive layer caught at audit-disclosure rather than at incident.
- `[certikfakeaudit]` — CertiK advisory on brand misuse; cited to anchor the M16-vs-T6.002/T6.004 boundary (M16 is the honest substrate, T6.002 and T6.004 are fabricated claims against it).
- `[dlnewsswaprum2023]` — Swaprum case; audit-coverage-of-record does not bound post-launch operator behaviour.
- `[chainalysis2025rug]` — cohort-scale context for audit-related failure modes in rug-pull retrospectives.
- `[slowmist2024report]` — 2024 ecosystem aggregate including audit-coverage discussion.
- `[daoreentrancy2016retrospective]` — DAO retrospective; foundational reference for the reentrancy class M16 addresses.
- `[halbornnomadoptimistic2022]` — Halborn analysis of the Nomad bridge; bridge-specialist audit reference.
