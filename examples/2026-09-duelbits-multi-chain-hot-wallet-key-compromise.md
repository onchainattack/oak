# Duelbits — four chains' hot wallets emptied within minutes, which is one compromise, not four — Duelbits (crypto casino) / Ethereum, BNB Chain, Tron, Bitcoin — 2026-09-24

**Loss:** **~\$7M** per Duelbits' co-founder (SlowMist's tracker records \$4.9M; early PeckShield alerts \$4.3M as outflows were still being counted). Moved within minutes: **836 ETH, ~593,000 USDT, ~97,000 USDC, ~31,500 DAI, ~12.4B SHIB**, plus **8.1 BTC** from the Bitcoin hot wallet. Most was swapped to ETH and consolidated into **one address holding ~2,234 ETH (~\$6M)**, which had not moved further at last report. Duelbits states **user funds are safe** and took the platform offline until the investigation completes and the hot wallet is refunded.

**OAK Techniques observed:** **OAK-T11.011** (Multi-chain Key-store Co-location — *primary, inferred from the extraction pattern*, following the Coinsbuy (2026-08) and Nobitex (2025-06) precedent. **Near-simultaneous outflows from hot wallets on four chains with unrelated address formats and signing schemes** are the diagnostic signature of one compromised signing layer serving all of them. See [`techniques/T11.011-multi-chain-key-store-co-location.md`](../techniques/T11.011-multi-chain-key-store-co-location.md)). **The access vector is undisclosed**; Duelbits said it was *"still investigating exactly what happened and how."* Private-key compromise is the suspected cause per ScamSniffer and press, not a confirmed finding.

**Attribution:** **pseudonymous.** Flagged first by **ScamSniffer**; PeckShield followed.

**Key teaching point:** **Hot wallets on different chains are only independent if their keys are.** If one intrusion can sign on Ethereum, BNB Chain, Tron and Bitcoin, the operator has one hot wallet with four balances, and its blast radius is the sum. Segregating key custody per chain — separate hosts, separate HSM partitions, separate operator access — turns a four-chain loss into a one-chain loss.

## Summary

On 2026-09-24 Duelbits' hot wallets on Ethereum, BNB Chain and Tron sent their balances to newly created addresses within minutes, and the Bitcoin hot wallet lost 8.1 BTC. ScamSniffer flagged the outflows; Duelbits confirmed a ~\$7M loss, took the platform offline, and said user funds were safe. The proceeds were swapped to ETH and parked in a single address.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| undisclosed | Signing layer serving multi-chain hot wallets compromised | (entry vector — undisclosed) |
| 2026-09-24 | ETH, BSC, Tron hot wallets send funds to fresh addresses within minutes; 8.1 BTC from BTC hot wallet | **T11.011** |
| 2026-09-24 (reported 11:48 EDT) | ScamSniffer flags; PeckShield confirms outflows | (detection) |
| 2026-09-24 → 25 | Assets swapped to ETH, consolidated to one address (~2,234 ETH) | (consolidation) |
| 2026-09-25 | Co-founder confirms ~\$7M; services suspended | (operator disclosure) |

## Public references

- `[coindeskduelbits2026]` — CoinDesk, "Hackers drain \$7 million from crypto casino Duelbits in suspected private key compromise" (2026-09-24): <https://www.coindesk.com/business/2026/09/24/crypto-casino-duelbits-goes-offline-after-usd7m-hot-wallet-hack>
- `[cryptobasicduelbits2026]` — The Crypto Basic, "PeckShield Flags \$4.3M in Suspicious Duelbits Outflows, Including 836 ETH and 12.398B Shiba Inu" (2026-09-24): <https://thecryptobasic.com/2026/09/24/peckshield-flags-4-3m-in-suspicious-duelbits-outflows-including-836-eth-and-12-398b-shiba-inu/>
- `[cybersecuritynewsduelbits2026]` — Cyber Security News, "Duelbits Confirms \$7 Million Hot-Wallet Hack, forcing Systems offline": <https://cybersecuritynews.com/duelbits-7-million-hack/>
