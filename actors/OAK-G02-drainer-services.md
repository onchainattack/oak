# OAK-G02 — Drainer-as-a-Service operators

**Aliases:** Phishing-as-a-Service crypto wallet drainers. Specific named operators include Inferno Drainer, Angel Drainer, Pink Drainer / Pinkdrainer, Monkey Drainer, Venom Drainer, and their successors.
**First observed in crypto:** approximately 2022 (commercial drainer services emerge alongside Permit2 adoption).
**Attribution status:** **inferred-strong** at the service-family level (industry forensic providers with consistent published attributions). Per-incident operator-of-record attribution within a service family is generally **inferred-weak** and is not published per-incident at v0.1.
**Active:** yes; significant continuity-of-infrastructure across operator handovers (e.g., Inferno → Angel handover October 2024 per `[slowmist2024report]`).

## Description

OAK-G02 covers a class of commercial phishing service operators who provide ready-made wallet-draining infrastructure to affiliates: cloned-UI drainer kits, signature-phishing flows targeting Permit2 / approve patterns, and laundering-route packaging. Affiliates execute the per-victim exploitation; the service operator collects a cut.

Per `[slowmist2024report]`, wallet-drainer activity attributed collectively to this category produced approximately \$494M in user losses across 2024, with permit-signature flows accounting for roughly 56.7% of attributed phishing volume. Inferno Drainer held \~22% market share through Q1–Q2 2024 and \~43% through Q3, before announcing in October 2024 that operations had been transferred to the Angel Drainer team — a service-layer handover that is more defining for the category than any individual operator turnover.

## Targeting profile

- **Individual wallet holders** at scale, generally targeted via affiliate-operated phishing campaigns rather than directly by the service operator.
- **High-balance wallets** as a disproportionately rewarded subset; some affiliates specialise in pursuing wallets identified via on-chain analysis.

## Observed Techniques

- **OAK-T4.001 (Permit2 Signature-Based Authority Misuse)** — the dominant Technique in modern drainer flows.
- **OAK-T4.002 (Compromised Front-End Permit Solicitation)** — a recurring entry vector when an affiliate gains DNS or hosting control over a known protocol's UI.
- **OAK-T4.003 (Address Poisoning)** — recurring service-layer activity for some affiliates of the broader G02 family; observed indicators are detailed in `[chainalysis2024poisoning]` campaign reconstructions. Note that T4.003 attribution to G02-named services specifically is **inferred-weak** at v0.1 — many T4.003 campaigns may originate outside the named drainer-service families.
- **OAK-T4.004 (Allowance / Approve-Pattern Drainer)** — alternate flow alongside T4.001; per `[checkpoint2023drainers]`, recurring on-chain spender addresses tied to the named drainer-service families exhibit canonical T4.004 signatures.
- **OAK-T4.005 (setApprovalForAll NFT Drainer)** — the NFT-collection-level analogue of T4.004; entry vector is most often a compromised Discord server with a fake "extra mint" or "claim airdrop" announcement.
- **OAK-T7.001 (Mixer-Routed Hop)** — common downstream laundering route.
- **OAK-T8.001 (Common-Funder Cluster Reuse)** — service-layer infrastructure reuse is the canonical T8.001 pattern; per `[slowmist2024report]`, the Inferno → Angel handover shows that *infrastructure persistence* is a stronger attribution signal than *operator-name persistence* in this category.

## Observed Examples

- [`examples/2022-08-curve-dns-hijack.md`](../examples/2022-08-curve-dns-hijack.md) — T4.002 case via cloned UI served from compromised registrar nameserver.
- Aggregate metrics for the 2024 wallet-drainer ecosystem from `[slowmist2024report]` (\$494M total, 56.7% via permit signatures).
- [`examples/2022-04-bored-ape-discord-wave.md`](../examples/2022-04-bored-ape-discord-wave.md) — Bored Ape Yacht Club / Yuga Labs operator-side credential-compromise wave
- [`examples/2022-08-yuga-otherside.md`](../examples/2022-08-yuga-otherside.md) — Yuga Labs Otherside Discord-phishing wave
- [`examples/2024-10-inferno-drainer-handover.md`](../examples/2024-10-inferno-drainer-handover.md) — Inferno Drainer service ecosystem
- [`examples/2024-12-pudgy-penguins-google-ads-nft-drainer.md`](../examples/2024-12-pudgy-penguins-google-ads-nft-drainer.md) — NFT-targeted Google-Ads-distributed drainer-kit campaign
- [`examples/2025-05-inferno-drainer-reloaded-encrypted-onchain-config.md`](../examples/2025-05-inferno-drainer-reloaded-encrypted-onchain-config.md) — Inferno-Drainer reloaded with encrypted on-chain config

## Citations

- `[slowmist2024report]` — 2024 ecosystem statistics, Inferno → Angel handover.
- `[rektcurve2022]` — Curve DNS hijack as a service-layer-adjacent T4.002 case.

## Discussion

The OAK-G02 framing intentionally treats this category as a **class of services** rather than as **individual operators**, because:

1. The named services (Inferno, Angel, Pink, etc.) routinely transfer operations, branding, or affiliates between each other; per-name continuity is weaker than per-infrastructure continuity.
2. Per-victim attribution typically lands on the affiliate, not the service operator, but the Technique and Mitigation framing should target the service-layer because the service is the persistent entity.
3. Defender controls (wallet-side warning lists, exchange-side deposit screening, browser extensions) operate at the infrastructure level; framing OAK-G02 at the service level makes those controls easier to map.

Per `[slowmist2024report]`, post-October-2024 drainer activity should be attributed at the *service-infrastructure* level rather than at the *named-operator* level until the Angel-Drainer-and-successors landscape stabilises. Contributors writing per-incident examples in this category should preserve attribution-level language: per-incident operator-of-record attributions are typically **inferred-weak** unless a specific affiliate has been publicly identified by an authoritative source (rare).
