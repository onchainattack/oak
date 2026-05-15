# Bitpoint exchange hack — Multi-asset (BTC, ETH, XRP, LTC, BCH) — 2019-07-11

**Loss:** approximately \$32M (~2.3 billion Japanese yen) from Japanese exchange Bitpoint. Both hot and cold wallets were affected: the attacker leveraged hot-wallet signing access to partially drain cold-wallet funds that had signing capability exposed through the hot-wallet infrastructure.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing-Vendor UI / Signing-Flow Compromise — broadly construed; the exchange's hot-wallet signing infrastructure was compromised, and because the cold wallet had signing capability accessible through the same compromised infrastructure, both hot and cold funds were exposed). **OAK-T8.001** (Common-Funder Cluster Reuse — the attacker's operational tradecraft displayed cluster-reuse signals: the hot-to-cold signing-access lateral movement and the subsequent laundering pattern reused infrastructure and counterparty clusters traceable across the extraction and laundering phases).
**Attribution:** **confirmed** Japanese authorities investigated but did not publicly attribute the breach to a specific threat actor.
**Key teaching point:** **The Bitpoint incident is the canonical "cold wallet is not cold when signing access traverses the hot-wallet surface" case: the exchange's cold-wallet funds were partially drained not because cold-storage keys were directly compromised, but because the cold wallet's signing authority was reachable from the compromised hot-wallet infrastructure — an architectural anti-pattern that defeats the purpose of cold-storage segmentation.** The case is a textbook illustration of why cold-wallet signing authority must be air-gapped from hot-wallet operational infrastructure, not merely stored on a separate key.

## Summary

Bitpoint, a Japanese cryptocurrency exchange operated by Remixpoint, Inc. (a Tokyo Stock Exchange-listed company), suffered a hot-wallet compromise on 2019-07-11. The attacker gained access to Bitpoint's hot-wallet signing infrastructure and drained approximately \$32M (~2.3 billion yen) across five cryptocurrencies: Bitcoin (BTC), Ethereum (ETH), XRP, Litecoin (LTC), and Bitcoin Cash (BCH).

The structural significance of the Bitpoint incident is that both hot and cold wallets were affected. The cold wallet was not directly compromised at the key-storage layer; rather, the cold wallet's signing capability was accessible through the same operator infrastructure that managed the hot wallet. Once the attacker controlled the hot-wallet signing surface, they could also exercise signing authority over cold-wallet funds — a violation of the fundamental segmentation that "cold storage" is supposed to provide.

Bitpoint suspended all services (deposits, withdrawals, trading, and new account openings) immediately upon discovering the breach. Remixpoint, the publicly listed parent company, disclosed the loss to the Tokyo Stock Exchange and committed to reimbursing affected users. The Japan FSA conducted an on-site inspection and issued a business-improvement order.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2019-07-11 | Attacker compromises Bitpoint hot-wallet signing infrastructure; drains ~$32M across BTC, ETH, XRP, LTC, BCH — including partial cold-wallet funds reachable through the hot-wallet signing surface | T11.001 (signing-flow compromise) + T8.001 (cluster-reuse pattern across extraction and laundering) |
| 2019-07-12 | Bitpoint discloses breach; suspends all services; Remixpoint discloses to Tokyo Stock Exchange | (defender / listed-parent disclosure) |
| 2019-07 to 2019-08 | Japan FSA on-site inspection; business-improvement order issued | (regulatory response) |
| 2019-08 onward | Remixpoint commits to user reimbursement; Bitpoint implements cold-wallet segmentation fix | (remediation) |

## Realised extraction

Approximately \$32M (~2.3B yen) across five cryptocurrencies. Remixpoint committed to reimbursing users; no confirmed recovery of the stolen assets reported at v0.1.

## Cold-wallet segmentation anti-pattern

The architectural failure at Bitpoint — cold-wallet signing authority reachable from hot-wallet operational infrastructure — is the reference anti-pattern for OAK-M19 (Air-Gap Cold-Wallet Signing). The case demonstrates that key-material separation alone is insufficient: the signing *authority path* must also be segmented. A cold wallet whose signing ceremony is initiated from or routed through the hot-wallet operational surface is not operationally cold. This case is the canonical worked example for the distinction between "cold storage of keys" and "cold signing authority."

## Public references

- Remixpoint, Inc. Tokyo Stock Exchange disclosure, July 2019
- Japan Financial Services Agency (FSA) on-site inspection and business-improvement order, 2019
- Bitpoint exchange service-suspension and security-incident announcements, July 2019
- Japanese cryptocurrency exchange regulatory framework and FSA enforcement actions, 2019
