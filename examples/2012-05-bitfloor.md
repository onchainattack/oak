# Bitfloor exchange hot-wallet compromise — Bitcoin — 2012-09 (reported 2012-09-05)

**Loss:** approximately 24,000 BTC (~\$250,000 at the time) stolen after attackers compromised Bitfloor servers and reached an unencrypted backup of the wallet keys; the coins were virtually all of the exchange's currency reserves `[bfregister]``[bfbitdef]`.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing Vendor Compromise — primary; the exchange's wallet-server infrastructure was the signing surface; Bitfloor was the custodian, and the custodial hot-wallet operational security was the failure surface — unencrypted backup of wallet keys on a server accessible to the attacker). **OAK-T15.003** (Operator Endpoint / Infrastructure Compromise — the attacker gained access to Bitfloor's wallet-server infrastructure via an unsecured server hosting the unencrypted key backup).
**Attribution:** **pseudonymous**. Bitfloor founder Roman Shtylman said the breach was his fault: the backup was made after a manual upgrade and he left the keys in an unencrypted area on disk `[bfregister]`. The attacker's identity was not established in the cited sources.
**Key teaching point:** **Bitfloor is the earliest documented US-based Bitcoin exchange hot-wallet compromise and the canonical 2012 worked example of T8.001 — an unencrypted key backup on an insecure server produced the full hot-wallet drain.** The case established the operational security pattern (unencrypted key backup → server compromise → hot-wallet drain) that would recur across the 2013-2016 exchange-hack era (Bitstamp 2015, Bter 2015, Bitfinex 2016) until cold-storage and hardware-security-module (HSM) architectures became standard.
**Corrected 2026-10-11:** Date moved from 2012-05-02 to September 2012 (reported 2012-09-05); removed the unsupported single-transaction, 'fourth-largest', repayment-pledge and 2013 bank-closure claims; the cause is per Shtylman an unencrypted key backup left on disk after an upgrade.

## Summary

Bitfloor was a US-based Bitcoin exchange run by Roman Shtylman. It was one of the earliest Bitcoin-fiat exchanges serving US customers and was a US-based Bitcoin exchange.

In early September 2012 (reports date from 2012-09-05), attackers compromised a few Bitfloor servers and reached an unencrypted backup of the wallet keys, losing approximately 24,000 BTC, virtually all of the exchange's currency reserves `[bfregister]`. Earlier text dated this 2012-05-02; sources found date it September 2012.

The cited sources do not say how many transactions were used.

Bitfloor paused exchange operations after the loss; US dollar accounts and trade records were unaffected, and Shtylman warned that he might have to shut the exchange down fully and begin repaying accounts if no other option worked `[bfregister]`. Earlier text on later resumption, repayment commitments and a 2013 shutdown after a bank closure was not supported by the sources found and has been removed.

The incident is the earliest-documented US-exchange hot-wallet compromise involving unencrypted key backup as the load-bearing operational security failure, establishing the T8.001 pattern that would recur across the exchange ecosystem for the next five years until cold-storage architectures (multi-signature, HSM-backed signing, geographically distributed key shards) became industry standard.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2011–2012 | Bitfloor operates as a US Bitcoin exchange; majority of user funds held in hot wallet; wallet keys backed up unencrypted to a server | T8.001 (standing surface) |
| 2012-09 | Attacker compromises Bitfloor's wallet-server infrastructure; discovers unencrypted key backup; extracts hot-wallet signing keys | T15.003 (infrastructure compromise) + T8.001 (unencrypted key backup) |
| 2012-09 | ~24,000 BTC drained `[bfregister]` | T11.001 (signing-infrastructure compromise) |
| 2012-09-05 | Press reports the breach; exchange operations paused `[bfregister]` | (incident response) |

## Realised extraction

Approximately 24,000 BTC (~\$250,000 at the time) `[bfregister]`. Recovery and repayment outcomes are not established in the cited sources.

## Public references

- Bitcoin Talk community forensic analysis of the 24,000 BTC draining transaction
- Early Bitcoin exchange operational security literature (post-2012 incident analysis)
- See `techniques/T11.001-third-party-signing-vendor-compromise.md`, `techniques/T8.001-*.md`, `techniques/T15.003-*.md`
- `[bfregister]` — The Register, "Bitcoin exchange shuts after heist" (2012-09-05): <https://www.theregister.com/2012/09/05/bitfloor_heist/>
- `[bfbitdef]` — Bitdefender HotForSecurity, "Bitfloor loses \$250,000 worth of bitcoins in hacker attack" (2012-09): <https://www.bitdefender.com/en-au/blog/hotforsecurity/bitfloor-loses-250000-worth-of-bitcoins-in-hacker-attack>
- `[bfnbc]` — NBC News, "\$250,000 worth of bitcoins stolen in net heist" (2012-09): <https://www.nbcnews.com/technolog/250-000-worth-bitcoins-stolen-net-heist-980871>
