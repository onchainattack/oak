# Kimchi — tokens sent to an influencer, a post and a repost, a run to \$14M and a >95% crash while pre-positioned wallets sold — \$kimchi / Solana — 2026-10-23

**Loss:** **>\$385K** profit to the selling wallets per Lookonchain; buyers' losses are not quantified.

**OAK Techniques observed:** **OAK-T3.004** (Influencer-Amplified Promotion and Dump — *primary*. Per Lookonchain, @kimchi1x received 500M \$kimchi and posted about it, and @a1lon9 reposted. The repost was later undone and the post deleted. The token hit ~\$14M market cap and fell >95%, while multiple wallets that had bought low sold for >\$385K. See [`techniques/T3.004-influencer-amplified-promotion-and-dump.md`](../techniques/T3.004-influencer-amplified-promotion-and-dump.md)). Lookonchain does not say who controls the selling wallets.

**Attribution:** **pseudonymous;** the three selling wallets are listed by Lookonchain.

**Key teaching point:** **An unsolicited token allocation to an account is the setup, not a signal.** The amplification moved price; the deleted post is the tell that came after.

## Summary

Lookonchain reported the sequence on 2026-10-23 with Solscan links to the selling wallets.

## Timeline (UTC)

Read it as three stages. **Setup**: low-price buys, then a 500M token allocation to an influencer. **Promotion**: a post and a repost run the price to ~\$14M. **Exit**: the early wallets sell and the token crashes. All of it comes from one Lookonchain post; the order of the post and the buys is as Lookonchain reports it.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-23 (undisclosed) | Multiple wallets buy \$kimchi at low prices before the promotion (Lookonchain). Who controls them and how they were funded is not published. | T3.004 |
| 2026-10-23 (time undisclosed) | @kimchi1x receives **500M \$kimchi** and posts about the token. @a1lon9 reposts it. | **T3.004** |
| 2026-10-23 | \$kimchi surges to a ~\$14M market cap. | — |
| 2026-10-23 | The pre-positioned wallets sell. Lookonchain puts their profit at over **\$385K**. The token falls more than 95%. Where the proceeds went is not published. | T3.004 |
| 2026-10-23 (after the sale) | @a1lon9 undoes the repost and @kimchi1x deletes the post. | — |
| 2026-10-23 07:07:10 | Lookonchain publishes the sequence with Solscan links to the three selling wallets. No statement from either account holder or the token's creators appears in the cited source. | response |

Key addresses:

- Selling wallet 1 (listed by Lookonchain) — [`4RZDCgCGyifMvciAy3gjNbbyxNjoYp3nHe6meWUymxL4`](https://solscan.io/account/4RZDCgCGyifMvciAy3gjNbbyxNjoYp3nHe6meWUymxL4)
- Selling wallet 2 (listed by Lookonchain) — [`98xo3EMWR1Xc4aWUHmn8DD4onMqeDuopRiT2hWeMeiFH`](https://solscan.io/account/98xo3EMWR1Xc4aWUHmn8DD4onMqeDuopRiT2hWeMeiFH)
- Selling wallet 3 (listed by Lookonchain) — [`5qVRRiL5HmUXFupQBk2QQ34fhf2boPwhQvZk8yMiwg9M`](https://solscan.io/account/5qVRRiL5HmUXFupQBk2QQ34fhf2boPwhQvZk8yMiwg9M)

## Root-cause evidence

- **Technique:** OAK-T3.004
- **Source:** <https://x.com/lookonchain/status/2113527634999279887>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** Lookonchain's on-chain tracing of the allocation, the posts and the selling wallets.

## Public references

- `[lookonchainkimchi2026]` — Lookonchain on X (2026-10-23): <https://x.com/lookonchain/status/2113527634999279887>
