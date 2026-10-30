# MALT — the swap's own rebalancing pulled DAI from the treasury, and the swap counted it as the trader's payment — MALT / EVM — 2026-10-03

**Loss:** **~\$72K.** The project says the flaw is fixed and affected users will be compensated.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*, per SlowMist. During a swap, rebalancing withdrew DAI from MALT's **Capital Source** and returned it to the pool; the swap's invariant check then read **post-hook balances** and treated that treasury DAI as caller-supplied input, so a small input bought out-sized MALT. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)).

**Re-mapped 2026-10-11:** primary Technique moved from T9.004 to [`T9.016-contract-accounting-state-invariant-flaw`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md).

**Attribution:** **pseudonymous.**

**Key teaching point:** **Measure what the trader paid before anything else touches the balance.** An invariant checked after an internal hook can be satisfied by the protocol's own money.

## Summary

On 2026-10-03 an attacker made small-input swaps on MALT that triggered rebalancing from the Capital Source; the treasury DAI returned to the pool was counted toward the swap's input check, letting the attacker take out more MALT than paid for. Losses were ~\$72K; the project patched and pledged compensation.

## Timeline (UTC)

The SlowMist alert time is public; the exploit time is not stated in the cited sources.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-03 (undisclosed) | The vulnerable swap contract ([`0xfe6C096a2871337d4f6F7DD04Ebda733E94D7A13`](https://polygonscan.com/address/0xfe6C096a2871337d4f6F7DD04Ebda733E94D7A13)) records the caller's input and pre-swap reserves, calls an external `rebalanceHook` before sending output, then checks its invariant against final balances. Since when is not stated. | **T9.016** |
| 2026-10-03 06:29:15 (block time, traced by OAK) | The attacker ([`0x8F103B6A0aD705bcE6357842A5fefEB49e8D83Ef`](https://polygonscan.com/address/0x8F103B6A0aD705bcE6357842A5fefEB49e8D83Ef)) sends negligible input; the hook withdraws DAI from the Capital Source into the pool, the check counts it as caller-supplied, and the attacker withdraws a disproportionate amount of MALT ([`0x915eccb5791508aa89a0a3f1385b26346b127ebb648b046e4cb558474ce8445b`](https://polygonscan.com/tx/0x915eccb5791508aa89a0a3f1385b26346b127ebb648b046e4cb558474ce8445b)). Preparation is not published. | **T9.016** |
| 2026-10-03 06:29:15 | In the same transaction the attack contract ([`0x0dbf3da828ad3b21d63a0429ca08f93c63670393`](https://polygonscan.com/address/0x0dbf3da828ad3b21d63a0429ca08f93c63670393)) repays a 1,300 DAI Balancer flash loan and forwards 13,440.58156231 DAI to the attacker (traced by OAK). Onward movement is not traced (see Fund flow). The sources put the loss at ~\$72K. | — |
| 2026-10-03 16:18 | SlowMist publishes its alert. | response |
| after 2026-10-03 | The project says the flaw is fixed and affected users will be compensated; no post-mortem is published. | response |

Key addresses:

- Attacker — [`0x8F103B6A0aD705bcE6357842A5fefEB49e8D83Ef`](https://polygonscan.com/address/0x8F103B6A0aD705bcE6357842A5fefEB49e8D83Ef)
- Victim — [`0xF0d314849A3Bc9270a79110F25dBA2c8325A2AAC`](https://polygonscan.com/address/0xF0d314849A3Bc9270a79110F25dBA2c8325A2AAC)
- Vulnerable contract — [`0xfe6C096a2871337d4f6F7DD04Ebda733E94D7A13`](https://polygonscan.com/address/0xfe6C096a2871337d4f6F7DD04Ebda733E94D7A13)
- Attack contract (transaction receiver) — [`0x0dbf3da828ad3b21d63a0429ca08f93c63670393`](https://polygonscan.com/address/0x0dbf3da828ad3b21d63a0429ca08f93c63670393), traced by OAK

## Fund flow

Polygon leg, traced by OAK with `tools/explorer.py` on 2026-10-30. Polygon's Blockscout answers HTTP 403, so the tool used the public JSON-RPC fallback. Only the exploit transaction could be read in full; the fallback sees only allowlisted tokens in address history, and Polygon DAI (`0x8f3cf7ad23cd3cadbd9735aff958023239c6a063`) is not on that list. The tool therefore marks every DAI and MALT transfer in the transaction `trusted: false`. This is an allowlist gap, not a counterfeit finding: the DAI contract is the canonical Polygon DAI. Native POL transfers are not visible either.

```oak-flow
as_of: 2026-10-30T14:30Z
nodes:
  - {id: cap, chain: polygon, address: 0xf0d314849a3bc9270a79110f25dba2c8325a2aac, role: victim, label: "Victim (DAI source)"}
  - {id: swap, chain: polygon, address: 0xfe6c096a2871337d4f6f7dd04ebda733e94d7a13, role: vulnerable-contract, label: "Vulnerable swap contract"}
  - {id: atk, chain: polygon, address: 0x0dbf3da828ad3b21d63a0429ca08f93c63670393, role: attack-contract, label: "Attack contract"}
  - {id: eoa, chain: polygon, address: 0x8f103b6a0ad705bce6357842a5fefeb49e8d83ef, role: attacker-eoa, label: "Attacker"}
  - {id: pool, chain: polygon, address: 0xf864db3e24968a8eb6b2925553f2e5e0139d3ce1, role: dex, label: "Swap counterparty (MALT/DAI)"}
  - {id: bal, chain: polygon, address: 0xba12222222228d8ba445958a75a0704d566bf2c8, role: lending, label: "Balancer Vault (flash loan)"}
edges:
  - {from: bal, to: atk, asset: DAI, amount: 1300, tx: 0x915eccb5791508aa89a0a3f1385b26346b127ebb648b046e4cb558474ce8445b, time: 2026-10-03T06:29:15Z, verified: oak}
  - {from: cap, to: swap, asset: DAI, amount: 12744.64449, tx: 0x915eccb5791508aa89a0a3f1385b26346b127ebb648b046e4cb558474ce8445b, time: 2026-10-03T06:29:15Z, tx_count: 2, technique: T9.016, verified: oak}
  - {from: swap, to: atk, asset: MALT, amount: 16173.546, tx: 0x915eccb5791508aa89a0a3f1385b26346b127ebb648b046e4cb558474ce8445b, time: 2026-10-03T06:29:15Z, tx_count: 3, technique: T9.016, verified: oak}
  - {from: atk, to: pool, asset: MALT, amount: 16173.546, tx: 0x915eccb5791508aa89a0a3f1385b26346b127ebb648b046e4cb558474ce8445b, time: 2026-10-03T06:29:15Z, tx_count: 3, verified: oak}
  - {from: atk, to: bal, asset: DAI, amount: 1300, tx: 0x915eccb5791508aa89a0a3f1385b26346b127ebb648b046e4cb558474ce8445b, time: 2026-10-03T06:29:15Z, verified: oak}
  - {from: atk, to: eoa, asset: DAI, amount: 13440.58156231, tx: 0x915eccb5791508aa89a0a3f1385b26346b127ebb648b046e4cb558474ce8445b, time: 2026-10-03T06:29:15Z, verified: oak}
```

What the trace adds beyond the sources:

- **The exploit transaction** `0x915eccb5791508aa89a0a3f1385b26346b127ebb648b046e4cb558474ce8445b` was sent by the attacker `0x8f103b6a0ad705bce6357842a5fefeb49e8d83ef` to a separate attack contract, `0x0dbf3da828ad3b21d63a0429ca08f93c63670393`, at 2026-10-03 06:29:15 UTC. The exploit time was not in the sources.
- **The mechanism is visible on chain.** The victim address `0xf0d314849a3bc9270a79110f25dba2c8325a2aac` pays DAI into the swap contract inside the swap (6,286.10112609 and 6,458.5433805 DAI, 12,744.64449 DAI in total), while the attacker side supplies only 1 DAI per swap. The attack contract borrows 1,300 DAI from the Balancer Vault, makes repeated MALT/DAI swaps and repays the loan in the same transaction.
- **Net proceeds in this transaction:** 13,440.58156231 DAI went from the attack contract to the attacker EOA. That is far below the ~\$72K that Cryptonews and SlowMist report. The transaction may not be the whole attack, or the loss figure may count MALT or other assets. OAK found no second transaction because the fallback cannot list DAI history; both figures stand with their bases.
- **Limit: onward movement is not traced.** The 13,440.58 DAI left in the attacker EOA was not followed: Polygon DAI is outside the fallback allowlist and POL is invisible, so any later swap, bridge or CEX deposit is unknown. The attacker's funding is likewise unknown. Check the address on a full explorer.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2106418632041668784>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist: rebalancing inside a swap pulled DAI from the Capital Source into the pool and the swap's validity check counted it as trader input. The project acknowledged a fix but published no analysis.

## Public references

- `[cryptonewsmalt2026]` — Cryptonews.net, "MALT Loses \$72K After Flawed Swap Lets Attacker Tap Treasury DAI" (2026-10-03): <https://cryptonews.net/news/security/33535167/>
- `[slowmistmalt2026]` — SlowMist on X, MALT alert: <https://x.com/SlowMist_Team/status/2106418632041668784>
