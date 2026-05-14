# DEXX trading-bot platform compromise cohort — Solana + EVM — 2024-09 to 2024-11

**Loss:** approximately $2.5M+ across many user accounts (cohort-level aggregate; per-user losses ranged from $100s to ~$50,000+).
**OAK Techniques observed:** **OAK-T4.001** (Private Key / Seed Phrase Compromise — primary; the operator's server-side raw-private-key storage architecture meant a single database compromise exfiltrated signing keys for all active users without per-user interaction) + **OAK-T15.003** (Operator Endpoint / Infrastructure Compromise — the proximate entry vector was intrusion into DEXX's operator-side database infrastructure). The case is also referenceable under **OAK-T11** (Custody and Signing Infrastructure) at the Tactic level; the architectural anti-pattern — server-side storage of raw user private keys — is the structural failure that converted an operator-infrastructure intrusion into a mass-user-asset-loss event.
**Attribution:** **pseudonymous-unattributed**. Industry forensic analysis (SlowMist, ZachXBT, PeckShield) did not at v0.1 cutoff reach `inferred-strong` cohort-attribution to any of the OAK-G entries.
**Key teaching point:** **Trading-bot platforms that hold users' raw private keys server-side are an architectural anti-pattern** that produces canonical OAK-T11 outcomes regardless of the platform operator's intent. The DEXX September-November 2024 incident is the canonical 2024 worked example for the proposition; defenders advising users on trading-bot platform selection should treat raw-private-key-holding as a hard-no-go architectural class.

## Summary

DEXX is a Solana-and-EVM trading-bot platform that offers retail users automated execution against Solana DEX venues and EVM-chain Pump.fun-style launch venues. From approximately September 2024 through November 2024 a series of operator-side database compromises produced cumulative drains of approximately $2.5M+ across many DEXX user accounts, with per-user losses ranging from a few hundred dollars to approximately $50,000+ for the largest single-victim cases.

The defining architectural feature making DEXX vulnerable to this loss class was that DEXX held users' **raw private keys** server-side in order to execute trades on the user's behalf without requiring per-trade user-side signing. When the DEXX operator-side database was compromised (the specific compromise vector was not publicly detailed at v0.1 cutoff but was consistent with operator-infrastructure intrusion rather than user-side phishing), the attacker had direct access to the raw signing keys of every active user and was able to drain wallets without needing to interact with any user-facing flow.

DEXX publicly disclosed the breach progression across October-November 2024, partially reimbursed verified affected users from operator reserves, and committed to migrating to a non-custodial signing architecture. The case is the canonical 2024 worked example for OAK contributors arguing against custodial-private-key-storage trading-bot architectures, and a cross-reference companion to the 2024 Banana Gun September 2024 (`examples/2024-09-banana-gun.md`) information-leak case which had a different mechanism but similar trading-bot-platform-as-attack-surface framing.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-09 (early) | First reports of DEXX user wallets being drained | T11 (initial disclosure) |
| 2024-09 to 2024-10 | DEXX operator initially attributes cohort to "user-side phishing" rather than operator-infrastructure compromise; cohort continues to grow | (mis-attribution / delayed response) |
| 2024-10 | SlowMist + ZachXBT independent analysis publishes evidence that the cohort is consistent with operator-side database compromise (cross-victim destination clustering with no per-victim phishing-page provenance) | M39 detection / external-reattribution |
| 2024-10 to 2024-11 | DEXX team acknowledges operator-infrastructure compromise; pauses signing-execution; commits to non-custodial migration | M34 (delayed pause) |
| 2024-11 onward | Operator-funded reimbursement program for documented-affected users; non-custodial-architecture migration in progress | (operator response) |

## What defenders observed

- **Pre-event (architectural anti-pattern visible).** DEXX's raw-private-key-server-side architecture was publicly documented by users on Twitter / X and in trading-bot review forums months before the incident; defenders advising users to avoid the platform on architectural grounds were expressing the appropriate ex-ante risk assessment.
- **At-event (mis-attribution to user-side phishing).** DEXX's initial response framed the cohort as user-side phishing rather than operator-infrastructure compromise. This delayed appropriate operator-side response by several weeks; the structural lesson is that operator-side initial-response framing carries strong incentive bias against attributing the incident to operator-infrastructure compromise.
- **Post-event (external-reattribution by industry forensic analysts).** SlowMist + ZachXBT cohort-graph analysis was the load-bearing input that overrode DEXX's initial mis-attribution and forced the operator to acknowledge the operator-infrastructure compromise root cause. This is canonical for OAK-M39 cross-protocol watcher-network detection serving as an external-reattribution input.

## What this example tells contributors writing future Technique pages

- **Custodial private-key-storage trading-bot platforms are an architectural anti-pattern class.** Future T11 / OAK-relevant Technique contributions covering trading-bot platforms should treat the custodial-vs-non-custodial architecture distinction as a load-bearing variable. The DEXX case is the canonical anchor for the proposition that custodial-private-key-storage architectures produce OAK-T11 outcomes regardless of operator intent.
- **Operator-side initial-response framing has structural incentive bias.** The DEXX case is canonical for the proposition that operator-side initial-response will frame an incident in the way that minimises operator-attributed-blame; defenders evaluating breach-attribution should weight industry-side cohort-graph analysis over operator-side initial framing.
- **Cross-victim destination clustering is the load-bearing detection signal for cohort-level operator-infrastructure compromise.** Per-victim phishing-page provenance vs no-per-victim phishing-page-provenance with destination-clustering is the diagnostic distinction between user-side phishing and operator-infrastructure compromise.

## Public references

- DEXX operator-side incident statements (October-November 2024) — `[dexxstatements2024]`.
- SlowMist cohort-attribution analysis — `[slowmistdexx2024]`.
- ZachXBT independent investigation thread — `[zachxbtdexx2024]`.
- PeckShield on-chain trace and cumulative-loss aggregation — `[peckshielddexx2024]`.

## Citations

- `[dexxstatements2024]` — DEXX operator-side incident statements; primary source for the eventual operator-infrastructure compromise acknowledgement and the reimbursement program.
- `[slowmistdexx2024]` — SlowMist cohort-attribution analysis; load-bearing input for the external-reattribution from user-side-phishing to operator-infrastructure-compromise framing.
- `[zachxbtdexx2024]` — ZachXBT independent on-chain investigation; complementary source.
- `[peckshielddexx2024]` — PeckShield on-chain trace and cumulative-loss aggregation.
- `[ellipticatomic2023]` — Elliptic Atomic Wallet 2023 writeup; cross-reference for the broader wallet-software-distribution-compromise / custodial-key-handling failure class.

## Discussion

The DEXX September-November 2024 cohort is the canonical 2024 worked example for the **custodial-private-key-storage trading-bot architectural anti-pattern** and a useful companion to Banana Gun September 2024 (`examples/2024-09-banana-gun.md`) for OAK contributors documenting the trading-bot-platform attack-surface class. The two cases together establish that trading-bot platforms generate two distinct OAK-T11 / T9 attack surfaces: (a) the custodial-key-storage architectural anti-pattern (DEXX), and (b) the application-level information-leak class (Banana Gun). Defenders writing operator-cohort-attribution for the trading-bot-platform class should distinguish the two sub-patterns and evaluate platform selection against both surfaces.

The mis-attribution-to-user-side-phishing framing in DEXX's initial response is a structural pattern that recurs across operator-side initial responses to operator-infrastructure-compromise incidents; future OAK contributors writing custody-vendor-and-platform incidents should explicitly treat operator-side initial framing as a low-confidence input pending external-reattribution from industry-side cohort-graph analysis.

The pseudonymous-unattributed framing reflects v0.1 cutoff. Future industry forensic-cluster-attribution updates may produce stronger attribution for the cohort; the v0.1 OAK record is documented as `pseudonymous-unattributed` with attribution updates deferred.
