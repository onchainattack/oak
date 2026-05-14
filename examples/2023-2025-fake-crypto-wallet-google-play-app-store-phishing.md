# Fake Crypto Wallet App Google Play / App Store Phishing — 2023–2025

**Loss:** cumulative ~$4M+ across known campaigns; per-campaign losses range from ~$50K (single-victim seed-phrase capture in a targeted campaign) to ~$1M+ (multi-victim campaigns with sustained app-store listing periods before takedown). The true cumulative loss is likely higher — victims who lost funds via seed-phrase-exfiltrating fake wallet apps may not distinguish the attack vector from general wallet compromise and may not report the incident in on-chain-analytics-visible form.
**OAK Techniques observed:** **OAK-T4.007** (Native-app Social Phishing on Engagement-Weighted Platforms — the app-store ranking mechanic is the distribution surface; the attacker's installs and reviews fund visibility in the store's search-ranking and recommendation algorithm.) **OAK-T11.007.003** (Brand-Trust-Leveraged Active Phishing for Seed-Phrase Exfiltration — the fake wallet app captures the 12/24-word seed phrase at "wallet import" or "wallet setup" time, chaining the T4.007 distribution surface into a T11-class seed-phrase exfiltration.) **OAK-T4.008** (Fake-DEX Clone-Frontend Phishing — structurally adjacent; the app-store listing is the distribution channel for a counterfeit wallet UI, analogous to the T4.008 ad-platform distribution channel for counterfeit DEX UIs.)
**Attribution:** **pseudonymous** at developer-account level; app-store developer accounts registered with stolen/synthetic identities; individual operator attribution not established. Campaigns attributed to DaaS (Drainer-as-a-Service) affiliate operators based on backend drainer-infrastructure overlap with known DaaS kits (Inferno / Angel lineage).

**Key teaching point:** **Mobile app stores act as trust-proxy distribution surfaces for phishing.** Users who have internalised "don't click links in DMs" still trust the Google Play / Apple App Store as curated and reviewed platforms. The attacker exploits this trust-proxy: the app-store listing itself confers legitimacy. The attack surface is structurally similar to T4.008 (Fake-DEX Clone via Google Search ads) — the distribution channel is a legitimate platform whose ranking/review mechanics the attacker pays into — but the app-store surface is deeper because the installed app persists on the device, can request broad permissions, and can observe all user activity rather than just a single browser session. The load-bearing mitigation is app-store review-process hardening combined with wallet-vendor defensive publisher-account registration and canonical-app-URL publication.

## Summary

Between 2023 and 2025, attackers published counterfeit cryptocurrency wallet applications on the Google Play Store and (less frequently) the Apple App Store. The fake apps impersonated legitimate wallet brands — MetaMask, Trust Wallet, Ledger Live, imToken, Rabby, Phantom — and targeted users searching for the wallet's official app. The apps were distributed through app-store search-ranking mechanics: the attacker optimised the app title, description, and keyword metadata for wallet-brand names, often appearing above the legitimate wallet app in search results during the initial listing period before store-review-team detection.

The fake wallet apps operated across two primary extraction modes:

1. **Seed-phrase capture at wallet-setup/import time.** The app presented a legitimate-looking wallet UI and prompted the user to "create a new wallet" (generating a seed phrase controlled by the attacker) or "import an existing wallet" (capturing the user's 12/24-word seed phrase and transmitting it to an attacker-controlled server). This is the higher-severity extraction path: a captured seed phrase compromises all accounts derived from that phrase across all chains.

2. **Transaction-injection at sign-time.** The app functioned as a wrapper around the legitimate wallet's API or presented a WebView-based wallet interface that injected malicious transaction parameters — replacing the user's intended recipient address with an attacker-controlled address while the confirmation UI displayed the legitimate destination. This extraction mode captures only the assets in the currently-connected wallet but can operate continuously over the app's installed lifetime.

The apps were periodically removed by app-store review teams — typically within days to weeks of community reports — but replacement apps under new developer accounts and slightly modified names reappeared within hours to days. The whack-a-mole dynamic is structurally identical to T4.008's ad-platform and T4.010's browser-extension-store dynamics: store-review cycles create a distribution window during which the phishing surface is live, and the attacker replenishes the surface faster than the review process removes it.

Notable campaigns:

- **Fake MetaMask Android app (Google Play, 2023–2024):** Multiple counterfeit MetaMask apps published under developer names including "MetaMask Dev," "MetaMask Labs," "Ethereum Wallet by MetaMask," and Cyrillic-script near-miss names. Several apps accumulated 10,000+ installs before removal. The extraction mode was primarily seed-phrase capture at "wallet import" time. MetaMask published warnings on their official channels noting that MetaMask does not have a standalone mobile app that requires seed-phrase import from the app-store-listed APK — the legitimate MetaMask Mobile app is distributed through the official Google Play listing under the verified "ConsenSys" developer account.

- **Fake Trust Wallet apps (Google Play and third-party APK sites, 2023–2025):** Counterfeit Trust Wallet apps targeting Binance Smart Chain and Ethereum users. Several campaigns combined fake Google Play listings with promoted posts on X/Twitter and Telegram directing users to the app-store listing — a multi-channel distribution surface combining T4.007 (app-store mechanic), T4.008 (social-platform ad distribution), and T4.002-class social-engineering distribution.

- **Fake Ledger Live mobile apps (Google Play, 2023–2024):** Counterfeit "Ledger Live" apps prompting users to enter their 24-word recovery phrase to "sync" their hardware wallet. Ledger has no legitimate mobile app that requires recovery-phrase entry — the entire app class is counterfeit — but users who had not internalised the "never enter your seed phrase into an app" invariant were successfully targeted. Ledger published repeated warnings across 2023–2024.

- **Fake Rabby / Phantom / Solana-wallet apps (2024–2025):** Counterfeit mobile apps targeting the Solana and multi-chain wallet ecosystems. Several campaigns exploited the lower app-store-review latency for crypto-wallet apps in certain regional app-store instances (APK sideloading markets, regional Google Play variants) — a distribution-surface sub-pattern that complicates mitigation at the global app-store review-process layer.

The campaigns chain T4.007 (the app-store-ranking-mechanic distribution surface) with T11.007.003 (seed-phrase exfiltration via brand-trust-leveraged phishing). The app-store listing is the trust-proxy that converts user caution ("don't click links in DMs") into user action ("install from the official app store" — except the app is counterfeit). The structural lesson is that **app-store review processes are a first-class phishing-defense surface**, and the gap between attacker-listing speed and review-team-removal speed is the distribution window the attacker exploits.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-Q1 | First wave of fake MetaMask / Trust Wallet apps on Google Play reported by community; apps accumulate installs before Google removes listings | T4.007 + T11.007.003 |
| 2023-Q2–Q4 | Campaigns expand to Ledger Live, imToken, and regional wallet brands; whack-a-mole cycle of removal and re-listing under new developer accounts | T4.007 |
| 2024-Q1–Q2 | Fake Rabby / Phantom apps targeting Solana ecosystem appear on Google Play and third-party APK sites | T4.007 |
| 2024-Q3–2025 | Sustained whack-a-mole; Apple App Store campaigns more limited due to stricter review process but isolated incidents reported | T4.007 |
| Continuing | App-store-based wallet phishing remains an active distribution surface through v0.1 cutoff | T4.007 (structurally open) |

## Public references

- MetaMask official warnings on fake Google Play apps (2023–2024)
- Ledger official warnings on fake Ledger Live mobile apps (2023–2024)
- Trust Wallet community reports and Binance security advisories on fake Trust Wallet apps
- ScamSniffer / Web3 Antivirus / SEAL ISAC drainer-campaign tracking covering app-store-distributed phishing
- ZachXBT / Lookonchain per-victim reporting on wallet-app phishing losses

## Discussion

The app-store phishing surface is structurally underappreciated in the T4 OAK coverage because the dominant phishing-distribution narratives centre on ad-platform distribution (T4.008), compromised-frontend distribution (T4.002), and engagement-weighted in-platform distribution (T4.007's Polymarket comment-section anchor). The app-store surface combines elements of all three: the store's own ranking mechanic funds distribution (T4.007), the counterfeit UI is a clone of the legitimate wallet (T4.008), and the installed app persists on the device in a manner structurally deeper than a web-page session (T4.010).

The app-store dimension also introduces a custody-substrate escalation not present in web-page phishing: a fake wallet app installed on a mobile device can request permissions (contacts, camera, clipboard, notification-listener) that a web page cannot, creating a broader device-compromise surface that extends beyond the wallet-drainer extraction chain. This dimension maps most cleanly to T11.007.003 (seed-phrase exfiltration) but the permission-escalation surface is a standalone risk dimension that future OAK versions should capture.
