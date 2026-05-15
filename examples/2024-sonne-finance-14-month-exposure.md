# Sonne Finance 14-month fork-vulnerability exposure — Optimism — 2024-05-14

**Loss:** ~$20M drained from Sonne Finance on Optimism. The attacker exploited a known Compound V2 fork vulnerability in Sonne's soToken implementation — identical to the vulnerability exploited against Hundred Finance (April 2023), which Sonne did not patch in the 14 months between the Hundred incident and the Sonne exploit.
**OAK Techniques observed:** **OAK-T9.007** (Fork Substrate Vulnerability Not Mitigated) — canonical anchor for the "long-tail unpatched fork" sub-pattern. Sonne Finance was a Compound V2 fork that remained unpatched against a publicly-exploited vulnerability class for 14 months after the Hundred Finance incident. **OAK-T9.004** (Access-Control Misconfiguration) — the vulnerability surface was at the governance-to-market interaction layer inherited from Compound.
**Attribution:** **pseudonymous** — attacker address identified on-chain.

**Key teaching point:** The Sonne Finance exploit is the textbook example of T9.007's temporal dimension: a publicly exploited vulnerability in one fork (Hundred Finance, April 2023) remained unpatched in a sibling fork (Sonne Finance) for over a year, until another attacker exploited the same vulnerability class against the unpatched target. The 14-month window between the public exploit and the Sonne exploit is the measure of the fork's vulnerability-management gap.

## Summary

Sonne Finance was a lending protocol on Optimism, forked from Compound Finance V2. The protocol used soToken — a fork of Compound's cToken — which carried the same exchange-rate manipulation vulnerability exploited against Hundred Finance in April 2023.

Despite the public documentation of the Hundred Finance exploit and the vulnerability class, Sonne Finance did not apply the mitigation in the intervening 14 months. On May 14, 2024, an attacker exploited the identical vulnerability class against Sonne, draining approximately $20M.

The incident is the canonical T9.007 anchor for the temporal dimension: the fork-substrate vulnerability surface is not just whether a vulnerability exists at deployment time but whether the fork operator applies upstream and sibling-fork patches over time. Every public exploit of a fork is a free penetration test for every other fork of the same upstream codebase — the unpatched window is the defender's liability.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-04-15 | Hundred Finance (Compound V2 fork) exploited via exchange-rate manipulation; ~$7M drained | T9.007 (Hundred anchor) |
| 2023-04 - 2024-05 | 14-month window: Sonne Finance does not patch the known vulnerability class against its soToken implementation | T9.007 (unpatched window) |
| 2024-05-14 | Attacker exploits the same vulnerability class against Sonne Finance; ~$20M drained | T9.007 (Sonne anchor) |
| 2024-05 | Sonne Finance confirms exploit; protocol pauses | (incident response) |

## Public references

- Sonne Finance post-mortem (May 2024).
- Hundred Finance post-mortem (April 2023) — the sibling-fork exploit that preceded Sonne by 14 months.
- Compound V2 cToken vulnerability documentation.
- On-chain transaction data on Optimism explorer.
