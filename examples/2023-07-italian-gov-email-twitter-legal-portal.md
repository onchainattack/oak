# Italian Government Email Compromise — Twitter Legal Request Portal Hijack — 2023-07

**Loss:** Scammers gained access to X/Twitter's Legal Request Portal by forging fake subpoenas using compromised Italian government email accounts. Used portal access to ban accounts, look up user information, and remove posts.
**OAK Techniques observed:** OAK-T11 (Supply Chain) — government email compromise → abuse of law enforcement portal trust relationship; OAK-T4 (Social Engineering/Phishing) — fake subpoena forgery using legitimate government email accounts.
**Attribution:** **Pseudonymous** — scammers not publicly identified. Italian government email accounts were the compromised supply chain element.

**Key teaching point:** The Italian Government email → Twitter Legal Request Portal compromise demonstrates the **government-credential-as-supply-chain-attack-vector** pattern: scammers compromised Italian government email accounts, then used those legitimate government email addresses to forge subpoenas submitted to X/Twitter's Legal Request Portal. Because the requests came FROM real government email addresses, the portal processed them as legitimate law enforcement requests — granting the scammers account bans, user information lookups, and post removal capabilities. Detection approach: law enforcement portals should verify not just the email domain (which can be compromised) but also the specific authorized personnel making the request against a known directory of prosecutors/agents; email domain verification alone is insufficient.

## Summary

In July 2023, scammers compromised Italian Government email accounts and used them to access X/Twitter's Legal Request Portal — a system designed for law enforcement to submit subpoenas, account suspension requests, and information lookups.

**Attack chain:**

1. **Compromise government email:** Scammers gain access to Italian government email accounts (credentials acquired through phishing or purchase).
2. **Forge subpoenas:** Using the legitimate government email, scammers submit forged legal requests to X/Twitter's portal.
3. **Abuse portal capabilities:** Portal grants ban powers, user information access, and post removal — all under the authority of the (compromised) government email.

The attack exploits the trust relationship between platforms and government email domains: if the email comes from `@governo.it`, the portal assumes it's a legitimate law enforcement request. The email domain IS the authentication — and it was compromised.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| Pre-Jul 2023 | Italian government email accounts compromised | **T11 credential compromise** |
| 2023-07 | Forged subpoenas submitted to X/Twitter Legal Request Portal using compromised government emails | **T4 forged legal requests** |
| 2023-07 | Portal used to ban accounts, look up user info, remove posts | **T11 portal abuse** |
| 2023-07-26 | ZachXBT breaks the story | (public disclosure) |

## What defenders observed

- **Email domain as sole authentication = single point of failure.** The portal trusted any email from an `@governo.it` domain. No secondary verification (specific prosecutor badge number, digital signature from a known key, callback verification) was required. Domain-based trust is not authentication.
- **Portal capabilities are powerful attack tools.** The Legal Request Portal could ban accounts, look up user info, and remove posts — capabilities that scammers can use to suppress victims, remove evidence, and attack competitors.
- **Government email compromise is a known attack vector.** Government email systems are frequent phishing targets. Using compromised government email to submit forged legal requests to platforms is a natural escalation — the government credential unlocks platform-level powers.

## What this example tells contributors

- **Platform law enforcement portals are a T11 supply chain attack surface.** Every major platform (X/Twitter, Meta, Google, Discord) has a legal request portal. These portals trust government email domains for authentication. Compromising any government email account that is on the portal's trusted domain list grants platform-level administrative powers.
- **Digital signatures, not email domains, for legal request authentication.** Law enforcement portals should require digitally signed requests (PGP, government-issued certificates) rather than email domain verification. A signed request verifies both the sender identity AND the request integrity.
- **Government email compromise → platform portal abuse is an under-documented attack chain.** This specific attack chain (phish government email → forge subpoena → abuse platform portal) is not well documented in crypto security taxonomies. T11 should include "law enforcement portal abuse via compromised government credentials."

## Public references

- [ZachXBT — Italian Government Email Compromise / Twitter Legal Portal (X/Twitter)](https://x.com/zachxbt/status/1695929732158636422)
- Italian government email accounts: compromised to forge subpoenas.
- X/Twitter Legal Request Portal: target of forged requests.
- Scammers used portal to ban accounts, look up user info, remove posts.
