# Fake Revoke.cash / Wallet-Security Browser-Extension Phishing — 2023–2025

**Loss:** cumulative ~$3.5M+ across known campaigns; per-campaign losses from ~$100K (single-extension, short-listing-window campaign) to ~$1.2M (multi-month sustained-listing campaign). The dual-extraction surface (seed-phrase capture + transaction-parameter injection) makes per-victim losses structurally severe — a single seed-phrase-exfiltrating extension compromises all accounts derived from that phrase.
**OAK Techniques observed:** **OAK-T4.010** (Fake Security-Tool / Browser-Extension Phishing — the counterfeit extension impersonates a legitimate wallet-security tool; the browser-extension persistence surface provides standing access across browser sessions.) **OAK-T11.007.003** (Brand-Trust-Leveraged Active Phishing for Seed-Phrase Exfiltration — when the extension's extraction mode targets the seed phrase, it chains T4.010 distribution into T11-class exfiltration.) **OAK-T6.001** (Source-Verification Mismatch — the extension's Chrome Web Store listing presents it as a legitimate security tool; the installed extension's actual behaviour diverges from the store-listing description.)
**Attribution:** **pseudonymous** at Chrome Web Store developer-account level; individual operator attribution not established. Several campaigns attributed to the same Drainer-as-a-Service operator clusters responsible for T4.008 (Fake-DEX Clone-Frontend) and T4.009 (Pre-Token Anticipation) phishing — the shared drainer-contract backend is the cluster-attribution signal.

**Key teaching point:** **Fake security-tool extensions exploit the same trust-proxy dynamic as fake wallet apps but with a deeper persistence surface.** Users install the extension specifically to *improve* their wallet security — the attacker inverts the user's security-seeking behaviour into a compromise vector. The extension's persistence (survives tab closure, browser restart, and typically OS reboot) gives the attacker a standing observation-and-injection surface that no web-page phishing attack can provide. The Chrome Web Store review process — the load-bearing defense — operates at review-cycle latency that is structurally slower than the attacker's re-listing speed: extensions are typically removed within days to weeks of community reporting, but replacement extensions appear within hours. The structural mitigation surface is at the wallet-provider layer (extension-origin verification at sign-time, known-malicious extension-ID blocklisting) and at the user-side invariant layer ("no legitimate wallet-security tool will ever ask for your seed phrase or private key").

## Summary

Between 2023 and 2025, attackers published counterfeit browser extensions impersonating legitimate wallet-security tools — Revoke.cash (the canonical token-allowance-revocation tool), Wallet Guard, Pocket Universe, and similar transaction-simulation / approval-auditing browser extensions. The fake extensions were distributed through the Chrome Web Store (and, less frequently, the Firefox Add-ons store) under typosquatted developer names and near-miss extension names.

The attack pattern exploited a structural user-behaviour dynamic: users who have internalised "don't trust random airdrop links" have also internalised "use security tools to protect your wallet." The attacker supplies the "security tool" the user's mental model demands — a counterfeit Revoke.cash extension, a fake "Wallet Guard Pro," a typosquatted "Pocket Universe Security" — and the user installs it believing they are hardening their wallet. The extension then operates across two extraction modes (structurally identical to the fake-wallet-extension class covered in the broader T4.010 cohort):

1. **Seed-phrase / private-key capture.** The extension presents a "wallet security scan" or "token-allowance audit" UI that prompts the user to enter their seed phrase or private key to "scan for vulnerabilities." The captured credential is transmitted to an attacker-controlled server. This extraction mode is structurally identical to the T4.010 fake-wallet-extension mode and chains into T11.007.003.

2. **Transaction-parameter injection at sign-time.** The extension injects a content script that hooks `window.ethereum` or equivalent wallet-provider objects and modifies transaction parameters in-flight — replacing the user's intended recipient address with an attacker-controlled address, or injecting a malicious approval transaction when the user believes they are signing a benign "security scan" transaction.

The dual-extraction surface makes fake security-tool extensions structurally broader than a single-mechanism phishing page. The extension's persistent access to all browser tabs (via the `*://*/*` host permission declared in the extension manifest) means the attacker can observe every dApp the user interacts with, every transaction the user signs, and every wallet address the user controls — continuously, across the extension's entire installed lifetime.

Notable campaigns:

- **Fake Revoke.cash extensions (2023–2025):** The most recurrent sub-pattern. Revoke.cash is the canonical token-allowance-revocation tool and is widely recommended in wallet-security guidance. Attackers published extensions under names including "Revoke Cash," "Revoke.cash Pro," "Token Approval Checker by Revoke," and other near-miss variants. The legitimate Revoke.cash is a *website* (`revoke.cash`), not a browser extension — but users who had internalised "use Revoke.cash" without internalising "Revoke.cash is a website, not an extension" were successfully targeted. The legitimate Revoke.cash team published repeated warnings across 2023–2025 clarifying that they do not offer a browser extension.

- **Fake Wallet Guard / Pocket Universe extensions (2024–2025):** Counterfeit extensions impersonating transaction-simulation browser extensions. These campaigns were structurally more sophisticated — the fake extension provided a superficially functional transaction-simulation UI (showing the user what a transaction would do) but injected malicious transaction parameters at the confirmation step *after* the simulation was displayed. The user saw a benign simulation result, clicked "confirm," and the injected malicious transaction executed. This "simulation-display-to-confirmation-injection gap" is a T4.010 sub-pattern distinct from the simpler seed-phrase-capture mode — it exploits the user's trust in the simulation output rather than the user's willingness to enter a seed phrase.

- **Fake "ETH Recovery" / "Crypto Asset Recovery" extensions (2023–2025):** Extensions claiming to recover lost/stuck funds or "scan for compromised approvals." The recovery-service framing targets users who have already experienced a loss and are seeking remediation — a psychologically acute phishing surface because the user's security-seeking behaviour is heightened after a loss and their willingness to follow "recovery instructions" is elevated.

The campaigns chain T4.010 (the browser-extension distribution surface) with T11.007.003 (seed-phrase exfiltration) and T6.001 (source-verification mismatch — the extension store listing describes a security tool but the installed extension behaviour diverges). The multi-year persistence of the fake-security-tool sub-pattern reflects the structural gap between the Chrome Web Store's review-process latency and the attacker's re-listing speed.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-Q1 | First fake Revoke.cash extensions appear on Chrome Web Store; community reports surface on r/CryptoCurrency and X/Twitter | T4.010 |
| 2023-Q2–Q4 | Campaigns expand to fake Wallet Guard, "ETH Recovery," and "Token Allowance Checker" extensions | T4.010 + T11.007.003 |
| 2024-Q1 | Fake Pocket Universe / transaction-simulation extensions with simulation-to-confirmation injection gap appear | T4.010 |
| 2024-Q2–2025 | Sustained whack-a-mole: extensions removed by Chrome Web Store review team, replacement extensions appear under new developer accounts | T4.010 |
| Continuing | Fake security-tool browser extensions remain an active distribution surface through v0.1 cutoff | T4.010 (structurally open) |

## Public references

- Revoke.cash official warnings on fake browser extensions (2023–2025)
- Wallet Guard, Pocket Universe, and other security-tool vendor community advisories on counterfeit extensions
- ScamSniffer / Web3 Antivirus / SEAL ISAC extension blocklist entries
- Chrome Web Store developer policy enforcement records (extension removals)
- Community reporting on fake security-tool extensions (r/CryptoCurrency, X/Twitter, wallet-vendor Discord servers)

## Discussion

The fake-security-tool extension sub-pattern is the most psychologically acute T4.010 surface because the attacker exploits the user's security-seeking behaviour — the same behaviour that security guidance encourages. The user's mental model ("install security tools to protect your wallet") is correct, but the attacker supplies a counterfeit tool that inverts the model into a compromise vector. The structural lesson for security-tool vendors is that **the extension store listing itself is a trust surface that must be defended**: the vendor's canonical listing URL, verified publisher badge, and extension ID should be published prominently and users should be trained to verify these before installation.

The simulation-display-to-confirmation-injection gap observed in the fake Pocket Universe / Wallet Guard campaigns (2024–2025) is structurally important: it demonstrates that the attacker's extraction surface operates at the *gap* between the user's security-tool-mediated view of a transaction and the actual on-chain transaction parameters. This gap is not closable by simulation-tool improvement alone — it requires wallet-side extension-origin verification that detects injected content scripts hooking the wallet-provider object. This detection surface was not uniformly deployed across wallet providers at v0.1 cutoff.
