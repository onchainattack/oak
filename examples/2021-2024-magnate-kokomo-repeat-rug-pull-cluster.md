# Magnate/Kokomo/Lendora/Solfire — Cross-Project Repeat Rug Pull Operation — 2021-2024

**Loss:** $25M+ across 8+ projects (Magnate, Kokomo, Lendora, Solfire, Crolend, HashDAO, Leaper Finance, Sorta Finance). Same scammer group repeatedly deploying DeFi protocols, accumulating TVL, and exiting.
**OAK Techniques observed:** OAK-T2 (Token/Investment Fraud) — fraudulent DeFi protocol with intentional rug pull design; OAK-T7 (Laundering) — laundered proceeds from previous rugs recycled as seed liquidity for next project.
**Attribution:** **pseudonymous** — group tracked by ZachXBT through laundered fund flows between projects. $1M of laundered funds from previous rugs used to seed Leaper Finance on Blast (April 2024).

**Key teaching point:** The Magnate/Kokomo/Lendora/Solfire cluster demonstrates the **laundered-proceeds-as-seed-capital** pattern: the scammer group recycles funds from each rug pull to seed the next project's initial liquidity, creating a self-funding scam pipeline. Each project looks independent to casual observers — different chain, different name, different UI — but the funding source (laundered proceeds from the previous rug) links them all. Detection approach: trace the seed liquidity of new DeFi protocols backwards; if the funding source is a wallet that received proceeds from a known rug pull, flag the new protocol as a likely repeat scam before it launches.

## Summary

From 2021 to 2024, a single scammer group executed at least 8 DeFi protocol rug pulls across multiple chains, stealing $25M+ cumulative. The operational pattern was consistent:

1. **Launch DeFi protocol:** New protocol (lending, yield, or DEX) with professional-looking UI and marketing.
2. **Seed liquidity with laundered proceeds:** Initial TVL funded from wallets connected to PREVIOUS rug pulls — laundered through mixers, bridges, and intermediate wallets.
3. **Attract external TVL:** Legitimate users deposit funds, attracted by high yields.
4. **Rug pull:** Team withdraws all TVL, abandons the protocol.
5. **Launder and re-invest:** Proceeds laundered, then recycled as seed liquidity for the next project (on a different chain, under a new name).

**Documented projects in the cluster:**

- Magnate (Base)
- Kokomo (Optimism)
- Lendora (Scroll)
- Solfire (Polygon)
- Crolend (Cronos)
- HashDAO (Avalanche)
- Leaper Finance (Blast) — flagged April 2024 before launch
- Sorta Finance (Arbitrum) — flagged July 2024 before launch

In April 2024, ZachXBT identified that ~$1M of laundered funds from previous rugs was used to seed Leaper Finance on Blast. In July 2024, Sorta Finance on Arbitrum was flagged with the same deployer funding pattern. Both were identified BEFORE they could rug, preventing additional losses.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2021-2024 | 8+ DeFi protocols launched and rugged. $25M+ cumulative | **T2 repeat rug pull** |
| 2024-04-14 | ZachXBT identifies Leaper Finance on Blast — $1M seed from laundered prior rug proceeds | **T7 recycled proceeds** |
| 2024-04-14 | Leaper Finance social media deleted within hours of ZachXBT alert | (scram response) |
| 2024-07-25 | Sorta Finance on Arbitrum flagged with same deployer pattern | **T2 pre-launch detection** |

## What defenders observed

- **Laundered proceeds as seed liquidity = self-funding scam pipeline.** The group didn't need outside capital to launch new protocols. Each rug generated the seed liquidity for the next one. This made the operation self-sustaining — only external TVL deposits were at risk each cycle.
- **Cross-chain deployment as obfuscation.** Each project launched on a different chain (Base, Optimism, Scroll, Polygon, Cronos, Avalanche, Blast, Arbitrum). Single-chain monitoring would see only one rug per chain — cross-chain tracing was required to link them.
- **Deployer wallet funding trace as the attribution link.** The single point of failure was the funding trace: each new protocol's deployer wallet was funded from wallets connected to previous rugs. The deployer funding source IS the cluster identifier.
- **Pre-launch detection prevented two rugs.** Leaper Finance and Sorta Finance were identified and publicly called out before they attracted significant TVL, demonstrating that the detection method (trace deployer funding to known rug addresses) is effective when applied proactively.

## What this example tells contributors

- **Deployer funding source tracing is a pre-launch T2 detection primitive.** Any new DeFi protocol's deployer wallet can be traced backwards. If the funding path passes through a known rug pull address, the new protocol is a repeat scam. OAK T2 detection specs should include "new protocol deployer → funding source → known rug address" as a pre-launch screening rule.
- **Cross-chain rug pull clustering is a T7 attribution technique.** The same scammer group operating across 4+ chains is only identifiable through cross-chain deployer funding analysis. Single-chain rug pull lists miss the cluster.
- **Public pre-launch callouts work.** When ZachXBT publicly flagged Leaper Finance and Sorta Finance before launch, both projects' social media was deleted within hours. The public alert → pre-launch takedown pipeline prevents victim losses.

## Public references

- [ZachXBT — Leaper Finance / Repeat Scammer Alert (X/Twitter)](https://x.com/zachxbt/status/1779333168383791411)
- [ZachXBT — Sorta Finance Alert (X/Twitter)](https://x.com/zachxbt/status/1816443881447440789)
- Documented rug pulls: Magnate, Kokomo, Lendora, Solfire, Crolend, HashDAO, Leaper Finance, Sorta Finance.
- $25M+ cumulative. 8+ protocols. 6+ chains.
