# Bittensor — malicious `bittensor` 6.12.2 package on PyPI sent users' decrypted coldkeys to an attacker's server, and about 32,000 TAO was drained — Bittensor / TAO — 2024-07-02

**Loss:** **~32,000 TAO, about \$8M**, taken from owners of some validators, subnets and miners over roughly three hours on 2024-07-02 ([Rekt](https://rekt.news/bittensor-rekt), [The Block](https://www.theblock.co/news/regulation/2024-07-04-bittensor-exploit-303547)). The sources give no count of wallets or victims; [Coinlive](https://www.coinlive.com/news/revisiting-the-bittensor-theft-what-happened-and-what-vulnerabilities-were) repeats the 32,000 TAO figure. Recovery: none reported; the Opentensor Foundation (OTF) says it is working with exchanges to trace the attacker and try to recover funds ([The Block](https://www.theblock.co/news/regulation/2024-07-04-bittensor-exploit-303547)). TAO fell about 15% after the incident.

**OAK Techniques observed:** **OAK-T15.002** (Supply-Chain / Vendor-Pipeline Compromise — *primary, operator-stated*). OTF traced the attack to a malicious upload of version 6.12.2 to the PyPI package manager, posing as the legitimate Bittensor library ([The Block](https://www.theblock.co/news/regulation/2024-07-04-bittensor-exploit-303547)). When users decrypted their coldkeys, the key material was sent to a server the attacker controlled ([Rekt](https://rekt.news/bittensor-rekt)). See [`techniques/T15.002-supply-chain-vendor-pipeline-compromise.md`](../techniques/T15.002-supply-chain-vendor-pipeline-compromise.md). **OAK-T11.002** (Wallet-Software Distribution Compromise — *secondary*): the package is the client through which users stake, transfer and delegate, and the key theft happens at the point their wallet is unlocked. See [`techniques/T11.002-wallet-software-distribution-compromise.md`](../techniques/T11.002-wallet-software-distribution-compromise.md). How the attacker obtained the right to publish to PyPI is undisclosed. No source opened describes laundering, so no laundering Technique is claimed.

**Attribution:** **unattributed** — ZachXBT identified the address that received the stolen funds, `5FbWTraF7jfBe5EvCmSThum85htcrEsCzwuFjG3PukTUQYot`, and may have tied it to an earlier theft of over 28,000 TAO on 2024-06-01 ([Rekt](https://rekt.news/bittensor-rekt)). No named actor or group is given in the sources opened.

**Key teaching point:** **Do not unlock a coldkey inside a Python environment that auto-installs the newest release of a wallet package; pin a reviewed version and compare the PyPI file with the GitHub tag.** In this incident a user needed only to install 6.12.2 and then decrypt a coldkey to stake, unstake, transfer, delegate or undelegate ([Rekt](https://rekt.news/bittensor-rekt)).

## Summary

Bittensor's Python package, `bittensor`, is the client users run to stake, transfer and delegate TAO. A malicious version, 6.12.2, was uploaded to PyPI and posed as the real package. Users who downloaded the package between 2024-05-22 and 2024-05-29, or who used `Bittensor==6.12.2`, and then staked, unstaked, transferred, delegated or undelegated were affected ([Rekt](https://rekt.news/bittensor-rekt)). The drain began on 2024-07-02 at 19:06 UTC. OTF flagged an abnormality in transfer volume at 19:26 and put its validators behind a firewall in safe mode at 19:41 ([The Block](https://www.theblock.co/news/regulation/2024-07-04-bittensor-exploit-303547)). OTF says the blockchain and Subtensor code were not affected and published its post-mortem on 2024-07-03 ([OTF on X](https://x.com/opentensor/status/1808586723712250158)).

The sibling file [`2024-07-bittensor-pypi-package-coldkey-theft.md`](2024-07-bittensor-pypi-package-coldkey-theft.md) covers the same incident; this file is not a separate cohort event.

## Timeline (UTC)

**Entry**: the malicious release. **Preparation**: the exposure window. **Execution**: the drain. **Money**: one receiving address is public; onward movement is undisclosed in the pages opened. **Response**: safe mode, removal of the package, the post-mortem.

| When | What happened | OAK |
|---|---|---|
| 2024-05-22 to 05-29 | Users who download the PyPI package in this window, or use `Bittensor==6.12.2`, are exposed when they then stake, unstake, transfer, delegate or undelegate. The malicious code steals unencrypted coldkey details and sends them to the attacker's server ([Rekt](https://rekt.news/bittensor-rekt)). How the upload was made is undisclosed. | **T15.002** |
| 2024-06-01 | Over 28,000 TAO (\$11.2M at the time) is stolen from one holder; ZachXBT may have tied the later receiving address to this theft ([Rekt](https://rekt.news/bittensor-rekt)). Not established as the same mechanism. | — |
| 2024-07-02 19:06 | The attack begins and the attacker moves funds from affected wallets to its own ([The Block](https://www.theblock.co/news/regulation/2024-07-04-bittensor-exploit-303547)). About three hours in total ([Rekt](https://rekt.news/bittensor-rekt)). | **T11.002** |
| 2024-07-02 | Receiving address identified by ZachXBT: [`5FbWTraF7jfBe5EvCmSThum85htcrEsCzwuFjG3PukTUQYot`](https://taostats.io/account/5FbWTraF7jfBe5EvCmSThum85htcrEsCzwuFjG3PukTUQYot). Onward movement, swaps and laundering: undisclosed in the pages opened. No transaction hashes are printed in full. | — |
| 2024-07-02 19:26 | OTF flags an abnormality in transfer volume ([The Block](https://www.theblock.co/news/regulation/2024-07-04-bittensor-exploit-303547)). | response |
| 2024-07-02 19:41 | OTF places the chain validators behind a firewall and enters safe mode on Subtensor ([OTF on X](https://x.com/opentensor/status/1808586723712250158)). Blocks continue to be produced but transactions are not processed ([Rekt](https://rekt.news/bittensor-rekt)). | response |
| 2024-07-03 | OTF publishes its post-mortem; removes 6.12.2 from PyPI, reviews the Subtensor and Bittensor code, and works with exchanges to trace the attacker ([Rekt](https://rekt.news/bittensor-rekt), [OTF on X](https://x.com/opentensor/status/1808586723712250158)). | response |
| 2024-07-04 | The Block reports that the last transaction finalised about 35 hours earlier and that the chain will resume gradually; affected users are told to create a new wallet and move funds once it does ([The Block](https://www.theblock.co/news/regulation/2024-07-04-bittensor-exploit-303547)). | response |

Key addresses:

- Receiving address named by ZachXBT — [`5FbWTraF7jfBe5EvCmSThum85htcrEsCzwuFjG3PukTUQYot`](https://taostats.io/account/5FbWTraF7jfBe5EvCmSThum85htcrEsCzwuFjG3PukTUQYot)

## Root-cause evidence

- **Technique:** OAK-T15.002
- **Source:** <https://x.com/opentensor/status/1808586723712250158>; <https://www.theblock.co/news/regulation/2024-07-04-bittensor-exploit-303547>; <https://rekt.news/bittensor-rekt>
- **Source type:** news
- **Confidence:** corroborated
- **Evidence:** The Block and Rekt both report OTF's post-mortem finding: version 6.12.2 on PyPI impersonated the Bittensor library and sent decrypted coldkeys to an attacker-controlled server. OTF's own X post confirms the attack and safe mode but points to a Medium post for the post-mortem, which was not opened (its blog page returned 403). The 2024-05-22 to 05-29 exposure window is from Rekt and The Block; Coinlive gives the same window. How the attacker published to PyPI is not public.

## Public references

- Opentensor Foundation on X, "Bittensor Community Update" (2024-07-03): <https://x.com/opentensor/status/1808586723712250158>
- The Block, "Bittensor identifies vulnerability behind \$8 million exploit in post-mortem" (2024-07-04): <https://www.theblock.co/news/regulation/2024-07-04-bittensor-exploit-303547>
- Rekt, "Bittensor" (2024-07-03): <https://rekt.news/bittensor-rekt>
- Coinlive, "Revisiting the Bittensor theft: What happened and what vulnerabilities were revealed" (2024-07-05): <https://www.coinlive.com/news/revisiting-the-bittensor-theft-what-happened-and-what-vulnerabilities-were>
