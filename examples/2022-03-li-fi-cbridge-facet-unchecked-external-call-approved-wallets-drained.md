# Li.Fi — swapAndStartBridgeTokensViaCBridge called any address, so one call pulled tokens from wallets holding approvals — Li.Fi CBridgeFacet / Ethereum — 2022-03-20

**Loss:** **~\$596K–\$600K** from 29 user wallets, in 10 tokens: [BlockSec](https://blocksec.com/blog/li-fi-attack-a-cross-chain-bridge-vulnerability-no-it-s-due-to-unchecked-external-call) totals about \$596K, matching LI.FI's own figure, and [Cointelegraph](https://cointelegraph.com/news/li-finance-protocol-loses-600-000-in-latest-defi-exploit) reports about \$600,000 from 29 wallets. **Reimbursed:** treasury funds covered 25 of the 29 wallets (about \$80,000, 13% of the losses); the owners of the other four, who lost \$517,000 combined, were offered LiFi tokens equal to their losses on the terms given to angel investors ([Cointelegraph](https://cointelegraph.com/news/li-finance-protocol-loses-600-000-in-latest-defi-exploit)). [Revoke.cash](https://revoke.cash/exploits/lifi) says most users were reimbursed within 18 hours.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*, unvalidated caller-supplied input): `swapAndStartBridgeTokensViaCBridge` on `CBridgeFacet` performed "no checks on the parameters, such as white-list and swap slippage", so any account could call it with arbitrary parameters ([BlockSec](https://blocksec.com/blog/li-fi-attack-a-cross-chain-bridge-vulnerability-no-it-s-due-to-unchecked-external-call)). See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md). **OAK-T4.004** (Allowance / Approve-Pattern Drainer — *secondary*): the call used `transferFrom` against wallets that had approved the contract, some with "infinite approval" ([BlockSec](https://blocksec.com/blog/li-fi-attack-a-cross-chain-bridge-vulnerability-no-it-s-due-to-unchecked-external-call); [Cointelegraph](https://cointelegraph.com/news/li-finance-protocol-loses-600-000-in-latest-defi-exploit)). See [`techniques/T4.004-allowance-approve-drainer.md`](../techniques/T4.004-allowance-approve-drainer.md).

**Attribution:** **pseudonymous** (attacker EOA [`0x878099f08131a18fab6bb0b4cfc6b6dae54b177e`](https://etherscan.io/address/0x878099f08131a18fab6bb0b4cfc6b6dae54b177e) per [BlockSec](https://blocksec.com/blog/li-fi-attack-a-cross-chain-bridge-vulnerability-no-it-s-due-to-unchecked-external-call)). No source opened names a person.

**Key teaching point:** **A contract that holds user approvals must never make an external call to a caller-chosen address; restrict call targets to an on-chain list of approved exchanges.** LI.FI's fix was exactly that, deployed the same day ([Revoke.cash](https://revoke.cash/exploits/lifi)). The routing was computed off-chain by LI.FI's front end and the contract did not enforce it on-chain ([BlockSec](https://blocksec.com/blog/li-fi-attack-a-cross-chain-bridge-vulnerability-no-it-s-due-to-unchecked-external-call)).

## Summary

On 20 March 2022 an attacker made a single call to `swapAndStartBridgeTokensViaCBridge` on LI.FI's `CBridgeFacet`; BlockSec says no malicious contract was deployed and no flash loan was used ([BlockSec](https://blocksec.com/blog/li-fi-attack-a-cross-chain-bridge-vulnerability-no-it-s-due-to-unchecked-external-call)). The function took tokens with `transferFrom` from users who had approved the contract and sent them to the attacker's EOA, because it did not check the parameters it was given ([BlockSec](https://blocksec.com/blog/li-fi-attack-a-cross-chain-bridge-vulnerability-no-it-s-due-to-unchecked-external-call)). Developer Daniel Von Fange, quoted by Cointelegraph, put it as "its internal swap() function would call out to any address using whatever message the attacker passed in" ([Cointelegraph](https://cointelegraph.com/news/li-finance-protocol-loses-600-000-in-latest-defi-exploit)). Revoke.cash says the swap-before-bridge contract had launched about a month before and that the same contract was deployed on several other chains; it does not say which were hit ([Revoke.cash](https://revoke.cash/exploits/lifi)). LI.FI shut its swap functions, fixed the contract and reimbursed users. This is the earlier of two incidents at the same project: see [`2024-07-li-finance.md`](2024-07-li-finance.md) for the July 2024 exploit, which is a separate incident.

## Timeline (UTC)

**Flaw**, **Take**, **Money**, **Response**. The time of the attack and of the team's reaction are Cointelegraph's.

| When | What happened | OAK |
|---|---|---|
| About 2022-02 | LI.FI launches a contract that can swap tokens before bridging; Revoke.cash calls the swap too flexible, since it lets callers point it at any contract rather than only exchanges ([Revoke.cash](https://revoke.cash/exploits/lifi)). Its CEO says the team was "literally a week away from our audit" ([Cointelegraph](https://cointelegraph.com/news/li-finance-protocol-loses-600-000-in-latest-defi-exploit)). | **T9.004** |
| 2022-03-20 02:51 | The attacker calls `swapAndStartBridgeTokensViaCBridge` (selector `0x01c0a31a`) in [`0x4b4143cbe7f5475029cf23d6dcbb56856366d91794426f2e33819b9b1aac4e96`](https://etherscan.io/tx/0x4b4143cbe7f5475029cf23d6dcbb56856366d91794426f2e33819b9b1aac4e96); tokens are pulled from approving wallets to the attacker EOA ([BlockSec](https://blocksec.com/blog/li-fi-attack-a-cross-chain-bridge-vulnerability-no-it-s-due-to-unchecked-external-call); [Cointelegraph](https://cointelegraph.com/news/li-finance-protocol-loses-600-000-in-latest-defi-exploit)). BlockSec's table lists USDT 368,745.29, USDC 202,012.28, JRT 136,805.06, DAI 8,421.49, MATIC 3,144.89, AUDIO 1,202.37, RPL 44.86, MVI 22.95, AAVE 8.99 and GNO 0.94. | **T9.004**, **T4.004** |
| 2022-03-20 (time undisclosed) | The attacker swaps the stolen tokens for about 205 ETH; per the team, as of the report the ETH had not moved from the attacker's wallet ([Cointelegraph](https://cointelegraph.com/news/li-finance-protocol-loses-600-000-in-latest-defi-exploit)). Later movement is undisclosed in the sources opened. | — |
| 2022-03-20 14:15 | The team learns of the exploit and shuts down all swapping functions ([Cointelegraph](https://cointelegraph.com/news/li-finance-protocol-loses-600-000-in-latest-defi-exploit)). | response |
| 2022-03-20 (after) | LI.FI contacts the attacker on-chain and offers a bug bounty, in [`0xa055c1e29bfb3a71e752e2ef8dc5bf348f59d97884bb704abbf88b557139f790`](https://etherscan.io/tx/0xa055c1e29bfb3a71e752e2ef8dc5bf348f59d97884bb704abbf88b557139f790) ([Cointelegraph](https://cointelegraph.com/news/li-finance-protocol-loses-600-000-in-latest-defi-exploit)); no response as of the post-mortem ([Revoke.cash](https://revoke.cash/exploits/lifi)). | response |
| By 2022-03-21 02:50 | Post-mortem published; the bug is patched and deployed, and users need take no action ([Cointelegraph](https://cointelegraph.com/news/li-finance-protocol-loses-600-000-in-latest-defi-exploit)). The contract now only allows calls to approved exchanges and unlimited approvals are no longer requested by default ([Revoke.cash](https://revoke.cash/exploits/lifi)). | response |

Key addresses:

- Attacker EOA — [`0x878099f08131a18fab6bb0b4cfc6b6dae54b177e`](https://etherscan.io/address/0x878099f08131a18fab6bb0b4cfc6b6dae54b177e)
- `CBridgeFacet` (vulnerable) — [`0x5a9fd7c39a6c488e715437d7b1f3c823d5596ed1`](https://etherscan.io/address/0x5a9fd7c39a6c488e715437d7b1f3c823d5596ed1)
- Victim logic contract linked by BlockSec — [`0x73a499e043b03fc047189ab1ba72eb595ff1fc8e`](https://etherscan.io/address/0x73a499e043b03fc047189ab1ba72eb595ff1fc8e)
- Attack transaction — [`0x4b4143cbe7f5475029cf23d6dcbb56856366d91794426f2e33819b9b1aac4e96`](https://etherscan.io/tx/0x4b4143cbe7f5475029cf23d6dcbb56856366d91794426f2e33819b9b1aac4e96)
- Bounty-message transaction — [`0xa055c1e29bfb3a71e752e2ef8dc5bf348f59d97884bb704abbf88b557139f790`](https://etherscan.io/tx/0xa055c1e29bfb3a71e752e2ef8dc5bf348f59d97884bb704abbf88b557139f790)

## Root-cause evidence

- **Technique:** OAK-T9.004 (with OAK-T4.004 as the way funds were taken)
- **Source:** <https://blocksec.com/blog/li-fi-attack-a-cross-chain-bridge-vulnerability-no-it-s-due-to-unchecked-external-call>; <https://cointelegraph.com/news/li-finance-protocol-loses-600-000-in-latest-defi-exploit>; <https://revoke.cash/exploits/lifi>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** BlockSec traces the single transaction and names the function and the missing parameter checks; Cointelegraph relays LI.FI's and a developer's account of the same mechanism; Revoke.cash summarises LI.FI's post-mortem. LI.FI's own post-mortem was not opened directly. Whether `CBridgeFacet` is a diamond facet is not stated on the pages opened here.

## Public references

- BlockSec, "LI.FI Attack: A Cross-chain Bridge Vulnerability? No, It's Due to Unchecked External Call": <https://blocksec.com/blog/li-fi-attack-a-cross-chain-bridge-vulnerability-no-it-s-due-to-unchecked-external-call>
- Cointelegraph, "Li.Finance protocol loses \$600,000 in latest DeFi exploit" (2022-03-21): <https://cointelegraph.com/news/li-finance-protocol-loses-600-000-in-latest-defi-exploit>
- Revoke.cash, "LI.FI exploit": <https://revoke.cash/exploits/lifi>
