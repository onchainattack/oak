# Binance — a DevOps engineer's laptop led to a service container that could submit withdrawals, and the hot wallets were emptied — Binance / Ethereum, Bitcoin, Tron, XRP Ledger and others — 2026-10-29

**Loss:** **~\$6.3B** per Binance (Chainalysis ~\$5.91B, Elliptic ~\$6.43B at theft-time prices). About **\$3B frozen on-chain** by 2026-10-30, mostly stablecoins (Tether >1.567B USDT, Circle 800M USDC; Ripple and World Liberty Financial also froze, Arbitrum's Security Council froze ~\$30M). Elliptic counts ~\$3.33B the attacker still controls in assets no issuer can freeze, including ~511,861 ETH and 18,270 BTC. Binance says it will cover all losses from SAFU and company funds; deposits and withdrawals were suspended. The largest crypto theft on record, about four times Bybit.

**OAK Techniques observed:** **OAK-T15.003** (Operator-Endpoint Compromise — *primary, operator-stated preliminary finding*. Binance: a **compromised DevOps engineer's laptop** "allowed an attacker to gain access to a service container and submit unauthorized withdrawal transactions"; it found "no evidence of any wallet private key leak". Co-CEO Richard Teng later said it was not one engineer's permissions or a one-click action, and Binance said it had "uncovered additional points of breach". See [`techniques/T15.003-operator-endpoint-compromise.md`](../techniques/T15.003-operator-endpoint-compromise.md)). **OAK-T13.004** (EIP-7702 Delegation Abuse — *per TRM Labs*. At 20:20 UTC one transaction carried **50 authorizations signed by the Binance hot wallet** for 50 consecutive nonces, each delegating to a sweeper contract; 3 min 24 s later the hot wallet sent its entire balance (167,464 ETH, 63 tokens, 1.615B USDT) to the attacker. Signatures were made by Binance's own systems, consistent with Elliptic's view that the attacker got Binance's infrastructure to sign. See [`techniques/T13.004-eip7702-delegation-abuse.md`](../techniques/T13.004-eip7702-delegation-abuse.md)). On Bitcoin, 18,270 BTC left in 11 transactions shaped like ordinary withdrawals and were split into 19 wallets (CoinDesk).

**Attribution:** **inferred-strong** — by blockchain-analytics firms, not by Binance. TRM Labs ("high confidence") and Chainalysis tie it to DPRK / TraderTraitor ([OAK-G01](../actors/OAK-G01-lazarus.md)); stolen funds met [Bitget](2026-09-bitget-wallet-backend-spoofed-transfer-data-hot-warm-drain.md) exploit funds at the same address (0x15104a9c…feb7). Elliptic agrees on DPRK but flags laundering that differs from the Bybit pattern. Binance says it is working with law enforcement to identify the attackers.

**Key teaching point:** **If a container can submit withdrawals, the key is wherever that container is.** No key leaked, and it did not need to: the signing service did what it was asked. Withdrawal paths need limits and approvals that the submitting service cannot satisfy by itself, and an exchange hot wallet that is an EOA on a 7702 chain needs a policy on what it will ever sign as a delegation.

## Summary

On 2026-10-29 Binance hot wallets on several chains were drained in minutes. On 2026-10-30 Binance published preliminary findings (DevOps laptop → service container → unauthorized withdrawals), froze ~\$3B with issuers and chain partners, and suspended deposits and withdrawals pending "a security revamp of the withdrawal service and its related addresses". A full post-mortem is promised.

## Root-cause evidence

- **Technique:** OAK-T15.003
- **Source:** <https://x.com/binance/status/2115993361517891592>; <https://www.binance.com/en/support/announcement/detail/c5a8729a97ac486d963784d96c5642d7>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Binance states the laptop → service container → unauthorized withdrawal path as its preliminary finding and says it has found additional points of breach. The T13.004 detail is TRM Labs' on-chain reconstruction as reported by The Hacker News, not a Binance statement.

## Public references

- `[binanceincident2026]` — Binance on X, initial investigation (2026-10-30): <https://x.com/binance/status/2115993361517891592>
- `[binanceannouncement2026]` — Binance, security incident update: <https://www.binance.com/en/support/announcement/detail/c5a8729a97ac486d963784d96c5642d7>
- `[thnbinance2026]` — The Hacker News, "Binance Suffers Security Breach Affecting \$6.3 Billion in Assets, Nearly \$3 Billion Frozen": <https://thehackernews.com/2026/10/binance-suffers-security-breach.html>
- `[coindeskbinancebtc2026]` — CoinDesk, Binance hacker splits \$1.4B of bitcoin into 19 wallets (2026-10-30): <https://www.coindesk.com/markets/2026/10/30/binance-hacker-splits-usd1-4-billion-of-bitcoin-into-19-wallets-that-no-one-can-freeze>
