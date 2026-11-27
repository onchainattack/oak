# X account phishing campaign — emails impersonating the X team took over 15+ accounts and promoted meme coin scams — X / Solana, Ethereum — 2024-11-26 to 2024-12-24

**Loss:** **~\$500K** over about a month, per [ZachXBT](https://x.com/zachxbt/status/1871543397875671099), repeated by [Crypto Briefing](https://cryptobriefing.com/compromised-x-accounts-meme-coin-scam/). No source opened here gives a per-account breakdown or the wallets that received the money. Recovery: none reported.

**OAK Techniques observed:** **OAK-T15.005** (Operator-Communication-Channel Takeover — *primary, per ZachXBT*). The attacker sent targeted phishing emails that impersonated the X team to steal credentials, then used the taken-over brand accounts to launch meme coin scams ([ZachXBT](https://x.com/zachxbt/status/1871543397875671099)). See [`techniques/T15.005-operator-communication-channel-takeover.md`](../techniques/T15.005-operator-communication-channel-takeover.md). The sources opened do not say the accounts were verified, so the verified-account impersonation Technique is not claimed.

**Attribution:** **unattributed** — [ZachXBT](https://x.com/zachxbt/status/1871543397875671099) writes of "a threat actor" and links the takeovers by a shared deployer address, per [Crypto Briefing](https://cryptobriefing.com/compromised-x-accounts-meme-coin-scam/). No name or arrest is reported.

**Key teaching point:** **Protect the email address that recovers a brand X account with a security key, and treat any email claiming to come from X as untrusted until the same notice appears inside the X app.** The lure was a fake copyright notice that pushed victims to a phishing site where they reset their password and 2FA ([Crypto Briefing](https://cryptobriefing.com/compromised-x-accounts-meme-coin-scam/)). ZachXBT advised security keys for 2FA on important accounts and not reusing email addresses across services ([Crypto Briefing](https://cryptobriefing.com/compromised-x-accounts-meme-coin-scam/)).

## Summary

On 2024-12-24 ZachXBT reported that a threat actor had stolen about \$500K over the past month by compromising 15+ X accounts, naming Kick, Cursor, Alex Blania, The Arena and Brett among them ([ZachXBT](https://x.com/zachxbt/status/1871543397875671099)). Crypto Briefing adds that the emails used fake copyright infringement notices, that victims reset their 2FA and passwords on phishing sites, that all the takeovers connected to a single deployer address used for each scam, and that the attacker moved assets between Solana and Ethereum to hide the funding source ([Crypto Briefing](https://cryptobriefing.com/compromised-x-accounts-meme-coin-scam/)). A Cryptorank news roundup citing Coinpaper gives RuneMine as the first incident on Nov 26 and Kick as the latest on Dec 24, says posts used the caption "Incoming Transmission" to promote fraudulent tokens and contract addresses, and says Neutron publicly acknowledged its attack ([Cryptorank](https://cryptorank.io/news/feed/0d034-phishing-attack-hijacks-15-x-accounts-and-nets-half-a-million-dollars)). The same roundup says six deployer addresses were used; neither it nor Crypto Briefing prints them.

## Timeline (UTC)

**Entry**: phishing emails. **Preparation**: token deployments, undisclosed. **Execution**: posts from the taken-over accounts. **Money**: bridged between Solana and Ethereum. **Response**: the public alert. The sources give dates, not times.

| When | What happened | OAK |
|---|---|---|
| 2024-11-26 | RuneMine is named as the first incident ([Cryptorank](https://cryptorank.io/news/feed/0d034-phishing-attack-hijacks-15-x-accounts-and-nets-half-a-million-dollars)). | **T15.005** |
| 2024-11-26 to 2024-12-24 | Targeted emails impersonating the X team, with fake copyright notices, lead account owners to phishing sites where credentials, password and 2FA are taken ([ZachXBT](https://x.com/zachxbt/status/1871543397875671099), [Crypto Briefing](https://cryptobriefing.com/compromised-x-accounts-meme-coin-scam/)). | **T15.005** |
| 2024-11-26 to 2024-12-24 | The taken-over accounts post meme coin scams; each scam token comes from the one deployer address ([Crypto Briefing](https://cryptobriefing.com/compromised-x-accounts-meme-coin-scam/)). | **T15.005** |
| 2024-12-24 | Kick is the latest account named ([Cryptorank](https://cryptorank.io/news/feed/0d034-phishing-attack-hijacks-15-x-accounts-and-nets-half-a-million-dollars)). | **T15.005** |
| 2024-12-24 13:08 | ZachXBT posts the alert (post timestamp via api.fxtwitter.com) ([ZachXBT](https://x.com/zachxbt/status/1871543397875671099)). | response |
| after 2024-12-24 | Funds: assets moved between Solana and Ethereum ([Crypto Briefing](https://cryptobriefing.com/compromised-x-accounts-meme-coin-scam/)); destination wallets undisclosed. | — |

Key addresses: undisclosed. The deployer address is referred to but not printed on any page opened.

## Root-cause evidence

- **Technique:** OAK-T15.005
- **Source:** <https://x.com/zachxbt/status/1871543397875671099>; <https://cryptobriefing.com/compromised-x-accounts-meme-coin-scam/>; <https://cryptorank.io/news/feed/0d034-phishing-attack-hijacks-15-x-accounts-and-nets-half-a-million-dollars>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** ZachXBT states the method (phishing emails impersonating the X team) and the loss; Crypto Briefing and Cryptorank relay it and add the copyright-notice lure. Only the first post of ZachXBT's thread was opened; the rest of the thread, the deployer address and the per-account losses were not.

## Public references

- ZachXBT, X post 1/3 (2024-12-24): <https://x.com/zachxbt/status/1871543397875671099>
- Crypto Briefing, "Threat actor steals half a million via 15 compromised X accounts: ZachXBT" (2024-12-24): <https://cryptobriefing.com/compromised-x-accounts-meme-coin-scam/>
- Cryptorank, news roundup citing Coinpaper (2024-12-25): <https://cryptorank.io/news/feed/0d034-phishing-attack-hijacks-15-x-accounts-and-nets-half-a-million-dollars>
