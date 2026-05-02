# Lendf.me reentrancy via ERC-777 callback chain — Ethereum — 2020-04-19

**Loss:** approximately \$25M drained from Lendf.me, the lending market operated by dForce (the dForce Network team's fork of the Compound v1 codebase, deployed on Ethereum). Contemporaneous reporting and the dForce post-mortem cite the figure as \~\$25M; subsequent forensic write-ups break the extracted assets into a multi-asset mix (HBTC, WETH, HUSD, USDT, USDC, DAI, PAX, TUSD, BUSD, imBTC). **Recovery:** within four days, the attacker returned all funds. The recovery was the result of an extensive on-chain negotiation channel — Lendf.me / dForce sent on-chain messages to the attacker, the attacker initiated contact through wrapped-call data, and the operator-side response was joined by exchanges (which tagged and froze suspected proceeds) and forensic firms (PeckShield, SlowMist) which together built up enough partial-IP-leakage that the attacker's negotiating position collapsed. The full \~\$25M was returned across a series of transactions completing on or about 2020-04-22.
**OAK Techniques observed:** **OAK-T9.005** (Reentrancy) — primary; the canonical Ethereum case of reentrancy weaponising the ERC-777 `tokensReceived` hook against a Compound-v1-shaped lending market. **OAK-T9.002** (cross-protocol position interaction) — secondary; the extraction cycle interacted with multiple deployed market contracts within Lendf.me's own market set, using the inflated-collateral state visible after each reentrancy turn to borrow further assets in a chained sequence. The case is **not T9.001** — there is no oracle-input manipulation; the failure is in the lending market's per-call accounting state, not in any price-feed surface.
**Attribution:** **pseudonymous**. The attacker was partially identified during the recovery negotiations: forensic firms and exchanges traced enough fingerprint material — IP addresses leaking through KYC-gated exchange interactions used to pre-fund and post-launder the operation — that the attacker's anonymity set collapsed to a small candidate pool, after which the attacker chose to return funds rather than continue the negotiation. No public judicial / regulatory attribution to a named individual was published; OAK records the attacker as pseudonymous, with the IP-leakage event documented in the historical record and treated as a narrow defender-side outcome rather than a stable individual-attribution data point.

## Summary

Lendf.me was the Ethereum lending market operated by dForce, structurally a Compound-v1 fork that listed (among other assets) `imBTC` — a wrapped-BTC token issued by the imToken project that implemented the ERC-777 token standard rather than ERC-20. ERC-777 is an ERC-20-compatible token standard that adds *operator hooks*: when a transfer occurs, the recipient address — if it has registered itself as an `IERC777Recipient` via the ERC-1820 registry — is called back at its `tokensReceived(...)` function within the same transaction, *before* the transfer is finalised in the sender's accounting frame. The hook's intended purpose was to give recipient contracts a mechanism to react to incoming transfers (reject unwanted tokens, trigger downstream logic, etc.); its operational consequence is that any contract that processes an ERC-777 transfer as part of a balance-sensitive workflow exposes a reentrant call site at the moment of transfer.

Lendf.me's market contract for `imBTC` followed the Compound-v1 supply-and-borrow flow: when a user supplied `imBTC`, the contract pulled the tokens via `transferFrom`, then updated the user's `supply` accounting, and exposed that updated supply as collateral against which borrows could be opened. Because `imBTC` was an ERC-777, the `transferFrom` triggered `tokensReceived` on the supplier (when the supplier was a contract that had registered as a recipient). The attacker built such a contract and registered it as an ERC-777 recipient; on each `tokensReceived` callback, the attacker contract reentered Lendf.me to issue a `withdraw(imBTC)` call against the same balance that had just been credited. Because Lendf.me's accounting had recorded the supply but not yet finalised the transferred-out balance the second `withdraw` consumed, the contract's internal state diverged from the actual on-chain `imBTC` balance: the attacker held a phantom supply credit while having physically retrieved the underlying `imBTC`. Repeated through the reentrancy callback chain, the attacker grew the phantom credit to dominate the market's collateralisation arithmetic, then borrowed the entire \~\$25M of available cross-asset liquidity (HBTC, WETH, HUSD, USDT, USDC, DAI, PAX, TUSD, BUSD) against the inflated collateral — at which point the cross-protocol position was Lendf.me's loss, not the attacker's risk.

The Lendf.me incident is the **first major reentrancy exploit weaponising ERC-777 hooks** in production. The DAO (2016-06) had established T9.005 as a Technique class four years earlier; Lendf.me established a sub-pattern within T9.005 in which the reentrancy vector is not a `call.value`-style ETH-send, but an *intra-token-standard callback* triggered by a normal-looking ERC-20-compatible transfer. This sub-pattern reappeared canonically in Uniswap V1 / iearn / Akropolis / Origin Dollar / Cream / Curve / many subsequent cases, and it is the structural ancestor of the modern guidance that ERC-777 (and any token standard that includes recipient hooks: ERC-1363, ERC-4524, ERC-721 `safeTransfer*`, etc.) must be treated by every consuming contract as a reentrancy surface. Lendf.me is, in this sense, to the **callback-hook reentrancy sub-class** what The DAO is to the `call.value`-reentrancy sub-class: the year-zero case that named the failure mode for the industry.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-event (2019–2020) | dForce deploys Lendf.me as a Compound-v1 fork on Ethereum; lists `imBTC` (ERC-777 wrapped BTC) as a supplied / borrowable asset alongside HBTC, WETH, USDT, USDC, DAI, etc. | (standing T9.005 surface — ERC-777 transfer site without per-function reentrancy guard) |
| Pre-event (industry context) | OpenZeppelin, ConsenSys Diligence, and Trail of Bits had, in audit reports through 2018–2019, flagged ERC-777 hooks as a reentrancy surface in lending and AMM contexts; the surface was known to security researchers, but no production-scale incident had yet materialised | (industry-known surface, no prior incident) |
| 2020-04-19 \~00:58 (T+0) | Attacker contract initiates first exploit transaction: supplies a small amount of `imBTC` to Lendf.me, registered as ERC-777 recipient | **T9.005 entry** |
| 2020-04-19 \~00:58 onward | `tokensReceived` callback fires inside the supply path; attacker contract reenters Lendf.me to call `withdraw(imBTC)` against the just-credited supply *before* the supply path's accounting frame finalises | **T9.005 reentrancy turn — phantom credit accrues** |
| 2020-04-19 \~00:58–01:30 | Attacker repeats the reentrancy cycle, growing the phantom `imBTC` supply credit on Lendf.me's books | **T9.005 phantom-credit accumulation** |
| 2020-04-19 \~01:30 onward | Attacker uses the inflated `imBTC` collateral to borrow the full available liquidity in HBTC, WETH, HUSD, USDT, USDC, DAI, PAX, TUSD, BUSD, imBTC (\~\$25M aggregate) from Lendf.me | **T9.002 cross-asset extraction** |
| 2020-04-19 (within hours) | dForce / Lendf.me identifies the compromise; protocol effectively halted (no admin-pause primitive on the deployed Compound-v1 fork — the protocol is not paused so much as drained and abandoned at this point) | (defender detection) |
| 2020-04-19 (later) | dForce publishes initial public statement on Twitter / Medium acknowledging the exploit | (disclosure) |
| 2020-04-19 (later) | Major centralised exchanges (Binance, Huobi, OKEx) tag deposit addresses associated with the attacker; on-chain laundering routes constrict | (exchange-side response) |
| 2020-04-19 to 2020-04-22 | dForce / PeckShield / SlowMist build up identifying material on the attacker — including IP-address fingerprints leaked through the attacker's interactions with KYC-gated exchanges used for pre-funding and partial-laundering | (forensic-side IP leakage) |
| 2020-04-19 to 2020-04-22 | On-chain negotiation channel: dForce sends on-chain messages to attacker addresses; attacker responds; identifying fingerprint becomes specific enough that anonymity-set collapse is publicly visible | (negotiation channel) |
| 2020-04-21 to 2020-04-22 | Attacker returns the full \~\$25M to dForce / Lendf.me-controlled addresses across a series of transactions | (full recovery) |
| 2020-04 onward | dForce publishes post-mortem; subsequent industry write-ups (PeckShield, SlowMist, OpenZeppelin, ConsenSys Diligence) frame the incident as the canonical "ERC-777 callback reentrancy in a Compound-fork" case | (post-event industry record) |
| 2020 onward | Audit-firm checklists update to flag ERC-777 (and other recipient-hook token standards) as a reentrancy surface that consuming contracts must guard with per-function `nonReentrant` modifiers or accounting-finalisation-before-external-call discipline | (downstream standard) |

## What defenders observed

- **The reentrancy surface was ERC-777 callback, not ETH-send.** The DAO 2016-06 reentrancy worked through `call.value`-style external ETH transfers; Lendf.me 2020-04 worked through an ERC-20-compatible token transfer that happened to invoke a recipient callback because the token implemented ERC-777. From a defender's perspective, the lesson is that *any external call to attacker-controlled code*, whether via ETH transfer, callback hook, dynamic delegate, or token-standard extension, is a reentrancy site. The set of "external calls" that can reenter expanded in the post-DAO years from `call.value` to the full set of token-standard callbacks, NFT `safeTransfer*` hooks, ERC-3156 flash-loan callbacks, and AMM swap callbacks. Lendf.me is the case that forced this expansion into industry-standard audit checklists.
- **Compound-v1's per-asset-list architecture was the magnifier, not the cause.** Lendf.me listed `imBTC` next to a deep cross-asset liquidity set; the reentrancy on the `imBTC` supply path created a phantom credit that was usable against *every* other listed asset's borrow path. Had `imBTC` been listed in an isolated market, the loss would have been bounded by the `imBTC` market's standalone liquidity. The defender lesson generalises: when a single listed asset has a structural-trust property (here, ERC-777 callback) different from the rest of the asset set, listing it inside a cross-collateral-shared market means *the worst-case asset's failure mode propagates to the whole market's liquidity*. Modern lending architectures (Aave V3 isolation mode, Compound III's single-collateral markets, Euler's clusters) trace their lineage back through Cream / Iron Bank / Lendf.me to this lesson.
- **Per-function `nonReentrant` was the available-but-unapplied mitigation.** OpenZeppelin's `ReentrancyGuard` modifier had been a standard Solidity library well before April 2020. Compound's own v2 codebase applied reentrancy guards on supply / borrow / withdraw entrypoints. Lendf.me's fork either inherited an earlier Compound revision without those guards or omitted them in a forked deployment; the precise lineage is documented partially in the dForce post-mortem. The defender lesson is that *fork hygiene* — periodically re-syncing forked codebases against upstream security patches — is a structural responsibility for any team running a Compound / Uniswap / Aave fork. The fork-hygiene lesson recurs at Cream / Iron Bank, at SushiSwap MISO, and at every yield-aggregator that vendor-copied an earlier-version DEX.
- **The IP-leakage / negotiation-channel recovery is a third recovery category alongside total-loss and partial-grey-hat-return.** Lendf.me recovered 100% of the loss not through any technical primitive (Lendf.me had no built-in freeze authority over the borrowed assets) but through *forensic and exchange-side pressure that compressed the attacker's anonymity set until the negotiation flipped*. This category — "operator-side negotiated full recovery via forensic pressure" — is rare. It depends on the attacker (a) interacting with KYC-gated infrastructure, (b) leaking enough fingerprint material to be triangulated, and (c) deciding the post-doxing payoff is worse than returning. None of those preconditions are reliable for a defender to plan around. The category sits in the historical record alongside Mango Markets 2022 (negotiated recovery via DAO governance) and Euler 2023 (negotiated recovery via on-chain message channel after extensive forensic pressure) — but is the *earliest* successful instance of the negotiation pattern in OAK's corpus.
- **Disclosure and crisis-comms cadence: dForce's public response was rapid by 2020 standards.** Same-day acknowledgment, exchange-coordinator outreach within hours, daily status updates, full post-mortem within \~weeks. Contributors writing future incident-response runbooks should treat dForce's cadence — modulo the unusual fact of full recovery — as a viable lower bound for the "negotiate while forensics close in" response posture.

## What this example tells contributors writing future Technique pages

- **T9.005 has at least three structurally distinct sub-patterns.** The Technique page for T9.005 should distinguish: (1) `call.value`-style external-ETH-send reentrancy (The DAO 2016, the original year-zero case); (2) callback-hook reentrancy via token-standard extensions (ERC-777 `tokensReceived`, ERC-721 `onERC721Received`, ERC-1363, ERC-3156 flash-loan hooks — Lendf.me 2020 is the canonical anchor); (3) cross-function reentrancy via shared state where the second call hits a *different* function on the same contract that reads stale state from the first call (Curve Vyper July 2023 is one canonical anchor). All three are T9.005, but the per-sub-pattern mitigation differs: (1) pay-internal-debt-before-external-call (CEI pattern); (2) `nonReentrant` on every entrypoint that touches a token transfer to attacker-controllable code; (3) reentrancy locks that span the *function set* sharing state, not just per-function. Contributors writing T9.005 examples should locate their case within this three-sub-pattern taxonomy.
- **The "fork hygiene" lesson applies to any forked-protocol worked example.** Lendf.me's relationship to upstream Compound is the canonical worked example for fork-hygiene as a defender / contributor framing. When writing examples for any Compound-fork, Uniswap-fork, Curve-fork, or Aave-fork incident, contributors should explicitly note: (1) which upstream version was forked, (2) which upstream security patches post-dated the fork point, (3) whether any of those patches would have prevented the incident. This framing puts the loss in the structural lineage rather than treating each fork as a standalone protocol.
- **Recovery-channel category should be recorded explicitly.** OAK's worked examples already distinguish total-loss (most cases) from partial-grey-hat-return (Harvest 2020, Cream 2021) from negotiated-recovery-with-percentage-return (Mango 2022 \~60%, Euler 2023 \~100%). Lendf.me 2020 is the *first* full-recovery case via forensic-pressure-driven negotiation; the recovery-channel taxonomy in T9.x worked examples should record this category as a fourth category and use Lendf.me as the historical anchor.
- **Pseudonymous-but-IP-leaked is a meaningful attribution tier.** OAK's attribution conventions distinguish (a) pseudonymous, (b) pseudonymous with public partial-fingerprint material, (c) attributed to a named individual / group via judicial / regulatory process. Lendf.me sits at (b): the attacker is not named, but enough fingerprint material entered the public record during the recovery negotiation that the anonymity set is documented as small. Contributors writing future cases involving partial forensic identification should preserve this tier rather than collapsing it into either fully-pseudonymous or fully-attributed.

## Public references

- dForce. *"Lendf.Me Hack Update."* Official Medium, 2020-04 — `[dforcepostmortem2020]`. dForce / Lendf.me's own post-mortem and recovery-process disclosure; canonical source for the asset breakdown, the reentrancy mechanic at the contract level, and the recovery-negotiation chronology.
- PeckShield. *"Lendf.Me Hack: Root Cause Analysis."* PeckShield blog / Medium, 2020-04 — `[peckshieldlendfme2020]`. PeckShield's transaction-level forensic walkthrough; the canonical industry-side reference for the ERC-777 callback chain at function-call resolution.
- SlowMist. *"Lendf.Me Hack Analysis."* SlowMist blog / Medium, 2020-04 — `[slowmistlendfme2020]`. SlowMist's parallel forensic walkthrough; cited for the on-chain laundering trace and the exchange-coordination-side aspects of the recovery.
- OpenZeppelin. *"Exploiting Uniswap: from reentrancy to actual profit."* OpenZeppelin blog, 2020-04 — `[openzeppelinerc7772020]`. OpenZeppelin's broader ERC-777 reentrancy class write-up published in the immediate aftermath; situates Lendf.me alongside the same week's Uniswap V1 / imBTC incident as a paired pair of ERC-777 reentrancy cases.
- ConsenSys Diligence. *"ERC-777 Considered Harmful (in DeFi)?"* ConsenSys Diligence blog, 2020-04 — `[consensysdiligence7772020]`. ConsenSys Diligence's audit-firm framing on the structural problem of ERC-777 hooks in DeFi-consuming contracts; cited for the post-incident audit-checklist discipline.
- The Block. *"Chinese DeFi protocol dForce loses \$25 million in apparent hack."* The Block, 2020-04-19 — `[theblockdforce2020]`. Contemporaneous mainstream-press reporting; cited for industry-reaction framing and timing.
- CoinDesk. *"DeFi Protocol's Hacker Returns Stolen \$25M After Identity Exposed."* CoinDesk, 2020-04-21 — `[coindeskdforce2020]`. CoinDesk's recovery-side reporting; canonical contemporaneous source for the IP-leakage / anonymity-set-collapse outcome.
- `[zhou2023sok]` — academic taxonomy classifying this incident in the callback-hook reentrancy sub-class of T9.005-equivalent vulnerabilities; one of the SoK's worked examples.
- `[daoreentrancy2016retrospective]`, `[atzei2017survey]` — companion historical-anchor citations for the broader T9.005 lineage; cited here for the year-zero / sub-pattern-expansion framing rather than for Lendf.me specifics.

### Proposed new BibTeX entries

```bibtex
@misc{dforcepostmortem2020,
  author       = {{dForce Network}},
  title        = {Lendf.Me Hack Update},
  year         = {2020},
  howpublished = {Official protocol post-mortem, dForce Medium},
  url          = {https://medium.com/dforcenet/lendf-me-hack-update-1-c160a85eb4d9},
  note         = {OAK v0.1 — proposed. dForce / Lendf.me's contemporaneous official disclosure and recovery-process chronology of the 2020-04-19 ERC-777 callback reentrancy incident.}
}

@misc{peckshieldlendfme2020,
  author       = {{PeckShield}},
  title        = {Lendf.Me Hack: Root Cause Analysis},
  year         = {2020},
  howpublished = {Industry forensic analysis, PeckShield / Medium},
  url          = {https://peckshield.medium.com/},
  note         = {OAK v0.1 — proposed. PeckShield's transaction-level forensic breakdown of the Lendf.me ERC-777 reentrancy chain.}
}

@misc{slowmistlendfme2020,
  author       = {{SlowMist}},
  title        = {Lendf.Me Hack Analysis},
  year         = {2020},
  howpublished = {Industry forensic analysis, SlowMist / Medium},
  url          = {https://slowmist.medium.com/},
  note         = {OAK v0.1 — proposed. SlowMist's parallel forensic walkthrough; complementary to PeckShield, focused on laundering trace and exchange-coordination aspects of the recovery.}
}

@misc{openzeppelinerc7772020,
  author       = {{OpenZeppelin}},
  title        = {Exploiting {Uniswap}: from reentrancy to actual profit},
  year         = {2020},
  howpublished = {Audit-firm research blog, OpenZeppelin},
  url          = {https://blog.openzeppelin.com/exploiting-uniswap-from-reentrancy-to-actual-profit/},
  note         = {OAK v0.1 — proposed. OpenZeppelin's class-level write-up on ERC-777 callback reentrancy in DeFi; published in the immediate aftermath of the paired Uniswap V1 / Lendf.me incidents.}
}

@misc{consensysdiligence7772020,
  author       = {{ConsenSys Diligence}},
  title        = {{ERC-777} Considered Harmful (in {DeFi})?},
  year         = {2020},
  howpublished = {Audit-firm research blog, ConsenSys Diligence},
  url          = {https://consensys.net/diligence/blog/2020/04/uniswap-audit/},
  note         = {OAK v0.1 — proposed. ConsenSys Diligence's structural analysis of ERC-777 hooks as a reentrancy surface in consuming DeFi contracts.}
}

@misc{theblockdforce2020,
  author       = {{The Block}},
  title        = {Chinese {DeFi} protocol {dForce} loses \$25 million in apparent hack},
  year         = {2020},
  howpublished = {News article, The Block},
  url          = {https://www.theblock.co/post/61524/chinese-defi-protocol-dforce-loses-25-million-in-apparent-hack},
  note         = {OAK v0.1 — proposed. Contemporaneous mainstream-press reporting on the Lendf.me incident; cited for industry-reaction framing.}
}

@misc{coindeskdforce2020,
  author       = {{CoinDesk}},
  title        = {{DeFi} Protocol's Hacker Returns Stolen \$25{M} After Identity Exposed},
  year         = {2020},
  howpublished = {News article, CoinDesk},
  url          = {https://www.coindesk.com/markets/2020/04/21/defi-protocols-hacker-returns-stolen-25m-after-identity-exposed},
  note         = {OAK v0.1 — proposed. CoinDesk's recovery-side reporting; canonical contemporaneous source for the IP-leakage / anonymity-set-collapse outcome.}
}
```

## Discussion

Lendf.me April 2020 sits in OAK's corpus as the **canonical anchor for callback-hook reentrancy as a sub-class of T9.005**. The DAO 2016-06 established T9.005 as a Technique class via `call.value`-style ETH-send reentrancy; Lendf.me established that the same Technique class extends to *any external call to attacker-controlled code reachable from a state-mutating function* — including ERC-20-compatible transfers that happen to fire token-standard callbacks. This expansion of T9.005's surface-set is the structural ancestor of the modern industry baseline: every DeFi audit checklist post-2020 treats ERC-777, ERC-721 `safeTransfer*`, ERC-3156 flash-loan callbacks, and AMM swap-callback hooks as reentrancy sites, and applies `nonReentrant` modifiers or strict CEI-pattern accounting accordingly. Contributors writing future T9.005 examples should preserve this sub-class lineage rather than treating callback-hook cases as a different Technique entirely.

The recovery outcome is the second canonical contribution of the case. Full recovery via forensic-pressure-driven negotiation is rare in OAK's corpus; the closer modern analogues are Mango Markets 2022 (negotiated DAO settlement, \~60% return) and Euler 2023 (on-chain negotiation channel, \~100% return). Lendf.me 2020 is the *earliest* successful negotiation-channel case in OAK's corpus, predating the Mango / Euler templates by two-plus years. The teaching point for contributors is that the negotiation-channel recovery category exists and should be recorded explicitly — but its preconditions (KYC-gated infrastructure interaction, fingerprint leakage, attacker risk-appetite asymmetry) are not reliable for a defender to plan around, so it should not be elevated to a "design pattern" in the way that admin-pause or freeze authority can be.

The pseudonymous-with-IP-leakage attribution tier is the third lasting framing. Contributors writing cases where forensic firms or operators publicly disclosed partial identification material — without rising to judicial / regulatory attribution — should preserve the tier explicitly, citing Lendf.me as the historical anchor for the convention. The convention matters because it preserves the difference between "attacker is unknown" and "attacker is fingerprinted but not named", which downstream risk modelling and threat-intel work depend on.

A final note on framing. dForce's own post-mortem describes the incident as a vulnerability in the interaction between Compound-v1's accounting and ERC-777's transfer semantics, and frames the root-cause attribution between the two charitably. From a defender's perspective in 2026, the structurally honest framing is that Compound v2 had already shipped reentrancy guards by 2020-04, and ERC-777's recipient hooks had been documented as a reentrancy surface in audit reports through 2018–2019; the failure mode at Lendf.me was the absence of fork-hygiene discipline that would have caught either signal. This is not a per-protocol criticism — fork-hygiene as a discipline was not yet standard industry practice in early 2020 — but the structural framing is what subsequent worked examples should preserve, so the lesson generalises beyond Lendf.me's own incident report.
