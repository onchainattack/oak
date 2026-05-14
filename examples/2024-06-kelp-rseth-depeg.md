# Kelp rsETH liquid-restaking-token depeg — Ethereum L1 — 2024-06

**Loss:** cohort-level depeg loss across rsETH holders and rsETH-collateralised lending positions. The Kelp rsETH LRT traded at a discount to net-asset-value (NAV) following changes in EigenLayer restaking rewards allocation that affected rsETH's underlying asset composition, with the NAV-update cadence lagging the market's price discovery on DEX venues.
**OAK Techniques observed:** **OAK-T14.004** (Liquid Restaking Token Pricing Manipulation — primary; the structural surface was the LRT's DEX-price-to-NAV divergence during the EigenLayer reward-allocation adjustment window, where the rsETH NAV oracle updated on a cadence that lagged the DEX spot price, creating the stale-NAV window that holders and lending-market borrowers were exposed to). **OAK-T14.003.001** (LST/LRT Depeg Cascade — Constrained Primitive — secondary; the depeg propagated through rsETH-collateralised lending positions where the DEX spot price, rather than the redemption-rate-adjusted NAV, determined margin-of-solvency for leveraged borrowers).
**Attribution:** **non-adversarial** — no external attacker. The depeg was a market response to EigenLayer restaking-reward allocation changes that affected rsETH's underlying asset composition; the price divergence was driven by holders rebalancing their LRT exposure in response to the composition change, not by a manipulation event.
**Key teaching point:** **An LRT's NAV-to-DEX-price divergence during restaking-reward allocation changes is a T14.004 surface — the LRT's pricing infrastructure (issuer-reported NAV, DEX spot price, withdrawal-queue redemption rate, and lending-market oracle) updates on four different cadences, and any event that changes the underlying asset composition creates an arbitrage-and-depeg window across those cadences.** The Kelp rsETH depeg demonstrates that T14.004 is not limited to AVS slashing-event foreknowledge or withdrawal-queue gaming — the composition-change-depeg sub-primitive surfaces whenever the LRT's collateral basket changes and the NAV oracle lags the DEX market in reflecting that change.

## Summary

Kelp DAO's rsETH is a liquid restaking token (LRT) on Ethereum that represents restaked ETH (and derivative positions) deposited through EigenLayer. In June 2024, EigenLayer adjusted its restaking rewards allocation parameters, which changed the reward-attribution profile of the underlying AVS positions backing rsETH and other LRTs. The allocation change affected rsETH's underlying asset composition — specifically, the proportion of rsETH's notional value attributable to different AVS yield streams shifted, and holders who had entered rsETH positions based on the prior composition profile rebalanced their holdings.

The key structural mechanism: rsETH's NAV was calculated by Kelp's oracle infrastructure and updated on a periodic cadence. The DEX spot price (rsETH/ETH on Curve, Balancer, and Uniswap V3 pools) discovered the new equilibrium before the NAV oracle updated. This created a stale-NAV window during which rsETH's DEX price traded at a discount to the (not-yet-updated) NAV. Holders selling rsETH on DEX venues during this window received less ETH than the (not-yet-reflected) NAV would imply. Lending-market borrowers with rsETH-collateralised positions whose liquidation thresholds were keyed to DEX-spot oracles (rather than to redemption-rate-adjusted NAV) faced accelerated liquidation risk during the depeg window.

The incident is structurally parallel to the Renzo ezETH depeg (April 2024) — the canonical T14.004 anchor — but with a different proximate trigger: EigenLayer allocation changes rather than airdrop-anticipation disappointment. The unifying structural feature is the LRT's four-component pricing infrastructure (NAV, DEX spot, withdrawal-queue redemption rate, lending-market oracle) whose update cadences diverge during composition-change events, creating the T14.004 extraction surface.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-June 2024 | Kelp rsETH operates on Ethereum with restaked ETH/EigenLayer positions; NAV oracle updates on periodic cadence; rsETH/ETH pools active on DEX venues | T14.004 surface (latent — NAV-to-DEX-price cadence gap is structural) |
| June 2024 | EigenLayer adjusts restaking rewards allocation parameters; rsETH underlying asset composition changes | (trigger event) |
| June 2024 | rsETH DEX spot price begins to diverge from (stale) NAV; holders rebalance | **T14.004** (LRT pricing manipulation — stale-NAV window during composition change) |
| June 2024 | rsETH DEX price trades at discount to NAV; NAV oracle updates on cadence that lags DEX price discovery | **T14.004** (NAV update cadence lag as the enabling surface) |
| June 2024 | rsETH-collateralised lending positions face elevated liquidation risk as DEX-spot-oracle price feeds trigger liquidation thresholds | **T14.003.001** (LRT depeg cascade — DEX spot price propagates to lending-market liquidations) |

## Realised extraction

Cohort-level depeg loss distributed across rsETH holders who sold during the stale-NAV window and rsETH-collateralised borrowers who were liquidated at DEX-spot-oracle prices below the NAV-implied value. No single extraction figure at the scale of the Renzo ezETH cascade (~\$56M); the case is a structural-class illustration — the same T14.004 surface operating through a different proximate trigger (EigenLayer allocation change vs. airdrop disappointment).

## OAK technique classification rationale

T14.004 is the primary classification because the load-bearing surface was the LRT's NAV-to-DEX-price divergence during a composition-change event — the structural T14.004 primitive (LRT pricing infrastructure with diverging update cadences). The composition-change trigger is a distinct T14.004 sub-primitive from the Renzo ezETH case (airdrop-disappointment trigger) and the EigenLayer withdrawal-queue gaming case, but all share the unifying structural feature: the LRT's four-component pricing infrastructure (NAV, DEX spot, withdrawal-queue redemption rate, lending-market oracle) creates arbitrage-and-depeg windows across update-cadence gaps.

T14.003.001 (LST/LRT Depeg Cascade — Constrained Primitive) is the secondary classification because the depeg propagated through rsETH-collateralised lending positions where the DEX spot price, rather than the redemption-rate-adjusted NAV, determined margin-of-solvency for leveraged borrowers. This is the canonical T14.003 sub-case (b) propagation surface — the cascade-amplification through dependent lending venues.

## References

- Kelp DAO rsETH documentation (NAV calculation methodology, oracle update cadence, underlying asset composition)
- EigenLayer restaking rewards allocation parameter documentation (the allocation-change event that triggered the composition shift)
- Steakhouse Financial LRT methodology `[steakhouselrt2024]` — LRT risk-disclosure framework including NAV-calculation and oracle-update-cadence documentation
- Gauntlet restaking-economy analyses `[gauntletrestaking2024]` — LRT collateral-health and NAV-calculation methodology
- See `examples/2024-04-renzo-ezeth-depeg.md` for the canonical T14.004 operational anchor (Renzo ezETH April 2024) and `examples/2024-05-eigenlayer-restaking-airdrop.md` for the broader restaking-cohort context
