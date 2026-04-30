# OAK-S18 — Pump.fun-style Bundlers

**Type:** tool / mev-bot (class)
**Aliases:** Pump.fun bundlers, launch bundlers, dev-snipe bundlers, Jito bundlers (in this context)
**Active:** yes (2023-present; continuous activity tracking the lifecycle of Pump.fun and similar Solana token-launch venues)
**First observed:** 2023-Q4 (emergence alongside Pump.fun's launch and rapid growth in late 2023 / early 2024)
**Used by Groups:** ecosystem-wide / not Group-specific (a class of tooling, not a single artefact; widely deployed by independent operators and turn-key MaaS-style services)
**Host platforms:** Solana (primary); equivalent classes have emerged on other chains' token-launch venues
**Observed Techniques:** OAK-T3.001 (initial-liquidity / launch manipulation), OAK-T2.001 (pre-disclosure positioning / launch-time concentration), OAK-T13.002 (bundler / privileged-ordering abuse on Solana via Jito or equivalent private-bundle infrastructure)

## Description

Pump.fun-style bundlers are a class of token-launch sniping and bundling bots specific to Solana's Pump.fun and structurally-similar token-launch venues. The defining behaviour is that the bot **bundles the dev / creator launch transaction together with one or more sniper transactions into the same Jito (or equivalent) private bundle**, ensuring atomic same-block execution of (a) the launch / liquidity-add and (b) operator-controlled sniper buys. The result is that the operator captures a large fraction of early-token supply at the launch price before any external participant can transact, then exits into the resulting price impulse driven by retail / public buyers.

This is not a single artefact but a class of tooling. Multiple competing implementations circulate as both open-source GitHub projects and turn-key paid services advertised in Solana-trading Telegram and Discord communities. Common features across implementations include: bundle construction with the launch tx as the anchor, configurable per-wallet allocation of sniper buys across many operator-controlled wallets (to disguise concentration as broad early demand), automated sell-out logic on price-impulse triggers, and integration with Jito's block-building infrastructure to obtain bundle inclusion. On other chains, equivalent classes have emerged for analogous launch venues (e.g. on BNB Chain Four.meme, on Base Virtuals / similar, with their own bundler ecosystems).

OAK records this class as ecosystem-wide because the artefacts are commodity tooling, the operators are a long tail of independent traders / scammers / coordinated launch-rug operators, and per-incident attribution is to the launch operator (who is often the same entity controlling the bundler wallets) rather than to a specific bundler implementation. The class straddles the OAK Tactic boundary between **launch / initial-liquidity manipulation** (T3 / T2 surfaces) and **privileged-ordering MEV** (T13.002), which is why three Technique pointers apply.

## Observed examples

- **Pump.fun launch-bundling cohort, 2024–2025** — public Solana analytics (Solscan tagging, third-party launch-analytics dashboards) routinely flag tokens whose first-block buys come from a cluster of wallets funded from a common source within minutes of launch. The bundler-cluster shape is the dominant Pump.fun launch-rug indicator and has been the subject of repeated cohort studies by Solana-focused analytics vendors throughout 2024.
- **Jito bundle-share concentration** — periods during 2024 when Jito-bundle inclusion rates for Pump.fun-launch transactions were dominated by bundler-class transactions; broader debate within the Solana validator / MEV community about whether to filter or disincentivise this pattern.
- **Turn-key MaaS-style services** — multiple paid bundler services advertised in Solana-trading communities throughout 2024–2025, with subscription / one-shot pricing models. Names rotate frequently; the class persists.
- **Equivalent classes on other chains** — Four.meme bundlers on BNB, Virtuals / Base launch bundlers, and the broader cross-chain launch-bundler pattern continues to emerge as new token-launch venues appear.

## Detection / attribution signals

- **Bundle-level:** same-block atomic inclusion of launch tx + multiple buy txs from a cluster of wallets, all sourced from a common funding wallet within a short pre-launch window. This is the canonical signature.
- **Wallet-cluster heuristics:** funding-source clustering across the supposed-snipers (often a single operator wallet funds 20–200 sub-wallets shortly before launch), uniform or near-uniform per-wallet buy amounts, synchronous-or-near-synchronous sell-out behaviour after the price impulse.
- **Token-supply distribution post-launch:** disproportionate first-block / first-minute supply concentration in a small wallet cluster that subsequently sells into retail buying.
- **Jito-side telemetry:** for venue / validator operators, bundle-content analysis can flag launch-tx-anchored bundles for review; Jito itself has periodically discussed filtering policies in this area.
- **Mitigation layer:** at the venue level, anti-bundling primitives (post-launch buy delays, randomised first-block ordering, per-wallet first-block buy caps) are the architectural responses; at the user level, the actionable advice is to treat first-block / first-minute Pump.fun buys as adversarially-priced.

## Citations

- `[pumpfunbundlerbubblemaps2024]` — Bubblemaps / Solana-analytics characterisation of bundler-cluster wallet shapes on Pump.fun launches. *(NEW citation — see summary.)*
- `[jitobundlepolicies2024]` — Jito documentation and community discussion of bundle inclusion policies relevant to launch-bundling behaviour. *(NEW citation — see summary.)*
- `[pumpfunlaunchruganalytics2024]` — Solana-launch-analytics cohort studies of Pump.fun bundler-cluster patterns and rug outcomes. *(NEW citation — see summary.)*

## Discussion

Pump.fun-style bundlers sit at the intersection of three OAK Technique surfaces — launch manipulation (T3 / T2) and privileged-ordering MEV (T13.002) — and are a useful test case for whether the OAK taxonomy can accommodate **class-of-tooling Software-axis entries** rather than only single named artefacts. OAK records this entry as a class because the per-implementation churn is high, the operationally relevant pattern (bundle the launch tx with sniper buys) is stable across implementations, and per-implementation Software entries would proliferate without adding analytical value.

Ecosystem position: bundler-class tooling is part of a broader 2023–2025 Solana token-launch-extraction ecosystem that includes copy-trader bots, snipe bots without bundling, dev-rug coordination services, and on-chain analytics evasion services. Pump.fun-style bundlers are the highest-leverage extraction surface in this ecosystem because Jito's private-bundle infrastructure provides the same-block atomicity that makes the technique reliable. Without that infrastructure layer, the pattern degrades to ordinary front-running, which is a less reliable extraction.

Attribution caveats: the class is ecosystem-wide and OAK does not Group-attribute it. Specific launch-rug incidents — where the dev / creator wallet and the bundler-cluster wallets are demonstrably the same operator — should be Group-attributed at the per-incident level if forensics support it, but the bundler tool itself is commodity infrastructure.

Cross-Technique observation: this entry is one of the cleanest cases in OAK of how **chain-specific MEV infrastructure (Jito on Solana) creates extraction patterns that do not have a clean Ethereum analogue**. The Ethereum sandwich-MEV pattern (OAK-T5.004, OAK-S17) and the Solana launch-bundling pattern share the underlying primitive of privileged ordering for value extraction but differ materially in venue, target, and victim shape. Future OAK contributors writing T13.002 examples should treat this divergence as a feature of the cross-chain MEV landscape, not as a translation problem.
