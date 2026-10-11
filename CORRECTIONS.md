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
