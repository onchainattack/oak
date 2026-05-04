# OAK-T13 — Account Abstraction Attacks

**Phase:** Targeted compromise
**Adjacent tactics:** T11 (Custody and Signing Infrastructure — legacy EOA / multisig analogue), T9 (Smart-Contract Exploit — adjacent because account-abstraction modules and EntryPoint are smart contracts), T4 (Access Acquisition — adjacent because session-key and authorisation-tuple phishing flows extend the T4.004 / T4.005 surface into the smart-account era)

## Scope

Account Abstraction Attacks covers attack classes that target the infrastructure components introduced by ERC-4337 (final since March 2023) and EIP-7702 (Pectra, 2025) — UserOperations, the EntryPoint contract, paymasters, bundlers, smart-account modules, session keys, and authorisation tuples. These components do not exist in the legacy EOA / multisig model and have their own attack surface, their own detection signals, and their own mitigation surface that does not transfer cleanly from T11.

T13 in v0.1 is intentionally narrow at three Techniques. Account abstraction is **emerging** infrastructure: the public forensic record is far thinner than for T9 (Smart-Contract Exploit), T10 (Bridge and Cross-Chain), or T11 (Custody and Signing Infrastructure). Most T13 framing in v0.1 comes from the academic taxonomy companion `[zhou2023sok]`, audit-firm advisories, and protocol-specific bug-bounty disclosures rather than from a deep cohort of canonical headline incidents. The August 2025 EIP-7702 phishing incident (~\$1.54M single-victim loss, ~79k authorisation tuples granted to a single malicious delegate, ~65% of funnelled funds reaching a single attacker-controlled address) is the most concrete public anchor available at v0.1 freeze.

T13 is **distinct from T11** even though both involve the authority surface that produces extraction events: T11 covers the off-chain custody-and-signing infrastructure for legacy EOA / multisig wallets (CEX cold-wallet signing flows, hardware-wallet vendor distribution, multisig-vendor UI compromise). T13 covers the on-chain and adjacent-off-chain infrastructure that account abstraction introduces — components that simply do not exist in the T11 threat model. A Bybit-class signing-flow compromise stays in T11; a paymaster shared-pool drain or a malicious EIP-7702 delegate sweep belongs in T13.

T13 is **distinct from T9** because the failure mode is structural to the account-abstraction primitive (paymaster economic model, bundler validation-vs-execution gap, session-key scope drift, authorisation-tuple persistence) rather than to a single application contract's correctness bug. A paymaster that pays the EntryPoint during `validateUserOp` and tries to recover in `postOp` exhibits a primitive-level economic asymmetry that recurs across paymaster implementations; an oracle-manipulation exploit against a single lending protocol does not.

## What defenders observe

- UserOperations whose `validateUserOp` succeeds but whose execution phase reverts repeatedly, with bundler-collected gas charged against the smart-account on each retry — the bundler-MEV / validation-execution-gap signature (T13.002).
- Paymaster contracts whose deposit balance at the EntryPoint drops monotonically across a burst of UserOperations that share a sponsorship policy and a small set of recipient addresses — the paymaster shared-pool drain signature (T13.001).
- Smart-account session-key registrations whose scope (allow-listed selectors, allow-listed targets, spend caps, expiry) is set to permissive values inconsistent with the account holder's stated usage, followed by extraction events through the session-key path — the T13.003 signature.
- EIP-7702 authorisation-tuple submissions where a large population of EOAs delegate to the same contract address, followed by sweeper-pattern extractions across the delegating cohort — the EIP-7702-specific phishing signature.
- EntryPoint-emitted events (`UserOperationEvent`, `AccountDeployed`, `BeforeExecution`) whose pattern indicates repeated failed-execution-with-charged-gas, batch-sweep across many smart accounts, or unusual paymaster reputation-system churn.
- Smart-account module-installation events that add a previously-unseen module contract whose code authority subsequently moves assets — analogous at the module layer to T11.003 (in-use multisig manipulation) but with a different artefact set.

## Relationship to other tactics

T13 events typically chain into T7 (Laundering) — extracted assets follow the same downstream rails as any other realised on-chain theft, and T7.003 (Cross-Chain Bridge Laundering) remains the dominant rail for cohort-level T13 proceeds where the volume is sufficient to warrant cross-chain movement.

The boundary against T11 is the asset-authority layer: if the compromised authority is an off-chain signing pipeline that happens to authorise UserOperations, the case is T11 with T13-flavoured artefacts, not T13. If the compromised authority is a paymaster, a bundler, a session key, a smart-account module, or an authorisation tuple — components that exist only because account abstraction exists — the case is T13.

The boundary against T4 is the artefact set: T4.004 (Signature Phishing) and T4.005 (setApprovalForAll NFT Drainer) remain the right home for phishing flows whose target is a signature or an approval over an EOA-held asset. T13.003 (Session-Key Hijacking) and the EIP-7702 phishing pattern are T13-resident because the artefact granted is an account-abstraction primitive (session-key scope, authorisation tuple) rather than a generic signature or approval, and because the persistence and blast-radius properties differ structurally — a single EIP-7702 authorisation can convert an EOA into a persistent attacker-controlled proxy whose every subsequent invocation executes attacker bytecode.

Solana's account model is structurally different from EVM account abstraction (no EntryPoint, no bundler mempool, no paymaster contract), but analogous attack surfaces exist around transaction-construction wrappers, fee-payer relayers, and program-derived-account compromise. T13 v0.1 is EVM-anchored; Solana analogues are targeted for v0.x once the public forensic record matures.

## Techniques in this Tactic (v0.1)

- OAK-T13.001 — Paymaster Compromise
- OAK-T13.002 — Bundler MEV
- OAK-T13.003 — Session-Key Hijacking

## Maintainer notes

T13 in v0.1 is the OAK response to the v0.x roadmap observation that account abstraction has produced a new attack surface that does not fit cleanly under T9 / T11 / T4 and that is best documented as a first-class Tactic before the public forensic record consolidates. Promoting these patterns now (rather than backfilling under T9 / T11 once headline incidents accumulate) preserves clean Tactic boundaries and lets the per-Technique pages anchor on the academic taxonomy (`[zhou2023sok]`), audit-firm advisories, and the EIP-7702 incident record as it develops.

EIP-7702-specific patterns are documented at v0.1 within T13.003 where the artefact (authorisation tuple) and failure mode (delegated-execution persistence, sweeper-cohort extraction) are most directly relevant. A standalone T13.004 (EIP-7702-Specific Authorisation-Tuple Compromise) is targeted for v0.x once the cohort of public incidents is large enough to support a clean Technique boundary against T13.003 and against T4.004.

Patterns explicitly out of scope for v0.1 and targeted for v0.x updates:

- EntryPoint-contract correctness bugs (would be promoted to a T13 Technique only if a class of EntryPoint-version-specific failures emerges; otherwise stay in T9).
- Smart-account-module supply-chain compromise (module-marketplace distribution patterns, module-upgrade flows) — currently insufficient public evidence for a clean Technique.
- Bundler-mempool-specific MEV beyond the validation-execution-gap pattern documented under T13.002 (private-mempool collusion, bundler-builder integration patterns).
- Solana account-model analogues (fee-payer relayer compromise, program-derived-account hijacking patterns).

Contributors proposing additions to T13 should preserve the boundary rules above: T13 is for attacks whose detection signal or mitigation surface is structurally tied to an account-abstraction primitive that does not exist in the legacy EOA / multisig model. Generic smart-contract bugs in account-abstraction infrastructure stay in T9; off-chain signing-pipeline compromises that happen to authorise UserOperations stay in T11.
