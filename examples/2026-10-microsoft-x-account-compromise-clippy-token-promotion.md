# Microsoft's X account — a hijacked corporate account promoted a "CLIPPY" token riding the MSFT ticker — Microsoft (@Microsoft on X) / token chain not reported — 2026-10-01

**Loss:** **not reported.** A promoter account cited CLIPPY liquidity pools "over \$200,000"; buyer losses are unquantified. Some promoters claimed the pools were backed by Microsoft shares; that is unverified and Microsoft denies any connection.

**OAK Techniques observed:** **OAK-T15.006** (Impersonation via Verified Social-Account Compromise — *primary*. Microsoft confirmed "unauthorized access to our account on X, including posts that did not come from Microsoft" ([Bitcoin.com News](https://news.bitcoin.com/crypto-news/microsoft-x-account-hijacked-promote-clippy-meme-coin/)). The access vector is undisclosed. See [`techniques/T15.006-impersonation-via-verified-social-account-compromise.md`](../techniques/T15.006-impersonation-via-verified-social-account-compromise.md)). OAK's influencer promotion-and-dump Technique is not declared: no opened page reports a sale or dump by the token's promoters.

**Attribution:** **unattributed.**

**Key teaching point:** **The reach of a corporate account is an advertising channel for whoever controls it, even briefly.** The same pattern as the [SEC](2024-01-sec-x-account-compromise.md) account in 2024: the brand needs no crypto exposure for its account to be worth hijacking for a token pump.

## Summary

On 2026-10-01 Microsoft's official X account followed an account promoting CLIPPY, an unofficial meme coin playing on Clippy and the MSFT ticker, reposted one of its tweets and changed its profile picture to Clippy ([Bitcoin.com News](https://news.bitcoin.com/crypto-news/microsoft-x-account-hijacked-promote-clippy-meme-coin/)). [Windows Latest](https://www.windowslatest.com/2026/10/02/hacker-hijacked-microsofts-x-500000-likes-and-we-bring-clippy-back-all-to-pump-a-crypto-token/) adds that the account also quoted the Clippy account's post with a line promising Clippy's return at 500,000 likes. The posts were removed; an apology appeared about 30 minutes later and was itself quickly deleted ([Bitcoin.com News](https://news.bitcoin.com/crypto-news/microsoft-x-account-hijacked-promote-clippy-meme-coin/)). Microsoft said the account was secured, that it never authorised use of its IP for a token, and that it would pursue removal of the token and its marketing (per the deleted apology, as described by Bitcoin.com News).

## Timeline (UTC)

Read it as three stages. **Get in**: undisclosed access to the account. **Prepare**: not published. **Take**: posts promoting a token. Exact times and the length of the compromise are not given in the opened sources ([Bitcoin.com News](https://news.bitcoin.com/crypto-news/microsoft-x-account-hijacked-promote-clippy-meme-coin/), [BleepingComputer](https://www.bleepingcomputer.com/news/security/microsofts-x-account-hacked-in-crypto-token-pump-and-dump-scheme/), [Windows Latest](https://www.windowslatest.com/2026/10/02/hacker-hijacked-microsofts-x-500000-likes-and-we-bring-clippy-back-all-to-pump-a-crypto-token/), all 2026-10-02).

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-01 (undisclosed) | How the attacker gained access to Microsoft's X account is not published. | **T15.006** entry |
| 2026-10-01 (Thursday, time undisclosed) | The account follows an account promoting CLIPPY, an unofficial meme coin built on Clippy and the MSFT ticker, reposts one of its tweets, and changes its profile picture to Clippy. | **T15.006** |
| same day | The account quotes a Clippy-themed account's post with a line promising Clippy's return at 500,000 likes ([Windows Latest](https://www.windowslatest.com/2026/10/02/hacker-hijacked-microsofts-x-500000-likes-and-we-bring-clippy-back-all-to-pump-a-crypto-token/)). Separately, a promoter account cites liquidity pools reportedly worth over \$200,000; claims that Microsoft shares back them are unverified ([Bitcoin.com News](https://news.bitcoin.com/crypto-news/microsoft-x-account-hijacked-promote-clippy-meme-coin/)). | **T15.006** |
| same day | The posts are removed. An apology tweet appears about 30 minutes later and is deleted almost as quickly. | response |
| 2026-10-01 | Microsoft confirms (to The Verge, as relayed by Bitcoin.com News; to [BleepingComputer](https://www.bleepingcomputer.com/news/security/microsofts-x-account-hacked-in-crypto-token-pump-and-dump-scheme/) and [Windows Latest](https://www.windowslatest.com/2026/10/02/hacker-hijacked-microsofts-x-500000-likes-and-we-bring-clippy-back-all-to-pump-a-crypto-token/) in similar words) "unauthorized access to our account on X, including posts that did not come from Microsoft", says the account is secured and the unauthorized posts removed, and that it is still investigating. The deleted apology said Microsoft never authorized token promotion with its IP and would seek the token's removal. | response |
| after the posts | Buyer losses and where any funds went are not reported; the token's chain is not reported. | — |

Key addresses:

- No wallet, token-contract or pool addresses are published in the opened sources.

## Root-cause evidence

- **Technique:** OAK-T15.006
- **Source:** <https://news.bitcoin.com/crypto-news/microsoft-x-account-hijacked-promote-clippy-meme-coin/>; <https://www.bleepingcomputer.com/news/security/microsofts-x-account-hacked-in-crypto-token-pump-and-dump-scheme/>; <https://www.windowslatest.com/2026/10/02/hacker-hijacked-microsofts-x-500000-likes-and-we-bring-clippy-back-all-to-pump-a-crypto-token/>
- **Source type:** news
- **Confidence:** corroborated
- **Evidence:** Microsoft's statement, relayed by Bitcoin.com News, BleepingComputer and Windows Latest, confirms unauthorized access to its X account. The access vector is undisclosed; the Technique records the account takeover, not how it happened.

## Public references

- `[bitcoincommicrosoft2026]` — Bitcoin.com News, "Microsoft X account hijacked to promote Clippy meme coin" (2026-10-02): <https://news.bitcoin.com/crypto-news/microsoft-x-account-hijacked-promote-clippy-meme-coin/>
- BleepingComputer, "Microsoft's X account hacked in crypto token pump-and-dump scheme" (2026-10-02): <https://www.bleepingcomputer.com/news/security/microsofts-x-account-hacked-in-crypto-token-pump-and-dump-scheme/>
- Windows Latest, "Hacker hijacked Microsoft's X, promised Clippy back, then apologized on Microsoft's behalf" (2026-10-02): <https://www.windowslatest.com/2026/10/02/hacker-hijacked-microsofts-x-500000-likes-and-we-bring-clippy-back-all-to-pump-a-crypto-token/>
