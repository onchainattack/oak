# Hundred Finance Compound V2 fork exploit — multi-chain — 2023-04-15

**Loss:** ~$7M drained from Hundred Finance deployments on Optimism, Arbitrum, and other EVM chains. The attacker exploited a known Compound V2 governance vulnerability in the hundredToken (hTOKEN) implementation inherited from the Compound V2 codebase fork.
**OAK Techniques observed:** **OAK-T9.007** (Fork Substrate Vulnerability Not Mitigated) — primary. Hundred Finance forked Compound V2 including a known vulnerability that the upstream (Compound) had already documented as requiring governance-level mitigation — a mitigation that Hundred Finance, as the fork, did not apply. **OAK-T9.004** (Access-Control Misconfiguration) — the vulnerability was an access-control gap in the governance-to-market interaction.
**Attribution:** **pseudonymous** — attacker address identified on-chain.

**Key teaching point:** Forking a DeFi protocol copies not only the code but also the vulnerability surface. If the upstream protocol has publicly documented (but governance-mitigated) vulnerabilities, the fork inherits the vulnerability without automatically inheriting the mitigation — the fork operator must independently apply the upstream's governance-level fixes.

## Summary

Hundred Finance was a multi-chain lending protocol that forked Compound Finance V2. The attacker exploited a vulnerability in the hTOKEN contract — Hundred's fork of Compound's cTOKEN — that allowed manipulation of the exchange rate between the interest-bearing token and the underlying asset. The vulnerability had been known in the Compound community; Compound had mitigated it at the governance layer through parameter settings, but Hundred Finance deployed the forked code without applying the equivalent mitigation.

The attacker used a flash loan to manipulate the hTOKEN exchange rate, borrow against the inflated collateral value, and extract the borrowed assets. The attack cascaded across multiple Hundred Finance deployments on different chains because the same forked code (with the same vulnerability) was deployed on each chain.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-04-15 | Attacker exploits hTOKEN exchange-rate manipulation vulnerability on Hundred Finance Optimism and Arbitrum deployments; ~$7M drained | T9.007 |
| 2023-04-15 | Hundred Finance confirms exploit; pauses remaining deployments | (incident response) |

## Public references

- Hundred Finance post-mortem.
- Compound V2 cTOKEN vulnerability documentation (known pre-2023, governance-mitigated upstream).
- On-chain transaction data on Optimism and Arbitrum explorers.
