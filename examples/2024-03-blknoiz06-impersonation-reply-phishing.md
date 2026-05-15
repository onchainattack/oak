# @blknoiz06 Impersonation — $2.6M Meme Coin Reply Phishing — 2024-03

**Loss:** $2.6M+ from victims in a single day (March 16, 2024). Largest single victim lost ~$1.2M.
**OAK Techniques observed:** OAK-T4 (Social Engineering/Phishing) — account impersonation via reply threading on a prominent account's posts, exploiting the meme coin trading frenzy.
**Attribution:** **pseudonymous** — theft address `BUYgBfavHoGbfGYseyTWpzqKNeeYFjoJsgxiQcH4in4v` identified on Solana. Impersonator account not publicly named.

**Key teaching point:** The @blknoiz06 impersonation demonstrates the **reply-jacking phishing** pattern: the attacker created an account impersonating a well-known crypto trader (@blknoiz06) and replied to each of his posts with phishing links. Since the impersonator's reply appeared directly under the real @blknoiz06's content, victims saw the reply in context and assumed it was from the real account. The meme coin trading frenzy amplified effectiveness — users were conditioned to act fast (buy within seconds of a mention), reducing the time spent verifying account authenticity. Detection approach: monitor for new accounts with names visually similar to high-follower crypto accounts that are replying to the real account's posts with token addresses or links; the reply-to-real-post pattern is an automated detection signal.

## Summary

On March 16, 2024, an account impersonating prominent crypto trader @blknoiz06 stole $2.6M+ in a single day. The technique was simple but high-yield:

1. **Create impersonator account:** Account with a name visually similar to @blknoiz06 (e.g., @blknoizO6 with a zero, or similar handle variations).
2. **Reply to every real post:** The impersonator replied to each of @blknoiz06's posts with phishing links or token addresses. The reply appeared directly under the real content.
3. **Meme coin urgency as amplification:** During the March 2024 meme coin craze, @blknoiz06's posts about tokens were closely watched by traders trying to enter positions early. The impersonator's reply — appearing to be from the influencer himself — directed victims to a phishing site or scam token.
4. **Single largest victim: $1.2M.** One wallet lost $1.2M, nearly half the total haul.

The attack exploits a fundamental trust dynamic of social media: users scan replies under trusted accounts and assume the reply is from a real person engaging with the content, not an impersonator. The blue checkmark/verification system was intended to prevent this, but impersonator accounts can still reply to verified accounts' posts.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2024-03-16 | Impersonator account replies to @blknoiz06's posts. $2.6M stolen in one day | **T4 reply-jacking phishing** |
| 2024-03-16 | ZachXBT posts community alert. Theft address published | (public alert) |

## What defenders observed

- **Reply-under-real-post as the trust mechanism:** Victims didn't need to click a link in a DM or email — they saw the reply under content from an account they already trusted. The context (reply to real @blknoiz06 post) provided the credibility.
- **Single-day yield: $2.6M.** The attack was not sustained — it extracted maximum value in a single day before the impersonator account was reported and removed. Flash phishing: hit hard, one day, then abandon the account.
- **Meme coin meta as attack amplifier:** In a trading environment where "buy within 30 seconds of mention" is standard behavior, verification time drops to near zero. The attacker exploited the market's speed expectation.
- **Solana as the phishing chain:** The theft address was on Solana, consistent with the meme coin activity being concentrated on Solana during this period.

## What this example tells contributors

- **Reply-jacking is a distinct T4 sub-technique from DM phishing.** The victim doesn't receive a message — they see a reply in their feed. The trust comes from the context (under a trusted account's post), not from a direct communication. T4 should distinguish "reply-jacking" from "direct message phishing" — different detection surfaces (public replies vs. private messages).
- **High-follower account reply monitoring is a detection primitive.** For any account with >100K followers in crypto, monitoring replies for accounts with similar names posting links or token addresses is an automated detection rule. The impersonator must reply publicly to reach victims, making the attack surface publicly observable.
- **Flash phishing exploits the account suspension latency.** The attacker knows the impersonator account will be reported and removed within hours — the attack is designed to extract maximum value within that window. The detection-to-takedown latency IS the attack surface.

## Public references

- [ZachXBT — @blknoiz06 Impersonation Alert (X/Twitter)](https://x.com/zachxbt/status/1769150002490638597)
- Theft address (Solana): `BUYgBfavHoGbfGYseyTWpzqKNeeYFjoJsgxiQcH4in4v`
- Largest single victim: ~$1.2M.
- @blknoiz06: prominent crypto trader, target of impersonation.
