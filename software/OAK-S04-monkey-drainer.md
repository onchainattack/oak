# OAK-S04 — Monkey Drainer

**Type:** drainer-kit
**Aliases:** Monkey, "Monkey-Drainer.eth" (one of the historically-associated naming patterns in industry forensic posts).
**Active:** sunset — operator announced retirement in approximately March 2023, framed publicly as burn-out / "moving on" rather than as a transfer of operations to a successor; affiliate base is generally understood to have migrated into Inferno (OAK-S01) and other contemporaneous kits.
**First observed:** approximately 2022.
**Used by Groups:** OAK-G02 (Drainer-as-a-Service)
**Observed Techniques:** OAK-T4.001 (Permit2 Authority Misuse, primary), OAK-T4.004 (Allowance / Approve-Pattern Drainer), OAK-T4.005 (setApprovalForAll NFT Drainer), OAK-T7.001 (Mixer-Routed Hop), OAK-T8.001 (Common-Funder Cluster Reuse).
**Targets:** EVM-chain wallet holders at scale (Ethereum mainnet primary); both fungible-token and NFT drains within scope. Per ZachXBT's running 2022–2023 thread on the operator (`[zachxbtmonkey2023]`), aggregate attributed losses through the active window were approximately $13M+.

## Description

Monkey Drainer is the OAK-G02 *predecessor* entry in the dominant lineage Monkey → Inferno → Angel. The kit operated through 2022 and into early 2023 as one of the most prominent commercial drainer services of its era, before its operator publicly announced retirement in approximately March 2023 — a sunset notable for its "burn-out" framing rather than a clean handover narrative. The affiliate base did not appear to dissolve with the brand; affiliates and tooling are generally understood to have migrated into the contemporaneous Inferno kit and other peers, foreshadowing the more public October 2024 Inferno → Angel handover.

ZachXBT's running 2022–2023 thread on the operator (`[zachxbtmonkey2023]`) was the primary public-attribution channel for per-incident reconstructions during the active window, and is the standard citation for the approximately $13M+ aggregate-loss figure. Per `[checkpoint2023drainers]`, Monkey-era spender addresses are part of the 2023-baseline G02 cluster characterisation that fed early wallet-vendor warning lists.

The Monkey lifecycle is canonical in OAK for two reasons: (1) it is the earliest well-documented case of a named drainer-kit operator retiring rather than handing over, and (2) the affiliate-and-tooling continuity into the next-generation kits demonstrates that *infrastructure persistence outliving the brand* is not unique to the 2024 Inferno → Angel event but is a recurring G02 dynamic.

## Observed examples

- ZachXBT's 2022–2023 public thread on Monkey Drainer-attributed thefts (`[zachxbtmonkey2023]`) — the standard public-attribution channel for per-incident reconstructions during the active window.
- Aggregate `~$13M+` loss figure across the active window from `[zachxbtmonkey2023]`.
- 2023-baseline characterisation of Monkey-era spender addresses in `[checkpoint2023drainers]`.
- No dedicated per-incident example in [`examples/`](../examples/) as of v0.1; the lineage context is captured in [`examples/2024-10-inferno-drainer-handover.md`](../examples/2024-10-inferno-drainer-handover.md) ("alongside Pink, Monkey, Venom, Angel, others").

## Detection / attribution signals

- **Sunset-era spender clusters.** Per `[checkpoint2023drainers]`, Monkey-era on-chain spender addresses were tracked alongside Inferno's and Angel's in the 2023 baseline. Post-sunset, those spender addresses were not redeployed under the Monkey brand — but a subset of them appear in the funder graphs of next-generation kits, which is the OAK-T8.001 evidence behind the affiliate-and-tooling-migration framing.
- **Public retirement announcement signature.** Unlike the Inferno → Angel handover, Monkey's sunset did not produce a single fee-collection-address outflow event; the off-ramp was diffused over a longer window. This makes the Monkey sunset a less clean OAK-T8.002 case than the October 2024 Inferno → Angel handover.
- **Permit2-era pattern matching.** Routing-contract logic exhibited canonical OAK-T4.001 / OAK-T4.004 / OAK-T4.005 flows, with mixer-routed hops (OAK-T7.001) as the primary laundering rail through 2022–early 2023 (cross-chain bridge laundering, OAK-T7.003, was less prevalent in this period across the category).

## Citations

- `[zachxbtmonkey2023]` — ZachXBT's 2022–2023 public investigation thread on Monkey Drainer; primary source for the approximately $13M+ aggregate-loss figure and per-incident reconstructions across the active window (BibTeX entry to be added in a v0.x update).
- `[checkpoint2023drainers]` — 2023-baseline Monkey-era spender-address characterisation alongside Inferno and Angel.
- `[slowmist2024report]` — broader-context category framing; Monkey is referenced as a predecessor / category peer rather than as a 2024-active operator.

## Discussion

Monkey Drainer occupies the *predecessor* slot in the dominant OAK-G02 lineage Monkey → Inferno → Angel. Its sunset in March 2023 is the earliest well-documented case in this corpus of a named drainer-kit operator announcing retirement, and the affiliate-and-tooling continuity into Inferno (OAK-S01) and contemporaneous peers is an early-warning analogue of the October 2024 Inferno → Angel handover.

For OAK contributors, the operational lesson is that *retirement* and *handover* sit on the same defender-relevance axis: in both cases the brand changes but the infrastructure persists. The Monkey sunset is the diffuse-off-ramp case; the Inferno → Angel handover is the clean-off-ramp case; both produce the same downstream defender requirement, which is to anchor watchlists on infrastructure clusters rather than on operator-name continuity. Per `[checkpoint2023drainers]`, that requirement was already implicit in the 2023 G02 baseline; the post-2024 corpus has made it explicit.
