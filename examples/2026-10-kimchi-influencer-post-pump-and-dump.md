# Kimchi — tokens sent to a trader's account, a post and a repost, a run to \$14M and a >95% crash while pre-positioned wallets sold — \$kimchi / Solana — 2026-10-23

**Loss:** **>\$385K** profit to the selling wallets per [Lookonchain](https://x.com/lookonchain/status/2113527634999279887); buyers' losses are not quantified. [crypto.news](https://crypto.news/pump-fun-kimchi-token-crash-qr-code/) notes that a \$14M market cap is not a loss figure.

**OAK Techniques observed:** **OAK-T3.004** (Influencer-Amplified Promotion and Dump — *primary*, inferred from the sequence. Per [Lookonchain](https://x.com/lookonchain/status/2113527634999279887), @kimchi1x received 500M \$kimchi and posted about it, and @a1lon9 reposted it. The repost was later undone and the post deleted. The token reached a ~\$14M market cap and fell over 95%, while multiple wallets that bought low sold for over \$385K. No opened page shows that either account holder knew of or shared in the sales. See [`techniques/T3.004-influencer-amplified-promotion-and-dump.md`](../techniques/T3.004-influencer-amplified-promotion-and-dump.md)).

**Attribution:** **pseudonymous.** Lookonchain calls the people behind the buying wallets "scammers" and lists three wallets, but [crypto.news](https://crypto.news/pump-fun-kimchi-token-crash-qr-code/) reports that transfers alone do not show who controlled them or whether they knew of the promotion. No one is charged. No statement from the two account holders or the token's creators appears in the opened pages.

**Key teaching point:** **An unsolicited token allocation to an account is the setup, not a signal.** Check who holds the early supply before treating a high-reach post as demand. The deleted post is the tell that came after.

## Summary

[Lookonchain](https://x.com/lookonchain/status/2113527634999279887) reported on 2026-10-23 that a trader's X account (@kimchi1x) received 500M \$kimchi and posted about the token, and that @a1lon9 (named by [crypto.news](https://crypto.news/pump-fun-kimchi-token-crash-qr-code/) as a Pump.fun co-founder) reposted it. The repost was undone and the post deleted. The token surged to a \$14M market cap and then fell over 95%. Lookonchain says multiple wallets bought at low prices and sold for over \$385K in profit, and links three of them. crypto.news adds a trader's unverified claim that a QR code in the promotional image changed its destination after heavy trading began.

## Timeline (UTC)

Three stages. **Setup**: low-price buys, then a 500M token allocation to a trader's account. **Promotion**: a post and a repost run the price to ~\$14M. **Exit**: the early wallets sell and the token crashes. The sequence and its order come from one [Lookonchain post](https://x.com/lookonchain/status/2113527634999279887); no times other than the post time are given.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-23 (undisclosed) | Multiple wallets buy \$kimchi at low prices before the promotion ([Lookonchain](https://x.com/lookonchain/status/2113527634999279887)). Who controls them and how they were funded is not published. | T3.004 |
| 2026-10-23 (time undisclosed) | @kimchi1x receives **500M \$kimchi** and posts about the token; @a1lon9 reposts it ([Lookonchain](https://x.com/lookonchain/status/2113527634999279887)). The promotional image carried a QR code to the token ([crypto.news](https://crypto.news/pump-fun-kimchi-token-crash-qr-code/)). | **T3.004** |
| 2026-10-23 | \$kimchi surges to a \$14M market cap ([Lookonchain](https://x.com/lookonchain/status/2113527634999279887)). | — |
| 2026-10-23 | The pre-positioned wallets sell, for over **\$385K** profit by Lookonchain's count. The token falls over 95% ([Lookonchain](https://x.com/lookonchain/status/2113527634999279887)); [crypto.news](https://crypto.news/pump-fun-kimchi-token-crash-qr-code/) says some observers put the drop closer to 99%. Where the proceeds went is not published. | T3.004 |
| 2026-10-23 (after the sale) | @a1lon9 undoes the repost and @kimchi1x deletes the post ([Lookonchain](https://x.com/lookonchain/status/2113527634999279887)). | — |
| 2026-10-23 07:07:10 | Lookonchain publishes the sequence with Solscan links to three wallets. | response |

Key addresses (listed by Lookonchain, each with a Solscan transfers link in the post):

- Wallet 1 — [`4RZDCgCGyifMvciAy3gjNbbyxNjoYp3nHe6meWUymxL4`](https://solscan.io/account/4RZDCgCGyifMvciAy3gjNbbyxNjoYp3nHe6meWUymxL4)
- Wallet 2 — [`98xo3EMWR1Xc4aWUHmn8DD4onMqeDuopRiT2hWeMeiFH`](https://solscan.io/account/98xo3EMWR1Xc4aWUHmn8DD4onMqeDuopRiT2hWeMeiFH)
- Wallet 3 — [`5qVRRiL5HmUXFupQBk2QQ34fhf2boPwhQvZk8yMiwg9M`](https://solscan.io/account/5qVRRiL5HmUXFupQBk2QQ34fhf2boPwhQvZk8yMiwg9M)

## Root-cause evidence

- **Technique:** OAK-T3.004
- **Source:** <https://x.com/lookonchain/status/2113527634999279887>; <https://crypto.news/pump-fun-kimchi-token-crash-qr-code/>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** Lookonchain's on-chain tracing of the allocation, the posts and the selling wallets. crypto.news repeats it and notes that transfers do not show who controlled the wallets. Bitquery reported a separate earlier KIMCHI launch with about \$104K in gains from three linked wallets that it could not tie to the deployer; crypto.news warns not to combine that with Lookonchain's total. Whether the allocation was a paid promotion, a compromised account or something else is not established.

## Public references

- Lookonchain on X (2026-10-23): <https://x.com/lookonchain/status/2113527634999279887>
- crypto.news, "Pump.fun KIMCHI token crashes 95% after co-founder Alon deletes repost" (2026-10-23): <https://crypto.news/pump-fun-kimchi-token-crash-qr-code/>
