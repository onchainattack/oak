# QuadrigaCX exchange collapse — multi-chain — 2019-01 to 2019-04

**Loss:** approximately C\$214.6M claimed by 76,319 unsecured creditors (EY monitor, as reported), of which EY had secured about C\$33M by June 2019. The OSC's June 2020 report found clients lost at least \$169M (currency not stated in the report coverage), about \$115M of it from Cotten's fraudulent trading, with \$28M lost by Cotten on other exchanges and \$46M recovered; about 76,000 investors were affected (BetaKit). QuadrigaCX announced CEO Gerald Cotten's death and its insolvency in January 2019, owing clients roughly C\$250M (Bitcoin Magazine).
**OAK Techniques observed:** **OAK-T11.005.002** (Fake-Custodian / Fake-Asset-Manager Fraud) — primary classification; QuadrigaCX presented as a legitimate exchange with offline reserves while the operator commingled and redirected customer deposits. **OAK-T5.005** (Treasury-Management Exit) — operator-side extraction through commingling and fraudulent trading. **OAK-T11.001** (Third-Party Signing Vendor Compromise — broadly construed; the custodian itself was the failure surface).
**Attribution:** **confirmed** — QuadrigaCX founder Gerald Cotten, publicly identified by the Ontario Securities Commission as running the fraud. The Ontario Securities Commission's June 2020 report classified Cotten's conduct as a Ponzi scheme (BetaKit). EY's monitor reports found no segregation between QuadrigaCX and user funds, fake accounts used to trade non-existent funds with real users, and transfers to personal accounts at other exchanges (as reported by Business Standard / CBC).
**Corrected 2026-10-11:** removed unsourced figures (coin quantities owed, "~104 BTC in cold wallets", 115,000 users, named exchanges and luxury-spending details, 13-15% distribution, CSA Staff Notice 21-327 causation, CFTC/FBI investigations, Netflix documentary, specific death/bankruptcy/monitor-appointment dates); replaced with EY/OSC figures from cited coverage.
**Key teaching point:** **QuadrigaCX is a worked example of the sole-operator custody anti-pattern: one individual with sole knowledge of the offline-wallet passwords, no segregation of customer and company assets, and an operator trading customer funds.** Reporting on the monitor's work says many associated wallets held a very small fraction of what was owed and had been drained months before Cotten's reported death, so the lost passwords were not the root cause of the shortfall.

## Summary

QuadrigaCX was a Canadian cryptocurrency exchange. Cotten died in December 2018 of complications of Crohn's disease (BetaKit). In January 2019 the exchange announced his death and its insolvency, owing clients roughly C\$250M, and filed for creditor protection under the CCAA in the Nova Scotia court system with Ernst & Young as monitor (Bitcoin Magazine). Cotten was reportedly the only person who knew the passwords to the offline reserves.

EY's fifth monitor report (June 2019) put missing funds at C\$214.6M and found no segregation between QuadrigaCX and user funds. It found that Cotten used fake accounts to trade non-existent funds with real users and moved significant cryptocurrency off platform to personal accounts at other exchanges; wallets associated with the company held a very small percentage of what was owed and were drained about eight months before Cotten's death (Business Standard, CBC coverage). In April 2019 EY's fourth report recommended converting the CCAA proceedings to bankruptcy (Bitcoin Magazine).

The OSC report of 2020-06-11 called the scheme a Ponzi scheme: Cotten covered shortfalls with other clients' deposits. In October 2019 Cotten's widow, Jennifer Robertson, agreed to hand about \$12M in assets to EY, subject to court approval, keeping about \$90,000 in cash and some personal items (BetaKit).

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| before 2018-12 | Cotten commingles funds, trades with fake accounts and moves coins to personal accounts at other exchanges; wallets drained months before his death (EY, as reported) | T5.005 + T11.005.002 |
| 2018-12 | Cotten dies; offline-wallet passwords reportedly known only to him | T11.001 (custody failure) |
| 2019-01 | QuadrigaCX announces insolvency owing ~C\$250M and enters CCAA protection in Nova Scotia; EY monitor | (public disclosure / legal) |
| 2019-04-02 | EY's fourth report recommends conversion to bankruptcy | (legal proceedings) |
| 2019-06 | EY's fifth report: C\$214.6M missing, ~C\$33M secured; fake accounts and commingling described | (forensic record) |
| 2019-10 | Robertson settlement: ~\$12M in assets to EY, pending court approval | (recovery) |
| 2020-06-11 | OSC report finds a Ponzi scheme; \$169M+ client losses | (regulatory finding) |

## Realised extraction

C\$214.6M claimed missing (EY); about C\$33M secured by June 2019, and the OSC reports \$46M recovered by June 2020. Currency labels in the OSC coverage are not stated.

## Public references

- `[betakit2020osc]` — BetaKit, "OSC finds Quadriga CEO ran 'Ponzi scheme' leading up to crypto exchange's downfall" (2020-06-11): <https://betakit.com/osc-finds-quadriga-ceo-ran-ponzi-scheme-leading-up-to-crypto-exchanges-downfall/>
- `[betakit2019widow]` — BetaKit, "Widow of QuadrigaCX CEO to forfeit around \$12 million to Ernst & Young" (2019-10-08): <https://betakit.com/widow-of-quadrigacx-ceo-to-forfeit-around-12-million-to-ernst-young/>
- `[btcmag2019fourth]` — Bitcoin Magazine, "Fourth report: QuadrigaCX court monitor recommends bankruptcy proceedings" (2019-04-02): <https://bitcoinmagazine.com/culture/fourth-report-quadrigacx-court-monitor-recommends-bankruptcy-proceedings>
- `[bs2019eyreport]` — Business Standard (PTI), "Canada cryptocurrency exchange founder stole funds before death: audit" (2019-06-25): <https://www.business-standard.com/amp/article/pti-stories/canada-cryptocurrency-exchange-founder-stole-funds-before-death-audit-119062500195_1.html>
- `[cbc2019eyreport]` — CBC, "QuadrigaCX founder used aliases, moved assets into personal accounts: report": <https://amp.cbc.ca/lite/story/1.5182984>
