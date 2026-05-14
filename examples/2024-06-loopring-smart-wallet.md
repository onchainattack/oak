# Loopring Smart Wallet guardian-recovery exploit — Ethereum — 2024-06-09

**Loss:** approximately \$5M from approximately 200 Loopring Smart Wallet users whose wallets were compromised via the guardian-recovery flow exploited through a compromised 2FA/authentication service used by Loopring's official guardian.
**OAK Techniques observed:** **OAK-T13.003** (Session-Key Hijacking / Smart-Wallet Recovery-Flow Exploitation) — primary; the attacker exploited the smart-wallet recovery flow by compromising the authentication service backing Loopring's official guardian, then used the guardian's recovery authority to reset wallet ownership and drain funds. **OAK-T11.008** (Embedded-Wallet Identity-Provider Compromise) — secondary; the compromise of the authentication provider backing the guardian service is structurally an identity-provider-compromise surface. **OAK-T5.005** (Treasury-Management Exit — broadly construed; the operator-side failure was Loopring's decision to maintain an official guardian with recovery authority over user wallets, creating a single-point-of-failure that converted an authentication-service compromise into a mass-wallet-drain event).
**Attribution:** **pseudonymous (no public attribution)**. Loopring disclosed the incident as an external compromise of their 2FA service provider; no named individual or group was publicly identified.
**Key teaching point:** **The Loopring Smart Wallet incident is the canonical 2024 worked example of the smart-wallet guardian-recovery-flow as attack surface (T13.003).** The incident demonstrates that smart-wallet recovery mechanisms — while necessary for user experience — introduce a structural trade-off: the stronger the guardian's recovery authority (to help users who lose keys), the larger the blast radius when the guardian's authentication infrastructure is compromised. The incident is the practical validation of the T13.003 detection surface at the guardian-authentication layer.

## Summary

Loopring is an Ethereum Layer-2 (zkRollup) protocol with a native Smart Wallet (contract-based wallet using ERC-4337-style account abstraction). The Loopring Smart Wallet implemented a "guardian" recovery mechanism allowing users to designate one or more guardians who could help recover wallet access if the user lost their signing key. Loopring operated an official guardian service — a server-side component that users could designate as their wallet guardian for simplified recovery.

The official guardian's recovery-authorization flow was protected by a 2FA/authentication service (a third-party provider). On 2024-06-09, this authentication service was compromised. The attacker used the compromised authentication to authorize guardian recovery actions — resetting wallet ownership on approximately 200 Loopring Smart Wallets and draining their assets (ETH, USDC, LRC, and other tokens held in the wallets).

The key structural vulnerabilities:
1. **Single guardian concentration:** Many Loopring users relied solely on the official guardian (no second independent guardian), creating a single-point-of-failure.
2. **Guardian authority without delay:** The guardian-recovery flow executed immediately upon authentication rather than enforcing a timelock (e.g., 48-hour delay between recovery initiation and execution, during which the legitimate owner could cancel).
3. **Authentication-service single-point:** The official guardian's security depended entirely on a single third-party 2FA service; compromise of that service granted full guardian authority.

Loopring publicly disclosed the incident on 2024-06-09 via Twitter, suspended the official guardian service, and advised affected users. No funds were recovered.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| pre-2024-06-09 | Loopring Smart Wallet active on Ethereum with official guardian service; guardian authentication via third-party 2FA provider; no recovery timelock | (standing T13.003 surface) |
| 2024-06-09 | Attacker compromises Loopring's third-party 2FA/authentication service provider | T11.008 (identity-provider compromise) |
| 2024-06-09 | Using compromised authentication, attacker invokes guardian-recovery flow on ~200 wallets; resets ownership; drains assets (~$5M) | **T13.003** (recovery-flow exploitation) |
| 2024-06-09 T+hours | Loopring publicly discloses; suspends official guardian service; advises affected users | (incident response) |
| 2024-06-10 onward | Community forensic analysis identifies guardian-recovery flow as compromise vector; discussion of guardian design anti-patterns | (forensic record) |

## Realised extraction

Approximately \$5M across ~200 wallets.

## OAK technique classification rationale

T13.003 (Session-Key Hijacking) is broadly construed at v0.1 to include session-key and recovery-flow exploitation. The guardian-recovery flow is structurally a "super-session-key" — it authorizes a permanent change of wallet ownership rather than a time-bounded delegation. The Loopring incident is the canonical T13.003 guardian-recovery subclass anchor.

T11.008 (Embedded-Wallet Identity-Provider Compromise) captures the authentication-provider compromise that was the proximate entry vector. The identity-provider (2FA service) was the load-bearing security dependency; its compromise granted guardian authority.

## References

- Loopring, "Loopring Smart Wallet Security Incident," June 9, 2024 (official announcement)
- Loopring Twitter (@loopringorg), June 9, 2024
- Community forensic analysis (ZachXBT, SlowMist)
