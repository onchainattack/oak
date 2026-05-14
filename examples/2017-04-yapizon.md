# Yapizon (Youbit) exchange hack — Bitcoin — 2017-04-22

**Loss:** approximately \$5.6M (~3,816 BTC, ~37% of Yapizon's exchange reserves at the time).
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing-Vendor UI / Signing-Flow Compromise — broadly construed; the exchange's hot-wallet signing infrastructure was compromised directly, enabling the attacker to authorise the ~3,816 BTC drain). **OAK-T15.003** (Operator-Endpoint Compromise — the attacker gained access to Yapizon's internal wallet-server and signing infrastructure, constituting an operator-endpoint state that enabled the signing-flow compromise).
**Attribution:** **inferred-strong (DPRK Lazarus Group per UN Panel of Experts).** South Korean authorities and the UN Panel of Experts attributed the 2017 Yapizon breach to the DPRK's Lazarus Group (OAK-G01) as part of the broader DPRK cryptocurrency-exchange targeting campaign that included Bithumb (2017), Coincheck (2018), and the subsequent wave of Asian-exchange intrusions.
**Key teaching point:** **Yapizon is the canonical "DPRK Lazarus Group first-strike against a South Korean exchange" case: the theft consumed ~37% of exchange reserves, the operator did not have the capital to absorb the loss, and the exchange filed for bankruptcy after a second hack in December 2017 — a two-strike collapse pattern that illustrates the existential risk of a single hot-wallet breach for an undercapitalised exchange, especially when the threat actor is a state-aligned persistent group that returns for a second extraction.**

## Summary

Yapizon (later rebranded as Youbit) was a South Korean cryptocurrency exchange. On 2017-04-22, an attacker compromised the exchange's hot-wallet signing infrastructure and drained approximately 3,816 BTC (~\$5.6M at the time), representing roughly 37% of Yapizon's total exchange reserves.

The exchange attempted to remain operational after the April hack, implementing a loss-socialisation plan in which user balances were reduced by 37% across the board (matching the reserve-loss percentage) and repayments were to be distributed over time. However, in December 2017, Yapizon/Youbit suffered a second hack attributed to the same DPRK threat actor, after which the exchange filed for bankruptcy on 2017-12-19.

The two-strike collapse — April 2017 extraction followed by December 2017 second extraction, then bankruptcy — is the structural signature of an undercapitalised exchange facing a persistent state-aligned threat actor who maps the exchange's recovery cycle. South Korean authorities and the UN Panel of Experts later attributed the 2017 Yapizon breaches to the DPRK's Lazarus Group (OAK-G01) as part of the broader DPRK cryptocurrency-exchange targeting campaign.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2017-04-22 | Attacker compromises Yapizon hot-wallet signing infrastructure; ~3,816 BTC (~37% of reserves) drained | T15.003 (operator-endpoint compromise) → T11.001 (signing-flow compromise) |
| 2017-04 to 2017-11 | Yapizon rebrands as Youbit; loss-socialisation plan: 37% balance reduction + scheduled repayments | (remediation attempt) |
| 2017-12-19 | Second hack attributed to same DPRK threat actor; Youbit files for bankruptcy | (second extraction → insolvency) |
| 2018-01 | South Korean regulators investigate; Youbit declared bankrupt | (regulatory response) |

## Realised extraction

Approximately \$5.6M (~3,816 BTC, ~37% of reserves) in the April 2017 hack; additionally, the December 2017 hack resulted in a second extraction (estimated ~17% of remaining reserves). Both attributed to OAK-G01. No confirmed recovery.

## DPRK attribution lineage

Yapizon (2017-04) is the earliest DPRK-attributed South Korean exchange hack in OAK at v0.1. It establishes the pattern that recurs at Bithumb (2017-06 and 2018-06), Upbit (2019-11), and CoinEx (2023-09): OAK-G01 targets Asian exchanges with under-individuated hot-wallet signing infrastructure, extracts assets in a single-block drain where possible, and returns to exchanges that survived the first extraction for a second pass.

## References

- UN Panel of Experts report on DPRK cyber operations and cryptocurrency exchange targeting (2018-2019 cycle)
- South Korean National Police Agency (NPA) Cyber Bureau investigation records, 2017-2018
- Yapizon / Youbit exchange bankruptcy filing and community reporting, December 2017
- Chainalysis and Elliptic DPRK-campaign wallet-cluster attribution reports
