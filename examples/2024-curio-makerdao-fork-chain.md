# Curio DAO MakerDAO fork-chain governance exploit — Ethereum — 2024-03-23

**Loss:** ~\$16M. The attacker exploited a voting-power flaw in Curio's DSChief-derived governance contract to give themselves elevated privileges, then minted ~1 billion CGT tokens through a delegatecall to a malicious contract registered as the project's exec library. The loss was the attacker's unauthorised CGT issuance and the value extracted from it, not collateral drained from vaults.
**OAK Techniques observed:** **OAK-T9.003** (Governance Attack — *primary*. A flaw in how Curio's DSChief counted voting power let the attacker gain executive authority with a small CGT stake, then use the governance path (`plot` / `exec`) to run attacker code that minted ~1B CGT (The Block, Halborn). See [`techniques/T9.003-governance-attack.md`](../techniques/T9.003-governance-attack.md)). **OAK-T16.002** (Hostile Vote Treasury Drain — the captured governance authority was used to mint and sell rather than to move an existing treasury). **OAK-T9.007** (Fork Substrate Vulnerability Not Mitigated — Curio ran forked MakerDAO governance contracts without the stake depth that makes the same design costly to capture on Maker).

**Re-mapped 2026-10-11:** primary Technique moved from T9.007 to [`T9.003-governance-attack`](../techniques/T9.003-governance-attack.md) — the mechanism is governance capture; the fork is the context.
**Attribution:** **pseudonymous** — attacker address identified on-chain.

**Key teaching point:** Forking MakerDAO's MCD infrastructure is structurally riskier than forking a simple AMM or lending market — MakerDAO's governance model includes collateral-onboarding, liquidation-parameter-setting, and emergency-shutdown paths that are secured by a large, distributed governance process in the upstream deployment. A fork inherits the technical surface of these governance functions without the social-layer governance process that secures the upstream deployment against governance-capture attacks.

**Corrected 2026-10-11:** Date set to 2024-03-23 and the mechanism restated as a DSChief voting-power flaw enabling a ~1B CGT mint via delegatecall, not collateral drained by governance-parameter manipulation.

## Summary

Curio DAO deployed a MakerDAO-derived stablecoin infrastructure including collateral-management, liquidation, and governance contracts. The codebase was forked from MakerDAO's MCD system — a complex governance-gated multi-collateral stablecoin architecture. MakerDAO secures its governance surface through a large, distributed token-holder base, multi-day governance delays, and an active security community that monitors governance proposals. Curio's fork inherited the technical governance surface but operated with a significantly smaller governance-token distribution and without the equivalent governance-process mitigations.

The attacker exploited the gap between the technical governance surface (identical to MakerDAO's) and the social-layer governance security (substantially weaker than MakerDAO's). Per Halborn and The Block, the attacker exploited a flaw in the DSChief-style voting system: by acquiring a relatively small number of CGT tokens they obtained elevated voting privileges, used the `plot` function to register a malicious contract as the exec library, and used delegatecall to mint roughly 1 billion CGT. The reported loss is about \$16M; the sources do not describe collateral being drained through governance-parameter manipulation.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-03-23 | Attacker abuses the voting-power flaw in Curio's governance contract, plots a malicious exec library and mints ~1B CGT via delegatecall; ~\$16M reported loss | **T9.003** + T16.002 (on a T9.007 fork substrate) |

## Public references

- `[blockcurio2024]` — The Block, "Attacker mints 1 billion CGT governance tokens in exploit within Curio ecosystem" (2024-03-25): <https://www.theblock.co/news/regulation/2024-03-25-curio-exploit-16-million-usd-284405>
- `[halborncurio2024]` — Halborn, "Explained: The Curio Hack (March 2024)" (2024-04-01): <https://halborn.com/blog/post/explained-the-curio-hack-march-2024>
