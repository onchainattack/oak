# Lido stETH staking-interface phishing cohort — Ethereum — 2022-2023

**Loss:** not centrally tabulated; the cohort-level total is unverified. Documented individual losses range from a few stETH (4.5 stETH reported on Lido's research forum, 2023-12) up to one ~\$24M stETH + rETH theft in 2023-09 reported by Crypto.news citing PeckShield.
**OAK Techniques observed:** **OAK-T3.005** (Fake-Validator Staking-Frontend Phishing — the primary technique; lookalike sites impersonating Lido's staking interface); **OAK-T4.002** (Spoofed Token Approval — the documented thefts were carried out by getting the victim to approve stETH/rETH spending to an attacker-controlled address).
**Attribution:** **unattributed** (was "confirmed" until 2026-10-11, which contradicted the next sentence). The phishing campaigns were conducted by a diffuse set of operators; no single operator cluster is identified in the cited sources.
**Key teaching point:** **Staking-interface phishing targets the yield-seeking action itself. The user connects a wallet to a site that looks like Lido and signs what the site presents; in the documented stETH cases the signature was a token approval, so the loss is the victim's whole stETH balance, not just a deposit.**

**Corrected 2026-10-11:** removed unsourced domain names, cohort dollar interval, "no single incident exceeded ~\$2M" (contradicted by the 2023-09 ~\$24M case) and the deposit-address-swap mechanism; the sourced mechanism is approval-based drain.

## Summary

Lido stETH holders have been repeatedly targeted by phishing sites impersonating Lido's staking interface or advertising fake stETH rewards. Researchers and malware-removal vendors have catalogued lookalike domains and fake airdrop pages that ask visitors to connect a wallet and sign; the page then obtains approval over the victim's tokens. Lido's own research forum has a thread (2023-12 onward) of victims who lost stETH this way, where responders attributed the losses to approval of a malicious contract with unlimited stETH access and noted that Lido's contracts were not at fault. Google-Ads-delivered fake versions of Lido and other DeFi sites using a drainer service have also been reported, and in 2024-06 the Ethereum Foundation's update-email account was hijacked to send a fake Lido staking scam (outside this file's date range; no victim loss was reported).

The largest sourced case is the 2023-09 theft from a single holder: per Crypto.news citing PeckShield, a "whale" clicked a malicious link and authorised access to 9,579 stETH (~\$15.6M) and 4,851 rETH (~\$8.5M), ~\$24M in total, in two transactions; the tokens were then swapped to 13,785 ETH and 1.6M DAI, with part of the DAI sent to FixedFloat, OKX and a mixer.

Whether the 2022 start date and the specific wave structure of the original draft are accurate is unverified; no source found here documents a 2022-Q1/Q2 first wave, search-ad volumes, or the claimed WHOIS and Safe Browsing details, so those statements were removed.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-09-07 (reported) | ~\$24M stETH + rETH stolen from one holder via approval phishing (PeckShield per Crypto.news) | T3.005 / T4.002 |
| 2023-12-12 | Forum-reported stETH drains via "Fake_Phishing" approval (e.g. 4.5 stETH) | T4.002 |
| 2024-06 | Ethereum Foundation update email hijacked to promote fake Lido staking site (no loss reported) | T3.005 (adjacent) |

## Public references

- `[lidoforum]` — Lido Governance forum, "Urgent: Scam involving Lido's smart contract - Request for Community and Lido Finance Team Support": <https://research.lido.fi/t/urgent-scam-involving-lidos-smart-contract-request-for-community-and-lido-finance-team-suppor/6145>
- `[investing24m]` — Investing.com (Crypto.news), "Crypto whale losses over \$24m in phishing scam" (2023-09-07): <https://investing.com/news/cryptocurrency-news/crypto-whale-losses-over-24m-in-phishing-scam-3170033>
- `[cointelegraphef]` — Cointelegraph, "Ethereum Foundation email hacked to promote Lido staking phishing scam": <https://cointelegraph.com/news/ethereum-foundation-email-hacked-fake-lido-staking-phishing-scam>
- `[pcriskstaking]` — PCrisk, "LIDO Staking Scam - Removal and recovery steps": <https://www.pcrisk.com/removal-guides/29478-lido-staking-scam>
- `[lidophishing2022]` — see `citations.bib` (industry reports and community documentation of the Lido staking-interface phishing cohort).
