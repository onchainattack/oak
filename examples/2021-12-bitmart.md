# BitMart hot-wallet compromise — Ethereum/BNB Chain — 2021-12-05

**Loss:** BitMart's CEO put the withdrawn assets at approximately \$150M; PeckShield estimated about \$196M, roughly \$100M in ERC-20 tokens (Ethereum hot wallet) and \$96M in BEP-2/BEP-20 tokens (BSC hot wallet) `[forklogbitmart]` `[fxempirebitmart]`. The attacker used a stolen hot-wallet private key; how the key was obtained was not stated by BitMart `[forklogbitmart]` `[bankinfobitmart]`.
**OAK Techniques observed:** OAK-T11.001 (Third-Party Signing Vendor Compromise — as classified in OAK; the cited sources establish a stolen hot-wallet private key but not a third-party vendor or credential-store compromise). OAK-T7.001 (Mixer-Routed Hop — the attacker swapped tokens for ETH through the 1inch aggregator and sent funds via an intermediate address to Tornado Cash `[forklogbitmart]`). OAK-T5.001 (Hard LP / Treasury Drain — direct extraction from two exchange hot wallets across two chains).
**Attribution:** **unattributed** pseudonymous; the attacker has not been publicly identified. BitMart CEO Sheldon Xia confirmed the breach and said it "was mainly caused by a stolen private key that had two of our hot wallets compromised" `[forklogbitmart]`.
**Corrected 2026-10-11:** Removed the unsupported 1Password / credential-vault attack vector and the "partial funds frozen" claim; loss now shows BitMart's \$150M and PeckShield's \$196M estimates; BitMart said it would compensate users from its own funds.
**Key teaching point:** A centralised exchange's hot-wallet private-key compromise converts a single key-custody failure into a multi-chain on-chain extraction: one stolen key compromised an Ethereum and a BSC hot wallet. The root cause of the key theft was not disclosed in the sources consulted, so any specific vector (credential store, phishing, endpoint compromise) is speculation.

## Summary

On 2021-12-05, an attacker used a stolen private key to drain BitMart's Ethereum and BSC hot wallets. PeckShield's estimate was about \$196M (about \$100M ERC-20 and about \$96M BEP-2/BEP-20); BitMart's CEO put the total at about \$150M `[forklogbitmart]`. Attackers swapped the tokens for ETH using 1inch, moved the ETH to an intermediate address, and then sent funds to Tornado Cash `[forklogbitmart]`.

BitMart initially described the outflows as routine withdrawals and the CEO confirmed the breach hours later `[fxempirebitmart]`. In his December 6 update, Sheldon Xia attributed the breach to a stolen private key affecting one ETH and one BSC hot wallet, said users would be compensated from BitMart's own funds, and said deposits and withdrawals would resume gradually from December 7 `[forklogbitmart]`. No source consulted says how the key was stolen; the 1Password vector previously asserted here has no support in the sources consulted and is removed.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-12-04 to 2021-12-05 | Reported outflows from an Ethereum and a BSC hot wallet (date range per `[forklogbitmart]`) | T11.001 / T5.001 (extraction) |
| 2021-12-05 | Attacker swaps tokens via 1inch to ETH, then moves funds toward Tornado Cash `[forklogbitmart]` | T7.001 |
| 2021-12-05 | BitMart CEO confirms breach; withdrawals paused `[forklogbitmart]` | (operator response) |
| 2021-12-06 | CEO attributes breach to a stolen private key; promises compensation from BitMart funds `[forklogbitmart]` | (operator response) |

## Public references

- `[forklogbitmart]` — Forklog, "Hackers siphoned more than \$150 million from BitMart hot wallets" (2021-12-06): <https://forklog.com/en/hackers-siphoned-more-than-150-million-from-bitmart-hot-wallets/>
- `[fxempirebitmart]` — FXEmpire, "BitMart Losses \$196 Million to Hacker": <https://amp.fxempire.com/en/bitmart-losses-196-million-to-hacker/831404>
- `[bankinfobitmart]` — BankInfoSecurity, "Nearly \$200 Million Stolen in BitMart Crypto Exchange Hack": <https://www.bankinfosecurity.com/nearly-200-million-stolen-in-bitmart-crypto-exchange-hack-a-18068>
- Cross-reference: T11.001 (Third-Party Signing Vendor Compromise) at `techniques/T11.001-third-party-signing-vendor-compromise.md`.
- Cross-reference: T7.001 (Mixer-Routed Hop) at `techniques/T7.001-mixer-routed-hop.md`.
- Cross-reference: T5.001 (Hard LP / Treasury Drain) at `techniques/T5.001-hard-lp-treasury-drain.md`.

## Discussion

BitMart is a hot-wallet private-key compromise at a centralised exchange. The earlier version of this file called it the canonical 1Password / operator-side-credential-vendor T11.001 example; no source consulted supports a 1Password or vendor vector, so the T11.001 mapping rests on OAK's classification of stolen-key incidents and may merit review (a plain key-compromise technique may fit better). The earlier claims that it was the second-largest 2021 CEX hot-wallet compromise and that the 1inch → Tornado Cash pathway recurred across named Q4 2021 incidents were unsourced and are removed.
