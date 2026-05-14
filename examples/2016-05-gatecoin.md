# Gatecoin exchange hot-wallet compromise — Bitcoin / Ethereum — 2016-05-13

**Loss:** approximately $2M (250 BTC and 185,000 ETH at then-prevailing exchange rates) stolen from Hong Kong-based exchange Gatecoin's hot wallets. The attacker compromised Gatecoin's hot-wallet server infrastructure and gained access to the exchange's hot-wallet signing keys across both Bitcoin and Ethereum hot wallets.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing Vendor Compromise — primary; the exchange's hot-wallet server infrastructure was the signing surface; Gatecoin was the custodian, and the custodial hot-wallet operational security was the failure surface — multi-asset signing keys co-located on a single server). **OAK-T15.003** (Operator Endpoint / Infrastructure Compromise — the entry vector involved a compromised server hosting the hot-wallet signing keys for both Bitcoin and Ethereum).
**Attribution:** **pseudonymous (no public attribution)**. Gatecoin disclosed the incident as an external server compromise; no named individual or group was publicly identified. The incident shares structural methodology with the broader 2014-2016 exchange-hack cohort (Bitstamp 2015, Bter 2015, Bitfinex 2016) but predates the 2017-2020 DPRK exchange-compromise campaign.
**Key teaching point:** **Gatecoin 2016 is the canonical worked example of a multi-asset exchange hot-wallet compromise in the pre-DPRK-campaign era — the attacker compromised one server and drained both Bitcoin and Ethereum hot wallets because the signing keys for both chains were co-located on the same infrastructure.** The co-location of multi-asset signing keys on a single server is the structural operational-security anti-pattern that the 2014-2016 exchange-hack cohort repeatedly demonstrates.

## Summary

Gatecoin was a Hong Kong-based cryptocurrency exchange founded in 2015, notable as an early adopter of Ethereum and ERC-20 token trading. The exchange operated hot wallets for Bitcoin and Ethereum (plus ERC-20 tokens) to process customer withdrawals, with the hot-wallet signing infrastructure hosted on a server accessible to exchange operations staff.

On 2016-05-13, an attacker compromised this server — the specific entry vector was not publicly detailed but was described by Gatecoin as an external server compromise. The server hosted the signing keys for both the Bitcoin hot wallet and the Ethereum hot wallet. The attacker extracted the keys and drained both hot wallets in a coordinated extraction: approximately 250 BTC and 185,000 ETH (the ETH was valued at approximately $10-12 per ETH at the time, making the total loss approximately $2M).

The multi-asset co-location on a single server was the load-bearing operational security failure: the attacker had to compromise one server to access the signing keys for all assets. Post-2016, best practice evolved toward per-asset or per-wallet key segregation — Bitcoin hot-wallet keys on separate infrastructure from Ethereum hot-wallet keys — to ensure that a single server compromise could not drain the entire exchange's multi-asset hot-wallet inventory.

Gatecoin survived the incident and continued operations for several more years, eventually winding down in 2019 after a banking dispute with a payment processor. The exchange was not a rug-pull or exit scam — it was a genuine operational exchange whose hot-wallet security was insufficient for the value it held.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2015–2016 | Gatecoin operates as a Hong Kong-based Bitcoin and Ethereum/ERC-20 exchange; hot-wallet signing keys for both chains hosted on a single server | T8.001 (standing surface — multi-asset key co-location) |
| 2016-05-13 | Attacker compromises Gatecoin's hot-wallet server; extracts Bitcoin and Ethereum hot-wallet signing keys | T15.003 (server compromise) + T8.001 (key co-location) |
| 2016-05-13 T+hours | Attacker drains ~250 BTC and ~185,000 ETH from hot wallets; Gatecoin discloses incident | T11.001 (signing-infrastructure compromise) |
| 2016-05 onward | Gatecoin continues operations; incident becomes part of the 2014-2016 exchange-hack public record driving cold-storage adoption | (industry learning) |
| 2019 | Gatecoin winds down operations after banking dispute with payment processor | (unrelated wind-down) |

## Realised extraction

Approximately $2M (250 BTC + 185,000 ETH at May 2016 prices). No recovery reported.

## References

- Gatecoin incident disclosure, May 2016
- CoinDesk / CoinTelegraph coverage (May 2016)
- See `techniques/T11.001-third-party-signing-vendor-compromise.md`, `techniques/T8.001-*.md`, `techniques/T15.003-*.md`
