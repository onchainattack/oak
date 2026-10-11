# EigenLayer Restaking Deposit Caps and the ezETH Discount Depeg — Ethereum L1 — 2024

**Loss:** structural — no aggregate figure is sourced. The documented price event is Renzo's ezETH falling 18.3% to about \$2,642 within minutes on 2024-04-24 after the REZ token distribution plan was announced (The Block), a discount to ETH, not a premium. The earlier ~\$340M liquidation figure in the findings is not confirmed by the sources reviewed and is not asserted here.

**OAK Techniques observed:** **OAK-T14.004** (Liquid Restaking Token Pricing Manipulation / Depeg — the ezETH discount is a DEX price diverging sharply from NAV under an exit rush; the mechanism was a tokenomics-announcement-driven sell-off, not an attacker). **OAK-T14.003** (Restaking Cascading Risk — retained as filed; the sources reviewed do not document a cascade through lending markets, so this is weakly supported).

**Attribution:** **unattributed** — EigenLayer protocol parameters and LRT user behaviour. No adversary.

**Corrected 2026-10-11:** Removed the unsourced mechanism that deposit caps created a premium-to-NAV which collapsed on cap raises, along with invented 5–15% premium figures; replaced with the sourced facts: EigenLayer temporarily uncapped LST deposits in February 2024 and removed LST caps on 2024-04-16, and ezETH depegged by a discount (−18.3%) on 2024-04-24 after the REZ airdrop announcement.

**Key teaching point:** **A liquid restaking token's DEX price can detach from NAV in minutes when holders rush for the exit, and thin liquidity turns a tokenomics announcement into a depeg.** EigenLayer's deposit caps shaped how much restaked ETH could enter, but the documented dislocation was an exit-driven discount triggered by a token-distribution announcement. Lending markets accepting LRTs as collateral should use NAV-based or time-averaged oracles and haircuts rather than spot DEX prices.

## Summary

EigenLayer launched with deposit caps on its liquid-staking-token pools. In February 2024 it temporarily lifted the caps (200,000 ETH per LST had been the limit), and TVL rose to nearly \$6B before the window closed (The Block, Blockworks). On 2024-04-16 the team removed all LST caps and unpaused deposits (EigenLayer blog; The Defiant), ending the initial rollout phase.

Eight days later, on 2024-04-24, Renzo's ezETH fell 18.3% to about \$2,642 within minutes, with some trackers showing far lower prints, and later largely recovered. The sell-off followed Binance Labs's 2024-04-23 announcement of the REZ token distribution plan: users wanted out after learning details such as a possible Launchpool advantage for Binance stakers and concerns about the airdrop allocation (The Block). The sources reviewed do not report a liquidation total, and the earlier version of this file's claim of a premium-to-NAV that compressed when caps lifted has no source.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-02 | EigenLayer temporarily removes LST deposit caps; TVL nears \$6B | (cap regime context) |
| 2024-04-16 | EigenLayer removes LST deposit caps and unpauses deposits | (cap regime ends for LSTs) |
| 2024-04-23 | Binance Labs announces REZ distribution plan | (trigger) |
| 2024-04-24 | ezETH falls 18.3% on DEXes within minutes, then largely recovers | **T14.004** |

## Public references

- `[theblockezeth2024]` — The Block, "Renzo's ezETH depegs 18.3% following REZ tokenomics announcement on Binance" (2024-04-24): <https://www.theblock.co/news/business/2024-04-24-renzos-ezeth-depegs-18-3-following-rez-tokenomics-announcement-on-binance-290709>
- `[defiantcapsremoved2024]` — The Defiant, "EigenLayer Removes Deposit Caps On Liquid Staking Tokens" (2024-04-16): <https://thedefiant.io/news/defi/eigenlayer-removes-deposit-caps-on-liquid-staking-tokens>
- `[eigenlayerunpause2024]` — EigenLayer blog, "Unpausing Restaking Caps on April 16th": <https://blog.eigencloud.xyz/unpausing-restaking-caps-on-april-16th>
- `[blockworkseigencap2024]` — Blockworks, "EigenLayer TVL close to \$6 billion after temporary cap removal" (2024-02): <https://www.blockworks.com/news/eigenlayer-uncapped-deposits-closes-tvl>
- `[theblockeigenuncap2024]` — The Block, "EigenLayer hits nearly \$6 billion TVL as its uncapped deposits window draws to a close" (2024-02): <https://www.theblock.co/post/276919/eigenlayer-tvl-uncapped-deposits-window>

## Discussion

This example documents the cap-removal timeline and the ezETH exit-rush depeg. It no longer claims a cap-driven scarcity premium; whether caps influenced LRT secondary pricing before April 2024 is not established by the sources reviewed.
