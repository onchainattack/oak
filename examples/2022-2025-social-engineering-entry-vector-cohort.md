# Social-Engineering Entry-Vector Cohort — 2022–2025

**OAK Techniques observed:** OAK-T3.005, OAK-T4.006, OAK-T15.006

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** T3.005 aggregate undocumented at class level (per-campaign extractions typically in the hundreds-of-thousands to low millions, dispersed across victims); T4.006 ~$550K+ confirmed across the Google Play drainer campaign (~$70K, 150+ victims) and fake-MEV-bot multisig campaign (~$480K, 12 multisig wallets + 40+ individuals); T15.006 ~$5M+ across the Solana X-account compromise wave (February 2025) and BAYC Discord moderator compromise (~$3M+ in NFT losses, April 2022).

**Key teaching point:** These three Techniques share a common structural feature — the attacker exploits a trust signal that the user reasonably relies on, but the trust signal is not cryptographically bound to the on-chain transaction the user ultimately signs. The staking frontend's domain (T3.005), the WalletConnect session's peer-dApp identity (T4.006), and the social platform's verification badge (T15.006) all serve as trust heuristics that the user's wallet cannot mechanically verify against the transaction payload.

## Summary

## Timeline

T3.005 from 2021–2022 (Lido stETH phishing campaigns); T4.006 systematic from 2023 onward (WalletConnect session-hijack phishing, mobile-app distribution campaigns at scale 2024); T15.006 systematic from 2022 onward (BAYC Discord April 2022, Solana X-account wave February 2025).

## T3.005 — Fake-Validator Staking-Frontend Phishing

The attacker deploys a domain and UI that mirrors a legitimate liquid-staking protocol (Lido, Rocket Pool, Marinade). The user connects their wallet, approves a deposit transaction, and the deposited ETH/SOL is routed to an attacker-controlled address rather than the legitimate staking contract. The extraction primitive is the **fake staking-interface deposit path** — the user believes they hold stETH/rETH/mSOL but has sent funds directly to the attacker.

Sub-patterns:

- **Liquid-staking protocol impersonation.** Domain typosquat (lido.fi → lido-stake.com; rocketpool.net → rocket-pool.org; marinade.finance → marinade-staking.com).
- **Validator-delegation portal impersonation.** On Cosmos and delegation-model chains, the attacker impersonates a high-uptime validator.
- **Search-engine-advertisement interception.** Purchasing search advertisements for staking-protocol keywords to place the fake frontend above the legitimate result.

The wallet-side deposit-destination verification (comparing the deposit target address against the canonical staking contract address) is the highest-leverage detection primitive.

## T4.006 — WalletConnect Session Hijack

The victim is induced to establish a WalletConnect session with a malicious dApp (or software masquerading as a legitimate dApp), after which the attacker uses the session to solicit signing of malicious payloads. The entry vector is the **session-establishment step**.

Canonical cases:

- **Google Play drainer campaign — 2024-09.** Fake "WalletConnect" mobile apps distributed via Google Play under impersonating names ("Mestox Calculator", "WalletConnect — DeFi & NFTs", "WalletConnect — Airdrop Wallet"), achieving 10,000+ downloads and ~$70K stolen across 150+ victims. See `examples/2024-09-walletconnect-google-play-drainer.md`.
- **Fake MEV-bot multisig drain — 2024-06.** ~$480K drained from 12 multisig wallets and 40+ individuals via Inferno Drainer backend, targeting technically-sophisticated users through fake developer-tooling framing. See `examples/2024-06-walletconnect-multisig-drain.md`.
- **Browser and social-media WalletConnect phishing — 2023–2025.** Drainer-as-a-service ecosystem (Inferno, Pink, Angel, Pussy, Monkey Drainers) commercialised T4.006 at industrial scale. See `examples/2023-2025-walletconnect-phishing-campaigns-cohort.md`.

## T15.006 — Impersonation via Verified Social-Account Compromise

Compromise of a verified or officially-branded social media account (X gold/grey checkmark, Discord moderator/admin, Telegram channel admin) to distribute phishing links to the account's established follower base. The attacker exploits the **platform's verification signal itself** — the audience trusts the message because the platform's verification badge confirms the account's authenticity.

Canonical cases:

- **Solana ecosystem verified X-account compromise wave — 2025-02.** Coordinated compromise of verified X accounts including Jupiter Exchange, Pump.fun, DogWifCoin, and others. The compromised accounts posted malicious contract addresses and wallet-connect links to combined follower bases of millions. See `examples/2025-02-solana-x-account-compromise-cohort.md`.
- **BAYC Discord moderator verified-role compromise — 2022-04 / 2022-08.** Moderator accounts carrying Discord's "Moderator" role badge were compromised and used to post fake mint links in official BAYC channels. ~$3M+ in NFT losses (BAYC, MAYC, Otherdeed). See `examples/2022-04-bored-ape-discord-wave.md`.
- **X verified-account phishing as a service — 2023–2025.** A liquid market for compromised verified X accounts emerged; attackers compromise verified accounts and sell access to phishing operators for single-campaign use.

The hardware-key MFA (FIDO2/WebAuthn) on every verified operator account is the highest-leverage mitigation — the dominant compromise vectors (SIM-swap, session-cookie theft) are both closed by hardware-key MFA.

## Public references

- `[googleplaydrainer2024]` — Google Play WalletConnect drainer campaign coverage
- `[infernodrainer2024]` — Inferno Drainer ecosystem analysis
- `[solana2025xwave]` — Solana ecosystem X-account compromise wave (February 2025)
- `[bayc2022discord]` — BAYC Discord compromise (April 2022)
- `[scamsniffer2025]` — ScamSniffer phishing-feed advisories
