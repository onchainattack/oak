# Wintermute — admin key of a Profanity-generated address used to drain the Ethereum DeFi vault — Wintermute / Ethereum — 2022-09-20

**Loss:** **~\$160M** from Wintermute's Ethereum DeFi vault, per [The Block](https://www.theblock.co/news/defi/2022-09-20-experts-blame-a-vanity-address-bug-for-wintermutes-160-million-hack-171192). [ITPro](https://www.itpro.com/security/hacking/369117/wintermute-loses-162-million-in-defi-hack) reports the firm's own figure as \$162.2M. [Halborn](https://halborn.com/explained-the-wintermute-hack-september-2022/) gives two figures in one article: \$160M in its opening and \$118.4M in its breakdown. Gaevoy said the CeFi and OTC wallets were not affected ([The Block](https://www.theblock.co/post/171559/wintermute-ceo-updates-on-hack-says-firm-will-continue-on-chain-trading)). No opened page reports funds recovered or returned.

**OAK Techniques observed:** **OAK-T11.004** (Insufficient-Entropy Key Generation — *primary*). Halborn says Profanity seeded its generator with a 32-bit number, so an attacker with enough compute could recreate private keys, and that the hot wallet that was an admin of the vault was likely compromised this way ([Halborn](https://halborn.com/explained-the-wintermute-hack-september-2022/)). Wintermute's CEO suspected a Profanity-type exploit (relayed, not verbatim) ([The Block](https://www.theblock.co/post/171559/wintermute-ceo-updates-on-hack-says-firm-will-continue-on-chain-trading)). The key itself is not shown to have been recovered on-chain by any opened page; this is the sources' inference. See [`techniques/T11.004-insufficient-entropy-key-generation.md`](../techniques/T11.004-insufficient-entropy-key-generation.md).

**Attribution:** **unattributed.** No opened page names the attacker. The destination address The Block links is in Key addresses. The earlier version of this file mentioned Lazarus speculation and a mixer hop; no opened page reports either, so both are removed.

**Key teaching point:** **After a disclosure that a key-generation tool is broken, revoke the affected address from every contract where it holds authority, not only empty its balance.** Halborn says Wintermute moved the ether out of the hot wallet after the 2022-09-15 disclosure but did not remove the address as a vault admin ([Halborn](https://halborn.com/explained-the-wintermute-hack-september-2022/)); Mudit Gupta says the same ([The Block](https://www.theblock.co/news/defi/2022-09-20-experts-blame-a-vanity-address-bug-for-wintermutes-160-million-hack-171192)).

## Summary

On 2022-09-20 Wintermute said about \$160M had been stolen from its Ethereum vault, a smart-contract account holding assets for on-chain trading ([The Block](https://www.theblock.co/news/defi/2022-09-20-experts-blame-a-vanity-address-bug-for-wintermutes-160-million-hack-171192)). The vault allowed only admins to make the transfers, and its admin was a hot wallet at a vanity address starting `0x0000000`; analysts, including Polygon's CISO Mudit Gupta and SlowMist, concluded that the admin key was likely compromised and that the address came from Profanity (same article). 1inch had disclosed on 2022-09-15 that Profanity keys are recoverable and told users to move assets and change owners of vanity contracts ([1inch](https://1inch.com/blog/post/a-vulnerability-disclosed-in-profanity-an-ethereum-vanity-address-tool-68ed7455fc8c)). Wintermute's CEO called it an an internal human error (relayed) and a suspected Profanity-type exploit (relayed, not verbatim), and offered the attacker a 10% bounty, 16 million USDC, for the return of all funds ([The Block](https://www.theblock.co/post/171559/wintermute-ceo-updates-on-hack-says-firm-will-continue-on-chain-trading)). The Block noted that no official post-mortem had been published at the time of its article.

## Timeline (UTC)

Stages: **Flaw**, **Take**, **Money**, **Response**. The opened pages give dates, not times, and no transaction hash for the drain; those are undisclosed.

| When | What happened | OAK |
|---|---|---|
| Before 2022-09-15 (undisclosed) | Wintermute uses a vanity-address hot wallet as admin of its Ethereum vault; analysts attribute the address to Profanity ([The Block](https://www.theblock.co/news/defi/2022-09-20-experts-blame-a-vanity-address-bug-for-wintermutes-160-million-hack-171192)). Profanity seeds keys from a 32-bit value ([Halborn](https://halborn.com/explained-the-wintermute-hack-september-2022/)) | **T11.004** |
| 2022-09-15 | 1inch publishes the Profanity disclosure and tells users to move assets and change owners of vanity contracts ([1inch](https://1inch.com/blog/post/a-vulnerability-disclosed-in-profanity-an-ethereum-vanity-address-tool-68ed7455fc8c)) | response |
| After 2022-09-15, before the drain (date undisclosed) | Wintermute moves ether out of the hot wallet in [`0x93716f3e3a9e3f47dec05b4df511e07e53b3e4695e84cd4f05f5d83188f3552a`](https://etherscan.io/tx/0x93716f3e3a9e3f47dec05b4df511e07e53b3e4695e84cd4f05f5d83188f3552a) per Halborn, but does not remove it as vault admin ([Halborn](https://halborn.com/explained-the-wintermute-hack-september-2022/)) | — |
| 2022-09-20 (time undisclosed) | The vault is drained using the admin address; funds go to a destination address in the attacker's control per analysts ([The Block](https://www.theblock.co/news/defi/2022-09-20-experts-blame-a-vanity-address-bug-for-wintermutes-160-million-hack-171192)). Drain transactions are undisclosed in the opened pages | **T11.004** |
| 2022-09-20 | SlowMist says the attacker has deposited \$114M of stolen assets into Curve (same article). ITPro, citing Bleeping Computer, reports about \$47.7M held in the attacker wallet and the rest moved into Curve's 3CRV pool ([ITPro](https://www.itpro.com/security/hacking/369117/wintermute-loses-162-million-in-defi-hack)) | — |
| 2022-09-20 | Wintermute's CEO posts an update: CeFi and OTC not affected, 10% (16 million USDC) bounty offered ([The Block](https://www.theblock.co/post/171559/wintermute-ceo-updates-on-hack-says-firm-will-continue-on-chain-trading)) | response |

Key addresses:

- Ethereum vault (as linked by The Block) — [`0x00000000ae347930bd1e7b0f35588b92280f9e75`](https://etherscan.io/address/0x00000000ae347930bd1e7b0f35588b92280f9e75)
- Destination address in the attacker's control, per analysts quoted by The Block — [`0xe74b28c2eae8679e3ccc3a94d5d0de83ccb84705`](https://etherscan.io/address/0xe74b28c2eae8679e3ccc3a94d5d0de83ccb84705). Halborn links the same address (mixed case) only as a DeBank profile for other stolen tokens and does not say whose it is.
- Admin hot wallet — full address not published (only the `0x0000000` prefix).

## Root-cause evidence

- **Technique:** OAK-T11.004
- **Source:** <https://halborn.com/explained-the-wintermute-hack-september-2022/>; <https://www.theblock.co/news/defi/2022-09-20-experts-blame-a-vanity-address-bug-for-wintermutes-160-million-hack-171192>; <https://www.theblock.co/post/171559/wintermute-ceo-updates-on-hack-says-firm-will-continue-on-chain-trading>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Halborn, SlowMist and Mudit Gupta independently reason that the admin key was compromised through a Profanity-generated address, and Wintermute's CEO suspected a Profanity-type exploit. Wintermute published no post-mortem in the opened pages, and no page shows the key recovery or the drain transaction, so the mechanism is inferred.

## Public references

- The Block, "Experts blame a 'vanity address' bug for Wintermute's \$160 million hack" (2022-09-20, updated 2022-10-01): <https://www.theblock.co/news/defi/2022-09-20-experts-blame-a-vanity-address-bug-for-wintermutes-160-million-hack-171192>
- The Block, "Wintermute CEO Gaevoy updates on hack, says firm will continue on-chain trading" (2022-09-20): <https://www.theblock.co/post/171559/wintermute-ceo-updates-on-hack-says-firm-will-continue-on-chain-trading>
- Halborn, "Explained: The Wintermute Hack (September 2022)" (2022-09-26): <https://halborn.com/explained-the-wintermute-hack-september-2022/>
- ITPro, "Wintermute loses \$162 million in DeFi hack" (2022-09-21): <https://www.itpro.com/security/hacking/369117/wintermute-loses-162-million-in-defi-hack>
- 1inch, "A vulnerability disclosed in Profanity, an Ethereum vanity address tool" (2022-09-15): <https://1inch.com/blog/post/a-vulnerability-disclosed-in-profanity-an-ethereum-vanity-address-tool-68ed7455fc8c>
