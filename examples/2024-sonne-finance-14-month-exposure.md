# Sonne Finance VELO-market fork-vulnerability exploit — Optimism — 2024-05-14

**Loss:** ~\$20M drained from Sonne Finance on Optimism. The attacker exploited the known Compound V2 empty-market donation/rounding bug (the class used against Hundred Finance in April 2023) on the new soVELO market, which went live through a governance proposal after its timelock expired. Sonne's post-mortem says it had normally listed new markets with a zero collateral factor to avoid this; here the proposal set a non-zero collateral factor (35% per published accounts of the proposal) on a fresh, empty market.
**OAK Techniques observed:** **OAK-T9.007** (Fork Substrate Vulnerability Not Mitigated) — anchor for the recurring-fork-vulnerability sub-pattern. Sonne Finance was a Compound V2 fork hit by a publicly known vulnerability class about 13 months after the Hundred Finance incident. **OAK-T9.004** (Access-Control Misconfiguration) — retained from the original file; the sources support a market-listing/governance-process failure (non-atomic timelock execution that was permissionless on Optimism) rather than an access-control flaw. Mapping note: T9.004 is weakly supported; T9.007 plus a governance/listing-process technique fits better.
**Attribution:** **pseudonymous** — attacker address identified on-chain.

**Key teaching point:** The Sonne Finance exploit shows the same publicly known Compound V2 vulnerability class (Hundred Finance, April 2023) recurring in a sibling fork about 13 months later. Sonne knew the class and normally mitigated it by listing markets at zero collateral factor; the failure was in the market-listing process for the VELO market, not an unpatched code base left alone for 14 months.

**Corrected 2026-10-11:** Reframed from "14 months unpatched" to a new-market listing failure (VELO market via governance proposal with non-zero collateral factor after the timelock); T9.004 flagged as weakly supported.

## Summary

Sonne Finance was a lending protocol on Optimism, forked from Compound Finance V2. The protocol used soToken — a fork of Compound's cToken — which carried the same exchange-rate manipulation vulnerability exploited against Hundred Finance in April 2023.

Sonne's post-mortem describes the issue as a known donation attack on Compound V2 forks and says the team had avoided it by adding markets with 0% collateral factors, seeding them, burning the shares, and only then raising the collateral factor. For the VELO market, a governance proposal (SIP-15) scheduled market creation and a collateral factor to execute after a 2-day timelock (rekt describes 24 hours; sources differ). Because execution was permissionless on Optimism, the attacker was able to act in the gap between the market being created and the protection being applied, donated ~35.5M borrowed VELO to the empty soVELO contract to inflate the exchange rate, and drained roughly \$20M on 2024-05-14. The team saved about \$6.5M of remaining funds by seeding the other markets.

The incident is a T9.007 anchor for the recurrence dimension: a fork operator can know a sibling-fork vulnerability class and still reintroduce it through its operating process when listing a new market.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-04-15 | Hundred Finance (Compound V2 fork) exploited via exchange-rate manipulation; ~$7M drained | T9.007 (Hundred anchor) |
| 2024-05-04 to 05-07 | SIP-15 (add VELO market) proposed and voted through; market creation and collateral factor queued behind a timelock | T9.007 (listing process) |
| 2024-05-14 | Attacker exploits the empty soVELO market once the queued actions can be executed; ~\$20M drained | T9.007 (Sonne anchor) |
| 2024-05 | Sonne Finance confirms exploit; protocol pauses | (incident response) |

## Public references

- `[rektsonne2024]` — rekt.news, "Sonne Finance - Rekt" (2024-05-16): <https://rekt.news/sonne-finance-rekt>
- `[blocksonne2024]` — The Block, "Lending protocol Sonne Finance faces \$20 million exploit, pauses markets on Optimism" (2024-05-15): <https://www.theblock.co/news/ecosystems/2024-05-15-lending-protocol-sonne-finance-faces-20-million-exploit-pauses-markets-on-optimism-294508>
- `[certiksonne2024]` — CertiK, "Sonne Finance Incident Analysis" (2024-05): <https://www.certik.com/blog/6CmVaegh2KpQUuy7uwT8HA-sonne-finance-incident-analysis>
- `[sonnepm2024]` — Sonne Finance, "Post Mortem: Sonne Finance Exploit" (May 2024): <https://medium.com/@SonneFinance/post-mortem-sonne-finance-exploit-12f3daa82b06>
