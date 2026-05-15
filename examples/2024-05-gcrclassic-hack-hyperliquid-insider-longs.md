# GCR Classic Hack → $3.3M Insider Longs on Hyperliquid — 2024-05

**Loss:** $3.3M in leveraged insider trading profits via Hyperliquid perpetual futures. Attacker opened $2.3M ORDI and $1M ETHFI longs minutes before hacking @GCRClassic X account and posting about those assets, profiting from the price movement.
**OAK Techniques observed:** OAK-T12 (Market/MEV/Oracle) — insider positioning via derivatives before market-moving information release; OAK-T6 (Authorization/Key Compromise) — X/Twitter account compromise of @GCRClassic.
**Attribution:** **Traced** — connected to the $CAT meme coin team on Solana. Minutes before the GCRClassic hack, an address tied to the team opened $2.3M ORDI and $1M ETHFI longs on Hyperliquid.

**Key teaching point:** The GCR Classic hack demonstrates the **derivatives pre-positioning** pattern: the attacker didn't just hack a high-profile X account to post about tokens — they opened leveraged long positions on those tokens MINUTES BEFORE the hack. When the compromised account posted about ORDI and ETHFI, the prices moved, and the attacker's pre-opened longs became profitable. This is insider trading executed through account compromise as the information-release mechanism. Detection approach: monitor for large derivative positions opened on low-activity tokens immediately before a high-profile influencer account posts about those specific tokens — the timing correlation is the detection signal.

## Summary

On May 26, 2024, the X/Twitter account of @GCRClassic (a prominent crypto trader/influencer) was hacked. The attacker used the account to post about specific tokens, causing price movements.

The forensic breakthrough: minutes BEFORE the hack, an address tied to the $CAT meme coin team on Solana opened leveraged long positions on Hyperliquid:

- $2.3M ORDI long
- $1M ETHFI long

The tokens posted about from the compromised @GCRClassic account were ORDI and ETHFI — exactly the tokens the attacker had pre-positioned longs on. The price movement from the GCRClassic posts made those longs profitable.

The $CAT meme coin team connection suggests the hack was executed by or in coordination with the same group.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2024-05-26 (minutes before hack) | Address tied to $CAT team opens $2.3M ORDI and $1M ETHFI longs on Hyperliquid | **T12 derivative pre-positioning** |
| 2024-05-26 | @GCRClassic X account hacked. Posts about ORDI and ETHFI. Prices move | **T6 account compromise** |
| 2024-05-26 | Long positions profit from price movement. $3.3M+ in insider trading profits | **T12 insider extraction** |
| 2024-05-27 | ZachXBT publishes investigation linking hack to $CAT meme coin team | (public disclosure) |

## What defenders observed

- **Derivatives pre-positioning as the smoking gun.** The attacker didn't just hack an account and post — they placed financial bets that would profit from those specific posts. The derivative positions on Hyperliquid were public (on-chain or exchange order book data) and revealed the premeditation.
- **Hyperliquid as the insider trading venue.** Hyperliquid is a decentralized perpetual futures exchange. The attacker chose it because derivative positions can be opened with leverage (amplifying returns from small price movements) and because on-chain derivative platforms may have less market surveillance than centralized exchanges.
- **Specific token selection = pre-planned information asymmetry.** The attacker opened longs on ORDI and ETHFI specifically — the same tokens posted about from the compromised account. This is not random — the tokens were selected because a post from @GCRClassic about them would move their price. The token selection IS the insider information.
- **$CAT meme coin team connection.** The address that opened the derivative positions was tied to the $CAT meme coin team, linking the account compromise to an existing token operation.

## What this example tells contributors

- **Derivatives pre-positioning before market-moving posts is a T12 detection primitive.** When derivative positions are opened on low-liquidity tokens minutes before a high-profile account posts about those tokens, the timing correlation is a near-zero-false-positive insider trading signal. OAK T12 detection specs should include "derivative position opening → influencer post about same token → position closure" as a timing-based detection pattern.
- **Hyperliquid and on-chain derivatives platforms are T12 detection data sources.** On-chain derivative position data is public and can be monitored for anomalous large positions on low-activity tokens. This is a detection advantage over centralized exchanges (where order book data is private).
- **Account compromise as information-release mechanism for insider trading.** The @GCRClassic hack was not for direct theft — it was for the INFORMATION DISTRIBUTION POWER of the account. This is T6 (account compromise) in service of T12 (market manipulation), not T5 (asset drain).

## Public references

- [ZachXBT — GCR Classic Hack / Hyperliquid Insider Longs (X/Twitter)](https://x.com/zachxbt/status/1795082820177498349)
- @GCRClassic: hacked X/Twitter account, used to post about ORDI and ETHFI.
- Hyperliquid: decentralized perpetual futures exchange where $3.3M insider longs were opened.
- $CAT meme coin team connection: address tied to team opened positions minutes before hack.
