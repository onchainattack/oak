# OAK-M47 — First-Party Acquisition and Self-Typed Navigation

**Class:** user-behavioural
**Audience:** retail-user, custody-customer, wallet, vendor

**Maps to Techniques:** OAK-T11.007.001, OAK-T4.008, OAK-T4.010, OAK-T6.006, OAK-T11.002

## Description

A sourcing invariant covering every technique whose entry vector is an intermediary standing between the user and the thing they meant to reach: **acquire devices and software from the maker, and navigate by typing the address, never by following a link, an ad, a search result, or a store listing.**

The defensive principle is that the corpus's counterfeit-and-clone family does not attack the destination — it attacks the *path*. The vendor's site is fine; the marketplace listing is not. The wallet is fine; the ad above the search result is not. Uniswap is fine; the paid slot pointing at its clone is not. Because the attack lives in the routing layer, it is defeated by removing the routing layer, and typing an address is the only navigation primitive with no intermediary to compromise.

The rule's real work is displacing three heuristics that the corpus shows are actively counter-productive, because each is a check the user performs *and passes* on the way to being robbed. **"Is it in an official app store?"** — a counterfeit Ledger Live shipped in the Microsoft Store; the example's own text records that "users who checked for 'is this in an official app store?' as a security measure were deceived." **"Is it the top search result?"** — that slot is inventory, and MS Drainer bought it at scale, reaching 63,210 victims for ~\$59M via paid Google Search ads. **"Is the seller reputable?"** — counterfeit hardware ships with good reviews and a discount. Each heuristic converts diligence into compliance, which is why the rule must replace them rather than supplement them.

## How it applies

- **OAK-T11.007.001 (Counterfeit-Hardware Substitution):** first-party purchase is the only reliable control, because the device is compromised at manufacture and every post-purchase check is performed against attacker-controlled firmware. The corpus's teardown found a radio chip with its markings scraped off inside a device sold on the premise of having no radio, seed material in plaintext flash, and — the detail that defeats behavioural detection — a **month of normal operation** after funding before extraction. There is no user-observable signal in that window. The sourcing decision is the entire defence, and it is made once.
- **OAK-T4.008 (Fake-DEX Clone-Frontend Phishing):** self-typed navigation defeats the technique's distribution surface outright. Paid search inventory is the vector; a user who types the address never enters the auction. The technique's evasion is worth naming because it forecloses "just check the URL in the ad" — Google Ads' tracking template shows the *reviewer* the legitimate domain while the *click* resolves elsewhere, so the displayed URL is not the destination and inspecting it proves nothing.
- **OAK-T4.010 (Fake Security-Tool / Browser-Extension Phishing):** counterfeit revoke.cash and wallet-security extensions are distributed through store listings and ads; first-party sourcing intercepts them before install. Store removal is not a control at this cadence — takedowns land in days, replacements appear in hours.
- **OAK-T6.006 (Counterfeit Token Impersonation):** the same principle at the asset layer. Reach the contract address from the project's own published source, never from a search result, a social post, an airdrop notification, or a token list.
- **OAK-T11.002 (Wallet-Software Distribution Compromise):** partial coverage. First-party download removes the typosquat and fake-store distribution paths, but does **not** reach a compromise of the vendor's own legitimate distribution channel — where first-party sourcing delivers the compromised artefact by definition.

## Limitations

Does not reach upstream compromise of a legitimate first-party channel. If the vendor's own build, CDN, or dependency is compromised (T11.002 proper; the Ledger Connect Kit case), this rule delivers the attack faithfully. It relocates trust to the vendor rather than eliminating it, and that relocation is the mitigation's boundary, not a detail.

Does not cover inbound-initiated compromise, where the user never navigates at all because the attacker came to them. That surface is [`OAK-M45`](./OAK-M45-inbound-contact-refusal.md).

Does not survive the user's own memory. Typing an address defeats the intermediary only if the address is right; a mistyped domain lands in typosquat inventory that exists precisely to catch this. The complete form is type-once-then-bookmark, and the bookmark must be created from a typed session, never from a link.

Assumes the user knows what the first party *is* — which is not a given for a newcomer choosing a first wallet, and is exactly the population the technique targets. For someone who does not yet know which vendors are real, "buy from the maker" underdetermines the decision, and the corpus offers no user-side answer to that bootstrap problem. The regulator-registry check in [`OAK-M46`](./OAK-M46-small-test-withdrawal-invariant.md) partially covers venues; nothing equivalent exists for wallet vendors.

Finally, this rule imposes a real cost — full retail price, no marketplace convenience, four seconds of typing per session — and the corpus indicates the cost is why it is skipped. A mitigation whose failure mode is mild inconvenience is not a mitigation users follow by default.

## Reference implementations

- **Vendor-side:** manufacturer-direct sales channels; tamper-evident packaging (weak — the corpus's counterfeits reproduced it); published authorised-reseller lists (uneven, and the lists themselves are reached by search).
- **Platform-side:** app-store brand-impersonation review. Demonstrably insufficient at this cadence — the Microsoft Store case is the counter-example, and Chrome extension takedown/replacement runs days-versus-hours.
- **Browser-side:** bookmark-first navigation; DNS-level blocklists for known clone domains (reactive by construction, and clone domains rotate faster than lists update).
- **No production tooling for the sourcing decision itself.** It is a purchase made once, usually before the user has any reason to be careful.

## Citations

- See [`examples/2025-01-counterfeit-ledger-nano-s-plus-cohort.md`](../examples/2025-01-counterfeit-ledger-nano-s-plus-cohort.md) — ~\$9.5M+, 50+ victims; ESP32-S3 with scraped markings, antenna trace, plaintext-flash seed; month-long dwell before extraction.
- See [`examples/2024-fake-ledger-live-microsoft-store.md`](../examples/2024-fake-ledger-live-microsoft-store.md) — 16.8 BTC; the official-store heuristic failing as a control.
- See [`examples/2023-2026-fake-dex-clone-frontend-cohort.md`](../examples/2023-2026-fake-dex-clone-frontend-cohort.md) — MS Drainer: ~\$59M across 63,210 victims via paid Google Search ads; tracking-template evasion; kit sold on Telegram for \$1,500 plus 20% revenue share.
- See [`examples/2023-12-ledger-connect-kit-library-supply-chain-compromise.md`](../examples/2023-12-ledger-connect-kit-library-supply-chain-compromise.md) — the first-party-channel compromise this mitigation does not reach.
