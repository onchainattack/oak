# OAK-T14 — Validator / Staking / Restaking Attacks

**Phase:** Realization (consensus and staking-infrastructure layer)
**Adjacent tactics:** T10 (Bridge and Cross-Chain — adjacent because bridge validator-set compromises share the "compromised consensus participant" predicate but apply to bridge-specific validator sets, not to the underlying chain's staking layer), T9 (Smart-Contract Exploit — adjacent because liquid-staking-derivative contracts and restaking-protocol contracts can also fail at the application-correctness layer), T11 (Custody and Signing Infrastructure — adjacent because validator-key custody compromise extends T11-class signing-pipeline failures into the consensus role)

## Scope

Validator / Staking / Restaking Attacks covers attack classes specific to the consensus-or-staking-layer infrastructure of the underlying chain — slashing-condition exploits against the chain's own slashing rules, MEV-boost relay and proposer-builder-separation (PBS) attacks against the block-production pipeline, restaking-protocol cascading risks (EigenLayer-style operator-set and AVS-shared-security failures), liquid-staking-derivative (LSD) attacks, and direct attacks against the validator set of a proof-of-stake chain. The detection signals live at the consensus-layer telemetry surface (slashing events, attestation patterns, relay logs, withdrawal-credential changes, AVS operator-set events) rather than at the application-contract surface.

T14 in v0.1 is intentionally narrow at three Techniques because validator-and-staking-layer attacks are **emerging**. Most of the attack surface in v0.1 is theoretical, limited-scope, or known only through audit-firm advisories, protocol bug-bounty disclosures, and the academic taxonomy companion `[zhou2023sok]` rather than through a deep cohort of canonical headline incidents at the dollar-loss scale of T9 / T10 / T11. The MEV-boost equivocation / PBS reward-design class is the most concretely documented attack family at v0.1 freeze, with restaking cascading-risk patterns documented primarily as theoretical operator-set-failure analyses against EigenLayer-class architectures. Coverage is expected to grow substantially as the restaking ecosystem matures and as PoS-chain incidents accumulate.

T14 is **distinct from T10** even though both involve compromised consensus participants. T10 covers attacks against **bridge-specific** validator sets — the small, bridge-operated multisig / MPC / threshold committees that authorise cross-chain message passing. T14 covers attacks against the **underlying chain's own** staking layer — the chain-level validator set that produces blocks and finalises consensus, plus the protocols layered on top of it (MEV-boost / relays, restaking protocols, liquid-staking derivatives). A Ronin or Harmony Horizon validator-key compromise stays in T10 because the compromised set is a bridge committee. An Ethereum validator slashed for double-signing under attacker control, an MEV-boost relay equivocation pattern, or an EigenLayer operator-set cascading slash belongs in T14.

T14 is **distinct from T9** because the failure mode is structural to consensus-or-staking primitives (slashing-condition design, PBS reward asymmetry, restaking shared-security-budget allocation) rather than to a single application contract's correctness. A liquid-staking-derivative oracle-manipulation exploit that prices stETH against ETH using a manipulable spot-pool stays in T9.001 (oracle manipulation against a lending protocol that happens to take an LSD as collateral). A restaking-protocol AVS whose slashing module reads a manipulable price feed and produces unintended cascading slashes against operators belongs in T14.003 because the failure mode is structural to the restaking shared-security model.

T14 is **distinct from T11** at the asset-authority layer. T11 covers off-chain custody-and-signing-pipeline compromise that produces extraction events from custodial wallets. A validator-key custody compromise that authorises double-signing or attestations-against-the-rules is T14-resident even though the root cause is signing-pipeline compromise, because the on-chain artefact (slashing event, finality violation, withdrawal-credential redirection) and the mitigation surface (validator-client architecture, slashing-protection databases, distributed-validator-technology operator splits) are consensus-layer-specific and do not appear in T11.

## What defenders observe

- Slashing events on a PoS chain whose slashing-protection-database state, attestation history, or withdrawal-credential timing indicates either a validator-client bug, a misconfigured key-rotation, or attacker-controlled signing — the T14.001 signature surface.
- Validator clusters that share funder ancestry, hosting-provider footprint, or withdrawal-credential reuse and that produce coordinated slashable behaviour — a cohort-level T14.001 signal.
- MEV-boost relay logs (or absence of them) showing a builder-submitted block whose content was extracted by the proposer and subsequently published with the proposer-built-version overriding the relay-version — the equivocation / PBS-reward-design signature documented under T14.002.
- Race-condition and unblinding-flow anomalies in the relay-builder-proposer pipeline, including cases where the proposer obtains the builder payload but does not honour the relay-promised payment path — also T14.002.
- Restaking-protocol operator-set events whose AVS opt-in pattern concentrates a single operator's stake across many AVSs whose slashing conditions are correlated, producing a cascading-slash exposure that the operator's nominal stake does not cover — the T14.003 signature against EigenLayer-class architectures.
- Liquid-staking-derivative depeg events whose root cause is a withdrawal-queue exhaustion, a redemption-pause governance action, or an oracle-feed lag, rather than an underlying-asset price move — typically a v0.x-target T14 surface (see Maintainer notes).
- AVS slashing-rule deployments whose specification permits unintended slash conditions (e.g., overly broad equivocation checks, ambiguous liveness predicates) and whose subsequent invocations produce slashes inconsistent with the operator's intended behaviour.

## Relationship to other tactics

T14 events typically chain into T7 (Laundering) when the attacker realises value from the consensus-layer compromise — extracted MEV, drained operator-bond proceeds, or LSD-arbitrage profits follow the same downstream rails as any other on-chain theft, and T7.003 (Cross-Chain Bridge Laundering) remains the dominant rail at sufficient cohort volume.

The boundary against T10 is the validator-set scope: if the compromised set authorises cross-chain message passing for a bridge, the case is T10 regardless of whether the validators happen to be EigenLayer operators or restaked-ETH-secured. If the compromised set produces blocks or attestations on the underlying chain, or participates in the chain's MEV-boost / PBS pipeline, or operates as a restaking AVS whose failure cascades into the chain's staking layer, the case is T14. A bridge that pays for its security via restaking is a hybrid case — the restaking-cascade failure is T14, the bridge-specific validator-set compromise that follows from the cascade is T10, and the per-Technique pages cross-reference both.

The boundary against T9 is the failure-mode scope: structural failures in the consensus-or-staking primitive belong in T14; application-contract-correctness failures in protocols that happen to interact with staking belong in T9. An LSD contract with a reentrancy bug stays in T9. An LSD whose redemption queue is exhausted because of a structural restaking cascade belongs in T14.003.

## Techniques in this Tactic (v0.1)

- OAK-T14.001 — Slashing-Condition Exploit
- OAK-T14.002 — MEV-Boost Relay Attack
- OAK-T14.003 — Restaking Cascading Risk

## Maintainer notes

T14 in v0.1 is the OAK response to the v0.x roadmap observation that the consensus-or-staking-layer attack surface — distinct from bridge validator sets (T10), from application-contract correctness (T9), and from off-chain custody-pipeline compromise (T11) — has matured to the point where it warrants a first-class Tactic, even though the public forensic record is still thin relative to T9 / T10 / T11. Promoting these patterns now (rather than waiting for a Bybit-class headline restaking incident) preserves clean Tactic boundaries and lets the per-Technique pages anchor on `[zhou2023sok]`, on protocol-specific bug-bounty disclosures, and on the MEV-boost / PBS attack-research record as it develops.

Patterns explicitly out of scope for v0.1 and targeted for v0.x updates:

- Liquid-staking-derivative depeg-and-cascade patterns (stETH-class redemption-queue exhaustion, withdrawal-pause governance failures, LSD-collateral lending-protocol cascades) — likely promoted to a standalone T14.004 once a clean boundary against T9.001 (oracle manipulation) and T14.003 (restaking cascade) can be drawn.
- Long-range attacks, weak-subjectivity-window attacks, and validator-set-takeover patterns against smaller PoS chains (Cosmos-SDK chain validator-set capture, Tendermint-class halt-and-fork patterns) — currently insufficient public incident record for a clean Technique.
- Distributed-validator-technology (DVT) operator-collusion patterns (Obol, SSV-class operator-cluster compromise) — overlaps with T11 signing-pipeline compromise and with T14.001; needs a clean boundary before promotion.
- Proposer-builder-separation patterns beyond the equivocation / reward-design class documented under T14.002 (private-orderflow auction collusion, builder-relay integration patterns, censorship-via-relay-selection) — partially overlapping with the bundler-MEV pattern under T13.002 but consensus-layer-specific.
- Solana validator-and-stake-pool analogues (vote-account compromise, stake-pool manager compromise, Jito-relayer-class MEV pipeline attacks) — T14 v0.1 is EVM / Ethereum-anchored; Solana analogues are targeted for v0.x once the public forensic record matures.

Liquidity-provider or staker loss-of-funds via legitimate protocol pause / wind-down is a risk class but not an attack class, and is intentionally out of scope for OAK (mirroring the T10 maintainer note on bridge pause / wind-down).

Contributors proposing additions to T14 should preserve the boundary rules above: T14 is for attacks whose detection signal or mitigation surface is structurally tied to a consensus-or-staking-layer primitive of the underlying chain (or to a protocol — restaking, MEV-boost, LSD — that layers directly on top of that primitive). Bridge-specific validator-set compromise stays in T10. Application-contract-correctness failures in staking-adjacent protocols stay in T9. Off-chain validator-key custody compromise whose on-chain artefact is a consensus-layer event (slashing, finality violation) is T14-resident; off-chain signing-pipeline compromise whose on-chain artefact is a custodial-wallet extraction stays in T11.
