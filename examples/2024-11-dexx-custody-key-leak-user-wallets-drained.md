# DEXX — platform-held user private keys leaked, draining many Solana trading-terminal wallets — DEXX / Solana — 2024-11-16

**Loss:** not settled. Early community figures were above \$16M and SlowMist's founder gave a preliminary estimate of tens of millions of dollars ([BlockBeats](https://en.theblockbeats.news/news/55791)); MetaTrust Labs wrote of a loss over \$20M ([MetaTrust Labs, 2024-11-20](https://x.com/MetaTrustLabs/status/1859159764745236614)). A circulating claim of \$488M was disputed by SlowMist, which said each victim's funds went to a different attacker address ([BlockBeats](https://en.theblockbeats.news/news/55791)). DEXX's founder said users would be compensated; no amount or schedule is given in the sources read ([BlockBeats](https://en.theblockbeats.news/news/55791)).

**OAK Techniques observed:** **OAK-T11.012** (Server-side Raw Private-Key Storage — *primary*, per CertiK and SlowMist as relayed by [BlockBeats](https://en.theblockbeats.news/news/55791): the leaked key material belonged to DEXX's centralized custody). How the keys leaked is not public. See [`techniques/T11.012-server-side-raw-private-key-storage.md`](../techniques/T11.012-server-side-raw-private-key-storage.md).

**Attribution:** **unattributed.** No source read names an actor. SlowMist observed nearly every victim paired with a different attacker address and that the gas-fee source had been exchanged for XMR three days earlier ([BlockBeats](https://en.theblockbeats.news/news/55791)).

**Key teaching point:** **A trading terminal that holds users' raw private keys turns one leak into every user's loss; sign client-side or keep keys in an HSM/KMS the application cannot export from.** The per-victim attacker addresses and the plain-text key export request that community analysts found show how a custodial design can fail without any contract bug ([BlockBeats](https://en.theblockbeats.news/news/55791)).

## Summary

On 2024-11-16 users of DEXX, an on-chain token trading terminal on Solana, reported assets stolen from their DEXX-managed wallets; meme-coin prices fell the same morning ([BlockBeats](https://en.theblockbeats.news/news/55791); [Bitget News](https://www.bitget.com/news/detail/12560604353962)). CertiK said the main cause was improper private key management by DEXX, which leaked the official private key. SlowMist's founder said the key belonged to DEXX's centralized custody and had leaked, with the method still under investigation ([BlockBeats](https://en.theblockbeats.news/news/55791)). Community analysts found that the `export_wallet` request returned private keys in plain text, which they read as evidence that keys sit on DEXX's server ([BlockBeats](https://en.theblockbeats.news/news/55791)). MetaTrust Labs wrote the same, adding that a victim's transaction sent assets straight to the attacker with no smart-contract interaction ([MetaTrust Labs](https://x.com/MetaTrustLabs/status/1859159764745236614)). OneKey raised the possibility that DEXX's repeated request for clipboard-upload permission exposed user secrets; that was a suggestion, not a finding ([BlockBeats](https://en.theblockbeats.news/news/55791)).

## Timeline (UTC)

Stages: **Flaw** (custodial key storage), **Take** (key leak, method undisclosed), **Money**, **Response**. The sources give dates, not times.

| When | What happened | OAK |
|---|---|---|
| Before 2024-11-16 (undisclosed) | DEXX holds user wallet keys in its own custody; the export request returns keys in plain text, per community analysis ([BlockBeats](https://en.theblockbeats.news/news/55791)) | **T11.012** |
| About 2024-11-13 | The source of the attackers' gas fees was exchanged for XMR three days before the incident, per SlowMist ([BlockBeats](https://en.theblockbeats.news/news/55791)) | — |
| 2024-11-16 | User assets drained across many wallets; SlowMist counts nearly 500 victim reports that day ([BlockBeats](https://en.theblockbeats.news/news/55791)). How the key leaked: undisclosed | **T11.012** |
| 2024-11-16 | Funds go to a different attacker address per victim, not one consolidated address, per SlowMist ([BlockBeats](https://en.theblockbeats.news/news/55791)). Full addresses: not published in the sources read | — |
| 2024-11-16 | DEXX's founder says users will be compensated ([BlockBeats](https://en.theblockbeats.news/news/55791)) | response |
| 2024-11-17 | DEXX says it applied for judicial marking of the attacker wallet, asked the Solana Foundation for help and is working with agencies ([BlockBeats](https://en.theblockbeats.news/news/55791)) | response |
| 2024-11-19 | DEXX says it is analysing reports of possible attacker manipulation of certain tokens ([BlockBeats](https://en.theblockbeats.news/news/55791)) | response |

Key addresses: attacker and victim addresses were not printed in full on any page read (undisclosed here).

## Root-cause evidence

- **Technique:** OAK-T11.012
- **Source:** <https://en.theblockbeats.news/news/55791>; <https://x.com/MetaTrustLabs/status/1859159764745236614>; <https://www.bitget.com/news/detail/12560604353962>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** CertiK and SlowMist attribute the loss to a leak of key material held in DEXX's centralized custody, and MetaTrust Labs reports plain-text key handling. These are early statements from the days of the incident. How the keys were obtained, and the final loss, are not established in the sources read.

## Public references

- BlockBeats, DEXX incident tracking (2024-11-16 onward): <https://en.theblockbeats.news/news/55791>
- Bitget News relay of the same reporting (2024-11-16): <https://www.bitget.com/news/detail/12560604353962>
- MetaTrust Labs, DEXX incident analysis summary (2024-11-20): <https://x.com/MetaTrustLabs/status/1859159764745236614>
