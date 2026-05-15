# Gurvinder Bhangu (Gurv) — Celebrity X Account Compromise → Meme Coin Scams — 2024-07

**Loss:** $530K+ from compromises of Sydney Sweeney and Bob Odenkirk X/Twitter accounts, used to launch Solana meme coin scams. Convicted UK hacker with prior criminal history.
**OAK Techniques observed:** OAK-T6 (Authorization/Key Compromise) — X/Twitter account takeover of verified celebrity accounts; OAK-T2 (Token/Investment Fraud) — using celebrity accounts to launch/promote scam meme coins.
**Attribution:** **Identified** — Gurvinder Bhangu (Gurv), convicted UK hacker. ZachXBT investigation published July 2024.

**Key teaching point:** The Gurv case demonstrates the **celebrity account compromise → meme coin launch** pattern: the attacker does not drain the compromised account's followers directly — instead, he uses the celebrity's verified account to post a meme coin contract address. Followers buy the token, believing it's endorsed by the celebrity. The attacker, who pre-minted or pre-allocated the token supply, sells into the celebrity-driven buying pressure. The celebrity's account is the pump mechanism; the meme coin is the extraction vehicle. Detection approach: when a verified celebrity account with no prior crypto content suddenly posts a token contract address, flag it as a likely compromise within seconds — the detection window between the compromise post and the first victim buy is measured in minutes.

## Summary

In July 2024, ZachXBT published an investigation into Gurvinder Bhangu (Gurv), a convicted UK hacker, connecting him to the compromises of Sydney Sweeney's and Bob Odenkirk's X/Twitter accounts, which were used to promote Solana meme coin scams.

**Attack pattern:**

1. **Compromise celebrity X account:** Gurv gained access to verified celebrity accounts (Sydney Sweeney — actress; Bob Odenkirk — actor).
2. **Post meme coin contract address:** From the compromised account, post a Solana token contract address with a promotional message.
3. **Followers buy the token:** The celebrity's millions of followers see the post. Some buy the token, believing it's a legitimate celebrity endorsement.
4. **Attacker sells pre-minted supply:** Gurv, who controlled the token's initial supply, sells into the buying pressure, extracting $530K+.

The celebrity account is a "rented" pump mechanism — the attacker uses it for minutes, extracts the value, and abandons it. The account itself is not drained (the celebrity may not even have crypto); it's the FOLLOWERS who lose money buying the scam token.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| Pre-Jul 2024 | Sydney Sweeney and Bob Odenkirk X accounts compromised | **T6 account takeover** |
| Post-compromise | Scam Solana meme coins promoted from celebrity accounts | **T2 scam token launch** |
| Post-compromise | $530K+ extracted from followers buying the scam tokens | **T2 extraction** |
| 2024-07-30 | ZachXBT publishes investigation linking Gurv to the compromises | (public disclosure) |

## What defenders observed

- **Celebrity account = distribution channel, not target.** The celebrity accounts were not the victims (no crypto was taken from them). They were the DISTRIBUTION INFRASTRUCTURE for the scam — the equivalent of hijacking a TV station to air a fraudulent ad.
- **Meme coin as the extraction vehicle.** The scam token is created specifically for this attack. The token has no utility — it exists only to be the asset that victims buy and the attacker dumps. The token contract itself is the scam mechanism.
- **Convicted hacker = identifiable threat actor.** Gurv had a prior criminal record, making attribution straightforward once the on-chain trail was connected to known infrastructure.
- **Minutes-long attack window.** The celebrity's management/PR team will typically recover the account and delete the scam post within minutes to hours. The attack is designed for this short window — the token surges on the celebrity post, the attacker sells immediately.

## What this example tells contributors

- **Celebrity account compromise is a T6 sub-type distinct from exchange account compromise.** The attacker is not after the account's crypto assets — they're after the account's DISTRIBUTION POWER (follower count). T6 should distinguish "account takeover for asset theft" from "account takeover as distribution channel."
- **"Celebrity suddenly posts crypto" is a near-zero-false-positive detection rule.** When a verified account with no prior crypto content suddenly posts a token contract address, the probability of compromise approaches 100%. This is an automatable detection rule with immediate takedown value.
- **Token contract pre-mint analysis could flag the scam before launch.** If the token contract was created minutes before the celebrity post, and the creator wallet holds a large percentage of supply, the scam is detectable before the post goes live. Monitoring newly created tokens where a single wallet holds >50% supply is a pre-attack detection primitive.

## Public references

- [ZachXBT — Gurv Investigation (X/Twitter)](https://x.com/zachxbt/status/1818245914580120015)
- Gurvinder Bhangu: convicted UK hacker.
- Compromised accounts: Sydney Sweeney, Bob Odenkirk (X/Twitter).
- $530K+ extracted via Solana meme coin scams.
