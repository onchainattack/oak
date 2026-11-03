# b14g — withdrawal requests for 0 CORE were passed through to Core's staking code, which reads 0 as "withdraw everything" — b14g / Core — 2026-10-31

**Loss:** **~97.05M CORE (~\$1.47M at ~\$0.0151 per CORE)** per Bitquery's reconstruction; b14g's own figure is "approximately 97M CORE". b14g's tracing: about 68M CORE still on Core and about 9M CORE frozen by exchange partners. BTC staked through b14g is time-locked on Bitcoin and was not affected.

**OAK Techniques observed:** **OAK-T9.016** (Contract Accounting / State-Invariant Flaw — *primary*, per Bitquery, not yet confirmed by b14g. The attacker made 99 withdrawal requests for 0 CORE across 91 b14g orders in one transaction. Core's staking code reads a zero amount as a request for the full staked balance, and b14g's contract passed the 0 through, so each order paid out in full. The caller made calls the contract allowed; the contract's idea of "how much" was wrong. See [`techniques/T9.016-contract-accounting-state-invariant-flaw.md`](../techniques/T9.016-contract-accounting-state-invariant-flaw.md)). No key was stolen and no new code was deployed (Bitquery). No better-fitting Technique exists: T9.015 is specific to signature verification.

**Attribution:** **unattributed.** Attacker addresses are the two b14g published.

**Key teaching point:** **Treat 0 as an invalid amount at your own boundary, and never forward a user amount to an underlying contract whose meaning of 0 you have not checked.** A wrapper that validates only "does this user own this order" lets a sentinel value in the downstream API ("0 means all") turn a no-op into a full withdrawal.

## Summary

At 09:29:51 UTC on 2026-10-31 a wallet with no prior history sent one transaction to the b14g proxy that withdrew about 97.05M CORE staked through b14g and sent it to attacker-controlled addresses. b14g paused the affected contracts, posted a security update at 16:38 UTC, and said a post-mortem would follow. Core DAO said the Core network, consensus, validators and directly staked CORE were unaffected. The mechanism comes from Bitquery's on-chain reconstruction, repeated by RektRadar; b14g has not yet published its post-mortem.

## Timeline (UTC)

Stages. **Flaw**: b14g forwards a 0 amount to staking code that treats 0 as "all". **Take**: one transaction empties 91 orders. **Money**: wallet A moves coins to new wallets and exchange-linked addresses. **Response**: pause, statements, freezes. Times are from Bitquery, b14g, Core DAO and OAK's check of the Core RPC.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-31 (since when: undisclosed) | b14g's contract is a proxy whose logic had been unchanged for 17 months (Bitquery). Withdrawal requests of 0 CORE are passed to Core's staking contract, which reads 0 as the full stake with that validator. The faulty line in b14g's code has not been published. | **T9.016** |
| 2026-10-31 09:00:42 | Wallet A, new and with no prior record, receives its only funding, 615.62 CORE, from a service Bitquery labels "service Y" ([`0x63c619d68c0f6daacf09f0a11ad03cea5f9ee1d8`](https://scan.coredao.org/address/0x63c619d68c0f6daacf09f0a11ad03cea5f9ee1d8)). | — |
| 2026-10-31 09:29:51 | Drain transaction [`0xe1947f325e1f0bc22290ea97dc5b2ce44827fbb56e1cc40abaeda1d2ed04f62c`](https://scan.coredao.org/tx/0xe1947f325e1f0bc22290ea97dc5b2ce44827fbb56e1cc40abaeda1d2ed04f62c): wallet A calls the b14g proxy with 99 requests for 0 CORE across 91 orders; 97,045,563 CORE released (Bitquery). Traced by OAK on the Core RPC: block `0x262fe8d`, timestamp 09:29:51 UTC, status success, 99 event logs emitted by the b14g proxy. | **T9.016** |
| 2026-10-31 09:37 → 10:10 | Wallet A sends 23.4M CORE to 11 new addresses (Bitquery). | — |
| 2026-10-31 10:15 → 11:15 | Service Y passes 11.16M CORE of stolen coins to a deposit address Bitquery labels MEXC ([`0x8251321719179b7dc5680c5722741347756753ec`](https://scan.coredao.org/address/0x8251321719179b7dc5680c5722741347756753ec)). | — |
| 2026-10-31 10:35:51 | The b14g multisig pauses the contract, 66 minutes after the drain. Bitquery notes that when b14g first detected the problem cannot be confirmed on-chain. A user withdrew 80 CORE normally at 09:59:12 through the same function. | response |
| 2026-10-31 10:36:33 | Wallet A moves the remaining 73,646,178 CORE to wallet B (Bitquery). Between 10:41 and 10:47 wallet B sends 15M CORE to four new addresses; one returns 4,999,999 CORE at about 10:50. | — |
| 2026-10-31 16:38 | b14g posts its security update: contracts paused; about 68M CORE remains on Core; about 9M CORE frozen by exchange partners; post-mortem promised. | response |
| 2026-10-31 17:24 | Core DAO: the Core network is secure; it is helping b14g and exchanges trace and freeze funds. | response |
| 2026-10-31 19:43 | Bitquery: 68.15M CORE (70%) unmoved: 63.65M in wallet B and 4.5M in two new wallets. | — |

Key addresses:

- Wallet A, sent the zero-amount requests (attacker; named by b14g) — [`0xc556ed208285406d71705927f92d4f4eaea579f1`](https://scan.coredao.org/address/0xc556ed208285406d71705927f92d4f4eaea579f1)
- Wallet B, held most of the stolen coins (attacker; named by b14g) — [`0x27758c30f8e424fbd8ca605bf31e9496c26ce92c`](https://scan.coredao.org/address/0x27758c30f8e424fbd8ca605bf31e9496c26ce92c). OAK's RPC check on 2026-11-03 shows about 24,413 CORE here, so the 63.65M seen on 10-31 has since moved (destination not traced).
- b14g contract (proxy; called by the drain transaction, per OAK's RPC check) — [`0x04ea61c431f7934d51fed2acb2c5f942213f8967`](https://scan.coredao.org/address/0x04ea61c431f7934d51fed2acb2c5f942213f8967)
- b14g multisig (Bitquery) — [`0xff2a4d8f696991d5350b28fd6fbcf3c7b7f94233`](https://scan.coredao.org/address/0xff2a4d8f696991d5350b28fd6fbcf3c7b7f94233)
- Service X (Bitquery, role not described in the summary) — [`0xa78a018a7df5bcb6bd5517bdb1b0cd0a379d814e`](https://scan.coredao.org/address/0xa78a018a7df5bcb6bd5517bdb1b0cd0a379d814e)
- Bybit hot wallet (Bitquery label) — [`0xf89d7b9c864f589bbf53a82105107622b35eaa40`](https://scan.coredao.org/address/0xf89d7b9c864f589bbf53a82105107622b35eaa40)
- New wallet holding 2.0M CORE (Bitquery) — [`0x18435b4e54a5771c77170689a86ae9b1df5fad8e`](https://scan.coredao.org/address/0x18435b4e54a5771c77170689a86ae9b1df5fad8e)
- New wallet holding 2.5M CORE (Bitquery) — [`0xa2cc1744a33fe73522b43d70ae2a7ff025dccae5`](https://scan.coredao.org/address/0xa2cc1744a33fe73522b43d70ae2a7ff025dccae5)
- Address that returned 4,999,999 CORE to wallet B (Bitquery) — [`0x911c3bf11dfc5497a53a7a04ff7980532516f176`](https://scan.coredao.org/address/0x911c3bf11dfc5497a53a7a04ff7980532516f176)

The Ethereum address `0x91926046e148c66869d71B9Fa37306e82DDc8934` in RektRadar's daily roundup belongs to a different incident (a Troves Starknet vault, per a Defimon-relayed Troves on-chain message) and is not part of b14g.

## What is not known

- b14g's own explanation of the cause: its post-mortem was announced but not yet published at last check.
- Which line of b14g's code forwards the 0 amount. Bitquery says the code was not reviewed.
- Whether the amount is "one transaction" in the user sense: RektRadar's summary says one transaction, the body says 91 orders; the on-chain record shows one transaction containing 99 requests.
- When b14g first detected the problem, and where wallet B's coins went after 19:43 UTC on 10-31.

## Root-cause evidence

- **Technique:** OAK-T9.016
- **Source:** <https://bitquery.io/investigations/b14g-hack>; <https://www.rektradar.xyz/web3-daily-exploits-01-nov-2026-premia-465k-troves-legacy-perm/>; <https://x.com/b14g_network/status/2116570456245596580>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** Bitquery: the attacker's requests asked to withdraw 0 CORE from each order; Core's staking code reads 0 as a withdrawal of the entire stake, and b14g passed the 0 along. Normal withdrawals from 28 October requested fixed amounts and received exactly those. No stolen key and no new malicious code. RektRadar repeats this and cites Bitquery, so it is not independent. b14g confirms the loss, the pause and the attacker addresses, but states no mechanism. OAK confirmed on the Core RPC that the transaction exists, came from wallet A to the b14g proxy at 09:29:51 UTC and succeeded.

## Public references

- `[b14gupdate2026]` — b14g on X, "b14g Security Update" (2026-10-31): <https://x.com/b14g_network/status/2116570456245596580>
- `[coredao2026b14g]` — Core DAO on X (2026-10-31): <https://x.com/Coredao_Org/status/2116582149101121618>
- `[bitqueryb14g2026]` — Bitquery, b14g hack investigation: <https://bitquery.io/investigations/b14g-hack>
- `[rektradar20261101]` — RektRadar, "Web3 daily exploits 01 Nov 2026": <https://www.rektradar.xyz/web3-daily-exploits-01-nov-2026-premia-465k-troves-legacy-perm/>
- `[defimontroves2026]` — Defimon on X, Troves on-chain message (2026-10-31, different incident): <https://x.com/DefimonAlerts/status/2116543245211587053>
