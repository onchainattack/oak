# Ethereum Block Builder Exclusive Order-Flow Centralization and Censorship — 2022–2025

**Loss:** structural — block building on Ethereum is concentrated in a few builders, and exclusive order flow (EOF) arrangements are cited as a driver. Per Observers (2024-11-29), beaverbuild held about 50% and Titan Builder about 36.9% of blocks; per Talos, a later snapshot had Titan Builder at 47.6% and BuilderNet at 26.0%. Shares vary widely by window and source. No dollar loss is asserted.
**OAK Techniques observed:** **OAK-T14.005** (Builder/Relay Collusion / Censorship for MEV Extraction — builder centralization through exclusive order flow is a structural T14.005 sub-pattern: builder market power concentrates the ability to exclude transactions.) **OAK-T14.002** (MEV-Boost Relay Censorship / Manipulation — structurally adjacent; builder centralization compounds with relay centralization.)
**Attribution:** **unattributed** — no attacker. The concentration is a market-structure outcome of MEV-Boost and EOF economics; the builders named in sources are beaverbuild, Titan Builder and, later, BuilderNet.

**Key teaching point:** **Exclusive order flow is the commonly cited engine of builder centralization in post-Merge Ethereum.** If an order-flow source sends meaningful transaction flow to only one builder, that builder can construct more valuable blocks than competitors who cannot see the flow, which Observers describes as a chicken-and-egg barrier to entry for new builders. The resulting concentration means fewer entities need to be coerced or compromised to censor transactions at scale.

**Corrected 2026-10-11:** removed unsourced figures and claims (builder0x69 as a joint entity with beaverbuild, "top-2 50-70% / top-5 80-90%", "15+ builders at the Merge", a 2023-Q4 "Flashbots builder-products sunset", and the self-reinforcing proposer-payment cycle) and replaced them with sourced shares and EOF examples; no source found for the Flashbots sunset.

## Summary

Post-Merge Ethereum block production runs through MEV-Boost: searchers find opportunities, builders construct blocks, relays pass them to proposers. Per Observers (2024-11-29), two builders then produced most blocks (beaverbuild about 50%, Titan Builder about 36.9%; vanilla builders about 9%, all others about 4.1%). Observers attributes this to exclusive order flow: Titan Builder partnered with the Telegram trading bot Banana Gun during the memecoin frenzy, and beaverbuild appears to have partnered with CoW Swap. It describes new builders as unable to compete without order flow, and says validators using MEV-Boost give up control over which transactions enter their blocks, so a builder can exclude transactions for economic or other reasons.

Talos later reported Titan Builder at 47.6% and BuilderNet at 26.0%, and that beaverbuild was partnering with BuilderNet to share transaction flow. Other sources give very different percentages for different windows (for example, 86% combined for beaverbuild and Titan over a two-week period in March 2025 per Gate), so a specific date range should accompany any share quoted.

The censorship point is a risk, not a documented abuse in these sources: a concentrated builder set means fewer parties must be coerced or compromised. The OFAC-compliance censorship cases are covered by other OAK examples.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-09 | Ethereum Merge; MEV-Boost block production begins | T14.005 (surface creation) |
| 2024-11-29 | Observers: beaverbuild ~50%, Titan ~36.9% of blocks; EOF deals (Banana Gun, CoW Swap) cited | T14.005 |
| later | Talos: Titan ~47.6%, BuilderNet ~26.0%; beaverbuild partnering with BuilderNet | T14.005 |

## Public references

- `[observersbuilders]` — Observers, "How Two Block Builders Monopolized Ethereum Block Production" (2024-11-29): <https://www.observers.com/how-two-block-builders-monopolized-ethereum-block-production/>
- `[talosbuilding]` — Talos, "Transaction Priority & Block Building on Ethereum": <https://www.talos.com/insights/state-of-the-network-356>
- `[gatebuilders]` — Gate Learn, "Monopoly in Ethereum Block Builders and Chain Abstraction": <https://www.gate.com/learn/articles/monopoly-in-ethereum-block-builders-and-chain-abstraction-unveiling-profit-incentives-and-innovation-opportunities-in-the-blockchain-ecosystem/7690>
- `[eigenphibuilders]` — EigenPhi, "Block Building & Bank Building: How 2024's Searcher-Builder Wizards Made Your Trading Look Cute": <https://eigenphi.substack.com/p/searcher-builder-2024-review>
- See `techniques/T14.005-builder-censorship-mev-extraction.md` for Technique definition.

## Discussion

The builder-centralization surface extends T14.005 from censorship policy to market structure: a concentrated builder set reduces how many entities must be compromised or coerced for censorship at scale. It is a market-structure property rather than an exploit, and the mitigation direction named in the original file (enshrined proposer-builder separation) is a roadmap item not evaluated by the cited sources.
