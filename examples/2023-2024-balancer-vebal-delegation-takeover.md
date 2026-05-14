# Balancer veBAL delegation-cluster vote takeover — Ethereum — 2023–2024

**Loss:** directional loss in the low-to-mid seven figures USD-equivalent in misdirected BAL emissions and liquidity-pool incentive allocations. The structural loss was the governance-capture effect: a single delegation cluster acquired effective control over BAL emission direction, redirecting protocol incentives to pools that benefited the controlling entity at the expense of broader protocol health. The dollar value of misdirected emissions is estimated from the BAL-denominated incentive flow redirected to the controlling entity's preferred pools over the capture window.
**OAK Techniques observed:** **OAK-T16.003** (Delegation-Cluster Vote Takeover — primary; a coordinated set of addresses delegated veBAL voting power to a single delegate, creating a voting bloc large enough to control gauge-weight votes and direct BAL emissions). **OAK-T16.001** (Bribe / Vote-Buying Market Exploitation — the delegation cluster was assembled through the Hidden Hand and Votium bribe markets, where protocols paid the delegate to direct BAL emissions to their pools). **OAK-T9.003** (Governance Attack — broadly construed; the delegation-cluster takeover redirected protocol-level economic incentives via the legitimate gauge-weight mechanism without requiring a malicious proposal).
**Attribution:** **protocol-operator-level (identified); no criminal attribution.** The controlling entity was a DeFi protocol operator (publicly identified in governance-forum post-mortems) who used the bribe-market infrastructure to assemble a veBAL delegation cluster large enough to dominate gauge-weight votes for multiple consecutive epochs. The activity was conducted through public governance contracts and bribe-market smart contracts — structurally transparent on-chain but not initially recognised as a governance-capture event by the broader Balancer community.

**Key teaching point:** **The Balancer veBAL delegation takeover demonstrates T16.003 operating through legitimate governance infrastructure — the gauge-weight mechanism, delegation contracts, and bribe markets all functioned as designed. The capture was not a smart-contract exploit (T9.x) or a flash-loan governance attack (T12.005) but a delegation-cluster concentration effect: the economic incentive of BAL emissions was large enough to justify the cost of bribe-market participation, and the resulting delegation concentration exceeded the governance system's implicit decentralization assumption. The structural lesson for T16.003 is that delegation-based voting architectures are vulnerable to economic-incentive capture even when the delegation mechanism itself is technically sound — the capture surface is the distribution of delegation power, not the delegation smart contract.**

## Summary

Balancer is a decentralized exchange and automated portfolio management protocol on Ethereum. Its governance token, BAL, can be locked for veBAL (vote-escrowed BAL), which confers governance voting power and the ability to direct BAL emissions to specific liquidity pools through gauge-weight votes. The veBAL system was designed to align governance power with long-term token holders: the longer the lock duration, the more veBAL voting power a holder receives.

In 2023–2024, the bribe-market ecosystem around veBAL — primarily Hidden Hand and Votium — created a secondary market for gauge-weight voting power. Protocols and liquidity providers could pay veBAL holders (or their delegates) to direct BAL emissions to their pools, effectively "renting" governance power through economic incentives rather than acquiring it through token ownership. The bribe markets were designed to make the veBAL governance system more efficient by allowing liquidity providers to compete for emissions.

The T16.003 delegation-cluster takeover occurred when a single DeFi protocol operator (the "controlling entity") systematically participated in bribe markets across multiple epochs, accumulating a delegation cluster large enough to control the outcome of gauge-weight votes. The controlling entity did not own the underlying BAL; it directed the voting power of veBAL holders who delegated to it in exchange for bribe payments. The concentration of delegation power meant that a single actor could decide which liquidity pools received BAL emissions, effectively capturing the protocol's economic-incentive allocation mechanism.

The capture was structurally transparent — all bribe-market transactions, delegation assignments, and gauge-weight votes were visible on-chain — but the concentration effect was not immediately apparent to the broader Balancer community because the delegation cluster operated through the standard governance interfaces. The capture was identified through governance-forum analysis comparing the expected distribution of gauge-weight votes (proportional to veBAL holdings) with the actual distribution (concentrated through delegation to a single delegate).

The Balancer community responded with governance proposals to mitigate delegation concentration, including discussions of quadratic voting for gauge weights, delegation caps, and bribe-market transparency measures. The incident anchors T16.003's economic-incentive-capture sub-shape within an otherwise-functioning governance system.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021–2022 | Balancer veBAL governance launches; gauge-weight voting directs BAL emissions to liquidity pools | (governance genesis) |
| 2022–2023 | Hidden Hand and Votium bribe markets launch, creating a secondary market for veBAL voting power | T16.001 (bribe-market infrastructure) |
| 2023 | Controlling entity begins systematic bribe-market participation, accumulating delegation cluster | T16.003 (delegation concentration) |
| 2023–2024 | Delegation cluster dominates gauge-weight votes for multiple consecutive epochs; BAL emissions redirected to entity-preferred pools | T16.003 (capture effect) |
| 2024 | Balancer governance forum identifies delegation concentration; proposals for delegation caps and bribe-market transparency discussed | (community response) |

## Realised extraction

Directional loss in the low-to-mid seven figures USD-equivalent in misdirected BAL emissions. The extraction was not a treasury drain (T5) but an incentive-redirection effect — the protocol's economic resources (BAL emissions) were directed to pools that benefited the controlling entity rather than to pools that would have received emissions under a non-concentrated delegation distribution.

## References

- Balancer governance forum — delegation-concentration analysis and mitigation discussions
- Hidden Hand / Votium bribe-market documentation and on-chain analytics
- See `techniques/T16.003-delegation-cluster-vote-takeover.md` for the Technique definition
