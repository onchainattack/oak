# Maya Protocol — one deposit carrying 23 messages overwrote the chain's own observed-transaction voter, so a safety mechanism paid a 49.45M CACAO "compensation" into a pool holding 0.11 LINK — MAYAChain — 2026-08-18

**Loss:** **~\$1.7M taken**, of which about **\$1.36M** was moved to external chains — roughly **20 BTC** (~\$1.4M) plus ~\$300K in other assets including CACAO and LINK. **Total protocol impact was estimated near \$11M** once market effects are counted: **CACAO fell 88.7%**, from about **\$0.115 to \$0.013**. MAYAChain was **halted** and, at the time of reporting, had no restart date.

**OAK Techniques observed:** **OAK-T10.002** (Message-Verification Bypass — *primary, confirmed mechanism*, in an unusual **self-inflicted** form. A single `MsgDeposit` carrying 23 messages **overwrote the protocol's own observed-transaction voter**, which made the outbound matcher conclude that a legitimate LINK transfer had been stolen. The chain was not deceived by an external message about another chain; it was deceived about **its own prior observation**. See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md)). **OAK-T5.003** (Hidden-Mint Dilution — the consequence. The resulting slash subsidy was **never capped against pool depth**, booking **49.45M CACAO** into an `ARB.LINK` pool that held roughly **0.11 LINK**, against a protocol reserve holding only about **168,000 CACAO** — issuance the chain could not fund. See [`techniques/T5.003-hidden-mint-dilution.md`](../techniques/T5.003-hidden-mint-dilution.md)).

**Attribution:** **pseudonymous.** On-chain identifiers only; no named individual, group, or link to a tracked OAK actor. The exploit chain was reconstructed publicly by independent security researcher **Vini Barbosa**, who identified six distinct bugs composing into the sequence.

**Key teaching point:** **Compensation and slashing logic is attacker-reachable state-change code, and it is almost never modelled as such.** The path that lost the money was a *safety mechanism* — code that fires when the protocol believes an outbound transaction has gone missing, to make a liquidity pool whole. It ran because the chain was convinced of a loss that never happened, and it paid out a figure with **no bound against the pool it was compensating or the reserve funding it**. Protocols audit swap paths, deposit paths, and withdrawal paths exhaustively; the remediation paths that only execute when something has already gone wrong get a fraction of the scrutiny and are reachable by anyone who can convince the chain that something went wrong. **Every automated compensation, subsidy, refund, or slash payout needs a hard cap against pool depth and reserve balance, enforced at execution rather than assumed by the caller.**

## Summary

**Maya Protocol** runs **MAYAChain**, a cross-chain liquidity protocol with trade accounts, liquidity pools, and an outbound-transaction system that tracks whether transfers it initiated actually completed on destination chains.

At approximately **17:30 UTC on 2026-08-18**, at **block 17977941**, an attacker submitted a single **`MsgDeposit` transaction carrying 23 separate messages**. That transaction **overwrote the protocol's own observed-transaction voter** — the state the chain uses to record what it has seen happen. With that record corrupted, the **outbound matcher** concluded that a **legitimate LINK transfer had been stolen**.

The chain then did what it was designed to do on discovering a loss: it triggered the code that **compensates a liquidity pool** for a missing outbound transaction. That compensation was **calculated incorrectly and capped against nothing**. It booked **49.45 million CACAO** into an **`ARB.LINK` pool holding roughly 0.11 LINK**, while the protocol reserve held only about **168,000 CACAO** and could not fund the payment.

Six bugs in total formed the chain, spanning **trade accounts, outbound transaction handling, and liquidity-pool calculations**. The attacker converted the position into roughly **20 BTC** and other assets, moving about **\$1.36M** off-chain. CACAO collapsed **88.7%**. Co-founder **Aalux** confirmed the network pause and ongoing recovery.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2026-08-18 ~17:30 | Attacker submits one **`MsgDeposit` with 23 messages** at **block 17977941** | **T10.002 entry** |
| 2026-08-18 | The transaction **overwrites the observed-transaction voter**; the outbound matcher concludes a legitimate **LINK** transfer was stolen | **T10.002 false-loss induction** |
| 2026-08-18 | Loss-compensation path fires; **slash subsidy uncapped against pool depth** books **49.45M CACAO** into an `ARB.LINK` pool holding ~**0.11 LINK**; reserve holds only ~**168,000 CACAO** | **T5.003 unfunded issuance** |
| 2026-08-18 | Attacker extracts ~**20 BTC** (~\$1.4M) plus ~\$300K in other assets; ~**\$1.36M** moved to external chains | (extraction) |
| 2026-08-18–19 | **CACAO falls 88.7%** (~\$0.115 → ~\$0.013); pool value down ~\$11M | (market impact) |
| 2026-08-18 onward | **MAYAChain halted**; co-founder confirms pause and recovery work, no restart date | (operator response) |

## What defenders observed

- **The attack targeted the chain's memory of itself.** Most T10.002 cases involve a protocol being lied to about an *external* chain. Here the corrupted object was MAYAChain's own observed-transaction voter — its record of what it had already seen. Verification hardening aimed outward would not have touched this; the trust boundary that failed was internal.
- **A 23-message transaction is an anomaly on its face.** Batched-message transactions exist for legitimate reasons, but message count is a cheap, protocol-agnostic signal, and a single deposit carrying 23 messages that touches voter state is anomalous by any reasonable baseline. Per-transaction message-count limits and alerting are the crudest possible control here and would have applied.
- **The subsidy had no relationship to reality at three separate levels.** 49.45M CACAO paid into a pool holding 0.11 LINK, from a reserve holding 168,000 CACAO. Any one of those comparisons — payout vs pool depth, payout vs reserve balance, payout vs the value of the transfer allegedly lost — would have failed closed. None was checked (OAK-M11).
- **Six bugs, not one, and that is the reportable finding.** No individual defect here was necessarily catastrophic. The loss required voter-state corruption *and* a mis-firing outbound matcher *and* an uncapped subsidy *and* pool-calculation errors to compose. Audits that clear components independently do not clear their compositions, and cross-module state machines are where this class lives.
- **Market impact exceeded direct theft by roughly six times.** \$1.7M taken, ~\$11M in total protocol impact, CACAO down 88.7%. For a protocol whose own token backs its compensation logic, an unfunded issuance event is simultaneously a theft and a supply shock — the second-order damage is structural, not incidental.

## Public references

- `[coindeskmaya2026]` — CoinDesk, "Maya Protocol exploit drains bitcoin and other assets as pool value drops by \$11 million" (2026-08-19; ~20 BTC taken, ~\$11M pool-value impact, network halt): <https://www.coindesk.com/markets/2026/08/19/maya-protocol-exploit-drains-bitcoin-and-other-assets-as-pool-value-drops-usd11-million>
- `[kucoinmaya2026]` — KuCoin News, "Maya Protocol Loses \$1.7M in Six-Bug Exploit" (the six-bug chain, the single transaction carrying 23 messages, the affected surfaces — trade accounts, outbound transaction handling, liquidity-pool calculations; Vini Barbosa's analysis): <https://www.kucoin.com/news/flash/maya-protocol-loses-1-7m-in-six-bug-exploit>
- `[cryptonewsmaya2026]` — crypto.news, "Maya Protocol suffers \$1.7 million exploit, halts network" (block 17977941, the `MsgDeposit` overwriting the observed-transaction voter, the outbound matcher concluding a legitimate LINK transfer was stolen, the uncapped slash subsidy booking 49.45M CACAO into an ARB.LINK pool holding ~0.11 LINK against a ~168,000 CACAO reserve, ~\$1.36M moved to external chains): <https://crypto.news/maya-protocol-suffers-1-7-million-exploit-halts-network/>
- `[cryptopolitanmaya2026]` — Cryptopolitan, "Maya Protocol loses \$1.7M in sophisticated six-bug exploit" (exploit-chain framing and asset breakdown): <https://www.cryptopolitan.com/maya-protocol-loses-1-7m-bug-exploit/>
- `[cryptonomistmaya2026]` — The Cryptonomist, "Maya Protocol Exploit Halts Cross-Chain Network Amid \$1.7M Theft" (2026-08-19; halt confirmation by co-founder Aalux, CACAO price collapse from ~\$0.115 to ~\$0.013): <https://en.cryptonomist.ch/2026/08/19/maya-protocol-exploit-theft/>

## Discussion

The reusable idea here is **loss-handling code as an attack surface**. A protocol's remediation paths — compensation, subsidy, slashing, refunds, insurance draws — exist precisely to move value when something has gone wrong. They are therefore, by construction, value-moving code whose trigger is a *belief state* rather than a user request. Anyone who can manipulate the belief can invoke the payout, and unlike a swap or a withdrawal, these paths often carry no caps at all, because their designers reasoned about them as rare corrective actions rather than as reachable functions.

That framing also explains why the composition matters more than any single bug. Overwriting the voter was the entry, but the voter overwrite alone moves nothing. What converted a corrupted record into \$1.7M was the subsidy's willingness to pay 49.45M CACAO into a pool holding 0.11 LINK from a reserve of 168,000 CACAO — three independent sanity checks that were not present. Contributors documenting protocol-logic cascades should enumerate the **bound checks that were absent** as carefully as the bugs that were present, because the absent bounds are what set the loss ceiling and they are the cheapest thing to fix.

Finally, this belongs beside the corpus's other 2026 cross-chain-verification cases — Coreum's relayers validating a deposit *message* rather than a deposit *balance*, Allbridge's `receiveCctpMessage` accepting an attestation without confirming a mint — with one distinction worth preserving. Those protocols were lied to about the outside world. Maya was lied to about itself, and self-observation is the trust boundary defenders are least likely to have drawn on the diagram.
