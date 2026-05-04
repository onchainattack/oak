# Beanstalk Farms governance attack — Ethereum — 2022-04-17

**Loss:** \~\$182M (\~\$76M attacker net profit after flash-loan repayment; remainder belonged to legitimate protocol holders).
**OAK Techniques observed:** OAK-T9.002 (Flash-Loan-Enabled Exploit), OAK-T9.003 (Governance Attack), OAK-T16.001 (Vote Takeover via Flash-Loan — operational sub-pattern of T9.003), OAK-T7.001 (Mixer-Routed Hop) downstream.
**Attribution:** **pseudonymous** attacker; no public named-individual attribution.

## Summary

Beanstalk Farms was an Ethereum-based stablecoin protocol with on-chain governance mediated by its STALK governance token. On April 17, 2022, an attacker took out approximately \$1B in flash loans from Aave (in DAI, USDC, and USDT), used the borrowed stablecoins to acquire approximately 67% of STALK voting power, and used Beanstalk's `emergencyCommit` function to bypass the normal proposal lifecycle and immediately execute a malicious governance proposal (BIP-18) that transferred protocol funds to attacker-controlled addresses. The proceeds were laundered through Tornado Cash. The protocol's smart contracts were paused and governance privileges revoked; Beanstalk subsequently re-launched on a re-audited contract base. The attacker also routed approximately 250,000 USDC of the proceeds to the public Ukraine Crypto Donation address — a footnote that does not change the OAK classification but is part of the public record.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-04-17 (single transaction) | Aave flash loans (\~\$1B in DAI/USDC/USDT) acquired | **T9.002 precondition** |
| same transaction | Borrowed stablecoins used to acquire \~67% of STALK voting power | **T9.003 setup** |
| same transaction | `emergencyCommit` executed on BIP-18, draining treasury to attacker-controlled addresses | **T9.003 execution** |
| same transaction | Flash loans repaid; net profit \~\$76M retained | T9.002 closure |
| Hours after | Proceeds routed through Tornado Cash | **T7.001** |
| Hours after | \~250,000 USDC sent to Ukraine Crypto Donation address | (off-OAK note) |

## What defenders observed

- **Pre-event (governance-design layer):** Beanstalk's voting-power computation took spot balances at proposal-execution time, with no flash-loan-resistance, no quorum delay, and an `emergencyCommit` path that bypassed the normal proposal lifecycle. These were standing T9.003 surfaces from the day the governance contract was deployed.
- **At-event:** the entire attack — flash-loan acquisition, voting-power acquisition, proposal execution, treasury drain, flash-loan repayment — fits in a single transaction. This is the canonical T9.002 single-block signature.
- **Post-event:** Beanstalk's pause-and-relaunch response is the standard mitigation chain for a T9-class incident at the affected-protocol layer. From the holder layer, mitigation ranges from "you cannot recover; treasury is gone" (most cases) to "treasury insurance / re-launch covers some fraction" (Beanstalk's actual response).

## What this example tells contributors writing future Technique pages

- **T9.002 (flash loan) and T9.003 (governance attack) are linked but separately mitigated.** Beanstalk could have prevented this with either flash-loan-resistant voting-power computation (T9.003 mitigation: snapshot balances at proposal-creation time over a multi-block window) or with a minimum delay between proposal submission and execution (T9.003 mitigation: quorum + timelock). Either alone would have been sufficient. Contributors writing T9.002 + T9.003 chains should make the available mitigation ladder explicit.
- **"Code is law" framing is a defender hazard.** Beanstalk's `emergencyCommit` function did exactly what its code said it would do. The lesson is *not* that the attacker did something illegitimate at the contract level — it is that the contract design assumed long-term holder consent that 67% spot voting power did not represent. T9.003 detection lives at the design-review layer, not at the runtime-detection layer.
- **Pseudonymous attribution is the v0.1 norm for T9 incidents.** Few T9 attackers identify themselves (Mango Markets is the rare exception). Worked examples should not speculate about attacker identity unless a credible authoritative attribution exists.

## Public references

- [Beanstalk official post-mortem](https://bean.money/blog/beanstalk-governance-exploit) — protocol-side post-mortem.
- [Coindesk — Attacker Drains \$182M From Beanstalk Stablecoin Protocol](https://www.coindesk.com/tech/2022/04/17/attacker-drains-182m-from-beanstalk-stablecoin-protocol).
- [Cointelegraph — Beanstalk Farms loses \$182M in DeFi governance exploit](https://cointelegraph.com/news/beanstalk-farms-loses-182m-in-defi-governance-exploit).
- [Immunefi — Hack Analysis: Beanstalk Governance Attack, April 2022](https://medium.com/immunefi/hack-analysis-beanstalk-governance-attack-april-2022-f42788fc821e).
- [CertiK — Revisiting Beanstalk Farms Exploit](https://www.certik.com/resources/blog/revisiting-beanstalk-farms-exploit).
- `[zhou2023sok]` — academic taxonomy classifying this as a flash-loan-enabled governance-attack chain.

## Discussion

Beanstalk is OAK's canonical T9.002 + T9.003 case because the failure mode is unambiguous from the public record, the dollar loss is large, the post-mortem is published, and the mitigation ladder (snapshot voting power; minimum proposal delay; remove emergency-execution paths) is well-understood and broadly adopted by post-2022 governance contracts. As of 2024-2025, large-scale T9.003 incidents at top-tier DeFi protocols are rarer precisely because of this design shift — the attack surface contracted as the standard governance design pattern improved.
