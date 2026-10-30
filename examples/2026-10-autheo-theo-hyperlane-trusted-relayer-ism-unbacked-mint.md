# Autheo THEO — the warp-route token accepted any message its single trusted relayer delivered, and 19M THEO arrived with nothing locked on the origin — Autheo / Base (Hyperlane warp route) — 2026-10-12

**Loss:** **~700.8 ETH (~\$1.76M)** extracted by selling unbacked THEO for WETH, USDC and cbBTC and bridging to Ethereum (PeckShield; Defimon ~\$1.7M). THEO fell ~92%.

**OAK Techniques observed:** **OAK-T7.003** (Cross-Chain Bridge Laundering — the ETH proceeds were bridged from Base to Ethereum per PeckShield; see [`techniques/T7.003-cross-chain-bridge-laundering.md`](../techniques/T7.003-cross-chain-bridge-laundering.md)). **OAK-T10.002** (Message-Verification Bypass — *primary*. Per Defimon, THEO is a Hyperlane HypERC20 whose security module is a **TrustedRelayerIsm**: one relayer key authorises any inbound message. A message from origin domain 2127 minted **19,000,000 THEO** from the zero address with no lock or burn on the origin; 9.5M were then run through a 54-swap extraction across the THEO/USDC pair and Uniswap v4 / Hydrex pools. See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md)). Whether the attacker held the trusted relayer key or the module trusted an address the attacker controlled is not disclosed.

**Attribution:** **pseudonymous** ([`0x3048b4ee5a070f33b73e3401829847255079e0ad`](https://basescan.org/address/0x3048b4ee5a070f33b73e3401829847255079e0ad)).

**Key teaching point:** **A single trusted relayer is a single key with mint rights.** The warp route's verification was as strong as one relayer's key management, which is not message verification.

## Summary

Defimon dated the mint to 2026-10-12 and PeckShield reported the cash-out on 2026-10-13. Autheo told users not to buy, sell or bridge THEO while it investigated.

## Timeline (UTC)

Read it as three stages. **Flaw**: one relayer key can authorise any message. **Take**: a 19M unbacked mint, then a 54-swap dump. **After**: ETH bridged to Ethereum; the operator has not published a root cause. Times are from the Defimon and PeckShield posts.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-12 (since when: undisclosed) | THEO on Base is a Hyperlane `HypERC20` warp-route token whose security module is a `TrustedRelayerIsm`: a single relayer key can authorise **any** inbound interchain message (Defimon). | **T10.002** |
| Before the mint (undisclosed) | Whether the attacker held the trusted relayer key, or the module trusted an address the attacker controls, is not disclosed. Preparation and funding are not published. | — |
| 2026-10-12 | In an earlier transaction (`0x4fdbbc5e…`, full hash not published) the attacker delivers a Hyperlane message from origin domain 2127. `handle()` mints **19,000,000 THEO** from the zero address with no lock or burn on the origin chain. | **T10.002** |
| 2026-10-12 | In [`0x9d2a604246abdd8b8a847049f114a670218d307a3160d37a0c4e567edde73fcb`](https://basescan.org/tx/0x9d2a604246abdd8b8a847049f114a670218d307a3160d37a0c4e567edde73fcb) the attacker's orchestrator (`0x599b…71f4`, full address not published) pulls 9.5M of the unbacked THEO and runs it through a 54-swap extraction contract (`0x8f10…f996`, full address not published). It dumps into the THEO/USDC pair (`0x182b…e938`, full address not published; −\$476K USDC) and Uniswap v4 / Hydrex THEO pools, taking ~\$700K of WETH, USDC and cbBTC. Defimon calls this one tx of a multi-tx dump campaign. | — |
| 2026-10-12 → 10-13 | The proceeds end up as **700.8 ETH** (~\$1.76M), bridged from Base to Ethereum (PeckShield). The bridge used and any onward movement are not published. | T7.003 |
| 2026-10-13 08:07:16 | Defimon alert dates the loss to 2026-10-12 and names the TrustedRelayerIsm as the cause. | — |
| 2026-10-13 09:04:09 | PeckShield reports the 19M mint, the swap to 700.8 ETH and the bridge to Ethereum. THEO is down 92% in 24 hours. | — |
| 2026-10-13 | Autheo tells users not to buy, sell or bridge THEO while it investigates. No root-cause statement, fix or compensation has been published. | response |

Key addresses:

- Attacker — [`0x3048b4ee5a070f33b73e3401829847255079e0ad`](https://basescan.org/address/0x3048b4ee5a070f33b73e3401829847255079e0ad)
- THEO token / victim (HypERC20 warp route) — [`0xebe516a20238f79dc20b07ead6768e08891ed309`](https://basescan.org/address/0xebe516a20238f79dc20b07ead6768e08891ed309)
- Dump transaction — [`0x9d2a604246abdd8b8a847049f114a670218d307a3160d37a0c4e567edde73fcb`](https://basescan.org/tx/0x9d2a604246abdd8b8a847049f114a670218d307a3160d37a0c4e567edde73fcb)
- Mint transaction — `0x4fdbbc5e…` (full hash not published)
- Orchestrator `0x599b…71f4`, extraction contract `0x8f10…f996`, THEO/USDC pair `0x182b…e938` — full addresses not published
- Bridge and Ethereum-side receiving address — not published

## Root-cause evidence

- **Technique:** OAK-T10.002
- **Source:** <https://x.com/DefimonAlerts/status/2109918883037454782>; <https://x.com/PeckShieldAlert/status/2109933198096711890>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Defimon identifies the TrustedRelayerIsm and the unbacked 19M mint; PeckShield independently confirms the 19M mint and the 700.8 ETH cash-out. Autheo has not published a root cause.

## Public references

- `[defimontheo2026]` — Defimon on X (2026-10-13): <https://x.com/DefimonAlerts/status/2109918883037454782>
- `[peckshieldtheo2026]` — PeckShield on X (2026-10-13): <https://x.com/PeckShieldAlert/status/2109933198096711890>
- `[defianttheo2026]` — The Defiant, Autheo's THEO plunges 92% after suspected bridge exploit: <https://thedefiant.io/news/hacks/autheo-s-theo-plunges-92-after-suspected-bridge-exploit-on-base>
