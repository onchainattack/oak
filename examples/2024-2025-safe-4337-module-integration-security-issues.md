# Safe ERC-4337 canonical module — optional-paymaster flaw in v0.1.0 — 2023-12 (testnet only) — $0

**Loss:** \$0 realised. Safe's own post (2023-12-07) describes a medium-severity issue in v0.1.0 of the 4337 Canonical Module, found by an external researcher (Taek), affecting only the testnet deployments (Goerli, Mumbai); no existing Safes were affected and Safe states there was no risk to user funds. The issue could only affect accounts holding enough ETH to cover gas fees.

**OAK Techniques observed:** **OAK-T13.001.002** (Paymaster Policy Bypass — retained as filed; the flaw concerned the module's handling of an optional paymaster in the ERC-4337 validation path). The previously listed T13.001.003 (reentrancy) and T15 links are not supported by any source reviewed.

**Attribution:** **unattributed** — a vulnerability disclosure; no attacker.

**Corrected 2026-10-11:** Replaced the unsourced Spearbit/OpenZeppelin audit findings (hash mismatch, signature aggregation, reentrancy, fallback handler) with the sourced Safe disclosure: a medium-severity optional-paymaster issue in v0.1.0, fixed in v0.2.0, testnet only.

**Key teaching point:** **A new ERC-4337 entry path into a mature wallet is a new place for validation bugs, and staged testnet-first rollout contains them.** Safe released the module on 2023-11-28 and published the issue on 2023-12-07 before any mainnet use; the fix shipped as the audited v0.2.0. The lesson is the value of keeping early module versions off production funds until audited.

## Summary

Safe's 4337 Canonical Module lets Safe wallets accept ERC-4337 UserOperations. On 2023-12-07 the Safe Foundation published "Strengthening security: addressing the incident of the canonical 4337 module," describing a medium-threat issue in v0.1.0 related to an optional paymaster. The fixed version, v0.2.0, was described as fully audited and was being deployed on Goerli, Polygon, Mumbai and Sepolia. The module had not been used outside testnets. The discovery date is not given.

The Safe documentation lists audit reports for module v0.1.0, v0.2.0 and v0.3.0. The earlier version of this file attributed specific findings (operation-hash mismatch, signature-aggregation gateway, reentrancy, fallback-handler bypass) to Spearbit and OpenZeppelin audits; none of those could be confirmed from the sources reviewed and they have been removed.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-11-28 | Safe 4337 Canonical Module v0.1.0 released | (context) |
| 2023-12-07 | Safe publishes the medium-severity optional-paymaster issue; v0.2.0 fix being deployed | T13.001.002 |

## Public references

- `[safeblog4337v01]` — Safe Foundation, "Strengthening security: addressing the incident of the canonical 4337 module" (2023-12-07): <https://safefoundation.org/blog/strengthening-security-addressing-the-incident-of-the-canonical-4337-module> (medium-severity optional-paymaster issue in v0.1.0, fixed in v0.2.0, testnet only)
- `[safeauditsindex]` — Safe Foundation docs, "Audits": <https://docs.safefoundation.org/security/audits> (audit reports for Safe 4337 Module v0.1.0, v0.2.0, v0.3.0)
