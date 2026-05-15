# Fake Ledger Live — Microsoft App Store — 2023-11

**Loss:** 16.8+ BTC (~$588K at time) from victims who installed a fake Ledger Live application from the official Microsoft App Store.
**OAK Techniques observed:** OAK-T4.010 (Fake Security Tool Browser Extension Phishing) — extends to fake security tool in official app store; OAK-T6 (Authorization / Key Compromise) — seed phrase entry into fake app.
**Attribution:** **Pseudonymous** — scammer address `bc1qg05gw43elzqxqnl...` identified on-chain.

**Key teaching point:** The fake Ledger Live in the Microsoft App Store demonstrates the **official app store as phishing vector** — a user who follows best practices (downloading from the official Microsoft Store, not a random website) can still install a malicious application. The attack exploits trust in the app store's verification process. Detection approach: security vendors should monitor official app stores for brand-impersonating applications; users should verify that hardware wallet applications NEVER request seed phrase entry (Ledger Live never asks for your seed phrase — only the hardware device displays it).

## Summary

In November 2023, a fake Ledger Live application was published on the official Microsoft App Store. The app impersonated Ledger's legitimate application but contained malicious code that prompted users to enter their seed phrase (recovery phrase) — which the legitimate Ledger Live application NEVER does.

At least 16.8 BTC (~$588K) was stolen from victims who installed the fake app and entered their seed phrase. The scammer's Bitcoin address was identified on-chain.

The case highlights the vulnerability of official app stores to impersonation: the Microsoft Store's verification process failed to detect a fake Ledger app. Users who trusted the "Microsoft verified" label were compromised.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| Pre-Nov 2023 | Fake Ledger Live app published on Microsoft App Store. Passes Microsoft's verification | **T4.010 app store phishing** |
| 2023-11 | Users install fake app, enter seed phrases. 16.8+ BTC stolen | **T6 seed phrase compromise** |
| 2023-11-05 | ZachXBT community alert. Scammer address identified | (public alert) |

## What defenders observed

- **App store trust exploitation:** The fake app was in the OFFICIAL Microsoft Store. Users who checked for "is this in an official app store?" as a security measure were deceived.
- **Seed phrase request as definitive signal:** Ledger Live NEVER asks for your seed phrase. This is the single most reliable detection signal for fake wallet applications — any software asking for a seed phrase is malicious by definition.
- **App store review gap:** Microsoft's app review process failed to detect the brand impersonation. This is a recurring problem across all app stores (Apple App Store, Google Play, Microsoft Store).

## What this example tells contributors

- **Official app store phishing is a T4.010 extension.** The attack surface is the app store's verification process, not the user's judgment about download sources. T4.010 should explicitly cover "fake security tool in official app store" as a vector distinct from "fake browser extension from third-party site."
- **Seed phrase request = compromise.** No legitimate crypto application will ever ask for your seed phrase. This is a binary detection rule with zero false positives. OAK detection specs should include this as a hard rule.
- **Brand monitoring for app stores is a detection data source.** Security vendors can and should monitor app stores for applications impersonating known crypto brands (Ledger, Trezor, MetaMask, etc.). This is a pre-incident detection primitive.

## Public references

- [ZachXBT — Fake Ledger Live Alert (X/Twitter)](https://twitter.com/zachxbt/status/1721118310460252512)
- Scammer BTC address: `bc1qg05gw43elzqxqnl...` (documented in alert).
- Ledger official guidance: Ledger Live will NEVER ask for your 24-word recovery phrase.
