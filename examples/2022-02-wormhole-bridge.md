# Wormhole Bridge validator economic-incentive gap — 2022-02

**Loss:** **$326M** (120,000 WETH) extracted from the Wormhole Bridge on Solana via a validator-signer key compromise (exploiting a signature-verification vulnerability in the bridge's Solana-side contract, CVE-2022-22709). The attacker forged a validator signature for a Guardian-set quorum of 1-of-19, bypassing the bridge's verification logic and minting 120,000 WETH on Solana without a corresponding Ethereum-side deposit.
**OAK Techniques observed:** **OAK-T10.001** (Validator/Signer Key Compromise via Bridge Messaging Protocol Vulnerability) — primary classification is the signature-verification bypass. **OAK-T10.007** (Bridge Validator Economic-Incentive Misalignment) — secondary observation: the 19-member Wormhole Guardian set operated with zero economic bonding (stake/TVL = 0), meaning there was no cryptoeconomic deterrent against validator misbehaviour. The bridge relied entirely on off-chain reputation and legal-entity liability.
**Attribution:** **unattributed** — no public attribution at v0.1 cutoff. The funds were laundered through Solana-based DEXes and cross-chain bridges.

**Key teaching point:** Wormhole Bridge is the canonical T10.007 PATH A anchor demonstrating the stake/TVL = 0 structural condition: a bridge with $326M+ TVL secured by a 19-member Guardian set with zero at-risk economic stake. The bridge's security model relied entirely on off-chain reputation — no staking, no slashing, no on-chain cryptoeconomic deterrence. When a technical vulnerability (T10.001) created a 1-of-19 quorum bypass, there was zero economic cost to exploiting it.

## Summary

Wormhole Bridge — a cross-chain messaging protocol connecting Ethereum, Solana, and other chains — was exploited on 2022-02-02 for approximately $326M in WETH. The attacker exploited a vulnerability in the bridge's Solana-side signature-verification logic that allowed a single Guardian signature (1-of-19 quorum, rather than the intended supermajority) to authorise message verification and token minting.

The Wormhole Guardian set consisted of 19 named entities — primarily large validators, infrastructure providers, and protocol developers — who operated without any on-chain staking or slashing mechanism. The bridge's security model relied on the Guardians' off-chain reputation and legal-entity liability, not on cryptoeconomic incentives. This stake/TVL = 0 condition meant there was no economic deterrent — a Guardian who colluded with an attacker or operated negligently faced no on-chain financial penalty.

The attacker's 120,000 WETH were minted on Solana and subsequently bridged to Ethereum via Wormhole's own Ethereum-Solana bridge, then partially swapped through DEXes. Jump Crypto, Wormhole's parent company, replenished the 120,000 ETH within ~24 hours.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-02-02 18:26 UTC | Attacker forges Guardian signature via signature-verification bypass; 120,000 WETH minted on Solana | T10.001 (signature verification bypass) |
| 2022-02-02 | 120,000 WETH bridged from Solana to Ethereum via Wormhole | T7.003 (cross-chain bridge laundering) |
| 2022-02-03 | Jump Crypto replenishes 120,000 ETH to Wormhole | (remediation) |
| 2022-02-03 | Wormhole team patches the signature-verification vulnerability; bridge resumes operation | (remediation) |

## Public references

- Wormhole incident post-mortem (Certik / CertiK audit follow-up, 2022-02-03).
- CVE-2022-22709: Wormhole Solana-side signature verification bypass.
- Jump Crypto: 120,000 ETH replenishment announcement (2022-02-03).
