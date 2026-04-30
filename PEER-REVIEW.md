# Peer-review request — OAK v0.1

OAK (OnChain Attack Knowledge) is a v0.1 draft of an open, vendor-neutral knowledge base of adversary Tactics and Techniques observed against on-chain assets. The threat surface is fundamentally different from traditional IT infosec — public-ledger finality, anonymous adversaries, money-and-laundering as the primary objective, smart contracts as the attack surface, no patchable endpoints — so vocabulary built for crypto's threat model is needed, not borrowed from elsewhere.

This file briefs reviewers on what to look at, what kinds of feedback are most useful, and how to send it.

## What's in v0.1

- **14 Tactics** — operator-behaviour kill chain (T1-T8) + T9 Smart-Contract Exploit + T10 Bridge & Cross-Chain + T11 Custody and Signing Infrastructure + T12 NFT-Specific + T13 Account Abstraction + T14 Validator/Staking/Restaking.
- **62 Techniques** with description, observed indicators, detection signals, real-world examples, reference implementations, mitigations, and citations.
- **40 Mitigations**, **40 Software** entries, **18 Threat Actors**, **142 worked examples**, **12 Data Sources**, **416 machine-readable relationships** in `tools/oak.json`.
- **964 citations** in `citations.bib`, every entry classified `verified` / `verified-with-caveat` / `url-not-pinned` / `url-broken` per a v0.1 audit.
- **STIX 2.1 export** in `tools/oak-stix.json` (601 SDOs/SROs).

## Where review effort would compound most

In rough order of payoff per reviewer hour:

### 1. Per-Technique calibration

Pick one Technique you have direct domain experience with and read it end-to-end. Look for:

- **Is the Technique scope correct?** — does the framing match how you would describe this attack class to a peer? If not, where does it go wrong?
- **Are the observed indicators load-bearing?** — i.e., would your tooling actually fire on them, or are they too abstract?
- **Are the detection signals operational?** — are they implementable, or do they describe an intent rather than a measurement?
- **Are the examples representative?** — is there a canonical incident missing, or is one of the included examples a poor fit for the Technique?
- **Are the citations strong?** — flag any citation where the URL is broken, the source is misattributed, or the reference doesn't actually support the claim being made.

The Discussion section on each Technique is where future work is parked. If you read a Technique and there's a calibration gap that isn't called out there, that's the most useful feedback we can get.

### 2. Cross-Technique attribution-strength language

Every Threat Actor entry uses an explicit attribution-strength label: `confirmed` / `inferred-strong` / `inferred-weak`. Worked examples carry the same labels. Pick a Group or a worked example and check whether you agree with the strength label given the cited evidence.

Consistent calibration of these labels across the corpus is one of the hardest things to get right and one of the most valuable for downstream consumers. If a label feels too strong or too weak relative to what the evidence supports, flag it.

### 3. Coverage matrix honesty

`COVERAGE.md` reports per-Technique reference-implementation status as `full` / `partial` / `gap`. The v0.1 reference implementation is `mg-detectors-rs`, written by the same maintainer.

If you operate a vendor product, an in-house detection stack, or a bug-bounty programme that covers any of the listed Techniques, we want a reality check on whether the stated `partial` and `gap` markers match what you see in production. The v0.5 release expands COVERAGE.md to a multi-implementation matrix — your input now is what calibrates that.

### 4. Taxonomy gaps

`TAXONOMY-GAPS.md` lists incident classes that don't fit the current model cleanly. If you have an example of an incident that doesn't slot into any current Technique and isn't already in TAXONOMY-GAPS, that's a gap-list contribution.

### 5. Mitigation mappings

`mitigations/` lists 40 OAK-M-NN entries each mapped many-to-many to Techniques. The mapping is the hardest part to get right because the same defensive control often has both a strong and a weak class of Technique it claims to address. If a mapping looks load-bearing in name but vacuous in practice, flag it.

## What kinds of feedback are most useful

| Kind | Useful | Less useful |
|---|---|---|
| Technique scope correction | "T9.001 doesn't distinguish between TWAP-windowed manipulation and price-feed-overwrite — they need separate sub-Techniques" | "This page is too long" |
| Attribution challenge | "G05 LockBit's attribution-strength is confirmed via FBI Operation Cronos — the inferred-strong label is too weak" | "I don't believe in Lazarus" |
| Citation correction | "[chainalysis2024dprk] URL has moved to chainalysis.com/reports/2024-crypto-crime-report-introduction" | "Cite more sources" |
| Coverage reality-check | "OAK-T5.002 marked partial in COVERAGE.md — Forta + OpenZeppelin Defender ship calibrated detectors for it; should probably be full" | "Coverage is too low" |
| Naming / ID stability concerns | "OAK-T4.006 WalletConnect Session Hijack overlaps with OAK-T4.001 Permit2 Authority Misuse in scope; merge or distinguish" | "Names should be cooler" |
| Gap-list addition | "The 2024 EigenLayer slashing-edge-case incidents don't fit any current T14 Technique — propose T14.004" | "More NFT stuff" |

The single most valuable kind of feedback is the **specific, citation-bearing correction**: "X is wrong because Y, see [source]". Generic "this is good / this is bad" is less actionable.

## How to send feedback

- **GitHub issue** — for any feedback that should be public-record. Use the `.github/ISSUE_TEMPLATE/` templates for new-Technique proposals, real-world examples, and coverage updates.
- **GitHub discussion** — for open-ended scope or naming questions where consensus would be useful.
- **Pull request** — for a concrete edit to a specific Technique / Mitigation / example page. The CONTRIBUTING.md template is short.
- **Off-list email** — if your feedback contains sensitive incident intelligence (non-public attribution chains, client engagement findings, victim-organisation specifics that you have not yet published). Use the off-list channel described in `SECURITY.md`.

## What we will and won't do with reviewer feedback

- **We will**: fold corrections into v0.x, credit reviewers in CHANGELOG.md by handle (or anonymously if requested), and document any disagreement with reviewer feedback in the relevant Technique's Discussion section so the disagreement is part of the public record.
- **We won't**: fold in feedback that requires citing non-public sources, attribute reviewers without consent, or quietly delete reviewer-flagged claims without acknowledging them.

## Reviewer profile we're hoping for

OAK aims to be useful to several distinct audiences. Reviewers from any of these would compound:

- **Investigators** at Chainalysis, TRM Labs, Elliptic, Crystal, Merkle Science, Match Systems, ZachXBT-style independent investigators — the attribution-strength labels and the worked examples need their reality-check.
- **Audit firms** OpenZeppelin, ConsenSys Diligence, Trail of Bits, Halborn, BlockSec, PeckShield, SlowMist, Cyfrin, ChainSecurity, Quantstamp, Spearbit, Cantina, Ottersec — the Technique definitions and the Mitigation mappings need their reality-check.
- **Detection vendors** Forta, OpenZeppelin Defender, Tenderly, Hypernative, BlockSec, Halborn — the COVERAGE.md framing and the per-Technique detection signals need their reality-check.
- **Researchers** at academic or industry research labs working on smart-contract security, on-chain forensics, or operator-cluster analysis — the Discussion sections on under-calibrated Techniques are where research findings would compound directly.
- **Threat-intelligence teams** at exchanges, custodians, payment processors, and large protocols — the Threat Actor entries and the cross-axis relationships need their reality-check.

Anyone outside these categories is welcome too — reading OAK as a non-expert and reporting where the framing isn't clear is also valuable, since one of the v0.1 goals is being a teaching reference, not just an internal vocabulary.

## Timeline

v0.1 stays open for community comment through Y1 H1. v0.x rolls in calibration and gap-list additions as they come; substantive scope changes wait for v0.5. The v1.0 commitment freezes Tactic and Technique IDs — reviewer feedback on naming and identifier stability is most valuable now, before that freeze.

---

Direct any questions about review process to the maintainer's GitHub handle in `CONTRIBUTING.md`.
