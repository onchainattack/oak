# Polymarket POLY pre-token brand-anticipation phishing — EVM — 2025-10 onward

**Loss:** per-incident anchors still forming at v0.1. The campaign exploited the structural information gap created by Polymarket's CMO publicly confirming future token plans in October 2025 — the platform signalled a token would exist, but no POLY token had been deployed on-chain. Attacker-operated typosquat domains and dApps claiming to be the "official POLY airdrop claim" portal surfaced within weeks, targeting Polymarket's user base with wallet-drainer backends (Inferno / Angel drainer-kit lineage).
**OAK Techniques observed:** **OAK-T4.009** (Pre-Token Brand-Anticipation Phishing) — primary; the canonical T4.009 anchor. The phishing surface exploited the pre-token information gap: Polymarket's own CMO-issued public confirmation of future token plans created the ambiguity the attacker exploited. No POLY token had been deployed on-chain at the time the phishing campaigns were active. **OAK-T4.008** (Fake-DEX Clone-Frontend Phishing) — secondary; the drainer-backend substrate (Inferno / Angel / AngelFerno drainer-kit) is shared with T4.008's distribution cohort.
**Attribution:** **pseudonymous (no public attribution)**. The phishing infrastructure follows the Inferno / Angel drainer-kit lineage at the drainer-backend layer. No named individual or group was publicly identified.
**Key teaching point:** **The Polymarket POLY anticipation phishing cohort is the canonical T4.009 anchor — platform-side pre-token communication as a first-class attack surface.** The incident demonstrates that a platform's public signalling about future token plans is not merely marketing but a load-bearing component of the defender's mental model. The absence of a token is structurally more dangerous than its existence because the platform cannot point to a canonical deployment to anchor user expectations.

## Summary

In October 2025, Polymarket's Chief Marketing Officer publicly confirmed that the platform planned to launch a POLY token in the future. This public confirmation — made through official Polymarket channels and covered by crypto media — created a structural information asymmetry: the platform had signalled that a token would exist, but had not yet deployed one, published a canonical claim URL, or registered defensive typosquat domains.

Within weeks of the CMO's confirmation, attacker-operated typosquat domains surfaced:
- `polymarket-claim.com`, `polymarket-airdrop.io`, `polymarket-token.app`, `claim-polymarket.com`, and near-miss variants.
- dApps hosted on these domains presented a "POLY airdrop claim" interface — a UI that purported to be the official Polymarket token claim portal.
- Users were prompted to connect their wallets and sign transactions that granted token approvals to attacker-controlled drainer contracts (the Inferno / Angel drainer-kit lineage — structurally identical to the drainer-backend pattern documented under T4.008).

The key structural vulnerability was the **pre-token information gap**: Polymarket's own CMO had created the expectation that a POLY token would exist, but no POLY token existed on-chain. Users searching for "Polymarket token claim" or "POLY airdrop" encountered the attacker's domains as the first concrete "POLY" touchpoints — there was no canonical Polymarket-deployed claim portal to serve as the ground-truth reference.

The campaign is the canonical T4.009 worked example because:
1. The platform's own public signalling (CMO confirmation) created the ambiguity.
2. No token existed on-chain at the time the phishing infrastructure was active.
3. The attacker supplied the claim surface before the platform did — first-mover advantage at the phishing-claim layer.
4. The drainer-backend substrate (Inferno / Angel) is the same operational infrastructure observed across T4.008's distribution cohort, confirming the drainer-kit operator-cluster continuity between the two phishing classes.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2025-10 | Polymarket CMO publicly confirms future POLY token plans via official channels | (platform signalling creates ambiguity window) |
| 2025-10 T+weeks | Attacker-operated typosquat domains surface; dApps claiming "POLY airdrop claim" target Polymarket users | T4.009 (pre-token anticipation phishing) |
| 2025-10 onward | Drainer-backend extraction via Inferno / Angel kit lineage; per-incident victim anchors form | T4.008 (drainer-backend substrate) |
| 2025-11 onward | SEAL ISAC / ScamSniffer domain-reputation feeds ingest POLY-anticipation phishing domains | (defender-side detection) |

## Realised extraction

Per-incident anchors still forming at v0.1; the class-level calibration anchor is the structural pattern (platform-signalling-creates-ambiguity → attacker-supplies-claim-surface → drainer-backend-extraction). Individual victim losses are aggregated across the Inferno/Angel drainer-kit cohort.

## References

- Polymarket CMO token-plan confirmation, October 2025 (official Polymarket communications)
- ScamSniffer / SEAL ISAC phishing-domain monitoring feeds (October–November 2025)
- Inferno / Angel / AngelFerno drainer-kit lineage documentation (see T4.008 citations)
- See `techniques/T4.009-pre-token-brand-anticipation-phishing.md` for full technique characterisation
