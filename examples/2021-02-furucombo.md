# Furucombo proxy-authority exploit — Ethereum — 2021-02-27

**Loss:** approximately \$14M in various ERC-20 tokens (ETH, USDC, WBTC, DAI, USDT, and others held in user wallets that had approved the Furucombo proxy contract for token spending). Rekt reports no recovery or compensation `[rektfuru]`.
**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — the Furucombo proxy contract's function-signature whitelist contained a path that allowed an attacker to call arbitrary external contracts through the proxy with the proxy's accumulated user-approval authority). **OAK-T16.006** (Timelock-Free Protocol Upgrade Execution — broadly construed; while the exploit did not require a malicious upgrade per se, the proxy contract's architecture — an upgradeable proxy controlled by a single operator address without a timelock — meant that the full user-base approval surface was concentrated in a single contract with no governance delay, a structural T16.006 pre-condition).
**Attribution:** **pseudonymous**. The attacker deployed a malicious implementation contract; Rekt names no one, and no attribution to a known group was found.
**Corrected 2026-10-11:** Mechanism fixed (the attacker invoked the Aave V2 proxy's initialize through Furucombo's delegatecall to set a malicious implementation; no CREATE2 quirk); removed the unsourced timeline minutes, team-compensation plan and PeckShield/SlowMist/Furucombo post-mortem citations.
**Key teaching point:** **Furucombo is the canonical DeFi worked example of an "approval-aggregation proxy" risk — a single contract address that users approve for token spending, where that contract's authority can be abused to drain any approved token across the entire user base.** The incident demonstrates that the security model of an all-in-one proxy contract is bounded by the weakest trusted-callee in its approval graph: a single trusted handler (the Aave v2 handler, in this case) that the proxy delegate-calls into can become the vector through which the proxy's full approval authority is repurposed.

## Summary

Furucombo was a DeFi "drag-and-drop" transaction-builder protocol that allowed users to compose complex multi-step DeFi strategies through a visual interface. Users would approve Furucombo's proxy contract for token spending, and the proxy would execute sequences of DeFi actions (swap, lend, borrow, stake) on the user's behalf across integrated protocols (Uniswap, Aave, Compound, Curve, etc.). The proxy contract maintained a whitelist of allowed function signatures and target contracts to constrain what the proxy could call with user-approved tokens.

On 2021-02-27, an attacker exploited the combination of three properties, per Rekt's analysis `[rektfuru]`: the Furucombo proxy made caller-specified delegatecalls to trusted handlers (so its own storage could be modified), the Aave V2 handler delegate-called to an implementation address read from storage, and the handler exposed a function to set that address. The attacker had the proxy call the Aave V2 proxy's `initialize` function through delegatecall, which set the implementation slot in Furucombo's storage to an attacker-controlled "evil" contract. The Block summarises it as convincing Furucombo that Aave v2 had a new implementation `[theblockfuru]`. The malicious implementation then moved tokens from wallets that had given the proxy infinite approval to attacker-controlled addresses; Rekt says Cream Finance also lost funds in the sequence. The Aave handler was valid in Furucombo's registry at the time of the attack but not later.

Because the drain used users' own `approve()` grants to the proxy, the only defence was revoking approvals. Furucombo said it had deauthorized the relevant components and urged users to revoke approvals `[forklogfuru]`. No source consulted documents a compensation plan or the protocol's later TVL, so those original claims were removed.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-02-27 | Attacker has the Furucombo proxy delegatecall the Aave V2 proxy's `initialize`, setting an attacker-controlled implementation | T9.004 (see remap note) |
| 2021-02-27 | Approved tokens drained, about \$14M `[forklogfuru]` | (extraction) |
| after | Furucombo deauthorizes components and urges approval revocation `[forklogfuru]` | (defender response) |

## Realised extraction

Approximately \$14M from wallets that had approved the Furucombo proxy `[rektfuru]`. The specific token list in the original file was unsourced.

## T9.004 classification

Classified under T9.004 as an access-control failure: a handler function that sets a delegatecall target was reachable by arbitrary callers, and the proxy's trust in the handler allowed an uninitialised Aave V2 proxy to be initialised in Furucombo's storage context. Haechi said (Rekt, July 2021 edit) that its audit covered the Furucombo proxy but not the Aave-related path, and that Furucombo's whitelist functionality could have guarded against it `[rektfuru]`. The original file's comparison to Li.Fi v1 is unsourced. A closer fit may be an arbitrary-delegatecall / uninitialised-proxy technique if one exists in the taxonomy.

## T16.006 cross-classification

The Furucombo proxy contract was an upgradeable proxy controlled by a single operator address without a governance timelock. While the exploit did not use the upgrade path (it exploited the proxy's existing trusted-callee surface rather than deploying a malicious upgrade), the structural pre-condition — a single-owner proxy without a mandatory delay between upgrade-proposal and execution — matches the T16.006 (Timelock-Free Protocol Upgrade Execution) pattern. The classification is cross-classification (broadly construed): the proxy-authority model, combined with the absence of a timelock, meant that any vulnerability in the proxy's access-control logic was inherently unconstrained by a community-review delay. The claim that Furucombo contributed to a later norm shift toward timelocks is unsourced. The single-owner-proxy and no-timelock characterisation is also not stated in the sources consulted; treat this cross-classification as weak.

## Public references

- `[rektfuru]` — Rekt, "Furucombo - REKT" (2021-03-01): <https://rekt.news/furucombo-rekt>
- `[theblockfuru]` — The Block, "DeFi building block service Furucombo exploited for \$14M" (2021-02-27): <https://www.theblock.co/news/defi/2021-02-27-defi-building-block-service-furucombo-exploited-for-14m-96572>
- `[forklogfuru]` — Forklog, "DeFi project Furucombo hacked for \$14 million": <https://forklog.com/en/defi-project-furucombo-hacked-for-14-million/>
- `[halbornfuru]` — Halborn, "Explained: The Furucombo Evil Contract Hack (Feb 2021)": <https://halborn.com/explained-the-furucombo-evil-contract-hack-feb-2021>
