# Beanstalk Farms flash-loan governance attack — Ethereum — 2022-04-17

**Loss:** about \$181M gross, of which the attacker kept about \$76M (about 24,830 WETH) `[rektbeanstalk]`. The Beanstalk team's post-mortem puts the stolen non-Beanstalk user assets at about \$77M `[beanpostmortem]`.
**OAK Techniques observed:** **OAK-T16.001** (Flash-Loan Governance Vote Manipulation — primary; flash-loaned funds were used to gain voting power and execute a malicious proposal `[rektbeanstalk]`). **OAK-T9.002** (Flash-Loan-Funded Attack — Aave, Uniswap v2 and SushiSwap loans `[rektbeanstalk]`). **OAK-T9.003** (Governance Attack). **OAK-T7.001** (Mixer-Routed Hop — about 24,800 ETH went to Tornado Cash `[rektbeanstalk]`). OAK-T6.001 (original mapping for the Ukraine-donation proposal; see correction below).
**Attribution:** **pseudonymous** attacker; no individual is named by the cited sources. Rekt notes the exploiter was initially funded from Tornado Cash and the Synapse bridge `[rektbeanstalk]`.
**Corrected 2026-10-11:** the exploit was not a single transaction creating and passing a proposal — two proposals were submitted the day before and executed through an emergency path; the loan sources were Aave, Uniswap v2 and SushiSwap; the Ukraine donation was about \$250K sent to a donation address (a separate proposal mislabelled "Bip18"), not the drain's stated purpose; removed the unsourced Curve-LP `balanceOf` governance description, "~70%" weight, "\$106M fees", the attacker address, timeline hours and relaunch details.
**Key teaching point:** **Governance that lets freshly borrowed capital count as voting power, combined with an emergency execution path that skips the usual delay, lets an attacker take a treasury in one sitting.** Rekt: all governance actions had about a one-day delay, but the malicious proposal was executed via an emergency path with no delay `[rektbeanstalk]`.

## Summary

On 2022-04-17 (about 12:24 UTC per the team's post-mortem) an attacker used a flash loan to exploit a previously unknown issue in Beanstalk's governance process `[beanpostmortem]`. Per Rekt, the attacker submitted two proposals the day before: proposal #18, moving all protocol funds to the attacker, and proposal #19, sending \$250K of BEAN to a Ukraine donation address, which was named "Bip18" rather than "Bip19" `[rektbeanstalk]`. The attacker borrowed 350M DAI, 500M USDC and 150M USDT from Aave, 32M BEAN from Uniswap v2 and 11.6M LUSD from SushiSwap, added liquidity to Curve pools to gain voting power, voted for the malicious BIP-18 and executed it via `emergencyCommit` `[rektbeanstalk]`. About 250K USDC was sent to the Ukraine Crypto Donation address, and about 24,800 ETH to Tornado Cash `[rektbeanstalk]`.

The team alerted immediately, temporarily shut off governance and paused Beanstalk, burned the remaining Beans in the exploiter contract, and published a post-mortem on 2022-04-19 describing a plan to relaunch a more secure Beanstalk `[beanpostmortem]`. Rekt notes that the anonymous team (Publius) said it was a group of three, and that Omniscia said the exploit was outside its audit scope `[rektbeanstalk]`.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2022-04-16 | Two proposals submitted by the attacker `[rektbeanstalk]` | (setup) |
| 2022-04-17 ~12:24 UTC | Flash loans, vote and emergency execution; funds drained `[beanpostmortem]` `[rektbeanstalk]` | T16.001, T9.002 |
| 2022-04-17 onward | About 24,800 ETH sent to Tornado Cash `[rektbeanstalk]` | T7.001 |
| 2022-04-19 | Beanstalk post-mortem published `[beanpostmortem]` | (response) |

## Public references

- `[rektbeanstalk]` — Rekt, "Beanstalk - REKT" (2022-04-18): <https://rekt.news/beanstalk-rekt>
- `[beanpostmortem]` — Beanstalk Farms, "Beanstalk Governance Exploit" post-mortem (2022-04-19): <https://bean.money/blog/beanstalk-governance-exploit>
- See `techniques/T16.001-flash-loan-governance-vote-manipulation.md` for the Technique definition and mitigations.
