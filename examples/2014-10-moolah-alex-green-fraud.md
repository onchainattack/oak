# Moolah / Alex Green (Ryan Kennedy) Exchange Fraud — 2014-10

**Loss:** about 3,700 BTC reportedly stolen from MintPal, which Moolah's operator had bought; SYScoin separately said 750 BTC were taken from its escrow held at MintPal `[sa15]`. UK charges allege bitcoin worth over £1 million stolen during 2014 `[cd17]`. Other totals previously stated in this file (\$4M+, \$2.5M+) are unverified and removed.
**OAK Techniques observed:** **OAK-T11.005.001** (Fake-CEX / Pig-Butchering Platform — the Moolah exchange and Moopay payment-processor presented as legitimate businesses while the operator diverted customer funds to personal accounts). **OAK-T5.005** (Treasury Management Exit — the operator's control over exchange treasury enabled systematic diversion before the platform's public collapse). **OAK-T6.001** (Source-Verification Mismatch — the operator operated under a fabricated identity "Alex Green"; the real identity "Ryan Kennedy" was uncovered by community investigation and later confirmed by UK law enforcement). **OAK-T8.005** (Operational-Security Procedural Failure — the operator's identity-fabrication trail and prior-fraud history were discoverable through community OSINT investigation).
**Attribution:** **confirmed** identity — Ryan Kennedy, operating as "Alex Green", acknowledged that name was not his own and was arrested in the UK in February 2015 `[sa15]``[cd17]`. UK police charged him in June 2017 with fraud and money-laundering offences covering 2014 and he pleaded not guilty `[cd17]``[cd17b]`. No conviction on those fraud charges is found in the cited sources; his 11-year sentence was for unrelated rape convictions `[cd17]`[cj].
**Key teaching point:** **Moolah is an early early-crypto-era exchange-fraud case with an identified-and-charged operator (fraud conviction unconfirmed). The operator's pseudonym ("Alex Green") was exposed by the operator's own admission and community investigation (the Mintpal Justice effort traced stolen coins being sold on LocalBitcoins `[sa15]`) — an early demonstration of the T8.005 attribution primitives that would later scale to professional blockchain-forensics firms. The case established that the pseudonymous-operator defence is penetrable through off-chain investigative work even in the pre-blockchain-forensics era.

**Corrected 2026-10-11:** Kennedy was arrested in 2015 and charged with fraud in 2017 (pleaded not guilty); the cited sources report no fraud conviction, only an unrelated rape conviction, and the unsourced loss totals, prior-fraud-conviction and Companies House/WHOIS details were removed.**

## Summary

Ryan Kennedy, a UK national who operated under the name "Alex Green," created Moolah (a dogecoin-oriented exchange) and later bought the altcoin exchange MintPal; Moolah ran under the entity Moopay Ltd `[cd17]``[sa15]`. MintPal reported a hack of VeriCoin in July 2014 and in October 2014 said all its bitcoin had been stolen; it collapsed in late 2014 `[sa15]``[cd17]`. A group of developers who launched coins through MintPal sued him over committed funds, and SYScoin won a UK High Court injunction in late October 2014 ordering repayment of 750 BTC, which Kennedy did not comply with `[cd17]``[sa15]`. Kennedy acknowledged at the time that "Alex Green" was not his real name `[cd17]`.

The community "Mintpal Justice" investigation reported that the allegedly hacked bitcoins were being sold on LocalBitcoins `[sa15]`. Kennedy and an alleged accomplice, Chelsea Hopkins, were arrested in the UK, reported in February 2015, over the theft of about 3,700 BTC `[sa15]`. Avon and Somerset Constabulary announced fraud (Fraud Act 2006) and money-laundering (Proceeds of Crime Act 2002) charges on 29 June 2017, alleging bitcoin worth over £1 million was stolen between January and December 2014 and spent on a luxury lifestyle `[cd17]`. He pleaded not guilty at his first hearing `[cd17b]`. He was separately convicted of rape and sentenced to 11 years [cj].

Claims previously in this file of fabricated trading dashboards, a prior UK fraud conviction, Companies House/WHOIS attribution, and a fraud conviction in 2015-2016 are not supported by the cited sources and were removed.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2014-07 | MintPal reports a VeriCoin hack `[sa15]` | |
| 2014-10 | MintPal says all its bitcoin was stolen; collapses; SYScoin obtains UK High Court injunction `[sa15]` | **T5.005** |
| 2015-02 | Kennedy and Chelsea Hopkins arrested in UK `[sa15]` | **Attribution** |
| 2017-06-29 | Fraud and money-laundering charges announced `[cd17]` | |
| 2017-09 | Kennedy denies fraud charges at first hearing `[cd17b]` | |

## Realised extraction

About 3,700 BTC reported stolen from MintPal `[sa15]`; UK charges cite bitcoin worth over £1 million `[cd17]`. No customer recovery is reported in the cited sources.

## Public references

- `[sa15]` — SiliconANGLE, "MintPal scammer Ryan Kennedy arrested in U.K. over theft of 3,700 bitcoins" (2015-02-23): <https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/>
- `[cd17]` — CoinDesk, "Former Dogecoin Exchange CEO Faces Fraud Charges" (2017-07-05): <https://www.coindesk.com/markets/2017/07/05/former-dogecoin-exchange-ceo-faces-fraud-charges>
- `[cd17b]` — CoinDesk, "Moolah Exchange Founder Denies Fraud Charges in First Court Hearing" (2017-09-15): <https://www.coindesk.com/markets/2017/09/15/moolah-exchange-founder-denies-fraud-charges-in-first-court-hearing>
- `[cj]` — CoinJournal, "Ryan Kennedy Of Moolah Sentenced To 11 Years For Rape": <https://coinjournal.net/news/ryan-kennedy-convicted-rape-sentenced-11-years/>
- Cross-reference: T11.005.001 (Fake-CEX / Pig-Butchering Platform) at `techniques/T11.005.001-fake-cex-pig-butchering-platform.md`.
- Cross-reference: T8.005 (Operational-Security Procedural Failure) at `techniques/T8.005-operational-security-procedural-failure.md`.
- [`examples/2013-12-gbl-bitcoin-exchange-scam.md`](../examples/2013-12-gbl-bitcoin-exchange-scam.md) — GBL Bitcoin exchange Ponzi, 2013.
- [`examples/2023-09-jpex-hong-kong.md`](../examples/2023-09-jpex-hong-kong.md) — JPEX Hong Kong, 2023.
