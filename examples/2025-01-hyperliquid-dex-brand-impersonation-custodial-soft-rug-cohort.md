# Hyperliquid / DEX brand-impersonation custodial soft-rug cohort — multi-chain (Arbitrum, EVM) — 2025

**Loss:** cohort-level custodial-deposit losses across users of multiple Telegram-distributed copy-trading bots that branded themselves with the Hyperliquid (and adjacent DEX) name without official affiliation. Individual incident losses range from tens of thousands to mid six-figures USD equivalent; aggregate across the cohort not consolidated in a single public loss figure at v0.1.
**OAK Techniques observed:** **OAK-T5.007** (Third-Party Brand-Impersonation Custodial Soft-Rug — primary; the operators deployed off-platform services branded in Hyperliquid's name without contractual basis, accumulated user deposits in operator-controlled custody, operated the service through a period of apparent-functioning, and exited citing an unverifiable "hack" or "security breach" followed by communication blackout).
**Attribution:** **pseudonymous (at cohort scale)** — individual operator identities not publicly resolved at v0.1. The "hack"-announcement-followed-by-communication-blackout pattern is consistent with an exit-scam rather than a third-party intrusion; the on-chain outflow patterns in documented cases surface single coordinated transfers (operator-exit fingerprint) rather than the dispersion pattern characteristic of external attacker exfiltration.
**Key teaching point:** **The Hyperliquid / DEX brand-impersonation custodial soft-rug cohort demonstrates that the T5.007 surface is not confined to Polymarket — any high-trust platform with a material off-platform tooling ecosystem (copy-trading bots, analytics tools, trading agents) has the same brand-impersonation custodial-deposit surface.** The structural invariant is: users deposit funds into an operator-controlled wallet on the assumption of platform-affiliation that does not exist; the operator exploits the legitimate platform's brand-trust to accumulate deposits; the exit-as-hack pattern provides plausible deniability; and the post-announcement communication blackout is the operator-disappearance fingerprint.

## Summary

Hyperliquid is a high-throughput perpetuals DEX on Arbitrum (and its own L1) that developed a significant off-platform tooling ecosystem in 2024–2025, including copy-trading bots, automated trading agents, signal services, and portfolio-management tools. Many of these services operated via Telegram, accepted user deposits into operator-controlled wallets (custodial rather than self-custody), and branded themselves with the Hyperliquid name — "Hyperliquid Copy Vault," "Hyperliquid Trading Bot," "Hyperliquid Signal Auto-Trader" — implying an official affiliation with the Hyperliquid platform.

Several of these services followed a structurally identical soft-rug pattern:
1. **Brand-impersonation deployment.** The operator deployed a Telegram bot or mini-dApp branded with the Hyperliquid name and visual identity. The service was not listed in any official Hyperliquid authorised-third-party registry.
2. **Custodial deposit accumulation.** Users deposited USDC (or USDC.e on Arbitrum) into an operator-controlled wallet. The deposit flow was custodial — users sent funds to the operator's address, not to a smart-contract integration with self-custody guarantees.
3. **Apparent-functioning window.** The service operated through a period of weeks to months, with the operator providing regular updates, purported performance reports, and withdrawal processing (at least initially) to build trust and attract additional deposits.
4. **Exit-as-hack announcement.** The operator announced via Telegram that the bot's wallet had been "hacked" or suffered a "security breach," that user funds had been compromised, and that the service was suspended pending investigation.
5. **Communication blackout.** After the "hack" announcement, the operator went into communication blackout — no follow-up updates, no public operator identification, no observable recovery effort, no engagement with industry-press or community-forensic analysts.

The on-chain outflow pattern in documented cases — a single coordinated transfer from the operator wallet to consolidation addresses — is the operator-exit fingerprint, structurally distinct from the dispersion/fragmented-extraction pattern characteristic of an external attacker exfiltrating under time pressure.

The Hyperliquid cohort is structurally parallel to the Polycule trading bot case (2026-01) — the canonical T5.007 anchor, in which a Polymarket-branded copy-trading bot soft-rugged ~$230K following the same exit-as-hack-then-communication-blackout pattern. The Hyperliquid cases demonstrate that the T5.007 surface generalises across platforms: any DEX or prediction-market platform with a material off-platform tooling ecosystem and a brand that can be exploited for custodial-deposit accumulation faces the same structural surface. The Polymarket brand-impersonation surface and the Hyperliquid brand-impersonation surface are structurally identical — only the impersonated brand differs.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024–2025 | Hyperliquid grows to significant DEX volume; off-platform tooling ecosystem develops — copy-trading bots, trading agents, signal services operating via Telegram | T5.007 surface (latent — platform brand-trust creates impersonation incentive) |
| 2025 | Multiple Telegram bots deployed branding themselves with the Hyperliquid name; custodial deposit flows established | **T5.007** (brand-impersonation deployment — operator-controlled custody on exploited brand-trust) |
| 2025 | Services operate through apparent-functioning window; users deposit USDC into operator-controlled wallets | **T5.007** (custodial deposit accumulation) |
| 2025 | Operators announce "hack" or "security breach" of the operator-controlled wallet; user funds inaccessible | **T5.007** (exit-as-hack announcement — the canonical T5.007 exit primitive) |
| Post-announcement | Operators go into communication blackout; no recovery effort; no public operator identification | **T5.007** (operator-disappearance fingerprint) |
| Post-incident | Hyperliquid clarifies no affiliation with the impersonating services; industry-press (KuCoin Learn, Cryptorank, community-forensic analysts) characterise cases as fitting the custodial-soft-rug pattern | (detection and disclosure) |

## Realised extraction

Cohort-level custodial-deposit losses across multiple brand-impersonating services. Individual incident losses range from tens of thousands to mid six-figures USD equivalent. No single headline loss figure consolidated at v0.1; the cohort-level structural pattern (brand-impersonation → custodial-deposit → exit-as-hack → communication-blackout) is the load-bearing classification anchor.

## OAK technique classification rationale

T5.007 (Third-Party Brand-Impersonation Custodial Soft-Rug) is the sole classification because the load-bearing extraction primitive was the brand-impersonation custodial-deposit flow — users deposited funds voluntarily into an operator-controlled wallet on the assumption of Hyperliquid affiliation that did not exist. The operator exploited the legitimate platform's brand-trust without contractual basis, accumulated deposits, and exited citing an unverifiable "hack."

The case does not classify under T5.001/T5.002 (token-level LP drain — no token, no LP, no AMM pool), T5.005 (treasury-management exit — the operator was never contractually associated with Hyperliquid), T4 (phishing — users deposited willingly, not via a permission-grant transaction), T11.001 (signing-vendor compromise — the operator was the custodian, not a compromised vendor), or T11.005 (fake-platform fraud — the operator branded itself in Hyperliquid's existing name rather than constructing an apparently-original platform brand).

## References

- Hyperliquid official communications clarifying no affiliation with impersonating copy-trading bot services
- KuCoin Learn and Cryptorank secondary coverage (custodial-soft-rug cohort framing)
- ZachXBT and SEAL Threat Intel public disclosures of brand-impersonation events
- On-chain forensic analysis of operator-wallet outflow patterns (single coordinated transfer vs. dispersion pattern as the operator-exit fingerprint)
- See `examples/2026-01-polymarket-polycule-bot.md` for the canonical T5.007 anchor (Polycule trading bot — Polymarket-branded custodial soft-rug, ~$230K, January 2026)
