# Fearless Wallet — the browser extension sent users' private keys to an outside server for about twenty months — Fearless Wallet / Polkadot — 2026-10-21

**Loss:** **17,286 DOT** reported by 8 users (Polkadot Community Foundation via press); every key ever held in the extension is exposed.

**OAK Techniques observed:** **OAK-T11.002** (Wallet-Software Distribution Compromise — *primary*. The Polkadot Technical Fellowship, investigating for the Polkadot Community Foundation, found the Fearless Wallet browser extension "had been compromised and had been leaking users' private keys since February 2025". Press reports name extension versions 3.0.1, 3.0.3, 3.0.4 and 3.0.5 and say the mobile apps did not contain the code. See [`techniques/T11.002-wallet-software-distribution-compromise.md`](../techniques/T11.002-wallet-software-distribution-compromise.md)). How the code entered the build is not published.

**Attribution:** **unattributed.** Fearless is an independent third-party wallet.

**Key teaching point:** **A leaking wallet looks fine until someone spends the keys.** Twenty months of exfiltration produced only eight visible victims; the remedy is a new keypair, not a password change.

## Summary

Polkadot published the warning on 2026-10-21 and told users to create new keys in another wallet.

## Timeline (UTC)

Read it as three stages. **Get in**: malicious code in the browser extension. **Prepare**: not published. **Take**: keys leaked to an outside server, then spent by someone. Times are from Polkadot's notice; press detail is as summarised in this file (Crypto Briefing could not be fetched).

| When | What happened | OAK |
|---|---|---|
| Before 2025-02 (undisclosed) | How the leaking code entered the Fearless Wallet browser extension build is not published. | **T11.002** entry |
| From 2025-02 | The extension begins leaking users' private keys. Press names extension versions 3.0.1, 3.0.3, 3.0.4 and 3.0.5, and says the mobile apps did not contain the code. | **T11.002** |
| 2025-02 to 2026-10 (undisclosed) | Where the keys were sent and when funds were taken are not published. Eight users report 17,286 DOT stolen in total (Polkadot Community Foundation via press). | — |
| before 2026-10-21 (undisclosed) | The Polkadot Technical Fellowship investigates on behalf of the Polkadot Community Foundation and finds the extension compromised. | — |
| 2026-10-21 14:13:03 | Polkadot publishes a security alert: Fearless is an independent third-party wallet, the extension has leaked keys since February 2025, and users should create a new keypair in a different wallet and move funds. | response |

Key addresses:

- No attacker, receiving or exfiltration-server addresses are published in the cited sources.

## Root-cause evidence

- **Technique:** OAK-T11.002
- **Source:** <https://x.com/Polkadot/status/2112910039207800970>; <https://cryptobriefing.com/polkadot-fearless-wallet-private-key-leak/>
- **Source type:** operator
- **Confidence:** corroborated
- **Evidence:** the ecosystem foundation's investigation states the extension leaked keys; press adds versions and the DOT figure.

## Public references

- `[polkadotfearless2026]` — Polkadot on X (2026-10-21): <https://x.com/Polkadot/status/2112910039207800970>
- `[cryptobriefingfearless2026]` — Crypto Briefing, "Polkadot warns Fearless Wallet users to move funds after key leak": <https://cryptobriefing.com/polkadot-fearless-wallet-private-key-leak/>
