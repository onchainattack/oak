# Polycule trading bot — third-party brand-impersonation soft rug — 2026-01

**Loss:** ~$230,000 in user funds frozen / withdrawn by operator. The Telegram-distributed "Polycule trading bot" branded itself as a Polymarket-integrated copy-trading service and operated a custodial wallet that users deposited USDC into.
**OAK Techniques observed:** No clean v0.1 Technique. **Proposed v0.x candidate**: T5.x sub-class for *third-party brand-impersonation custodial soft-rug* — distinct from operator-side treasury-management exit (T5.005) because the operator was never contractually associated with the platform whose brand they used. See `TAXONOMY-GAPS.md`.
**Attribution:** **inferred-strong**. The Polycule operators were never associated with Polymarket; the platform clarified it had no relationship with the bot. Operator identity was not publicly resolved as of v0.1; the disappearance pattern (communication blackout following the "hack" announcement, no recovery effort, no public operator identification) is consistent with an exit-scam rather than a third-party intrusion.
**OAK-Gnn:** unattributed at v0.1.

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
