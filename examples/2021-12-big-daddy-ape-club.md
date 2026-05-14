# Big Daddy Ape Club (BDAC) NFT mint rug — Solana — 2021-12-19

**Loss:** approximately 9,136 SOL (~$1.3M at the time) collected from ~2,000+ retail minters in a fraudulent NFT mint event on Solana. The project collected SOL from buyers for a promised 10,000-supply NFT collection and never delivered the NFTs.
**OAK Techniques observed:** **OAK-T1.003** (onlyOwner / Proxy Rug — the NFT collection was structurally fraudulent at genesis; the deployer retained full control over the mint proceeds with no intention of delivering the promised NFTs, constituting a token-genesis-level privileged-position extraction). **OAK-T12.002** (Fake-Mint / Counterfeit Collection — the project collected mint proceeds for a collection that did not exist; no NFTs were ever minted or distributed to buyers). **OAK-T5.001** (Hard LP Drain / Exit Scam — the mint proceeds were transferred to a Binance deposit address within hours and the project's website and social channels were deleted).
**Attribution:** **pseudonymous**. The project's social-media and website presence disappeared immediately after the mint; no public named-individual attribution. The Civikyan NFT service (which had verified the project's identity) published a post-incident statement indicating the project had passed KYC checks under a falsified identity.
**Key teaching point:** **Pre-mint identity verification services are not a sufficient fraud-prevention surface when the underlying identity documents are falsified.** BDAC had passed a third-party KYC/identity verification service (Civikyan) before the mint; the service's post-incident statement confirmed the verification had been performed against falsified identity documents, demonstrating that KYC-at-mint is a necessary but not sufficient fraud deterrent.

## Summary

Big Daddy Ape Club (BDAC) was a Solana NFT project that marketed a 10,000-supply PFP collection inspired by the Bored Ape Yacht Club aesthetic. The project collected 9,136 SOL in mint proceeds on December 19, 2021. No NFTs were delivered; the project's website, Discord, and Twitter were deleted within hours of the mint closing. The proceeds were transferred to a Binance deposit address. The case is one of the earliest Solana NFT rug pulls at scale and a canonical 2021 T12.002 worked example.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-12 (mid-month) | BDAC markets 10,000-supply Solana NFT mint; passes Civikyan KYC verification | T12.002 surface (latent) |
| 2021-12-19 | Mint collects ~9,136 SOL from ~2,000+ retail buyers | T12.002 (collection) |
| 2021-12-19 (within hours) | NFTs never delivered; website, Discord, Twitter deleted; proceeds transferred to Binance deposit address | **T5.001** (exit) |
| Post-event | Civikyan publishes statement confirming KYC was performed against falsified identity documents | (forensic record) |

## Public references

- `[decryptbdac2021]` — Decrypt coverage of the Big Daddy Ape Club Solana NFT rug pull.

## Discussion

Big Daddy Ape Club is OAK's canonical 2021 Solana NFT rug-pull worked example, complementing Evolved Apes (Ethereum, September 2021) as the Solana-side anchor for T12.002 in 2021. The case also closes the T1×2021 threshold gap: the NFT collection's structural fraudulence at genesis (T1.003) is the precondition for the fake-mint distribution (T12.002) and the extraction (T5.001), forming a clean T1→T12→T5 chain at the NFT-launch surface. The case is structurally informative for the KYC-verification-at-mint sub-pattern: BDAC had passed a third-party identity verification service before the mint, demonstrating that KYC verification against falsified identity documents provides a false sense of security rather than a substantive fraud deterrent.
