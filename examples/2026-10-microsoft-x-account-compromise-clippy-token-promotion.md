# Microsoft's X account — a hijacked corporate account promoted a "CLIPPY" token riding the MSFT ticker — Microsoft (@Microsoft on X) / token chain not reported — 2026-10-01

**Loss:** **not reported.** A promoter account cited CLIPPY liquidity pools "over \$200,000"; buyer losses are unquantified. Some promoters claimed the pools were backed by Microsoft shares; that is unverified and Microsoft denies any connection.

**OAK Techniques observed:** **OAK-T15.006** (Impersonation via Verified Social-Account Compromise — *primary*. Microsoft confirmed **"unauthorized access to our account on X, including posts that did not come from Microsoft."** The access vector is undisclosed. See [`techniques/T15.006-impersonation-via-verified-social-account-compromise.md`](../techniques/T15.006-impersonation-via-verified-social-account-compromise.md)). **OAK-T3.004** (Influencer-Amplified Promotion and Dump — the account's reach was the asset being used).

**Attribution:** **unattributed.**

**Key teaching point:** **The reach of a corporate account is a liquidity source for whoever controls it for thirty minutes.** The same pattern as the [SEC](2024-01-sec-x-account-compromise.md) account in 2024: the brand needs no crypto exposure for its account to be worth hijacking for a token pump.

## Summary

On 2026-10-01 Microsoft's official X account posted promotions for CLIPPY, an unofficial meme coin playing on Clippy and the MSFT ticker. The posts were removed; an apology appeared about 30 minutes later and was itself quickly deleted. Microsoft said the account was secured, that it never authorised use of its IP for a token, and that it would pursue removal of the token and its marketing.

## Timeline (UTC)

Read it as three stages. **Get in**: undisclosed access to the account. **Prepare**: not published. **Take**: a few minutes of posts promoting a token. Exact times are not given in the cited source (Bitcoin.com News, 2026-10-02).

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-01 (undisclosed) | How the attacker gained access to Microsoft's X account is not published. | **T15.006** entry |
| 2026-10-01 (Thursday, time undisclosed) | The account follows an account promoting CLIPPY, an unofficial meme coin built on Clippy and the MSFT ticker, reposts one of its tweets, and changes its profile picture to Clippy. | **T15.006** |
| same day | The CLIPPY promotion rides the account's reach. A promoter account cites liquidity pools reportedly worth over \$200,000; claims that Microsoft shares back them are unverified. | **T3.004** |
| same day | The posts are removed. An apology tweet appears about 30 minutes later and is deleted almost as quickly. | response |
| 2026-10-01 | Microsoft confirms to The Verge "unauthorized access to our account on X, including posts that did not come from Microsoft", says the account is secured and the unauthorized posts removed, and that it is still investigating. The deleted apology said Microsoft never authorized token promotion with its IP and would seek the token's removal. | response |
| after the posts | Buyer losses and where any funds went are not reported; the token's chain is not reported. | — |

Key addresses:

- No wallet, token-contract or pool addresses are published in the cited source.

## Root-cause evidence

- **Technique:** OAK-T15.006
- **Source:** <https://news.bitcoin.com/crypto-news/microsoft-x-account-hijacked-promote-clippy-meme-coin/>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Microsoft confirmed 'unauthorized access to our account on X, including posts that did not come from Microsoft'. The access vector is undisclosed; the Technique records the account takeover, not how it happened.

## Public references

- `[bitcoincommicrosoft2026]` — Bitcoin.com News, "Microsoft X account hijacked to promote Clippy meme coin" (2026-10-02): <https://news.bitcoin.com/crypto-news/microsoft-x-account-hijacked-promote-clippy-meme-coin/>
