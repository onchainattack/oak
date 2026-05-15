# Jolan Lacroix — $900K Presale Theft / Gambling on Meme Coins and Milady NFTs — 2024-03

**Loss:** $900K stolen from the TICKER presale on Base by French developer Jolan Lacroix. Stolen funds spent on meme coins and Milady NFTs.
**OAK Techniques observed:** OAK-T2 (Token/Investment Fraud) — presale fundraiser where the developer absconds with raised funds instead of deploying the protocol.
**Attribution:** **Identified** — Jolan Lacroix, French developer. ZachXBT investigation published March 2024.

**Key teaching point:** The Jolan Lacroix case demonstrates the **presale exit** pattern: a developer raises funds through a token presale (investors send ETH/USDC to a presale address expecting token distribution), then absconds with the funds and spends them on speculative assets (meme coins, NFTs) rather than deploying the protocol. The presale address is the detection surface — presale funds should remain in the presale wallet until the token generation event; any movement of presale funds before TGE is an exit signal. Detection approach: monitor presale addresses for outgoing transactions before the announced TGE date; if presale funds move before the protocol launches, the presale is an exit scam in progress.

## Summary

In March 2024, French developer Jolan Lacroix raised $900K through the TICKER token presale on Base. Instead of deploying the protocol and distributing tokens, Lacroix absconded with the funds.

The stolen $900K was spent on:

- Meme coins (speculative trading)
- Milady NFTs (high-value NFT collection)

The spending pattern (gambling on meme coins, buying luxury-status NFTs) is inconsistent with a developer deploying a protocol — it's consistent with personal enrichment. The funds were not used for development, liquidity provision, or token distribution.

ZachXBT published an investigation identifying Lacroix and tracing the stolen funds.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| Pre-Mar 2024 | TICKER presale raises $900K on Base | **T2 presale fundraising** |
| 2024-03 | Lacroix absconds with $900K. Funds spent on meme coins and Milady NFTs | **T2 presale exit** |
| 2024-03-21 | ZachXBT publishes investigation identifying Jolan Lacroix | (public disclosure) |

## What defenders observed

- **Presale funds moved before TGE = exit scam.** The presale funds should have remained in the presale address until the token generation event. Lacroix moved them before TGE — the simplest possible exit signal.
- **Funds spent on speculative assets, not development.** The $900K was spent on meme coin trading and NFT purchases, not on protocol development, audits, liquidity, or token distribution. The spending destination is the confirmation that this was theft, not a failed project.
- **Named developer = attribution from the start.** Unlike anonymous rug pulls, Lacroix used his real name. This made attribution immediate — there was no pseudonymous layer to unravel.

## What this example tells contributors

- **Presale address fund movement before TGE is a low-false-positive exit signal.** Presale funds have one legitimate destination: the token generation event. Any movement of presale funds to any other address before TGE is, by definition, an exit in progress. OAK T2 detection specs should include "presale fund movement before TGE" as a detection rule.
- **Post-exit spending destination is an intent indicator.** Funds spent on meme coins and NFTs = personal enrichment. Funds moved to a mixer = attempted laundering. The spending destination confirms the criminal intent.
- **Named developers can still exit scam.** Using a real name is not a guarantee of honesty — it removes the attribution barrier but not the theft barrier. KYC on presale developers is a deterrent, not a prevention.

## Public references

- [ZachXBT — Jolan Lacroix TICKER Presale Theft (X/Twitter)](https://x.com/zachxbt/status/1770821182838763998)
- Jolan Lacroix: French developer. TICKER presale on Base.
- $900K stolen. Spent on meme coins and Milady NFTs.
