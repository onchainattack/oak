# Based Visa Card — an unauthorised party got into the dashboard that runs the card program, and the exposed asset was cardholder KYC — Based (BasedOne) / off-chain — 2026-10-05

**Loss:** **no funds lost**, per Based: the trading app, self-custody wallets and funds are unaffected. Exposed: cardholder KYC data; reported fields include names, passport or national ID numbers, dates of birth and home addresses. The number of affected cardholders is not disclosed.

**OAK Techniques observed:** **OAK-T15.004** (Operator Credential Compromise — *primary at the access layer, as for the [2020 Ledger data breach](2020-07-ledger-data-breach.md)*. Based: *"an unauthorised party has gained access to an internal dashboard used to manage the Based Visa Card program."* How access was obtained is not disclosed. See [`techniques/T15.004-operator-credential-compromise.md`](../techniques/T15.004-operator-credential-compromise.md)).

**Attribution:** **unattributed.**

**Key teaching point:** **A leaked KYC file is the targeting list for the next attack.** Nothing was stolen on-chain, but names, ID numbers and home addresses of people known to hold crypto are the input to personalised phishing and to physical coercion (T5.009). The Ledger 2020 leak is still being used years later.

## Summary

Based says it was alerted on 2026-10-05 to unauthorised access to the internal dashboard of its Visa card program, and that the access was stopped and contained. It notified Singapore's Personal Data Protection Commission, filed a police report and is contacting affected users. Based says a separate "backend leak" users linked to the incident was a discontinued March 2026 prototype holding no customer data.

## Root-cause evidence

- **Technique:** OAK-T15.004
- **Source:** <https://x.com/BasedOneX/status/2108121017461924090>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** Based confirms unauthorised access to the card program's internal dashboard and KYC exposure; the access vector (credential, vendor, insider) is undisclosed, so T15.004 records the access layer only.

## Public references

- `[basedincident2026]` — Based on X, "Based Visa Card: Security Incident Update" (2026-10-08): <https://x.com/BasedOneX/status/2108121017461924090>
- `[phemexbased2026]` — Phemex News, "Based reports crypto card data breach to regulators, confirms trading platform unaffected": <https://phemex.com/news/article/based-reports-crypto-card-data-breach-to-regulators-confirms-trading-platform-unaffected-99502>
