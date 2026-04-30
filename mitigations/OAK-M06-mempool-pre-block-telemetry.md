# OAK-M06 — Mempool / Pre-Block Telemetry

**Class:** detection
**Audience:** vendor, trader, protocol

**Maps to Techniques:** OAK-T5.004, OAK-T13.002, OAK-T14.002

## Description

Mempool / Pre-Block Telemetry is the discipline of observing pending transactions — public mempool, alt-mempools (ERC-4337 UserOperation pools), private builder / relay flows where access is granted, and where applicable the bundler / relay bid stream — *before* inclusion, and producing detection signals against MEV-class adversarial behaviour: sandwich pairs targeting an in-flight victim swap, front-running of oracle updates and liquidations, bundler-internal reordering of aggregated user operations, and relay-side equivocation between proposer and builder. The output is per-transaction telemetry (estimated MEV exposure, sandwich-pair correlation, proximate adversarial-bundle detection) that downstream consumers (wallets, dApps, risk engines) can act on — by routing the transaction through MEV-protected channels, by warning the user, by adjusting slippage tolerance, or by aborting the operation entirely.

The defensive principle is that for a class of attacks the *only* time the defence is meaningful is *before* inclusion: once the sandwich pair lands in a block, the value is already extracted; once the bundler re-orders the bundle, the user's intent has already been overridden. Detection that runs over confirmed-block data is forensic, not preventative. Mempool / pre-block telemetry pushes detection upstream of inclusion, where the transaction can still be cancelled, re-routed, or rejected by the consuming application.

The mitigation has three deployment surfaces with different access economics: (1) public-mempool observation (cheap, broadly available, but a shrinking fraction of MEV-relevant flow as private builder usage grows); (2) private-builder access (commercial relationships with Flashbots, bloXroute, Eden, or equivalent, with attendant trust assumptions); (3) bundler / relay introspection (for ERC-4337 paymaster operators and for staking operators, observing one's own bundler / relay pool as a privileged inspector). Comprehensive coverage requires multiple surfaces because the adversary is incentivised to migrate flow to whichever surface the defender is *not* watching.

## How it applies

- **OAK-T5.004 (Sandwich MEV Extraction):** mempool observation surfaces the attacker's front-leg transaction *before* the victim's swap is included; consumer wallets and dApps receiving this telemetry can route the swap through a private channel (Flashbots Protect, MEV Blocker, CowSwap), tighten slippage to make the sandwich unprofitable, or warn the user explicitly. Without the pre-block telemetry, the only available action is post-confirmation forensic accounting.
- **OAK-T13.002 (Bundler MEV):** alt-mempool observation of pending UserOperations exposes bundler-side reordering and bundle-internal MEV extraction; paymaster operators with privileged bundler-pool access can audit the bundler's behaviour against published policy and detect reordering in real time. Wallet vendors integrating with multiple bundler endpoints can use the telemetry to rank bundlers by observed MEV-extraction rate.
- **OAK-T14.002 (MEV-Boost Relay Attack):** relay-side telemetry — when accessible to staking operators or research consortia — surfaces equivocation between proposer-signed bid and builder-published block (the canonical T14.002 signal), unlock-before-publication race conditions, and bid-stream exfiltration patterns. Public mempool telemetry alone is insufficient for T14.002 (the relevant flow is on the relay side, not the public mempool); the mitigation here depends on relay-published telemetry feeds and on independent monitoring infrastructure (Aestus telemetry, MEV-Watch, equivalent dashboards).

## Limitations

Pre-block telemetry is being structurally undermined by the migration of MEV-sensitive flow to private channels: a sandwich attack arranged entirely inside a single private builder's flow is invisible to public-mempool observers. Defending against the residual surface (public mempool plus private channels the defender has access to) is a moving target as the private-channel landscape evolves. False-positive volume on pure-public-mempool sandwich detection is high — many transaction-pair patterns look sandwich-shaped without actually being adversarial — and triage discipline is required to avoid alert fatigue. For ERC-4337, alt-mempool fragmentation (different bundlers maintaining different pools) means no single observation point sees the full UserOperation flow, and inferring bundler-internal reordering requires either bundler cooperation or per-bundler probabilistic modelling. For T14.002, relay-side observation is gated on the relay's willingness to publish telemetry; censoring or vertically-integrated relays are precisely the relays that have the strongest incentive *not* to publish, which makes the observability surface adversarially-shaped. Threshold-encrypted bid streams (a research direction at v0.1) would fix the bundler / relay layer's exfiltration surface but would also reduce defender-side telemetry to the same encrypted opacity, requiring different detection primitives.

## Reference implementations

- Flashbots Protect / MEV Blocker / CowSwap — consumer-facing private-channel routing; OAK-M06 telemetry is upstream of these, providing the signal that triggers the route.
- Blocknative Mempool API — commercial public-mempool data with sandwich / front-running detector overlays; one of the canonical commercial deployments.
- bloXroute, Chainstack, Alchemy mempool feeds — equivalent commercial offerings with overlapping coverage.
- Eigenphi, Flashbots `mev-inspect` — open-source post-block MEV labelling; complementary to pre-block telemetry, useful for ground-truth calibration.
- MEV-Boost Relay public dashboards (Aestus, Ultra Sound Relay, Agnostic Relay) — relay-side telemetry feeds suitable for T14.002 observability; the diversity-and-non-censorship cohort the T14.002 mitigation guidance recommends.
- MEV-Watch — public dashboard tracking censoring vs non-censoring relays; consumer-side surface for relay-selection decisions.
- ERC-4337 alt-mempool observers (per-bundler P2P participation, paymaster-side UserOp inspection) — bundler-level telemetry; not yet standardised tooling at v0.1.
- `mg-detectors-rs` — pre-block sandwich and front-running detectors over Solana mempool-equivalent (Solana's leader-rotation pre-confirmation surface) is a v0.1 in-scope capability; EVM mempool extension planned.

## Citations

- `[eigenphijared2023]` — Eigenphi-style MEV measurement; reference for ground-truth calibration of OAK-M06 detectors.
- `[etherspot2023bundlermev]` — bundler-MEV documentation in the ERC-4337 stack; canonical T13.002 surface.
- `[fastlane2024erc4337mev]` — Fastlane-side analysis of ERC-4337 MEV in the wild; relevant to T13.002 detector calibration.
- `[blockpi2023bundlermempool]` — alt-mempool architecture context for ERC-4337.
- `[eigenphi2023aamev]` — Eigenphi AA-MEV measurement; pre-block telemetry calibration source.
- `[flashbotsmevboost2023]` — Flashbots' own retrospective on MEV-Boost design surfaces; relevant to T14.002 relay-attack characterisation.
- `[flashbotsequivocation2023]` — proposer-builder equivocation signal documentation; the canonical T14.002 detection target.
- `[bloxroutemevboost2023]` — bloXroute-side MEV-Boost relay analysis; complementary to Flashbots-side documentation.
- `[blocksecmevboost2023]` — BlockSec-side technical analysis of MEV-Boost relay attack surfaces.
- `[mevwatch2024]` — MEV-Watch dashboard; consumer-facing relay-selection surface that OAK-M06 telemetry feeds.
- `[paradigmpbstime2023]` — Paradigm's PBS-time analysis; structural context for why pre-block telemetry is the right detection layer for T14.002.
- `[dojmevbros2024]` — DoJ MEV-Bros indictment; legal-side validation that pre-block sandwich-and-extract is treated as adversarial behaviour by enforcement.
