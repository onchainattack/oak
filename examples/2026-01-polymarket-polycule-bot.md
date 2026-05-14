# Polycule trading bot — third-party brand-impersonation soft rug — 2026-01

**Loss:** ~$230,000 in user funds frozen / withdrawn by operator. The Telegram-distributed "Polycule trading bot" branded itself as a Polymarket-integrated copy-trading service and operated a custodial wallet that users deposited USDC into.
**OAK Techniques observed:** **OAK-T5.007** (Third-party Brand-impersonation Custodial Soft-rug) — canonical anchor case. Distinct from operator-side treasury-management exit (T5.005) because the operator was never contractually associated with the platform whose brand they used.
**Attribution:** **inferred-strong**. The Polycule operators were never associated with Polymarket; the platform clarified it had no relationship with the bot. Operator identity was not publicly resolved as of v0.1; the disappearance pattern (communication blackout following the "hack" announcement, no recovery effort, no public operator identification) is consistent with an exit-scam rather than a third-party intrusion.
**OAK-Gnn:** unattributed at v0.1.

## Timeline (UTC unless noted)

| When | Event | OAK ref |
|---|---|---|
| 2025 | Polycule trading bot operates publicly as a Telegram-distributed Polymarket copy-trading service; no formal Polymarket partnership announced; users assume an affiliation that does not exist | T6.001 (brand-trust absorption — third-party leverages platform's brand without contractual basis) |
| 2025 → 2026-01-13 | Users deposit USDC into Polycule-managed wallet; bot purports to mirror trades from "successful Polymarket traders" identified by the Polycule team | T11.005 (custodial deposit accumulation — third-party operator holds user funds) |
| 2026-01-13 | Polycule operators announce via Telegram that the bot's wallet was "hacked"; ~$230,000 in user funds drained | T11.005.002 (soft-rug via claimed external compromise — "hack" cannot be independently verified) |
| 2026-01-13 | On-chain outflow from Polycule wallet is a single coordinated transfer pattern — inconsistent with the dispersion pattern characteristic of an external attacker exfiltrating quickly | T11.005.002 (operator-side extraction — outflow pattern inconsistent with external compromise narrative) |
| 2026-01-13 onward | Polycule operators go into communication blackout — no follow-up updates, no public operator identification, no observable recovery effort | T6.007 (operator communication blackout — trust-substrate collapse) |
| 2026-01 onward | Polymarket publicly clarifies no relationship with Polycule; the case becomes the canonical "third-party brand-impersonation custodial soft-rug" reference for prediction-market platforms | (canonical reference — platform-brand-impersonation custodial rug) |

**Key teaching point:** **Polycule is the canonical first example of the "third-party brand-impersonation custodial soft-rug" — a category where an off-platform service absorbs a platform's brand trust without contractual basis, accumulates user deposits into its own custodial wallet, and exits citing a "hack" that cannot be independently verified.** The category is distinct from token-level rugs (no token, no LP), phishing (users deposited willingly), and custodial-vendor compromise (the operator WAS the custodian). As crypto platforms scale without on-platform tooling, third-party bots and extensions branding themselves as platform-affiliated will face this same structural trust-gap exploitation.

## Summary

Polycule was a Telegram-distributed trading bot that branded itself as a Polymarket copy-trading service. Users deposited USDC into a Polycule-managed wallet; the bot purported to mirror trades from "successful Polymarket traders" identified by the Polycule team. On January 13, 2026, the Polycule operators announced that the bot's wallet had been "hacked" and ~$230,000 in user funds had been drained. After the announcement, the operators went into communication blackout — no follow-up updates, no public operator identification, no observable recovery effort.

The KuCoin and Cryptorank coverage characterised the event as fitting the soft-rug pattern: a custodial third-party tool brands itself with a legitimate platform's name, accumulates user deposits, and exits citing an external compromise that cannot be independently verified.

## What's structurally important

Polycule occupies a category that OAK v0.1 does not cleanly cover:

- **Not a token-level rug** (T2.002 locked-liquidity / T5.001 hard LP drain): there was no token, no LP, no AMM pool.
- **Not an operator-side treasury-management exit** (T5.005): the operator was never contractually associated with Polymarket. T5.005's scope is a project's *own* multisig draining its *own* treasury; Polycule's operators had no fiduciary or contractual relationship with the brand they used.
- **Not phishing** (T4): users deposited willingly to the bot's stated address.
- **Not custodial-vendor compromise** (T11.001): there was no third-party signing-vendor relationship; the Polycule operators *were* the custodian.

The category is **third-party brand-impersonation custodial soft-rug**: an off-platform service brands itself as platform-affiliated, absorbs the platform's brand-trust without contractual basis, runs custodial flow, and exits citing a "hack" that cannot be independently verified.

This is structurally similar to the Inferno Drainer / DaaS pattern in that the *brand* is the asset being exploited, not the platform's contracts. But unlike DaaS phishing (which captures keys at signing time), Polycule-class operations capture funds at *deposit* time — users send USDC to the bot's stated address voluntarily, expecting custodial-but-honest service.

## What defenders observed

- **Pre-event:** Polycule had been operating publicly through 2025 with no formal Polymarket partnership announced. Users assumed an affiliation that did not exist.
- **At-event:** the "hack" announcement on January 13, 2026 was a Telegram channel post; the on-chain outflow from the Polycule wallet was a single coordinated transfer pattern, not the dispersion pattern characteristic of an external attacker exfiltrating quickly.
- **Post-event:** Polymarket publicly clarified no relationship with Polycule. No follow-up was published by the Polycule operators after the initial "hack" disclosure.

## What this example tells contributors

The Polycule case is the canonical first example of a category that will recur as more crypto platforms grow brand-trust without on-platform tooling: third-party Telegram bots, browser extensions, mobile apps that brand themselves as "X for Y" where Y is the platform — without Y's involvement.

Contributors writing v0.x Techniques should consider:

- **T5.x — Third-party brand-impersonation custodial soft-rug.** Scope: an off-platform custodial service that brands itself in a legitimate platform's name, accumulates deposits, and exits citing an unverifiable "hack." Detection signals at the platform layer: monitoring for off-platform brand-impersonation services through trademark / domain / Telegram-handle surveillance; clear public-record statements about which third-party services have any official relationship.

- **T6.x sub-class for *brand-anticipation phishing*** is closely related: when a platform has *no token yet*, the absence is itself the lure. Polycule is brand-impersonation in service form; brand-anticipation phishing (e.g., "Polymarket POLY airdrop claim") is brand-impersonation in token form. Both rely on the platform's official-channel-amplified ambiguity.

The platform-side mitigation is publishing an authoritative third-party-service registry — saying "these are the only Polymarket-affiliated services; everything else is unaffiliated" — and aggressive trademark / domain enforcement. Polymarket's existing FAQ ("we will never DM first") is an early form of this but does not extend to service-impersonation.

## Public references

- [Cryptorank — Polycule Trading Bot Sparks Alarming Rug Pull Fears](https://cryptorank.io/news/feed/2bfbf-polycule-trading-bot-rug-pull-fears)
- [KuCoin News — Telegram Trading Bot Polycule on Polymarket Hacked, $230K Stolen](https://www.kucoin.com/news/flash/telegram-trading-bot-polycule-on-polymarket-hacked-230k-stolen)
- [Polymarket support FAQ — official statements about third-party services](https://docs.polymarket.com/) — primary source for the no-affiliation clarification.
