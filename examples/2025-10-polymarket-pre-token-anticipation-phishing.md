# Polymarket POLY pre-token brand-anticipation phishing — EVM — 2025-10 onward

**Loss:** no verified loss figure. What is confirmed: Polymarket's CMO (Matthew Modabber, on the Degenz Live podcast, reported 2025-10-24) publicly confirmed a future POLY token and airdrop, while no POLY token had been deployed on-chain. Third-party scam reports describe fake "POLY airdrop" / "community rewards" sites (undated PCRisk write-up), but this file's earlier specifics — the exact domains, the Inferno / Angel drainer-kit lineage, and SEAL ISAC / ScamSniffer feed ingestion — are **unverified**: no source seen backs them.
**OAK Techniques observed:** **OAK-T4.009** (Pre-Token Brand-Anticipation Phishing) — primary; the canonical T4.009 anchor. The phishing surface is the pre-token information gap (the extraction side is unverified, see Summary): Polymarket's own CMO-issued public confirmation of future token plans created the ambiguity the attacker exploited. No POLY token had been deployed on-chain at the time the phishing campaigns were active. **OAK-T4.008** (Fake-DEX Clone-Frontend Phishing) — secondary; a drainer-backend overlap with T4.008's cohort was previously asserted but is unverified.
**Attribution:** **unattributed**. The earlier claim of an Inferno / Angel drainer-kit lineage is unverified. No named individual or group was publicly identified.
**Key teaching point:** **The Polymarket POLY anticipation phishing cohort is the canonical T4.009 anchor — platform-side pre-token communication as a first-class attack surface.** The incident demonstrates that a platform's public signalling about future token plans is not merely marketing but a load-bearing component of the defender's mental model. The absence of a token is structurally more dangerous than its existence because the platform cannot point to a canonical deployment to anchor user expectations.

**Corrected 2026-10-11:** the CMO confirmation is kept (Modabber, 2025-10-24), but the specific phishing domains, Inferno/Angel drainer lineage and SEAL ISAC/ScamSniffer feed claims had no supporting source and are now stated as unverified.

## Summary

In October 2025, Polymarket's Chief Marketing Officer publicly confirmed that the platform planned to launch a POLY token in the future. This public confirmation — made through official Polymarket channels and covered by crypto media — created a structural information asymmetry: the platform had signalled that a token would exist, but had not yet deployed one, published a canonical claim URL, or registered defensive typosquat domains.

**Unverified extraction side.** No source seen documents a specific phishing campaign launched in response to the CMO's confirmation. The domain names, drainer-kit lineage and defender-feed ingestion previously listed here (`polymarket-claim.com`, `polymarket-airdrop.io`, etc.; Inferno / Angel; SEAL ISAC / ScamSniffer) could not be confirmed and have been removed. What third-party scam-report sites do show is generic: fake "POLY airdrop / community rewards" pages that ask visitors to connect a wallet and approve a transaction. Their dates and victim counts are not established, so they are not tied to this window.

The key structural vulnerability was the **pre-token information gap**: Polymarket's own CMO had created the expectation that a POLY token would exist, but no POLY token existed on-chain. Users searching for "Polymarket token claim" or "POLY airdrop" encountered the attacker's domains as the first concrete "POLY" touchpoints — there was no canonical Polymarket-deployed claim portal to serve as the ground-truth reference.

The confirmed part is the setup for a T4.009 worked example:

1. The platform's own public signalling (CMO confirmation) created the ambiguity.
2. No token existed on-chain at the time.
3. Any attacker-supplied claim surface would face no canonical Polymarket claim portal to contradict it. Whether a specific campaign exploited this in the window is unverified.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2025-10-24 | Polymarket CMO confirms future POLY token and airdrop plans (Degenz Live podcast; reported by The Block) | (platform signalling creates ambiguity window) |
| 2025-10 onward | Fake "POLY airdrop" pages reported by third-party scam-report sites; dates, domains and drainer lineage unverified | T4.009 (unverified) |

## Realised extraction

No verified extraction figure. The class-level pattern (platform-signalling-creates-ambiguity → attacker-supplies-claim-surface → wallet-drain) is the structural hypothesis; this file does not document realised losses.

## Public references

- See `techniques/T4.009-pre-token-brand-anticipation-phishing.md` for full technique characterisation
- `[theblockpolytoken2025]` — The Block, "Polymarket CMO confirms POLY token and airdrop plans as prediction market boom gathers steam" (2025-10-24): <https://www.theblock.co/news/business/2025-10-24-polymarket-cmo-confirms-poly-token-airdrop-plans-376048> (CMO confirmation only; backs no phishing specifics)
- `[blockworkspoly2025]` — Blockworks, "Polymarket CMO confirms POLY token and airdrop plans amid U.S. relaunch" (2025-10): <https://blockworks.com/news/polymarket-cmo-confirms-poly-token>
- `[pcriskpolyrewards]` — PCRisk, "How to identify scams like the fake 'Polymarket Community Rewards Scam'" (undated): <https://www.pcrisk.com/removal-guides/35382-polymarket-community-rewards-scam> (generic fake-rewards wallet-connect scam; not dated to this window)
