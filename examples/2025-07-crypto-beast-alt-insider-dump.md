# ALT Token — Influencer Insider Dump — 2025-07-14

**Loss:** $190M market cap → $3M (98.4% crash). 45+ connected insider wallets sold $11M+ in a single day.
**OAK Techniques observed:** OAK-T3.003 (Pump and Dump Coordination) — primary; OAK-T3.004 (Influencer Amplified Promotion and Dump) — primary.
**Attribution:** **Identified** — @cryptobeastreal (Crypto Beast), who publicly denied involvement while 45+ connected wallets under his control sold.

**Key teaching point:** The ALT case demonstrates the **insider-denial + coordinated multi-wallet dump** pattern: the influencer publicly denies being behind the token while 45+ wallets on-chain are provably connected to the same funding source. The denial is itself part of the attack — it buys time for insider wallets to exit while retail holds. Detection approach: cluster wallets by funding source, monitor for synchronized sell-offs across the cluster during influencer denial posts.

## Summary

On July 14, 2025, the ALT token crashed from a $190M market cap to $3M (0.19 → 0.003) after insiders sold a large percentage of the total supply. Crypto Beast (@cryptobeastreal) had aggressively promoted $ALT on X and Telegram earlier that month. After the crash, he publicly denied being behind the token or the dump.

ZachXBT's investigation revealed that 45+ connected insider wallets — all traceable to the same funding source — sold $11M+ on July 14. The influencer's promotion posts were deleted after the dump.

The case illustrates the standard insider dump playbook: (1) accumulate supply across many wallets, (2) promote aggressively via influencer channels, (3) sell all at peak, (4) deny involvement, (5) delete promotional content.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2025-07 early | Crypto Beast aggressively promotes $ALT on X and Telegram | **T3.004 influencer amplification** |
| 2025-07-14 | ALT crashes from $190M → $3M market cap (0.19 → 0.003). 45+ connected insider wallets sold $11M+ | **T3.003 coordinated dump** |
| 2025-07-14 post-crash | Crypto Beast publicly denies being behind the token. Promotion posts deleted | (cover-up) |
| 2025-07-22 | ZachXBT publishes investigation with on-chain wallet clustering of all 45+ insider wallets | (public disclosure) |

## What defenders observed

- **Single funding source → 45+ wallets:** All insider wallets were funded from a common source on-chain, making the cluster identifiable even through wallet fragmentation.
- **Synchronized sell timing:** All 45+ wallets sold within the same trading window, producing an unnatural sell-side concentration that is statistically distinct from organic retail selling.
- **Promotion-to-dump latency:** The crash occurred days after the most aggressive promotion, giving insiders time to exit at peak while retail was still absorbing the promotional content.
- **Post-dump content deletion:** The influencer deleted promotion posts after the dump — a behavioral signal that the promotion was not organic community support but coordinated extraction.

## What this example tells contributors

- **Wallet clustering by funding source defeats fragmentation.** The attacker used 45+ wallets to obscure the insider concentration, but all were funded from a single identifiable source. T3 detection should monitor for multi-wallet clusters with common funding + synchronized sell-offs.
- **The denial is part of the MO.** Public denial of involvement while on-chain evidence shows coordinated selling from connected wallets is a recurring pattern (see also: DJT token insiders, RIVER manipulation). T3 technique pages should catalogue denial-as-cover as a behavioral indicator.
- **Influencer promotion-post deletion is a retrospective signal.** When an influencer deletes promotion posts after a token crashes, it indicates the promotion was not organic. This is a post-hoc signal useful for attribution and actor profiling, not real-time detection.

## Public references

- [ZachXBT — Crypto Beast ALT Investigation (X/Twitter)](https://twitter.com/zachxbt/status/1947038843278774272)
- On-chain wallet cluster: 45+ connected wallets documented in ZachXBT thread.
