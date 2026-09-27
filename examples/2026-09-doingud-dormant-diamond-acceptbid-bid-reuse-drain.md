# DoinGud — accepting a bid paid out and left the bid on the books, so the same bid could be accepted twice — DoinGud (dormant NFT platform) / Polygon — 2026-09-21

**Loss:** **~\$35,486 USDC.e** — effectively the contract's balance.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*, in its **contract-correctness / state-machine** shape per the Lien Finance and Dream Health (2026-09) precedent. DoinGud's Diamond bidding facet's **`acceptBid` paid out but never cleared the bid record**, so one bid could be accepted repeatedly. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T9.002** (Flash-Loan-Enabled Exploit — the attacker **flash-loaned USDC equal to the contract balance**, **bid on their own item**, and **accepted the bid twice**, collecting the second payout from other users' escrowed funds). **OAK-T9.008** does not apply: nothing indicates a facet was left out of audit scope.

**Attribution:** **pseudonymous.**

**Key teaching point:** **Pay-then-forget is a double-spend.** Any function that disburses against a record must consume the record in the same step, before the transfer — checks-effects-interactions applied to business state, not just to reentrancy. And a platform reported as having ceased operations and been acquired in early 2024 still had funded contracts live on-chain two years later: **dormancy is not decommissioning**.

## Summary

DoinGud's Diamond bidding contract on Polygon, still funded after the platform went dormant, let an accepted bid be accepted again. On 2026-09-21 an attacker flash-loaned USDC equal to the contract balance, placed a bid on their own item, accepted it twice, repaid the loan, and kept ~\$35,486 USDC.e.

## Public references

- `[teddyctfdoingud2026]` — teddyctf on X, DoinGud exploit analysis (2026-09-21): <https://x.com/teddyctf/status/2102235278970933264>
- `[slowmisthacked2026]` — SlowMist Hacked database, DoinGud entry (2026-09-21; `acceptBid` did not clear bid; flash-loaned USDC; self-bid accepted twice; \$35,486): <https://hacked.slowmist.io/>
