# Counterfeit-token dust-attack-lure cohort — EVM — 2022–2024 (cohort)

**Loss:** ongoing — structural extraction via fake-symbol-matching token deployments used as dust-attack lures to direct victims toward wallet-drainer phishing infrastructure. No single canonical dollar-extraction anchor at v0.1; the class is documented at the cohort level via ScamSniffer 2022–2024 coverage, commodity drainer-kit infrastructure analysis, and wallet-side token-list curation. This example covers T6.006 sub-class (a): fake-symbol-matching deployment — separate, unrelated contracts sharing the symbol of a legitimate token (USDC, USDT, WETH, WBTC) to induce victim interaction.

**OAK Techniques observed:** **OAK-T6.006** (Counterfeit Token Impersonation — sub-class a: fake-symbol-matching deployment) — primary; counterfeit tokens are deployed with symbols matching major legitimate assets, and small-amount transfers are sent to victim addresses to appear in the victim's transaction history as if they received a legitimate token. The goal is to induce the victim to investigate the token — typically by visiting a phishing site disguised as the token's official dApp, where the victim connects their wallet and signs an approval or transaction that drains their assets. **OAK-T4.003** (Address Poisoning) — structurally adjacent; the counterfeit token's presence in the victim's transaction history exploits the same UX-confusion surface as address-poisoning attacks, where the victim is misled by transaction-history entries that appear to reference legitimate addresses or tokens. **OAK-T4.004** (Allowance / Approve-Pattern Drainer) — downstream; once the victim connects their wallet to the phishing site (having been lured by the counterfeit-token dust transfer), a wallet-drainer kit (Inferno, Angel, MS Drainer, PhishLab) secures an approval or transaction signature that drains the victim's assets.

**Attribution:** **unattributed** Individual counterfeit-token deployer addresses are pseudonymous and typically single-use per campaign. The deployment infrastructure (commodity drainer-kit backends, phishing-site templates, CEX-to-DEX laundering pipelines) is attributable at the infrastructure-cluster layer. ScamSniffer, Etherscan, and BscScan token-list curation operations tag counterfeit deployments at scale but do not attribute individual deployers.

**Key teaching point:** **Counterfeit-token dust-attack lures (T6.006 sub-class a) exploit the wallet UX layer's reliance on symbol-based token identification.** The victim sees a token with symbol "USDC" in their wallet — the symbol matches the legitimate USDC they have transacted with before — and is induced to investigate. The investigation path leads to a phishing site that drains their wallet. The attack succeeds because wallet UIs resolve token identity by symbol rather than by contract address. The mitigation is asset resolution by contract address against a canonical registry (a SAFE-list of known-good token deployments), not by symbol matching.

## Summary

Counterfeit-token dust-attack lures are the most operationally prevalent sub-class of T6.006. The attack pattern:

1. **Deployment.** The attacker deploys a new ERC-20 token contract with a symbol that matches a major legitimate asset — "USDC", "USDT", "WETH", "WBTC", or a popular DeFi token. The contract address is, of course, different from the legitimate token's canonical deployment address.
2. **Dust distribution.** The attacker sends small amounts (dust) of the counterfeit token to thousands or tens of thousands of wallet addresses — often targeting wallets with a history of DeFi activity, high-value holdings, or recent transactions with the legitimate token being impersonated.
3. **Victim discovery.** The victim sees the counterfeit token in their wallet UI. The wallet displays "USDC" with a non-zero balance. Curious, the victim investigates — searching for the token's website, visiting a link embedded in the token's metadata, or interacting with a phishing site that appears in search results for the token's name.
4. **Phishing funnel.** The investigation leads to a phishing site that mimics a legitimate DeFi protocol — a fake airdrop claim, a fake staking dashboard, a fake token migration portal. The victim connects their wallet and signs an approval or transaction.
5. **Drain.** A wallet-drainer kit (Inferno Drainer, Angel Drainer, MS Drainer, PhishLab) uses the signed approval or transaction to drain the victim's assets — all tokens, not just the counterfeit dust.

The attack's structural feature is that the counterfeit token is not the asset of fraud (unlike a T2.x rug-pull token where the token itself is the fraudulent asset). The counterfeit token is a *lure* — a bait that exploits the wallet UX layer's symbol-based token identification to direct the victim into a phishing funnel. The drainer kit that ultimately extracts the victim's assets is the same infrastructure used for non-counterfeit-token phishing campaigns (fake airdrops, fake mints, fake protocol UIs).

The class is detectable at scale:

- **Wallet-side token-list curation.** Wallets that resolve token identity by contract address against a canonical registry (e.g., a SAFE-list of legitimate token deployments maintained by the wallet provider or a third-party curation service) can flag counterfeit tokens before the user sees them. A token with symbol "USDC" whose contract address is not the canonical USDC deployment on that chain should be flagged as "unverified" or "potentially counterfeit."
- **ScamSniffer cohort coverage.** ScamSniffer and similar token-list curation operations tag counterfeit-token deployments at the contract-deployment layer and integrate the tags into wallet and block-explorer UIs.
- **Block-explorer token verification.** Etherscan, BscScan, and equivalent explorers maintain verified-token registries and flag unverified tokens with matching symbols as potential counterfeits.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022 | Fake-symbol-matching dust-attack-lure campaigns begin at scale; commodity drainer-kit infrastructure (Inferno, Angel) supports counterfeit-token deployment as a lure primitive | T6.006 surface present |
| 2022–2023 | ScamSniffer deploys token-list curation and counterfeit-token tagging at the contract-deployment layer; wallet and block-explorer integrations surface tagged-counterfeit warnings | (detection surface maturing) |
| 2023–2024 | Counterfeit-token campaigns continue at scale; Etherscan / BscScan token-list curation matures; per-incident write-ups remain sparse but cohort-level coverage is operational | (ongoing T6.006 surface) |
| 2024 | Inferno Drainer handover (May 2024) surfaces the drainer-kit infrastructure that processes counterfeit-token-lured victims; the infrastructure layer is shared across lure types (counterfeit-token, fake-airdrop, fake-mint) | (infrastructure attribution) |

## What defenders observed

- **The wallet UX layer is the load-bearing failure surface.** The victim sees "USDC" in their wallet and trusts that the token with that symbol is the legitimate USDC they hold. The wallet UI's token resolution by symbol rather than by contract address is what enables the lure. The mitigation is asset resolution by contract address: the wallet should verify that the token's contract address matches the canonical deployment for that symbol on that chain before displaying it as the canonical asset.

- **The counterfeit-token deployment infrastructure is shared with the broader phishing-kit ecosystem.** The same commodity drainer-kit infrastructure (Inferno Drainer, Angel Drainer, MS Drainer, PhishLab) processes victims from all lure types: counterfeit-token dust attacks, fake airdrop campaigns, fake mint sites, fake protocol UIs. The counterfeit-token deployment is a *lure-generation vector*, not a distinct extraction infrastructure. Attribution of counterfeit-token campaigns therefore chains into the broader drainer-kit infrastructure attribution, which is well-documented at the infrastructure-cluster layer through 2022–2024.

- **The detection surface is at the token-list-curation layer, not at the on-chain runtime layer.** Counterfeit token contracts are benign in their transfer logic — they transfer tokens correctly, they don't contain honeypot logic (T1.006), and they don't directly drain victims. The attack happens off-chain (the victim visits a phishing site and signs a transaction). On-chain monitoring of the counterfeit token's transfer events would show only the dust distribution — which is indistinguishable from a legitimate airdrop at the transfer-event layer. The detection surface is at the *identity* layer: is this token's contract address the canonical deployment for its claimed symbol?

- **The class scales with the number of wallets that resolve tokens by symbol.** As wallet UX improves and asset resolution by contract address becomes standard, the counterfeit-token dust-attack lure surface shrinks. The operational prevalence through 2022–2024 reflects that symbol-based token resolution was the wallet UX default; the mitigation is a wallet-level design choice that is increasingly adopted but not yet universal.

## What this example tells contributors writing future Technique pages

- **T6.006 sub-class (a) is the most operationally prevalent sub-class at v0.1.** Counterfeit-token dust-attack lures operate at scale — ScamSniffer tags thousands of counterfeit-token deployments per year, and the victim population is material. The sub-class is documented at the cohort level because per-incident write-ups for individual dust-attack campaigns are sparse relative to the operational volume; the detection surface (wallet-side token-list curation) operates at the batch level rather than the per-campaign level.

- **The counterfeit token is a lure, not the asset of fraud.** This is the structural distinction from T2.x rug-pull tokens (where the token itself is the fraudulent asset) and from T1.006 honeypots (where the token's transfer logic is hostile). In T6.006 sub-class (a), the counterfeit token's transfer logic is benign; the attack is at the identity layer (symbol-based confusion) and the extraction is downstream (phishing-site drainer kit). Worked examples should preserve the lure-vs-asset-of-fraud distinction.

- **The sub-class (a) cohort is the companion to the sub-class (c) Hyperbridge anchor.** T6.006 has three sub-classes: (a) fake-symbol-matching deployment (this cohort example), (b) bridge-impersonation via fake-bridge-token deployment, and (c) bridge-internal-mint via attacker-acquired admin authority (Hyperbridge April 2026). The three sub-classes share the identity-layer attack surface but differ in severity — sub-class (c) is the worst-case shape because the counterfeit is minted by the legitimate bridge contract and is indistinguishable from legitimate at the contract-identity layer. The sub-class (a) cohort is the most operationally prevalent but least severe.

## Public references

- ScamSniffer 2022–2024 counterfeit-token and dust-attack-lure cohort reports.
- Etherscan / BscScan token-list curation and verified-token registry documentation.
- `[chainalysis2025rug]` — cohort framing for rug-pull and counterfeit-token campaigns.
- Inferno Drainer / Angel Drainer / MS Drainer / PhishLab drainer-kit infrastructure analysis; cross-reference `examples/2024-10-inferno-drainer-handover.md` for the shared infrastructure layer.
- Wallet-side asset-resolution-by-contract-address design guidance (MetaMask, Rabby, Rainbow).

## Discussion

T6.006 sub-class (a) is the most operationally prevalent counterfeit-token impersonation surface at v0.1. The class exploits the wallet UX layer's historical reliance on symbol-based token identification — a design default that is gradually being replaced by contract-address-based token resolution. The structural lesson is that **token identity lives at the contract-address layer, not at the symbol layer.** A token with symbol "USDC" whose contract address is not the canonical USDC deployment is a counterfeit, regardless of how faithfully its transfer logic implements the ERC-20 standard.

The sub-class (a) cohort is the companion to the sub-class (c) Hyperbridge April 2026 anchor (`examples/2026-04-hyperbridge-merkle-proof-counterfeit-mint.md`). The two cases bracket T6.006's severity spectrum: sub-class (a) counterfeits are detectable at the wallet/aggregator/venue token-list-curation layer (the contract address is different from the canonical deployment); sub-class (c) counterfeits are detectable only at the bridge-side telemetry layer (the contract address *is* the legitimate one, and the counterfeit is minted by the legitimate contract). The severity scaling with identity-layer-overlap is the defining structural feature of T6.006.

For OAK's broader coverage, the sub-class (a) cohort example establishes the volume/scale dimension of T6.006 — thousands of counterfeit deployments per year, material victim population, wallet-side token-list curation as the operational mitigation. The sub-class (b) bridge-impersonation and sub-class (c) bridge-internal-mint examples establish the severity dimension. Together, the three sub-classes cover T6.006's full operational surface.
