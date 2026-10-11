# BTC-e exchange seizure and Alexander Vinnik arrest — Bitcoin — 2017-07-25 to 2017-07-26

**Loss:** BTC-e "received more than \$4 billion worth of bitcoin over the course of its operation" (DOJ) `[doj17]`; the indictment alleges Vinnik obtained funds from the Mt. Gox hack and laundered them through BTC-e and Tradehill `[doj17]`. FinCEN assessed a \$110M civil penalty against BTC-e and \$12M against Vinnik `[doj17]`. Earlier figures here (300,000+ BTC from Mt. Gox, \$60M+ customer deposits frozen, Fancy Bear ransomware) are unsourced and removed.
**OAK Techniques observed:** **OAK-T7.001** (Mixer-Routed Hop — BTC-e functioned as a systemic laundering rail at exchange scale; the platform did not implement substantive KYC/AML controls and operated as a de-facto high-volume mixer substitute where illicitly-obtained Bitcoin could be deposited, traded, and withdrawn without identity verification, breaking the chain of custody at the exchange boundary. The platform processed more than \$4 billion worth of bitcoin received (per DOJ) with effectively no AML gate — ). **OAK-T11.001** (Third-Party Signing Vendor Compromise — broadly construed in reverse; BTC-e was the "custodial vendor" whose infrastructure provided the laundering surface for multiple upstream theft operators. The platform's custody infrastructure was the structural enabler for the laundering chain that followed alleged Mt. Gox proceeds and other criminal flows. The case is the canonical illustration of the exchange-as-laundering-infrastructure sub-shape within the broader T11.001 custody-and-signing surface).
**Attribution:** **confirmed**. Vinnik was arrested in Greece on 2017-07-25 at US request; the 21-count indictment (announced 2017-07-26) charges BTC-e and Vinnik with operating an unlicensed money service business and conspiracy to commit money laundering, with Vinnik facing 17 further money-laundering counts and two unlawful monetary-transaction counts `[doj17]`. He is alleged primary beneficial owner of BTC-e's managing shell company, Canton Business Corporation `[doj17]`. Greece extradited him to France in January 2020, where in December 2020 he was acquitted of Locky ransomware involvement but sentenced to five years for money laundering; he was extradited from Greece to the US on 2022-08-04, pleaded guilty to conspiracy to commit money laundering in May 2024, and was released in a prisoner exchange in February 2025 `[wikivin]`.
**Corrected 2026-10-11:** the Mt. Gox figure, \$60M frozen deposits and Fancy Bear claim were removed as unsupported; the extradition chain was corrected (to France 2020-01, to US 2022-08-04, guilty plea 2024-05); the DOJ release does not mention a domain seizure; the Greek arrest city is not confirmed by the cited sources.
**Key teaching point:** **BTC-e is the canonical 2017 worked example of a cryptocurrency exchange as systemic laundering infrastructure — the case in which an entire exchange platform, operating for over six years at multi-billion-dollar scale, is alleged to have received more than \$4 billion in bitcoin with no identity verification, including alleged Mt. Gox proceeds. The case established the law-enforcement template for exchange-level laundering takedowns (operator arrest abroad, FinCEN civil monetary penalty alongside DOJ criminal charges) and demonstrated that the exchange-level AML gate is a structural chokepoint in the cryptocurrency laundering chain.**

## Summary

BTC-e, founded in 2011, was a cryptocurrency exchange that DOJ said received more than \$4 billion worth of bitcoin during its operation, with a customer base reliant on criminals and lacking identity verification and AML processes; DOJ said it was noted for its role in numerous ransomware and other cybercriminal activity `[doj17]`. Its web domains were registered to shell companies in Singapore, the British Virgin Islands, France and New Zealand `[doj17]`.

Vinnik was arrested in Greece on 2017-07-25 and the indictment announced on 2017-07-26, with FinCEN assessing a \$110M penalty on BTC-e and \$12M on Vinnik `[doj17]`. The US requested extradition in late July 2017, Russia in October 2017 and France in June 2018; Vinnik was extradited to France in January 2020, sentenced there in December 2020 to five years for money laundering (acquitted on Locky), extradited to the US on 2022-08-04, pleaded guilty in May 2024 and was released in a swap in February 2025 `[wikivin]`. DOJ's 2022 extradition statement describes the charges as a 21-count superseding indictment from January 2017 `[doj22]`.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2011 | BTC-e founded `[doj17]` | T7.001 |
| 2017-07-25 | Vinnik arrested in Greece `[doj17]` | |
| 2017-07-26 | 21-count indictment announced; FinCEN penalties of \$110M and \$12M `[doj17]` | |
| 2020-01 | Extradited to France `[wikivin]` | |
| 2020-12 | French sentence of five years for money laundering `[wikivin]` | |
| 2022-08-04 | Extradited to the US `[wikivin]``[doj22]` | |
| 2024-05 | Guilty plea to conspiracy to commit money laundering `[wikivin]` | |

## Realised extraction

More than \$4 billion worth of bitcoin received over BTC-e's operation `[doj17]`. No customer-deposit figure is verified.

## Public references

- `[doj17]` — U.S. Attorney's Office N.D. Cal. (copy hosted by FDIC OIG), "Russian National and Bitcoin Exchange Charged in 21-Count Indictment for Operating Alleged International Money Laundering Scheme and Allegedly Laundering Funds from Hack of Mt. Gox" (2017-07-26): <https://fdicoig.gov/news/investigations-press-releases/russian-national-and-bitcoin-exchange-charged-21-count>
- `[doj22]` — U.S. Attorney's Office N.D. Cal., "Alleged Russian cryptocurrency money launderer extradited to the United States" (2022-08): <https://www.justice.gov/usao-ndca/pr/alleged-russian-cryptocurrency-money-launderer-extradited-united-states>
- `[wikivin]` — Wikipedia, "Alexander Vinnik": <https://en.wikipedia.org/wiki/Alexander_Vinnik>
