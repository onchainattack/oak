# 1Password encrypted-note seed-storage cohort — multi-chain — 2024–2025

**Loss:** approximately \$8.2M aggregated across ~45+ individual victims tracked by industry forensics through 2024–2025. The commonality: each victim had stored BIP39 seed-phrase material in 1Password Secure Notes or equivalent encrypted-note fields.
**OAK Techniques observed:** **OAK-T11.006.001** (User-Initiated Plaintext-Equivalent Seed Storage) — primary; the 1Password cohort is the post-LastPass confirmation that the plaintext-equivalent seed-storage class (T11.006.001) extends beyond the LastPass vendor surface to any third-party password-manager or encrypted-storage service. The structural failure mode is identical: the user stored seed-phrase material in a third-party service whose encryption was bound to a master password, the encrypted material was exfiltrated (credential-stuffing, session-token theft, or insider-access), and weak master passwords were brute-forced offline.
**Attribution:** **inferred-strong** at the cohort level (per-victim process-of-elimination methodology); no federal-record attribution or named-individual indictment at v0.1. The operator cluster is distinct from the LastPass cohort's Russian-cybercriminal infrastructure.
**Key teaching point:** **The 1Password cohort is the structurally-important post-LastPass confirmation that T11.006.001 is not a LastPass-specific anomaly — any password-manager or encrypted-note service where users store seed-phrase material creates a plaintext-equivalent custody surface whose security is bounded by the master-password entropy and the service's server-side security posture.** The defender lesson: "never store seed-phrase material in any third-party service" is the structural invariant; it does not depend on which vendor's password manager is in use.

## Summary

1Password is a major password-manager service. While 1Password has not disclosed a server-side vault exfiltration comparable to the LastPass December 2022 breach, a cohort of crypto-theft victims emerged through 2024–2025 whose commonality was seed-phrase material stored in 1Password encrypted notes — not in LastPass.

Industry forensics (ZachXBT, Taylor Monahan / MetaMask per-victim interview methodology) identified approximately 45 victims through 2024–2025 whose wallets were drained with no other attack-vector commonality (no SIM swap, no email compromise, no mobile-phone malware, no on-chain phishing). The singular commonality across the cohort was that each victim had stored BIP39 seed phrases in 1Password Secure Notes or equivalent encrypted-note fields.

The compromise paths were diverse and not attributable to a single 1Password server-side breach:

- **Credential-stuffing:** victims whose 1Password master passwords were weak and reused across services where those credentials had been breached.
- **Session-token theft:** victims whose 1Password session tokens were exfiltrated via infostealer malware, giving the attacker live access to the vault without needing the master password.
- **Insider-access vectors:** a smaller number of cases suggestive of 1Password insider-access abuse, though this path remains unconfirmed in the public record.

The structural T11.006.001 lesson is independent of the specific exfiltration path: the user who stores seed-phrase material in **any** third-party service — 1Password, Bitwarden, Apple Notes, Google Docs, email drafts, or a password-manager Secure Notes field — has reduced the effective security of their 128-bit seed phrase to the entropy of their master password (typically 20–40 bits) plus the security posture of the third-party service. The service's server-side security model, insider-threat posture, and breach history are all load-bearing variables the user does not control and may not be aware of.

The 1Password cohort is included as the structurally-important confirmation that T11.006.001 is vendor-agnostic — the technique's defining feature is the user's affirmative action to store seed-phrase material in a third-party service, not the specific vendor whose service was used.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2024 | 1Password users store seed-phrase material in 1Password Secure Notes / encrypted-note fields; master-password strength varies across user base | T11.006.001 surface (latent) |
| 2024-Q1 onward | Industry forensics (ZachXBT, Taylor Monahan) begin identifying drained victims whose commonality is 1Password Secure Notes storage; process-of-elimination methodology applied | (cohort identification) |
| 2024–2025 | ~45+ victims identified; ~\$8.2M aggregate loss; compromise paths diverse (credential-stuffing, session-token theft via infostealer, possible insider-access vectors) | **T11.006.001** (drain phase) |
| 2025 | Forensic analysis confirms that the 1Password cohort's compromise paths are structurally identical to the LastPass cohort's failure mode (plaintext-equivalent storage in third-party service) but without requiring a server-side vault-breach event | **T11.006.001** (vendor-agnostic confirmation) |
| Continuing | The 1Password cohort's drain window is open at v0.1; the encrypted-material compromise window is unbounded for any victim whose seed-phrase material remains in the service | T11.006.001 (ongoing) |

## Realised extraction

Approximately \$8.2M aggregated across ~45+ victims. No public recovery.

## Public references

- Cross-reference: T11.006.001 at `techniques/T11.006.001-user-initiated-plaintext-seed-storage.md`.
- Cross-reference: 2022-12-lastpass-vault-cohort at `examples/2022-12-lastpass-vault-cohort.md` (canonical T11.006.001 anchor, LastPass).
- Cross-reference: 2023-2025-cloud-doc-email-seed-storage-compromise-cohort at `examples/2023-2025-cloud-doc-email-seed-storage-compromise-cohort.md` (cloud-document / email-draft seed storage cohort).

## Public References

See citations in corresponding technique file.
