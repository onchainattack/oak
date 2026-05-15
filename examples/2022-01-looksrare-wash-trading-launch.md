# LooksRare wash-trading launch incentive — Ethereum — 2022-01-10 onward

**Loss:** unquantified in extraction terms; the LOOKS token launch-and-airdrop mechanism produced structurally incentivised wash trading that inflated the platform's reported volume to the #2 NFT-marketplace position within days of launch. The economic "loss" is market-information-integrity erosion — wash-traded volume was reported as genuine trading activity, misleading users, data aggregators, and token-price-discovery mechanisms about the platform's true organic adoption.

**OAK Techniques observed:** **OAK-T12.001** (NFT Wash Trading — primary; the LOOKS token-reward mechanism paid wash traders in LOOKS tokens for volume that was self-dealing, producing inflated volume metrics). **OAK-T3.002** (Wash-Trade Volume Inflation — structurally co-occurring; the wash-trading volume inflated the platform's reported market-share ranking on data-aggregator dashboards and token-price-discovery surfaces). **OAK-T2.001** (Single-Sided Liquidity Plant — structurally adjacent; the LOOKS token liquidity was seeded by the team on Uniswap to absorb the wash-trading LOOKS reward sell-pressure).

**Attribution:** **unattributed** LooksRare's LOOKS token launch distributed trading rewards (in LOOKS) proportional to trading volume, with no wash-trading detection or exclusion filter. The reward mechanism was public and specified in the LOOKS token documentation; the resulting wash-trading wave was the rational economic response to the specified incentive structure.

**Key teaching point:** **A token-reward mechanism that distributes rewards proportional to nominal trading volume without a wash-trading exclusion filter structurally produces wash-trading volume.** The LOOKS launch demonstrated that NFT-marketplace-launch tokenomics with volume-proportional rewards and no Sybil-resistance or wash-trading exclusion will predictably produce the wash-trading outcome — it is a mechanism-design property, not an attacker-behaviour property.

## Summary

LooksRare launched on January 10, 2022 as a community-first NFT marketplace positioned as an alternative to OpenSea. The launch strategy combined:

1. **LOOKS token airdrop to OpenSea users** — any wallet that had traded >= 3 ETH volume on OpenSea in the preceding 6 months was eligible for a LOOKS airdrop, creating a built-in initial user base.
2. **Trading-reward emissions** — LOOKS tokens were distributed daily to NFT traders proportional to their trading volume on the platform, denominated in ETH. The reward rate was calibrated to make wash trading profitable: the LOOKS reward per ETH of volume exceeded the platform's 2% trading fee for a material window.
3. **Staking mechanism** — LOOKS holders could stake their tokens to earn a share of the platform's trading-fee revenue (in WETH), creating buy-pressure for the LOOKS token.

The wash-trading surface was embedded in component (2): any trader who paid the 2% platform fee on a self-trade (wash trade) would receive LOOKS tokens whose market value exceeded the fee paid, netting a profit. The wash-trading loop was: list an NFT at an inflated price → self-purchase the NFT via a separate wallet → pay the 2% fee → receive LOOKS rewards worth > 2% of the inflated trade value → sell the LOOKS rewards on the open market → repeat.

The mechanism produced a wash-trading wave within hours of launch. By January 11, 2022, on-chain analysts (Hildobby, hytaleb, and CryptoSlam data) had identified that approximately ~95%+ of LooksRare's reported launch-day trading volume was wash-traded. The platform briefly claimed the #2 NFT-marketplace position by reported volume (behind OpenSea), though organic adoption was a small fraction of the reported figure.

Over 2022–2023, the LOOKS token declined from its post-launch peak as the wash-trading incentive waned and organic adoption did not sustain the platform at the post-launch volume level. The case established the wash-trading-by-token-reward mechanism-design pattern that recurred in subsequent NFT marketplace launches (X2Y2, Blur — January/February 2023).

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2022-01-10 | LooksRare launches; LOOKS token airdrop + trading-reward emissions go live | **T12.001 surface created** |
| 2022-01-10 to 2022-01-11 | ~95%+ of reported volume identified as wash-traded by on-chain analysts | **T3.002 execution** |
| 2022-01-12 | Wash-trading structural-dependency analysis published by Dune Analytics / Hildobby; CryptoSlam excludes wash-traded volume from LooksRare reporting | (analyst response) |
| 2022-Q1 to 2022-Q2 onward | LOOKS token declines from post-launch peak; wash-trading incentive wanes as LOOKS price falls; platform volume normalises toward organic adoption | (incentive-resolution) |
| 2023-01 to 2023-02 | Blur and X2Y2 launch with structurally parallel volume-reward mechanisms; wash-trading-by-reward pattern recurs | (class recurrence) |

## What defenders observed

- **Volume-proportional token rewards without wash-trading exclusion predictably produce wash-trading volume.** The LOOKS reward mechanism was public and specified in the token documentation. The wash-trading outcome was the rational economic response — it was not an "exploit" or a "bug" but the mechanism functioning as designed by economic actors responding to the specified incentive structure.
- **Wash-trading volume contaminates market-information surfaces.** The inflated volume ranking (LooksRare temporarily #2 by reported NFT volume) was consumed by news media, token-price-discovery algorithms, and retail-trading decisions as a signal of genuine platform adoption. The contamination of the volume-signal channel is the T12.001 harm mechanism.
- **Token-reward wash trading is structurally distinguishable from venue-wash-trading (T3.002) by the incentive layer.** T3.002 covers venue-level wash trading for volume-inflation purposes (e.g., inflating CoinGecko/CoinMarketCap ranking). T12.001 covers token-reward-driven wash trading where the wash-trader is paid in the marketplace token and the wash-trading is the token's primary demand driver.

## What this example tells contributors writing future Technique pages

- **T12.001 (NFT Wash Trading) is the load-bearing classification for token-reward-driven wash trading at NFT marketplace launches.** The LOOKS case anchors the mechanism-design-incentive sub-pattern: the platform's tokenomics produced wash trading as an emergent property, not as a deliberate-volume-inflation-by-operator action. The T12.001 framing (structurally distinct from T3.002 by the incentive layer) is the correct classification.
- **The token-reward-wash-trading pattern recurs across the 2022–2023 NFT marketplace launch cohort.** LooksRare (January 2022), X2Y2 (February 2022), Blur (January–February 2023) — each deployed a variant of the volume-proportional-token-reward mechanism and each experienced a wash-trading wave within days of launch. The pattern is sufficiently regular that any NFT marketplace launch with volume-proportional token rewards and no wash-trading exclusion should be treated as a standing T12.001 surface.

## Public references

- Hildobby / Dune Analytics. *"LooksRare Wash Trading Analysis."* January 2022 — the canonical on-chain wash-trading-volume analysis of the LOOKS launch — `[hildobbylooksrare2022]`.
- CryptoSlam. *"LooksRare Volume Exclusion from Aggregate NFT Volume Reporting."* January 2022 — the data-aggregator response: exclusion of independently-identified wash-traded volume from reported aggregates.
- Cross-reference: T12.001 (NFT Wash Trading) at `techniques/T12.001-nft-wash-trading.md` — the NFT-marketplace-token-reward wash-trading pattern.
- Cross-reference: T3.002 (Wash-Trade Volume Inflation) at `techniques/T3.002-wash-trade-volume.md` — the venue-level wash-trading analogue.

### Proposed new BibTeX entries

```bibtex
@misc{hildobbylooksrare2022,
  author = {{Hildobby}},
  title = {LooksRare Wash Trading Analysis — Dune Analytics},
  year = {2022},
  month = jan,
  note = {Canonical on-chain analysis of the LooksRare launch wash-trading wave; ~95%+ wash-traded volume identified within 48 hours of launch.},
}
```
