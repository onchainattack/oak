# Chibi Finance `panic` / `onlyGov` residual-authority exit-scam — Arbitrum — 2023-06-27

**Loss:** approximately **\$1M** drained from eight Chibi Finance protocol contracts on Arbitrum on 2023-06-27 via the deployer's `panic`-function admin-emergency-withdrawal path. CHIBI governance token fell ~99% on the news (some sources report "over 90%"; CoinDesk and Halborn cite ~98%). Stolen funds were swapped into 555 ETH and bridged to Ethereum, then routed through Tornado Cash. Chibi was the **12th major exit-scam recorded on Arbitrum in 2023** at the time of the incident; the broader 2023 Arbitrum exit-scam cohort had cumulatively lost \>\$14M to that point.
**OAK Techniques observed:** **OAK-T1.003** (Renounced-but-not-really / Retained-Admin-Authority sub-class) — the structural enabling configuration: the deployer publicly framed Chibi as a community-governance DeFi yield-aggregator while retaining a `_gov` role with authority to call `panic()` (an emergency-withdrawal function) across all protocol contracts. **OAK-T2.001** (Single-Sided Liquidity Plant — the eight Chibi Finance protocol contracts collected user-deposited assets into pools that the `_gov` role controlled through the `panic()` emergency-withdrawal path; the pools appeared to be legitimate single-asset yield vaults but were structurally operator-controlled deposit traps from deployment, with the `onlyGov` modifier on `panic()` providing the unilateral withdrawal authority) + **OAK-T5.001** (Hard LP Drain / Exit Scam) — the operational outcome of weaponising the residual `_gov` authority. **OAK-T6.001** (Source-Verification Mismatch — the protocol's public-facing communications presented a community-governance framing while the verified contract source contained the `onlyGov`-gated `panic()` emergency-withdrawal path; the gap between the public community-ownership claim and the on-chain retained-authority surface is the canonical T6.001 signal). **OAK-T7.001** (Mixer-Routed Hop) — proceeds were routed through Tornado Cash for laundering, closing the recovery window structurally. The case is the canonical 2023 worked example for the **`onlyGov` residual-authority sub-class** of T1.003: the residual authority surface is documented in the verified contract source as an `onlyGov` modifier on a `panic`-style emergency function, but the public-facing protocol communications did not surface its operator-control implications.
**Attribution:** **pseudonymous**. The Chibi Finance team rebranded their Telegram and operator channels post-rug; no public attribution to a named operator group at v0.1. Per CryptoSlate's coverage, this was the 12th Arbitrum-based protocol to rug users in 2023, suggesting cohort-scale operator-recurrence even where individual cluster-attribution is not established.
**Key teaching point:** Chibi Finance is the canonical 2023 worked example for the **`onlyGov`-modifier residual-authority** sub-class of T1.003, structurally distinct from (a) Hope Finance's router-rerouting via retained authority (`/examples/2023-02-hopefinance.md`) and (b) Magnate Finance's oracle-modification via residual oracle-admin authority (`/examples/2023-08-magnate-finance-base-deployer-cluster.md`). The discriminating signal is **the source-level `onlyGov` modifier**: the residual authority is *named in the verified contract source*, gated by `onlyGov` rather than `onlyOwner`, and reachable via the deployer's ability to point `_gov` at a malicious contract. T1.003 contributors should treat the three sub-classes as the canonical 2023 reference triple.

## Summary

Chibi Finance was a DeFi yield-aggregator on Arbitrum that publicly marketed itself as a community-governance protocol providing automatic rewards to users who staked tokens. The protocol's smart-contract architecture distributed authority across eight separate contracts, each of which exposed a `panic()` function gated by an `onlyGov` modifier — meaning the function was callable by an admin contract but not by ordinary users. The `panic()` function was structured as an emergency-withdrawal pathway: it withdrew all tokens from the contract's pool and sent them to a designated address.

On 2023-06-27, the Chibi Finance deployer EOA executed the rug:

1. Transferred admin rights for the eight Chibi Finance contracts to a malicious contract under operator control. This step was *legitimate* at the contract layer — the deployer held the authority to assign the `_gov` role.
2. The malicious `_gov` contract invoked `panic()` across all eight Chibi protocol contracts in rapid succession, executing emergency withdrawal of all funds.
3. The drained tokens — approximately \$1M aggregate value — were swapped into ETH (\~555 ETH) and bridged from Arbitrum to Ethereum.
4. The bridged ETH was routed through Tornado Cash, closing the on-chain recovery window structurally.

The CHIBI governance token's price fell ~98% as the news propagated; per Halborn's same-day analysis ("Explained: The Chibi Finance Rug Pull (June 2023)"), the rug was the 12th Arbitrum-based protocol to exit-scam users in 2023, with the cohort cumulatively losing \>\$14M by mid-year.

The case is OAK's canonical T1.003 example for the **`onlyGov` residual-authority sub-class**: the residual authority surface was *documented in the verified contract source* as an `onlyGov` modifier on a `panic`-style emergency function, and the deployer's authority to assign `_gov` was the load-bearing operator-control surface. The exploit was therefore not a *bug* — it was the *intended* operator-control pathway, dressed in community-governance marketing. Halborn, CertiK, Cointelegraph, CoinDesk, CryptoSlate, BeInCrypto, CryptoPotato, Tokenist, Technext, BSCN, and CoinJournal contemporaneous coverage triangulates the technical root-cause to the `onlyGov` `panic`-function pathway.

## Why this is structurally significant

T1.003 has at least three structurally distinct 2023 sub-classes that share the Technique number but diverge on detection and mitigation:

1. **Router-rerouting via retained authority** — Hope Finance (`/examples/2023-02-hopefinance.md`). The retained authority is on a router contract; the failure mode is silent token-flow redirection at runtime.

2. **`onlyGov` `panic`-function residual authority** — Chibi Finance (this case). The retained authority is the deployer's ability to assign the `_gov` role; the `panic`-function is documented in the verified source. The failure mode is overt emergency-withdrawal extraction across multiple contracts.

3. **Oracle-modification via residual oracle-admin authority + cross-chain deployer cluster** — Magnate Finance (`/examples/2023-08-magnate-finance-base-deployer-cluster.md`). The retained authority is on the lending-protocol price oracle; the failure mode is collateral-price inflation followed by lending-pool drainage; M04 cluster-attribution is the canonical defender-tooling primitive.

The three sub-classes share the structural property that **the residual authority surface was checkable on-chain at the contract layer before the rug**, but they require *different* detection methodologies:

- Hope: bytecode review + proxy-implementation analysis on Arbiscan.
- Chibi: verified-source review + role-assignment privilege graph (M05 authority-graph enumeration).
- Magnate: M04 funder-graph clustering + cross-chain deployer-EOA correlation.

Chibi's structural distinguishing feature is that the residual authority was *named in the source code and visible in the verified Etherscan / Arbiscan contract*. The defender did not need to recompile bytecode (Hope) or trace cross-chain deployer linkage (Magnate); the `panic()` function gated by `onlyGov` was readable in plain Solidity. The case is therefore a particularly clean teaching example for the **source-level authority-graph enumeration** mitigation pattern (OAK-M05).

Three structural features distinguish the case within the T1.003 cohort:

1. **The residual authority is multi-contract.** Eight separate Chibi Finance contracts each exposed a `panic()` function gated by the same `onlyGov` modifier. The deployer's single `_gov` reassignment unlocked the `panic` pathway across all eight contracts simultaneously. T1.003 detection methodology should enumerate the residual-authority surface *across the protocol's full contract graph*, not just on the headline contract.

2. **The Tornado Cash recovery-window-closure is the standard 2023 endpoint.** Chibi's proceeds reached Tornado Cash within hours of the rug; standard recovery-window-closure profile across the 2023 T1.003 cohort. The structural property is shared with Hope Finance, Magnate Finance, and the broader 2023 rug-pull cohort whose proceeds reach a public mixer in the same transaction window.

3. **The Arbitrum-2023 cohort scale.** Chibi was the 12th Arbitrum-based exit-scam in 2023; the cohort cumulatively lost \>\$14M by mid-year. The chain-distribution is a gas-economics signal (cheap deployment + active retail capital + young listing-compliance regimes); future T1.003 examples should record the chain-cohort context.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2023-06 | Chibi Finance launches on Arbitrum as DeFi yield-aggregator; publicly markets community-governance framing; deploys eight protocol contracts each gated by `onlyGov` `panic()` modifier; `_gov` role assignable by deployer | (T1.003 standing surface) |
| 2023-06-27 | **Deployer transfers `_gov` admin rights** for the eight Chibi Finance contracts to a malicious contract under operator control | **T1.003 setup (residual-authority-reassignment)** |
| 2023-06-27 (same window) | **Malicious `_gov` contract invokes `panic()`** across all eight Chibi protocol contracts in rapid succession; emergency-withdrawal extracts \~\$1M aggregate | **T1.003 + T5.001 execution** |
| 2023-06-27 (within hours) | Drained tokens swapped into \~555 ETH; bridged from Arbitrum to Ethereum | T5 outflow |
| 2023-06-27 (within hours) | **CHIBI token falls \~98%** as news propagates; CertiK, Halborn, Cointelegraph, CoinDesk publish forensic coverage | (defender response / market signal) |
| 2023-06-27 onward | **Bridged ETH routed through Tornado Cash**; on-chain trail effectively foreclosed at the mixer boundary | T7.001 |
| Continuing | No public recovery; no civil-forfeiture action; operators remain pseudonymous | (recovery state) |

## What defenders observed

- **Pre-event (verified-source layer):** the `panic()` function gated by `onlyGov` was *named in the verified contract source* on Arbiscan. A standard source-level review (OAK-M05 authority-graph enumeration) would have surfaced the residual authority across the eight protocol contracts. Defender lesson: source-level review of *every* authority-bearing modifier across the protocol's full contract graph is the canonical 2023 mitigation pattern; the residual authority was hiding in plain sight, not behind proxy indirection or bytecode obfuscation.
- **At-event (role-assignment signal):** the deployer's transfer of `_gov` to the malicious contract is a single transaction event observable on Arbiscan. A protocol-monitoring indexer subscribed to `_gov` role-assignment events would have detected the precondition; the malicious `_gov` contract's subsequent `panic()` calls are the extraction signal. Vendor coverage of this monitoring pattern at v0.1 is partial; v0.x mitigation work should formalise the integration pattern at the wallet / venue UX layer.
- **At-event (CHIBI-price signal):** the governance token fell ~98% as the news propagated; a price-surface indexer integrated with on-chain monitoring would have flagged the rug within minutes. The price signal is *secondary* to the on-chain extraction signal but operationally useful for cohort-scale alerting.
- **Post-event:** standard Tornado-Cash recovery-window-closure profile. Within hours of the rug, proceeds had reached the mixer and the on-chain trail was effectively foreclosed at the mixer boundary. The base-rate expectation for T1.003 / T5.001 incidents whose proceeds reach a mixer within the same operational window is total loss with no recovery; Chibi is consistent with the base rate.

## What this example tells contributors writing future Technique pages

- **T1.003 has at least three structurally distinct 2023 sub-classes.** Hope Finance (router-rerouting), Chibi Finance (this case, `onlyGov` residual authority), Magnate Finance (oracle-modification + cross-chain cluster). The three together cover the canonical 2023 T1.003 reference triple. T1.003 contributors should preserve the sub-class distinction; the detection methodology diverges across the three.
- **Multi-contract authority-graph enumeration is the load-bearing M05 pattern.** Chibi's residual authority spanned eight protocol contracts; a single-contract review would have missed the full extraction surface. M05 enumeration must cover the protocol's full contract graph, not just the headline contract.
- **Source-level review of `onlyGov` / `onlyAdmin` / `onlyEmergency` modifiers is the canonical 2023 defender practice.** Chibi's `panic()` function was named in the verified source; the residual authority was not hiding behind proxy indirection. Defender practice should treat *every* authority-bearing modifier across the protocol's full contract graph as a residual-authority surface until proven gated by timelocked governance.
- **The Tornado Cash recovery-window-closure is the standard 2023 endpoint.** Future T1.003 examples should record whether proceeds reached a public mixer within the same operational window; if so, the recovery-window is structurally foreclosed and the defender intervention surface narrows to forward-going user exposure.
- **Cohort-scale chain-distribution is a gas-economics signal.** Chibi was the 12th Arbitrum-based exit-scam in 2023; cohort-scale chain-distribution is informative for defender-tooling prioritisation. Future T1.003 examples should record the chain-cohort context.

## Public references

- `[halbornchibi2023]` *(proposed)* — Halborn, "Explained: The Chibi Finance Rug Pull (June 2023)": <https://www.halborn.com/blog/post/explained-the-chibi-finance-rug-pull-june-2023>
- `[certikchibi2023]` *(proposed)* — CertiK, "Chibi Finance Incident Analysis": <https://www.certik.com/resources/blog/chibi-finance-incident-analysis>
- `[cointelegraphchibi2023]` *(proposed)* — Cointelegraph, "Chibi Finance $1M alleged rug pull: How it happened": <https://cointelegraph.com/news/chibi-finance-1-million-alleged-rug-pull-how-it-happened>
- `[coindeskchibi2023]` *(proposed)* — CoinDesk, "Chibi Finance Rug Pulls Users for $1M, CHIBI Falls 98%": <https://www.coindesk.com/tech/2023/06/27/chibi-finance-rug-pulls-users-for-1m-chibi-falls-98>
- `[cryptoslatechibi2023]` *(proposed)* — CryptoSlate, "Chibi Finance becomes 12th Arbitrum-based protocol to rug users in 2023": <https://cryptoslate.com/chibi-finance-becomes-12th-arbitrum-based-protocol-to-rug-users-in-2023/>
- `[cryptopotatochibi2023]` *(proposed)* — CryptoPotato, "Arbitrum-Based DeFi Project Chibi Finance Rug Pulled: Over $1 Million Drained": <https://cryptopotato.com/arbitrum-based-defi-project-chibi-finance-rug-pulled-over-1-million-drained/>
- `[beincryptochibi2023]` *(proposed)* — BeInCrypto, "Chibi Finance Pulls the Rug: Users Lose Over $1M": <https://beincrypto.com/chibi-finance-pulls-rug/>
- `[bscnewschibi2023]` *(proposed)* — BSCN, "Chibi Finance: Arbitrum-Based DeFi Project Allegedly Performs $1M Rug Pull": <https://bsc.news/post/chibi-finance-arbitrum-based-defi-project-allegedly-performs-1m-rug-pull>
- `[tokenistchibi2023]` *(proposed)* — Tokenist, "Arbitrum-Based DeFi Project Chibi Finance Disappears With a Million Dollars": <https://tokenist.com/arbitrum-based-defi-project-chibi-finance-disappears-with-a-million-dollars/>
- `[technextchibi2023]` *(proposed)* — Technext, "Chibi Finance Rug Pull; Calls for due diligence increase as crypto users lose over \$1m": <https://technext24.com/2023/06/29/chibi-finance-rug-pull-calls-for-due-diligence-increase-as-crypto-users-lose-over-1m/>
- `[coinjournalchibi2023]` *(proposed)* — Coin Journal, "Chibi Finance team executes $1M rug pull, CHIB plummets 98%": <https://coinjournal.net/news/chibi-finance-allegedly-executes-1m-rug-pull-on-arbitrum-chib-plummets-98/>
- `[chainalysis2025rug]` — broader cohort retrospective.
- `[slowmist2024report]` — broader 2024 cohort retrospective.

## Discussion

Chibi Finance is OAK's canonical 2023 worked example for the **`onlyGov` residual-authority sub-class** of T1.003. The structural distinguishing feature is that the residual authority surface was **named in the verified contract source** — the `panic()` function gated by `onlyGov` is readable in plain Solidity on Arbiscan. The case is therefore a particularly clean teaching example for the source-level authority-graph enumeration mitigation pattern (OAK-M05): the residual authority was hiding in plain sight, not behind proxy indirection or bytecode obfuscation. Defenders performing standard source-level review of every authority-bearing modifier across the protocol's full contract graph would have surfaced the residual authority pre-rug.

The case structurally complements Hope Finance (`/examples/2023-02-hopefinance.md` — router-rerouting via retained authority) and Magnate Finance (`/examples/2023-08-magnate-finance-base-deployer-cluster.md` *new* — oracle-modification via residual oracle-admin authority + cross-chain deployer cluster). The three together cover the canonical 2023 T1.003 sub-pattern reference triple.

For OAK's broader cohort coverage at v0.1, the Chibi case is the cleanest single-chain (Arbitrum) T1.003 example with multi-source forensic triangulation (Halborn, CertiK, Cointelegraph, CoinDesk, CryptoSlate, BeInCrypto, BSCN, Tokenist, CryptoPotato, Coin Journal, Technext); meets the v0.1 standard for "verified across at least 2 independent forensic providers" with substantial margin. The case anchors the v0.1 T1.003 example set as the *source-level-readable* sub-class, distinct from the bytecode-review (Hope) and cluster-attribution (Magnate) sub-classes.
