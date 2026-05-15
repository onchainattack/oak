# Tether treasury hack — Bitcoin (Omni Layer) — 2017-11-19

**Loss:** approximately \$31M USDT (30,950,010 USDT tokens) stolen from Tether's Omni Layer treasury wallet via an external attacker who gained access to Tether's signing infrastructure and issued a transaction transferring USDT to an unauthorized Bitcoin address.
**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing Vendor Compromise — broadly construed; the compromise was of Tether's own signing infrastructure, making Tether itself the "vendor" of custody to its users, but the signing-infrastructure-compromise shape is structurally T11.001). **OAK-T1.002** (Token-2022 Permanent Delegate — cross-standard ancestor; the Omni Layer USDT treasury had an effective "permanent delegate" in the form of the single signing authority on the treasury wallet, and the compromise of that signing key enabled unauthorized token issuance). **OAK-T7.001** (Mixer-Routed Hop — the attacker attempted to launder the stolen USDT through centralized exchanges but Tether's rapid blacklisting of the attacker address largely froze the funds) + **OAK-T7.008** (Stablecoin-Issuer Coordination Laundering).
**Attribution:** **pseudonymous**. Tether claimed the attack originated from an external actor who compromised the treasury wallet's signing infrastructure; no named individual or group was publicly identified.
**Key teaching point:** **The Tether treasury hack is the canonical 2017 worked example of centralized stablecoin issuer as single-point-of-failure.** The incident drove Tether's migration from the Omni Layer (Bitcoin) to Ethereum (ERC-20) and motivated the development of on-chain asset-freezing capabilities (blacklist functions) that became standard in post-2018 stablecoin implementations. The blacklisting of the attacker address — a centralized intervention — is the canonical example of stablecoin-issuer freeze-as-defensive-tool and remains the reference case in debates about stablecoin censorship versus theft prevention.

## Summary

Tether (USDT) was originally issued on the Bitcoin blockchain via the Omni Layer protocol, a metadata layer built on top of Bitcoin transactions. The Tether treasury wallet on the Omni Layer held signing authority to issue and redeem USDT tokens. On 2017-11-19, an attacker gained unauthorized access to the signing infrastructure for this treasury wallet and issued a transaction transferring 30,950,010 USDT (approximately \$31M at the time) to an unauthorized Bitcoin address controlled by the attacker.

The attacker attempted to launder the stolen USDT by depositing it to centralized exchanges (including Poloniex and Bittrex) and converting it to Bitcoin. Tether responded within hours by:

1. Publishing a new version of the Omni Core client (0.2.99) that included an emergency fork blacklisting the attacker's address, preventing further movement of the stolen USDT on the Omni Layer.
2. Coordinating with exchanges to freeze the attacker's deposit addresses, preventing conversion to Bitcoin.
3. Announcing a token swap from the old USDT contract to a new USDT contract on the Omni Layer, effectively reissuing the legitimate supply and leaving the attacker's tokens valueless.

The incident precipitated Tether's migration from the Bitcoin Omni Layer to Ethereum as ERC-20 tokens (completed in 2018-2019). The ERC-20 implementation included a `blacklist` function that allowed Tether to freeze specific addresses — a capability that the Omni Layer's Bitcoin-transaction-based architecture did not natively support. The blacklisting capability, initially controversial in decentralization-focused circles, became the canonical stablecoin-issuer security primitive and is now standard across USDC (Circle), BUSD (Paxos), TUSD, and other fiat-backed stablecoins.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| pre-2017-11-19 | USDT issued on Bitcoin Omni Layer; single-signing-authority treasury wallet; no on-chain freeze capability | (standing T11.001 surface) |
| 2017-11-19 | Attacker compromises Tether's signing infrastructure; issues 30,950,010 USDT to unauthorized Bitcoin address | T11.001 (signing-infrastructure compromise) |
| 2017-11-19 T+hours | Tether publishes emergency Omni Core client (v0.2.99) with attacker-address blacklist hard-coded; exchange coordination begins | (defender response) |
| 2017-11-20 | Attacker attempts to deposit stolen USDT to Poloniex/Bittrex; exchanges freeze attacker deposit addresses | T7.001 (exchange-routed laundering — blocked) |
| 2017-11-21 to 2017-12 | Tether initiates token swap: old USDT → new USDT on Omni Layer; attacker's tokens rendered valueless | (remediation via reissuance) |
| 2018-2019 | Tether migrates primary issuance from Omni Layer to Ethereum ERC-20; ERC-20 contract includes `blacklist` function | (architectural remediation) |

## Realised extraction

Approximately \$31M in USDT; effectively zero realised by the attacker due to rapid blacklisting and exchange-side freezing.

## T1.002 cross-standard classification

The Tether treasury wallet on the Omni Layer held an analogue of the "permanent delegate" authority that OAK-T1.002 addresses in the Solana Token-2022 context: a single signing key that could authorize any transfer from the treasury. The compromise of that key is structurally identical to a Permanent Delegate key compromise in Token-2022. The case is classified under T1.002 (cross-standard ancestor) to anchor the single-signing-authority-as-permanent-delegate lineage: Tether Omni 2017 → Token-2022 PermanentDelegate 2024-2025.

## Public references

- Tether, "Tether Critical Announcement," November 19, 2017
- Tether, "Tether Statement on Security Incident," November 20, 2017
- Omni Core v0.2.99 release notes (emergency fork with blacklist)
- Poloniex / Bittrex incident coordination statements (November 2017)
