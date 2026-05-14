# Compounder Finance strategy-swap LP drain — Ethereum — 2020-11-30 to 2020-12-02

**Loss:** approximately **\$10.8–12.5M** drained from Compounder Finance protocol pools on Ethereum. The CP3R governance token fell >99.5% from its all-time high near \$100 to \$0.27. Drained assets included WETH, stablecoins (DAI, USDT, USDC), YFI, and UNI from seven strategy pools. DeFiYield.info reported a personal loss of ~\$1M and estimated community loss at ~\$10.8M.

**OAK Techniques observed:** **OAK-T11.005** (Operator-Side Fake Platform Fraud — the Compounder Finance team deployed the protocol as a deliberate extraction vehicle; the project name and ticker were chosen to evoke legitimate protocols (Compound, Keep3r), the audited contracts were a decoy, and the "Evil Strategy" swap was pre-planned, making the entire platform a deception construct) + **OAK-T2.001** (Single-Sided Liquidity Plant — the seven Compounder Finance strategy pools were structurally operator-controlled deposit traps from deployment; each pool collected user-deposited assets into a Strategy contract that the Timelock admin could drain at will via `setStrategy()` and `inCaseStrategyTokenGetStuck()`; the pools appeared to be legitimate single-asset yield vaults but were structurally single-sided deposit-collection vehicles where the operator retained unilateral withdrawal authority through the Timelock) + **OAK-T5.001** (Hard LP Drain — primary; the strategy-controller swap replaced audited Strategy contracts with malicious "Evil Strategy" contracts that drained user deposits from all seven pools) + **OAK-T5.003** (Hidden-Mint Dilution — the CP3R token contract retained an owner-only `mint()` function with no supply cap, flagged by SourceHat in the pre-exploit audit) + **OAK-T1.001** (Modifiable Tax/Parameter Function — the StrategyControllerV1 exposed `setRewards()` and `setStrategy()` functions callable by the Timelock admin, allowing post-deposit modification of the economic parameters users relied on when entering pools) + **OAK-T6.002** (Fake Audit-Claim — the protocol passed a SourceHat audit on 2020-11-19 that explicitly flagged the centralisation risk, then the team used the Timelock to swap in malicious strategies that were never in the audited codebase; the audit's "PASS" rating was subsequently used in marketing while the malicious strategies were deployed outside the audit scope) + **OAK-T6.003** (Audit-of-Different-Bytecode-Version — the SourceHat audit covered the initial strategy contracts deployed at protocol launch; the "Evil Strategy" contracts swapped in via `setStrategy()` were a different codebase entirely, never submitted for audit, making the audit claim valid only for bytecode versions the protocol no longer ran) + **OAK-T6.004** (Audit-Pending Marketing Claim — the team marketed the SourceHat PASS rating to attract deposits while simultaneously preparing the malicious strategy swap; the "pending" aspect was the Timelock queue window during which the malicious `setStrategy()` transaction sat publicly visible, making the audit claim functionally misleading while literally true for the audited code only).

**Attribution:** **pseudonymous**. The Compounder Finance team operated under anonymous identities. The project name and ticker (CP3R) were deliberately chosen to evoke Compound Finance and Keep3r Network, two legitimate protocols with no connection to Compounder. Post-exploit, the team deleted their Telegram and social presence. No public attribution to a named operator group at v0.1.

**Key teaching point:** Compounder Finance is the canonical 2020 anchor for the **Timelock-bypass strategy-swap sub-pattern** of T5.001: the Timelock's 24-hour delay was intended as a safety mechanism, but the pending malicious `setStrategy()` transaction sat unmonitored in the Timelock queue for the full delay period and was executed without community cancellation. The case demonstrates that a Timelock without active community monitoring is not a security boundary — it is a delay, not a block. The SourceHat audit (2020-11-19) explicitly identified the centralisation risk and the `mint()` function as concerns, creating the canonical **audit-flagged-but-unheeded** worked example for the OAK corpus.

## Summary

Compounder Finance launched in November 2020 as a "meta yield aggregator" on Ethereum, claiming to deposit user funds across multiple DeFi protocols to generate yield while distributing CP3R governance tokens as bonus rewards. The project name and CP3R ticker were chosen to evoke Compound Finance and Keep3r Network, two established DeFi protocols, creating a false impression of legitimacy through nominal association.

The protocol architecture centred on a `StrategyControllerV1` contract that managed yield strategies for seven pools. Each pool held user-deposited assets (WETH, DAI, USDT, USDC, YFI, UNI, and CP3R-ETH LP tokens) and allocated them to Strategy contracts that executed yield-generation logic. The StrategyController exposed privileged functions — `setStrategy()`, `setRewards()`, `withdrawAll()`, `inCaseTokensGetStuck()`, and `inCaseStrategyTokenGetStuck()` — all gated by a Timelock contract with a 24-hour delay and a 14-day grace period. The Timelock admin was the deployer team.

The CP3R token contract itself retained an owner-only `mint()` function with no supply cap, meaning the team could create arbitrary amounts of CP3R at any time.

On 2020-11-19, SourceHat published a smart-contract audit of the Compounder Finance codebase. The audit gave a **PASS** overall safety rating but explicitly flagged the centralisation risk: "The treasury contract, staking reward pools & their rates... is currently controlled by an address through the Timelock contract." The audit advised: "Ensure trust in the contract deployer. Their actions thus far have proven to be trustworthy." The `mint()` function and `setRewards()` mutable parameters were noted as centralisation concerns.

Between 2020-11-29 and 2020-12-01, the team executed the rug:

1. **Deployed seven malicious "Evil Strategy" contracts** — these were never part of the audited codebase. Each contained a manipulated `withdraw()` function designed to transfer pool assets to the StrategyController rather than to legitimate destinations.

2. **Queued a `setStrategy()` transaction through the Timelock** — this replaced the audited Strategy contracts with the malicious ones. The transaction sat publicly visible in the Timelock queue for the full 24-hour delay period. No community member detected or cancelled it.

3. **Called `inCaseStrategyTokenGetStuck()` on the StrategyController** — this function, named to sound like a benign emergency-recovery utility, triggered the manipulated `withdraw()` path on each Evil Strategy contract, draining pool assets to the StrategyController and then to the deployer's address.

4. **Repeated for all seven pools** — the same pattern drained WETH, DAI, USDT, USDC, YFI, UNI, and CP3R-ETH LP tokens, totalling ~\$10.8–12.5M.

The CP3R token collapsed >99.5%, and the team deleted their Telegram and all public-facing channels. The case is structurally parallel to the Chibi Finance `onlyGov` pattern (2023-06) and the Hope Finance router-rerouting pattern (2023-02), but precedes both by over two years, making it the earliest well-documented Timelock-abuse T5.001 anchor in the OAK corpus.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020-11 (early) | Compounder Finance launches as "meta yield aggregator" on Ethereum; seven strategy pools deployed with CP3R token rewards | (T1.001 standing surface — mutable reward rates via `setRewards()`) |
| 2020-11-19 | SourceHat publishes smart-contract audit; **PASS** rating with centralisation-risk flag on Timelock-controlled parameters and owner-only `mint()` | T6.002 (audit-flagged centralisation risk), T5.003 (standing `mint()` surface) |
| 2020-11-29 to 2020-12-01 | Team deploys seven malicious "Evil Strategy" contracts (outside audited codebase); queues `setStrategy()` via Timelock to replace audited strategies | T6.002 setup (strategy-swap outside audit scope) |
| 2020-12-01 (after 24h Timelock delay) | Timelock `executeTransaction()` fires; malicious strategies replace audited strategies across all seven pools | **T5.001 execution** (strategy-swap) |
| 2020-12-01 (same window) | Deployer calls `inCaseStrategyTokenGetStuck()` → manipulated `withdraw()` drains pool assets to StrategyController → deployer address | **T5.001 extraction** |
| 2020-12-01 to 2020-12-02 | CP3R token collapses >99.5% (from ~\$100 ATH to \$0.27); community and press coverage (CoinDesk, ZDNet, CryptoSlate, CoinGeek) | (market signal) |
| 2020-12-02 onward | Team deletes Telegram and social presence; funds not recovered | (recovery state — total loss) |

## What defenders observed

- **Pre-event (audit-flagged centralisation):** SourceHat's audit (2020-11-19) explicitly identified that the Timelock admin controlled strategy assignment, reward rates, and the CP3R token `mint()`. The flag was public and specific. A defender-side monitoring regimen that subscribed to Timelock `queueTransaction` events would have detected the malicious `setStrategy()` proposal at queue time, providing a 24-hour window to alert the community before execution. No such monitoring was in place.

- **Pre-event (token-level centralisation):** The CP3R token's owner-only `mint()` function was documented in the verified contract source and flagged by SourceHat. The defender-side observation is that `mint()` without a supply cap is a standing T5.003 surface regardless of audit status — the audit's PASS rating does not remove the centralisation risk, it only documents it.

- **At-event (Timelock execution signal):** The `executeTransaction()` call that swapped strategies was a single on-chain event. A Timelock-monitoring indexer would have produced an alert at execution time; the `inCaseStrategyTokenGetStuck()` call that followed within the same block or a closely subsequent block was the extraction signal. The naming of `inCaseStrategyTokenGetStuck()` as a benign-sounding emergency function is a recurring T5.001 behavioural indicator (compare Chibi Finance `panic()`, Hope Finance router re-pointing).

- **Post-event (total loss, no recovery):** Standard T5.001 outcome for pseudonymous-operator cases. No funds recovered; no civil-forfeiture action; operators remain pseudonymous.

## What this example tells contributors writing future Technique pages

- **T5.001 has a Timelock-abuse strategy-swap sub-pattern that precedes the 2023 `onlyGov` cohort by over two years.** Compounder Finance (2020-12) is the earliest well-documented Timelock-abuse T5.001 anchor in the OAK corpus, predating Chibi Finance (2023-06) and Hope Finance (2023-02). The sub-pattern is structurally distinct from the direct-LP-removal variant (SushiSwap Chef Nomi, AnubisDAO) and the oracle-modification variant (Magnate Finance).

- **A Timelock without active community monitoring is a delay, not a security boundary.** The 24-hour Timelock delay functioned as designed — the malicious transaction was publicly visible for the full delay period — but no community member or monitoring service detected or cancelled it. Future T5.001 contributions should distinguish between *governed* Timelocks (where a DAO or multi-sig can cancel) and *unmonitored* Timelocks (where the admin is the sole cancel authority and no external monitoring is in place).

- **SourceHat's published chat logs and post-mortem transparency set a standard for audit-firm incident disclosure.** The full chat logs between SourceHat and the CP3R team were published alongside the audit, providing an unusual level of transparency into the pre-exploit communications. Future T6.002 contributions documenting audit-related deception should note whether the auditing firm published its pre-exploit communications.

- **`mint()` without a supply cap is a standing T5.003 surface independent of audit status.** The CP3R token's `mint()` function was flagged in the audit but was not removed or supply-capped before the rug. The audit's PASS rating documented the function's existence; it did not neutralise the risk. Future T5.003 contributions should treat audit-flagged-but-retained `mint()` functions as a discrete risk category.

## Public references

- `[sourcehatcp3r2020]` — SourceHat, "Compounder Finance (C3PR) Smart Contract Audit" + post-mortem addendum: <https://sourcehat.com/audits/CP3R/>
- `[coindeskcompounder2020]` — CoinDesk, "\$10.8M Stolen, Developers Implicated in Alleged Smart Contract 'Rug Pull'" (2020-12-02): <https://www.coindesk.com/tech/2020/12/02/108m-stolen-developers-implicated-in-alleged-smart-contract-rug-pull>
- `[cryptoslatecompounder2020]` — CryptoSlate, "This DeFi app based on Ethereum just stole \$12 million from its users" (2020-12-03): <https://cryptoslate.com/this-defi-app-based-on-ethereum-just-stole-12-million-from-its-users/>
- `[zdnetcompounder2020]` — ZDNet, "Compounder Finance DeFi project allegedly pulls the rug from under investors, \$11 million stolen" (2020-12-03): <https://www.zdnet.com/article/compounder-finance-defi-project-allegedly-pulls-the-rug-from-under-investors-12-million-stolen/>
- `[coingeekcompounder2020]` — CoinGeek, "Compounder dev team steals over \$10 million in latest DeFi attack" (2020-12-03): <https://coingeek.com/compounder-dev-team-steals-over-10-million-in-latest-defi-attack/>
- `[certikcompounder2020]` — CertiK, "80 million RMB disappeared, analysis of Compounder.finance internal operation attack" (2020-12): <https://m.odaily.com.cn/en/post/5159885>
- `[defiyieldcompounder2020]` — DeFiYield.info, post-mortem thread via coder "Vasa" documenting the `inCaseStrategyTokenGetStuck()` exploit path: referenced in CryptoSlate and ZDNet coverage

## Citations

- `[sourcehatcp3r2020]` — SourceHat audit + post-mortem; canonical technical root-cause analysis.
- `[coindeskcompounder2020]` — contemporaneous press; \$10.8M figure.
- `[cryptoslatecompounder2020]` — contemporaneous press; Vasa's exploit-path walkthrough.
- `[zdnetcompounder2020]` — contemporaneous press; consolidated loss figure.
- `[coingeekcompounder2020]` — contemporaneous press; team-anonymity and Telegram-deletion details.
- `[certikcompounder2020]` — CertiK post-mortem; internal-operation-attack framing.

## Discussion

Compounder Finance is the canonical 2020 anchor for the **Timelock-abuse strategy-swap sub-pattern** of T5.001 and the earliest well-documented case in the OAK corpus where a protocol passed a security audit, then used the Timelock mechanism to deploy malicious contracts outside the audited scope. The case demonstrates the recurring structural property that **a Timelock without active community monitoring is not a security boundary**: the 24-hour delay period functioned as designed, but without monitoring or a multi-sig cancellation capability, the malicious transaction executed unopposed.

The CP3R token's owner-only `mint()` function and the StrategyController's mutable reward parameters (`setRewards()`) are the **T1.001/T5.003 standing surface** that enabled the extraction: the audit flagged these centralisation risks, but flagging did not neutralise them. The SourceHat audit's explicit "ensure trust in the contract deployer" advisory is the canonical example of audit-firm centralisation-risk disclosure that went unheeded by users.

The case is structurally distinct from the two other canonical 2020 T5.001 anchors:
- **SushiSwap Chef Nomi** (2020-09): direct dev-fund monetisation against own pools; no Timelock or strategy-swap; funds returned via public pressure.
- **Cover Protocol Blacksmith** (2020-12): smart-contract bug in reward-accounting path producing hidden-mint dilution (T5.003); no operator-side strategy-swap.

The Compounder pattern — audit-pass → deploy-malicious-strategies-outside-audit-scope → Timelock-swap → drain — recurs across the 2021–2023 cohort (Arbix Finance 2022-01, Hope Finance 2023-02) and should be treated as a discrete T5.001 sub-pattern in future Technique-page updates.
