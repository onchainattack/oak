# Fake MetaMask Chrome extension campaign — EVM/multi-chain — 2024-01 to 2024-06

**Loss:** approximately **$3.2 million** drained from over 2,000 identified victims over a ~5-month campaign. The malicious Chrome extension, published under the developer name "MetaMask Labs" and titled "MetaMask — Crypto Wallet & DeFi Gateway," accumulated over 30,000 Chrome Web Store installations before removal. The extension exfiltrated seed phrases entered during a fake "wallet import" flow and injected malicious transaction parameters at sign time. Per-victim losses ranged from $200 to $340,000, with the largest single victim being a DeFi yield farmer whose 12-word seed phrase was exfiltrated and whose wallets across Ethereum, Arbitrum, and Optimism were swept.

**OAK Techniques observed:** **OAK-T4.010** (Fake Security-Tool / Browser-Extension Phishing — primary; the extension impersonated MetaMask's legitimate browser-extension surface, using a typosquatted developer name and a keyword-targeted Chrome Web Store listing to appear in search results for users looking to install or re-install MetaMask) + **OAK-T11.007.003** (Brand-Trust-Leveraged Active Phishing for Seed-Phrase Exfiltration — the extension prompted users to enter their 12- or 24-word seed phrase during a fake "restore wallet" or "import existing wallet" flow, exfiltrating the seed to attacker-controlled servers) + **OAK-T4.001** (Permit2 Signature-Based Authority Misuse — for victims who connected via private key import rather than seed phrase entry, the extension injected malicious Permit2 signature requests at transaction-signing time).

**Attribution:** **pseudonymous** — the Chrome Web Store developer account operated under the name "MetaMask Labs" with a Gmail-based publisher email. Google removed the extension following community and security-researcher reports in June 2024. No named individual has been publicly attributed at v0.1. The extension's C2 infrastructure (domain `metamask-labs[.]com` and API endpoints) was registered through Namecheap with WHOIS privacy enabled.

**Key teaching point:** This campaign demonstrates the **typosquatted-developer-name sub-pattern** of T4.010: rather than spoofing the extension name alone ("MetaMask"), the attacker published under a developer name ("MetaMask Labs") designed to appear as an official or affiliated MetaMask entity in the Chrome Web Store UI. The extension's 30,000+ installation count illustrates the scale achievable when a counterfeit extension successfully targets the keyword-search surface — users searching "MetaMask" on the Chrome Web Store found the counterfeit extension as a top result due to keyword-optimised listing metadata, a high-install-count social-proof signal, and purchased fake reviews.

## Summary

In early 2024, a counterfeit MetaMask Chrome extension was published on the Chrome Web Store under the developer name "MetaMask Labs." The extension listing used the title "MetaMask — Crypto Wallet & DeFi Gateway" and included keyword-optimised descriptions, screenshots copied from the legitimate MetaMask listing, and a growing collection of purchased positive reviews (predominantly templated, bot-generated comments). The extension appeared in Chrome Web Store search results alongside — and in some search-query configurations, above — the legitimate MetaMask extension published by "MetaMask" (the official developer, with over 10 million users).

The counterfeit extension implemented a dual-extraction surface:

1. **Seed-phrase exfiltration (T11.007.003 path):** During the extension's onboarding flow, users were presented with a fake "import existing wallet" screen that prompted them to enter their 12- or 24-word recovery phrase. The screen was pixel-identical to the legitimate MetaMask import flow. Entered seed phrases were transmitted to attacker-controlled servers (`api.metamask-labs[.]com`) and stored for subsequent multi-chain wallet sweeping. Because the seed phrase unlocks all accounts derived from it, the attacker could sweep assets across all chains and all accounts the victim had ever created from that seed — a structurally more severe extraction surface than a single-chain transaction-injection attack.

2. **Transaction-parameter injection (T4.001 path):** For users who bypassed the seed-phrase entry screen (e.g., by importing a single private key or by connecting an existing wallet), the extension injected malicious Permit2 signature requests at transaction-signing time. The extension hooked `window.ethereum` and intercepted `eth_sendTransaction` and `eth_signTypedData_v4` calls, replacing the user's intended transaction parameters with Permit2 payloads authorising token-spend to attacker-controlled addresses. The MetaMask confirmation UI displayed the Permit2 payload, but users who had installed the fake extension often did not scrutinise the confirmation details, trusting that the extension they had deliberately installed was legitimate.

The extension survived on the Chrome Web Store for approximately five months (January to June 2024) before being removed. During this period, it accumulated over 30,000 installations and drained approximately $3.2 million across more than 2,000 identified victims. The campaign's longevity was aided by three factors: (a) the Chrome Web Store review process did not flag the typosquatted developer name; (b) the purchased fake reviews created a social-proof signal that disincentivised new users from investigating further; and (c) the extension's manifest requested permissions (`storage`, `activeTab`, `scripting`, `clipboardRead`) that were plausible for a legitimate crypto wallet extension.

Analysis by ScamSniffer and CertiK identified the C2 infrastructure and linked it to a broader campaign involving counterfeit Rabby Wallet and Phantom Wallet extensions published under similar typosquatted developer names ("Rabby Labs," "Phantom Technologies"). Google removed all identified counterfeit extensions in a batch takedown following coordinated security-researcher reports in June 2024.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-01 | Fake "MetaMask Labs" Chrome extension published on Chrome Web Store; listing uses keyword-optimised title and copied screenshots; begins accumulating fake reviews | T4.010 (extension distribution surface) |
| 2024-01 to 2024-03 | Extension accumulates ~10,000 installations; victims begin reporting anomalous wallet activity on Reddit (r/MetaMask, r/CryptoCurrency) and Discord | **T4.010 + T11.007.003 execution** |
| 2024-03 to 2024-05 | Extension installation count grows to ~25,000; counterfeit Rabby and Phantom extensions published under "Rabby Labs" and "Phantom Technologies" developer names using the same C2 infrastructure | T4.010 (cohort scale-out) |
| 2024-05-15 | Security researcher (ScamSniffer) analyses extension manifest and identifies C2 infrastructure `metamask-labs[.]com`; publishes preliminary alert via X/Twitter thread | (defender-side detection) |
| 2024-06-10 | Coordinated security-researcher report submitted to Google Chrome Web Store; all identified counterfeit extensions removed in batch takedown | (defender response — takedown) |
| 2024-06 onward | Residual victims with unrevoked approvals and swept wallets; MetaMask publishes advisory warning users to verify developer name before installing wallet extensions | (post-takedown remediation) |

## Realised extraction

Approximately $3.2 million in aggregate. The seed-phrase-exfiltration path accounted for the dominant share of losses (estimated ~75% of aggregate, or ~$2.4 million), as it enabled multi-chain wallet sweeping. The transaction-injection path accounted for the remainder (~$800,000). The largest single-victim loss was approximately $340,000 from a DeFi yield farmer whose seed phrase was exfiltrated and whose positions across Ethereum mainnet, Arbitrum, and Optimism were systematically unwound and swept. Proceeds were routed through cross-chain bridges and instant-swap services; recovery was not achieved.

## Public references

- Cross-reference: T4.010 at `techniques/T4.010-fake-security-tool-browser-extension-phishing.md`.
- Cross-reference: T11.007.003 at `techniques/T11.007.003-brand-trust-active-phishing-seed-exfiltration.md`.
- Cross-reference: `examples/2022-2025-fake-browser-extension-phishing-cohort.md` — broader cohort context for fake browser extension campaigns.
- Cross-reference: `examples/2025-01-hyperliquid-trading-bot-malware-campaign.md` — protocol-specific tooling phishing variant of T4.010.
- `[scamsniffermetamask2024]` — ScamSniffer, "Counterfeit MetaMask Extension on Chrome Web Store — 30K+ Installations, $3.2M Drained" (2024-06).
- `[certikmetamask2024]` — CertiK, "Fake MetaMask Chrome Extension Campaign — Dual-Extraction Surface Analysis" (2024-06).

## Public References

See citations in corresponding technique file.
