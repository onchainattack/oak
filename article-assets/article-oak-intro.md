# Crypto Security Has a Vocabulary Problem. OAK Fixes It.

*There are 620+ documented on-chain attacks since 2010, totaling hundreds of billions in losses. Every investigator, vendor, and researcher describes them differently. We built OAK — the Onchain Attack Knowledge framework — to give crypto security a shared language.*

---

[IMAGE 1 — COVER]
**Prompt:** A striking dark-theme hero image for a cybersecurity framework article. Background: deep near-black `#0a0a0c` with a subtle gradient to dark navy `#101720`. Central element: a stylized matrix/grid of 17 interconnected nodes (representing the 17 Tactics), arranged in a kill-chain flow from left (Token Genesis) to right (Laundering/Operational Continuity). Nodes glow with teal `#00FFD1` (#00FFD1) accents. Attack-chain connector lines between nodes pulse with subtle red `#FF4D45` (#FF4D45) highlights. The overall composition should feel like a threat-intelligence dashboard — clean, technical, serious. Title text "OAK — Onchain Attack Knowledge" in large, clean sans-serif (white `#FFFFFF`). Subtitle "A Common Language for On-Chain Adversary Behavior" in smaller text below, in teal `#00FFD1`. No cartoonish elements, no crypto bro aesthetics. Aspect ratio 2.4:1, minimum 2400×1000px. Style reference: MITRE ATT&CK matrix visualizations, but darker, more modern, crypto-native.

---

## The Babel Problem

Ask three different security vendors whether they cover "the Bybit hack." One says yes — they monitor multisig contract manipulation. Another says yes — they track custody infrastructure compromise. A third says yes — they cover social-engineering of operator personnel. All three are right. None of them mean the same thing.

This is crypto security's Babel problem. Every investigator, detection vendor, and research team uses its own terminology to describe the same finite set of adversary behaviors. Coverage claims are not comparable across products. Academic findings rarely transfer cleanly to operational defense. And when a new exploit hits the timeline, the security community spends the first 48 hours arguing about what to call it before anyone starts discussing how to detect it.

OAK exists because crypto needs vocabulary built for crypto's threat model, not borrowed from elsewhere.

## What OAK Is

OAK — **Onchain Attack Knowledge** — is an open, vendor-neutral taxonomy of adversary behavior observed against on-chain assets. It is modeled on MITRE ATT&CK's structural shape (Tactics → Techniques → Sub-Techniques, per-item maturity levels, detection-oriented prose) but built from scratch for crypto's threat surface: public-ledger finality, anonymous adversaries, smart-contract code as the attack surface, money-and-laundering as the primary objective, and no patchable endpoints.

The framework is organized around 17 Tactics covering the full adversarial kill chain — from token genesis through laundering and operational continuity:

| Tactic | Phase |
|---|---|
| T1 — Token Genesis | Pre-launch / launch |
| T2 — Liquidity Establishment | Launch |
| T3 — Holder Capture | Launch / growth |
| T4 — Access Acquisition | Targeted compromise |
| T5 — Value Extraction | Realization |
| T6 — Defense Evasion | Cross-cutting |
| T7 — Laundering | Post-extraction |
| T8 — Operator Continuity | Post-extraction |
| T9 — Smart-Contract Exploit | Realization |
| T10 — Bridge / Cross-Chain | Targeted compromise |
| T11 — Custody / Signing | Targeted compromise |
| T12 — NFT-Specific | Realization |
| T13 — Account Abstraction | Targeted compromise |
| T14 — Validator / Staking | Targeted compromise |
| T15 — Off-chain Entry-Vector | Pre-positioning |
| T16 — Governance Manipulation | Realization |
| T17 — Market Manipulation | Realization |

Within each Tactic, specific Techniques carry stable identifiers (`OAK-Tn.NNN`). As of v0.1, OAK catalogs **144 Techniques** — each with observed indicators, detection signals, and vendor-neutral detection specs — plus **620+ worked examples** spanning 2010–2026, **43 mitigations**, **40 software/malware families**, and **19 threat actor profiles**.

[IMAGE 2 — 17 TACTICS KILL CHAIN DIAGRAM]
**Prompt:** A horizontal kill-chain diagram showing all 17 OAK Tactics in sequence. Background: `#0a0a0c` near-black. Layout: 17 rectangular nodes arranged in a flowing horizontal pipeline, grouped into 6 phase clusters (Pre-launch/Launch → Targeted Compromise → Realization → Post-extraction → Cross-cutting → Pre-positioning). Each node is a dark rounded rectangle with a teal `#00FFD1` top border (3px). Node labels: T1–T17 with short names (e.g., "T1 — Token Genesis", "T9 — Smart-Contract Exploit", "T7 — Laundering"). Phase cluster labels above in white `#FFFFFF` sans-serif. Connector arrows between nodes in dark gray `#2a2a3a` with subtle teal glow. The Realization phase (T5/T9/T12/T16/T17) should have a subtle red `#FF4D45` underline — these are where value is actually extracted. The Laundering and Post-extraction phases (T7/T8) should have an amber `#FFB347` accent — post-exploit activity. Clean, technical, presentation-ready. Aspect ratio 2:1, minimum 2400×1200px. This is the key explanatory diagram of the article — it should immediately communicate "there is a structure to on-chain attacks, and here it is."

## What Makes OAK Different

Five structural properties distinguish OAK from existing frameworks:

### 1. Built for Crypto's Threat Model

Traditional infosec frameworks assume patchable endpoints, enterprise networks, and perimeter defense. Crypto's threat surface is fundamentally different. The adversary is often anonymous. The attack surface is smart-contract code deployed to an immutable ledger. The objective is money-and-laundering — not data exfiltration or ransomware deployment. The "endpoint" is a wallet controlled by a private key, not a managed device.

OAK's Tactics, Techniques, and detection signals are designed for this threat model from the ground up. T4 (Access Acquisition) doesn't talk about phishing in general — it distinguishes between Permit2 signature phishing, WalletConnect session hijacking, push-notification infrastructure compromise, and address poisoning, because each is a structurally distinct on-chain entry vector. T7 (Laundering) is a first-class Tactic, not an afterthought, because laundering is part of the attack chain in crypto, not aftermath.

### 2. Detection-Oriented, Not Attacker-Oriented

Every OAK Technique describes what a defender, investigator, or risk team *observes* — not how an attacker *operates*. This is a deliberate design choice. Attacker-oriented taxonomies describe what the attacker does. Defender-oriented taxonomies describe what the defender sees. The gap between the two is where detection lives.

Each Technique carries a vendor-neutral YAML detection spec with orthogonal detection paths (PATH A / PATH B / PATH C), tunable parameters, test fixtures (positive and negative), and false-positive modes. The specs are language- and runtime-portable — implement them in Rust, Python, or SQL; run them on your own node, a hosted service, or a SIEM. The spec format is Sigma-shaped (YAML detection rules aligned to a taxonomy), which is a well-understood pattern in the broader detection-engineering community.

### 3. Stable Identifier System

`OAK-T11.011` means Multi-chain Key-store Co-location. `OAK-T9.006.005` means Platform-Override of Oracle Outcome. These identifiers are stable across schema versions — renaming or removing an ID triggers a formal deprecation window. This stability is what makes the framework usable as infrastructure:

- **Investigators** can attribute findings unambiguously: "This incident is T11.011 with T7.003 laundering."
- **Vendors** can publish honest coverage matrices: "Our detector covers T4.001–T4.006, T11.001–T11.003."
- **Risk teams** can specify procurement requirements: "We require coverage of T5.001 and T11.001."
- **Researchers** can cite a stable reference instead of redefining terms in every paper.

### 4. Attribution-Strength, Not Attribution-Conclusiveness

Every worked example in OAK carries an explicit attribution-strength label: `confirmed`, `inferred-strong`, `inferred-weak`, `pseudonymous`, or `unattributed`. This is different from most threat-intelligence frameworks, which either assert attribution or avoid it entirely. OAK's position is that attribution is a continuous variable, not a binary — and that honest reporting of uncertainty is better for defenders than false certainty or silence.

Of OAK's 620+ worked examples: 21.8% carry confirmed attribution, 10.9% inferred-strong, 0.3% inferred-weak, 44.6% pseudonymous (operator cluster identifiable, human operator not), and 22.4% unattributed. This distribution is itself a useful signal about the state of on-chain attribution.

### 5. Open and Vendor-Neutral

OAK is published under CC-BY-SA 4.0 (content) and MIT (tooling). It is not owned by a security vendor, a blockchain foundation, or a single company. The v0.1 release is single-maintainer with PR-based community contribution; co-maintainers are invited by v0.5. There is no paywall, no proprietary detector, no "enterprise tier." The machine-readable export (`oak.json`, schema v2) is in the public repo alongside the human-readable content.

## A Concrete Example

[IMAGE 3 — T11.011 ATTACK PATTERN DIAGRAM]
**Prompt:** A technical diagram illustrating the OAK-T11.011 (Multi-chain Key-store Co-location) attack pattern, using the Poloniex November 2023 incident as the concrete example. Background: `#0a0a0c`. Layout: three horizontal layers. Top layer: 4 chain icons (Ethereum, TRON, BTTC, others) with their respective loss amounts ($60M, $30M, $13M, $17M) in white text with red `#FF4D45` glow. Middle layer: a central "Co-located Signing Infrastructure" node — a single compromised key-store icon glowing red — connected to all 4 chains above via downward arrows. Bottom layer: a timeline bar showing the simultaneous extraction window (<1 hour) in teal `#00FFD1`. Right side: a detection panel showing the PATH_A pseudocode logic in a code block (dark `#101720` background, teal `#00FFD1` monospace text). The whole composition should communicate: "one key store, many chains, simultaneous extraction." Clean, forensic, explanatory. Aspect ratio 2:1, minimum 2400×1200px.

Consider the Poloniex November 2023 hack — $120M extracted simultaneously across ETH, TRX, BTTC, and other chains. Standard industry coverage described this as "a hot wallet compromise." But "hot wallet compromise" is underspecified — it doesn't tell a defender what to look for or a vendor what to cover.

In OAK, the incident is classified under **OAK-T11.011** (Multi-chain Key-store Co-location) — the architectural anti-pattern where signing key material for multiple chains is co-located in a shared infrastructure layer, such that a single compromise produces simultaneous extraction across all supported chains. The detection signal is simultaneous large outflows from exchange-labeled wallets across multiple chains within a short time window (<1 hour). The mitigation is per-chain key isolation.

This is more useful than "hot wallet compromise." It tells a defender what to monitor (cross-chain temporal clustering of outflows from exchange-labeled wallets), what to build (per-chain key isolation), and how to reason about the incident class (the 2023 Poloniex, 2023 HTX, 2024 Indodax, and 2025 Phemex incidents are all T11.011 events — the same structural failure at different exchanges).

The spec for T11.011 defines the detection logic as executable pseudocode:

```
exchange_wallets ← get_labelled_exchange_wallets()
for each exchange e in exchange_wallets:
    for each chain c where e has labelled wallets:
        outflows_c ← recent_outflows(e.wallets[c], window=1h)
    chains_with_outflows ← {c for c in e.chains if outflows_c.total > threshold}
    if len(chains_with_outflows) >= 2:
        outflow_times ← {c: earliest_outflow_time(outflows_c) for c in chains_with_outflows}
        time_spread ← max(outflow_times.values()) - min(outflow_times.values())
        if time_spread < 1h:
            emit(PATH_A, exchange=e, chains=chains_with_outflows,
                 total_extracted=sum(...), severity=critical)
```

This is portable. Implement it in your own monitoring infrastructure. Calibrate the parameters to your risk tolerance. The spec tells you what to build — it doesn't prescribe how to build it.

## The Numbers

OAK v0.1 ships with substance behind the structure:

[IMAGE 4 — FRAMEWORK STATISTICS DASHBOARD]
**Prompt:** A dark-theme data visualization dashboard showing OAK v0.1's key metrics. Background: `#0a0a0c`. Four primary metric cards arranged horizontally across the top, each with a large number in teal `#00FFD1` and a label in white `#FFFFFF`:
- Card 1: "144" → "Techniques" 
- Card 2: "620+" → "Worked Examples"
- Card 3: "17" → "Tactics"
- Card 4: "1,486" → "BibTeX Citations"

Below the metric cards: a horizontal bar chart showing "Examples by Year" (2010→2026), with bars in teal `#00FFD1` on dark `#101720` background, showing the explosive growth from ~4 examples in 2010 to 152 in 2024. A subtle red `#FF4D45` trend line overlays the bars showing the growth trajectory.

Right side: attribution-strength donut chart — 5 segments (pseudonymous 44.6%, unattributed 22.4%, confirmed 21.8%, inferred-strong 10.9%, inferred-weak 0.3%) in a 5-color palette based on teal-to-red spectrum. The overall composition should feel like a threat-intelligence platform's executive dashboard — clean, data-dense, credible. Aspect ratio 2.4:1, minimum 2400×1000px.

- **620+ worked examples** spanning 2010–2026, from the 2010 Bitcoin value overflow bug (block 74638) to the May 2026 LABtrade multi-vector insider extraction. Each example carries dollar-loss, technique mapping, attribution strength, key teaching points, and public references.
- **144 Techniques** across 17 Tactics, from T1.001 (Modifiable Tax Function) to T17.005 (Multi-Block MEV TWAP Oracle Manipulation).
- **144 detection specs** — 100% coverage. Every Technique has a vendor-neutral YAML spec with detection pseudocode.
- **1,486 BibTeX entries** — academic papers, vendor post-mortems, on-chain traces, enforcement actions.
- **43 mitigations** classed as detection, architecture, operational, venue, wallet-UX, and financial-recovery.
- **19 threat actor profiles** with explicit attribution-strength language (Lazarus Group, drainer-as-a-service ecosystem, DPRK IT-worker scheme, ransomware operators, Iranian financially-motivated actors).

## Who OAK Is For

**Investigators.** Stop writing "the attacker used a sophisticated multi-stage compromise." Write "the attacker used T4.011 (Push-Notification Infrastructure Compromise) chained into T11.002 (Wallet-Software Distribution Compromise) with T4.004 extraction." Your readers can look up exactly what you mean.

**Detection vendors.** Publish an honest coverage matrix: "We cover T4.001–T4.006, T5.001–T5.004, and T11.001–T11.003 at full confidence; T9.001–T9.004 at partial." Your customers can compare your coverage against competitors without asking you to explain your terminology.

**Protocol teams.** Threat-model against OAK Techniques before launch. Which T1–T8 Techniques is your token susceptible to? Which T9 Techniques apply to your contract architecture? Which T10 Techniques apply to your bridge? The matrix is a checklist, not a menu.

**Researchers.** Cite stable OAK identifiers instead of redefining "oracle manipulation" in every paper. The BibTeX file is in the repo. The identifiers won't change. Your citations will remain resolvable.

**AI tools.** The `oak-mcp` package connects LLMs and AI coding agents directly to the OAK knowledge base. Agents can query techniques, look up worked examples, and reason about attack chains using stable identifiers. The taxonomy gives AI a structured vocabulary for on-chain security reasoning.

[IMAGE 5 — OAK-MCP INTEGRATION ARCHITECTURE]
**Prompt:** A clean architecture diagram showing how AI tools connect to OAK via the MCP (Model Context Protocol) server. Background: `#0a0a0c`. Layout: three columns connected by horizontal arrows.
- Left column: "AI Tools" — icons for Claude, Cursor, Windsurf, general LLM agents. White `#FFFFFF` labels.
- Middle column: "oak-mcp" — a central server node in teal `#00FFD1` glow, with 4 sub-nodes: "Query Techniques", "Lookup Examples", "Resolve IDs", "Cross-reference Actors/Software/Mitigations". Dark `#101720` background for each sub-node.
- Right column: "OAK Knowledge Base" — a database icon with the OAK logo mark, showing the 6 axes: Techniques (144), Examples (620+), Mitigations (43), Actors (19), Software (40), Data Sources (12). Numbers in teal `#00FFD1`.

Connector arrows: "MCP Protocol" label on the left→middle arrow, "Structured Queries" label on the middle→right arrow. Both in gray `#2a2a3a` with teal arrowheads.
Bottom caption: "AI agents ground crypto-attack reasoning in stable taxonomy identifiers instead of stale training data." in white `#FFFFFF` sans-serif, small.
Clean, architectural, no clutter. Aspect ratio 2:1, minimum 2400×1200px.

## The Gaps We Documented Honestly

A framework that quietly excludes large attack classes invites legitimate criticism. OAK's [TAXONOMY-GAPS.md](https://github.com/onchainattack/oak/blob/main/TAXONOMY-GAPS.md) documents exactly what v0.1 doesn't cover and why:

- **Chain coverage.** EVM and Solana are well-covered. Bitcoin Ordinals/BRC-20/Runes, Cosmos beyond bridge cases, TON, and Polkadot are not yet covered.
- **Timing dimension.** When in a token's lifetime does each Technique typically fire? Recoverable from the data but not yet encoded.
- **Severity/loss scaling.** No formal severity bands yet — Ronin ($625M) and a per-victim drainer event (~$1K) sit in the same matrix.
- **Detection-test corpus.** The cited datasets collectively contain enough labeled examples to build an evaluation harness. This is the highest-leverage post-v0.1 work item.

These are documented not as excuses but as contribution targets. If you want to contribute to OAK, TAXONOMY-GAPS.md tells you exactly where the work is.

## How to Use OAK Today

1. **Browse the matrix.** Start at [README.md](https://github.com/onchainattack/oak) and navigate the 17 Tactics.
2. **Read the detection specs.** [SPECS.md](https://github.com/onchainattack/oak/blob/main/SPECS.md) indexes all 144 specs with maturity levels and links.
3. **Study worked examples.** The [examples/](https://github.com/onchainattack/oak/tree/main/examples) directory is 620+ incidents deep — find the ones relevant to your threat model.
4. **Cite OAK in your work.** The BibTeX file is at `citations.bib`. Identifiers are stable.
5. **Contribute.** PRs are open. TAXONOMY-GAPS.md tells you what's needed. CONTRIBUTING.md tells you how.

## What's Next

OAK v0.1 is a foundation. The v0.x roadmap includes:

- Multi-vendor coverage matrix: map every commercial detector against every Technique
- Detection-test corpus: an evaluation harness built from the labeled datasets in the citation set
- STIX 2.1 integration: the export exists (`oak-stix.json`, 601 SDOs/SROs); onward TIP/SIEM integration is the next step
- Chain expansion: Bitcoin, Cosmos, TON, Polkadot
- Campaigns axis: multi-incident threads as a first-class object class

The framework is open. The identifiers are stable. The specs are portable. The gaps are documented.

If you build on-chain security tooling — use it. If you investigate on-chain incidents — cite it. If you research on-chain attacks — contribute to it. Crypto security needs a common language. OAK is one.

---

*OAK is open-source at [github.com/onchainattack/oak](https://github.com/onchainattack/oak). Content under CC-BY-SA 4.0, tooling under MIT. Maintained by [@iZonex](https://github.com/iZonex) and community contributors.*
