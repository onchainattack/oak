# iOS WhatsApp iCloud-backup wallet-seed exfiltration cohort — multi-chain — 2024

**Loss:** estimated \$2.5M aggregated across ~30+ individual victims whose wallet seed phrases or private keys were stored in WhatsApp self-chats or media attachments that were included in iCloud backups. The victim's Apple ID was compromised (SIM-swap, phishing, or Apple Support social-engineering), granting access to the iCloud backup containing the WhatsApp data that held seed-phrase material.
**OAK Techniques observed:** **OAK-T11.006.002** (Implicit Cloud-Custody via Default-On Cloud-Backup) — primary; the WhatsApp application's media and chat-backup data was included in the device's iCloud backup by default, and the user had stored seed-phrase material in WhatsApp self-chats or as media attachments. The cloud-backup surface was created implicitly — the user did not actively choose to back up seed-phrase material to iCloud, but the default-on OS-level backup captured it. **OAK-T11.006.001** (User-Initiated Plaintext-Equivalent Seed Storage) — structurally adjacent; the user's affirmative action to store seed-phrase material in WhatsApp self-chats is the T11.006.001 surface; the iCloud backup's capture of that data is the T11.006.002 amplification surface.
**Attribution:** **inferred-strong** at the cohort level (process-of-elimination methodology). Individual attackers are pseudonymous; the Apple-ID compromise paths (SIM-swap, phishing, Support social-engineering) point to distinct operator clusters.
**Key teaching point:** **The WhatsApp iCloud-backup cohort demonstrates that T11.006.002 (implicit cloud-custody via default-on backup) amplifies T11.006.001 (user-initiated plaintext-equivalent storage) — the user's WhatsApp self-chat seed storage is a T11.006.001 surface, and the iCloud backup's default-on capture of that WhatsApp data creates a T11.006.002 custody surface the user did not realise existed.** The defender lesson: WhatsApp self-chats, Telegram Saved Messages, and any messaging-platform storage of seed-phrase material is doubly exposed — once to the messaging platform's own security model, and again to the OS-level cloud-backup surface.

## Summary

A cohort of crypto-theft victims emerged through 2024 whose commonality was seed-phrase material stored in WhatsApp self-chats (messages sent to oneself) or WhatsApp media attachments (screenshots of seed phrases). Many users, following the operational-security heuristic of "keep your seed phrase somewhere digital but not in a password manager," had sent their seed phrases to themselves on WhatsApp — either as text in self-chats or as screenshots saved in WhatsApp media.

The compromise path operated at two layers:

1. **T11.006.001 surface (user-initiated):** The user affirmatively stored seed-phrase material in WhatsApp self-chats or media. This is the user-initiated plaintext-equivalent storage surface — the user chose the storage destination.
2. **T11.006.002 surface (implicit cloud-backup):** WhatsApp's chat and media data was included in the device's iCloud backup (the default iOS configuration). The user did not actively choose to back up this data to iCloud — the OS-level default captured it. The iCloud backup was tied to the user's Apple ID, whose security posture (SIM-swap susceptibility, Apple Support social-engineering vectors) was independent of the user's on-chain security hygiene.

The exploitation chain: the attacker compromised the victim's Apple ID (via SIM-swap, Apple-ID phishing, or Apple Support social-engineering), accessed the iCloud backup, extracted the WhatsApp backup data containing the seed-phrase material, and drained the associated on-chain wallets.

The incident structurally combines T11.006.001 and T11.006.002: the user's seed-phrase-in-WhatsApp storage is T11.006.001; the iCloud backup's default-on capture is T11.006.002. The combination creates a custody surface whose effective security is bounded by the weaker of (a) WhatsApp's chat-storage security, (b) iCloud's backup security, and (c) the user's Apple ID security posture — none of which match the 128-bit security of the seed phrase itself.

The WhatsApp iCloud-backup cohort is the structurally important confirmation that T11.006.002 extends beyond wallet-app-specific cloud-backup (the MetaMask/iCloud case) to any application data that stores seed-phrase material and is captured by default-on OS-level backups.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2024 | Users store seed-phrase material in WhatsApp self-chats or media attachments | T11.006.001 surface (latent) |
| Pre-2024 | iOS iCloud Backup (default-on) captures WhatsApp data — including self-chat seed-phrase material — in device backups | T11.006.002 surface (latent) |
| 2024 | Apple-ID compromise wave (SIM-swap, phishing, Apple Support social-engineering) grants attackers access to iCloud backups containing WhatsApp seed-phrase data | (entry vector) |
| 2024 | ~30+ victims identified; ~\$2.5M aggregate loss; wallets drained across multiple chains | **T11.006.001 + T11.006.002** extraction |
| 2024 | Industry forensics (ZachXBT, Taylor Monahan process-of-elimination) identify WhatsApp-iCloud-backup commonality | (cohort attribution) |
| Continuing | Cohort drain window is open; any user whose seed-phrase material remains in WhatsApp self-chats subject to iCloud backup is exposed | T11.006.001 + T11.006.002 (ongoing) |

## Realised extraction

Approximately \$2.5M aggregated across ~30+ victims. No public recovery.

## Public references

- Cross-reference: T11.006.002 at `techniques/T11.006.002-implicit-cloud-custody-default-backup.md`.
- Cross-reference: T11.006.001 at `techniques/T11.006.001-user-initiated-plaintext-seed-storage.md`.
- Cross-reference: 2022-04-icloud-metamask-seed-phrase-cohort at `examples/2022-04-icloud-metamask-seed-phrase-cohort.md` (canonical T11.006.002 anchor, MetaMask/iCloud).
- Cross-reference: 2022-2024-android-google-drive-wallet-backup-cohort at `examples/2022-2024-android-google-drive-wallet-backup-cohort.md` (Android Google-Drive wallet backup cohort).

## Public References

See citations in corresponding technique file.
