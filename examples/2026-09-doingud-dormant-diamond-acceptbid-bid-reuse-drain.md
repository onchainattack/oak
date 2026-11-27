# DoinGud — accepting a bid paid out and left the bid on the books, so the same bid could be accepted twice — DoinGud (dormant NFT platform) / Polygon — 2026-09-21

**Loss:** **~\$35,486 USDC.e** — about the contract's whole balance: the researcher puts the balance before the hack at \$35,487 USDC ([teddyctf thread, post 2](https://x.com/teddyctf/status/2102235281349116127)) and one transfer of \$35,486 out of it ([post 11](https://x.com/teddyctf/status/2102235347476504666)). The token is USDC.e per OAK's read of the transaction.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*. DoinGud's Diamond bidding facet's **`acceptBid` paid out but never cleared the bid record**, so one bid could be accepted repeatedly. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). **OAK-T9.002** (Flash-Loan-Enabled Exploit — the researcher says anyone could flash-loan USDC equal to the contract balance, bid on their own item and accept it twice ([post 4](https://x.com/teddyctf/status/2102235296586965089)); OAK's read of the exploit transaction shows a transfer of the same amount into the attacker contract from a third address and back out to the Diamond, then a payout out of the Diamond). The diamond-facet Technique does not apply: nothing indicates a facet was left out of audit scope.

**Re-mapped 2026-10-11:** primary Technique moved from T9.004 to [`T9.016-contract-accounting-state-invariant-flaw`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md).

**Attribution:** **pseudonymous.**

**Key teaching point:** **Pay-then-forget is a double-spend.** Any function that disburses against a record must consume the record in the same step, before the transfer — checks-effects-interactions applied to business state, not just to reentrancy. And a project whose last post was in 2023 and whose contract had been inactive for about 1000 days still held funds ([post 5](https://x.com/teddyctf/status/2102235305298546697)): **dormancy is not decommissioning**.

## Summary

DoinGud's Diamond bidding contract on Polygon, still funded after the platform went dormant, let an accepted bid be accepted again. On 2026-09-21 one transaction drained ~\$35,486 USDC.e from the contract ([teddyctf, post 11](https://x.com/teddyctf/status/2102235347476504666)). The researcher's description of the bug is that anyone could flash-loan USDC equal to the contract balance, bid on their own item and accept the bid twice ([post 4](https://x.com/teddyctf/status/2102235296586965089)). The flash-loan steps of the attacker's own transaction are OAK's reading of its transfers, not stated by the researcher.

## Timeline (UTC)

Facts are from the researcher's [15-post thread](https://x.com/teddyctf/status/2102235278970933264) (posted 2026-09-22 03:15 UTC) unless marked traced by OAK. The exploit time is from OAK's read of the transaction.

| When | What happened | OAK |
|---|---|---|
| Before 2026-09 (undisclosed) | The DoinGud Diamond contract on Polygon ([`0xe3a161edd679fc5ce2db2316a4b6f7ab33a8ed6a`](https://polygonscan.com/address/0xe3a161edd679fc5ce2db2316a4b6f7ab33a8ed6a)) has a bidding facet ([`0x123aAFC8D0a07CE1A146E53aA899e77f21A2DDe1`](https://polygonscan.com/address/0x123aAFC8D0a07CE1A146E53aA899e77f21A2DDe1)) whose `acceptBid(bidder, id, price, qty)` has, per the researcher, no storage writes other than for the reentrancy guard: the payout runs and the bid record is never cleared ([post 3](https://x.com/teddyctf/status/2102235291990012231)). The project's last post was in 2023 and the contract's activity stopped about 1000 days earlier, yet it holds \$35,487 USDC ([posts 2 and 5](https://x.com/teddyctf/status/2102235305298546697)). Since when the flaw existed is not stated. | **T9.016** |
| ~2026-09-14 to 09-21 | A researcher (teddyctf) finds the bug about a week before the hack and finds no one to disclose to ([posts 5-6](https://x.com/teddyctf/status/2102235313292947669)). He submits Polygon's private-mempool access form about 4-5 days before the thread and has no reply ([post 10](https://x.com/teddyctf/status/2102235329419985000)). He later says he should have contacted SEAL 911 ([post 13](https://x.com/teddyctf/status/2102235351146430948)). | — |
| 2026-09-21 (preparation not published) | Preparation by the attacker is not published. | — |
| 2026-09-21 03:27:25 (traced by OAK) | One transaction ([`0x56818a63077f5ba8bfc0bc0877ac33502a5d65cc79dbf5dfaac2a0b8545216a8`](https://polygonscan.com/tx/0x56818a63077f5ba8bfc0bc0877ac33502a5d65cc79dbf5dfaac2a0b8545216a8)) moves \$35,486 USDC out of the contract in a single transfer ([post 11](https://x.com/teddyctf/status/2102235347476504666)); the researcher's description is a bid accepted twice, the second payout drawn from other users' funds. In the transaction OAK read, 35,486.935717 USDC.e arrives in the attacker contract from a third address, goes to the Diamond, and the Diamond then pays USDC.e out to the attacker contract; the contract then sends 35,593.716868 USDC.e back to the loan source and 35,380.154566 USDC.e to the attacker EOA. | **T9.016**, **T9.002** (flash-loan shape, OAK reading) |
| after the exploit | Where the USDC went after the exploit contract is not stated in the cited sources (undisclosed). | — |
| 2026-09-22 03:15 | The researcher publishes the 15-post thread (he says he woke up to find the funds gone, [post 11](https://x.com/teddyctf/status/2102235347476504666)). No statement from DoinGud, no pause or fix, and no refunds appear in the cited sources (the project is dormant). | response |

Key addresses:

- Diamond contract (victim) — [`0xe3a161edd679fc5ce2db2316a4b6f7ab33a8ed6a`](https://polygonscan.com/address/0xe3a161edd679fc5ce2db2316a4b6f7ab33a8ed6a)
- Vulnerable bidding facet — [`0x123aAFC8D0a07CE1A146E53aA899e77f21A2DDe1`](https://polygonscan.com/address/0x123aAFC8D0a07CE1A146E53aA899e77f21A2DDe1)
- Attacker EOA — [`0xb8c717239bcace558c3a8dc471c16e07bf57a1eb`](https://polygonscan.com/address/0xb8c717239bcace558c3a8dc471c16e07bf57a1eb)
- Attacker contract — [`0xe588834aa3161a0720e8f6bf223748d6098a4b76`](https://polygonscan.com/address/0xe588834aa3161a0720e8f6bf223748d6098a4b76)

## Public references

- teddyctf on X, DoinGud exploit thread (2026-09-22 03:15 UTC, 15 posts; the researcher is an independent auditor): <https://x.com/teddyctf/status/2102235278970933264>
- Exploit transaction: <https://polygonscan.com/tx/0x56818a63077f5ba8bfc0bc0877ac33502a5d65cc79dbf5dfaac2a0b8545216a8>

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/teddyctf/status/2102235278970933264>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** The researcher found the bug before the exploit and described the missing bid-record clearing in `acceptBid`; he did not publish a trace of the attacker's own transaction. DoinGud has not commented in any page OAK opened.
