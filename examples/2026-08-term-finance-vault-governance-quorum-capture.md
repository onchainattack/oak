# Term Finance — \$951 bought 90.66% of a vault's voting power, because voting required opt-in staking and almost nobody had opted in — Term Labs / Ethereum — 2026-08-23

**Loss:** **~\$8.5M** — **2,843 ETH** (~\$6.87M) and **1.68M USDC** (swapped to ~1.6M DAI), roughly **68% of the affected vaults' assets**. Term Labs shut the affected vaults and revoked governance roles; the core lending markets were reported unaffected. No technical post-mortem had been published at the time of writing.

**OAK Techniques observed:** **OAK-T16.002** (Hostile-Vote Treasury Drain — *primary, confirmed mechanism*. The attacker acquired governance control legitimately, passed proposals, and the vaults executed them. Every contract behaved as written. See [`techniques/T16.002-hostile-vote-treasury-drain.md`](../techniques/T16.002-hostile-vote-treasury-drain.md)). Explicitly **not OAK-T16.001** (Vote Takeover via Flash Loan): no flash loan was involved and none was needed — the voting power was *bought outright and kept*, for less than the price of a laptop. The distinction matters for defenders, because the standard flash-loan countermeasures (snapshot-at-block, vote-locking, borrow-resistant checkpoints) would not have touched this.

**Attribution:** **pseudonymous.** On-chain identifiers only. The attacker wallet was seeded with **2 ETH routed through Tornado Cash** before the operation, and PeckShield and CertiK independently tracked proceeds to a destination address beginning `0xD5183`. No named individual, group, or link to a tracked OAK actor.

**Key teaching point:** **Governance security is measured against the staked denominator, not the token supply — and an opt-in staking model keeps that denominator near zero until someone has a reason to move it.** Term's vaults required staking vault shares to obtain voting power, and the total staked across the pool before the drain was **0.5352 gtmvETH**. The attacker staked **0.4852 tmvETH** — about **\$951** — and held **90.66%** of all voting power over a vault containing millions in depositor funds. Nothing was broken and nothing was borrowed. The vault's economic security was not its TVL; it was the tiny fraction of TVL whose holders had bothered to stake, and that number is invisible on every dashboard that reports TVL. **Any governance surface should publish cost-to-control — the dollar amount required to reach quorum today — next to the value it governs, and halt execution when the ratio collapses.**

## Summary

**Term Finance** is an Ethereum fixed-rate lending protocol. Its vaults carry a governance layer in which voting power is obtained by **staking vault shares** — an opt-in step, separate from simply holding a position. Depositors who never staked contributed nothing to the voting denominator while contributing everything to the value at risk.

On **2026-08-23** an attacker bought and staked **0.4852 tmvETH**, at a cost of roughly **\$951**. Because the pre-existing staked supply across the pool was only **0.5352 gtmvETH**, that purchase alone conferred **90.66% of all voting power**. With a supermajority in hand, the attacker passed proposals that redirected vault assets to an address they controlled, extracting **2,843 ETH** and **1.68M USDC** — about **68%** of the vaults' holdings. The USDC was swapped to roughly 1.6M DAI.

There was no contract bug. The vaults were audited and did exactly what a governance-controlled vault is built to do: they obeyed a passing proposal. The failure was that the threshold for "passing" had never been bootstrapped to anything commensurate with the money behind it.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| (standing) | Vault governance requires staking vault shares to vote; total staked across the pool sits at **0.5352 gtmvETH** against vaults holding millions | (standing T16.002 surface) |
| pre-attack | Attacker wallet funded with **2 ETH via Tornado Cash** | (funding, opsec) |
| 2026-08-23 | Attacker buys and stakes **0.4852 tmvETH** (~\$951), obtaining **90.66%** of voting power | **T16.002 acquisition** |
| 2026-08-23 | Proposals pass and execute, redirecting ~68% of vault assets — **2,843 ETH** and **1.68M USDC** | **T16.002 execution** |
| 2026-08-23 | USDC swapped to ~1.6M DAI; PeckShield and CertiK track proceeds to `0xD5183…` | (disposition) |
| post-event | Term Labs shuts affected vaults and revokes governance roles; core lending markets reported unaffected; no technical post-mortem published | (operator response) |

## What defenders observed

- **The cost of control was four orders of magnitude below the value controlled.** \$951 against roughly \$12.5M in vault assets. This ratio is computable at any moment from public state, it needs no oracle and no off-chain data, and nothing in the protocol was watching it.
- **Opt-in voting power is a denominator problem, and it is worst exactly when a protocol is healthy.** The safer a vault looks, the less reason depositors have to stake for governance, and the cheaper it becomes to capture. Participation apathy is not a governance-quality issue here; it is the attack surface.
- **Flash-loan defences were irrelevant.** The attacker did not borrow, did not need atomicity, and did not unwind. Snapshot-at-block, vote-escrow, and borrow-resistant checkpoints all assume the adversary must return the capital. At \$951, they simply keep it (OAK-M17).
- **Audited contracts, working as specified.** The proposals were valid, the quorum was met as configured, and execution was correct. No static analysis of the vault code would have flagged anything, because the defect lived in a *parameter* — the staked supply — that changes continuously after deployment and is not part of any audit's scope.
- **A minimum-participation floor would have blocked it.** Requiring an absolute staked minimum (or a fraction of vault TVL) before governance can execute value-moving proposals converts this from a \$951 attack into one costing a meaningful share of the vault. Timelocks help separately by creating a window for depositors to exit (OAK-M17), but only a floor addresses the capture itself.

## Public references

- `[cryptonomistterm2026]` — The Cryptonomist, "Term Labs Governance Exploit Drains \$8.5M From Vaults" (2026-08-23; loss composition, vault shutdown and governance-role revocation): <https://en.cryptonomist.ch/2026/08/23/term-labs-governance-exploit/>
- `[cryptotimesterm2026]` — The Crypto Times, "Term Finance Loses \$8.5M After Attacker Hijacks DAO Governance Vote" (2026-08-23; the \$951 / 0.4852 tmvETH / 90.66% voting-power figures and the 0.5352 gtmvETH pre-drain staked supply): <https://www.cryptotimes.io/2026/08/23/term-finance-loses-8-5m-after-attacker-hijacks-dao-governance-vote/>
- `[cryptonomisttermdetail2026]` — The Cryptonomist, "Term Finance Exploit Details and Governance Risks" (2026-08-24; follow-up on the governance-design failure): <https://en.cryptonomist.ch/2026/08/24/term-finance-exploit-governance/>
- `[cointurkterm2026]` — Coin-Turk, "Term Labs loses \$8.5 million after attacker exploits Ethereum vault governance" (Tornado Cash funding trace, `0xD5183…` destination per PeckShield and CertiK): <https://en.coin-turk.com/term-labs-loses-8-5-million-after-attacker-exploits-ethereum-vault-governance/>
- `[coinpediaterm2026]` — Coinpedia, "DeFi Protocol Term Labs Loses \$8.5M in Governance Exploit" (asset breakdown, ~68% of vault assets redirected): <https://coinpedia.org/news/defi-protocol-term-labs-loses-8-5m-in-governance-exploit/>

## Discussion

The corpus's T16 anchors are mostly flash-loan stories — borrow the token, vote, repay, all inside one transaction — and the defensive literature has followed, concentrating on making borrowed voting power ineffective. Term Finance is the reminder that the flash loan was never the point. It was a workaround for governance tokens being *expensive*. When the staked denominator is small enough, the adversary skips the workaround and just buys the majority, which is cheaper, simpler, and immune to every countermeasure aimed at borrowing.

What makes the case worth filing rather than filing away is that the vulnerable quantity is neither in the code nor in the treasury. It is the **staked supply**, a live parameter that drifts with user behaviour after deployment and is reported nowhere. TVL dashboards show the money. Governance dashboards show proposals and turnout. Neither shows the number that mattered here — that 0.5352 gtmvETH stood between depositors and the vault — and that number was public, on-chain, and computable at any block.

The practical control is small and mechanical: publish **cost-to-control** as a first-class metric next to TVL, and refuse to execute value-moving proposals when it falls below a floor tied to the value at stake. Contributors documenting future governance incidents should record the staked denominator at the time of attack alongside the loss, because that ratio — not the dollar figure — is what makes a case comparable to this one.
