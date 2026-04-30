# OAK-M29 — Full-Address Verification and Lookalike Detection

**Class:** wallet-ux
**Audience:** wallet (mobile, browser-extension, hardware-wallet companion), custody-customer, risk-team
**Maps to Techniques:** OAK-T4.003

## Description

A wallet-UX mitigation aimed at the address-poisoning class of attacks, in which the wallet displays the full destination address (not a truncated `0x1234…abcd` middle-ellipsed form) at every confirmation surface where the user makes the irrevocable consent decision, and complements the display with per-address-history lookalike scoring against the user's send-history and address-book. The mitigation has three legs: (a) **full-address display** — the canonical send-confirmation, address-paste, and address-book-add surfaces show the address in full (multi-line where necessary), and any pattern that requires user comparison (verifying a copy-paste matches the intended destination) presents the full string rather than middle-truncated bytes whose interior the attacker can pattern-match; (b) **lookalike scoring** — at send time, the destination address is scored against the user's prior-counterparty set; structurally-similar addresses (matching first / last six characters but differing in interior bytes) that have appeared in the wallet's inbound history via zero-value or near-zero-value transfers from previously-unseen senders are flagged as poisoning candidates and the send is gated on explicit full-address acknowledgement; (c) **copy-paste address-book validation** — paste-target addresses are validated against the user's address book on paste, with a require-full-string-match policy that surfaces near-match candidates as the lookalike-detection surface rather than auto-completing the paste.

The defender's framing is that address poisoning is a UX-layer attack: the on-chain primitive (a zero-value or near-zero-value transfer from an attacker-generated address chosen for first/last-byte similarity to a real counterparty in the victim's history) is observable, and the wallet is the unique layer at which the attacker's bet — that the victim will pattern-match the truncated display rather than verify the full string — can be defeated structurally. Address-book entries and pre-existing counterparty labels prevent the bulk of the attack surface, because a wallet that prefers address-book labels over wallet-history lookups eliminates the lookalike's payoff entirely; the lookalike-scoring leg covers the residual case where the user is sending to a counterparty not yet in the address book.

The class is `wallet-ux` because the mitigation is exercised at the wallet-side UI / signing flow and depends on wallet-vendor implementation rather than on protocol or venue policy. Custody-customer audience covers organisational and high-net-worth custody surfaces where the same UX patterns apply at the operator-confirmation rather than end-user-confirmation step.

## How it applies

- **OAK-T4.003 (Address Poisoning):** the wallet-side application is the highest-leverage layer per the Technique's own framing — wallet vendors flag inbound zero-value or near-zero-value transfers from previously-unseen senders whose addresses are structurally similar to addresses in the user's send history; require explicit full-address verification for sends above a configurable threshold; surface address-book labels prominently in send flows; and prefer the address-book entry over wallet-history lookup. The full-address-display leg defeats the truncated-byte pattern-match attack; the lookalike-scoring leg flags the poisoning sender at the moment its first zero-value transfer arrives, before the victim has the opportunity to send to it; the copy-paste address-book validation leg catches the case where the user pastes from an unverified source. Risk teams maintain campaign-cluster watchlists and cross-reference outbound transfers from organisational treasury wallets against known-poisoning-campaign attacker addresses before broadcast.

## Limitations

- The full-address-display leg has a UX cost: full Ethereum addresses are 42 hex characters and full Solana addresses are 32-byte base58-encoded strings; surfacing them in full at every confirmation competes with the rest of the transaction surface and risks habituation if the user's eye learns to skim the display. The mitigation's effectiveness depends on UI design that draws attention to the comparison rather than treating it as decoration.
- Lookalike scoring requires per-user wallet-history data; mitigation effectiveness is lower for fresh wallets without an established counterparty set, and address-book labels require user effort to populate. The mitigation has a cold-start problem for new users.
- The attack has evolved beyond pure first/last-byte similarity to include vanity-address-generated middle-byte similarity, larger-amount poisoning transfers (rather than near-zero-value) that look like legitimate inbound payments, and copy-paste-clipboard-tampering malware that bypasses the wallet's display layer entirely. The mitigation reduces but does not eliminate the residual surface, particularly against clipboard-tampering malware which is outside the wallet-UX layer.
- Hardware-wallet companion display constraints make full-address display harder on small screens; the mitigation interacts with hardware-wallet UX standards (e.g., displaying address in chunks for verification) and is materially stronger when the hardware-wallet display matches the host wallet's display.
- Risk-team cross-referencing depends on watchlist freshness; campaign-cluster watchlists from compliance providers lag fresh-attacker-cluster generation, leaving a window during which a new poisoning campaign is unflagged.

## Reference implementations

- Wallet vendors with explicit poisoning warnings — Trust Wallet, Rabby, MetaMask post-2024 lookalike-warning surfaces; partial coverage of the lookalike-scoring leg. Coverage of the full-address-display leg is uneven across wallets, particularly on mobile.
- Coinbase Wallet, Phantom (Solana) — address-book and counterparty-labelling primitives that support the address-book-preference leg of the mitigation.
- Compliance-provider feeds (Chainalysis, TRM Labs) — campaign-cluster watchlists usable by custody and risk-team-side cross-referencing.
- MG `mg-detectors-rs` — campaign-cluster lookalike detection at the on-chain layer is a v0.x roadmap item; the wallet-UX layer is the canonical mitigation surface and the on-chain detector feeds custody pre-broadcast review.

## Citations

- `[chainalysis2024poisoning]` — \$68M case study and campaign-scale metrics.
- `[tsuchiya2025poisoning]` — academic cohort characterisation of the address-poisoning ecosystem.
