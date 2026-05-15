# Onyx Protocol year-plus fork-vulnerability exposure — Ethereum — 2024

**Loss:** ~$3.8M drained from Onyx Protocol on Ethereum (November 2024 incident). Additional historical exploit on Onyx in October 2023 (~$2.1M) via a related Compound V2 fork vulnerability. Aggregate losses across multiple Onyx exploits exceed $5M.
**OAK Techniques observed:** **OAK-T9.007** (Fork Substrate Vulnerability Not Mitigated) — the Onyx Protocol operated as a Compound V2 fork with known, publicly-documented vulnerability classes that remained unpatched across multiple exploit events spanning over a year. **OAK-T9.004** (Access-Control Misconfiguration) — the November 2024 exploit used a governance-parameter manipulation vector inherited from the Compound V2 codebase.
**Attribution:** **pseudonymous** — attacker addresses identified on-chain.

**Key teaching point:** Onyx demonstrates the multi-exploit fork pattern: the same protocol forking the same upstream codebase was exploited multiple times across more than a year because the fork operator addressed the specific exploit rather than the underlying vulnerability class. Each post-exploit remediation was point-fix rather than class-fix, leaving sibling attack surfaces unpatched.

## Summary

Onyx Protocol was a lending protocol on Ethereum forked from Compound Finance V2. The protocol was exploited in October 2023 (~$2.1M) via a Compound V2 fork vulnerability. The Onyx team applied a point-fix for the specific exploited vector but did not comprehensively audit the remaining Compound V2 vulnerability surface. In November 2024, a second attacker exploited a related but distinct Compound V2 fork vulnerability — the governance-parameter manipulation vector — draining ~$3.8M.

The multi-exploit pattern across the same fork is the structural T9.007 signal: if the fork operator treats each exploit as an isolated incident rather than as evidence that the entire forked-vulnerability surface requires class-level remediation, subsequent exploits against different vectors on the same fork are likely.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-10 | Onyx Protocol exploited via Compound V2 fork vulnerability; ~$2.1M drained | T9.007 (first exploit) |
| 2023-10 - 2024-11 | Year-plus window: Onyx applies point-fix for the October 2023 vector but does not remediate the full Compound V2 vulnerability surface | T9.007 (unpatched) |
| 2024-11 | Second attacker exploits a different Compound V2 fork vulnerability (governance-parameter manipulation); ~$3.8M drained | T9.007 (second exploit) |

## Public references

- Onyx Protocol post-mortems (October 2023, November 2024).
- Compound V2 vulnerability disclosure history.
- On-chain transaction data on Etherscan.
