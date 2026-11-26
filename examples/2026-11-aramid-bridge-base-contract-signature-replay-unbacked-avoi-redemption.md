# Aramid Bridge — Base bridge contract accepted the same signed claim many times, so unbacked aVOI was redeemed for real ALGO, VOI and USDC — Aramid Bridge / Base, Algorand, Voi — 2026-11-21

**Loss:** **~\$8.5K taken directly** (~58.8K ALGO and \$4.2K USDC, "primarily from selling unbacked aVOI on Base Uniswap", per the operator, Aramid Bridge). Separately, **~125M native VOI left the Voi escrow** before the halt: ~91.6M sold on HumbleSwap and ~30.2M "sitting unsold on Voi" (operator); the operator does not put a dollar value on it. Voi Network's report counts ~70K ALGO drained from Aramid on Algorand and "about 125M real VOI"; the two sources round differently and OAK did not reconcile them. On 2026-11-24 the operator said it is "reviewing two recovery options together with the Voi ecosystem and community to make sure all affected users are made whole"; no final plan was published as of that post.

**OAK Techniques observed:** **OAK-T10.003** (Cross-Chain Replay — *primary*, operator-stated: "signature-replay bug". One withdrawal signed once was claimed 5–18 times on Base; the contract did not bind the signed claim to a spent marker the attacker could not vary. See [`techniques/T10.003-cross-chain-replay.md`](../techniques/T10.003-cross-chain-replay.md)). The fit is by mechanism, not by name: T10.003's text is about replay across chains or bridge instances, whereas here the replay was against the same Base contract. The control that would have stopped it is the same one (a nonce or spent marker that covers every byte of the claim). OAK has no Technique for "signature checked over part of the claim, duplicate check over all of it"; Voi Network offers that only as a "likely cause, not yet confirmed" (see [`TAXONOMY-GAPS.md`](../TAXONOMY-GAPS.md), T10.008 candidate).

**Attribution:** **unattributed** (Voi Network publishes shortened attacker addresses only, listed below; the operator names no party and on 2026-11-24 asked "the party behind the Nov 21 exploit" to return the funds within 48 hours).

**Key teaching point:** **A bridge contract must mark a claim as spent using the same bytes the validators signed, so that re-encoding the unsigned trailing data cannot create a "new" claim.** Voi Network observed repeated claims with "the same source txid and the same two validator signatures. Only the encoding of the trailing data differs." That detail is Voi's reading and the operator's post-mortem is still pending, but either way the control is the same: one signed message, one release.

## Summary

On 2026-11-21 an attacker made small test transfers through the Aramid bridge, then deposited ALGO and aVOI on the Algorand side and claimed each transfer many times on the Base bridge contract. The operator says "our Base bridge contract was exploited via a signature-replay bug" and that "no private keys, multisig, or signer infrastructure were compromised". Replayed claims released locked aVOI on Base (and aALGO), which the attacker redeemed on Algorand and Voi for real ALGO, VOI and a few thousand USDC, and sold into Uniswap on Base and into Algorand and Voi pools. Voi Network posted a report at 2026-11-22 06:21 UTC and the operator posted its incident thread at 2026-11-22 17:08 UTC. A full technical post-mortem has been promised and was not found.

## Timeline (UTC)

Stages: **Flaw** (Base bridge contract accepts replays) → **Preparation** (small probes) → **Take** (replayed claims, minting-equivalent release of aVOI) → **Money** (redemption and sale) → **Response**. Times below are as stated in Voi Network's report, which writes clock times with "PM" and does not state a time zone; the only explicit UTC time in the sources is the operator's 21:06 UTC cutoff. OAK did not convert them. Because no complete Base address or transaction hash is published, OAK could not check any hop on-chain (see Fund flow).

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-21 (undisclosed) | The Aramid Base bridge contract (`0xc7faa8...c263`, full address not published) accepts a signed claim more than once. Whether this existed from deployment or a later change is undisclosed. The operator says a contract fix "is done and our auditors are verifying it". | **T10.003** |
| 2026-11-21 12:22 to 2:04 PM | "Small probes with USDC (to Arbitrum), cbBTC and 1 ALGO" (Voi Network). | — |
| 2026-11-21 2:12 to 3:12 PM | 13,154 ALGO deposited on Algorand came back as 71,907 aALGO on Base. Bridged back, "that drained about 70K real ALGO from Aramid on Algorand, leaving 154 ALGO" (Voi Network). | **T10.003** |
| 2026-11-21 4:00 PM | First aVOI deposit of 146,858 aVOI, "paid out 16 times on Base" (Voi Network). | **T10.003** |
| 2026-11-21 4:05 to 6:15 PM | "1.73B aVOI deposited became 27.1B aVOI released on Base, with rounds growing to 818M" (Voi Network). Each Algorand-to-Base transfer was sent once and claimed 5–18 times. | **T10.003** |
| 2026-11-21 5:10 to 5:11 PM | Dumps into the Uniswap aVOI/USDC pool on Base: 50M aVOI for \$2,292, then 500M aVOI for \$1,144; the price crashed (Voi Network). | — |
| 2026-11-21 5:35 to 6:02 PM | The Aramid bridge account on Voi (`ARAMI`, shortened by the source) released about 125M VOI. Voi Network: "valid multisig-signed bridge releases against aVOI that was no longer backed". The operator: ~91.6M sold on HumbleSwap, ~30.2M unsold on Voi. | — |
| 2026-11-21 5:44 to 5:46 PM | 460M aVOI dumped into Algorand pools; Tinyman TVL fell to \$157 (Voi Network). | — |
| 2026-11-21 6:34 to 6:36 PM | Aramid rekeys the bridge accounts on Algorand and Voi with the note "rekeyed by aramid"; "the replays stopped" (Voi Network). The operator: "Bridging is paused and both the Algorand and Voi escrows have been rekeyed." | response |
| 2026-11-21 6:56 to 7:07 PM | The attacker tried other tokens; the transfers "show as Pending" (Voi Network). | — |
| 2026-11-21 7:22 PM | The attacker moved about \$4.1K USDC out on Base to an unidentified contract `0xa5c1ce36...` (Voi Network; full address not published). | — |
| 2026-11-21 21:06 UTC | Operator's snapshot cutoff: it will "remove [Base aVOI] from the bridge and refund anyone who held it before 21:06 UTC Nov 21" and tells users not to trade Base aVOI (address given only in shortened form, full address not published). | response |
| 2026-11-22 06:21 UTC | Voi Network publishes its exploit report. | response |
| 2026-11-22 17:08 UTC | The operator posts its incident thread: bridge paused, escrows rekeyed, fix done and being verified by auditors, bridge to reopen after the EVM contracts are upgraded and unbacked aVOI cleaned up; a full post-mortem "will follow". | response |
| 2026-11-24 08:35 UTC | The operator says two recovery options are under review "to make sure all affected users are made whole", and gives the attacker 48 hours to return the funds, after which it proceeds "with law enforcement and tracing partners". | response |

Key addresses (every one is shortened by its source; full addresses not published, so none is linked):

- Attacker on Base — `0x99Ed4B...1Ba4` (Voi Network) (full address not published)
- Second Base wallet, which bought crashed aVOI from 5:12 PM — `0x6a172c...2be93` (Voi Network) (full address not published)
- Base USDC destination — `0xa5c1ce36...` (Voi Network) (full address not published)
- Attacker on Algorand — `LCP2Q...` (Voi Network)
- Aramid Base bridge contract — `0xc7faa8...c263` (Voi Network) (full address not published)
- aVOI on Base — `0xb40C77...22f9` (Voi Network); the operator also gives only a shortened form (full address not published)
- Aramid bridge account on Voi — `ARAMI...` (Voi Network)
- Redeemer accounts on Algorand and Voi — `TP33C...` (91.64M VOI), `UC3I6...` (22.09M, now Offline), `KXMDJ...` (9.99M, Offline), `H3A7G...`; smaller: `DLSTY...` 999K, `DH34M...` 110.9K, `SJGKM...` 99.9K (Voi Network)
- voi-arb bot contract — `EMP7B...` (absorbed about 76M VOI, per Voi Network)

## Fund flow

No complete address or transaction hash is published by either source, so OAK could not verify any hop and the edges below relay Voi Network (`verified: source`). Amounts are Voi Network's.

```oak-flow
as_of: 2026-11-26T00:00Z
nodes:
  - {id: brg, chain: base, role: vulnerable-contract, label: "Aramid Base bridge contract (0xc7faa8...c263; full address not published)"}
  - {id: atk, chain: base, role: attacker-eoa, label: "Attacker on Base (0x99Ed4B...1Ba4; full address not published)"}
  - {id: uni, chain: base, role: dex, label: "Uniswap aVOI/USDC pool on Base"}
  - {id: usdcdst, chain: base, role: unknown, label: "USDC destination contract (0xa5c1ce36...; full address not published)"}
  - {id: voiesc, chain: voi, role: victim, label: "Aramid bridge account on Voi (ARAMI)"}
  - {id: redeem, chain: voi, role: attacker-receiver, label: "Redeemer accounts (TP33C, UC3I6, KXMDJ, others)"}
  - {id: hump, chain: voi, role: dex, label: "HumbleSwap"}
edges:
  - {from: brg, to: atk, asset: aVOI, amount: 27100000000, time: 2026-11-21T16:05:00Z, technique: T10.003, verified: source, source: voi2026}
  - {from: atk, to: uni, asset: aVOI, amount: 550000000, time: 2026-11-21T17:10:00Z, verified: source, source: voi2026}
  - {from: voiesc, to: redeem, asset: VOI, amount: 125000000, time: 2026-11-21T17:35:00Z, technique: T10.003, verified: source, source: voi2026}
  - {from: redeem, to: hump, asset: VOI, amount: 91640000, verified: source, source: aramid2026}
  - {from: atk, to: usdcdst, asset: USDC, amount: 4100, time: 2026-11-21T19:22:00Z, verified: source, source: voi2026}
```

Edge times use the report's clock times read as UTC, which the source does not confirm. The 91.64M figure is Voi's TP33C total (wrapped to wVOI and sold on HumbleSwap) and the operator's "~91.6M sold on HumbleSwap" agrees with it.

## Root-cause evidence

- **Technique:** OAK-T10.003
- **Source:** <https://x.com/AramidFinance/status/2124550598267928832> (operator thread); <https://x.com/Voi_Net/status/2124387898757611938>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Confirmed only at the level of the class (signature replay in the Base contract); the exact flaw is not established. Operator: "our Base bridge contract was exploited via a signature-replay bug. The issue was isolated to our Base EVM contract—no private keys, multisig, or signer infrastructure were compromised." Voi Network adds the observable pattern ("the same source txid and the same two validator signatures. Only the encoding of the trailing data differs") and a hypothesis it labels "Likely cause, not yet confirmed: the contract checks the signatures on only part of the claim, but uses the full calldata to spot duplicates". Not established: the vulnerable function, whether the flaw predates the latest upgrade, the final loss in dollars, and whether the operator's "no signer infrastructure compromised" holds (it is the operator's own statement, no independent check found). The two sources also differ on minting: the operator writes "Unbacked aVOI was issued on Base and Algorand", while Voi Network writes "No aVOI was minted on Base. Its supply is pre-minted and locked in the bridge, and the replays drained that locked supply." The operator's post-mortem is pending, so this entry may need revising.

## Public references

- `[aramid2026]` — Aramid Bridge (@AramidFinance), "Aramid Bridge Incident Update" thread, posts 1–7 (2026-11-22): <https://x.com/AramidFinance/status/2124550598267928832>; recovery update and 48-hour notice (2026-11-24): <https://x.com/AramidFinance/status/2125146372802552023>, <https://x.com/AramidFinance/status/2125146377185341877>
- `[voi2026]` — Voi Network (@Voi_Net), "Aramid Bridge Exploit Report, Nov 21, 2026" (2026-11-22): <https://x.com/Voi_Net/status/2124387898757611938>
