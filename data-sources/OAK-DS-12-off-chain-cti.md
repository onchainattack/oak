# OAK-DS-12 — Off-Chain CTI Feeds

**Layer:** off-chain
**Chains:** N/A (telemetry sources are off-chain)
**Typical access path:** commercial CTI providers; public CTI sources (CISA, FBI IC3, NCSC); platform-side telemetry (Discord moderation, Twitter / X security teams); registrar / DNS change-control feeds.

## Description

Records off-chain telemetry that informs on-chain attack detection: phishing-campaign indicators, DNS / hosting compromise, social-engineering campaigns targeting validator-operator personnel, fake-job-offer LinkedIn campaigns, compromised-Discord-server announcements. Distinct from all on-chain Data Sources because the telemetry originates outside the blockchain layer entirely. Critical for the entry-vector detection of OAK-T4.002, T4.005, T10.001, and the broader OAK-G01 Lazarus Group operator profile.

## What data

- Phishing-campaign indicators: domain registration patterns, hosting-provider reuse, malware-payload hashes.
- DNS / hosting change-control events for protocol-affiliated domains.
- Social-engineering campaign reports: LinkedIn fake-job-offer payloads (especially OAK-G01-attributable patterns); Discord-server-compromise announcements.
- Authoritative attribution announcements: FBI / Treasury / DOJ / national CERT public statements.

## Where defenders access it

Commercial CTI providers (Mandiant, Recorded Future, CrowdStrike, etc.); public sources (CISA alerts, FBI IC3 PSAs, NCSC alerts); industry-specific channels (SlowMist Hacked archive, rekt.news leaderboard); peer-network sharing (community-curated lists; private Slack / Telegram / Signal channels among security researchers).

## Techniques that depend on this Data Source

- OAK-T4.002 — Compromised Front-End Permit Solicitation (DNS / hosting compromise indicators).
- OAK-T4.005 — setApprovalForAll NFT Drainer (Discord-server-compromise indicators).
- OAK-T10.001 — Validator / Signer Key Compromise (LinkedIn fake-job-offer + supply-chain compromise indicators).
- OAK-Gnn (Threat Actors) — operator profiling depends heavily on off-chain CTI; OAK-G01 in particular.

## Maintainer notes

OAK-DS-12 is the most-fragmented Data Source at v0.1: there is no single canonical access path, telemetry-quality varies widely by provider, and per-incident inclusion depends on which off-chain channels a defender has access to. Contributors writing OAK content whose detection signals depend on DS-12 should explicitly note the access-asymmetry — defenders without commercial-CTI subscriptions or established peer networks face a meaningfully different operational reality than those with them.
