# OAK-M31 — EIP-712 Permit Display and Signing-Risk Heuristics

**Class:** wallet-ux
**Audience:** wallet (mobile, browser-extension, hardware-wallet companion), custody-customer
**Maps to Techniques:** OAK-T4.001, OAK-T4.004, OAK-T4.005

## Description

A wallet-UX mitigation that converts the EIP-712 typed-data signing surface — historically the highest-asymmetry surface in the OAK-T4 (Access Acquisition) cluster, because a single off-chain signature can grant uncapped on-chain authority days or weeks later — from an opaque hex blob into a human-readable rendering with per-domain and per-spender risk heuristics gating the consent decision. The mitigation has four legs: (a) **typed-data human-readable rendering** — the wallet parses the EIP-712 payload's `domain` separator and `message` schema and renders a clear-language summary of what is being signed (token, spender, amount, deadline, signer-of-record), so that a permit-payload phishing flow cannot rely on the user being unable to interpret the raw signing surface; (b) **per-domain risk heuristics** — the EIP-712 `domain` separator (verifying contract address, chain ID, name, version) is checked against a maintained domain-trust state that flags non-canonical verifying contracts, deprecated versions, and chain-ID mismatches; (c) **per-spender risk heuristics** — the spender / grantee address is checked against drainer-cluster watchlists, recurring-spender profiles characteristic of drainer service families, and the user's prior-counterparty set, and the signing surface displays an explicit risk label rather than a neutral confirmation; (d) **multi-step confirmation for unlimited approvals** — `uint256.max` allowances, unbounded `Permit` and `Permit2` payloads, and `setApprovalForAll(true)` calls require multi-step explicit confirmation that surfaces the unlimited-scope semantics (`"this allows the spender to take all of your <token> at any time, until you revoke"`) rather than collapsing to a single confirm tap.

The defender's framing is that the off-chain EIP-712 signature surface is structurally distinct from the on-chain transaction surface: an on-chain `approve` is at least visible in block-explorer transaction history and revocable by a follow-on `approve(0)`, whereas a `Permit` / `Permit2` signature is invisible to on-chain history until the attacker chooses to redeem it and may chain through `Permit2`'s witness-data surface to permissions that are not obvious from the signature payload alone. The wallet is the unique layer at which the asymmetry can be neutralised — the user has no other surface at which they encounter the typed-data payload — and the rendering, heuristic, and multi-step-confirmation legs together convert what is at v0.1 a high-success-rate phishing surface into a gated decision.

The class is `wallet-ux` because the mitigation is exercised at the wallet's signing-confirmation surface and depends on wallet-vendor parsing-and-rendering capability. Custody-customer audience covers organisational signing flows and multi-sig wallet UX, where the same rendering-and-heuristic primitives apply at the operator-confirmation step.

## How it applies

- **OAK-T4.001 (Permit2 Authority Misuse):** the typed-data rendering leg surfaces the full Permit2 payload (token, spender, allowance, deadline, witness data) in clear language; per-domain risk heuristics flag non-canonical Permit2 verifying contracts; per-spender risk heuristics flag grantees that cluster with flagged infrastructure or with drainer-service recurring-spender addresses; multi-step confirmation gates unlimited-scope Permit2 payloads. Per the Technique's own mitigation framing, wallets are the highest-leverage layer for the rendering-and-warning legs; protocols publishing canonical permit-payload templates feed the per-domain heuristic so wallets can verify expected vs actual.
- **OAK-T4.004 (Allowance / Approve Drainer):** the wallet simulates the approve transaction's downstream effect at sign time and surfaces the simulation result alongside the typed-data rendering; `uint256.max` allowance to non-allowlisted spenders triggers the multi-step-confirmation leg; the per-spender risk-heuristic leg uses Check Point and SlowMist drainer-service-family characterisation to flag recurring spender addresses. The mitigation pairs naturally with the increase/decrease-allowance pattern at the contract-design layer (whose adoption is an open standardisation question) and with revoke.cash-style outstanding-allowance surfacing in the wallet UI.
- **OAK-T4.005 (setApprovalForAll NFT Drainer):** the wallet renders `setApprovalForAll(operator, true)` payloads with explicit unlimited-operator-authority semantics; per-spender risk heuristics check the operator address against the marketplace-operator allowlist (OpenSea, Blur, LooksRare, Magic Eden) and warn on non-allowlisted operators; multi-step confirmation is required for `setApprovalForAll(true)` regardless of whether the operator is allowlisted. Outstanding `ApprovalForAll` grants are surfaced prominently in the wallet UI with one-click revoke, narrowing the residual-authority window.

## Limitations

- Typed-data parsing requires wallet-vendor schema coverage of the relevant EIP-712 message types; novel or custom schemas (witness-data variants, protocol-specific Permit extensions) may not parse cleanly and fall back to raw hex display, which preserves the original phishing surface. The mitigation's coverage scales with vendor schema-library maturity.
- Per-domain and per-spender heuristics depend on watchlist freshness; drainer-service infrastructure rotates spender addresses and registers fresh verifying contracts, leaving a window during which a fresh attacker cluster is unflagged. The mitigation's effectiveness depends on heuristic-feed update cadence, which is a residual single-vendor risk.
- Hardware-wallet companion display constraints make full typed-data rendering harder on small screens; the mitigation interacts with hardware-wallet UX standards (e.g., per-field confirmation flows like Ledger's clear-signing) and is materially stronger when the hardware-wallet display matches the host wallet's rendering.
- Multi-step confirmation has a non-trivial UX cost; habituation risk applies — users who routinely sign unlimited approvals for legitimate protocols (DEX aggregators, lending protocols) develop a `"confirm-confirm"` reflex that the multi-step gate does not break. The mitigation's effectiveness depends on UI design that distinguishes high-risk from routine cases rather than treating all approvals identically.
- The mitigation is silent on the on-chain contract-design layer; widespread adoption of time-limited allowance designs and increase/decrease-allowance patterns would reduce the consequence of a stale-allowance compromise but is outside the wallet-UX layer's scope.
- Custody-customer multi-sig flows have additional surface (the signature is collected from multiple operators across time) that the per-signing-surface mitigation does not directly address; the custody-side application of OAK-M31 requires per-operator rendering at each multi-sig signing step.

## Reference implementations

- Rabby, MetaMask post-2023 — partial coverage of the typed-data rendering leg and per-spender risk-heuristic surface; rendering quality is uneven across novel EIP-712 schemas.
- Wallet vendors with rich approve-time simulation (Rabby, Wallet Guard, Pocket Universe) — coverage of the approve-time simulation surface that complements the rendering leg.
- Ledger clear-signing, Trezor typed-data display — hardware-wallet-companion rendering primitives for the OAK-M31 hardware-wallet path.
- revoke.cash, Etherscan Token Approval Checker — outstanding-allowance surfacing primitives that complement the wallet-side rendering surface.
- Drainer-cluster watchlists from Check Point, SlowMist, and on-chain investigators (zachxbt and others) — heuristic-feed inputs for the per-spender leg.
- Compliance-provider feeds (Chainalysis, TRM Labs) — additional per-spender heuristic surface for custody-customer signing flows.

## Citations

- `[slowmist2024report]` — 2024 ecosystem aggregate; loss volume and share of permit vs approve flows.
- `[checkpoint2023drainers]` — Check Point drainer-service-family characterisation including recurring spender addresses and Permit / Permit2 signature flows.
- `[theblock2022boredape]` — illustrative `setApprovalForAll` extraction case material.
