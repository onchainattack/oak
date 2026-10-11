# Q1–Q2 2026 Flash-Loan, Approval and Slippage Exploit Cohort — Matcha/SwapNet, Cyrus Finance, Aperture, and the YO Protocol keeper mis-swap — Aggregate ~$17.6M across three exploits

**OAK Techniques observed:** OAK-T9.002, OAK-T9.004

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** Matcha/SwapNet ~\$13.43M (Jan 25; a third-party SwapNet arbitrary-call exploit hitting ~18–20 users who had disabled Matcha's default One-Time Approval — Matcha's own contracts were not compromised); Aperture ~\$3.67M (Jan 25; arbitrary-call bug across Ethereum, Arbitrum, Base and BSC); Cyrus Finance ~\$512K (BNB Chain, Mar 23; flash-loan manipulation of `slot0()` spot price in `withdrawUSDTFromAny()`). Aggregate of the three exploits ~\$17.6M. **YO Protocol (Jan 12) is not an exploit:** an erroneous automated stkGHO swap (~\$3.71M in, ~\$112K USDC back) from a missing slippage guard on YO's own keeper via Odos; no attacker, and YO's multisig covered the loss. It is kept here as a documented non-attack contrast and is excluded from the aggregate.

**Key teaching point:** Three exploits and one self-inflicted loss in Q1–Q2 2026 show gaps in the DeFi transaction-authorisation pipeline: standing token approvals reachable through a third-party arbitrary-call bug (SwapNet/Matcha users, Aperture), flash-loan manipulation of a spot price (Cyrus Finance: ~\$512K, Mar 23, `slot0()` manipulation), and a missing slippage bound on a protocol's own automated keeper (YO Protocol, not an attack). The common thread is **a value-transfer path that was authorised once and never re-validated — or never constrained in the first place.**

**Corrected 2026-10-11:** Matcha/SwapNet is a third-party arbitrary-call exploit (~18–20 users who disabled One-Time Approval), Aperture is \$3.67M, Cyrus Finance is ~\$512K on Mar 23 via `slot0()` flash-loan manipulation, and YO Protocol (Jan 12) is an erroneous keeper swap with no attacker, excluded from the aggregate (now ~\$17.6M).

## Summary

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2026-01-12 | YO Protocol: not an exploit — YO's own automated harvesting keeper executed a swap via Odos with broken parameters (~97% slippage): ~\$3.71M stkGHO in, ~\$112K USDC back; multisig covered the loss; no attacker | (not an attack; operator error — missing slippage guard) |
| 2026-01-25 | Matcha/SwapNet: ~\$13.43M drained from ~18–20 users who had disabled One-Time Approval and granted direct allowances to SwapNet contracts, via an unvalidated low-level call (arbitrary `transferFrom`); Matcha's own contracts not compromised | **T9.004** (arbitrary call over standing approvals in a third-party contract) |
| 2026-01-25 | Aperture: arbitrary-call bug in minting (unvalidated target and calldata) drains approved ERC-20s and Uniswap V3 position NFTs; ~\$3.67M across Ethereum, Arbitrum, Base, BSC | **T9.004** (arbitrary call over standing approvals) |
| 2026-03-23 | Cyrus Finance: ~1,798 ETH flash loan from a PancakeSwap V3 pool shifts the `slot0()` spot price used by `withdrawUSDTFromAny()`; `exit()` on CYRP position #15505 releases excess USDT; ~\$512K | **T9.002** (flash-loan capital); price-oracle manipulation of a spot price (T9.011 not supported) |

## Matcha / SwapNet — Arbitrary Call over Direct Allowances

On January 25, 2026, SwapNet (a third-party contract used by Matcha Meta) was exploited for ~\$13.4M (Matcha's confirmed figure: \$13.43M, ~\$13.34M of it from one user). BlockSec: `0x87395540()` lacked validation, so the attacker could substitute a token address for the expected router, making the contract execute a low-level call with attacker calldata and issue `transferFrom` on previously approved assets. About 20 users who had turned off Matcha's default One-Time Approval and granted direct allowances to SwapNet were affected; users who kept One-Time Approval (routed through 0x's AllowanceHolder) were not. Matcha said its own contracts and 0x's AllowanceHolder/Settler were not compromised. Earlier text describing an "unlimited-approval exploit on Matcha's contracts" is corrected.

**OAK mapping:** T9.004 (arbitrary call over standing approvals; the standing-approval surface is the exposure, an unvalidated call target is the bug).

## Cyrus Finance — Flash-Loan Spot-Price Manipulation

On March 23, 2026, Cyrus Finance on BNB Chain (a PancakeSwap V3 liquidity manager) lost ~\$512K (BlockSec; earlier text said ~\$5M on Mar 22). `CyrusTreasury.withdrawUSDTFromAny()` read the pool's spot price from `slot0()` to value the position, which a single transaction can move. The attacker took a ~1,798 ETH flash loan, swapped ETH→USDT to shift price and tick, called `exit()` on CYRP position #15505 to release excess USDT, restored the pool and repaid.

**OAK mapping:** T9.002 (flash-loan-enabled) with spot-price manipulation; the earlier T9.011 pool-share-accounting claim is not supported by the BlockSec write-up.

## YO Protocol — Erroneous Keeper Swap (Not an Attack)

On January 12, 2026, YO Protocol's automated harvesting system executed a swap via the Odos aggregator with broken parameters (a bad output quote effectively disabled slippage protection; the Odos route carried a slippage parameter of 17,872,058). About \$3.71M of stkGHO was swapped and ~\$112K USDC returned to the vault (~97% slippage). Rekt: "No exploit. No hack. No malicious code." YO's post-mortem said the harvester ran without guardrails applied to its other trading systems. YO's multisig bought ~3.71M GHO via CoW Swap and redeposited stkGHO to backstop the loss, paused the Pendle yoUSD market and asked LPs who received proceeds to return 90%. There was no attacker. It stays in this cohort only as the contrast case: the missing slippage guard was on the protocol's own keeper.

**OAK mapping:** none — not an attack. (The earlier T9.004 tag for a "missing slippage guard" was incorrect.)

## Aperture — Arbitrary Call in Minting

On January 25, 2026, Aperture Finance lost ~\$3.67M across Ethereum, Arbitrum, Base and BSC (BlockSec; earlier text said ~\$3.2M). During minting via `0x67b34120()`, internal function `0x1d33()` made a low-level call with user-supplied calldata and an unvalidated target, letting attackers drain approved ERC-20 tokens and approved Uniswap V3 position NFTs. A balance check passed because the attacker set the swap output value. Root cause is the same as SwapNet: insufficient input validation on user-controlled low-level calls in contracts holding token approvals.

**OAK mapping:** T9.004 (arbitrary call over standing approvals).

## Public references

- `[theblockmatcha2026]` — The Block, "Matcha Meta users hit in \$13.4 million SwapNet contract exploit" (2026-01-26): <https://www.theblock.co/post/386986/matcha-meta-swapnet-incident> (Matcha/SwapNet: \$13.43M, ~20 users with direct allowances, Matcha contracts not compromised)
- `[blocksecaperture2026]` — BlockSec, "\$17M Closed-Source Smart Contract Exploit: Arbitrary-Call Vulnerability in SwapNet and Aperture Finance" (2026-01-28): <https://blocksec.com/blog/17m-closed-source-smart-contract-exploit-arbitrary-call-swapnet-aperture> (SwapNet \$13.41M and Aperture \$3.67M, Jan 25 arbitrary-call bugs)
- `[rektyo2026]` — rekt.news, "Yo Protocol's Slippage Bomb" (2026-01-14): <https://rekt.news/yo-protocols-slippage-bomb> (YO Protocol: erroneous keeper swap, not an exploit)
- `[blocksecweeklymar2026]` — BlockSec, "Weekly Web3 Security Incident Roundup | Mar 23 – Mar 29, 2026" (2026-04-02): <https://blocksec.com/blog/weekly-web3-security-incident-roundup-mar-23-mar-29-2026> (Cyrus Finance: ~\$512K, Mar 23, `slot0()` manipulation)
- Cross-reference: T9.002 at `techniques/T9.002-flash-loan-enabled-exploit.md`; T9.004 at `techniques/T9.004-access-control-misconfiguration.md`; T9.011 at `techniques/T9.011-precision-loss-rounding-attack.md`

## Discussion

The Q1–Q2 2026 cohort shows related but distinct authorisation failures:

**SwapNet/Matcha and Aperture share one root cause: an unvalidated low-level call in a contract that holds user token approvals.** Matcha's \$13.43M loss fell on the ~20 users who had opted out of One-Time Approval; those who kept it were not exposed, which is the clearest evidence that scoping approvals per transaction contains this class. The standing-approval surface is the exposure; the arbitrary call is the bug.

**Cyrus Finance is a spot-price manipulation:** a flash loan moved `slot0()` and the treasury trusted it. The fix is a TWAP or external oracle.

**YO Protocol is a control failure on the operator's own automation, not an attack.** Adding a `minAmountOut` guard to the keeper path would have prevented it, and the multisig covered the loss. Filing it as an exploit would overstate the adversary count; it is retained as a contrast case for what a missing slippage guard costs when no attacker is needed.

Multi-chain deployment, as with Aperture, multiplies exposure: the same unvalidated call was exploitable on every chain the contract was deployed to.
