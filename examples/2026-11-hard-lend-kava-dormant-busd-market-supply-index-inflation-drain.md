# HARD Lend — a nearly empty BUSD market's net supply was cut to a tiny positive number, inflating the supply index ~243,000x and letting 127 KAVA loans drain the pool — HARD Lend (press: "Kava Lend") / Kava — 2026-11-14

**Loss:** **~55.2M KAVA borrowed (~\$3.7–3.76M at the ~\$0.068 pre-attack price)**, per The Block; the operator's own report gives **~53.9M KAVA** taken from the HARD Lend application (as read from the report, see Root-cause evidence). About 49.2M KAVA was bridged to BNB Chain and sold for roughly \$2.09M (The Block). **Frozen:** the operator says some of the attacker's funds were frozen; RektRadar reports ~612,416 USDT blocked at the Relay bridge. No reimbursement figure was published in the sources read.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*. HARD Lend credits depositors by dividing borrower interest by the market's net supply and skips the division only when supply is exactly zero, per The Block. A small BUSD loan left net supply at about two hundred-millionths of a dollar, and the supply index then multiplied deposit values ~243,000-fold, so ~1.25 billion BUSD of paper collateral backed 127 KAVA loans. The books were wrong for a caller who was entitled to every call. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). **OAK-T7.003** (Cross-Chain Bridge Laundering — secondary: ~49.2M KAVA bridged to BNB Chain via LayerZero per the operator and The Block; RektRadar also names Axelar, see open questions).

**Attribution:** **unattributed.** The operator's report names two Kava addresses and one BNB Chain address (Key addresses below) but does not identify the actor. Roles of the two Kava addresses are not stated.

**Key teaching point:** **A lending market must bound its interest-index math for every positive value of the denominator, not only zero, and must refuse any action that moves net supply into a dust range.** The zero-only guard left the small-but-positive case open; a floor on net supply, or a cap on how far the index may move per block, would have refused the first step.

## Summary

HARD Lend, the lending application on Kava (press coverage calls it "Kava Lend"), had a BUSD market that was nearly dormant. Between 8 and 10 November the same market saw deposit and borrow cycles (RektRadar: "preparatory deposits and tests"; The Block dates repeated cycles from 8 November). On 14 November (UTC) a small BUSD loan cut the market's net supply to a tiny positive amount, the accrual maths divided by it, and deposit values inflated about 243,000 times within about three minutes. The attacker borrowed KAVA 127 times across two linked wallets; liquidations on the second account cleared each loan and reopened room under the KAVA borrowing cap. The module account holding the pool's KAVA fell from ~55.33M KAVA to 0.19 KAVA over about 1.5 hours (The Block). Bridging to BNB Chain began about six hours after the attack started. Kava's first public acknowledgement came ~7.5 hours after the start; the operator's report followed on 16 November.

## Timeline (UTC)

**Flaw** (always present) → **Preparation** (8–10 November) → **Take** (14 November) → **Money** (bridge and sales) → **Response**. Times below marked "OAK-converted" are The Block's US Eastern times converted to UTC by OAK (EST, UTC-5); the sources give no UTC times for the attack itself.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-08 (undisclosed since when) | HARD Lend's interest accrual divides borrower interest by the market's net supply and special-cases only an exact zero; tiny positive supply is unguarded (The Block, RektRadar). | **T9.016** |
| 2026-11-08 → 2026-11-10 | Repeated deposit and borrow cycles in the BUSD market, "suggesting at least a week of preparation" (The Block); RektRadar dates preparatory deposits 8–10 November. Funding source of the attacker wallets undisclosed. | **T9.016** |
| 2026-11-14 04:01 (OAK-converted from Friday 23:01 ET) | A small BUSD loan cuts the market's net supply to ~two hundred-millionths of a dollar. | **T9.016** |
| 2026-11-14 04:01 → ~04:04 | Over the next three minutes deposit values are multiplied ~243,000-fold, counting ~1.25 billion BUSD of collateral (The Block). | **T9.016** |
| 2026-11-14 ~04:04 → ~05:30 (about 1.5 hours per The Block) | KAVA is borrowed 127 times across two linked wallets; liquidations on the second account clear each loan and reopen borrowing capacity under the cap. Module account falls from ~55.33M KAVA to 0.19 KAVA. Transaction hashes undisclosed. | **T9.016** |
| 2026-11-14 09:59 (OAK-converted from Saturday 04:59 ET) | Bridging to BNB Chain begins: ~49.2M KAVA via LayerZero (operator, The Block) to [`0x37D732914F86Cc6eb1E87419e3046A739F011042`](https://bscscan.com/address/0x37D732914F86Cc6eb1E87419e3046A739F011042), sold for 3,006.5 BNB and 231,557 USDT (~\$2.09M). ~4.58M KAVA goes to five unlabeled Kava addresses (not listed by the source). | **T7.003** |
| 2026-11-14 (time undisclosed) | Per RektRadar, proceeds move on to Hyperliquid (XMR1) and Solana, and ~612,416 USDT is blocked at the Relay bridge. | T7.003 |
| 2026-11-14 11:28 (OAK-converted from 06:28 ET) | Kava's first public post: "tracking unexpected behavior originating from a dApp within the Kava ecosystem"; a follow-up ~30 minutes later says it is "not an infinite mint". | response |
| 2026-11-14 14:05 (OAK-converted from 09:05 ET) | Kava pauses the Axelar bridge "out of an abundance of caution" (The Block). Korean exchanges suspend KAVA deposits and withdrawals (RektRadar). | response |
| 2026-11-16 09:52:43 | Operator publishes the public incident report: "The identified exploit has been blocked." Legacy lending is being retired early, with a seven-day governance vote to disable new lending and borrowing. | response |

Key addresses (all from the operator's report; roles beyond "named in the report" are not stated):

- Kava address named in the operator report — [`kava1uzx5924cqsutcw365ajs8kkc3rr4vtlyzms255`](https://www.mintscan.io/kava/address/kava1uzx5924cqsutcw365ajs8kkc3rr4vtlyzms255)
- Kava address named in the operator report — [`kava1v2s266sll8ca5xrs06swmsc00nwwt7u77eufk4`](https://www.mintscan.io/kava/address/kava1v2s266sll8ca5xrs06swmsc00nwwt7u77eufk4)
- BNB Chain address receiving the bridged KAVA (The Block gives the same address) — [`0x37D732914F86Cc6eb1E87419e3046A739F011042`](https://bscscan.com/address/0x37D732914F86Cc6eb1E87419e3046A739F011042)
- HARD Lend module account (pool) — address undisclosed in the sources read.
- Exploit transaction hashes — undisclosed (the operator report contains none; RektRadar says none were published).

## Fund flow

OAK did not trace this. Kava is not covered by `tools/explorer.py` and no transaction hashes are published, so every edge is relayed from The Block or the operator report and carries no tx. The Hyperliquid, Solana and Relay legs (RektRadar only) are left out of the diagram.

```oak-flow
as_of: 2026-11-17T00:00Z
nodes:
  - {id: pool, chain: kava, role: vulnerable-contract, label: "HARD Lend module account (address undisclosed)"}
  - {id: kv1, chain: kava, address: kava1uzx5924cqsutcw365ajs8kkc3rr4vtlyzms255, role: attacker-eoa, label: "Kava address named in operator report (role not stated)"}
  - {id: kv2, chain: kava, address: kava1v2s266sll8ca5xrs06swmsc00nwwt7u77eufk4, role: attacker-eoa, label: "Kava address named in operator report (role not stated)"}
  - {id: brg, chain: kava, role: bridge, label: "LayerZero (Kava to BNB Chain)"}
  - {id: bnb, chain: bsc, address: 0x37d732914f86cc6eb1e87419e3046a739f011042, role: attacker-holding, label: "BNB Chain recipient of bridged KAVA"}
edges:
  - {from: pool, to: kv1, asset: KAVA, amount: 55200000, time: 2026-11-14T05:30:00Z, technique: T9.016, verified: source, source: theblock2026}
  - {from: kv1, to: brg, asset: KAVA, amount: 49200000, time: 2026-11-14T09:59:00Z, technique: T7.003, verified: source, source: theblock2026}
  - {from: brg, to: bnb, asset: KAVA, amount: 49200000, time: 2026-11-14T09:59:00Z, technique: T7.003, verified: source, source: kavareport2026}
```

The pool to `kv1` edge is a simplification: the sources do not say which of the two Kava addresses received the borrowed KAVA, nor which one sent the bridged KAVA. `kv2` is listed only because the operator names it.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://medium.com/@Kava_Chain/hard-lend-security-incident-579888f8dd73>; <https://x.com/KAVA_CHAIN/status/2122266605677580750>; <https://www.theblock.co/news/defi/2026-11-14-kava-lend-loses-roughly-3-8-million-to-hack-sending-kava-token-down-nearly-40-440350>; <https://www.rektradar.xyz/web3-daily-exploits-15-nov-2026-kava-lend-3-7m-arithmetic/>
- **Source type:** news
- **Confidence:** corroborated
- **Evidence:** The operator report states the cause only in general terms: a lending-accounting flaw inflated the value of BUSD collateral, and repeated borrowing and liquidation transactions withdrew existing KAVA from the pool; no new KAVA was created and Kava Chain's own security was not compromised. The specific mechanism (division by net supply guarded only at exact zero, net supply cut to ~two hundred-millionths of a dollar, ~243,000x index inflation, 127 loans, second-account liquidations reopening the cap) comes from The Block and RektRadar, which agree with each other and with the operator's outline but are not the operator. Hence `corroborated`, not `confirmed`. The Medium report could not be opened directly in a browser here; its text was obtained through a summarising fetch and its three addresses were matched against the Medium RSS feed. Still unknown: transaction hashes, the module account address, the attacker's funding source, the exact function and fix, and the final loss figure.

## Public references

- `[kavax2026]` — Kava (@KAVA_CHAIN) on X, announcement of the public incident report (2026-11-16): <https://x.com/KAVA_CHAIN/status/2122266605677580750>
- `[kavareport2026]` — Kava Chain, "HARD Lend Security Incident" (Medium, 2026-11-16): <https://medium.com/@Kava_Chain/hard-lend-security-incident-579888f8dd73>
- `[theblock2026]` — The Block, "Kava Lend loses roughly \$3.8 million to hack, sending KAVA token down nearly 40%" (2026-11-14): <https://www.theblock.co/news/defi/2026-11-14-kava-lend-loses-roughly-3-8-million-to-hack-sending-kava-token-down-nearly-40-440350>
- `[rektradar2026]` — RektRadar, "Web3 daily exploits, 15 Nov 2026: Kava Lend \$3.7M arithmetic" (2026-11-15): <https://www.rektradar.xyz/web3-daily-exploits-15-nov-2026-kava-lend-3-7m-arithmetic/>

## Open questions

- Which bridge carried the KAVA: the operator and The Block say LayerZero; RektRadar says LayerZero in one place and Axelar in another, and Kava paused the Axelar bridge. Not resolved here.
- 55.2M KAVA borrowed (The Block) versus 53.9M KAVA taken (operator report); RektRadar attributes the gap to related repayments, which no primary source confirms.
- The proceeds trail past BNB Chain (Hyperliquid, Solana, Relay) rests on RektRadar alone.
