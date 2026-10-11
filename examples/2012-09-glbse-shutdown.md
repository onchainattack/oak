# GLBSE (Global Bitcoin Stock Exchange) operator shutdown — Bitcoin — 2012-09

**Loss:** Not tabulated. Shareholder Theymos estimated about 8,000 BTC in deposits at stake at the time of the shutdown (per Bitcoin Magazine, 2012-10-10); the earlier \$1M+ figure in this file was unsourced. GLBSE was the first Bitcoin securities exchange; it listed Bitcoin-denominated securities including the Pirateat40 / Bitcoin Savings & Trust pass-through securities. The operator ("Nefario", James McCarthy) shut the exchange in early October 2012 citing regulatory (AML) exposure and said all deposits would be returned to users. **Recovery:** unconfirmed in the sources cited; closing accounts required users to submit an email and BTC address, and the operator said he was processing 800+ closed accounts in batches.
**OAK Techniques observed:** **OAK-T11.005** (Operator-Side / Fake-Platform Fraud — the exchange was presented as a legitimate, going-concern trading venue; the shutdown-and-withhold pattern is operator-side extraction). **OAK-T6.007** (Trust-Substrate Shift — the operator's unilateral shutdown revoked the trust claim that GLBSE was a reliable custody-and-trading venue, accelerating the Bitcoin community's shift toward decentralized exchange models). **OAK-T15.003** (Operator-Endpoint Compromise — broadly construed; the exchange operator's control over the platform's custody infrastructure was the endpoint through which user funds were withheld).
**Attribution:** **confirmed**. The operator was publicly known by pseudonym; contemporaneous press named him as James McCarthy (Nefario). This file's earlier statement that no enforcement action was brought against McCarthy is not verified by the cited sources.
**Corrected 2026-10-11:** Shutdown was early October 2012 (not a September withholding event); the operator cited AML/regulatory problems and said deposits would be returned; the \$1M+ loss figure and the "material fraction never returned" claim are unsourced and the exit-scam framing is not supported by the cited reporting.
**Key teaching point:** GLBSE is an early case of a custodial Bitcoin venue closing abruptly under regulatory pressure, with users dependent on the operator's cooperation to recover deposits and shares. The operator controlled custody, there was no independent trustee, and recovery depended on a manual, operator-run process that required users to hand over contact details. The cited reporting does not show that funds were withheld or that the shutdown was an exit scam; the earlier framing of it as a withholding precedent for Mt. Gox and later exits is this file's inference and is not sourced.

## Summary

GLBSE (the Global Bitcoin Stock Exchange) was launched in 2011 by James McCarthy (pseudonym "Nefario") as the first Bitcoin-denominated securities exchange. It operated as a web platform where issuers could list Bitcoin-denominated equities — primarily mining-company shares and pass-through securities — and users could trade them against BTC. At its peak, GLBSE was the dominant secondary market for Bitcoin-economy assets, with the Pirateat40 / Bitcoin Savings & Trust Ponzi scheme (see `examples/2012-08-bitcoin-savings-trust.md`) as its largest and most actively traded listing.

The GLBSE platform architecture was fundamentally custodial: users deposited BTC into GLBSE-controlled wallets, and the exchange maintained internal ledgers of user balances and equity holdings. The operator — Nefario — held full administrative control over the platform's web server, database, and Bitcoin wallet infrastructure. There was no multi-signature custody, no independent trustee or auditor, and no mechanism for users to reclaim their assets without the operator's cooperation.

In early October 2012 (Bitcoin Magazine, 2012-10-10, reported it "last Thursday"), Nefario shut down GLBSE. Most user value was held as shares whose issuer relationships GLBSE only recorded. The shutdown occurred in the aftermath of the Pirateat40 / Bitcoin Savings & Trust Ponzi collapse (August 2012), which had been GLBSE's most heavily traded listing and had exposed the exchange to significant reputational and potential legal risk. Nefario said his problems were AML, tax and regulation, in that order, and told Bitcoin Magazine regulators had told him GLBSE was performing a regulated activity without adequate AML controls. He also said about 2,500 BTC had been stolen from the site, which he later recovered. The link to the Pirateat40 collapse as a cause is this file's inference, not stated by Nefario in the cited sources.

After the shutdown Nefario said all deposits would be returned and ran a manual closing-account process in batches. Whether every user was made whole is not established by the sources cited here; the claim in earlier drafts that a material fraction was never returned is unverified.

The GLBSE shutdown reverberated through the 2012 Bitcoin community: it was the first exchange-operator-default event of the cryptocurrency era, and it demonstrated that centralized Bitcoin-denominated venues operated by pseudonymous or semi-pseudonymous individuals carried inherent custody risk that no amount of community trust could mitigate. The incident accelerated interest in decentralized exchange models and non-custodial trading infrastructure.

## Timeline (UTC)

| When | Event | OAK ref |
|------|-------|---------|
| 2011 | GLBSE launches as the first Bitcoin securities exchange under operator "Nefario" (James McCarthy) | |
| 2011–2012 | GLBSE becomes the dominant secondary market for Bitcoin-economy assets; Pirateat40 / BTCS&T Ponzi listed as largest equity | T11.005 first observed |
| 2012-08 | Bitcoin Savings & Trust Ponzi collapses; GLBSE's largest listing evaporates | T11.005.002 + T5.005 |
| 2012-10 (early) | Nefario shuts down GLBSE citing AML/regulatory exposure; says deposits will be returned | T6.007 |
| 2012-10 | Manual account-closing process; 800+ closed accounts being processed in batches | |
| 2013 onward | James McCarthy ("Nefario") identified; no criminal charges | T8.005 (opsec failure — pseudonym-to-real-name linkage) |

## Realised Extraction

- Not established. Deposits at stake estimated ~8,000 BTC by a shareholder (`[btcmaggblse]`); operator said all would be returned (`[btcmaggblse]`, `[btcmagnefario]`).

## Public References

- BitcoinTalk forum: contemporaneous GLBSE shutdown discussion threads (September 2012)
- Community investigation into Nefario / James McCarthy identity (2013–2014)
- Industry retrospectives on early Bitcoin exchange infrastructure and centralized-custody risk (various, 2014 onward)

## Public references

- `[btcmaggblse]` — Bitcoin Magazine, "Global Bitcoin Stock Exchange Shuts Down For Good" (2012-10-10): <https://bitcoinmagazine.com/markets/global-bitcoin-stock-exchange-shuts-down-for-good-1349879479>
- `[btcmagnefario]` — Bitcoin Magazine, "Interview with GLBSE's Nefario": <https://bitcoinmagazine.com/culture/interview-with-glbses-nefario-1350319173>
- `[p2pglbse]` — P2P Foundation blog, "Monitoring Bitcoin – Bitcoin Foundation, GLBSE Closure, and the ASIC Arms Race": <https://blog.p2pfoundation.net/monitoring-bitcoin-bitcoin-foundation-glbse-closure-and-the-asic-arms-race/>
