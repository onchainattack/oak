# Tornado Cash → Magic: The Gathering Cards — $25M Collectibles Laundering — 2023

**Loss:** 11,200+ ETH (~$25M) withdrawn from Tornado Cash in 110 transactions of exactly 100 ETH each, across 11 destination addresses. Majority spent on Magic: The Gathering (MTG) trading cards via a US-based broker.
**OAK Techniques observed:** OAK-T7 (Laundering) — systematic mixer withdrawal pattern (110×100 ETH) → ETH wrapping/unwrapping obfuscation → USDC conversion → collectibles broker payment. Linked to Uranium Finance hacker ($50M exploit, April 2021).
**Attribution:** **pseudonymous** — individual linked by ZachXBT to the Uranium Finance exploit through temporal and structural Tornado Cash deposit/withdrawal matching (52×100 ETH pattern in March 2023).

**Key teaching point:** The MTG card case demonstrates the **physical collectibles as laundering exit** pattern with a highly specific detection methodology: (a) the 110×100 ETH withdrawal pattern from Tornado is a mechanical signature — always exactly 100 ETH, across 11 addresses; (b) the ETH→WETH wrap→unwrapped→USDC→broker path is a multi-hop obfuscation chain (each hop erodes tracing confidence); (c) the broker was identified through an OpenSea-Instagram username correlation; (d) the buyer was overpaying by 5-10% for MTG cards (anomalous pricing behavior); (e) the Uranium Finance link was established through Dune analytics — comparing top Tornado depositors with withdrawal patterns. Detection approach: collectibles brokers who accept crypto are a concentrated detection surface; anomalous overpayment is a red flag (legitimate collectors optimize for price); Tornado withdrawal round-number patterns (always 100 ETH) are a behavioral signature.

## Summary

Throughout 2023, ZachXBT monitored an individual who executed a systematic Tornado Cash laundering operation:

**Withdrawal pattern:** 110 withdrawals of exactly 100 ETH each from Tornado Cash, distributed across 11 destination addresses. The round-number consistency (always 100 ETH, never 99.5 or 100.3) is a behavioral fingerprint — automated or scripted withdrawals.

**Obfuscation chain per withdrawal:**

1. Withdraw 100 ETH from Tornado Cash
2. Wrap ETH → WETH
3. Transfer WETH to a new address
4. Unwrap WETH → ETH
5. Swap ETH → USDC
6. Send USDC to MTG broker

The wrapping/unwrapping hop (steps 2-4) serves no economic purpose — it's purely an obfuscation layer to add a hop between the Tornado withdrawal and the USDC conversion.

**Broker identification:** The US-based MTG broker who accepts crypto was identified through an Instagram username that matched their OpenSea profile — a cross-platform identity correlation.

**MTG purchasing behavior:** The buyer spent millions on starter decks, Alpha sets, and sealed boxes, consistently overpaying by 5-10%. Legitimate collectors optimize for price; overpayment suggests the buyer's priority is speed of conversion, not value.

**Source of funds — Uranium Finance link:** ZachXBT traced the Tornado deposits to the Uranium Finance hacker ($50M exploit, April 2021). The evidence:

- March 6 & 14, 2023: Uranium hacker deposits 52×100 ETH to Tornado Cash
- March 7 & 15, 2023: The MTG buyer withdraws 52×100 ETH from Tornado Cash
- The exact temporal matching (deposit one day, withdrawal the next) and identical 100 ETH round-number pattern link the deposit and withdrawal to the same entity.

The trail from Tornado Cash through to Kraken, Bitpay, and Coinbase deposit addresses provides additional tracing surfaces.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2021-04 | Uranium Finance exploited for ~$50M on BSC | **T9 exploit** |
| 2022-10-04 | Uranium hacker deposits 5.01 ETH to Aztec (privacy tool) | **T7 privacy layer** |
| 2023-03-06, 14 | Uranium hacker deposits 52×100 ETH to Tornado Cash | **T7 mixer deposit** |
| 2023-03-07, 15 | MTG buyer withdraws 52×100 ETH from Tornado Cash | **T7 mixer withdrawal** |
| 2023 (throughout) | 110×100 ETH withdrawn from Tornado to 11 addresses. Wrapped/unwrapped → USDC → MTG broker | **T7 obfuscation chain** |
| 2023 (throughout) | MTG cards purchased: starter decks, Alpha sets, sealed boxes. 5-10% overpayment | **T7 collectibles conversion** |
| 2023 (throughout) | USDC flows to Kraken, Bitpay, Coinbase deposit addresses | **T7 CEX consolidation** |
| 2023-12-07 | ZachXBT publishes investigation linking MTG buyer to Uranium Finance hacker | (public disclosure) |

## What defenders observed

- **100 ETH round-number withdrawal as behavioral signature:** Automated or scripted withdrawals almost always use round numbers. Human withdrawals vary (99.5, 100.3, 101.7). The mechanical consistency of exactly 100 ETH every time is an automation fingerprint.
- **Wrapping/unwrapping as a purposeless hop:** The ETH→WETH→ETH hop has zero economic function — it exists solely to add a blockchain transaction between Tornado withdrawal and USDC conversion. Purpose-free hops are a reliable laundering indicator.
- **Overpayment as urgency signal:** Paying 5-10% above market for collectibles is irrational for a collector but rational for a launderer who values conversion speed over price. The overpayment is itself a detection signal.
- **Cross-platform identity correlation (Instagram→OpenSea):** The broker was identified by matching an Instagram username to an OpenSea profile. Threat actors and their facilitators often reuse usernames across platforms — this is a standard OSINT technique.
- **Temporal deposit/withdrawal matching:** The one-day gap between Uranium hacker deposits and MTG buyer withdrawals (March 6→7, March 14→15) is the attribution link. This is a Dune analytics-powered on-chain clustering primitive.

## What this example tells contributors

- **Round-number mixer withdrawals are a detection signature.** Tornado Cash withdrawals in exact round numbers (100 ETH, 50 ETH, 10 ETH) repeated identically suggest automated/scripted laundering. OAK T7 detection specs should include "round-number withdrawal consistency" as a behavioral detection parameter.
- **Wrapping/unwrapping as purposeless obfuscation is detectable.** Any transaction sequence where an asset is wrapped and immediately unwrapped has no economic purpose. This is a low-false-positive laundering indicator applicable across all chains with wrapped asset contracts.
- **Collectibles brokers who accept crypto are a T7 detection data source.** Unlike CEXs, collectibles brokers typically have no blockchain analytics integration. US-based MTG/card/art brokers who accept crypto payments are a discrete, monitorable set. OAK detection data sources should enumerate them.
- **Overpayment percentage is a laundering urgency metric.** Paying above market rate for physical assets is uneconomic for collectors but economic for launderers. The overpayment percentage quantifies laundering urgency — higher overpayment = faster conversion priority.
- **Temporal deposit/withdrawal matching via Dune analytics.** The technique: query Dune for top Tornado Cash depositors → match deposit timing and amounts to withdrawal timing and amounts → one-day gap + identical amounts = same entity. This is a replicable investigation methodology for T7 attribution.

## Public references

- [ZachXBT — Tornado Cash → MTG Cards Investigation (X/Twitter)](https://x.com/zachxbt/status/1732790450350703052)
- Withdrawal pattern: 110×100 ETH to 11 addresses.
- Obfuscation chain: Wrap WETH → transfer → unwrap → USDC → broker.
- MTG broker identified via Instagram/OpenSea username correlation.
- Linked to Uranium Finance hacker: 52×100 ETH deposit/withdrawal temporal match (March 2023).
- Funds also flow to Kraken, Bitpay, Coinbase deposit addresses.
- Dune analytics query by @bax1337 used for Tornado depositor analysis.
