# Sheep Marketplace exit scam — Bitcoin — 2013-11 to 2013-12

**Loss:** Blockchain tracking showed a flow of 39,918 BTC matching Sheep Marketplace's holdings, about \$40 million at roughly \$1,086/BTC (`[nextgovsheep]`). The operators claimed a vendor stole only 5,400 BTC (`[nextgovsheep]`). Larger figures (a Reddit user's claim of about 96,000 BTC laundered) are unverified user claims (`[welivesheep]`). No recovery reported.
**OAK Techniques observed:** **OAK-T11.005.002** (Fake-Custodian / Fake-Asset-Manager Fraud — the Sheep Marketplace operator presented the platform as a legitimate darknet marketplace with the normal custody-and-escrow assurances of the darknet-marketplace model, but the "escrow" was entirely at the operator's discretion; the platform was a fake-custodian vehicle from which the operator could exit with user-held Bitcoin at will). **OAK-T5.005** (Treasury-Management Exit — the operator exercised legitimate-appearing authority over platform-held escrow balances to execute a single large exit event, draining user deposits held in the marketplace's Bitcoin escrow wallets; structurally the earliest cleanly-documented darknet-marketplace exit-scam pattern).
**Attribution:** **pseudonymous**. The operator was never publicly identified in the cited reporting; authorities did not comment on whether they were investigating (`[nextgovsheep]`). A Reddit user's claim that the suspect was in the Czech Republic is unverified (`[welivesheep]`). The case sits cleanly in the genuinely-unattributed segment of the 2013 darknet-marketplace record.
**Corrected 2026-10-11:** Loss restated as 39,918 BTC (~\$40M) per blockchain tracking, not 39,000-96,000 BTC / \$20M-\$96M; the operator claim was that a vendor (EBOOK101) stole 5,400 BTC; the 96,000 BTC figure is an unverified user claim.
**Key teaching point:** **Sheep Marketplace is the canonical 2013 worked example of the darknet-marketplace exit scam — the pattern in which a darknet-marketplace operator accumulates user escrow deposits over months of platform operation, then exits with the entire escrow balance in a single event, blaming the loss on an external compromise while the on-chain evidence indicates operator-side theft. The case is the earliest cleanly-documented instance of the structurally-recurrent T11.005.002 + T5.005 chain in the darknet-marketplace context, predating the Evolution Marketplace exit (2015) and setting the template for darknet-marketplace exit scams that continued through the 2014-2020 record.**

## Summary

Sheep Marketplace was a Tor-hidden-service darknet marketplace (the launch date is not established in the cited sources). The platform operated the standard darknet-marketplace model: buyers deposited Bitcoin into platform-controlled escrow wallets for each transaction, the platform held Bitcoin in escrow until the buyer confirmed receipt of the purchased goods, and the operator deducted a commission on each transaction. By late November 2013 its holdings were about 39,918 BTC per blockchain tracking (`[nextgovsheep]`).

In late November 2013 users reported withdrawals blocked for over a week; the site's homepage then said a vendor, EBOOK101, had "found bug in system and stole 5400 BTC" on 2013-11-21 and that remaining coins would be distributed to users who submitted emergency addresses (`[welivesheep]`, `[nextgovsheep]`). Blockchain.info showed a money flow of 39,918 BTC matching the marketplace's holdings, and several outlets treated the vendor story as a cover story (`[nextgovsheep]`). A Reddit user followed the suspect's coins through a tumbler (`[welivesheep]`). Users reported they still could not retrieve funds (`[nextgovsheep]`).

The Sheep Marketplace exit is an early darknet-marketplace exit-scam case (the claim it is the earliest is unverified). The pattern — operator accumulates user escrow deposits, exits with the balance in a single event, blames external compromise, and disappears — recurs at the Evolution Marketplace (2015), AlphaBay (2017, though the AlphaBay takedown was a law-enforcement operation rather than an exit scam), and across the broader darknet-marketplace record. Sheep Marketplace is the canonical 2013 anchor for the darknet-marketplace operator-exit class.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2013-11-21 | Date the operators say a vendor (EBOOK101) stole 5,400 BTC (`[welivesheep]`) | (operator claim) |
| 2013-11 late | Withdrawals blocked for more than a week (`[nextgovsheep]`) | (operator misdirection) |
| 2013-12-02 | Site shows the vendor-theft message; blockchain tracking shows 39,918 BTC flow matching holdings (`[nextgovsheep]`) | T5.005 (operator exit with escrow-held user deposits) |

## Realised extraction

39,918 BTC (~\$40M) per `[nextgovsheep]`. No recovery or operator identification in the cited reporting.

## Public references

- `[nextgovsheep]` — Nextgov, "Bitcoin Users Lose \$40 Million in Apparent Narcotics Bazaar Heist" (2013-12-02): <https://www.nextgov.com/emerging-tech/2013/12/bitcoin-users-lose-40-million-apparent-narcotics-bazaar-heist/74669/>
- `[welivesheep]` — WeLiveSecurity, "Millions in bitcoin stolen from Sheep dark market as user flees" (2013-12-03): <https://www.welivesecurity.com/2013/12/03/millions-in-bitcoin-stolen-from-sheep-dark-market-as-user-flees/>
- Evolution Marketplace exit scam (2015) — structurally adjacent case cross-referenced for darknet-marketplace exit-scam pattern continuity
