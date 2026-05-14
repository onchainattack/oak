# Solana NFT X-account-compromise fake-mint drainer cohort — Solana — 2025-Q1

**Loss:** cumulative — multiple Solana NFT communities targeted via compromised X (formerly Twitter) accounts of prominent NFT projects and creators during Q1 2025. Individual incident losses ranged from tens of thousands to low hundreds of thousands of dollars per campaign; aggregate cohort loss across the 2025-Q1 Solana NFT X-account-compromise wave is estimated in the low millions.
**OAK Techniques observed:** **OAK-T12.002** (Fake-Mint / Counterfeit Collection — compromised X accounts posted links to fraudulent NFT mint sites that collected SOL or prompted malicious transaction signing from NFT-community members; the fake-mint surface impersonated legitimate Solana NFT projects). **OAK-T4.002** (Compromised Front-End Permit Solicitation — the linked drainer sites solicited malicious transaction signatures under the appearance of a legitimate NFT mint). **OAK-T15.001** (Social Engineering — the account-compromise vector was credential phishing or SIM-swap against the X account holders).
**Attribution:** **pseudonymous** — the drainer infrastructure patterns link to known drainer-as-a-service operators (MS Drainer, Inferno Drainer successor infrastructure), but no named-individual attribution at v0.1.
**Key teaching point:** **Compromised social-media accounts of NFT projects are a persistent distribution surface for fake-mint drainers.** The 2025-Q1 Solana cohort demonstrates that X-account compromise as a distribution vector for NFT fake-mint drainers is a recurring operational pattern across multiple years, chains, and drainer-as-a-service operators.

## Summary

During Q1 2025, multiple Solana NFT projects and creators had their X (formerly Twitter) accounts compromised and used to distribute links to fraudulent NFT mint sites. The compromised accounts — including those of established Solana NFT collections and individual creators with significant follower counts — posted fake mint announcements directing followers to drainer sites that solicited malicious transaction signatures under the appearance of legitimate NFT mints.

The campaign pattern was identical to the 2024-2025 X-account-compromise cohort documented at `examples/2025-02-solana-x-account-compromise-cohort.md` but specifically targeted Solana NFT communities with NFT-mint-themed lures rather than token-launch-themed lures. The drainer infrastructure used was consistent with known drainer-as-a-service operators active in the 2024-2025 window.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2025-Q1 | Multiple Solana NFT project X accounts compromised via credential phishing / SIM-swap | T15.001 (entry vector) |
| 2025-Q1 (per-incident) | Compromised accounts post fake NFT mint links directing to drainer sites | **T12.002** (distribution) |
| 2025-Q1 (per-incident) | Victims sign malicious transactions at drainer sites; assets extracted | T4.002 (extraction) |

## Public references

- `[cointelegraphsolana2025]` — Cointelegraph reporting on the 2025 Solana X-account-compromise wave affecting NFT communities.
- `[decryptsolana2025]` — Decrypt coverage of NFT-specific X-account-compromise campaigns.

## Discussion

The 2025-Q1 Solana NFT X-account-compromise cohort is the canonical 2025 T12.002 worked example for the NFT-fake-mint-via-social-media-account-compromise sub-pattern. The case structurally pairs with the broader X-account-compromise cohort (`examples/2025-02-solana-x-account-compromise-cohort.md`) and the Google-ads NFT drainer case (`examples/2024-12-pudgy-penguins-google-ads-nft-drainer.md`) to document the recurring distribution-surface pattern across NFT drainer campaigns. The case closes the T12×2025 near-threshold gap at v0.1.
