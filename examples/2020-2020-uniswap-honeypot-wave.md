# Uniswap honeypot-token wave and serial deployer cluster — Ethereum — 2020 (cohort)

**Loss:** unquantified in aggregate; the 2020 Uniswap honeypot-token wave involved hundreds to low thousands of individual honeypot and high-tax tokens deployed on Uniswap V2 during the "DeFi Summer" and autumn 2020 periods, each extracting small-to-moderate amounts (typically hundreds to low-tens-of-thousands of dollars) from individual buyers. The aggregate extraction across the wave is estimated in the tens of millions of dollars by industry retrospectives but has not been precisely totalled. Individual named examples — YFI impersonator tokens, UNI pre-launch anticipation tokens with honeypot mechanics, and the broader "shitcoin-on-Uniswap" wave — are documented in contemporaneous DeFi-security community analysis (PeckShield, SlowMist, samczsun, Mudit Gupta) and in the pre-audit-era Uniswap listing practice that made permissionless token listing a vector for retail-targeted token-level scams.

**OAK Techniques observed:** **OAK-T1.006** (Honeypot by Design) — primary for the honeypot-token sub-class; tokens deployed with transfer-restriction primitives (maximum-sell-amount, sell-cooldown, whitelist-only-transfer, or buyable-but-not-sellable mechanics) that allowed standard Uniswap `swapExactETHForTokens` purchases but reverted on `swapExactTokensForETH` sales through a combination of `onlyOwner`-gated transfer, maximum-transaction-amount caps, and fee-on-transfer mechanics that consumed the entire sale amount. **OAK-T1.001** (Modifiable Tax/Parameter Function) — a related sub-class deployed tokens with adjustable transfer fees that could be set to 100% post-purchase, converting a standard ERC-20 purchase into a non-sellable position. **OAK-T1.005** (Hidden Fee on Transfer) — tokens deployed with transfer-fee mechanics that were not visible in the Uniswap UI's price-impact display, causing buyers to receive substantially fewer tokens than the quoted amount while the fee was routed to the deployer address. **OAK-T8.001** (Cluster Reuse) — the serial-deployer sub-pattern: on-chain analysis by PeckShield, SlowMist, and independent researchers documented deployer addresses that launched multiple honeypot / high-tax tokens across the 2020 wave, with the same deployer address or funder-graph cluster appearing as the creator of five to fifty-plus tokens across the Uniswap V2 factory. The cluster-reuse signal is operationally available to any defender querying the Uniswap V2 `PairCreated` events grouped by deployer address for the 2020 block window. **OAK-T6.001** (Source-Verification Mismatch) — the deployed tokens either did not publish verified source on Etherscan or published verified source for a standard ERC-20 that omitted the transfer-restriction primitives present in the deployed bytecode; the on-chain bytecode differed from the verified-source claims. **OAK-T4.008** (Fake DEX Clone Frontend Phishing) — secondary, where the honeypot token was promoted through a fake Uniswap or project-specific frontend that displayed manipulated price or liquidity data, though the primary acquisition channel was the token's Uniswap listing itself.

**Attribution:** **pseudonymous** at the individual-deployer level; **characterised-as-class** at the industry-forensic level. Individual honeypot-token deployers operated under pseudonymous Ethereum addresses and were not publicly identified as named individuals. The class-level characterisation — the recognition that the 2020 Uniswap honeypot-token wave constituted a structured operator playbook, not a series of one-off experiments — emerged from forensic-provider analysis (PeckShield, SlowMist, CertiK) and community-defender documentation (Uniswap community warning posts, DeFi-security researcher threads) during and immediately after the 2020 DeFi Summer.

**Key teaching point:** **Permissionless token listing without pre-listing bytecode verification converts the DEX into a retail-facing scam distribution channel.** Uniswap V2's permissionless listing model — any address can deploy a token and create a pool — combined with the 2020 DeFi Summer's wave of retail users who had learned to buy tokens on Uniswap but had not learned to read token-contract bytecode, produced an environment in which honeypot tokens were economically viable to deploy at scale. The structural lesson is that a DEX's listing-permission model and its retail-user-base's token-evaluation literacy are coupled parameters: permissionless listing is safe for a user base that reads bytecode; for a user base that does not, permissionless listing is a scam-distribution surface.

## Summary

The 2020 Uniswap honeypot-token wave was a phenomenon of the "DeFi Summer" (June–September 2020) and the subsequent autumn 2020 period, during which the Ethereum address space on Uniswap V2 filled with tokens whose contracts included transfer-restriction primitives designed to prevent or economically penalise sales. The canonical sub-classes were:

1. **Honeypot-by-design (T1.006):** the token contract's `transfer()` or `_transfer()` function included a conditional that reverted on `swapExactTokensForETH` paths (detecting the Uniswap pair as `msg.sender` and blocking transfers to it, or whitelisting only deployer-controlled addresses as eligible recipients of transfers to the pair). The token appeared to have a normal Uniswap pool with ETH liquidity, but any purchase was irreversible — the buyer could not sell the token back to the pool.

2. **Adjustable-tax / 100%-fee-on-transfer (T1.001 + T1.005):** the token contract included an `onlyOwner`-modifiable fee parameter that defaulted to a normal-looking value (e.g., 0.3%) but could be set to 100% post-purchase, converting any subsequent sell into a full-value transfer to the deployer. The fee mechanism was not visible to Uniswap's front-end price-impact calculation, which quoted swap prices based on the pool's AMM reserves alone without accounting for token-contract-level transfer fees.

Both sub-classes exploited the Uniswap V2 architecture in which the AMM pool contract holds one side of the pair (ETH) and the token contract controls the transfer path on the other side. Uniswap's router has no mechanism to detect or reject token contracts that restrict transfers; the `swap` function succeeds or fails based solely on whether the token contract's `transfer` call reverted. The honeypot-token deployer's innovation was the realisation that the token contract could be programmed to *allow purchases but block sales*, and Uniswap's router would not distinguish this case from a normal token.

Serial deployers amplified the wave's impact. On-chain analysis documented deployer addresses that created five, ten, or fifty-plus nearly-identical honeypot tokens — same contract bytecode, different name/symbol/ticker, deployed in rapid succession — each collecting a few ETH from buyers who assumed the Uniswap-listed token was tradeable because it had a pool and liquidity. The deployer-cluster signal (T8.001) was operationally recoverable in real time: querying `PairCreated` events on the Uniswap V2 factory and grouping by `token0` deployer address would have surfaced the serial deployers as addresses with an anomalous token-creation rate relative to legitimate projects.

The wave subsided as (a) the DeFi-audit ecosystem matured and pre-listing token-bytecode review became standard practice at centralised exchanges, (b) community-side token-scanner projects (Token Sniffer, Honeypot.is, RugDoc) emerged to provide pre-trade honeypot detection, and (c) Uniswap's own front-end began surfacing token-level warnings for contracts with transfer-restriction primitives detectable through simulation. The 2020 honeypot wave is structurally the year-zero event for the T1.006 class; subsequent honeypot token waves on BSC (2021), Solana (2021–2022), and Base (2023–2024) are lineal descendants.

## Timeline (approximate, cohort-scale)

| When | Event | OAK ref |
|---|---|---|
| 2020-05 (Uniswap V2 launch) | Uniswap V2 deploys on Ethereum mainnet; permissionless ERC-20 listing with `createPair()` becomes generally available | (standing T1.006 surface — permissionless listing) |
| 2020-06 to 2020-09 ("DeFi Summer") | DeFi Summer retail-user wave: large numbers of first-time DEX users learn to buy tokens on Uniswap; most have not learned to read token-contract bytecode | (user-base condition) |
| 2020-06 onward | First honeypot tokens appear on Uniswap V2; deployers discover the "buyable-but-not-sellable" transfer-restriction pattern | **T1.006 (honeypot-by-design)** |
| 2020-06 onward | Serial deployers begin launching multiple near-identical honeypot tokens from the same deployer address; funder-graph clusters become visible via `PairCreated` event analysis | **T8.001 (serial deployer cluster)** |
| 2020-07 to 2020-10 | High-tax / adjustable-fee tokens appear; fee-on-transfer mechanics that are not visible in the Uniswap UI's price-impact calculation | **T1.001 + T1.005 (modifiable tax / hidden fee)** |
| 2020-08 to 2020-12 | Community-defender tools emerge: Token Sniffer, Honeypot.is, RugDoc, and DeFi-security researcher threads document the honeypot pattern and begin publishing deployer-cluster analyses | (community-defender response) |
| 2020-09 onward | Uniswap front-end begins surfacing token-level warnings for tokens with transfer-restriction primitives detectable via simulation | (platform-side mitigation) |
| 2021 onward | Honeypot token wave migrates to BSC (PancakeSwap) and subsequently to Solana, Base, and other chains; playbook structurally identical to the 2020 Ethereum Uniswap wave | (cross-chain replication) |

## What defenders observed

- **Permissionless listing + contract-controlled transfer path = token-level scam surface.** The Uniswap V2 architecture cleanly separates the AMM logic (which lives in the pair contract and is trustless) from the token-transfer logic (which lives in the token contract and is fully controlled by the deployer). The pair contract's `swap` function cannot enforce that the token is sellable — it can only call `transfer` on the token contract and revert if the call fails. This is the architectural fact that the honeypot-token pattern exploits. The defender-observable signal is that a token's sellability is a **contract-property** that cannot be determined from pool-level observables (liquidity depth, volume, price) alone and requires token-contract-bytecode-level analysis.
- **Serial-deployer detection via `PairCreated` event grouping is a low-cost, high-signal T8.001 query.** The Uniswap V2 factory emits a `PairCreated(address token0, address token1, address pair, uint)` event for every pool created. Grouping `PairCreated` events by `token0` deployer address (or by the funder address that supplied the ETH to create the pool) surfaces addresses with anomalous token-creation rates — serial honeypot deployers who created dozens of tokens from the same address. This query was operationally available in 2020 and required only an Etherscan-level API call; it did not require a full forensic-provider graph.
- **Uniswap UI's price-impact display did not account for token-contract-level transfer fees.** The Uniswap front-end computed expected swap output from the AMM constant-product formula using on-chain pool reserves. For tokens with a transfer fee — where the token contract's `transfer()` function deducts a percentage from the transferred amount — the actual output was less than the UI-quoted output, and the fee was not visible in the UI's price-impact display. This UI-layer blind spot was a force-multiplier for the T1.005 sub-class.
- **The token-scanner ecosystem emerged as an in-band response to the honeypot wave.** Token Sniffer, Honeypot.is, and RugDoc — all launched or expanded in response to the 2020 Uniswap honeypot wave — implemented simulation-based detection: they simulate a buy-and-sell cycle against the token contract and flag any token where the sell simulation reverts or returns substantially less than expected. This is the canonical M02 (Static-Analysis Pre-Trade) mitigation surface for T1.006 and is the detection methodology that subsequent honeypot-token waves on BSC, Solana, and Base forced token-scanner projects to generalise.

## What this example tells contributors writing future Technique pages

- **T1.006 (Honeypot by Design) is the token-contract-sellability class, not a single mechanic.** The 2020 Uniswap wave included multiple sellability-blocking mechanics: revert-on-sell, maximum-transaction-amount caps set to zero for non-owner addresses, whitelist-only transfers to the pair contract, and fee-on-transfer that consumed 100% of the sale amount. The T1.006 technique page should enumerate these mechanics as sub-classes, all sharing the same defender-observable end-state: the buyer cannot sell. Contributors writing T1.006 examples should specify which sellability-blocking mechanic their case exercises.
- **T8.001 (Cluster Reuse) at the token-deployer level is detectable at DEX-deployment time, not just post-rug.** The `PairCreated` event grouping methodology that surfaced serial honeypot deployers in 2020 is the same methodology that surfaces serial rug-pull deployers in 2021+ — the DEX factory is a standing T8.001 detection surface for any chain with a Uniswap-V2-compatible factory. Contributors writing T8.001 examples should document the specific event and grouping methodology, not just the cluster-attribution outcome.
- **Token-scanner emergence is a worked example of the defender-tooling ecosystem co-evolving with the attack class.** The 2020 wave produced the first generation of token-scanner projects; the 2021 BSC wave forced them to go multi-chain; the 2023–2024 Base wave forced them to handle L2-specific token standards. The co-evolution timeline is itself a valuable data artefact for contributors writing about the relationship between attack-class emergence and defender-tooling deployment cadence.

## Public references

- PeckShield. *"Uniswap V2 Honeypot Token Analysis."* 2020 — forensic-provider analysis of the 2020 honeypot wave including deployer-cluster identification — `[peckshieldhoneypot2020]`.
- SlowMist. *"Analysis of the 2020 DeFi Honeypot Token Wave."* 2020 — forensic-provider analysis with serial-deployer address enumeration — `[slowmisthoneypot2020]`.
- Mudit Gupta. *"How to detect a honeypot token on Uniswap."* 2020 — community-defender methodology thread documenting simulation-based honeypot detection — `[mudithoneypot2020]`.
- Token Sniffer. *Token-scanner documentation and methodology.* 2020 onward — the canonical token-scanner project originating from the 2020 honeypot wave — `[tokensniffer2020]`.
- Uniswap. *"Understanding Honeypot Tokens on Uniswap V2."* 2020 — platform-side educational content responding to the wave — `[unisswaphoneypot2020]`.
- CertiK. *"DeFi Security: The Rise of the Honeypot Token."* 2020 — audit-firm analysis of the honeypot-token class — `[certikhoneypot2020]`.

### Proposed new BibTeX entries

```bibtex
@misc{peckshieldhoneypot2020,
  author = {{PeckShield}},
  title = {Uniswap V2 Honeypot Token Analysis},
  year = {2020},
  note = {Forensic-provider analysis of the 2020 Uniswap honeypot-token wave and serial-deployer clusters.},
}

@misc{slowmisthoneypot2020,
  author = {{SlowMist}},
  title = {Analysis of the 2020 DeFi Honeypot Token Wave},
  year = {2020},
  note = {Forensic-provider analysis with serial-deployer address enumeration.},
}

@misc{mudithoneypot2020,
  author = {{Mudit Gupta}},
  title = {How to detect a honeypot token on Uniswap},
  year = {2020},
  note = {Community-defender methodology for simulation-based honeypot detection.},
}

@misc{tokensniffer2020,
  author = {{Token Sniffer}},
  title = {Token-scanner documentation and methodology},
  year = {2020},
  note = {Canonical token-scanner project; simulation-based honeypot and transfer-restriction detection.},
}
```
