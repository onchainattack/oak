# Cyber (CYBER) — LayerZero bridge: single-verifier route accepted forged messages, 5,213,000 CYBER minted on Solana and released from the Ethereum lockbox — Cyber / Solana → Ethereum — 2026-11-21

**Loss:** **~\$968K** per The Block and Rekt Radar (5,213,000 CYBER released; about 575.29 ETH realised). Bitquery values the same 5,213,000 CYBER at about \$1.10M at the 21 November daily price of \$0.2115. The two figures differ only in the valuation basis. Recovery: none reported. Cyber reimbursement or post-mortem: undisclosed as of 2026-11-26.

**OAK Techniques observed:** **OAK-T10.002** (Message-Verification Bypass — *primary*. Solana accepted messages that did not correspond to any Ethereum-side deposit, on a route that, per Bitquery, needed only one verifier signature; the mint and the lockbox release followed. See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md)). **OAK-T7.007** (DEX Aggregator Routing Laundering — CYBER sold through KyberSwap and MetaMask Swaps, per Bitquery and The Block). **OAK-T7.001** (Mixer-Routed Hop — 575 ETH deposited into Tornado Cash on 2026-11-25, traced by OAK). **OAK-T10.001** (Validator / Signer Key Compromise) is *not established*: Bitquery infers a leaked verifier key, but says the chain "does not show how that key got out", and Cyber has named no cause.

**Attribution:** **unattributed.** First Ethereum wallet [`0xaf32a9db0b0ac8eaa860a43a9d32a1c9277277cc`](https://etherscan.io/address/0xaf32a9db0b0ac8eaa860a43a9d32a1c9277277cc); Solana wallet [`58ZgoAHMgfFPuzLkA6avW5nCh8vHibt1qDfCSvpPZvSo`](https://solscan.io/account/58ZgoAHMgfFPuzLkA6avW5nCh8vHibt1qDfCSvpPZvSo), per Bitquery. Bitquery states it attributes the wallets to nobody. No firm has named an actor.

**Key teaching point:** **A one-verifier cross-chain route has one failure point, and a lockbox pays out whatever the destination mints.** Bitquery reports the Cyber-to-Solana route needed a single verifier signature, and that the same key signed both the real and the fake messages. A second, independent verifier (a required-DVN quorum of two or more), or a per-window cap on lockbox release, would have stopped the release of 5,213,000 CYBER, which is about 71 times the 73,887 CYBER the route minted across 38 normal mints in the prior 30 days (Bitquery).

## Summary

On 2026-11-21 at about 16:13 UTC, 5,213,000 CYBER was minted on Solana to a newly funded wallet. About two minutes later, at 16:15:11, the same amount left the Ethereum CyberTokenAdapter lockbox for a new Ethereum wallet that had been funded 0.1 ETH about 53 minutes earlier (OAK trace). Most of the tokens were sold through KyberSwap and MetaMask Swaps within about an hour, and 575.286 ETH was moved to a fresh address. Cyber posted at 18:25 UTC that it "noticed unexpected minting of CYBER on Solana, followed by a transfer of CYBER out of the bridge's Ethereum lockbox". Upbit and Bithumb suspended CYBER deposits and withdrawals.

Bitquery's same-day investigation, with data checked to 2026-11-22 10:00 UTC, says the mint came from fake LayerZero messages (numbers 330 and 331; 332 the next morning) accepted by the route's single verifier configuration, signed by the same key that signed the route's real messages. It also reports admin changes on the Solana verifier settings account during the attack. How the key and admin access were obtained is not public. This file is `reported`, not `confirmed`: the operator confirms the on-chain sequence but gives no cause, and the verifier mechanism rests on one non-operator source.

## Timeline (UTC)

**Entry** is the undisclosed point where the verifier key (and verifier admin access) was obtained; **preparation** is wallet funding and the helper admin; **execution** is the fake-message mint on Solana and the lockbox release on Ethereum; **funds** are swaps, the ETH hop and Tornado Cash; **response** is the public record. Ethereum times are from OAK's trace. Solana and verifier-admin times are Bitquery's and were not verified by OAK.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-21 ~16:00 (undisclosed) | The verifier key `0xb6f5` (full value not published) is obtained by the attacker. How is undisclosed. Bitquery: the chain "does not show how that key got out"; Cyber has not named a cause. | **T10.002** (T10.001 not established) |
| 2026-11-21 15:22:47 | The first Ethereum wallet is funded 0.1 ETH from [`0xe818ab43bb45b706abab2d3c8f7f2b351afdf7da`](https://etherscan.io/address/0xe818ab43bb45b706abab2d3c8f7f2b351afdf7da) in [`0x12ecc468c37e77137770d2b38b2da249f4689d7b7995cd8b6936749a0d20a4f1`](https://etherscan.io/tx/0x12ecc468c37e77137770d2b38b2da249f4689d7b7995cd8b6936749a0d20a4f1). Funder of that address not traced. | — |
| 2026-11-21 15:36 (Bitquery) | The attacker's Solana wallet receives SOL from a Mayan Finance wallet. | — |
| 2026-11-21 ~16:00 (Bitquery) | A helper Solana wallet [`6pnHXHtNXddyRYg15TJJrkW9VjMZnep5oj99CqdmfZxx`](https://solscan.io/account/6pnHXHtNXddyRYg15TJJrkW9VjMZnep5oj99CqdmfZxx) is added as verifier admin, signed with key `0xb6f5`. | **T10.002** |
| 2026-11-21 16:00 to 16:13 (Bitquery) | Fake messages 330 and 331 are approved by Solana. Cyber's chain had counted 329 messages sent to Solana. | **T10.002** |
| 2026-11-21 ~16:13 | 5,213,000 CYBER is minted on Solana: [`TzMKUZhibQNADjETHhe1QiNp4NPpgAkyHivrJu2CJuToK7gFZMB3nFe3UR9UjpMHGLdTKE8wig5C9M9BRBpsF1F`](https://solscan.io/tx/TzMKUZhibQNADjETHhe1QiNp4NPpgAkyHivrJu2CJuToK7gFZMB3nFe3UR9UjpMHGLdTKE8wig5C9M9BRBpsF1F) (hash from Bitquery and The Block; not verified by OAK). | **T10.002** |
| 2026-11-21 ~16:14 (Bitquery) | The tokens are burned on Solana and sent towards Ethereum: [`4nM8H6qwiEsPEGx2GE53Rd7qK7PovFhJTg4HgEZ8GmKeoVix8Uibd8VdKgss5extMvDT2B1K65ZYDMSrVMBkv6U2`](https://solscan.io/tx/4nM8H6qwiEsPEGx2GE53Rd7qK7PovFhJTg4HgEZ8GmKeoVix8Uibd8VdKgss5extMvDT2B1K65ZYDMSrVMBkv6U2). | **T10.002** |
| 2026-11-21 16:15:11 | The CyberTokenAdapter lockbox [`0xcb07992de144bdee56fdb66fff2454b43243b052`](https://etherscan.io/address/0xcb07992de144bdee56fdb66fff2454b43243b052) pays 5,213,000 CYBER to the first wallet, via a LayerZero executor proxy, in [`0x92a1b430c066cbfb636f67f5354b1720c47e6075523551d9f47bb03bcdc20737`](https://etherscan.io/tx/0x92a1b430c066cbfb636f67f5354b1720c47e6075523551d9f47bb03bcdc20737). | **T10.002** |
| 2026-11-21 16:17 to 17:15 | The first wallet and a second wallet [`0x73052e10334096b96deacd7bf6c6ec3b9b6c1b32`](https://etherscan.io/address/0x73052e10334096b96deacd7bf6c6ec3b9b6c1b32) sell most of the CYBER through KyberSwap and MetaMask Swaps, mostly in clips of 150,000 CYBER. The first wallet sends 3,531,082 CYBER to the second at 16:48:35 ([`0xf5c55a1e0d6ea9300f27025e0431b5dac6baf59481ceaab297905609e88f8e66`](https://etherscan.io/tx/0xf5c55a1e0d6ea9300f27025e0431b5dac6baf59481ceaab297905609e88f8e66)) and 147.755 ETH at 16:49:47 ([`0x4361c34fdde74389c5df0c57c64aa4369f438dfaf04036ab7e546a2b595e9ad8`](https://etherscan.io/tx/0x4361c34fdde74389c5df0c57c64aa4369f438dfaf04036ab7e546a2b595e9ad8)). | T7.007 |
| 2026-11-21 ~17:15 (Bitquery) | The verifier admin removes the helper and switches the signer list to a new key `0x5aeb`, signed with the old key. Bitquery says this points to Cyber's team or a firm working for it, and names no operator. | response |
| 2026-11-21 17:40:35 | 575.286 ETH moves from the second wallet to a fresh address [`0xe0a6bd0f2d391a3ee99a5a8550baa1b3347fe8b9`](https://etherscan.io/address/0xe0a6bd0f2d391a3ee99a5a8550baa1b3347fe8b9) in [`0xfba2151e4018b46ecc51f85645c5fa18820dc412d16f87119431067a87fa7f65`](https://etherscan.io/tx/0xfba2151e4018b46ecc51f85645c5fa18820dc412d16f87119431067a87fa7f65). | — |
| 2026-11-21 after the sales began (The Block: "shortly after noon" ET; exact time undisclosed) | Upbit and Bithumb suspend CYBER deposits and withdrawals, citing a suspected security incident (The Block). | response |
| 2026-11-21 18:25:13 | Cyber posts that it noticed the unexpected mint and lockbox transfer, asks users to hold off on using the bridge or depositing CYBER to exchanges, and says no one needs to migrate tokens or sign anything ([post](https://x.com/BuildOnCyber/status/2124207519581327394)). | response |
| 2026-11-22 04:29 to 04:30 (Bitquery) | The helper is re-added as admin with both keys on the signer list, and fake message 332 is approved. Bitquery says it was approved but not run. | response |
| 2026-11-22 08:38 and 10:00 (Bitquery) | The admin role moves to a new wallet; both keys are still on the signer list at 10:00. | response |
| 2026-11-23 09:16:35 | 575.28593174 ETH moves from the holding address to [`0x16b639090c8b4ad56e88c56d2b737ba57ca0eb7b`](https://etherscan.io/address/0x16b639090c8b4ad56e88c56d2b737ba57ca0eb7b) in [`0x24fc3eb3fab81c61c32d3102e9dc5349a73c69f41e2aa4f4ae0469b7ed30697e`](https://etherscan.io/tx/0x24fc3eb3fab81c61c32d3102e9dc5349a73c69f41e2aa4f4ae0469b7ed30697e). | — |
| 2026-11-25 17:58:35 to 18:19:59 | That address makes 17 deposits to three Tornado Cash ETH pools: 5 of 100 ETH, 7 of 10 ETH and 5 of 1 ETH, 575 ETH in total (first 100 ETH deposit: [`0x66972847c9382598450b80e56bd9607b333e8bf6f1f3a0917e835d18e731110e`](https://etherscan.io/tx/0x66972847c9382598450b80e56bd9607b333e8bf6f1f3a0917e835d18e731110e)). | T7.001 |
| 2026-11-21 and after | Residual CYBER, recovery and a Cyber post-mortem: undisclosed. | undisclosed |

Key addresses:

- Lockbox (CyberTokenAdapter, victim) — [`0xcb07992de144bdee56fdb66fff2454b43243b052`](https://etherscan.io/address/0xcb07992de144bdee56fdb66fff2454b43243b052)
- First Ethereum wallet (receiver) — [`0xaf32a9db0b0ac8eaa860a43a9d32a1c9277277cc`](https://etherscan.io/address/0xaf32a9db0b0ac8eaa860a43a9d32a1c9277277cc)
- Second Ethereum wallet (seller) — [`0x73052e10334096b96deacd7bf6c6ec3b9b6c1b32`](https://etherscan.io/address/0x73052e10334096b96deacd7bf6c6ec3b9b6c1b32)
- ETH holding address — [`0xe0a6bd0f2d391a3ee99a5a8550baa1b3347fe8b9`](https://etherscan.io/address/0xe0a6bd0f2d391a3ee99a5a8550baa1b3347fe8b9)
- Pre-Tornado address — [`0x16b639090c8b4ad56e88c56d2b737ba57ca0eb7b`](https://etherscan.io/address/0x16b639090c8b4ad56e88c56d2b737ba57ca0eb7b)
- CYBER token (Ethereum) — [`0x14778860e937f509e651192a90589de711fb88a9`](https://etherscan.io/address/0x14778860e937f509e651192a90589de711fb88a9)
- Swap counterparty contract — [`0x8f10b468b06c6fd214b65f87778827f7d113f996`](https://etherscan.io/address/0x8f10b468b06c6fd214b65f87778827f7d113f996) (unlabeled contract; role as KyberSwap or MetaMask route not confirmed by OAK)
- Attacker Solana wallet (Bitquery) — [`58ZgoAHMgfFPuzLkA6avW5nCh8vHibt1qDfCSvpPZvSo`](https://solscan.io/account/58ZgoAHMgfFPuzLkA6avW5nCh8vHibt1qDfCSvpPZvSo)
- Helper verifier admin, Solana (Bitquery) — [`6pnHXHtNXddyRYg15TJJrkW9VjMZnep5oj99CqdmfZxx`](https://solscan.io/account/6pnHXHtNXddyRYg15TJJrkW9VjMZnep5oj99CqdmfZxx)
- Verifier 168 settings account, Solana (Bitquery) — [`CQQ7nwaQYDiU3gjxMmvXx1SyEWCsYrUQymWL4qjsHNZf`](https://solscan.io/account/CQQ7nwaQYDiU3gjxMmvXx1SyEWCsYrUQymWL4qjsHNZf)
- Tornado Cash 100 ETH pool — [`0xa160cdab225685da1d56aa342ad8841c3b53f291`](https://etherscan.io/address/0xa160cdab225685da1d56aa342ad8841c3b53f291)
- Tornado Cash 10 ETH pool — [`0x910cbd523d972eb0a6f4cae4618ad62622b39dbf`](https://etherscan.io/address/0x910cbd523d972eb0a6f4cae4618ad62622b39dbf)
- Tornado Cash 1 ETH pool — [`0x47ce0c6ed5b0ce3d3a51fdb1c52dc66a7c3c2936`](https://etherscan.io/address/0x47ce0c6ed5b0ce3d3a51fdb1c52dc66a7c3c2936)

Watch-out: address-poisoning bots sent zero-value and fake-token transfers from the holding and seller addresses to lookalikes that copy their first and last characters (for example `0x16b1857e18b83ae49b9db5c83ee1a94ea3a0eb7b` imitating the pre-Tornado address). Those are not fund movement. Check the full address, never the ends. Rekt Radar published the lockbox and first-wallet addresses; Bitquery published the other wallets.

## Fund flow

Ethereum legs traced by OAK with `tools/explorer.py` (Blockscout, keyless) on 2026-11-26. The Solana mint and burn are not in the graph. The CYBER-to-ETH swap proceeds in the second wallet were not itemised by OAK: the second wallet's ETH inflows from the swap contract were not reconciled to the 575.286 ETH sent on (Bitquery: 147.8 ETH from the first wallet's sales and 413.8 ETH from the second's). The 0.27896281 ETH sent on 2026-11-26 to [`0x1710755bf555a113e050da8e707add89bf2dd782`](https://etherscan.io/address/0x1710755bf555a113e050da8e707add89bf2dd782) is not shown (OAK did not trace it).

```oak-flow
as_of: 2026-11-26T12:00Z
nodes:
  - {id: vic, chain: ethereum, address: 0xcb07992de144bdee56fdb66fff2454b43243b052, role: vulnerable-contract, label: "CyberTokenAdapter lockbox"}
  - {id: f0, chain: ethereum, address: 0xe818ab43bb45b706abab2d3c8f7f2b351afdf7da, role: unknown, label: "0.1 ETH funder"}
  - {id: rcv, chain: ethereum, address: 0xaf32a9db0b0ac8eaa860a43a9d32a1c9277277cc, role: attacker-receiver, label: "First wallet"}
  - {id: sell, chain: ethereum, address: 0x73052e10334096b96deacd7bf6c6ec3b9b6c1b32, role: attacker-receiver, label: "Second wallet"}
  - {id: sw, chain: ethereum, address: 0x8f10b468b06c6fd214b65f87778827f7d113f996, role: dex, label: "Swap contract"}
  - {id: hold, chain: ethereum, address: 0xe0a6bd0f2d391a3ee99a5a8550baa1b3347fe8b9, role: attacker-holding, label: "ETH holder"}
  - {id: pre, chain: ethereum, address: 0x16b639090c8b4ad56e88c56d2b737ba57ca0eb7b, role: attacker-holding, label: "Pre-Tornado address"}
  - {id: t100, chain: ethereum, address: 0xa160cdab225685da1d56aa342ad8841c3b53f291, role: mixer, label: "Tornado 100 ETH"}
  - {id: t10, chain: ethereum, address: 0x910cbd523d972eb0a6f4cae4618ad62622b39dbf, role: mixer, label: "Tornado 10 ETH"}
  - {id: t1, chain: ethereum, address: 0x47ce0c6ed5b0ce3d3a51fdb1c52dc66a7c3c2936, role: mixer, label: "Tornado 1 ETH"}
edges:
  - {from: f0, to: rcv, asset: ETH, amount: 0.1, tx: 0x12ecc468c37e77137770d2b38b2da249f4689d7b7995cd8b6936749a0d20a4f1, time: 2026-11-21T15:22:47Z, verified: oak}
  - {from: vic, to: rcv, asset: CYBER, amount: 5213000, tx: 0x92a1b430c066cbfb636f67f5354b1720c47e6075523551d9f47bb03bcdc20737, time: 2026-11-21T16:15:11Z, technique: T10.002, verified: oak}
  - {from: rcv, to: sell, asset: CYBER, amount: 3531082, tx: 0xf5c55a1e0d6ea9300f27025e0431b5dac6baf59481ceaab297905609e88f8e66, time: 2026-11-21T16:48:35Z, verified: oak}
  - {from: rcv, to: sell, asset: ETH, amount: 147.755, tx: 0x4361c34fdde74389c5df0c57c64aa4369f438dfaf04036ab7e546a2b595e9ad8, time: 2026-11-21T16:49:47Z, verified: oak}
  - {from: sell, to: hold, asset: ETH, amount: 575.286, tx: 0xfba2151e4018b46ecc51f85645c5fa18820dc412d16f87119431067a87fa7f65, time: 2026-11-21T17:40:35Z, verified: oak}
  - {from: hold, to: pre, asset: ETH, amount: 575.28593174, tx: 0x24fc3eb3fab81c61c32d3102e9dc5349a73c69f41e2aa4f4ae0469b7ed30697e, time: 2026-11-23T09:16:35Z, verified: oak}
  - {from: pre, to: t100, asset: ETH, amount: 500, tx: 0x66972847c9382598450b80e56bd9607b333e8bf6f1f3a0917e835d18e731110e, time: 2026-11-25T18:07:47Z, tx_count: 5, time_last: 2026-11-25T18:10:11Z, technique: T7.001, verified: oak}
  - {from: pre, to: t10, asset: ETH, amount: 70, tx: 0xc8e6a03b423d557f704d0534238fd6a90934285ad4dede98c521b25df1aa0d25, time: 2026-11-25T18:10:35Z, tx_count: 7, time_last: 2026-11-25T18:14:11Z, technique: T7.001, verified: oak}
  - {from: pre, to: t1, asset: ETH, amount: 5, tx: 0xcef341ffadc2a4ab623e3a3048ac91960433c0ab3ea23cb11c693b4994182f5b, time: 2026-11-25T17:58:35Z, tx_count: 5, time_last: 2026-11-25T18:19:59Z, technique: T7.001, verified: oak}
```

## Root-cause evidence

- **Technique:** OAK-T10.002
- **Source:** <https://bitquery.io/investigations/cyber-bridge-hack>; <https://x.com/BuildOnCyber/status/2124207519581327394>; <https://www.theblock.co/news/defi/2026-11-21-cyber-investigating-suspected-1-million-bridge-exploit-as-upbit-bithumb-freeze-transfers-444810>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** Cyber confirms only the on-chain sequence: "unexpected minting of CYBER on Solana, followed by a transfer of CYBER out of the bridge's Ethereum lockbox". OAK's trace confirms the 5,213,000 CYBER release from the lockbox to a newly funded wallet at 16:15:11 UTC. The mechanism, fake LayerZero messages accepted by a route that needed one verifier signature, signed by the same key as the route's real messages, comes from Bitquery alone (a same-day third-party analysis; Rekt Radar repeats it and says root cause, "compromised key material or message-validation logic", is still under investigation). Not established: how the key and verifier admin access were obtained (Bitquery says the leak "points to the place where the keys are made or kept", an inference, not evidence), and which party operates the verifier. This is not `confirmed`: Cyber has published no cause or post-mortem that OAK found.

## Public references

- `[cyberx2026]` — Cyber, bridge update on X (2026-11-21 18:25 UTC): <https://x.com/BuildOnCyber/status/2124207519581327394>
- `[bitquerycyber2026]` — Bitquery Research, "Cyber bridge hack: one stolen key drained \$1.10M, and it still works" (2026-11-21, data to 2026-11-22 10:00 UTC): <https://bitquery.io/investigations/cyber-bridge-hack>
- `[theblockcyber2026]` — The Block, "Cyber investigating suspected \$1 million bridge exploit as Upbit, Bithumb freeze transfers" (2026-11-21): <https://www.theblock.co/news/defi/2026-11-21-cyber-investigating-suspected-1-million-bridge-exploit-as-upbit-bithumb-freeze-transfers-444810>
- `[rektradarcyber2026]` — Rekt Radar, "Web3 Daily Exploits, 22 Nov 2026": <https://www.rektradar.xyz/web3-daily-exploits-22-nov-2026-cyber-bridge-968k-chainflip-12m-update/>
- Related sibling case, different bridge: [2026-11 Ankr Ethereum bridge forged receipts](2026-11-ankr-ethereum-bridge-forged-signed-receipts-withdraw.md)
