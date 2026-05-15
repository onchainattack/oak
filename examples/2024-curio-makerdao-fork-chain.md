# Curio DAO MakerDAO fork-chain governance exploit — Ethereum — 2024-03

**Loss:** ~$16M drained from Curio DAO's MakerDAO-forked stablecoin infrastructure. The attacker exploited a governance-attack vector in Curio's MakerDAO-derived collateral-management and liquidation logic — a vulnerability class inherited from the MakerDAO codebase that Curio's fork deployment did not independently secure.
**OAK Techniques observed:** **OAK-T9.007** (Fork Substrate Vulnerability Not Mitigated) — primary. Curio forked MakerDAO's multi-collateral DAI (MCD) infrastructure including the governance-gated collateral-addition and liquidation-parameter logic, inheriting the upstream's vulnerability surface without MakerDAO's governance-process mitigations. **OAK-T9.003** (Governance Attack) — co-occurring within the T9.007 surface: the fork's governance contract was the specific vulnerable substrate. **OAK-T16.002** (Hostile Vote Treasury Drain) — the extraction mechanism was a governance-proposal-calldata attack inherited from the upstream governance model.
**Attribution:** **pseudonymous** — attacker address identified on-chain.

**Key teaching point:** Forking MakerDAO's MCD infrastructure is structurally riskier than forking a simple AMM or lending market — MakerDAO's governance model includes collateral-onboarding, liquidation-parameter-setting, and emergency-shutdown paths that are secured by a large, distributed governance process in the upstream deployment. A fork inherits the technical surface of these governance functions without the social-layer governance process that secures the upstream deployment against governance-capture attacks.

## Summary

Curio DAO deployed a MakerDAO-derived stablecoin infrastructure including collateral-management, liquidation, and governance contracts. The codebase was forked from MakerDAO's MCD system — a complex governance-gated multi-collateral stablecoin architecture. MakerDAO secures its governance surface through a large, distributed token-holder base, multi-day governance delays, and an active security community that monitors governance proposals. Curio's fork inherited the technical governance surface but operated with a significantly smaller governance-token distribution and without the equivalent governance-process mitigations.

The attacker exploited the gap between the technical governance surface (identical to MakerDAO's) and the social-layer governance security (substantially weaker than MakerDAO's). The attack drained approximately $16M in collateral assets through a governance-parameter manipulation that the fork's governance process did not have the delay, quorum, or community-monitoring density to resist.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-03 | Attacker exploits governance-parameter manipulation vulnerability in Curio's MakerDAO-forked infrastructure; ~$16M drained | T9.007 + T9.003 + T16.002 |

## Public references

- Curio DAO post-mortem and community communications (March 2024).
- MakerDAO MCD codebase and governance documentation — the upstream substrate Curio forked.
- On-chain transaction data on Etherscan.
