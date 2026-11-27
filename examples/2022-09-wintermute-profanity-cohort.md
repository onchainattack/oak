# Profanity vanity-address cohort — 32-bit-seed keys recovered and drained after the 1inch disclosure — Ethereum — 2022-09-16 to 2022-09-25 (cohort case)

**Loss:** **~\$3.3M** drained from several Profanity-generated Ethereum addresses on 2022-09-16 ([The Block](https://www.theblock.co/news/regulation/2022-09-19-hacker-stole-3-3-million-from-ethereum-vanity-addresses-created-with-profanity-tool-170971), [Cointelegraph](https://cointelegraph.com/news/profanity-tool-vulnerability-drains-3-3m-despite-1inch-warning)), plus **732 ETH (~\$950,000)** taken from one Profanity address on 2022-09-25 ([The Block](https://www.theblock.co/amp/post/172773/hacker-steals-950000-from-crypto-vanity-address-as-exploits-continue)). Neither source lists the victims or gives a victim count. The Wintermute loss (~\$160M, 2022-09-20) is a separate file: [`2022-09-wintermute.md`](2022-09-wintermute.md). 1inch estimated that tens of millions of dollars, possibly hundreds of millions, could have been stolen over time ([1inch](https://1inch.com/blog/post/a-vulnerability-disclosed-in-profanity-an-ethereum-vanity-address-tool-68ed7455fc8c)); that is an estimate, not a measured loss.

**OAK Techniques observed:** **OAK-T11.004** (Insufficient-Entropy Key Generation — *primary*). Profanity seeded 256-bit private keys from a random 32-bit value, so the key of a vanity address could be recovered offline ([1inch](https://1inch.com/blog/post/a-vulnerability-disclosed-in-profanity-an-ethereum-vanity-address-tool-68ed7455fc8c), [Halborn](https://halborn.com/explained-the-profanity-address-generator-hack-september-2022/)). See [`techniques/T11.004-insufficient-entropy-key-generation.md`](../techniques/T11.004-insufficient-entropy-key-generation.md). **OAK-T7.001** (Mixer-Routed Hop — the 732 ETH was sent to Tornado Cash, per The Block).

**Attribution:** **unattributed.** ZachXBT attributed the \$3.3M to one address, [`0x6AE09AC63487FCf63117A6D6FAFa894473d47b93`](https://etherscan.io/address/0x6AE09AC63487FCf63117A6D6FAFa894473d47b93) ([Cointelegraph](https://cointelegraph.com/news/profanity-tool-vulnerability-drains-3-3m-despite-1inch-warning); The Block calls it an address believed to be controlled by the hacker). No source opened for this entry says who operated it or whether the 2022-09-25 theft was the same operator.

**Key teaching point:** **Any key made with Profanity must be treated as public: move the funds, and for a contract, change its owner, before anyone else computes the key.** 1inch told users in its disclosure to move assets and to change the owners of vanity-address contracts. The \$3.3M drain began the day after that disclosure, and a second theft followed ten days after it.

## Summary

On 2022-09-15 1inch published a disclosure that keys made by the Profanity vanity-address tool could be recovered, with advice to move funds at once ([1inch](https://1inch.com/blog/post/a-vulnerability-disclosed-in-profanity-an-ethereum-vanity-address-tool-68ed7455fc8c)). On 2022-09-16 an address flagged by ZachXBT drained about \$3.3M from several Profanity addresses ([The Block](https://www.theblock.co/news/regulation/2022-09-19-hacker-stole-3-3-million-from-ethereum-vanity-addresses-created-with-profanity-tool-170971)). Tal Be'ery of ZenGo said the attackers appeared to have been holding the flaw and cashed out within minutes once 1inch published (relayed by The Block). Wintermute lost about \$160M on 2022-09-20 through a Profanity admin address ([The Block](https://www.theblock.co/news/defi/2022-09-20-experts-blame-a-vanity-address-bug-for-wintermutes-160-million-hack-171192)); that incident has its own file. On 2022-09-25 a further 732 ETH left another Profanity address and went to Tornado Cash ([The Block](https://www.theblock.co/amp/post/172773/hacker-steals-950000-from-crypto-vanity-address-as-exploits-continue)).

## Timeline (UTC)

Stages: **Flaw** (the tool), **Take** (drains), **Money** (Tornado), **Response** (disclosure and guidance). The sources give dates, not times.

| When | What happened | OAK |
|---|---|---|
| Before 2022-09-15 | Profanity generates vanity addresses from a 32-bit seed. 1inch says its contributors suspected the weakness in early 2022, and The Block reports it was raised on GitHub in January ([1inch](https://1inch.com/blog/post/a-vulnerability-disclosed-in-profanity-an-ethereum-vanity-address-tool-68ed7455fc8c), [The Block](https://www.theblock.co/amp/post/172773/hacker-steals-950000-from-crypto-vanity-address-as-exploits-continue)). 1inch also points to a June 2022 airdrop claim by at least five deployer addresses whose funds were moved to one wallet, [`0xee9bd0e71681ee6e9aa9f1ba46d2d1149f7bd054`](https://etherscan.io/address/0xee9bd0e71681ee6e9aa9f1ba46d2d1149f7bd054) | **T11.004** |
| 2022-09-15 | 1inch publishes the disclosure with a proof of concept that recovers a key from a public key, and tells users to move assets and change owners of vanity contracts ([1inch](https://1inch.com/blog/post/a-vulnerability-disclosed-in-profanity-an-ethereum-vanity-address-tool-68ed7455fc8c)) | response |
| 2022-09-16 | About \$3.3M is drained from several Profanity addresses to [`0x6AE09AC63487FCf63117A6D6FAFa894473d47b93`](https://etherscan.io/address/0x6AE09AC63487FCf63117A6D6FAFa894473d47b93); no transaction hashes are given in the opened sources ([The Block](https://www.theblock.co/news/regulation/2022-09-19-hacker-stole-3-3-million-from-ethereum-vanity-addresses-created-with-profanity-tool-170971), [Cointelegraph](https://cointelegraph.com/news/profanity-tool-vulnerability-drains-3-3m-despite-1inch-warning)) | **T11.004** |
| 2022-09-17 to 2022-09-19 | ZachXBT posts the investigation (2022-09-17); The Block and Cointelegraph report it. Where the \$3.3M went after the drain is undisclosed in the opened sources | — |
| 2022-09-20 | Wintermute reports a ~\$160M loss tied to a Profanity admin address (see [`2022-09-wintermute.md`](2022-09-wintermute.md)) | **T11.004** |
| 2022-09-25 | 732 ETH (~\$950,000) is taken from a Profanity address and sent to Tornado Cash ([The Block](https://www.theblock.co/amp/post/172773/hacker-steals-950000-from-crypto-vanity-address-as-exploits-continue)). The victim address is not named | **T11.004**, T7.001 |

Key addresses:

- Address ZachXBT attributes the \$3.3M to — [`0x6AE09AC63487FCf63117A6D6FAFa894473d47b93`](https://etherscan.io/address/0x6AE09AC63487FCf63117A6D6FAFa894473d47b93)
- Address linked in The Block's 2022-09-26 article for the \$950,000 theft (role not stated by the article) — [`0x9731f44b8d28e6d5c2f110f9643a3da6c80539b9`](https://etherscan.io/address/0x9731f44b8d28e6d5c2f110f9643a3da6c80539b9)

## Root-cause evidence

- **Technique:** OAK-T11.004
- **Source:** <https://1inch.com/blog/post/a-vulnerability-disclosed-in-profanity-an-ethereum-vanity-address-tool-68ed7455fc8c>; <https://halborn.com/explained-the-profanity-address-generator-hack-september-2022/>; <https://www.theblock.co/news/regulation/2022-09-19-hacker-stole-3-3-million-from-ethereum-vanity-addresses-created-with-profanity-tool-170971>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** 1inch (the discoverer) and Halborn agree that Profanity's 32-bit seed makes keys recoverable. The Block and Cointelegraph report the \$3.3M drain on the day after the disclosure. The link between the flaw and each drained address is the reporters' and ZachXBT's on-chain reading; no victim list or transaction hash is in the opened sources.

## Public references

- 1inch, "A vulnerability disclosed in Profanity, an Ethereum vanity address tool" (2022-09-15): <https://1inch.com/blog/post/a-vulnerability-disclosed-in-profanity-an-ethereum-vanity-address-tool-68ed7455fc8c>
- Halborn, "Explained: The Profanity Address Generator Hack (September 2022)": <https://halborn.com/explained-the-profanity-address-generator-hack-september-2022/>
- The Block, "Hacker stole \$3.3 million from Ethereum 'vanity addresses' created with Profanity tool" (2022-09-19): <https://www.theblock.co/news/regulation/2022-09-19-hacker-stole-3-3-million-from-ethereum-vanity-addresses-created-with-profanity-tool-170971>
- Cointelegraph, "Profanity tool vulnerability drains \$3.3M despite 1inch warning" (2022-09-18): <https://cointelegraph.com/news/profanity-tool-vulnerability-drains-3-3m-despite-1inch-warning>
- The Block, "Hacker steals \$950,000 from crypto vanity address as exploits continue" (2022-09-26): <https://www.theblock.co/amp/post/172773/hacker-steals-950000-from-crypto-vanity-address-as-exploits-continue>
- The Block, "Experts blame a 'vanity address' bug for Wintermute's \$160 million hack": <https://www.theblock.co/news/defi/2022-09-20-experts-blame-a-vanity-address-bug-for-wintermutes-160-million-hack-171192>
