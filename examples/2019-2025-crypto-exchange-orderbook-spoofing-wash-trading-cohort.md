# Crypto Exchange Orderbook Spoofing and Wash-Trading Cohort — 2019–2025

**Loss:** aggregate extraction is not quantified in the sources cited. Enforcement anchors are individual actions: a \$6.5M CFTC penalty against Coinbase over reporting and wash trading on GDAX (2021) `[coinbasecftc]`, and the October 2024 US DOJ "Operation Token Mirrors" charges against crypto market makers for wash trading `[tokenmirrors]`. Several entries previously listed here (BitMEX, Binance) were enforcement actions about other conduct and are no longer cited as spoofing or wash-trading cases.
**OAK Techniques observed:** **OAK-T17.003** (Spoofing / Cancel-Flood Order-Book Manipulation — the on-exchange spoofing pattern: large limit orders posted to display false depth, cancelled before execution, while economically-real trades execute on the opposite side.) **OAK-T17.001** (Cross-Venue Arbitrage-Driven Price-Discovery Distortion — when spoofing is paired with opposite-side execution on a different venue.) **OAK-T12.001** (NFT Wash-Trade Volume Inflation — structurally adjacent at the volume-inflation layer; the same volume-inflation primitive operating on fungible-token order books rather than NFT order books.) **OAK-T6.003** (Volume / Activity Fabrication — when wash trading is used to manufacture apparent exchange volume for ranking manipulation or token-listing qualification.)
**Attribution:** **unattributed** — enforcement actions name entities (Coinbase Inc.; the market makers Gotbit, ZM Quant, CLS Global and MyTrade) but the individual traders executing spoofing / wash-trading patterns are typically not named in regulatory settlements. Attribution is at the *venue-operator* layer (for exchange-level wash trading) or at the *pseudonymous-cluster* layer (for individual-trader spoofing).

**Key teaching point:** **Crypto exchange orderbook spoofing and wash trading extend the classic T17.003 pattern from traditional finance (CFTC vs Sarao 2015) to the crypto exchange ecosystem, but with a structurally distinctive feature: crypto exchanges have an *operator-side incentive* for volume inflation that does not exist in the same form at traditional exchanges.** A crypto exchange whose token-listing business, fee-tier structure, or exchange-token value depends on reported volume has a structural incentive to tolerate or encourage wash trading and spoofing that inflates volume metrics. This operator-side incentive dimension makes crypto-exchange T17.003 partially a *venue-level* rather than *trader-level* attack — the exchange itself may be the beneficiary of the manipulation, with the trader-cohort as the execution layer. This is structurally distinct from the traditional T17.003 setting (CME/CBOT equity futures) where the exchange operator has no volume-inflation incentive and actively enforces anti-spoofing surveillance.

**Corrected 2026-10-11:** BitMEX's \$100M 2021 settlement was for operating as an unregistered futures commission merchant and Bank Secrecy Act failures, and Binance's 2023 \$4.3B resolution was for AML, unlicensed money transmission and sanctions violations; neither is reported as a wash-trading case, so both were removed as anchors. The "Coinbase 2024 internal investigation" was replaced by the 2021 CFTC action, and the FTX row and "smaller exchanges" bullet were removed as unsupported.

## Summary

Crypto exchange orderbook manipulation operates across two structurally distinct but often overlapping patterns:

### Pattern 1: Trader-level spoofing (classic T17.003)

Individual traders or trading firms deploy spoof-and-cancel patterns on crypto exchanges to create false depth signals. The mechanism is identical to the CFTC vs Sarao 2015 pattern but executed on crypto-asset order books (BTC, ETH, alt-coin perpetuals):

1. Place large limit orders on one side to display false depth.
2. Market participants adjust positions based on the apparent depth.
3. Cancel the spoof orders before execution.
4. Execute economically-real trades on the opposite side at prices distorted by the spoof.

The crypto-specific dimension is that many crypto exchanges have less aggressive anti-spoofing surveillance than their traditional-finance counterparts, and the cross-venue dimension (spoof on one exchange, execute on another) is harder to detect at the per-venue level because neither venue sees the full cross-venue position.

### Pattern 2: Exchange-level wash trading (T17.003 + T6.003)

Crypto exchange operators or affiliated market makers execute wash trades — simultaneous buy and sell orders at the same price and quantity across accounts under common control — to inflate reported volume. The inflated volume serves exchange-operator objectives:

- **Token-listing qualification:** CoinMarketCap / CoinGecko ranking algorithms weight reported volume heavily; exchanges inflate volume to improve ranking and attract token-listing fees.
- **Exchange-token value:** Exchange tokens (BNB, FTT, CRO, etc.) derive part of their value proposition from exchange volume; volume inflation directly supports token price.
- **VIP-tier fee-discount qualification:** Volume-based fee tiers incentivise market makers to wash-trade to reach higher fee-discount tiers; the fee-discount arbitrage against wash-trading cost is positive at sufficient volume.
- **Regulatory-arbitrage appearance of liquidity:** Exchanges seeking institutional client onboarding inflate volume to demonstrate "deep liquidity" to institutional due-diligence processes.

Sourced enforcement and research anchors:

- **Bitwise to the SEC — March 2019:** Bitwise Asset Management told the SEC that about 95% of reported bitcoin trading volume on CoinMarketCap was fake or non-economic, based on order-book data from 81 exchanges `[bitwise]`.
- **Coinbase — CFTC — 2021:** Coinbase agreed to a \$6.5M penalty over inaccurate reporting and wash trading on its GDAX platform. The CFTC singled out two automated programs, Hedger and Replicator, that sometimes matched orders against each other (misreporting January 2015 to September 2018), and a former employee who placed buy and sell orders in Litecoin/Bitcoin, creating a misleading appearance of liquidity `[coinbasecftc]`.
- **Market makers — DOJ "Operation Token Mirrors" — October 2024:** ZM Quant, CLS Global and MyTrade were charged with wash trading the FBI-created token NexFundAI, and Gotbit, its CEO and two directors were charged with a similar scheme `[tokenmirrors]`.

The crypto T17.003 cohort is argued here to be structurally broader than the traditional-finance T17.003 anchor (CFTC vs Sarao) because the venue-operator incentive dimension creates a class of manipulation where the exchange itself is a beneficiary. In traditional finance, exchange operators enforce anti-spoofing surveillance because spoofing harms exchange integrity and the operator's business model depends on integrity. In crypto, the operator's business model may depend on volume metrics that spoofing and wash trading inflate — creating a structural incentive alignment problem that traditional exchanges do not have in the same form.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2019-03 | Bitwise tells the SEC ~95% of reported bitcoin volume is fake or non-economic | T6.003 (volume fabrication, research anchor) |
| 2021-03 | CFTC penalises Coinbase \$6.5M over reporting and wash trading on GDAX | T17.003 / T6.003 (enforcement anchor) |
| 2024-10 | DOJ charges Gotbit, ZM Quant, CLS Global, MyTrade (Operation Token Mirrors) | T6.003 (market-maker wash trading) |

## Public references

- `[bitwise]` — Cointelegraph Magazine, "Bitwise calls out to SEC: 95% of Bitcoin trade volume is fake" (2019): <https://cointelegraph.com/magazine/bitwise-calls-out-to-sec-95-of-bitcoin-trade-volume-is-fake-real-market-is-or>
- `[coinbasecftc]` — Investment Executive, "CFTC sanctions crypto exchange for trade reporting violations" (2021-03): <https://www.investmentexecutive.com/news/regulation/cftc-sanctions-crypto-exchange-for-trade-reporting-violations/>
- `[tokenmirrors]` — Decrypt, "Feds Charge Meme Coin 'Market Maker' Gotbit, Three Others With Crypto Market Manipulation" (2024-10): <https://decrypt.co/285503/feds-charge-gotbit-others-market-manipulation>
- See `techniques/T17.003-orderbook-spoofing-cancel-flood.md` for Technique definition

## Discussion

The crypto exchange T17.003 cohort extends the traditional-finance spoofing pattern to a setting where the exchange operator's incentive alignment is structurally different. The operator-side volume-inflation incentive creates a class of T17.003-plus-T6.003 manipulation where wash trading and spoofing are tolerated or encouraged because they inflate the volume metrics that the operator's business model depends on. This is a crypto-specific structural feature: traditional exchanges do not have exchange tokens, CoinMarketCap ranking dependency, or token-listing-fee businesses whose economics scale with reported volume.

The structural incentive exists for any exchange whose business model depends on volume metrics. The mitigation surface is at the regulatory-enforcement layer (DOJ/CFTC/SEC action), the market-data-aggregator layer (CoinMarketCap / CoinGecko volume-authentication improvements), and the on-chain-settlement-verification layer (comparing exchange-reported volume to on-chain-settleable volume as a manipulation indicator).
