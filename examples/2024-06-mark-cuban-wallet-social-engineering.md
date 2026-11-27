# Mark Cuban — wallet theft by social engineering, linked by an investigator to the Genesis-creditor theft group — Ethereum — 2024-06-23

**Loss:** Undisclosed. [ZachXBT](https://x.com/zachxbt/status/1923465312529416702) says Cuban lost "crypto assets" from his public wallet `markcuban.eth` on 2024-06-23; no opened page gives an amount. A contemporaneous [CryptoSlate report](https://cryptoslate.com/zachxbt-helps-secure-arrests-in-243m-social-engineering-attack-on-one-person/) (2024-09-19) describes a different June 2024 event: Cuban's Google account compromised after a phone call, recovered within 24 hours. It does not mention a wallet loss.

**OAK Techniques observed:** none — the mechanism is not sourced. The only source for the wallet theft says "social engineering scam" and gives no method, and the one contemporaneous report describes a Google-account takeover rather than a wallet theft. The investigator's device-indicator link between cases is an attribution claim, not an attack Technique, so it is not mapped.

**Attribution:** **inferred-weak.** [ZachXBT](https://x.com/zachxbt/status/1923465312529416702) says the "exact same device indicators" appear in this theft and the \$243M Genesis-creditor theft "across multiple transactions where funds were laundered", and that a superseding indictment unsealed the day before hints at involvement of Malone Lam and a second defendant with a matching date and amount. No opened government page mentions Cuban; [The Block's report on the indictment](https://www.theblock.co/post/354633/federal-prosecutors-charge-12-more-in-alleged-263-million-usd-crypto-racketeering-ring) does not mention him.

**Key teaching point:** **Keep a wallet whose ENS name identifies its owner away from anything an impersonator can talk you into: no signing or seed entry on a "support" call, and a separate cold or multi-party wallet for large holdings.** The wallet was public and tied to a famous owner, so an attacker could size the target before contact. The same investigator links the laundering of this theft to another group's thefts by shared device indicators; the evidence for that link is in screenshots on his post, not in an opened document.

## Summary

On 2025-05-16 [ZachXBT wrote](https://x.com/zachxbt/status/1923465312529416702) that, while working on the \$243M Genesis-creditor theft, his team found that on 2024-06-23 Mark Cuban "fell victim to a social engineering scam" losing crypto from `markcuban.eth`, and that the device indicators matched across transactions where funds were laundered. He published the theft address [`0x733ea491051929d0b6619425e088d210deb5cbe6`](https://etherscan.io/address/0x733ea491051929d0b6619425e088d210deb5cbe6). The post carries three images that this pass could not read as text.

The only independent contemporaneous report found describes a June 2024 Google-account compromise, not a wallet loss, and says Cuban posted that someone phoned him ([CryptoSlate](https://cryptoslate.com/zachxbt-helps-secure-arrests-in-243m-social-engineering-attack-on-one-person/)). Whether it is the same event as the wallet theft is not established by an opened page. The same report says no information indicated Cuban was a victim in the \$243M case.

## Timeline (UTC)

Stages: **Entry** → **Take** → **Money** → **Response**. Only the date comes from sources; no times are public.

| When | What happened | OAK |
|---|---|---|
| 2024-06-23 | Cuban's public wallet `markcuban.eth` is drained after a social-engineering approach; method and assets undisclosed ([ZachXBT](https://x.com/zachxbt/status/1923465312529416702)) | none — method undisclosed |
| 2024-06 (date undisclosed) | Separately reported: Cuban's Google account compromised after a phone call and recovered within 24 hours ([CryptoSlate](https://cryptoslate.com/zachxbt-helps-secure-arrests-in-243m-social-engineering-attack-on-one-person/)); relation to the wallet theft not established | none — different account type |
| Undisclosed | Stolen funds laundered through transactions that ZachXBT says share device indicators with the Genesis-creditor theft; destinations undisclosed | — |
| 2025-05-15 | Superseding indictment unsealed in the related RICO case, adding 12 defendants ([The Block](https://www.theblock.co/post/354633/federal-prosecutors-charge-12-more-in-alleged-263-million-usd-crypto-racketeering-ring)); the report does not mention Cuban | response |
| 2025-05-16 | ZachXBT publishes the link and the theft address | response |

Key addresses:

- Theft address (Ethereum) — [`0x733ea491051929d0b6619425e088d210deb5cbe6`](https://etherscan.io/address/0x733ea491051929d0b6619425e088d210deb5cbe6), per [ZachXBT](https://x.com/zachxbt/status/1923465312529416702)

## Root-cause evidence

- **Technique:** none — method undisclosed
- **Source:** <https://x.com/zachxbt/status/1923465312529416702>; <https://cryptoslate.com/zachxbt-helps-secure-arrests-in-243m-social-engineering-attack-on-one-person/>
- **Source type:** independent-researcher
- **Confidence:** reported
- **Evidence:** One investigator's post states the date, the "social engineering scam" label and the device-indicator link; no operator, victim or government page opened confirms a wallet loss. The one contemporaneous news report describes a Google-account takeover. Open: loss amount, method, whether the two June 2024 events are one.

## Public references

- ZachXBT, X post (2025-05-16): <https://x.com/zachxbt/status/1923465312529416702>
- CryptoSlate, "ZachXBT helps secure arrests in \$243 million social engineering attack on one person" (2024-09-19): <https://cryptoslate.com/zachxbt-helps-secure-arrests-in-243m-social-engineering-attack-on-one-person/>
- The Block, "Federal prosecutors charge 12 individuals in \$263 million crypto scheme targeting early Genesis investor" (2025-05-16): <https://www.theblock.co/post/354633/federal-prosecutors-charge-12-more-in-alleged-263-million-usd-crypto-racketeering-ring>
