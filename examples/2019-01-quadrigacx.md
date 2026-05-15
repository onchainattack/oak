# QuadrigaCX exchange collapse — multi-chain (BTC, ETH, LTC, BCH) — 2019-01 to 2019-04

**Loss:** approximately \$190M-\$215M in customer deposits (approximately 76,000 BTC, 430,000 ETH, 200,000 LTC, and smaller BCH/BTC-Gold positions) held on the QuadrigaCX exchange platform when the exchange ceased operations following the reported death of CEO Gerald Cotten in India on 2018-12-09. The loss became publicly known on 2019-01-14 when QuadrigaCX announced Cotten's death and suspended withdrawals; Ernst & Young was appointed as monitor on 2019-03-05 under Companies' Creditors Arrangement Act (CCAA) proceedings. EY's subsequent investigation revealed that QuadrigaCX operated more as a Ponzi-like structure than a legitimate exchange: customer deposits were commingled with operator funds, deposited to Cotten's personal accounts at other exchanges, used for Cotten's personal expenses (real estate, travel, luxury goods), and used to fund Cotten's personal margin-trading losses on other exchanges. Of the \~215,000 BTC in supposed cold storage, EY recovered approximately 100 BTC; the vast majority of customer funds were never located.
**OAK Techniques observed:** **OAK-T11.005.002** (Fake-Custodian / Fake-Asset-Manager Fraud) — primary classification; QuadrigaCX presented as a legitimate Canadian cryptocurrency exchange with cold-storage custody but the operator commingled and redirected customer deposits for personal use. **OAK-T5.005** (Treasury-Management Exit) — the operator-side extraction was gradual and multi-year through commingling rather than a single-event drain. **OAK-T11.001** (Third-Party Signing Vendor Compromise — broadly construed at the custodian level; the exchange was the custodian and the custodian itself was the failure surface).
**Attribution:** **confirmed**. Canadian securities regulators (OSC, BCSC) and the Ontario Superior Court of Justice documented the operator-side fraud. Cotten died in India in December 2018; the death certificate is independently verified but the circumstances (timing relative to exchange insolvency, Cotten's sole control of private keys, the near-total absence of recoverable cold-storage funds) generated persistent conspiracy theories about whether Cotten faked his death. EY's forensic investigation confirmed the commingling and personal-use patterns; the CFTC and FBI opened investigations. No criminal charges were filed against Cotten posthumously.
**Key teaching point:** **QuadrigaCX is the canonical 2019 worked example of the sole-operator custody anti-pattern: a single individual holding sole access to cold-storage keys, with no multi-sig, no succession planning, no third-party custody oversight.** The case drove the Canadian regulatory response (CSA Staff Notice 21-327) requiring Canadian exchanges to register as securities dealers and submit to custody audits, and is the most frequently-cited case in custody-regulation discussions globally. The EY monitor reports remain the primary forensic record; the case bridges the T11.005 (operator-side fake platform), T11.001 (custody compromise), and T5.005 (treasury exit) classifications, with the commingling pattern establishing the structural link across the three.

## Summary

QuadrigaCX was founded in 2013 by Gerald Cotten and Michael Patryn (the latter a convicted identity thief and money launderer who had legally changed his name from Omar Dhanani; Patryn left QuadrigaCX in approximately 2016 but his history was later cited by regulators as a red flag the exchange's users could not have known). By 2018, QuadrigaCX was Canada's largest cryptocurrency exchange by reported volume, handling CAD and crypto deposits for approximately 115,000 users.

The exchange's architecture was centralised and opaque: Cotten held sole control of the exchange's cold-storage wallets; withdrawal processing was manual, performed by Cotten from an encrypted laptop; there was no multi-signature custody, no third-party custodian, and no succession plan. When Cotten died in India on 2018-12-09 (reportedly from complications of Crohn's disease while on honeymoon), the exchange's access to the cold-storage wallets died with him. QuadrigaCX announced Cotten's death on 2019-01-14 and suspended all withdrawals.

EY's subsequent CCAA monitor investigation revealed the deeper failure: the supposed cold storage did not contain the reported balances. The exchange had been operating a de facto Ponzi structure for years — customer deposits were commingled with operator funds, transferred to Cotten's personal accounts at other exchanges (Kraken, Bitfinex, Poloniex, and others), used for personal expenses (real estate in British Columbia and Nova Scotia, luxury vehicles, private jet and yacht charters), and used to cover Cotten's personal margin-trading losses on other exchanges (Cotten had lost approximately \$115M of customer funds trading on other exchanges under his personal accounts). The cold-storage wallets EY recovered contained approximately 100 BTC out of approximately 215,000 BTC reported as customer balances.

The exchange entered CCAA protection in January 2019 and was declared bankrupt in April 2019. EY recovered approximately \$33M in assets (primarily from Cotten's personal estate, payment processors, and third-party exchange accounts where Cotten had deposited customer funds). Distributions to creditors began in 2022, with recovery estimated at approximately 13-15% of claims.

Cotten's widow, Jennifer Robertson, forfeited approximately \$12M in assets in a 2019 settlement with EY. The BC Securities Commission and the Ontario Securities Commission published investigative findings but filed no enforcement proceedings given Cotten's death. The Netflix documentary "Trust No One: The Hunt for the Crypto King" (2022) documented the case and the conspiracy theories surrounding Cotten's death.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2013 | QuadrigaCX founded by Gerald Cotten and Michael Patryn; exchange operates with sole-operator custody architecture | (standing T11.005 surface) |
| 2014-2018 | Cotten gradually commingles customer deposits with personal accounts, uses customer funds for personal expenses and margin-trading losses on other exchanges | T5.005 (gradual exit) + T11.005.002 (fake-custodian fraud) |
| 2018-12-09 | Cotten dies in Jaipur, India (reported cause: complications of Crohn's disease); cold-storage keys lost with sole-operator death | T11.001 (custody failure) |
| 2019-01-14 | QuadrigaCX announces Cotten's death, suspends withdrawals; customer losses estimated at ~$190M-$215M | (public disclosure) |
| 2019-01-31 | QuadrigaCX files for CCAA creditor protection in Nova Scotia Supreme Court | (legal proceedings) |
| 2019-03-05 | EY appointed as CCAA monitor; forensic investigation begins | (forensic record) |
| 2019-04-08 | QuadrigaCX declared bankrupt; EY confirms cold-storage wallets contained ~100 BTC vs ~215,000 BTC reported | (bankruptcy) |
| 2019-06 | EY publishes first monitor report documenting commingling, personal-use patterns, and Cotten's personal exchange-trading losses | (forensic record) |
| 2020-2022 | Recovery efforts: ~$33M recovered; distributions to creditors begin 2022 at ~13-15% of claims | (recovery) |
| 2022 | Netflix documentary "Trust No One: The Hunt for the Crypto King" released; conspiracy theories about Cotten's death persist | (public awareness) |

## Realised extraction

Approximately \$190M-\$215M in customer deposits; approximately \$33M recovered through EY's CCAA process (~13-15% recovery rate).

## Public references

- Ernst & Young, "QuadrigaCX CCAA Monitor Reports" (First through Fifth Reports, 2019-2020)
- Ontario Securities Commission, "QuadrigaCX Investigation" (2020)
- BC Securities Commission, "QuadrigaCX Investigative Findings" (2020)
- CSA Staff Notice 21-327 (2020) — Canadian regulatory response requiring exchange registration and custody audits
- Netflix, "Trust No One: The Hunt for the Crypto King" (2022)
