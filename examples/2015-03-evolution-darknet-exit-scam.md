# Evolution Darknet Market Exit Scam — 2015-03

**Loss:** over \$12M by merchants' estimates `[krebs15]`; Bitcoin Magazine put it at an estimated 40,000 BTC, about \$12M at the time `[bm15]`. Both are secondhand estimates. Evolution's operators stopped withdrawals and took the market offline in March 2015 with users' escrowed bitcoin `[krebs15]`.
**OAK Techniques observed:** **OAK-T5.005** (Treasury Management Exit — the operators, as the marketplace's central escrow custodians, controlled all user funds held in Evolution's escrow system and swept them in a coordinated exit event). **OAK-T8.005** (Operational-Security Procedural Failure — the operators disappeared without being publicly identified at the time; their operational security during the platform's operation was sufficient to evade identification, but the exit-scam event itself was a catastrophic OPSEC failure in the attacker-jurisdiction sense — the operators demonstrated that the escrow model was a standing custodial-extraction surface). **OAK-T6.001** (Source-Verification Mismatch — the marketplace's escrow claims and "secure" transaction promises were not independently verifiable; the escrow was a single-operator-controlled hot-wallet pool).
**Attribution:** **unattributed** — the market's administrators, who went by "Kimble" and "Verto", disappeared with the escrow funds and were not identified. An anonymous buyer told Krebs the pair had also designed and operated the Tor Carding Forum `[krebs15]`; this is unverified.
**Corrected 2026-10-11:** loss given as merchant estimates (over \$12M / ~40,000 BTC) instead of 42,000 BTC; removed the unsourced 48-hour sweep, "Silk Road 3.0" ranking, Russian-ecosystem attribution and launch-date claims.
**Key teaching point:** **Evolution is the canonical darknet-market exit scam — the structural demonstration that centralized marketplace escrow is a standing T5.005 surface. The incident is the darknet-market equivalent of the GBL exchange exit scam (2013, T11.005.001): a centralized platform whose operator-controlled escrow pool holds customer funds, with no independent custody verification, where the operator can freeze withdrawals and sweep the escrow at any time. The Evolution case validated the Silk Road precedent: decentralized custody (buyer-seller direct with on-chain escrow contracts) is structurally safer than centralized marketplace escrow — but darknet markets after Evolution continued to favour centralized escrow because it simplified the buyer-seller trust model.**

## Summary

Evolution was a darknet marketplace with a centralized escrow system that became the go-to online bazaar after the Silk Road shutdowns `[krebs15]`. In mid-March 2015 the administrators "Kimble" and "Verto" blamed withdrawal delays on an unexpected influx of large withdrawal requests and promised a fix within 24 hours, but the site went offline before that elapsed `[krebs15]`. Reddit moderators said the administrators had exit scammed `[krebs15]`. Merchants reckoned the missing stash was worth more than \$12 million `[krebs15]`; Bitcoin Magazine estimated about 40,000 BTC `[bm15]`. Bitcoin's price was about \$284 on 17 March 2015 `[krebs15]`.

The case illustrates that centralized marketplace escrow is a standing treasury-extraction surface (T5.005): the operators control all user funds and can freeze withdrawals and disappear. Earlier text here about a 48-hour on-chain sweep, a January 2014 launch date, and later exit scams being a consequence is unverified and removed; the sources do not describe how the funds moved.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2015-03 (mid-month) | Withdrawal problems attributed to heavy requests; site goes offline before the promised 24-hour fix `[krebs15]` | **T5.005 escrow extraction** |
| 2015-03-18 | Krebs reports the market vanished in the preceding 24 hours; admins reported to have absconded with funds `[krebs15]` | **Exit scam** |

## Realised extraction

Over \$12M by merchant estimates `[krebs15]`; ~40,000 BTC per Bitcoin Magazine `[bm15]`. No public recovery or operator identification found.

## Public references

- `[krebs15]` — KrebsOnSecurity, "Dark Web's Evolution Market Vanishes" (2015-03-18): <https://krebsonsecurity.com/2015/03/dark-webs-evolution-market-vanishes/>
- `[bm15]` — Bitcoin Magazine, coverage of the Evolution exit scam (2015-03; search-result link, title not seen): <https://bitcoinmagazine.com/?p=23536>
- Cross-reference: T5.005 (Treasury Management Exit) at `techniques/T5.005-treasury-management-exit.md`.
- Cross-reference: T8.005 (Operational-Security Procedural Failure) at `techniques/T8.005-operational-security-procedural-failure.md`.
- [`examples/2011-2013-silk-road.md`](../examples/2011-2013-silk-road.md) — Silk Road, 2011–2013.
- [`examples/2013-11-sheep-marketplace.md`](../examples/2013-11-sheep-marketplace.md) — Sheep Marketplace exit scam, 2013.
