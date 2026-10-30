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
| 2026-10-14 (before 16:26 UTC) | The attacker creates vesting positions in the shared pool, releases a large one, and tops one up. Funding of the attacker address is not published in the sources; OAK traced 3.5 ETH from `0x6d2afff4fc6ff46564467762c4aa35812680d606` (see Fund flow). | T9.016 |
| 2026-10-14 (before 16:26 UTC) | Tokens are donated directly into the pool to magnify the stale-share debit, and the topped-up vest is cancelled. The global share count falls below what other users' positions are owed. A second attacker-owned vesting is then released and takes tokens backing unrelated users ([`0x352065378c4a41b77e5b6a1e5b5616cd2886c3e1a2c87ed3db8e5ddddc23823d`](https://etherscan.io/tx/0x352065378c4a41b77e5b6a1e5b5616cd2886c3e1a2c87ed3db8e5ddddc23823d)). | **T9.016** |
| 2026-10-14 16:26:29 | Blockaid detects an ongoing exploit: ~\$86K drained from the shared pool in one drain transaction, with ~\$3.25M still in the Ethereum contract. | — |
| 2026-10-14 16:34:42 | ExVul: five ERC-20s (EDGEN, ZC, PEPECOIN, LO0P, PAAL) worth ~\$87.7K drained. The exploit contract **retains** ~\$85.6K of them; profit after 0.5624 ETH fees and gas is ~\$84.2K. The same accounting path is still live at the latest checked block. | — |
| 2026-10-14 → 10-15 06:19:02 | Copycats and MEV bots reach the same flaw. Blockaid's update counts **11 drain transactions across four chains, ~\$1.49M**: BNB Chain ~\$969K, Ethereum ~\$242K, Robinhood Chain ~\$169K, Base ~\$114K. UNCX later says ten tokens are affected. | T9.016 |
| 2026-10-14 16:38 → 2026-10-15 07:35 | Traced by OAK: the exploit contract forwards the tokens to the attacker, who sells them for 21.155 ETH on LI.FI and Uniswap pools and sends 3.5 ETH back to the funder. UNCX says neither the original attacker nor copycats have returned anything. | — |
| 2026-10-14 19:00 ET (23:00 UTC) | UNCX blocks new positions in the affected contract, raises flat lock fees (first 100 ETH, then above 1,000 ETH per lock) and token fees to 5%, and closes fee-bypass methods. It says liquidity lockers and legacy vesting contracts are not affected, is working with law enforcement and SEAL 911, advises against trading affected tokens in affected pools, and is preparing an incident report and recovery plan. | response |

Key addresses:

- Attacker (traced by OAK) — [`0x78c9b11853e4f183a34c63ffd1924d2319a2f5b3`](https://etherscan.io/address/0x78c9b11853e4f183a34c63ffd1924d2319a2f5b3)
- Exploit contract (traced by OAK; forwarded the tokens to the attacker) — [`0xf6d072254eb8a9b06e0ba21221b498332c1bc35e`](https://etherscan.io/address/0xf6d072254eb8a9b06e0ba21221b498332c1bc35e)
- Entry contract (traced by OAK) — [`0x6cebdf095172b355121b93962017975c4601f26c`](https://etherscan.io/address/0x6cebdf095172b355121b93962017975c4601f26c)
- Funder (traced by OAK) — [`0x6d2afff4fc6ff46564467762c4aa35812680d606`](https://etherscan.io/address/0x6d2afff4fc6ff46564467762c4aa35812680d606)
- Victim (UNCX Smart Token Vesting, Ethereum) — [`0xa98f06312b7614523d0f5e725e15fd20fb1b99f5`](https://etherscan.io/address/0xa98f06312b7614523d0f5e725e15fd20fb1b99f5)
- First attack transaction — [`0x352065378c4a41b77e5b6a1e5b5616cd2886c3e1a2c87ed3db8e5ddddc23823d`](https://etherscan.io/tx/0x352065378c4a41b77e5b6a1e5b5616cd2886c3e1a2c87ed3db8e5ddddc23823d)
- Contracts and copycat addresses on BNB Chain, Robinhood Chain and Base — not published in the cited sources (Blockaid's thread lists the drain transactions)

## Fund flow

Ethereum leg, traced by OAK with `tools/explorer.py` (Blockscout, keyless) on 2026-10-30, window 2026-10-14 to 2026-10-19. Edges marked `verified: oak` were checked on-chain. The BNB Chain, Robinhood Chain and Base copycat drains are relayed from the cited source: BNB Chain and Robinhood Chain are not supported by the tool, and Base addresses are not published. Lookalike addresses are excluded: dust and zero-value transfers reached the attacker from `0x78c9688ffeec54f62fcab55a7d12335f8f58d606` and `0x6d2aa850e535c0ade4df614b0d0a0db87a31d606`, and the funder received dust from `0x78c9ffe8831fd5fd368d2d800ab3789634b4f5b3`, all imitating real counterparties.

```oak-flow
as_of: 2026-10-30T12:30Z
nodes:
  - {id: fund, chain: ethereum, address: 0x6d2afff4fc6ff46564467762c4aa35812680d606, role: unknown, label: "Funder (EOA, active since 2025-11)"}
  - {id: atk, chain: ethereum, address: 0x78c9b11853e4f183a34c63ffd1924d2319a2f5b3, role: attacker-eoa, label: "Attacker"}
  - {id: entry, chain: ethereum, address: 0x6cebdf095172b355121b93962017975c4601f26c, role: attack-contract, label: "Entry contract"}
  - {id: exp, chain: ethereum, address: 0xf6d072254eb8a9b06e0ba21221b498332c1bc35e, role: attack-contract, label: "Exploit contract"}
  - {id: vm, chain: ethereum, address: 0xa98f06312b7614523d0f5e725e15fd20fb1b99f5, role: vulnerable-contract, label: "UNCX VestingManager"}
  - {id: dex, chain: ethereum, role: dex, label: "LI.FI Diamond and Uniswap V2/V3/V4 pools (5 sales)"}
  - {id: bnb, chain: bsc, role: unknown, label: "BNB Chain copycats (undisclosed)"}
  - {id: rob, chain: robinhood, role: unknown, label: "Robinhood Chain copycats (undisclosed)"}
  - {id: base, chain: base, role: unknown, label: "Base copycats (undisclosed)"}
edges:
  - {from: fund, to: atk, asset: ETH, amount: 3.5, tx: 0x52fe1a5aa857a3e6f6f0c12f559019da382c294238601b967a74b03c01c5b93b, time: 2026-10-14T14:47:35Z, tx_count: 3, time_last: 2026-10-14T15:15:35Z, verified: oak}
  - {from: atk, to: entry, asset: ETH, amount: 0.8, tx: 0x352065378c4a41b77e5b6a1e5b5616cd2886c3e1a2c87ed3db8e5ddddc23823d, time: 2026-10-14T15:49:59Z, technique: T9.016, verified: oak}
  - {from: entry, to: exp, asset: ETH, amount: 0.8, tx: 0x352065378c4a41b77e5b6a1e5b5616cd2886c3e1a2c87ed3db8e5ddddc23823d, time: 2026-10-14T15:49:59Z, technique: T9.016, verified: oak}
  - {from: vm, to: exp, asset: "EDGEN, ZC, PEPECOIN, LO0P, PAAL (drain in one tx, with flash-sourced token legs)", tx: 0x352065378c4a41b77e5b6a1e5b5616cd2886c3e1a2c87ed3db8e5ddddc23823d, time: 2026-10-14T15:49:59Z, technique: T9.016, verified: oak}
  - {from: atk, to: entry, asset: ETH, amount: 2.6, tx: 0x8a9cd4d5eab00f904b3ca6c024236f8b039e96615e48c325877f073db63f5669, time: 2026-10-14T15:58:23Z, tx_count: 4, time_last: 2026-10-14T16:25:11Z, verified: oak}
  - {from: exp, to: atk, asset: "EDGEN 55601598.70841797, PEPECOIN 40155.28428566, LO0P 65372.21705916, PAAL 113657.76693397, ETH 0.29", tx: 0x8a34be02396c2ba622e6005ff23ec3c0ba6f528dd4dab7a095ac2f27b31e5d54, time: 2026-10-14T16:38:11Z, tx_count: 5, time_last: 2026-10-14T16:41:11Z, verified: oak}
  - {from: atk, to: dex, asset: "EDGEN, PEPECOIN, LO0P, PAAL", tx: 0xf758582096ed80fbd4b80bc3dbd44e3edabdfd116b15ad9d16af459e38b09be5, time: 2026-10-14T16:44:35Z, tx_count: 4, time_last: 2026-10-14T17:01:11Z, verified: oak}
  - {from: exp, to: atk, asset: ZC, amount: 9055847.63788768, tx: 0x8eab147f6e0f34e807c584d69873b2a2f7b4791b691f9a60c9d1ffd347eafcb0, time: 2026-10-15T07:28:35Z, verified: oak}
  - {from: atk, to: dex, asset: ZC, amount: 9055847.63788768, tx: 0x13a26824dd3f1135b35852333922f4573e0a8c2542a3d6884655471283a490fc, time: 2026-10-15T07:35:11Z, verified: oak}
  - {from: dex, to: atk, asset: ETH, amount: 21.15528601, tx: 0xf758582096ed80fbd4b80bc3dbd44e3edabdfd116b15ad9d16af459e38b09be5, time: 2026-10-14T16:44:35Z, tx_count: 5, time_last: 2026-10-15T07:35:11Z, verified: oak}
  - {from: atk, to: fund, asset: ETH, amount: 3.5, tx: 0xa32b5eefca3e3dc8891f9e07fcd585c5ce1762f5d67035fc3e61acaa818f92bd, time: 2026-10-14T17:09:35Z, verified: oak}
  - {from: vm, to: bnb, asset: "copycat drains (~$969K per source)", time: 2026-10-15T06:19:02Z, verified: source, source: blockaiduncxupdate2026}
  - {from: vm, to: rob, asset: "copycat drains (~$169K per source)", time: 2026-10-15T06:19:02Z, verified: source, source: blockaiduncxupdate2026}
  - {from: vm, to: base, asset: "copycat drains (~$114K per source)", time: 2026-10-15T06:19:02Z, verified: source, source: blockaiduncxupdate2026}
```

What the trace adds beyond the sources:

- **Funding.** The sources do not say how the attacker was funded. The attacker received 3.5 ETH in three transfers (0.1, 0.9 and 2.5 ETH) from `0x6d2afff4fc6ff46564467762c4aa35812680d606`, an EOA active since 2025-11, 62 minutes to 2 hours before the exploit. The attacker sent exactly 3.5 ETH back to it at 17:09:35. The funder is not an exchange or mixer in the tool's labels; it may be the same operator.
- **Entry path.** The first attack transaction was sent from the attacker to a second contract, `0x6cebdf095172b355121b93962017975c4601f26c`, which passed 0.8 ETH to the exploit contract. The exploit contract's token legs include pool-sourced amounts that return to the pools in the same tx (a flash-style loan), so no per-token drain amount is stated here.
- **Conflict with ExVul.** ExVul says the exploit contract "retains" about \$85.6K of the tokens. On-chain, the exploit contract forwarded EDGEN, PEPECOIN, LO0P and PAAL to the attacker address within 49 minutes (16:38 to 16:41) and 9,055,847.64 ZC on 2026-10-15, and the attacker sold them for 21.155 ETH across five swaps (LI.FI Diamond and Uniswap pools). The exploit contract's ETH and checked balances are now zero. So the funds were not left in the contract; this contradicts the Timeline row "After the drains" and the Summary of retention. Sale proceeds are shown in asset amounts only; no USD value is added.
- **Attacker address.** It is now a contract (it carries an implementation pointer, consistent with an EIP-7702 delegation) and holds about 0.000007 ETH. The 21.155 ETH of proceeds minus the 3.5 ETH returned to the funder were not followed past 2026-10-15; the ETH movement after the sales is outside the 5-day window checks done here and was not traced.
- **Limits.** The BNB Chain, Robinhood Chain and Base copycat addresses are not published, and BNB Chain and Robinhood Chain are not supported by the tool, so those edges are relayed from Blockaid and carry no addresses. Base is supported but no seed address is known. The tool reported no skipped counterfeit-token transfers on the traced seeds, but several zero-value and dust transfers from lookalike addresses were ignored.

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
