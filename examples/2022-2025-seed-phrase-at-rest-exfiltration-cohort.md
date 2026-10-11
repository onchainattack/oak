# Seed-Phrase At-Rest Exfiltration Cohort — 2022–2025

**OAK Techniques observed:** OAK-T11.006, OAK-T11.006.002

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** T11.006.001 ~\$185M+ aggregated (LastPass encrypted-vault exfiltration → 2023–2025 multi-year crypto-drain cohort, ~\$35M+ (the "~150+ victims" count is unverified in the sources cited here) plus the Chris Larsen theft (~\$112M / 213M XRP at the time per ZachXBT; ~\$150M / 283M XRP per the March 2025 forfeiture complaint, which describes keys kept in an unnamed breached password manager that ZachXBT identifies as LastPass) — linked to the LastPass breaches only as a suspected link in a March 2025 N.D. Cal. forfeiture complaint, which says threat actors "may have" used keys extracted by cracking stolen vault data); T11.006.002 ~\$650K+ confirmed (Iacovone iCloud-MetaMask case, April 2022; the victim's loss was reported as ~\$650K, and the attack began with a spoofed-Apple phone call obtaining a one-time code) plus broader 2022–2024 iCloud-backup cohort.

**Corrected 2026-10-11:** Victim name spelling, the Larsen/LastPass link (suspected, not proven), the MetaMask advisory timing and the unsourced victim count were corrected or hedged.

**Key teaching point:** Both sub-Techniques share the structural feature of seed-phrase material at rest in a third-party storage substrate whose security posture is independent of the wallet vendor and the user's on-chain hygiene. The user-side mental model "I'm self-custodial because I hold my own keys" collapses when the seed-phrase material is held by a third-party service. The exfiltration-to-drain time window is *unbounded* — once the encrypted material is in attacker hands, offline brute-force proceeds at the attacker's pace, and no credential rotation closes the window.

## Summary

## Timeline

T11.006.002 from 2022-04 (Iacovone iCloud-MetaMask case); T11.006.001 from 2022-12 (LastPass vault exfiltration disclosure) with drain cohort extending through 2025.

## T11.006.001 — User-Initiated Plaintext-Equivalent Seed Storage

The user explicitly stores seed-phrase material in a third-party service (LastPass Secure Notes, 1Password/Bitwarden, cloud-synced text files, email drafts). The seed phrase is *plaintext-equivalent* because the gatekeeping key is a user-memorised master password whose entropy is typically far below the 128-bit security level of the seed phrase itself.

Canonical case: **LastPass encrypted-vault exfiltration — 2022-12 disclosure → 2023–2025 drain cohort — ~$185M+ aggregated.** The December 2022 LastPass breach included exfiltration of encrypted customer vaults. Investigators and researchers (Nick Bax, Taylor Monahan) found victims had stored seed phrases in Secure Notes before the breaches; the LastPass link to the thefts is strongly suspected rather than proven in public reporting. The drain cohort spans 2023–2025, with the ~\$150M Larsen heist (2024-01-30) as the largest, whose LastPass link comes from a March 2025 N.D. Cal. forfeiture complaint (about \$23M seized) and is described there as probable rather than proven. See `examples/2022-12-lastpass-vault-cohort.md`.

Per-victim commonality limited to LastPass usage with no other attack-vector overlap (no SIM swap, no email compromise, no mobile malware, no on-chain phishing) — the process-of-elimination cohort methodology (ZachXBT, Taylor Monahan, TRM Labs) is the canonical forensic surface.

## T11.006.002 — Implicit Cloud-Custody via Default-On Cloud-Backup

The wallet vendor's mobile app does not opt out of OS-level cloud-backup defaults. The encrypted wallet vault is automatically synced to iCloud/Google Drive/OneDrive — a cloud surface whose security posture is independent of the wallet vendor's and the user's on-chain hygiene.

Canonical case: **iCloud-backup MetaMask seed-phrase cohort — 2022-04.** Domenic Iacovone (~\$650K, April 2022): a caller spoofing Apple obtained a one-time code, giving access to his Apple ID and iCloud, from which the MetaMask backup was reached. MetaMask then warned that iCloud backups include the password-encrypted vault and advised disabling iCloud backup for the app. See `examples/2022-04-icloud-metamask-seed-phrase-cohort.md`.

The structural distinction: T11.006.002 is opt-in by inaction — neither the user nor the wallet vendor opted out of the OS-level default. The user did nothing to create this custody surface; the wallet app's default behaviour created it.

## Public references

- `[lastpass2022breach]` — LastPass December 2022 breach disclosure
- `[ndca2025larsen]` — NDCA forfeiture filing March 2025 (Larsen ~\$150M heist), as reported by The Block and The Defiant below
- `[theblocklarsen2025]` — The Block, "Ripple co-founder Chris Larsen losing over \$100 million of XRP tied to LastPass hack, says ZachXBT" (2025-03-07): <https://www.theblock.co/post/345212/ripple-co-founder-chris-larsen-losing-over-100-million-of-xrp-tied-to-lastpass-hack-says-zachxbt>
- `[defiantlarsen2025]` — The Defiant, "Ripple co-founder Chris Larsen loses \$150 million (283M XRP) in January 2024": <https://thedefiant.io/news/hacks/ripple-co-founder-chris-larsen-loses-150-million-283m-xrp-january-2024-due-to-08ebb24a>
- `[zachxbt2024lastpass]` — ZachXBT LastPass drain-cohort tracking
- `[taylormonahan2024lastpass]` — Taylor Monahan / MetaMask LastPass cohort analysis
- `[iacovone2022icloud]` — Dominic Iacovone iCloud-MetaMask case (April 2022)
- `[metamask2022iosbackup]` — MetaMask iOS backup disable advisory (April 17, 2022)
- `[lpsecaff]` — Security Affairs, "Feds seized \$23 million in crypto stolen using keys from LastPass breaches" (2025-03): <https://securityaffairs.com/175156/cyber-crime/feds-seized-23-million-in-crypto-stolen-using-keys-from-lastpass-breaches.html>
- `[lpbgr]` — BGR, "Last Year's LastPass Security Breach Was Linked To \$35 Million In Crypto Heists": <https://www.bgr.com/tech/last-years-lastpass-security-breach-was-linked-to-35-million-in-crypto-heists/>
- `[icloud9to5]` — 9to5Mac, "iCloud crypto wallet attack MetaMask" (2022-04-19): <https://9to5mac.com/2022/04/19/icloud-crypto-wallet-attack-metamask/>
- `[icloudbitdef]` — Bitdefender, "Apple iCloud account attack results in man losing \$650,000 from his cryptocurrency wallet" (2022-04): <https://www.bitdefender.com/en-us/blog/hotforsecurity/apple-icloud-account-attack-results-in-man-losing-650-000-from-his-cryptocurrency-wallet-2>
- `[iclouddecrypt]` — Decrypt, "MetaMask Warns Users of New Apple iCloud Phishing Scam" (2022-04): <https://decrypt.co/98078/metamask-warns-users-apple-icloud-phishing-scam>
