# Chainflip — an attacker with a minimum-stake validator account reportedly extracted key shares through a memory-safety flaw in a networking library, then signed vault withdrawals outside the network — Chainflip / Bitcoin and Ethereum vaults — 2026-11-21

**Loss:** **~\$12.6M** at 21 November morning prices, "effectively the entire vault balance at the time", per Chainflip's incident report (Part 1). Assets: 133.34425053 BTC (122.86137042 + 10.48288011 in two Bitcoin transactions), 520.2243399 ETH, 3,249,631.41 USDC and 758,141.33 USDT. The first public alerts counted only the Ethereum vault (~\$4.86M, Defimon and Arisk); Cointelegraph reported "about \$12 million" on 2026-11-22. Recovery: none found. The 90% return offer expired at 18:38 UTC on 2026-11-23 and Rekt Radar reports nothing was returned. Chainflip's statement on user reimbursement: undisclosed (the report says a further update will cover "how affected users will be treated").

**OAK Techniques observed:** **OAK-T10.001** (Validator / Signer Key Compromise — *primary*, per Chainflip). The attacker registered a validator account with the minimum stake, which never joined the active set but was enough for active validators to accept peer-to-peer connections from it. Chainflip says it then used a memory-safety flaw in a third-party networking library to run code on validator machines and extract key shares, and produced vault signatures outside the network that the protocol "never requested". The vaults accepted those signatures because they verified against the live aggregate key. Same sub-shape as the participant-extracts-key case in [`examples/2026-05-thorchain-router-exploit.md`](2026-05-thorchain-router-exploit.md). See [`techniques/T10.001-validator-signer-key-compromise.md`](../techniques/T10.001-validator-signer-key-compromise.md). **OAK-T7.001** (Mixer-Routed Hop — 2,909 ETH sent to Tornado Cash, per Chainflip and PeckShield; also the attacker's funding on 2026-11-11, per Chainflip). The code-execution flaw in the networking library has no OAK Technique of its own; OAK does not stretch one to fit it.

**Attribution:** **unattributed.** Chainflip says it holds identifying metadata on the validator and servers used and has engaged law enforcement and ZeroShadow, but names no one. Attacker addresses in this file are listed as roles, not identities.

**Key teaching point:** **A threshold-signing network must not let an unstaked-in-practice peer reach the processes that hold key shares, and one memory-safety bug must not be enough to read a share.** Here a minimum-stake account that never entered the active set was still accepted as a peer; a single flaw in a dependency then exposed shares, and a valid signature from the real aggregate key cannot be told apart from a legitimate one on-chain. Controls that sit outside the signing network would have limited it: a per-window egress cap and a time delay on large vault withdrawals enforced in the vault contracts, and admitting only active-set peers to the signing-process network port.

Different Chainflip incident, not merged: [2026-09 Chainflip Tron memo-append duplicate payout](2026-09-chainflip-tron-memo-append-duplicate-refund-payout.md).

## Summary

On 2026-11-21 at 06:41 UTC, 122.86137042 BTC left Chainflip's Bitcoin vault to a new address; at 07:10:59 UTC a new relayer address called `transferBatch` on the Ethereum vault and moved 520.2243399 ETH, 3,249,631.41 USDC and 758,141.33 USDT to a fresh address. The Ethereum call passed the vault's signature check against the aggregate key in effect. Within minutes the stablecoins were swapped to ETH and 2,909 ETH went to Tornado Cash. A further 10.48288011 BTC was taken at 11:24 UTC. Defimon posted first (07:33 UTC), classing it as a signing-key compromise; Chainflip's first statement came at 09:14 UTC and put the protocol into Full Safe Mode.

Chainflip's incident report (Part 1, dated 2026-11-23) gives the mechanism above, a timeline, two forced key rotations and a patched validator release. It is a partial report: it does not name the library, say how many key shares were extracted, or explain why the first alert was not escalated for about an hour. The report words the library flaw as "reportedly", so OAK records it as corroborated, not confirmed.

## Timeline (UTC)

**Entry** is the validator account and the library flaw; **preparation** is attacker funding; **execution** is the two Bitcoin takes and the Ethereum `transferBatch`; **funds** are swaps, Tornado Cash and BTC held; **response** is rotation, safe mode and the bounty offer. Times for the vault transactions and fund movements are from OAK's on-chain check; times marked "Chainflip" are from its incident report.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-20 (undisclosed) | A memory-safety flaw exists in a third-party networking library used by the validator software. The library, and how long the flaw existed, are undisclosed. | **T10.001** (no separate Technique for the library flaw) |
| 2026-11-11 | Chainflip traces preparation to Tornado Cash funding on this date (Chainflip return page and Cointelegraph; addresses not published). | T7.001 |
| 2026-11-20 11:00:18 (Chainflip) | Validator account `cFMH2YX722cFGNemZ5tbZnq7XvYZ3xWyTRdLrW1cLgyrJtEKe` registers with the minimum stake, 79 seconds after being funded with 20,500 FLIP. It never joins the active set. | **T10.001** |
| 2026-11-20 11:07:06 (Chainflip) | The attacker registers a peer-to-peer identity; active validators begin accepting connections from it. | **T10.001** |
| Between 2026-11-20 11:07 and 2026-11-21 06:41 (undisclosed) | Code runs on validator machines and key shares are extracted. Chainflip does not say when, or how many shares. | **T10.001** |
| 2026-11-21 06:41:01 | 122.86137042 BTC leaves the Bitcoin vault in [`20262de39ec3331d78be2b87f18c90cb2ee30363311dd43def14c3aecf155b7a`](https://mempool.space/tx/20262de39ec3331d78be2b87f18c90cb2ee30363311dd43def14c3aecf155b7a). | **T10.001** |
| 2026-11-21 06:49 (Chainflip) | An automated warning is posted to an internal channel. The monitor was not linked to automated escalation and had produced false positives. | response |
| 2026-11-21 07:01:27 | The stolen BTC moves on in [`ac38a5aea1ed81b84307a3709f502abd4c4d3af5502493f883c6d19624fd2cb4`](https://mempool.space/tx/ac38a5aea1ed81b84307a3709f502abd4c4d3af5502493f883c6d19624fd2cb4). | — |
| 2026-11-21 07:09:59 | The relayer is funded with 0.99331163 ETH from `0x47ce0c6ed5b0ce3d3a51fdb1c52dc66a7c3c2936` in [`0xd6d3554c88eb1d39c4471c82c6aa4b65f3180d9e6b0d5a09140cf1643d517fa8`](https://etherscan.io/tx/0xd6d3554c88eb1d39c4471c82c6aa4b65f3180d9e6b0d5a09140cf1643d517fa8). Funder not traced. | — |
| 2026-11-21 07:10:59 | `transferBatch` on the Ethereum vault sends 520.2243399 ETH, 3,249,631.410561 USDC and 758,141.332716 USDT to the recipient: [`0xc928950f79b4e4697af674310d1f3a08c2659adc4d60e719f3af90ab023ff20f`](https://etherscan.io/tx/0xc928950f79b4e4697af674310d1f3a08c2659adc4d60e719f3af90ab023ff20f). | **T10.001** |
| 2026-11-21 07:12:59 and 07:14:23 | The recipient sells the 3,249,631.410561 USDC and 758,141.332716 USDT through Uniswap V3 SwapRouter02 for ETH ([`0xca19dc5fc4c06ac352cb401926472213c382c8c498760ed45568d4ba91f57d70`](https://etherscan.io/tx/0xca19dc5fc4c06ac352cb401926472213c382c8c498760ed45568d4ba91f57d70), [`0x7d06e292d061c2afa794f2af068b8a36eba6ffa3647ebf989922b7bb5acad18d`](https://etherscan.io/tx/0x7d06e292d061c2afa794f2af068b8a36eba6ffa3647ebf989922b7bb5acad18d)). The swaps pay 1,910.01355786 and 457.21536027 ETH to the intermediate address. | — |
| 2026-11-21 07:15:11 | The recipient sends its 542.67341926 ETH to the intermediate address in [`0xbad5bb235f0858c0ac1799bfa6b8af6460bb031fd99d26a5d6e43fc9d91faf62`](https://etherscan.io/tx/0xbad5bb235f0858c0ac1799bfa6b8af6460bb031fd99d26a5d6e43fc9d91faf62). | — |
| 2026-11-21 07:18:23 to 07:19:11 | The intermediate address sends 1,102, 1,003 and 804 ETH (2,909 ETH) to the Multicall3 contract in [`0xc0cda816eb8cc1d02222ff2a3710e6c8653516504085480bb0574e2fd4c55ba4`](https://etherscan.io/tx/0xc0cda816eb8cc1d02222ff2a3710e6c8653516504085480bb0574e2fd4c55ba4), [`0xf099723577705720873851c727704061c26c7790c12883212d05c4eb13c3860e`](https://etherscan.io/tx/0xf099723577705720873851c727704061c26c7790c12883212d05c4eb13c3860e) and [`0x5813fe3cd5c5f7cc5e112ebf7f8ee4953c0eeb4fd63b9e604c78bbe062428838`](https://etherscan.io/tx/0x5813fe3cd5c5f7cc5e112ebf7f8ee4953c0eeb4fd63b9e604c78bbe062428838). Chainflip and PeckShield say this ETH went into Tornado Cash; OAK's tool did not resolve the internal calls. | T7.001 |
| 2026-11-21 07:33 | Defimon posts the first alert (valid signature from the live aggregate key). | response |
| 2026-11-21 07:41 to 07:52 (Chainflip) | A team member raises the alarm at 07:41, a community member escalates at 07:50:27, the first protocol responder is online at 07:52:49. | response |
| 2026-11-21 08:10 to 08:31 (Chainflip) | Governance forces a key rotation (executed 08:14:54, complete 08:21:48) and then proposes safe mode; swaps, deposits and withdrawals are paused by 08:31. The Ethereum vault key change confirms on Ethereum at 08:53:35. | response |
| 2026-11-21 09:14 | Chainflip posts its first public statement: full safe mode, deposits, withdrawals, swaps and quoting disabled. | response |
| 2026-11-21 10:00:11 (Chainflip) | The governance multisig suspends the Ethereum vault contract. | response |
| 2026-11-21 11:24:18 | A further 10.48288011 BTC leaves the Bitcoin vault, to a second address, in [`bc010685d63ac43477eda016118cb5e0f164d3836577ef920851af374a122b01`](https://mempool.space/tx/bc010685d63ac43477eda016118cb5e0f164d3836577ef920851af374a122b01). This is after the first rotation, which Chainflip does not explain. | **T10.001** |
| 2026-11-21 12:37:18 (Chainflip) | The attacker's account is removed from the validator peer list. A patched release goes to validator operators at 17:06. | response |
| 2026-11-22 11:17 to 11:24 (Chainflip) | A second forced key rotation is executed and completes. | response |
| 2026-11-22 | Chainflip confirms the larger loss; Cointelegraph reports about \$12M and a 10% bounty offer with an 18:38 UTC 2026-11-23 deadline, and that the attack traces to Tornado Cash funding on 11-11 and a validator account registered on 11-20. | response |
| 2026-11-23 11:31 (Chainflip) | All active validators are running the patched release. | response |
| 2026-11-23 18:38 | The bounty deadline passes. Rekt Radar (24 Nov) reports nothing was returned. Chainflip's report says 122.86136932 BTC and 10.48283731 BTC were unmoved at 17:18 CET on 23 November. | response |
| 2026-11-26 (OAK check) | Both BTC addresses still hold their coins (see Fund flow). The 2,909 ETH is in Tornado Cash per Chainflip; Chainflip says demixing efforts continue if assets pass from there. | — |

Key addresses:

- Ethereum vault (victim, "Chainflip 1 Chainflip DEX Vault") — [`0xf5e10380213880111522dd0efd3dbb45b9f62bcc`](https://etherscan.io/address/0xf5e10380213880111522dd0efd3dbb45b9f62bcc)
- Relayer (tx sender, funded 07:09:59, one transaction) — [`0x78fa4ac270db14886033e95b9b9e93f887aa2db0`](https://etherscan.io/address/0x78fa4ac270db14886033e95b9b9e93f887aa2db0)
- Recipient — [`0x7d14a719072DA80076b4edcec3e3401209d21Eaf`](https://etherscan.io/address/0x7d14a719072DA80076b4edcec3e3401209d21Eaf)
- Intermediate (ETH collector before Tornado) — [`0xfd24197eF8503dd5dd18F30C7B86A77910D3B080`](https://etherscan.io/address/0xfd24197eF8503dd5dd18F30C7B86A77910D3B080)
- Multicall3 — [`0xca11bde05977b3631167028862be2a173976ca11`](https://etherscan.io/address/0xca11bde05977b3631167028862be2a173976ca11)
- Bitcoin vault (inputs of both BTC thefts) — [`bc1pypc0kf38v59qhkf0h4nnhxqtn7yjxukpaakasge76azn6hnzrvusyssp94`](https://mempool.space/address/bc1pypc0kf38v59qhkf0h4nnhxqtn7yjxukpaakasge76azn6hnzrvusyssp94)
- First BTC receiver — [`bc1qmj0x9pkyup07j09axvvr6aquqfsdw254nlz5lz`](https://mempool.space/address/bc1qmj0x9pkyup07j09axvvr6aquqfsdw254nlz5lz)
- BTC holding address 1 (122.86136932 BTC) — [`bc1qm777twlzmelyutungyfw65ykn2l5kn68e6v4g6`](https://mempool.space/address/bc1qm777twlzmelyutungyfw65ykn2l5kn68e6v4g6)
- BTC holding address 2 (10.48283731 BTC) — [`bc1qp5r8aemhg8pxytlhcn43k8ptc6l6y03vxud5pr`](https://mempool.space/address/bc1qp5r8aemhg8pxytlhcn43k8ptc6l6y03vxud5pr)
- Attacker validator account (Chainflip chain) — `cFMH2YX722cFGNemZ5tbZnq7XvYZ3xWyTRdLrW1cLgyrJtEKe`
- Return addresses named on chainflip.io/return (addresses of Chainflip's offer, not attacker wallets) — BTC [`bc1qux4nruxvwfxyv2n5d4fw0a363d4lxn5f45rats`](https://mempool.space/address/bc1qux4nruxvwfxyv2n5d4fw0a363d4lxn5f45rats), ETH [`0x38a4BCC04f5136e6408589A440F495D7AD0F34DB`](https://etherscan.io/address/0x38a4BCC04f5136e6408589A440F495D7AD0F34DB)

Watch-out: the recipient's transfer list is full of zero-value and fake-token transfers to lookalike `0xfd24…` and `0xfd21…` addresses (repeated "542.67341926 ETH" entries after 07:16 are untrusted-token or spoofed events, flagged `trusted: false` by the explorer). Only the 07:15:11 native transfer above moved real ETH. Two tiny BTC deposits (1e-05 BTC on 11-21 and 5.46e-06 BTC on 11-24) arrived at the first holding address from other addresses; they are dust, not movement of the stolen coins. Check full addresses, never the ends.

## Fund flow

Ethereum and Bitcoin legs traced by OAK with `tools/explorer.py` (Blockscout and mempool.space, keyless) on 2026-11-26. The 2,909 ETH edge to Multicall3 is what OAK saw on-chain; the onward Tornado Cash edge is `verified: source` (Chainflip and PeckShield), because OAK's tool could not read the internal calls. The Tornado node has no address for the same reason.

```oak-flow
as_of: 2026-11-26T12:00Z
nodes:
  - {id: vic, chain: ethereum, address: 0xf5e10380213880111522dd0efd3dbb45b9f62bcc, role: victim-hot-wallet, label: "Chainflip Ethereum vault"}
  - {id: rel, chain: ethereum, address: 0x78fa4ac270db14886033e95b9b9e93f887aa2db0, role: attacker-eoa, label: "Relayer (tx sender)"}
  - {id: rcv, chain: ethereum, address: 0x7d14a719072da80076b4edcec3e3401209d21eaf, role: attacker-receiver, label: "Recipient"}
  - {id: uni, chain: ethereum, address: 0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45, role: dex, label: "Uniswap V3 SwapRouter02"}
  - {id: mid, chain: ethereum, address: 0xfd24197ef8503dd5dd18f30c7b86a77910d3b080, role: attacker-holding, label: "Intermediate"}
  - {id: mc3, chain: ethereum, address: 0xca11bde05977b3631167028862be2a173976ca11, role: intermediary, label: "Multicall3"}
  - {id: tc, chain: ethereum, role: mixer, label: "Tornado Cash"}
  - {id: bvic, chain: bitcoin, address: bc1pypc0kf38v59qhkf0h4nnhxqtn7yjxukpaakasge76azn6hnzrvusyssp94, role: victim-hot-wallet, label: "Chainflip Bitcoin vault"}
  - {id: b1, chain: bitcoin, address: bc1qmj0x9pkyup07j09axvvr6aquqfsdw254nlz5lz, role: attacker-receiver, label: "BTC receiver 1"}
  - {id: bh1, chain: bitcoin, address: bc1qm777twlzmelyutungyfw65ykn2l5kn68e6v4g6, role: attacker-holding, label: "BTC holding 1"}
  - {id: bh2, chain: bitcoin, address: bc1qp5r8aemhg8pxytlhcn43k8ptc6l6y03vxud5pr, role: attacker-holding, label: "BTC holding 2"}
edges:
  - {from: vic, to: rcv, asset: ETH, amount: 520.2243399, tx: 0xc928950f79b4e4697af674310d1f3a08c2659adc4d60e719f3af90ab023ff20f, time: 2026-11-21T07:10:59Z, technique: T10.001, verified: oak}
  - {from: vic, to: rcv, asset: USDC, amount: 3249631.410561, tx: 0xc928950f79b4e4697af674310d1f3a08c2659adc4d60e719f3af90ab023ff20f, time: 2026-11-21T07:10:59Z, technique: T10.001, verified: oak}
  - {from: vic, to: rcv, asset: USDT, amount: 758141.332716, tx: 0xc928950f79b4e4697af674310d1f3a08c2659adc4d60e719f3af90ab023ff20f, time: 2026-11-21T07:10:59Z, technique: T10.001, verified: oak}
  - {from: rcv, to: uni, asset: USDC, amount: 3249631.410561, tx: 0xca19dc5fc4c06ac352cb401926472213c382c8c498760ed45568d4ba91f57d70, time: 2026-11-21T07:12:59Z, verified: oak}
  - {from: rcv, to: uni, asset: USDT, amount: 758141.332716, tx: 0x7d06e292d061c2afa794f2af068b8a36eba6ffa3647ebf989922b7bb5acad18d, time: 2026-11-21T07:14:23Z, verified: oak}
  - {from: uni, to: mid, asset: ETH, amount: 2367.22891813, tx: 0xca19dc5fc4c06ac352cb401926472213c382c8c498760ed45568d4ba91f57d70, time: 2026-11-21T07:12:59Z, tx_count: 2, time_last: 2026-11-21T07:14:23Z, verified: oak}
  - {from: rcv, to: mid, asset: ETH, amount: 542.67341926, tx: 0xbad5bb235f0858c0ac1799bfa6b8af6460bb031fd99d26a5d6e43fc9d91faf62, time: 2026-11-21T07:15:11Z, verified: oak}
  - {from: mid, to: mc3, asset: ETH, amount: 2909, tx: 0xc0cda816eb8cc1d02222ff2a3710e6c8653516504085480bb0574e2fd4c55ba4, time: 2026-11-21T07:18:23Z, tx_count: 3, time_last: 2026-11-21T07:19:11Z, technique: T7.001, verified: oak}
  - {from: mc3, to: tc, asset: ETH, amount: 2909, tx: 0x5813fe3cd5c5f7cc5e112ebf7f8ee4953c0eeb4fd63b9e604c78bbe062428838, time: 2026-11-21T07:19:11Z, technique: T7.001, verified: source, source: peckshieldchainflip2026}
  - {from: bvic, to: b1, asset: BTC, amount: 122.86137042, tx: 20262de39ec3331d78be2b87f18c90cb2ee30363311dd43def14c3aecf155b7a, time: 2026-11-21T06:41:01Z, technique: T10.001, verified: oak}
  - {from: b1, to: bh1, asset: BTC, amount: 122.86136932, tx: ac38a5aea1ed81b84307a3709f502abd4c4d3af5502493f883c6d19624fd2cb4, time: 2026-11-21T07:01:27Z, verified: oak}
  - {from: bvic, to: bh2, asset: BTC, amount: 10.48283731, tx: bc010685d63ac43477eda016118cb5e0f164d3836577ef920851af374a122b01, time: 2026-11-21T11:24:18Z, technique: T10.001, verified: oak}
```

## Root-cause evidence

- **Technique:** OAK-T10.001
- **Source:** <https://chainflip.io/blog/incident-report-vault-exploit-21-november-2026-part-1>; <https://chainflip.io/return>; <https://x.com/DefimonAlerts/status/2124043470151004633>; <https://x.com/Arisk_io/status/2124103844162646268>
- **Source type:** operator
- **Confidence:** corroborated
- **Evidence:** Chainflip's incident report (Part 1) says the attacker produced vault signatures "that the Chainflip protocol never requested", after registering a minimum-stake validator, being accepted as a peer, and reportedly exploiting "a memory-safety flaw in a third-party networking library" to run code on validators and extract key shares. The chainflip.io/return page names "key exposure" as the mechanism. OAK's own check confirms the on-chain half: one `transferBatch` from a one-transaction relayer moved the whole liquid ETH, USDC and USDT balance, and the Bitcoin vault was spent in two transactions. Defimon and Arisk (same-day third parties) say the Ethereum signature verified against the live aggregate key, which is consistent. The operator's own wording is "reportedly" and the report is partial, so OAK records `corroborated`, not `confirmed`. Not established: the library and flaw, how many key shares were taken, why the second BTC theft succeeded after the first rotation, and the attacker's identity.

## Public references

- `[chainflipincident2026]` — Chainflip, "Incident Report: Bitcoin and Ethereum Vault Exploit (Part 1)" (2026-11-23): <https://chainflip.io/blog/incident-report-vault-exploit-21-november-2026-part-1>
- `[chainflipreturn2026]` — Chainflip, return and bounty page (read 2026-11-26; the page is dated 25 November): <https://chainflip.io/return>
- `[chainflipx2026]` — Chainflip on X, first statement (2026-11-21 09:14 UTC): <https://x.com/Chainflip/status/2124068986845532605>
- `[defimonchainflip2026]` — Defimon, first alert (2026-11-21 07:33 UTC): <https://x.com/DefimonAlerts/status/2124043470151004633>
- `[arisk2026]` — Arisk, Ethereum vault analysis (2026-11-21 11:33 UTC): <https://x.com/Arisk_io/status/2124103844162646268>
- `[peckshieldchainflip2026]` — PeckShield, swap to ETH and Tornado Cash (2026-11-21 12:12 UTC): <https://x.com/PeckShieldAlert/status/2124113770373120243>
- `[onchainlenschainflip2026]` — Onchain Lens (2026-11-21 07:54 UTC): <https://x.com/OnchainLens/status/2124048730337026360>
- `[cointelegraphchainflip2026]` — Cointelegraph, Chainflip \$12M hack and 10% bounty (2026-11-22): <https://cointelegraph.com/news/chainflip-12m-crypto-hack-10-percent-bounty>
- `[defiantchainflip2026]` — The Defiant, "Chainflip halts swaps over potential vault exploit": <https://thedefiant.io/news/security/chainflip-halts-swaps-over-potential-vault-exploit>
- `[rektradarchainflip2026]` — Rekt Radar daily briefs, 21 Nov, 22 Nov and 24 Nov 2026: <https://www.rektradar.xyz/web3-daily-exploits-21-nov-2026-chainflip-4-86m-tss-key/>, <https://www.rektradar.xyz/web3-daily-exploits-22-nov-2026-cyber-bridge-968k-chainflip-12m-update/>, <https://www.rektradar.xyz/web3-daily-exploits-24-nov-2026-stake-dao-forum-breach-no-funds/>
- Related, different incident: [2026-09 Chainflip Tron memo-append duplicate payout](2026-09-chainflip-tron-memo-append-duplicate-refund-payout.md)
