# EigenLayer token-anticipation phishing campaign — 2024

**Loss:** The one documented event is the 2024-10-18 hijack of EigenLayer's official X account, which promoted a fake EIGEN season-2 "reallocation" airdrop link; ScamSniffer reported at least one victim lost \$800K (in mETH), with other reports putting total losses at \$800K-\$1M. This is after the EIGEN token launch (2024-05-10), not in the pre-token window. No source in this file documents the typosquat-domain campaign during June 2023 - May 2024; that earlier description was unverified.
**OAK Techniques observed:** **OAK-T4.009** (Pre-Token Brand Anticipation Phishing). EigenLayer's restaking-points programme (which accrued "points" to early restakers with a publicly signalled future conversion to EIGEN tokens) created an even larger T4.009 surface than a standard token announcement — the points programme gave the anticipation phishing a concrete "check your points balance" hook that victims had been conditioned to expect.
**Attribution:** **unattributed** — the phishing infrastructure has not been publicly attributed to a specific actor at v0.1 cutoff.

**Key teaching point:** EigenLayer's points programme demonstrates an anticipation-driven sub-pattern: when a protocol runs a points/airdrop programme, the expectation of further distributions creates a legitimate user behaviour (checking points, calculating expected airdrop) that phishing domains can mimic with high fidelity. The user has been conditioned by the protocol to expect a future claim event — the attacker supplies a fake one.

**Corrected 2026-10-11:** Documented event restated as the 2024-10-18 EigenLayer X-account hijack (post token launch); the invented typosquat domains and claims-portal URL were removed and the pre-token-window claim marked unverified.

## Summary

EigenLayer ran a restaking-points style programme ahead of the EIGEN token; the stakedrop was announced on 2024-04-29 and claims opened 2024-05-10. The anticipation of claims and further distributions (season 2 was announced in September 2024) is the context that made a fake airdrop message credible.

On 2024-10-18 attackers took over EigenLayer's X account and posted a link advertising a supposed reallocation of EIGEN tokens from the season 2 stakedrop; later posts pushed the same link. Victims who connected wallets and signed a transaction lost liquid-restaking assets (mETH, swETH, eETH reported). Eigen Labs said the handle was compromised and told users to verify links against eigenlayer.xyz, then regained control and removed the posts. No specific phishing domain names are confirmed here.

The EIGEN token claim opened on 2024-05-10. Mapping note: a hijacked official account distributing a fake airdrop link fits an official-channel-compromise technique better than pre-token brand anticipation, because the event post-dates the token launch.

## Public references

- `[theblockeigen2024]` — The Block, "EigenLayer's official X account hacked to promote fake airdrop" (2024-10-18): <https://www.theblock.co/amp/post/321939/eigenlayer-x-account-hack-fake-airdrop>
- `[unchainedeigen2024]` — Unchained, "EigenLayer's X account hacked in latest social media crypto takeover" (2024-10-18): <https://unchainedcrypto.com/eigenlayers-x-account-hacked-in-latest-social-media-crypto-takeover/>
- `[defianteigenstakedrop2024]` — The Defiant, "EigenLayer to Drop Token on May 10" (2024-04-30): <https://thedefiant.io/news/defi/eigenlayer-to-drop-token-on-may-10>
- `[decrypteigen2024]` — Decrypt, "EigenLayer Twitter Account Hacked to Share Ethereum Airdrop Scam" (2024-10-18): <https://decrypt.co/287159/eigenlayer-twitter-hack-airdrop-scam> (EIGEN-airdrop drainer phishing, \$800K+ per ScamSniffer)
- `[pcriskeigen2024]` — PCRisk, "Avoid losing digital assets through fake \"Claim EIGEN\" websites": <https://www.pcrisk.com/removal-guides/31016-claim-eigen-scam>
