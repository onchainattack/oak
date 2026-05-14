# Pickle Finance Evil Jar exploit — Ethereum — 2020-11-21

**Loss:** approximately $20M drained from Pickle Finance's DAI PickleJar (pJar 0.99d). The attacker deployed a malicious "Evil Jar" strategy contract, swapped PickleJar funds into the malicious contract, and extracted the DAI.
**OAK Techniques observed:** OAK-T9.004 (Access-Control Misconfiguration — primary; the attacker was able to swap PickleJar's strategy contract to an attacker-controlled "Evil Jar" without timelock or multi-sig governance delay, converting the strategy-contract-pointer authority into a full treasury-extraction surface). OAK-T5.001 (Hard LP / Treasury Drain — structurally co-occurring; the replaced strategy contract allowed direct extraction of the PickleJar's deposited DAI).
**Attribution:** pseudonymous; the attacker has not been publicly identified. Partial funds were tracked through Tornado Cash. Pickle Finance recovered via a token-migration-based compensation plan (CORNICHON → DILL token migration).
**Key teaching point:** A yield-aggregator strategy-contract pointer that can be swapped without timelock, multi-sig, or governance delay is a single-transaction treasury-extraction surface. The "Evil Jar" pattern — deploy a malicious strategy contract, swap the live vault's strategy pointer to the malicious contract, drain the vault — requires only the strategy-swap authority, not the vault's direct asset-transfer authority, making it a stealthier access-control misconfiguration than a direct upgrade-proxy compromise.

## Summary

Pickle Finance was an Ethereum yield-aggregation protocol that operated PickleJars (pJars) — vaults that deposited user funds into yield-generating DeFi strategies. Each pJar had a strategy-contract pointer that determined where vault funds were deployed. On 2020-11-21, an attacker deployed a malicious "Evil Jar" strategy contract and, exploiting the fact that strategy-contract swaps were not gated by timelock or multi-sig governance, swapped the DAI PickleJar's strategy pointer to the malicious contract. Once the strategy pointer was redirected, the malicious strategy contract was able to extract the full DAI balance of the pJar — approximately $20M.

The attack surface was the strategy-contract-swap authority: the function that allowed the protocol operator to change the pJar's destination strategy contract was not protected by a timelock delay, multi-signature quorum, or governance vote. A single attacker with access to the operator's EOA — or, as in this case, the ability to call the swap function through available permissions — could redirect the entire vault's funds to an attacker-controlled contract in a single transaction. The access-control surface was structurally similar to the proxy-upgrade-compromise pattern (a single pointer mutation redirects all funds) but was stealthier because strategy-contract swaps were a normal operational function rather than an exceptional governance action, and monitoring for strategy-swap events was less common than monitoring for proxy-upgrade events at the time.

Pickle Finance responded by migrating the protocol's token economy (CORNICHON → DILL token migration) and implementing a compensation plan for affected users. The migration preserved the protocol's operational continuity, and Pickle Finance continued operating post-incident.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2020-11-21 | Attacker deploys malicious "Evil Jar" strategy contract | T9.004 (setup) |
| 2020-11-21 (same transaction or close) | Attacker swaps DAI PickleJar (pJar 0.99d) strategy pointer to the malicious contract — no timelock, no multi-sig, no governance delay | T9.004 (access-control abuse — strategy-pointer mutation) |
| 2020-11-21 (same window) | Malicious strategy contract extracts ~$20M in DAI from the PickleJar | T5.001 (extraction) |
| 2020-11-21 (post-event) | Pickle Finance team identifies the exploit; publicly discloses | (operator response) |
| 2020-11-21 onward | Partial funds tracked through Tornado Cash; no negotiated return | (post-event trace) |
| 2020-Q4 to 2021-Q1 | Pickle Finance executes CORNICHON → DILL token migration with compensation framework for affected depositors | (recovery — token-migration-based compensation) |

## Public references

- Pickle Finance operator-side post-mortem, November 2020 — `[picklefinancepostmortem2020]`.
- PeckShield on-chain trace — `[peckshieldpickle2020]`.
- Rekt News public-facing summary — `[rektepickle2020]`.
- Cross-reference: T9.004 (Access-Control Misconfiguration) at `techniques/T9.004-access-control-misconfiguration.md`.
- Cross-reference: T5.001 (Hard LP / Treasury Drain) at `techniques/T5.001-hard-lp-treasury-drain.md`.

## Discussion

Pickle Finance is the canonical "Evil Jar" / strategy-pointer-compromise worked example and is structurally adjacent to the proxy-upgrade-compromise subclass of T9.004. The distinction between strategy-pointer mutation and proxy-upgrade mutation is architecturally significant for defender portfolios: a strategy-contract swap is a normal operational function in yield-aggregator architectures, making it harder to monitor than a proxy-upgrade event (which is typically an exceptional governance action with fewer legitimate invocations). The defender lesson is that any pointer that redirects significant treasury value (strategy contracts, price-oracle sources, keeper-authority lists) must be treated with the same access-control discipline as a proxy upgrade — timelock, multi-sig, and governance-delay gates.

The $20M loss magnitude places Pickle Finance in the mid-to-large range of the Q4 2020 DeFi exploit cohort and makes it one of the three anchor cases for the access-control-misconfiguration class in 2020, alongside Origin Dollar (November 2020, stablecoin rebase misconfiguration) and Cover Protocol (December 2020, Blacksmith mint misconfiguration). The token-migration recovery pattern (CORNICHON → DILL) is a structurally interesting resolution shape that preserves protocol continuity while compensating affected users through a restructured token economy.
