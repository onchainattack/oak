> **MERGED 2026-11-27 into `examples/2016-01-cryptsy-exchange-collapse.md`** — a duplicate entry for the same incident. Not part of the OAK corpus; kept for the record.

**Merged into:** 2016-01-cryptsy-exchange-collapse

# Cryptsy — customer bitcoin stolen 2014-07-29, exchange collapse and operator default judgment — Bitcoin / altcoin exchange — 2014-07-29

**Loss:** the court declared **11,325.0961 BTC** "stolen from Cryptsy customers on July 29, 2014" to be property of the customer class ([CoinDesk, 2017-07-28](https://www.coindesk.com/markets/2017/07/28/82-million-court-orders-default-judgment-against-cryptsy-ceo)). The same order found the CEO liable to the class for **\$8,200,000** (default judgment, order dated 2017-07-27) ([CoinDesk](https://www.coindesk.com/markets/2017/07/28/82-million-court-orders-default-judgment-against-cryptsy-ceo)). Whether any of it was recovered is undisclosed in the sources read; the class's lawyer said work was under way to gain control of 11 bitcoin wallet addresses listed in the order ([CoinDesk](https://www.coindesk.com/markets/2017/07/28/82-million-court-orders-default-judgment-against-cryptsy-ceo)).

**OAK Techniques observed:** **OAK-T11.005** (Operator-side Fake-Platform Fraud — *primary, by court liability finding only*). A US court held the CEO liable to the customer class by default after he did not respond, while he has denied stealing user funds ([CoinDesk](https://www.coindesk.com/markets/2017/07/28/82-million-court-orders-default-judgment-against-cryptsy-ceo)). How the bitcoin left the exchange is undisclosed in that source. See [`techniques/T11.005-operator-side-fake-platform-fraud.md`](../techniques/T11.005-operator-side-fake-platform-fraud.md).

**Attribution:** **confirmed (civil liability only)** — Paul Vernon, Cryptsy's CEO, was held liable in a default judgment; he did not respond to the allegations and has denied stealing user funds ([CoinDesk](https://www.coindesk.com/markets/2017/07/28/82-million-court-orders-default-judgment-against-cryptsy-ceo)). The theft method and any external actor are undisclosed.

**Key teaching point:** **Exchange balances shown in a front end are not proof of reserves; a customer with funds on an exchange had no way to check from outside whether the coins were still there.** Cryptsy collapsed in January 2016 after customer complaints grew, about 18 months after the date the court gives for the theft ([CoinDesk](https://www.coindesk.com/markets/2017/07/28/82-million-court-orders-default-judgment-against-cryptsy-ceo)).

## Summary

Cryptsy was a Florida-based exchange run by Paul Vernon. It collapsed in January 2016 after growing customer complaints, a class action was filed shortly afterwards and the court moved to place the exchange into receivership in April 2016 ([CoinDesk](https://www.coindesk.com/markets/2017/07/28/82-million-court-orders-default-judgment-against-cryptsy-ceo)). On 2017-07-27 Judge Kenneth Marra entered a default judgment of \$8.2M against Vernon and declared 11,325.0961 BTC stolen from customers on 2014-07-29 to be property of the plaintiff class ([CoinDesk](https://www.coindesk.com/markets/2017/07/28/82-million-court-orders-default-judgment-against-cryptsy-ceo)). Vernon is believed to be living in Asia ([CoinDesk](https://www.coindesk.com/markets/2017/07/28/82-million-court-orders-default-judgment-against-cryptsy-ceo)).

## Timeline (UTC)

Times are not given in the source; dates only. Stages: theft, collapse, response.

| When | What happened | OAK |
|---|---|---|
| 2014-07-29 | 11,325.0961 BTC stolen from Cryptsy customers, per the court order; how is undisclosed ([CoinDesk](https://www.coindesk.com/markets/2017/07/28/82-million-court-orders-default-judgment-against-cryptsy-ceo)) | **T11.005** |
| 2014-07 to 2016-01 | Where the coins went: undisclosed in the source read; the order lists 11 bitcoin wallet addresses the class sought to control, not printed in the article | — |
| 2016-01 | Cryptsy collapses after customer complaints grow ([CoinDesk](https://www.coindesk.com/markets/2017/07/28/82-million-court-orders-default-judgment-against-cryptsy-ceo)) | response |
| 2016-04 | Court moves to place the exchange into receivership; class action already filed ([CoinDesk](https://www.coindesk.com/markets/2017/07/28/82-million-court-orders-default-judgment-against-cryptsy-ceo)) | response |
| 2017-07-27 | Default judgment, \$8.2M, and declaration over the 11,325.0961 BTC ([CoinDesk](https://www.coindesk.com/markets/2017/07/28/82-million-court-orders-default-judgment-against-cryptsy-ceo)) | response |

Key addresses: undisclosed. The 11 wallet addresses are listed in the court order but not printed in the article.

## Root-cause evidence

- **Technique:** OAK-T11.005
- **Source:** <https://www.coindesk.com/markets/2017/07/28/82-million-court-orders-default-judgment-against-cryptsy-ceo>
- **Source type:** news (reporting a court order)
- **Confidence:** reported
- **Evidence:** the article reports a default judgment and a court declaration that the bitcoin was stolen from customers on 2014-07-29. A default judgment is not a trial of the facts, and the defendant denies the theft. The mechanism is undisclosed.

## Public references

- CoinDesk, "$8.2 Million: Court Orders Default Judgment Against Cryptsy CEO" (2017-07-28): <https://www.coindesk.com/markets/2017/07/28/82-million-court-orders-default-judgment-against-cryptsy-ceo>
