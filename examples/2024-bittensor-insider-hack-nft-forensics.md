# Bittensor — Insider-Linked Exploit / Whitehat Recovery — 2024 / 2025-10

**Loss:** ~$28M (2024 hack); suspect identified via NFT wash trading in Oct 2025.
**OAK Techniques observed:** OAK-T9 (Smart Contract / Protocol Exploit) — primary; OAK-T3 (Market Manipulation) — NFT wash trading used for attribution.
**Attribution:** **Identified** — one suspect tied to the $28M Bittensor hack identified by ZachXBT through anime NFT wash trade clustering. Suspect was a former employee.

**Key teaching point:** The Bittensor case demonstrates the **NFT forensics for attribution** pattern: the suspect was identified NOT through the hack's on-chain trail (which was well-laundered) but through their NFT trading behavior — they engaged in wash trading of anime NFTs on a separate wallet that was traceable to their identity. This is a cross-vector attribution technique: T9 (exploit) → T3 (NFT wash trading) → attribution. Detection approach: when a hack's laundering trail is cold, pivot to the suspect's non-criminal on-chain activity (NFT trading, DeFi positions, airdrop claims) — these are often less carefully obscured than the laundering path.

## Summary

In 2024, Bittensor (TAO) suffered a $28M hack. The exploiter laundered the funds through standard paths, and the trail went cold.

In October 2025, ZachXBT identified one of the suspects through an unexpected forensic path: the suspect had engaged in anime NFT wash trades on wallets that, while separate from the hack's laundering addresses, were traceable to the same individual. The NFT wash trading pattern (buying and selling the same NFTs at inflated prices across wallets they controlled) created a provable on-chain cluster.

The suspect was a former Bittensor employee — making this an insider-linked exploit. ZachXBT earned a whitehat bounty for the identification.

The case demonstrates that threat actors often separate their "criminal" wallets (hack, launder) from their "lifestyle" wallets (NFTs, DeFi, airdrops), but the two sets are linkable through behavioral and funding patterns.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2024 | Bittensor hacked. $28M stolen from protocol | **T9 exploit** |
| 2024 | Funds laundered through standard paths. Trail goes cold | **T7 laundering** |
| 2025-10 | ZachXBT pivots to NFT forensics: identifies suspect through anime NFT wash trade clustering | **T3 wash trading → attribution** |
| 2025-10 | Suspect identified as former Bittensor employee. Whitehat bounty paid | (attribution) |

## What defenders observed

- **NFT wash trading as an attribution fingerprint:** The suspect wash-traded anime NFTs on wallets that were separate from the hack wallets but funded from or linked to the same individual. Wash trading creates unnatural trading patterns that are identifiable on-chain — the same NFT bought and sold at inflated prices between wallets in the same cluster.
- **Former employee as threat actor:** The suspect's position as a former employee provided knowledge of the protocol's architecture and potential attack surfaces. This is consistent with insider-linked exploit patterns.
- **Cold laundering trail → behavioral pivot:** When the hack's laundering trail is cold, the forensic pivot is to the suspect's non-criminal on-chain behavior. Threat actors are rarely disciplined enough to obscure ALL of their wallets.

## What this example tells contributors

- **NFT / DeFi behavioral forensics is an attribution tool.** Threat actors often have separate wallets for criminal activity and personal use, but funding, timing, and behavioral patterns link them. T3 wash trading detection is not just a market manipulation tool — it's an attribution tool for T9 exploits.
- **Insider-linked exploits can go cold at the laundering layer but warm at the behavioral layer.** Former employees have on-chain histories (salary payments, team wallet interactions, airdrop claims) that create linkable clusters. OAK investigation methodology should include "previous employee on-chain activity mapping" as a standard step for protocol exploit investigations.
- **Whitehat bounties incentivize creative attribution.** ZachXBT's NFT forensics approach was rewarded with a bounty. This incentivizes the development of novel attribution techniques beyond standard laundering tracing.

## Public references

- [ZachXBT — Bittensor Investigation (X/Twitter)](https://twitter.com/zachxbt/status/1978465677578301723)
- Bittensor hack: 2024, $28M.
- Suspect NFT wash trade cluster: documented in ZachXBT investigation.
