# DoinGud — accepting a bid paid out and left the bid on the books, so the same bid could be accepted twice — DoinGud (dormant NFT platform) / Polygon — 2026-09-21

**Loss:** **~\$35,486 USDC.e** — effectively the contract's balance.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*. DoinGud's Diamond bidding facet's **`acceptBid` paid out but never cleared the bid record**, so one bid could be accepted repeatedly. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). **OAK-T9.002** (Flash-Loan-Enabled Exploit — the attacker **flash-loaned USDC equal to the contract balance**, **bid on their own item**, and **accepted the bid twice**, collecting the second payout from other users' escrowed funds). **OAK-T9.008** does not apply: nothing indicates a facet was left out of audit scope.

**Re-mapped 2026-10-11:** primary Technique moved from T9.004 to [`T9.016-contract-accounting-state-invariant-flaw`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md).

**Attribution:** **pseudonymous.**

**Key teaching point:** **Pay-then-forget is a double-spend.** Any function that disburses against a record must consume the record in the same step, before the transfer — checks-effects-interactions applied to business state, not just to reentrancy. And a platform reported as having ceased operations and been acquired in early 2024 still had funded contracts live on-chain two years later: **dormancy is not decommissioning**.

## Summary

DoinGud's Diamond bidding contract on Polygon, still funded after the platform went dormant, let an accepted bid be accepted again. On 2026-09-21 an attacker flash-loaned USDC equal to the contract balance, placed a bid on their own item, accepted it twice, repaid the loan, and kept ~\$35,486 USDC.e.

## Timeline (UTC)

Times are not published beyond the date. Facts are from the researcher's thread and the SlowMist database entry.

| When | What happened | OAK |
|---|---|---|
| Before 2026-09 (undisclosed) | The DoinGud Diamond contract on Polygon ([`0xe3a161edd679fc5ce2db2316a4b6f7ab33a8ed6a`](https://polygonscan.com/address/0xe3a161edd679fc5ce2db2316a4b6f7ab33a8ed6a)) has a bidding facet ([`0x123aAFC8D0a07CE1A146E53aA899e77f21A2DDe1`](https://polygonscan.com/address/0x123aAFC8D0a07CE1A146E53aA899e77f21A2DDe1)) whose `acceptBid(bidder, id, price, qty)` pays out but never clears the bid record; it writes no storage except the reentrancy guard. The platform is dead (last post in 2023) and the contract has been inactive for about 1000 days, yet it still holds \$35,487 USDC. Since when the flaw existed is not stated. | **T9.016** |
| ~2026-09-14 to 09-21 | A researcher (teddyctf) finds the bug about a week before the hack, cannot find anyone to disclose to, and requests access to Polygon's private mempool in order to rescue the funds; no reply arrives before the exploit. He later says he should have contacted SEAL 911. | — |
| 2026-09-21 (time undisclosed) | Preparation by the attacker is not published. The attacker uses a contract to flash-loan USDC equal to the contract balance and place a bid on their own item. | **T9.002** |
| 2026-09-21 (time undisclosed) | One transaction ([`0x56818a63077f5ba8bfc0bc0877ac33502a5d65cc79dbf5dfaac2a0b8545216a8`](https://polygonscan.com/tx/0x56818a63077f5ba8bfc0bc0877ac33502a5d65cc79dbf5dfaac2a0b8545216a8)) accepts that bid twice, so the second payout comes from other users' escrowed funds, and moves \$35,486 USDC out in a single transfer. The flash loan is repaid in the same transaction. | **T9.016** |
| after 2026-09-21 | Where the USDC went after the exploit contract is not stated in the cited sources (undisclosed). | — |
| 2026-09-22 03:15 | The researcher publishes a 15-post thread describing the bug and the hack. No statement from DoinGud, no pause or fix, and no refunds appear in the cited sources (the project is dormant). | response |

Key addresses:

- Diamond contract (victim) — [`0xe3a161edd679fc5ce2db2316a4b6f7ab33a8ed6a`](https://polygonscan.com/address/0xe3a161edd679fc5ce2db2316a4b6f7ab33a8ed6a)
- Vulnerable bidding facet — [`0x123aAFC8D0a07CE1A146E53aA899e77f21A2DDe1`](https://polygonscan.com/address/0x123aAFC8D0a07CE1A146E53aA899e77f21A2DDe1)
- Attacker EOA — [`0xb8c717239bcace558c3a8dc471c16e07bf57a1eb`](https://polygonscan.com/address/0xb8c717239bcace558c3a8dc471c16e07bf57a1eb)
- Attacker contract — [`0xe588834aa3161a0720e8f6bf223748d6098a4b76`](https://polygonscan.com/address/0xe588834aa3161a0720e8f6bf223748d6098a4b76)

## Public references

- `[teddyctfdoingud2026]` — teddyctf on X, DoinGud exploit analysis (2026-09-21): <https://x.com/teddyctf/status/2102235278970933264>
- `[slowmisthacked2026]` — SlowMist Hacked database, DoinGud entry (2026-09-21; `acceptBid` did not clear bid; flash-loaned USDC; self-bid accepted twice; \$35,486): <https://hacked.slowmist.io/>
