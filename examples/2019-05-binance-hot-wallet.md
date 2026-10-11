# Binance hot-wallet compromise — Bitcoin — 2019-05-07

**Loss:** 7,000 BTC (about \$40M at the time) withdrawn from Binance's Bitcoin hot wallet in a single transaction (Decrypt). Binance said cold storage was not accessed and that it would cover the loss from its SAFU fund.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing Vendor Compromise — broadly construed; Binance's own withdrawal-authorisation path was the failure surface). **OAK-T15.003** (Operator Endpoint / Infrastructure Compromise — Binance said attackers used phishing, viruses and other attacks and obtained user API keys and 2FA codes; the exact entry point was not disclosed). **OAK-T7.001** (Mixer-Routed Hop — retained from the earlier draft; none of the sources cited here describes the laundering path).
**Attribution:** **unattributed.** No government, court or forensic-firm attribution was found; an earlier draft linked the theft to OAK-G01 (Lazarus) and cited a 2020 UN report, neither of which is supported by the sources cited here. Link removed 2026-10-11.
**Corrected 2026-10-11:** removed the unsourced UN-panel attribution, the claims of employee spear-phishing and multi-signature hot-wallet design, the "mixer / coinjoin laundering", "~08:00" timing, the SAFU "10% of trading fees" detail and the campaign list; the sourced mechanism is phishing / viruses yielding API keys and 2FA codes used through "multiple seemingly independent accounts" to make one 7,000 BTC withdrawal.
**Key teaching point:** **The 2019 Binance incident is an early exchange-sized hot-wallet theft where the attack went through account and API credentials plus the withdrawal-validation path rather than a drained cold store.** Binance's response was to close deposits and withdrawals for a security review and to announce changes to API, 2FA and withdrawal-validation areas (Changpeng Zhao, as reported), while an exchange-run insurance fund (SAFU) covered the loss.

## Summary

On 2019-05-07 Binance disclosed that hackers had withdrawn 7,000 BTC (about \$40M) from its hot wallet in a single transaction. According to Binance's statement as reported by Decrypt, the hackers used phishing, viruses and other attacks and obtained a large number of user API keys, two-factor authentication codes and other information, and used "multiple seemingly independent accounts". The hot wallet held a small part of total BTC holdings and cold storage was not accessed.

Binance closed deposits and withdrawals while it conducted a security review, while trading continued. It said the loss would be covered in full by SAFU and that no user funds would be affected. CEO Changpeng Zhao said the company was making significant changes to the API, 2FA and withdrawal-validation areas that the attackers exploited, and on 2019-05-13 said the exchange aimed to resume deposits and withdrawals on Tuesday (2019-05-14), depending on testing (Finance Magnates).

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2019-05-07 | 7,000 BTC (~\$40M) withdrawn from the hot wallet in one transaction; Binance discloses, closes deposits and withdrawals | T11.001 / T15.003 |
| 2019-05-07 | Binance says SAFU will cover the loss in full | (remediation) |
| 2019-05-13 | CZ says the exchange aims to resume deposits and withdrawals on Tuesday; restart date not confirmed in sources cited | (recovery) |

## Realised extraction

7,000 BTC (~\$40M). Binance said it would cover the full loss from SAFU. No recovery or laundering trail is documented in the sources cited here.

## Public references

- `[decrypt2019binance]` — Decrypt, "Binance hack security breach" (2019-05-07): <https://decrypt.co/6930/binance-hack-security-breach>
- `[fm2019binance]` — Finance Magnates, "After Hack, Binance to Resume Deposits & Withdrawals on Tuesday": <https://www.financemagnates.com/cryptocurrency/news/after-hack-binance-to-resume-deposits-withdrawals-on-tuesday/>
- `[pa2019binance]` — Piper Alderman, "One of the world's largest crypto exchanges hacked for 7,000 bitcoins": <https://piperalderman.com.au/insight/one-of-the-worlds-largest-crypto-exchanges-hacked-for-7000-bitcoins/>
