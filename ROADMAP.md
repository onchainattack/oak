# Roadmap

This file aggregates the work items called out in the **Discussion** section of each Technique and Tactic page, plus repository-level commitments from the strategy that govern the overall trajectory. It is not a delivery commitment — it is the maintainer's current best read of where contributor effort and OAK-side work would compound.

If you want to contribute against any of these items, open an issue using the relevant template in `.github/ISSUE_TEMPLATE/` and the maintainers will comment on scope and ID assignment before you spend effort drafting.

---

## v0.x — content-depth release (the next major content delivery)

With T9 (Smart-Contract Exploit) and T10 (Bridge & Cross-Chain) shipped at v0.1, the largest content gap remaining is the missing high-frequency T4 sub-Techniques (address poisoning, approve-pattern drainers, `setApprovalForAll` NFT drainers) and the missing T7 sub-Techniques (CEX layering, cross-chain laundering as a destination class). These are the work items that the dollar-loss-prevented metric is most sensitive to in 2024-2025 incident statistics.

### Remaining T4 sub-Techniques (post v0.1 expansion)

T4.003 Address Poisoning, T4.004 Allowance/Approve-Pattern Drainer, and T4.005 setApprovalForAll NFT Drainer were delivered at v0.1. The remaining T4 sub-Techniques targeted for v0.x:

- **WalletConnect session hijacking** — distinct from T4.001/T4.004 because the entry vector is a malicious dApp pairing rather than a phishing flow at sign time.
- **QR-code phishing as an entry vector** — relevant across T4 generally; merits a standalone Technique stub if the QR-specific surface (mobile-wallet UX, malicious WalletConnect QR codes) warrants one.

### Remaining T7 sub-Techniques (post v0.1 expansion)

T7.002 CEX Deposit-Address Layering, T7.003 Cross-Chain Bridge Laundering, and T7.004 NFT Wash-Laundering were delivered at v0.1. Remaining v0.x targets:

- **Privacy-chain hops** (Monero / Zcash routing) — distinct from T7.003 because privacy-chain destinations break on-chain attribution for the privacy-chain hop entirely.
- **DeFi yield-strategy laundering** — deposit as a "yield user", withdraw to a different chain or address.

### Per-Technique calibration / scope refinements

- **OAK-T1.001** — `Maturity: governance-gated` sub-classification for governance-timelocked modifiable fees.
- **OAK-T1.002** — split into per-extension sub-Techniques covering other Token-2022 extensions whose authority semantics differ materially.
- **OAK-T2.002** — extend coverage to cross-chain locked-liquidity setups.
- **OAK-T3.001** — publish reference funder-graph depth and threshold combinations per chain.
- **OAK-T3.002** — publish per-venue calibration for cycle-window and net-flow thresholds.
- **OAK-T3.003** — confidence-band reporting convention.
- **OAK-T5.002** — close the v0.1 calibration gap on window size and cumulative-fraction threshold; promote Reference-implementation status from `gap` to `partial` or `full` once a calibrated detector lands.
- **OAK-T5.003** — split into chain-specific sub-Techniques if detection methodology diverges materially.
- **OAK-T8.001** — publish cluster freshness/decay convention.

### Standalone T6 (Defense Evasion) Techniques

T6.001 Source-Verification Mismatch was delivered at v0.1 as the first standalone T6 Technique. v0.x targets for additional standalone T6 entries: audit-claim mismatch (claimed audit by a firm that did not audit); renouncement-but-not-really (proxy-admin retains control after marketing-claimed renouncement); audit-pending marketing-claim (token marketed as audit-pending where no audit is in progress).

### Per-Technique Data Source backfill

The Data Sources axis (`data-sources/`) was delivered at v0.1 with 12 OAK-DS-NN entries. Per-Technique pages will progressively add explicit `Data Sources:` references in their headers across v0.x updates; v0.1 introduced the axis without backfilling every existing Technique.

---

## v0.5 — multi-implementation matrix and co-maintainers

- Two-dimensional `COVERAGE.md` (Technique × Implementation) with at least three implementations represented (operator-behaviour detectors + protocol-layer monitors + audit-firm continuous-monitoring services).
- Cross-walk between OAK Techniques and OWASP Smart Contract Top 10 categories (`[owaspscstop10]`).
- Invite 2–3 co-maintainers from the contributor community to share PR review load, per the v0.1 commitment in `CONTRIBUTING.md`.
- First retroactive coverage audits — comparing self-attested vendor coverage entries against publicly verifiable evidence.
- Move the per-Technique example bar from "5+ examples in `examples/`" to "≥1 example per Technique." Contributor-paced.
- NFT-specific Techniques.
- Detection-test corpus — labelled-example harness derived from the cited academic datasets.

---

## v1.0 — stable taxonomy

The hard semantic commitment that comes with v1.0:

- The Tactics are stable. New top-level Tactics may be introduced in v2.0+ but not before, and only after community consultation.
- Existing Technique and Group IDs are stable. Deprecated entries are marked `Maturity: deprecated` and remain in the repository with a pointer to the superseding entry. IDs are never reused.
- A canonical machine-readable schema is published alongside the markdown. The v0.1 `tools/oak.json` is treated as a draft until v1.0 promotes it to a stable schema.
- Account abstraction (ERC-4337) coverage.
- Validator / staking / restaking coverage.
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
