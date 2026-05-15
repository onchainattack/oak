# EigenLayer token-anticipation phishing campaign — 2024

**Loss:** **Per-victim loss, not a single-incident total.** During EigenLayer's pre-token window (mainnet launch June 2023 through EIGEN token deployment May 2024), attackers registered typosquat domains combining "eigenlayer" or "eigen" with airdrop/claim/token/launch keywords and deployed fake "EIGEN airdrop claim" UIs targeting EigenLayer restakers and LRT depositors.
**OAK Techniques observed:** **OAK-T4.009** (Pre-Token Brand Anticipation Phishing). EigenLayer's restaking-points programme (which accrued "points" to early restakers with a publicly signalled future conversion to EIGEN tokens) created an even larger T4.009 surface than a standard token announcement — the points programme gave the anticipation phishing a concrete "check your points balance" hook that victims had been conditioned to expect.
**Attribution:** **unattributed** — the phishing infrastructure has not been publicly attributed to a specific actor at v0.1 cutoff.

**Key teaching point:** EigenLayer's points programme demonstrates an amplified T4.009 sub-pattern: when a protocol runs a points/credits programme during the pre-token window, the points-to-token conversion expectation creates a legitimate user behaviour (checking points, calculating expected airdrop) that phishing domains can mimic with high fidelity. The user has been conditioned by the protocol to expect a future claim event — the attacker supplies a fake one.

## Summary

EigenLayer launched its mainnet restaking protocol in June 2023 with a "restaking points" programme that awarded points to early restakers based on the amount and duration of restaked ETH/LSTs. The points programme publicly signalled a future EIGEN token launch where points would convert to token allocations — but the specific conversion rate, claim mechanism, and launch date were not disclosed until May 2024.

During this ~11-month pre-token window, attackers registered domains such as `eigenlayer-claim.com`, `eigen-foundation.app`, and `eigen-airdrop.xyz`, deploying UIs that purported to display the user's "EIGEN airdrop allocation" and prompted a wallet connection + approval transaction to claim. The phishing UIs often scraped on-chain data to display fabricated but plausible allocation amounts based on the user's actual EigenLayer restaking activity.

The EIGEN token was deployed on-chain in May 2024 with the legitimate claim portal at `claims.eigenfoundation.org`.

## Public references

- EigenLayer blog: restaking points programme and EIGEN tokenomics announcement (2024-04-29).
- Eigen Foundation: legitimate claim portal domain and security guidance.
- Web3 security firms: EigenLayer phishing campaign tracking (SlowMist, ScamSniffer, 2024).
