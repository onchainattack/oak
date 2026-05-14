# Arbitrum Foundation governance bypass and treasury transfer — Ethereum — 2023-03/04

**Loss:** no permanent dollar loss. On approximately 2023-03-30 the Arbitrum Foundation — the Cayman Islands-domiciled entity that stewarded Arbitrum protocol development — transferred approximately 750 million ARB tokens (roughly $1 billion at then-prevailing ARB prices following the 2023-03-23 airdrop) from the Arbitrum DAO Treasury to addresses controlled by the Foundation, without a token-holder governance vote. The transfer was discovered by the Arbitrum community on 2023-04-01 and triggered a week-long governance crisis. After sustained community backlash, the Foundation announced it would return the 750M ARB to the DAO Treasury (or a portion thereof) and proposed a series of governance reforms, including re-submitting the budget proposal as a proper token-holder vote. By 2023-04-05 the immediate governance crisis was resolved; the longer-term governance-reform proposals were adopted in subsequent months.

**OAK Techniques observed:** **OAK-T16.002** (Hostile Vote Treasury Drain) — broadly construed; the Arbitrum Foundation exercised *de facto* governance authority over the DAO Treasury by moving 750M ARB tokens without a token-holder vote, on the theory that the "Arbitrum DAO Constitution" authorised the Foundation's pre-DAO decisions and that the subsequent vote (AIP-1) was a ratification of an already-completed transfer rather than an authorisation of a future transfer. The structural shape — treasury assets moved by a controlling entity without token-holder governance approval — is the defining T16 pattern, even though the entity exercising control was the protocol's own Foundation rather than an external adversary. The case is **not a clean adversarial-technique anchor** — the Foundation was not an attacker in the conventional sense — but is included in the OAK corpus as the cleanest documented example of the **legal-wrapper-governance-bypass** risk surface, which is a standing structural risk for every DAO whose treasury is held by a legal entity that can exercise control outside the on-chain governance process. **Flagged for `TAXONOMY-GAPS.md`** as evidence that the T16 surface includes both adversarial exploitation of governance mechanisms AND legal-wrapper governance bypass by protocol-affiliated entities.

**Attribution:** **confirmed** (protocol's own Foundation). The Arbitrum Foundation and its legal structure (Cayman Islands-domiciled entity, separate from the Arbitrum DAO's on-chain governance) are publicly documented. The Foundation's decisions — the initial transfer, the framing of AIP-1 as ratification, the subsequent backtrack and governance-reform commitment — are on the public record via the Arbitrum Foundation's official communications, the Arbitrum DAO governance forum, and contemporaneous crypto-press coverage. No adversarial attribution is necessary; the entity exercising control was the protocol's own steward.

**Key teaching point:** **A legal-wrapper entity that can move DAO Treasury tokens without on-chain token-holder approval is a single point of governance failure, regardless of that entity's intent.** The Arbitrum case demonstrates that the structural risk surface exists for every protocol whose treasury is held by a legal entity (Foundation, Association, Labs company) that exercises practical control over treasury multisigs — even if the entity is benevolent, the *capability* to bypass governance is the standing risk, and the event that surfaces that capability to the community may be a benevolent actor testing its own procedural boundaries rather than an adversarial attacker exploiting them.

## Summary

On 2023-03-23, the Arbitrum Foundation conducted a long-awaited airdrop of the ARB governance token to approximately 625,000 eligible addresses. The DAO Treasury — the on-chain address holding ARB tokens designated for community governance — was established contemporaneously with the airdrop and was described in the Arbitrum DAO Constitution and accompanying Foundation communications as "governed by the ARB token holders through the Arbitrum DAO."

Approximately one week later, the Arbitrum community discovered that on or about 2023-03-30 the Foundation had transferred approximately 750M ARB tokens from the DAO Treasury to Foundation-controlled addresses. When the Foundation published AIP-1 ("Arbitrum Improvement Proposal 1") on the Arbitrum DAO governance forum on 2023-04-01, the proposal text described the 750M ARB transfer as an already-completed action that AIP-1 was asking the community to "ratify," rather than as a future action requiring token-holder approval before execution. The framing was that the Foundation's pre-DAO decisions — including the 750M ARB allocation — were authorised by the "Arbitrum DAO Constitution" and that the token-holder vote was a retrospective confirmation, not a prospective authorisation.

The community reaction was immediate and broadly negative. Token holders, delegates, and protocols building on Arbitrum argued that moving $1B of DAO Treasury tokens without a vote — and then asking for ratification after the fact — contradicted the core premise of DAO governance (that token holders control treasury decisions). The Foundation initially defended the transfer as consistent with the DAO Constitution and the Foundation's role as the protocol steward. Over the following days, however, as the backlash intensified and several prominent delegates signalled they would vote against AIP-1, the Foundation reversed its position.

On 2023-04-05, the Arbitrum Foundation published a commitment to (a) return the 750M ARB tokens (or the substantial remainder after operational allocations) to the DAO Treasury; (b) re-submit the budget proposal as a series of individual proposals each requiring token-holder approval before execution; (c) not move DAO Treasury tokens without a token-holder vote going forward; and (d) implement governance-process reforms including greater transparency about Foundation-controlled addresses and treasury movements.

The governance crisis was structurally resolved within one week (2023-04-01 to 2023-04-05), with the substantive governance reforms adopted over the subsequent months. No funds were permanently lost. The incident's significance for OAK is not the financial outcome (which was effectively zero-loss) but the **demonstration of the structural risk surface**: the fact that the Foundation *could* move DAO Treasury tokens without a vote, and *did* move them on the theory that its pre-DAO decisions were self-authorising, is the risk surface. The community's ability to force reversal through social pressure is a mitigation, but it is a social-layer mitigation that is not guaranteed for every DAO — a protocol with a smaller community, a less-engaged delegate set, or a Foundation less responsive to public pressure would not have achieved the same zero-loss outcome.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2023-03 | Arbitrum Foundation established as Cayman Islands entity; "Arbitrum DAO Constitution" drafted; Foundation retains practical control over protocol deployment and treasury infrastructure | (standing T16 surface — legal-wrapper governance bypass) |
| 2023-03-23 | ARB token airdrop to ~625K addresses; DAO Treasury funded with ARB tokens for community governance | (DAO launch) |
| 2023-03-30 (~) | Arbitrum Foundation transfers ~750M ARB (~$1B) from DAO Treasury to Foundation-controlled addresses without token-holder vote | **T16 governance bypass (treasury movement without vote)** |
| 2023-04-01 | AIP-1 published on Arbitrum DAO governance forum; text frames the 750M ARB transfer as already-completed and asking for ratification; community discovers the transfer | (community detection) |
| 2023-04-01 to 04-04 | Sustained community backlash; delegates signal opposition; crypto press publishes widely-read coverage of the governance crisis | (community response) |
| 2023-04-05 | Arbitrum Foundation announces reversal: 750M ARB to be returned; budget to be re-submitted as individual proposals requiring token-holder votes; commitment to not move DAO Treasury without vote | (Foundation reversal) |
| 2023-04 onward | Governance-reform proposals adopted; DAO Treasury management process restructured; the incident becomes the canonical reference for legal-wrapper governance risk in DeFi | (structural remediation) |

## What defenders observed

- **The governance-bypass surface existed from the moment the DAO Treasury was established as an address controlled by the Foundation's multisig.** As long as the private keys to the DAO Treasury multisig were held by Foundation-affiliated signers, the Foundation had the practical capability to move DAO Treasury tokens without a token-holder vote — regardless of what the DAO Constitution said about token-holder governance. This is the structural lesson: a DAO Treasury whose private keys are held by a legal entity is not a DAO-controlled treasury in the cryptographic sense; it is a legal-entity-controlled treasury with a social commitment to honour token-holder votes. The difference between "cryptographically enforced governance" and "socially-committed governance" is the T16 surface.
- **The Foundation's "ratification" framing is a generalisable governance-bypass pattern.** The argument that a controlling entity's pre-vote decisions are self-authorising and that the subsequent token-holder vote is "ratification" rather than "authorisation" is a template that any legal-wrapper entity could adopt. Whether the community accepts it depends on the community's ability to apply social pressure — a mitigation that scales inversely with how dependent the community is on the Foundation for protocol development, treasury management, and ecosystem coordination.
- **Community detection and response compressed the bypass window to approximately one week.** The Arbitrum community — token holders, delegates, and building teams — detected the transfer within days, organised coordinated public opposition, and forced a Foundation reversal within approximately one week of the transfer becoming public. This is the optimistic case for community-governance responsiveness. The less-optimistic case — a DAO with a less-engaged community, a Foundation that is less responsive to public pressure, or a transfer that is not publicly discovered — produces a different outcome. Defenders modelling governance-risk surfaces should treat community-responsiveness as a parameter that varies across DAOs, not as a constant.
- **Zero-loss outcome does not mean zero-risk surface.** The incident resulted in no permanent loss, but only because the Foundation reversed course under community pressure. The *capability* to bypass governance — which the Foundation demonstrated — remains the standing risk surface for any DAO structured with a legal-wrapper entity that holds treasury multisig keys. Future incidents exercising the same capability by a less benevolent entity would follow the same structural template with a different outcome.

## What this example tells contributors writing future Technique pages

- **Legal-wrapper governance bypass is a T16-adjacent surface that OAK v0.1 does not cleanly capture.** The Arbitrum case is not an attack by an external adversary; it is a governance-process failure by a protocol's own steward. It is included in the OAK corpus as a documented example of the broader governance-risk surface that the T16 technique family addresses, but it should be cross-referenced in TAXONOMY-GAPS.md as evidence that the T16 surface includes non-adversarial governance-bypass patterns that v0.1 does not cleanly enumerate. Future T16 page expansions should consider whether to add a sub-Technique for "legal-wrapper governance bypass" as a distinct pattern.
- **The "ratification versus authorisation" distinction is structurally load-bearing for governance-risk modelling.** Whether a governance vote is framed as ratifying a completed action (Arbitrum) or authorising a future action (normal DAO governance) is a binary distinction that determines whether the governance process controls the action or just endorses it. The distinction is not just semantic — it determines which side of the action the vote sits on in the timeline. Contributors writing governance-incident examples should record this distinction explicitly.
- **Social-pressure-as-mitigation is a parameter, not a constant.** The Arbitrum outcome depended on a specific set of community conditions (large, engaged delegate set; broad media coverage; Foundation responsive to public pressure). Contributors writing governance-risk assessments should model these conditions as parameters that vary across DAOs rather than assuming them as constants.

## Public references

- Arbitrum Foundation. *AIP-1: Arbitrum Improvement Proposal 1.* Arbitrum DAO governance forum, 2023-04-01 — the original proposal that triggered the governance crisis; the primary source for the "ratification" framing — `[arbitrumaip12023]`.
- Arbitrum Foundation. *"Clarification on AIP-1 and the Arbitrum DAO Constitution."* Arbitrum governance forum, 2023-04-05 — the Foundation's reversal announcement committing to return the 750M ARB tokens and implement governance reforms — `[arbitrumreversal2023]`.
- CoinDesk. *"Arbitrum Foundation Backtracks on $1B Treasury Transfer After Community Backlash."* 2023-04-05 — contemporaneous reporting on the governance crisis and the Foundation's reversal — `[coindeskarbitrum2023]`.
- The Block. *"Arbitrum Foundation proposes sweeping governance changes after $1B token transfer backlash."* 2023-04 — contemporaneous reporting on the governance-reform proposals following the crisis — `[theblockarbitrum2023]`.
- Uniswap DAO / compound DAO governance-forum cross-references — several major DAOs discussed the Arbitrum governance crisis in their own governance forums as a cautionary case for legal-wrapper treasury control; these cross-references are material for the "governance-process design" lesson and should be cited in any future OAK governance-risk Technique page.

### Proposed new BibTeX entries

```bibtex
@misc{arbitrumaip12023,
  author = {{Arbitrum Foundation}},
  title = {AIP-1: Arbitrum Improvement Proposal 1},
  year = {2023},
  month = apr,
  note = {Arbitrum DAO governance forum, 2023-04-01. The original proposal whose ratification framing triggered the governance crisis.},
}

@misc{arbitrumreversal2023,
  author = {{Arbitrum Foundation}},
  title = {Clarification on AIP-1 and the Arbitrum DAO Constitution},
  year = {2023},
  month = apr,
  note = {Arbitrum governance forum, 2023-04-05. Foundation commitment to return 750M ARB and implement governance reforms.},
}

@misc{coindeskarbitrum2023,
  author = {{CoinDesk}},
  title = {Arbitrum Foundation Backtracks on \$1B Treasury Transfer After Community Backlash},
  year = {2023},
  month = apr,
  note = {Contemporaneous reporting on the governance crisis and the Foundation reversal.},
}

@misc{theblockarbitrum2023,
  author = {{The Block}},
  title = {Arbitrum Foundation proposes sweeping governance changes after \$1B token transfer backlash},
  year = {2023},
  month = apr,
  note = {Contemporaneous reporting on the governance-reform proposals.},
}
```
