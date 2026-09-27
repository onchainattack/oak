# Limit Break Payment Processor V2 — a marketplace stopped using the contract in 2024, the approvals users gave it did not stop — Limit Break Payment Processor V2 / Ethereum — 2026-09-25

**Loss:** **~305 NFTs** taken at zero price in the initial drain (10 Meebits, 50 Otherdeeds, 10 WoW, 235 Desperate ApeWives; ~\$1.7M per Blockaid's early count) and **~660 WETH** that could not be rescued in time. A white-hat operation led by Yuga Labs' **0xQuit** with Limit Break moved **23,155 NFTs (~\$5.7M)** to a rescue address (`0x71cF3f5724bD2B72Ef6464992aCd26216DE7fe33`) for later return; Revoke.cash's tracker counts 3,832.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary, class inferred, root cause undisclosed*. Blockaid reports the attacker used Payment Processor V2 (`0x9A1D00bEd7CD04BCDA516d721A596eb22Aac6834`) to **impersonate holders who had approved it as an NFT operator** and fill `AcceptOfferERC721` sales at **price zero**; the contract spent standing operator approvals without deriving authority from the holder. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). This is the shape of the forward candidate **T9.004.001** (Standing-authorisation residue in periphery contracts) and would be its fourth anchor, but **Limit Break has not disclosed the flaw** and Revoke.cash states the precise vulnerability is unpublished — so it is recorded as a fit, not as an anchor. **OAK-T11.013** (Legacy-Version Maintenance Attack Surface — *contextual*: Magic Eden **stopped routing through V2 in October 2024** and shut its EVM marketplace in Q1 2026; the contract remained unpaused on Ethereum while V3 on ApeChain was paused).

**Explicitly not OAK-T4.005** (setApprovalForAll NFT drainer): the approvals were granted to a legitimate contract for legitimate use; nobody was phished.

**Attribution:** **pseudonymous.**

**Key teaching point:** **An approval outlives the reason it was given.** Users approved V2 to trade on Magic Eden; Magic Eden left V2 two years ago; the approvals stayed live, and so did the contract. A deprecated contract holding standing operator approvals is not retired until it is paused or its approvals are revoked — and the holders are the only ones who can revoke. Protocol-side, **deprecation must include a pause**; wallet-side, **approvals to contracts that have seen no use in months should be surfaced for revocation**.

## Summary

On 2026-09-25 an attacker used Limit Break's Payment Processor V2 on Ethereum — a contract Magic Eden had stopped routing through in 2024 but which still held users' operator approvals — to fill NFT sales at price zero on holders' behalf. About 305 NFTs went in the first transactions. A white-hat rescue by 0xQuit and Limit Break moved 23,155 NFTs to safety; ~660 WETH exposed through the same flaw could not be saved.

## Timeline (2026-09-25 unless noted; reported hours are inconsistent across sources and are kept only where stated)

| When | Event | OAK ref |
|---|---|---|
| 2024-10 | Magic Eden stops using PP V2; approvals remain | (latent T11.013) |
| 09:00 ET (per reporting) | Initial drain: ~305 NFTs via zero-price `AcceptOfferERC721` | **T9.004** |
| ~12h later | 0xQuit / Limit Break begin white-hat rescue; 660 WETH found exposed and lost | (response) |
| — | Rescue transactions (e.g. block 26,052,469) move 23,155 NFTs to rescue address | (rescue) |
| following | Blockaid advises revoking PP V2 operator approvals; Magic Eden statement | (response) |

## Public references

- `[cryptotimeslimitbreak2026]` — The Crypto Times, "Limit Break NFT Exploit: Yuga Labs' Quit Rescues 23,155 NFTs, Says 660 WETH Lost" (2026-09-25): <https://www.cryptotimes.io/2026/09/25/limit-break-nft-exploit-yuga-labs-quit-rescues-23155-nfts-says-660-weth-lost/>
- `[techflowlimitbreak2026]` — TechFlow, "Blockaid: Limit Break Faces Sustained Attacks, Approximately \$1.7 Million in NFTs Stolen": <https://www.techflowpost.com/en-US/newsletter/137765>
- `[cryptotickerlimitbreak2026]` — CryptoTicker, "Magic Eden and Limit Break exploit: WETH and NFTs drained": <https://cryptoticker.io/en/magic-eden-limit-break-exploit-weth-nfts-revoke-approvals/>

Revision trigger: Limit Break's disclosure of the flaw — if it confirms missing holder-authority derivation, promote to a T9.004.001 anchor.
