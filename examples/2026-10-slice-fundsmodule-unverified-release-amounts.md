# Slice — FundsModule released pooled funds against amounts that caller-chosen contracts claimed to have sent — Slice / Base — 2026-10-20

**Loss:** **~\$41K** (SlowMist).

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting-State Invariant Flaw — *primary*. FundsModule's `0x9d2edfac` trusted release amounts returned by **caller-selected** source contracts without checking that the ETH or USDC arrived. Two attacker contracts returned non-zero amounts and sent nothing; with `flag=true` the function paid those amounts from pooled reserves to the caller. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)).

**Attribution:** **pseudonymous** ([`0xc34572ebb26b9a4c54854aae8d2347108e8c892f`](https://basescan.org/address/0xc34572ebb26b9a4c54854aae8d2347108e8c892f)).

**Key teaching point:** **Measure balances, do not ask for them.** A return value from a contract the caller picked is the caller's claim.

## Summary

The exploit ran on 2026-10-20 at 18:39 UTC (on-chain time, traced by OAK); SlowMist flagged it on 2026-10-21.

## Timeline (UTC)

Only the SlowMist alert time is public.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-20 (undisclosed) | FundsModule (proxy [`0x61bcd1ed11fc03c958a847a6687b1875f5eacaaf`](https://basescan.org/address/0x61bcd1ed11fc03c958a847a6687b1875f5eacaaf), implementation [`0x8db3b6f51b594dc87b87a3a3b844de9c0d8d60b5`](https://basescan.org/address/0x8db3b6f51b594dc87b87a3a3b844de9c0d8d60b5)) has function `0x9d2edfac`, which trusts release amounts returned by caller-selected source contracts without checking the ETH or USDC arrived. Since when is not stated. | **T9.016** |
| 2026-10-20 18:39:51 (traced by OAK; the sources say 2026-10-21) | The attacker ([`0xc34572ebb26b9a4c54854aae8d2347108e8c892f`](https://basescan.org/address/0xc34572ebb26b9a4c54854aae8d2347108e8c892f)) selects two contracts that return non-zero amounts and transfer nothing. With `flag=true` the function pays those amounts from pooled reserves to the sender, 19,820.734002 USDC visible ([`0x02b039a6345348d984e4a0b70dd233127772206e61ce82c390c4709c0b8d790a`](https://basescan.org/tx/0x02b039a6345348d984e4a0b70dd233127772206e61ce82c390c4709c0b8d790a)). Preparation is not published. | **T9.016** |
| 2026-10-20 18:41:17 (traced by OAK) | The attacker sends the 19,820.734002 USDC to a swap contract, which sells it across two pools for 8.12327455 WETH, delivered to contract [`0x678aa4bf4e210cf2166753e054d5b7c31cc7fa86`](https://basescan.org/address/0x678aa4bf4e210cf2166753e054d5b7c31cc7fa86). Onward path not traced (native ETH not visible over RPC). | — |
| 2026-10-21 03:24 | SlowMist publishes its alert. No Slice statement, pause or refund appears in the cited sources. | response |

Key addresses:

- Attacker — [`0xc34572ebb26b9a4c54854aae8d2347108e8c892f`](https://basescan.org/address/0xc34572ebb26b9a4c54854aae8d2347108e8c892f)
- Attack contract (traced by OAK) — [`0x8ebc7878287415f1fadcf4ace8817094e4c86f90`](https://basescan.org/address/0x8ebc7878287415f1fadcf4ace8817094e4c86f90)
- Swap contract (traced by OAK) — [`0x0a2854fbbd9b3ef66f17d47284e7f899b9509330`](https://basescan.org/address/0x0a2854fbbd9b3ef66f17d47284e7f899b9509330)
- Victim, FundsModule proxy — [`0x61bcd1ed11fc03c958a847a6687b1875f5eacaaf`](https://basescan.org/address/0x61bcd1ed11fc03c958a847a6687b1875f5eacaaf)
- Vulnerable implementation — [`0x8db3b6f51b594dc87b87a3a3b844de9c0d8d60b5`](https://basescan.org/address/0x8db3b6f51b594dc87b87a3a3b844de9c0d8d60b5)

## Fund flow

Base leg, traced by OAK on 2026-10-30. Base's Blockscout blocks automated clients, so OAK used public JSON-RPC: `tx` sees every Transfer log of a transaction, but native ETH and internal calls are not visible. Edges marked *traced by OAK* were checked on-chain.

```oak-flow
as_of: 2026-10-30T14:30Z
nodes:
  - {id: fm, chain: base, address: 0x61bcd1ed11fc03c958a847a6687b1875f5eacaaf, role: vulnerable-contract, label: "FundsModule proxy (pooled reserves)"}
  - {id: atk, chain: base, address: 0xc34572ebb26b9a4c54854aae8d2347108e8c892f, role: attacker-eoa, label: "Attacker"}
  - {id: swap, chain: base, address: 0x0a2854fbbd9b3ef66f17d47284e7f899b9509330, role: intermediary, label: "Swap contract (holds code, nonce 1)"}
  - {id: dex, chain: base, role: dex, label: "Two WETH/USDC pools"}
  - {id: rcv, chain: base, address: 0x678aa4bf4e210cf2166753e054d5b7c31cc7fa86, role: intermediary, label: "Shared swap router (receives the WETH)"}
edges:
  - {from: fm, to: atk, asset: USDC, amount: 19820.734002, tx: 0x02b039a6345348d984e4a0b70dd233127772206e61ce82c390c4709c0b8d790a, time: 2026-10-20T18:39:51Z, technique: T9.016, verified: oak}
  - {from: atk, to: swap, asset: USDC, amount: 19820.734002, tx: 0x54d80f6b60dc0ead8a3df2405b245e3792b70e392018f77acc695ff27f0dd4ce, time: 2026-10-20T18:41:17Z, verified: oak}
  - {from: swap, to: dex, asset: USDC, amount: 19820.734001, tx: 0x54d80f6b60dc0ead8a3df2405b245e3792b70e392018f77acc695ff27f0dd4ce, time: 2026-10-20T18:41:17Z, tx_count: 2, verified: oak}
  - {from: dex, to: rcv, asset: WETH, amount: 8.12327455, tx: 0x54d80f6b60dc0ead8a3df2405b245e3792b70e392018f77acc695ff27f0dd4ce, time: 2026-10-20T18:41:17Z, tx_count: 2, verified: oak}
```

What the trace adds beyond the sources:

- **The exploit time.** The release transaction is dated **2026-10-20 18:39:51 UTC**, about nine hours before SlowMist's alert (2026-10-21 03:24). The sources and this file's title say 2026-10-21; the alert date was taken as the exploit date.
- **The only visible taking is USDC.** The transaction called attack contract `0x8ebc7878287415f1fadcf4ace8817094e4c86f90` and paid **19,820.734002 USDC** from the FundsModule proxy to the attacker. The same transaction shows many small USDC transfers into the proxy from other addresses, and none of those are attacker-bound. SlowMist's figure is ~\$41K; the USDC alone is about half of that. The rest may be ETH, which is not visible over RPC, so the gap is **unresolved**.
- **Swap into WETH.** 80 seconds later the attacker sent the full 19,820.734002 USDC to contract `0x0a2854fbbd9b3ef66f17d47284e7f899b9509330` (tx `0x54d80f6b60dc0ead8a3df2405b245e3792b70e392018f77acc695ff27f0dd4ce`). It sold 15,856.587201 USDC to `0x72ab388e2e2f6facef59e3c3fa2c4e29011c2d38` for 6.49889887 WETH and 3,964.1468 USDC to `0xb775272e537cc670c65dc852908ad47015244eaf` for 1.62437568 WETH, 8.12327455 WETH in total. Dust of 0.000001 USDC came back to the attacker.
- **Limits.** The WETH landed in contract `0x678aa4bf4e210cf2166753e054d5b7c31cc7fa86` (it holds code). A `trace` from it shows dozens of unrelated recipients and assets over the following days, so it is a busy shared contract (probably a swap router), not an attacker wallet, and its outputs are not the attacker's hops. The WETH was probably unwrapped and sent on as native ETH, which is invisible over RPC. The attacker address has 7 transactions and holds only a trace of ETH now. A `trace` from the swap contract failed on a connection reset.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://x.com/SlowMist_Team/status/2112746806585274454>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** SlowMist's trace analysis of the release call.

## Public references

- `[slowmistslice2026]` — SlowMist TI alert (2026-10-21): <https://x.com/SlowMist_Team/status/2112746806585274454>
- `[basescanslice2026]` — exploit transaction: <https://basescan.org/tx/0x02b039a6345348d984e4a0b70dd233127772206e61ce82c390c4709c0b8d790a>
