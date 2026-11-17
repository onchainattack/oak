# Chain Games — delegation share transfers did not sync reward checkpoints, so fresh recipient contracts re-claimed historical rewards and inflated 1,000 CHAIN into 36M+ shares — CHAIN delegation staking / Polygon PoS — 2026-11-15

**Loss:** **~\$20K** (about 37.98 million CHAIN per the operator; 36,007,148 CHAIN in the one transaction DefimonAlerts and OAK's trace show; ~\$20K per SlowMist and DefimonAlerts). The operator says stakers were to be made whole from a pre-attack snapshot; the amount actually refunded is undisclosed.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*, per SlowMist). When delegation shares were transferred, the staking contract did not synchronise the reward checkpoint, so a newly created recipient contract could repeatedly claim historical rewards through `restake()`. SlowMist says the attacker used this across 360 cycles to turn 1,000 CHAIN of initial shares into over 36M shares, then redeemed them through the normal withdrawal process. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md).

**Attribution:** **pseudonymous** (attacker EOA [`0x571d0ec17d84fdee89f5c9cf6b2fd930205e776f`](https://polygonscan.com/address/0x571d0ec17d84fdee89f5c9cf6b2fd930205e776f)). The operator's statement says "attackers using AI toolsets"; that is the operator's characterisation and OAK has no independent evidence for it.

**Key teaching point:** **A share transfer must settle reward checkpoints for both sender and recipient before balances move.** Every caller was entitled to call `restake()`; the books were wrong because the transfer left the recipient's reward baseline at zero, so the same history could be claimed again by each fresh recipient.

## Summary

Chain Games runs older CHAIN delegation staking contracts on Polygon, built on a Polygon ValidatorShare-style design (DefimonAlerts). On 2026-11-15 an attacker contract used delegation-share transfers to fresh recipient contracts and repeated `restake()` claims of historical rewards, inflating a 1,000 CHAIN position into over 36M shares (SlowMist). The shares were redeemed through the normal unbonding and withdrawal path, and the escrow paid 36,007,148 CHAIN to the attack contract in one transaction. OAK's trace shows that CHAIN sold into a Polygon pool for 20,345.506936 USDC within about a minute. The operator disabled delegation, snapshotted positions and said stakers would be made whole. DefimonAlerts (08:03 UTC) and SlowMist (10:13 UTC) published on 2026-11-16.

The figures do not match exactly. The operator says "about 37.98 million CHAIN" over a 03:23–04:38 UTC window. The one transaction named by SlowMist and DefimonAlerts moves 36,007,148 CHAIN. The remaining ~1.97M CHAIN is not explained by any source; OAK found no second transaction because the attacker's CHAIN activity was not fully traced. The operator's window may cover further transactions.

## Timeline (UTC)

**Flaw** (older delegation contracts), **Take** (inflate and withdraw), **Money** (sale to USDC, onward move), **Response**. Times of on-chain events are block times from OAK's lookup; alert times are post timestamps.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-15 (deployment date undisclosed) | The older CHAIN delegation staking contract, ValidatorShare [`0x4b197ce70af7faece9544ef29b76c1cccd54d7ac`](https://polygonscan.com/address/0x4b197ce70af7faece9544ef29b76c1cccd54d7ac), does not synchronise reward checkpoints on share transfers, so a new recipient can claim historical rewards through `restake()` (SlowMist). | **T9.016** |
| 2026-11-15 03:22:47 to 03:26:16 | Start of the window the operator gives: "between 03:23 and 04:38 UTC". On-chain the attacker EOA wraps about 61 POL twice and swaps WPOL for about 4.9 USDC each time, then sends about 4.8 USDC to the CHAIN/USDC pool [`0xa4e9cff312f719bf663cd88d2118aaa16a0b574f`](https://polygonscan.com/address/0xa4e9cff312f719bf663cd88d2118aaa16a0b574f) (e.g. [`0x4a2e284a8fb6e267fcd5feb086e781e69672903ca9618a7c216252e3dd158651`](https://polygonscan.com/tx/0x4a2e284a8fb6e267fcd5feb086e781e69672903ca9618a7c216252e3dd158651)); OAK reads these as test or setup transactions, an inference. Funding source and contract deployment are undisclosed. | — |
| 2026-11-15 03:34:05 | Transaction [`0x3705970a2eb947041640522d36d34822fc6a0eed3d0a9f05fff986da273019b4`](https://polygonscan.com/tx/0x3705970a2eb947041640522d36d34822fc6a0eed3d0a9f05fff986da273019b4), sent by the attacker EOA to contract [`0xc11dce2b74ce1717909c4c8d95e32b4cec5691fe`](https://polygonscan.com/address/0xc11dce2b74ce1717909c4c8d95e32b4cec5691fe). Per SlowMist, 360 restake cycles inflate 1,000 CHAIN of shares to over 36M. The escrow [`0x1cb1f66bde215161d4b6598ddc2defbbc009c5a4`](https://polygonscan.com/address/0x1cb1f66bde215161d4b6598ddc2defbbc009c5a4) pays 36,007,148.3345035 CHAIN to the attack contract (traced by OAK). | **T9.016** |
| 2026-11-15 03:34:56 | In [`0x9ed1da6f3418b03b6a241e01592c8f006a33123fe565aaa00398f5208cfeb6ca`](https://polygonscan.com/tx/0x9ed1da6f3418b03b6a241e01592c8f006a33123fe565aaa00398f5208cfeb6ca) the attack contract sends 36,008,148.3345035 CHAIN to pool [`0xa4e9cff312f719bf663cd88d2118aaa16a0b574f`](https://polygonscan.com/address/0xa4e9cff312f719bf663cd88d2118aaa16a0b574f) and receives 20,345.506936 USDC, which goes to the attacker EOA (traced by OAK). The sold amount is 1,000 CHAIN above the escrow payout; OAK reads this as the attacker's own initial 1,000 CHAIN, an inference. | — |
| 2026-11-15 03:37:55 | The attacker EOA sends 20,345.698838 USDC in [`0x7cd661e0386a8496043caf6476325d571101c2d1548b9b2bfd06a526eea69f93`](https://polygonscan.com/tx/0x7cd661e0386a8496043caf6476325d571101c2d1548b9b2bfd06a526eea69f93) to [`0x7944159f31a130ded2794052bbc7c4fdcf9c20e7`](https://polygonscan.com/address/0x7944159f31a130ded2794052bbc7c4fdcf9c20e7), followed at 03:38:55 by 100 POL ([`0x8757627216ef667659593b4eb3486e509c3842b2a74d5df956b1b67a7388248a`](https://polygonscan.com/tx/0x8757627216ef667659593b4eb3486e509c3842b2a74d5df956b1b67a7388248a)). | — |
| 2026-11-15 03:40:17 | [`0x7944159f31a130ded2794052bbc7c4fdcf9c20e7`](https://polygonscan.com/address/0x7944159f31a130ded2794052bbc7c4fdcf9c20e7) forwards 20,345.698838 USDC to [`0x69460570c93f9de5e2edbc3052bf10125f0ca22d`](https://polygonscan.com/address/0x69460570c93f9de5e2edbc3052bf10125f0ca22d) in [`0x3593da5e6c222c801b8d2cd7f7e86dd93fe0a40cfa8ee630e3caf40e1bdf47c9`](https://polygonscan.com/tx/0x3593da5e6c222c801b8d2cd7f7e86dd93fe0a40cfa8ee630e3caf40e1bdf47c9). Movement after this is not traced by OAK. | — |
| 2026-11-15 03:39:43 and 03:50:08 | The attacker EOA receives 0.000203 USDC dust from [`0x794fa7f8ed693aa908d512c34b1f9d4c589c20e7`](https://polygonscan.com/address/0x794fa7f8ed693aa908d512c34b1f9d4c589c20e7) and [`0x7944e92ed9191a6f6107ac84f7c091f8b2a320e7`](https://polygonscan.com/address/0x7944e92ed9191a6f6107ac84f7c091f8b2a320e7), whose first and last characters imitate the recipient above (address-poisoning pattern; OAK's observation, source of the dust undisclosed). | — |
| 2026-11-15 04:38 | End of the operator's attack window. | — |
| 2026-11-15 21:34 | Per RektRadar's reading of the operator statement, delegation is disabled for all validators; a pre-attack snapshot is taken at Polygon block 97338356. | response |
| 2026-11-15 23:39:44 | The operator posts "CHAIN Polygon Staking Exploit" on X. | response |
| 2026-11-16 08:03 and 10:13 | DefimonAlerts and SlowMist publish loss and root cause. | response |

Key addresses:

- Attacker EOA — [`0x571d0ec17d84fdee89f5c9cf6b2fd930205e776f`](https://polygonscan.com/address/0x571d0ec17d84fdee89f5c9cf6b2fd930205e776f)
- Attack contract (recipient of the exploit transaction) — [`0xc11dce2b74ce1717909c4c8d95e32b4cec5691fe`](https://polygonscan.com/address/0xc11dce2b74ce1717909c4c8d95e32b4cec5691fe)
- Vulnerable ValidatorShare contract — [`0x4b197ce70af7faece9544ef29b76c1cccd54d7ac`](https://polygonscan.com/address/0x4b197ce70af7faece9544ef29b76c1cccd54d7ac)
- Staking escrow (victim) — [`0x1cb1f66bde215161d4b6598ddc2defbbc009c5a4`](https://polygonscan.com/address/0x1cb1f66bde215161d4b6598ddc2defbbc009c5a4)
- CHAIN token (Polygon) — [`0xd55fce7cdab84d84f2ef3f99816d765a2a94a509`](https://polygonscan.com/address/0xd55fce7cdab84d84f2ef3f99816d765a2a94a509)
- CHAIN/USDC pool — [`0xa4e9cff312f719bf663cd88d2118aaa16a0b574f`](https://polygonscan.com/address/0xa4e9cff312f719bf663cd88d2118aaa16a0b574f)
- First USDC recipient — [`0x7944159f31a130ded2794052bbc7c4fdcf9c20e7`](https://polygonscan.com/address/0x7944159f31a130ded2794052bbc7c4fdcf9c20e7)
- Second USDC recipient — [`0x69460570c93f9de5e2edbc3052bf10125f0ca22d`](https://polygonscan.com/address/0x69460570c93f9de5e2edbc3052bf10125f0ca22d)

## Fund flow

```oak-flow
as_of: 2026-11-17T17:00Z
nodes:
  - {id: esc, chain: polygon, address: 0x1cb1f66bde215161d4b6598ddc2defbbc009c5a4, role: vulnerable-contract, label: "CHAIN staking escrow (victim)"}
  - {id: atkc, chain: polygon, address: 0xc11dce2b74ce1717909c4c8d95e32b4cec5691fe, role: attack-contract, label: "Attack contract"}
  - {id: pool, chain: polygon, address: 0xa4e9cff312f719bf663cd88d2118aaa16a0b574f, role: dex, label: "CHAIN/USDC pool"}
  - {id: atk, chain: polygon, address: 0x571d0ec17d84fdee89f5c9cf6b2fd930205e776f, role: attacker-eoa, label: "Attacker EOA"}
  - {id: h1, chain: polygon, address: 0x7944159f31a130ded2794052bbc7c4fdcf9c20e7, role: intermediary, label: "First USDC recipient"}
  - {id: h2, chain: polygon, address: 0x69460570c93f9de5e2edbc3052bf10125f0ca22d, role: intermediary, label: "Second USDC recipient (trace ends)"}
edges:
  - {from: esc, to: atkc, asset: CHAIN, amount: 36007148.3345035, tx: 0x3705970a2eb947041640522d36d34822fc6a0eed3d0a9f05fff986da273019b4, time: 2026-11-15T03:34:05Z, technique: T9.016, verified: oak}
  - {from: atkc, to: pool, asset: CHAIN, amount: 36008148.3345035, tx: 0x9ed1da6f3418b03b6a241e01592c8f006a33123fe565aaa00398f5208cfeb6ca, time: 2026-11-15T03:34:56Z, verified: oak}
  - {from: pool, to: atkc, asset: USDC, amount: 20345.506936, tx: 0x9ed1da6f3418b03b6a241e01592c8f006a33123fe565aaa00398f5208cfeb6ca, time: 2026-11-15T03:34:56Z, verified: oak}
  - {from: atkc, to: atk, asset: USDC, amount: 20345.506936, tx: 0x9ed1da6f3418b03b6a241e01592c8f006a33123fe565aaa00398f5208cfeb6ca, time: 2026-11-15T03:34:56Z, verified: oak}
  - {from: atk, to: h1, asset: USDC, amount: 20345.698838, tx: 0x7cd661e0386a8496043caf6476325d571101c2d1548b9b2bfd06a526eea69f93, time: 2026-11-15T03:37:55Z, verified: oak}
  - {from: h1, to: h2, asset: USDC, amount: 20345.698838, tx: 0x3593da5e6c222c801b8d2cd7f7e86dd93fe0a40cfa8ee630e3caf40e1bdf47c9, time: 2026-11-15T03:40:17Z, verified: oak}
```

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2122271777825128691>; <https://x.com/DefimonAlerts/status/2122239153056149613>; <https://x.com/RealChainGames/status/2122112343970808002>; <https://www.rektradar.xyz/web3-daily-exploits-16-nov-2026-chaingames-20k-reward-checkpoint/>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist: "The staking contract failed to synchronize reward checkpoints during share transfers, allowing newly created recipient contracts to repeatedly claim historical rewards through restake()." The operator's own post, reachable only in truncated form, says "A bug in how delegation tokens track rewards let anyone turn a" and then cuts off, so it supports the class but not the detail. DefimonAlerts describes the same transaction as a withdrawal-share accounting flaw (`unstakeClaimTokens`, `transferFunds`), a different description from SlowMist's; both agree on the contract, escrow and transaction. Contract source was not reviewed by OAK. Not established: the full operator post-mortem, the refund amount, and the attacker's funding.

## Public references

- `[chaingames2026]` — Chain Games (X), "CHAIN Polygon Staking Exploit" (2026-11-15): <https://x.com/RealChainGames/status/2122112343970808002>
- `[slowmist-chain2026]` — SlowMist Team (X), TI alert (2026-11-16): <https://x.com/SlowMist_Team/status/2122271777825128691>
- `[defimon-chain2026]` — DefimonAlerts (X), Chain Games alert (2026-11-16): <https://x.com/DefimonAlerts/status/2122239153056149613>
- `[rektradar-chain2026]` — RektRadar, "Web3 daily exploits, 16 Nov 2026": <https://www.rektradar.xyz/web3-daily-exploits-16-nov-2026-chaingames-20k-reward-checkpoint/>
