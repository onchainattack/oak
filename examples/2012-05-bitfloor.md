# Bitfloor exchange hot-wallet compromise — Bitcoin — 2012-05-02

**Loss:** approximately 24,000 BTC (~$250,000 at May 2012 prices) stolen from Bitfloor's Bitcoin hot wallet via a compromise of the exchange's wallet-server infrastructure. The attacker gained access to an unencrypted backup of Bitfloor's wallet keys, extracted the hot-wallet signing keys, and drained the hot wallet in a single transaction.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing Vendor Compromise — primary; the exchange's wallet-server infrastructure was the signing surface; Bitfloor was the custodian, and the custodial hot-wallet operational security was the failure surface — unencrypted backup of wallet keys on a server accessible to the attacker). **OAK-T15.003** (Operator Endpoint / Infrastructure Compromise — the attacker gained access to Bitfloor's wallet-server infrastructure via an unsecured server hosting the unencrypted key backup).
**Attribution:** **pseudonymous**. Bitfloor founder Roman Shtylman disclosed the incident publicly on the Bitcoin Talk forum; the attacker's identity was never determined.
**Key teaching point:** **Bitfloor is the earliest documented US-based Bitcoin exchange hot-wallet compromise and the canonical 2012 worked example of T8.001 — an unencrypted key backup on an insecure server produced the full hot-wallet drain.** The case established the operational security pattern (unencrypted key backup → server compromise → hot-wallet drain) that would recur across the 2013-2016 exchange-hack era (Bitstamp 2015, Bter 2015, Bitfinex 2016) until cold-storage and hardware-security-module (HSM) architectures became standard.

## Summary

Bitfloor was a US-based Bitcoin exchange founded in 2011 by Roman Shtylman, operating from New York. It was one of the earliest Bitcoin-fiat exchanges serving US customers and was the fourth-largest Bitcoin exchange by reported volume at the time of the incident.

On 2012-05-02, an attacker gained access to Bitfloor's wallet-server infrastructure and discovered an unencrypted backup of the exchange's Bitcoin hot wallet keys. The backup contained the private keys for the exchange's operational hot wallet, which held approximately 24,000 BTC (essentially all customer deposits — Bitfloor, like most early exchanges, held the majority of user funds in a single hot wallet rather than cold storage).

The attacker used the extracted keys to sign and broadcast a single transaction transferring the full hot-wallet balance to an attacker-controlled address. The transaction was irreversible by Bitcoin consensus.

Bitfloor founder Roman Shtylman publicly disclosed the incident on the Bitcoin Talk forum within hours, suspending exchange operations. Shtylman committed to repaying affected users from personal funds and eventual exchange revenue, distinguishing Bitfloor from the many early exchange hacks where the operator simply disappeared (cf. MyBitcoin 2011, Sheep Marketplace 2013). Bitfloor later resumed limited operations but never regained its pre-hack volume and eventually ceased operations in 2013 after its US banking partner (a credit union) was ordered by regulators to close Bitfloor's account.

The incident is the earliest-documented US-exchange hot-wallet compromise involving unencrypted key backup as the load-bearing operational security failure, establishing the T8.001 pattern that would recur across the exchange ecosystem for the next five years until cold-storage architectures (multi-signature, HSM-backed signing, geographically distributed key shards) became industry standard.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2011–2012 | Bitfloor operates as a US Bitcoin exchange; majority of user funds held in hot wallet; wallet keys backed up unencrypted to a server | T8.001 (standing surface) |
| 2012-05-02 | Attacker compromises Bitfloor's wallet-server infrastructure; discovers unencrypted key backup; extracts hot-wallet signing keys | T15.003 (infrastructure compromise) + T8.001 (unencrypted key backup) |
| 2012-05-02 T+hours | Attacker signs and broadcasts single transaction draining ~24,000 BTC from hot wallet | T11.001 (signing-infrastructure compromise) |
| 2012-05-02 onward | Shtylman publicly discloses on Bitcoin Talk; commits to user repayment; exchange operations suspended | (incident response) |
| 2013 | Bitfloor ceases operations after US banking relationship terminated | (regulatory banking closure) |

## Realised extraction

Approximately 24,000 BTC (~$250,000 at May 2012 prices; ~$500M-$1B at 2024-2025 Bitcoin prices). Recovery was zero at the on-chain layer; Shtylman committed to off-chain repayment to affected users from personal/exchange resources.

## Public references

- Roman Shtylman, Bitfloor incident disclosure on Bitcoin Talk forum, May 2012
- Bitcoin Talk community forensic analysis of the 24,000 BTC draining transaction
- Early Bitcoin exchange operational security literature (post-2012 incident analysis)
- See `techniques/T11.001-third-party-signing-vendor-compromise.md`, `techniques/T8.001-*.md`, `techniques/T15.003-*.md`
