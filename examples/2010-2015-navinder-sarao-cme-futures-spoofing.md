# Navinder Sarao CME futures spoofing — CME Globex (equity futures) — 2010–2015

**Loss:** structural — Sarao's spoofing activity was cited as a contributing factor to the May 6, 2010 "Flash Crash," during which the Dow Jones Industrial Average dropped approximately 1,000 points (approximately \$1 trillion notional) intraday before recovering. The dollar-loss attribution to T17.003 specifically is at the contributing-factor layer rather than at a discrete-extraction-event layer, consistent with the traditional-finance order-book-spoofing enforcement record where spoofing is a market-microstructure manipulation class rather than a discrete theft.

**OAK Techniques observed:** **OAK-T17.003** (Spoofing / Cancel-Flood Order-Book Manipulation) — primary; the load-bearing manipulation primitive was layering and one-sided spoofing: Sarao posted large limit orders on CME E-mini S&P 500 futures contracts without intent to fill, then cancelled the orders before they would execute, manufacturing an apparent demand or supply signal that influenced other market participants' trading decisions. The economically-real trades were on the opposite side of the spoof orders. The spoof-and-cancel pattern (post large orders, cancel before fill, trade on the opposite side) is the canonical T17.003 *one-sided spoof* sub-shape, applied at the equity-futures CME order-book layer rather than at a crypto-DEX order-book layer.

**Attribution:** **confirmed (regulatory enforcement — named individual).** Navinder Singh Sarao was arrested in the UK in April 2015 on U.S. charges including wire fraud, commodities fraud, and spoofing. He was extradited to the United States in 2016, pleaded guilty to one count of wire fraud and one count of spoofing, and was sentenced in January 2020 to time served (having spent approximately four months in custody). The CFTC and DOJ enforcement actions against Sarao are the canonical regulatory-attribution anchors for spoofing as a market-manipulation class.

**Key teaching point:** **The Navinder Sarao case is the canonical non-crypto T17.003 anchor — it establishes that spoofing (posting orders without intent to fill, cancelling before execution, profiting from the opposite side) is a well-characterised market-manipulation class with a mature regulatory enforcement record, predating crypto order-book DEXes by over a decade.** The Sarao case demonstrates that T17.003 is not a crypto-novel class — it is a traditional-market-microstructure class that has migrated onto crypto-DEX order books as those venues have matured. The enforcement record (CFTC/DOJ prosecution, guilty plea, sentencing) establishes the legal and regulatory precedent that crypto-venue spoofing cases will eventually inherit.

## Summary

Navinder Singh Sarao was a UK-based futures trader who operated from his parents' home in Hounslow, London. Between approximately 2010 and 2015, Sarao engaged in a systematic spoofing scheme on the CME Globex electronic trading platform, primarily targeting E-mini S&P 500 futures contracts.

The scheme's mechanics were the canonical T17.003 one-sided spoof pattern:

1. **Layering.** Sarao's custom trading software (which he developed himself) posted multiple large limit orders at different price levels on one side of the order book — typically large sell orders layered above the current market price. The orders displayed apparent supply that did not represent genuine intent to trade.
2. **Market impact.** Other market participants, observing the apparent supply on the order book, adjusted their own trading — typically by lowering their bids or selling at lower prices, on the assumption that genuine selling pressure was present.
3. **Cancel before fill.** Sarao's software cancelled the spoof orders before they would have been executed — typically within milliseconds of a fill becoming likely. The cancellation was automated and systematic; Sarao's cancellation rate approached 100% for the spoof orders.
4. **Opposite-side profit.** Sarao's economically-real trades were on the opposite side of the spoof orders — he bought when his spoof sells depressed prices (capturing the lower price his own spoofing created), and he sold when his spoof buys elevated prices. The spoof orders were never intended to fill; their purpose was to influence the price at which the economically-real trades executed.

The CFTC's enforcement action documented that on many trading days, Sarao's spoof orders constituted 20-30% of the total order-book depth in the E-mini S&P 500 futures market, and that Sarao earned approximately \$40 million in profits from his trading activity during the relevant period (though the precise proportion attributable to spoofing vs. legitimate trading is not publicly disaggregated).

The case became prominent when the CFTC and DOJ cited Sarao's spoofing activity as a contributing factor to the May 6, 2010 "Flash Crash" — a market event during which the Dow Jones Industrial Average dropped approximately 1,000 points intraday before largely recovering. The DOJ's criminal complaint alleged that Sarao's spoofing activity on that day contributed to the order-book imbalance that precipitated the crash, though the academic and regulatory consensus attributes the Flash Crash to multiple contributing factors, of which Sarao's spoofing was one.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2009–2010 | Sarao develops custom trading software with automated spoof-and-cancel functionality; begins trading E-mini S&P 500 futures on CME Globex | T17.003 surface active |
| 2010-05-06 | "Flash Crash" — DJIA drops ~1,000 points intraday; Sarao's spoofing activity on E-mini S&P 500 futures cited as a contributing factor by the DOJ in its 2015 criminal complaint | T17.003 (contributing factor) |
| 2010–2014 | Sarao continues systematic spoofing activity; CFTC and CME surveillance systems flag anomalous order patterns but initial investigation does not result in immediate enforcement | T17.003 surface ongoing |
| 2015-04 | Sarao arrested in the UK on U.S. charges; CFTC files civil enforcement action; DOJ files criminal charges including wire fraud, commodities fraud, and spoofing | **confirmed attribution** |
| 2016 | Sarao extradited to the United States | (legal process) |
| 2016-11 | Sarao pleads guilty to one count of wire fraud and one count of spoofing | **confirmed (guilty plea)** |
| 2020-01 | Sarao sentenced to time served (~4 months in custody); ordered to forfeit approximately \$12.8M in ill-gotten gains | (sentencing) |

## What defenders observed

- **The spoof-and-cancel pattern was detectable at the per-order lifecycle layer.** CME's surveillance systems (and the CFTC's subsequent forensic analysis) identified the spoofing pattern from the per-order event stream: large limit orders posted, cancelled before fill at rates approaching 100%, with economically-real trades executed on the opposite side from different accounts (or the same account in Sarao's case — the one-sided economic exposure was detectable from the single-account trading record). The detection surface was at the venue-side matching-engine layer where the per-order lifecycle data was preserved.

- **The automated nature of the spoofing was the distinguishing signal from honest market-making.** Honest market-makers cancel orders at high rates (90%+ is typical) because they continuously update quotes as market conditions change. The Sarao spoofing was distinguished by: (a) the systematic one-sided economic exposure (executed trades consistently opposite the spoof direction), (b) the non-market-making intent evidenced by the custom software's automated spoof-and-cancel logic, and (c) the market impact of the spoof orders (constituting 20-30% of order-book depth, a share inconsistent with legitimate market-making at that scale from a single trader).

- **The regulatory enforcement record establishes the legal precedent for crypto-venue spoofing cases.** The Sarao prosecution under wire fraud, commodities fraud, and the anti-spoofing provisions of the Commodity Exchange Act establishes that spoofing is a criminal offence, not merely a civil violation. The CFTC's enforcement framework (which continues to bring spoofing cases against traditional-finance and, increasingly, crypto-market participants) inherits the precedent set by the Sarao case. Crypto-venue spoofing cases (including the Hyperliquid POPCAT November 2025 case at `examples/2025-11-hyperliquid-popcat-spoof-and-pull.md`) operate against the same legal framework, even though venue-side enforcement is less mature in the crypto context.

- **The Flash Crash citation establishes the systemic-risk dimension of spoofing.** The CFTC/DOJ allegation that Sarao's spoofing contributed to the May 2010 Flash Crash demonstrates that spoofing is not merely a counterparty-level extraction primitive — it is a market-microstructure manipulation class that can, at scale, contribute to systemic market events. The systemic-risk dimension is the reason spoofing is treated as a criminal offence (market manipulation) rather than a civil dispute (counterparty fraud).

## What this example tells contributors writing future Technique pages

- **T17.003 is anchored in traditional-finance enforcement record before crypto.** The Sarao case demonstrates that the Technique class predates crypto order-book DEXes by over a decade. The crypto-DEX T17.003 surface (Hyperliquid POPCAT November 2025, and cohort-level reports on dYdX, GMX, Drift) is a *migration* of a well-characterised traditional-finance market-manipulation class onto a new venue type, not a crypto-novel discovery. The crypto-venue enforcement record lags the traditional-finance enforcement record; the Sarao case establishes the enforcement baseline that crypto-venue spoofing cases will eventually match.

- **The per-order lifecycle data is the load-bearing forensic signal.** In both the Sarao case (CME Globex matching-engine records) and the Hyperliquid POPCAT case (Hyperliquid sequencer layer), the spoof-and-cancel pattern was reconstructed from the per-order event stream — not from the executed-trade record, which by construction does not contain cancelled orders. T17.003 detection lives at the venue-side per-order lifecycle layer; on-chain analytics that only observe executed trades cannot detect spoofing. Future contributors writing T17.003 cases should document the venue's per-order data availability as the load-bearing detection prerequisite.

- **One-sided economic exposure is the distinguishing signal from honest market-making.** High cancellation rates are not T17.003 signals in isolation (honest market-makers cancel at 90%+), but high cancellation rates combined with systematic one-sided economic exposure — executed trades consistently opposite the spoof direction — is the structural T17.003 signal. The Sarao case is the canonical demonstration of this signal: his spoof orders were consistently on one side (typically sells) and his executed trades were consistently on the opposite side (typically buys).

- **The class is structurally cross-asset and cross-venue.** The Sarao case (CME equity futures, 2010–2015) and the Hyperliquid POPCAT case (crypto perp DEX, 2025) share identical manipulation primitives despite different asset classes, venue types, and a 10-year temporal gap. The cross-asset, cross-venue invariance of the T17.003 primitive establishes that the class is a market-microstructure property, not a venue-specific or asset-specific property.

## Public references

- CFTC enforcement action against Navinder Sarao (2015): civil complaint, settlement, and penalty documentation.
- DOJ criminal complaint and indictment against Navinder Sarao (2015): wire fraud and spoofing charges.
- Sarao guilty plea (November 2016) and sentencing (January 2020): time served, \$12.8M forfeiture.
- CFTC and SEC joint report on the May 6, 2010 Flash Crash (September 2010): market-microstructure analysis including the role of aggressive order-book activity.
- Academic literature on spoofing as a market-manipulation class: see `[zhou2023sok]` for the academic taxonomy.

## Discussion

The Navinder Sarao case is OAK's canonical non-crypto T17.003 anchor. It establishes that spoofing — the systematic posting and cancellation of limit orders without intent to fill, to influence price discovery that the attacker captures on the opposite side — is a well-characterised market-manipulation class with a mature regulatory enforcement record predating crypto order-book DEXes by over a decade.

The cross-domain lesson-propagation observation is structurally significant: the Sarao precedent was publicly adjudicated (regulatory enforcement, criminal guilty plea, sentencing) and discussed at the regulator, academic, and market-microstructure practitioner layers for over a decade before the same Technique class manifested at extraction-scale on Hyperliquid in November 2025. The lesson did not propagate into venue-side order-book spoof-detection at the Hyperliquid sequencer layer — the spoof-and-cancel pattern was reconstructed post-event from public order-book data, not caught by a real-time spoof-detection monitor. This is a **multi-decade cross-asset-class propagation gap**: the detection technology (per-order lifecycle analysis for spoof-and-cancel patterns) is well-known and deployed at traditional-finance venues (CME, NYSE, NASDAQ all operate spoof-detection at the matching-engine layer); the gap is in deployment at crypto order-book DEXes that are operationally young and have not yet integrated the traditional-finance market-surveillance toolchain.

The structural lesson for crypto venue operators is: **deploy per-order lifecycle spoof-detection at the matching-engine/sequencer layer before TVL reaches extraction-attractive scale.** The Sarao case demonstrates that the detection technology exists, the CFTC enforcement framework applies, and the attacker economic incentive (profit from opposite-side exposure exceeding the cost of the spoof leg) is satisfied. The gap is in operational deployment, not in detection-technology availability.

For OAK's broader coverage, the Sarao case provides T17.003 with the temporal-depth and regulatory-enforcement dimensions that the Hyperliquid POPCAT November 2025 case provides at the crypto-venue dollar-extraction layer. The two cases together establish T17.003 as a cross-domain, cross-asset, cross-venue market-manipulation class whose detection surface lives at the per-order lifecycle layer regardless of venue type.
