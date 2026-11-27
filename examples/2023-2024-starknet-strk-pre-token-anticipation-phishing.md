# StarkNet STRK airdrop phishing — fake "Starknet Airdrop" claim sites with drainer code, promoted on X — StarkNet / Ethereum — 2023-12 to 2024-06

**Loss:** not quantified by any source. [PCrisk](https://www.pcrisk.com/removal-guides/28671-starknet-airdrop-scam) lists the damage only as loss of sensitive private information and monetary loss, with no amounts.

**OAK Techniques observed:** none — the opened pages show a fake airdrop claim site with drainer code, promoted on X, but no opened page dates the STRK token launch or the pre-launch signalling, so the pre-token-anticipation mechanism cannot be shown from them. Wallet connection followed by approval of a drainer contract is described by [PCrisk](https://www.pcrisk.com/removal-guides/28671-starknet-airdrop-scam); the page does not say which approval type was used.

**Attribution:** **unattributed** — no operator or drainer kit is named in the sources read.

**Key teaching point:** **Treat any "check your eligibility" site that asks for a wallet connection and a contract approval as hostile, and check the claim URL against one the project announced itself.** [PCrisk](https://www.pcrisk.com/removal-guides/28671-starknet-airdrop-scam) describes a site that asked visitors to connect a wallet to check eligibility for \$STRK, and then to approve a contract with drainer code; the Starknet co-founder separately warned on 2024-02-11 that an emailed STRK airdrop claim was a scam ([Eli Ben-Sasson](https://x.com/EliBenSasson/status/1756571198043963523), via fxtwitter).

## Summary

[PCrisk](https://www.pcrisk.com/removal-guides/28671-starknet-airdrop-scam) (guide dated 2024-06-19, updated) describes a fake cryptocurrency giveaway promoted on X that imitates a Starknet airdrop of \$STRK and asks visitors to connect their wallet to check eligibility. According to the guide, the visitor is asked to approve a malicious smart contract containing drainer code, which then gains the ability to execute unauthorized transactions and transfer funds to the attacker. The guide lists four domains, starknet-network.website, reward-now.org, stark-claim.net and provisions-starknet-io-argent.pages.dev, and names Avira, Combo Cleaner, Cyradar, Kaspersky and Sophos as flagging starknet-network.website as phishing or malicious. It says screenshot filenames indicate samples from December 2023, 2024-01-08 and 2024-06-19; this is PCrisk's own dating of samples, not of campaign start or end. It names X posts, misleading ads and unwanted applications as distribution routes; only the X promotion is tied to this specific scam.

On 2024-02-11 06:49 UTC, [Eli Ben-Sasson posted](https://x.com/EliBenSasson/status/1756571198043963523) a scam alert saying an email from "strk-labs" claiming an STRK airdrop is a scam. No loss, victim count or transaction is reported in either source.

## Timeline (UTC)

Neither source gives times, victim transactions or fund movements. Those stages are undisclosed.

| When | What happened | OAK |
|---|---|---|
| 2023-12 | Earliest sample dated by PCrisk's screenshot filenames of the fake "Starknet Airdrop" site ([PCrisk](https://www.pcrisk.com/removal-guides/28671-starknet-airdrop-scam)) | — |
| 2024-01-08 | Second PCrisk sample date | — |
| Undisclosed | Victim connects a wallet to check eligibility and approves a contract with drainer code; contract addresses and transactions undisclosed | — |
| Undisclosed | Drained funds move to the attacker; destination and amounts undisclosed | — |
| 2024-02-11 06:49 | Starknet co-founder warns that an emailed STRK airdrop from "strk-labs" is a scam ([X](https://x.com/EliBenSasson/status/1756571198043963523)) | response |
| 2024-06-19 | PCrisk publishes its guide listing four domains and vendor detections | response |

Key addresses: none. No contract or wallet address is printed in the sources read.

## Root-cause evidence

- **Technique:** none
- **Source:** <https://www.pcrisk.com/removal-guides/28671-starknet-airdrop-scam>; <https://x.com/EliBenSasson/status/1756571198043963523>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** PCrisk, a malware-removal publisher, describes the fake claim site and drainer contract; the Starknet co-founder's post confirms scam claims of an STRK airdrop existed in February 2024. Not established by these pages: losses, the drainer kit, the operator, and any pre-launch signalling window.

## Public references

- PCrisk, "Starknet Airdrop Scam" removal guide (2024-06-19): <https://www.pcrisk.com/removal-guides/28671-starknet-airdrop-scam>
- Eli Ben-Sasson, X post (2024-02-11): <https://x.com/EliBenSasson/status/1756571198043963523>
