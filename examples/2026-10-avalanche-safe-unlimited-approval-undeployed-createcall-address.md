# Unnamed trading Safe — unlimited approvals to an address that held the team's pool on other chains but was empty on Avalanche, so anyone could deploy there — Safe multisig / Avalanche — 2026-10-26

**Loss:** **~\$7.45M** (3.09M USDC, 350.4K WAVAX, 182 WETH.e, 10.79 BTC.b) taken from a 2-of-7 Safe holding trading inventory. An MEV bot front-ran the original attacker in the same block, took the funds, called itself a whitehat and offered to return them for a 5–10% bounty. The operator evacuated its Safes on five other chains (~\$38.7M) to a fresh address.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary*. On 2026-03-07 the Safe approved **unlimited** WAVAX, USDC, WETH.e and BTC.b to [`0x3725bd4d175283108156c3f15f86e1c51266155d`](https://snowtrace.io/address/0x3725bd4d175283108156c3f15f86e1c51266155d). On Base, Arbitrum and Ethereum the team's pool lives there; on Avalanche the address was **empty**, and it is simply what Safe's public CreateCall contract produces on its 13th deployment. An attacker deployed CreateCall via the Safe singleton factory, ran 12 throwaway deployments, then put a sweeper at that address. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). No signer key was compromised.

**Attribution:** **pseudonymous;** the operator is not publicly named.

**Key teaching point:** **The same address is not the same contract on another chain.** Approving a counterfactual address on a chain where nothing is deployed hands the allowance to whoever deploys there first. Check code at the spender before approving, per chain, and revoke allowances that nothing uses.

## Summary

Defimon detected the attack on 2026-10-26 at 13:00 UTC. The approvals had been live for seven months.

## Timeline (UTC)

Read it as four stages. **Flaw**: unlimited approvals to an address that was empty on Avalanche. **Prepare**: an attacker deploys CreateCall and burns 12 deployments to reach that address. **Take**: a sweeper is placed at the address; an MEV bot copies the transaction and wins the race. **Respond**: the operator evacuates its other Safes while the bot negotiates a bounty. Times are from Defimon unless marked.

| When | What happened | OAK |
|---|---|---|
| 2026-03-07 16:10 | A batch from the 2-of-7 Safe ([`0x631fca4a73aee699638634479132452ef354b9b8`](https://snowtrace.io/address/0x631fca4a73aee699638634479132452ef354b9b8)) ([`0x6952f80bbbcad4368b020bcda600965cf0a520a8694db431b6b1521842d3829e`](https://snowtrace.io/tx/0x6952f80bbbcad4368b020bcda600965cf0a520a8694db431b6b1521842d3829e)) sets **unlimited** WAVAX, USDC, WETH.e and BTC.b allowances to [`0x3725bd4d175283108156c3f15f86e1c51266155d`](https://snowtrace.io/address/0x3725bd4d175283108156c3f15f86e1c51266155d). On Base, Arbitrum and Ethereum the team's pool contract is at that address. On Avalanche it is empty. The allowances are never revoked, so they stay live for about seven months. | **T9.004** |
| Before 2026-10-26 (undisclosed) | A fresh EOA ([`0x4c48b79b97516719444056d2bf0dc9564138fa0a`](https://snowtrace.io/address/0x4c48b79b97516719444056d2bf0dc9564138fa0a)) deploys Safe's CreateCall contract through the Safe singleton factory, then runs 12 throwaway deployments, so that the 13th deployment lands at [`0x3725bd4d175283108156c3f15f86e1c51266155d`](https://snowtrace.io/address/0x3725bd4d175283108156c3f15f86e1c51266155d). Exact times are not published. | **T9.004** |
| 2026-10-26 12:56:14 | The attacker's transaction ([`0xf1f87d370290afe269ae8eb30fe8e5e4694ad153914a2de6d980641f4a331289`](https://snowtrace.io/tx/0xf1f87d370290afe269ae8eb30fe8e5e4694ad153914a2de6d980641f4a331289)) places a sweeper at [`0x3725bd4d175283108156c3f15f86e1c51266155d`](https://snowtrace.io/address/0x3725bd4d175283108156c3f15f86e1c51266155d) to pull every balance out of the Safe. It reverts with "Multicall3: Call Failed", because the MEV bot's copy runs first (SnowScan card in Defimon's quoted post). | **T9.004** |
| 2026-10-26 (same block) | An MEV bot ([`0x36b112875f921e51f5ea8ff39b374960694d21b3`](https://snowtrace.io/address/0x36b112875f921e51f5ea8ff39b374960694d21b3)) copies the attack and front-runs it in the same block ([`0xf88a7960a07832e1bf5be64edbd12a9e615b4f63959a4b87a147f0c63c007ed5`](https://snowtrace.io/tx/0xf88a7960a07832e1bf5be64edbd12a9e615b4f63959a4b87a147f0c63c007ed5)), taking 3.09M USDC, 350.4K WAVAX, 182 WETH.e and 10.79 BTC.b (about \$7.45M). The funds sit at [`0x11eb9b677510e2594857f4d137fd12a7fef39bc5`](https://snowtrace.io/address/0x11eb9b677510e2594857f4d137fd12a7fef39bc5). | **T9.004** |
| 2026-10-26 13:00:23 | Defimon detects the activity. | — |
| 2026-10-26 to 10-27 (undisclosed) | The bot posts on-chain messages that it is a whitehat, shares the original attack transaction, says it will return funds to [`0x35c6aa248e9495E0572598fBfE0528aCbAC2807C`](https://snowtrace.io/address/0x35c6aa248e9495E0572598fBfE0528aCbAC2807C) within hours, and asks for a 5–10% bounty. One owner message offers 42,500 WAVAX (about \$371K) (RektRadar; related transaction [`0xd2916fecdf3f0749692830918bd0ac8059c4d87e62d174181e609a7076911afc`](https://snowtrace.io/tx/0xd2916fecdf3f0749692830918bd0ac8059c4d87e62d174181e609a7076911afc)). Return is not confirmed in the sources. | response |
| From 13:48 (date not stated; reported 2026-10-27) | Signers of the operator's other Safes, each with its own signers, evacuate the Safes on HyperEVM, Base, Robinhood Chain, BSC and Ethereum to one fresh address (0x70d54baf9ffa48b8fe4e843774a44e24ff452099), about \$38.7M. | response |
| 2026-10-27 | Defimon publishes the public alert. | — |

Key addresses:

- Spender that held the unlimited approvals and later got the sweeper (team pool on Base, Arbitrum, Ethereum; empty on Avalanche): [`0x3725bd4d175283108156c3f15f86e1c51266155d`](https://snowtrace.io/address/0x3725bd4d175283108156c3f15f86e1c51266155d)
- Victim 2-of-7 Safe: [`0x631fca4a73aee699638634479132452ef354b9b8`](https://snowtrace.io/address/0x631fca4a73aee699638634479132452ef354b9b8)
- Original attacker EOA: [`0x4c48b79b97516719444056d2bf0dc9564138fa0a`](https://snowtrace.io/address/0x4c48b79b97516719444056d2bf0dc9564138fa0a)
- MEV bot that front-ran the attack: [`0x36b112875f921e51f5ea8ff39b374960694d21b3`](https://snowtrace.io/address/0x36b112875f921e51f5ea8ff39b374960694d21b3)
- Address holding the taken funds: [`0x11eb9b677510e2594857f4d137fd12a7fef39bc5`](https://snowtrace.io/address/0x11eb9b677510e2594857f4d137fd12a7fef39bc5)
- Return address named in the bot's on-chain message: [`0x35c6aa248e9495E0572598fBfE0528aCbAC2807C`](https://snowtrace.io/address/0x35c6aa248e9495E0572598fBfE0528aCbAC2807C)
- Fresh address that received the operator's evacuated Safes (about \$38.7M; chains other than Avalanche, no single explorer, full value given by Defimon): `0x70d54baf9ffa48b8fe4e843774a44e24ff452099`

## Root-cause evidence

- **Technique:** OAK-T9.004
- **Source:** <https://x.com/DefimonAlerts/status/2115005055619260758>; <https://www.rektradar.xyz/web3-daily-exploits-27-oct-2026-avax-safe-7-45m-mev-frontrun/>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Defimon links the 2026-03-07 approval batch, the CreateCall deployment sequence, the reverted attack and the MEV front-run; RektRadar's brief agrees.

## Public references

- `[defimonavaxsafe2026]` — Defimon on X (2026-10-27): <https://x.com/DefimonAlerts/status/2115005055619260758>
- `[snowtraceapprovals2026]` — vulnerable approvals: <https://snowtrace.io/tx/0x6952f80bbbcad4368b020bcda600965cf0a520a8694db431b6b1521842d3829e>
- `[rektradaravax2026]` — RektRadar daily brief, 2026-10-27: <https://www.rektradar.xyz/web3-daily-exploits-27-oct-2026-avax-safe-7-45m-mev-frontrun/>
