# Autheo THEO — the warp-route token accepted any message its single trusted relayer delivered, and 19M THEO arrived with nothing locked on the origin — Autheo / Base (Hyperlane warp route) — 2026-10-12

**Loss:** **~700.8 ETH (~\$1.76M)** extracted by selling unbacked THEO for WETH, USDC and cbBTC and bridging to Ethereum (PeckShield; Defimon ~\$1.7M). THEO fell ~92%.

**OAK Techniques observed:** **OAK-T10.002** (Message-Verification Bypass — *primary*. Per Defimon, THEO is a Hyperlane HypERC20 whose security module is a **TrustedRelayerIsm**: one relayer key authorises any inbound message. A message from origin domain 2127 minted **19,000,000 THEO** from the zero address with no lock or burn on the origin; 9.5M were then run through a 54-swap extraction across the THEO/USDC pair and Uniswap v4 / Hydrex pools. See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md)). Whether the attacker held the trusted relayer key or the module trusted an address the attacker controlled is not disclosed.

**Attribution:** **pseudonymous** (`0x3048…e0ad`).

**Key teaching point:** **A single trusted relayer is a single key with mint rights.** The warp route's verification was as strong as one relayer's key management, which is not message verification.

## Summary

Defimon dated the mint to 2026-10-12 and PeckShield reported the cash-out on 2026-10-13. Autheo told users not to buy, sell or bridge THEO while it investigated.

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
