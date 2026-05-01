# Polymarket account takeover via third-party auth — Polygon — 2024-09

**Loss:** undisclosed; Polymarket characterised the affected set as "a small number of users."
**OAK Techniques observed:** No clean v0.1 Technique. The attack vector — abuse of a third-party email-auth provider (Magic Labs) used to derive non-custodial wallets — is **proposed as a v0.x candidate Technique**: OAK-T11 sub-class for *embedded-wallet identity-provider compromise*. See `TAXONOMY-GAPS.md`.
**Attribution:** **inferred-strong**. Polymarket publicly attributed the incident to abuse of a third-party authentication tool. Specific operator attribution has not been published; the Sep 2024 incident shares structural pattern with the Dec 2025 Polymarket account-breach wave (also blamed on third-party auth) and with the broader 2024-2026 cohort of Magic Labs / Privy / Web3Auth-class compromises.
**OAK-Gnn:** none — operator unattributed at v0.1.

## Summary

Polymarket users sign up via Magic Labs, a third-party authentication service that creates a non-custodial wallet bound to the user's email address. Funds are held on-chain in a smart-contract wallet, but access is mediated through a Magic-Labs-managed key derived from the email-auth flow. From the user's perspective, this is "log in with your email"; from the protocol's perspective, this is a non-custodial wallet whose access path runs through a third-party off-chain identity provider.

In September 2024, an attacker abused this third-party auth path to gain access to a set of Polymarket user accounts and call `proxy()` on the Magic-derived wallets, transferring USDC to attacker-controlled addresses. The on-chain action was a legitimate signed transaction by the Magic-Labs-managed key; the upstream compromise was at the email-auth layer, not at the contract layer.

This is the canonical example of an attack class OAK v0.1 does not cover cleanly: when a non-custodial wallet's access path runs through a third-party identity provider, the *effective custody surface* is the auth provider's security posture — not the user's hardware-wallet hygiene or the contract's correctness.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| Sep 2024 | Attacker compromises authentication path through Magic Labs (mechanism not publicly disclosed) | (off-chain — pending v0.x) |
| Sep 2024 | `proxy()` calls executed on Magic-derived wallets; USDC transferred to attacker addresses | (extraction — no clean T mapping) |
| Sep 2024 | Polymarket public statement attributing the incident to a third-party auth provider | — |
| Dec 2025 | Repeat-pattern incident; Polymarket again points to third-party login tool; broadly speculated to be the same Magic Labs auth path | (same vector) |

## What defenders observed

- **Pre-event:** the Polymarket trust model marketed itself as "non-custodial," but the authentication substrate (Magic Labs) collapsed the security boundary back to a third-party SaaS provider. Users reasonably expected that their funds were as secure as a hardware-wallet-protected wallet; the actual security ceiling was the auth provider's email-flow integrity.
- **At-event:** the on-chain transaction was a *valid* signed transaction. There was no signing-time anomaly to detect from the user's wallet view (because the user did not sign anything — Magic signed, on the user's behalf, after auth-flow compromise).
- **Post-event:** Polymarket's response was constrained — the platform is not the entity that holds the keys, and the auth provider is a third party. Affected users had limited recourse beyond Polymarket's own discretionary response.

## What this example tells contributors

This is OAK's canonical example of the **embedded-wallet identity-provider compromise** class. The attack class is increasingly important as more crypto applications adopt email / social-login flows backed by Magic Labs, Privy, Dynamic, Web3Auth, or similar providers — all of which collapse "non-custodial" claims back into "as custodial as the auth provider's security posture."

OAK v0.x should add this as a first-class Technique under T11 (Custody and Signing Infrastructure):

- **T11.x — Embedded-wallet identity-provider compromise.** Scope: any wallet whose key derivation runs through a third-party authentication service (email magic-link, OAuth federation, MPC-backed social login). The attack surface is the auth provider's security posture; the on-chain transaction itself is correctly signed by the provider's key.

Detection signals at the user / platform layer: anomalous login-source telemetry from the auth provider (impossible-travel, new-device fingerprint, password-reset-followed-by-immediate-large-transfer); rate-limiting on first-use-after-auth large outflows; user-side opt-in to per-transaction out-of-band confirmation.

## Public references

- [The Block — Polymarket addresses third-party vulnerability after user account hacks](https://www.theblock.co/post/383711/polymarket-third-party-vulnerability-hack)
- [CoinDesk — Polymarket Points to Third-Party Login Tool After Users Report Account Breaches (Dec 2025)](https://www.coindesk.com/business/2025/12/24/polymarket-points-to-third-party-login-tool-after-users-report-account-breaches) — repeat incident corroborating same vector.
- [Crowdfund Insider — Polymarket Issues Statement Following Reports of Account Takeovers](https://www.crowdfundinsider.com/2025/12/250187-polymarket-issues-statement-following-reports-of-account-takeovers/)
- [Magic Labs documentation](https://magic.link/docs) — third-party auth + non-custodial wallet model.
