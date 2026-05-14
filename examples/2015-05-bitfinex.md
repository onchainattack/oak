# Bitfinex hot-wallet compromise — Bitcoin — 2015-05-22

**Loss:** approximately 1,500 BTC (~\$330K at 2015-05 BTC price).
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing-Vendor UI / Signing-Flow Compromise — broadly construed; the exchange's internal hot-wallet signing infrastructure was the compromise surface, and the signing-flow access enabled the unauthorised transfer). **OAK-T15.003** (Operator-Endpoint Compromise — the attacker gained access to an employee's wallet-server credentials, constituting an operator-endpoint state that enabled the hot-wallet drain).
**Attribution:** **pseudonymous (no public attribution to a named group).** Bitfinex disclosed the breach but did not publicly attribute the attacker.
**Key teaching point:** **The May 2015 Bitfinex hot-wallet compromise is the immediate structural forebear of the August 2016 Bitfinex multi-signature theft and demonstrates the "recurrence pattern" that is common in CEX-targeted intrusions: a smaller hot-wallet breach tests the exchange's security perimeter; a larger follow-on breach later exploits a different surface.** This incident is distinct from the August 2016 Bitfinex hack (~119,756 BTC, ~$72M at time) which exploited the BitGo multisig architecture and is documented separately at `examples/2016-08-bitfinex.md`.

## Summary

On or around 2015-05-22, Bitfinex suffered a hot-wallet compromise in which approximately 1,500 BTC (~\$330K) was drained by an attacker who gained access to an employee's wallet-server credentials. Bitfinex disclosed the breach and confirmed that the loss was limited to the hot wallet — cold-storage reserves held by Bitfinex's then-custody arrangement were not affected.

The entry vector was described as a compromise of wallet-server access credentials belonging to a Bitfinex employee. The attacker used this access to sign and broadcast a transaction moving hot-wallet funds to an attacker-controlled address. The incident did not result in a suspension of exchange operations, and Bitfinex absorbed the loss without passing it to users.

This incident is the lesser-known precursor to the August 2016 Bitfinex hack (~119,756 BTC), which exploited Bitfinex's then-new BitGo multisig-wallet integration and is the larger and more thoroughly documented event. The May 2015 incident anchors the T11.001 + T15.003 chain in the pre-multisig Bitfinex architecture; the August 2016 incident anchors the multisig-era surface.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2015-05-22 | Attacker compromises Bitfinex employee wallet-server credentials; ~1,500 BTC drained from hot wallet | T15.003 (operator-endpoint credential compromise), T11.001 (signing-flow access) |
| 2015-05 T+ | Bitfinex discloses breach; confirms cold storage unaffected; absorbs loss | (defender response) |
| 2015-2016 | Bitfinex migrates to BitGo multisig-wallet architecture (launched 2016) | (architectural remediation — later exploited in Aug 2016) |

## Realised extraction

Approximately 1,500 BTC (~\$330K at 2015-05 prices); no confirmed recovery reported. Bitfinex absorbed the loss.

## Distinction from August 2016 Bitfinex hack

The August 2016 Bitfinex incident (~119,756 BTC, ~$72M) exploited the BitGo multisig integration and is a structurally different incident from this May 2015 event. The 2016 incident is documented at `examples/2016-08-bitfinex.md`. The May 2015 incident is included in the OAK taxonomy as the earlier, non-multisig hot-wallet breach that established the T11.001 + T15.003 chain for the Bitfinex operator surface.

## References

- Bitfinex breach disclosure and community discussions, May 2015
- Bitfinex corporate history and security-incident chronology
- BitGo multisig-integration announcement and architecture documentation, 2016
