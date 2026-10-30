# Roadmap

This is OAK's working plan: what is being done now, what comes next, and **why**. It is updated in the same commit as the work it describes. When an item is done it moves to the log at the end of the "Current work" part, with its commit and the reason it was worth doing, so the file also answers "why does OAK look like this?".

Order of trust: **sourced facts first, coverage second.** Since the October 2026 source pass, an incident that cannot be traced to a source does not go in, and a mechanism that does not match its source gets fixed before anything new is added.

If you want to contribute against any of these items, open an issue using the relevant template in `.github/ISSUE_TEMPLATE/` and the maintainers will comment on scope and ID assignment before you spend effort drafting.

---

## Current work

_Last reviewed 2026-10-30._

### Next

#### 0. Make incidents replayable end to end: fund flow, wallet links, graphs

**Why:** a defender should be able to rebuild an incident from OAK alone, see every step as a known Technique, and follow the money. Since 2026-10-30 every single-incident example must carry a timeline with a Technique per step, full linked addresses and a fund-flow row (`tools/check_timeline.py`). The fund flow and the addresses are still prose, though, so nothing can be drawn, queried or joined across incidents. Ondology Labs' Binance write-up is the bar: a funding → takeover → receiver graph, a laundering graph, a dated holdings snapshot, and every figure marked as verified by them or taken from someone else.

1. ✅ **Structured fund flow** (`89365fb`); next: roll out to the October 2026 set with `oak-fund-tracer`, one agent per file.
   Originally: Add a machine-readable flow block per example (from → to, asset, amount, tx, chain, address role), exported to `oak.json` / oak-mcp. Pilot it on Binance, then fill in the October 2026 set.
2. **Graph on the site.** Render that block as a flow graph on each incident page (Mermaid is already a dependency), with nodes coloured by role.
3. **Address index.** One index of every address across the corpus, so the site can show where an address from one incident appears in another (as Binance ↔ Bitget does) and the overlap becomes a T8.001 signal by itself.
4. **Our own tracing.** Many timelines say "where the funds went: undisclosed" only because the cited sources stop there. Explorer-API tracing would let OAK close those gaps itself, with each hop marked as verified by OAK.
5. **Backfill.** 61 pre-2026-09 timelines break a rule (`check_timeline.py --legacy`), and 282 examples have no fund-flow row (`--warn`).

#### 1. Write proper entries for real incidents that were filed under the wrong mechanism

**Why:** the October 2026 source pass quarantined these files because what they described did not happen. The incidents behind their names did happen, differently, and OAK has no entry for them. Each one needs a new example written from the sources, mapped to the technique that matches the real mechanism. Details per file are in the `CORRECTIONS.md` correction log.

| Incident | What actually happened (per the correction log) | Quarantined file |
|---|---|---|
| Akutars / AkuDreams, 2022-04 | Contract bug locked ~11,539 ETH (~\$34M) | `2022-02-akutar-nft-influencer-rug` |
| Elephant Money, 2022-04-12 | Price manipulation on BNB Chain, ~\$11M | `2022-04-elephant-money-flash-loan-governance-attack` |
| Fei Rari Fuse, 2022-04-30 | Reentrancy, ~\$80M | `2022-04-rari-fuse-twap-oracle-window-manipulation` |
| Omni bridge on EthereumPoW, 2022-09 | Message replay on the ETHW fork (ETHW itself used chain ID 10001) | `2022-09-ethereum-pow-fork-replay-cohort` |
| Visor Finance, 2021-12-21 | `deposit()` validation flaw in the vVISR rewards contract minted shares, ~\$8.2M | `2021-12-visor-finance` |
| Atlantis Loans, 2023-06 | Malicious governance proposal on an abandoned protocol spent lingering approvals | `2023-06-atlantis-loans` |
| SnowdogDAO, 2021-11 | ~\$30M rug on Avalanche | `2023-11-snowdog-dao-avalanche-cross-chain-lock-spoof` |
| Balancer veBAL "Humpy", 2022 | Gauge-vote capture | `2023-2024-balancer-vebal-delegation-takeover` |
| Fake wallet apps | Kaspersky's App Store "FakeWallet"; fake Ledger Live for macOS | `2023-2025-fake-crypto-wallet-google-play-app-store-phishing` |
| Fake security extension | Okta's "ShieldGuard" report | `2023-2025-fake-revoke-cash-wallet-security-extension-phishing` |

Before writing each, run `python3 tools/check_known.py` and add a `## Root-cause evidence` block if the incident date requires one.

#### 2. Clean old mechanisms off technique and actor pages

**Why:** the source pass corrected the example files, but some technique and actor pages still describe the old, wrong version in their own prose. A reader landing on the technique page sees the error the example no longer has.

Known leftovers: OAK-T11.001 (BitMart described with "1Password"), OAK-T17.005 (Inverse), OAK-T5.007 (ICP), OAK-G18 (Karakurt), OAK-G01 (Yapizon / Upbit wording), and anchor descriptions on OAK-T7.007, OAK-T8.004, OAK-T2.003 and OAK-T16.004. Method: for every corrected or quarantined example, grep the corpus for its slug and key claims and align the sibling text.

#### 3. Check suspected duplicates

**Why:** bulk-generated files repeat the same incident under different slugs, which double-counts it in statistics. The October pass merged eight such sets. These pairs were noticed afterwards and are not yet compared:

- EigenLayer airdrop: `2024-05-eigenlayer-restaking-airdrop` and `2024-eigenlayer-restaking-airdrop`. The first cites no URLs and claims "\$1B+" in losses.
- LastPass: `2022-12-lastpass-vault-cohort` and `2023-10-lastpass-breach-crypto-drain`. The first cites no URLs and ties Chris Larsen's January 2024 theft to LastPass; verify that link and the amount before keeping either.
- Onyx: `2024-09-onyx` and `2024-onyx-protocol-year-plus-exposure`.

#### 4. Review doubtful technique mappings

**Why:** a wrong primary technique sends a defender to the wrong control. These were left as filed during the October pass because the sources did not settle them:

- Yearn v2, 2023-02 — maybe OAK-T9.016 (accounting-invariant flaw) rather than its current mapping.
- Compound, 2021-09.
- B2 Network, 2026-07 — OAK-T11.014 may overreach.
- Ankr — the secondary OAK-T9.004.

#### 5. Re-run the external A/B test

**Why:** an outside model was asked root-cause questions with and without OAK, and its answers exposed the THORChain misclassification. After the fixes, run it again with direct links (Onyx, YO) to check that OAK now gives the sourced answer and that `root_cause_evidence` and the withdrawn-example list come through oak-mcp.

#### 6. Coverage gaps below target

**Why:** `BACKLOG.md` (generated) lists the tactic × year cells under their minimum. Currently: T1 × 2026 (4/5), T4 × 2021 (3/4), T12 × 2026 (1/2), T13 × 2026 (2/3). Fill them only with sourced incidents; never write a cohort file to reach a number.

#### 7. Waiting on post-mortems

**Why:** these incidents are real but no source yet says what happened, and OAK no longer files a mechanism it cannot cite.

- **Pirate Chain (ARRR), 2026-10-14.** Filed at T9.014 from the project's statement (issuance-check bypass + mis-parsed output scripts, ~39.8M ARRR). Add the code path when the promised post-mortem is out.
- **October 2026 incidents with no mechanism published yet** (sweep 2026-10-30). Each is real and sourced for the loss, but nothing yet says how it happened: **Affluent** (TON, 10-16, ~\$1.05M, DefiLlama "unbacked mint" only), **Diamante** (10-27, operator says breach, no amount or vector), **Frogman** personal-wallet drain (10-07, ~\$4M, vector unknown), **MORPHO / EIP-7702** institutional addresses (10-21, ~\$2.3M, ZachXBT; key vs. delegation unresolved), **HAI** malicious proposal (10-06, Optimism, ~\$927K at risk, outcome unknown). Also revisit **Binance** when its post-mortem lands: the "additional points of breach" may move the primary technique.
- **Ledger / CryptoBilis final report.** The example is filed at T11.007 parent with the implant confirmed; assign a sub-Technique (candidate T11.007.004 in `TAXONOMY-GAPS.md`) once Ledger ties the losses to the implant.

#### 8. Next content snapshot (~2026-12)

**Why:** releases are quarterly. The October source pass, the new techniques and the four deprecations belong in a versioned snapshot so downstream users (oak-mcp, STIX consumers) get them as one change with a `CHANGELOG.md` entry.

### Log

Newest first. Each entry: what, commit, why.

- **2026-10-30 — Claude Code tooling for OAK agents; X100 traced end to end** (this commit). _Why:_ sweeps, tracing and write-ups were done by hand in long sessions, so they came out differently each time, and rules were remembered rather than enforced. The tooling now lives in the repo, so any contributor's Claude session works the same way.
  - **Added.** `CLAUDE.md` with the working rules. Skills `oak-sweep`, `oak-write-example` (with `template.md`), `oak-trace-funds` and `oak-validate`. Agents `oak-source-reader` (Haiku, read-only), `oak-fund-tracer` and `oak-example-writer` (Sonnet). A `PostToolUse` hook that validates any edited `examples/*.md` at once and feeds errors back. A shared `.claude/settings.json` with allowlists. Offline unit tests in `tools/tests` that run in `npm run check`.
  - **Pilot.** The tracer procedure ran on X100: 15 edges, all checked on-chain. The USDT was swapped for ETH via UniswapX within 6 minutes, the ETH was split to four fresh wallets, and about 2,022.4 ETH entered Tornado Cash in 82 deposits on 10-26 and 10-27. That contradicts the "not moved" in the cited brief.
  - **Spillover.** The ether.fi entry's Tornado router address is now complete.
  - **Note.** New agents load only in a new session.
- **2026-10-30 — Fund flow becomes data; OAK traces on-chain itself** (this commit). _Why:_ timelines and full addresses were still prose, so nothing could be drawn, queried or joined across incidents, and "where the funds went" stopped wherever the sources stopped.
  - **What was added.** The `## Fund flow` oak-flow block, validated by `check_flow.py` and exported as `oak.json` `fund_flow`. Its edges are marked `verified: oak` or `verified: source`. The site draws it with Mermaid and a table of full linked addresses. `tools/explorer.py` traces keylessly (Blockscout for EVM, mempool.space for BTC, cached). `tools/build_address_index.py` builds the cross-incident address index (`addresses.json`), and pages get a "seen in other incidents" block.
  - **Binance pilot, traced by OAK.** The full initiator address, now confirmed. Three Tornado withdrawals, not three on one day. The 195,460 vs 197,460 ETH discrepancy explained (two transfers). The USDT figure (1.615B) confirmed in the sweep transaction. 14 gas-funded hop wallets. 529 swaps of 35 tokens into 64 DEX pools.
  - **Tracer bugs found during the pilot.** The tracer first followed counterfeit "ETH"/"USDT" Transfer events that poisoning bots had sent to the attacker's wallets from lookalike addresses (`0x8537…` imitating `0x8532…`), and it would have recorded hops that never happened. Tokens with no price and fewer than 1,000 holders, and zero-value transfers, are now skipped.
  - **Still open.** The Binance ↔ Bitget address overlap remains TRM's claim, because OAK's Bitget entry has no addresses to check it against.
- **2026-10-30 — Every incident gets an end-to-end timeline with full addresses** (this commit). _Why:_ the user could not follow Binance as a sequence, and objected that the lean sweep entries shortened addresses and dropped how the money moved: "attackers have everything and defenders have nothing." The new `tools/check_timeline.py` in `npm run check` requires a Timeline table on every single-incident example: entry, preparation, execution, where the funds went and response, with a Technique per step. Undisclosed stages stay in as "undisclosed", and from 2026-09 on no address or hash may be shortened. The rule is written up in CONTRIBUTING, with Binance as the reference (key addresses, a dated funds snapshot, open questions). 47 timelines were added (five Sonnet agents working only from each file's cited sources, reviewed here), and shortened addresses were expanded throughout. Flagged for review: the Flamincome summary differs from SlowMist on the mechanism, and the Qubic restart and fund return lack a fetched source.
- **2026-10-30 — Incidents page filters by month and day** (this commit). _Why:_ the site could only filter by year, so "what happened this month" meant scrolling a year of cards. Each example now carries a date: the month comes from the file name, and the day comes from the title only when the title's date falls in that month. 391 examples have a day, 162 a month only, and 130 a year or range. Year → month → day selectors sort by full date and sync to `?year=&month=&day=`, so a filtered view can be linked.
- **2026-10-30 — CoinDCX 2025-07 entry vector corrected** (this commit). _Why:_ while reading Ondology Labs' other posts for the Binance case. The example said "server breach" and built a teaching point on it, but police and operator statements since 2025-07-31 describe a recruiter lure and malware on an employee's laptop (T15.001 → T15.003). This is the same shape as Binance's DevOps-laptop entry. The rest of Ondology's blog is compliance and tax material, with nothing for OAK.
- **2026-10-30 — Binance: EIP-7702 leg verified on-chain** (this commit). _Why:_ the T13.004 secondary rested on TRM as relayed by The Hacker News. Ondology Labs recovered the signer of all 50 authorizations as the Binance 14 EOA and published tx hashes, the rehearsal on test wallets, the Hot Wallet 34 payout of 823M USDC and a per-chain breakdown. The mechanism is now corroborated, and the remaining unknown is narrower: how the service container got Binance's keys to sign.
- **2026-10-30 — Month-end sweep 2026-10-17 → 10-30: 23 incidents** (this commit). _Why:_ October is the worst month on record and the corpus stopped at 10-17. SlowMist tracker first, then RektRadar daily briefs, which surfaced five earlier-October gaps the tracker's first page did not show (THEO, Kolan, BiFi, AlpsCon, MetaMask Staking). Headline: **Binance ~\$6.3B** (T15.003 from Binance's preliminary finding; T13.004 from TRM's reconstruction of 50 pre-signed 7702 authorizations; G01 attribution is the analytics firms', not Binance's). Polymarket's second frontend-vendor drain in four months (DebugBear RUM script, session hijack rather than approval prompts). Initia is the second "VM bug paid at par by the bridges" after Liquid. Six new T9.016 anchors. Five held under Next §7 for want of a mechanism.
- **2026-10-17 — Sweep 2026-10-11 → 10-17: four incidents, Ledger implant confirmed** (this commit). _Why:_ keep recency tight. Demex (2026-09-25, missed last sweep; T10.002 from the operator's post-mortem), UNCX VestingManager (T9.016), Gamdom (T15.003 + T11.011, the second casino multi-chain hot-wallet drain in three weeks), Coldcard's X account (T15.006). Ledger's confirmation of a hardware implant moved the CryptoBilis entry from _disputed_ to _corroborated_ and opened the T11.007.004 candidate. Pirate Chain held until it has a source.
- **2026-10-17 — Sweep follow-up: five more from the SlowMist tracker** (this commit). _Why:_ the first pass used news and vendor posts only and missed the tracker, as the sweep-coverage rule warns. Pirate Chain (T9.014, now sourced), Papertrade (T17.001), X7 Finance (T9.016), Set Protocol (T9.011), Based Visa Card KYC exposure (T15.004); UNCX loss raised to ~\$1.49M. Rule for next sweeps: read `hacked.slowmist.io` first.
- **2026-10-11 — OAK-T9.012 deprecated** (`d65a2b3`). _Why:_ the mechanism ("buy before the pool has liquidity") cannot happen, and its three anchors were invented. The real neighbouring patterns, launch sniping and pool pre-creation at a skewed ratio, went to `TAXONOMY-GAPS.md` as candidates.
- **2026-10-11 — Every example now cites a source, and the build enforces it** (`1c98e22`, with `b11ee35`, `d5b4bb5`, `a64a876`). _Why:_ the KelpDAO and THORChain cases showed that OAK held confident entries nobody had checked. Unsourced examples went from 253 to 0. 78 files with no record of the incident were moved to `quarantine/`, duplicate sets were merged, and ~150 were corrected in place. `check_sourcing --ci --max 0` now fails the build on any new unsourced example. Examples: 738 → 651.
- **2026-10-11 — `root_cause_evidence`, withdrawn examples, oak-mcp 0.4.0** (`5120e04`, `d4b34c9`). _Why:_ an external A/B test showed a model using OAK could not tell how solid a root cause was, or that an example had been withdrawn. Examples dated 2026-10 onward must state technique, source, source type and confidence. `oak.json` lists withdrawn files with the reason, and oak-mcp exposes both.
- **2026-10-11 — THORChain reclassified, OAK-T10.008 deprecated** (`591e636`). _Why:_ THORChain's own Exploit Report #2 attributes the May 2026 loss to key extraction through its threshold-signing library, not the observer-signature flaw OAK had recorded from a same-day third-party analysis.
- **2026-10-11 — New techniques OAK-T9.016 and OAK-T11.014** (`15d2c9b`). _Why:_ contract accounting-invariant flaws and operator privileged-key compromise had been spread across techniques that did not fit them, which blurred both statistics and mitigations.

---

## Longer-range plan

_Written at v0.1. Reviewed 2026-10-12: delivered items are struck through. The website and governance items were not re-checked._

### v0.x — content depth

- ~~WalletConnect session hijacking~~ — delivered as OAK-T4.006.
- **QR-code phishing as an entry vector** — no standalone Technique yet; add one only if a sourced incident shows a QR-specific mechanism.
- ~~Privacy-chain hops~~ (OAK-T7.005) and ~~DeFi yield-strategy laundering~~ (OAK-T7.006) — delivered.
- ~~Standalone T6 entries~~ — delivered: fake audit claim (OAK-T6.002), audit-pending marketing claim (OAK-T6.004), renounced-but-not-really (OAK-T1.003).
- **Per-Technique calibration / scope refinements** — not re-checked:
  - OAK-T1.001: `governance-gated` sub-classification for governance-timelocked modifiable fees.
  - OAK-T1.002: per-extension sub-Techniques for other Token-2022 extensions.
  - OAK-T2.002: cross-chain locked-liquidity setups.
  - OAK-T3.001: reference funder-graph depth and thresholds per chain.
  - OAK-T3.002: per-venue cycle-window and net-flow thresholds.
  - OAK-T3.003: confidence-band reporting convention.
  - OAK-T5.002: calibrate window size and cumulative-fraction threshold; move reference implementation from `gap`.
  - OAK-T5.003: chain-specific sub-Techniques if detection diverges.
  - OAK-T8.001: cluster freshness/decay convention.
- **Per-Technique Data Source backfill** — technique pages do not yet carry explicit Data Sources references.

---

## v0.5 — multi-implementation matrix and co-maintainers

- Two-dimensional `COVERAGE.md` (Technique × Implementation) with at least three implementations represented (operator-behaviour detectors + protocol-layer monitors + audit-firm continuous-monitoring services).
- ~~Cross-walk between OAK Techniques and OWASP Smart Contract Top 10 categories~~ — delivered as `CROSSWALK.md`.
- Invite 2–3 co-maintainers from the contributor community to share PR review load, per the v0.1 commitment in `CONTRIBUTING.md`.
- First retroactive coverage audits — comparing self-attested vendor coverage entries against publicly verifiable evidence.
- ~~Move the per-Technique example bar to "≥1 example per Technique."~~ — met: every active Technique has an anchor (`BACKLOG.md`).
- ~~NFT-specific Techniques~~ — delivered as Tactic T12.
- Detection-test corpus — labelled-example harness derived from the cited academic datasets.

---

## v1.0 — stable taxonomy

The hard semantic commitment that comes with v1.0:

- The Tactics are stable. New top-level Tactics may be introduced in v2.0+ but not before, and only after community consultation.
- Existing Technique and Group IDs are stable. Deprecated entries are marked `Maturity: deprecated` and remain in the repository with a pointer to the superseding entry. IDs are never reused.
- A canonical machine-readable schema is published alongside the markdown, frozen as **stable**. `tools/oak.json` was promoted from a draft to a released (pre-1.0) schema at **v0.7**; v1.0 freezes it as the stable, ID-stable contract.
- ~~Account abstraction (ERC-4337) coverage~~ — delivered as Tactic T13.
- ~~Validator / staking / restaking coverage~~ — delivered as Tactic T14.
- Severity and timing dimensions on every Technique.

---

## Website MVP backlog (post-Phase R)

The Vite + React static-site MVP at `onchainattack.org` exposes the corpus and was extended in Phase R to render Mitigations and Software workspace views. Remaining work to make the site a first-class consumer of the OAK relationship graph:

- **Per-Technique detail page** — render related Mitigations (incoming `mitigates`), Software (incoming `uses`), Worked Examples, Citations, and Data Sources as a single technique-centric panel; replace the current document-viewer-only path.
- **Per-Mitigation detail page** — list every Technique the Mitigation applies to as a clickable matrix slice; surface Audience and Class as filterable facets.
- **Per-Software detail page** — render Used by Groups, Observed Techniques, and lineage links (predecessors / successors) as graph-style cross-references.
- **Per-Group detail page** — surface Software the Group uses (`G→S` edges) and the Techniques those tools cover.
- **Filters by relationships** — facet the Matrix view by "techniques mitigated by M-NN" / "techniques used by S-NN" / "techniques observed in G-NN" so a risk team can build coverage views without manual cross-referencing.
- **Search index expansion** — current search covers Techniques, Examples, Actors, and Docs; extend to Mitigations and Software entries plus full-text across `## Description` content.
- **Relationship graph visualisation** — a force-directed or layered visualisation of `mitigates` and `uses` edges so the cross-axis structure is browsable, not just queryable.
- ~~**STIX 2.1 export**~~ — **delivered**. `tools/export_stix.py` emits `tools/oak-stix.json` (601 STIX objects: tactic + attack-pattern + course-of-action + malware/tool + intrusion-set + data-source + relationship SROs). UUIDs derived deterministically via uuid5 from a pinned OAK namespace so STIX IDs stay stable across regenerations.
- **Per-Tactic kill-chain banner** — the matrix currently lists Tactics as columns; add a phase-ordered banner that shows the canonical T1→T8 kill-chain progression and the auxiliary T9-T14 tracks visually distinct from it.
- **Coverage drill-down** — current `Coverage` view links to `COVERAGE.md` only; add an interactive matrix showing per-Technique status (full/partial/gap) with vendor-implementation row breakouts as the reference-implementation count grows in v0.5.
- **Bundle size** — Vite warns the production JS bundle is over 500 kB minified (~617 kB gzip). Code-split by view (`React.lazy` per workspace section) to land under 250 kB initial.
- **Code splitting for `src/data/generated.ts`** — the ~7 k-line generated TypeScript constant currently inlines all document HTML; move large markdown bodies to per-document JSON fetched lazily on document-viewer entry.

These items do not gate the v0.1 content cut. They are the work to land alongside or after the v0.1 launch announcement.

---

## Repository-level commitments (out of release scope)

These items track strategy-level work that progresses independently of content versioning.

- **Coverage-claim verification methodology** — community-driven RFC on how vendors and detection tools can self-attest to OAK-Technique coverage in a comparable, machine-readable way. The detail is open for community input; the goal is honest comparability across implementations, not certification gatekeeping.
- **Governance research** — interviews with comparable open-framework communities (CIS Controls, OWASP Foundation, Linux Foundation) on long-term sustainability and incorporation patterns. Outcome posted as a community discussion document.
- **Trademark filings** — defensive word-mark registration for the OAK name post v0.1 launch, to prevent third-party squatting.
- **Visual identity** — SVG wordmark/logo for the README banner and `onchainattack.org` landing page.

---

## How to propose changes to this roadmap

This file is owned by the maintainers and is updated alongside the per-Technique Discussion sections from which it is aggregated. To propose a new v0.x work item, open an issue with the appropriate `.github/ISSUE_TEMPLATE/` template; if the proposal is accepted, the maintainers will reflect it here at the next roadmap update.
