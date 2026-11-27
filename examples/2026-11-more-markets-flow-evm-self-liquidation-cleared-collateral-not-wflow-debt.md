# MORE Markets — flash-loan self-liquidation cleared the attacker's collateral without clearing the matching WFLOW debt, so WFLOW could be withdrawn — MORE Markets / Flow EVM — 2026-11-16

**Loss:** **~\$308,000**, which [Phemex](https://phemex.com/news/article/more-markets-exploited-on-flow-evm-for-308k-via-liquidation-contract-flaw-103834) attributes to Blockaid monitoring data and the [DEV Community write-up](https://dev.to/pandasecurity/more-markets-exploit-liquidation-bug-drains-308k-2hf8) calls a contemporaneous estimate, not an official figure. MORE and Flow Foundation have published no loss amount. The write-up's own on-chain check shows 14,089,553.21 WFLOW received by the exploiter address in 11 transactions, and the figure at its price of about \$0.0165 per FLOW is \$308K. Any recovery is undisclosed. Flow Foundation says impact is "limited to users supplying WFLOW to the MORE Markets ankrFLOW/WFLOW market". No reimbursement plan had been published when this entry was written.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*, per Flow Foundation: the attacker used the public borrow and liquidation path with their own positions, and "a flaw in how MORE's contracts handled these liquidations cleared the collateral without clearing the matching WFLOW debt". The books were wrong after the liquidation, not the access control. The exact function and branch are undisclosed. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). The access-control Technique was considered and not used: no source says a caller, role or counterparty was accepted that should have been rejected. Flash-loan funding is stated by the operator-side source, but OAK has no technique row for flash-loan capital alone, so it is recorded in the timeline without a separate tag.

**Attribution:** **unattributed**. Flow Foundation says only "an attacker". The [DEV Community write-up](https://dev.to/pandasecurity/more-markets-exploit-liquidation-bug-drains-308k-2hf8) prints an exploiter address, helper contract and transactions from its own on-chain check (see Key addresses); OAK has not verified them.

**Key teaching point:** **A liquidation must reduce the borrower's debt and collateral together, and the protocol must refuse any liquidation that leaves debt outstanding against zero collateral, including when borrower and liquidator are the same actor.** A post-liquidation solvency check on the market (total supplied WFLOW covers total owed plus withdrawable balances) enforced in the contract, and invariant tests of the liquidation path against self-liquidation inside a flash-loan transaction, would have stopped the withdrawal step. Detail of the flaw is undisclosed, so this is the control implied by the operator's description.

## Summary

At about 17:30 UTC on 2026-11-16 an attacker used flash loans to open and then liquidate their own positions in the ankrFLOW/WFLOW market of MORE Markets, a lending protocol on Flow EVM. Per Flow Foundation, the contracts' liquidation handling cleared the collateral but not the matching WFLOW debt, and WFLOW was then withdrawn. MORE paused the protocol, Ankr paused ankrFLOW, and some exchanges paused FLOW deposits and withdrawals. Flow Foundation states that the Flow network, Flow EVM and Cadence were not exploited. Blockaid's estimate, relayed by [Phemex](https://phemex.com/news/article/more-markets-exploited-on-flow-evm-for-308k-via-liquidation-contract-flaw-103834), is about \$308,000.

## Timeline (UTC)

Stages: **Flaw** (the liquidation accounting), **Take** (flash-loaned self-liquidation, then withdrawal), **Money** (undisclosed), **Response** (pauses). The exploit time is "approximately" 17:30 in the [Flow Foundation statement](https://x.com/flow_blockchain/status/2122457454726312274) (posted 22:31:05 UTC on 2026-11-16); later times are from the [DEV Community write-up](https://dev.to/pandasecurity/more-markets-exploit-liquidation-bug-drains-308k-2hf8).

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-16 (date undisclosed) | MORE Markets' lending contracts handle liquidations so that collateral is cleared while the matching WFLOW debt is not. Whether this was in the original deployment or an upgrade is undisclosed. | **T9.016** |
| Before ~17:30 (undisclosed) | Preparation: funding of the attacker is undisclosed. The write-up gives a helper-contract deployment transaction (see Key addresses); its time is not stated. | — |
| ~17:30 | The attacker uses flash loans to open positions in the ankrFLOW/WFLOW market and liquidate them. Collateral is cleared, the WFLOW debt is not, and WFLOW is withdrawn. Transaction hashes: undisclosed. | **T9.016** |
| 17:30 to 17:41:58 | Per the write-up, the mFlowWFLOW vault's WFLOW balance fell from 18,629,352.93 to zero and the exploiter address received 14,089,553.21 WFLOW; a separate 273,182 WFLOW left the vault to an address the write-up does not tie to the attacker. | **T9.016** |
| After ~17:41 | Where the WFLOW went next: undisclosed. Flow Foundation says "security experts have been informed and are tracing the funds". | — |
| 2026-11-16 17:47 | Blockaid discloses the incident (per the write-up). | response |
| 2026-11-16 17:55 to 18:26 | MORE announces a security-council pause and confirms MORE and ankrFLOW are both paused (write-up). Ankr pauses ankrFLOW "as a precaution" and some exchanges temporarily pause FLOW deposits and withdrawals (Flow Foundation). | response |
| 2026-11-16 22:31 | Flow Foundation publishes its statement and says further updates will come from @MORE_DeFi and @AnkrLabsTeam. | response |

Key addresses:

Addresses below are from the [DEV Community write-up](https://dev.to/pandasecurity/more-markets-exploit-liquidation-bug-drains-308k-2hf8), not from Flow Foundation or MORE, and are not linked because `tools/chains.json` has no Flow EVM explorer.

- Exploiter: `0xe1eA6F2365215389f9DCd50a51c974313BF6785C`
- Helper contract: `0x9a8cc604b3534eaa1a8627c1d6f6084857bf2765`
- MORE pool: `0xbC92aaC2DBBF42215248B5688eB3D3d2b32F2c8d`
- Victim vault (mFlowWFLOW): `0x02BF4bd075c1b7C8D85F54777eaAA3638135c059`
- Helper deployment tx: `0xdb8a1c945e1fc2e9d6d9afae64520c0ad99052999ca26441ad3333000465d689`
- Example exploit tx: `0xdf9e3ed4858103569f684166d9833e1980b6ba96334c9a8ec172b4e2aa1d15d8`

## Fund flow

OAK did not trace this incident: `tools/chains.json` has no Flow EVM entry. The block below records the one edge the operator-side source states; the third-party write-up's addresses and amounts are in the timeline and Key addresses above.

```oak-flow
as_of: 2026-11-17T00:00Z
nodes:
  - {id: mkt, chain: flow-evm, role: vulnerable-contract, label: "MORE Markets ankrFLOW/WFLOW market (address undisclosed)"}
  - {id: atk, chain: flow-evm, role: attacker-eoa, label: "Attacker (address undisclosed)"}
edges:
  - {from: mkt, to: atk, asset: WFLOW, time: 2026-11-16T17:30:00Z, technique: T9.016, verified: source, source: flow2026more}
```

Amount, transaction and onward movement are undisclosed.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/flow_blockchain/status/2122457454726312274>; <https://dev.to/pandasecurity/more-markets-exploit-liquidation-bug-drains-308k-2hf8>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** Flow Foundation, which is adjacent to the operator and not MORE itself, states that the attacker used flash loans to open and liquidate their own positions and that the contracts cleared collateral without clearing the matching WFLOW debt. It says "the issue was specific to MORE's contract logic". The write-up and Phemex repeat Flow's account of the mechanism rather than add to it, and no post-mortem from MORE or Ankr was found (none had been published as of 23:00 on 2026-11-16 per the write-up), so the status is preliminary. The vulnerable function and the exact branch are unknown. The \$308K figure is Blockaid's estimate; the write-up's own check shows it fits a price near \$0.0165 per FLOW.

## Public references

- `[flow2026more]` — Flow Foundation (@flow_blockchain), "Statement on the MORE Markets incident" (2026-11-16): <https://x.com/flow_blockchain/status/2122457454726312274>
- DEV Community (Panda Security), "MORE Markets Exploit: Liquidation Bug Drains \$308K" (2026-11): <https://dev.to/pandasecurity/more-markets-exploit-liquidation-bug-drains-308k-2hf8>
- Phemex, "MORE Markets Flow EVM Exploit Loses \$308K to Contract Bug" (2026-11): <https://phemex.com/news/article/more-markets-exploited-on-flow-evm-for-308k-via-liquidation-contract-flaw-103834>
