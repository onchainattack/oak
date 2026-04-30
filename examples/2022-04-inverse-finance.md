# Inverse Finance recurring oracle exploits — Ethereum — 2022-04-02 and 2022-06-16

**Loss:** **2022-04-02 incident** — approximately \$15.6M from the Inverse Finance Anchor money market (\~1,588 ETH, \~94 WBTC, \~39 YFI, and additional INV / DOLA exposure). **2022-06-16 incident** — approximately \$1.2M from Inverse's DOLA + 3CRV / Yearn Curve LP integration. Combined: approximately \$16.8M across the two events.
**OAK Techniques observed:** **OAK-T9.001** (Oracle Price Manipulation — single-input-feed subclass on the April 2 incident; LP-token-price subclass on the June 16 incident); **OAK-T9.002** (Flash-Loan-Enabled Exploit) as the precondition on both incidents.
**Attribution:** **pseudonymous** on both incidents; not publicly named. Proceeds laundered through standard mixer-routed paths of the period.
**Key teaching point:** the second exploit struck the same protocol within \~75 days. This is the canonical 2022 instance of the **recurring-target** pattern — a protocol that suffers a T9-class incident, executes a partial remediation, and is then exploited a second time on a related-but-distinct surface within a short window. The pattern is not unique to Inverse Finance — Cream Finance suffered three incidents in 2020-2021 (`/examples/2021-10-cream-finance.md`); the recurring-target observation is a cross-cutting cohort property of T9-vulnerable protocols, not a property of any single protocol's engineering culture.

## Summary

Inverse Finance is an Ethereum DeFi protocol whose Anchor money-market component supported INV (the protocol's governance token) as collateral. On 2022-04-02, an attacker observed that Inverse's INV price oracle for the Anchor market read its input from a thin on-chain venue — a Sushiswap INV/WETH pool — without TWAP-windowed averaging. The attacker took a flash loan, used it to drive the INV/WETH spot price up sharply on the Sushiswap pool that fed the oracle, deposited a small INV position into Anchor at the inflated valuation, and immediately borrowed approximately \$15.6M in ETH, WBTC, YFI, DOLA, and other assets against it. The flash loan was repaid; the borrow position was abandoned; the borrowed assets were withdrawn and laundered through Tornado Cash. Inverse paused INV-collateral borrowing on Anchor the same day and published an incident post-mortem.

On 2022-06-16, a second attacker exploited a different but structurally adjacent surface on Inverse: the protocol's integration with the Yearn Curve LP for DOLA + 3CRV. The price feed for that LP token was derived from the underlying Curve pool's reserves in a way that was, again, manipulable by a single-block flash-loan-funded imbalance. The attacker drove the Curve pool reserves into an imbalanced state, exploited the LP-token price feed to extract approximately \$1.2M of DOLA, and unwound. Inverse paused the affected integration and published a second post-mortem.

The two incidents are documented together in this worked example because the cross-incident pattern is the load-bearing teaching point. Each incident, taken alone, is a routine T9.001 case in the same family as Mango Markets (`/examples/2022-10-mango-markets.md`) and Saddle Finance (`/examples/2022-04-saddle-finance.md`). What makes Inverse a useful OAK reference is that the same protocol was hit twice on related-but-distinct oracle surfaces in 75 days.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-04-02 ~10:30 | Flash loan taken as working capital | **T9.002 precondition (incident 1)** |
| same transaction | INV/WETH price on Sushiswap driven sharply up via large directional swap | **T9.001 oracle move (incident 1)** |
| same transaction | Small INV deposit into Anchor at inflated valuation; \~\$15.6M borrow against it | **T9.001 extraction (incident 1)** |
| same transaction | Flash loan repaid; borrowed assets withdrawn | T9.002 closure |
| 2022-04-02 (within hours) | Inverse pauses INV-collateral borrowing on Anchor; incident page published | (defender response) |
| 2022-04-02 onward | Proceeds routed through Tornado Cash | T7.001 |
| 2022-04 to 2022-06 | Partial remediation: INV-collateral path mitigated; broader oracle-input audit not yet complete | (incomplete remediation window) |
| 2022-06-16 | Second attacker drives DOLA + 3CRV Curve pool reserves into imbalanced state via flash loan | **T9.002 + T9.001 (incident 2)** |
| same transaction | Yearn Curve LP price-feed derivation exploited; \~\$1.2M DOLA extracted | **T9.001 extraction (incident 2)** |
| 2022-06-16 (within hours) | Inverse pauses affected integration; second post-mortem published | (defender response) |

## What defenders observed

- **Pre-event (oracle-architecture layer, both incidents):** Inverse's pricing for INV (incident 1) and for the Yearn Curve LP (incident 2) read inputs from on-chain venues whose state was directly mutable inside a single transaction by a flash-loan-funded actor. Neither input had a TWAP window, multi-venue quorum, or deviation circuit-breaker. These were standing T9.001 surfaces from the day each integration was deployed.
- **At-event (incident 1):** Sushiswap INV/WETH was thin enough that a single flash-loan-funded directional swap moved the spot price by a large multiplier. The Anchor money market read that spot price as ground truth. The extraction transaction is the canonical T9.001 + T9.002 single-block signature.
- **At-event (incident 2):** the Yearn Curve LP price-feed derivation read the underlying Curve pool's reserves at the moment of the call. A single-block flash-loan-funded imbalance moved the derivation off the equilibrium it was implicitly assuming. The extraction transaction has the same structural shape as incident 1 — flash loan opens, on-chain price input manipulated, extraction priced against the manipulated input, unwind, repay.
- **Post-event (cross-incident):** Inverse's first remediation focused on the specific INV-collateral path that was exploited. The second incident, 75 days later, struck a different oracle-input surface that the first remediation had not enumerated. This is the **partial-remediation pattern** — fixing the symptom of the specific exploited path without enumerating the full set of structurally-equivalent surfaces — and it is the load-bearing operational observation for this case.

## What this example tells contributors writing future Technique pages

- **Recurring-target is a real pattern; partial remediation is its precondition.** The Cream Finance worked example at `/examples/2021-10-cream-finance.md` documents three incidents on one protocol in 2020-2021 across structurally-different surfaces. Inverse adds a tighter example: two incidents in 75 days on related-but-distinct oracle surfaces. Contributors writing T9 pages should document **post-incident audit-scope completeness** as the operational discriminator — the question is not "did the protocol respond to the first incident?" but "did the post-incident audit enumerate every structurally-equivalent surface, or only the one that was exploited?"
- **T9.001 has more than one subclass per protocol.** Inverse's incident 1 is a single-input-feed subclass (one thin DEX pool reads as ground truth); incident 2 is an LP-token-price subclass (a derivation over an LP's underlying reserves reads as ground truth). Contributors writing T9.001 pages should treat the subclass distinction as material — the mitigation surface differs (oracle-input quorum vs derivation invariants), and the audit-checklist items differ.
- **Pseudonymous attribution is the v0.1 norm for both incidents.** As with Beanstalk, Saddle, and the bulk of 2022 DeFi T9 cases, the Inverse attackers did not publicly self-identify, and no authoritative public attribution was made. OAK records both Inverse incidents as `pseudonymous / unattributed`.
- **The 75-day gap is the operational metric.** Contributors collecting cohort statistics on T9-class incidents should record the gap between the first incident and any same-protocol follow-up — it is a useful proxy for post-incident audit-scope completeness across the protocol cohort.

## Public references

### Incident 1 (April 2, 2022)

- [Inverse Finance — Inverse Finance Suffers Oracle Price Manipulation Attack](https://www.inverse.finance/blog/posts/en-US/post-mortem-april-2nd-2022-economic-exploit) — protocol-side post-mortem.
- [PeckShield — Inverse Finance Hack Analysis](https://twitter.com/peckshield/status/1510232024228859908) — same-day on-chain trace identifying the Sushiswap INV/WETH oracle-input path.
- [Halborn — Explained: The Inverse Finance Hack (April 2022)](https://www.halborn.com/blog/post/explained-the-inverse-finance-hack-april-2022) — defender-oriented technical post-mortem.
- [The Block — Inverse Finance loses \$15.6 million in oracle manipulation attack](https://www.theblock.co/post/139745/inverse-finance-loses-15-6-million-in-oracle-manipulation-attack) — contemporaneous coverage.

### Incident 2 (June 16, 2022)

- [Inverse Finance — Post-mortem: June 16 incident](https://www.inverse.finance/blog/posts/en-US/post-mortem-june-16-2022-economic-exploit) — protocol-side post-mortem of the second incident.
- [PeckShield — Inverse Finance Second Exploit](https://twitter.com/peckshield/status/1537511160895926273) — on-chain trace.
- `[zhou2023sok]` — academic taxonomy covering both as flash-loan-enabled oracle-manipulation chains.


## Discussion

Inverse Finance is OAK's canonical 2022 example of the **recurring-target** pattern. The April 2 and June 16 incidents are individually unremarkable — each is a routine T9.001 + T9.002 chain in the same family as Mango Markets and Saddle Finance. What makes them collectively worth a worked example is the 75-day gap between them, the partial remediation in between, and the structural near-identity of the two extraction patterns despite the different oracle-input surfaces.

For OAK contributors, the cross-cutting lesson is that **post-incident audit-scope completeness** is a load-bearing operational artefact that the framework currently does not surface as a Mitigation. T9.001's mitigations live at the oracle-design layer (TWAP, quorum, circuit-breaker); they do not, in v0.1, explicitly call out "after a T9.001 incident, enumerate every other oracle-input surface in the protocol's call graph and audit each one against the same checklist." That gap is a v0.x candidate Mitigation for T9.001.

The cross-reference to Cream Finance (`/examples/2021-10-cream-finance.md`) is the other half of the recurring-target observation: Cream's three incidents in 2020-2021 spanned different Tactics, while Inverse's two 2022 incidents spanned different subclasses of the same Technique. Contributors writing future T9 pages should treat both shapes as instances of the same operator-side property: **after the first T9 hit, the audit scope must enumerate the full structurally-equivalent surface, not just the exploited path**.

The Chainalysis 2022 DeFi-incident retrospective (and the broader Chainalysis 2022/2023 reports) records oracle-manipulation incidents at a multi-hundred-million-USD-per-year scale across the industry, with small-to-mid-cap protocols disproportionately represented; Inverse fits that cohort precisely.
