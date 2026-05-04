# Yuga Labs Otherside Discord-phishing wave — Ethereum + multi-chain — 2022-08-04

**Loss:** approximately $3M+ across multiple Yuga Labs / Otherside community-managed-Discord-server users.
**OAK Techniques observed:** **OAK-T4.005** (setApprovalForAll NFT Drainer; the canonical NFT-drainer extraction flow against approved marketplace operator contracts) + **OAK-T15.005** (Operator-Communication-Channel Takeover) — Discord community-manager credential compromise sub-shape; the operator-channel takeover produced apparently-legitimate phishing posts under the credibly-held operator brand, the canonical companion case to the BAYC Discord wave. + **OAK-T11** broadly construed for the operator-side social-media credential compromise feeding the phishing chain (community-manager Discord credentials compromised, producing apparently-legitimate official-channel phishing posts).
**Attribution:** **pseudonymous-unattributed** at the per-incident level. Industry-cohort-graph analysis (PeckShield, ZachXBT) places the cohort within the broader OAK-G02 Drainer-as-a-Service operator-substrate at `inferred-strong` confidence at the cohort level but not at single-actor-of-record per-incident confidence.
**OAK-Gnn:** [OAK-G02 Drainer-as-a-Service operator-substrate](../actors/OAK-G02-drainer-services.md) — cohort-level inferred-strong; per-incident pseudonymous.
**Key teaching point:** **Discord community-manager credential compromise produces apparently-legitimate phishing infrastructure** that bypasses end-user "official-channel" verification heuristics. The Yuga Otherside August 2022 wave is the canonical companion to the BAYC Discord wave (`examples/2022-04-bored-ape-discord-wave.md`) for documenting the social-media-credential-compromise → NFT-phishing chain at the highest-profile-collection level on the public record.

## Summary

Yuga Labs is the issuer of Bored Ape Yacht Club (BAYC), Mutant Ape Yacht Club (MAYC), and Otherside (the metaverse-and-virtual-land project derived from the BAYC ecosystem). On August 4, 2022, the Yuga Labs / Otherside community-managed Discord server was compromised at the community-manager-credential level (the specific compromise vector was social-engineering against a community manager rather than infrastructure-level Discord-server compromise). The attacker used the compromised community-manager account to post fake-airdrop announcements directing users to a phishing-page that initiated standard EVM-chain `setApprovalForAll` NFT-drainer flows against connected-wallet NFT holdings.

Approximately $3M+ in cumulative NFT and ERC-20 losses were realised across multiple users in the same-day window before the compromised credential was identified and the malicious posts removed. Specific high-value individual losses included a single user losing approximately 200 ETH and multiple Bored Ape NFTs in a single transaction-flow.

The case is structurally a **social-media-credential-compromise → NFT-phishing chain** that bypasses end-user "official-channel" verification heuristics: users were trained to verify announcements via the official project Discord server, and the announcements were posted via the official project Discord server, producing a verification surface that did not capture the credential-compromise dimension. The structural pattern recurs across multiple Yuga-related Discord compromises (April 2022 BAYC, June 2022 BAYC Instagram, August 2022 Otherside, August 2024 BAYC Instagram followup) and across many other major NFT collections; Yuga Otherside August 2022 is the canonical mid-2022 reference point.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-08-04 (early UTC) | Attacker socially-engineers a Yuga Labs / Otherside community manager and obtains Discord-credential access | T11 broadly (operator-side social-engineering) |
| 2022-08-04 | Attacker posts fake "Otherside HV-MTVL airdrop" announcement to the official Otherside Discord with a phishing-page link | T1.003 (compromised official-channel announcement; broadly construed) |
| 2022-08-04 | Affected users sign `setApprovalForAll` against the phishing-page-linked drainer contract; NFT and connected-wallet ERC-20 holdings are drained | T4.005 (extraction) |
| 2022-08-04 (within hours) | Yuga Labs identifies the compromise; community manager credentials revoked; phishing-page link removed from Discord | (operator response) |
| 2022-08-04 to 2022-08-05 | Industry forensic posts (PeckShield, ZachXBT, SlowMist) publish cumulative-loss figures and on-chain trace | (forensic record) |
| 2022-08 onward | Multiple affected users compensated via secondary-market repurchase by Yuga Labs and via insurance-product payouts; not all affected users recovered fully | (recovery; partial) |

## What defenders observed

- **Pre-event (no community-manager-credential-compromise monitor).** No public-record indication of pre-event monitoring at the social-media credential-compromise layer; community-manager Discord credentials are not typically subject to the monitoring discipline applied to engineering-and-treasury credentials.
- **At-event (apparently-legitimate phishing infrastructure).** The phishing announcement was posted via the official project Discord server with a community-manager account and was indistinguishable from a legitimate announcement at the verification-surface level. End-user "official-channel" verification heuristics did not capture the credential-compromise dimension.
- **Post-event (operator-side same-day response).** Yuga Labs revoked the compromised credentials within hours and posted authoritative warnings to the official channels; the same-day public-record discipline limited the affected-user count.

## What this example tells contributors writing future Technique pages

- **Social-media credential compromise is a first-class operator-side T11-class attack surface.** Future T11 contributions covering NFT-collection-issuer and protocol-issuer cases should explicitly enumerate community-manager Discord / Twitter / Telegram credential compromise as a discrete operator-side compromise surface composing with engineering-and-treasury credential compromise.
- **End-user "official-channel" verification heuristics are insufficient against credential-compromise-driven phishing.** Future T4.005 / T4.x contributions covering NFT-phishing should explicitly note this insufficiency; the appropriate end-user mitigation is OAK-M31 EIP-712 permit display + signing-risk heuristics composed with OAK-M30 per-dApp domain allowlist.
- **Yuga-cohort framing across multiple compromises is itself a structural observation.** The recurring pattern across BAYC April 2022, BAYC Instagram June 2022, Otherside August 2022, BAYC Instagram August 2024 is a multi-year recurring attack-surface against the same operator-side organisation; defenders advising NFT-collection issuers on operator-side credential-hardening should treat the recurring pattern as the load-bearing observation rather than per-incident-isolated framings.

## Public references

- Yuga Labs operator-side incident statement (August 2022) — `[yugaotherside2022]`.
- PeckShield on-chain trace — `[peckshieldyugaotherside2022]`.
- ZachXBT independent investigation thread — `[zachxbtyugaotherside2022]`.
- SlowMist incident analysis — `[slowmistyugaotherside2022]`.
- The Block / Decrypt incident coverage — `[theblockyugaotherside2022]`.

## Citations

- `[yugaotherside2022]` — Yuga Labs operator-side incident statement.
- `[peckshieldyugaotherside2022]` — PeckShield on-chain trace.
- `[zachxbtyugaotherside2022]` — ZachXBT independent on-chain investigation; complementary source.
- `[slowmistyugaotherside2022]` — SlowMist incident analysis.
- `[theblockyugaotherside2022]` — The Block contemporaneous incident coverage.
- `[checkpoint2023drainers]` — Check Point drainer-cohort tracking; cross-reference for OAK-G02 cohort context.
- `[chainalysis2022nft]` — Chainalysis NFT-related crime tracking 2022; cross-reference for the broader NFT-phishing class context.

## Discussion

Yuga Otherside August 2022 is one of the canonical reference points in the broader Yuga-related Discord-phishing recurring pattern. The structural observation across the cohort (BAYC April 2022, BAYC Instagram June 2022, Otherside August 2022, BAYC Instagram August 2024) is that the highest-profile NFT-collection issuer in the OAK reference period has been the target of a multi-year recurring social-media-credential-compromise attack-surface, with each individual incident producing $1M-$3M+ in cumulative user losses and the cumulative cohort producing $10M+ in cumulative losses across the four-year span.

The mitigation surface composes across multiple OAK-M classes: operator-side OAK-M21 anti-phishing training for community managers and OAK-M22 rotate-on-disclosure discipline for community-manager credentials; end-user OAK-M30 per-dApp domain allowlist and OAK-M31 EIP-712 permit display + signing-risk heuristics; and venue-and-aggregator OAK-M26 wash-trade-rate metrics at the marketplace layer (cross-reference to NFT-marketplace-side context). Defenders advising NFT-collection issuers and end-users against this attack class should compose mitigations across all three audience classes.

The pseudonymous-unattributed framing reflects per-incident attribution discipline. Industry-cohort-graph analysis at the OAK-G02 Drainer-as-a-Service substrate level produces `inferred-strong` cohort-attribution; per-incident attribution to a single actor-of-record is the v0.x candidate update if industry forensic-cluster-attribution stabilises.
