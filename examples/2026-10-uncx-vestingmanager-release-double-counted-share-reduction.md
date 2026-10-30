# UNCX Network — `release()` cut the pool's total shares but left the position's deposited shares, so cancelling counted the same reduction twice — UNCX VestingManager / Ethereum, Base, BNB Chain, Robinhood Chain — 2026-10-14

**Loss:** **~\$1.49M across four chains** per Blockaid's 2026-10-15 update (BNB Chain ~\$969K, Ethereum ~\$242K, Robinhood Chain ~\$169K, Base ~\$114K; 11 drain transactions including copycats and MEV bots). The first attack, on Ethereum, took **~\$86K**; **~\$3.25M** was in that contract when Blockaid flagged it. UNCX said **ten tokens** were affected (the first five named: EDGEN, ZC, PEPECOIN, LO0P, PAAL). No funds returned at last report.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*, per ExVul. In the shared `VestingManager` pool, `release()` reduced the global `_totalTokenShares` **without removing the released shares from the position's `_depositedShares`**. On `cancel`, the contract subtracted shares based on the original deposit, so the same reduction was applied twice and the global share count fell below what other users' positions were owed. A direct token donation further skewed the ratio, and a tiny residual position could then withdraw other users' locked tokens. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). No key was stolen and no permission bypassed: every call was one the attacker was entitled to make.

**Attribution:** **pseudonymous.**

**Key teaching point:** **In a pooled vault, every exit path must retire the same shares exactly once.** Shared-pool designs price every position off one global denominator; a path that decrements the denominator without decrementing the position's own record lets that position exit again later, against everyone else's tokens. A balance donated directly to the pool is a second lever on the same ratio.

## Summary

On 2026-10-14 an attacker created vesting positions in UNCX's shared `VestingManager`, released a large one, donated tokens into the pool and cancelled a topped-up vest, leaving a small residual position that could withdraw other users' locked tokens. Blockaid raised the alarm; ExVul published the accounting analysis. UNCX blocked new positions in the contract, raised flat lock fees (first 100 ETH, then above 1,000 ETH per lock) and token fees to 5%, closed fee-bypass methods, and said its liquidity lockers and legacy vesting contracts are not affected. It is working with law enforcement and SEAL 911 and preparing an incident report and recovery plan.

## Timeline (UTC)

Read it as three stages. **Flaw**: one exit path retires shares twice. **Take**: positions, a donation and a cancel leave a tiny position able to withdraw others' tokens; copycats repeat it on three more chains. **After**: no funds returned; UNCX restricts the contract. Times are from Blockaid, ExVul and Bitcoin.com News.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-14 (since when: undisclosed) | In the shared `VestingManager`, `release()` subtracts claimed shares from the global `_totalTokenShares` but leaves them in the position's `_depositedShares`. After `release()` then `topUpVesting()`, `cancel()` works from the full lifetime `_depositedShares`, so released shares leave the global total a second time (ExVul). | **T9.016** |
| 2026-10-14 (before 16:26 UTC) | The attacker creates vesting positions in the shared pool, releases a large one, and tops one up. Funding of the attacker address is not published. | T9.016 |
| 2026-10-14 (before 16:26 UTC) | Tokens are donated directly into the pool to magnify the stale-share debit, and the topped-up vest is cancelled. The global share count falls below what other users' positions are owed. A second attacker-owned vesting is then released and takes tokens backing unrelated users ([`0x352065378c4a41b77e5b6a1e5b5616cd2886c3e1a2c87ed3db8e5ddddc23823d`](https://etherscan.io/tx/0x352065378c4a41b77e5b6a1e5b5616cd2886c3e1a2c87ed3db8e5ddddc23823d)). | **T9.016** |
| 2026-10-14 16:26:29 | Blockaid detects an ongoing exploit: ~\$86K drained from the shared pool in one drain transaction, with ~\$3.25M still in the Ethereum contract. | — |
| 2026-10-14 16:34:42 | ExVul: five ERC-20s (EDGEN, ZC, PEPECOIN, LO0P, PAAL) worth ~\$87.7K drained. The exploit contract **retains** ~\$85.6K of them; profit after 0.5624 ETH fees and gas is ~\$84.2K. The same accounting path is still live at the latest checked block. | — |
| 2026-10-14 → 10-15 06:19:02 | Copycats and MEV bots reach the same flaw. Blockaid's update counts **11 drain transactions across four chains, ~\$1.49M**: BNB Chain ~\$969K, Ethereum ~\$242K, Robinhood Chain ~\$169K, Base ~\$114K. UNCX later says ten tokens are affected. | T9.016 |
| After the drains | Funds sit in the exploit contract and copycat wallets; UNCX says neither the original attacker nor copycats have returned anything. No laundering step is reported. | — |
| 2026-10-14 19:00 ET (23:00 UTC) | UNCX blocks new positions in the affected contract, raises flat lock fees (first 100 ETH, then above 1,000 ETH per lock) and token fees to 5%, and closes fee-bypass methods. It says liquidity lockers and legacy vesting contracts are not affected, is working with law enforcement and SEAL 911, advises against trading affected tokens in affected pools, and is preparing an incident report and recovery plan. | response |

Key addresses:

- Attacker — [`0x78c9b11853e4f183a34c63ffd1924d2319a2f5b3`](https://etherscan.io/address/0x78c9b11853e4f183a34c63ffd1924d2319a2f5b3)
- Exploit contract (retains the tokens) — [`0xf6d072254eb8a9b06e0ba21221b498332c1bc35e`](https://etherscan.io/address/0xf6d072254eb8a9b06e0ba21221b498332c1bc35e)
- Victim (UNCX Smart Token Vesting, Ethereum) — [`0xa98f06312b7614523d0f5e725e15fd20fb1b99f5`](https://etherscan.io/address/0xa98f06312b7614523d0f5e725e15fd20fb1b99f5)
- First attack transaction — [`0x352065378c4a41b77e5b6a1e5b5616cd2886c3e1a2c87ed3db8e5ddddc23823d`](https://etherscan.io/tx/0x352065378c4a41b77e5b6a1e5b5616cd2886c3e1a2c87ed3db8e5ddddc23823d)
- Contracts and copycat addresses on BNB Chain, Robinhood Chain and Base — not published in the cited sources (Blockaid's thread lists the drain transactions)

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
- `[blockaiduncxupdate2026]` — Blockaid on X, four-chain update (2026-10-15): <https://x.com/blockaid_/status/2110616419939566029>
