# Android Google-Drive Wallet-Backup Seed Exfiltration Cohort — 2022–2024

**Loss:** Not centrally tabulated; individual losses range from four to six figures per victim. The attack surface is Android-wide — any wallet app that does not set `allowBackup=false` in its AndroidManifest.xml and whose users have Google Drive backup enabled.
**OAK Techniques observed:** **OAK-T11.006.002** (Implicit Cloud-Custody via Default-On Cloud-Backup — primary; the wallet app did not opt out of OS-level cloud-backup, silently placing the encrypted wallet vault on Google Drive). **OAK-T11.001** (Credential Compromise / SIM-Swap — the proximate Google-account compromise vector). **OAK-T4.008** (Phishing / Social Engineering — where Google-account compromise was phishing-mediated).
**Attribution:** **pseudonymous** at the individual-attacker level; no single operator cluster dominates. The surface is per-victim and per-Google-account.
**Key teaching point:** **T11.006.002 is not iOS-specific. Android's Google Drive Backup is the Android-equivalent default-on cloud-backup surface. The Android ecosystem's backup behaviour is app-configurable via `allowBackup` in the manifest — a flag that many wallet apps historically left at the default (`true`). The iCloud MetaMask case (April 2022) was the public wake-up call for iOS; the Android equivalent received less public attention but represents a structurally identical surface affecting a larger installed base.**

## Summary

Android's auto-backup system backs up app data to Google Drive by default for apps targeting Android 6.0 (API 23) and above. The backup includes the app's internal storage — which, for wallet apps, contains the encrypted wallet vault (the keystore file or equivalent). The backup is encrypted at rest on Google's servers but is accessible to anyone with the user's Google account credentials.

The compromise path mirrors the iOS/iCloud T11.006.002 surface:
1. User installs a wallet app on Android. The app does not set `allowBackup=false` in its manifest.
2. Android's auto-backup backs up the app's data — including the encrypted wallet vault — to Google Drive.
3. The user's Google account is compromised via SIM-swap (SMS-based 2FA), phishing, credential-stuffing, or Google Support social-engineering.
4. The attacker restores the wallet app's backup to a new device, or extracts the encrypted vault from the backup.
5. If the vault password is weak, it is brute-forced; if the wallet app stored the seed in plaintext or with weak encryption, the seed is directly available.

The Android surface is structurally larger than the iOS surface for two reasons: (a) Android's global installed base is larger, and (b) the `allowBackup` flag defaulting to `true` is a broader default-on surface than iOS's per-app iCloud Backup toggle, which is user-configurable at the OS level rather than the app level.

Wallet apps that have historically set `allowBackup=false` include MetaMask (post-April 2022 advisory), Trust Wallet, and most major custodial-wallet apps. However, smaller wallet apps, regional-wallet apps, and older wallet-app versions may not have addressed the flag. The defender-side remediation is a one-line manifest change: `android:allowBackup="false"` in the `<application>` element.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2015–2021 | Android 6.0+ auto-backup defaults to `allowBackup=true`; wallet apps deployed during this period inherit the default without explicit opt-out | **T11.006.002 surface creation (Android)** |
| 2022-04-15 | Dominic Iacovone iCloud-backup MetaMask case (~$650K) — the public wake-up call for iOS T11.006.002 | **T11.006.002 iOS canonical anchor** |
| 2022-04-17 | MetaMask issues iOS-backup-disable guidance | (vendor response, iOS) |
| 2022–2024 | Android wallet apps progressively adopt `allowBackup=false`; MetaMask, Trust Wallet, and other major wallets address the flag | (vendor remediation, Android) |
| 2022–2024 | Individual Android Google-Drive-backup compromise cases documented by industry forensics (ZachXBT, Taylor Monahan) — the Android T11.006.002 cohort | **T11.006.002 Android cohort** |
| Ongoing | Smaller and regional wallet apps on Android may still ship with `allowBackup=true`; the Android surface remains a standing T11.006.002 class for non-major-wallet users | (standing surface) |

## Realised extraction

Not centrally tabulated; individual losses range from four to six figures. No central recovery mechanism.

## Public references

- Cross-reference: T11.006.002 (Implicit Cloud-Custody via Default-On Cloud-Backup) at `techniques/T11.006.002-implicit-cloud-custody-default-backup.md`.
- [`examples/2022-04-icloud-metamask-seed-phrase-cohort.md`](../examples/2022-04-icloud-metamask-seed-phrase-cohort.md) — iCloud-backup MetaMask seed-phrase cohort (canonical T11.006.002 iOS anchor).
- Android Developer Documentation — `android:allowBackup` manifest attribute; auto-backup for apps targeting Android 6.0+.
- MetaMask Android manifest — `allowBackup=false` (post-April 2022).
- Trust Wallet Android manifest — `allowBackup=false`.
- ZachXBT / Taylor Monahan per-victim forensic reporting (2022–2024) — Android Google-Drive-backup compromise cases.
