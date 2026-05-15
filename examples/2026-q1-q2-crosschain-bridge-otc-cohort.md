# Q1–Q2 2026 Cross-Chain, Bridge and OTC Exploit Cohort — CrossCurve, Purrlend, Transit Finance, Meteora DAMM V2 — Aggregate ~$7.8M

**OAK Techniques observed:** OAK-T10.002, OAK-T9.004

**Attribution:** **unattributed** (aggregate cohort).
**Loss:** CrossCurve ~$3M (spoofed cross-chain messages — attacker forged cross-chain message payloads to trigger unauthorised transfers); Purrlend ~$1.5M (fake bridge address — attacker deployed a counterfeit bridge contract and routed deposits to it, on MegaETH and Hyperliquid L1); Transit Finance ~$1.88M (deprecated smart-contract exploit on Tron — attacker exploited a contract that was still deployed and holding value but no longer maintained); Meteora DAMM V2 ~$1.5M (fake OTC deal on Solana — attacker structured a fraudulent over-the-counter transaction that the protocol's DAMM V2 infrastructure processed as legitimate). Aggregate ~$7.8M across four incidents, January–May 2026.

**Key teaching point:** Four cross-chain, bridge, and OTC incidents demonstrate that **the trust boundary between chains, between contract versions, and between counterparties is only as strong as the validation logic at the entry point.** CrossCurve's cross-chain message verification trusted spoofed payloads; Purrlend's bridge-address resolution trusted an unvalidated address; Transit Finance's deprecated contract held value without active maintenance; Meteora's OTC infrastructure trusted a counterparty representation without verifying the counterparty's intent or assets. The structural thread is **a trust assumption at the boundary that the protocol did not independently verify.**

## Summary

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2026-01-17 | Meteora DAMM V2: fake OTC deal on Solana; attacker presents a fraudulent OTC transaction to the DAMM V2 infrastructure; protocol processes it as legitimate; ~$1.5M extracted | **T14.001** (fake OTC deal), **T9.004** (missing counterparty verification) |
| 2026-02-01 | CrossCurve: spoofed cross-chain messages enable unauthorised transfers; attacker forges cross-chain message payloads; protocol's message-verification logic accepts the forged payloads; ~$3M extracted | **T10.002** (cross-chain message spoofing), **T9.004** (missing message-origin verification) |
| 2026-04-25 | Purrlend: fake bridge address deployed on MegaETH and Hyperliquid L1; users deposit to the counterfeit bridge; ~$1.5M lost | **T9.004** (fake bridge address — missing address-verification UX), **T10.002** (bridge-address spoofing) |
| 2026-05-13 | Transit Finance: deprecated smart contract exploited on Tron; ~$1.88M extracted from a contract that was still deployed and holding value but had been abandoned by the development team | **T9.004** (deprecated-contract access-control gap — no active maintenance, no decommissioning) |

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

## Public references

- CrossCurve: DeFiLlama classification as "Spoofed Cross-Chain Messages"
- Purrlend: DeFiLlama classification as "Fake Bridge Address" on MegaETH, Hyperliquid L1
- Transit Finance: DeFiLlama classification as "Deprecated Smart Contract Exploit" on Tron
- Meteora DAMM V2: DeFiLlama classification as "Fake OTC Deal" on Solana
- Cross-reference: T10.002 at `techniques/T10.002-cross-chain-message-spoofing.md`; T9.004 at `techniques/T9.004-access-control-misconfiguration.md`; T14.001 at `techniques/T14.001-otc-desk-scam-fake-otc-deal.md`

## Discussion

The Q1–Q2 2026 cross-chain, bridge, and OTC cohort maps the **trust-boundary surface** — the set of protocol entry points where a value-transfer decision depends on information from outside the protocol's own chain, and where that information can be forged, spoofed, or misrepresented.

**CrossCurve and Purrlend** are mirror images of the same structural failure: CrossCurve trusted a cross-chain message without verifying its origin; Purrlend's users trusted a bridge address without verifying its authenticity. In both cases, the exploit succeeded because **the verification burden fell on the wrong party** — CrossCurve's receiving contract should have verified the message origin (but didn't), and Purrlend's bridge-address resolution should have been cryptographically bound to the protocol's canonical deployment (but wasn't).

**Transit Finance** highlights an underappreciated DeFi lifecycle problem: **contract decommissioning is a security operation.** A protocol that deploys a new contract version and migrates users has not "replaced" the old contract — it has orphaned it. The old contract still holds assets, still processes transactions, and still presents an exploit surface. Decommissioning — revoking approvals, draining residual value, self-destructing or pausing the contract — is a required step in the contract-upgrade lifecycle, and Transit Finance's failure to perform it cost $1.88M.

**Meteora DAMM V2** is the cohort's most forward-looking incident: as DeFi OTC infrastructure matures, the **counterparty-verification gap** between on-chain asset verification and off-chain deal representation will become an increasingly attractive exploit surface. The protocol's DAMM V2 infrastructure could verify that the attacker owned the assets they were transferring but could not verify that the OTC deal itself was economically legitimate — that gap is not closeable with smart-contract logic alone and will require off-chain reputation, identity, and deal-attestation infrastructure that does not exist at scale at v0.1.
