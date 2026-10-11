# Hundred Finance Compound V2 fork exploit — Optimism — 2023-04-15

**Loss:** ~\$7M–\$7.4M drained from Hundred Finance's Optimism deployment (Decrypt reports Hundred's initial ~\$7M estimate and CertiK's \$7.4M figure). The attacker inflated the hWBTC exchange rate by donating WBTC to an empty market inherited from the Compound V2 cToken design.
**OAK Techniques observed:** **OAK-T9.007** (Fork Substrate Vulnerability Not Mitigated — *primary*. Hundred Finance forked Compound V2's cToken design, which carries the empty-market exchange-rate weakness, and listed a market without seeding it). **OAK-T9.011** (Precision-Loss / Rounding Attack — a WBTC donation into the empty hWBTC market inflated its exchange rate, and rounding on redemption paid out the difference). The previous **T9.004** label had no source support and was removed 2026-10-11.

**Re-mapped 2026-10-11:** merged with the duplicate `2023-hundred-finance-compound-v2-fork-cascade`, which placed the exploit on Gnosis Chain (it was Optimism) and cited nothing.
**Attribution:** **pseudonymous** — attacker address identified on-chain; no named individual (Decrypt reports no attacker identification and that the team was trying to open communication).
**Corrected 2026-10-11:** the exploit hit Optimism (not Arbitrum or "other EVM chains"); the mechanism was a WBTC donation inflating the hWBTC exchange rate in an empty market, not a governance-to-market access-control gap or a flash-loan-driven manipulation; unsupported cross-chain cascade claims removed.

**Key teaching point:** Forking a DeFi protocol copies not only the code but also the vulnerability surface. A Compound V2 cToken market that is empty (or near-empty) lets a donation distort the exchange rate; the fork operator must seed or otherwise protect new markets rather than assume the upstream design is safe.

## Summary

Hundred Finance was a multi-chain lending protocol that forked Compound Finance V2. On 2023-04-15 an attacker exploited the hWBTC market on its Optimism deployment. Per Decrypt (quoting CertiK), the attacker manipulated the exchange rate between the ERC-20 token and its hToken by donating a large amount of wrapped Bitcoin to the contract that sets the rate, then borrowed against the inflated value and redeemed a small amount of hWBTC to recover the donation. PeckShield's summary, as relayed by secondary coverage, was a 200 WBTC donation. A Rekt write-up describes the donation moving an empty market's rate, and a BlockSec analysis treats the incident as the start of a wave of precision-related exploits on vulnerable Compound forks.

Sources cited here do not support an attack spanning multiple Hundred Finance chains; they place the loss on Optimism. See also `examples/2023-hundred-finance-compound-v2-fork-cascade.md` (a sibling file).

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-04-15 | Attacker donates WBTC to inflate the hWBTC exchange rate on Hundred Finance's Optimism deployment and drains lending pools; ~\$7M–\$7.4M lost | T9.007 |
| 2023-04-15 | Hundred Finance discloses the exploit and says it is trying to open communication with the attacker | (incident response) |

## Public references

- `[decrypt2023hundred]` — Decrypt, "Hacker Exploits Hundred Finance Protocol In \$7.4 Million Heist" (2023-04-15): <https://decrypt.co/136918/hacker-exploits-hundred-finance-protocol-in-7-4-million-heist>
- `[blocksec2023hundred]` — BlockSec, "Hundred Finance incident: catalyzing the wave of precision-related exploits in vulnerable forked protocols": <https://blocksec.com/zh/blog/6-hundred-finance-incident-catalyzing-the-wave-of-precision-related-exploits-in-vulnerable-forked-protocols>
- `[rekt2023hundred]` — Rekt, "Hundred Finance - REKT 2": <https://alpha.rekt.news/hundred-rekt2>
