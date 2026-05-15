# Mark Cuban — Public Figure Wallet Social Engineering Compromise — 2024-06

**Loss:** Crypto assets stolen from Mark Cuban's public wallet `markcuban.eth` via social engineering. Same device indicators linked to the $243M Genesis Creditor theft (Malone Lam, Veer Chetal, Jeandiel Serrano).
**OAK Techniques observed:** OAK-T4 (Social Engineering/Phishing) — targeted social engineering of a high-net-worth individual via their publicly known wallet address; OAK-T6 (Authorization/Key Compromise) — wallet access compromise through social engineering rather than technical exploit.
**Attribution:** **confirmed** — linked via device indicators to Malone Lam (Greavys) and associates, the same group behind the $243M Genesis Creditor theft. ZachXBT investigation published May 2025.

**Key teaching point:** The Mark Cuban wallet compromise demonstrates the **device fingerprint cross-case linkage** pattern: the Cuban compromise (June 2024) and the $243M Genesis Creditor theft (August 2024) were linked through identical device indicators used during the attacks. The threat actors reused the same devices/infrastructure across multiple high-value targets, creating a forensic bridge between cases. Detection approach: device fingerprinting (browser fingerprint, IP ranges, session metadata) from wallet interactions should be preserved and cross-referenced across cases; repeat device usage by threat actors is an attribution primitive that links seemingly unrelated incidents.

## Summary

On June 23, 2024, Mark Cuban — billionaire investor and public figure — fell victim to a social engineering scam that resulted in crypto assets being stolen from his publicly known wallet `markcuban.eth`.

During the investigation of the $243M Genesis Creditor theft (August 2024), ZachXBT and investigators uncovered additional evidence: the Mark Cuban wallet compromise involved the exact same device indicators as the Genesis Creditor theft. This linked the Cuban compromise to Malone Lam (Greavys), Veer Chetal (Wiz), and Jeandiel Serrano (Box) — the same threat actor group.

The Cuban wallet was a public ENS name (`markcuban.eth`) — anyone could see his on-chain activity, token holdings, and transaction history. The attackers used this public information to craft a targeted social engineering approach, likely impersonating a service provider, exchange, or support entity relevant to Cuban's known holdings.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2024-06-23 | Mark Cuban's wallet `markcuban.eth` compromised via social engineering | **T4 social engineering** |
| 2024-06-23 | Crypto assets stolen from Cuban's wallet | **T6 wallet compromise** |
| 2024-08-19 | Same group executes $243M Genesis Creditor theft | (linked case) |
| 2025-05-16 | ZachXBT publishes investigation linking Cuban compromise to Genesis Creditor group via device indicators | (public disclosure) |

## What defenders observed

- **Public wallet = public target profile.** `markcuban.eth` was a publicly known ENS name. The attacker could research Cuban's entire on-chain portfolio — token holdings, DeFi positions, NFT collections — before making contact. The wallet's publicity enabled targeted reconnaissance.
- **Device indicators as cross-case forensic bridge.** The same device fingerprints (browser characteristics, IP ranges, session timing patterns) appeared in both the Cuban compromise and the Genesis Creditor theft. Device reuse by threat actors is an operational security failure that enables case linkage.
- **High-net-worth individual + public wallet = high-value target.** Public figures with known ENS names are a distinct victim profile from exchange users or retail traders. The attacker can size the target before engaging, ensuring high ROI per attack.

## What this example tells contributors

- **Device fingerprinting is a T8 attribution data source.** Browser fingerprints, IP ranges, OS/browser version strings, and session metadata collected during the attack constitute a forensic profile. When the same profile appears across multiple incidents, those incidents are linked to the same threat actor. OAK T8 (Attribution) should include "device fingerprint cross-case matching" as an attribution technique.
- **Public ENS names are a victim targeting vector.** ENS names that resolve to known individuals create a target list for social engineering. The ENS maps an identity to a wallet, enabling personalized reconnaissance. This is a T4 targeting primitive — the attacker selects victims by ENS identity, not by wallet balance alone.
- **High-value individual victims are a distinct T6 sub-pattern.** The social engineering of a billionaire with a known wallet differs from mass phishing — it's targeted, researched, and likely involves impersonation of services the specific individual uses. T6 should distinguish "targeted high-net-worth individual compromise" from "mass credential harvesting."

## Public references

- [ZachXBT — Mark Cuban Compromise / Genesis Creditor Link (X/Twitter)](https://x.com/zachxbt/status/1923465312529416702)
- Mark Cuban wallet: `markcuban.eth` (Ethereum).
- Linked to: Malone Lam (Greavys), Veer Chetal (Wiz), Jeandiel Serrano (Box).
- Same device indicators as $243M Genesis Creditor theft (August 2024).
