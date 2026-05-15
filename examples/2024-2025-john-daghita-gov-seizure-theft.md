# John Daghita ("Lick") — US Government Seizure Address Theft — 2024–2025

**Loss:** $40M+ stolen from US government cryptocurrency seizure addresses; $90M+ in suspected total thefts across multiple incidents.
**OAK Techniques observed:** OAK-T6 (Authorization / Key Compromise) — unauthorized access to government-controlled addresses via compromised private keys or insider access.
**Attribution:** **Identified** — John Daghita ("Lick"), US-based. His father owns CMDSS, a company with active US government IT contracts. Arrested in early 2026. Connected to Dritan Kapllani Jr via B4B relationship.

**Key teaching point:** The John Daghita case demonstrates the **government seizure address vulnerability** — cryptocurrency seized by law enforcement and held in government-controlled addresses is vulnerable to insider theft if the private key management infrastructure is compromised. The attack surface is not a smart contract or a protocol — it's the government's key management (or the contractor managing it). Detection approach: monitor government-known seizure addresses for unauthorized outbound transfers, particularly during periods of contractor personnel changes.

## Summary

John Daghita ("Lick") is a US-based threat actor who stole $40M+ from US government cryptocurrency seizure addresses. His father owns CMDSS, a company that holds active IT government contracts — providing potential access to government key management infrastructure.

The theft targeted addresses where the US government held seized cryptocurrency (from previous criminal cases). Daghita was initially identified after flexing $23M in a wallet address directly tied to the thefts on social media. ZachXBT's investigation linked him to $90M+ in suspected total thefts across multiple incidents.

Daghita had a B4B (business-for-business) relationship with Dritan Kapllani Jr, a social engineering specialist. The two shared laundering infrastructure and cross-referred victims. Daghita posted one of Dritan's luxury lifestyle flexes on social media, strengthening the on-chain connection between them.

Daghita was arrested in early 2026.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| Pre-2024 | CMDSS (father's company) holds US government IT contracts with access to sensitive infrastructure | (access vector) |
| 2024 | $40M+ stolen from US government seizure addresses. Funds moved to Daghita-controlled wallets | **T6 key/access compromise** |
| 2024~2025 | Daghita flexes $23M in wallet on social media. ZachXBT links wallet to seizure address thefts | (forensic) |
| 2025 | B4B relationship with Dritan Kapllani Jr established. Shared laundering infrastructure | **T7 laundering** |
| 2026-01 | Daghita arrested. Investigation reveals $90M+ in suspected total thefts | (legal) |

## What defenders observed

- **Social media flexing as forensic evidence:** Daghita posted a wallet address containing $23M on social media. On-chain tracing linked this address directly to the government seizure address outflows.
- **Government contractor access as the attack surface:** Daghita's father's company (CMDSS) held IT contracts with the US government. The access vector was likely through this contractor relationship, not through external hacking.
- **Seizure address monitoring gap:** Government seizure addresses are publicly known (published in forfeiture documents). Outbound transfers from these addresses should be monitored in real-time. The theft was discovered retrospectively.
- **B4B cross-contamination:** Daghita and Dritan shared laundering infrastructure, making both more detectable as a cluster than either would be individually.

## What this example tells contributors

- **Government seizure addresses are a T6 attack surface.** The key management for these addresses is often outsourced to contractors. T6 should include a sub-technique for "compromised government/enterprise key management via contractor access."
- **Public seizure addresses enable monitoring.** Because seizure addresses are publicly listed in court documents, a real-time monitoring system could detect unauthorized outflows. This is a low-effort, high-value detection primitive.
- **Social media flexing is a recurring attribution signal.** Daghita, Dritan, and the Genesis Creditor thieves (Malone/Wiz/Box) all posted their wealth on social media. This is a behavioral constant across financially motivated threat actors.

## Public references

- [ZachXBT — John Daghita (Lick) Investigation (X/Twitter)](https://twitter.com/zachxbt/status/1882857096382484480)
- [ZachXBT — Dritan Kapllani Jr + John Daghita Connection (X/Twitter)](https://twitter.com/zachxbt/status/1920845187586105848)
- CMDSS government contract information: public record.
