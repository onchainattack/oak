# Slope Wallet (Solana) — 2022-08-02

**Loss:** \~\$4–8M across approximately 8,000–9,231 Solana end-user wallets (per-source variance: Slope's own DFIR report cites 9,231 affected wallets and \~\$4.1M; contemporaneous industry reporting in the first 24 hours cited up to \~\$8M; Elliptic's first-pass forensic accounting cited \~\$5.8M).
**Attribution:** **pseudonymous** — no public actor attribution at OAK v0.1 cutoff.
**OAK Techniques observed:** OAK-T11.002 (Wallet-Software Distribution Compromise) — primary, distinct sub-vector from build-pipeline compromise; OAK-T11.001 (broadly construed, third-party-vendor exposure — Sentry as the vendor whose logging infrastructure held the secret material, though responsibility lies with Slope's design choice).
**OAK-Gnn:** none. **Attribution:** pseudonymous; not publicly attributed to a known operator cluster as of OAK v0.1 cut. Slope offered a 90%-return bounty on 2022-08-05 with a 48-hour deadline; the call went unanswered.

**Key teaching point:** Slope Wallet 2022 is OAK's canonical T11.002 sub-vector-B example: the wallet binary was not tampered with, but the application's design transmitted seed phrases in plaintext to a third-party SaaS error-tracking service under normal operation. The on-chain extraction pattern is indistinguishable from build-pipeline T11.002 (Atomic Wallet 2023 is the companion build-pipeline case in OAK), but the upstream cause class — and therefore the defender-side mitigation surface — is materially different.

## Summary

Starting 2022-08-02 at \~22:37 UTC and continuing for approximately 4–7 hours, an attacker drained Solana-ecosystem wallets at scale. Initial reporting confused the affected vendor (Phantom was named in early coverage); by 2022-08-03 the developer / Solana Foundation / third-party-auditor investigation had localised the affected user population to addresses that had been **created, imported, or at any point used inside Slope Wallet's iOS or Android mobile applications**. Phantom's own infrastructure was not compromised; Phantom users who appeared in the affected set had imported seed phrases originally generated in Slope.

The technical root cause is the load-bearing teaching point. Slope Wallet's mobile apps integrated Sentry, a third-party SaaS error / event-tracking service, for in-app telemetry. Slope did not configure Sentry to scrub sensitive fields. As a result, **wallet mnemonics (seed phrases) were transmitted in plaintext to Slope's Sentry tenant under normal application operation** — not as part of an exploit, not as part of an attack, but as a routine consequence of how the app was instrumented. An adversary who obtained access to the Sentry tenant (or to the data flowing into it) could harvest seed phrases at scale and then drain the corresponding on-chain addresses directly.

This makes the Slope incident a **distinct sub-class of T11.002 from the Atomic Wallet 2023 case**. Atomic Wallet's vector was build-pipeline / distribution-channel compromise (the wallet binary that users installed was tampered with). Slope's vector was application-level: the wallet binary was not tampered with; it was simply designed in a way that exfiltrated secrets to a vendor under normal operation. Both produce on-chain T11.002 signatures (coordinated extraction across thousands of distinct end-user addresses), but the defender-side observables and mitigations differ substantially.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-event (long-running) | Slope mobile apps transmit mnemonics in plaintext to Sentry tenant under normal operation | (pre-event design defect — T11.002 substrate) |
| 2022-08-02 \~22:37 | Coordinated extraction begins across Slope-using Solana addresses | **T11.002 extraction** |
| 2022-08-02 to 2022-08-03 | Approximately 8,000–9,231 wallets drained over \~4–7 hours; on-chain forensic providers (Elliptic) publish first-pass dollar accounting (\~\$5.8M) | **T11.002 extraction (continued)** |
| 2022-08-03 | Initial public attribution names Phantom; Phantom publicly states its systems are uncompromised | (vendor disambiguation) |
| 2022-08-03 to 2022-08-04 | Solana Foundation, Slope, OtterSec, SlowMist, Zellic localise the affected population to Slope-touched addresses; Sentry mnemonic-leak design defect identified | **T11.002 root-cause disclosure** |
| 2022-08-05 | Slope offers attacker a 10% bounty (return 90%) with 48-hour deadline; goes unanswered | (recovery attempt) |
| 2022-08 (mid-month) | Slope publishes DFIR post-mortem: 6,811 unique private keys found in the Sentry database; only 1,444 of those overlap with the 9,229 attacked addresses; "no conclusive evidence" the Sentry data itself was exfiltrated by the attacker, despite the design defect being confirmed | (post-mortem) |
| Post-event | No public attribution to a known operator cluster; funds-recovery effort fails | (assessment) |

## What defenders observed

- **The pre-event substrate is a SaaS-error-tracking misconfiguration, not a binary compromise.** Slope's mobile app binaries were not tampered with. The vendor under whose roof the secret material accumulated (Sentry) was not itself compromised in the conventional intrusion sense; Sentry was operating exactly as designed. The defect was that **Slope sent secrets to Sentry**, and the SaaS retained them. Any defender auditing a wallet (or any custodial-secret-handling application) for T11.002 sub-class exposure must inspect what fields the application emits to telemetry / error-tracking / observability vendors, not just whether the binary is signed and the build pipeline is clean.

- **The on-chain extraction signature is the same as build-pipeline T11.002 cases.** Coordinated burst across thousands of distinct end-user addresses, traceable back to a small set of attacker-controlled destinations. From an on-chain forensics perspective, you cannot tell Slope apart from Atomic Wallet; both look like classical T11.002. The disambiguation lives in the vendor-side disclosure (which app, which design defect, which distribution path).

- **Vendor disambiguation is itself a defender observable.** The first 24 hours of public reporting named Phantom as the affected vendor because Phantom users appeared in the attack set. The actual exposure was Slope-side, with Phantom users reaching the attack set via cross-wallet seed-phrase reuse (users who first generated a seed in Slope, then imported the same seed into Phantom, were exposed via the Slope-side leak). Defenders triaging future ecosystem-wide drains across multiple wallet brands should expect this pattern — **the vendor that gets named first is not necessarily the vendor whose software was the vector**, especially when end users routinely re-import seeds across wallet apps.

- **Post-mortem inconclusivity is itself a defender-side observation.** Slope's own DFIR report and the third-party audits (OtterSec, SlowMist, Zellic) confirmed the design defect (mnemonics in plaintext in Sentry) but could not conclusively prove that the specific Sentry data was the path the attacker actually used. Of the 9,229 attacked addresses, only 1,444 had keys present in the Sentry tenant; the remaining \~7,800 attacked addresses' compromise path is not fully publicly attested. This pattern — defect-confirmed-but-causal-chain-not-fully-proven — is common in T11.002 incidents and should not be treated as exculpatory.

- **Bounty offers in T11.002 cases tend to fail.** Slope's 90%-return bounty went unanswered. This is consistent with the broader T11.002 attribution pattern: when the operator is sophisticated enough to harvest seed-phrase material at scale (whether via SaaS log access or build-pipeline injection), they are typically also positioned to launder rather than negotiate.

## What this example tells contributors writing future Technique pages

- **T11.002 needs internal sub-classification in v0.x.** The Slope vs Atomic Wallet contrast is the cleanest illustration of why. Both are T11.002 (wallet-software-as-vector); both produce identical on-chain extraction signatures; but the **upstream cause class** is different:
  - **T11.002 sub-vector A — build-pipeline / distribution-channel compromise** (Atomic Wallet 2023). The binary the user installs is tampered with. Mitigations live in build-system hardening, signed-update pipelines, reproducible builds, dependency provenance.
  - **T11.002 sub-vector B — application-level secret-leak to vendor under normal operation** (Slope Wallet 2022). The binary the user installs is not tampered with, but its design exfiltrates secrets to a third-party SaaS. Mitigations live in application-design review, telemetry / observability-vendor data-flow auditing, "what does this app send off-device under normal operation" inspection.
  Future T11.002 examples should declare which sub-vector they instantiate. The v0.x ROADMAP should track this as a sub-classification refinement.

- **The "secret leakage to third-party SaaS" failure mode generalises well beyond wallets.** Any application that handles custodial-secret material (private keys, API keys, OAuth tokens, recovery codes, KYC document images) and is instrumented with a third-party error-tracking / observability / analytics SaaS is at risk of this class **unless** the SaaS integration is configured to scrub the secret-bearing fields. The Slope incident is a wallet incident in OAK because OAK is on-chain-attack-knowledge, but the structural class is broader: it is a **client-side application secrets-in-telemetry leak**. Contributors writing T11.002 sub-vector-B examples in adjacent domains (custodian-side telemetry leaks, exchange-side user-PII leaks, MPC-coordinator-side telemetry leaks) should explicitly flag the generalised class.

- **Cross-vendor seed-phrase reuse is a user-side amplifier of T11.002 sub-vector B.** Users who generate a seed in vendor A and import the same seed into vendors B, C, D are effectively making vendor A's worst-configured telemetry pipeline the security floor for the entire set. This is a documentable user-side risk amplifier worth surfacing in T11.002 prose.

- **Vendor-disambiguation lag is a defender-side observable.** The first 24 hours of public reporting in ecosystem-wide drain incidents tends to name the most-visible wallet brand (Phantom in this case) before the investigation localises the actual vector (Slope). Contributors writing future ecosystem-wide T11.002-style cases should preserve this pattern in the timeline rather than retroactively rewrite the early-attribution confusion out of the record.

## Public references

- [Solana Foundation — 8/2/2022 Application Wallet Incident Update](https://solana.com/news/8-2-2022-application-wallet-incident) — `[solanafoundationslope2022]`.
- [Slope Finance — Sentry Vulnerability DFIR Report](https://slope-finance.medium.com/slope-wallet-sentry-vulnerability-digital-forensics-and-incident-response-report-d7a5904e5a39) — `[slopepostmortem2022]`.
- [Elliptic — Over \$5.8M Drained in Solana Wallet Exploit](https://www.elliptic.co/blog/analysis/over-5-8-million-drained-in-solana-wallet-exploit) — `[ellipticslope2022]`.
- [The Block — Slope wallet provider saved user seed phrases in plain text](https://www.theblock.co/post/161425/slope-wallet-provider-saved-user-seed-phrases-in-plain-text-solana-security-researchers-find) — `[theblockslope2022]`.
- [The Block — Phantom says its systems were uncompromised](https://www.theblock.co/amp/post/162673/solana-wallet-provider-phantom-says-its-systems-were-uncompromised-in-4-million-hack) — `[theblockphantom2022]`.
- Companion T11.002 case — see `[ellipticatomic2023]` (Atomic Wallet 2023, build-pipeline sub-vector).

## Discussion

Slope Wallet 2022 is OAK's canonical T11.002 sub-vector-B example: the wallet binary was not tampered with, but the application's design transmitted seed phrases in plaintext to a third-party SaaS error-tracking service under normal operation. The on-chain extraction pattern is indistinguishable from build-pipeline T11.002 (Atomic Wallet 2023 is the companion build-pipeline case in OAK), but the upstream cause class — and therefore the defender-side mitigation surface — is materially different.

The Slope case is also OAK's clearest illustration of why **vendor-disambiguation in the first 24 hours of an ecosystem-wide drain is unreliable**. Phantom was named first because Phantom users appeared in the attack set; the actual vector was Slope-side, reaching Phantom users via cross-wallet seed-phrase import. Contributors writing future ecosystem-wide T11.002-style cases should preserve this disambiguation lag in the timeline rather than rewrite it out.

The structural class — "any application that handles custodial-secret material and emits telemetry to a third-party SaaS without scrubbing secret-bearing fields is exposed" — is broader than wallet software. OAK's T11.002 page should explicitly cover this generalisation in v0.x, and the v0.x ROADMAP should track the T11.002 sub-vector A / sub-vector B split as a sub-classification refinement task.
