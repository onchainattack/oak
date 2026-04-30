# OAK-S13 — RedLine Stealer

**Type:** infostealer
**Aliases:** RedLine, RedLine Infostealer
**Active:** yes (2020-present; intermittent disruption efforts but no confirmed sunset as of 2026)
**First observed:** 2020-03 (early forum advertisements; broadly distributed by mid-2020)
**Used by Groups:** ecosystem-wide / not Group-specific (commodity MaaS; output drops feed into G02 drainer chains and other downstream operators)
**Host platforms:** Windows (primary); cross-platform browser-data targets (Chromium-family, Gecko-family)
**Observed Techniques:** OAK-T11.002, OAK-T4.004, OAK-T4.005

## Description

RedLine Stealer is a commodity Russian-origin information-stealing malware family distributed under a Malware-as-a-Service (MaaS) subscription model, typically advertised at roughly $100–$150 per month with lifetime-licence tiers also reported in underground forum listings. From its 2020 emergence, RedLine became one of the dominant browser-credential and crypto-wallet harvesters in the commodity ecosystem; its output drops — credentials, cookies, autofill data, wallet files — circulate in stealer-log marketplaces and feed downstream operators including drainer crews tracked under OAK-G02.

Operationally, RedLine targets browser-stored credentials and cookies across Chromium- and Gecko-family browsers, locally-stored wallet files (e.g. Electrum, Exodus, Atomic, classic Bitcoin Core wallet.dat), and browser-extension state for popular crypto wallets including MetaMask, Phantom, Trust, TronLink, Coinbase Wallet, and others. The extension-targeting behaviour places it on the OAK-T11.002 surface (wallet-software compromise via stolen extension state / vault files) when output drops are subsequently used to drain victim wallets. The credential-harvesting behaviour places it on OAK-T4.004 / T4.005 (credential theft from user devices, social/credential preconditions for onward operations).

Distribution is primarily via cracked-software lures, malicious advertising, fake game-cheat installers, phishing email attachments, and bundling with other commodity loaders. RedLine is not bound to any single threat group; the same build family appears in operations attributed to dozens of distinct affiliates, and the MaaS panel structure means buyer identity is decoupled from author identity.

## Observed examples

- Stealer-log marketplaces (Russian Market, Genesis pre-takedown, 2tap, and successors) have sold RedLine-origin logs as a categorised product line continuously since 2020. The presence of a `wallets/` or `Wallets/` directory containing browser-extension storage dumps in stealer-log archives is a near-canonical RedLine fingerprint, though not exclusive to RedLine.
- Multiple drainer-chain incidents tracked under OAK-G02 trace the entry vector to a RedLine-origin credential or wallet-extension dump purchased from a stealer-log marketplace; the per-victim attribution is rarely public, but the supply-chain shape (commodity stealer → log marketplace → drainer operator) is the dominant 2022–2025 pattern.
- Operation Magnus and related law-enforcement actions (2024) targeted RedLine infrastructure alongside Meta Stealer; the action disrupted some panels but did not eliminate the family.

## Detection / attribution signals

- Endpoint: characteristic browser-database access patterns (reading `Login Data`, `Cookies`, `Web Data` SQLite files outside the originating browser process); enumeration of well-known browser-extension storage paths for MetaMask (`nkbihfbeogaeaoehlefnkodbefgpgknn`), Phantom, and other wallet IDs.
- Network: command-and-control over plain HTTP / SOAP-style endpoints in earlier builds, later versions moved to TLS with hard-coded SNI patterns; panel URL structures have been catalogued by multiple vendors.
- Output drop format: `_AllPasswords.txt`, `_Cookies/` directories, `Wallets/` subdirectory containing per-extension storage dumps — a distinctive layout that survives in marketplace listings.
- Provenance: presence in cracked-software bundles or game-cheat installers downloaded from low-reputation sources is the dominant infection pathway; SmartScreen / EDR tagging of the dropper rather than RedLine itself is the typical first signal.

## Citations

- `[redlineflashpoint2021]` — Flashpoint primer on RedLine Stealer's MaaS economics and feature matrix. *(NEW citation — see summary.)*
- `[opmagnus2024]` — Operation Magnus 2024 law-enforcement action on RedLine / Meta infrastructure. *(NEW citation — see summary.)*

## Discussion

RedLine sits at the entry point of the dominant 2022–2025 retail-crypto-theft supply chain: commodity stealer → stealer-log marketplace → drainer or manual-cashout operator. Treating RedLine as a single attributable threat actor would be a category error; the MaaS structure means RedLine output is consumed by a long tail of unrelated affiliates and downstream operators, and OAK records it as ecosystem-wide rather than Group-bound.

Lineage: RedLine is part of a Russian-origin commodity-stealer family tree that includes Vidar, Raccoon, Meta, and (post-2022) Lumma (OAK-S14). Code reuse between these families is partial and contested in vendor reporting; OAK does not assert direct lineage between RedLine and Lumma but notes that Lumma's market positioning is widely read as successor-style. Attribution of specific incidents to RedLine — versus a sibling family producing similarly-shaped logs — should be treated as inferred-weak unless dropper-level forensics are available.

The defender's load-bearing observation is that RedLine logs typically reach the wallet-drainer phase **weeks to months** after the initial infection. Cred-rotation and wallet-rotation discipline on suspected-compromised devices is the single highest-leverage control; per-incident attribution to RedLine specifically is rarely the actionable variable.
