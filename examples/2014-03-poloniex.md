# Poloniex hot-wallet compromise — Bitcoin — 2014-03-06

**Loss:** approximately \$50K in BTC (~12.3% of exchange reserves at the time of the incident, per operator disclosure).
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing-Vendor UI / Signing-Flow Compromise — broadly construed; the exchange as custodian to its users held signing authority over the hot wallet, and the compromise of that signing infrastructure is structurally T11.001). **OAK-T15.003** (Operator-Endpoint Compromise — the attacker gained access to the exchange's hot-wallet server infrastructure, constituting an operator-endpoint state that enabled the signing-flow manipulation, though the exact entry vector was not publicly detailed at forensic granularity).
**Attribution:** **pseudonymous (unattributed to any named group).** Operator (Tristan D'Agosta) publicly disclosed the breach on the Bitcointalk forum and committed to repaying affected users from personal funds and exchange revenue over time.
**Key teaching point:** **The Poloniex March 2014 incident is the canonical early-exchange hot-wallet compromise in the pre-Lazarus era.** The operator's decision to publicly disclose within hours and commit to full user reimbursement from personal funds — rather than declare bankruptcy — became the reference standard for exchange-breach response in the 2014-2016 period and is frequently contrasted with the Mt. Gox collapse of the preceding month (February 2014) in discussions of exchange custodial risk and operator integrity.

## Summary

Poloniex, a US-based cryptocurrency exchange founded in January 2014 by Tristan D'Agosta, suffered a hot-wallet compromise on or around 2014-03-06. The attacker gained access to the exchange's hot-wallet signing infrastructure and drained approximately \$50K worth of Bitcoin — roughly 12.3% of Poloniex's total exchange reserves at the time according to D'Agosta's public disclosure thread on Bitcointalk.

D'Agosta posted a detailed disclosure on Bitcointalk within hours of discovering the breach, acknowledging the loss, explaining the reserve-coverage ratio, and committing to a repayment plan: he would contribute personal funds and allocate exchange revenue over time until all affected users were made whole. This disclosure-and-repay pattern, combined with Poloniex's subsequent survival and growth (the exchange was later acquired by Circle in 2018 for \$400M), made the incident a reference case for transparent exchange security-incident response in the formative years of the cryptocurrency exchange industry.

The entry vector was described by D'Agosta as a compromise of the exchange's hot-wallet server; specific forensic details (phishing, credential theft, or infrastructure exploit) were not publicly elaborated. The loss was limited to the hot wallet — cold-storage reserves were unaffected. The stolen Bitcoin was traceable on-chain but no recovery was reported at the time.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2014-03-06 | Attacker compromises Poloniex hot-wallet server infrastructure; ~$50K BTC drained | T15.003 (operator-endpoint state), T11.001 (signing control) |
| 2014-03-06 T+hours | D'Agosta publishes breach disclosure on Bitcointalk; commits to repaying users from personal funds and exchange revenue | (defender response) |
| 2014-03 onward | Poloniex implements enhanced hot-wallet security; cold-storage architecture reinforced | (architectural remediation) |
| 2014-2016 | All affected users reportedly reimbursed per D'Agosta's commitment plan | (remediation complete) |

## Realised extraction

Approximately \$50K in BTC at 2014-03 prices; no confirmed recovery reported.

## References

- Tristan D'Agosta, Poloniex breach disclosure thread, Bitcointalk, March 2014
- Poloniex exchange forum and community archives, March 2014
- "Poloniex — The Most Secure Way to Trade Bitcoin," corporate history and security narrative references
