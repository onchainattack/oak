# Polymarket comment-section phishing campaign — Polygon — 2025-11

**Loss:** ≥ $500,000 cumulative across affected users; per-incident losses individually unlogged but disclosed in aggregate by Polymarket support and corroborated by independent vendors (CoinSpot, Phemex, BingX, Cryptopolitan).
**OAK Techniques observed:** **OAK-T4.007** (Native-app Social Phishing on Engagement-Weighted Platforms) — canonical anchor case. Chains into **OAK-T11.008** (Embedded-Wallet Identity-Provider Compromise) at the credential-capture stage. Distinct from DM-spam phishing (T4 generic) because the distribution surface is a paid-for in-platform mechanic. The credential-capture stage is also distinctive: it is **not** an `eth_signTypedData` / Permit2 trap, it is a fake login + fake captcha that captures the user's email-magic-link credentials.
**Attribution:** **inferred-strong** (Polymarket and independent vendors confirmed campaign existence and scale; specific operator-cluster attribution not published — operator opsec consistent with Drainer-as-a-Service affiliate behaviour, but no DaaS kit was publicly named).
**OAK-Gnn:** unattributed at v0.1. Operator pattern is consistent with OAK-G02 (Drainer-as-a-Service) but no specific DaaS-kit fingerprint (Inferno / Angel / Pink / Monkey / Venom / Vanilla / Chick) has been confirmed in this campaign — itself a finding.

## Timeline (UTC unless noted)

| When | Event | OAK ref |
|---|---|---|
| 2025-10 → 2025-11 | Attackers select high-volume Polymarket markets; buy both YES and NO shares in size sufficient to anchor "top comment" via Polymarket's position-weighted comment-pinning mechanic | T4.007 (paid-engagement phishing distribution — position-purchase as visibility mechanism) |
| 2025-10 → 2025-11 | Pinned comments offer "private markets with better odds" and link to obfuscated URLs resolving to cloned Polymarket login pages | T4.010 (credential-phishing via platform-native comment surface) |
| 2025-10 → 2025-11 | Cloned login pages present fake Cloudflare turnstile challenge and Polymarket-branded login form; capture user email and email-magic-link verification code | T15.004 (credential capture — email + magic-link authentication bypass) |
| 2025-10 → 2025-11 | Attacker authenticates to Magic Labs as user via captured credentials; gains access to Polymarket-derived non-custodial wallet; transfers USDC to attacker-controlled addresses | T4.001 (wallet access via credential-based authentication compromise) |
| 2025-11-11 | Independent disclosure by user "25usdc" on X; cumulative losses reported above $500,000 by CoinSpot, Phemex, and BingX | (public disclosure — campaign documented) |
| 2025-11 onward | Polymarket acknowledges campaign; characterizes dominant mitigation as user-side vigilance; implements comment-flagging for external-link comments from unverified accounts | (platform response — limited flagging implementation) |

**Key teaching point:** **The Polymarket comment-section phishing campaign (Oct–Nov 2025) established that in-platform paid-engagement mechanics (position-weighted comment pinning) can be weaponized as phishing distribution surfaces.** The attacker purchased both YES and NO shares to occupy the comment-pinning slot, converting phishing-message visibility from a free-but-deletable resource into a purchased, platform-mechanic-protected resource. The credential-capture attack (fake login page, email + magic-link code) bypasses every wallet-side defense because the user sees a bank-style login form, not `eth_signTypedData`. This pattern generalizes to any platform where engagement-weighted ranking determines visibility and where authentication collapses to email/passkey custody.

## Summary

Through October-November 2025, attackers ran a coordinated phishing campaign exploiting Polymarket's native comment-section mechanic. The campaign worked as follows:

1. The attacker selected high-volume, high-engagement Polymarket markets (election trackers, sports outcomes, geopolitical events).
2. The attacker bought *both* YES and NO shares on the target market in size sufficient to anchor a "top comment" — Polymarket's comment-pinning mechanic ranks comments by the commenter's combined position, not by reaction count. This allowed the phishing comment to remain pinned regardless of community downvotes.
3. The pinned comment offered "private markets with better odds" and linked to an obfuscated URL — typically a tracking/redirect domain that resolved to a cloned Polymarket login page.
4. The cloned login page presented a fake Cloudflare turnstile challenge and a Polymarket-branded login form that captured the user's email and the email-magic-link verification code.
5. With email + code, the attacker authenticated to Magic Labs as the user, gained access to the user's Polymarket-derived non-custodial wallet, and transferred USDC to attacker-controlled addresses.

Independent disclosure on November 11, 2025 (user handle "25usdc" on X) and follow-up reporting from CoinSpot, Phemex, and BingX placed cumulative losses above $500,000. Polymarket public statements acknowledged the campaign and characterised the dominant mitigation as user-side vigilance ("we will never DM you first; do not click external links from comments").

## What's structurally novel

Two properties make this campaign distinct from generic crypto phishing:

1. **The distribution surface is a paid-for in-platform mechanic.** The attacker spent capital on Polymarket positions specifically to occupy the comment-pinning slot. This converts the phishing-message visibility from a free-but-deletable resource (public-channel posts, X replies) into a *purchased* resource — and Polymarket's mechanic does not have a downvote-or-flag override for paid pinning. This same primitive generalises to any platform where engagement-weighted ranking determines visibility (Friend.tech-class apps, pump.fun comment threads, Farcaster casts).

2. **The credential-capture stage is bank-style, not Web3-style.** The user does not see `eth_signTypedData`. The user sees an email-and-code login form. This bypasses every wallet-side defense — hardware wallet display, Permit2 spender warnings, approve-revoke tooling — because none of those defenses are in the loop. The attack collapses to a SaaS credential phish. This is the same surface that the September 2024 and December 2025 Polymarket account-takeover incidents exploited (see `examples/2024-09-polymarket-magic-labs-takeover.md`); the November 2025 comment-section campaign is the *delivery mechanism* finally documented at scale.

## What defenders observed

- **Pre-event:** the comment-pinning mechanic was already known to Polymarket's product team; the abuse vector had been raised by users in Discord through 2024-2025. The platform did not implement a flag-and-hide override before the November campaign.
- **At-event:** the phishing infrastructure was rotated frequently (domain teardown within hours of public flagging by ScamSniffer / on-chain investigators). The fake-Cloudflare-turnstile pattern was the most-reported anti-detection element — community reporting noted that the captcha looked legitimate but the underlying form posted credentials to the attacker's server.
- **Post-event:** Polymarket's statement focused on user-side vigilance ("we never DM first"). The platform-side mitigation — flagging or hiding comments containing external links from accounts that had not previously posted — was implemented later but with limited bypass-resistance.

## What this example tells contributors

Contributors writing v0.x candidate Techniques for Polymarket-class platforms should consider:

1. **T4.x — Native-app social phishing on engagement-weighted platforms.** Scope: any platform where in-app message visibility is determined by a paid-for or engagement-weighted mechanic that the attacker can manipulate. Distinct from generic phishing because the platform's own mechanics fund the distribution surface.

2. **T11.x — Email-magic-link credential capture against embedded-wallet identity providers.** Scope: phishing flows that target email-auth + verification-code pairs to assume control of non-custodial wallets derived through Magic Labs / Privy / Web3Auth / similar. Distinct from approve-drainer (T4.001 / T4.004) because no on-chain signing is involved on the user side.

The detection signal worth tracking: in-comment links from accounts whose YES+NO position size is anomalous relative to their account history. This is platform-side, not wallet-side, and can be implemented at the Polymarket layer.

## Public references

- [CoinSpot — A phishing scheme uncovered on Polymarket: users lost over $500,000](https://coinspot.io/en/analysis/a-phishing-scheme-uncovered-on-polymarket-users-lost-over-500000/)
- [MEXC News — Polymarket Phishing Scam Results in Over $500K in Losses](https://www.mexc.com/news/162130)
- [Cryptopolitan — Phishing links in Polymarket "private markets"](https://cryptopolitan.com/phishing-links-in-polymarket-private-markets/)
- [BingX News, Phemex News — secondary aggregator coverage of the November 2025 disclosure](https://bingx.com/news/) — independent corroboration of Polymarket's acknowledgement.
- ["25usdc" public disclosure thread — November 11, 2025](https://x.com/) — first-person victim disclosure (specific URL not preserved here; cited via CoinSpot's reproduction).
