# LooksRare / X2Y2 wash-trading reward-farming cohort — Ethereum — 2022

**Loss:** structural — NFT wash trading on LooksRare and X2Y2 marketplaces (January–June 2022) generated an estimated $18B+ in artificial wash-trade volume used to farm LOOKS and X2Y2 token rewards. The wash-trading was not an "exploit" of the marketplace contracts (which functioned as designed) but rather the exploitation of a token-incentive design that rewarded trading volume without checking whether the volume represented legitimate price discovery.

**OAK Techniques observed:** **OAK-T7.004** (NFT Wash Laundering — primary; the wash-trading mechanism was the canonical T7.004 sub-pattern where NFTs are cycled through controlled addresses to generate artificial transaction volume, with the proceeds (token rewards) extracted as clean revenue). **OAK-T5.002** (Slow LP/Value Extraction — structurally adjacent; the reward-farming extraction mechanism is the T5.002 analogue at the NFT-marketplace layer: deposit into the reward system and extract token rewards against synthetic volume rather than genuine economic activity).

**Attribution:** **pseudonymous-cohort** (individual wash-trading clusters are identifiable on-chain via self-trade and cycle-detection heuristics; per-cluster named attribution is sparse at v0.1). The marketplace operators (LooksRare, X2X2 teams) were not participants in the wash trading but were the recipients of the fee share on wash-traded volume.

**Key teaching point:** **Marketplace token-incentive designs that reward trading volume without wash-trade detection convert the marketplace into a laundering rail for synthetic-volume-driven reward extraction.** The wash-traded NFTs themselves are the laundering instrument — the NFT transfer creates an on-chain record of "legitimate trading activity" that the reward contract accepts at face value, and the LOOKS/X2Y2 rewards extracted from the wash cycle are clean tokens with no on-chain link to the synthetic nature of the volume that generated them. The class is the NFT-marketplace analogue of T7.001 (Mixer-Routed Hop) at the reward-extraction layer rather than the deposit/withdrawal layer.

## Summary

LooksRare launched on January 10, 2022 with a "vampire attack" on OpenSea: users who had traded on OpenSea received LOOKS token airdrops, and ongoing trading activity on LooksRare earned LOOKS rewards. The reward pool was substantial — the LOOKS token emission schedule allocated a significant share to trading rewards.

The incentive design created a structural wash-trading surface:

1. **Wash-trade profitability = reward value minus marketplace fee cost.** If the LOOKS rewards earned per ETH of trading volume exceeded the 2% marketplace fee (plus gas), a trader could profit by washing NFTs between controlled addresses. The marketplace collected fees; the trader collected rewards; the NFT transfer was economically meaningless but on-chain indistinguishable from a legitimate trade.

2. **The wash-trading volume was vast.** By February 2022, CryptoSlam and Dune Analytics dashboards estimated that 80-95% of LooksRare volume was wash-traded. The absolute volume was so high that LooksRare briefly surpassed OpenSea in nominal trading volume, even though the genuine economic activity was an order of magnitude smaller.

3. **X2Y2 launched a structurally identical incentive model.** X2Y2 (February 2022) replicated the trading-reward design, producing a second wash-trading wave. The wash-traders migrated between platforms based on which reward rate exceeded the fee+gas cost.

4. **The extracted rewards entered circulation as clean tokens.** LOOKS and X2Y2 tokens earned through wash trading had no on-chain traceability to the synthetic nature of the volume that generated them. The extraction path was: purchase floor-price NFT → wash-trade between controlled addresses → claim LOOKS/X2Y2 rewards → sell LOOKS/X2Y2 for ETH/USDC. The NFT leg is the laundering mechanism; the reward token is the clean output.

The wash-trading activity was not invisible — Dune dashboards by hildobby, sealaunch, and others tracked the wash-trade percentage in near-real-time, and CryptoSlam adjusted its volume rankings to flag wash-traded marketplaces. The failure was not in detection but in incentive design: the marketplace contracts rewarded volume without any volume-authenticity check, and the wash-traders were acting rationally within the incentive structure as designed.

The wash-trading volume declined as LOOKS and X2Y2 token prices declined (the reward-per-volume equation turned negative), and both marketplaces eventually adjusted their reward mechanisms. The structural lesson — that volume-based token rewards without wash-trade detection are a laundering surface — recurred at Blur (October 2022 onwards) with a different reward mechanism that was marginally more resistant to simple self-trade cycles but still wash-trade-able at scale.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2022-01-10 | LooksRare launches with LOOKS trading rewards | **T7.004 surface deployment** |
| 2022-01 to 2022-03 | Wash-trading volume peaks; 80-95% of LooksRare volume estimated as synthetic | **T7.004 execution** |
| 2022-02 | X2Y2 launches with structurally identical reward model; second wash-trading wave | **T7.004 extension** |
| 2022-Q2 | LOOKS and X2Y2 token prices decline; wash-trade profitability drops; volume normalises | (reward-economics closure) |
| 2022-10 | Blur launches with Points-based reward model; wash-trading adapts to the new incentive structure | (next-cycle surface) |

## What defenders observed

- **Volume-based token rewards without wash-trade detection are a T7.004 surface by design, not by accident.** The marketplace contracts correctly executed every transfer and correctly distributed rewards. The failure was at the incentive specification layer — rewarding "volume" rather than "legitimate price discovery" — and the wash-traders were rational economic actors within that specification.
- **Community dashboards (Dune, CryptoSlam) were the detection layer.** The wash-trade percentage was tracked in near-real-time by independent analysts using self-trade and cycle-detection heuristics on the NFT transfer graph. The community analytics layer, not the marketplace contract layer, was where T7.004 detection lived at v0.1.
- **The NFT itself is the laundering instrument.** Unlike T7.001 (where coins pass through a mixer) or T7.003 (where coins hop across chains), T7.004 uses the NFT transfer as the obfuscation primitive. The NFT changes hands between controlled addresses; the marketplace records a trade; the reward contract distributes tokens. The reward token's on-chain provenance terminates at the reward contract — there is no direct link from the reward token back to the synthetic nature of the volume that earned it.

## What this example tells contributors writing future Technique pages

- **LooksRare/X2Y2 wash-trading is the canonical T7.004 cohort at the highest nominal volume scale.** $18B+ in synthetic wash-trade volume across two marketplaces in ~6 months makes this the largest-by-volume T7.004 instance documented at v0.1.
- **T7.004 is structurally distinct from T5.002 even though both involve reward-farm extraction.** T5.002 (Slow LP Trickle / Value Extraction) extracts from LP-provider rewards; T7.004 extracts from marketplace trading rewards. The extraction mechanism is structurally parallel but the on-chain primitive (LP provision vs NFT transfer) is different, and the detection methodology (LP-position-duration analysis vs NFT-transfer-cycle detection) is correspondingly different.
- **The Blur airdrop wash cohort (`examples/2023-02-blur-airdrop-wash-cohort.md`) is the next-cycle surface.** Contributors tracing T7.004 evolution should note that Blur's Points-based reward model was a response to the LooksRare wash-trade critique — but the Blur model was itself wash-traded at scale, demonstrating that T7.004 is resilient to reward-mechanism changes as long as the marketplace rewards a metric that can be synthetically inflated.

## Public references

- Dune Analytics. hildobby dashboard: "LooksRare & X2Y2 Wash Trade Analysis." 2022.
- CryptoSlam. NFT volume rankings with wash-trade flags, 2022.
- Dune Analytics. sealaunch dashboard: "NFT Wash Trading on LooksRare." 2022.
- Cross-reference: T7.004 (NFT Wash Laundering) at `techniques/T7.004-nft-wash-laundering.md`.
- Cross-reference: T5.002 (Slow LP Trickle / Value Extraction) at `techniques/T5.002-slow-lp-trickle-value-extraction.md`.
- Cross-reference: `examples/2023-02-blur-airdrop-wash-cohort.md` — Blur airdrop wash cohort (next-cycle T7.004 surface, 2023).

### Proposed new BibTeX entries

```bibtex
@misc{hildobby2022looksrare,
  author = {{hildobby}},
  title = {LooksRare \& X2Y2 Wash Trade Analysis — Dune Analytics Dashboard},
  year = {2022},
  note = {80–95\% of LooksRare volume estimated as wash-traded; the canonical community-side T7.004 detection layer}
}

@misc{cryptoslam2022wash,
  author = {{CryptoSlam}},
  title = {NFT Volume Rankings with Wash-Trade Flagging},
  year = {2022},
  note = {Adjusted NFT marketplace volume rankings flagging wash-traded venues; the venue-side T7.004 response}
}
```
