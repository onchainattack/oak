# Yapeswap — a governance contract with zero quorum passed a near-zero-vote proposal that handed over the factory's admin role — Yapeswap / Ethereum — 2026-10-25

**Loss:** **~\$21.9K** (SlowMist).

**OAK Techniques observed:** **OAK-T9.003** (Governance Attack — *primary*. WorkersUnion had **zero quorum**, so a proposal backed by ~0.000055% of voting power transferred YapeFactory's `feeToSetter` role to the attacker. The attacker installed a Registry whose `latestVault()` returned fake vaults while `vaults()` still listed the real ones; YapePair counted deposits diverted to the fake vaults as farming assets without receiving redeemable shares. See [`techniques/T9.003-governance-attack.md`](../techniques/T9.003-governance-attack.md)).

**Attribution:** **pseudonymous** ([`0x6e523866424220b3cb2cab88ba2195cfa5636b12`](https://etherscan.io/address/0x6e523866424220b3cb2cab88ba2195cfa5636b12)).

**Key teaching point:** **Quorum zero means any holder is the DAO.** Abandoned or quiet governance contracts keep their powers; a minimum quorum and timelock cost nothing to keep.

## Summary

SlowMist flagged the exploit on 2026-10-25.

## Timeline (UTC)

Read it as three stages. **Get in**: a governance contract with zero quorum. **Prepare**: not published. **Take**: a proposal, then a fake vault registry. Times are from SlowMist's alert.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-25 (undisclosed) | WorkersUnion, Yapeswap's governance contract, has zero quorum, so any proposal that gets a vote passes. Since when is not published. | **T9.003** |
| 2026-10-25 (preparation undisclosed) | Funding of the attacker address is not published. | — |
| 2026-10-25 (time undisclosed) | A proposal backed by about 0.000055% of voting power passes and transfers YapeFactory's `feeToSetter` role to the attacker. | **T9.003** |
| same sequence | The attacker installs a Registry (contract [`0x327bf6dfc38a79393f78866c705193c39b04be01`](https://etherscan.io/address/0x327bf6dfc38a79393f78866c705193c39b04be01)) whose `latestVault()` returns fake vaults while `vaults()` still lists the real ones. | **T9.003** |
| same sequence | YapePair counts deposits diverted to the fake vaults as farming assets without receiving redeemable shares. Total loss about \$21.9K. SlowMist's listed transaction: [`0x4c741568cc12b23b382db409b0a38a4cfb6c708904f0c2ce7bad2e4fa7179e1e`](https://etherscan.io/tx/0x4c741568cc12b23b382db409b0a38a4cfb6c708904f0c2ce7bad2e4fa7179e1e). | **T9.003** |
| after the exploit (undisclosed) | Where the proceeds went is not published. | — |
| 2026-10-25 09:36:49 | SlowMist publishes its alert. | response |
| after 2026-10-25 (undisclosed) | No Yapeswap statement, pause or fix appears in the cited sources. | response |

Key addresses:

- Attacker EOA — [`0x6e523866424220b3cb2cab88ba2195cfa5636b12`](https://etherscan.io/address/0x6e523866424220b3cb2cab88ba2195cfa5636b12)
- Attacker contract (Registry) — [`0x327bf6dfc38a79393f78866c705193c39b04be01`](https://etherscan.io/address/0x327bf6dfc38a79393f78866c705193c39b04be01)
- Vulnerable YapeFactory / YapePair / YapeWrapper — [`0x46adc1c052fafd590f56c42e379d7d16622835a2`](https://etherscan.io/address/0x46adc1c052fafd590f56c42e379d7d16622835a2)
- Victim YapePair contracts — `0x23c1653e…`, `0x670120d4…`, `0x8e5b9d85…`, `0xe3b43be5…`, `0xec5ed926…`, `0x0415af9f…` (full addresses not published)
- Exploit transaction — [`0x4c741568cc12b23b382db409b0a38a4cfb6c708904f0c2ce7bad2e4fa7179e1e`](https://etherscan.io/tx/0x4c741568cc12b23b382db409b0a38a4cfb6c708904f0c2ce7bad2e4fa7179e1e)

## Root-cause evidence

- **Technique:** OAK-T9.003
- **Source:** <https://x.com/SlowMist_Team/status/2114290073546219799>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's trace analysis of the proposal, role transfer and Registry swap.

## Public references

- `[slowmistyape2026]` — SlowMist TI alert (2026-10-25): <https://x.com/SlowMist_Team/status/2114290073546219799>
- `[etherscanyape2026]` — exploit transaction: <https://etherscan.io/tx/0x4c741568cc12b23b382db409b0a38a4cfb6c708904f0c2ce7bad2e4fa7179e1e>
