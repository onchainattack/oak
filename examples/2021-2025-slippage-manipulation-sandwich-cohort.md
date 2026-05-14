# Slippage-manipulation sandwich MEV cohort — EVM (primary), Solana — 2021–2025

**Loss:** **Unquantified per-sandwich aggregate.** Individual sandwich extractions range from tens to hundreds of ETH-equivalent for large high-slippage swaps on Uniswap V2/V3 and PancakeSwap; the per-sandwich extraction scales with the victim's authorised slippage band — a 5% slippage tolerance on a $100K swap authorises up to $5K of value to be extracted by an attacker who pushes the pool price to the `amountOutMin` boundary. No single headline-grabbing loss figure anchors the class because the extraction is distributed across thousands of individual sandwiches rather than concentrated in a single incident. EigenPhi bundle-level data records the per-sandwich extraction amounts across the MEV ecosystem.
**OAK Techniques observed:** **OAK-T9.013** (Slippage-Manipulation Sandwich Attack) — canonical anchor case. Distinct from **OAK-T5.004** (Sandwich MEV Extraction) at the *profit-mechanism* level: T5.004 profits from the bid-ask spread of the sandwiched trade; T9.013 profits from the victim's slippage-tolerance parameter — the victim's `amountOutMin` is the attacker's profit boundary. The two Techniques co-occur in practice; the distinguishing signal for T9.013-specific extraction is whether the victim's output amount exactly equals the `amountOutMin` (boundary reached — T9.013) versus exceeding it marginally (standard spread-only sandwich — T5.004).
**Attribution:** **pseudonymous-attacker level.** Known MEV bot addresses (jaredfromsubway.eth and equivalents on Ethereum mainnet) execute slippage-manipulation sandwiches; the bot addresses are on-chain attributable and the sandwich bundles are identifiable at the block-builder layer. The human operator behind the bot address is typically not identified.
**Key teaching point:** The slippage-tolerance parameter — intended as a *protection* against adverse price movement — is the attacker's profit surface. The user who sets a wide slippage tolerance to ensure their trade executes under volatile conditions inadvertently authorises the MEV searcher to extract up to the full slippage band. The wallet-side default-slippage setting and the user-education surface ("your slippage tolerance of X% allows up to Y ETH in extraction") are the load-bearing mitigations for T9.013.

## Summary

Slippage-manipulation sandwich attacks exploit the user-configurable slippage-tolerance parameter on AMM swap transactions. The victim's swap transaction includes `amountOutMin` (the minimum output amount the user will accept) or `sqrtPriceLimitX96` (the price limit for the swap); the difference between the current pool price and the user's limit defines the authorised slippage band. A wide slippage band — chosen by the user to ensure execution under volatile conditions or simply left at the wallet/DEX default — defines a large profit surface for an MEV searcher who can observe the transaction in the mempool.

The attack sequence: (1) the attacker observes a swap transaction in the mempool with a wide slippage tolerance; (2) the attacker front-runs the victim with a trade that moves the pool price to the exact boundary of the victim's `amountOutMin`; (3) the victim's swap executes at the worst-acceptable rate; (4) the attacker back-runs with a trade that unwinds the position at the post-victim-swap price. The attacker's profit is the full slippage band — the victim receives exactly the `amountOutMin` they specified, never more. The victim's "protection" (the minimum output amount) was precisely honoured; the attacker extracted the difference between the pre-front-run fair price and the boundary price.

The pattern is operationally prevalent across Uniswap V2/V3 (Ethereum), PancakeSwap (BSC), and increasingly on Solana via Jupiter DCA/limit-order slippage surfaces. Known MEV bots execute the sandwich at scale; the bot's profit per sandwich scales linearly with the victim's authorised slippage band and the victim's trade size.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020–2021 | MEV sandwich literature characterises the slippage-parameter-as-attack-surface dimension; Uniswap V2 token-deployment wave creates the first operational slippage-manipulation sandwich surface | T9.013 (slippage-band surface) |
| 2021–2025 | jaredfromsubway.eth and equivalent MEV bots execute slippage-manipulation sandwiches on Uniswap V2/V3 at scale; EigenPhi bundle-level data records per-sandwich extraction amounts | T9.013 + T5.004 (spread + band) |
| 2021–2025 | PancakeSwap high-slippage sandwiching on BSC; BSC's transparent mempool and short block times make high-slippage swaps economically attractive targets | T9.013 (BSC surface) |
| 2023–2025 | Solana Jupiter DCA/limit-order slippage surface exploited; MEV searchers target wide-slippage Jupiter orders on Solana; the absence of a public mempool shifts observation to the leader-scheduling layer | T9.013 (Solana surface) |
| 2024–2025 | Wallet-side slippage warnings begin to deploy (MetaMask, Rabby, Phantom); auto-slippage calculation based on pool depth is discussed but not yet standard | (defender-side maturation) |
| Continuing | Slippage-manipulation sandwiches remain an operational MEV extraction pattern across all major AMM chains; wallet-side default-slippage reduction is the highest-leverage per-user mitigation | (ongoing surface) |

## Realised extraction

**Distributed across thousands of individual sandwiches.** Per-sandwich extraction scales with the victim's authorised slippage band: a 5% slippage tolerance on a $100K swap authorises up to $5K in extraction. The aggregate extraction across the MEV ecosystem is material but not concentrated in a single headline-grabbing incident. EigenPhi bundle-level data is the primary source for per-sandwich extraction quantification.

## Public references

See citations in corresponding technique file.

## What this example tells contributors writing future Technique pages

- **The slippage tolerance is the attacker's profit ceiling.** Future T9.013 worked examples should record the victim's authorised slippage band and the attacker's realised extraction as paired values — the extraction should not exceed the band (the victim's `amountOutMin` bounds the attacker's profit), and the extraction approaching the band is the T9.013-specific distinguishing signal.
- **T9.013 and T5.004 co-occur — the distinguishing signal is the extraction-to-band ratio.** A sandwich where the victim's output amount exactly equals the `amountOutMin` is a T9.013 signal; a sandwich where the victim's output amount exceeds the `amountOutMin` reflects a standard T5.004 spread-only extraction. Future worked examples should record both the `amountOutMin` and the victim's realised output amount to distinguish the two.
- **Wallet-side slippage warnings are the load-bearing mitigation.** Future T9.013 mitigation work should focus on wallet-side pre-trade simulation that displays the maximum extractable value at the user's chosen slippage tolerance.

## References

- `[daian2019flashboys]` — Daian et al., "Flash Boys 2.0" (2019): foundational MEV characterisation.
- `[zhou2023sok]` — academic taxonomy covering MEV extraction and slippage-manipulation surfaces.
- EigenPhi bundle-level MEV data (slippage-band sandwich detection and per-sandwich extraction quantification).
- Flashbots MEV-Boost relay data (bundle-level transparency for slippage-manipulation sandwiches).
- Wallet-vendor documentation: MetaMask slippage warnings, Rabby pre-trade simulation, Phantom transaction preview.
