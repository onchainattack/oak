# Gamdom — an unauthorised connection to an automation server, then hot wallets on four chains drained — Gamdom (crypto casino) / EVM chains, Solana, Tron, Bitcoin — 2026-10-13

**Loss:** **just over \$3M** per founder Felix Romer; on-chain observers estimate **~\$4.2M**, broken down (per Arkham data cited by press) as ~\$2.2M across EVM networks (Ethereum, BNB Chain, Polygon, Arbitrum, Optimism), ~\$965K on Solana, ~\$375K on Tron and ~\$668K in Bitcoin. Gamdom says **user funds are safe** and moved the remaining hot-wallet funds to cold storage; the site was still offline on 2026-10-15.

**OAK Techniques observed:** **OAK-T15.003** (Operator-Endpoint Compromise — *entry, operator-stated*. Gamdom first reported a suspected disk failure on a server, then said it had found **an unauthorised connection to an automation server**. How the connection was obtained is not disclosed. See [`techniques/T15.003-operator-endpoint-compromise.md`](../techniques/T15.003-operator-endpoint-compromise.md)). **OAK-T11.011** (Multi-chain Key-store Co-location — *inferred from the extraction pattern*, as for [Duelbits](2026-09-duelbits-multi-chain-hot-wallet-key-compromise.md) three weeks earlier: outflows from hot wallets on chains with unrelated signing schemes point to one signing layer reachable from one intrusion. See [`techniques/T11.011-multi-chain-key-store-co-location.md`](../techniques/T11.011-multi-chain-key-store-co-location.md)). Whether the server held keys or could request signatures is not disclosed.

**Attribution:** **unattributed.**

**Key teaching point:** **An automation server that can move hot-wallet funds is a hot wallet.** The second crypto casino in three weeks lost balances on four chains at once. Segregating signing per chain, and keeping automation behind per-transaction limits it cannot change itself, bounds what one intrusion can take.

## Summary

On 2026-10-13 Gamdom took its site offline, initially citing a possible disk failure. On 2026-10-14 it said it had found an unauthorised connection to an automation server, and Romer described a breach of the hot-wallet system with losses of just over \$3M. Observers saw unusual transfers from Gamdom hot-wallet addresses across several networks; reports say funds were swapped, bridged and routed through THORChain and Hyperliquid.

## Root-cause evidence

- **Technique:** OAK-T15.003
- **Source:** <https://x.com/gamdom/status/2110213246410227730>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** Gamdom states an unauthorised connection to an automation server preceded the hot-wallet drain; vector and key-handling are undisclosed. The T11.011 secondary is OAK's inference from simultaneous multi-chain outflows, not an operator finding.

## Public references

- `[cryptotimesgamdom2026]` — The Crypto Times, "Gamdom founder confirms hot wallet breach resulting in just over \$3 million loss" (2026-10-15): <https://www.cryptotimes.io/2026/10/15/gamdom-founder-confirms-hot-wallet-breach-resulting-in-just-over-3-million-loss/>
- `[gamdomxunauthorised2026]` — Gamdom on X, unauthorised connection update: <https://x.com/gamdom/status/2110213246410227730>
- `[romergamdom2026]` — Felix Romer on X, loss confirmation: <https://x.com/Romer/status/2110411281350230457>
- `[ambcryptothreeexploits2026]` — AMBCrypto, "Crypto's security crisis deepens - 3 exploits rattle the market in 24 hours" (2026-10-15): <https://ambcrypto.com/cryptos-security-crisis-deepens-3-exploits-rattle-the-market-in-24-hours/>
