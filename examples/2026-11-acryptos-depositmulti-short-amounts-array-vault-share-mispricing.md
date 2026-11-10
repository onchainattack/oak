# ACryptoS concentrated-liquidity vaults — `depositMulti` accepted an amounts array shorter than the vault's token count, so a token0-only deposit minted most of the shares — ACryptoS / Arbitrum, BNB Chain, Polygon, Base, Optimism — 2026-11-08

**Loss:** **~\$665,429** across **77 of 126** vaults on five chains (Arbitrum \$230,213; BNB Chain \$190,845; Polygon \$134,686; Base \$69,813; Optimism \$39,871; Linea 0 of 3 vaults hit), per ACryptoS's own post-mortem, priced at about 17:00 UTC on 2026-11-08. About 19.4K ACS taken from the BNB Chain ACS/WBNB vault is not priced and is excluded. The loss fell on honest depositors, whose shares were diluted. ACryptoS offered a 10% bounty for returned funds (reported by TokenPost and trackers; OAK did not find the offer in the operator's own post). No funds returned at last report.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*: the caller was entitled to call `depositMulti`; the vault's bookkeeping priced its whole holdings in token0 only, so share issuance was wrong. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). **OAK-T7.003** (Cross-Chain Bridge Laundering — proceeds bridged through Mayan, Squid, Relay, Across and the USDe LayerZero OFT, per the post-mortem; only the first Arbitrum leg was read by OAK).

**Attribution:** **pseudonymous**. 135 addresses used the flaw; the first and largest is [`0x5dc8df8d0d6cfae0443bb8d9eacdfbb72b2ef322`](https://arbiscan.io/address/0x5dc8df8d0d6cfae0443bb8d9eacdfbb72b2ef322). More than 100 of them copied the method after about 09:30 UTC. No one has attributed them to a named actor.

**Key teaching point:** **A multi-token function must reject an input whose shape does not match the vault, and share issuance must value the vault's assets in every token whatever the caller sends.** Here one missing `amounts.length == tokens.length` check let a 10 USDC deposit mint 66.84% of a vault holding 72,825 USDT0. Nothing was manipulated and the flaw was there since the first deployment, so it needed no insider and no flash loan: a deposit-then-withdraw loop in two transactions was enough, and about 1,000 deposits copied it.

## Summary

ACryptoS vaults (Uniswap V3, SushiSwap V3, PancakeSwap V3 and Biswap V3 families) accepted `depositMulti(uint256[] amounts, uint256 minShares)` with an `amounts` array shorter than the vault's token count. With one element on a two-token vault, the vault valued both the deposit and its existing holdings in token0 only and ignored token1. A vault sitting mostly in token1 (for example an out-of-range position) therefore gave a small token0 deposit most of the shares, and `withdrawMulti` then paid out the deposit plus a pro-rata share of both tokens. Each round took a constant fraction of what remained, so a vault could be drained repeatedly. From 02:02 to 16:22 UTC on 2026-11-08, 135 addresses did this on five chains. It was reported to the project on Telegram at 09:34, the developer was reached at 14:19, deposits were closed on all 126 vaults between 15:38 and 16:40, and ACryptoS announced the loss and its own deprecation on X at 17:17.

## Timeline (UTC)

Read it as four stages. **Flaw**: a missing length check, since first deployment. **Preparation**: one funded wallet. **Take**: repeated deposit/withdraw rounds, then 100+ copycats. **Money and response**: bridging, a beacon upgrade that closes deposits, shutdown. Times are from the ACryptoS post-mortem unless marked OAK.

| When | What happened | OAK |
|---|---|---|
| Since the vaults' first deployment (date undisclosed) | `depositMulti` does not check that `amounts` has one entry per vault token, and values vault holdings with token0 only when given one amount. No upgrade introduced it. No activity was seen on 11-01 to 11-07 on the chains checked. | **T9.016** |
| 2026-11-08 01:50 | Preparation: [`0x5dc8df8d0d6cfae0443bb8d9eacdfbb72b2ef322`](https://arbiscan.io/address/0x5dc8df8d0d6cfae0443bb8d9eacdfbb72b2ef322) is funded with 12.98 ETH on Arbitrum through a Mayan Swift cross-chain order (`SwiftDest.fulfillOrder`). The sender is undisclosed. | **T7.003** |
| 2026-11-08 02:02 | First exploit: the same wallet on the Arbitrum WBTC/WETH-500 vault [`0x60e34fd0ea3b47f5cb560f60cb8f02a790af5c14`](https://arbiscan.io/address/0x60e34fd0ea3b47f5cb560f60cb8f02a790af5c14). | **T9.016** |
| 2026-11-08 02:03:41 | OAK read one `withdrawMulti` round on that vault: [`0xbb3327eac8f902f240169cff1a6c1f754f7b3c61ba31b568bacacb3c6e90cb5a`](https://arbiscan.io/tx/0xbb3327eac8f902f240169cff1a6c1f754f7b3c61ba31b568bacacb3c6e90cb5a) burns the attacker's vault shares and sends 4.41120249 WETH to the same wallet. The vault also moves other token legs in the same tx that OAK did not price. | **T9.016** |
| 2026-11-08 04:22 | First BNB Chain exploit: [`0x82328b24ed97d6e627b6257d125cb3271c5aa2d5`](https://bscscan.com/address/0x82328b24ed97d6e627b6257d125cb3271c5aa2d5) on BTCB/WBNB-500. | **T9.016** |
| 2026-11-08 05:45 | First Polygon exploit: [`0x648508c5e95e7c9ac2380672f87d60ebb1dae49f`](https://polygonscan.com/address/0x648508c5e95e7c9ac2380672f87d60ebb1dae49f) on USDC/USDT0-100. | **T9.016** |
| 2026-11-08 07:02 / 07:31 | First Base exploit ([`0xa5970e20d011a1c8406bbf9315389f6d831b261d`](https://basescan.org/address/0xa5970e20d011a1c8406bbf9315389f6d831b261d)) and first Optimism exploit (an exploiter whose address starts with 0x706f, acting via a contract; the post-mortem does not give it in full). | **T9.016** |
| 2026-11-08 07:50 – 09:50 | The Polygon exploiter `0x648508c5e95e7c9ac2380672f87d60ebb1dae49f` swaps to WETH and bridges 51.85 WETH from Polygon to Ethereum through Across. It still holds 50.82 WETH there. | **T7.003** |
| 2026-11-08 ~09:30 onward | Copycats: 100+ addresses, many EIP-7702 delegated wallets, run identical rounds on all chains. | **T9.016** |
| 2026-11-08 09:34 | The flaw is first reported to the project on Telegram. | — |
| 2026-11-08 14:19 | A developer is reached, about five hours after the first report. | — |
| 2026-11-08 15:38:58 | Polygon UniV3 beacon upgraded to reject deposits (last Polygon exploit 15:38:46). Arbitrum UniV3 / SushiV3 follow at 15:56 / 16:04, BSC UniV3 at 16:20, Optimism at 16:23:49 (last exploit 16:22:27), Base at 16:27 / 16:29, Linea at 16:30, BSC PancakeSwap / Biswap / Biswap2 at 16:38–16:40. All 126 vaults closed. | — |
| 2026-11-08 17:17 | ACryptoS announces on X: vaults exploited, deposits disabled, withdrawals open, project deprecated for lack of resources. | — |
| 2026-11-09 | Base DAI/USDbC-500 vault: after one exploiter started draining it, the vault was upgraded and the exploiter's shares and excess fee shares were burned. About 1,800 USDbC was lost first; the remaining 6,187 USDbC is withdrawable pro rata by original depositors. The upgrade and burn tx hashes are given only truncated in the post-mortem. | — |

### Key addresses

| Role | Address | Notes |
|---|---|---|
| Exploiter, Arbitrum (first) | [`0x5dc8df8d0d6cfae0443bb8d9eacdfbb72b2ef322`](https://arbiscan.io/address/0x5dc8df8d0d6cfae0443bb8d9eacdfbb72b2ef322) | \$139.5K; funded via Mayan Swift |
| Exploiter, Polygon | [`0x648508c5e95e7c9ac2380672f87d60ebb1dae49f`](https://polygonscan.com/address/0x648508c5e95e7c9ac2380672f87d60ebb1dae49f) | \$111.8K; holds 50.82 WETH on Ethereum |
| Exploiter, five chains | [`0xcafe343896335dde2d36a43c85395fd93d659956`](https://arbiscan.io/address/0xcafe343896335dde2d36a43c85395fd93d659956) | \$84.7K plus 10.5K ACS; 162 rounds. Look-alike `0xcafe…` vanity addresses received its proceeds; the post-mortem gives only their prefixes |
| Exploiter, BNB Chain | [`0x82328b24ed97d6e627b6257d125cb3271c5aa2d5`](https://bscscan.com/address/0x82328b24ed97d6e627b6257d125cb3271c5aa2d5) | \$80.5K plus 8.9K ACS; holds 116.5 WBNB |
| Exploiter, BNB Chain | [`0x2143a65fc4721aea20b4ebf99e775b1e6cc9a1a7`](https://bscscan.com/address/0x2143a65fc4721aea20b4ebf99e775b1e6cc9a1a7) | \$54.2K; holds 78.2 WBNB |
| Exploiter, Optimism and Base | [`0xa5970e20d011a1c8406bbf9315389f6d831b261d`](https://optimistic.etherscan.io/address/0xa5970e20d011a1c8406bbf9315389f6d831b261d) | \$49.6K |
| Exploiter, four chains | [`0x00aa588bbb6f48005198b6d4a699107542566970`](https://arbiscan.io/address/0x00aa588bbb6f48005198b6d4a699107542566970) | \$37.6K. The other 128 addresses total about \$107K |
| Vulnerable vault, Arbitrum WBTC/WETH-500 | [`0x60e34fd0ea3b47f5cb560f60cb8f02a790af5c14`](https://arbiscan.io/address/0x60e34fd0ea3b47f5cb560f60cb8f02a790af5c14) | First vault hit |

## Fund flow

OAK read the Arbitrum payout in one `withdrawMulti` transaction with `tools/explorer.py` on 2026-11-10; the vault and attacker are labelled by the post-mortem and by the transfer log (vault share token `acs(WBTC/WETH-500)` burned from the attacker). The Mayan funding, the Polygon-to-Ethereum Across bridge and the Arbitrum bridge-outs are relayed from the post-mortem and carry no transaction hashes. The other 77 vaults and 134 addresses follow the same pattern and are not listed. Native ETH movements are not visible over public RPC.

```oak-flow
as_of: 2026-11-10T12:00Z
nodes:
  - {id: may, chain: arbitrum, role: bridge, label: "Mayan Swift (funding order)"}
  - {id: atk, chain: arbitrum, address: 0x5dc8df8d0d6cfae0443bb8d9eacdfbb72b2ef322, role: attacker-eoa, label: "First exploiter (Arbitrum)"}
  - {id: vault, chain: arbitrum, address: 0x60e34fd0ea3b47f5cb560f60cb8f02a790af5c14, role: vulnerable-contract, label: "ACryptoS WBTC/WETH-500 vault"}
  - {id: brgarb, chain: arbitrum, role: bridge, label: "Mayan / Squid / Relay / USDe OFT (bridge-outs)"}
  - {id: pol, chain: polygon, address: 0x648508c5e95e7c9ac2380672f87d60ebb1dae49f, role: attacker-eoa, label: "Exploiter (Polygon)"}
  - {id: acr, chain: polygon, role: bridge, label: "Across (Polygon to Ethereum)"}
  - {id: eth, chain: ethereum, address: 0x648508c5e95e7c9ac2380672f87d60ebb1dae49f, role: attacker-holding, label: "Same address on Ethereum, 50.82 WETH held"}
edges:
  - {from: may, to: atk, asset: ETH, amount: 12.98, time: 2026-11-08T01:50:00Z, technique: T7.003, verified: source, source: acrpostmortem2026}
  - {from: vault, to: atk, asset: WETH, amount: 4.41120249, tx: 0xbb3327eac8f902f240169cff1a6c1f754f7b3c61ba31b568bacacb3c6e90cb5a, time: 2026-11-08T02:03:41Z, technique: T9.016, verified: oak}
  - {from: atk, to: brgarb, asset: "DAI, WETH and ETH (45,754 DAI, 22.4 WETH, 14.06 ETH via Mayan; further legs via Squid, Relay, USDe OFT)", technique: T7.003, verified: source, source: acrpostmortem2026}
  - {from: pol, to: acr, asset: WETH, amount: 51.85, time: 2026-11-08T07:50:00Z, technique: T7.003, verified: source, source: acrpostmortem2026}
  - {from: acr, to: eth, asset: WETH, amount: 51.85, time: 2026-11-08T09:50:00Z, technique: T7.003, verified: source, source: acrpostmortem2026}
```

Beyond the post-mortem, the trace adds only the tx-level proof of one payout. The BNB Chain exploiters `0x82328b24ed97d6e627b6257d125cb3271c5aa2d5` and `0x2143a65fc4721aea20b4ebf99e775b1e6cc9a1a7` still held WBNB at the post-mortem. Freezable stablecoins left in exploiter wallets total under \$1K. The post-mortem suggests freeze or tracing requests to Mayan, Across, Squid/Axelar, Relay and LayerZero/Ethena. The bounty offer has no on-chain recipient published.

## Mitigations

- **Reject mismatched input shape at the entry point.** In every multi-token vault function (`depositMulti`, `withdrawMulti`), require `amounts.length == tokens.length` and revert otherwise. This is the single missing check; it would have stopped all 135 addresses. Check your own code with a test that calls the function with a shorter and a longer array and expects a revert.
- **Value vault holdings in all tokens, whatever the caller sends.** Share issuance must price the existing position with every token the vault holds, so a caller-chosen array cannot change what the vault is worth. Why: here the shortened array dropped token1, which held almost all the value, from the vault's own valuation.
- **Cap shares minted per deposit against deposit value.** A sanity bound (for example reverting when a deposit worth 10 USDC mints more than a small percentage of a vault holding about \$72K) would have flagged the 66.84% mint at the first transaction.
- **Close deposits on abnormal share issuance, and be reachable.** The first report reached the project at 09:34 and a developer at 14:19; deposits closed from 15:38. An alert on any deposit that mints over a set share of supply, plus a pause role reachable within minutes, bounds the window. The same beacon pattern that closed 11 beacons in about two hours is the right lever; it should be pre-tested, not first used mid-incident.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://docs.acryptos.com/post-mortem-univ3-family-vault-exploit-2026-11-08>; <https://github.com/web3VE/web3VE/issues/132>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** The operator's own post-mortem names the mechanism: `depositMulti` did not check that `amounts` had one entry per vault token, so with a single-element array the vault priced both the deposit and its existing holdings using token0 only. It gives a Polygon fork proof at block 96940861: 10 USDC via `depositMulti([10000000])` minted 118,644,929,973 shares (66.84% of supply) against 8,087,968 shares (0.01%) for `depositMulti([10000000, 0])`, and a round trip of 10 USDC in for 9.989999 USDC plus 48,634.255398 USDT0 out. OAK's own read of one Arbitrum transaction matches the pattern (shares burned, WETH paid to the attacker). A third-party write-up independently repeats the same mechanism.

## What is not known

- The total of the unpriced ~19.4K ACS and any compensation for depositors: ACryptoS has not addressed compensation and says it will not reopen the vaults.
- Full exploit transaction hashes for most chains: the post-mortem gives some hashes only truncated, and OAK has not reconstructed them. The Polygon USDC/USDT0-100 vault (address starts 0x61A3) and the Optimism exploiter (starts 0x706f) are not published in full.
- Whether the 10% bounty offer was made by ACryptoS directly: it appears in news and tracker pages, not in the post-mortem OAK read.
- Where the BNB Chain and Optimism proceeds went beyond the holdings listed, and who controls the 135 addresses.
- Whether any copycat was the project's own white-hat or a known security researcher: not stated.

## Public references

- `[acrpostmortem2026]` — ACryptoS, "Post-mortem: UniV3-family vault exploit, 2026-11-08" (operator, 2026-11-08/09): <https://docs.acryptos.com/post-mortem-univ3-family-vault-exploit-2026-11-08>
- `[acrx2026]` — ACryptoS on X, exploit and deprecation announcement (2026-11-08 17:17 UTC): <https://x.com/acryptosdao/status/2119479478749667555>
- `[acrweb3ve2026]` — web3VE, GitHub issue 132, write-up of the `depositMulti` flaw and per-chain table: <https://github.com/web3VE/web3VE/issues/132>
- `[acrcryptonews2026]` — crypto.news, "How small deposits drained 77 ACryptoS vaults" (2026-11-09): <https://crypto.news/how-small-deposits-drained-77-acryptos-vaults-and-what-users-can-still-withdraw/>
- `[acrtokenpost2026]` — TokenPost, ACryptoS halts operations (2026-11-09; source for the 10% bounty): <https://www.tokenpost.com/news/technology/52565>
- `[acrtechtimes2026]` — Tech Times, ACryptoS exploit drains \$665K (2026-11-09): <https://www.techtimes.com/articles/330280/20261109/acryptos-exploit-drains-665k-77-defi-vaults-project-says-platform-shuts-down.htm>
