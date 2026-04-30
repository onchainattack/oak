# OAK-M25 — Listing-Time Source-Verification + Audit-Status Gate

**Class:** venue
**Audience:** venue (CEX, DEX aggregator), aggregator (token-data, market-data), launchpad
**Maps to Techniques:** OAK-T1.001, OAK-T1.002, OAK-T1.003, OAK-T1.004, OAK-T1.005, OAK-T2.001, OAK-T2.002, OAK-T2.003, OAK-T2.004, OAK-T6.001, OAK-T6.002, OAK-T6.003, OAK-T6.004

## Description

A pre-listing gating pipeline run by a venue or aggregator before a token, pool, or contract is exposed to user-facing surfaces (DEX-aggregator routing, CEX trading pair, CoinGecko / CoinMarketCap listing, launchpad allocation page). The gate combines four checks that today are typically run in isolation by separate parties: (a) source verification — the deployed bytecode is reproducible from a published source artefact, ideally via Sourcify-style metadata-hash matching rather than block-explorer-side partial-match labelling; (b) bytecode-hash match against any cited audit, so that a `"audited by Firm X"` marketing claim is verified against the firm's machine-readable audit registry rather than echoed as a project-self-claim; (c) audit-status verification with a controlled vocabulary of allowed marketing-claim phrases (`"audit completed"`, `"audit in progress"`, `"engaged with [firm]"`, `"audit pending"`) each of which requires firm-side attestation at the corresponding registry layer; (d) post-listing decay monitoring — the bytecode-hash and authority-surface checks are re-run on a recurring cadence so that a contract that was clean at listing but has since been upgraded via proxy admin or had its authority profile changed loses its `"verified"` UI label.

The defender's framing is that today the listing surface is overwhelmingly a self-attestation surface: a project submits a name, a contract, a marketing description, and a list of audit references, and the venue's verification scope is largely limited to whether the contract trades. OAK-M25 reframes the listing pipeline as the canonical chokepoint for OAK-T1 (Token Genesis), OAK-T2 (Liquidity Setup), and OAK-T6 (Defense Evasion) Techniques, because the listing event is the moment at which an attacker's contract first reaches a trust-bearing UI surface and is the highest-leverage point at which a registry-API-driven check is cheaper than the manual recompile-and-compare exercise it replaces.

The class is `venue` rather than `detection` because the mitigation requires venue-side policy machinery — published listing preconditions, a controlled-vocabulary audit-status taxonomy, a registry-API integration with source-verification and audit-attestation services, and a delisting / label-decay policy — and not merely a detector that emits alerts.

## How it applies

- **OAK-T1.001 (Modifiable Tax Function), OAK-T1.004 (Blacklist / Pausable Weaponization), OAK-T1.005 (Hidden Fee on Transfer):** the source-verification leg of the gate is a precondition to any meaningful static analysis of the transfer-logic path; without bytecode-hash-bound source, a fee-mutability or settable-blacklist analyser is reasoning about a different artefact than the one users will trade against. The gate enforces that the static-analysis pass runs against the deployed bytecode's recompiled source and surfaces fee-mutability / blacklist-presence / asymmetric-fee findings as machine-readable risk attributes.
- **OAK-T1.002 (Token-2022 Permanent Delegate):** the gate checks the Token-2022 extension surface as part of the authority-profile leg; mints with `PermanentDelegate` enabled where the delegate is not on a published trusted-authority allowlist do not pass the listing gate.
- **OAK-T1.003 (Renounced-but-not-Really):** the gate enumerates every authority-bearing role in the deployed bytecode (including the EIP-1967 admin slot directly) before treating any single-role renouncement as conclusive, and refuses listing for proxy-pattern contracts whose proxy-admin path has not been disclosed.
- **OAK-T2.001 (Single-Sided Liquidity Plant):** the gate enforces minimum-quote-depth thresholds as a hard listing precondition, not a heuristic.
- **OAK-T2.002 (Locked Liquidity Spoof), OAK-T2.003 (Cross-Chain Locked Liquidity Spoof):** the gate parses lock-receipt claims against the locker-services registry of legitimate locker-contract addresses with per-chain bytecode hashes, rejects submissions whose lock receipt is on a different chain than the LP itself, and verifies covered fraction / duration / authority before admitting the `"locked"` label.
- **OAK-T2.004 (Initial Liquidity Backdoor):** the gate requires the creation-transaction-trace-derived LP-mint-recipient enumeration as an explicit listing precondition; pools whose creation transaction routes LP supply to addresses outside the announced LP provider, a registry-known locker, or a registry-known custodian do not pass.
- **OAK-T6.001 (Source-Verification Mismatch):** the gate prefers Sourcify-style cryptographic source-verification over block-explorer-side `verified` labels and refuses listing on partial-match-only verification.
- **OAK-T6.002 (Fake Audit Claim):** the gate hits the audit firm's machine-readable registry-verification API at listing time; project-self-claimed `"audited by Firm X"` labels with no registry hit are rejected, and brand-misuse cases are surfaced to the firm.
- **OAK-T6.003 (Audit of Different Bytecode Version):** the gate compares the deployed bytecode hash against the audited-bytecode hash from the firm's registry; for proxy contracts, the audit-vs-current-implementation gap is surfaced explicitly and gates the listing label.
- **OAK-T6.004 (Audit-Pending Marketing Claim):** the controlled-vocabulary leg restricts allowed marketing phrases — `"audit-pending"` requires firm-side engagement attestation; `"exploring audit with [firm]"` is the venue-displayed phrasing where attestation is unavailable; raw project-self-claims of `"audit pending"` do not propagate to the user-warning layer.

## Limitations

- Source-verification coverage is uneven across chains; partial-match-only or unverified bytecode is the dominant case on long-tail chains, and a strict gate would refuse the majority of listings on those venues. The gate can be applied as a label-decay surface (`"verified"` vs `"unverified"`) rather than as a hard listing block on chains where the verified-source coverage rate is low.
- Audit-firm machine-readable registries are not yet a standardised attestation format at v0.1; the gate's audit-attestation leg depends on the firm's registry maturity and on opt-in attestation APIs for engagement-tracking. Where firm-side attestation is unavailable, the absence is itself a surfaceable signal but does not eliminate OAK-T6.002 / OAK-T6.003 / OAK-T6.004.
- The gate is a venue-side mitigation; it does not protect users who interact with a token or pool directly via a wallet without a venue intermediary (peer-to-peer trades, direct router calls). It compresses the attack surface to the venue-bypass path.
- Post-listing decay monitoring requires recurring re-verification cost; venues are likely to apply it at a sampling cadence rather than per-block, leaving a window between authority-profile change and label decay.
- Aggregator-side application (CoinGecko, CoinMarketCap, 1inch, ParaSwap) depends on aggregator policy and on the upstream-data-quality of the venues they aggregate; the gate is most effective when applied at multiple layers in the listing pipeline.

## Reference implementations

- Sourcify — open-source Solidity source-verification service with metadata-hash-bound cryptographic verification, the canonical primitive for the source-verification leg of the gate.
- GoPlus Token Security API — partial coverage of authority-profile and fee-mutability surfaces consumed by some listing pipelines.
- RugCheck (Solana) — partial coverage of authority-profile / mint-authority / freeze-authority surfaces.
- Block-explorer partial-match-vs-full-match labelling (Etherscan, Blockscout family) — the block-explorer-side leg of OAK-T6.001 mitigation.
- MG `mg-detectors-rs` — listing-pipeline integration is a v0.x roadmap item; per-Technique detectors (D01, …) are the upstream feed that an OAK-M25 implementation would consume.

## Citations

- `[torres2019]` — foundational honeypot-detection methodology underpinning the static-analysis leg.
- `[chainalysis2025rug]` — listing-surface scale context for the OAK-T1 / OAK-T2 cluster.
- `[certikfakeaudit]` — fake-audit-claim case material informing the audit-attestation leg.
- `[trmsquid2021]` — SQUID modifiable-fee case; illustrative of the listing-time fee-mutability check.
- `[slowmist2024report]` — 2024 ecosystem report covering listing-surface and project-self-claim attack share.
