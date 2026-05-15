# Murad — $24M Meme Coin Insider Wallet Cluster — 2024

**Loss:** $24M held across 11 connected insider wallets tied to @MustStopMurad on Ethereum and Solana. All wallets funded from a single source address `0x93f019699ef400df7dc3477dbb6400ed9445a657`.
**OAK Techniques observed:** OAK-T3 (Market Manipulation) — influencer-driven pump with pre-positioned insider wallets distributing into retail demand.
**Attribution:** **Identified** — 11 high-confidence wallets tied to @MustStopMurad. Attribution evidence: all wallets funded from the same source address which is tied to Murad's public ENS and other on-chain activity. Investigation published October 2024.

**Key teaching point:** The Murad wallet cluster demonstrates the **single-funding-source attribution** pattern: all 11 insider wallets were funded from one address (`0x93f01...`), which was itself tied to Murad's public ENS and on-chain identity. The multi-wallet obfuscation (splitting positions across 11 wallets to obscure total exposure) was undone by the shared funding source — a single point of attribution failure. Detection approach: when an influencer promotes a token, trace backwards from any suspicious selling wallet to its funding source; if the funding source connects to the influencer's known addresses, the full wallet cluster is attributable.

## Summary

In October 2024, ZachXBT identified 11 high-confidence wallets tied to meme coin influencer @MustStopMurad holding ~$24M in meme coins across Ethereum and Solana.

**Attribution chain:**

1. All 11 wallets funded from a single source: `0x93f019699ef400df7dc3477dbb6400ed9445a657`
2. This funding source is directly tied to Murad's public ENS and verified on-chain activity
3. Single funding source → single controlling entity → Murad

**Operational pattern:**

1. **Pre-promotion accumulation:** Wallets accumulate meme coin positions quietly, before any public mention.
2. **Influencer promotion:** Murad promotes the token to his audience, driving retail buying pressure.
3. **Distribution into strength:** As the audience buys and price rises, the insider wallets sell into retail demand.

The 11-wallet structure is an obfuscation technique — it prevents casual observers from seeing the total position size on any single wallet explorer. But the shared funding source collapses the anonymity.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| Pre-Oct 2024 | 11 wallets funded from `0x93f01...` (tied to Murad's ENS) accumulate $24M in meme coins across ETH and SOL | **T3.003 accumulation** |
| 2024 (ongoing) | Murad promotes meme coins to audience. Insider wallets distribute during pumps | **T3.003 distribution** |
| 2024-10-09 | ZachXBT publishes 11-wallet cluster with funding source attribution evidence | (public disclosure) |

## What defenders observed

- **Single funding source as attribution single point of failure:** The 11-wallet obfuscation was effective against casual observation but collapsed under funding-source tracing. The single Ethereum address `0x93f01...` that funded all 11 wallets was tied to Murad's public ENS — a direct on-chain identity link.
- **11 wallets, not 1:** The wallet splitting is an obfuscation technique — individual wallets show smaller positions, and sales from any single wallet don't trigger portfolio tracker alerts. But the obfuscation is only skin-deep: shared funding source collapses the cluster.
- **Cross-chain operation (ETH + SOL):** The cluster spans both Ethereum and Solana, requiring cross-chain clustering to identify the full $24M position. Single-chain analysis sees only a fragment.
- **Audience as exit liquidity:** The influencer's followers are the counterparty to every insider wallet sale. The trust relationship (audience trusts influencer's recommendations) is the vulnerability being exploited.

## What this example tells contributors

- **Funding source tracing defeats multi-wallet obfuscation.** Splitting positions across N wallets doesn't work if all N wallets are funded from the same source. OAK T3 detection specs should include "shared funding source" as a wallet clustering parameter — it's often the highest-precision clustering signal.
- **ENS-to-funding-source linking is an attribution technique.** When a funding source address interacts with an ENS domain or is referenced in on-chain activity tied to a known identity, the entire downstream wallet cluster becomes attributable. This is a standard on-chain attribution primitive.
- **Influencer wallet disclosure as a transparency standard.** If influencers disclosed their positions (as securities laws require in traditional finance for investment advisors), the 11-wallet cluster would be unnecessary — the positions would be public. The absence of mandatory disclosure is the regulatory gap.

## Public references

- [ZachXBT — Murad 11-Wallet Cluster (X/Twitter)](https://x.com/zachxbt/status/1843940648430493906)
- Funding source: `0x93f019699ef400df7dc3477dbb6400ed9445a657` (tied to Murad's public ENS).
- @MustStopMurad: meme coin influencer, Ethereum and Solana.
- 11 high-confidence wallets holding ~$24M in meme coins.
