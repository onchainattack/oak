# Lido stETH staking-interface phishing cohort — Ethereum — 2022-2023

**Loss:** cumulative estimate across the staking-interface phishing cohort: low-confidence interval ~\$8M, high-confidence interval ~\$25M. Individual incidents range from low-five-figures to mid-six-figures in ETH-equivalent value; no single incident exceeded ~\$2M. The wide interval reflects the distributed nature of phishing campaigns — individual victim losses are aggregated across many small deposits, and victim self-reporting is incomplete.
**OAK Techniques observed:** **OAK-T3.005** (Fake-Validator Staking-Frontend Phishing — the primary technique; the attacker deployed typosquat domains serving cloned Lido staking interfaces and routed deposits to attacker-controlled addresses); **OAK-T4.002** (Spoofed Token Approval — in some campaigns, the fake staking interface requested an ERC-20 `approve()` for stETH or wstETH to an attacker-controlled spender address, enabling a secondary drain of the user's existing staking position).
**Attribution:** **pseudonymous / unattributed (no named individuals publicly identified)**. The phishing campaigns were conducted by a diffuse set of operators; domain-registration records used privacy-shielded WHOIS and temporary registrars. No single operator cluster was identified as responsible for a majority of the campaigns.
**Key teaching point:** **Staking-interface phishing targets the deposit action itself, exploiting users who seek yield on idle ETH. The user connects their wallet, approves a deposit transaction, and the deposited ETH is routed to an attacker-controlled address rather than to Lido's canonical staking contract. The user receives no stETH receipt token, but this is only detectable after the transaction confirms — the extraction has already occurred.**

## Summary

During 2022-2023, a wave of phishing campaigns targeted Lido stETH staking users with fake staking frontends that impersonated the legitimate Lido staking interface (stake.lido.fi). The attacker deployed typosquat domains — lido-stake.com, lidofi.net, lido-staking.org, stakelido.com, and others — and served cloned Lido staking interfaces. The fake frontends displayed a competitive staking APR (often slightly above Lido's current rate to incentivise deposit), presented a staking-deposit flow that mirrored Lido's legitimate interface, and routed the user's ETH deposit to an attacker-controlled address.

The user's mental model was "I am staking ETH on Lido to receive stETH and earn yield." The attacker's extraction mechanism was to replace the deposit-destination address with an attacker-controlled wallet. The user signed a transaction sending ETH to what they believed was Lido's staking contract; in reality, the ETH went to the attacker. The user received no stETH in return, but the absence of the receipt token was only detectable after the transaction confirmed — the extraction was complete at the point of deposit.

In some campaigns, the phishing interface additionally requested an ERC-20 `approve()` for stETH or wstETH to an attacker-controlled spender, enabling a secondary drain of the user's existing staked position (co-occurring T4.002). This escalated the per-victim loss from the deposited-ETH amount to the user's full stETH/wstETH balance.

The campaigns targeted users via search-engine advertisements (Google Ads for "Lido stake ETH," "stETH staking," "Lido staking APR"), social-media links (Twitter/X, Discord, Telegram posts linking to the fake frontend), and direct-message phishing (Discord/Telegram DMs from impersonator "Lido support" accounts directing users to the fake interface). The search-engine-advertisement vector was particularly effective: the sponsored result appeared above Lido's organic search result, and users who clicked the ad without verifying the domain landed on the fake interface.

The phishing wave subsided as (a) Lido published canonical interface URL guidance and community-maintained domain allowlists, (b) Google Safe Browsing and PhishTank flagged the typosquat domains, (c) wallet UIs added domain-verification warnings, and (d) community awareness of staking-interface phishing increased. The structural surface — that a user's browser resolves a domain and the wallet signs a transaction to the address the domain specifies, without cross-referencing either the domain or the destination address against a canonical protocol registry — persists at OAK v0.1.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-12 | Lido becomes the largest ETH staking protocol by TVL; stETH market cap exceeds \$5B | (attacker incentive surface expands) |
| 2022-Q1 to 2022-Q2 | First wave: typosquat domains (lido-stake.com, lidofi.net) appear; Google Ads campaigns for "Lido stake ETH" keywords | T3.005 (staking-interface phishing) |
| 2022-Q3 to 2022-Q4 | Second wave: additional domains (lido-staking.org, stakelido.com); some campaigns add stETH/wstETH approval requests (secondary drain) | T3.005 + T4.002 |
| 2023-Q1 to 2023-Q2 | Community domain-allowlist and Google Safe Browsing flags reduce campaign effectiveness; phishing wave subsides | (defender response) |
| 2023-Q3 onward | Residual campaigns continue at lower volume; wallet-side domain-verification warnings become more common | (ongoing low-level surface) |

## Realised extraction

Cumulative estimate across the staking-interface phishing cohort: low-confidence interval ~\$8M, high-confidence interval ~\$25M in ETH-equivalent value. Individual incident losses range from low-five-figures (\~\$15K-\$50K) to mid-six-figures (\~\$500K); no single incident exceeded ~\$2M. The extraction pattern is distributed — many small deposits to many attacker addresses — making per-incident loss aggregation difficult and producing the wide confidence interval. Victim self-reporting is incomplete; the high-confidence interval includes an estimate for unreported losses.

## References

- Lido canonical interface URL guidance and security advisories (2022-2023).
- Google Safe Browsing and PhishTank domain-reputation records for Lido typosquat domains.
- MetaMask domain-verification and transaction-preview documentation (post-2022).
- Community tracking: Lido Discord/Telegram domain-allowlist threads (2022-2023); Reddit r/ethfinance and r/LidoFinance phishing-warning threads.
- `[lidophishing2022]` — see `citations.bib` (industry reports and community documentation of the Lido staking-interface phishing cohort).
