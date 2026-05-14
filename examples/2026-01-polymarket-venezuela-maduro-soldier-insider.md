# Polymarket Venezuela / Maduro-capture market — operational-insider trading by US Special Forces NCO — 2026-01

**Loss:** ~$33,000 wagered → ~$404,000-$410,000 in profits extracted by a single bettor with classified-information access to (and operational involvement in) the underlying real-world military operation. The economically operative finding is not the dollar size — it is the first DOJ-charged criminal case anchoring the **operational-insider** sub-pattern of subjective-resolution prediction-market abuse.
**OAK Techniques observed:** **OAK-T9.006.004** — Operational-Insider Trading on Subjective-Resolution Prediction Markets. The canonical worked-example anchor for the sub-Technique. Parent Technique: OAK-T9.006 (Subjective-Oracle Resolution Manipulation).
**Attribution:** **confirmed at the operator level** (DOJ indictment, SDNY; defendant named, charges filed, parallel CFTC civil action). Specific Polymarket account → real-world identity attribution rests on government affidavits, KYC at the off-ramp (Kraken / brokerage), and on-chain forensics cited by prosecutors.

## Timeline (UTC unless noted)

| When | Event | OAK ref |
|---|---|---|
| 2025-12-26 | US Army Special Forces master sergeant Gannon Ken Van Dyke, operationally involved in planning and execution of Operation Absolute Resolve, opens a Polymarket account | T9.006.004 (operational-insider account creation — account-age-vs-first-bet signal) |
| 2025-12-27 → 2026-01-02 | Van Dyke places ~13 bets totaling ~$33,034 on YES sides of Venezuela / Maduro markets (including "Maduro Out by January 31" — 436,000+ YES shares acquired December 30–January 2) | T9.006.004 (operational-insider trading — bettor is a causal actor producing the real-world outcome) |
| 2026-01-03 | US forces execute Operation Absolute Resolve; Maduro and Cilia Flores apprehended in Caracas | (real-world event — underlying outcome that bets depended on) |
| 2026-01-03 → 2026-01-04 | Bets resolve YES; Van Dyke generates ~$404,000 in profit | T9.006.004 (operational-insider profit realization — bets settled on classified-foreknowledge outcome) |
| 2026-01-04 onward | Van Dyke withdraws majority of proceeds from Polymarket account; routes funds through foreign cryptocurrency vault; deposits into newly-created online brokerage account | T7.001 (laundering — proceeds routing through foreign vault + brokerage account) |
| 2026-04 | DOJ SDNY indictment unsealed: wire fraud, commodities fraud, theft of nonpublic government information, engaging in monetary transactions in property derived from specified unlawful activity; CFTC parallel civil action filed | T9.006.004 (federal indictment — first publicly documented operational-insider prosecution in crypto-prediction-market history) |
| 2026-04-28 | Van Dyke pleads not guilty at arraignment in SDNY; faces up to 20 years on wire-fraud count | (legal proceedings — active litigation at OAK v0.1 cutoff) |
| 2026-04 | Kalshi confirms it had blocked the same individual on its venue; Polymarket / Chainalysis surveillance partnership operationalized in April 2026 | (cross-venue blocklist coordination — detection infrastructure established) |

**Key teaching point:** **The Van Dyke case (DOJ SDNY, April 2026) is the first publicly documented case in crypto-prediction-market history where a bettor with direct operational involvement in the underlying real-world event has been criminally charged for trading on classified knowledge of that event.** The bettor was not just informed about the outcome — he was one of the causal actors producing it (US Special Forces NCO involved in planning and executing Operation Absolute Resolve). This crosses from classical insider trading (informational asymmetry) into a class structurally adjacent to market-manipulation-via-action: the bettor's operational decisions directly determine which resolution outcome triggers his payout. The case establishes T9.006.004 as a first-class Technique sub-pattern anchored in a federal indictment.

## Summary

In the predawn hours of January 3, 2026, US forces apprehended Venezuelan president Nicolás Maduro and his wife Cilia Flores at a residence in Caracas in a joint military / law-enforcement mission designated **Operation Absolute Resolve**. Hours later, the President of the United States announced the operation publicly.

Between December 27, 2025 and January 2, 2026 — the week leading up to the operation — US Army Special Forces master sergeant **Gannon Ken Van Dyke**, an active-duty soldier assigned to a unit supporting Joint Special Operations Command and operationally involved in the planning and execution of Operation Absolute Resolve, opened a Polymarket account (December 26, 2025) and placed approximately 13 bets totalling ~$33,034 on the YES side of contracts including:

- "U.S. Forces in Venezuela by January 31, 2026"
- "Maduro out by January 31, 2026"
- "Will the U.S. invade Venezuela by January 31"
- "Trump invokes War Powers against Venezuela by January 31"

The CFTC complaint specifies that Van Dyke acquired more than 436,000 YES shares in "Maduro Out by January 31, 2026?" between December 30, 2025 and January 2, 2026. The bets resolved YES on January 3-4, 2026, generating ~$404,000 in profit. On the day of the operation, Van Dyke withdrew the majority of the proceeds from his Polymarket account, routed funds through a foreign cryptocurrency vault, and deposited them into a newly-created online brokerage account.

Van Dyke was arrested in April 2026 and charged in the Southern District of New York with: unlawful use of confidential government information for personal gain; theft of nonpublic government information; commodities fraud; wire fraud; and engaging in a monetary transaction in property derived from specified unlawful activity. He faces up to 20 years on the wire-fraud count. He pleaded not guilty at arraignment on April 28, 2026. The CFTC filed a parallel civil enforcement action in federal court.

This is the **first publicly documented case in crypto-prediction-market history** in which a bettor with direct operational involvement in the underlying real-world event has been criminally charged for trading on classified knowledge of that event.

## Why this incident is structurally novel

The bettor is not just *informed* about the outcome — he is one of the **causal actors producing it**. This crosses from classical insider trading (informational asymmetry) into a class structurally adjacent to market-manipulation-via-action: the bettor's operational decisions on the world (when the raid is launched, on what date, with what force composition) directly determine which resolution outcome triggers his payout.

This is distinct from the three T9.006 sub-patterns documented at v0.1:

- **T9.006.001 (DVM vote capture)** — attacks the oracle layer; resolution input is honest, the vote is corrupted.
- **T9.006.002 (resolution-spec ambiguity)** — attacks the spec layer; the natural-language claim is interpretively underdetermined.
- **T9.006.003 (off-chain resolution-source coercion)** — attacks the resolution-input layer; pressures a third-party reporter post hoc.

The Van Dyke case attacks a **fourth layer**: the **information-symmetry assumption** between bettors. Subjective-resolution prediction markets only price honestly when the marginal participant has roughly comparable information about the real-world event. When one participant *is* a real-world actor producing the event, the market's price-discovery property collapses: the insider's bet is not a forecast, it is a settlement instruction with delay.

The on-chain settlement substrate makes this attack class qualitatively different from traditional insider trading (e.g., NYSE-listed-equity insider trading under Section 10(b)/Rule 10b-5):

1. **Position and timing are publicly inspectable.** Van Dyke's wallet, deposit timestamp, share-acquisition ladder, and withdrawal pattern are all on-chain and were forensically reconstructed by prosecutors. Traditional insider-trading detection relies on broker subpoenas and trading-record reconciliation; on-chain prediction markets give the regulator the trade record by default.
2. **Wallet-attribution is the load-bearing forensic step.** Real-world identification depends on KYC at the off-ramp (Kraken/brokerage account in this case) plus account-creation metadata. The on-chain data alone does not name the operator; it names the position.
3. **Geofencing is partial.** Polymarket nominally bars US persons; the participation pattern (US-based active-duty soldier creating an account on December 26, 2025) demonstrates that VPN-and-self-attestation geofencing does not survive a determined participant who has every motivation to conceal jurisdiction.
4. **The market itself surfaces the anomaly.** Sharp longshot wins by newly-created accounts in narrow time windows are detectable signatures; the public record now contains explicit baseline rates (ACDC: longshots win 14% baseline, 51.8% in military / defense markets) that establish what counts as an anomaly.

## What defenders observed

- **Pre-event:** Van Dyke's account was created December 26, 2025 — one day before his first bet, days after the operational decision-cycle for the January 3 raid would have entered final planning. Account-age-vs-first-bet correlation, especially on markets gated by classified events, is a detection signal Polymarket and Chainalysis subsequently operationalised in the April 2026 surveillance partnership.
- **At-event:** the YES probability on the relevant Venezuela markets surged in the resolution window after the operation; Van Dyke's withdrawal happened the same day, before public Polymarket-side scrutiny ramped up. Concentration of profits in newly-created accounts on a narrow cohort of correlated markets is the dominant on-chain signature.
- **Post-event:** the investigation was driven by a combination of public on-chain forensics (Bubblemaps, Sonar Pro, NPR-cited analytics firms initially flagged the ~$400K profit cluster as anomalous in early January 2026), federal subpoenas to Polymarket and Kraken for KYC linkage, and Defense-side records (Van Dyke's role in Operation Absolute Resolve was matched to bet timing). The Manhattan US Attorney's Office unsealed the indictment in April 2026; the CFTC filed a parallel civil action; Kalshi publicly stated it had blocked the same individual from trading on its venue.

## Detection signals (operational-insider sub-pattern)

These are the signals OAK should encode against the operational-insider class:

1. **Account-creation-time vs. event-window proximity** — fresh accounts (≤ 30 days old) entering high-volume war / strike / political-action markets within the operational-decision-cycle window of the underlying event.
2. **Position concentration on a narrow cohort of correlated markets** — Van Dyke held YES across four functionally-correlated markets (US forces in Venezuela / Maduro out / US invades / War Powers), all resolving on the same underlying event with different surface phrasings.
3. **Same-day or adjacent-day withdrawal post-resolution** — the speed of off-ramp execution distinguishes operationally-motivated insiders from confidence-driven whales (who tend to leave proceeds on platform).
4. **KYC-cluster linkage at the off-ramp** — multiple Polymarket accounts forwarding to the same Kraken / Coinbase / brokerage KYC identity, especially across event-correlated markets.
5. **Off-chain corroboration** — the bettor's operational role in the underlying event becomes investigable once an on-chain wallet → KYC → real-world-identity chain is established.

## Mitigation surface

- **KYC at threshold for high-stakes markets** — Kalshi's CFTC-regulated regime applies KYC by default; Polymarket's nominally-non-US user base has historically used self-certification + IP geofencing, which collapses against motivated insiders. ACDC's recommendation (force government-ID collection) is the structural fix.
- **Pre-event position-disclosure norms for officials** — analogous to Securities Act §16(a) for corporate insiders, but for federal officials with classified-information access betting on event markets. The BETS OFF Act (cited in ACDC's recommendations) would prohibit wagers on war and government actions outright; an alternative is mandatory disclosure for cleared personnel.
- **Real-time on-chain surveillance of bet-timing vs. event-timing correlations** — Polymarket's April 2026 Chainalysis partnership institutionalises this. Detection is real-time; deterrence requires the ability to ban accounts and refer cases to regulators.
- **Geofencing strengthening** — VPN-detection plus device-fingerprinting plus payment-rail KYC, applied compositely. Single-vector geofencing (just IP) is provably defeated by VPNs.

## What this example tells contributors

Contributors writing v0.x OAK-T9.006.004 should treat the Van Dyke case as the **structural reference for the operational-insider sub-pattern**: the bettor is causally involved in producing the outcome. Subsequent cases of this class (Israeli Air Force reservist insider, Iran-strike timing, possibly future US-government-action markets) belong to the same sub-Technique.

The structural property to encode is: **subjective-resolution prediction markets create economic bounties for specific real-world outcomes; participants who control or influence those outcomes face an incentive structure no traditional insider-trading regime fully addresses, because the resolution input is the world itself, not a corporate-disclosure event.**

## Public references

- [DOJ — U.S. Soldier Charged With Using Classified Information To Profit From Prediction Market Bets](https://www.justice.gov/opa/pr/us-soldier-charged-using-classified-information-profit-prediction-market-bets) — primary indictment announcement (SDNY).
- [Time — U.S. Soldier Involved in Maduro Capture Arrested and Charged With Insider Trading on Polymarket](https://time.com/article/2026/04/24/soldier-charged-insider-trading-polymarket-van-dyke-maduro-capture-trump/) — primary investigative reporting.
- [CNBC — U.S. soldier arrested for Polymarket bets on Maduro capture, DOJ says](https://www.cnbc.com/2026/04/23/doj-soldier-polymarket-bets-venezuela-maduro.html) — case details and trade ladder.
- [CNBC — Special Forces Sgt. in Polymarket Maduro raid bet case released; Kalshi says it blocked him](https://www.cnbc.com/2026/04/24/special-forces-van-dyke-polymarket-bets-maduro-raid-kalshi.html) — Kalshi's parallel block disclosure.
- [Al Jazeera — US soldier charged with using Polymarket to bet on Nicolas Maduro abduction](https://www.aljazeera.com/economy/2026/4/23/us-soldier-charged-with-using-polymarket-to-bet-on-nicolas-maduro-abduction) — international coverage.
- [PBS NewsHour — Soldier's arrest over Polymarket bet on Maduro raid fuels insider trading concerns](https://www.pbs.org/newshour/show/soldiers-arrest-over-polymarket-bet-on-maduro-raid-fuels-insider-trading-concerns) — context on broader cohort.
- [NPR — A $400,000 profit on Maduro's capture raises insider trading questions on Polymarket](https://www.npr.org/2026/01/05/nx-s1-5667232/polymarket-maduro-bet-insider-trading) — pre-indictment on-chain forensics.
- [Futurism — The Venezuela Polymarket Scandal Is Looking Really Bad](https://futurism.com/future-society/polymarket-venezuela-insider-trading) — secondary analysis.
- [Yahoo Finance / Sonar Pro — Polymarket Trader Who Bagged Massive Profit From US-Venezuela Bets Could Be Geopolitical Insider](https://finance.yahoo.com/news/polymarket-trader-bagged-massive-profit-033105716.html) — early forensic flag.
- [Newsweek — Who Is Gannon Ken Van Dyke? Soldier Pleads Not Guilty to Maduro Polymarket Bet Scheme](https://www.newsweek.com/who-is-gannon-ken-van-dyke-soldier-pleads-not-guilty-to-maduro-bet-scheme-11890100) — defendant background.
