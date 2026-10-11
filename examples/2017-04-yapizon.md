# Yapizon (Youbit) exchange hack — Bitcoin — 2017-04-22

**Loss:** about 3,816 BTC (roughly \$5M), 37% of user funds, from four hot wallets `[hr17]`.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing-Vendor UI / Signing-Flow Compromise — broadly construed; the exchange's hot-wallet signing infrastructure was compromised directly, enabling the attacker to authorise the ~3,816 BTC drain). **OAK-T15.003** (Operator-Endpoint Compromise — the attacker gained access to Yapizon's internal wallet-server and signing infrastructure, constituting an operator-endpoint state that enabled the signing-flow compromise).
**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md).
**Attribution:** **inferred-weak** South Korea's spy agency reportedly linked the April attack to North Korea `[ml17]`; FireEye in September 2017 said it found no evidence tying North Korea to the Yapizon theft itself, while attributing later spearphishing of Korean exchanges to North Korea `[bi17]`. No UN Panel or Lazarus-specific attribution is found in the cited sources; the Lazarus label is unverified.
**Key teaching point:** **Yapizon shows the existential risk of a single hot-wallet breach for an undercapitalised exchange: it socialised a 37% loss across user balances, was hacked again in December 2017 as Youbit (17% of total assets), and filed for bankruptcy.**

**Corrected 2026-10-11:** removed the confident Lazarus/UN Panel attribution (unverified; FireEye found no North Korea evidence for this theft) and the \$5.6M, ~17%-of-remaining-reserves and 2018 regulator claims; 'first-strike' framing removed.

## Summary

Yapizon (renamed Youbit) was a South Korean exchange. On Saturday 2017-04-22 an attacker compromised four of its hot wallets and took 3,816.2028 BTC (about \$5M), 37% of user funds; the article does not say how the wallets were accessed `[hr17]`. The exchange went offline, notified Seoul police cyber units, denied insider involvement, applied a 37% reduction across all members' balances and planned to issue "Fei" tokens to priority members as compensation `[hr17]`.

On attribution, FireEye reported in September 2017 that it found no evidence tying North Korea to the Yapizon theft, though it linked other spearphishing against Korean exchanges (May and July) to North Korea `[bi17]`. A later report states South Korea's spy agency linked the April attack to North Korea `[ml17]`. In December 2017 Youbit was hacked again, losing 17% of total assets, and filed for bankruptcy (reported 20 December 2017) `[ml17]`.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2017-04-22 | Four hot wallets compromised; 3,816 BTC (37% of user funds) taken `[hr17]` | T11.001 / T15.003 |
| 2017-04 | 37% balance reduction applied; Fei tokens planned `[hr17]` | |
| 2017-09 | FireEye finds no North Korea evidence for the Yapizon theft `[bi17]` | |
| 2017-12 | Youbit hacked again (17% of assets); bankruptcy filing `[ml17]` | |

## Realised extraction

3,816 BTC (about \$5M) `[hr17]`; a further 17% of total assets in December 2017 `[ml17]`. No recovery reported in the cited sources.

## Public references

- `[hr17]` — Hackread, "South Korean Bitcoin Exchange Yapizon Hacked; \$5 Million Stolen" (2017-04-29): <https://www.hackread.com/south-korean-bitcoin-exchange-yapizon-hacked/>
- `[bi17]` — Bitcoinist, "North Korea Suspected of Hacking South's Bitcoin Exchanges" (2017-09): <https://bitcoinist.com/north-korea-hack-bitcoin-exchanges/amp/>
- `[ml17]` — Moneylife (IANS), "South Korean Bitcoin exchange Youbit shut down after hacking" (2017-12-20): <https://moneylife.in/article/south-korean-bitcoin-exchange-youbit-shut-down-after-hacking/52527.html>
