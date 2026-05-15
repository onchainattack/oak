# 4064 BTC — Instant Exchange + Cross-Chain Bridge Laundering — 2024-08

**Loss:** 4064 BTC (~$238M) suspiciously transferred. Funds routed through ThorChain, eXch, Kucoin, ChangeNow, Railgun, and Avalanche Bridge in rapid succession. Live reaction video of threat actors receiving the funds was later obtained.
**OAK Techniques observed:** OAK-T10 (Bridge/Cross-Chain) — multi-hop cross-chain obfuscation: Bitcoin → Avalanche Bridge → ThorChain → Railgun (privacy protocol); OAK-T7 (Laundering) — instant exchange chain (eXch, ChangeNow, Kucoin) as intermediate hops.
**Attribution:** **Pseudonymous** — threat actors visible in private video recording of their reaction to receiving $238M. Transaction hash `4b277ba298830ea538086114803b9487558bb093b5083e383e94db687fbe9090`.

**Key teaching point:** The 4064 BTC case demonstrates the **multi-hop cross-chain obfuscation pattern** where the attacker chains together bridges, instant exchanges, CEXs, and privacy protocols in a single rapid laundering sequence: BTC → Avalanche Bridge → ThorChain → eXch → Kucoin → ChangeNow → Railgun. No single hop provides privacy, but the combination across 6+ venues and 3+ chains fragments the tracing surface to the point where no single analytics provider has full visibility. Detection approach: unified cross-chain tracing across BTC, Ethereum, Avalanche, and ThorChain in a single time window; each individual hop has a counterparty with records, but the time pressure (hours, not days) requires automated multi-venue tracing.

## Summary

On August 19, 2024, at 4:05 AM UTC, 4064 BTC (~$238M) was suspiciously transferred from a potential victim (transaction hash `4b277ba298830ea538086114803b9487558bb093b5083e383e94db687fbe9090`). Within hours, the funds were routed through a deliberate multi-hop chain:

1. **BTC → Avalanche Bridge:** BTC bridged to Avalanche (EVM-compatible chain)
2. **Avalanche → ThorChain:** Cross-chain swap to ThorChain's native chain
3. **ThorChain → Instant exchanges:** Funds routed through eXch and ChangeNow (no-KYC swap services)
4. **CEX hop:** Funds pass through Kucoin
5. **Privacy protocol final hop:** Funds enter Railgun (privacy protocol on Ethereum)

The sequence — bridge → cross-chain DEX → instant exchange → CEX → privacy protocol — touches 5+ compliance jurisdictions and 3+ blockchain analytics providers. No single entity sees the full path.

A private video recording obtained by ZachXBT shows the threat actors' live reaction to receiving $238M — a rare forensic artifact that captures the human side of the theft in real time.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2024-08-19 04:05 UTC | 4064 BTC suspiciously transferred. TX: `4b277ba...` | **T5 asset drain** |
| 2024-08-19 (within hours) | BTC → Avalanche Bridge → ThorChain → eXch → Kucoin → ChangeNow → Railgun | **T10 cross-chain obfuscation** |
| 2024-08-19 11:46 UTC | ZachXBT posts community alert | (public alert) |
| 2024-09-19 | ZachXBT posts threat actor reaction video | (forensic evidence) |

## What defenders observed

- **6+ hops across 3+ chains under time pressure:** The entire sequence executed within hours. Each individual hop has a counterparty that could provide records (Avalanche Bridge operators, ThorChain node operators, eXch, Kucoin, ChangeNow), but the time window for subpoena/records requests is measured in weeks while the funds move in hours.
- **Railgun as the privacy terminus:** The final hop into Railgun (an Ethereum privacy protocol using zk-SNARKs) breaks on-chain tracing. Everything after Railgun is private. The laundering sequence is designed to get funds into a privacy protocol before any exchange can freeze them.
- **Threat actor reaction video as a forensic artifact:** The video showing threat actors celebrating the $238M receipt is non-technical evidence — it captures faces, voices, environments, and potentially device metadata. Non-crypto forensic artifacts (videos, images, voice recordings) are part of the attribution surface.
- **Cross-jurisdictional fragmentation:** Avalanche Bridge (jurisdiction A), ThorChain (decentralized — no jurisdiction), eXch (jurisdiction B), Kucoin (jurisdiction C), ChangeNow (jurisdiction D), Railgun (smart contract — no jurisdiction). Tracing requires cooperation across at least 4 jurisdictions.

## What this example tells contributors

- **Multi-hop cross-chain obfuscation is the post-mixer standard.** With Tornado Cash sanctioned and less accessible, threat actors are chaining bridges + instant exchanges + privacy protocols. Each hop is individually compliant; the combination is the laundering path.
- **Privacy protocols as the final hop are a T10 detection boundary.** Railgun, Aztec, and other privacy protocols are the point where tracing ends. Monitoring inflows to privacy protocols from addresses traceable to hacks is a last-mile detection primitive — after the privacy protocol entry, tracing is impossible.
- **Threat actor reaction content is an OSINT attribution data source.** Criminals record themselves. These recordings surface on social media, in private chats, and on seized devices. OAK T8 (Attribution) should include "threat actor self-documentation" as an attribution data source.

## Public references

- [ZachXBT — 4064 BTC Suspicious Transfer Alert (X/Twitter)](https://x.com/zachxbt/status/1825499490956231021)
- [ZachXBT — Threat Actor Reaction Video (X/Twitter)](https://x.com/zachxbt/status/1836753185718865979)
- Transaction: `4b277ba298830ea538086114803b9487558bb093b5083e383e94db687fbe9090`
- Venues: ThorChain, eXch, Kucoin, ChangeNow, Railgun, Avalanche Bridge.
