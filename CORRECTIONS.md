# Corrections, Takedowns, and Right-to-Reply

OAK is an open knowledge base that references thousands of public sources — academic papers, federal-court records, regulatory designations, incident post-mortems, audit-firm advisories, industry-forensic write-ups, and on-chain artefacts. We aim to cite only **publicly available** information and to reproduce only what is necessary to support a defender's understanding of the underlying technique. Even with that discipline, at this scale errors and friction are inevitable. This page is the canonical channel for fixing them.

We don't gatekeep this. If you are the source, the subject, or the rights-holder of content referenced in OAK and want it corrected, removed, or contextualised — write to us.

## Who this page is for

You can use this channel if you are:

- **A vendor, audit firm, or research team** whose published work is cited in OAK, and you believe the citation is incorrect (wrong URL, wrong author, wrong date, misattributed claim, wrong scope).
- **An individual or organisation named** in a worked example, threat-actor profile, or technique page, and you believe the naming is inaccurate, the framing is misleading, or you want a correction reflected.
- **A subject of a referenced incident** (a victim organisation, a current employee of one, a legal representative) who wants context added, scope tightened, or sensitive operational detail removed.
- **A copyright holder** of source material we have cited or paraphrased beyond fair use.
- **A researcher or contributor** who has subsequently corrected, retracted, or updated work that OAK cites.
- **Anyone** who finds factual error in OAK content — names, dollar amounts, dates, attributions, technical descriptions.

## What we will do

OAK is committed to:

- **Acknowledge receipt within 3 calendar days.**
- **Substantive response within 7 calendar days** — either with the correction landed, a counter-proposal (if we disagree on what the source actually supports), or a request for additional information.
- **Credit the correction in the relevant page's revision history** unless you ask not to be credited.
- **Document any disagreement transparently** in the relevant page's `Discussion` section, so the disagreement is itself part of the public record. We won't quietly delete a flagged claim and pretend it was never there; we either correct it, qualify it, or document why we kept it.
- **Treat takedown requests in good faith.** If your concern is that the citation reproduces too much of your work, that the framing damages a victim organisation, or that something published in haste should not have been published — we will act on it. The bar for "remove" is lower than the bar for "correct" because OAK's value depends on being a place that respects the people whose material it is built on.

## What we will not do

- **We will not remove citations to public regulatory action** (CISA advisories, OFAC designations, DOJ indictments, court records) at the request of the named party. Public-record references stay.
- **We will not remove a worked example of an incident at the request of the affected party** — but we will tighten scope, add context, correct technical details, and ensure the framing is accurate to what the public record shows.
- **We will not publish information that is not already public** in response to a correction request. If you want context added that requires sourcing non-public information, see `SECURITY.md` for the off-list disclosure channel.
- **We will not act on anonymous takedown demands** that do not identify either the requester or the specific claim being challenged. This is a transparency requirement, not a verification requirement — pseudonymous handles with a verifiable claim of authorship are fine.

## What we ask of you

- **Identify the specific page and claim.** A link to the OAK page (e.g., `techniques/T1.001-modifiable-tax-function.md` or `examples/2025-02-bybit.md`) plus a quote of the disputed text. The more specific, the faster we can act.
- **State what you would like changed**, in plain terms. "Remove this claim", "replace with this corrected text", "add this context", "update this URL".
- **Provide your basis** if you are challenging a factual claim. A correction reference, a public statement, a court filing, an updated audit report, or your own first-hand account if you are the subject.
- **Tell us how to credit the correction** — by name, by handle, anonymously, or with a reference to your published clarification.

## How to reach us

For most cases, **public correction is the fastest path**:

- **GitHub issue** — open one with a `correction:` label prefix in the title. Suitable for citation fixes, naming disputes, scope tightening, and most factual corrections. Public-record artefact, fast turnaround.
- **Pull request** — for corrections you'd like to write yourself. Same process as any other contribution per `CONTRIBUTING.md`. The maintainer will review and merge or comment on scope.

For cases that should not be discussed in public — sensitive incident detail, employer-related concerns, ongoing legal matters — write to:

- **`corrections@onchainattack.org`** (subject prefix: `[OAK-CORRECTION]`).

For information you do **not** want made public at all — non-public attribution, privately-shared incident detail you've subsequently realised should not be in OAK — see `SECURITY.md` for the off-list disclosure channel (`security@onchainattack.org`).

## Public record discipline

Even when a correction is private and the resolution is on-list, OAK maintains a public record that **a correction was applied**. The relevant page's git history and CHANGELOG entry will reflect that a change was made and (where the requester consents) by whom. We do not silently rewrite history. If you require silent removal — e.g., for personal-safety reasons — say so explicitly and we will discuss whether the underlying claim can be removed entirely (rather than corrected) so the page no longer carries the disputed reference at all.

## Why this page exists

OAK aims to be a defender's reference. It is built on the work of investigators, auditors, journalists, court-records, and incident-response teams who don't always get to see their citations land where they expect, or framed the way they would frame it. A standing correction channel — clearly documented, fast, and acted on in good faith — is part of what an open knowledge base owes the people whose work it is built on.

If something on OAK is wrong about you or your work, write to us. We'll fix it.

## Correction log

### 2026-10-11 — 39 unsourced worked examples quarantined

A source pass over the 93 examples dated 2024–2026 that cited nothing (`tools/check_sourcing.py`) found no credible public record for 39 of them. They were moved to the repository's `quarantine/` directory (see its `README.md`), out of the corpus, statistics and site; backlinks, spec fixtures and prose that relied on them were removed or marked. 33 trace to the v0.1 bulk release (`f32645a`). 43 further files described real incidents with wrong facts and were corrected in place (each carries a `**Corrected 2026-10-11:**` line); 11 were confirmed as written.

| Quarantined file | Finding |
|---|---|
| `2024-01-1password-encrypted-note-seed-storage-cohort` | No crypto-theft cohort tied to 1Password; "~45 victims / ~\$8.2M" unsupported (the real cohort is LastPass). |
| `2024-01-astaria-reinitialization` | No reinitialization finding in any public Astaria audit; the "2024 audit" has no record. |
| `2024-01-fake-metamask-extension-chrome-store` | No "MetaMask Labs" extension, 30k installs, \$3.2M or June 2024 takedown; cited reports not found. |
| `2024-01-fake-trezor-suite-download` | No 2024 fake-Trezor-Suite campaign or "~80 victims / \$3.2M". |
| `2024-01-ios-whatsapp-icloud-wallet-backup-cohort` | No WhatsApp-iCloud seed cohort found. |
| `2024-02-dydx-vesting-unlock-dump` | The 150M DYDX unlock was 2023-12-01, not 2024-02; price path does not match. |
| `2024-02-eigenlayer-token-anticipation-phishing` | No early-2024 cohort; the documented EIGEN phishing is the 2024-10-18 X-account hijack. |
| `2024-03-cygnus-finance-read-only-reentrancy` | No record of any Cygnus Finance exploit. |
| `2024-05-eigenlayer-withdrawal-sandwich` | No report; mechanism implausible (withdrawals are an escrow queue, not a swap). |
| `2024-06-bera-chain-fake-airdrop-token-metadata-spoofing` | Berachain airdrop was Feb 2025; no 2024 wave or loss figure. |
| `2024-06-uplift-dao-proxy-upgrade` | No Uplift DAO incident; cited PeckShield report not found. |
| `2024-06-walletconnect-multisig-drain` | No "MEV Shield" campaign, \$480K or 12 multisigs; cited ScamSniffer report not found. |
| `2024-07-gmx-brand-impersonation-fork` | No "GMX Algo Trader", ~\$180K loss or 2024-09-22 exit; cited advisory not found. |
| `2024-08-discord-bookmark-drainer` | No 2024 Discord server-boost campaign or \$2.1M loss; real cases are Pink Drainer 2023 / Inferno 2025. |
| `2024-08-rocket-pool-validator-downtime-outage` | No Aug 2024 correlated-outage incident. |
| `2024-10-ethereum-block-proposer-griefing` | No documented Oct 2024 proposer-griefing campaign. |
| `2024-12-pimlico-erc20-paymaster-permit-cross-chain-replay` | No disclosure or patch found; Pimlico docs and audits silent. |
| `2024-2025-jupiter-dca-solana-twap-oracle-manipulation` | No report; Jupiter DCA has no TWAP oracle to manipulate. |
| `2024-2025-rocket-pool-rpl-staking-phishing-cohort` | No 2024–25 minipool phishing cohort. |
| `2024-2025-swapkit-router-impersonator-phishing` | No SwapKit impersonation cohort. |
| `2024-2026-cross-chain-bridge-observer-signature-scope-audit` | THORChain's own exploit report attributes the 2026-05 loss to a GG20/TSS attack by a node operator, contradicting the file; audit methodology unsourced. |
| `2024-2026-solana-npm-trader-key-exfiltration` | Named packages, C2 overlap and DPRK attribution not found; real Socket reporting names different packages. |
| `2024-chainalysis-laundering-report-aggregator-cohort` | No Chainalysis finding on DEX-aggregator routing or 1inch/0x as top sanctioned routers. |
| `2024-chainalysis-laundering-report-issuer-selection` | No Chainalysis finding on USDT-vs-USDC preference or per-issuer freeze data. |
| `2024-post-tornado-defi-yield-laundering` | No source for Lazarus laundering via Aave/Compound/Lido yield. |
| `2024-Q4-honeypot-token-cohort-cross-chain` | Figures traceable only to one secondary article with inconsistent numbers. |
| `2025-01-bullx-solana-launch-sandwich-cohort` | BullX is a trading terminal; no source for it sandwiching launches. |
| `2025-01-huione-guarantee-fake-cex` | Huione Guarantee is a Telegram marketplace (Elliptic), not a fake CEX; \$1.2B and OFAC claims unsupported. |
| `2025-01-hyperliquid-dex-brand-impersonation-custodial-soft-rug-cohort` | No Hyperliquid-branded copy-trade-bot exit cohort. |
| `2025-01-hyperliquid-trading-bot-malware-campaign` | Named extensions/packages not found; premise conflicts with Hyperliquid API-wallet design. |
| `2025-01-polymarket-us-election-insider-trading-cohort` | Chainalysis found no insider trading in the election whale; win-rate figures unsupported. |
| `2025-01-solana-nft-x-account-drainer-cohort` | 2025 Solana X hijacks pushed tokens, not NFT fake-mints. |
| `2025-03-uniswap-routing-manipulation-phishing` | No Universal-Router calldata routing phishing cohort found. |
| `2025-08-erc4337-paymaster-exploit-cohort` | No Aug 2025 paymaster exploits; paymasters unnamed, \$1.8M unsourced. |
| `2025-10-cyb3rhawk-polymarket-filter-bypass` | No trace of "Cyb3rHawk" or the described bypass. |
| `2026-04-erc4337-paymaster-griefing-mass-bundler-dos` | No April 2026 campaign; appears derived from the Technique description. |
| `2026-04-polymarket-uma-us-iran-ceasefire-vote-capture` | No such market; the real April–July 2026 Iran disputes are different markets with different figures. |
| `2026-bybit-hack-laundering-continuation-thorchain-dprk` | No source for the 2026 laundering-balance estimates; contemporaneous sources show most funds moved within weeks of Feb 2025. |
| `2026-q1-nft-marketplace-wash-trade-fake-mint-cohort` | Generic pattern; no 2026-Q1 incident found. |

### 2026-10-11 — duplicate entries merged

| Retired file | Surviving entry | Note |
|---|---|---|
| `2024-01-socket-bungee-bridge` | `2024-01-socket-bungee` | Same incident filed twice (T9.005 vs T10.002); both mappings were wrong. Surviving entry re-mapped to T9.004 — unvalidated calldata spending users' approvals to SocketGateway. |
| `2024-06-loopring` | `2024-06-loopring-smart-wallet` | Same incident filed twice; the retired copy cited nothing and repeated the ~200-wallet and third-party-2FA errors corrected in the survivor (58 wallets; Loopring's own 2FA servers). |
| `2024-08-ronin-bridge-rescue` | `2024-08-ronin-bridge-upgrade` | Same incident filed twice; the retired copy cited nothing, kept the superseded ungated-upgradeTo / ~80-minute account corrected earlier today, and tagged the MEV bot's front-run as sandwiching (T5.004) and issuer-coordinated laundering (T7.008). |

### 2026-10-11 — second source pass (2022–2023): 28 more examples quarantined

The same check run over the 76 unsourced examples dated 2022–2023. About 40 were corrected or confirmed in place (marked `**Corrected 2026-10-11:**`); 28 had no credible record as described. Nine of those describe a real incident under a wrong mechanism — they are noted below as candidates for a new, sourced entry rather than rewritten to fit.

| Quarantined file | Finding |
|---|---|
| `2023-09-stargate-layerzero-governance-relay-multisig` | No Stargate-specific audit or governance-relay finding; mitigation claims unsupported. |
| `2023-11-pulsechain-fake-audit` | No CertiK or Hacken statement on PulseChain tokens; project counts and \$4–7M total unsourced. |
| `2023-2024-argent-smart-wallet-escape-guardian-vulnerability` | No public "escape guardian" vulnerability; only a 2023 Consensys audit noting escape grace periods. |
| `2023-2024-dao-proposal-snowballing-cohort` | No documented proposal-flood case; cited Tornado Cash and Audius cases were different mechanisms. |
| `2023-2024-layerzero-governance-relay-misconfiguration-audit-cohort` | No Trail of Bits / OpenZeppelin / Spearbit advisories on LayerZero OFT governance relay misconfiguration. |
| `2023-2025-cloud-doc-email-seed-storage-compromise-cohort` | Class is real (LastPass), but the cohort's figures and cited MetaMask/TRM/ZachXBT material are not. |
| `2022-03-nft-proxy-upgrade-rug-cohort` | No named incident; no NFT-collection proxy-upgrade rug found; figures unsourced. |
| `2023-2025-dprk-it-worker-exchange-account-farming` | DPRK IT-worker program is real; the exchange-account-farming specifics and the "Crypto Defenders Alliance" are not. |
| `2023-2025-dprk-post-tornado-cash-aggregator-laundering` | No source that DPRK shifted to DEX aggregators; documented routes are Sinbad/YoMix, bridges, THORChain, eXch, OTC. |
| `2023-05-sudoswap-wash-pools` | The Chainalysis and Elliptic reports it cites could not be found. |
| `2023-09-gitcoin-dao-snapshot-governance-attack` | No record of a Sept 2023 Gitcoin Snapshot Sybil attack. |
| `2022-2024-android-google-drive-wallet-backup-cohort` | Contradicted by Android docs (Drive backups are app-private and E2E-encrypted on Android 9+); no cohort found. |
| `2022-2025-cross-chain-lock-spoof-named-cases` | Titled "named cases" but names none; no source for the pattern or the "low hundreds of millions". |
| `2022-2025-ethereum-validator-ddos-extortion-campaigns` | No reports of DDoS extortion against Ethereum validators; demands, groups, botnets and case unsourced. |
| `2022-09-snapshot-sybil-governance-cohort` | Essay with no named incident; disputes and hardening timeline unverified. |
| `2022-2025-optimism-cross-chain-governance-relay-gap` | Premise contradicted (Optimism governance via Agora; Security Council dates wrong). |
| `2023-01-ledger-donjon-side-channel` | No 2023 Donjon Nano S PIN-extraction research; Donjon's side-channel work was on Trezor. |
| `2023-04-cross-chain-bridge-signature-replay-cohort` | Architecture essay with no named incident; aggregate unsupported. |
| `2023-11-snowdog-dao-avalanche-cross-chain-lock-spoof` | The real SnowdogDAO incident was a ~\$30M Avalanche rug in Nov 2021 with no lock spoof; candidate for a new, sourced entry. |
| `2023-2024-balancer-vebal-delegation-takeover` | No 2023–24 takeover; the documented case is the 2022 "Humpy" veBAL gauge capture — candidate for a new entry. |
| `2022-02-akutar-nft-influencer-rug` | Real incident is different: April 2022 AkuDreams contract bug locked ~11,539 ETH (~\$34M); not an influencer rug — candidate for a new entry. |
| `2022-04-elephant-money-flash-loan-governance-attack` | Real incident (2022-04-12, BNB Chain, ~\$11M) was price manipulation, not a governance attack — candidate for a new entry. |
| `2022-04-rari-fuse-twap-oracle-window-manipulation` | Real incident (Fei Rari Fuse, 2022-04-30, ~\$80M) was reentrancy, not TWAP manipulation — candidate for a new entry. |
| `2022-09-ethereum-pow-fork-replay-cohort` | ETHW used chain ID 10001 from launch; the real replay was the Omni bridge on ETHW — candidate for a new entry. |
| `2023-06-atlantis-loans` | Real incident was a malicious governance proposal on an abandoned protocol spending lingering approvals, not router reentrancy — candidate for a new entry. |
| `2023-04-paribus-diamond-facet-exploit` | Only source describes ~\$100K reentrancy in a forked Compound V2, not an unaudited diamond facet. |
| `2023-2025-fake-crypto-wallet-google-play-app-store-phishing` | Specifics unsourced; documented cases differ (Kaspersky's App Store "FakeWallet", fake Ledger Live for macOS) — candidate for a new entry. |
| `2023-2025-fake-revoke-cash-wallet-security-extension-phishing` | Premise false (Revoke.cash has an official extension); campaigns and \$3.5M+ unsourced; Okta's "ShieldGuard" is a real candidate. |

### 2026-10-11 — further duplicates merged (found in the 2022–2023 pass)

| Retired file | Surviving entry |
|---|---|
| `2022-06-harmony-horizon` | `2022-06-harmony-horizon-bridge` |
| `2022-06-harmony-horizon-economic-incentive-gap` | `2022-06-harmony-horizon-bridge` |
| `2022-12-ankr-abnbc-liquid-staking-exploit` | `2022-12-ankr` |
| `2023-04-hundred-finance` | `2023-hundred-finance-compound-v2-fork-cascade` |
| `2023-04-mev-boost-equivocation` | `2023-mev-boost-equivocation` |
| `2023-12-ledger-connect-kit` | `2023-12-ledger-connect-kit-library-supply-chain-compromise` |

Surviving entries re-mapped where the merge exposed a wrong primary: Harmony T10.005 → T10.001 (two of five multisig keys held by the attacker; FBI attribution to Lazarus); Ledger Connect Kit T11.006 → T15.004 (phished former employee's npm publishing access); Hundred Finance 2023 T9.004 → T9.011 (empty-market donation).

### 2026-10-11 — third source pass (2010–2021): 10 more examples quarantined

The same check over the 84 unsourced examples dated 2010–2021. About 70 were corrected or confirmed in place; 10 had no credible record as described. Pickle Finance 2020 was not checked (search budget) and remains unsourced.

| Quarantined file | Finding |
|---|---|
| `2020-2020-uniswap-honeypot-wave` | The six reports it cites (PeckShield, SlowMist, Mudit Gupta, Token Sniffer, Uniswap, CertiK) could not be found; aggregate and UI-warning dates unsupported. Honeypot tokens themselves are real. |
| `2020-2021-uniswap-fake-token-impersonation-wave` | No source for the \$15–50M aggregate; attribution "confirmed" contradicted its own text. |
| `2020-2025-initial-liquidity-sandwich-cohort` | Mechanism as described is not possible (no buy before liquidity exists); per-launch figures and history unsourced. |
| `2020-2025-mev-sandwich-attack-cohort` | Aggregate and per-class claims unsourced; repeats the doubtful initial-liquidity mechanism. |
| `2021-2025-pancakeswap-token-launch-mev-bsc` | BSC sandwiching is real, but no source for the per-launch ranges, launch counts or start date. |
| `2021-bsc-pancakeswap-token-impersonation-wave` | No source for a 2021 token-impersonation wave, its losses or a June 2021 PancakeSwap UI warning; only phishing-domain waves found. |
| `2021-12-visor-finance` | Real incident is different: 2021-12-21, a deposit() validation flaw in the vVISR rewards contract minted shares (~\$8.2M); not a Uniswap V3 TWAP manipulation — candidate for a new entry. |
| `2011-07-bitcoinica-first-hack` | Impossible as dated: Bitcoinica launched 2011-09-08; the 43,000 BTC figure belongs to the March 2012 Linode loss. |
| `2013-04-atlas-dns-bitcoin-hijack-phishing` | No record of an "Atlas DNS" hijack of blockchain.info or BTC Guild in April 2013 (the known blockchain.info DNS hijack was October 2016). |
| `2015-01-localbitcoins` | No January 2015 LocalBitcoins help-desk incident; known events are a May 2014 server breach and a January 2019 forum phishing. |
| `2023-04-optimism-goerli-cross-chain-replay-incident` | No record of an April 2023 Optimism Goerli transaction replayed on mainnet; OP Mainnet and Goerli used different chain IDs, contradicting the file's premise. |
