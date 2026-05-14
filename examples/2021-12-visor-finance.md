# Visor Finance Uniswap V3 TWAP oracle manipulation — Ethereum — 2021-12-21

**Loss:** ~$500K (~193 ETH) extracted from Visor Finance's GAMMA/ETH staking reward contract via a Uniswap V3 TWAP-oracle thin-window manipulation combined with a deposit-redeem arbitrage.

**OAK Techniques observed:** **OAK-T9.001** (Oracle Price Manipulation — primary; the attacker manipulated the Uniswap V3 TWAP oracle that the Visor staking contract consumed for the GAMMA/ETH price feed, executing a thin-liquidity manipulation inside the TWAP window that shaped the staking contract's deposit-value math). **OAK-T17.004** (TWAP / Time-Window Manipulation — structurally adjacent; the attack's load-bearing surface was the TWAP window's shortness relative to the manipulator's capital, allowing a single-block concentrated-liquidity deviation to shape the time-weighted price sufficiently to make the deposit-redeem cycle profitable despite the TWAP buffer). **OAK-T5.002** (Slow LP Trickle / Value Extraction — the extraction mechanism was a deposit-at-distorted-price then redeem-at-true-price cycle against the staking contract, structurally equivalent to an AMM-pool deposit-extract pattern but executed against the staking reward contract's deposit-value logic).

**Attribution:** **pseudonymous** (the attacker address was identified on-chain; the Visor Finance team publicly acknowledged the exploit and published a post-mortem; the attacker's identity was not publicly resolved to a named individual or cluster at v0.1).

**Key teaching point:** **A Uniswap V3 TWAP over a short observation window (e.g., the default ~30-minute TWAP for newly-created pools) is structurally vulnerable to single-block concentrated-liquidity manipulation when the TWAP-consuming contract accepts the TWAP value at face for deposit/redeem math without deviation circuit-breakers.** The Visor case demonstrates that "we use TWAP" is not a sufficient defense — the TWAP window length must exceed the attacker's capital-weighted manipulation horizon, and the consuming contract must enforce deviation bounds against the surrounding period.

## Summary

Visor Finance was a DeFi protocol that provided active liquidity management for Uniswap V3 positions, with a native GAMMA token. The Visor staking reward contract allowed users to deposit GAMMA/ETH Uniswap V3 LP tokens and earn GAMMA rewards. The contract used the Uniswap V3 TWAP oracle to price the GAMMA/ETH LP token for deposit-value calculation.

On December 21, 2021, an attacker:

1. **Manipulated the Uniswap V3 GAMMA/ETH pool price** within a single block by executing a large swap that temporarily skewed the pool's GAMMA/ETH exchange rate, driving the GAMMA-denominated price up sharply.
2. **Deposited into the Visor staking contract** within the same general TWAP observation window while the time-weighted average price still reflected the manipulated price, receiving staking-reward position value calculated against the inflated GAMMA/ETH rate.
3. **Redeemed the staking position** after the TWAP price normalised, extracting the difference between the inflated deposit-value calculation and the true-market redemption value.

The exploit sequence — manipulate input pool → deposit at distorted oracle price → redeem at normalised price — is the canonical T9.001 (oracle manipulation) pattern applied against a Uniswap V3 TWAP-fed staking contract. The T17.004 dimension is that the load-bearing surface was specifically the TWAP window's shortness: a longer TWAP window (or a multi-oracle quorum, or deviation bounds against a surrounding-period reference) would have made the attack uneconomical.

The Visor team acknowledged the exploit and published a post-mortem. The protocol subsequently migrated to a new staking contract with hardened TWAP parameters and deviation circuit-breakers.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2021-12-21 | Attacker manipulates Uniswap V3 GAMMA/ETH pool price; deposits into Visor staking contract at the distorted TWAP price; redeems at normalised price; ~$500K extracted | **T9.001 + T17.004 execution** |
| 2021-12-21 to 12-22 | Visor team acknowledges exploit; publishes post-mortem; pauses staking contract | (protocol response) |
| 2022-Q1 | Visor migrates to new staking contract with hardened TWAP window parameters and deviation circuit-breakers | (mitigation deployment) |

## What defenders observed

- **TWAP window length is the binding constraint on oracle-manipulation resistance.** A short TWAP observation window (the default ~30 minutes for newly-created Uniswap V3 pools) can be shaped by a single-block concentrated-liquidity manipulation when the manipulator's capital sufficiently exceeds the venue's depth-vs-trade-size response at that price level. The Visor case validates that "TWAP" without explicit window-length calibration against the asset's liquidity profile is an incomplete defense.
- **Deviation circuit-breakers at the consuming-contract layer close the surface even when the TWAP window is short.** A consuming contract that compares the current TWAP value to a surrounding-period reference and rejects deposits/withdrawals when the deviation exceeds a calibrated threshold would have defeated the Visor attack regardless of the TWAP window length. Deviation circuit-breakers are the complementary mitigation to TWAP-window lengthening.
- **Staking-contract deposit-value math is an oracle-consuming surface that inherits the oracle's vulnerability surface.** Any contract that accepts a TWAP-derived price as input for deposit-value calculation (staking contracts, lending markets, vault share-issuance contracts) inherits the oracle's vulnerability surface. Pre-deployment audit of oracle-consuming contracts must treat the deposit-at-oracle-price / redeem-at-true-price cycle as a first-class attack vector.

## What this example tells contributors writing future Technique pages

- **Visor Finance is a clean T9.001 + T17.004 dual-classification case.** The primary classification is T9.001 (oracle price manipulation) because the load-bearing surface was the Uniswap V3 TWAP oracle that the Visor staking contract consumed. The T17.004 classification applies because the TWAP window's shortness was the specific property that made the manipulation economically feasible — a longer or randomised TWAP window, or deviation circuit-breakers, would have closed the surface.
- **The case anchors the "TWAP-window shortness as T17.004 surface" sub-shape.** T17.004 covers the specific case where the window-selection / window-settlement primitive (rather than the oracle's input venue) is the load-bearing surface. In Visor, the load-bearing surface was the TWAP window's shortness relative to the attacker's capital — closing T9.001 by adding a TWAP window would not help if the window is too short.
- **The deposit-at-distorted-price / redeem-at-true-price cycle is the canonical extraction pattern for T9.001 + T17.004 dual-classified cases.** The extraction mechanism — deposit into a value-accounting contract at the manipulated TWAP price, redeem at the normalised price — is structurally distinct from swap-directly-against-the-manipulated-pool (the T9.001 single-step pattern) and from cross-venue arbitrage (T17.001).

## Public references

- Visor Finance. *"GAMMA/ETH Staking Contract Exploit Post-Mortem."* December 2021.
- Rekt News. *"Visor Finance — REKT."* December 2021.
- Cross-reference: T9.001 (Oracle Price Manipulation) at `techniques/T9.001-oracle-price-manipulation.md`.
- Cross-reference: T17.004 (TWAP / Time-Window Manipulation) at `techniques/T17.004-twap-window-manipulation.md`.

### Proposed new BibTeX entries

```bibtex
@misc{visorfinancepostmortem2021,
  author = {{Visor Finance}},
  title = {GAMMA/ETH Staking Contract Exploit Post-Mortem},
  year = {2021},
  month = dec,
  note = {~193 ETH (~$500K) extracted via Uniswap V3 TWAP manipulation}
}
```
