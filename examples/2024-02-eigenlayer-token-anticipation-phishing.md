# EigenLayer pre-token anticipation phishing — Ethereum — early 2024

**Loss:** cohort-level phishing losses across EigenLayer restakers targeted during the pre-launch window before the EIGEN token deployment (May 2024). Per-victim losses ranging from low four-figures to mid six-figures USD equivalent; aggregate across the cohort not consolidated in a single public loss figure at v0.1.
**OAK Techniques observed:** **OAK-T4.009** (Pre-Token Brand-Anticipation Phishing — primary; attackers exploited the structural information gap created by EigenLayer's own public signalling about a future token launch — EigenLayer had publicly signalled an intention to launch a governance token, and during the pre-launch window before EIGEN's on-chain deployment, the attacker supplied fake "EigenLayer airdrop claim" portals that restakers connected to, authorising drainer contracts). **OAK-T4.008** (Fake-DEX Clone-Frontend Phishing — secondary; the phishing UIs presented a look-alike of the legitimate EigenLayer dApp interface, and the drainer-backend extraction substrate followed the Inferno / Angel drainer-kit pattern observed across the broader T4.008 distribution cohort).
**Attribution:** **pseudonymous (at cohort scale)** — drainer-kit-backend attribution to Inferno / Angel / AngelFerno descendant operator-clusters; no individual operator attribution at v0.1.
**Key teaching point:** **EigenLayer's pre-token anticipation phishing cohort is the calibration anchor for the T4.009 pattern at scale — the platform's own public signalling that a token will exist created the structural information gap the attacker exploited.** The EigenLayer case is structurally significant because it was the first major protocol where the phishing surface at material scale *preceded* the token's existence: restakers who had deposited into EigenLayer's protocol were targeted with "EigenLayer airdrop claim" phishing sites during the pre-launch window before EIGEN's official deployment, and the structural ambiguity ("you deposited → you're entitled to an airdrop → here's the claim portal") was credible enough that EigenLayer restakers — a technically sophisticated cohort — were successfully targeted.

## Summary

EigenLayer, the Ethereum restaking protocol, publicly signalled its intention to launch a governance token (later launched as EIGEN in May 2024) through blog posts, community calls, and roadmap references in 2023 and early 2024. EigenLayer restakers who had deposited ETH and LSTs into the protocol understood from the platform's own communications that a token launch — and likely an associated airdrop — was forthcoming.

This created a structural information gap: restakers knew a token was coming but did not know (a) the launch date, (b) the token contract address, (c) the official claim portal URL, or (d) the eligibility criteria. During the pre-launch window — from the first public signalling of token plans through to EIGEN's on-chain deployment in May 2024 — attacker-operated typosquat domains and dApps surfaced purporting to be the "official EigenLayer airdrop claim" portal.

The phishing infrastructure followed the established drainer-kit pattern: users connected their wallets to the fake claim portal, were prompted to sign a transaction that appeared to be an airdrop-claim authorisation, and the drainer contract extracted approved tokens (ETH, LSTs, and other ERC-20s held in the connected wallet). The user's mental model ("I deposited into EigenLayer, now I am claiming my airdrop") made the phishing transaction contextually credible — the platform's own communications had primed users to expect an airdrop claim flow.

The EigenLayer cohort is structurally significant because it established the T4.009 pattern at a class level: the phishing surface at material scale *preceded* the token's on-chain existence. EigenLayer restakers represented a technically sophisticated user base (protocol depositors who understood restaking mechanics), and yet the phishing was successful — demonstrating that the T4.009 surface is not gated by user sophistication but by the platform's own signalling ambiguity.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2023–early 2024 | EigenLayer publicly signals intention to launch a governance token through blog posts, community calls, and roadmap references | T4.009 surface (latent — platform creates pre-token information gap) |
| Early 2024 | Attacker-operated "EigenLayer airdrop claim" typosquat domains registered; phishing dApps deployed presenting a claim-portal interface | **T4.009** (pre-token-anticipation lure deployed) |
| Early 2024 | Restakers connect wallets to fake claim portals; sign drainer-authorising transactions | **T4.008** (drainer-backend extraction — Inferno / Angel drainer-kit substrate) |
| Early 2024 | Extracted funds routed through drainer-operator-controlled addresses; per-victim losses realised | T4.008 extraction |
| May 2024 | EIGEN token officially deployed on-chain; official claim portal published by EigenLayer | (pre-token-window closes; phishing surface shifts to T4.002 / T4.008 post-deployment) |
| Post-May 2024 | Phishing campaigns adapt — some transition from pre-token anticipation to post-launch claim-impersonation (T4.002 surface) | (surface transition from T4.009 to T4.002) |

## Realised extraction

Cohort-level phishing losses distributed across EigenLayer restakers; per-victim losses from low four-figures to mid six-figures USD equivalent. Aggregate cohort loss not consolidated in a single public figure at v0.1.

## OAK technique classification rationale

T4.009 (Pre-Token Brand-Anticipation Phishing) is the primary classification because the load-bearing lure substrate was the pre-token information gap — EigenLayer had signalled a future token but had not deployed one; the attacker supplied the "official claim portal" before the platform did. The structural pattern (platform-signalling-creates-ambiguity → attacker-supplies-claim-surface → drainer-backend-extraction) is the canonical T4.009 shape.

T4.008 (Fake-DEX Clone-Frontend Phishing) is the secondary classification because the phishing UIs presented a look-alike of the legitimate EigenLayer dApp interface, and the drainer-backend extraction substrate followed the Inferno / Angel drainer-kit pattern observed across the broader T4.008 distribution cohort. The T4.009→T4.008 chain (pre-token-anticipation lure → drainer-kit extraction) is a canonical composition pattern for this class.

## References

- EigenLayer public communications (blog posts, community calls, roadmap references) signalling future token plans pre-May 2024
- ScamSniffer pre-token-anticipation phishing domain reports (EigenLayer typosquat domain cluster)
- SlowMist 2024 Annual phishing-cohort report (EigenLayer pre-token phishing segment)
- ZachXBT per-victim incident threads (EigenLayer restaker phishing reports)
- See `examples/2025-10-polymarket-pre-token-anticipation-phishing.md` for the POST-October-2025 Polymarket POLY anticipation cohort — the downstream T4.009 calibration anchor — and the zkSync airdrop-anticipation phishing cohort (2023–2024) for the extended-pre-launch-window variant
