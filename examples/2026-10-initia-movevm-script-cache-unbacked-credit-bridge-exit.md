# Initia — a MoveVM script-caching bug let one transaction credit the attacker with unbacked tokens, and the bridges paid out real assets for them — Initia L1 / Ethereum — 2026-10-23

**Loss:** **~\$2.7M** per Initia: 105 WETH and ~1.4M AUSD0 bridged out via LayerZero and ~1.08M USDC via Noble/CCTP, swapped to 1,135.52 ETH held at [`0x358ef0130f7a5aa516dcd81bdc80b18cde41cac8`](https://etherscan.io/address/0x358ef0130f7a5aa516dcd81bdc80b18cde41cac8). The L1 and all rollups were halted at 15:41 UTC.

**OAK Techniques observed:** **OAK-T9.014** (Protocol-Client Consensus Bug — *primary, operator-stated*. Initia: "an attacker exploited a bug in Initia MoveVM's script caching that allowed malicious code to bypass security checks", spoofing MoveVM state to credit unbacked WETH, iUSD and USDC "without changing the corresponding token's total supply". No INIT was minted. See [`techniques/T9.014-protocol-client-consensus-bug.md`](../techniques/T9.014-protocol-client-consensus-bug.md)). **OAK-T7.001** (Mixer-Routed Hop — preparation was funded from Tornado Cash, per D2 Finance). **OAK-T7.003** (Cross-Chain Bridge Laundering — the unbacked balances were bridged out through LayerZero adapters and Circle CCTP and swapped to ETH within minutes). The cash-out ran through bridges working as designed: per D2 Finance, LayerZero DVNs attested burns that really happened, and an OFT adapter cannot tell whether burned tokens were ever backed.

**Attribution:** **pseudonymous;** prep funded from Tornado Cash ~6.5 h before (D2 Finance).

**Key teaching point:** **A chain's bridge lockboxes underwrite its VM.** As with [Liquid](2026-09-liquid-network-rangeproof-cache-unbacked-lbtc-pegout.md) in September, a mint bug on the source side was paid at par on Ethereum within minutes; the deepest exit liquidity was the bridge. Per-route rate limits are the control that bounds it.

## Summary

At 14:59 UTC on 2026-10-23 one signed transaction produced the unbacked balances; ~\$2.65M was back on Ethereum within 7 m 21 s. Initia promised a patch, audit and post-mortem.

## Timeline (UTC)

Read it as three stages. **Get in**: a MoveVM caching bug. **Prepare**: Tornado funding and test transfers. **Take**: unbacked balances created on Initia, then bridged out at par. Times are from D2 Finance's decoding unless marked.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-23 (undisclosed) | A bug in Initia MoveVM's script caching lets malicious code bypass security checks (Initia). Since when is not published. | **T9.014** |
| 2026-10-23 08:27 | 0.1 ETH from Tornado Cash funds the attacker's preparation. | T7.001 (funding) |
| 2026-10-23 from 13:14 | Dust sends through Axelar's `AxelarHandler`. | — |
| 2026-10-23 14:37 | A 0.006 ETH deposit into the same ETH adapter the attacker empties 29 minutes later. | — |
| 2026-10-23 14:59:26 | One signed transaction, the attacker's own key calling one Move function (135,888 gas), credits unbacked WETH, iUSD and USDC and 2,000,000 AUSD (D2's figure) without changing token total supply (Initia). No INIT is minted. | **T9.014** |
| 153 s later | A valid LayerZero message releases 1.4M real AUSD from the Ethereum adapter. LayerZero DVNs attest burns that really happened, and the adapter cannot tell whether burned tokens were backed. | **T7.003** |
| within 7 m 21 s of the mint | Three exits into one Ethereum address: 1.4M AUSD (71% of the adapter's balance), 105 ETH from the native-ETH adapter (96%), and 1.08M USDC minted via Circle CCTP. About \$2.65M is back on Ethereum. | **T7.003** |
| within about 3 minutes of landing | Every stablecoin is swapped to ETH via 1inch and 0x (AUSD in 84 seconds). All 1,135.52 ETH (about \$2.73M) ends in a fresh wallet. | — |
| 2026-10-23 15:41:30 | Initia halts the L1 and all rollups. The halt is announced at 16:00 UTC. | response |
| 2026-10-24 08:46 | Initia says funds sit unmoved in the wallet below, a patch and audit are expected in a few days, recovery is under way with security partners, and a full post-mortem will follow. Funds not moved as of this statement. | response |

Key addresses:

- Holding wallet for 1,135.52 ETH (Ethereum) — [`0x358ef0130f7a5aa516dcd81bdc80b18cde41cac8`](https://etherscan.io/address/0x358ef0130f7a5aa516dcd81bdc80b18cde41cac8)
- Address receiving the three bridge exits — `0xDD92…edFA` as given by D2 Finance (full address not published); D2 later describes the holding wallet as `0x358e…CAC8`, matching the entry above.

## Root-cause evidence

- **Technique:** OAK-T9.014
- **Source:** <https://x.com/initia/status/2113915002008612945>; <https://x.com/D2_Finance/status/2113667420359700509>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Initia names the MoveVM script-caching bug; D2 Finance's decoding gives the transaction timing and bridge exits. D2 describes a 2,000,000 AUSD "mint", Initia says total supply did not change; both agree the balances were unbacked.

## Public references

- `[initiastatement2026]` — Initia on X (2026-10-24): <https://x.com/initia/status/2113915002008612945>
- `[initiahalt2026]` — Initia on X, halt (2026-10-23): <https://x.com/initia/status/2113661738625155217>
- `[d2initia2026]` — D2 Finance, exploit decoding: <https://x.com/D2_Finance/status/2113667420359700509>
