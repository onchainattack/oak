> **QUARANTINED 2026-11-27 — not part of the OAK corpus.** The 2026-11 source pass rewrote this file from the pages it could open and found no attack to record: the case is spoofing of CME E-mini S&P 500 futures, with no crypto asset, venue or address. It is kept here, outside `examples/`, and can return if a source documents an incident.

# Navinder Sarao CME futures spoofing — spoof orders in E-mini S&P 500 futures, traditional-finance case with no crypto involved — CME / E-mini S&P 500 futures — 2009–2014

**Loss:** **no crypto loss; not a theft.** Sarao admitted at least \$12.8 million in illicit gains from the scheme, per the [DOJ case page](https://www.justice.gov/criminal/criminal-vns/united-states-v-navinder-singh-sarao). The [CFTC consent order](https://www.cftc.gov/PressRoom/PressReleases/7486-16) (2016-11-17) imposed a civil monetary penalty of \$25,743,174.52 and disgorgement of \$12,871,587.26. The DOJ page records a preliminary order of forfeiture of \$570,557.14 entered on 2023-12-01.

**OAK Techniques observed:** none — the case involves no crypto asset, venue or address; it is spoofing on CME equity-index futures. It is kept as a traditional-finance reference for the order-book spoofing Technique, which OAK maps for crypto order-book venues (see [`techniques/T17.003-orderbook-spoofing-cancel-flood.md`](../techniques/T17.003-orderbook-spoofing-cancel-flood.md)).

**Attribution:** **confirmed** — Navinder Singh Sarao pleaded guilty on 2016-11-09 to one count of wire fraud and one count of spoofing ([DOJ case page](https://www.justice.gov/criminal/criminal-vns/united-states-v-navinder-singh-sarao)), and admitted the CFTC's complaint and the findings in the consent order ([CFTC](https://www.cftc.gov/PressRoom/PressReleases/7486-16)).

**Key teaching point:** **Check order modifications and cancellations, not only fills.** The CFTC order finds that on 2010-05-06 the layering program modified orders over 81,000 times while only 81 lots executed ([CFTC](https://www.cftc.gov/PressRoom/PressReleases/7486-16)); a monitor that sees only executed trades would miss that ratio. A crypto order-book venue should log and review the full order lifecycle.

## Summary

From at least January 2009 through at least April 2014, Sarao used an automated trading program and other techniques to manipulate E-mini S&P 500 futures on the Chicago Mercantile Exchange, placing thousands of spoof orders ([DOJ case page](https://www.justice.gov/criminal/criminal-vns/united-states-v-navinder-singh-sarao)). The CFTC consent order names three tactics: a dynamic layering program, a back-of-queue program and manual spoofing, used to create a false impression of supply and demand ([CFTC](https://www.cftc.gov/PressRoom/PressReleases/7486-16)).

On 2010-05-06, the CFTC order finds the dynamic layering program ran for a cumulative 4 hours 25 minutes, modified orders over 81,000 times with only 81 lots executed, and that the orders represented 20 to 29 percent of the sell side of the order book until cancelled at 1:40 p.m. CT. The order finds these actions contributed to an extreme order-book imbalance, and cites preliminary CFTC/SEC findings on a sudden loss of liquidity that day ([CFTC](https://www.cftc.gov/PressRoom/PressReleases/7486-16)). A news report of the sentencing describes him as accused of helping cause the crash ([The National, 2020-01-29](https://thenationalnews.com/business/markets/british-flash-crash-trader-sentenced-to-home-incarceration-for-one-year-1.971096)).

He was sentenced in Chicago to one year of home incarceration at his parents' house in west London; he had spent four months in a UK prison in 2015 before bail, and the government had first sought 78 to 97 months ([The National](https://thenationalnews.com/business/markets/british-flash-crash-trader-sentenced-to-home-incarceration-for-one-year-1.971096)). The sentencing date is given there only as the Tuesday before the 2020-01-29 article.

## Timeline (UTC)

Stages: **Flaw** (venue could be spoofed), **Take** (the scheme), **Response** (charges, plea, sanctions). No crypto funds are involved, so there is no fund-flow stage. Dates come from the DOJ and CFTC pages cited in the rows.

| When | What happened | OAK |
|---|---|---|
| 2009-01 to 2014-04 (at least) | Sarao uses an automated program and other techniques to place spoof orders in E-mini S&P 500 futures on CME ([DOJ](https://www.justice.gov/criminal/criminal-vns/united-states-v-navinder-singh-sarao)) | — |
| 2010-05-06 | Dynamic layering program runs for a cumulative 4 h 25 min; orders cancelled at 1:40 p.m. CT ([CFTC](https://www.cftc.gov/PressRoom/PressReleases/7486-16)) | — |
| 2015-02-11 | Criminal complaint filed, N.D. Illinois ([DOJ](https://www.justice.gov/criminal/criminal-vns/united-states-v-navinder-singh-sarao)) | response |
| 2015 | Four months in UK prison before release on bail, per [The National](https://thenationalnews.com/business/markets/british-flash-crash-trader-sentenced-to-home-incarceration-for-one-year-1.971096); arrest date undisclosed on the opened pages | response |
| 2015-09-02 | 22-count indictment returned ([DOJ](https://www.justice.gov/criminal/criminal-vns/united-states-v-navinder-singh-sarao)) | response |
| 2016-11-07 | Extradited to the United States ([DOJ](https://www.justice.gov/criminal/criminal-vns/united-states-v-navinder-singh-sarao)) | response |
| 2016-11-09 | Pleads guilty to one count of wire fraud and one count of spoofing ([DOJ](https://www.justice.gov/criminal/criminal-vns/united-states-v-navinder-singh-sarao)) | response |
| 2016-11-17 | CFTC consent order: penalty, disgorgement, permanent trading and registration bans ([CFTC](https://www.cftc.gov/PressRoom/PressReleases/7486-16)) | response |
| 2020-01 | Sentenced to one year of home incarceration ([The National](https://thenationalnews.com/business/markets/british-flash-crash-trader-sentenced-to-home-incarceration-for-one-year-1.971096)) | response |
| 2023-12-01 | Preliminary order of forfeiture, \$570,557.14 ([DOJ](https://www.justice.gov/criminal/criminal-vns/united-states-v-navinder-singh-sarao)) | response |

Key addresses: none — no on-chain component.

## Root-cause evidence

- **Technique:** none — traditional-finance futures case
- **Source:** <https://www.cftc.gov/PressRoom/PressReleases/7486-16>; <https://www.justice.gov/criminal/criminal-vns/united-states-v-navinder-singh-sarao>
- **Source type:** government
- **Confidence:** confirmed
- **Evidence:** Sarao admitted the CFTC's findings and pleaded guilty to wire fraud and spoofing. The mechanism (spoof orders placed by an automated layering program and other tactics) is stated in the consent order. How much the 2010-05-06 activity contributed to the crash is, per the CFTC order, a contribution to an order-book imbalance, not the sole cause.

## Public references

- CFTC, "Federal Court in Chicago Orders U.K. Resident Navinder Singh Sarao to Pay More than $38 Million in Monetary Sanctions for Price Manipulation and Spoofing" (2016-11-17): <https://www.cftc.gov/PressRoom/PressReleases/7486-16>
- U.S. Department of Justice, Criminal Division, "United States v. Navinder Singh Sarao" case page: <https://www.justice.gov/criminal/criminal-vns/united-states-v-navinder-singh-sarao>
- The National, "British flash crash trader sentenced to home incarceration for one year" (2020-01-29): <https://thenationalnews.com/business/markets/british-flash-crash-trader-sentenced-to-home-incarceration-for-one-year-1.971096>
