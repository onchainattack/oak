# Banana Gun — unauthorized transfers from bot-managed wallets, cause a suspected Telegram message-oracle flaw — Ethereum, Solana — 2024-09-19

**Loss:** **\$3M** from **11 users**, per Banana Gun's incident recap ([Banana Gun on X](https://x.com/BananaGunBot/status/1838660010387116484)). Early figures were larger: Yannick Crypto counted 36 victims and almost 563 ETH stolen so far on mainnet on 2024-09-19 ([Yannick Crypto on X](https://x.com/YannickCrypto/status/1836709494602022942)), and Rekt reports the first public count as 36 users and \$1.9M ([Rekt](https://rekt.news/bananagun-rekt)). Banana Gun says all affected users will be fully refunded from its treasury with no tokens sold ([Banana Gun on X](https://x.com/BananaGunBot/status/1838660010387116484)).

**OAK Techniques observed:** none — no existing OAK Technique can be matched to a sourced mechanism. Banana Gun's root cause is a "potential vulnerability in the Telegram message oracle we use, which may have led to the exploit", supported by two observations: the transfers were manual, and victims got in-bot notifications of them ([Banana Gun on X](https://x.com/BananaGunBot/status/1838660010387116484)). No page opened describes the flaw, so no Technique in `techniques/` can be matched to a sourced mechanism. A maintainer may want a Technique for chat-platform message trust in custodial trading bots.

**Attribution:** **unattributed**. No source opened names an actor. Yannick Crypto printed two recipient addresses for six drained wallets ([Yannick Crypto on X](https://x.com/YannickCrypto/status/1836699192787415175)); neither is linked to an identity.

**Key teaching point:** **A bot that can move user funds on a chat message needs a delay and a second factor on transfers.** Banana Gun's own fixes were a 2-hour transfer delay, 2FA for transfers (still to be done at the time), a review of back-end and front-end, redeployment on new servers, and pentesting and audits of the web app and Telegram bots ([Banana Gun on X](https://x.com/BananaGunBot/status/1838660010387116484)).

## Summary

On 2024-09-19 Yannick Crypto reported rumours of Banana Gun wallets being drained and listed two recipient addresses ([Yannick Crypto on X](https://x.com/YannickCrypto/status/1836699192787415175)). At 15:27 UTC Banana Gun said some users had unauthorized transfers, that it had switched the bot off, and that its back-end, router and database were not compromised; it pointed at a possible front-end vulnerability ([Banana Gun on X](https://x.com/BananaGunBot/status/1836789190953963606)). In the recap of 2024-09-24, it said the attack hit both its EVM and Solana bots (separate codebases), that victims were known traders who watched the attacker transfer ETH manually while they used the bot, and that no attacks happened after shutdown ([Banana Gun on X](https://x.com/BananaGunBot/status/1838660010387116484)). Yannick Crypto also posted wallets drained from Maestro users on the same day ([Yannick Crypto on X](https://x.com/YannickCrypto/status/1836852335567421716)); Rekt says Unibot acknowledged an ongoing exploit and Maestro said it had received no complaints ([Rekt](https://rekt.news/bananagun-rekt)). Whether these share a cause is undisclosed.

## Timeline (UTC)

Stages: **Flaw** (undisclosed), **Take**, **Money**, **Response**. Times are post timestamps on X.

| When | What happened | OAK |
|---|---|---|
| Before 2024-09-19 (undisclosed) | A "potential vulnerability in the Telegram message oracle" exists; per Banana Gun it "may have led to the exploit" ([Banana Gun on X](https://x.com/BananaGunBot/status/1838660010387116484)) | — |
| 2024-09-19 (start time undisclosed) | Unauthorized, manual transfers from user wallets on the Ethereum and Solana bots ([Banana Gun on X](https://x.com/BananaGunBot/status/1838660010387116484)) | — |
| 2024-09-19 09:29 | Yannick Crypto reports the drain and prints two recipient addresses ([Yannick Crypto on X](https://x.com/YannickCrypto/status/1836699192787415175)) | — |
| 2024-09-19 10:10 | Yannick Crypto counts 36 victims and almost 563 ETH on mainnet so far; rumours of drains on Solana ([Yannick Crypto on X](https://x.com/YannickCrypto/status/1836709494602022942)) | — |
| 2024-09-19 15:27 | Banana Gun says the bot is switched off, back-end not compromised, fewer than 10 users affected so far ([Banana Gun on X](https://x.com/BananaGunBot/status/1836789190953963606)) | response |
| After the drain | Movement of the stolen funds beyond the two recipient addresses: undisclosed | — |
| 2024-09-24 19:21 | Recap: 11 users, \$3M; refund from treasury; bots back online with a 2-hour transfer delay ([Banana Gun on X](https://x.com/BananaGunBot/status/1838660010387116484)) | response |

Key addresses (recipients named by Yannick Crypto for six drained wallets, not confirmed by Banana Gun):

- Recipient 1 — [`0xe451241389b80a980c44dd55805eb05276cd141c`](https://etherscan.io/address/0xe451241389b80a980c44dd55805eb05276cd141c)
- Recipient 2 — [`0xd073f28400be60aae6691d6131b5f7f45e91d999`](https://etherscan.io/address/0xd073f28400be60aae6691d6131b5f7f45e91d999)

## Root-cause evidence

- **Technique:** none assigned
- **Source:** <https://x.com/BananaGunBot/status/1838660010387116484>; <https://x.com/BananaGunBot/status/1836789190953963606>; <https://rekt.news/bananagun-rekt>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** The operator names a potential vulnerability in the Telegram message oracle and says it patched it, citing manual transfers and in-bot notifications as support. Its first statement (2024-09-19) pointed at the front-end instead. No code-level analysis or transaction hash was found. Rekt repeats the operator wording and adds no independent analysis.

## Public references

- Banana Gun, bot incident recap (2024-09-24): <https://x.com/BananaGunBot/status/1838660010387116484>
- Banana Gun, update on bot situation (2024-09-19): <https://x.com/BananaGunBot/status/1836789190953963606>
- Yannick Crypto, alert (2024-09-19): <https://x.com/YannickCrypto/status/1836699192787415175>
- Yannick Crypto, victim count (2024-09-19): <https://x.com/YannickCrypto/status/1836709494602022942>
- Yannick Crypto, Maestro wallets (2024-09-19): <https://x.com/YannickCrypto/status/1836852335567421716>
- Rekt, "Banana Gun" (2024-09-25): <https://rekt.news/bananagun-rekt>
