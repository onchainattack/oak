# Bithumb exchange hack — Multi-asset (BTC, ETH, XRP, others) — 2018-06-20

**Loss:** approximately \$31M in various cryptocurrencies from South Korea's largest exchange by volume. The attacker drained hot wallets across multiple assets in a coordinated single-event extraction.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing-Vendor UI / Signing-Flow Compromise — broadly construed; the exchange's internal hot-wallet signing infrastructure was the compromise surface, enabling the multi-asset drain). **OAK-T7.001** (Mixer-Routed Laundering — the extracted assets were subsequently routed through mixing and exchange-based laundering infrastructure characteristic of the DPRK OAK-G01 tradecraft at the time).
**Attribution:** **inferred-strong** The UN Panel of Experts and South Korean authorities attributed the June 2018 Bithumb breach to the DPRK's Lazarus Group as part of the sustained DPRK campaign targeting South Korean and Asian cryptocurrency exchanges throughout 2017-2019.
**Key teaching point:** **The June 2018 Bithumb hack is the largest single DPRK-attributed exchange theft of the 2017-2018 wave and is the structural bridge between the pre-2018 small-exchange targets (Yapizon, Coincheck) and the post-2019 large-exchange multi-chain extraction pattern (Upbit, KuCoin, CoinEx).** Bithumb's survival — unlike Yapizon, which collapsed after two DPRK hacks — demonstrates the capitalisation threshold for surviving a state-aligned persistent threat actor: Bithumb's larger balance sheet and market position allowed it to absorb the \$31M loss without bankruptcy, a structural precondition for the multi-year Lazarus exchange-targeting campaign that followed.

## Summary

Bithumb, South Korea's largest cryptocurrency exchange by trading volume, suffered a hot-wallet compromise on 2018-06-20 in which approximately \$31M in various cryptocurrencies (including BTC, ETH, XRP, and other listed assets) was drained by an attacker. The breach was discovered and publicly disclosed by Bithumb within hours; the exchange immediately suspended all deposit and withdrawal services and transferred remaining hot-wallet assets to cold storage.

This was Bithumb's second major security incident: in June 2017, a separate breach compromised an employee's laptop containing customer personal data (documented at `examples/2017-06-bithumb.md`), which was used for follow-on phishing against Bithumb customers. The June 2018 incident was a direct financial extraction rather than a data-exfiltration operation, reflecting the evolution of DPRK tradecraft from intelligence-collection to direct asset extraction.

Bithumb reported recovering approximately \$14M of the stolen assets through exchange coordination and blockchain analysis, reducing the net realised loss to approximately \$17M. The exchange resumed deposit and withdrawal services after a security overhaul, and has continued to operate as a major South Korean exchange.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2018-06-19 to 2018-06-20 | Attacker compromises Bithumb hot-wallet signing infrastructure; multi-asset drain (~$31M) executed in a coordinated extraction | T11.001 (signing-flow compromise) |
| 2018-06-20 | Bithumb discloses breach; suspends deposits and withdrawals; transfers remaining hot-wallet assets to cold storage | (defender response) |
| 2018-06 to 2018-07 | Bithumb coordinates with exchanges and blockchain analytics firms; ~$14M recovered | T7.001 (laundering-tracking and recovery via exchange coordination) |
| 2018-07 onward | Bithumb enhances security architecture; resumes full operations | (architectural remediation) |

## Realised extraction

Approximately \$31M initially drained; ~\$14M recovered via exchange coordination, leaving net realised loss of ~\$17M. Attributed to OAK-G01.

## Distinction from June 2017 Bithumb incident

The June 2017 Bithumb incident (documented at `examples/2017-06-bithumb.md`) was a customer-data exfiltration from an employee laptop that enabled second-stage phishing against Bithumb users — a T15.003 employee-endpoint case without direct on-chain extraction by the initial attacker. The June 2018 incident is a direct hot-wallet financial extraction via signing-infrastructure compromise (T11.001 + T7.001). The two incidents are structurally distinct and should not be conflated.

## Public references

- Bithumb official breach disclosure and security announcements, June 2018
- UN Panel of Experts report on DPRK cyber operations and cryptocurrency exchange targeting, 2019
- Chainalysis and Elliptic DPRK-campaign wallet-cluster attribution reports
- South Korean National Police Agency (NPA) Cyber Bureau investigation records, 2018
