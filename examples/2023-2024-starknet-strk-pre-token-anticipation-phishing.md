# StarkNet STRK Pre-Token Anticipation Phishing — 2023–2024

**Loss:** ~$2M+ cumulative estimated across the STRK anticipation phishing cohort; per-victim losses from ~$500 to ~$250K. Loss quantification is approximate — the phishing campaigns operated through standard drainer-kit backends (Inferno / Angel lineage) that aggregated victim funds across multiple campaigns, making per-campaign attribution imprecise.
**OAK Techniques observed:** **OAK-T4.009** (Pre-token Brand-Anticipation Phishing — the canonical pre-token anticipation pattern at one of the largest L2 ecosystems. StarkWare publicly signalled STRK token plans for over two years before the February 2024 airdrop; the extended signalling window created a prolonged phishing exposure surface.) **OAK-T6.001** (Source-Verification Mismatch — fake "STRK claim" sites presented themselves as official StarkNet Foundation claim portals; the divergence between the front-end-displayed claim UI and the actual drainer-contract backend is the canonical T6.001 pattern at the pre-token layer.) **OAK-T4.008** (Fake-DEX Clone-Frontend Phishing — structurally adjacent; the attacker's claim portal is a clone of what users expect an airdrop claim UI to look like, distributed through the same social/ad-platform channels as T4.008.)
**Attribution:** **pseudonymous** at drainer-kit operator-cluster level; campaigns attributed to Inferno / Angel drainer-kit affiliate operators based on on-chain drainer-contract fingerprinting. No named individual attribution.

**Key teaching point:** **The STRK pre-token anticipation phishing cohort is the largest L2-scale instance of the T4.009 pattern.** StarkWare's extended pre-launch signalling window (2022–February 2024) created the longest pre-token phishing exposure surface in the L2 ecosystem: over two years of "STRK token is coming" messaging internalised by the user base, during which attacker-operated "STRK claim" sites appeared chronologically credible. The structural lesson generalises from the EigenLayer (restaking) and zkSync (ZK-rollup) cohorts: the longer the pre-launch signalling window, the more attacker-operated claim portals look like expected ecosystem infrastructure rather than phishing anomalies. The load-bearing mitigation — platform-side canonical-claim-URL pre-announcement combined with pre-launch defensive domain registration — was not operationalised by StarkWare during the pre-launch window.

## Summary

StarkWare, the developer of StarkNet (a ZK-rollup L2 on Ethereum), publicly signalled plans for a native STRK governance token starting in 2022. The token's role in protocol governance, staking, and fee payment was discussed in StarkWare blog posts, community calls, and ecosystem presentations across 2022–2023. The STRK token was officially deployed and airdropped to eligible users in February 2024.

During the ~2-year pre-launch window, attacker-operated phishing sites claiming to be the "official STRK airdrop claim portal" proliferated. The phishing infrastructure followed the standard pre-token anticipation pattern established by the EigenLayer and zkSync cohorts:

1. **Domain registration following StarkWare signalling events.** Within days of each major StarkWare announcement referencing STRK token plans, new typosquat / near-miss domains appeared combining "starknet," "strk," "airdrop," "claim," and "token" (e.g., `starknet-claim.com`, `strk-airdrop.io`, `starknet-token.app`).

2. **Drainer-backend connection.** The claim portal prompted users to connect their wallet and "verify eligibility" — the wallet-connection triggered a Permit2 / `approve` / `setApprovalForAll` transaction routed through Inferno / Angel drainer-kit backends, identical to the on-chain extraction substrate observed in T4.008 campaigns.

3. **Social-platform amplification.** Links to the fake claim portals were distributed through X/Twitter (replies to StarkWare's official posts), Telegram groups, Discord servers, and Google Search ads — the same multi-channel distribution surface as T4.008 but targeted at the StarkNet ecosystem's anticipation of the STRK token event.

The phishing campaigns were effective because StarkNet's extended pre-launch signalling created a structural ambiguity: users knew STRK was coming, the ecosystem had been discussing it for over a year, and the appearance of a "claim portal" during this window was chronologically plausible. The legitimate STRK airdrop claim portal (`provisions.starknet.io`) was not announced until the February 2024 airdrop date — meaning there was no canonical ground-truth URL for users to verify against during the entire pre-launch window.

After the February 2024 airdrop, the phishing surface shifted from pre-token anticipation to post-airdrop impersonation (fake "additional STRK claim" / "STRK staking" portals), but the structural pattern remained the same: the attacker's claim portal exploited the ambiguity created by the ecosystem's own token-related signalling.

The STRK cohort is structurally distinguished from the EigenLayer and zkSync cohorts by the duration of the pre-launch window (~2 years vs. ~12 months for zkSync and ~6 months for EigenLayer), making it the longest-duration T4.009 exposure surface documented at v0.1.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022 | StarkWare publicly signals STRK token plans; token's role in governance, staking, and fee payment discussed in blog posts and community calls | (ambiguity window opens) |
| 2022–2023 | STRK token plans reiterated in ecosystem presentations and community AMAs; user base internalises expectation of future airdrop | T4.009 (prolonged signalling) |
| 2023-Q1–Q4 | Attacker-operated "STRK claim" / "StarkNet airdrop" phishing sites proliferate, tracking StarkWare's public signalling events | T4.009 + T6.001 |
| 2024-02 | Official STRK airdrop launched via `provisions.starknet.io`; phishing surface shifts to post-airdrop impersonation | T4.009 (post-airdrop transition) |
| 2024-Q1–Q2 | Post-airdrop impersonation campaigns ("additional STRK claim," "STRK staking") continue through the drainer-kit distribution infrastructure | T4.009 |

## Public references

- StarkWare Foundation official STRK token announcement and airdrop details (February 2024)
- ScamSniffer drainer-campaign tracking covering STRK-anticipation phishing domains (2023–2024)
- SEAL ISAC phishing-domain monitoring feeds
- Community reporting on fake STRK claim portals (r/StarkNet, StarkNet Discord, X/Twitter)
- Inferno / Angel drainer-kit operator-cluster attribution (see T4.008 for drainer-kit lineage)

## Discussion

The STRK cohort anchors the pre-token anticipation phishing pattern at the L2 ecosystem scale. While EigenLayer (restaking) and zkSync (ZK-rollup) provided the initial T4.009 cohort anchors, the StarkNet case demonstrates that the pattern is not confined to a specific DeFi vertical — it generalises to any L1/L2 ecosystem with a publicly signalled but not-yet-deployed governance token. The extended signalling window (~2 years) makes the STRK cohort the longest-duration T4.009 exposure surface: the attacker's claim portals had over 24 months of chronologically plausible operation before the official airdrop provided a ground-truth URL.

The mitigation lesson is structurally identical to the EigenLayer and zkSync cases but more operationally acute due to the window duration: platform-side canonical-claim-URL pre-announcement and pre-launch defensive domain registration are not optional hardening measures — they are load-bearing defenses whose absence creates a standing, multi-year phishing surface. StarkWare did not operationalise either mitigation during the pre-launch window, and the attacker infrastructure filled the resulting ambiguity.
