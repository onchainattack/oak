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
| 2026-10-12 17:16:13 | In [`0x9d2a604246abdd8b8a847049f114a670218d307a3160d37a0c4e567edde73fcb`](https://basescan.org/tx/0x9d2a604246abdd8b8a847049f114a670218d307a3160d37a0c4e567edde73fcb) the attacker address sends 9,501,032.6 THEO to the orchestrator ([`0x599bfa1039c9e22603f15642b711d56be62071f4`](https://basescan.org/address/0x599bfa1039c9e22603f15642b711d56be62071f4), traced by OAK), which passes it to the extraction contract ([`0x8f10b468b06c6fd214b65f87778827f7d113f996`](https://basescan.org/address/0x8f10b468b06c6fd214b65f87778827f7d113f996), traced by OAK). The contract sells it in 9 swaps into the THEO/USDC pair ([`0x182be47742b81777055d69c50e5c9d2fe803e938`](https://basescan.org/address/0x182be47742b81777055d69c50e5c9d2fe803e938), traced by OAK) for 476,900 USDC, then routes the USDC through other pools into 189.44 WETH, which stays in the extraction contract. Defimon calls this one tx of a multi-tx dump campaign. | — |
| 2026-10-12 → 10-13 | The proceeds end up as **700.8 ETH** (~\$1.76M), bridged from Base to Ethereum (PeckShield). The bridge used and any onward movement are not published. | T7.003 |
| 2026-10-13 08:07:16 | Defimon alert dates the loss to 2026-10-12 and names the TrustedRelayerIsm as the cause. | — |
| 2026-10-13 09:04:09 | PeckShield reports the 19M mint, the swap to 700.8 ETH and the bridge to Ethereum. THEO is down 92% in 24 hours. | — |
| 2026-10-13 | Autheo tells users not to buy, sell or bridge THEO while it investigates. No root-cause statement, fix or compensation has been published. | response |

Key addresses:

- Attacker — [`0x3048b4ee5a070f33b73e3401829847255079e0ad`](https://basescan.org/address/0x3048b4ee5a070f33b73e3401829847255079e0ad)
- THEO token / victim (HypERC20 warp route) — [`0xebe516a20238f79dc20b07ead6768e08891ed309`](https://basescan.org/address/0xebe516a20238f79dc20b07ead6768e08891ed309)
- Dump transaction — [`0x9d2a604246abdd8b8a847049f114a670218d307a3160d37a0c4e567edde73fcb`](https://basescan.org/tx/0x9d2a604246abdd8b8a847049f114a670218d307a3160d37a0c4e567edde73fcb)
- Mint transaction — `0x4fdbbc5e…` (full hash not published)
- Orchestrator — [`0x599bfa1039c9e22603f15642b711d56be62071f4`](https://basescan.org/address/0x599bfa1039c9e22603f15642b711d56be62071f4) (traced by OAK from the dump tx)
- Extraction contract — [`0x8f10b468b06c6fd214b65f87778827f7d113f996`](https://basescan.org/address/0x8f10b468b06c6fd214b65f87778827f7d113f996) (traced by OAK; shared swap executor, see Fund flow)
- THEO/USDC pair — [`0x182be47742b81777055d69c50e5c9d2fe803e938`](https://basescan.org/address/0x182be47742b81777055d69c50e5c9d2fe803e938) (traced by OAK)
- Bridge and Ethereum-side receiving address — not published

## Fund flow

Traced by OAK on Base over the public-RPC fallback (Blockscout answered HTTP 403), as of 2026-10-30. One transaction is checked end to end ([`0x9d2a604246abdd8b8a847049f114a670218d307a3160d37a0c4e567edde73fcb`](https://basescan.org/tx/0x9d2a604246abdd8b8a847049f114a670218d307a3160d37a0c4e567edde73fcb), 2026-10-12 17:16:13 UTC). The bridge to Ethereum is relayed from PeckShield and not traced.

```oak-flow
as_of: 2026-10-30T18:00Z
nodes:
  - {id: theo, chain: base, address: 0xebe516a20238f79dc20b07ead6768e08891ed309, role: vulnerable-contract, label: "THEO HypERC20 warp route"}
  - {id: atk, chain: base, address: 0x3048b4ee5a070f33b73e3401829847255079e0ad, role: attacker-eoa, label: "Attacker (sender of the dump tx)"}
  - {id: orch, chain: base, address: 0x599bfa1039c9e22603f15642b711d56be62071f4, role: attack-contract, label: "Orchestrator"}
  - {id: ext, chain: base, address: 0x8f10b468b06c6fd214b65f87778827f7d113f996, role: dex, label: "Swap executor (shared, high-volume; Defimon calls it the extraction engine)"}
  - {id: pair, chain: base, address: 0x182be47742b81777055d69c50e5c9d2fe803e938, role: dex, label: "THEO/USDC pair"}
  - {id: pools, chain: base, role: dex, label: "USDC to WETH/cbBTC pools and routers (a05de8fe…, 5d2806b9…, 3fe04a59…, 160d7e9d…, 42d4a22c…, 7c7420dd…, bee3211a…, 5b5562aa…, 4f5905e3…; cbBTC legs net to zero)"}
  - {id: relay, chain: base, address: 0x4cd00e387622c35bddb9b4c962c136462338bc31, role: bridge, label: "Relay bridge depository"}
  - {id: bridge, chain: base, role: bridge, label: "Bridge Base to Ethereum (rest of the 700.8 ETH, path not traced)"}
  - {id: eth, chain: ethereum, role: unknown, label: "Ethereum receiving address (not published)"}
edges:
  - {from: theo, to: atk, asset: "THEO (unbacked mint)", amount: 19000000, time: 2026-10-12T00:00Z, technique: T10.002, verified: source, source: defimontheo2026}
  - {from: atk, to: orch, asset: THEO, amount: 9501032.6, tx: 0x9d2a604246abdd8b8a847049f114a670218d307a3160d37a0c4e567edde73fcb, time: 2026-10-12T17:16Z, technique: T10.002, verified: oak}
  - {from: orch, to: ext, asset: THEO, amount: 9501032.6, tx: 0x9d2a604246abdd8b8a847049f114a670218d307a3160d37a0c4e567edde73fcb, time: 2026-10-12T17:16Z, technique: T10.002, verified: oak}
  - {from: pair, to: ext, asset: USDC, amount: 476898.7, tx: 0x9d2a604246abdd8b8a847049f114a670218d307a3160d37a0c4e567edde73fcb, time: 2026-10-12T17:16Z, technique: T10.002, verified: oak}
  - {from: ext, to: pools, asset: USDC, amount: 476898.7, tx: 0x9d2a604246abdd8b8a847049f114a670218d307a3160d37a0c4e567edde73fcb, time: 2026-10-12T17:16Z, technique: T10.002, verified: oak}
  - {from: pools, to: ext, asset: WETH, amount: 189.44, tx: 0x9d2a604246abdd8b8a847049f114a670218d307a3160d37a0c4e567edde73fcb, time: 2026-10-12T17:16Z, technique: T10.002, verified: oak}
  - {from: atk, to: relay, asset: ETH, amount: 292.18820218, tx: 0x88728afe998c34a50f7dcbfb8e1afe1ae62e13a2952f1a30dd08b85897222154, time: 2026-10-12T17:18:15Z, tx_count: 4, time_last: 2026-10-12T17:59:09Z, technique: T7.003, verified: oak}
  - {from: ext, to: bridge, asset: ETH, amount: 700.8, time: 2026-10-13T00:00Z, technique: T7.003, verified: source, source: peckshieldtheo2026}
  - {from: bridge, to: eth, asset: ETH, amount: 700.8, time: 2026-10-13T00:00Z, technique: T7.003, verified: source, source: peckshieldtheo2026}
```

What the trace adds beyond the sources:

- **The bridge step, found via the attacker's nonce.** Native ETH is invisible to log-based RPC tracing, so `tools/explorer.py` walked the attacker EOA's nonce instead. On 2026-10-12, between 17:18 and 17:59 UTC, [`0x3048b4ee5a070f33b73e3401829847255079e0ad`](https://basescan.org/address/0x3048b4ee5a070f33b73e3401829847255079e0ad) sent **292.19 ETH in four deposits** (280.45, 0.1, 11.21 and 0.43 ETH) to [`0x4cd00e387622c35bddb9b4c962c136462338bc31`](https://basescan.org/address/0x4cd00e387622c35bddb9b4c962c136462338bc31). That address is the Relay bridge's RelayDepository; the same contract is verified under that name on Ethereum. This accounts for part of the 700.8 ETH PeckShield saw bridged. The rest went by a path not traced here, possibly from other attacker addresses.

- **New:** the full addresses of the orchestrator, extraction contract and THEO/USDC pair (previously shortened), and that the attacker address `0x3048…` signed the dump tx, so it held the unbacked THEO.
- **New:** in that one tx 9,501,032.6 THEO went attacker, orchestrator, extraction contract. The contract sold all of it in 9 swaps to the pair for 476,898.7 USDC (matches the ~\$476K in the timeline), then swapped the USDC through other pools into 189.44 WETH. The USDC and cbBTC legs net to zero; 189.44 WETH is left in the extraction contract and nothing leaves it inside the tx. The ~\$700K figure in the sources fits this 189.44 WETH only loosely; it was not reconciled.
- **Caveat:** `0x8f10…` is not a one-off attacker contract. In a one-hour window on Base it moved USDC/WETH for about 1,700 other transactions, so its later outflows cannot be attributed to the attacker. WETH leaving it after 17:16 (public-RPC logs, 2026-10-12 to 10-13) goes to many unrelated addresses. No transfer could be tied to the 700.8 ETH bridge, so that step stays relayed.
- **Limit:** the bridge, the Ethereum receiving address and the other 9.5M THEO of the 19M mint are not accounted for. The mint tx hash is published only as `0x4fdbbc5e…`, so it could not be looked up. Native ETH (unwrapped WETH) is invisible over public RPC, which is probably where the bridge hop hides.
- **Limit:** THEO is `trusted: false` in the tool (not allowlisted); it is the stolen token itself, not a counterfeit. Only this one transaction was checked, not the whole "multi-tx campaign".
- **Limit:** the amounts are asset quantities only. USD figures (~\$1.76M, ~\$1.7M) are the sources' own.

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
