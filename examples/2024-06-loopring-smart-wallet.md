# Loopring Smart Wallet guardian-recovery exploit — Ethereum — 2024-06-09

**Corrected 2026-10-11:** victim count corrected to 58 addresses out of 40,000+ deployed wallets (not ~200); the compromised 2FA component was Loopring's own infrastructure, not a third-party provider (Loopring postmortem).

**Loss:** approximately \$5M (press-reported) from 58 Loopring Smart Wallet addresses, out of 40,000+ deployed wallets, compromised via the guardian-recovery flow after the attacker got past the 2FA check on Loopring's Official Guardian. Per Loopring's postmortem, the Official Guardian was the only active guardian on the affected accounts.
**OAK Techniques observed:** **OAK-T13.003** (Session-Key Hijacking / Smart-Wallet Recovery-Flow Exploitation) — primary; the attacker exploited the smart-wallet recovery flow by compromising Loopring's own 2FA service backing its official guardian, then used the guardian's recovery authority to reset wallet ownership and drain funds. **OAK-T11.008** (Embedded-Wallet Identity-Provider Compromise) — secondary; the compromise of the 2FA/authentication service backing the guardian is structurally an identity-provider-compromise surface (here operated by Loopring itself). **OAK-T5.005** (Treasury-Management Exit — broadly construed; the operator-side failure was Loopring's decision to maintain an official guardian with recovery authority over user wallets, creating a single-point-of-failure that converted an authentication-service compromise into a mass-wallet-drain event).
**Attribution:** **pseudonymous**. Loopring's postmortem describes a compromise of its own 2FA service and servers (the attacker had read/write access and malware was found on Loopring servers); the earlier press framing as a third-party provider is not supported. No named individual or group was publicly identified.
**Key teaching point:** **The Loopring Smart Wallet incident is the canonical 2024 worked example of the smart-wallet guardian-recovery-flow as attack surface (T13.003).** The incident demonstrates that smart-wallet recovery mechanisms — while necessary for user experience — introduce a structural trade-off: the stronger the guardian's recovery authority (to help users who lose keys), the larger the blast radius when the guardian's authentication infrastructure is compromised. The incident is the practical validation of the T13.003 detection surface at the guardian-authentication layer.

## Summary

Loopring is an Ethereum Layer-2 (zkRollup) protocol with a native Smart Wallet (contract-based wallet using ERC-4337-style account abstraction). The Loopring Smart Wallet implemented a "guardian" recovery mechanism allowing users to designate one or more guardians who could help recover wallet access if the user lost their signing key. Loopring operated an official guardian service — a server-side component that users could designate as their wallet guardian for simplified recovery.

The official guardian's recovery-authorization flow was protected by a 2FA/authentication service operated by Loopring. Per the Loopring postmortem, the attacker gained access to Loopring's 2FA servers (malware was found on them) and, on 2024-06-09, bypassed the 2FA check on the Official Guardian. The attacker used this to authorize guardian recovery actions — resetting wallet ownership on 58 Loopring Smart Wallet addresses and draining their assets (ETH, USDC, LRC, and other tokens held in the wallets).

The key structural vulnerabilities:

1. **Single guardian concentration:** The affected accounts relied solely on the Official Guardian (no second independent guardian); wallets with multiple guardians or a different guardian were not affected.
2. **Guardian authority without delay:** The guardian-recovery flow executed immediately upon authentication rather than enforcing a timelock (e.g., 48-hour delay between recovery initiation and execution, during which the legitimate owner could cancel).
3. **Authentication-service single-point:** The official guardian's security depended on a single 2FA service; compromise of that service and its servers granted full guardian authority.

Loopring publicly disclosed the incident on 2024-06-09, temporarily suspended Guardian and 2FA operations, and worked with external security experts. Recovery of funds is not confirmed in the sources reviewed.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| pre-2024-06-09 | Loopring Smart Wallet active on Ethereum with official guardian service; guardian authentication via Loopring's 2FA service; no recovery timelock | (standing T13.003 surface) |
| 2024-06-09 (and earlier) | Attacker gains access to Loopring's own 2FA service and servers | T11.008 (identity-provider compromise) |
| 2024-06-09 | Using compromised authentication, attacker invokes guardian-recovery flow on 58 wallets; resets ownership; drains assets (~$5M) | **T13.003** (recovery-flow exploitation) |
| 2024-06-09 T+hours | Loopring publicly discloses; suspends official guardian service; advises affected users | (incident response) |
| 2024-06-10 onward | Community forensic analysis identifies guardian-recovery flow as compromise vector; discussion of guardian design anti-patterns | (forensic record) |

## Realised extraction

Approximately \$5M (press-reported) across 58 wallet addresses.

## OAK technique classification rationale

T13.003 (Session-Key Hijacking) is broadly construed at v0.1 to include session-key and recovery-flow exploitation. The guardian-recovery flow is structurally a "super-session-key" — it authorizes a permanent change of wallet ownership rather than a time-bounded delegation. The Loopring incident is the canonical T13.003 guardian-recovery subclass anchor.

T11.008 (Embedded-Wallet Identity-Provider Compromise) captures the authentication-provider compromise that was the proximate entry vector. The identity-provider (Loopring's 2FA service) was the load-bearing security dependency; its compromise granted guardian authority.

## Public references

- `[theblockloopring2024]` — The Block, "Loopring suffers \$5 million hack after 'Guardian' two-factor authentication service is compromised" (2024-06-09): <https://www.theblock.co/news/ecosystems/2024-06-09-loopring-suffers-5-million-hack-after-guardian-two-factor-authentication-service-is-compromised-299177>
- `[loopringpostmortem2024]` — Loopring, "Postmortem Incident Report and Path Forward" (Medium; date not shown; source for the 58-of-40,000+ wallet count and the Official Guardian detail): <https://medium.com/loopring-protocol/postmortem-incident-report-and-path-forward-aa64f7e5f7d1>
- `[halbornloopring2024]` — Halborn, "Explained: The Loopring Hack (June 2024)" (2024-06-11): <https://www.halborn.com/blog/post/explained-the-loopring-hack-june-2024>
