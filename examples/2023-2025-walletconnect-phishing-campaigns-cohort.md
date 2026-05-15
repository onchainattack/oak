# WalletConnect session-hijack phishing campaigns — multi-chain — 2023–2025

**Loss:** cohort-scale — WalletConnect session-hijack phishing campaigns across X/Twitter, Discord, and search-engine-ad surfaces extracted an estimated $100M+ across 2023–2025 through fake-dApp session establishment followed by signature-phishing or direct-transfer payloads. The September 2024 Google Play impersonation campaign (`examples/2024-09-walletconnect-google-play-drainer.md`) is the canonical mobile-app-distribution sub-vector (\~$70K, \~150 victims). The broader browser-and-social-media phishing surface is the higher-volume T4.006 entry vector, operating through fake-protocol websites that establish WalletConnect sessions under the guise of airdrop claims, token launches, or protocol migrations.

**OAK Techniques observed:** **OAK-T4.006** (WalletConnect Session Hijack — primary; the session-establishment step is the T4.006 entry vector: the victim connects their wallet to a malicious dApp via WalletConnect, granting the attacker a persistent session through which to solicit signature payloads). **OAK-T4.001** (Permit2 / Signature-Based Authority Misuse — chained downstream; once the WalletConnect session is established, the attacker solicits `permit`, `approve`, or `eth_sign` signatures that transfer token authority to attacker-controlled addresses). **OAK-T13.004** (EIP-7702 Delegation Abuse — chained downstream; post-Pectra, drainer operators solicit EIP-7702 set-code authorisation tuples within the hijacked WalletConnect session, replacing the victim EOA's execution model with attacker-supplied bytecode). **OAK-T15.001** (Wallet / Interaction Spoofing — the phishing surface that delivers the victim to the malicious dApp: fake X/Twitter accounts, compromised Discord webhooks, search-engine-ad poisoning, and typosquatted domains that masquerade as legitimate protocols).

**Attribution:** **pseudonymous** (individual phishing clusters — Inferno Drainer, Angel Drainer, Pink Drainer, Pussy Drainer, Monkey Drainer — are identifiable through on-chain destination-address clustering and off-chain domain-registration patterns; per-cluster named-operator attribution is sparse at v0.1). The drainer-as-a-service ecosystem (Inferno Drainer, Pink Drainer, Angel Drainer) commercialised the T4.006 entry vector through 2023–2025, with drainer operators taking a 20-30% commission on extracted proceeds and the phishing-infrastructure providers handling session establishment, payload construction, and laundering.

**Key teaching point:** **WalletConnect session establishment is the single highest-leverage consent gate for T4.006.** Once a victim establishes a WalletConnect session with a malicious dApp, the attacker can iterate through signature-solicitation payloads across days or weeks, and each payload individually may appear benign in the wallet confirmation prompt. The session is the persistent entry vector; the per-payload signatures are the extraction instruments. Wallet-side session-history visibility, per-dApp domain allowlists, and session-by-session (not persistent) connection defaults are the canonical T4.006 mitigations at the wallet UX layer.

## Summary

WalletConnect is a protocol that enables wallets to connect to dApps across browser, mobile, and desktop contexts. The standard user flow is: visit dApp → click "Connect Wallet" → scan QR code or approve connection in wallet extension → WalletConnect session established → dApp can request signatures and transactions within the session.

The phishing adaptation of this flow is:

1. **Phishing surface delivers victim to a fake dApp.** The victim clicks a link from a compromised X/Twitter account, a Discord announcement, a Google search ad, or a typosquatted domain. The fake dApp mimics a legitimate protocol (Uniswap, Aave, OpenSea, a new token launch, an airdrop claim page).

2. **Victim establishes a WalletConnect session.** The fake dApp presents a "Connect Wallet" prompt indistinguishable from a legitimate dApp's connection flow. The victim approves the connection in their wallet. A persistent WalletConnect session is now established between the victim's wallet and the attacker's infrastructure.

3. **Attacker exploits the session.** Within the established session, the attacker solicits signature payloads: `permit` signatures for ERC-20 tokens, `approve` transactions for NFT collections, `eth_sign` blind-signing requests, or (post-Pectra) EIP-7702 delegation signatures. Each payload may be framed as a required step for the airdrop claim, token launch participation, or protocol migration that brought the victim to the fake dApp.

4. **Proceeds are laundered.** Extracted tokens and ETH are routed through instant-swap services, cross-chain bridges, or mixer deposits. The WalletConnect session is terminated after extraction, and the phishing infrastructure (domain, hosting, session relays) is rotated for the next campaign.

The drainer-as-a-service ecosystem (2023–2025) commoditised this flow. Drainer operators (Inferno Drainer, Pink Drainer, Angel Drainer, Pussy Drainer, Monkey Drainer) provided turnkey phishing infrastructure: fake-dApp templates, WalletConnect relay servers, signature-payload generators, and laundering pipelines. Affiliates (the "traffic" side) drove victims to the fake dApps through social-media phishing, ad poisoning, and Discord compromises. Proceeds were split 70-80% to the affiliate, 20-30% to the drainer operator.

Inferno Drainer alone was attributed with over $80M extracted across approximately 100,000 victims between late 2022 and its announced shutdown in November 2023 (though successor operations used the same codebase and infrastructure patterns through 2024–2025). Pink Drainer was attributed with approximately $12M across 10,000+ victims through mid-2024. The aggregate T4.006 extraction across all drainer operations during the 2023–2025 active window is estimated in the hundreds of millions of dollars.

The September 2024 Google Play impersonation campaign (`examples/2024-09-walletconnect-google-play-drainer.md`) represented a *mobile-app-distribution* sub-vector of the same T4.006 primitive — the WalletConnect session was established through a malicious mobile app rather than through a browser-based fake dApp, but the session-hijack primitive was the same.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2022–2023 | Drainer-as-a-service ecosystem matures; Inferno Drainer, Monkey Drainer operational | **T4.006 commercialisation** |
| 2023-11 | Inferno Drainer announces shutdown (\~$80M attributed); successor operations continue with same infrastructure | (operator rotation) |
| 2024-Q1 to Q2 | Pink Drainer attributed at \~$12M across 10,000+ victims | **T4.006 cohort** |
| 2024-09 | Google Play WalletConnect impersonation campaign — mobile-app sub-vector (\~$70K, \~150 victims) | **T4.006 mobile variant** |
| 2024-Q4 to 2025 | Angel Drainer, Pussy Drainer, and unnamed successor operations continue; aggregate cohort extraction continues | **T4.006 steady state** |

## What defenders observed

- **The WalletConnect session is the persistent entry vector — not the per-payload signature.** Each individual signature solicited within an established session may pass wallet-side risk checks (amount, destination, token). The session itself is the vulnerability: it allows the attacker to iterate through payloads until one succeeds.
- **Drainer-as-a-service commercialised T4.006 at industrial scale.** The separation of phishing-infrastructure providers (drainer operators) from traffic drivers (affiliates) created a scalable, specialised supply chain for session-hijack phishing. The same fake-dApp templates, WalletConnect relay configurations, and payload generators served hundreds of independent phishing campaigns across different protocols, chains, and victim demographics.
- **Wallet-side session management is the primary mitigation surface.** Wallets that display active WalletConnect sessions prominently, allow one-click session revocation, default to session-by-session (not persistent) connections, and warn on domain-not-in-allowlist session establishment close the T4.006 entry vector at the consent gate.

## What this example tells contributors writing future Technique pages

- **This example is the browser-and-social-media complement to the Google Play mobile-app anchor.** The existing T4.006 example (`examples/2024-09-walletconnect-google-play-drainer.md`) documents the mobile-app-distribution sub-vector. This example anchors the higher-volume browser-based and social-media-driven session-hijack surface that accounts for the dominant share of T4.006 extraction.
- **The drainer-as-a-service ecosystem makes T4.006 a *commercialised* Technique class.** Contributors writing future T4.006 examples should treat the drainer-operator ecosystem (Inferno, Pink, Angel, Pussy, Monkey) as the primary operational layer, not individual phishing campaigns. Campaign-level attribution is ephemeral (domains, social accounts, and session relays rotate); operator-level attribution via on-chain destination-address clustering is the durable forensic signal.

## Public references

- SlowMist. *"Inferno Drainer Analysis."* 2023.
- ScamSniffer. *"WalletConnect Phishing Campaign Analysis."* 2023–2025.
- SlowMist. *"Pink Drainer Analysis."* 2024.
- Cross-reference: T4.006 (WalletConnect Session Hijack) at `techniques/T4.006-walletconnect-session-hijack.md`.
- Cross-reference: T4.001 (Permit2 / Signature-Based Authority Misuse) at `techniques/T4.001-permit2-signature-authority-misuse.md`.
- Cross-reference: T15.001 (Wallet / Interaction Spoofing) at `techniques/T15.001-wallet-interaction-spoofing.md`.
- Cross-reference: `examples/2024-09-walletconnect-google-play-drainer.md` — Google Play WalletConnect impersonation campaign (mobile-app sub-vector, September 2024).

### Proposed new BibTeX entries

```bibtex
@misc{slowmistinferno2023,
  author = {{SlowMist}},
  title = {Inferno Drainer: WalletConnect Session-Hijack Phishing Infrastructure},
  year = {2023},
  note = {~$80M attributed across ~100,000 victims; drainer-as-a-service model with 20–30\% operator commission}
}

@misc{scamsnifferwalletconnect2025,
  author = {{ScamSniffer}},
  title = {WalletConnect Phishing Campaign Analysis — 2023–2025},
  year = {2025},
  note = {Cross-platform WalletConnect session-hijack phishing campaigns across X/Twitter, Discord, and search-engine-ad surfaces}
}
```
