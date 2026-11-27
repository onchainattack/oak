# Steadefi — compromised deployer wallet transfers vault ownership and opens lending vaults to any borrower — Steadefi / Arbitrum, Avalanche — 2023-08-07

**Loss:** **~\$1.14M** per Rekt and Merkle Science (over \$1.14M; about \$1.1M per Halborn), taken as USDC, wBTC, wETH, AVAX, ARB, BTC.b and USDT from the lending vaults on Arbitrum and Avalanche ([Rekt](https://rekt.news/steadefi-rekt); [Merkle Science](https://www.merklescience.com/blog/hack-track-steadefi-flow-of-funds-analysis); [Halborn](https://halborn.com/blog/post/explained-the-steadefi-hack-august-2023)). Rekt reports that TVL fell from over \$2M to about \$550K. The depositor and strategy vaults lacked the same privileged function and were not drained ([Halborn](https://halborn.com/blog/post/explained-the-steadefi-hack-august-2023); [Rekt](https://rekt.news/steadefi-rekt)). No return is reported in the opened pages.

**OAK Techniques observed:** **OAK-T11.014** (Operator Privileged-Key Compromise — *primary*). The attacker held the private key of the deployer wallet, which owned all of the project's vault contracts, and used the owner functions as written: it transferred ownership of the vaults to its own address, then used owner-only functions to let any wallet borrow any available funds from the lending vaults ([Rekt](https://rekt.news/steadefi-rekt); [Halborn](https://halborn.com/blog/post/explained-the-steadefi-hack-august-2023)). See [`techniques/T11.014-operator-privileged-key-compromise.md`](../techniques/T11.014-operator-privileged-key-compromise.md). **OAK-T7.003** (Cross-Chain Bridge Laundering — the stolen tokens were swapped to about 624 ETH on both chains and bridged to Ethereum; [Merkle Science](https://www.merklescience.com/blog/hack-track-steadefi-flow-of-funds-analysis)). There was no malicious upgrade and no Tornado Cash hop in the opened sources.

**Attribution:** **unattributed.** The key was compromised by an undisclosed method; Rekt could not say whether phishing or an insider was responsible ([Rekt](https://rekt.news/steadefi-rekt)).

**Key teaching point:** **Do not leave one externally owned key as the owner of every vault.** Halborn recommends decentralised governance such as a multi-signature wallet for this reason ([Halborn](https://halborn.com/blog/post/explained-the-steadefi-hack-august-2023)). Rekt notes that because this was an account compromise rather than a contract bug, a whitehat return was unlikely ([Rekt](https://rekt.news/steadefi-rekt)).

## Summary

On 2023-08-07 Steadefi, a leveraged yield aggregation platform, posted that it had been exploited and all funds were at risk; a later post said the deployer address was compromised ([Rekt](https://rekt.news/steadefi-rekt) cites both posts, tweet ids 1688619454178144264 and 1688638572608552960). The attacker transferred ownership of each vault to an address it controlled (Rekt cites the USDC vault on Arbitrum as an example), enabled borrowing by any wallet from the lending vaults, exhausted lending capacity on Arbitrum and Avalanche and also paused the farms contract, which locks users' svTokens and ibTokens ([Rekt](https://rekt.news/steadefi-rekt); [Halborn](https://halborn.com/blog/post/explained-the-steadefi-hack-august-2023)). The stolen tokens were swapped for about 624 ETH (about 440 ETH on Arbitrum and 184 ETH on Avalanche) and bridged to Ethereum; the bridge is not named by Merkle Science ([Merkle Science](https://www.merklescience.com/blog/hack-track-steadefi-flow-of-funds-analysis)). Rekt reports the ETH forwarded to an Ethereum address where it remained at the time of writing.

## Timeline (UTC)

The sources give dates but no clock times; none are invented. Stages: **Entry** → **Take** → **Money** → **Response**.

| When | What happened | OAK |
|---|---|---|
| Before 2023-08-07 (method undisclosed) | The deployer wallet's private key is obtained by the attacker; the wallet owns all vault contracts ([Halborn](https://halborn.com/blog/post/explained-the-steadefi-hack-august-2023)) | **T11.014** |
| 2023-08-07 | Ownership of the vaults is transferred to the attacker, e.g. USDC vault on Arbitrum in [`0x1e94a17f392c77fd897b4bfb66a1364b5508de6b2a36f3b0227a4a9ca4a657f0`](https://arbiscan.io/tx/0x1e94a17f392c77fd897b4bfb66a1364b5508de6b2a36f3b0227a4a9ca4a657f0) ([Rekt](https://rekt.news/steadefi-rekt)) | **T11.014** |
| 2023-08-07 | Owner-only functions allow any wallet to borrow from the lending vaults; Arbitrum and Avalanche lending capacity is exhausted; farms contract paused ([Rekt](https://rekt.news/steadefi-rekt); [Halborn](https://halborn.com/blog/post/explained-the-steadefi-hack-august-2023)) | **T11.014** |
| 2023-08-07 | Steadefi announces the exploit, then that the deployer was compromised ([Rekt](https://rekt.news/steadefi-rekt)) | response |
| 2023-08-07 onward (hashes undisclosed) | Tokens swapped to about 624 ETH on Arbitrum and Avalanche and bridged to Ethereum ([Merkle Science](https://www.merklescience.com/blog/hack-track-steadefi-flow-of-funds-analysis)); forwarded to [`0xe10d4a5bd440775226c7e1858f573e379d0aca36`](https://etherscan.io/address/0xe10d4a5bd440775226c7e1858f573e379d0aca36), where it remained unmoved when Merkle Science and Rekt wrote ([Rekt](https://rekt.news/steadefi-rekt)) | **T7.003** |
| 2023-08-07 to 2023-08-08 | On-chain messages in [`0xdfc31c31e07f9007a15680e9c98a4d523cc440d4349515cebf22196086c889d4`](https://arbiscan.io/tx/0xdfc31c31e07f9007a15680e9c98a4d523cc440d4349515cebf22196086c889d4) and [`0x239fbabbcb8eba217b639ecea34b416bf08098b8031b2439f1fe013bde41e83d`](https://arbiscan.io/tx/0x239fbabbcb8eba217b639ecea34b416bf08098b8031b2439f1fe013bde41e83d) offer a 90/10 split: return 90% and keep 10%, after which the 10% is offered publicly for information leading to a conviction ([Rekt](https://rekt.news/steadefi-rekt)); the deadline is 08:00 UTC on 2023-08-10 and no legal action if accepted ([Halborn](https://halborn.com/blog/post/explained-the-steadefi-hack-august-2023)) | response |
| After 2023-08-10 | Outcome of the offer undisclosed in the opened pages | — |

Key addresses:

- Attacker (same address on Ethereum, Arbitrum, Avalanche) — [`0x9cf71F2ff126B9743319B60d2D873F0E508810dc`](https://arbiscan.io/address/0x9cf71F2ff126B9743319B60d2D873F0E508810dc) ([Rekt](https://rekt.news/steadefi-rekt))
- Ethereum forwarding address — [`0xe10d4a5bd440775226c7e1858f573e379d0aca36`](https://etherscan.io/address/0xe10d4a5bd440775226c7e1858f573e379d0aca36) ([Rekt](https://rekt.news/steadefi-rekt))

## Root-cause evidence

- **Technique:** OAK-T11.014
- **Source:** <https://rekt.news/steadefi-rekt>; <https://halborn.com/blog/post/explained-the-steadefi-hack-august-2023>; <https://www.merklescience.com/blog/hack-track-steadefi-flow-of-funds-analysis>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Three outlets agree the deployer wallet's key was compromised and owner functions were used; Rekt cites Steadefi's own post that the deployer was compromised. How the key was obtained is undisclosed. The Merkle Science page does not print addresses or hashes; the transaction hashes above are from Rekt.

## Public references

- Rekt, "Steadefi - REKT" (2023-08-08): <https://rekt.news/steadefi-rekt>
- Halborn, "Explained: The Steadefi Hack (August 2023)" (2023-08-10): <https://halborn.com/blog/post/explained-the-steadefi-hack-august-2023>
- Merkle Science, "Hack Track: Steadefi flow of funds analysis" (2023-08-08): <https://www.merklescience.com/blog/hack-track-steadefi-flow-of-funds-analysis>
