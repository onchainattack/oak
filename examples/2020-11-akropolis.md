# Akropolis Delphi flash-loan-funded reentrancy — Ethereum — 2020-11-12

**Loss:** approximately \$2M extracted from Akropolis's Delphi yield-aggregator contracts on Ethereum. Contemporaneous reporting and the Akropolis post-mortem cite the figure as \~2,030,000 DAI; subsequent forensic write-ups (PeckShield, Inspex) corroborate the figure within rounding. **Recovery:** none on-chain. Akropolis announced a treasury / token-based partial-compensation plan for affected users, funded from native ADEL / AKRO reserves; the on-chain DAI was not recovered.
**OAK Techniques observed:** **OAK-T9.005** (Reentrancy) — primary; the canonical case of reentrancy weaponising a callback against a yield-aggregator's deposit-accounting path. **OAK-T9.002** (Flash-Loan-Enabled Exploit) — enabling precondition; the attacker funded the exploit's working capital with a flash loan, repaying it within the same transaction. The combined T9.005 + T9.002 framing is the right one — neither Technique alone is sufficient to describe the attack chain. The case is **not T9.001** — there is no oracle-input manipulation; the failure is in the deposit path's per-call accounting state, not in any price-feed surface.
**Attribution:** **pseudonymous**. Never publicly identified. No FBI / Treasury / industry-forensic attribution to a named individual or known group at the OAK v0.1 cutoff. Akropolis offered a bug-bounty-style outreach to the attacker via on-chain message; no public response.

**Key teaching point:** Akropolis November 2020 sits in OAK's corpus as the **canonical anchor for yield-aggregator share-accounting reentrancy as a sub-class of T9.005**, and as the opening case of the "DeFi November / December 2020" yield-aggregator-exploit cluster. Where Lendf.me April 2020 had established callback-hook reentrancy on a lending market, Akropolis established that the same Technique class extends to yield-aggregator vault-share issuance paths. The structural difference matters: a yield-aggregator's share-accounting arithmetic is *ratio-based*, which means reentrancy can corrupt the share-ratio numerator and denominator independently in ways that a simple balance-tracking lending contract cannot exhibit. The mitigation pattern that emerged — whitelisted-asset-only vaults, per-function `nonReentrant` discipline, and strict CEI ordering on share-update paths — is now standard across yield-aggregator architectures.

## Summary

Akropolis was an Ethereum-based yield-aggregator protocol whose Delphi product line accepted user deposits in stablecoins (DAI primarily) and routed those deposits into yield-bearing strategies — structurally similar to yEarn vaults, Harvest's `fUSDC` / `fUSDT` model, and the broader 2020 yield-aggregator class. Delphi's deposit path on the yCurve-strategy savings pool was the attack surface: when a user deposited a token via the `deposit()` entrypoint, the contract pulled tokens via `transferFrom`, then computed and updated the user's pro-rata share in the pool *after* the external transfer had completed. The contract did not apply a per-function `nonReentrant` modifier on the deposit path, and did not enforce strict checks-effects-interactions ordering on the share-accounting state.

On 2020-11-12, an attacker built a malicious "fake token" contract — an ERC-20-compatible contract whose `transferFrom` function did not actually transfer tokens but instead reentered Delphi's `deposit()` function with a real DAI deposit. The attacker took a flash loan to source the working DAI, deposited the fake token (which through its `transferFrom` callback reentered Delphi mid-execution to issue a real DAI deposit), and the reentrancy chain caused Delphi's internal accounting to credit the attacker's share twice — once for the fake-token "deposit" (which never actually transferred any tokens but advanced the share-accounting state as if it had) and once for the real DAI reentrant deposit (which did transfer DAI and advanced the share-accounting state again). The doubled share credit was then redeemed against the pool's real DAI liquidity, extracting \~\$2M in a single atomic transaction. The flash loan was repaid in the same transaction; net capital outlay was the gas cost.

Akropolis is the **first yield-aggregator-targeting flash-loan-enabled reentrancy** to surface in OAK's reference period. Lendf.me (2020-04) had established callback-hook reentrancy on a lending market; Akropolis established that the same Technique class extends to *yield-aggregator deposit paths*, where the consuming contract is a vault-share manager rather than a money-market collateral manager, and where the reentrancy vector is an *attacker-controlled fake-token contract* rather than a real-but-callback-bearing token. The case immediately preceded — by approximately five days — the structurally similar Origin Dollar (OUSD) incident on 2020-11-17, the Pickle Finance incident on 2020-11-21, and the Cover / Value DeFi incidents through November 2020 that together defined "DeFi November" as the canonical month for yield-aggregator reentrancy and accounting-failure exploits.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-event (2020) | Akropolis deploys Delphi savings-pool contracts on Ethereum; deposit path on the yCurve-strategy pool reads share-accounting state after external `transferFrom` without per-function reentrancy guard | (standing T9.005 surface) |
| Pre-event (industry context) | Lendf.me 2020-04 had established callback-hook reentrancy as a production T9.005 sub-class; OpenZeppelin and ConsenSys Diligence had published class-level guidance through April–October 2020; the surface was widely known to security researchers | (industry-known surface, Akropolis fork did not inherit the lesson) |
| 2020-11-12 \~16:00 (T+0) | Attacker contract initiates exploit transaction: takes flash loan in DAI; deposits attacker-controlled "fake token" contract into Delphi's savings pool | **T9.002 precondition; T9.005 entry** |
| 2020-11-12 (same window) | Delphi's `deposit()` calls `transferFrom` on the fake-token contract; the fake `transferFrom` reenters Delphi's `deposit()` with a real DAI deposit | **T9.005 reentrancy turn** |
| 2020-11-12 (same window) | Delphi's accounting credits the attacker's share twice — once for the fake-token deposit (no real transfer occurred), once for the real DAI reentrant deposit | **T9.005 phantom-share accumulation** |
| 2020-11-12 (same window) | Attacker redeems the doubled share against the pool's real DAI liquidity, extracting \~2,030,000 DAI; repays flash loan in same transaction | **T9.005 + T9.002 chained extraction; closure** |
| 2020-11-12 (within hours) | Akropolis identifies the compromise via on-chain monitoring / community report; pauses the affected pools | (defender detection / response) |
| 2020-11-12 (same day) | Akropolis publishes initial public statement on Twitter / Medium | (disclosure) |
| 2020-11-12 (same day onward) | PeckShield, SlowMist, and Inspex publish independent forensic analyses confirming the reentrancy mechanic and the fake-token vector | (industry-side post-mortem cycle) |
| 2020-11 onward | Akropolis announces token-based compensation plan funded from ADEL / AKRO native-token reserves; on-chain DAI not recovered | (post-event compensation; not on-chain recovery) |
| 2020-11-12 onward | Akropolis sends on-chain bug-bounty / negotiation message to attacker addresses; no public response | (negotiation channel — null outcome) |
| 2020-11 to 2020-12 | Pickle Finance (2020-11-21), Cover Protocol (2020-12-28), and Value DeFi incidents (multiple, late 2020) follow with structurally similar yield-aggregator vault-share accounting failures | (industry pattern — "DeFi November / December") |
| 2020-12 onward | Yield-aggregator audit-checklist guidance updates to flag fake-token / arbitrary-token deposit acceptance as a structural risk; standard mitigation becomes whitelisted-asset-only vaults plus per-function `nonReentrant` discipline | (downstream standard) |

## What defenders observed

- **The reentrancy vector was an attacker-controlled token, not a real token with callbacks.** Where Lendf.me 2020-04 worked through a real ERC-777 token (`imBTC`) whose callback was an artefact of the token standard, Akropolis 2020-11 worked through an entirely *fake* attacker-controlled contract whose `transferFrom` was malicious-by-construction. The defender lesson is that *any* unbounded acceptance of arbitrary token contracts as deposit assets is a reentrancy surface, even when no real token in the system has callbacks. The mitigation pattern that emerged from this case — whitelisted-asset-only vaults — is now standard across yield-aggregator architectures (yEarn V2, Yearn-fork strategies, Beefy, Convex, Aura, etc.); Akropolis is the historical reason it became the standard.
- **Yield-aggregator deposit paths are structurally riskier than money-market collateral paths.** A money-market collateral path (Compound, Aave, Lendf.me) records a single user-keyed balance update per deposit; a yield-aggregator share-issuance path computes a *pro-rata share of the total pool balance*, which means the share-accounting arithmetic depends on the pool's reported balance at the moment of share issuance. The defender lesson generalises: any contract whose state mutation depends on a *ratio* between the just-transferred amount and a pre-existing pool balance is more sensitive to reentrancy than a contract whose state mutation depends on the just-transferred amount alone. This is the underlying reason the yield-aggregator class — Akropolis, Origin Dollar, Pickle, Cover, Value — clustered as a vulnerability family in late 2020.
- **Flash loans are the precondition that made the small-pool case worth attacking.** Without flash loans, an attacker would have needed \~\$2M of pre-deployed working capital to execute the attack. Akropolis's pool was small enough (\~\$2M of available DAI) that a self-funded attack would have meant risking the attacker's own liquid capital against a then-unknown success probability. Flash loans collapsed that barrier: the attacker risked only gas, with the upside bounded by the pool's available liquidity rather than by their own capital base. The combined T9.005 + T9.002 framing is the right one — and the framing-of-flash-loan-as-attack-economic-precondition reappears at Origin Dollar, Pickle, Cover, Beanstalk, and most subsequent yield-aggregator cases.
- **Per-function `nonReentrant` was the available-but-unapplied mitigation.** OpenZeppelin's `ReentrancyGuard` modifier had been a standard Solidity library for over two years by November 2020. Lendf.me's April 2020 incident had publicly demonstrated the cost of omitting it on a deposit path. Akropolis's Delphi contracts either inherited an earlier audit revision without the modifier or omitted it during a forking / refactoring step; the precise lineage is documented partially in the Akropolis post-mortem. The defender lesson is the same as Lendf.me's: *fork hygiene* — periodically re-syncing forked codebases against upstream security patches — is a structural responsibility for any team running a yEarn / Compound / Curve fork. Akropolis adds yEarn-fork to the set of fork-hygiene worked examples.
- **Token-based compensation is a partial-recovery category that does not return on-chain liquidity.** Akropolis funded compensation from native ADEL / AKRO reserves, not from recovered DAI. From a depositor's perspective, this is materially different from on-chain recovery: the compensation tokens have their own market-price dynamics (ADEL / AKRO traded down materially in the post-incident months), and the depositor's effective recovery rate is measured at the token's market price, not at par. The defender lesson is that token-based compensation should be recorded as a distinct recovery category from on-chain recovery; OAK's recovery-channel taxonomy in T9.x worked examples should preserve the distinction.

## What this example tells contributors writing future Technique pages

- **Yield-aggregator share-accounting is a structurally distinct sub-pattern of T9.005.** The Technique page for T9.005 should distinguish: (a) money-market collateral-balance reentrancy (Lendf.me, Cream's reentrancy-side incidents); (b) yield-aggregator share-issuance reentrancy (Akropolis, Origin Dollar, Pickle); (c) ETH-send reentrancy (The DAO); (d) cross-function reentrancy via shared storage (Curve Vyper). The (b) sub-pattern's structural feature is the share-ratio arithmetic; the mitigation is whitelisted-asset-only acceptance plus `nonReentrant` discipline plus checks-effects-interactions on the share-update path. Contributors writing yield-aggregator T9.005 examples should locate them in the (b) sub-pattern explicitly.
- **The "DeFi November / December 2020" pattern is itself a teaching point.** Akropolis (2020-11-12), Origin Dollar (2020-11-17), Pickle Finance (2020-11-21), Cover Protocol (2020-12-28), and several Value DeFi incidents form a six-week cluster of yield-aggregator exploits. Worked examples in this cluster should cross-reference the cluster as a whole; the teaching point for contributors is that *clustered failures of a structurally-similar protocol class* are a common defender-side-observable pattern, and OAK's worked examples should preserve the pattern visibility rather than treating each case in isolation. Compound's 2021-09 oracle-precision pattern, the 2021-10 to 2022-04 cross-chain-bridge cluster (Wormhole, Ronin, Harmony, Nomad), and the 2023-09 DPRK cluster (CoinEx, Stake.com, Atomic Wallet) are analogous clusters worth the same explicit framing.
- **Recovery-channel category: token-based compensation should be a recorded category.** OAK's recovery-channel taxonomy in T9.x worked examples should distinguish: (i) total loss; (ii) on-chain partial recovery (Harvest \~10%); (iii) on-chain full recovery via negotiation (Lendf.me 2020, Euler 2023); (iv) negotiated DAO-settlement-with-percentage-return (Mango 2022 \~60%); (v) token-based off-chain compensation funded from operator reserves (Akropolis); (vi) bankruptcy / claims-based recovery (Mt. Gox, Cred, FTX). Akropolis adds (v) as a distinct category. Contributors writing future cases involving token-based compensation should preserve the category explicitly and note the market-price dynamics of the compensation token in the loss assessment.
- **The fake-token / arbitrary-asset-acceptance vector is its own sub-pattern.** Beyond reentrancy, the case illustrates a broader pattern: any contract that accepts arbitrary user-supplied token contracts as input is exposed to whatever malicious behaviour those contracts implement. The fake-token vector reappears at Pickle (2020-11), at Bancor's pre-`safeTransfer*` integration patterns, at certain SushiSwap-fork incidents, and at multiple early-Curve-pool integrations. Contributors writing future Technique pages on input-validation or trust-boundary failures should reference Akropolis as one of the canonical worked examples of why "any-token acceptance" is a structural risk independent of any particular reentrancy mechanic.

## Public references

- Akropolis. *"sUSD and yCurve Pool Incident Report."* Official Medium, 2020-11 — `[akropolispostmortem2020]`. Akropolis's own contemporaneous incident report; the canonical source for the protocol-side acknowledgment, the asset-pool affected, and the compensation-plan announcement.
- PeckShield. *"Akropolis Hack: Root Cause Analysis."* PeckShield blog / Medium, 2020-11 — `[peckshieldakropolis2020]`. PeckShield's transaction-level forensic walkthrough; the canonical industry-side reference for the fake-token reentrancy chain at function-call resolution.
- Inspex. *"Akropolis Delphi Hack Analysis."* Inspex blog, 2020-11 — `[inspexakropolis2020]`. Inspex's parallel forensic walkthrough; cited for the share-accounting arithmetic at the contract level.
- The Block. *"DeFi protocol Akropolis exploited for \$2 million in apparent flash loan attack."* The Block, 2020-11-12 — `[theblockakropolis2020]`. Contemporaneous mainstream-press reporting; cited for industry-reaction framing and timing.
- CoinDesk. *"Akropolis Suffers \$2M DeFi Hack via Flash Loan Attack."* CoinDesk, 2020-11-12 — `[coindeskakropolis2020]`. CoinDesk's contemporaneous reporting; cited for the flash-loan framing and the broader "DeFi November" cluster context.
- `[zhou2023sok]` — academic taxonomy classifying this incident in the yield-aggregator share-accounting reentrancy sub-class of T9.005-equivalent vulnerabilities.
- `[daoreentrancy2016retrospective]`, `[atzei2017survey]` — companion historical-anchor citations for the broader T9.005 lineage.
- `[peckshieldbzx2020]` — companion historical-anchor for the T9.002 flash-loan precondition framing.

### Proposed new BibTeX entries

```bibtex
@misc{akropolispostmortem2020,
  author       = {{Akropolis}},
  title        = {{sUSD} and {yCurve} Pool Incident Report},
  year         = {2020},
  howpublished = {Official protocol post-mortem, Akropolis Medium},
  url          = {https://medium.com/akropolis/susd-and-ycurve-pool-incident-report-f6cad5e6488},
  note         = {OAK v0.1 — proposed. Akropolis's contemporaneous official disclosure of the 2020-11-12 Delphi pool reentrancy incident; cited for asset-pool affected, mechanic acknowledgment, and compensation-plan announcement.}
}

@misc{peckshieldakropolis2020,
  author       = {{PeckShield}},
  title        = {{Akropolis} Hack: Root Cause Analysis},
  year         = {2020},
  howpublished = {Industry forensic analysis, PeckShield / Medium},
  url          = {https://peckshield.medium.com/},
  note         = {OAK v0.1 — proposed. PeckShield's transaction-level forensic breakdown of the Akropolis fake-token reentrancy chain.}
}

@misc{inspexakropolis2020,
  author       = {{Inspex}},
  title        = {{Akropolis} {Delphi} Hack Analysis},
  year         = {2020},
  howpublished = {Industry forensic analysis, Inspex blog},
  url          = {https://inspex.co/},
  note         = {OAK v0.1 — proposed. Inspex's parallel forensic walkthrough of the Akropolis incident; complementary to PeckShield, focused on share-accounting arithmetic.}
}

@misc{theblockakropolis2020,
  author       = {{The Block}},
  title        = {{DeFi} protocol {Akropolis} exploited for \$2 million in apparent flash loan attack},
  year         = {2020},
  howpublished = {News article, The Block},
  url          = {https://www.theblock.co/post/83619/defi-protocol-akropolis-exploited-2m-flash-loan-attack},
  note         = {OAK v0.1 — proposed. Contemporaneous mainstream-press reporting on the Akropolis incident; cited for industry-reaction framing.}
}

@misc{coindeskakropolis2020,
  author       = {{CoinDesk}},
  title        = {{Akropolis} Suffers \$2{M} {DeFi} Hack via Flash Loan Attack},
  year         = {2020},
  howpublished = {News article, CoinDesk},
  url          = {https://www.coindesk.com/markets/2020/11/12/akropolis-suffers-2m-defi-hack-via-flash-loan-attack},
  note         = {OAK v0.1 — proposed. CoinDesk's contemporaneous reporting on the Akropolis incident; cited for flash-loan framing and "DeFi November" cluster context.}
}
```

## Discussion

Akropolis November 2020 sits in OAK's corpus as the **canonical anchor for yield-aggregator share-accounting reentrancy as a sub-class of T9.005**, and as the opening case of the "DeFi November / December 2020" yield-aggregator-exploit cluster. Where Lendf.me April 2020 had established callback-hook reentrancy on a lending market, Akropolis established that the same Technique class extends to yield-aggregator vault-share issuance paths. The structural difference matters: a yield-aggregator's share-accounting arithmetic is *ratio-based*, which means reentrancy can corrupt the share-ratio numerator and denominator independently in ways that a simple balance-tracking lending contract cannot exhibit. The mitigation pattern that emerged — whitelisted-asset-only vaults, per-function `nonReentrant` discipline, and strict CEI ordering on share-update paths — is now standard across yield-aggregator architectures.

The "DeFi November / December 2020" cluster is the second canonical contribution. Akropolis (2020-11-12), Origin Dollar (2020-11-17), Pickle Finance (2020-11-21), Cover Protocol (2020-12-28), and several Value DeFi incidents form a six-week cluster of structurally-similar exploits against the yield-aggregator class. The teaching point for contributors is that *clustered failures of a structurally-similar protocol class are a defender-observable industry-level signal*; once the first case in such a cluster surfaces, the operator-side response should be to assume the cluster will continue and to expedite audit / mitigation responses across the structurally-similar peer set, rather than treating each subsequent case as an unforeseeable independent event. This generalises across OAK's corpus: the 2021-10 to 2022-04 cross-chain-bridge cluster, the 2023-09 DPRK exchange-targeting cluster, and the 2024 supply-chain-compromise cluster all exhibit the same property and warrant the same explicit framing.

The recovery outcome is the third lasting framing. Token-based compensation funded from operator-reserve native tokens is a category distinct from on-chain recovery, distinct from negotiated grey-hat return, and distinct from bankruptcy-claims recovery. The depositor's effective recovery rate at token-based compensation depends on the compensation token's market price, which itself reflects the post-incident reputational damage to the protocol; the recovery rate is therefore *coupled* to the incident in a way that on-chain DAI recovery would not be. Contributors writing future Technique pages and worked examples should preserve this category and note its recovery-coupling property explicitly.

Akropolis's loss magnitude (\~\$2M) is small in absolute terms relative to the larger 2020 cases (Lendf.me \~\$25M, Harvest \~\$24M) and an order of magnitude smaller than later canonical T9.005 cases. The case is included for the **sub-pattern anchor role**, not the dollar magnitude. Worked examples should not optimise the choice of canonical-case status purely on loss size; the structural-anchor role — first instance of a sub-pattern, opening case of a cluster, foundational mitigation lesson — is independently valuable to OAK's defender-side teaching mission.
