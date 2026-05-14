# Furucombo proxy-authority exploit — Ethereum — 2021-02-27

**Loss:** approximately \$14M in various ERC-20 tokens (ETH, USDC, WBTC, DAI, USDT, and others held in user wallets that had approved the Furucombo proxy contract for token spending). Funds were not recovered or returned.
**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — the Furucombo proxy contract's function-signature whitelist contained a path that allowed an attacker to call arbitrary external contracts through the proxy with the proxy's accumulated user-approval authority). **OAK-T12.004** (Timelock-Free Protocol Upgrade Execution — broadly construed; while the exploit did not require a malicious upgrade per se, the proxy contract's architecture — an upgradeable proxy controlled by a single operator address without a timelock — meant that the full user-base approval surface was concentrated in a single contract with no governance delay, a structural T12.004 pre-condition).
**Attribution:** **pseudonymous (no public attribution)**. The attacker deployed a custom exploit contract and executed the drain in a small number of transactions; no wallet-cluster attribution to a known group was published.
**Key teaching point:** **Furucombo is the canonical DeFi worked example of an "approval-aggregation proxy" risk — a single contract address that users approve for token spending, where that contract's authority can be abused to drain any approved token across the entire user base.** The incident demonstrates that the security model of an all-in-one proxy contract is bounded by the weakest trusted-callee in its approval graph: a single pre-authorized integration (Aave v2, in this case) that the proxy can delegate-call into can become the vector through which the proxy's full approval authority is repurposed.

## Summary

Furucombo was a DeFi "drag-and-drop" transaction-builder protocol that allowed users to compose complex multi-step DeFi strategies through a visual interface. Users would approve Furucombo's proxy contract for token spending, and the proxy would execute sequences of DeFi actions (swap, lend, borrow, stake) on the user's behalf across integrated protocols (Uniswap, Aave, Compound, Curve, etc.). The proxy contract maintained a whitelist of allowed function signatures and target contracts to constrain what the proxy could call with user-approved tokens.

On 2021-02-27, an attacker discovered a bypass through the whitelist. The proxy had pre-authorized Aave v2's lending-pool contract as a trusted integration. The attacker deployed a malicious contract whose address — through a quirk of Ethereum's CREATE2 or through a carefully crafted interaction — could be called by the Aave v2 contract in a way that the proxy's whitelist did not anticipate. Specifically, the attacker used a combination of delegate-call forwarding and the proxy's trust in Aave v2's lending-pool address to execute arbitrary external calls with the proxy's full approval authority.

The result: the attacker called the proxy, which — executing in the context of the user's approval — transferred tokens from every user who had approved the Furucombo proxy to the attacker's address. Because the drain exploited the existing token-approval infrastructure (i.e., the attacker used the user's own `approve()` grant, not a contract vulnerability in the user's wallet), users who had approved Furucombo had no defence other than revoking the approval, which was impossible to do retroactively once the drain transaction was confirmed.

The Furucombo team suspended the proxy contract within hours of the exploit and subsequently published a compensation plan for affected users. The protocol recovered partially from the incident but lost significant user trust and never regained its pre-exploit TVL or user-base volume.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| pre-2021-02-27 | Furucombo proxy deployed without timelock; proxy-authority model grants the proxy contract blanket token-approval from users; Aave v2 integrated as a trusted-callee | (standing T12.004 surface: upgradeable-by-owner proxy with no timelock) |
| 2021-02-27 ~16:00 | Attacker deploys exploit contract; first drain transaction executes via the Aave-v2-trusted-callee bypass path | T9.004 (access-control bypass via whitelist gap) |
| 2021-02-27 ~16:15 | Furucombo team detects exploit; suspends proxy contract to prevent further drains | (defender response) |
| 2021-02-27 ~16:30 to 2021-02-28 | ~\$14M in ERC-20 tokens drained; post-mortem analysis published by security researchers (PeckShield, SlowMist) | (forensic analysis) |
| post-incident | Furucombo announces user compensation plan; protocol rebuild with revised authorization architecture | (remediation) |

## Realised extraction

Approximately \$14M in ERC-20 tokens (ETH, USDC, WBTC, DAI, USDT, and additional tokens held by users who had approved the Furucombo proxy). Funds were not returned or recovered.

## T9.004 classification

The Furucombo exploit is a canonical OAK-T9.004 (Access-Control Misconfiguration) case. The access-control failure was not a missing `onlyOwner` or a public `initialize()` function — it was a **whitelist-completeness failure**: the proxy's list of trusted callees included Aave v2, and Aave v2's permitted-function surface was broader than the Furucombo team had modeled. The attacker found a call-path that respected the letter of the whitelist (each individual callee was "allowed") while violating the spirit (the composed call path resulted in unbounded token-transfer authority). This is a recurring T9.004 sub-shape — whitelist-gap / trusted-callee-authority-overreach — that appears in multiple subsequent DeFi exploits (including Li.Fi v1 in July 2022, which involved a similar Diamond-pattern / whitelist-gap failure).

## T12.004 cross-classification

The Furucombo proxy contract was an upgradeable proxy controlled by a single operator address without a governance timelock. While the exploit did not use the upgrade path (it exploited the proxy's existing trusted-callee surface rather than deploying a malicious upgrade), the structural pre-condition — a single-owner proxy without a mandatory delay between upgrade-proposal and execution — matches the T12.004 (Timelock-Free Protocol Upgrade Execution) pattern. The classification is cross-classification (broadly construed): the proxy-authority model, combined with the absence of a timelock, meant that any vulnerability in the proxy's access-control logic was inherently unconstrained by a community-review delay. The Furucombo case — alongside the 2020-2021 DeFi timelock-free-upgrade cohort — contributed to the 2022-2023 DeFi norm-shift toward mandatory governance timelocks for upgradeable proxies.

## References

- Furucombo, "Exploit Post-Mortem," February 28, 2021
- PeckShield, "Furucombo Incident: Root Cause Analysis," February 27, 2021
- SlowMist, "Furucombo Hack Analysis," February 28, 2021
- Rekt News, "Furucombo — REKT," rekt.news, February 27, 2021
