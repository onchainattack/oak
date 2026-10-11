# EigenLayer restaking airdrop — AVS slashing and cascading-risk context — 2024

**Loss:** **Pre-event surface inventory, not a realised loss.** EigenLayer's EIGEN token launch and "restaking airdrop" to early LRT (Liquid Restaking Token) depositors in 2024 created the largest single cryptoeconomic-security surface on Ethereum: TVL of roughly \$16B before the first claim, peaking just under \$20B (DefiLlama, per The Defiant) in restaked ETH/LSTs simultaneously securing multiple AVSs (Actively Validated Services) through a shared operator set. Combined with the absence of a live slashing history at the time of the airdrop, established the structural conditions for T14.001 (Slashing Condition Exploit) and T14.003 (Restaking Cascading Risk) — a pre-event surface inventory, not a realised incident.
**OAK Techniques observed:** **OAK-T14.001** (Slashing Condition Exploit) — the EigenLayer AVS ecosystem at airdrop represented the largest deployment of on-chain slashing conditions outside of Ethereum's own beacon-chain slashing, making it the primary surface for novel slashing-condition exploitation. **OAK-T14.003** (Restaking Cascading Risk) — the shared-stake graph across EigenLayer AVSs creates the defining T14.003 structural condition: a slash on AVS-A can cascade through shared operators to AVS-B, AVS-C, and the underlying LRTs, whose depeg would propagate to lending markets holding LRTs as collateral.
**Attribution:** **confirmed** — EigenLayer's restaking architecture, AVS ecosystem, LRT integration, and operator-set concentration are publicly documented and verifiable on-chain.

**Key teaching point:** EigenLayer at airdrop is the canonical pre-event T14.001/T14.003 context fixture: the cryptoeconomic-security architecture (shared operator set, LRT wrapping, AVS slashing conditions, lending-market LRT integration) creates the structural surface for cascading slashing risk. The fixture documents the surface characterisation, not an realised exploit — detection is pre-event inventory and runtime monitoring, not post-incident forensics.

**Corrected 2026-10-11:** TVL restated (~\$16B pre-claim, peak just under \$20B), stakedrop timeline fixed (announced 2024-04-29, claims 2024-05-10, season 2 to stakers and operators), and the unsourced operator-concentration claim removed.

## Summary

EigenLayer launched its mainnet restaking protocol in phases through 2023–2024, with the EIGEN token launch and "stakedrop" to restakers (direct and via LRTs) announced on 2024-04-29 and opened for claims on 2024-05-10 (season 1; season 2 followed in September 2024 and went to stakers and node operators). The protocol allows ETH stakers to "restake" their ETH or LSTs (stETH, rETH, cbETH) to secure additional protocols — AVSs — beyond Ethereum's consensus layer, in exchange for additional yield.

The defining T14.003 structural characteristics: (1) the same restaked ETH/LSTs simultaneously secure multiple AVSs, creating a shared-stake graph where a slash on one AVS reduces the security budget of every AVS sharing that operator's stake; (2) LRT protocols (Ether.fi, Renzo, Puffer, Kelp) issue liquid tokens representing restaked positions, creating a depeg risk if the underlying restaked assets are slashed; (3) LRTs are integrated into lending markets (Aave, Compound) as collateral, creating a cascade path: AVS slash → LRT depeg → lending-market liquidation cascade.

Operator-set concentration is a plausible structural risk, but this file does not cite a source quantifying it; treat any claim about how few operators held how much stake as unverified.

## Public references

- `[blockeigen2024]` — The Block, "EigenLayer plans to distribute 86 million tokens to stakeholders in season 2 'stakedrop'" (2024-09-05): <https://www.theblock.co/news/ecosystems/2024-09-05-eigenlayer-plans-to-distribute-86-million-tokens-to-stakeholders-in-season-2-stakedrop-314832>
- `[defiantstakedrop2024]` — The Defiant, "EigenLayer to Drop Token on May 10" (2024-04-30): <https://thedefiant.io/news/defi/eigenlayer-to-drop-token-on-may-10> (stakedrop season 1; eligibility for restakers and LRT holders)
- `[fxstreeteigen2024]` — FXStreet, "EigenLayer to launch airdrop in May following the introduction of the Eigen Foundation" (2024-04-30): <https://www.fxstreet.com/cryptocurrencies/news/eigenlayer-to-launch-airdrop-in-may-following-the-introduction-of-the-eigen-foundation-202404300118>
- `[defianteigen2024]` — The Defiant, "EigenLayer reveals details of second EIGEN stakedrop": <https://thedefiant.io/news/defi/eigenlayer-reveals-details-of-second-eigen-stakedrop> (TVL peak ~\$20B)
