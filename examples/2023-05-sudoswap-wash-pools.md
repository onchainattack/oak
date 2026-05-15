# Sudoswap wash-trade laundering pools — Ethereum — 2023-05 to 2023-10

**Loss:** aggregate laundering volume estimated at **$8-15 million** routed through Sudoswap liquidity pools with self-financed NFT trades during a ~5-month window. The on-chain pattern was: illicit-proceeds-origin wallet deposits ETH into a Sudoswap LP pool as the buy-side leg of an NFT purchase, while the sell-side wallet (controlled by the same operator cluster) receives the ETH as nominally-legitimate NFT-sale proceeds. The NFT itself — typically a low-value or self-minted collection item — acts as the laundering vehicle, with the pool's automated pricing curve absorbing the wash-trade volume.

**OAK Techniques observed:** **OAK-T7.004** (NFT Wash-Laundering — primary; self-financed NFT trades executed through Sudoswap's automated-market-maker pools, where the operator controlled both the buy-side and sell-side wallets, converting illicit proceeds into nominally-legitimate NFT-sale income) + **OAK-T7.001** (Mixer-Routed Hop — the upstream source-of-funds for the buy-side wallet were traced to Tornado Cash withdrawals, providing the cross-reference signal that confirmed the laundering motive) + **OAK-T12.002** (Fake-Mint / Counterfeit Collection — several of the laundering pools used self-minted, single-collection-item NFTs with no organic market; the collection existed solely as the laundering vehicle).

**Attribution:** **pseudonymous** — the operator wallets exhibit funder-graph clustering consistent with a small number of laundering operators. Chainalysis and Elliptic have attributed some of the on-chain patterns to known illicit-cluster continuations (darknet-market vendor wallets, ransomware-affiliate wallets). No named individuals have been publicly attributed at v0.1.

**Key teaching point:** Sudoswap's automated-market-maker pool architecture created a T7.004-laudering surface structurally distinct from conventional NFT-marketplace wash-trading. In a conventional marketplace, a wash trade is a direct transfer (Wallet A sends ETH to Wallet B via the NFT marketplace contract). On Sudoswap, the trade executes through a liquidity pool with an automated pricing curve — the pool itself laundromats the transaction, making the buy-side/sell-side wallet relationship one degree further removed and more similar to legitimate LP-mediated trading. The structural obscurity added by the AMM-pool intermediary layer made T7.004 detection harder on Sudoswap than on conventional order-book NFT marketplaces.

## Summary

Sudoswap is a decentralised NFT marketplace built on an automated-market-maker (AMM) architecture: instead of matching individual buyers and sellers through an order book, users trade NFTs against liquidity pools — collections of paired ETH and NFTs with a bonding curve that determines the price at each point on the curve. Liquidity providers deposit ETH + NFTs into a pool, and traders can buy NFTs from the pool (paying ETH) or sell NFTs to the pool (receiving ETH) according to the curve. Sudoswap launched in mid-2022 and gained adoption through 2023, particularly for floor-NFT trading and collection-level liquidity provision.

The AMM-pool architecture created a T7.004 laundering surface that was structurally distinct from conventional NFT-marketplace wash trading. An operator seeking to launder illicit ETH could:

1. Deploy a Sudoswap pool with a small NFT collection — often a self-minted, single-collection-item NFT with no organic market (a T12.002 counterfeit/fake-mint collection).
2. Deposit ETH from a mixer-withdrawal address (the illicit-proceeds side) as the buy-side leg of an NFT purchase from the pool.
3. Receive the ETH on the sell-side as nominally-legitimate NFT "sale proceeds" — the pool's bonding curve transferred ETH to the LP-provider side, which in the operator-controlled scenario was another wallet in the same cluster.
4. Present the NFT-sale proceeds as legitimate trading income at downstream venues (CEXes, OTC desks, fiat off-ramps), exploiting the social-legitimacy framing of "NFT trader" as distinct from "deposit-address holder."

The operator often repeated this cycle across multiple pools and multiple NFTs, rotating pool deployments and NFT collections to fragment the on-chain trail. The AMM-pool layer added a structural obscurity benefit over conventional wash trading: in a direct-transfer wash trade (Wallet A → Marketplace → Wallet B), the buy-side and sell-side wallets are directly linked. In a Sudoswap-pool wash trade (Wallet A → Pool → Wallet B), the pool contract is the intermediary, making the buy-side/sell-side wallet relationship one degree further removed and more similar in appearance to legitimate LP-mediated trading.

From May to October 2023, Chainalysis and Elliptic documented a cohort of Sudoswap pools exhibiting the laundering signature: buy-side wallet sourced from Tornado Cash or known illicit clusters, NFT collection with no organic trading volume beyond the pool's own activity, sell-side withdrawals clustering with the buy-side operator at the funder-graph level, and downstream deposits at CEXes with "NFT trading" as the stated source-of-funds. The aggregate laundering volume through the identified pools was estimated at $8-15 million.

The pattern was most active during the Q2-Q3 2023 window, corresponding to the post-Tornado-Cash-sanctions period when laundering operators were actively seeking alternative rails. Sudoswap's volume declined through late 2023 as the broader NFT market cooled, reducing the cover-crowd density that made the laundering pools blend into legitimate trading activity — a structural illustration of T7.004's dependency on the legitimate-trading baseline for cover.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-05 to 2023-07 | Operator(s) deploy Sudoswap pools with self-minted NFT collections; pools seeded with ETH from Tornado Cash withdrawals | T7.004 + T12.002 (laundering infrastructure deployment) |
| 2023-05 to 2023-10 | Laundering cycle active: ETH deposited as NFT purchases from operator-controlled pools; ETH withdrawn as "NFT-sale proceeds" to sell-side wallets; proceeds deposited at CEXes | **T7.004 execution (AMM-pool-mediated wash laundering)** |
| 2023-08 | Chainalysis identifies cohort-level laundering pattern in Sudoswap pool activity; flags self-financed pool trades with mixer-withdrawal-source buy-side | (defender-side detection) |
| 2023-10 | Sudoswap volume declines with broader NFT market cooldown; laundering pools become more detectable as legitimate cover-crowd thins | (cover-crowd erosion — T7.004 surface contraction) |
| 2023-10 onward | Forensic vendors (Chainalysis, Elliptic) publish aggregate cohort findings; specific laundered amounts estimated at $8-15M | (forensic publication) |

## Realised extraction

Aggregate laundering volume estimated at $8-15 million across the identified Sudoswap laundering pools. The laundering-volume figure represents the nominal value of self-financed NFT trades used to convert illicit ETH into nominally-legitimate NFT-sale proceeds. Downstream CEX deposits of "NFT trading" proceeds were the terminal off-ramp for a subset of the laundered volume. No recovery was achieved; no operator identities were established.

## Public references

- Cross-reference: T7.004 at `techniques/T7.004-nft-wash-laundering.md`.
- Cross-reference: T12.002 at `techniques/T12.002-counterfeit-nft-impersonation.md`.
- Cross-reference: `examples/2022-01-looksrare-x2y2-wash-trading-cohort.md` — LooksRare/X2Y2 wash-trading cohort (conventional marketplace volume-farming).
- Cross-reference: `examples/2023-02-blur-airdrop-wash-cohort.md` — Blur airdrop incentive-wash cohort (motive-ambiguous framing).
- `[chainalysisnftlaundering2024]` — Chainalysis, "NFT-Based Money Laundering — Sudoswap and AMM-Pool Laundering Patterns" (2024).
- `[ellipticnftwash2024]` — Elliptic, "NFT Wash Trading and Laundering — 2023-2024 Trends" (2024).

## Public References

See citations in corresponding technique file.
