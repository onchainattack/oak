# UNCX Network — `release()` cut the pool's total shares but left the position's deposited shares, so cancelling counted the same reduction twice — UNCX VestingManager / Ethereum, Base, BNB Chain, Robinhood Chain — 2026-10-14

**Loss:** **~\$86K** taken in the initial attack; **~\$3.25M** was still in the contract when Blockaid flagged it. UNCX later said **ten tokens across four chains** were affected (the first five named: EDGEN, ZC, PEPECOIN, LO0P, PAAL). Copycats followed the original attacker; no funds returned at last report.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*, per ExVul. In the shared `VestingManager` pool, `release()` reduced the global `_totalTokenShares` **without removing the released shares from the position's `_depositedShares`**. On `cancel`, the contract subtracted shares based on the original deposit, so the same reduction was applied twice and the global share count fell below what other users' positions were owed. A direct token donation further skewed the ratio, and a tiny residual position could then withdraw other users' locked tokens. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). No key was stolen and no permission bypassed: every call was one the attacker was entitled to make.

**Attribution:** **pseudonymous.**

**Key teaching point:** **In a pooled vault, every exit path must retire the same shares exactly once.** Shared-pool designs price every position off one global denominator; a path that decrements the denominator without decrementing the position's own record lets that position exit again later, against everyone else's tokens. A balance donated directly to the pool is a second lever on the same ratio.

## Summary

On 2026-10-14 an attacker created vesting positions in UNCX's shared `VestingManager`, released a large one, donated tokens into the pool and cancelled a topped-up vest, leaving a small residual position that could withdraw other users' locked tokens. Blockaid raised the alarm; ExVul published the accounting analysis. UNCX blocked new positions in the contract, raised flat lock fees (first 100 ETH, then above 1,000 ETH per lock) and token fees to 5%, closed fee-bypass methods, and said its liquidity lockers and legacy vesting contracts are not affected. It is working with law enforcement and SEAL 911 and preparing an incident report and recovery plan.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/exvulsec/status/2110408967822381342>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** ExVul: `release()` lowered `_totalTokenShares` without lowering the position's `_depositedShares`; `cancel` then subtracted from the original deposit, double-counting the reduction. UNCX confirms the affected contract and scope but has not yet published its own analysis.

## Public references

- `[bitcoincomuncx2026]` — Bitcoin.com News, "An \$86,000 Exploit Rocks a Crypto Pool Built to Lock Tokens" (2026-10-15): <https://news.bitcoin.com/security/an-86000-exploit-rocks-a-crypto-pool-built-to-lock-tokens/>
- `[blockaiduncx2026]` — Blockaid on X, UNCX alert: <https://x.com/blockaid_/status/2110406902752387455>
- `[exvuluncx2026]` — ExVul on X, VestingManager analysis: <https://x.com/exvulsec/status/2110408967822381342>
