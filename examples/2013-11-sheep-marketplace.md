# Sheep Marketplace exit scam — Bitcoin — 2013-11 to 2013-12

**Loss:** between approximately 39,000 BTC and 96,000 BTC (estimates vary across reporting sources) stolen from Sheep Marketplace users via operator-side theft. At the 2013-11 Bitcoin price of approximately \$500-\$1,000/BTC, the loss equates to approximately \$20M-\$96M at then-prevailing exchange rates. The operator-controlled address that received the stolen BTC was publicly identified on the Bitcoin blockchain by the Sheep Marketplace user community; the address received approximately 39,000-40,000 BTC in the single largest identifiable transfer block associated with the exit. No material recovery.
**OAK Techniques observed:** **OAK-T11.005.002** (Fake-Custodian / Fake-Asset-Manager Fraud — the Sheep Marketplace operator presented the platform as a legitimate darknet marketplace with the normal custody-and-escrow assurances of the darknet-marketplace model, but the "escrow" was entirely at the operator's discretion; the platform was a fake-custodian vehicle from which the operator could exit with user-held Bitcoin at will). **OAK-T5.005** (Treasury-Management Exit — the operator exercised legitimate-appearing authority over platform-held escrow balances to execute a single large exit event, draining user deposits held in the marketplace's Bitcoin escrow wallets; structurally the earliest cleanly-documented darknet-marketplace exit-scam pattern).
**Attribution:** **pseudonymous**. The Sheep Marketplace operator operated under pseudonyms on darknet-marketplace forums and was never publicly identified. No criminal charges, indictment, or law-enforcement disposition names the Sheep Marketplace operator at the OAK v0.1 cutoff. The case sits cleanly in the genuinely-unattributed segment of the 2013 darknet-marketplace record.
**Key teaching point:** **Sheep Marketplace is the canonical 2013 worked example of the darknet-marketplace exit scam — the pattern in which a darknet-marketplace operator accumulates user escrow deposits over months of platform operation, then exits with the entire escrow balance in a single event, blaming the loss on an external compromise while the on-chain evidence indicates operator-side theft. The case is the earliest cleanly-documented instance of the structurally-recurrent T11.005.002 + T5.005 chain in the darknet-marketplace context, predating the Evolution Marketplace exit (2015) and setting the template for darknet-marketplace exit scams that continued through the 2014-2020 record.**

## Summary

Sheep Marketplace launched in approximately early-to-mid 2013 as a Tor-hidden-service darknet marketplace positioned as a successor to Silk Road after the October 2013 takedown. The platform operated the standard darknet-marketplace model: buyers deposited Bitcoin into platform-controlled escrow wallets for each transaction, the platform held Bitcoin in escrow until the buyer confirmed receipt of the purchased goods, and the operator deducted a commission on each transaction. By November 2013, the platform had accumulated a substantial user base and escrow balance, with user forums and darknet-marketplace discussion boards estimating the platform's escrow holdings in the tens of thousands of BTC.

In late November 2013, the operator disabled withdrawals and claimed the marketplace had been hacked. The operator's public statements attributed the loss to a vendor who had discovered a vulnerability allowing them to drain Bitcoin from user escrow accounts. However, community-driven blockchain analysis — conducted by Sheep Marketplace users on darknet forums within days of the shutdown — traced the stolen Bitcoin to a single operator-controlled address that had received the aggregated funds in a pattern inconsistent with a vendor-side exploit and consistent with an operator-side exit. The operator disappeared and the marketplace never returned.

The Sheep Marketplace exit is structurally the earliest cleanly-documented darknet-marketplace exit scam. The pattern — operator accumulates user escrow deposits, exits with the balance in a single event, blames external compromise, and disappears — recurs at the Evolution Marketplace (2015), AlphaBay (2017, though the AlphaBay takedown was a law-enforcement operation rather than an exit scam), and across the broader darknet-marketplace record. Sheep Marketplace is the canonical 2013 anchor for the darknet-marketplace operator-exit class.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2013 early-to-mid | Sheep Marketplace launches as Tor-hidden-service darknet marketplace; positioned as post-Silk Road successor | T11.005.002 (stand-up of fake-custodian platform) |
| 2013-03 to 2013-11 | Sheep Marketplace accumulates user base and escrow balance; operator controls all user-deposited Bitcoin in platform wallets | T11.005.002 (custodian-fraud accumulation phase) |
| 2013-11 late | Operator disables withdrawals; claims marketplace was hacked by a vendor exploiting a vulnerability | (operator misdirection) |
| 2013-11 to 2013-12 | Community-driven blockchain analysis traces ~39,000-40,000 BTC to a single operator-controlled address; pattern inconsistent with vendor exploit, consistent with operator exit | T5.005 (operator exit with escrow-held user deposits) |
| 2013-12 | Operator disappears; forum accounts and platform infrastructure go silent; no recovery | (operator disappearance) |

## Realised extraction

Between ~39,000 and ~96,000 BTC (estimates vary), approximately \$20M-\$96M at then-prevailing BTC exchange rates. No material on-chain recovery; no law-enforcement seizure; no operator identification to date.

## Public references

- Sheep Marketplace user-community blockchain analysis threads on darknet forums (November-December 2013) — primary-source community forensic work tracing the operator-controlled Bitcoin address
- `[coindesksheep2013]` — CoinDesk. *Sheep Marketplace Scam: 96,000 BTC Stolen in Alleged Exit Scam.* December 2013; contemporaneous English-language press coverage
- Darknet-marketplace community discussion board archives documenting the Sheep Marketplace exit and the community's blockchain-forensic response (2013-2014)
- Evolution Marketplace exit scam (2015) — structurally adjacent case cross-referenced for darknet-marketplace exit-scam pattern continuity
