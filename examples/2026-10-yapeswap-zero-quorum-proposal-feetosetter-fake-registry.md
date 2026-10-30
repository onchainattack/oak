# Yapeswap — a governance contract with zero quorum passed a near-zero-vote proposal that handed over the factory's admin role — Yapeswap / Ethereum — 2026-10-25

**Loss:** **~\$21.9K** (SlowMist).

**OAK Techniques observed:** **OAK-T9.003** (Governance Attack — *primary*. WorkersUnion had **zero quorum**, so a proposal backed by ~0.000055% of voting power transferred YapeFactory's `feeToSetter` role to the attacker. The attacker installed a Registry whose `latestVault()` returned fake vaults while `vaults()` still listed the real ones; YapePair counted deposits diverted to the fake vaults as farming assets without receiving redeemable shares. See [`techniques/T9.003-governance-attack.md`](../techniques/T9.003-governance-attack.md)).

**Attribution:** **pseudonymous** (`0x6e52…2b12`).

**Key teaching point:** **Quorum zero means any holder is the DAO.** Abandoned or quiet governance contracts keep their powers; a minimum quorum and timelock cost nothing to keep.

## Summary

SlowMist flagged the exploit on 2026-10-25.

## Root-cause evidence

- **Technique:** OAK-T9.003
- **Source:** <https://x.com/SlowMist_Team/status/2114290073546219799>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's trace analysis of the proposal, role transfer and Registry swap.

## Public references

- `[slowmistyape2026]` — SlowMist TI alert (2026-10-25): <https://x.com/SlowMist_Team/status/2114290073546219799>
- `[etherscanyape2026]` — exploit transaction: <https://etherscan.io/tx/0x4c741568cc12b23b382db409b0a38a4cfb6c708904f0c2ce7bad2e4fa7179e1e>
