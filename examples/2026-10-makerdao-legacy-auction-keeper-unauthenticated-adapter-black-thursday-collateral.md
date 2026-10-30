# MakerDAO legacy auction keeper — four lots won with zero bids on Black Thursday sat unsettled for six and a half years behind a function that never checked its caller — third-party keeper on MakerDAO / Ethereum — 2026-10-06

**Loss:** **200 ETH (~\$543K per CertiK; ~\$538K per Defimon)** — the collateral from **ETH-A Flipper auctions #1457–#1460** (50 ETH each), won by this keeper with **zero bids in March 2020** and never `deal()`-settled. MakerDAO's core contracts behaved as designed.

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration — *primary, confirmed*. Function selector **`0x8804d1de`** in the keeper implementation **lacked the `ds-auth` check** its other privileged functions had, **accepted any address as an "adapter,"** called **`Vat.hope`** on it and then its **`join()`**. The attacker's module ran with Vat delegation over the keeper's account, called **`deal()`** on the retired Flipper, **`flux()`**-moved 200 ETH to itself, and exited through ETH-A GemJoin as WETH. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T11.013** (Legacy-Version Maintenance Attack Surface — the keeper was dormant since 2020 and held claimable value nobody was watching). **OAK-T7.001** (Mixer-Routed Hop — the attacker EOA was funded by a single 0.1 ETH Tornado Cash withdrawal and the proceeds went back into Tornado Cash in 10 ETH deposits per CertiK; see [`techniques/T7.001-mixer-routed-hop.md`](../techniques/T7.001-mixer-routed-hop.md)).

**Attribution:** **pseudonymous.** Attacker EOA `0x01EB957E5C7DcDDD60F3C875956cCc6fb9BdA5FA`, funded by a single 0.1 ETH Tornado Cash withdrawal 16 minutes before the exploit; proceeds returned to Tornado Cash in 10 ETH deposits.

**Key teaching point:** **Unclaimed value does not expire; it waits for the first caller.** The collateral was the keeper's from the 2020 [Black Thursday](2020-03-makerdao-black-thursday.md) zero-bid auctions; the only thing standing between it and anyone was one unauthenticated function. Settling or sweeping what a retired contract is owed is part of retiring it.

## Summary

On 2026-10-06 at 06:13 UTC an attacker passed a self-deployed module to an unauthenticated function of a 2020 MakerDAO liquidation keeper (proxy `0x9c05a05893Ada984FC20D0DA0c046De5Cc0e8273`). The keeper granted the module Vat delegation and called into it; the module settled four never-dealt Black Thursday auctions, moved their 200 ETH collateral out of the keeper's Vat balance, and exited it as WETH.

## Timeline (UTC)

Read it as four stages. **Flaw**: a 2020 keeper holds claimable collateral and one function never checks its caller. **Prepare**: a Tornado-funded wallet and an attack contract. **Take**: one transaction grants delegation, settles four old auctions and exits 200 ETH. **Move**: the proceeds go back into Tornado Cash. Times are from CertiK.

| When | What happened | OAK |
|---|---|---|
| 2020-03 | The keeper wins four ETH-A Flipper auctions (#1457–#1460, 50 ETH each) with zero bids on Black Thursday and never calls `deal()` to settle them. The collateral stays claimable (CertiK; Defimon). | **T11.013** |
| Before 2026-10-06 (since deployment) | The keeper implementation's function `0x8804d1de` lacks the `ds-auth` check that its other privileged functions run. It accepts any address as an adapter. Nobody calls it for six and a half years. | **T9.004** (flaw) |
| 2026-10-06 05:57:23 | Tornado Cash 0.1 ETH withdrawal funds the attacker EOA. It is the account's only funding ([`0xd4c0b18a058e7f0a12855f30174f4cb1e973c15c886063deab97e1a21f048ac6`](https://etherscan.io/tx/0xd4c0b18a058e7f0a12855f30174f4cb1e973c15c886063deab97e1a21f048ac6)). | T7.001 (funding) |
| 06:12:11 | The attack contract is deployed ([`0x4a587af4213cc345c4c109fbf5fec46f9643183f91a9edf60305380f31ad1167`](https://etherscan.io/tx/0x4a587af4213cc345c4c109fbf5fec46f9643183f91a9edf60305380f31ad1167)). | — |
| 06:13:11 | One transaction ([`0xbb6940f7c2a1e68cafbae7bb9b94d09af9af06ec3a114f6996f2cab993f3a88c`](https://etherscan.io/tx/0xbb6940f7c2a1e68cafbae7bb9b94d09af9af06ec3a114f6996f2cab993f3a88c)): the attack contract creates a malicious adapter module and passes it to `0x8804d1de`. The keeper calls `Vat.hope` on it, giving the module full control of the keeper's Vat account, then calls the module's `join()`. | **T9.004** |
| 06:13:11 (same transaction) | Inside the callback the module calls `deal()` on the retired Flipper for auctions 1457–1460, which credits 200 ETH of collateral to the keeper's Vat balance. It then moves it to itself with `flux()`, exits it through ETH-A GemJoin as 200 WETH and forwards it to the attacker EOA. The delegation is never revoked. | **T9.004** |
| 06:19:35 → | Six minutes later the attacker starts sending the proceeds to the Tornado Cash router in 10 ETH deposits, 20 in all (first: [`0xb8ecff9c129d8d9331c85558eaeddff29a38c4c16b71a40986acbf8f6febefeb`](https://etherscan.io/tx/0xb8ecff9c129d8d9331c85558eaeddff29a38c4c16b71a40986acbf8f6febefeb)). | **T7.001** |
| 2026-10-06 08:46 | Defimon Alerts posts the loss as about \$538K and notes MakerDAO's core contracts behaved as designed. No fix, recovery or statement from the keeper's owner is found in the cited sources (undisclosed). | response |

Key addresses:

- Attacker EOA (traced by OAK) — [`0x01EB957E5C7DcDDD60F3C875956cCc6fb9BdA5FA`](https://etherscan.io/address/0x01EB957E5C7DcDDD60F3C875956cCc6fb9BdA5FA)
- Attack contract (traced by OAK; unwraps WETH and pays the EOA) — [`0xEc997d2aD033277913d6002277353368E8321dcF`](https://etherscan.io/address/0xEc997d2aD033277913d6002277353368E8321dcF)
- Malicious adapter module (still holds Vat delegation over the victim) — [`0xf09a13072Ed939B79Bc25B66AA3a836ea6DCC170`](https://etherscan.io/address/0xf09a13072Ed939B79Bc25B66AA3a836ea6DCC170)
- Vulnerable keeper (AdminUpgradeabilityProxy) — [`0x9c05a05893Ada984FC20D0DA0c046De5Cc0e8273`](https://etherscan.io/address/0x9c05a05893Ada984FC20D0DA0c046De5Cc0e8273)
- Vulnerable implementation (source not verified) — [`0x68399ed8aa33C5b43F863EE6782de492006A5546`](https://etherscan.io/address/0x68399ed8aa33C5b43F863EE6782de492006A5546)
- Keeper owner and its March 2020 operator — [`0xaDC374E77b89Af0B8B39F7c47E8e0A37B6DaF073`](https://etherscan.io/address/0xaDC374E77b89Af0B8B39F7c47E8e0A37B6DaF073)
- MakerDAO ETH-A Flipper (retired) — [`0xd8a04F5412223F513DC55F839574430f5EC15531`](https://etherscan.io/address/0xd8a04F5412223F513DC55F839574430f5EC15531)
- MakerDAO Vat — [`0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B`](https://etherscan.io/address/0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B)
- MakerDAO ETH-A GemJoin (exit point) — [`0x2F0b23f53734252Bda2277357e97e1517d6B042A`](https://etherscan.io/address/0x2F0b23f53734252Bda2277357e97e1517d6B042A)
- Tornado Cash router (proceeds deposited) — [`0xd90e2f925DA726b50C4Ed8D0Fb90Ad053324F31b`](https://etherscan.io/address/0xd90e2f925DA726b50C4Ed8D0Fb90Ad053324F31b)
- Tornado Cash 0.1 ETH pool (funding source) — [`0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc`](https://etherscan.io/address/0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc)

## Fund flow

Ethereum only, traced by OAK with `tools/explorer.py` (Blockscout, keyless) on 2026-10-30 over a window of the first five days after the exploit. Every edge below was checked on-chain. No counterfeit-token transfers were skipped.

```oak-flow
as_of: 2026-10-30T12:30Z
nodes:
  - {id: tc, chain: ethereum, address: 0x12d66f87a04a9e220743712ce6d9bb1b5616b8fc, role: mixer, label: "Tornado Cash 0.1 ETH pool"}
  - {id: eoa, chain: ethereum, address: 0x01eb957e5c7dcddd60f3c875956ccc6fb9bda5fa, role: attacker-eoa, label: "Attacker EOA"}
  - {id: atk, chain: ethereum, address: 0xec997d2ad033277913d6002277353368e8321dcf, role: attack-contract, label: "Attack contract"}
  - {id: mod, chain: ethereum, address: 0xf09a13072ed939b79bc25b66aa3a836ea6dcc170, role: attack-contract, label: "Malicious adapter module"}
  - {id: join, chain: ethereum, address: 0x2f0b23f53734252bda2277357e97e1517d6b042a, role: vulnerable-contract, label: "MakerDAO ETH-A GemJoin"}
  - {id: router, chain: ethereum, address: 0xd90e2f925da726b50c4ed8d0fb90ad053324f31b, role: mixer, label: "Tornado Cash router"}
edges:
  - {from: tc, to: eoa, asset: ETH, amount: 0.0978373, tx: 0xd4c0b18a058e7f0a12855f30174f4cb1e973c15c886063deab97e1a21f048ac6, time: 2026-10-06T05:57:23Z, technique: T7.001, verified: oak}
  - {from: join, to: mod, asset: WETH, amount: 200, tx: 0xbb6940f7c2a1e68cafbae7bb9b94d09af9af06ec3a114f6996f2cab993f3a88c, time: 2026-10-06T06:13:11Z, technique: T9.004, verified: oak}
  - {from: mod, to: atk, asset: WETH, amount: 200, tx: 0xbb6940f7c2a1e68cafbae7bb9b94d09af9af06ec3a114f6996f2cab993f3a88c, time: 2026-10-06T06:13:11Z, technique: T9.004, verified: oak}
  - {from: atk, to: eoa, asset: ETH, amount: 200, tx: 0xbb6940f7c2a1e68cafbae7bb9b94d09af9af06ec3a114f6996f2cab993f3a88c, time: 2026-10-06T06:13:11Z, technique: T9.004, verified: oak}
  - {from: eoa, to: router, asset: ETH, amount: 200, tx: 0xb8ecff9c129d8d9331c85558eaeddff29a38c4c16b71a40986acbf8f6febefeb, time: 2026-10-06T06:19:35Z, tx_count: 20, time_last: 2026-10-06T06:28:35Z, technique: T7.001, verified: oak}
```

What the trace adds beyond the sources:

- **Exit path.** In the exploit transaction the GemJoin sent 200 WETH to the module, the module sent it to the attack contract, and the attack contract unwrapped it (200 WETH burned to zero address) and paid 200 ETH to the attacker EOA. CertiK says the module forwards to the EOA; on-chain the attack contract is the last step before the EOA.
- **Funding amount.** The Tornado withdrawal was relayed (the transaction sender is relayer `0xd04e9f0945dea8373d882c730e2c93a74b591796`). The EOA received 0.0978373 ETH; the pool paid the relayer 0.0021627 ETH as fee. The sources say "0.1 ETH", which is the pool denomination.
- **Proceeds.** The 20 deposits to the Tornado router are 10 ETH each, 200 ETH in total from 06:19:35 to 06:28:35 UTC, matching the 200 ETH taken. Nothing else left the EOA in the window; the trace stops at the mixer.
- **Limits.** Withdrawals from Tornado Cash are not linkable on-chain, so nothing past the router is traced. The keeper-to-GemJoin step (Vat `flux`/`exit` accounting) is Vat-internal and not shown as a token edge. The Blockscout view of the first deposit transaction shows extra internal 10 ETH transfers between Tornado-side addresses that OAK did not follow.

## Root-cause evidence

- **Technique:** OAK-T9.004
- **Source:** <https://www.certik.com/blog/makerdao-legacy-auction-keeper-incident-analysis>; <https://x.com/DefimonAlerts/status/2107391959853600812>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** CertiK's transaction-level analysis: keeper function 0x8804d1de lacked the ds-auth check, accepted any adapter, granted it Vat delegation and called it; the module settled four 2020 Flipper lots and exited 200 ETH. Defimon independently flagged the missing access check.

## Public references

- `[certikmakerkeeper2026]` — CertiK, "MakerDAO Legacy Auction Keeper Incident Analysis": <https://www.certik.com/blog/makerdao-legacy-auction-keeper-incident-analysis>
- `[cryptotimesmakerkeeper2026]` — The Crypto Times, "Dormant MakerDAO Keeper Drained of \$538K, Core Remains Intact" (2026-10-06): <https://www.cryptotimes.io/2026/10/06/dormant-makerdao-keeper-drained-of-538k-core-remains-intact/>
- `[defimonmakerkeeper2026]` — Defimon Alerts on X (2026-10-06): <https://x.com/DefimonAlerts/status/2107391959853600812>
