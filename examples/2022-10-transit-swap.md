# Transit Swap DEX aggregator exploit — Multi-chain (Ethereum, BNB Chain) — 2022-10-02

**Loss:** approximately \$23M (The Block reports ~\$21M) across Ethereum and BNB Chain [ctransit], [tbtransit]. The attacker exploited missing input validation in the `claimTokens` function, letting them choose which token contract's `transferFrom` ran, to drain tokens that users had previously approved for trading via the aggregator.
**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — the swap-contract approval logic lacked proper authorisation validation, permitting the attacker to exercise transfer authority over user-approved tokens without a legitimate swap intent). **OAK-T4.002** (Compromised Front-End Permit Solicitation — broadly construed; the swap contract's approval logic was the exploit surface through which user-approved allowances were drained, structurally analogous to a frontend compromise in that the legitimate platform's approval infrastructure became the extraction vector).
**Attribution:** **pseudonymous** The attacker engaged in white-hat negotiation post-extraction; approximately \$16.2M (~70% of the stolen assets) was returned in under 24 hours [ctransit].
**Key teaching point:** **Transit Swap is the canonical 2022 DEX-aggregator "approved-token drain" case: the vulnerability was not in individual users' wallets but in the aggregator's own swap-contract approval logic, which effectively turned the aggregator's legitimate allowance-authority surface into an extraction vector.** The ~70% recovery rate via negotiation — combined with the multi-victim scale — makes this case a reference for aggregator-contract audit scope (the approval-logic attack surface must be treated as critical infrastructure, not UI plumbing) and for multi-victim incident response coordination.

**Corrected 2026-10-11:** Removed the unsourced '~10,000+ users' count; the return of ~70% happened in under 24 hours, not days; the root cause was missing input validation on user-supplied parameters in claimTokens (arbitrary external call), and loss estimates range from ~\$21M to ~\$23M.

## Summary

Transit Swap was a cross-chain DEX aggregator that allowed users to swap tokens across multiple decentralised exchanges. To facilitate swaps, users granted token-approval allowances to Transit Swap's swap-router contracts — a standard pattern for DEX aggregators.

On 2022-10-02, an attacker exploited a vulnerability in Transit Swap's swap-contract approval logic. The vulnerable contract made an attacker-controlled external call, so existing user approvals were used to move tokens without swap intent [halbtransit]. The exploit affected users across Ethereum and BNB Chain (victim count not stated in cited sources), with total losses estimated at ~\$23M [ctransit] (~\$21M per [tbtransit]). Halborn describes the root cause as `claimTokens` lacking validation of user-supplied parameters before an external call [halbtransit].

Transit Swap's team engaged with the attacker via on-chain messaging and white-hat negotiation channels. The attacker returned roughly 70% (~\$16.2M) of the stolen assets in under 24 hours [ctransit]; the remainder was retained, and some was reportedly sent to Tornado Cash. SlowMist published a technical analysis [slowmisttransit].

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| pre-2022-10-02 | Users grant token-approval allowances to Transit Swap router contracts (standard aggregator approval pattern) | (standing T9.004 surface — approval logic without proper authorisation validation) |
| 2022-10-02 | Attacker exploits vulnerable swap-contract approval logic; drains ~\$23M from approved-user wallets [ctransit] | T9.004 (access-control misconfiguration in approval logic) + T4.002 (exploiting legitimate platform's approval surface) |
| 2022-10-02 to 2022-10-03 | ~\$16.2M (~70%) returned within 24 hours [ctransit] | (white-hat negotiation + partial recovery) |
| 2022-10 T+ | SlowMist publishes technical analysis [slowmisttransit]; Halborn explainer [halbtransit] | (post-mortem + forensic documentation) |

## Realised extraction

Approximately \$23M initially drained; ~\$16.2M returned by the attacker [ctransit], leaving a net loss of the remainder.

## T4.002 classification note

The Transit Swap case is classified under T4.002 as a "frontend-as-exploit-surface" case where the legitimate platform's approval infrastructure — not a phished or DNS-hijacked frontend — served as the extraction vector. The structural analogy is that the swap contract's flawed approval logic effectively "compromised" the legitimate platform's authority surface: users had granted allowances to a trusted aggregator, but the aggregator's own contract logic failed to restrict the use of those allowances to legitimate swap operations only. This is the boundary case between T9.004 (access-control misconfiguration in the contract logic itself) and T4.002 (exploitation of the platform's approval surface as the entry vector).

## Public references

- `[ctransit]` — Cointelegraph, "Transit Swap hacker returns 70% of \$23M in stolen funds" (2022-10-03): <https://cointelegraph.com/news/transit-swap-hacker-returns-70-of-23m-in-stolen-funds>
- `[halbtransit]` — Halborn, "Explained: The Transit Swap Hack (October 2022)": <https://halborn.com/explained-the-transit-swap-hack-october-2022/>
- `[tbtransit]` — The Block, "Hacker returns 70% of \$21 million taken from Transit Swap DEX" (2022-10-02): <https://www.theblock.co/post/174307/hacker-returns-70-of-21-million-taken-from-transit-swap-dex>
- `[slowmisttransit]` — SlowMist, "Cross-chain DEX Aggregator Transit Swap Hacked Analysis": <https://slowmist.medium.com/cross-chain-dex-aggregator-transit-swap-hacked-analysis-74ba39c22020>
