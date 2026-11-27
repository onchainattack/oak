# Loopscale — RateX PT collateral mispriced, undercollateralized loans drained the USDC and SOL vaults — Loopscale / Solana — 2025-04-26

**Loss:** **~\$5.8M** per [co-founder Mary Gooneratne](https://x.com/marygooneratne/status/1916189553494315010) (about 12% of funds on Loopscale). Loopscale later gave the amount as [5,726,725 USDC and 1,211 SOL](https://x.com/LoopscaleLabs/status/1917212052029931624); [Halborn](https://www.halborn.com/blog/post/explained-the-loopscale-hack-april-2025) says about 5.7M USDC and 1,200 SOL from the USDC and SOL Genesis Vaults. **Recovered in full:** on 2025-04-29 [Loopscale stated](https://x.com/LoopscaleLabs/status/1917212052029931624) that all the funds taken had been returned after negotiations and that users would incur no loss of deposits. Earlier the same week it had reported returns in stages ([5,000, 10,000 and 4,463 WSOL](https://x.com/LoopscaleLabs/status/1917035273860350408)).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*, per Loopscale as relayed by [The Block](https://www.theblock.co/post/352083/solana-defi-protocol-loopscale-hit-with-5-8-million-exploit-two-weeks-after-launch): "an isolated issue with Loopscale's pricing of RateX-based collateral"). The attacker took out undercollateralized loans, so the protocol's own valuation of the collateral was wrong in the borrower's favour. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md). Halborn calls it a price-oracle issue and Cointelegraph says the attacker manipulated the pricing; no opened page says how the price was moved or whether a flash loan was used, so oracle price manipulation and a flash-loan precondition are not claimed.

**Attribution:** **unattributed.** [Loopscale's message to the exploiter](https://x.com/LoopscaleLabs/status/1916460302704509372) says it was working with law enforcement, security firms and exchanges; The Block says the attacker is unknown. No opened page names anyone.

**Key teaching point:** **A lending market must value each collateral type through a price path it has tested for that asset class, and cap what any single loan can borrow against a newly supported collateral.** Per Loopscale, only the pricing of RateX-based collateral was at fault, and about 12% of the protocol's funds went out in one day, two weeks after launch.

## Summary

Loopscale is a Solana lending protocol that [launched on 2025-04-10](https://www.theblock.co/post/352083/solana-defi-protocol-loopscale-hit-with-5-8-million-exploit-two-weeks-after-launch). On 2025-04-26 [an attacker took out a series of undercollateralized loans](https://x.com/marygooneratne/status/1916189553494315010), draining its USDC and SOL vaults for about \$5.8M. Loopscale said the root cause was an isolated issue with its pricing of RateX-based collateral, and [Halborn](https://www.halborn.com/blog/post/explained-the-loopscale-hack-april-2025) says the protocol "incorrectly assessed the value of RateX PT tokens". Loopscale restricted some features, then [re-enabled loan repayments, top-ups and loop closing](https://www.theblock.co/post/352083/solana-defi-protocol-loopscale-hit-with-5-8-million-exploit-two-weeks-after-launch) that evening. On 2025-04-27 it sent an on-chain message offering a 10% bounty and release from liability for returning 90%; the exploiter returned the funds over 2025-04-28 and 2025-04-29.

## Timeline (UTC)

**Flaw**: RateX-based collateral priced wrongly. **Execution**: undercollateralized loans. **Money**: returned under a bounty offer. **Response**: restrictions, on-chain message, restore. Exact times of the exploit transactions are undisclosed on the opened pages; times below come from the X posts.

| When | What happened | OAK |
|---|---|---|
| Before 2025-04-26 (undisclosed) | Loopscale's pricing of RateX-based collateral is wrong; [OShield's audit](https://www.theblock.co/post/352083/solana-defi-protocol-loopscale-hit-with-5-8-million-exploit-two-weeks-after-launch) (2025-01-16 to 2025-02-24) lists findings on oracle validation and weight matrices but, per The Block, not RateX collateral pricing | **T9.016** |
| 2025-04-26 | The attacker takes a series of undercollateralized loans against the mispriced collateral, draining the USDC and SOL vaults of 5,726,725 USDC and 1,211 SOL. Transaction hashes undisclosed on opened pages | **T9.016** |
| 2025-04-26 17:56 | Gooneratne announces the exploit (~\$5.8M, ~12% of funds) ([post](https://x.com/marygooneratne/status/1916189553494315010)) | response |
| 2025-04-26 evening | Some features restricted, then repayments, top-ups and loop closing re-enabled ([The Block](https://www.theblock.co/post/352083/solana-defi-protocol-loopscale-hit-with-5-8-million-exploit-two-weeks-after-launch)) | response |
| 2025-04-27 11:51 | Loopscale sends an on-chain message offering 10% (3,947 SOL) of 35,527 SOL and a liability release for return of the rest, with a 24-hour deadline ([post](https://x.com/LoopscaleLabs/status/1916460302704509372)) | response |
| 2025-04-28 to 2025-04-29 | 5,000 WSOL returned on 04-28; about 10,000 WSOL at 2:19 AM ET and 4,463 WSOL at 3:14 PM ET on 04-29 ([post](https://x.com/LoopscaleLabs/status/1917035273860350408)) | — |
| 2025-04-29 13:39 | Loopscale states all funds taken have been returned ([post](https://x.com/LoopscaleLabs/status/1917212052029931624)) | response |

Key addresses:

- Loopscale recovery address, Ethereum, as published in its message — [`0xc44196101491bD4E31905d0fe9027d68ad5A5329`](https://etherscan.io/address/0xc44196101491bD4E31905d0fe9027d68ad5A5329)
- Loopscale recovery address, Solana, as published in its message — [`stnD32KEQkgA7LTVNprUPBWXt86fstt1sdUiwUUJH4j`](https://solscan.io/account/stnD32KEQkgA7LTVNprUPBWXt86fstt1sdUiwUUJH4j) (as printed in the post; OAK did not verify it on-chain)
- Attacker addresses: undisclosed on the opened pages.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://www.theblock.co/post/352083/solana-defi-protocol-loopscale-hit-with-5-8-million-exploit-two-weeks-after-launch>; <https://www.halborn.com/blog/post/explained-the-loopscale-hack-april-2025>
- **Source type:** news
- **Confidence:** corroborated
- **Evidence:** Loopscale's own words, relayed by The Block, name the cause as its pricing of RateX-based collateral; Halborn independently says the protocol incorrectly assessed the value of RateX PT tokens and that the attacker took undercollateralized loans. Neither explains how the loans were built or how the price was wrong. Not public: transaction hashes, attacker addresses, the exact pricing path.

## Public references

- Mary Gooneratne, X post (2025-04-26): <https://x.com/marygooneratne/status/1916189553494315010>
- Loopscale, on-chain message to the exploiter (2025-04-27): <https://x.com/LoopscaleLabs/status/1916460302704509372>
- Loopscale, return update (2025-04-29): <https://x.com/LoopscaleLabs/status/1917035273860350408>
- Loopscale, funds returned (2025-04-29): <https://x.com/LoopscaleLabs/status/1917212052029931624>
- The Block, "Solana DeFi protocol Loopscale hit with \$5.8 million exploit two weeks after launch" (2025-04-26): <https://www.theblock.co/post/352083/solana-defi-protocol-loopscale-hit-with-5-8-million-exploit-two-weeks-after-launch>
- Cointelegraph, "Loopscale recovers funds after DeFi exploit, hacker negotiations" (2025-04-29): <https://cointelegraph.com/news/loopscale-recovers-funds-after-defi-exploit-hacker-negotiations>
- Halborn, "Explained: the Loopscale hack (April 2025)" (2025-04-30): <https://www.halborn.com/blog/post/explained-the-loopscale-hack-april-2025>
