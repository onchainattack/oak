# Lazarus Group — $200M Fiat Cash-Out from 25+ Hacks — 2020-2023

**Loss:** $200M+ from 25+ crypto hacks laundered to fiat by Lazarus Group over 2020-2023. $374K USDT frozen (Nov 2023); $3.4M frozen by 3 of 4 stablecoin issuers; undisclosed amount frozen at CEXs.
**OAK Techniques observed:** OAK-T7 (Laundering) — multi-stage pipeline: mixer → cross-chain bridge → P2P marketplace → fiat off-ramp. Noones and Paxful P2P marketplaces identified as the fiat conversion layer.
**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md).
**Attribution:** **confirmed** — Lazarus Group (DPRK state-sponsored). ZachXBT 15-month investigation published April 2024.

**Key teaching point:** The Lazarus Group $200M laundering investigation demonstrates the **P2P marketplace as fiat off-ramp** pattern: after mixer (Tornado Cash) and cross-chain bridge hops, Lazarus consolidated funds at Noones and Paxful — P2P marketplaces where crypto is traded directly for fiat between users, with lighter KYC than centralized exchanges. The P2P marketplace layer is the detection gap: P2P platforms have fewer compliance resources than major CEXs, making them the preferred final hop before fiat. Detection approach: P2P marketplace deposit addresses receiving funds traceable to known exploit wallets, especially accounts trading at volumes inconsistent with retail P2P activity.

## Summary

From 2020 to 2023, Lazarus Group executed 25+ crypto hacks — primarily targeting cross-chain bridges and exchange hot wallets — accumulating over $200M in stolen assets. ZachXBT's 15-month investigation (published April 2024) traced the full laundering pipeline across multiple blockchains through mixers to centralized exchanges and P2P marketplaces.

The laundering pipeline:

1. **Mixer layer**: Stolen funds enter Tornado Cash (pre-2022 sanctions). Mixer breaks the on-chain link between hack origin and subsequent movement.
2. **Cross-chain bridge layer**: Mixed funds are bridged across multiple blockchains, fragmenting the chain of custody.
3. **P2P marketplace fiat off-ramp**: Funds consolidate at Noones and Paxful — P2P marketplaces where users trade crypto directly for fiat. ZachXBT identified specific accounts at both platforms that received funds from the hacks.
4. **CEX accounts**: Additional accounts at centralized exchanges consolidated and off-ramped funds.

**Fund freezes demonstrate the detection-response pipeline:** $374K USDT was frozen in November 2023. An additional $3.4M was frozen by 3 of 4 stablecoin issuers, and undisclosed amounts were frozen at CEXs in Q4 2023. These freezes validate that tracing → issuer/CEX notification → freeze is a working detection-to-response chain.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2020-2023 | 25+ connected hacks by Lazarus Group. $200M+ accumulated | **T7 laundering** |
| 2020-2023 | Funds routed through mixers, bridges, P2P marketplaces (Noones, Paxful), and CEXs | **T7 multi-stage pipeline** |
| 2023-11 | $374K USDT frozen | (asset recovery) |
| 2023-Q4 | $3.4M frozen by stablecoin issuers. Undisclosed amount frozen at CEXs | (asset recovery) |
| 2024-04-29 | ZachXBT publishes 15-month investigation | (public disclosure) |

## What defenders observed

- **P2P marketplaces are the fiat conversion detection gap.** Noones and Paxful — not major CEXs — were the final hop before fiat. P2P platforms have lighter KYC and fewer blockchain analytics integrations than Tier 1 exchanges, making them attractive for laundering. Funds that would trigger alerts at Binance or Coinbase pass through P2P platforms with less scrutiny.
- **Stablecoin issuers froze $3.4M across 3 of 4 issuers.** The one non-participating issuer is a detection gap — threat actors will route through the issuer that does not freeze. Uniform freeze cooperation across all major stablecoin issuers is a mitigation requirement.
- **Cross-chain tracing required for full pipeline visibility.** The 25+ hacks spanned multiple blockchains. Single-chain analysis could not reconstruct the full laundering pipeline. The investigation required multi-chain tracing across ETH, BSC, Polygon, and others.
- **Deterministic pipeline enables clustering.** The consistent laundering path allowed ZachXBT to cluster 25+ seemingly separate hacks into a single actor (Lazarus) — the laundering infrastructure IS the attribution signal.

## What this example tells contributors

- **P2P marketplaces are a T7 detection data source.** Noones, Paxful, LocalCoinSwap, and other P2P crypto-fiat marketplaces should be included in OAK detection data sources. The schema: `{p2p_platform, deposit_address, receiving_account, counterparty_fiat_account, trade_volume, trade_frequency}`.
- **Stablecoin issuer freeze coverage is a measurable metric.** 3 of 4 issuers froze funds — the 4th is a known gap. OAK detection specs can include "issuer freeze participation rate" as a metric. The gap between 3/4 and 4/4 is a detection surface that threat actors exploit.
- **Laundering pipeline = attribution fingerprint.** When 25+ hacks share the same laundering infrastructure (same mixers, same P2P platforms, same bridge routes), they are likely the same actor. The laundering path is as identifying as the exploit technique.

## Public references

- [ZachXBT — Lazarus Group $200M Laundering Investigation (X/Twitter)](https://x.com/zachxbt/status/1784935501935390930)
- P2P marketplaces identified: Noones, Paxful.
- $374K USDT frozen (Nov 2023). $3.4M frozen by stablecoin issuers (Q4 2023).
- 15-month investigation. 25+ connected hacks.
