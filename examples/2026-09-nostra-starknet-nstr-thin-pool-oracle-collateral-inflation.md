# Nostra — a token worth \$550K in total was accepted as collateral for \$3.5M of loans after its price moved 8,000× in minutes — Nostra Finance / Starknet — 2026-09-17

**Loss:** **~\$3.5M** borrowed against inflated **NSTR** collateral by a single account, across **ETH, STRK, USDC, USDT, WBTC and DAI**. NSTR's **entire market cap was ~\$550–590K** at the time. ~\$1.92–1.93M was bridged to Ethereum (including 234.57 ETH and 1M DAI); ~2.2M STRK left via NEAR Intents; ~\$1.55M remained on Starknet at last report. Nostra **paused supply, borrow, withdrawal and liquidation**.

**OAK Techniques observed:** **OAK-T9.001** (Oracle Price Manipulation — *primary, confirmed class*. The NSTR price the protocol consumed rose from **~\$0.006 to ~\$49.5 (~8,000×) in minutes**, driven through a **thin NSTR/SolvBTC pool**. See [`techniques/T9.001-oracle-price-manipulation.md`](../techniques/T9.001-oracle-price-manipulation.md)). **Which feed Nostra used for NSTR is not established**: Nostra integrated Chainlink in May 2026 for eight majors but **not NSTR**, and reporting has not clarified whether the NSTR feed came from Pragma, an aggregator, or elsewhere. One analysis states a fake NSTR/SolvBTC pool hijacked **GeckoTerminal's pool-selection logic**; OAK records that as **reported, not confirmed**, pending Nostra's post-mortem.

**Attribution:** **pseudonymous.**

**Key teaching point:** **Borrowable value against a collateral asset must be capped by what that asset can actually be sold for, not by what its price feed says.** No oracle design survives a 6× gap between loan size and total market cap: even a perfectly honest price for NSTR could not have been liquidated into \$3.5M. A **supply cap sized to exit liquidity** on the protocol's own governance token would have bounded this regardless of feed choice. And a feed that can move 8,000× in minutes without a **deviation breaker** refusing to act on it is not a price, it is an input.

## Summary

On **2026-09-17** one account deposited NSTR after its oracle price had been pushed from about \$0.006 to about \$49.5 via a thin NSTR/SolvBTC pool, then borrowed ~\$3.5M across six assets. Funds moved through AVNU, Ekubo and JediSwap; part exited via NEAR Intents and part bridged to Ethereum. Nostra disclosed at **13:28 UTC** and paused the market.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| (standing) | NSTR listed as collateral; feed source undisclosed; no effective deviation bound or cap sized to NSTR liquidity | (latent T9.001) |
| 2026-09-17 | NSTR price pushed ~8,000× through thin NSTR/SolvBTC pool | **T9.001 — oracle-side** |
| 2026-09-17 | ~\$3.5M borrowed (ETH, STRK, USDC, USDT, WBTC, DAI) | **T9.001 — realisation** |
| 2026-09-17 13:28 | Nostra discloses; market paused | (response) |
| 2026-09-18 00:41–02:48 | PeckShield / CertiK: ~\$1.92M on Ethereum, ~\$1.55M still on Starknet | (laundering) |

## What defenders observed

- **The protocol's own token was the weakest collateral it listed.** This is a recurring corpus pattern: governance tokens get listed as collateral for alignment reasons and priced as if they had the liquidity of majors.
- **Loan-to-market-cap is a one-line alarm.** Any single position borrowing more than the collateral token's total market cap is definitionally unliquidatable.

## Public references

- `[cryptotimesnostra2026]` — The Crypto Times, "Nostra Halts Its Starknet Money Market After a \$3.5M NSTR Oracle Exploit. The Token's Entire Market Cap Is Under \$600,000." (2026-09-18): <https://www.cryptotimes.io/2026/09/18/nostra-halts-starknet-money-market-after-3-5m-nstr-oracle-exploit/>
- `[ambcryptonostra2026]` — AMBCrypto, "Nostra hit by \$3.5M Oracle attack as security concerns re-emerge": <https://ambcrypto.com/nostra-hit-by-3-5m-oracle-attack-as-security-concerns-re-emerge-details/>
- `[devtonostra2026]` — DEV Community, "Nostra Finance \$3.5M Exploit: How an 8,000x Oracle Pump Drained a Starknet Money Market" (source of the GeckoTerminal pool-selection claim): <https://dev.to/qanzhi111/nostra-finance-35m-exploit-how-an-8000x-oracle-pump-drained-a-starknet-money-market-2h2l>
