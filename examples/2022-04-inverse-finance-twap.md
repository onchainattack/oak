# Inverse Finance TWAP-oracle window-manipulation lending exploit — Ethereum — 2022-04-02

**Loss:** approximately **\$15.6 million** in DOLA, ETH, WBTC, and YFI drained from Inverse Finance's Anchor money market via a TWAP-oracle price-manipulation attack against the INV governance token used as collateral. The attacker manipulated the Uniswap V3 TWAP price of INV over a multi-block window, deposited the inflated INV as collateral at the manipulated TWAP-settled price, borrowed DOLA, ETH, WBTC, and YFI against the inflated collateral value, and exited without repaying. The extraction was a standard collateral-inflation-by-oracle-manipulation lending exploit whose load-bearing surface was specifically the **Uniswap V3 TWAP-oracle window** consumed by the Inverse Finance Anchor lending market's price feed — distinguishing the case from single-block spot-price oracle manipulations (T9.001) and making it the canonical T17.004 anchor for the TWAP-window-concentration sub-shape.

**OAK Techniques observed:** **OAK-T17.004** (TWAP / Time-Window Manipulation Against DAO Treasury / Vesting Math — primary; the attacker concentrated trading volume inside the Uniswap V3 TWAP oracle window consumed by Inverse Finance's Anchor money market, shaping the INV TWAP price into an inflated configuration that the lending market's collateral-valuation math accepted as the settlement reference; the TWAP window — not the input venue — was the load-bearing manipulate surface). **OAK-T9.001** (Oracle Price Manipulation — co-occurring; the spot-price manipulation on the Uniswap V3 INV pool was the upstream T9.001 move; T17.004 is the framing because the TWAP window's time-weighting was what made the inflated price "stick" through the lending market's price-feed consumption). **OAK-T7.001** (Mixer-Routed Hop — the attacker routed proceeds through Tornado Cash).

**Attribution:** **pseudonymous — unattributed.** The attacker operated under a pseudonymous Ethereum address and was not publicly identified at v0.1 cutoff. The extraction pattern — TWAP-window collateral-inflation via concentrated trading inside the TWAP window — is well-characterised in DeFi-security post-mortems.

**Key teaching point:** **A TWAP oracle window converts a single-block price-manipulation move into a multi-block settlement-reference manipulation.** The TWAP window's time-weighting — designed to make the oracle resistant to single-block spot-price manipulation — becomes the manipulation surface itself when the attacker concentrates trading volume across the entire TWAP window. The structural lesson is that a TWAP window is not a silver bullet against oracle manipulation: it shifts the manipulation cost from "move the spot price in one block" to "move the average price across N blocks," and if the attacker's capital exceeds the pool's depth across the window, the TWAP is manipulable.

## Summary

Inverse Finance is a DeFi lending protocol on Ethereum whose Anchor money market accepted the INV governance token as collateral. The Anchor market's price feed for INV consumed a Uniswap V3 TWAP (time-weighted average price) oracle — a standard DeFi oracle design in which the price of an asset is computed as the time-weighted average of trades across a configurable window (typically 30 minutes to 2 hours), with the TWAP window designed to make the oracle resistant to flash-loan-funded single-block spot-price manipulation.

On 2022-04-02, an attacker manipulated the Uniswap V3 TWAP price of INV by concentrating trading volume inside the TWAP window. The attacker bought INV aggressively across the Uniswap V3 INV/ETH pool, driving the spot price upward, and sustained the inflated price across a sufficient number of blocks and a sufficient trading volume such that the TWAP (the time-weighted average across the window) rose to an inflated level. With the TWAP-settled INV price inflated, the attacker deposited INV as collateral into the Anchor money market. The Anchor market's collateral-valuation math consumed the TWAP-settled price, which valued the deposited INV at the manipulated (inflated) price. The attacker then borrowed DOLA (Inverse Finance's stablecoin), ETH, WBTC, and YFI against the inflated collateral value — borrowing substantially more than the INV collateral's true market value. The attacker exited without repaying the borrowed assets, realising the difference between the borrowed amount and the collateral's true value as profit.

The attacker laundered proceeds through Tornado Cash.

The incident was reported by Inverse Finance on 2022-04-02, with a post-mortem published the same day. Inverse Finance paused borrowing on the Anchor money market and subsequently implemented additional oracle safeguards including multi-oracle price feeds and deviation circuit-breakers. The attacker's address and the TWAP-manipulation transaction trace were publicly documented.

The case is the canonical T17.004 anchor for the **TWAP-window-concentration sub-shape**: the manipulator concentrated trading volume inside the downstream contract's TWAP window such that the time-weighted average price was shaped into a configuration favourable to the manipulator at the settlement layer, even though the TWAP window was designed to make the oracle resistant to single-block manipulation.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| Pre-incident | Inverse Finance Anchor money market accepts INV as collateral; price feed consumes Uniswap V3 TWAP oracle | (standing T17.004 surface — TWAP window as settlement reference) |
| 2022-04-02 | Attacker concentrates INV buy volume inside the TWAP window; Uniswap V3 INV TWAP rises to inflated level | **T17.004 (TWAP-window concentration)** |
| 2022-04-02 | Attacker deposits INV as collateral at the inflated TWAP-settled price; borrows DOLA, ETH, WBTC, YFI against inflated collateral value | **T9.001 + T17.004 execution** |
| 2022-04-02 | Attacker exits without repaying; proceeds routed through Tornado Cash | T7.001 (laundering) |
| 2022-04-02 | Inverse Finance publishes post-mortem; pauses Anchor money market borrowing; total loss ~$15.6M | (defender response) |
| Post-incident | Inverse Finance implements multi-oracle price feeds and deviation circuit-breakers | (oracle hardening) |

## What defenders observed

- **The TWAP window was the load-bearing manipulate surface, not the input venue.** The Uniswap V3 INV/ETH pool functioned correctly — it accepted trades at market prices. The TWAP oracle computed the time-weighted average correctly — it faithfully averaged the manipulated trades. The failure was that the Anchor market's collateral-valuation math accepted a single-TWAP-window reference without cross-validating against a second oracle or applying a deviation circuit-breaker that would have rejected the TWAP price when it diverged from spot by more than a configurable threshold.
- **TWAP resistance is a function of pool depth across the window relative to attacker capital.** The attacker's concentrated trading volume inside the TWAP window outran the pool's depth. For a TWAP of duration D and a pool whose depth at the current spot price is L, the attacker needs to sustain a price deviation of Δ across the window; the capital cost is approximately Δ × L × (volume inside window / total pool turnover). When attacker capital exceeds the pool's window-bounded depth, the TWAP is manipulable regardless of the window duration.
- **Multi-oracle cross-validation would have prevented the extraction.** A second oracle (Chainlink, a CEX TWAP, or a multi-venue aggregation) that returned the non-manipulated spot price would have produced a deviation from the manipulated TWAP price; a deviation circuit-breaker comparing the two prices would have rejected the TWAP-settled collateral valuation. Inverse Finance's post-incident safeguards implemented this pattern.

## What this example tells contributors writing future Technique pages

- **T17.004 is the TWAP-window-manipulation class, distinct from T9.001 by load-bearing surface.** T9.001 covers generic oracle-manipulation cases where the input venue is the manipulate surface (flash-loan-funded single-block move, vault-share donation, pull-reporter dispute-window bypass). T17.004 covers cases where the *downstream contract's TWAP window selection* is the load-bearing surface — the manipulation is feasible because the TWAP window is predictable, short relative to the attacker's capital, and consumed without cross-validation. The Inverse Finance April 2022 case is the canonical T17.004 anchor because the TWAP window's time-weighting was what made the inflated price "stick" through the lending market's price-feed consumption.
- **TWAP hardening requires both window-sizing and cross-validation.** Lengthening the TWAP window increases the attacker's capital cost but does not make manipulation impossible — it raises the bar. Cross-validation against a second oracle (Chainlink, multi-venue TWAP, CEX spot) with a deviation circuit-breaker is the canonical mitigation that would have prevented the Inverse Finance extraction.

## Public references

- Inverse Finance. *"April 2nd, 2022 — Anchor Incident Post-Mortem."* 2022-04-02 — the canonical post-mortem documenting the TWAP-oracle manipulation vector and the $15.6M loss figure — `[inversepostmortem2022]`.
- BlockSec. *"Inverse Finance Attack Analysis."* 2022-04 — independent security-researcher analysis of the attack transaction trace — `[blocksecinverse2022]`.
- Rekt. *"Inverse Finance — REKT."* 2022-04 — contemporaneous incident write-up — `[rektinverse2022]`.
- Uniswap. *"Uniswap V3 TWAP Oracle Documentation."* 2021 onward — canonical reference for the Uniswap V3 TWAP oracle design — `[uniswapv3twap]`.
- Cross-reference: T9.001 (Oracle Price Manipulation) at `techniques/T9.001-oracle-price-manipulation.md` — the upstream spot-price manipulation that co-occurs with T17.004; the Inverse Finance case is the canonical example demonstrating the structural distinction between T9.001 (single-block input-venue manipulation) and T17.004 (multi-block TWAP-window concentration).

### Proposed new BibTeX entries

```bibtex
@misc{inversepostmortem2022,
  author = {{Inverse Finance}},
  title = {April 2nd, 2022 — Anchor Incident Post-Mortem},
  year = {2022},
  month = apr,
  note = {Canonical post-mortem documenting the TWAP-oracle price-manipulation attack against the Anchor money market; \$15.6M loss.},
}

@misc{blocksecinverse2022,
  author = {{BlockSec}},
  title = {Inverse Finance Attack Analysis},
  year = {2022},
  month = apr,
  note = {Independent security-researcher analysis of the Inverse Finance TWAP-oracle manipulation transaction trace.},
}
```
