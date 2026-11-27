# Meter.io Passport Bridge — an unguarded ERC20 deposit path credited wrapped native tokens that were never locked or burned — Meter Passport / Ethereum, BNB Smart Chain, Moonriver — 2022-02-05

**Loss:** **~\$4.3M–\$4.4M** from the bridge: [PeckShield](https://forklog.com/en/hacker-siphons-4-3-million-from-meter-cross-chain-bridge/) (via Forklog) counted 1,391.24945169 ETH and 2.74068396 BTC (about \$4.3M); [Halborn](https://halborn.com/explained-the-meter-io-hack-february-2022/), [Rekt](https://rekt.news/meter-rekt) and [Cointelegraph](https://cointelegraph.com/news/latest-defi-bridge-exploit-results-in-4-4m-losses-for-meter) say \$4.4M. Rekt places it on BSC and Cointelegraph on the Moonriver side; the sources do not reconcile this. **Second-order loss:** Hundred Finance lost a further \$3.3M on Moonriver ([Halborn](https://halborn.com/explained-the-meter-io-hack-february-2022/); [Cointelegraph](https://cointelegraph.com/news/latest-defi-bridge-exploit-results-in-4-4m-losses-for-meter)). **Compensation:** Meter reserved \$4.4M in MTRG tokens to compensate victims ([Forklog](https://forklog.com/en/hacker-siphons-4-3-million-from-meter-cross-chain-bridge/)).

**OAK Techniques observed:** **OAK-T10.002** (Message-Verification Bypass — *primary*). Meter Passport is a fork of ChainSafe's ChainBridge with one change to the ERC20 handler's deposit logic that assumed wrapped native tokens do not burn or lock; that held for `depositEth` but not for the "mostly unguarded" `deposit` method, which accepted an arbitrary amount in calldata that was passed to the handler's deposit ([Rekt](https://rekt.news/meter-rekt); [Halborn](https://halborn.com/explained-the-meter-io-hack-february-2022/)). See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md). **OAK-T7.001** (Mixer-Routed Hop — *secondary*): Rekt says the proceeds moved into Tornado Cash "across multiple transactions over the space of one hour" ([Rekt](https://rekt.news/meter-rekt)).

**Attribution:** **pseudonymous** (attacker address [`0x8d3d13cac607B7297Ff61A5E1E71072758AF4D01`](https://etherscan.io/address/0x8d3d13cac607B7297Ff61A5E1E71072758AF4D01) per [Rekt](https://rekt.news/meter-rekt)). Rekt says Meter has evidence about the hacker's identity and is working with authorities; no identity is published in the sources opened.

**Key teaching point:** **Every public deposit entry point of a bridge handler must enforce the same lock-or-burn check, not only the one the front end calls.** Halborn notes the second function did not "check that msg.value equals the amount specified within the calldata", while the function users were "supposed to" use was safe ([Halborn](https://halborn.com/explained-the-meter-io-hack-february-2022/)).

## Summary

Meter Passport is a cross-chain bridge forked from ChainSafe's ChainBridge ([Rekt](https://rekt.news/meter-rekt)). Meter said its contract "did not block direct interaction of wrapped ERC-20 assets for the native gas token" and "did not properly transfer nor verify the correct amount of WETH sent from the caller address" ([Forklog](https://forklog.com/en/hacker-siphons-4-3-million-from-meter-cross-chain-bridge/)). On 5 February 2022 the attacker called the unguarded deposit function with an arbitrary amount, minted BNB and wETH on the destination side, and drained bridge reserves until Meter halted bridge transactions ([Rekt](https://rekt.news/meter-rekt); [Cointelegraph](https://cointelegraph.com/news/latest-defi-bridge-exploit-results-in-4-4m-losses-for-meter)). The attacker sold the BNB on SushiSwap, crashing its Moonriver price by 77%; opportunists bought the discounted BNB, used it as collateral on Hundred Finance and borrowed ETH, FRAX and MIM, leaving Hundred with \$3.3M of bad loans ([Cointelegraph](https://cointelegraph.com/news/latest-defi-bridge-exploit-results-in-4-4m-losses-for-meter)). Meter restored the bridge on 8 February with upgraded contracts ([Forklog](https://forklog.com/en/hacker-siphons-4-3-million-from-meter-cross-chain-bridge/)).

## Timeline (UTC)

**Flaw**, **Take**, **Money**, **Response**. The attack time is stated as "~6am PST on February 5th" by Rekt and "2 pm UTC" by Cointelegraph; these agree. Preparation (funding, deployment) is undisclosed in the sources opened, and no transaction hashes appear on the pages opened.

| When | What happened | OAK |
|---|---|---|
| Before 2022-02-05 | The fork's ERC20 handler assumes wrapped native tokens "doesn't burn or lock"; this holds for `depositEth` but not for the `deposit` method ([Rekt](https://rekt.news/meter-rekt)). PeckShield said the extension over ChainBridge "introduces a false deposit issue" ([Forklog](https://forklog.com/en/hacker-siphons-4-3-million-from-meter-cross-chain-bridge/)). | **T10.002** |
| 2022-02-05 about 14:00 | The attacker calls `deposit` with an arbitrary amount in calldata and mints BNB and wETH over several transactions ([Rekt](https://rekt.news/meter-rekt); [Cointelegraph](https://cointelegraph.com/news/latest-defi-bridge-exploit-results-in-4-4m-losses-for-meter)). | **T10.002** |
| 2022-02-05 (time undisclosed) | The BNB is sold on SushiSwap, crashing its Moonriver price by 77%; discounted BNB becomes collateral on Hundred Finance, which loses \$3.3M ([Cointelegraph](https://cointelegraph.com/news/latest-defi-bridge-exploit-results-in-4-4m-losses-for-meter)). | — |
| 2022-02-05 (within about one hour of the attack, per Rekt) | Proceeds are sent to Tornado Cash across multiple transactions ([Rekt](https://rekt.news/meter-rekt)); PeckShield's 1,391 ETH and 2.74 wBTC went to Ethereum and through Tornado Cash ([Cointelegraph](https://cointelegraph.com/news/latest-defi-bridge-exploit-results-in-4-4m-losses-for-meter)). Individual transactions are undisclosed in the sources opened. | **T7.001** |
| 2022-02-05 | Meter's first post says Passport "was hacked a few hours ago"; the team halts bridge transactions ([Forklog](https://forklog.com/en/hacker-siphons-4-3-million-from-meter-cross-chain-bridge/); [Rekt](https://rekt.news/meter-rekt)). | response |
| 2022-02-06 | PeckShield reports the loss; Meter issues a statement, asks users not to trade the unbacked meterBNB on Moonriver and reserves \$4.4M in MTRG for compensation ([Forklog](https://forklog.com/en/hacker-siphons-4-3-million-from-meter-cross-chain-bridge/); [Cointelegraph](https://cointelegraph.com/news/latest-defi-bridge-exploit-results-in-4-4m-losses-for-meter)). | response |
| 2022-02-08 | Meter says "we have upgraded our smart contracts and Passport is back online!" and has engaged a third-party auditor ([Forklog](https://forklog.com/en/hacker-siphons-4-3-million-from-meter-cross-chain-bridge/)). Hundred Finance reopens its MIM and FRAX markets after about a day and asks holders to return the BNB collateral ([Cointelegraph](https://cointelegraph.com/news/latest-defi-bridge-exploit-results-in-4-4m-losses-for-meter)). | response |

Key addresses:

- Attacker — [`0x8d3d13cac607B7297Ff61A5E1E71072758AF4D01`](https://etherscan.io/address/0x8d3d13cac607B7297Ff61A5E1E71072758AF4D01) ([Rekt](https://rekt.news/meter-rekt))

## Root-cause evidence

- **Technique:** OAK-T10.002
- **Source:** <https://halborn.com/explained-the-meter-io-hack-february-2022/>; <https://rekt.news/meter-rekt>; <https://forklog.com/en/hacker-siphons-4-3-million-from-meter-cross-chain-bridge/>; <https://cointelegraph.com/news/latest-defi-bridge-exploit-results-in-4-4m-losses-for-meter>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Halborn and Rekt describe the same unguarded ERC20 deposit path in the ChainBridge fork; Forklog quotes Meter's own explanation and PeckShield's "false deposit issue" finding. Meter's post-mortem was not opened directly, and no transaction hashes were found on the pages opened.

## Public references

- Halborn, "Explained: The Meter.io Hack (February 2022)" (2022-02-08): <https://halborn.com/explained-the-meter-io-hack-february-2022/>
- Rekt, "Meter.io - REKT" (2022-02-07): <https://rekt.news/meter-rekt>
- Forklog, "Hacker siphons \$4.3 million from Meter cross-chain bridge" (2022-02-08): <https://forklog.com/en/hacker-siphons-4-3-million-from-meter-cross-chain-bridge/>
- Cointelegraph, "Latest DeFi bridge exploit results in \$4.4M losses for Meter" (2022-02-08): <https://cointelegraph.com/news/latest-defi-bridge-exploit-results-in-4-4m-losses-for-meter>
