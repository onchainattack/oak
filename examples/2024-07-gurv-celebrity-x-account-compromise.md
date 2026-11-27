# Sydney Sweeney and Bob Odenkirk X accounts — SIM swap and account takeover used to promote Solana meme coins — X / Solana — 2024-07-02

**Loss:** **$530K+** stolen through the Solana meme coin scams, per [ZachXBT's thread](https://x.com/zachxbt/status/1818245914580120015). [Crypto.news](https://crypto.news/uk-hacker-linked-to-compromised-celebrity-x-accounts-used-to-promote-530m-meme-coin-scam-report/) gives $530,000 in its text (its headline says $530m, which contradicts the text), reports team wallets of the SWEENEY scam sold $515K+, and says about $488,000 remained in the connected wallets at the time of reporting. The Odenkirk scam took less, per the same page.

**OAK Techniques observed:** **OAK-T15.006** (Impersonation via Verified Social-Account Compromise — *primary*). Sweeney's X account was compromised on 2024-07-02 by a SIM swap and a link to a meme coin was posted, per [Crypto.news](https://crypto.news/uk-hacker-linked-to-compromised-celebrity-x-accounts-used-to-promote-530m-meme-coin-scam-report/); Odenkirk's account was hacked on 2024-07-09, mechanism undisclosed. See [`techniques/T15.006-impersonation-via-verified-social-account-compromise.md`](../techniques/T15.006-impersonation-via-verified-social-account-compromise.md). A coordinated pump-and-dump Technique is not declared: the opened pages show token team wallets selling after the post, but not a coordinated promotion by a group.

**Attribution:** **inferred-strong** — ZachXBT links the compromises to Gurvinder Bhangu ("Gurv"), described as a convicted UK hacker ([ZachXBT](https://x.com/zachxbt/status/1818245914580120015)). Crypto.news says he was previously convicted in the UK for hacking Instagram accounts and blackmailing users and that he received verification codes for Sweeney's account via Telegram. No charge for these incidents is reported on the opened pages. ZachXBT's analysis is an independent researcher's, not a legal finding.

**Key teaching point:** **Move high-profile accounts off SMS-based recovery: a carrier PIN or port-freeze, and an authenticator or hardware key as the only second factor.** The Sweeney account was taken through her phone number, so the carrier was the weak point, not the X account's password ([Crypto.news](https://crypto.news/uk-hacker-linked-to-compromised-celebrity-x-accounts-used-to-promote-530m-meme-coin-scam-report/)).

## Summary

On 2024-07-30 ZachXBT [published an investigation](https://x.com/zachxbt/status/1818245914580120015) into the convicted UK hacker Gurv (Gurvinder Bhangu) and his connection to the recent Sydney Sweeney and Bob Odenkirk X account compromises, which resulted in $530K+ stolen by creating Solana meme coin scams. [Crypto.news](https://crypto.news/uk-hacker-linked-to-compromised-celebrity-x-accounts-used-to-promote-530m-meme-coin-scam-report/) reports that on 2024-07-02 Sweeney was SIM-swapped and a link to a meme coin was posted, causing the price to spike and crash; a Verizon receipt from the same day was cited as confirming the SIM swap. The token was $SWEENEY, on Solana. On 2024-07-09 Odenkirk's account was hacked and the tokens KIRK and SAUL were promoted. Proceeds went to an exchange as SOL, were swapped for BTC and ETH, and were spread across several addresses; the rest went to crypto casinos and gift cards. The page says the on-chain activity suggests more than one person was involved.

## Timeline (UTC)

Stages: **Entry** (SIM swap) → **Execution** (post, pump, sell) → **Money** → **Response/disclosure**. Dates are from [Crypto.news](https://crypto.news/uk-hacker-linked-to-compromised-celebrity-x-accounts-used-to-promote-530m-meme-coin-scam-report/); no times are public on the opened pages.

| When | What happened | OAK |
|---|---|---|
| 2024-07-02 | Sweeney is SIM-swapped; verification codes for her account reach Gurv via Telegram; her X account posts a link to $SWEENEY | **T15.006** |
| 2024-07-02 | The price spikes and crashes; team wallets of the SWEENEY scam sell $515K+ | none — token sale mechanics beyond the page are undisclosed |
| 2024-07-09 | Odenkirk's X account is hacked and promotes KIRK and SAUL (mechanism undisclosed); another 1.5 ETH goes to an exchange from a wallet connected to the Sweeney SIM swap | **T15.006** |
| 2024-07 (dates undisclosed) | Proceeds sent as SOL to an exchange, swapped to BTC and ETH, spread over several addresses; remainder to crypto casinos and gift cards; about $488,000 still in connected wallets at time of reporting | — |
| 2024-07-30 | ZachXBT publishes the investigation ([thread](https://x.com/zachxbt/status/1818245914580120015)) | disclosure |

Key addresses (Solana, main SWEENEY team wallets as printed by [Crypto.news](https://crypto.news/uk-hacker-linked-to-compromised-celebrity-x-accounts-used-to-promote-530m-meme-coin-scam-report/)):

- [`AgySZeAtqM3iSbvMPxv2g94oTd3segx4WdKuFD7M5CEr`](https://solscan.io/account/AgySZeAtqM3iSbvMPxv2g94oTd3segx4WdKuFD7M5CEr)
- [`jQEaiiAkRGhFoCDnjxn6mmtrksC4EckF38fxkaNMs1j`](https://solscan.io/account/jQEaiiAkRGhFoCDnjxn6mmtrksC4EckF38fxkaNMs1j)

## Root-cause evidence

- **Technique:** OAK-T15.006
- **Source:** <https://x.com/zachxbt/status/1818245914580120015>; <https://crypto.news/uk-hacker-linked-to-compromised-celebrity-x-accounts-used-to-promote-530m-meme-coin-scam-report/>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** ZachXBT's opening post names the two account compromises and the $530K+ figure; Crypto.news relays the rest of the thread, including the SIM swap on Sweeney's account. Only the first post of the thread was opened directly; later posts were not. Not established: how Odenkirk's account was taken, who else took part, and any court finding on these incidents.

## Public references

- ZachXBT, investigation thread, first post (X, 2024-07-30): <https://x.com/zachxbt/status/1818245914580120015>
- Crypto.news, UK hacker linked to compromised celebrity X accounts (2024-07): <https://crypto.news/uk-hacker-linked-to-compromised-celebrity-x-accounts-used-to-promote-530m-meme-coin-scam-report/>
