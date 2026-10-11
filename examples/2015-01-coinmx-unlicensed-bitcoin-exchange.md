# Coin.mx unlicensed Bitcoin exchange prosecution — Bitcoin — 2015-07 (arrests)

**Loss:** $0 direct on-chain loss to exchange customers (law-enforcement action against operators, not a hack). Prosecutors said Coin.mx processed over \$10 million in illegal Bitcoin transactions, operated October 2013 to July 2015 `[bm17]`. At arrest, reporting said at least \$1.8 million had been exchanged for bitcoin for tens of thousands of customers between October 2013 and January 2015 `[cd15]`. **Recovery:** not applicable; forfeiture and restitution were still to be set at a September hearing as of mid-2017 `[bm17]`.
**OAK Techniques observed:** **OAK-T6.007** (Trust-Substrate Shift / Vendor-Promise Revocation — regulatory-action variant. The Coin.mx criminal prosecution established that Bitcoin exchanges operating in the United States without state money-transmitter licenses and federal FinCEN registration face federal criminal liability. The trust substrate shifted from "Bitcoin exchanges can operate without traditional financial licensing" to "Bitcoin exchanges are money transmitters subject to federal criminal prosecution." One of the US federal criminal cases applying the money-transmitter statute to a Bitcoin exchange). **OAK-T15.005** (Regulatory Enforcement Action — the criminal prosecution of Coin.mx operators was a federal law-enforcement action targeting the exchange's unlicensed-operation surface). **OAK-T7.002** (CEX Off-Ramp Laundering — Coin.mx was allegedly used to process ransomware payments and other illicit proceeds; the case established the structural connection between unlicensed exchanges and money-laundering facilitation that would recur at BTC-e (2017) and subsequent exchange-enforcement actions).
**Attribution:** **confirmed** via US federal prosecution in the Southern District of New York. Anthony Murgio and Yuri Lebedev were arrested by the FBI in July 2015 `[bm17]``[cd15]`. Murgio pleaded guilty to three counts (reported plea date 9 January 2017) and received 66 months (5.5 years) in prison; prosecutors had sought 10 to 12 years `[bm17]``[hns17]`. Prosecutors described the exchange as owned by Gery Shalon, accused of orchestrating a large hacking scheme including JPMorgan Chase `[fort16]``[bm17]`.
**Key teaching point:** **Coin.mx is an early US federal prosecution applying unlicensed-money-transmitter and money-laundering charges to a Bitcoin exchange that knowingly sold bitcoin to ransomware victims and criminal proceeds.** Operating an exchange without state licensing or FinCEN registration, and without filing suspicious activity reports, carries criminal exposure irrespective of how the asset is classified.

**Corrected 2026-10-11:** the date is the July 2015 arrests (not a 2015-01-26 indictment unsealing); Murgio pleaded guilty rather than being convicted at trial; the "first-ever" claim, the Preet Bharara and Secret Service details, and the claim that a defendant was connected to the JPMorgan breach (the exchange's alleged owner, Gery Shalon, was) were corrected or removed.

## Summary

Coin.mx was an unlicensed bitcoin exchange run by Anthony Murgio from October 2013 to July 2015, which prosecutors said was owned by Gery Shalon `[bm17]``[fort16]`. It operated without state money-transmitter licensing or FinCEN registration. In July 2015 the FBI arrested Murgio and Yuri Lebedev in Florida on charges of operating an unlicensed money-transmitting business, and Murgio also on money laundering `[cd15]`. The FBI said Murgio sold bitcoins to victims of ransomware such as Cryptowall and never filed suspicious activity reports on those transactions `[cd15]`.

Per Fortune, the indictment alleged the group took control of a New Jersey credit union in 2014 by paying \$150,000 in bribes to its chairman, a pastor, to avoid scrutiny; Murgio's father Michael pleaded guilty to a false-statement charge related to that credit union `[fort16]`. Shalon was later extradited from Israel (June 2016) in connection with the wider hacking scheme (JPMorgan Chase, E-Trade, Dow Jones among victims) `[fort16]``[bm17]`. Murgio was sentenced in June 2017 to 66 months, with three years of supervised release `[hns17]``[bm17]`.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2013-10 | Coin.mx begins operating `[bm17]` | |
| 2015-07 | FBI arrests Murgio and Lebedev; ransomware-victim sales alleged `[cd15]``[bm17]` | T15.005 |
| 2016-10 | Michael Murgio pleads guilty; Anthony Murgio, Lebedev and others plead not guilty `[fort16]` | |
| 2017-01-09 | Anthony Murgio pleads guilty (reported date) `[bm17]` | |
| 2017-06 | Sentenced to 66 months `[hns17]``[bm17]` | T6.007 |

## Realised extraction

No on-chain customer-fund loss. The case is a criminal prosecution of exchange operators.

## Public references

- `[bm17]` — Bitcoin Magazine, "Operator of illegal Bitcoin exchange Coin.mx sentenced to prison" (2017-06-30): <https://bitcoinmagazine.com/culture/operator-illegal-bitcoin-exchange-coinmx-sentenced-prison>
- `[hns17]` — Help Net Security, "Illegal Bitcoin exchange operator gets 66-month prison sentence" (2017-06-28): <https://www.helpnetsecurity.com/2017/06/28/illegal-bitcoin-exchange/>
- `[cd15]` — CoinDesk, "Coin.mx operators arrested for running illegal bitcoin exchange" (2015-07): <https://www.coindesk.com/coin-mx-arrested-operating-illegal-bitcoin-exchange/>
- `[fort16]` — Fortune, "Florida man pleads guilty in case linked to J.P. Morgan hacking probe" (2016-10-27): <https://fortune.com/2016/10/27/florida-man-pleads-guilty-in-case-linked-to-j-p-morgan-hacking-probe>

## Discussion

Coin.mx shows the regulatory-action variant of T6.007: an unlicensed exchange that sold bitcoin to ransomware victims and criminal customers faced criminal liability for unlicensed money transmission and laundering. Earlier unsourced statements here that the case set the precedent for later enforcement (BTC-e, Bitzlato, Binance) and shaped all US exchange compliance are interpretation, not sourced fact.
