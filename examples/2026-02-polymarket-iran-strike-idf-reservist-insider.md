# Polymarket Iran-strike timing market — operational-insider trading by IDF Air Force reservist — 2026-02

**Loss:** ~$162,663 in profits extracted by a two-person scheme on the timing of Israel's June 2025 opening strike against Iran (the first bet of an ongoing scheme that continued through additional Iran-conflict markets until arrest). The economically operative finding is the second confirmed criminal indictment of an operational-insider Polymarket bettor in distinct national jurisdictions, establishing the operational-insider sub-pattern as a multi-jurisdictional class rather than a single-case anomaly.
**OAK Techniques observed:** **OAK-T9.006.004** — Operational-Insider Trading on Subjective-Resolution Prediction Markets. Cohort case alongside the Van Dyke / Venezuela canonical anchor at [`examples/2026-01-polymarket-venezuela-maduro-soldier-insider.md`](2026-01-polymarket-venezuela-maduro-soldier-insider.md). Parent Technique: OAK-T9.006 (Subjective-Oracle Resolution Manipulation).
**Attribution:** **confirmed at the operator level** (Tel Aviv District Court indictment; Shin Bet, Defense Ministry investigative unit, and Israel Police arrested both defendants). Specific defendants are not publicly named at OAK v0.1 in deference to ongoing Israeli proceedings; case is documentable from indictment-stage public reporting.

## Summary

In June 2025, Israel launched its opening strike of the 12-day Israel–Iran war. The strike's timing was a closely-held operational secret circulated only inside Israeli military and intelligence channels.

According to charging documents filed in Tel Aviv District Court and reported by Israeli and international media in February 2026: an Israeli Air Force major serving as a reservist briefed his civilian co-defendant when Israeli warplanes were already en route to Iranian targets, and the civilian placed Polymarket bets on the timing of the opening strike. The bet resolved YES; the pair extracted approximately $162,663 in winnings, which they agreed to split evenly. The civilian opened a digital wallet for the reservist and transferred the reservist's share in cryptocurrency.

The pair continued to place Polymarket bets across additional Iran-conflict markets — including a winning bet on the **end-date of the 12-day war** — until their arrest in early 2026. Israeli prosecutors filed indictments charging both with severe security offences, bribery, and obstruction of justice, and sought to keep the defendants in custody until the conclusion of proceedings.

The IDF publicly characterised the case as serious but said no operational harm resulted, and stated that the conduct was inconsistent with IDF values.

## Why this case matters for OAK

This is the second jurisdiction in a four-month window (Israel February 2026; United States April 2026) to file criminal charges against operationally-involved bettors using subjective-resolution prediction markets to monetise classified knowledge of military operations. The pair-of-cases establishes the operational-insider sub-pattern as a **structural recurrence** rather than a single-case anomaly:

- Two distinct national jurisdictions (US, IL).
- Two distinct military events (Maduro capture, January 2026; Israel-Iran opening strike, June 2025).
- Two distinct classes of operationally-involved insider (US Special Forces NCO directly involved in operation; Israeli Air Force major reservist with classified briefing access).
- The same on-chain venue (Polymarket).
- The same betting structure (YES on a specific outcome in a narrow time window before public disclosure).
- Detection through a combination of on-chain forensics + KYC at the off-ramp + counter-intelligence on the operational-actor side.

The Israeli case differs from the Van Dyke case in one structurally important way: **the briefing was passed laterally to a civilian co-conspirator** who placed the actual bets. This decouples the on-chain wallet identity from the cleared-personnel identity and demonstrates that purely on-chain detection (account-age, deposit-time, bet-cluster) does not by itself identify the operational insider — the linkage runs through human intelligence on the briefing chain. The forensic challenge is structurally harder than the Van Dyke case for this reason.

## What defenders observed

- **Pre-event:** the civilian co-defendant's account profile would not, on its own, have raised an obvious operational-insider flag — he was not a cleared person; his accounts were pre-existing or normal-aged. The signal was the **timing alignment** of multiple bets across Iran-conflict markets with a 93-94%-class win rate (consistent with the broader cohort flagged by Bubblemaps in early 2026 and the Anti-Corruption Data Collective's spring 2026 report finding 51.8% longshot win rates in military / defense markets vs. 14% baseline).
- **At-event:** the strike timing itself, when correlated with bet-placement timestamps reconstructed by Israeli investigators, established the operational-knowledge linkage. Israeli prosecutors traced the cryptocurrency transfer pattern (civilian → wallet opened on behalf of reservist) which ties the Polymarket account to the cleared individual.
- **Post-event:** Shin Bet (Israel Security Agency), the Defense Ministry's investigative unit, and Israel Police executed a joint operation to arrest both defendants. Indictment was filed in Tel Aviv District Court. The IDF characterised the conduct as "grave" but said no operational harm resulted.

## Detection signals (cohort across Van Dyke + IDF reservist cases)

The two confirmed cases together establish the following signal hierarchy for the operational-insider sub-pattern:

1. **Multi-bet pattern across functionally-correlated markets on a single underlying event** — present in both cases (Van Dyke held YES across four Venezuela markets; the IDF pair bet on opening-strike-timing and end-of-war markets).
2. **Win-rate against published longshot baselines** — military / defense markets show 51.8% longshot win rates (ACDC) vs. 14% across all Polymarket categories. Account-level deviation against this baseline is a high-precision flag.
3. **Off-ramp KYC linkage** — Van Dyke's profits were routed through a brokerage account; the IDF reservist's share moved through a civilian-opened wallet. Both cases relied on KYC reconciliation at the fiat off-ramp.
4. **Behavioural-asymmetry signature** — operational insiders withdraw faster post-resolution and bet more conservatively pre-event than confidence-driven whales (the Théo / Fredi9999 contrarian pattern at the 2024 election is the structural counter-class — that whale held large positions for weeks against the polling consensus, with no operational stake in the underlying election).
5. **Off-chain corroboration is load-bearing** — purely on-chain detection identifies the position; identifying the operational insider requires either KYC reconciliation, counter-intelligence on the briefing chain, or platform-side cooperation with regulators.

## Mitigation surface

The Israeli case strengthens (not weakens) the mitigation argument in `examples/2026-01-polymarket-venezuela-maduro-soldier-insider.md`:

- **KYC at threshold and identity-cluster forensics** — necessary but not sufficient. The IDF case shows that briefing chains can decouple bet identity from operational identity; KYC alone does not solve the lateral-pass case.
- **Counter-intelligence integration** — defense and intelligence ministries with cleared personnel placing bets on adversary-action markets need an internal-monitoring process that includes lateral disclosure-chain monitoring, not just direct-bet monitoring.
- **Market-design constraints on operationally-correlated markets** — markets resolving on classified-event timing (military strikes, special-operations actions, classified diplomatic events) face an unsolved adverse-selection problem: by definition, the only participants with information are the participants the market most needs to exclude. The strongest defense is platform-side de-listing of these markets, which is what some legislative proposals (BETS OFF Act in the US) contemplate.
- **Detection-tooling deployment** — Polymarket's April 2026 Chainalysis partnership is the platform-side response. Effectiveness depends on real-time flag-and-freeze rather than retrospective analytics.

## What this example tells contributors

Contributors writing OAK-T9.006.004 should treat the Van Dyke and IDF reservist cases as the **two-jurisdiction structural anchor** for the operational-insider sub-pattern. The pattern is now multi-jurisdictionally documented; future cases are likely to continue surfacing as KYC-cluster forensics become standard.

The unresolved tension is whether subjective-resolution markets on classified-event timing should exist at all. The market-design literature treats this as an adverse-selection problem with no clean solution: the participants the market most needs to attract for honest price discovery (informed bettors) are categorically the participants the market most needs to exclude (operational insiders). The best documented defense is venue-level prohibition on the underlying market class.

## Public references

- [Times of Israel — Israeli Air Force major charged with using classified info to place bets on Polymarket](https://www.timesofisrael.com/israeli-air-force-major-charged-with-using-classified-info-to-place-bets-on-polymarket/) — primary case reporting.
- [Times of Israel — Two indicted for using classified info to place online bets on military operations](https://www.timesofisrael.com/two-indicted-for-using-classified-info-to-place-online-bets-on-military-operations/) — indictment-stage reporting.
- [NPR — Israel accuses two of using military secrets to place Polymarket bets](https://www.npr.org/2026/02/12/nx-s1-5712801/polymarket-bets-traders-israel-military) — primary US coverage.
- [Decrypt — Israelis Arrested Over Alleged Insider Polymarket Trades on IDF Military Secrets](https://decrypt.co/357892/israelis-arrested-alleged-insider-polymarket-trades-idf-military-secrets) — case context.
- [Jerusalem Post — Israel indicts reservist, civilian for using classified information to bet on IDF military action](https://www.jpost.com/israel-news/crime-in-israel/article-886456) — local detail on Tel Aviv District Court filing.
- [JNS — After secret briefing, IAF reservist allegedly told friend to bet on preemptive Iran strike](https://www.jns.org/news/israel-news/after-secret-briefing-iaf-reservist-allegedly-told-friend-to-bet-on-preemptive-iran-strike) — briefing-chain detail.
- [intelNews — Israelis with high-level clearances betted on military operations on Polymarket](https://intelnews.org/2026/02/23/01-3428/) — counter-intelligence framing.
