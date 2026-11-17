# Pennysia — Settlement V1 arbitrary external call spent users' leftover token approvals — Pennysia Settlement V1 / Ethereum — 2026-11-12

**Loss:** **~\$5K** (5,006.133489 USDC, 0.05 wstETH and 101,000 YUNO, per Lookonchain and RektRadar; the amounts match the token transfers of the attack transaction traced by OAK). Total loss and victim count beyond this one transaction are undisclosed. No reimbursement statement was found.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*, per SlowMist. The Settlement contract let the caller choose the target and calldata of an external call, so the contract's own token allowances could be spent by anyone. This is the same missing-input-validation sub-pattern as [Li.Fi 2024](2024-07-li-finance.md) and [Transit Swap 2022](2022-10-transit-swap.md). See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T4.004** (Allowance / Approve-Pattern Drainer — downstream: the loss was limited to approvals users had granted and not revoked). **OAK-T7.003** (Cross-Chain Bridge Laundering — a MetaBridge `bridge` call carried the wstETH onward; traced by OAK, destination undisclosed).

**Attribution:** **unattributed** (attacker address [`0x813A5aB666AdeBa907548235fbAc087642878300`](https://etherscan.io/address/0x813A5aB666AdeBa907548235fbAc087642878300) per SlowMist; no further attribution published).

**Key teaching point:** **A settlement or router contract that holds user token approvals must never let the caller pick the target and calldata of an external call; restrict targets to an allowlist that excludes token contracts, and let users approve exact amounts.** Here users had approved the Settlement contract for swaps and left the allowances open, so one arbitrary call turned them into the attacker's balance.

## Summary

On 2026-11-12 at 13:59:11 UTC an attacker contract [`0x96Bb89E3F86312968cE11A1bD8d9d28F4891a17A`](https://etherscan.io/address/0x96Bb89E3F86312968cE11A1bD8d9d28F4891a17A) was called from [`0x813A5aB666AdeBa907548235fbAc087642878300`](https://etherscan.io/address/0x813A5aB666AdeBa907548235fbAc087642878300) in block 26399314 ([`0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d`](https://etherscan.io/tx/0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d)). The transaction made the Pennysia Settlement contract [`0x3Aad97E5a91b8e43b7Dc830aCEb004307678795E`](https://etherscan.io/address/0x3Aad97E5a91b8e43b7Dc830aCEb004307678795E) execute `transferFrom` on four holders' leftover approvals and forward the tokens to the attack contract, which sent them to the attacker EOA. SlowMist reported after user reports of stolen funds and told anyone who had approved tokens to the Settlement contract to revoke. The mechanism is SlowMist's description of an "arbitrary external call"; the exact function and calldata were not published and OAK did not decode them.

## Timeline (UTC)

Stages: **Flaw** (Settlement V1 deployed and used) → **Preparation** (attacker funded) → **Take** (one transaction) → **Money** (USDC and wstETH moved within about a minute) → **Response**. Times are block timestamps traced by OAK.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-26 (undisclosed) | Settlement V1 [`0x3Aad97E5a91b8e43b7Dc830aCEb004307678795E`](https://etherscan.io/address/0x3Aad97E5a91b8e43b7Dc830aCEb004307678795E) (verified as `PennysiaSettlement`, deployed by [`0xDa70eC0779aB1904B7eb6C32f308B1a1C163fCB8`](https://etherscan.io/address/0xDa70eC0779aB1904B7eb6C32f308B1a1C163fCB8)) is live and users call `executeSwap` against it, e.g. from 2026-10-26, leaving approvals open. The exploitable external call existed from deployment or a later change; undisclosed. | **T9.004** |
| 2026-11-12 13:37:35 to 13:38:35 | The attacker EOA receives three small ETH transfers from three different addresses (about 0.0029, 0.0043 and 0.0058 ETH) to pay gas. The senders are not identified. | — |
| 2026-11-12 13:59:11 | [`0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d`](https://etherscan.io/tx/0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d): the attacker calls the attack contract, which makes the Settlement contract spend approvals of four holders: [`0xF2Ff84D45783BD64913903516FA44B419F266998`](https://etherscan.io/address/0xF2Ff84D45783BD64913903516FA44B419F266998) (5,000 USDC), [`0x61081de92Ad52c786719537D84a4534A398bf76a`](https://etherscan.io/address/0x61081de92Ad52c786719537D84a4534A398bf76a) (6.133489 USDC), [`0x56EbC608fD6B8F8CeF2775a3Ee0DddaEc01A7000`](https://etherscan.io/address/0x56EbC608fD6B8F8CeF2775a3Ee0DddaEc01A7000) (0.05 wstETH) and [`0x40A86E910AB2E709cb552f6F8A979bc90D669497`](https://etherscan.io/address/0x40A86E910AB2E709cb552f6F8A979bc90D669497) (101,000 YUNO). Each token goes victim → Settlement → attack contract → attacker. | **T9.004**, T4.004 |
| 2026-11-12 13:59:47 | [`0x523f691f946ca7aa9f15999c2b828d2bde678241b303ca17a95df26365ea56e3`](https://etherscan.io/tx/0x523f691f946ca7aa9f15999c2b828d2bde678241b303ca17a95df26365ea56e3): the attacker sends all 5,006.133489 USDC to [`0xd492f207c2C2520Dcb13eD04AfA81aAae66C9378`](https://etherscan.io/address/0xd492f207c2C2520Dcb13eD04AfA81aAae66C9378), an EOA. On 2026-11-13 22:08:35 that address sends the USDC to the contract [`0x9A47f3289794E9bbc6a3C571f6D96Ad4E7bAED16`](https://etherscan.io/address/0x9A47f3289794E9bbc6a3C571f6D96Ad4E7bAED16) ([`0x945e60e35b130546d7d6805f88e6c3a049958342995b06f1bd1225825c276b74`](https://etherscan.io/tx/0x945e60e35b130546d7d6805f88e6c3a049958342995b06f1bd1225825c276b74)); onward path not traced. | T7.003 |
| 2026-11-12 14:00:47 | [`0xbb5ce35d3e307da88f74e32d28906f05d12ca2cf1faeef646f9c854f69e3323f`](https://etherscan.io/tx/0xbb5ce35d3e307da88f74e32d28906f05d12ca2cf1faeef646f9c854f69e3323f): the attacker calls `bridge` on MetaBridge [`0x0439e60F02a8900a951603950d8D4527f400C3f1`](https://etherscan.io/address/0x0439e60F02a8900a951603950d8D4527f400C3f1) with 0.05 wstETH, which goes to the same contract [`0x9A47f3289794E9bbc6a3C571f6D96Ad4E7bAED16`](https://etherscan.io/address/0x9A47f3289794E9bbc6a3C571f6D96Ad4E7bAED16); within that transaction the wstETH is split, swapped and passed on to other addresses. Final destination undisclosed. | T7.003 |
| 2026-11-12 14:12 to 14:16 | The attacker receives 0.003907565135158029 WETH and unwraps it to ETH ([`0x259e51ede919db3f4e40b57f4c614f77aa3ac545bc12634053c35045c199634a`](https://etherscan.io/tx/0x259e51ede919db3f4e40b57f4c614f77aa3ac545bc12634053c35045c199634a)). | — |
| 2026-11-12 22:09 onward | The attacker sends token transfers of 5,006.133489 units labelled "USDC" (with non-standard characters in the token symbol) to several addresses that begin with `0xd492` and end with `9378`, the same pattern as the real holding address. Those are not the USDC contract; this looks like address-poisoning bait and is an OAK observation, not a sourced claim. | — |
| 2026-11-12 | The 101,000 YUNO is not moved by the attacker in the transfers OAK checked. | — |
| 2026-11-12 to 2026-11-13 | SlowMist issues a TI alert listing the Settlement contract and attacker and urges revocation; Lookonchain and RektRadar repeat it. RektRadar says no pause, patch or reimbursement announcement was found, and the contract was still live. No statement from Pennysia was located. | response |

Key addresses:

- Attacker EOA — [`0x813A5aB666AdeBa907548235fbAc087642878300`](https://etherscan.io/address/0x813A5aB666AdeBa907548235fbAc087642878300)
- Attack contract — [`0x96Bb89E3F86312968cE11A1bD8d9d28F4891a17A`](https://etherscan.io/address/0x96Bb89E3F86312968cE11A1bD8d9d28F4891a17A)
- Vulnerable contract (Pennysia Settlement V1) — [`0x3Aad97E5a91b8e43b7Dc830aCEb004307678795E`](https://etherscan.io/address/0x3Aad97E5a91b8e43b7Dc830aCEb004307678795E)
- Settlement deployer — [`0xDa70eC0779aB1904B7eb6C32f308B1a1C163fCB8`](https://etherscan.io/address/0xDa70eC0779aB1904B7eb6C32f308B1a1C163fCB8)
- USDC holding address — [`0xd492f207c2C2520Dcb13eD04AfA81aAae66C9378`](https://etherscan.io/address/0xd492f207c2C2520Dcb13eD04AfA81aAae66C9378)
- Contract receiving USDC and wstETH — [`0x9A47f3289794E9bbc6a3C571f6D96Ad4E7bAED16`](https://etherscan.io/address/0x9A47f3289794E9bbc6a3C571f6D96Ad4E7bAED16)
- Victims — [`0xF2Ff84D45783BD64913903516FA44B419F266998`](https://etherscan.io/address/0xF2Ff84D45783BD64913903516FA44B419F266998), [`0x61081de92Ad52c786719537D84a4534A398bf76a`](https://etherscan.io/address/0x61081de92Ad52c786719537D84a4534A398bf76a), [`0x56EbC608fD6B8F8CeF2775a3Ee0DddaEc01A7000`](https://etherscan.io/address/0x56EbC608fD6B8F8CeF2775a3Ee0DddaEc01A7000), [`0x40A86E910AB2E709cb552f6F8A979bc90D669497`](https://etherscan.io/address/0x40A86E910AB2E709cb552f6F8A979bc90D669497)

## Fund flow

```oak-flow
as_of: 2026-11-17T00:00Z
nodes:
  - {id: v1, chain: ethereum, address: 0xF2Ff84D45783BD64913903516FA44B419F266998, role: victim, label: "Victim 1"}
  - {id: v2, chain: ethereum, address: 0x61081de92Ad52c786719537D84a4534A398bf76a, role: victim, label: "Victim 2"}
  - {id: v3, chain: ethereum, address: 0x56EbC608fD6B8F8CeF2775a3Ee0DddaEc01A7000, role: victim, label: "Victim 3"}
  - {id: v4, chain: ethereum, address: 0x40A86E910AB2E709cb552f6F8A979bc90D669497, role: victim, label: "Victim 4"}
  - {id: stl, chain: ethereum, address: 0x3Aad97E5a91b8e43b7Dc830aCEb004307678795E, role: vulnerable-contract, label: "Pennysia Settlement V1"}
  - {id: atkc, chain: ethereum, address: 0x96Bb89E3F86312968cE11A1bD8d9d28F4891a17A, role: attack-contract, label: "Attack contract"}
  - {id: atk, chain: ethereum, address: 0x813A5aB666AdeBa907548235fbAc087642878300, role: attacker-eoa, label: "Attacker"}
  - {id: r1, chain: ethereum, address: 0xd492f207c2C2520Dcb13eD04AfA81aAae66C9378, role: attacker-receiver, label: "USDC holding address"}
  - {id: r2, chain: ethereum, address: 0x9A47f3289794E9bbc6a3C571f6D96Ad4E7bAED16, role: unknown, label: "Contract that received USDC and wstETH (unlabelled)"}
edges:
  - {from: v1, to: stl, asset: USDC, amount: 5000, tx: 0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d, time: 2026-11-12T13:59:11Z, technique: T9.004, verified: oak}
  - {from: stl, to: atkc, asset: USDC, amount: 5000, tx: 0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d, time: 2026-11-12T13:59:11Z, technique: T9.004, verified: oak}
  - {from: atkc, to: atk, asset: USDC, amount: 5000, tx: 0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d, time: 2026-11-12T13:59:11Z, technique: T9.004, verified: oak}
  - {from: v2, to: stl, asset: USDC, amount: 6.133489, tx: 0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d, time: 2026-11-12T13:59:11Z, technique: T9.004, verified: oak}
  - {from: stl, to: atkc, asset: USDC, amount: 6.133489, tx: 0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d, time: 2026-11-12T13:59:11Z, technique: T9.004, verified: oak}
  - {from: atkc, to: atk, asset: USDC, amount: 6.133489, tx: 0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d, time: 2026-11-12T13:59:11Z, technique: T9.004, verified: oak}
  - {from: v3, to: stl, asset: wstETH, amount: 0.05, tx: 0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d, time: 2026-11-12T13:59:11Z, technique: T9.004, verified: oak}
  - {from: stl, to: atkc, asset: wstETH, amount: 0.05, tx: 0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d, time: 2026-11-12T13:59:11Z, technique: T9.004, verified: oak}
  - {from: atkc, to: atk, asset: wstETH, amount: 0.05, tx: 0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d, time: 2026-11-12T13:59:11Z, technique: T9.004, verified: oak}
  - {from: v4, to: stl, asset: YUNO, amount: 101000, tx: 0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d, time: 2026-11-12T13:59:11Z, technique: T9.004, verified: oak}
  - {from: stl, to: atkc, asset: YUNO, amount: 101000, tx: 0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d, time: 2026-11-12T13:59:11Z, technique: T9.004, verified: oak}
  - {from: atkc, to: atk, asset: YUNO, amount: 101000, tx: 0x2716c50e450272240f68f2827bcb4a336c2ac520951e0e530154566c295b732d, time: 2026-11-12T13:59:11Z, technique: T9.004, verified: oak}
  - {from: atk, to: r1, asset: USDC, amount: 5006.133489, tx: 0x523f691f946ca7aa9f15999c2b828d2bde678241b303ca17a95df26365ea56e3, time: 2026-11-12T13:59:47Z, technique: T7.003, verified: oak}
  - {from: atk, to: r2, asset: wstETH, amount: 0.05, tx: 0xbb5ce35d3e307da88f74e32d28906f05d12ca2cf1faeef646f9c854f69e3323f, time: 2026-11-12T14:00:47Z, technique: T7.003, verified: oak}
  - {from: r1, to: r2, asset: USDC, amount: 5006.133489, tx: 0x945e60e35b130546d7d6805f88e6c3a049958342995b06f1bd1225825c276b74, time: 2026-11-13T22:08:35Z, technique: T7.003, verified: oak}
```

## Root-cause evidence

- **Technique:** OAK-T9.004
- **Source:** <https://x.com/SlowMist_Team/status/2121135351377047735>; <https://www.rektradar.xyz/web3-daily-exploits-13-nov-2026-pennysia-5k-settlement-approval/>; <https://www.lookonchain.com/feeds/82046>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist: "The Settlement contract on Ethereum was exploited through an arbitrary external call, which let the attacker spend users' leftover token approvals." RektRadar and Lookonchain repeat SlowMist. The on-chain transfers match this picture (victims to Settlement to attack contract to attacker). Not established: the vulnerable function, whether the flaw was in the original deployment, and the operator's own account. Same-day third-party analysis, so not confirmed.

## Public references

- `[slowmist2026pennysia]` — SlowMist, TI alert on Pennysia Settlement (2026-11-13): <https://x.com/SlowMist_Team/status/2121135351377047735>
- `[rektradar2026pennysia]` — RektRadar, "Web3 daily exploits 13 Nov 2026: Pennysia \$5K Settlement approval": <https://www.rektradar.xyz/web3-daily-exploits-13-nov-2026-pennysia-5k-settlement-approval/>
- `[lookonchain2026pennysia]` — Lookonchain feed 82046: <https://www.lookonchain.com/feeds/82046>
