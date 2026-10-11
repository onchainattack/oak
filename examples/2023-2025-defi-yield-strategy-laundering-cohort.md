# DeFi yield-strategy laundering via liquidity-provision and staking-as-rail — multi-chain — 2023–2025

**Loss:** structural — DeFi yield-strategy laundering is a *cover volume* rather than a *dollar-extraction* surface. Illicit proceeds deposited into DeFi yield strategies (liquidity provision, staking, lending, yield aggregators) re-emerge as yield-bearing LP tokens or receipt tokens whose on-chain provenance terminates at the protocol contract rather than at the illicit source. The laundering volume is not directly extractable as a single loss figure but is observable at the cohort level through provider-side cross-chain forensic graphs. Chainalysis's 2024 money-laundering report (covering 2023) says illicit funds sent to DeFi grew but attributes that mainly to DeFi's overall growth, and states that DeFi's transparency generally makes it a poor choice for obfuscating fund movement `[chainalysis2024ml]`. The claim that yield-bearing receipt tokens have substituted for mixers as the canonical obfuscation primitive is this file's hypothesis about the mechanism, not a finding of the cited source.
**Corrected 2026-10-11:** the file asserted that Chainalysis documents a dominant post-Tornado-Cash shift to DeFi-mediated laundering; the cited Chainalysis report says otherwise (mixer inflows fell from \$1.0B to \$504.3M, bridge inflows rose, DeFi growth tracked overall DeFi growth), so the trend claims, the "statistically significant shift" claim and the unsourced TRM/Elliptic references were removed.

**OAK Techniques observed:** **OAK-T7.006** (DeFi Yield Strategy Laundering — primary; the DeFi protocol's deposit function converts illicit base-asset inflows into legitimate-protocol receipt tokens, whose on-chain provenance terminates at the protocol contract, and whose subsequent transfer/sale on secondary markets carries the protocol's legitimacy stamp rather than the original inflow's risk profile). **OAK-T7.001** (Mixer-Routed Hop — structurally adjacent; the yield-strategy deposit serves the same obfuscation function as a mixer deposit: break the direct on-chain link between illicit source and clean output. The difference is that a mixer returns the *same asset* after a delay, while a yield strategy returns a *different asset* (LP token, receipt token, staking derivative) that carries the protocol's own provenance). **OAK-T7.003** (Cross-Chain Bridge Laundering — frequently chained; illicit proceeds are bridged to a chain with deep DeFi yield infrastructure before entering the yield strategy, adding a chain-hop to the already-effective receipt-token obfuscation layer) + **OAK-T7.007** (DEX-Aggregator Routing Laundering).

**Attribution:** **unattributed** (per-protocol deposit-side clustering by forensic providers; per-depositor attribution requires off-chain identity resolution beyond the on-chain scope). Forensic providers (Chainalysis, TRM Labs, Elliptic) maintain per-protocol deposit-address attribution and cross-chain forensic graphs that link deposit-side inflows to known illicit clusters; the yield-strategy leg is the terminal on-chain hop before proceeds exit the transparent ledger or enter CEX off-ramp.

**Key teaching point:** **A DeFi protocol's deposit function is a T7.006 surface by architecture, not by operator intent.** The protocol is not complicit — it accepts deposits permissionlessly, as designed. The laundering primitive is the *receipt token*: the depositor's illicit ETH/USDC/other enters the protocol, and the protocol mints an LP token, staking derivative, or yield-bearing receipt whose on-chain provenance is the protocol contract. When that receipt token is later sold, staked, or used as collateral, the downstream counterparty sees a legitimate-appearing DeFi receipt token, not the original illicit inflow. The obfuscation is a property of the deposit-and-receipt architecture, not of any protocol-side action.

## Summary

DeFi protocols operate deposit functions that are permissionless by design: any address can deposit assets and receive receipt tokens (LP tokens, staking derivatives, lending-market cTokens/aTokens, yield-aggregator vault shares) in return. The receipt token's on-chain provenance trace terminates at the protocol's deposit function — the `Transfer` event that created the receipt token was emitted by the protocol contract, not by the illicit source address.

The laundering sequence is:

1. **Illicit proceeds enter a DeFi protocol's deposit function.** The depositor sends USDC, ETH, or another base asset to the protocol's deposit contract. The deposit transaction's `from` address is a known-illicit cluster, but the deposit itself is a standard protocol interaction indistinguishable from legitimate usage.

2. **The protocol mints a receipt token to the depositor's address.** The receipt token (e.g., a Curve LP token, a Lido stETH, an Aave aToken, a Yearn yVault share) has the protocol contract as its `Transfer`-event emitter. Any downstream entity tracing the receipt token's provenance sees the protocol contract, not the illicit source.

3. **The receipt token is deployed as clean capital.** The depositor can: (a) sell the receipt token on a DEX or CEX, (b) use it as collateral in a lending market, (c) stake it in a yield aggregator, (d) bridge it to another chain. Each downstream action carries the receipt token's provenance (protocol-contract-emitted) rather than the original inflow's provenance (illicit-source-address).

4. **The obfuscation is amplified by protocol complexity.** Depositing into a multi-hop yield strategy (e.g., deposit USDC → Curve LP → Convex staking → cvxCRV) produces a receipt token four protocol-hops removed from the illicit inflow. Each hop adds a legitimate-protocol provenance layer that forensic tools must unwind.

The class grew in operational relevance after the Tornado Cash sanctions (OFAC SDN designation, August 8, 2022), which narrowed the mixer-availability surface (T7.001) and drove laundering-cohort migration toward DeFi yield strategies and cross-chain swap protocols (T7.003) as substitute obfuscation rails. Chainalysis's 2024 report instead records mixer inflows falling from \$1.0B (2022) to \$504.3M (2023) and bridge-protocol inflows rising from \$312.2M to \$743.8M, with illicit-to-DeFi flows growing in line with DeFi overall `[chainalysis2024ml]`; it does not identify yield-strategy deposits as the dominant substitute.

Specific protocol-level cases are not named at v0.1 because no single protocol is the primary T7.006 surface — the surface is structural to the DeFi deposit-and-receipt architecture rather than concentrated at any specific protocol. No cited source documents the receipt-token pattern at the cohort level on specific chains; that is unverified.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2021–2022 | DeFi yield infrastructure matures (Curve, Convex, Yearn, Aave, Compound, Lido) | (surface deployment) |
| 2022-08-08 | Tornado Cash OFAC SDN designation narrows T7.001 mixer surface | (laundering-rail shift trigger) |
| 2023 | Chainalysis records mixer inflows down to \$504.3M and bridge inflows up to \$743.8M; DeFi yield-strategy laundering as a distinct trend is not documented in the source `[chainalysis2024ml]` | (context) |

## What defenders observed

- **The deposit-and-receipt architecture is the T7.006 enabling primitive.** Every DeFi protocol that accepts permissionless deposits and mints receipt tokens is a T7.006 surface by construction, regardless of the protocol team's intent or compliance posture. The protocol is not complicit — it is the *instrument*, not the *actor*.
- **Receipt-token provenance is the obfuscation layer, not the deposit transaction.** The deposit transaction's `from` address is the illicit cluster and is visible to forensic tools. The receipt token's provenance (protocol-contract-emitted) is what downstream counterparties see. The laundering is effective because most downstream risk checks track token provenance (contract address, age, volume) rather than deposit-transaction-side cluster attribution.
- **Protocol complexity amplifies the obfuscation.** A single-hop deposit (ETH → stETH) provides one layer of provenance indirection. A multi-hop deposit (USDC → Curve LP → Convex → cvxCRV) provides three. Forensic tools must unwind each hop to attribute the receipt token to its original inflow, and each hop crossed by a protocol upgrade, a proxy re-deployment, or a cross-chain bridge increases the attribution cost.

## What this example tells contributors writing future Technique pages

- **T7.006 is the structural companion to T7.001 and T7.003 in the post-Tornado-Cash laundering ecosystem.** T7.001 (mixer), T7.003 (cross-chain bridge), and T7.006 (DeFi yield strategy) are the three dominant post-2022 laundering rails. T7.005 (privacy-chain hops) is the fourth but operates at a different defender-capability tier.
- **No single named incident is canonical for T7.006 because the surface is architectural, not incident-concentrated.** Contributors writing future T7.006 examples should resist the temptation to name a specific protocol as *the* T7.006 surface — the class is about the deposit-and-receipt architecture that all DeFi protocols share, and naming a single protocol would misrepresent the structural nature of the surface.
- **The Tornado Cash sanctions date (2022-08-08) is the key temporal anchor for T7.006 cohort analysis.** The cited Chainalysis data shows mixer inflows roughly halving between 2022 and 2023 and bridge inflows more than doubling `[chainalysis2024ml]`; no source cited here shows a statistically significant shift toward DeFi yield strategies.

## Public references

- `[chainalysis2024ml]` — Chainalysis, "2024 Crypto Money Laundering" report (2024-02-15): <https://www.chainalysis.com/blog/2024-crypto-money-laundering/>
- Cross-reference: T7.006 (DeFi Yield Strategy Laundering) at `techniques/T7.006-defi-yield-strategy-laundering.md`.
- Cross-reference: T7.001 (Mixer-Routed Hop) at `techniques/T7.001-mixer-routed-hop.md`.
- Cross-reference: T7.003 (Cross-Chain Bridge Laundering) at `techniques/T7.003-cross-chain-bridge-laundering.md`.
- Cross-reference: T7.005 (Privacy-Chain Hops) at `techniques/T7.005-privacy-chain-hops.md`.
