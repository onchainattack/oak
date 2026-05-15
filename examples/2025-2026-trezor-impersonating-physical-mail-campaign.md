# Trezor-impersonating physical-mail seed-phrase phishing campaign — 2025–2026

**Loss:** **Per-victim loss, not a single-incident total.** A phishing campaign distributed physical letters — printed on Trezor-branded letterhead with the Trezor logo and product imagery — to cryptocurrency users whose physical addresses were obtained from prior data-breach compilations. The letters instructed recipients to visit a typosquat domain (e.g., `trezor.io-verify.dev`) and enter their BIP39 seed phrase to "secure their wallet after a security incident." The campaign represents the physical-mail subclass of T11.007.003: the attacker leverages a legitimate hardware-wallet vendor's brand trust plus offline personalisation data to produce apparent legitimacy.
**OAK Techniques observed:** **OAK-T11.007.003** (Brand-Trust Active Phishing — Seed Phrase Exfiltration) — canonical physical-mail sub-pattern anchor. The device is genuine; the communication channel is counterfeit.
**Attribution:** **unattributed** — no public attribution at v0.1 cutoff.

**Key teaching point:** The Trezor-impersonating physical-mail campaign demonstrates that T11.007.003 operates across all communication channels — not just email and in-app prompts. A physical letter on vendor-branded letterhead, delivered to the victim's physical address, exploits a deeper layer of trust than a phishing email: the attacker has the victim's physical address (from a prior data breach), and a printed letter carries an implicit authenticity signal that email does not. The hardware-wallet vendor's invariant holds regardless of channel: no legitimate vendor will ever ask for your seed phrase via any channel — email, mail, phone, app, or support.

## Summary

Beginning in 2025, cryptocurrency users — particularly Trezor hardware-wallet owners whose physical addresses appear in breach compilations — received physical letters purporting to be from Trezor's security team. The letters used Trezor's logo, product imagery, and security-branded language to instruct recipients to visit a typosquat domain and enter their BIP39 seed phrase under the pretext of a "critical security update" or "firmware vulnerability remediation."

The campaign's key operational characteristics: (1) the typosquat domains were registered shortly before letter distribution, with near-miss Levenshtein distances to `trezor.io`; (2) the domains served a Trezor-branded web UI that guided victims through entering their 12/24-word seed phrase; (3) the physical letters included a QR code linking directly to the typosquat domain — exploiting the QR-code trust heuristic common in hardware-wallet setup flows.

Trezor published a security advisory confirming that the campaign was not a legitimate communication and reiterating that Trezor never asks for seed phrases via any channel. The campaign remained active through early 2026 at v0.1 cutoff.

## Public references

- Trezor security advisories: physical-mail phishing campaign warning (2025).
- Kaspersky Threat Intelligence: physical-mail phishing campaign tracking (2025-2026).
- Domain registration data for typosquat domains targeting `trezor.io` (Certificate Transparency logs).
