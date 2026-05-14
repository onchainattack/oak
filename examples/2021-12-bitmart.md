# BitMart hot-wallet compromise — Ethereum/BNB Chain — 2021-12-05

**Loss:** approximately $196M (~$100M extracted from BitMart's Ethereum hot wallet, ~$96M extracted from BitMart's BSC hot wallet). The attacker extracted the hot-wallet private key, likely via a 1Password or operational-security compromise at the BitMart operator side.
**OAK Techniques observed:** OAK-T11.001 (Third-Party Signing Vendor Compromise — primary; the likely attack vector was a compromise of BitMart's 1Password vault or operator-side credential store, yielding the hot-wallet private key). OAK-T7.001 (Mixer-Routed Hop — the attacker routed stolen assets through 1inch aggregation swaps into Tornado Cash for laundering). OAK-T5.001 (Hard LP / Treasury Drain — the compromised hot-wallet authority enabled direct extraction of assets from BitMart's hot wallets across two chains).
**Attribution:** pseudonymous; the attacker has not been publicly identified. BitMart CEO Sheldon Xia confirmed the breach and the hot-wallet private-key extraction vector. Partial funds were frozen across exchanges.
**Key teaching point:** A centralised exchange's hot-wallet private-key compromise via an operator-side credential store (1Password, password manager, or equivalent operational-secret management layer) converts an off-chain operational-security failure into a multi-chain on-chain extraction surface. The 1Password-as-attack-vector pattern is distinct from a smart-contract-level T11.001 failure, because the signing-vendor being compromised is the *operator-side secret-management tooling*, not a blockchain-specific custodian — but the Technique classification is structurally identical: signing-authority compromise via a third-party credential vendor.

## Summary

On 2021-12-05, an attacker extracted BitMart's hot-wallet private key — likely via a compromise of the exchange operator's 1Password vault or an equivalent operational credential store — and used the compromised private key to drain approximately $196M in assets from BitMart's Ethereum and BSC hot wallets simultaneously. The Ethereum-side extraction was approximately $100M; the BSC-side extraction was approximately $96M. The attacker then routed stolen assets through 1inch aggregation swaps into Tornado Cash, mixing the proceeds through standard mixer-hop chains.

BitMart CEO Sheldon Xia publicly confirmed the breach and identified the hot-wallet private-key compromise as the root cause. The 1Password compromise vector was widely reported in forensic analyses and industry post-mortems of the period, though BitMart's official statements did not confirm the specific credential-store product. The laundering pattern (1inch → Tornado Cash) was the dominant mixing pathway of the Q4 2021 incident cohort.

BitMart continued operating after the incident, with the exchange absorbing the loss and restructuring its hot-wallet custody architecture. Partial funds were frozen across cooperating exchanges, though the bulk of the extracted proceeds were successfully laundered through Tornado Cash.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-12-04 to 2021-12-05 (pre-event) | Attacker gains access to BitMart's 1Password vault or operational credential store, extracting the Ethereum and BSC hot-wallet private keys | T11.001 (initial access — signing-vendor compromise) |
| 2021-12-05 | Attacker drains ~$100M from BitMart's Ethereum hot wallet | T5.001 (extraction — chain 1) |
| 2021-12-05 | Attacker drains ~$96M from BitMart's BSC hot wallet | T5.001 (extraction — chain 2) |
| 2021-12-05 (within hours) | Attacker routes stolen assets through 1inch aggregation swaps into Tornado Cash | T7.001 (mixer-routed hop) |
| 2021-12-05 | BitMart CEO Sheldon Xia publicly confirms the breach; exchange suspends withdrawals | (operator response) |
| 2021-12-05 onward | Partial fund freezes across cooperating exchanges; BitMart restructures hot-wallet custody architecture | (recovery — partial freeze) |

## Public references

- BitMart official incident statement via CEO Sheldon Xia, December 2021 — `[bitmartpostmortem2021]`.
- PeckShield on-chain trace of the Ethereum and BSC extraction transactions — `[peckshieldbitmart2021]`.
- SlowMist forensic analysis of the 1Password-to-Tornado-Cash attack chain — `[slowmistbitmart2021]`.
- Rekt News public-facing summary — `[rektbitmart2021]`.
- Cross-reference: T11.001 (Third-Party Signing Vendor Compromise) at `techniques/T11.001-third-party-signing-vendor-compromise.md`.
- Cross-reference: T7.001 (Mixer-Routed Hop) at `techniques/T7.001-mixer-routed-hop.md`.
- Cross-reference: T5.001 (Hard LP / Treasury Drain) at `techniques/T5.001-hard-lp-treasury-drain.md`.

## Discussion

BitMart is the largest recorded 1Password / credential-store-compromise incident in the crypto exchange sector and is the canonical worked example for the operator-side-credential-vendor T11.001 sub-pattern — distinct from blockchain-custodian compromise (e.g., Fireblocks, Copper) and wallet-infrastructure compromise (e.g., Venly / Vulcan Forged). The classification as T11.001 is structurally correct because the load-bearing primitives are identical: signing-authority compromise via a third-party credential vendor, with the resulting on-chain extraction being a downstream consequence of the off-chain secret-theft.

The $196M magnitude makes BitMart the second-largest centralised exchange hot-wallet compromise in the 2021 record by dollar value, behind only Poly Network ($611M, though Poly Network was a cross-chain bridge operator, not a CEX). The 1inch → Tornado Cash laundering pathway is the dominant Q4 2021 mixer-hop pattern and recurs across multiple incidents in the same quarter (BadgerDAO December 2021, AscendEX December 2021, Cream Finance October 2021).
