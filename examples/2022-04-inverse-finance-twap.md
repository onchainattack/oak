# Inverse Finance TWAP-oracle lending exploit — Ethereum — 2022-04-02

**Loss:** about \$15.6M, comprising 1,588 ETH, 94 WBTC, 4M DOLA and 39.3 YFI, borrowed from Inverse Finance's Anchor money market against inflated INV collateral `[rektinverse]`. Inverse said the attacker borrowed \$15.6M in DOLA, ETH, WBTC and YFI `[forklog]`.
**OAK Techniques observed:** **OAK-T17.004** (TWAP / Time-Window Manipulation — original mapping: the oracle was a TWAP over a thin pool, see below). **OAK-T9.001** (Oracle Price Manipulation — co-occurring; the upstream price move on a thin pool). OAK-T7.001 (original mapping; the sources show Tornado Cash used to fund the attacker beforehand, not proceeds laundering `[rektinverse]`).
**Attribution:** **pseudonymous**; Rekt describes an "anonymous actor" `[rektinverse]`.
**Corrected 2026-10-11:** the manipulated pool was the SushiSwap INV-WETH pair (not Uniswap V3) and the price was moved by a single 500 ETH swap, not sustained volume over a multi-block window; Tornado Cash funded the attacker beforehand rather than laundering proceeds; removed the unsourced post-mortem quotations, "multi-oracle/circuit-breaker" remediation and the Uniswap V3 documentation reference.
**Key teaching point:** **A TWAP oracle over a thinly liquid pool is only as expensive to manipulate as that pool is shallow.** Here a 500 ETH swap moved the INV price about 50x, and the TWAP source fed the Anchor market's price `[rektinverse]` `[redstoneinverse]`.

## Summary

Anchor accepted INV as collateral, and Inverse's oracle, via the Keeper Network, used a SushiSwap TWAP of the INV-WETH pair as its price source `[rektinverse]`. The attacker had withdrawn 901 ETH from Tornado Cash before the attack, swapped 500 ETH for about 1.7k INV through the thin SushiSwap pair (moving the price about 50x), spammed transactions to land first in the next block, deposited the INV (about \$644K at fair price) as collateral and borrowed about \$15.6M `[rektinverse]`. Inverse's own post-mortem, as summarised by RedStone and The Record, blamed the TWAP oracle's sampling method rather than a flash loan or a smart-contract bug; PeckShield attributed the flaw to the Keep3r oracle `[forklog]`.

Inverse paused new Anchor borrows, proposed repaying affected wallets in full and offered the attacker a bounty `[recordinverse]`. Rekt reports Inverse said it was working with Chainlink to launch an INV price feed once liquidity requirements are met, replacing the TWAP oracle `[rektinverse]`.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| Before 2022-04-02 | Attacker withdraws 901 ETH from Tornado Cash; funds 241 addresses via Disperse; deploys five contracts `[rektinverse]` | (setup) |
| 2022-04-02 | 500 ETH swapped into the SushiSwap INV-WETH pair; INV deposited as collateral; about \$15.6M borrowed `[rektinverse]` | **T9.001 / T17.004** |
| 2022-04-02 | Inverse pauses borrowing, offers bounty, proposes repayment `[recordinverse]` | (response) |

## Public references

- `[rektinverse]` — Rekt, "Inverse Finance - REKT" (2022-04-02): <https://rekt.news/inverse-finance-rekt>
- `[redstoneinverse]` — RedStone, "Oracle Attacks #1 — Inverse Finance, \$15M stolen" (2022-08-03): <https://blog.redstone.finance/2022/08/03/oracle-attacks-1-inverse-finance-15m-stolen/>
- `[forklog]` — ForkLog, "Hackers stole more than \$15 million in attack on Inverse Finance lending project": <https://forklog.com/en/news/hackers-stole-more-than-15-million-in-attack-on-inverse-finance-lending-project>
- `[recordinverse]` — The Record, "More than \$15 million stolen after hackers exploit DeFi platform Inverse Finance": <https://therecord.media/more-than-15-million-stolen-after-hackers-exploit-defi-platform-inverse-finance/>
- Cross-reference: T9.001 at `techniques/T9.001-oracle-price-manipulation.md`.
