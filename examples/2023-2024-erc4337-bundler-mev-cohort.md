# ERC-4337 bundler MEV extraction cohort — Ethereum / EVM L2s — 2023–2025 (cohort)

**Loss:** structural — ongoing value extraction by ERC-4337 bundlers against UserOperations observable in the public alt-mempool. No single named-operator dollar-extraction anchor at v0.1 equivalent to the `jaredfromsubway.eth` EOA-mempool profile (`examples/2023-04-jaredfromsubway-eoa-meva.md`). The loss is measured in per-UserOp execution-quality degradation attributable to bundler-side front-running, sandwiching, and censorship rather than in a discrete incident with a headline dollar figure. Empirical AA-adoption analyses report that approximately 99% of mainnet UserOperations are paymaster-sponsored, creating the structural conditions for bundler–paymaster collusion MEV (T13.002 sub-pattern d).

**OAK Techniques observed:** **OAK-T13.002** (Bundler MEV) — primary; the bundler — the off-chain agent expected to neutrally aggregate UserOperations into `handleOps` calls on the EntryPoint contract — exploits its privileged read of pre-confirmation UserOps or its position in the bundle-construction pipeline to extract value from the operations it is supposed to process. Sub-patterns observed: (a) UserOp front-running, (b) UserOp sandwiching, (c) UserOp censorship, and (d) bundler–paymaster collusion. **OAK-T5.004** (Sandwich / MEV Extraction) — structurally adjacent; the economic primitive (front-run + back-run around a victim swap) is the same, but the actor role (bundler vs. generic mempool searcher), observation surface (alt-mempool vs. public mempool), and mitigation surface (bundler allowlists and MEV-protected bundler endpoints vs. Flashbots Protect) differ.

**Attribution:** **unattributed (cohort-level — no single named operator).** Bundler-vendor research (Etherspot, FastLane, BlockPI) and AA supply-chain analytics (EigenPhi) document the class at the cohort level. No individual bundler operator has been publicly named in the manner of `jaredfromsubway.eth`. The cohort framing reflects the present state of public disclosure at v0.1.

**Key teaching point:** **ERC-4337 bundler MEV is structurally distinct from conventional mempool MEV (T5.004) because the alt-mempool propagates UserOps to bundlers the user did not choose — the natural mitigation surface is at the bundler layer (allowlists, reputation systems, pre-bundler encryption), not at the trader layer (Flashbots Protect-style private mempool routing).** The bundler's role definition explicitly assumes neutral aggregation; bundler MEV is a violation of role, not merely opportunistic ordering.

## Summary

ERC-4337 (Account Abstraction) introduces a two-layer transaction pipeline: users submit `UserOperation` objects to an alt-mempool (a P2P network separate from the public Ethereum mempool), and bundlers aggregate these UserOps into `handleOps` transactions submitted to the EntryPoint contract on-chain. The bundler is the bridge between the alt-mempool and on-chain inclusion — structurally analogous to a block builder in the PBS architecture, but operating at the UserOp layer rather than the transaction layer.

The bundler role definition presumes neutral aggregation: the bundler collects UserOps from the alt-mempool, orders them into a `handleOps` bundle, and submits the bundle to the EntryPoint. The bundler is compensated via the EntryPoint's reimbursement mechanism (gas costs paid by the bundler are reimbursed from the UserOp's paymaster or the user's deposit). The bundler is not expected to trade against the UserOps it processes.

However, the bundler's privileged position — it reads UserOps before they are included on-chain, and it controls the order of UserOps within its own `handleOps` bundle — creates a MEV extraction surface that is structurally distinct from conventional mempool MEV:

1. **UserOp front-running (sub-pattern a).** A bundler observes a profitable UserOp in the alt-mempool (e.g., a large swap on a DEX), computes that the extractable value exceeds gas cost, and submits its own transaction ahead of the UserOp — either a copy of the UserOp's calldata in its own bundle, or an EOA-level transaction that captures the same opportunity. The original UserOp is either re-bundled at a worse price or fails to execute.

2. **UserOp sandwiching (sub-pattern b).** A bundler constructs a `handleOps` bundle where a victim UserOp is bracketed by the bundler's own opening swap (front-run) and closing swap (back-run) on the same pool. Bundle-internal ordering is entirely controlled by the bundler; the EntryPoint does not constrain intra-bundle ordering.

3. **UserOp censorship (sub-pattern c).** A bundler refuses to include UserOps that are unprofitable to it (low priority fee, or competitive with its own extraction). The censored UserOps must either time out, re-broadcast through alternative paths at higher cost, or wait for a non-censoring bundler's bundle.

4. **Bundler–paymaster collusion (sub-pattern d).** A bundler and a paymaster operator coordinate: the paymaster sponsors UserOps that the bundler then extracts value from, splitting the proceeds. This is particularly acute for sponsored-gas flows where the user perceives the transaction as "free" and therefore tolerates worse execution quality.

Public reporting establishes the class through 2023–2025:
- Bundler-vendor research (Etherspot Skandha, FastLane, BlockPI) documents that any UserOp in the canonical alt-mempool is observable by every listening bundler, and that competing bundlers will copy profitable UserOps into their own `handleOps`.
- Empirical AA-adoption analyses report that ~99% of mainnet UserOperations are paymaster-sponsored and that bundler activity is concentrated in a small set of operators (Coinbase, Alchemy, Pimlico, Biconomy, Particle).
- EigenPhi extends its sandwich/arbitrage/liquidation MEV taxonomy to AA flows, providing per-bundle attribution of MEV against bundler addresses.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023-03 | ERC-4337 EntryPoint v0.6 deployed to Ethereum mainnet; alt-mempool P2P network activates | (substrate) |
| 2023–2024 | Bundler ecosystem matures: Etherspot Skandha, Pimlico, Stackup, Biconomy, Alchemy, Coinbase bundlers operate; MEV-protected bundler endpoints emerge as a product feature | T13.002 surface present |
| 2023–2024 | Bundler-vendor research (Etherspot, FastLane, BlockPI) publishes alt-mempool MEV exposure analyses; vendors position MEV protection as a product differentiator | (cohort signal) |
| 2024 | Empirical AA-adoption analysis (GMU) documents ~99% paymaster-sponsored UserOp share and bundler-concentration metrics | (structural T13.002(d) surface quantified) |
| 2024–2025 | EigenPhi extends MEV taxonomy to AA flows; per-bundle bundler-attributed MEV dashboards emerge but are less mature than EOA-mempool equivalents | (detection surface maturing) |
| 2025 | EntryPoint v0.9 deployment; TrustSec disclosure characterises bundler-side gas-cost griefing exposure alongside bundler-MEV surface | T13.002 + T13.001.004 surface update |
| ongoing | Pre-bundler UserOp encryption / threshold-decryption schemes researched as structural mitigation to remove bundler pre-inclusion read | (mitigation pipeline) |

## What defenders observed

- **The alt-mempool's permissionless propagation is the load-bearing structural feature.** Unlike the public mempool where users can route through Flashbots Protect or a private mempool to avoid observation, the alt-mempool propagates UserOps to every listening bundler. A user who submits a UserOp to the alt-mempool via their wallet's default RPC endpoint has no control over which bundler picks it up or what that bundler does with the pre-inclusion knowledge.

- **Bundler concentration amplifies the surface.** A small set of operators (Coinbase, Alchemy, Pimlico, Biconomy) processes the majority of mainnet UserOps. When one of these bundlers engages in MEV extraction, the affected user population is material. The concentration also means that users who route through non-MEV-extracting bundlers may still be affected if the MEV-extracting bundler observes their UserOp in the alt-mempool and front-runs it.

- **Paymaster-sponsored flows are the dominant T13.002(d) surface.** With ~99% of mainnet UserOps being paymaster-sponsored, the bundler–paymaster collusion sub-pattern has the largest addressable extraction surface. A paymaster that routes sponsored UserOps exclusively through an allied bundler creates a closed extraction pipeline where both parties profit from the extraction at the user's expense. The user perceives the transaction as "free" (no gas cost) and is unlikely to detect or contest the degraded execution quality.

- **MEV-protected bundler endpoints are the current operational mitigation.** Bundler vendors (Etherspot Skandha, Pimlico) offer MEV-protected bundler endpoints that submit UserOps through private-relay paths or enforce documented non-extraction policies. Wallet SDKs that default to these protected endpoints close the surface for their users. However, the default for wallets that broadcast to the public alt-mempool remains unprotected.

- **Pre-bundler UserOp encryption is the structural solution.** The root cause of T13.002 is that the bundler can read UserOp content before on-chain inclusion. Pre-bundler encryption schemes (where the UserOp is encrypted such that only the EntryPoint can decrypt it) remove the bundler's pre-inclusion read entirely, closing the surface regardless of bundler intent. Threshold-decryption variants (where the UserOp is decryptable only when included in a block) are an active research direction.

## What this example tells contributors writing future Technique pages

- **T13.002 is the AA-architecture analogue of T5.004 with a structurally different mitigation surface.** The economic primitive (sandwich extraction) is identical, but the actor role (bundler vs. generic searcher), the observation surface (alt-mempool vs. public mempool), and the mitigation surface (bundler allowlists and reputation systems vs. private mempool routing) differ. Contributors should preserve the architectural distinction — treating T13.002 as "just T5.004 in the AA context" loses the bundler-specific mitigation surface.

- **Bundler concentration data is the load-bearing detection primitive.** Per-bundler metrics on UserOp volume, extraction-per-UserOp, and paymaster co-occurrence are the operational detection signals. The EigenPhi AA supply-chain analytics framework is the closest operational analogue to the `[eigenphijared2023]` operator-profile methodology applied to AA flows.

- **The paymaster-sponsored-flow surface is the most structurally concerning sub-pattern at v0.1.** With ~99% paymaster-sponsored UserOp share, the bundler–paymaster collusion sub-pattern (d) has the largest addressable extraction surface. Defenders evaluating AA integration risk should treat the (paymaster, bundler) pair as the unit of trust analysis, not the bundler alone.

- **The class is rated developing rather than stable because no individual operator-profile case study has been published.** T13.002 should be re-rated to stable once at least one publicly-attributed bundler-MEV operator profile lands, analogous to `[eigenphijared2023]` for T5.004.

## Public references

- `[etherspot2023bundlermev]` — Etherspot Skandha bundler-vendor MEV-protection product analysis and alt-mempool exposure documentation.
- `[fastlane2024erc4337mev]` — FastLane intents / ERC-4337 / MEV interaction analysis.
- `[blockpi2023bundlermempool]` — BlockPI alt-mempool failure-mode and block-builder interaction analysis.
- `[gmu2024aaempirical]` — Empirical AA-adoption analysis documenting ~99% paymaster-sponsored UserOp share and bundler concentration metrics (mainnet 2024).
- `[eigenphi2023aamev]` — EigenPhi AA supply-chain MEV attribution; per-bundle bundler-attributed extraction dashboards.
- `[erc4337eip]` — Canonical ERC-4337 specification; defines bundler role, EntryPoint stake, and alt-mempool architecture.
- `[daian2019flashboys]` — Foundational MEV characterisation; the economic primitive T13.002 inherits (see `citations.bib`).

## Discussion

T13.002 is the most structurally distinct of the Account Abstraction attack techniques because the bundler's role — neutral aggregation of third-party UserOps — is definitional to the ERC-4337 architecture. A bundler that extracts MEV from the UserOps it processes is not just an opportunistic searcher; it is violating the role that the protocol architecture assigns to it. This makes the mitigation surface qualitatively different from T5.004: against a generic mempool searcher, the user routes through a private mempool; against a misbehaving bundler, the user must route through a *different bundler* whose non-extraction policy is either technically enforced or reputationally bonded.

The bundler-concentration dynamic amplifies the surface. A small number of bundler operators process the majority of UserOps, and the alt-mempool's permissionless propagation means that even bundlers the user did not choose can act on the user's UserOp. The result is that the user's choice of bundler is the load-bearing security decision, but the user may not know which bundler(s) will observe their UserOp in the alt-mempool. The mitigation surface is consequently at the wallet SDK layer (default to MEV-protected bundler endpoints, do not broadcast to the public alt-mempool) and at the paymaster layer (restrict sponsored UserOps to a vetted bundler allowlist).

The cohort is documented at the *structural* level rather than at the *named-operator* level because individual bundler operators have not published MEV-extraction policies or been subjected to operator-profile case studies at v0.1. This is a disclosure gap, not an evidence-of-absence gap: the structural conditions for bundler MEV (privileged pre-inclusion read, bundle-internal ordering control, alt-mempool propagation) are present and the economic incentive (extractable value > gas cost) is satisfied. The technique is rated developing rather than stable because the public detection toolchain for bundler-attributed MEV lags behind the EOA-mempool case; the technique should be re-rated once a canonical operator-profile case study is published.
