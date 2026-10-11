# Fake GIWA chain — a cloned L2 with Upbit's real chain ID, a working bridge, and a "leaked mainnet RPC" rumour collected 766 ETH before the real team said mainnet was not live — GIWA (Upbit L2) impersonation / Ethereum — 2026-09-26 → 27

**Loss:** **766.25 ETH (~\$2.08M)** from **1,333 addresses** over **2,226 deposits** (median 0.072 ETH; 14 addresses sent ≥10 ETH). ~584.9 ETH entered Tornado Cash within 27 hours. **DYORSWAP refunded 199.3 ETH (~26%) to 1,018 depositors from its own funds**, with 40% promised to sub-5-ETH depositors.

**OAK Techniques observed:** **OAK-T4.009** (Pre-token Brand-Anticipation Phishing — *primary*. The lure was the **anticipated mainnet** of a real, not-yet-launched L2: a rumour that the RPC had "leaked" and that early bridgers would be rewarded. See [`techniques/T4.009-pre-token-brand-anticipation-phishing.md`](../techniques/T4.009-pre-token-brand-anticipation-phishing.md)). **OAK-T4.008** (Fake DEX-Clone Frontend Phishing — adjacent: the clone was a whole chain). What makes it distinct: the clone used **GIWA's real chain ID, 9134**, and **posted data batches to Ethereum every ~4 minutes**, so wallet prompts and an explorer both looked like a live rollup. **A chain ID is a number anyone can set; it authenticates nothing.**

**Attribution:** **unattributed.** Deployer `0x119e68B59C44291F76324c76377B776D0b4Dd38c`; drain recipient `0x04a9c8D8FEe491411Bda28b68aD80F0122Fc4134`.

**Key teaching point:** **Users verified the network by the one property an attacker controls.** Wallets show a chain ID match as reassurance; for a chain that has not launched, the only authoritative source is the operator's own channel, and the operator posted that mainnet was not live four hours after deposits surged.

## Summary

On 2026-09-26 two funded wallets deployed a bridge contract on Ethereum (`0xbA9938C0b96A70E6479661B915e7E481fE435ab2`) into a private chain using GIWA's chain ID and began posting batches. Deposits surged from 03:00 UTC on 09-27 (750 in the first hour). GIWA said at 06:09 UTC that mainnet had not launched; at 07:29 UTC 766.25 ETH left the bridge in one transaction. DYORSWAP, which had listed the network, confirmed it was fake at 08:06 UTC and began partial refunds.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2026-09-26 | Bridge deployed; batch posting begins | (staging) |
| 2026-09-27 03:00 | Deposit surge on "leaked RPC" rumour | **T4.009** |
| 2026-09-27 06:09 | GIWA: mainnet not launched | (operator disclosure) |
| 2026-09-27 07:29 | 766.25 ETH drained in one transaction | (extraction) |
| 2026-09-27 → 28 | ~584.9 ETH to Tornado Cash | **T7.001** |

## Public references

- `[bitqueryfakegiwa2026]` — Bitquery, "Fake GIWA chain bridge drain" investigation: <https://bitquery.io/investigations/fake-giwa-chain-bridge-drain>
