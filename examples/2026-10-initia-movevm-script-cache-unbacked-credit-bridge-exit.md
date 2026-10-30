# Initia — a MoveVM script-caching bug let one transaction credit the attacker with unbacked tokens, and the bridges paid out real assets for them — Initia L1 / Ethereum — 2026-10-23

**Loss:** **~\$2.7M** per Initia: 105 WETH and ~1.4M AUSD0 bridged out via LayerZero and ~1.08M USDC via Noble/CCTP, swapped to 1,135.52 ETH held at `0x358e…cac8`. The L1 and all rollups were halted at 15:41 UTC.

**OAK Techniques observed:** **OAK-T9.014** (Protocol-Client Consensus Bug — *primary, operator-stated*. Initia: "an attacker exploited a bug in Initia MoveVM's script caching that allowed malicious code to bypass security checks", spoofing MoveVM state to credit unbacked WETH, iUSD and USDC "without changing the corresponding token's total supply". No INIT was minted. See [`techniques/T9.014-protocol-client-consensus-bug.md`](../techniques/T9.014-protocol-client-consensus-bug.md)). The cash-out ran through bridges working as designed: per D2 Finance, LayerZero DVNs attested burns that really happened, and an OFT adapter cannot tell whether burned tokens were ever backed.

**Attribution:** **pseudonymous;** prep funded from Tornado Cash ~6.5 h before (D2 Finance).

**Key teaching point:** **A chain's bridge lockboxes underwrite its VM.** As with [Liquid](2026-09-liquid-network-rangeproof-cache-unbacked-lbtc-pegout.md) in September, a mint bug on the source side was paid at par on Ethereum within minutes; the deepest exit liquidity was the bridge. Per-route rate limits are the control that bounds it.

## Summary

At 14:59 UTC on 2026-10-23 one signed transaction produced the unbacked balances; ~\$2.65M was back on Ethereum within 7 m 21 s. Initia promised a patch, audit and post-mortem.

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
