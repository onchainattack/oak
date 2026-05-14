# Transit Swap DEX aggregator exploit — Multi-chain (Ethereum, BNB Chain) — 2022-10-02

**Loss:** approximately \$23M from ~10,000+ users across Ethereum and BNB Chain. The attacker exploited a vulnerability in Transit Swap's swap-contract approval logic to drain tokens that users had previously approved for trading via the aggregator.
**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — the swap-contract approval logic lacked proper authorisation validation, permitting the attacker to exercise transfer authority over user-approved tokens without a legitimate swap intent). **OAK-T4.002** (Compromised Front-End Permit Solicitation — broadly construed; the swap contract's approval logic was the exploit surface through which user-approved allowances were drained, structurally analogous to a frontend compromise in that the legitimate platform's approval infrastructure became the extraction vector).
**Attribution:** **pseudonymous (no public attribution to a named group).** The attacker engaged in white-hat negotiation post-extraction; approximately \$16M (~70% of the stolen assets) was recovered through negotiation and voluntary return within days.
**Key teaching point:** **Transit Swap is the canonical 2022 DEX-aggregator "approved-token drain" case: the vulnerability was not in individual users' wallets but in the aggregator's own swap-contract approval logic, which effectively turned the aggregator's legitimate allowance-authority surface into an extraction vector.** The ~70% recovery rate via white-hat negotiation — combined with the ~10,000-victim scale — makes this case a reference for aggregator-contract audit scope (the approval-logic attack surface must be treated as critical infrastructure, not UI plumbing) and for multi-victim incident response coordination.

## Summary

Transit Swap was a cross-chain DEX aggregator that allowed users to swap tokens across multiple decentralised exchanges. To facilitate swaps, users granted token-approval allowances to Transit Swap's swap-router contracts — a standard pattern for DEX aggregators.

On 2022-10-02, an attacker exploited a vulnerability in Transit Swap's swap-contract approval logic. The vulnerable contract permitted the attacker to call a transfer function that exercised the pre-granted user allowances without a legitimate swap intent — effectively draining tokens from any user who had ever approved the Transit Swap router. The exploit affected approximately 10,000+ users across Ethereum and BNB Chain, with total losses estimated at ~\$23M.

Transit Swap's team engaged with the attacker via on-chain messaging and white-hat negotiation channels. The attacker returned approximately \$16M (~70%) of the stolen assets within days, with the remaining ~\$7M retained by the attacker or lost to laundering infrastructure. The Transit Swap team worked with security firms (SlowMist, PeckShield, BlockSec) to trace the remaining funds and published a post-mortem documenting the approval-logic vulnerability.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| pre-2022-10-02 | Users grant token-approval allowances to Transit Swap router contracts (standard aggregator approval pattern) | (standing T9.004 surface — approval logic without proper authorisation validation) |
| 2022-10-02 | Attacker exploits vulnerable swap-contract approval logic; drains ~$23M from ~10,000+ approved-user wallets | T9.004 (access-control misconfiguration in approval logic) + T4.002 (exploiting legitimate platform's approval surface) |
| 2022-10-02 to 2022-10-05 | Transit Swap team engages attacker via on-chain messaging; ~$16M (~70%) returned through negotiation | (white-hat negotiation + partial recovery) |
| 2022-10 T+ | Transit Swap publishes post-mortem; SlowMist / PeckShield / BlockSec publish forensic analyses | (post-mortem + forensic documentation) |

## Realised extraction

Approximately \$23M initially drained; ~\$16M recovered via white-hat negotiation, leaving ~\$7M net realised loss across ~10,000+ victims.

## T4.002 classification note

The Transit Swap case is classified under T4.002 as a "frontend-as-exploit-surface" case where the legitimate platform's approval infrastructure — not a phished or DNS-hijacked frontend — served as the extraction vector. The structural analogy is that the swap contract's flawed approval logic effectively "compromised" the legitimate platform's authority surface: users had granted allowances to a trusted aggregator, but the aggregator's own contract logic failed to restrict the use of those allowances to legitimate swap operations only. This is the boundary case between T9.004 (access-control misconfiguration in the contract logic itself) and T4.002 (exploitation of the platform's approval surface as the entry vector).

## References

- Transit Swap post-mortem and community announcement, October 2022
- SlowMist, PeckShield, and BlockSec forensic analyses of the Transit Swap exploit, October 2022
- On-chain transaction records for the exploit, fund return, and laundering paths
- DEX aggregator security-audit scope discussions, 2022-2023
