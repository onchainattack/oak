# K3 Capital sBOLD — the vault checked the BOLD a swap returned but not what the router spent, so WETH sat in the vault while shares were redeemed against it and was then pulled back out — K3 Capital sBOLD (ERC-4626 over Liquity V2 Stability Pools) / Ethereum — 2026-11-18

**Loss:** **~\$3.43M** per SlowMist's alert (SlowMist also reports Blockaid's early estimate as ~\$3.43M across ~34 transactions, per Bitquery); **~\$3.42M (3,428,799 BOLD)**, the whole vault balance, per Bitquery ("97 transactions emptied the vault"). Bitquery says the final net loss depends on recovery, builder payments and residual holdings and is not published. No recovery, bounty or reimbursement statement was found; K3 Capital has said only that it is investigating and has paused the contracts.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*, per SlowMist and Bitquery: the caller used a public entrypoint; the vault's check on a swap confirmed the BOLD it received but not that the router spent the token and amount the valuation assumed, so the vault's books were wrong in the caller's favour. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). **OAK-T9.002** (Flash-Loan-Enabled Exploit — secondary: each drain transaction borrowed 10,000 wstETH from Morpho and 5 WETH from Balancer, read by OAK). **OAK-T7.003** (Cross-Chain Bridge Laundering — secondary, only for part of the copycat proceeds: ETH sent to THORChain and Maya Protocol, per Bitquery).

**Attribution:** **unattributed**. SlowMist labels [`0xDC0e2FDEb89D2F363F2EA1B50E923d464C414dAA`](https://etherscan.io/address/0xDC0e2FDEb89D2F363F2EA1B50E923d464C414dAA) as the attacker; the address that sent the flagged transactions is the same one (traced by OAK). Bitquery found six wallets in the drain and a copycat bot, and says its wallet attribution rests on transfers and shared code and names nobody. No one has been identified.

**Key teaching point:** **When a vault runs a swap to value or rebalance its holdings, it must measure the vault's own balance of the input token and the output token before and after, and revert if the input spent differs from what the valuation used. A check on the output alone is not enough.** The router was free to spend something else (here, BOLD supplied by the caller), so the vault's WETH stayed in place, counted in the share price, while an unused approval let the caller take it back.

## Summary

sBOLD is an ERC-4626 vault by K3 Capital that holds BOLD in the Liquity V2 Stability Pools. On 2026-11-18 between 12:25 and 12:33 UTC, 97 drain transactions from six wallets took the vault's BOLD (Bitquery). SlowMist's alert, 2026-11-18 14:46 UTC, gives the flaw: the vault verified the BOLD a swap returned but not that the router spent the token and amount used for the requirement; the attacker left WETH in the vault, redeemed shares at a valuation counting it, then recovered the WETH with a second swap priced against 1 wei of wstETH, using an unused WETH approval from the first swap. A copycat bot copied the method and took the largest share of the proceeds, paying block builders most of it. K3 Capital posted at 13:08 UTC that it was investigating and had paused the contracts. OAK read the first flagged transactions on-chain and the transfers match SlowMist's description.

## Timeline (UTC)

Four stages. **Flaw**: the swap check in the vault. **Preparation**: the attacker contract deployed. **Take**: flash-loan-funded rounds repeated across 97 transactions. **Money and response**: copycat proceeds to builders and cross-chain venues; pause. Times are from Bitquery or from OAK's own read (block timestamps) unless marked.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-18 (introduction date undisclosed) | sBOLD's swap path checks the BOLD received but not that the router spent the token and amount the valuation used, and leaves an unused WETH approval from a swap (SlowMist). Bitquery says ChainSecurity flagged a share-pricing issue as high severity in an audit, reported as fixed in a later version, and that it did not verify which version K3 runs. | **T9.016** |
| 2026-11-18 12:14 | Preparation: `0xDC0e2FDEb89D2F363F2EA1B50E923d464C414dAA` deploys contract [`0xaeaffd6431b4461b4e17cbc700713c61edf520f6`](https://etherscan.io/address/0xaeaffd6431b4461b4e17cbc700713c61edf520f6) and never calls it (Bitquery). Its drain contract is [`0x19ad153b83f9a1cbcac2182dcef14d0e825a9634`](https://etherscan.io/address/0x19ad153b83f9a1cbcac2182dcef14d0e825a9634). Funding source of the attacker wallet: undisclosed. | — |
| 2026-11-18 12:25:23 | A different wallet, `0x23245f620d1e910ad76e6b6de4f8284a53c9ad2d`, makes the first drain Bitquery lists, four transactions in one block and four in the next. Bitquery reads this wallet's first contract as a byte-level copy of the 12:14 contract with two addresses swapped, and says it cannot see how the code was obtained. | **T9.016** |
| 2026-11-18 12:25:47 | Flagged transaction [`0x915c73684bd3f15e94570fcbe20347947b7a38d994dbffd4c275d6609fee02cb`](https://etherscan.io/tx/0x915c73684bd3f15e94570fcbe20347947b7a38d994dbffd4c275d6609fee02cb) (SlowMist's tx; block 26441931, position 119, from the attacker). Bitquery names a second transaction in the same block, [`0xa61572b54e50694bd72ae0f9bef5746dc4c74e66569c173a1a29a85176c92c5c`](https://etherscan.io/tx/0xa61572b54e50694bd72ae0f9bef5746dc4c74e66569c173a1a29a85176c92c5c) (position 121, also from the attacker), as Blockaid's flagged one. OAK read the transfers of the first; see "How the rounds work" below. | **T9.016**, **T9.002** |
| 2026-11-18 ~12:26:47 | Two more wallets (`0xbabec2fc9a4993ab534d9d8d8fbb79f68e854ddb`, `0xf601d7646c2db4940f0b1909b4835ed7279c5aed`) join and the copycat bot's contract [`0x0000000000be226afde21672a5e4adc45692e69d`](https://etherscan.io/address/0x0000000000be226afde21672a5e4adc45692e69d) starts (Bitquery). | **T9.016** |
| 2026-11-18 12:29:47 – 12:31:59 | The attacker sends 1 ETH to `0x8fb89e5ff6d2f8d204e236f552ac40df8a79caf7`, which deploys its own contract and drains in three of the last four blocks (Bitquery). | **T9.016** |
| 2026-11-18 12:33:35 | About 2,000 BOLD remains in the vault (Bitquery). | — |
| 2026-11-18 ~12:30 – 16:14 | Where it went, per Bitquery at 16:14 UTC: the copycat bot's group paid about 930 ETH and `0x23245f620d1e910ad76e6b6de4f8284a53c9ad2d` 56 ETH to block builders (986 ETH, \$1.78M); 162 ETH went to three THORChain vaults and 129 ETH net to Maya Protocol router [`0xe3985e6b61b814f7cdb188766562ba71b446b46d`](https://etherscan.io/address/0xe3985e6b61b814f7cdb188766562ba71b446b46d), then to five Bitcoin addresses. The remaining ETH was still in wallets. The attacker's two wallets held under \$1K. | **T7.003** |
| 2026-11-18 13:08 | K3 Capital posts that it is investigating malicious activity involving sBOLD and that the contracts have been paused. | response |
| 2026-11-18 14:46 | SlowMist publishes its alert with the root cause, the attacker and the vulnerable contract. | response |

### How the rounds work

OAK read the transfer log of [`0x915c73684bd3f15e94570fcbe20347947b7a38d994dbffd4c275d6609fee02cb`](https://etherscan.io/tx/0x915c73684bd3f15e94570fcbe20347947b7a38d994dbffd4c275d6609fee02cb) (traced by OAK, 2026-11-26). The transaction calls the attacker contract `0x19Ad153B83f9a1cbCAc2182DcEf14D0E825A9634`, which:

1. Receives a flash loan of 10,000 wstETH from Morpho and 5 WETH from the Balancer vault, then opens a Liquity V2 trove that mints 9,010,000 BOLD.
2. Deposits 9,000,000 BOLD into sBOLD (the vault `0x50Bd66D59911F5e086Ec87aE43C811e0D059DD11`), which forwards it to the three Stability Pools.
3. Sends 4 WETH to the vault. The vault then calls the 1inch AggregationRouterV6 (`0x111111125421cA6dc452d289314280a0f8842A65`) and 7,159.16 BOLD arrives at the vault from the router. In the transfer log those 7,159.16 BOLD leave the attacker contract, not the vault, and no WETH leaves the vault in that step.
4. Redeems the shares for 9,010,541.36 BOLD in the first round. The vault pulled the BOLD back from the Stability Pools to pay.
5. Runs a second swap of 3,000 wei BOLD against 1 wei of wstETH. In the same step 4 WETH moves from the vault back to the attacker contract.

The loop repeats; the block timestamps and the 97 transactions are Bitquery's. Bitquery counts eight rounds per transaction in the one it read. OAK did not count rounds and did not total the net gain of any transaction. This matches SlowMist's description: the BOLD the swap returned is real and checked, the token and amount spent are not tied to it, WETH stays in the vault through the redemption, and a second swap with a 1-wei wstETH leg takes it back through an unused WETH approval.

### Key addresses

| Role | Address | Notes |
|---|---|---|
| Attacker (SlowMist) | [`0xDC0e2FDEb89D2F363F2EA1B50E923d464C414dAA`](https://etherscan.io/address/0xDC0e2FDEb89D2F363F2EA1B50E923d464C414dAA) | Sent both flagged transactions. Explorer shows it as a contract with an implementation `0x63c0c19a282a1B52b07dD5a65b58948A07DAE32B`; OAK did not investigate further. Holds 0.0096 ETH at 2026-11-26 (traced by OAK) |
| Attacker drain contract | [`0x19Ad153B83f9a1cbCAc2182DcEf14D0E825A9634`](https://etherscan.io/address/0x19Ad153B83f9a1cbCAc2182DcEf14D0E825A9634) | Called by the attacker in both flagged transactions |
| Vulnerable vault (sBOLD by K3 Capital) | [`0x50Bd66D59911F5e086Ec87aE43C811e0D059DD11`](https://etherscan.io/address/0x50Bd66D59911F5e086Ec87aE43C811e0D059DD11) | Balance 0 ETH |
| Second attacker wallet | [`0x8fb89e5ff6d2f8d204e236f552ac40df8a79caf7`](https://etherscan.io/address/0x8fb89e5ff6d2f8d204e236f552ac40df8a79caf7) | Funded with 1 ETH by the attacker (Bitquery); drain contract [`0x2582c03e74454e24334bb728c2af1148a3d005eb`](https://etherscan.io/address/0x2582c03e74454e24334bb728c2af1148a3d005eb) |
| Early copier | [`0x23245f620d1e910ad76e6b6de4f8284a53c9ad2d`](https://etherscan.io/address/0x23245f620d1e910ad76e6b6de4f8284a53c9ad2d) | Not linked to the attacker by any source; contract copy is Bitquery's inference |
| Copycat bot contract | [`0x0000000000be226afde21672a5e4adc45692e69d`](https://etherscan.io/address/0x0000000000be226afde21672a5e4adc45692e69d) | Payout wallet [`0x000000000076403c099f98973a39018fe4ff2343`](https://etherscan.io/address/0x000000000076403c099f98973a39018fe4ff2343) |
| Other early wallets | [`0xbabec2fc9a4993ab534d9d8d8fbb79f68e854ddb`](https://etherscan.io/address/0xbabec2fc9a4993ab534d9d8d8fbb79f68e854ddb), [`0xf601d7646c2db4940f0b1909b4835ed7279c5aed`](https://etherscan.io/address/0xf601d7646c2db4940f0b1909b4835ed7279c5aed) | Bitquery |
| Liquity V2 Stability Pools | wstETH [`0x9502b7c397E9aA22FE9dB7EF7DAF21cD2AEBe56B`](https://etherscan.io/address/0x9502b7c397E9aA22FE9dB7EF7DAF21cD2AEBe56B), WETH [`0x5721cbbd64fc7Ae3Ef44A0A3F9a790A9264Cf9BF`](https://etherscan.io/address/0x5721cbbd64fc7Ae3Ef44A0A3F9a790A9264Cf9BF), rETH [`0xd442E41019B7F5C4dD78F50dc03726C446148695`](https://etherscan.io/address/0xd442E41019B7F5C4dD78F50dc03726C446148695) | Where the vault holds its BOLD |

## Fund flow

OAK read the flagged transaction `0x915c73684bd3f15e94570fcbe20347947b7a38d994dbffd4c275d6609fee02cb` with Blockscout on 2026-11-26: the legs below marked `oak` are from its transfer log. The proceeds after the vault are relayed from Bitquery's balance snapshot at 16:14 UTC on 2026-11-18, which gives no transaction hashes for them. The ETH legs are not visible in a token-transfer log. Bitquery's totals include the copycat wallets and are not limited to the attacker.

```oak-flow
as_of: 2026-11-18T16:14Z
nodes:
  - {id: vault, chain: ethereum, address: 0x50Bd66D59911F5e086Ec87aE43C811e0D059DD11, role: vulnerable-contract, label: "sBOLD vault (K3 Capital)"}
  - {id: atkc, chain: ethereum, address: 0x19Ad153B83f9a1cbCAc2182DcEf14D0E825A9634, role: attack-contract, label: "Attacker drain contract"}
  - {id: atk, chain: ethereum, address: 0xDC0e2FDEb89D2F363F2EA1B50E923d464C414dAA, role: attacker-eoa, label: "Attacker (SlowMist)"}
  - {id: bot, chain: ethereum, address: 0x0000000000be226afde21672a5e4adc45692e69d, role: attack-contract, label: "Copycat bot contract"}
  - {id: botpay, chain: ethereum, address: 0x000000000076403c099f98973a39018fe4ff2343, role: attacker-holding, label: "Copycat bot payout wallet"}
  - {id: bld, chain: ethereum, role: intermediary, label: "Block builders (bribes, 986 ETH)"}
  - {id: thor, chain: ethereum, role: bridge, label: "THORChain vaults (162 ETH)"}
  - {id: maya, chain: ethereum, address: 0xe3985e6b61b814f7cdb188766562ba71b446b46d, role: bridge, label: "Maya Protocol router (129 ETH net)"}
edges:
  - {from: vault, to: atkc, asset: BOLD, amount: 9010541.360874390, tx: 0x915c73684bd3f15e94570fcbe20347947b7a38d994dbffd4c275d6609fee02cb, time: 2026-11-18T12:25:47Z, technique: T9.016, verified: oak}
  - {from: vault, to: atkc, asset: WETH, amount: 4, tx: 0x915c73684bd3f15e94570fcbe20347947b7a38d994dbffd4c275d6609fee02cb, time: 2026-11-18T12:25:47Z, technique: T9.016, verified: oak}
  - {from: bot, to: bld, asset: ETH, amount: 930, verified: source, source: bitquery2026}
  - {from: bot, to: botpay, asset: ETH, amount: 149.9, technique: T9.016, verified: source, source: bitquery2026}
  - {from: botpay, to: thor, asset: ETH, amount: 162, technique: T7.003, verified: source, source: bitquery2026}
  - {from: botpay, to: maya, asset: ETH, amount: 129, technique: T7.003, verified: source, source: bitquery2026}
```

The legs after the builder payment are drawn from Bitquery's totals, not a wallet-to-wallet trace. Bitquery gives `0x6b190a34ca599a28402dd64374679ced13810a3e` (50 ETH), `0x489db109a54f37ffe5464b86c0668ce84dd9cb02` (1 ETH) and `0x7d715394d03c70675bc9309ca2d877479e6ae156` (111 ETH) as the THORChain vaults, and does not say that the bot payout wallet is the sender of all of them. The 149.9 ETH is the payout wallet's balance at 16:14, not a transfer. The THORChain and Maya sources of funds are among the copycat wallets as a group; OAK did not trace which wallet sent which leg, so the two edges from the payout wallet are an approximation (see open questions). Attacker-side funds: Bitquery puts about \$308K and \$216K in the attacker's two wallets at the time of the drains and under \$1K now.

## Mitigations

- **Bind a swap's spent input to the valuation, in the vault.** After any swap the vault runs, compare its own balances of the input and output tokens before and after, and revert unless the input spent equals the token and amount the share-price calculation used. This sits in the vault's `swap()` path, so a router or caller cannot argue it away. Why: here the vault checked only the BOLD received, so the router could spend something other than the vault's WETH and the WETH stayed counted in the share price. It would have stopped the first round on 2026-11-18.
- **Do not leave token approvals open after a swap.** Reset the approval to the router to zero after every swap, or approve exactly the amount per call. Why: the second swap used the WETH approval left from the first to move 4 WETH out of the vault (SlowMist).
- **Block deposit-and-redeem in one transaction, or price a redemption off a snapshot taken before the transaction's own deposits.** Why: each round deposited about 9,000,000 BOLD and redeemed the shares in the same transaction at a share price changed by that transaction's own WETH and swap.
- **Pause on abnormal share-price moves.** A circuit breaker on per-transaction share-price change, enforced in the vault and pausable by a key reachable within minutes, bounds a drain of 97 transactions in about eight minutes. K3's pause post came at 13:08, about 35 minutes after the drain started.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2123065339407991018>; <https://bitquery.io/investigations/k3-capital-sbold-hack>; <https://www.rektradar.xyz/web3-daily-exploits-19-nov-2026-k3-3-4m-sbold-share-accounting/>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** SlowMist's alert states the mechanism: the vault checked the BOLD a swap returned but did not verify that the router spent the same token and amount used for the requirement; WETH was left in the vault while shares were redeemed at a valuation including it; a second swap priced against 1 wei of wstETH recovered the WETH through an unused approval. Bitquery independently describes a share-price flaw (collateral below a threshold ignored; WETH sent to the vault not counted in the share price) and flags an audit finding. Rektradar relays both. OAK's read of the transfer log of `0x915c73684bd3f15e94570fcbe20347947b7a38d994dbffd4c275d6609fee02cb` matches SlowMist's sequence (WETH into the vault, 1-wei wstETH leg, 4 WETH out to the attacker contract), but a transfer log does not show the vault's check, so the check itself is not confirmed. The operator has not published a post-mortem: K3's only statement is the 13:08 UTC pause post. Same-day third-party analyses are never `confirmed`.

### How the descriptions differ

- **SlowMist TI alert (the primary source for the flaw):** swap check does not tie the token and amount the router spent to the valuation; WETH left in the vault and recovered. It names no flash loan, no liquidation and no `totalAssets` function.
- **Bitquery:** a share-pricing flaw (WETH sent directly to the vault is not counted in the price until `swap()` converts it to BOLD, which is then counted; it then redeems at the higher price). It does use a flash loan: 10,000 wstETH from Morpho. It says it found no liquidated Liquity troves among 95 opens and closes per market and 301 redemptions, and says first alerts reported self-liquidations. OAK did not check the liquidation question.
- **SlowMist tracker summary, as relayed in OAK's task brief (flash-loaned wstETH, self-liquidated Liquity troves, a `totalAssets` flaw):** OAK did not read the tracker page itself. The flash loan is confirmed by OAK's transfer read; self-liquidation is not supported by OAK's read or by Bitquery; the `totalAssets` wording is not in SlowMist's alert.
- **On the transfers:** Bitquery says the vault sells the WETH for BOLD in `swap()`. In the transfer log of `0x915c73684bd3f15e94570fcbe20347947b7a38d994dbffd4c275d6609fee02cb` the 7,159.16 BOLD enter the vault from the router and leave the attacker contract, and no WETH leaves the vault until the second swap. OAK reads that as closer to SlowMist's account than to Bitquery's, and leaves the difference open.

## What is not known

- The vault's source and the exact check at fault: OAK did not read the contract code, and no source quotes it.
- Which audit finding, if any, matches the exploited path, and whether the deployed version had the fix (Bitquery did not verify).
- How the copying wallet obtained the attacker's contract code (Bitquery calls it an inference).
- A final net loss after recovery, any bounty or reimbursement, and an operator post-mortem: undisclosed.
- The SlowMist tracker's liquidation and `totalAssets` statements: not read.
- A transaction-level trace of the copycat and attacker proceeds beyond Bitquery's totals.
- Blockaid's own alert: not reached; its figures here come only through Bitquery and Rektradar.

## Public references

- `[k3x2026]` — K3 Capital on X, "We are investigating malicious activity involving sBOLD. Contracts have been paused." (2026-11-18 13:08 UTC): <https://x.com/k3_capital/status/2123040539578970305>
- `[slowmistx2026]` — SlowMist on X, TI alert, K3 Capital loss ~\$3.43M, root cause, attacker and vulnerable contract (2026-11-18 14:46 UTC): <https://x.com/SlowMist_Team/status/2123065339407991018>
- `[bitquery2026]` — Bitquery, "K3 Capital sBOLD Exploit" investigation (2026-11-18 data, snapshot 16:14 UTC): <https://bitquery.io/investigations/k3-capital-sbold-hack>
- `[rektradar2026]` — Rektradar, "Web3 daily exploits 19 Nov 2026" (2026-11-19): <https://www.rektradar.xyz/web3-daily-exploits-19-nov-2026-k3-3-4m-sbold-share-accounting/>
