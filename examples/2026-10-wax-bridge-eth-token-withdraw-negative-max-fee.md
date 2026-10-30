# WAX Multi-Chain Bridge — a negative max_fee cancelled the debit while the full withdrawal was still paid out on Solana and Ethereum — WAX / Solana / Ethereum — 2026-10-22

**Loss:** **~\$90.5K** (SlowMist).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*. `eth.token::withdraw` on WAX did not enforce `max_fee ≥ 0` before debiting `quantity + max_fee`. With `max_fee = -quantity` the debit was zero while the withdrawal amount stayed whole; the configured fee was zero, so the fee check was skipped. The bridge emitted withdrawal logs and paid out on Solana and Ethereum. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). The cross-chain messaging itself worked; the source-side burn was wrong.

**Attribution:** **pseudonymous** (WAX `fasdfas.al`).

**Key teaching point:** **Sign-check every amount that is added to a debit.** A fee field is an amount.

## Summary

SlowMist flagged the exploit on 2026-10-22.

## Timeline (UTC)

Read it as three stages. **Flaw**: the WAX `eth.token::withdraw` action did not check the sign of `max_fee`. **Take**: withdrawals with a negative fee debit nothing, and the bridge pays out in full on Solana and Ethereum. **Aftermath**: nothing published beyond the alert. SlowMist's alert is the only source and it gives no transaction hashes.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-22 (undisclosed) | `eth.token::withdraw` on WAX debits `quantity + max_fee` without enforcing `max_fee >= 0`. The configured fee is zero, so the fee check is skipped. Since when the action was live in this form is not stated. | **T9.016** (flaw) |
| Before 2026-10-22 (undisclosed) | The attacker uses the WAX account `fasdfas.al`, with receiving addresses on Solana ([`4H1piNZ8LsYhZGYhkbJDbPDSghxRj3HWxJqVz5dve8Q7`](https://solscan.io/account/4H1piNZ8LsYhZGYhkbJDbPDSghxRj3HWxJqVz5dve8Q7)) and Ethereum ([`0x01664E199991b2F3fe412c2DE5B9b7A0dcDc5070`](https://etherscan.io/address/0x01664E199991b2F3fe412c2DE5B9b7A0dcDc5070)). Funding and testing are not published. | — |
| 2026-10-22 (undisclosed times) | The attacker calls withdraw with `max_fee = -quantity`, so the debit is zero while the full withdrawal amount is kept. The bridge emits withdrawal logs, and corresponding payouts occur on Solana from the bridge account ([`8cqv3kRg1ivwPNrGGrvJANXb6RPik6XEhnBzs18tPcKC`](https://solscan.io/account/8cqv3kRg1ivwPNrGGrvJANXb6RPik6XEhnBzs18tPcKC)) and on Ethereum from the bridge contract ([`0x24b22B031Ae1B5a6b09F9a0FD33613a40e0d70e6`](https://etherscan.io/address/0x24b22B031Ae1B5a6b09F9a0FD33613a40e0d70e6)). About \$90.5K in total. | **T9.016** |
| Undisclosed | Where the withdrawn funds went afterward is not published. | — |
| 2026-10-22 15:23 | SlowMist publishes the alert. No statement, pause or fix by WAX was found in the cited source. | — |

Key addresses:

- Attacker, WAX account: `fasdfas.al`
- Attacker, Solana: [`4H1piNZ8LsYhZGYhkbJDbPDSghxRj3HWxJqVz5dve8Q7`](https://solscan.io/account/4H1piNZ8LsYhZGYhkbJDbPDSghxRj3HWxJqVz5dve8Q7)
- Attacker, Ethereum: [`0x01664E199991b2F3fe412c2DE5B9b7A0dcDc5070`](https://etherscan.io/address/0x01664E199991b2F3fe412c2DE5B9b7A0dcDc5070)
- Victim bridge, Solana: [`8cqv3kRg1ivwPNrGGrvJANXb6RPik6XEhnBzs18tPcKC`](https://solscan.io/account/8cqv3kRg1ivwPNrGGrvJANXb6RPik6XEhnBzs18tPcKC)
- Victim bridge, Ethereum: [`0x24b22B031Ae1B5a6b09F9a0FD33613a40e0d70e6`](https://etherscan.io/address/0x24b22B031Ae1B5a6b09F9a0FD33613a40e0d70e6)
- Vulnerable contract: `eth.token` on WAX (account name, no hex address)

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2113290086808990182>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's analysis of the withdraw action and the resulting payouts.

## Public references

- `[slowmistwax2026]` — SlowMist TI alert (2026-10-22): <https://x.com/SlowMist_Team/status/2113290086808990182>
