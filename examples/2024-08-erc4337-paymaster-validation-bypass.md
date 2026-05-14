# ERC-4337 paymaster validation-bypass disclosure cohort — EVM — 2024

**Loss:** primarily **pre-deployment / audit-disclosure** across multiple paymaster implementations throughout 2024; individual production extractions in the low-to-mid six-figure range were reported through bundler-vendor incident channels (Pimlico, Stackup, Alchemy) but individual case write-ups are sparse in the public record at v0.1 cutoff. The aggregate documented surface — combining the OpenZeppelin EIP-4337 audit of the Ethereum Foundation's reference EntryPoint implementation (2023–2024), the OSEC / OtterSec 2025 paymaster security review, the Quantstamp / Sherlock paymaster audit cohort, and the Trail of Bits "Six Mistakes in ERC-4337 Smart Accounts" essay (2025, but capturing 2024-deployed bug classes) — establishes that the ERC-4337 paymaster validation-and-accounting boundary was a first-class T13 attack surface from its earliest production deployments.

**OAK Techniques observed:** **OAK-T13.001** (Paymaster Compromise — umbrella; the paymaster validation-and-accounting boundary is the attack surface) exercised across its sub-techniques: **OAK-T13.001.001** (Paymaster Accounting Drain — paymasters that release sponsored funds in excess of what their internal accounting model accounts for, typically because `postOp` revert paths are not enumerated); **OAK-T13.001.002** (Paymaster Policy Bypass — UserOps that bypass the paymaster's sponsorship rules via off-chain-signer / on-chain-hash parity violations, documented in the Alchemy 2023 UserOperation-packing disclosure and recurring across 2024-deployed paymasters whose policy engines accepted fail-open instruction parsing); **OAK-T13.001.003** (Paymaster Reentrancy — paymaster-specific `validatePaymasterUserOp` / `postOp` reentrancy via token hooks or peer-protocol callbacks). The combined T13.001.x surface was extensively characterised in the audit-firm literature through 2024; the 2025-04 ERC-4337 paymaster cohort example at `examples/2025-04-erc4337-paymaster.md` is the canonical 2025 anchor for the in-production exploitation phase of the same bug classes documented in the 2024 audit cohort represented here.

**Attribution:** **unattributed (audit-cohort / vendor-disclosure — no single threat-actor cluster applies).** The 2024 paymaster vulnerability surface was characterised through public audit reports, bundler-vendor incident-response channels, and security-researcher disclosures. Individual exploitation incidents were pseudonymous and not publicly attributed to named clusters at v0.1 cutoff.

**Key teaching point:** **The ERC-4337 paymaster is the highest-leverage single-compromise surface in the account-abstraction stack.** A compromised paymaster sponsors gas for UserOps — its deposit at the EntryPoint is the pool from which bundler compensation is drawn, and a validation bypass or accounting drain against the paymaster is a direct financial extraction from the paymaster's deposited balance, not from individual user accounts. The paymaster is structurally analogous to the "sponsorship bank" of the AA ecosystem: it holds the funds that make gasless transactions possible, and a compromise of the paymaster is a compromise of the sponsorship pool, not of any individual sponsored account. The defender lesson is that paymaster security is a systemic risk surface for the AA ecosystem in the same sense that bridge-contract security is a systemic risk surface for cross-chain liquidity.

## Summary

ERC-4337 (account abstraction) was deployed on Ethereum mainnet in March 2023 with EntryPoint v0.6. The paymaster — an on-chain contract that sponsors gas for UserOps — emerged as the most economically-concentrated attack surface in the AA stack. A paymaker holds a deposited balance at the EntryPoint, and each UserOp that the paymaster sponsors draws from that balance; the paymaster's `validatePaymasterUserOp` and `postOp` functions determine under what conditions sponsorship occurs and how gas costs are accounted.

The 2024 audit literature established that paymaster implementations routinely exposed three structurally distinct bug classes:

1. **Accounting drain (T13.001.001):** the paymaster's internal accounting tracked gas consumption using a `preOp` / `postOp` gas delta, but `postOp` revert paths were not enumerated against the gas-token mechanic. A UserOp that triggered a `postOp` revert could leave the paymaster's accounting in a state where the gas cost had been consumed (the bundler was compensated from the paymaster's deposit) but the paymaster's internal ledger had not deducted the cost — producing a net drain on the paymaster's EntryPoint balance per reverted UserOp.

2. **Policy bypass (T13.001.002):** the paymaster's sponsorship rules (per-user quotas, per-application allowlists, per-method gating) relied on off-chain signer attestations that were not cryptographically bound to the on-chain UserOp hash. An attacker could submit a UserOp with a valid signature for a permitted operation while executing a different operation whose calldata bypassed the policy check — the classic off-chain-signer / on-chain-hash parity violation, documented as early as Alchemy's 2023 disclosure and recurring across 2024-deployed paymasters whose policy engines did not enforce the hash-parity invariant at the EntryPoint call boundary.

3. **Reentrancy (T13.001.003):** the `validatePaymasterUserOp` or `postOp` function made an external call (e.g., to a token contract for fee-on-transfer accounting) before the paymaster's sponsorship-accounting state was finalised. An attacker could re-enter the paymaster via the token's callback and sponsor a second UserOp against the same pre-finalisation state, draining twice from the paymaster's deposit.

The audit-firm literature — OpenZeppelin's Ethereum Foundation EIP-4337 engagement, OSEC/OtterSec's 2025 paymaster review, and the Code4rena / Sherlock audit cohorts — collectively characterised these bug classes across multiple deployed paymaster implementations through 2024. Individual production extractions were reported through bundler-vendor incident-response channels (Pimlico, Stackup, Alchemy) and in security-researcher disclosure threads; the aggregate extraction volume through 2024 is estimated in the low-seven-figure range but is not precisely totalled in the public record at v0.1 cutoff.

The case is structured as a **cohort-level disclosure example** (parallel to the 2025-04 paymaster cohort example) rather than as a single-incident anchor because the 2024 audit-cohort literature is the primary public-record evidence base for the T13.001 class. The structural T13×2024 gap in the OAK corpus arises because 2024 was the year the paymaster vulnerability surface was *characterised* (through audits and disclosures), while 2025 was the year it was *exploited at scale* (the 2025-04 cohort example).

## Timeline (cohort-scale)

| When | Event | OAK ref |
|---|---|---|
| 2023-03 | ERC-4337 EntryPoint v0.6 deploys on Ethereum mainnet; paymasters become generally deployable | (standing T13.001 surface) |
| 2023–2024 | OpenZeppelin conducts Ethereum Foundation EIP-4337 audit; paymaster validation-and-accounting boundary characterised | **T13.001 audit-cohort characterisation** |
| 2024 (throughout) | Multiple paymaster implementations deploy on mainnet across Pimlico, Stackup, Alchemy, Biconomy, and ZeroDev bundler infrastructure | (production deployment) |
| 2024 (throughout) | Paymaster validation-bypass, accounting-drain, and reentrancy bug classes documented in audit reports and bundler-vendor incident channels | **T13.001.001, T13.001.002, T13.001.003 (characterisation)** |
| 2024–2025 | OSEC / OtterSec publishes paymaster security review; Trail of Bits publishes "Six Mistakes in ERC-4337 Smart Accounts"; Code4rena / Sherlock AA audit cohorts publish findings | (audit-firm literature) |
| 2025-04 | ERC-4337 paymaster compromise cohort incidents at production scale; documented in `examples/2025-04-erc4337-paymaster.md` | (in-production exploitation) |

## What defenders observed

- **The paymaster deposit at the EntryPoint is a honeypot by construction.** A paymaster must deposit ETH (or the native gas token) into the EntryPoint to sponsor UserOps. The bigger the paymaster's user base and gas-sponsorship volume, the bigger the deposited balance — and the bigger the extraction surface. This is a structural tension in paymaster design: the paymaster must hold enough deposited balance to cover peak gas-sponsorship demand, but every unit of deposited balance is at risk from every bug class in the validation-and-accounting boundary.
- **The off-chain-signer / on-chain-hash parity invariant is the single most-commonly-missed paymaster security check.** Alchemy's 2023 UserOperation-packing disclosure established the vulnerability class; 2024-deployed paymasters that did not enforce hash-parity checking at the EntryPoint boundary reproduced it. The invariant is simple to state (the off-chain signer's attested UserOp hash must match the on-chain `userOpHash` computed by the EntryPoint) but operationally easy to miss because the off-chain signer and on-chain paymaster are developed as separate components by different teams in the typical AA deployment architecture.
- **The `postOp` revert path is the accounting-drain surface that traditional smart-contract-audit checklists under-sample.** Standard DeFi audit checklists focus on the `validatePaymasterUserOp` entry point as the access-control gate; the `postOp` function — which fires *after* the UserOp executes and is where gas-cost reconciliation occurs — is less familiar to auditors whose prior experience is with non-AA contract surfaces. The T13.001.001 (accounting drain) class is concentrated in `postOp` revert paths because the gas cost has already been consumed but the internal accounting update is reverted.

## What this example tells contributors writing future Technique pages

- **The 2024 audit-cohort literature is the primary public-record evidence base for the T13.001 class, separate from the 2025 in-production exploitation evidence base.** The 2024 paymaster vulnerability surface was characterised through audits; the 2025 surface was exploited at scale. Future T13.001 page expansions should distinguish these two evidence tiers and cross-reference both.
- **Paymaster accounting drain (T13.001.001) and paymaster reentrancy (T13.001.003) are distinct bug classes with different mitigation surfaces, despite sharing the paymaster call boundary.** Accounting drain is mitigated by `postOp` revert-path enumeration and gas-token-mechanic auditing; reentrancy is mitigated by `nonReentrant` guards on the `validatePaymasterUserOp` / `postOp` call surface. Conflating them produces incomplete audit checklists.

## Public references

- OpenZeppelin. *EIP-4337 Account Abstraction — Ethereum Foundation Audit.* 2023–2024 — the canonical reference-implementation audit characterising the paymaster validation-and-accounting boundary — `[ozaa4337audit]`.
- OSEC / OtterSec. *Paymaster Security Review.* 2025 — post-hoc review of the 2024-deployed paymaster vulnerability surface — `[osecpaymasters2025]`.
- Trail of Bits. *"Six Mistakes in ERC-4337 Smart Accounts."* 2025 — essay capturing the 2024-deployed bug classes including paymaster accounting drain, policy bypass, and reentrancy — `[tobsixmistakes2026]`.
- Aviggiano. *ERC-4337 Audit Checklist.* 2024 onward — community-maintained checklist; the primary defender-side reference for paymaster deployment review — `[aviggiano4337checklist]`.
- Alchemy. *UserOperation Packing Disclosure.* 2023 — the disclosure that established the off-chain-signer / on-chain-hash parity violation class — `[alchemyuserop2023]`.
- ERC-4337 Specification. *"EIP-4337: Account Abstraction."* 2021–2023 — the canonical specification anchoring the threat surface — `[erc4337spec]`.
- Cross-reference: 2025-04 ERC-4337 paymaster compromise cohort at `examples/2025-04-erc4337-paymaster.md` — the canonical 2025 in-production exploitation anchor for the same bug classes characterised here.

### Proposed new BibTeX entries

```bibtex
@misc{alchemyuserop2023,
  author = {{Alchemy}},
  title = {UserOperation Packing Disclosure — ERC-4337 EntryPoint v0.6},
  year = {2023},
  note = {Disclosure establishing the off-chain-signer / on-chain-hash parity violation class in ERC-4337 paymasters.},
}
```
