# Rari Fuse TWAP Oracle Window-Manipulation Lending Exploit — Ethereum — 2022-04-30

**Loss:** approximately $80 million across multiple Fuse pools on Rari Capital's Fuse lending protocol. The attacker extracted assets denominated in ETH, USDC, USDT, DAI, FRAX, FEI, and other supported collateral/borrow assets from pools whose price oracles relied on short-duration Uniswap V3 TWAP feeds. The $80M extraction made this the largest TWAP-window-manipulation exploit in DeFi by dollar-loss at the time of the incident.
**OAK Techniques observed:** **OAK-T17.004** (TWAP / Time-Window Manipulation Against DAO Treasury / Vesting Math — the load-bearing vulnerability surface was the TWAP window's short duration; the attacker concentrated manipulation volume inside a TWAP window brief enough to be shaped by flash-loaned capital.) **OAK-T9.001** (Oracle Price Manipulation — composing; the manipulation of the pool-price input during the TWAP window is the T9.001 component of the attack; the TWAP-window-shortness is the T17.004 component that made the T9.001 manipulation economically feasible.) **OAK-T9.002** (Flash-Loan-Enabled Exploit — capital enabler; the attacker used flash loans to acquire the volume needed for pool-price manipulation during the TWAP window.)
**Attribution:** **pseudonymous** attacker; on-chain address publicly identified but not linked to a named individual. No regulatory enforcement action at v0.1.

**Key teaching point:** **The Rari Fuse exploit is the canonical case where the TWAP window's *duration* — not the pool's depth — was the load-bearing vulnerability surface.** A sufficiently long TWAP window would have made the manipulation cost-prohibitive because the attacker would need to sustain the manipulated price across multiple blocks, incurring arbitrageur competition that erodes manipulation capital. The short TWAP window (in some Fuse pools, as brief as a single-digit number of blocks) reduced the manipulation-capital requirement to what a flash loan could supply within a single block. The structural lesson is that **TWAP-window duration is a first-class security parameter**: a short TWAP window is effectively a spot price with extra steps, and closing the surface requires a TWAP window long enough that manipulation capital exceeds flash-loan availability. The case composes T17.004 (window-duration-as-vulnerability) with T9.001 (input-price manipulation) and T9.002 (flash-loan capital); the combined T17.004–T9.001–T9.002 chain is the canonical DeFi-lending TWAP-window-manipulation attack at scale.

## Summary

Rari Capital's Fuse protocol allowed permissionless creation of isolated lending pools, each with customisable parameters including the choice of oracle for asset pricing. Multiple Fuse pools elected to use Uniswap V3 TWAP (time-weighted average price) oracles for pricing collateral and borrow assets. The TWAP window duration was a configurable parameter; several Fuse pools configured short TWAP windows — in some cases, windows spanning only a few blocks — under the assumption that multi-block manipulation was the primary threat and that single-block manipulation would be defeated by TWAP averaging.

On April 30, 2022, an attacker exploited the short TWAP windows across multiple Fuse pools. The attack chain:

1. **Flash-loan capital acquisition.** Attacker took flash loans from multiple sources (Aave, dYdX, Uniswap V3 flash swaps) to acquire the capital base needed for pool-price manipulation.

2. **Pool-price manipulation during the TWAP window.** Attacker deployed the flash-loaned capital to manipulate prices in the Uniswap V3 pools that the Fuse oracles read from. Because the TWAP windows were short (few-block durations), the manipulation volume was concentrated inside a window small enough that the flash-loaned capital, combined with the intra-block price impact, was sufficient to move the TWAP to a manipulated level.

3. **Oracle reports manipulated price.** The Fuse oracles read the manipulated TWAP and reported the distorted price to the Fuse lending pools.

4. **Borrow against inflated collateral / withdraw against distorted valuation.** With the oracle reporting manipulated prices, the attacker borrowed assets against undercollateralised positions or withdrew collateral that the protocol valued at the manipulated price. The extraction was the difference between the true market price of the withdrawn/borrowed assets and the manipulated oracle price at which the protocol extended credit.

5. **Flash-loan repayment.** Attacker repaid the flash loans from the extracted assets, keeping the remainder as profit.

The extraction of approximately $80M made this the largest TWAP-window-manipulation lending exploit in DeFi at the time (surpassing Cream Finance October 2021 at ~$130M total — though Cream's exploit was primarily T9.001 with a TWAP component, while Rari Fuse's was a cleaner T17.004 case because the window duration was the parameter that made the attack feasible).

The case is structurally instructive because the TWAP oracle was *working as designed* — it accurately reported the time-weighted average price over its configured window. The vulnerability was not in the oracle's reporting mechanism but in the *window-duration parameter*: a short window did not provide enough averaging to defeat single-block flash-loan manipulation. The TWAP was functioning correctly; it was simply averaging over a window too short to provide meaningful manipulation resistance.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| pre-2022-04 | Rari Fuse pools deployed with configurable TWAP oracle windows; several pools configured short (single-digit-block) TWAP windows | (standing T17.004 surface) |
| 2022-04-30 | Attacker takes flash loans from Aave, dYdX, and Uniswap V3 to acquire manipulation capital | T9.002 (capital acquisition) |
| 2022-04-30 | Attacker manipulates Uniswap V3 pool prices during the short TWAP window; TWAP oracles report manipulated prices to Fuse pools | **T17.004 + T9.001 (window-manipulation + input-manipulation)** |
| 2022-04-30 | Attacker borrows/withdraws assets at manipulated valuations across multiple Fuse pools; ~$80M extracted | T9.003 (governance/exploit outcome) |
| 2022-04-30 | Flash loans repaid; attacker retains net extraction | T9.002 (capital exit) |
| 2022-Q2–Q3 | Rari Capital post-mortem; Fuse pool oracle parameters reviewed; TWAP window durations extended | (mitigation deployment) |

## Public references

- Rari Capital official post-mortem (April–May 2022)
- BlockSec / Peckshield on-chain transaction analysis
- Rari Capital DAO governance discussions on oracle parameter remediation
- See `techniques/T17.004-twap-window-manipulation.md` for Technique definition

## Discussion

The Rari Fuse case is the canonical T17.004 illustration of the structural distinction between "the oracle was manipulated" (T9.001) and "the oracle worked correctly but the window was too short to provide meaningful manipulation resistance" (T17.004). The Uniswap V3 TWAP oracles in the affected Fuse pools accurately reported the time-weighted average price for their configured windows. The vulnerability was a design-level parameter choice: a TWAP window whose duration is shorter than the capital-acquisition window makes single-block manipulation economically feasible.

The case validates the T17.004 mitigation hierarchy: TWAP-window duration must exceed the maximum flash-loan-available capital divided by the pool's depth-at-manipulation-size. Short TWAP windows are not "a weaker form of TWAP" — they are functionally equivalent to spot prices for any attacker with flash-loan access, and they provide no meaningful manipulation resistance beyond what a spot-price oracle would provide.

The $80M extraction scale makes this the largest lending-protocol TWAP-window-manipulation case in DeFi, and it anchors the T17.004 + T9.001 + T9.002 chain at a dollar-loss magnitude comparable to the Inverse Finance April 2022 case (~$15.6M) and an order of magnitude larger than the Visor Finance December 2021 case (~$500K). The three cases together — Visor (2021, $500K), Inverse Finance (April 2022, $15.6M), Rari Fuse (April 2022, $80M) — define the DeFi TWAP-window-manipulation attack-class spectrum from mid-six-figures to high-eight-figures.
