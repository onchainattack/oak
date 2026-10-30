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
| 2026-10-28 (preparation undisclosed) | Funding of the attacker address is not published. | — |
| 2026-10-28 after 00:00 (time undisclosed) | First draw of 1.013M USDC against the pool: [`0x19ab145e7f771549ca2f1da4b1768d7f728834015b2480ddb5be19c9769899fd`](https://snowscan.xyz/tx/0x19ab145e7f771549ca2f1da4b1768d7f728834015b2480ddb5be19c9769899fd). | — |
| 2026-10-28 (time undisclosed) | After the rollover settlement, 1.013M USDC of draw capacity reappears and the same draw is repeated with identical calldata: [`0x3f6b23292a2e9c2956c7ac56d0b1f79b0271b49edec2156d2675ddf1de058c77`](https://snowscan.xyz/tx/0x3f6b23292a2e9c2956c7ac56d0b1f79b0271b49edec2156d2675ddf1de058c77). | **T9.016** |
| after the draws (undisclosed) | Where the roughly 1.013M USDC went is not published. | — |
| 2026-10-28 03:14:55 | SlowMist publishes its alert, saying the pool is reportedly associated with Valinor Digital, Oatfi and Fence Finance. | response |
| after 2026-10-28 (undisclosed) | No operator statement, pause or recovery appears in the cited sources. | response |

Key addresses:

- Attacker — [`0x6ff1c3ffa622e1062168f3497a275be9cc2b1246`](https://snowscan.xyz/address/0x6ff1c3ffa622e1062168f3497a275be9cc2b1246)
- Vulnerable TranchePool contract — [`0xe25cb545bdd47a8ec2d08001cb5661b00d47621a`](https://snowscan.xyz/address/0xe25cb545bdd47a8ec2d08001cb5661b00d47621a)
- First draw — [`0x19ab145e7f771549ca2f1da4b1768d7f728834015b2480ddb5be19c9769899fd`](https://snowscan.xyz/tx/0x19ab145e7f771549ca2f1da4b1768d7f728834015b2480ddb5be19c9769899fd)
- Second draw — [`0x3f6b23292a2e9c2956c7ac56d0b1f79b0271b49edec2156d2675ddf1de058c77`](https://snowscan.xyz/tx/0x3f6b23292a2e9c2956c7ac56d0b1f79b0271b49edec2156d2675ddf1de058c77)

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2115281126516490514>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's trace analysis of the two draws and the rollover settlement.

## Public references

- `[slowmisttranche2026]` — SlowMist TI alert (2026-10-28): <https://x.com/SlowMist_Team/status/2115281126516490514>
- `[snowscantranche2026]` — second draw: <https://snowscan.xyz/tx/0x3f6b23292a2e9c2956c7ac56d0b1f79b0271b49edec2156d2675ddf1de058c77>
