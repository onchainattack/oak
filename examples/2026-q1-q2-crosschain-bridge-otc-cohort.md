# Q1–Q2 2026 Cross-Chain, Bridge and OTC Exploit Cohort — CrossCurve, Purrlend, Transit Finance, Meteora DAMM V2, TAC Protocol, Alephium — Aggregate ~$11.4M

**OAK Techniques observed:** OAK-T10.002, OAK-T9.004

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** CrossCurve ~$3M (spoofed cross-chain messages — attacker forged cross-chain message payloads to trigger unauthorised transfers); Purrlend ~$1.5M (fake bridge address — attacker deployed a counterfeit bridge contract and routed deposits to it, on MegaETH and Hyperliquid L1); Transit Finance ~$1.88M (deprecated smart-contract exploit on Tron — attacker exploited a contract that was still deployed and holding value but no longer maintained); Meteora DAMM V2 ~$1.5M (fake OTC deal on Solana — attacker structured a fraudulent over-the-counter transaction that the protocol's DAMM V2 infrastructure processed as legitimate); TAC Protocol ~$2.8M (TON ⇄ Ethereum bridge exploit on the TON side — drained native TON Jettons across USDT, BLUM, and tsTON; later reclassified a white-hat incident after the attacker accepted a 10% bounty and returned the remainder); Alephium TokenBridge ~$815K (forged bridge messages passed the guardian network — initially blamed on compromised guardian keys, later traced by Alephium/Blockaid to an off-chain backend vulnerability; ~13.76M unbacked wrapped ALPH minted on Ethereum plus multi-asset drain, all in ~7 minutes). Aggregate ~$11.4M across six incidents, January–May 2026.

**Key teaching point:** Four cross-chain, bridge, and OTC incidents demonstrate that **the trust boundary between chains, between contract versions, and between counterparties is only as strong as the validation logic at the entry point.** CrossCurve's cross-chain message verification trusted spoofed payloads; Purrlend's bridge-address resolution trusted an unvalidated address; Transit Finance's deprecated contract held value without active maintenance; Meteora's OTC infrastructure trusted a counterparty representation without verifying the counterparty's intent or assets. The structural thread is **a trust assumption at the boundary that the protocol did not independently verify.**

## Summary

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2026-01-17 | Meteora DAMM V2: fake OTC deal on Solana; attacker presents a fraudulent OTC transaction to the DAMM V2 infrastructure; protocol processes it as legitimate; ~$1.5M extracted | **T14.001** (fake OTC deal), **T9.004** (missing counterparty verification) |
| 2026-02-01 | CrossCurve: spoofed cross-chain messages enable unauthorised transfers; attacker forges cross-chain message payloads; protocol's message-verification logic accepts the forged payloads; ~$3M extracted | **T10.002** (cross-chain message spoofing), **T9.004** (missing message-origin verification) |
| 2026-04-25 | Purrlend: fake bridge address deployed on MegaETH and Hyperliquid L1; users deposit to the counterfeit bridge; ~$1.5M lost | **T9.004** (fake bridge address — missing address-verification UX), **T10.002** (bridge-address spoofing) |
| 2026-05-12 | TAC Protocol: TON ⇄ Ethereum bridge exploited on the TON side; ~$2.8M of native TON Jettons (USDT, BLUM, tsTON) drained — roughly the protocol's entire TVL; attacker later accepted a 10% bounty and returned ~90%, and TAC reclassified the event a white-hat incident | **T10.002** (bridge message/verification gap on the TON side), **T6** (negotiated white-hat resolution / bounty recovery) |
| 2026-05-13 | Transit Finance: deprecated smart contract exploited on Tron; ~$1.88M extracted from a contract that was still deployed and holding value but had been abandoned by the development team | **T9.004** (deprecated-contract access-control gap — no active maintenance, no decommissioning) |
| 2026-05-30 | Alephium TokenBridge: forged bridge messages pass the guardian network; ~$815K drained on Ethereum + BNB Chain (200,967 USDT, 17,594 USDC, 5.18 WETH, 0.335 WBTC on ETH; 36,750 USDT, 24.386 WBNB on BSC) plus ~13.76M unbacked wrapped ALPH minted on Ethereum; entire sequence ~7 minutes. Initial reports blamed compromised guardian keys; Alephium and Blockaid later revised to an off-chain backend vulnerability triggerable in edge cases, not a key compromise. ALPH locked in the bridge itself was not drained | **T10.002** (forged-message verification bypass via off-chain backend flaw — explicitly NOT a key compromise) |

## CrossCurve — Cross-Chain Message Spoofing

On February 1, 2026, CrossCurve was exploited for ~$3M via spoofed cross-chain messages. The attacker forged cross-chain message payloads that the protocol's message-verification logic accepted as authentic. The root cause was a **missing or bypassable message-origin verification check**: the protocol trusted the message content without verifying that the message originated from the authorised source chain, relayer, or oracle.

Cross-chain message spoofing (T10.002) is a distinct exploit class from single-chain access-control failures: the attacker does not exploit a missing modifier on a contract function but rather **forges the cross-chain message that authorises the function call**. The receiving chain's contract correctly executes the authorised function — but the authorisation itself (the cross-chain message) is counterfeit.

**OAK mapping:** T10.002 (cross-chain message spoofing) + T9.004 (missing message-origin verification on the receiving chain).

## Purrlend — Fake Bridge Address

On April 25, 2026, Purrlend on MegaETH and Hyperliquid L1 was exploited for ~$1.5M via a fake bridge address. The attacker deployed a counterfeit bridge contract at an address that users were induced to trust as the legitimate Purrlend bridge. Users who deposited funds to the fake bridge address lost their assets to the attacker.

The incident is a bridge-specific variant of the fake-frontend pattern: instead of deploying a fake DEX frontend (T3.005), the attacker deploys a fake bridge contract at an address that appears legitimate in the context of the protocol's multi-chain deployment. The defender gap is at the **address-verification UX layer**: users have no automated way to verify that a bridge contract address on a target chain is the canonical Purrlend bridge, particularly on newer chains (MegaETH, Hyperliquid L1) where block-explorer and community-verification infrastructure is less mature.

**OAK mapping:** T9.004 (fake bridge address — missing address-verification mechanism) + T10.002 (bridge-address spoofing across chains).

## Transit Finance — Deprecated Smart Contract Exploit

On May 13, 2026, Transit Finance on Tron was exploited for ~$1.88M via a deprecated smart contract. The contract — still deployed, still holding value, but no longer maintained by the development team — contained an access-control gap that had been discovered or had emerged after the contract was abandoned. With no active maintenance, no monitoring, and no decommissioning plan, the deprecated contract sat as an orphaned value store until an attacker exploited it.

The incident is the canonical 2026 case of the **deprecated-contract anti-pattern**: a protocol deploys a new contract version, migrates active users and liquidity, but leaves the old contract deployed with residual value, standing approvals, or unrevoked permissions. The old contract receives no security updates, no monitoring, and no maintenance — but it still holds assets and can still execute `transfer` calls.

**OAK mapping:** T9.004 (deprecated-contract access-control gap — abandoned contract with residual value, no decommissioning).

## Meteora DAMM V2 — Fake OTC Deal

On January 17, 2026, Meteora DAMM V2 on Solana was exploited for ~$1.5M via a fake OTC (over-the-counter) deal. The attacker structured a fraudulent OTC transaction — presenting a counterparty, terms, or asset representation that the DAMM V2 infrastructure did not independently verify — and the protocol processed the fabricated deal as legitimate.

The incident is one of the earliest significant OTC-infrastructure exploits and illustrates the **counterparty-verification gap in DeFi OTC systems**: the protocol's smart contracts can verify on-chain asset ownership and transfer authorisation but cannot verify the off-chain representations (identity, intent, asset provenance) that make an OTC deal economically legitimate. The attacker exploited the gap between what the smart contracts could verify (on-chain) and what the deal purported to represent (off-chain).

**OAK mapping:** T9.004 (missing counterparty-verification logic in OTC infrastructure — the protocol's smart contracts could verify on-chain asset ownership but could not verify off-chain deal representations).

## TAC Protocol — TON ⇄ Ethereum Bridge Exploit, White-Hat Resolution

On May 12, 2026, TAC Protocol — a cross-chain bridge connecting TON and Ethereum — was exploited for ~$2.8M. The drain hit the **TON side** of TAC's cross-chain layer, extracting native TON Jettons across USDT, BLUM, and tsTON. TAC stated the vulnerability was isolated to native TON Jettons bridged from the TON network; the TAC token itself, native TON, and all ERC-20 tokens were unaffected. With TVL at roughly $2.74M as of May 14, the ~$2.8M extraction was approximately the protocol's entire TVL.

The incident's distinguishing feature is its **resolution path**: the attacker accepted TAC's offer to keep 10% of the funds as a bounty and returned ~90%, after which TAC reclassified the event a white-hat incident. This is the negotiated-recovery pattern that has become standard practice in Web3 — a protocol offers the attacker a percentage to convert an adversarial drain into a bounty rather than pursue uncertain on-chain recovery or attribution. The pattern is worth recording as a cohort data point because the on-chain footprint of a "white-hat" resolution (drain → negotiation messages → partial return) is indistinguishable at the transaction layer from a failed laundering attempt; the reclassification is an off-chain agreement, not an on-chain property.

**OAK mapping:** T10.002 (bridge message/verification gap on the TON side of the cross-chain layer) + T6 (defense-evasion-adjacent: the negotiated white-hat resolution converts an adversarial extraction into a bounty, complicating attribution and loss accounting).

## Alephium TokenBridge — Forged Guardian Messages via Off-Chain Backend Flaw

On May 30, 2026, Alephium's **TokenBridge** was drained of ~$815K after an attacker submitted **forged bridge messages** that passed the protocol's guardian network and authorised fraudulent transfers. The attacker drained 200,967 USDT, 17,594 USDC, 5.18 WETH and 0.335 WBTC on Ethereum, plus 36,750 USDT and 24.386 WBNB on BNB Chain, and **minted ~13.76M unbacked wrapped ALPH** on Ethereum with no corresponding ALPH locked on the Alephium chain. Blockaid, which spotted the exploit first, timed the full sequence at about **seven minutes**. The native ALPH held inside the bridge was not drained, so users whose ALPH remained locked at shutdown were recoverable.

The instructive feature of Alephium is the **root-cause revision**. Initial reporting — including from Blockaid — attributed the drain to **compromised guardian private keys**. Alephium and Blockaid subsequently corrected this: the exploit "does not appear to have involved a compromise of guardian private keys," and the root cause was instead an **off-chain vulnerability in the bridge backend** that could be triggered in specific edge cases to produce guardian-signed messages the guardians never intended. This places Alephium firmly in the T10.002 message-verification family rather than the T10.001 key-compromise family — a distinction that is easy to get wrong in the first hours of an incident, because "forged messages passed the guardian network" reads as "keys were stolen" until the backend flaw is isolated.

Alephium therefore pairs instructively with the two standalone May-2026 bridge cases: like Verus (`examples/2026-05-verus-ethereum-bridge-source-amount-validation.md`) and Butter (`examples/2026-05-map-protocol-butter-bridge-encodepacked-collision.md`), the attacker minted/withdrew against messages that *should not have validated*, without holding signer keys. The common defender lesson across all three is that a bridge's **off-chain message-construction backend is part of its trust-validation surface** — a backend that can be coaxed into producing a validly-signed-but-illegitimate message is as dangerous as a missing on-chain check, and the on-chain signatures will look perfectly genuine.

**OAK mapping:** T10.002 (message-verification bypass via an off-chain bridge-backend flaw that produced forged-but-validly-relayed guardian messages — explicitly not a guardian-key compromise, per the revised Alephium/Blockaid analysis).

## Public references

- CrossCurve: DeFiLlama classification as "Spoofed Cross-Chain Messages"
- Purrlend: DeFiLlama classification as "Fake Bridge Address" on MegaETH, Hyperliquid L1
- Transit Finance: DeFiLlama classification as "Deprecated Smart Contract Exploit" on Tron
- Meteora DAMM V2: DeFiLlama classification as "Fake OTC Deal" on Solana
- TAC Protocol: "TAC labels $2.8M bridge exploit a white hat incident as hacker claims 10% bounty" (PeckShield-tracked; TON ⇄ Ethereum bridge, TON-side native Jettons USDT/BLUM/tsTON)
- [Alephium — The Defiant](https://thedefiant.io/news/hacks/alephium-bridge-815k-forged-guardian-messages) — "Alephium Bridge Loses $815K to Forged Guardian Messages, Not Stolen Keys"
- [Alephium — AMBCrypto](https://ambcrypto.com/815k-gone-in-7-minutes-inside-ethereums-alephium-tokenbridge-exploit/) — "$815K gone in 7 minutes – Inside Ethereum's Alephium TokenBridge exploit"
- [Alephium — Crypto Times](https://www.cryptotimes.io/2026/05/30/alephium-bridge-exploited-for-815k-13-76m-unbacked-alph-minted/) — "Alephium Bridge Exploited for $815K, 13.76M Unbacked ALPH Minted" (asset breakdown; off-chain backend root cause; ~7-minute sequence)
- Cross-reference: T10.002 at `techniques/T10.002-cross-chain-message-spoofing.md`; T9.004 at `techniques/T9.004-access-control-misconfiguration.md`; T14.001 at `techniques/T14.001-otc-desk-scam-fake-otc-deal.md`

## Discussion

The Q1–Q2 2026 cross-chain, bridge, and OTC cohort maps the **trust-boundary surface** — the set of protocol entry points where a value-transfer decision depends on information from outside the protocol's own chain, and where that information can be forged, spoofed, or misrepresented.

**CrossCurve and Purrlend** are mirror images of the same structural failure: CrossCurve trusted a cross-chain message without verifying its origin; Purrlend's users trusted a bridge address without verifying its authenticity. In both cases, the exploit succeeded because **the verification burden fell on the wrong party** — CrossCurve's receiving contract should have verified the message origin (but didn't), and Purrlend's bridge-address resolution should have been cryptographically bound to the protocol's canonical deployment (but wasn't).

**Transit Finance** highlights an underappreciated DeFi lifecycle problem: **contract decommissioning is a security operation.** A protocol that deploys a new contract version and migrates users has not "replaced" the old contract — it has orphaned it. The old contract still holds assets, still processes transactions, and still presents an exploit surface. Decommissioning — revoking approvals, draining residual value, self-destructing or pausing the contract — is a required step in the contract-upgrade lifecycle, and Transit Finance's failure to perform it cost $1.88M.

**Meteora DAMM V2** is the cohort's most forward-looking incident: as DeFi OTC infrastructure matures, the **counterparty-verification gap** between on-chain asset verification and off-chain deal representation will become an increasingly attractive exploit surface. The protocol's DAMM V2 infrastructure could verify that the attacker owned the assets they were transferring but could not verify that the OTC deal itself was economically legitimate — that gap is not closeable with smart-contract logic alone and will require off-chain reputation, identity, and deal-attestation infrastructure that does not exist at scale at v0.1.
