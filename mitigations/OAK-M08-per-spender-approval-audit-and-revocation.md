# OAK-M08 — Per-Spender Approval Audit and Revocation

**Class:** wallet-ux
**Audience:** wallet, custody-customer, vendor

**Maps to Techniques:** OAK-T4.001, OAK-T4.004, OAK-T4.005, OAK-T4.006

## Description

Per-spender approval audit and revocation is the wallet-UX class of mitigation that surfaces, ranks, and lets the user revoke outstanding allowance grants — ERC-20 `approve`, ERC-721 / ERC-1155 `setApprovalForAll`, and Permit2 token-and-spender authorisations. The reference user-facing tooling is Revoke.cash, Etherscan Token Approvals, Debank approvals view, and equivalent surfaces inside major wallets (Rabby, MetaMask Portfolio, Frame, Zerion). The mitigation works on two complementary axes: an *audit* axis (heatmap of outstanding grants per spender, ranked by token-balance exposure and spender risk) and a *revocation* axis (one-click flow that issues `approve(spender, 0)` or the standard's revocation primitive).

For OAK, this is the dominant defender-side surface for the T4 (Drainer / Approval-Theft) family. Drainer Techniques rely on the gap between *time-of-grant* (when the user signs) and *time-of-exercise* (when the spender calls `transferFrom` or its equivalent). Per-spender audit collapses that gap by giving the user a continuously-current view of their exercise-able grants; revocation closes the window before exercise occurs. The mitigation is wallet-UX-leveraged because the on-chain layer is post-event by construction — by the time `transferFrom` executes, the funds are gone.

A complete implementation also includes *grant-time* enrichment: rich approve / Permit / `setApprovalForAll` simulation at sign time, marketplace-operator allowlist labels, `uint256.max` warnings, and grantee-cluster screening against drainer-family infrastructure. This grant-time leg is where the highest-leverage prevention happens; the revocation leg is the defender's recovery surface for grants that slipped through.

## How it applies

- **OAK-T4.001 (Permit2 Authority Misuse):** rich permit-payload simulation at sign time (full token-and-spender scope in clear language) prevents the malicious-grantee class; revoke.cash-class tooling lets users revoke outstanding Permit2 token authorisations on a recurring cadence, narrowing the blast radius of any historical grant whose grantee later turns out to be drainer infrastructure.
- **OAK-T4.004 (Allowance / Approve Drainer):** per-spender heatmap surfaces stale `uint256.max` allowances; one-click revocation closes the window after a phishing-context grant is recognised, even before the corresponding `transferFrom` executes; grant-time wallet warnings on `uint256.max` to non-allowlisted spenders prevent the grant in the first place.
- **OAK-T4.005 (setApprovalForAll NFT Drainer):** marketplace-operator allowlist labels (OpenSea, Blur, LooksRare, Magic Eden, Reservoir, Seaport, Magic Eden) at grant time + per-collection / per-operator outstanding-grant view + one-click revoke; this is the primary line of defence against Discord-announcement-driven phishing flows.
- **OAK-T4.006 (WalletConnect Session Hijack):** per-spender approval audit is the *follow-up* mitigation after a session-establishment-time defence fails — once a hijacked session has solicited an approval / Permit / `setApprovalForAll`, audit-and-revocation tooling is the surface that lets the user discover and unwind the resulting grant. Pairs naturally with per-dApp domain allowlists at the WalletConnect layer.

## Limitations

Revocation is post-grant by definition: it costs gas, it does not unwind any `transferFrom` calls that have already executed, and on chains where the user no longer holds gas it is operationally blocked. Permit-style grants (signed off-chain, consumed on-chain) and Permit2 unified allowances mean the user can have non-obvious, time-bounded grants that do not show up in a naive `approve`-event scan; complete coverage requires explicit Permit / Permit2 indexing.

Audit tooling depends on an indexer; chains, L2s, and rollups with weak indexer coverage (newly-launched or low-volume venues) get partial views. Cross-chain users must repeat the audit-and-revocation flow per chain. Marketplace-operator allowlists drift (new legitimate marketplaces appear; old ones are deprecated), and the allowlist-curation process is itself a trust surface. Finally, audit-and-revocation does nothing against drainer flows that bypass approvals entirely (direct-transfer phishing, signature-based ownership transfers, account-abstraction session-key abuse — see T13.003).

## Reference implementations

- **Revoke.cash** — canonical per-spender approval dashboard + revocation flow; multi-chain coverage; Permit2 support.
- **Etherscan / block-explorer Token Approvals** — chain-by-chain per-account approval view + revocation transactions.
- **Rabby Wallet** — built-in approve-time simulation, grantee-cluster warnings, in-wallet approval-management view.
- **MetaMask Portfolio (Approvals tab)** — in-wallet per-spender heatmap + revocation.
- **Debank / Zerion / Frame** — portfolio-level approvals tabs with revocation flows.
- **Permit2 (Uniswap)** — protocol-level primitive that *enables* a unified approval surface; complementary to (not a replacement for) the audit-and-revocation tooling above.

## Citations

- `[checkpoint2023drainers]` — drainer-family infrastructure, Permit / approve / setApprovalForAll attack-flow taxonomy underpinning the per-spender audit surface.
- `[slowmist2024report]` — 2024 ecosystem aggregate (\$494M losses; permit-signature phishing 56.7% share); empirical scale justifying wallet-UX as the highest-leverage layer.
- `[theblock2022boredape]` — Lawliet \$2.7M setApprovalForAll case; canonical worked example for the T4.005 mitigation surface.
- `[rektcurve2022]` — Curve frontend DNS hijack 2022; canonical worked example of grant-time defence (signature-payload simulation) preventing T4.001-class extraction.
