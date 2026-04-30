# OAK-M39 — Cross-Protocol Watcher Network

**Class:** detection
**Audience:** vendor, risk-team, protocol, designer
**Maps to Techniques:** OAK-T9.001, OAK-T9.002, OAK-T9.003, OAK-T9.004, OAK-T9.005, OAK-T10.001, OAK-T10.002, OAK-T10.003, OAK-T10.004, OAK-T10.005, OAK-T11.001, OAK-T11.002, OAK-T11.003, OAK-T8.001, OAK-T8.002

## Description

Cross-protocol watcher networks are real-time on-chain invariant-monitoring systems that observe transaction streams across multiple deployments simultaneously, evaluate protocol-specific and cross-protocol invariants on each new block, and trigger automated alerts or pre-authorised emergency-pause actions on detected anomalies. Canonical implementations include Forta Network (decentralised watcher network with bot-marketplace economics), OpenZeppelin Defender (centralised watcher-and-action automation), Hexagate (real-time threat-prevention platform), Hypernative (real-time on-chain risk-management platform), Cyvers (real-time fraud-detection platform), and BlockSec PhalconHQ (incident-response and pre-incident-detection platform).

The defensive principle is **detection-and-response shifted from post-incident forensic timescales to real-time block-by-block timescales**. The Ronin Bridge August 2024 rescue (`examples/2024-08-ronin-bridge-rescue.md`) demonstrates the upper bound of what watcher-and-action coordination can achieve: a misconfigured upgrade was detected and front-run by a whitehat MEV bot in approximately 80 minutes from misconfiguration to recovery, with the operator's pre-published recovery channel making the front-run-as-rescue outcome possible. Cross-protocol watcher networks generalise that capability to a broader set of detection-classes-and-protocols.

Distinguish from OAK-M03 continuous bytecode-diff monitoring (which is change-time monitoring of contract code) and from OAK-M06 mempool / pre-block telemetry (which is pre-inclusion observation of pending transactions): M39 is **runtime-invariant monitoring at block-confirmation time**, capturing exploit events that bytecode-diff and mempool monitoring miss. The three classes compose; bytecode-diff captures malicious upgrades, mempool monitoring captures sandwich-and-front-running, runtime-invariant monitoring captures the broad class of exploit events whose first observable signal is the post-confirmation state-change.

## How it applies

- **OAK-T9.x (Smart-Contract Exploit class).** Runtime-invariant monitoring detects T9.001 oracle manipulation (price-feed deviation alarms), T9.002 flash-loan-enabled extraction (large-flash-loan-followed-by-protocol-state-anomaly alarms), T9.003 governance attack (large-vote-accumulation-followed-by-proposal-execution alarms), T9.004 access-control misconfiguration (privileged-function-invocation-from-unexpected-address alarms), T9.005 reentrancy and arithmetic flaws (state-machine-invariant-violation alarms). Detection-to-action latency is the load-bearing performance variable.
- **OAK-T10.x (Bridge and Cross-Chain).** Cross-chain watcher coordination across both bridge endpoints captures T10.001 validator-key compromise (anomalous validator-set behaviour), T10.002 message-verification bypass (cross-chain message accepted without expected source-chain commitment), T10.003 cross-chain replay (duplicate-message-with-same-nonce alarms), T10.004 optimistic-bridge fraud-proof gap (long-pending-message-without-challenge alarms), T10.005 light-client verification bypass (cryptographic-soundness-proof-anomaly alarms).
- **OAK-T11.x (Custody-side compromise).** Watcher monitoring of custody-vendor-controlled wallets and authority-graph changes captures T11.001 / T11.002 / T11.003 anomalies (unexpected-destination withdrawals, unexpected-authority-graph changes, multisig-contract-modification events).
- **OAK-T8.001 / T8.002 (cluster-reuse and operator continuity).** Cross-protocol cluster-graph maintenance captures the operator-cohort-attribution surface across deployments; this is the canonical input substrate for OAK-G-attribution work and for OAK-M07 cross-chain-attribution-graph mitigation.

## Limitations

- **False-positive tuning.** Runtime-invariant monitoring requires per-protocol calibration; over-tight invariants produce noise that erodes operator response, over-loose invariants miss real events. The tuning is continuous as the protocol evolves.
- **Action-authority requirement.** Detection alone bounds nothing without authorised pause-or-rescue action; the watcher network composes with OAK-M34 pause-by-default and OAK-M35 whitehat-rescue-coordination. A protocol that runs watcher-monitoring but has no pre-authorised action authority cannot translate detection into mitigation faster than human-operator-response.
- **Coverage is per-protocol-deployment.** Watcher coverage of a deployment requires per-deployment integration; new deployments are uncovered until integration is complete.
- **Sophisticated operators target watcher-network blind spots.** Operators with high-quality OPSEC structure their attack chains to minimise detection-window observability (small-test-transactions to validate detection thresholds before main-extraction, splitting extraction across multiple addresses to defeat per-address velocity caps). Watcher tuning must adapt to this.
- **Cost-and-economic model.** Forta Network's decentralised bot economics and the centralised platforms' SaaS-pricing models trade off coverage breadth against cost; smaller protocols may not be able to afford comprehensive watcher coverage. Public-good watcher coverage at the L1 / L2 substrate level (Forta's permissionless bot deployment) partially addresses this.

## Reference implementations

- **Decentralised watcher networks.** Forta Network (permissionless bot deployment + scanner staking economics).
- **Centralised SaaS platforms.** OpenZeppelin Defender (Sentinels and Autotasks), Hexagate, Hypernative, Cyvers, BlockSec PhalconHQ. All five platforms support both detection-only and detection-and-pre-authorised-pause-action operating modes.
- **Protocol-specific in-house deployments.** Aave's risk-monitoring infrastructure, MakerDAO's emergency-shutdown system, Compound's pause-guardian framework. These are protocol-internal watcher implementations rather than third-party integrations.
- **Bridge-specific watcher coordination.** Watcher-network deployments at LayerZero, Wormhole, Stargate; multi-watcher-quorum coordination for cross-chain message verification.

## Citations

- `[hypernativeronin2024]` — Hypernative Ronin Bridge August 2024 writeup; documents the watcher-network role in the rescue outcome.
- `[blocksecronin2024]` — BlockSec Ronin Bridge August 2024 forensic analysis; complementary watcher-coordination case.
- `[chainalysis2024dprk]` — Chainalysis 2024 DPRK report; documents the operator-cohort-attribution context where cross-chain-attribution-graph (OAK-M07) and watcher-network (OAK-M39) mitigations compose.
- `[mandiantradiant2024]` — Mandiant Radiant Capital writeup; documents the custody-vendor-compromise context where watcher-network monitoring of authority-graph changes is the relevant detection surface.
- `[blocksecparaspace2023]` — BlockSec ParaSpace whitehat rescue 2023; canonical pre-exploit defensive-MEV case where watcher-and-action coordination produced a near-100% recovery outcome.
