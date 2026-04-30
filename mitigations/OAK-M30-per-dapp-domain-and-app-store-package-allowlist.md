# OAK-M30 — Per-dApp Domain and App-Store-Package Allowlist

**Class:** wallet-ux
**Audience:** wallet (mobile, browser-extension), custody-customer
**Maps to Techniques:** OAK-T4.001, OAK-T4.005, OAK-T4.006

## Description

A wallet-UX mitigation that ties WalletConnect session establishment and downstream signing-flow trust to a verified-domain and app-store-package allowlist, so that the consent-to-session step (which is where the documented OAK-T4.006 cases fail) becomes the gating event rather than the consent-to-payload step that occurs once the session is already trusted. The mitigation has four legs: (a) **per-dApp domain allowlist** — at session-establishment time, the wallet checks the peer dApp's URL against a maintained allowlist; non-allowlisted peers trigger a session-establishment-time warning that requires explicit user acknowledgement before the session is admitted; (b) **app-store package allowlist** — for mobile-side WalletConnect sessions established from a partner app, the package identifier (iOS bundle ID, Android package name) is validated against the app-store's published affiliation for the dApp's domain, defeating impersonation apps that masquerade under similar names but carry different package identifiers; (c) **deep-link / universal-link origin attestation** — when a session or signing flow is invoked via a deep link or universal link, the wallet verifies the link's claimed origin against the same allowlist before honouring the invocation, catching the deep-link-invocation sub-vector that bypasses URL inspection; (d) **user-visible session-origin display** — at every signing surface during a live session, the wallet surfaces the peer dApp's verified origin (domain, package identifier, or `"unverified"`) prominently, so that mid-session phishing payloads from a hijacked or impersonated peer remain visually distinguishable from legitimate signing requests.

The defender's framing is the OAK-T4.006 framing: in essentially all documented WalletConnect-hijack cases, a session-establishment-time warning would have prevented the chained extraction, because the failure mode is consent-to-session, not consent-to-payload. The allowlist is the primitive that converts session-establishment from an open-world act of trust into a gated decision, and the package-identifier and origin-attestation legs cover the mobile-distribution and deep-link sub-vectors that domain-only allowlists miss. The user-visible session-origin display extends the allowlist's value across the lifetime of the session, so that even a mid-session origin change (a malicious dApp that initially looked plausible escalating its requests) remains visible.

The class is `wallet-ux` because the mitigation is exercised at the wallet's session-establishment, deep-link-handling, and signing-confirmation surfaces; it is the canonical mitigation for OAK-T4.006 and a structural defence-in-depth layer for any OAK-T4 sub-Technique that chains in via a WalletConnect-hijacked session.

## How it applies

- **OAK-T4.001 (Permit2 Authority Misuse):** the allowlist's session-origin attestation gates the upstream session through which the malicious permit-payload is solicited; even where Permit2 simulation at signing time is available, the session-origin context is a complementary signal that flags the case where the permit grantee clusters with flagged infrastructure and the session itself originated from a non-allowlisted dApp. The allowlist does not replace per-payload simulation but it pushes the consent decision to the earlier session-establishment surface where the user has more context to refuse.
- **OAK-T4.005 (setApprovalForAll NFT Drainer):** the allowlist's operator-allowlist analogue (marketplace-operator allowlist for OpenSea, Blur, LooksRare, Magic Eden) is the per-marketplace canonicalisation of the same primitive; for the WalletConnect entry vector specifically, the per-dApp domain allowlist gates the session through which a malicious `setApprovalForAll` is solicited, and the user-visible session-origin display ensures the user sees the operator-and-origin pair before signing. The allowlist's coverage of Discord-announcement-initiated dApp interactions is the operational complement to the NFT-community moderation policies that reduce the impact of compromised-server announcements.
- **OAK-T4.006 (WalletConnect Session Hijack):** the allowlist is the canonical mitigation per the Technique's own framing — wallets maintain per-dApp domain / app-store-package allowlists; warn at session-establishment time on non-allowlisted peers; surface session-history with operator-clustering alerts; require explicit user confirmation for high-value signing payloads regardless of session trust state. The deep-link / universal-link origin-attestation leg catches the deep-link-invocation sub-vector. App-store moderation policy improvements (impersonation detection, domain-affiliation publishing requirements) are the upstream feed for the package-identifier leg of the allowlist.

## Limitations

- Allowlist maintenance is an ongoing wallet-vendor cost: the dApp ecosystem evolves rapidly, new legitimate dApps need timely admission, and wallet vendors face a UX trade-off between false-positive rate (legitimate dApps blocked) and false-negative rate (malicious dApps admitted). The mitigation is materially stronger as a shared, multi-vendor allowlist than as a per-wallet allowlist.
- Domain allowlist alone is insufficient against compromised-but-legitimate dApp domains (the OAK-T4.002 framing); a previously-allowlisted domain whose front-end has been compromised continues to pass the allowlist check while soliciting malicious payloads. The mitigation must be combined with per-payload simulation (the natural complement of OAK-M31) for full coverage.
- Mobile app-store-package allowlist depends on app-store-side publishing of domain-affiliation data; where the app-store does not require WalletConnect-using apps to verify domain affiliation as a publishing precondition, the package-identifier leg is hollow. The mitigation's mobile-side effectiveness depends on app-store policy.
- Custody-customer surfaces (organisational signing flows, multi-sig wallets) require per-organisation allowlist customisation; the mitigation is materially weaker if applied as a single global allowlist that does not reflect the customer's specific dApp interaction set.
- The user-visible session-origin display competes with screen real-estate at signing time; habituation risk is non-trivial, and the mitigation's effectiveness depends on UI design that draws attention to origin changes mid-session rather than treating origin as decoration.

## Reference implementations

- Trust Wallet, Coinbase Wallet, Rabby — partial coverage of the per-dApp domain allowlist and session-history-with-operator-clustering surfaces.
- WalletConnect protocol-side telemetry — partial surface for session-origin attestation; further integration with wallet-side allowlists is a roadmap area.
- Browser-extension signing wallets (MetaMask, Phantom) with phishing-list integration — partial coverage of the domain-allowlist leg; deep-link / universal-link origin-attestation coverage is uneven.
- App-store impersonation moderation (Google Play, Apple App Store) — upstream policy surface for the package-identifier leg; documented improvements following the September 2024 fake-WalletConnect campaign are the canonical recent reference event.

## Citations

- General industry reporting on the September 2024 Google Play `"WalletConnect"` impersonation campaign (specific bib entry deferred per OAK-T4.006 v0.1 status).
- `[checkpoint2023drainers]` — drainer-service-family characterisation including WalletConnect-hijack-chained flows.
- `[slowmist2024report]` — 2024 ecosystem aggregate covering session-hijack attack share.
- `[theblock2022boredape]` — illustrative case material for the chained `setApprovalForAll` extraction sub-vector.
