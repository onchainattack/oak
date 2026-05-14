# Cloud-Document / Email-Draft Seed-Phrase Storage Compromise Cohort — 2023–2025

**Loss:** Not centrally tabulated; individual victim losses range from five figures to low seven figures. The attack class is diffuse — victims who stored seed-phrase material in cloud documents (Google Docs, Microsoft OneNote, Apple Notes, Notion), email drafts, messaging-app saved messages (Telegram Saved Messages, WhatsApp self-chats), or screenshot galleries (iCloud Photos, Google Photos) and whose cloud accounts were subsequently compromised.
**OAK Techniques observed:** **OAK-T11.006.001** (User-Initiated Plaintext-Equivalent Seed Storage — primary; the user explicitly chose to store seed-phrase material in a third-party cloud service whose encryption is gated by a user-memorised or account-recovery credential). **OAK-T11.001** (Credential Compromise / SIM-Swap — the proximate cloud-account compromise vector; SIM-swap, credential-stuffing, or phishing against the cloud-account credential). **OAK-T4.008** (Phishing / Social Engineering — where the cloud-account compromise was phishing-mediated).
**Attribution:** **pseudonymous** at the individual-attacker level; no single operator cluster dominates the class. The attack surface is per-victim and per-cloud-account — any user who stored seed material in a cloud service with weak credential hygiene is a standing T11.006.001 surface.
**Key teaching point:** **T11.006.001 covers the full spectrum of user-initiated seed storage beyond password managers: cloud documents, email drafts, messaging apps, and screenshot galleries. The structural feature is the same as the LastPass class — the seed phrase is plaintext-equivalent in the cryptographic sense because the key that gates the ciphertext is a user-memorised or account-recovery credential whose entropy is far below 128 bits. The attack surface is larger than the LastPass cohort alone; any cloud service with a non-trivial crypto-holding user base where users have stored seed material is a standing T11.006.001 surface at scale.**

## Summary

While the LastPass encrypted-vault exfiltration cohort (December 2022, ~$35M+ across ~150+ victims) is the canonical T11.006.001 anchor because the server-side vault exfiltration provides a clean common-cause signature, the broader T11.006.001 surface encompasses all cases where a user explicitly chose to store seed-phrase material in a third-party cloud service. The most common non-password-manager storage surfaces include:

- **Cloud documents:** Google Docs, Microsoft OneNote, Apple Notes, Notion — users create a document containing their seed phrase and store it in a cloud-synced document service.
- **Email drafts:** Gmail / Outlook / Proton Mail — users compose an email containing their seed phrase and save it as a draft. The draft is synced to the email provider's servers. Email-account compromise (password reuse, SIM-swap recovery, phishing) yields the seed phrase.
- **Messaging-app saved messages:** Telegram Saved Messages, WhatsApp self-chats, Signal Note to Self — users send their seed phrase to themselves in a messaging app. The message is stored on the provider's servers (Telegram) or in a cloud backup (WhatsApp, Signal). Account compromise or device theft yields the seed.
- **Screenshot galleries:** iCloud Photos, Google Photos — users screenshot their seed phrase during wallet setup. The screenshot is synced to the cloud photo library. Cloud-account compromise yields the screenshot.
- **Cloud-synced text files:** Dropbox, OneDrive, Google Drive — users create a .txt file with their seed phrase and save it to a cloud-synced folder.

The per-victim commonality is diffuse — unlike the LastPass cohort, there is no single server-side breach event that links victims. Detection depends on per-victim interview methodology (ZachXBT / Taylor Monahan process-of-elimination), where interviewers eliminate on-chain phishing, SIM-swap, malware, and exchange-account compromise as attack vectors, and the remaining commonality is cloud-service storage of seed material.

The attack-vector time-shift between cloud-account compromise and realised on-chain drain is typically hours to days (faster than the LastPass brute-force window because the cloud document is already plaintext or gated by a credential that is known-compromised). The critical user-side error is the dual failure: storing seed material in a cloud service AND maintaining weak credential hygiene on that cloud account.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2017–2022 | Crypto users increasingly store seed-phrase material in cloud documents, email drafts, messaging apps, and screenshot galleries — a user-behaviour pattern that predates the LastPass breach but lacked a central forensic signature | **T11.006.001 surface creation** |
| 2022-12 | LastPass encrypted-vault exfiltration — canonical T11.006.001 anchor with a clean common-cause signature | **T11.006.001 canonical anchor** |
| 2023–2025 | Industry forensics (ZachXBT, Taylor Monahan / MetaMask, TRM Labs) document per-victim cases of seed-phrase compromise via cloud-document / email-draft / messaging-app storage; per-victim interview methodology becomes the standard forensic surface | **T11.006.001 cohort expansion** |
| 2024–2025 | MetaMask and other wallet vendors publish guidance explicitly listing cloud-document / email-draft / messaging-app / screenshot storage as surfaces to avoid | (vendor-side guidance) |
| Ongoing | Per-victim compromise continues; no central remediation possible because there is no single service provider whose breach gates the class | (standing surface) |

## Realised extraction

Not centrally tabulated; individual victim losses range from five figures to low seven figures. No central recovery mechanism exists because the class is per-victim and per-cloud-account.

## Public references

- Cross-reference: T11.006.001 (User-Initiated Plaintext-Equivalent Seed Storage) at `techniques/T11.006.001-user-initiated-plaintext-seed-storage.md`.
- [`examples/2022-12-lastpass-vault-cohort.md`](../examples/2022-12-lastpass-vault-cohort.md) — LastPass encrypted-vault exfiltration (canonical T11.006.001 anchor, ~$35M+ across ~150+ victims).
- MetaMask security guidance on seed-phrase storage (2024–2025) — explicitly lists cloud documents, email drafts, messaging apps, and screenshots as storage surfaces to avoid.
- ZachXBT / Taylor Monahan per-victim interview methodology — process-of-elimination cohort tracking as the canonical forensic surface for non-LastPass T11.006.001 cases.
- TRM Labs crypto-drain attribution reporting (2024–2025) — includes cloud-document and email-draft seed-storage cases in per-victim forensic analysis.
