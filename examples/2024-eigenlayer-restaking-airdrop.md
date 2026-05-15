# EigenLayer restaking airdrop — AVS slashing and cascading-risk context — 2024

**Loss:** **Pre-event surface inventory, not a realised loss.** EigenLayer's EIGEN token launch and "restaking airdrop" to early LRT (Liquid Restaking Token) depositors in 2024 created the largest single cryptoeconomic-security surface on Ethereum: ~$15B+ in restaked ETH/LSTs simultaneously securing multiple AVSs (Actively Validated Services) through a shared operator set. The concentration of restaked assets across a small number of node operators, combined with the absence of a live slashing history at the time of the airdrop, established the structural conditions for T14.001 (Slashing Condition Exploit) and T14.003 (Restaking Cascading Risk) — a pre-event surface inventory, not a realised incident.
**OAK Techniques observed:** **OAK-T14.001** (Slashing Condition Exploit) — the EigenLayer AVS ecosystem at airdrop represented the largest deployment of on-chain slashing conditions outside of Ethereum's own beacon-chain slashing, making it the primary surface for novel slashing-condition exploitation. **OAK-T14.003** (Restaking Cascading Risk) — the shared-stake graph across EigenLayer AVSs creates the defining T14.003 structural condition: a slash on AVS-A can cascade through shared operators to AVS-B, AVS-C, and the underlying LRTs, whose depeg would propagate to lending markets holding LRTs as collateral.
**Attribution:** **confirmed** — EigenLayer's restaking architecture, AVS ecosystem, LRT integration, and operator-set concentration are publicly documented and verifiable on-chain.

**Key teaching point:** EigenLayer at airdrop is the canonical pre-event T14.001/T14.003 context fixture: the cryptoeconomic-security architecture (shared operator set, LRT wrapping, AVS slashing conditions, lending-market LRT integration) creates the structural surface for cascading slashing risk. The fixture documents the surface characterisation, not an realised exploit — detection is pre-event inventory and runtime monitoring, not post-incident forensics.

## Summary

EigenLayer launched its mainnet restaking protocol in phases through 2023–2024, with the EIGEN token launch and "restaking airdrop" to LRT depositors occurring in 2024. The protocol allows ETH stakers to "restake" their ETH or LSTs (stETH, rETH, cbETH) to secure additional protocols — AVSs — beyond Ethereum's consensus layer, in exchange for additional yield.

The defining T14.003 structural characteristics: (1) the same restaked ETH/LSTs simultaneously secure multiple AVSs, creating a shared-stake graph where a slash on one AVS reduces the security budget of every AVS sharing that operator's stake; (2) LRT protocols (Ether.fi, Renzo, Puffer, Kelp) issue liquid tokens representing restaked positions, creating a depeg risk if the underlying restaked assets are slashed; (3) LRTs are integrated into lending markets (Aave, Compound) as collateral, creating a cascade path: AVS slash → LRT depeg → lending-market liquidation cascade.

The operator-set concentration: at airdrop, a relatively small number of node operators controlled a disproportionate share of restaked ETH, meaning a single operator's slashing event could affect AVS security across multiple services simultaneously.

## Public references

- EigenLayer protocol documentation: restaking architecture, AVS design, slashing conditions.
- L2Beat / DefiLlama: EigenLayer TVL and operator-set concentration data.
- LRT protocol documentation (Ether.fi, Renzo, Puffer, Kelp): restaking integration and depeg risk.
