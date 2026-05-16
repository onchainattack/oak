# CoinStats MetaMask-Snap-related compromise — Ethereum + multi-chain — 2024-06-22

**Loss:** approximately $1M across approximately 1,590 affected wallet addresses.
**OAK Techniques observed:** **OAK-T4.011** (Push-Notification Infrastructure Compromise — the canonical anchor; the attacker compromised CoinStats's iOS push-notification infrastructure and used it to broadcast a malicious payload to the application's user base. See [`techniques/T4.011-push-notification-infrastructure-compromise.md`](../techniques/T4.011-push-notification-infrastructure-compromise.md)). **OAK-T11.002** (Wallet-Software Distribution Compromise — MetaMask Snap distribution-channel subclass; the downstream effect once the malicious Snap was delivered via the push-notification channel). **OAK-T15.004** (Operator-Side Credential Compromise — the load-bearing compromise was at the CoinStats-controlled iOS push-notification infrastructure account / SaaS surface). **OAK-T15.002** (Supply-Chain / Vendor-Pipeline Compromise — the Snap-distribution channel is structurally a shared-upstream-surface attack class). Downstream **OAK-T4.004** / **OAK-T4.005** (drainer-class extraction once the malicious Snap was active in the user's wallet).
**Attribution:** **pseudonymous** at v0.1 cutoff. CoinStats's own incident statement and SlowMist's same-day analysis describe operator-side TTPs consistent with cohort-level Russian-cybercrime-ecosystem drainer operations (OAK-G02 broadly construed) but neither vendor nor v0.1 OAK records the attribution at `inferred-strong` confidence.
**Key teaching point:** the **MetaMask Snap distribution channel** is structurally the same supply-chain-and-distribution attack surface as the npm-package supply-chain (OAK-S29 BeaverTail) and the wallet-extension distribution channel (OAK-S11 3CX trojan in the broader-construed sense), and produces canonical OAK-T11.002 compromise outcomes. The June 2024 CoinStats incident is the first major MetaMask-Snap-related incident in the OAK reference period and the canonical case for the "Snap-distribution channel as wallet-software supply-chain" framing.

## Summary

CoinStats is a portfolio-tracking application popular with retail and small-institutional crypto users; its iOS app integrates with MetaMask via the MetaMask Snap framework to display portfolio data and to mediate certain transaction flows. On June 22, 2024, an attacker compromised CoinStats's iOS push-notification infrastructure and used that access to inject a malicious payload into the CoinStats Snap distribution that ran in the wallet contexts of approximately 1,590 affected users. The malicious payload extracted private-key material and authority-graph signing-permissions from compromised wallets, then drained those wallets through standard EVM-chain drainer-extraction flows.

The incident is structurally a wallet-software supply-chain compromise (OAK-T11.002) at the MetaMask Snap distribution-channel layer rather than at the underlying MetaMask extension layer; the upstream-of-supply-chain root cause was access to CoinStats's own infrastructure rather than to MetaMask's. CoinStats publicly disclosed the breach within hours, paused the affected Snap distribution, and offered partial reimbursement to verified affected users from operator reserves; recovery covered approximately 60–70% of estimated cumulative losses per CoinStats's subsequent operations updates.

For OAK's purposes the case is the canonical anchor for treating MetaMask Snaps (and the analogous Phantom / Trust Wallet / OKX Wallet extension-and-snap surfaces) as wallet-software supply-chain attack surfaces subject to the OAK-M40 Supply-Chain Package Integrity mitigation class. The pattern parallels the December 2023 Ledger Connect Kit incident (`examples/2023-12-ledger-connect-kit.md`), the July 2024 Bittensor PyPI compromise (`examples/2024-06-uwu-bittensor.md`), and the broader DPRK-attributed BeaverTail / InvisibleFerret npm-package supply-chain campaigns — same OAK-T11.002 class, different distribution-channel layer.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-06-22 (early UTC) | Attacker gains access to CoinStats's iOS push-notification infrastructure | (initial-access; vector not publicly detailed at v0.1 cutoff) |
| 2024-06-22 | Malicious payload injected into the CoinStats Snap distribution; affected users' wallet contexts begin drain | T11.002 + T1.003 (initiation) |
| 2024-06-22 | Independent on-chain analysts (SlowMist, ZachXBT, PeckShield) flag the active drain via cluster-graph anomalies | T8.001 / M39 detection |
| 2024-06-22 (within hours) | CoinStats publicly discloses the breach and pauses the affected Snap distribution | (operator response) |
| 2024-06-23 to 24 | Industry forensic posts (SlowMist, BlockSec, PeckShield) publish post-mortems with on-chain trace and approximate cumulative-loss figures | (forensic record) |
| 2024-06-25 onward | CoinStats operator-funded reimbursement program begins for verified affected users | (recovery) |

## What defenders observed

- **Pre-event (no advance warning).** No public-record indication that the iOS push-notification infrastructure compromise was visible upstream; defenders monitoring wallet-software-distribution channels did not have a pre-event signal.
- **At-event (drainer-pattern detection).** The drain pattern matched standard EVM-chain Permit2 / setApprovalForAll / approve-pattern drainer flows; cluster-graph monitoring at SlowMist / PeckShield / ZachXBT detected the cohort within hours via anomalous cross-victim destination clustering.
- **Post-event (rapid public response).** CoinStats disclosed and paused within hours; the same-day public-record discipline is consistent with operator-side incident-response best-practice and substantially limited the affected-user count compared to a hypothetical multi-day un-detected window.

## What this example tells contributors writing future Technique pages

- **MetaMask Snap distribution is a first-class wallet-software supply-chain attack surface.** Future T11.002 contributions should enumerate the Snap-distribution channel alongside the wallet-extension Chrome-Web-Store / Firefox-Add-Ons surface, the mobile-app-store iOS / Android surface, and the desktop-installer surface.
- **The upstream-of-supply-chain root cause is often the operator's own infrastructure.** CoinStats's iOS push-notification infrastructure was the attack surface, not MetaMask's underlying extension code. Future T11.002 worked examples should distinguish between *upstream-vendor compromise* (Ledger Connect Kit class) and *application-vendor infrastructure compromise* (CoinStats class) as separate sub-patterns.
- **Cohort-graph monitoring is the load-bearing detection surface for distribution-channel compromises.** Per-victim monitoring is structurally too late; cross-victim cluster-graph monitoring at SlowMist / PeckShield / ZachXBT is what produced the same-day detection.
- **Operator-side same-day public-record discipline is a first-order defensive variable.** CoinStats's same-day disclosure-and-pause substantially reduced the realised loss versus the counterfactual multi-day un-detected window. Future T11.002 contributions should treat operator-side disclosure-and-response speed as a load-bearing mitigation variable composing with OAK-M34 emergency-pause.

## Public references

- CoinStats operator-side incident statement (June 22-25 2024) — `[coinstats20240622]`.
- SlowMist incident analysis (June 22 2024) — `[slowmistcoinstats2024]`.
- BlockSec forensic walkthrough — `[blocksec_coinstats2024]`.
- PeckShield on-chain trace and headline figures — `[peckshieldcoinstats2024]`.
- ZachXBT independent on-chain investigation thread — `[zachxbtcoinstats2024]`.

## Citations

- `[coinstats20240622]` — CoinStats own incident statement; primary source for affected-user count and reimbursement program.
- `[slowmistcoinstats2024]` — SlowMist same-day forensic analysis; documents the iOS push-notification infrastructure compromise vector.
- `[blocksec_coinstats2024]` — BlockSec post-incident technical walkthrough.
- `[peckshieldcoinstats2024]` — PeckShield on-chain trace, cumulative-loss figures, drainer-cluster fingerprint analysis.
- `[zachxbtcoinstats2024]` — ZachXBT independent investigation; complementary on-chain analyst record.
- `[ellipticatomic2023]` — Elliptic Atomic Wallet 2023 writeup; cross-reference for the broader wallet-software-distribution-compromise class.

## Discussion

The CoinStats June 2024 incident is the OAK reference period's first major MetaMask-Snap-related supply-chain compromise and the canonical anchor for treating Snap distribution as a wallet-software supply-chain attack surface. The case is structurally a hybrid of T11.002 (wallet-software distribution compromise via the Snap channel) and T1.003 broadly construed (the iOS push-notification infrastructure as the compromised-application-distribution surface analogous to a compromised front-end). The distinction matters for mitigation-class composition: OAK-M40 Supply-Chain Package Integrity is the load-bearing prevention mitigation; OAK-M03 Continuous Bytecode-Diff Monitoring does not apply (Snaps are JavaScript, not deployed on-chain bytecode); OAK-M39 Cross-Protocol Watcher Network detection at the wallet-cluster level is the load-bearing detection mitigation; OAK-M34 Pause-by-Default + Emergency Pause at the application layer (CoinStats's same-day pause of the affected Snap) is the load-bearing operator-response mitigation.

The cohort framing pairs CoinStats with Ledger Connect Kit (December 2023, npm-package distribution channel), Bittensor (July 2024, PyPI-package distribution channel), and the BeaverTail / InvisibleFerret 2023-present DPRK-attributed npm-package campaigns. All four cohort cases are T11.002 wallet-software supply-chain compromises operating across different distribution-channel surfaces; defenders writing T11.002 future contributions should treat the distribution-channel surface as a per-incident-axis dimension rather than a sub-Technique dimension.

The pseudonymous-unattributed framing reflects the public-record state at v0.1 cutoff. Industry-cohort-graph-monitoring data does not at v0.1 support an `inferred-strong` attribution to any of the OAK-G entries; the case is documented with attribution pending future industry forensic-cluster-attribution updates.
