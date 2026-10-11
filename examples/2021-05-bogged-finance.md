# Bogged Finance flash-loan staking-reward mint exploit — BNB Chain — 2021-05 (reported 2021-05-24)

**Loss:** approximately \$3M (PeckShield put it at \$3.62M) drained from liquidity after the attacker minted 15M BOG; BOG fell from \$8.50 to \$0.15 `[coindeskbogged]`, `[cryptoslatebogged]`.
**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*. Per CoinDesk, a flaw in the staking-reward / fee logic let the attacker mint ~15M BOG with a flash-loaned position and sell it, collapsing the price from ~\$8.50 to ~\$0.15 `[coindeskbogged]`). **OAK-T9.002** (Flash-Loan-Enabled Exploit — capital source). **Not T16.001:** there was no governance vote; the earlier "vote takeover" framing had no source.

**Re-mapped 2026-10-11:** primary Technique moved from T16.001 to [`T9.016-contract-accounting-state-invariant-flaw`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md).
**Attribution:** **pseudonymous** — no attacker identified in the sources consulted.
**Corrected 2026-10-11:** The incident was a flash-loan exploit of a contract flaw that manipulated staking rewards and minted 15M BOG, not a governance vote takeover; removed the unsourced Tornado Cash routing, snapshot-voting relaunch and Beanstalk-precursor framing. Exact exploit date is not stated in the sources (CoinDesk reported on 2021-05-24).
**Key teaching point:** A flash-loan-funded exploit of reward-accounting logic can mint a large supply of a protocol's own token and drain liquidity within seconds; CoinDesk reports mitigation took about 45 seconds, long enough for roughly \$3M in liquidity to be taken `[coindeskbogged]`.

## Summary

Bogged Finance was a BNB Chain (then Binance Smart Chain) DeFi platform offering limit-order and related tools with a BOG token. CoinDesk reported on 2021-05-24 that the attacker used flash loans to exploit a flaw in the smart contract and manipulate staking rewards, causing 15 million BOG to be minted; the attack was stopped after about 45 seconds `[coindeskbogged]`. BOG's price fell from \$8.50 to \$0.15, over 98% `[coindeskbogged]`. CryptoSlate described it as the third flash-loan-related attack on BSC at the time `[cryptoslatebogged]`.

Bogged said it would migrate liquidity to a new contract (using the same exploit path as the attacker), burn about 7.5M tokens, airdrop liquidity tokens back to owners and return legitimately owned BOG `[coindeskbogged]`. The sources consulted do not say whether that migration was completed or whether funds were recovered.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| ~2021-05-22/23 (date not stated) | Attacker flash-borrows funds and exploits the contract to manipulate staking rewards, minting 15M BOG `[coindeskbogged]` | T9.002 |
| same event | Minted BOG sold into liquidity pools; about \$3M taken in ~45 seconds `[coindeskbogged]` | (extraction) |
| 2021-05-24 | CoinDesk reports; Bogged blog post (a Sunday) outlines liquidity migration `[coindeskbogged]` | (operator response) |

## Public references

- `[coindeskbogged]` — CoinDesk, "BSC-Based Bogged Finance Suffers \$3M Exploit" (2021-05-24): <https://www.coindesk.com/ja/markets/2021/05/24/bsc-based-bogged-finance-suffers-3m-exploit>
- `[cryptoslatebogged]` — CryptoSlate, "DeFi tool 'Bogged Finance' sees \$3 million hack, prices plunge 98%": <https://cryptoslate.com/defi-tool-bogged-finance-sees-3-million-hack-prices-plunge-98/>
