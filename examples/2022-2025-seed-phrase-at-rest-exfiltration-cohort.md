# Seed-Phrase At-Rest Exfiltration Cohort — 2022–2025

**Tags:** OAK-T11.006, OAK-T11.006.002

**Loss:** T11.006.001 ~$185M+ aggregated (LastPass encrypted-vault exfiltration → 2023–2025 multi-year crypto-drain cohort, ~$35M+ across ~150+ victims plus ~$150M Larsen heist — federal-record-attested via March 2025 NDCA forfeiture filing); T11.006.002 ~$650K+ confirmed (Iacovone iCloud-MetaMask case, April 2022) plus broader 2022–2024 iCloud-backup cohort.

**Key teaching point:** Both sub-Techniques share the structural feature of seed-phrase material at rest in a third-party storage substrate whose security posture is independent of the wallet vendor and the user's on-chain hygiene. The user-side mental model "I'm self-custodial because I hold my own keys" collapses when the seed-phrase material is held by a third-party service. The exfiltration-to-drain time window is *unbounded* — once the encrypted material is in attacker hands, offline brute-force proceeds at the attacker's pace, and no credential rotation closes the window.

## Timeline

T11.006.002 from 2022-04 (Iacovone iCloud-MetaMask case); T11.006.001 from 2022-12 (LastPass vault exfiltration disclosure) with drain cohort extending through 2025.

## T11.006.001 — User-Initiated Plaintext-Equivalent Seed Storage

The user explicitly stores seed-phrase material in a third-party service (LastPass Secure Notes, 1Password/Bitwarden, cloud-synced text files, email drafts). The seed phrase is *plaintext-equivalent* because the gatekeeping key is a user-memorised master password whose entropy is typically far below the 128-bit security level of the seed phrase itself.

Canonical case: **LastPass encrypted-vault exfiltration — 2022-12 disclosure → 2023–2025 drain cohort — ~$185M+ aggregated.** The December 2022 LastPass breach included exfiltration of encrypted customer vaults. Attackers brute-forced weak master passwords offline against the exfiltrated vault blobs. The resulting plaintext yielded BIP39 seed phrases stored in Secure Notes fields. The drain cohort spans 2023–2025, with the ~$150M Larsen heist (March 2025 NDCA forfeiture filing) as the single-largest confirmed extraction. See `examples/2022-12-lastpass-vault-cohort.md`.

Per-victim commonality limited to LastPass usage with no other attack-vector overlap (no SIM swap, no email compromise, no mobile malware, no on-chain phishing) — the process-of-elimination cohort methodology (ZachXBT, Taylor Monahan, TRM Labs) is the canonical forensic surface.

## T11.006.002 — Implicit Cloud-Custody via Default-On Cloud-Backup

The wallet vendor's mobile app does not opt out of OS-level cloud-backup defaults. The encrypted wallet vault is automatically synced to iCloud/Google Drive/OneDrive — a cloud surface whose security posture is independent of the wallet vendor's and the user's on-chain hygiene.

Canonical case: **iCloud-backup MetaMask seed-phrase cohort — 2022-04.** Dominic Iacovone (~$650K, April 2022): Apple-ID phishing → iCloud access → MetaMask vault backup → seed phrase extraction. MetaMask issued public iOS-backup-disable security guidance two days after Iacovone's disclosure. See `examples/2022-04-icloud-metamask-seed-phrase-cohort.md`.

The structural distinction: T11.006.002 is opt-in by inaction — neither the user nor the wallet vendor opted out of the OS-level default. The user did nothing to create this custody surface; the wallet app's default behaviour created it.

## References

- `[lastpass2022breach]` — LastPass December 2022 breach disclosure
- `[ndca2025larsen]` — NDCA forfeiture filing March 2025 (Larsen ~$150M heist)
- `[zachxbt2024lastpass]` — ZachXBT LastPass drain-cohort tracking
- `[taylormonahan2024lastpass]` — Taylor Monahan / MetaMask LastPass cohort analysis
- `[iacovone2022icloud]` — Dominic Iacovone iCloud-MetaMask case (April 2022)
- `[metamask2022iosbackup]` — MetaMask iOS backup disable advisory (April 17, 2022)
