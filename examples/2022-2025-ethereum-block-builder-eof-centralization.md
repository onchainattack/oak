# Ethereum Block Builder Exclusive Order-Flow Centralization and Censorship — 2022–2025

**Loss:** structural — the concentration of block building among a small number of builders with exclusive order flow (EOF) arrangements creates a centralization surface where the top-2 builders (Titan, Builder0x69/beaverbuild) regularly control 50%+ of blocks in certain periods. The centralization risk is multi-dimensional: (a) builder-level censorship — builders can exclude transactions from sanctioned addresses or competing MEV extractors, (b) builder-cartel formation — a small builder set could coordinate to reduce proposer payments, (c) EOF-as-barrier-to-entry — new builders cannot compete without their own exclusive order flow, entrenching incumbent builders, and (d) relay-dependency compounding — when the builder set is concentrated, the relay set's censorship surface (T14.002) compounds with the builder set's censorship surface (T14.005).
**OAK Techniques observed:** **OAK-T14.005** (Builder/Relay Collusion / Censorship for MEV Extraction — builder centralization through exclusive order flow is the canonical T14.005 structural sub-pattern: the builder's exclusive access to searcher order flow creates a self-reinforcing centralization dynamic that concentrates block-building power.) **OAK-T14.002** (MEV-Boost Relay Censorship / Manipulation — structurally adjacent; builder centralization compounds with relay centralization; a concentrated builder+relay set could jointly censor transactions or extract MEV at the proposer's expense.)
**Attribution:** **unattributed** — no attributed attacker. The builder centralization is a market-structure outcome of MEV-Boost's architecture and the economics of exclusive order flow; specific builders (Titan, Builder0x69/beaverbuild, rsync, Flashbots) are known entities.

**Key teaching point:** **Exclusive order flow (EOF) is the engine of builder centralization in post-Merge Ethereum.** Builders who secure exclusive agreements with searchers (MEV extractors) receive order flow that is not visible to other builders, giving them a structural advantage in block construction because they can extract MEV that competing builders cannot see. This creates a self-reinforcing cycle: (1) builder with best EOF wins more blocks → (2) winning builder earns higher proposer payments → (3) higher proposer payments attract more proposers to that builder's relay → (4) larger proposer share attracts more searchers to the builder's EOF agreements → (5) return to step 1. The resulting builder concentration — top-2 builders controlling 50%+ of blocks — creates a censorship and MEV-extraction surface that scales with the concentration ratio. The structural T14.005 lesson is that **EOF agreements convert a competitive block-building market into a natural oligopoly**, and any oligopoly-level coordination or compromise concentrates T14.005 risk at the top-2 builders.

## Summary

Post-Merge Ethereum block production operates through the MEV-Boost pipeline: searchers identify MEV opportunities → builders construct blocks that extract MEV → relays forward blocks from builders to proposers → proposers select the highest-value block. Within this pipeline, the builder layer has concentrated significantly since the Merge:

1. **Builder concentration metrics.** In various periods during 2023–2025, the top-2 builders (Titan, Builder0x69/beaverbuild) have controlled 50-70% of blocks in some monitoring windows. The top-5 builders typically control 80-90% of blocks. This concentration is higher than the proposer (validator) concentration and reflects the economics of exclusive order flow rather than capital-scale barriers.

2. **Exclusive order flow as the concentration driver.** EOF agreements — where a searcher routes their transaction flow exclusively to a specific builder — create an information asymmetry: the builder with EOF access sees MEV opportunities that other builders cannot see. The builder constructs more profitable blocks and wins more proposals. The searcher benefits from the builder's ability to land transactions reliably and from the builder's willingness to share MEV profits through the EOF agreement. The agreement is mutually beneficial for the searcher and builder but anti-competitive for the broader builder market.

3. **Self-reinforcing centralization.** Winning builders earn higher profits, which they can reinvest in proposer payments (attracting more proposers) and searcher relationships (securing more EOF). New entrants cannot compete because they lack EOF — without exclusive order flow, a new builder cannot construct blocks that are competitive with the incumbent builders' blocks. The result is a natural-oligopoly dynamic where the builder set stabilises at a small number of well-capitalised incumbents with entrenched EOF relationships.

4. **Censorship surface.** Concentrated builders have the practical ability to censor transactions from their blocks. While OFAC-compliance censorship (excluding sanctioned addresses) is the most documented form (see Tornado Cash OFAC builder censorship example), the censorship surface is broader: builders can exclude competing searchers' transactions, transactions that would capture MEV the builder wants for itself, or transactions from disfavoured protocols. Builder-level censorship is harder to detect than relay-level censorship because the builder's block-construction process is private.

5. **Builder-relay compounding.** When builder concentration compounds with relay concentration, the censorship and MEV-extraction surface magnifies: a dominant builder operating through a dominant relay can censor transactions or extract MEV at a scale that neither could achieve independently. The Flashbots relay sunset (2023–2024) was partially motivated by the desire to break this builder-relay compounding by encouraging a multi-relay ecosystem.

The builder centralization surface is structurally distinct from the relay-operator trust surface (T14.002) and the OFAC-compliance censorship surface (T14.005's existing coverage). The relay trust surface is about a trusted intermediary seeing block contents; the builder centralization surface is about the *market structure* that concentrates block-construction power. The T14.005 risk scales with the builder concentration ratio: the more concentrated the builder set, the more damage a single-builder compromise or cartel formation would cause.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-09 | Ethereum Merge; MEV-Boost block production begins; builder market initially competitive (15+ builders) | T14.005 (surface creation) |
| 2023-Q1–Q2 | Builder concentration accelerates; Titan and Builder0x69 emerge as dominant builders via EOF agreements | T14.005 (concentration trend) |
| 2023-Q4 | Flashbots announces builder-products sunset; Titan and Builder0x69 collectively control ~50-60% of blocks | T14.005 |
| 2024 | Builder concentration documented in Ethereum Foundation and community research; EOF-as-barrier-to-entry identified as structural driver | T14.005 |
| 2024–2025 | Regulatory pressure on OFAC-compliant builders increases; builder concentration remains high; new builder entrants attempt to compete via improved proposer payments rather than EOF | T14.005 |
| Continuing | Builder centralization persists through v0.1; EOF-driven oligopoly dynamics remain structurally open | T14.005 (structurally open) |

## Public references

- MEV-Boost builder market analytics (mevboost.pics, Relayscan, libMEV, EigenPhi)
- Ethereum Foundation builder-centralization research (Toni Wahrstätter, Justin Drake, Mike Neuder et al.)
- Flashbots builder market reports and relay sunset documentation (2023–2024)
- Exclusive order flow research: "The Cost of Exclusive Order Flow" and related Ethereum R&D literature
- See `techniques/T14.005-builder-censorship-mev-extraction.md` for Technique definition

## Discussion

The builder centralization surface extends T14.005 beyond the OFAC-compliance censorship cases already documented in the T14 corpus. While those cases focus on *censorship policy* (builders choosing to exclude sanctioned addresses), the builder-centralization surface focuses on the *market structure* that makes censorship possible: a concentrated builder set reduces the number of entities that must be compromised, coordinated, or coerced to achieve censorship at scale. The structural T14.005 risk is not that a builder *currently* censors certain transactions, but that a builder *could* — and the more concentrated the builder set, the fewer builders would need to collude.

The EOF-driven centralization dynamic is a T14.005 sub-pattern distinct from other T14 surfaces. It is not an exploit (T14.001), a relay trust failure (T14.002), a depeg cascade (T14.003), a pricing manipulation (T14.004), or a liveness-fault griefing (T14.006). It is a **market-structure property** that creates standing T14.005 risk proportional to the builder concentration ratio. The load-bearing mitigation — enshrined PBS with protocol-enforced proposer-builder separation that eliminates the EOF advantage — is the same mitigation that would close the relay trust surface (T14.002), making the PBS roadmap the most consequential T14 mitigation at the Ethereum protocol layer.
