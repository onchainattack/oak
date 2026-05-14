# Vulcan Forged wallet-server compromise — Polygon/Ethereum — December 2021

**Loss:** approximately $140M across the PYR token market-cap impact and 148 affected NFT collector wallets. The attacker extracted 96 Venly-hosted wallet private keys from Vulcan Forged's centralised wallet server and drained the corresponding wallets of PYR tokens and Vulcan Forged NFT assets.
**OAK Techniques observed:** OAK-T11.001 (Third-Party Signing Vendor Compromise) — primary; the attacker breached Vulcan Forged's centralised wallet server, extracting 96 Venly-hosted wallet private keys. OAK-T5.001 (Hard LP / Treasury Drain) — structurally co-occurring; the extracted keys allowed direct transfer of PYR tokens and NFTs from the 148 affected wallets.
**Attribution:** pseudonymous; the attacker has not been publicly identified. Vulcan Forged refunded the affected users approximately $140M from its treasury within days of the incident.
**Key teaching point:** Centralised wallet-server architectures where the protocol operator stores user wallet private keys in a single server-side database create a concentrated extraction surface — the compromise of a single server yields access to the full set of stored private keys, and the resulting extraction surfaces (wallet-held tokens, NFTs, staked positions) are uniformly drained in a single incident window. The Venly-as-custodian topology adds a shared-responsibility dimension: the Venly wallet infrastructure was not breached, but Venly-hosted private keys stored on Vulcan Forged's own server were the extraction target.

## Summary

In December 2021, an attacker compromised Vulcan Forged's centralised wallet server and extracted 96 Venly-hosted wallet private keys belonging to 148 NFT collector wallets. Vulcan Forged is a blockchain gaming and NFT platform operating across Polygon and Ethereum, and its user wallets were hosted via Venly (formerly Arkane Network), a wallet-as-a-service provider. The wallet server maintained a database of user wallet private keys on Vulcan Forged's own infrastructure — the Venly wallet infrastructure was not itself breached, but the keys hosted through Venly were stored in a server-side database under Vulcan Forged's direct operational control.

The attacker drained the affected wallets of PYR tokens and NFT holdings with an aggregate value of approximately $140M at the time of the incident. The PYR token price dropped sharply on the news, contributing to the total loss figure. Vulcan Forged responded within days by refunding the full ~$140M to affected users from its treasury — one of the largest operator-side treasury-funded reimbursements in the 2021 DeFi/Gaming incident record.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-12-13 (approx) | Attacker breaches Vulcan Forged's centralised wallet server; extracts 96 Venly-hosted private keys for 148 NFT collector wallets | T11.001 (initial access) |
| 2021-12-13 | Attacker drains PYR tokens and NFT assets from the 148 affected wallets | T5.001 (extraction) |
| 2021-12-13 | Vulcan Forged team identifies the breach; publicly discloses via official channels | (operator response) |
| 2021-12-13 to 2021-12-15 | Vulcan Forged refunds ~$140M to affected users from its treasury | (recovery — treasury-funded reimbursement) |

## Public references

- Vulcan Forged official incident statement and refund announcement, December 2021 — `[vulcanforgedpostmortem2021]`.
- Rekt News public-facing summary — `[rektvulcanforged2021]`.
- Venly (Arkane Network) wallet architecture documentation — `[venlywalletarch2021]`.
- Cross-reference: T11.001 (Third-Party Signing Vendor Compromise) at `techniques/T11.001-third-party-signing-vendor-compromise.md`.
- Cross-reference: T5.001 (Hard LP / Treasury Drain) at `techniques/T5.001-hard-lp-treasury-drain.md`.

## Discussion

Vulcan Forged illustrates the T11.001 wallet-server concentration surface: a single server-side database containing private keys for a large user population creates a single-point-of-compromise extraction surface that an attacker converts into a multi-wallet simultaneous drain. The Venly-as-custodian topology is structurally interesting because it involves a third-party wallet provider whose infrastructure was not compromised — the keys were stored on Vulcan Forged's server, not Venly's, placing the security failure in the protocol-operator's infrastructure layer rather than the wallet-vendor layer.

The treasury-funded refund (~$140M) is one of the largest operator-funded reimbursements in the 2021 incident record and establishes Vulcan Forged as a reference case for the "operator absorbs loss from treasury" recovery pattern, alongside EasyFi April 2021 (partial), bZx February 2020 (partial compensation pool), and Vee Finance September 2021 (revenue-funded compensation pool).
