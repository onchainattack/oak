# TranchePool — at the UTC day rollover a scheduled principal payment was booked as received, which reopened the borrower's draw limit — Fence Finance / Valinor Digital / Oatfi TranchePool / Avalanche — 2026-10-28

**Loss:** **~1.013M USDC** (SlowMist), drawn a second time with identical calldata.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*. Per SlowMist, settlement at the UTC day rollover treated a **scheduled** principal payment as **received** and subtracted it from recorded outstanding principal although no USDC was repaid. The draw function (`0x8e27c105`) checks requests against *funded − outstanding*, so 1.013M USDC of draw capacity reappeared and the same draw went through twice. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)).

**Attribution:** **pseudonymous** ([`0x6ff1c3ffa622e1062168f3497a275be9cc2b1246`](https://snowscan.xyz/address/0x6ff1c3ffa622e1062168f3497a275be9cc2b1246)). The pool is "reportedly associated with" Valinor Digital, Oatfi and Fence Finance per SlowMist; no operator statement yet.

**Key teaching point:** **A schedule is not a payment.** Credit limits must be computed from money that arrived, not from money that was due.

## Summary

Two Avalanche transactions on 2026-10-28 drew 1.013M USDC each against vulnerable contract [`0xe25cb545bdd47a8ec2d08001cb5661b00d47621a`](https://snowscan.xyz/address/0xe25cb545bdd47a8ec2d08001cb5661b00d47621a).

## Timeline (UTC)

Read it as three stages. **Get in**: a settlement bug. **Prepare**: not published. **Take**: the same draw twice. Times are from SlowMist's alert; the chain is Avalanche.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-28 (undisclosed) | At the UTC day rollover the settlement logic treats a scheduled principal payment as received and subtracts it from the tranche's recorded outstanding principal although no USDC was repaid. The draw function `0x8e27c105` checks requests against funded principal minus outstanding principal. Since when is not published. | **T9.016** |
| 2026-10-27 22:42 to 22:45 (traced by OAK) | The attacker address receives 111.8294 AVAX for gas from `0x4e75e27e5aa74f0c7a9d4897dc10ef651f3a3995`. | — |
| 2026-10-27 23:56:41 (traced by OAK; the source says after 00:00 on 10-28) | First transaction: the attack contract borrows 1.013M USDC via a flash loan, pays it into the pool and receives the same amount back; pool net change zero: [`0x19ab145e7f771549ca2f1da4b1768d7f728834015b2480ddb5be19c9769899fd`](https://snowscan.xyz/tx/0x19ab145e7f771549ca2f1da4b1768d7f728834015b2480ddb5be19c9769899fd). | — |
| 2026-10-28 00:00:03 (traced by OAK) | After the rollover settlement, 1.013M USDC of draw capacity reappears and the same draw is repeated with identical calldata; the pool sends 1,013,353.611686 USDC out to the attack contract, which forwards it to the attacker: [`0x3f6b23292a2e9c2956c7ac56d0b1f79b0271b49edec2156d2675ddf1de058c77`](https://snowscan.xyz/tx/0x3f6b23292a2e9c2956c7ac56d0b1f79b0271b49edec2156d2675ddf1de058c77). | **T9.016** |
| 2026-10-28 00:03:41 to 00:05:22 (traced by OAK) | The attacker burns 1,013,375.012203 USDC through Circle CCTP V2 in two transactions, destination Solana (bridged out). The Solana leg is not traced. | — |
| 2026-10-28 03:14:55 | SlowMist publishes its alert, saying the pool is reportedly associated with Valinor Digital, Oatfi and Fence Finance. | response |
| after 2026-10-28 (undisclosed) | No operator statement, pause or recovery appears in the cited sources. | response |

Key addresses:

- Attacker — [`0x6ff1c3ffa622e1062168f3497a275be9cc2b1246`](https://snowscan.xyz/address/0x6ff1c3ffa622e1062168f3497a275be9cc2b1246)
- Attack contract (traced by OAK) — [`0xf09dcf4ede2a88bd316ff355dfc333a281a57805`](https://snowscan.xyz/address/0xf09dcf4ede2a88bd316ff355dfc333a281a57805)
- Flash-loan source, USDC (traced by OAK) — [`0x625e7708f30ca75bfd92586e17077590c60eb4cd`](https://snowscan.xyz/address/0x625e7708f30ca75bfd92586e17077590c60eb4cd)
- Gas funder (traced by OAK) — [`0x4e75e27e5aa74f0c7a9d4897dc10ef651f3a3995`](https://snowscan.xyz/address/0x4e75e27e5aa74f0c7a9d4897dc10ef651f3a3995)
- Solana mint recipient of the CCTP burns (decoded from calldata; traced by OAK) — `CdcSnXuySy92HizRwWgvFPzWL2V1rCNnbWH6yfLv2ocm`
- Vulnerable TranchePool contract — [`0xe25cb545bdd47a8ec2d08001cb5661b00d47621a`](https://snowscan.xyz/address/0xe25cb545bdd47a8ec2d08001cb5661b00d47621a)
- First draw — [`0x19ab145e7f771549ca2f1da4b1768d7f728834015b2480ddb5be19c9769899fd`](https://snowscan.xyz/tx/0x19ab145e7f771549ca2f1da4b1768d7f728834015b2480ddb5be19c9769899fd)
- Second draw — [`0x3f6b23292a2e9c2956c7ac56d0b1f79b0271b49edec2156d2675ddf1de058c77`](https://snowscan.xyz/tx/0x3f6b23292a2e9c2956c7ac56d0b1f79b0271b49edec2156d2675ddf1de058c77)

## Fund flow

Avalanche C-chain leg, traced by OAK with `tools/explorer.py` (Routescan for transfers, public RPC for the two draw transactions) on 2026-10-30. Edges marked *traced by OAK* were checked on-chain. Internal native transfers are not visible over RPC, but every asset here is USDC or AVAX sent from the attacker address, and those were read from the explorer's transfer lists. Counterfeit-token and dust transfers were excluded: right after the draws, address-poisoning bots sent the attacker address lookalike transfers (for example `0xf09d046c72f7749cc7ab4c5cc4a4a9bc6aa57805` imitating the attack contract `0xf09dcf4ede2a88bd316ff355dfc333a281a57805`, and `0xc52eef9bf964e6e963bc128a26afc3d2dd0fcc09` imitating the gas wallet `0xc5240a03c44d26626b659e7e595b6c512f7ccc09`), none of which OAK followed.

```oak-flow
as_of: 2026-10-30T14:10Z
nodes:
  - {id: fund, chain: avalanche, address: 0x4e75e27e5aa74f0c7a9d4897dc10ef651f3a3995, role: unknown, label: "Unlabelled funder (AVAX)"}
  - {id: atk, chain: avalanche, address: 0x6ff1c3ffa622e1062168f3497a275be9cc2b1246, role: attacker-eoa, label: "Attacker"}
  - {id: ac, chain: avalanche, address: 0xf09dcf4ede2a88bd316ff355dfc333a281a57805, role: attack-contract, label: "Attack contract"}
  - {id: aave, chain: avalanche, address: 0x625e7708f30ca75bfd92586e17077590c60eb4cd, role: lending, label: "USDC flash-loan source (aToken proxy)"}
  - {id: pool, chain: avalanche, address: 0xe25cb545bdd47a8ec2d08001cb5661b00d47621a, role: vulnerable-contract, label: "TranchePool"}
  - {id: cctp, chain: avalanche, address: 0x28b5a0e9c621a5badaa536219b3a228c8168cf5d, role: bridge, label: "Circle CCTP V2 TokenMessenger (burn)"}
  - {id: sol, chain: solana, role: unknown, label: "Solana mint recipient (not traced)"}
edges:
  - {from: fund, to: atk, asset: AVAX, amount: 111.8294, tx: 0xaa4091fd24f0db35e952d758d4890ea7241770ddf8c11eccbfac7579bb13c025, time: 2026-10-27T22:42:23Z, tx_count: 2, time_last: 2026-10-27T22:45:24Z, verified: oak}
  - {from: atk, to: ac, asset: USDC, amount: 506.676807, tx: 0x5d9f55b7db88ff727f69a3bfd802b7c7a0a2a38190a5cceff64034449f0bf791, time: 2026-10-27T23:56:39Z, verified: oak}
  - {from: aave, to: ac, asset: USDC, amount: 1013353.611686, tx: 0x19ab145e7f771549ca2f1da4b1768d7f728834015b2480ddb5be19c9769899fd, time: 2026-10-27T23:56:41Z, verified: oak}
  - {from: ac, to: pool, asset: USDC, amount: 1013353.611686, tx: 0x19ab145e7f771549ca2f1da4b1768d7f728834015b2480ddb5be19c9769899fd, time: 2026-10-27T23:56:41Z, technique: T9.016, verified: oak}
  - {from: pool, to: ac, asset: USDC, amount: 1013353.611686, tx: 0x19ab145e7f771549ca2f1da4b1768d7f728834015b2480ddb5be19c9769899fd, time: 2026-10-27T23:56:41Z, technique: T9.016, verified: oak}
  - {from: ac, to: aave, asset: USDC, amount: 1013860.288492, tx: 0x19ab145e7f771549ca2f1da4b1768d7f728834015b2480ddb5be19c9769899fd, time: 2026-10-27T23:56:41Z, verified: oak}
  - {from: pool, to: ac, asset: USDC, amount: 1013353.611686, tx: 0x3f6b23292a2e9c2956c7ac56d0b1f79b0271b49edec2156d2675ddf1de058c77, time: 2026-10-28T00:00:03Z, technique: T9.016, verified: oak}
  - {from: ac, to: atk, asset: USDC, amount: 1013353.611687, tx: 0x3f6b23292a2e9c2956c7ac56d0b1f79b0271b49edec2156d2675ddf1de058c77, time: 2026-10-28T00:00:03Z, verified: oak}
  - {from: atk, to: cctp, asset: USDC, amount: 1013375.012203, tx: 0x0e974743161ddb166d5ad698b9a2b0c9ca2ddf5f569a532e6c5665ce2c92218b, time: 2026-10-28T00:03:41Z, tx_count: 2, time_last: 2026-10-28T00:05:22Z, verified: oak}
  - {from: cctp, to: sol, asset: USDC, amount: 1013375.012203, tx: 0x0e974743161ddb166d5ad698b9a2b0c9ca2ddf5f569a532e6c5665ce2c92218b, time: 2026-10-28T00:03:41Z, tx_count: 2, time_last: 2026-10-28T00:05:22Z, verified: oak}
```

What the trace adds beyond the sources:

- **Where the money went.** Within 5 minutes of the second draw the attacker address burned all of it through Circle's CCTP V2 TokenMessenger: 250,000.175563 USDC at 00:03:41 ([`0x0e974743161ddb166d5ad698b9a2b0c9ca2ddf5f569a532e6c5665ce2c92218b`](https://snowscan.xyz/tx/0x0e974743161ddb166d5ad698b9a2b0c9ca2ddf5f569a532e6c5665ce2c92218b)) and 763,374.83664 USDC at 00:05:22 ([`0x51bb85e171585a2ec7ec7bd918cd6a08e916e38f79cf2a17b5e5211ee3b9f397`](https://snowscan.xyz/tx/0x51bb85e171585a2ec7ec7bd918cd6a08e916e38f79cf2a17b5e5211ee3b9f397)), total 1,013,375.012203 USDC. The burn calldata names destination domain 5 (Solana) and one 32-byte mint recipient, `0xacd18ae91c387c3140b2c3b4a67b9b01a09554d76796c05b2d5e18478b56006a`, which OAK decodes as Solana address `CdcSnXuySy92HizRwWgvFPzWL2V1rCNnbWH6yfLv2ocm`. Both transactions use the same recipient. The Solana leg is not traced: provider not implemented. That the mint happened is not checked.
- **The first transaction does not drain the pool.** In `0x19ab145e7f771549ca2f1da4b1768d7f728834015b2480ddb5be19c9769899fd` the attack contract borrows 1,013,353.611686 USDC from a USDC aToken proxy (`0x625e7708f30ca75bfd92586e17077590c60eb4cd`), pays it into the pool, receives the same amount back, and repays 1,013,860.288492 USDC. The 506.676806 difference matches a 0.05% flash-loan fee, and the attacker had pre-funded 506.676807 USDC to the contract 2 minutes earlier. The pool's net balance change in that transaction is zero. The net loss to the pool happens only in the second transaction, where the pool sends 1,013,353.611686 USDC out. OAK read the loan source and the fee from the transfers, and the fee match is an inference.
- **Timing conflict.** The timeline said the first draw came after 00:00 UTC on 10-28. On-chain it is 2026-10-27 23:56:41 and the second is 2026-10-28 00:00:03. That fits the day-rollover story: the first runs before the rollover, the second right after it.
- **Amounts.** The bridged total (1,013,375.012203) is 21.400516 USDC above the pool's single outflow (1,013,353.611687). The extra comes from the attacker's own small USDC balance (about 528 USDC swapped from AVAX at 23:49). SlowMist's "1.013M USDC drawn twice" is therefore a single net loss of about 1.013M USDC, not 2.03M.
- **Funding.** The attacker address was funded with 111.8294 AVAX at 22:42 and 22:45 on 2026-10-27 by `0x4e75e27e5aa74f0c7a9d4897dc10ef651f3a3995`, an unlabelled address active since January 2022 that OAK did not trace further. The attacker then sent 65 AVAX to a router-like address (`0x337685fdab40d39bd02028545a4ffa7d287cc3e2`, swapping into about 573 USDC) and 12 AVAX to a gas wallet (`0xc5240a03c44d26626b659e7e595b6c512f7ccc09`), which forwarded only a few AVAX. These dust moves are not drawn.
- **Limits.** Nothing leaves the Avalanche leg other than the CCTP burns. No pause, recovery or return appears in the on-chain activity of the attacker, the attack contract or the pool within the window to 2026-10-31.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2115281126516490514>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's trace analysis of the two draws and the rollover settlement.

## Public references

- `[slowmisttranche2026]` — SlowMist TI alert (2026-10-28): <https://x.com/SlowMist_Team/status/2115281126516490514>
- `[snowscantranche2026]` — second draw: <https://snowscan.xyz/tx/0x3f6b23292a2e9c2956c7ac56d0b1f79b0271b49edec2156d2675ddf1de058c77>
