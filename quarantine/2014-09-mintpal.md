> **MERGED 2026-11-27 into `examples/2014-10-moolah-alex-green-fraud.md`** — a duplicate entry for the same incident. Not part of the OAK corpus; kept for the record.

**Merged into:** 2014-10-moolah-alex-green-fraud

# MintPal — exchange taken over by Moolah, relaunched, then reported "hacked" of all bitcoin — altcoin exchange — 2014-10

**Loss:** **3,700 BTC** reported stolen from MintPal ([SiliconANGLE, 2015-02-23](https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/)). SYScoin separately reported 750 BTC taken from an escrow account it held at MintPal ([SiliconANGLE](https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/)). A July 2014 VeriCoin loss was reported by MintPal; its size is undisclosed in that source. No recovery is reported.

**OAK Techniques observed:** **OAK-T11.005** (Operator-side Fake-Platform Fraud — *primary, as alleged*). After Moolah took control, MintPal said it had been hacked and all its bitcoin stolen; the community "Mintpal Justice" investigation reported the supposedly hacked bitcoin was being sold on LocalBitcoins by the former Moolah CEO ([SiliconANGLE](https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/)). See [`techniques/T11.005-operator-side-fake-platform-fraud.md`](../techniques/T11.005-operator-side-fake-platform-fraud.md).

**Attribution:** **inferred-strong, no conviction in the source read** — Ryan Kennedy (then using the name Alex Green) and a second person were arrested by UK authorities, per a SYScoin statement ([SiliconANGLE](https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/)). The article reports no sentence or court outcome. The July 2014 VeriCoin "hack" has no attribution in the source.

**Key teaching point:** **A change of exchange control is a custody event: before and after an operator takeover, check whether the deposit wallets and signing authority changed hands and withdraw what you do not need on the platform.** MintPal was taken over by Moolah, relaunched in early October 2014 with problems, and was down within about a week ([SiliconANGLE](https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/)).

## Summary

In July 2014 MintPal reported that it had been hacked and had lost a large amount of VeriCoin ([SiliconANGLE](https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/)). The exchange was then taken over by Moolah, whose CEO used the name Alex Green; Moolah received about 35% of the company and gained full control ([SiliconANGLE](https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/)). The relaunch in early October 2014 had systemic problems; about a week later the site was taken down over a critical issue, Moolah announced it was bankrupt, and MintPal said it had been hacked and all its bitcoin stolen ([SiliconANGLE](https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/)). In late October SYScoin sued in the UK High Court and won an injunction requiring repayment of its 750 BTC, which was not complied with; in February 2015 the arrests were reported ([SiliconANGLE](https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/)).

## Timeline (UTC)

Dates only; the source gives no times. Stages: entry (takeover), execution, funds, response.

| When | What happened | OAK |
|---|---|---|
| 2014-07 | MintPal reports a hack and loss of VeriCoin; size undisclosed ([SiliconANGLE](https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/)) | — |
| After 2014-07 (date undisclosed) | Moolah takes over MintPal (about 35% stake, full control) ([SiliconANGLE](https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/)) | **T11.005** |
| Early 2014-10 | Relaunch goes live with systemic problems ([SiliconANGLE](https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/)) | — |
| About one week later | Site taken down; Moolah says it is bankrupt; MintPal says all its bitcoin was stolen (3,700 BTC reported) ([SiliconANGLE](https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/)) | **T11.005** |
| After 2014-10 (dates undisclosed) | Mintpal Justice finds the coins being sold on LocalBitcoins; on-chain path undisclosed ([SiliconANGLE](https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/)) | — |
| Late 2014-10 | SYScoin wins a UK High Court injunction for repayment of 750 BTC; not complied with ([SiliconANGLE](https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/)) | response |
| 2015-02 | Arrests by UK authorities reported (article dated 2015-02-23) ([SiliconANGLE](https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/)) | response |

Key addresses: undisclosed (none printed in the source).

## Root-cause evidence

- **Technique:** OAK-T11.005
- **Source:** <https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** the article reports the takeover, the "hack" announcement, the LocalBitcoins finding by a community group and the arrests. It reports no court finding, and no on-chain trace. Whether the October loss was an external hack or operator theft is not settled by this source.

## Public references

- SiliconANGLE, "MintPal scammer Ryan Kennedy arrested in U.K. over theft of 3,700 bitcoins" (2015-02-23): <https://siliconangle.com/2015/02/23/mintpal-scammer-ryan-kennedy-arrested-in-u-k-over-theft-of-3700-bitcoins/>
