# Big Pump Signal Telegram pump-and-dump cohort — 2018 — cross-chain

**Loss:** **Distributed across hundreds of coordinated pump events.** Individual victim losses ranged from tens to thousands of USD per participant; aggregate victim losses across the Big Pump Signal operation are estimated in the low tens of millions of USD but are not precisely quantified due to the distributed, multi-exchange, multi-pair nature of the operation.
**OAK Techniques observed:** **OAK-T3.003** (Coordinated Pump-and-Dump) — canonical early anchor. The Big Pump Signal Telegram group was one of the earliest and largest coordinated-pump operations, establishing the template for crypto pump-and-dump coordination that persists in Discord/Telegram groups through v0.1 cutoff.
**Attribution:** **pseudonymous** — group administrators operated under pseudonyms. The operation's Telegram group was publicly observable; individual participants traded from their own exchange accounts.

**Key teaching point:** Big Pump Signal demonstrated that coordinated pump-and-dump at scale requires only a communication channel (Telegram), a designated target pair, a precise pump time, and sufficient participant capital. The group's operational model — free signal channel for followers, paid VIP tier for advance notice — established the monetization template that successor groups replicated.

## Summary

Big Pump Signal was a Telegram-based pump-and-dump coordination group active primarily in 2018. The group's operational model: administrators selected a low-market-cap trading pair on a specific exchange (typically Binance), announced the pair and the pump time to the group's Telegram channel, and at the specified time, all participants bought simultaneously, driving the price up rapidly (the "pump"). Administrators and VIP members, who had advance knowledge of the target pair, accumulated before the public announcement and sold into the coordinated buying pressure (the "dump"), profiting at the expense of free-tier participants who bought at the inflated price.

The group's operational scale — hundreds of thousands of Telegram subscribers at its peak — made it the canonical reference case for crypto-coordinated-pump scholarship and the template against which subsequent operations (Discord-based pumps, NFT-mint coordination, memecoin-launch coordination) are measured.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2017-12 | Big Pump Signal Telegram group created; early pump events on Binance establish the operational template | T3.003 (pump coordination) |
| 2018-01/06 | Peak operational period; group subscriber count reaches hundreds of thousands; pump events occur on a regular schedule (typically multiple per week) | T3.003 (scaled) |
| 2018-07 | Binance CEO publicly acknowledges pump groups and warns participants; exchange-side countermeasures (trade surveillance, account restrictions) begin to deploy | (exchange response) |
| 2018 onward | Big Pump Signal operational tempo declines; successor groups adopt the same template on Discord and Telegram with VIP-tier monetization | T3.003 (template persistence) |

## What defenders observed

- **Pre-pump accumulation pattern.** Administrators and VIP members accumulated the target pair in the minutes-to-hours before the public announcement. The accumulation was detectable as anomalous volume in a low-liquidity pair without accompanying news or fundamental catalyst.
- **Synchronized buying at the pump time.** At the announced pump time, buy volume spiked within seconds — the defining T3.003 signal. The volume spike was mechanically impossible to generate without pre-coordination.
- **Post-pump price collapse.** Within minutes of the pump peak, the price collapsed as administrators and VIP members sold into the buying pressure. Free-tier participants who bought during the pump were left holding the depreciated asset.
- **Exchange-specific targeting.** Pump groups targeted specific exchanges where the target pair had thin liquidity, maximizing the price impact of coordinated buying. Binance was the primary target venue during the 2018 peak.

## Public references

- Big Pump Signal Telegram group (publicly observable during operational period; archived by crypto-security researchers).
- Academic literature: multiple papers studying crypto pump-and-dump coordination use Big Pump Signal as the canonical data source (2018–2020 vintage).
- Exchange trade surveillance: Binance and other exchanges developed pump-detection heuristics informed by the Big Pump Signal operational pattern.
