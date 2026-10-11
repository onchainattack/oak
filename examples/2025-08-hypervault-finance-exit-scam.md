# Hypervault Finance exit scam via fake-audit-claims — Hyperliquid / Ethereum — 2025-09-25

**Loss:** **\$3.6 million** per PeckShield/The Block (2025-09-26), or **\$4.64 million** per rekt (1,126.72 ETH bridged via deBridge to two Ethereum addresses). DefiLlama showed \$4.97M TVL on 2025-09-24 (the project's own claimed TVL reached \$5.8M, which rekt calls likely inflated). PeckShield/The Block reported ~752 ETH (~\$3M) deposited into Tornado Cash; rekt reports most of the 1,126 ETH went into Tornado Cash over 3-4 days.

**OAK Techniques observed:** **OAK-T6.002** (Fake Audit-Claim — primary; the project claimed audits underway with Spearbit, Pashov, and Code4rena; Pashov publicly denied any knowledge of Hypervault, and Code4rena listed no pending audits for the protocol) + **OAK-T6.004** (Audit-Pending Marketing Claim — the "audits underway" framing was a forward-looking pending-audit claim with no engagement artefact at any named firm; Pashov's public denial and Code4rena's zero-record confirmation are the canonical PATH_B detection signal per the T6.004 spec) + **OAK-T2.001** (Single-Sided Liquidity Plant — the Hypervault auto-compounding vaults were structurally operator-controlled deposit traps from deployment; the vaults collected roughly \$5M in user-deposited assets with the operator retaining unilateral withdrawal authority through the vault contracts; the "auto-compounding" branding and fake audit claims were the trust substrate that drove deposit velocity into the operator-controlled deposit surface) + **OAK-T5.001** (Hard LP Drain — the operator collected user deposits into vaults they controlled, then drained the pooled funds and disappeared) + **OAK-T7.001** (Mixer-Routed Hop — ~752 ETH (PeckShield; rekt reports most of 1,126 ETH) routed through Tornado Cash after bridging from Hyperliquid to Ethereum) + **OAK-T6.001** (Source-Verification Mismatch — the platform presented as a legitimate, audited DeFi protocol; the claimed audit affiliations were fabricated).

**Attribution:** **pseudonymous** — the Hypervault team operated under completely unknown identities. The website, X account (@hypervaultfi), and Discord were all deleted simultaneously at the exit moment. No named individuals have been publicly linked to the operation at v0.1.

**Key teaching point:** Hypervault is the 2025 anchor for the **fake-audit-claim-as-rug-pull-entry-vector** sub-pattern. The operator did not need to exploit a smart-contract vulnerability or bypass a security control — they fabricated audit affiliations with three recognised firms, used those claims to establish depositor trust, collected deposits into operator-controlled vaults over a sustained window, then deleted all surfaces and routed the funds through Tornado Cash. The structural lesson is that **any DeFi vault platform whose audit claims cannot be independently verified at the named firm's audit registry is T6.002-exposed by construction** — the depositor's verification burden is one registry lookup, but the UX layer that mediates that lookup is not yet standardised across wallet and aggregator surfaces.

**Corrected 2026-10-11:** Date moved from August to 2025-09-25/26; loss given as both \$3.6M (PeckShield/The Block) and \$4.64M (rekt, 1,126.72 ETH via deBridge) against \$4.97M TVL on 09-24 (not \$5.91M); Zenith audit timeline added; unsupported depositor count removed; citation keys mapped to defined references.

## Summary

Hypervault Finance launched on Hyperliquid in mid-2025 as an "unmanaged" auto-compounding vault system, promising annual yields of up to 76% on stablecoins and 95% for HYPE liquidity pools. The platform marketed itself as a long-term project, sharing plans to lower yields for sustainability and to launch a native token later in the year. Developers claimed an audit was underway with well-known security firms Spearbit, Pashov, and Code4rena — a claim that was later contradicted by the named firms. On 2025-09-14 the project announced it was starting an audit with Zenith; Zenith delivered a private draft on 2025-09-24 listing 42 vulnerabilities (6 High, 10 Medium) and recommending a full re-audit, and the draft was never published (rekt).

Rekt reports the owner reportedly set the staking contract to an EOA on 2025-09-25 and began mass withdrawals from nine vaults; the website and X account (@hypervaultfi) were then deleted (The Block, 2025-09-26). Loss figures differ: PeckShield/The Block reported about \$3.6 million in outflows, while rekt's trace is \$4.64 million (1,126.72 ETH via deBridge) against \$4.97M TVL on 2025-09-24. PeckShield documented the funds being bridged from Hyperliquid to Ethereum, swapped for ETH, and ~752 ETH (~\$3M) deposited into Tornado Cash; rekt says most of the 1,126 ETH followed over 3-4 days.

Prior to the incident, community members had raised red flags (HypingBull's first warning is dated 2025-09-04). When contacted, Pashov replied that they had never heard of Hypervault. Code4rena's website listed no pending audits for the protocol. The crypto researcher HypingBull publicly called the project's actions "shady" and withdrew funds before the platform went offline. Despite these warnings, Hypervault continued to operate normally until the final hours, encouraging users to explore other HyperEVM protocols and suggesting an imminent official audit.

The abrupt shutdown and untraceable transfers followed the classic exit-scam pattern: collect deposits into operator-controlled vaults, fabricate legitimacy signals (audit claims, roadmap, token launch plans), then delete all surfaces and route funds through a mixer. The case is structurally similar to Yfdexf.Finance (September 2020, $20M) but distinguished by the Hyperliquid/EVM cross-chain surface, the explicit fake-audit-claim vector as the primary depositor-trust mechanism, and the Tornado Cash routing tail.

The case is one of the larger exit scams of 2025 and is the cleanest 2025 anchor for the T6.002 (Fake Audit-Claim) sub-pattern, where the audit fabrication is the load-bearing trust signal that enables the deposit-collection phase.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Mid-2025 | Hypervault Finance launches on Hyperliquid as auto-compounding vault platform; claims Spearbit, Pashov, and Code4rena audits pending; TVL grows to ~\$5M | T6.002 (fake-audit-claims as trust substrate) |
| 2025-09-04 | Community members contact named audit firms; Pashov denies knowledge; Code4rena shows no pending audit; HypingBull publicly flags project as "shady" | T6.002 (audit-firm denial — canonical detection signal) |
| 2025-09-14 / 09-24 | Project announces a Zenith audit (09-14); Zenith privately delivers a draft with 42 vulnerabilities (09-24); TVL \$4.97M on 09-24, zero the next day | T6.002 |
| 2025-09-25 / 09-26 | Staking contract set to an EOA and vaults emptied; website and X account deleted; \$3.6M (PeckShield) to \$4.64M (rekt) drained | **T5.001 execution** (Hard LP Drain) |
| 2025-09-26 onward | Funds bridged Hyperliquid → Ethereum (deBridge), swapped for ETH; ~752 ETH (PeckShield) up to most of 1,126 ETH (rekt) routed through Tornado Cash | T7.001 (Mixer-Routed Hop) |
| 2025-09-26 onward | PeckShield publishes on-chain analysis; no operator attribution established | (attribution gap) |

## What defenders observed

- **Pre-event (audit-firm verification gap):** The project claimed audits by three named firms. When community members independently contacted the firms, Pashov denied any engagement and Code4rena showed no record. The verification was trivial — one message to each firm — but no standardised UX existed to surface this denial at the depositor-decision layer before funds were committed.
- **Pre-event (yield-too-good signal):** The claimed 76% stablecoin and 95% HYPE LP yields were structurally unsustainable — a standalone risk signal independent of the audit-claim verification. The combination of unsustainable yields plus unverifiable audit claims plus anonymous team was the pre-event defender signal.
- **At-event (surface deletion):** The simultaneous deletion of all operator surfaces (website, X, Discord) was the T6.001 signal — the surfaces were deception infrastructure, not genuine community infrastructure. The simultaneity confirmed coordinated operator action.
- **At-event (drain transaction):** The on-chain drain moved funds from Hypervault vaults to attacker-controlled addresses. PeckShield documented the bridge path (Hyperliquid → Ethereum) and the Tornado Cash deposit of ~752 ETH.
- **Post-event (mixer routing):** The Tornado Cash deposits created the standard T7.001 detection surface — mixer-deposit events linked to the drain addresses, with the mixer's anonymity-set property limiting further tracing.

## What this example tells contributors writing future Technique pages

- **Fake-audit-claim verification is a pre-deposit UX-layer problem.** The Pashov denial was available before the exit — a single message to the named firm surfaced the fabrication. The gap is that no wallet, aggregator, or venue systematically performs audit-claim verification at the listing / deposit-decision layer and surfaces the result before the user commits funds. Future T6.002 detection guidance should focus on the *verification-infrastructure gap* (audit-firm registry APIs, per-firm denial feeds, wallet-side surfacing) rather than on re-deriving the detection signal.
- **The yield-too-good + unverifiable-audit + anonymous-team triplet is the pre-event defender signal.** Any DeFi vault platform that simultaneously claims (a) unsustainably high yields, (b) audits by named firms without verifiable registry entries, and (c) anonymous team with no track record is T6.002 + T5.001 exposed by construction. Future T6.002 contributor guidance should flag the triplet as a standing risk factor.
- **Hypervault is structurally a T6.002 variant of the Yfdexf.Finance (2020) short-window exit scam pattern.** Both cases share the deposit-collection → surface-deletion → disappear pattern. Hypervault adds the fake-audit-claim layer as the primary trust substrate and the Tornado Cash routing as the laundering tail. Future T5.001 examples covering operator-side exit scams should distinguish the *fake-audit-claim-amplified* sub-pattern from the *social-media-blitz* sub-pattern (Yfdexf).

## Public references

- `[theblockhypervault2025]` — The Block, "DeFi protocol Hypervault vanishes after \$3.6 million suspected rugpull" (2025-09-26): <https://www.theblock.co/post/372497/defi-protocol-hypervault-vanishes-after-3-6-million-suspected-rugpull>
- `[rekthypervault2025]` — rekt.news, "Hypervault - Rugged" (2025-09-30): <https://rekt.news/hypervault-rugged> (\$4.64M / 1,126.72 ETH via deBridge; Zenith audit timeline; HypingBull 09-04 warning; Pashov and Code4rena denials)
- `[peckshieldhypervault2025]` — PeckShield outflow alert (\$3.6M, ~752 ETH to Tornado Cash) as reported in The Block above; the alert itself was not retrieved directly.

## Citations

- `[theblockhypervault2025]` — \$3.6M PeckShield figure, bridge path Hyperliquid → Ethereum, ~752 ETH Tornado Cash deposit.
- `[rekthypervault2025]` — \$4.64M trace, Zenith audit timeline, fake-audit-claim denials by Pashov and Code4rena, HypingBull pre-event warning.

## Discussion

Hypervault Finance is the 2025 canonical anchor for the **fake-audit-claim-as-rug-pull-entry-vector** sub-pattern of T6.002. The case demonstrates the recurring structural property that **DeFi vault platforms whose audit claims cannot be independently verified at the named firm's audit registry are T6.002-exposed by construction** — the verification burden is one registry lookup, but the UX layer that mediates that lookup at the depositor-decision point is not yet standardised.

The case is structurally significant for OAK because it provides a clean 2025 worked example where T6.002 (Fake Audit-Claim) is the **load-bearing trust signal** rather than a secondary modifier. In prior T6.002 cases, the fake audit claim was typically an amplifier on an already-suspicious token launch (T1/T2 adversarial properties were already detectable). In Hypervault's case, the fake audit claims WERE the primary depositor-trust mechanism — depositors entered a yield-farming vault specifically because they believed it was audited by named firms. The T6.002 surface was therefore the primary entry-vector for depositor funds, not a secondary amplifier.

The attribution surface is the case's principal limitation at v0.1. The operator team is completely unknown — no named individuals, no funder-graph cluster identification, no exchange-KYC linkage. The Tornado Cash routing further limits attribution. The case sits in the pseudonymous-attribution category alongside Yfdexf.Finance and other anonymous-operator exit scams.

For defenders, the case reinforces the standing lesson that **audit-claim verification must be performed against the audit firm's own registry, not against the project's marketing**. The named-audit-firm denial is the highest-precision T6.002 detection signal — it is binary, immediately actionable, and requires only an API call or a manual lookup against the firm's public audit registry. The gap is UX-layer standardisation, not detection-methodology maturity.
