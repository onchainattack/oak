# Trezor-impersonating physical-mail seed-phrase phishing campaign — 2025–2026

**Loss:** **Per-victim loss, not a single-incident total.** A phishing campaign distributed physical letters — printed on Trezor-branded letterhead with the Trezor logo and product imagery — to cryptocurrency users whose physical addresses were possibly obtained from past customer data breaches (the source only suggests this; how the addresses were obtained is unclear). The letters carried a QR code leading to a fake Trezor setup page and set a deadline of 15 February 2026 to "complete the authentication verification setup"; the page is described as a seed-phrase-harvesting clone. The campaign represents the physical-mail subclass of T11.007.003: the attacker leverages a legitimate hardware-wallet vendor's brand trust plus offline personalisation data to produce apparent legitimacy.
**OAK Techniques observed:** **OAK-T11.007.003** (Brand-Trust Active Phishing — Seed Phrase Exfiltration) — canonical physical-mail sub-pattern anchor. The device is genuine; the communication channel is counterfeit.
**Attribution:** **unattributed** — no public attribution.

**Key teaching point:** The Trezor-impersonating physical-mail campaign demonstrates that T11.007.003 operates across all communication channels — not just email and in-app prompts. A physical letter on vendor-branded letterhead, delivered to the victim's physical address, exploits a deeper layer of trust than a phishing email: the attacker has the victim's physical address (possibly from a prior data breach; unconfirmed), and a printed letter carries an implicit authenticity signal that email does not. The hardware-wallet vendor's invariant holds regardless of channel: no legitimate vendor will ever ask for your seed phrase via any channel — email, mail, phone, app, or support.

**Corrected 2026-10-11:** Trezor letters are dated February 2026 (15 Feb 2026 deadline) and used a QR code, not a typed domain; the 2025 letters were Ledger-branded; the `trezor.io-verify.dev` domain, "beginning in 2025" and the Trezor-advisory claims were removed, and the data-breach address source is stated as unconfirmed.

## Summary

Trezor-branded letters were reported in February 2026 (crypto.news 2026-02-15; HackMag 2026-02-18). Earlier physical-mail phishing in 2025 was Ledger-branded (fake Ledger letters reported in spring 2025 and dated 2025-10-15), so the Trezor letters are a later follow-on of the same physical-mail pattern, not a 2025 Trezor campaign. The Trezor letters used official-looking letterhead and a deadline of 15 February 2026 (waived for buyers of Trezor Safe 1/3/5/7 after 2025-11-30) to push recipients to a fake setup page.

Operational characteristics per the sources: (1) the link was delivered as a QR code rather than a typed domain; (2) the QR code led to a fake Trezor setup page that was still live when HackMag wrote, while one related phishing domain had been blocked; (3) the QR-code delivery exploits the trust heuristic common in hardware-wallet setup flows. Specific domain names previously listed here (`trezor.io-verify.dev`) and domain-registration details are unsupported and were removed.

The reporting advises recipients to destroy the letters, not scan the QR code, and enter a seed phrase only on the device itself; no Trezor advisory is cited in the sources seen. The campaign was active in February 2026.

## Public references

- `[cryptonewstrezor2026]` — crypto.news, "Crypto hackers target Trezor and Ledger users in theft campaign" (2026-02-15): <https://crypto.news/crypto-hackers-target-trezor-ledger-users-in-theft/>
- `[hackmagtrezor2026]` — HackMag, "Attackers Are Sending Physical Letters to Trezor and Ledger Wallet Owners" (2026-02-18): <https://hackmag.com/news/real-life-phishing>
