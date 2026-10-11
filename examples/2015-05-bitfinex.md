# Bitfinex hot-wallet compromise — Bitcoin — 2015-05-22

**Loss:** about 1,500 BTC (roughly \$400,000 per Wikipedia) `[wikibfx]`.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing-Vendor UI / Signing-Flow Compromise — broadly construed; the exchange's internal hot-wallet signing infrastructure was the compromise surface, and the signing-flow access enabled the unauthorised transfer). **OAK-T15.003** (Operator-Endpoint Compromise — Bitfinex said its hot-wallet keys might have been exposed; whether this was via an employee's credentials is unverified, so T15.003 is the closest fit rather than a documented vector).
**Attribution:** **unattributed** Bitfinex disclosed the breach but no attacker was publicly identified. A 2020s Indian press report of an arrested man claiming involvement was unconfirmed by police `[odisha]`.
**Corrected 2026-10-11:** removed unsourced claims of an employee-credential vector, a \$330K valuation, no suspension of operations, and cold-storage language; date 2015-05-22 retained from Bitfinex's own announcement as reported.
**Key teaching point:** **The May 2015 Bitfinex hot-wallet compromise is the immediate structural forebear of the August 2016 Bitfinex multi-signature theft and demonstrates the "recurrence pattern" that is common in CEX-targeted intrusions: a smaller hot-wallet breach tests the exchange's security perimeter; a larger follow-on breach later exploits a different surface.** This incident is distinct from the August 2016 Bitfinex hack (~119,756 BTC, ~$72M at time) which exploited the BitGo multisig architecture and is documented separately at `examples/2016-08-bitfinex.md`.

## Summary

On 2015-05-22 Bitfinex said its hot wallet had been compromised, that the hot-wallet keys might have been exposed, and told customers to stop depositing to old BTC addresses `[ctfx]`. About 1,500 BTC were lost `[wikibfx]``[decrypt]`. Bitfinex described the loss as small, said over 99.5% of user BTC deposits sat in multisig wallets, and said the company would absorb the loss `[ctfx]`. The entry vector was not described in the cited sources.

This is distinct from the August 2016 Bitfinex theft (~119,756 BTC) documented at `examples/2016-08-bitfinex.md`. Claims previously here about an employee credential compromise and the 2016 BitGo architecture being a remediation of this event are unverified; Wikipedia only notes that Bitfinex partnered with BitGo later in 2015 `[wikibfx]`.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2015-05-22 | Bitfinex announces hot-wallet compromise; about 1,500 BTC lost `[ctfx]``[wikibfx]` | T11.001 / T15.003 (closest fit) |

## Realised extraction

About 1,500 BTC `[wikibfx]`; Bitfinex said it would absorb the loss `[ctfx]`.

## Public references

- `[ctfx]` — Cointelegraph, "Breaking: Bitfinex hot wallet hacked, bitcoins stolen" (2015-05-22; seen via search snippet, page not retrievable): <https://regional-front.cointelegraph.com/news/breaking-bitfinex-hot-wallet-hacked-bitcoins-stolen>
- `[wikibfx]` — Wikipedia, "Bitfinex": <https://en.wikipedia.org/wiki/Bitfinex>
- `[decrypt]` — Decrypt, "Bitcoin hacked from Bitfinex, worth \$28 million, starts moving": <https://decrypt.co/36977/bitcoin-hacked-from-bitfinex-worth-28-million-starts-moving>
- `[odisha]` — Odisha Bytes, "Hacked Bitcoin Exchange in 2015, Claims Arrested Hacker": <https://odishabytes.com/hacked-bitcoin-exchange-in-2015-claims-arrested-hacker/amp/>
