# Hemi Network — an airdrop contract created the lock before it updated the ledger, so 63 recursive claims emptied every allocation nobody had collected yet — Hemi Network — 2026-09-07

**Loss:** **124.5M HEMI** — the entire unclaimed remainder of the **Genesis Drop**, liquidated on Hemi-native DEXes for roughly **\$255,000** in stablecoins and bridged out via **LayerZero** to Ethereum, Arbitrum and BNB Smart Chain within about a day, mostly converted to ETH. The token count and the realised figure differ by three orders of magnitude because the exit had to cross the same shallow book the tokens lived in; the attacker's own selling **crashed the effective price**. The claim contract holds **zero** afterwards. HEMI and veHEMI themselves, the Hemi Virtual Machine, the native tunnels and third-party bridging were unaffected — the damage stopped at one contract.

**OAK Techniques observed:** **OAK-T9.005** (Reentrancy — *primary, confirmed mechanism*, in the classic **checks-effects-interactions-order** shape. Hemi's modified **MerkleBox** claim contract **created the token lock first and updated the remaining-claimable accounting second**, so a recursive call re-entered against stale balance state and was paid again. The modification that made it reachable is the interesting half: this MerkleBox fork let users **configure their own claim groups with their own lockup logic**, which is what put attacker-chosen code inside the contract's accounting window. See [`techniques/T9.005-reentrancy.md`](../techniques/T9.005-reentrancy.md)). **OAK-T9.002** (Flash-Loan-Enabled Exploit — **2M HEMI** borrowed from a **SushiSwap** pool supplied the entry position and was repaid in the same transaction through an orchestrator contract. The loan is the *ticket*, not the flaw; without the ordering bug it buys nothing. See [`techniques/T9.002-flash-loan-enabled-exploit.md`](../techniques/T9.002-flash-loan-enabled-exploit.md)). **OAK-T7.003** (Cross-Chain Bridge Laundering — proceeds moved over LayerZero to three chains and consolidated into ETH).

**Attribution:** **pseudonymous.** On-chain identifiers only; no named individual, group, or link to a tracked OAK actor, and none claimed by Hemi's post-mortem.

**Key teaching point:** **Unclaimed is not unowned — a claim contract is a custody contract holding other people's money, and it is the one contract in a launch that gets written last, audited least, and deployed immutable.** Everything about the incident follows from where it sat in the schedule. The contract was a **fork of a known open-source contract** (MerkleBox) with a local modification, so whatever assurance the upstream code carried did not transfer. It was **immutable**, so there was no pause, no patch and no top-up once the flaw was live. And the value it held belonged to users who had not yet acted, which means **the loss fell entirely on the slowest cohort of the airdrop** and left the protocol's own balance sheet untouched. The reusable rule: treat distribution contracts as custody, hold them to the same review and monitoring scope as the vault contracts, and be explicit that a fork's audit is an audit of the original — **the diff is the unaudited part.**

## Summary

**Hemi Network** is a modular Bitcoin–Ethereum layer-2. Its **Genesis Drop** distributed HEMI through a claim contract known internally as **MerkleBox**, a fork of a public Merkle-distributor contract modified so that users could define **custom claim groups carrying their own lockup logic**.

The contract's claim path **created a token lock before it finished updating the remaining claimable balance** — a checks-effects-interactions violation. Because the lockup logic in a claim group is caller-supplied, the external call made during lock creation handed control to attacker code while the ledger still showed the pre-withdrawal figure. The post-mortem does not state whether a reentrancy guard was absent or applied inconsistently across the claim path.

On **2026-09-07 at 03:36:47 UTC**, an attacker flash-borrowed **2M HEMI** from a SushiSwap pool, drove the claim function **63 times** within a single transaction bundle, and drained approximately **124.5M HEMI** — all of the Genesis Drop allocations that had never been claimed. The loan was repaid atomically; a failed attempt would have reverted at the cost of gas.

The tokens were sold on Hemi's own DEXes into roughly **\$255,000**, then bridged via LayerZero to Ethereum, Arbitrum and BNB Smart Chain and largely converted to ETH. Hemi published a post-mortem on **2026-09-08** confirming the scope was limited to the single claim contract, which now holds no balance.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| (standing) | Genesis Drop distributed through a **modified MerkleBox** fork that permits **user-defined claim groups with caller-supplied lockup logic**; contract deployed **immutable** | (standing T9.005 surface) |
| (standing) | Claim path **creates the lock, then updates remaining-claimable accounting** | (latent CEI-order defect) |
| 2026-09-07 03:36:47 | Attacker flash-borrows **2M HEMI** from a SushiSwap pool via an orchestrator contract | **T9.002 — funding** |
| same transaction | Claim function driven **63 times** recursively against stale balance state; **~124.5M HEMI** paid out; flash loan repaid | **T9.005 exploitation** |
| same day | Tokens liquidated on Hemi-native DEXes for **~\$255K**; attacker's own volume crushes the effective price | (extraction, liquidity-bounded) |
| within ~1 day | Proceeds bridged over **LayerZero** to Ethereum, Arbitrum, BNB Smart Chain; mostly converted to **ETH** | **T7.003** |
| 2026-09-08 | Hemi publishes post-mortem: damage confined to the claim contract; HEMI, veHEMI, hVM, tunnels unaffected; contract balance zero | (operator response, T+~1d) |
| 2026-09-09 → 09-10 | **Upbit cancels its planned HEMI listing** days before launch, substituting two other tokens | (second-order impact) |

## What defenders observed

- **The headline number and the loss are different quantities, and only one of them is a loss.** 124.5M tokens realised \$255K because the attacker had to sell into the book the tokens came from. Triaging this class by token count produces panic; triaging by **reachable exit liquidity** produces the right number. The same arithmetic in reverse is what made the contract worth attacking at all: the allocation was large precisely because nobody had drawn it down.
- **The fork is the unaudited part.** MerkleBox is public code with public review history. The reentrancy did not exist in the shape reviewers had looked at — it was introduced by the local feature that let claim groups carry their own lockup logic. Any assurance inherited from upstream stops exactly at the diff, and the diff is where a launch team is most likely to be improvising against a deadline.
- **Caller-supplied logic inside an accounting window is the whole vulnerability.** A reentrancy needs an external call to attacker-controlled code before state is settled. A feature that lets users register their own lockup behaviour *guarantees* one. The design question — *can anything a user registers execute during our state updates?* — is answerable from the interface alone, before a line of the implementation is read.
- **Immutability removed every response option.** The contract could not be paused, patched, or topped up. Hemi's remaining levers were disclosure and compensation, and as of the post-mortem no compensation plan for unclaimed allocations had been detailed. Immutability is a promise to users about what cannot be taken away; it is also a promise that mistakes cannot be corrected, and claim contracts are where teams make mistakes.
- **The second-order cost dwarfed the first by two orders of magnitude.** \$255K left the contract; a confirmed listing on the largest Korean exchange by volume left with it, days before launch. Exchanges now treat a pre-listing security incident as disqualifying **independently of size**, which changes the risk calculus for a launch-window bug: the loss to model is not the drained balance, it is the distribution.
- **The post-mortem's omissions are part of the record.** Hemi did not name the audit firm that reviewed the contract, and did not publish a revised audit covering the remaining contracts. OAK records that as a disclosure gap, not as evidence about the audit's quality.

## Public references

- `[shatteredhemi2026]` — Shattered, "Hemi Reentrancy Bug Drains 124.5M Tokens for \$255K" (2026-09-07 03:36:47 UTC; MerkleBox claim contract; lock created before accounting update; 2M HEMI SushiSwap flash loan; 63 recursive claims; LayerZero bridging to Ethereum/Arbitrum/BSC; Upbit listing cancelled): <https://shattered.io/hemi-genesis-drop-reentrancy-exploit-2026/>
- `[cryptoeconomyhemi2026]` — Crypto Economy, "Hemi Releases Post-mortem On Genesis Drop Exploit That Drained 124.5 Million Tokens" (user-configurable claim groups with their own lockup logic; scope confined to the claim contract): <https://crypto-economy.com/hemi-releases-post-mortem-on-genesis-drop-exploit-that-drained-124-5-million-tokens/>
- `[cryptonewsupbithemi2026]` — crypto.news, "Upbit drops HEMI after exploit, lists CP and USELESS": <https://crypto.news/upbit-drops-hemi-after-exploit-lists-cp-and-useless/>
- `[cryptonomisthemi2026]` — The Cryptonomist, "Upbit HEMI Exploit Impacts Token Launch and Security" (2026-09-09): <https://en.cryptonomist.ch/2026/09/09/upbit-hemi-exploit-token-theft/>

## Discussion

T9.005's anchors describe the same ordering error in progressively less excusable settings: **The DAO** (2016-06) wrote it before the pattern had a name, and **Joe Agent** (2026-06) wrote it into a liquidity-removal path a decade after checks-effects-interactions became a checklist item. Hemi adds a third setting worth naming separately — **the distribution contract** — because the population of contracts in it shares a distinctive risk profile: they are written close to launch, they are forks of public distributors more often than they are original code, they hold the largest single balance the protocol will ever custody at once, and they are frequently deployed immutable on the theory that an airdrop should not be alterable.

The corpus has nothing else in that shape. That makes this a weak anchor for reentrancy as a mechanism — it is the textbook version — and a useful one for **where reentrancy still lives in 2026**. It is not in the core lending logic, which is reviewed to death. It is in the peripheral contract that moves once, holds a fortune while it does, and was scoped as a distribution task rather than a custody task.

For contributors: when documenting a claim, airdrop, or vesting-distribution incident, record **whether the contract was forked and what was changed**, and record the realised proceeds separately from the token quantity. Both fields are what make cases in this class comparable, and both are routinely lost in the reporting.
