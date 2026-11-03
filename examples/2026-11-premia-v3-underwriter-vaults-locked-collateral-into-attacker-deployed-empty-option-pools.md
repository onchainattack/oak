# Premia V3 — underwriter vaults wrote options into attacker-deployed empty pools and locked their own collateral there, where the attacker withdrew it — Premia V3 underwriter vaults / Arbitrum — 2026-11-01

**Loss:** **~\$464.6K** per PeckShield ("exploited for \$464.6K"; Sprunky repeats \$464,600). Blockaid's first alert, at 04:13 UTC, counted **~\$400.5K** "drained from the vaults so far across ~2 txs" with the attack "still ongoing"; GoPlus says "over \$400,000". The exact total is not published by Premia. Per GoPlus, **six** vault contracts were affected. The two exploit transactions are one second apart. The exploiter bridged the funds from Arbitrum to Ethereum, then swapped to BTC via Chainflip and NEAR Intents (PeckShield). No funds returned at last report; no Premia statement found (see What is not known).

**OAK Techniques observed:** **OAK-T9.004** (Access-Control Misconfiguration, counterfeit-object acceptance — *primary*, per GoPlus. Premia V3 option pools are created permissionlessly through a factory. The underwriter vaults, when a buyer traded with them, locked collateral into the matching pool without checking that the pool was a market worth trusting: GoPlus says the vault "checks only whether the pool was deployed by the official factory" and not "its liquidity, age, or whether it is an empty pool controlled exclusively by the attacker". The attacker deployed six empty pools, so the vault's collateral landed in a pool where the attacker was the only participant, and the pool's liquidity path paid it out. See [`techniques/T9.004-access-control-misconfiguration.md`](../techniques/T9.004-access-control-misconfiguration.md)). **OAK-T9.002** (Flash-Loan-Enabled Exploit — the Balancer Vault flash-loaned the WBTC, WETH, USDC and ARB that funded each sequence; traced by OAK). **OAK-T7.003** (Cross-Chain Bridge Laundering — Arbitrum to Ethereum, then to BTC via Chainflip and NEAR Intents, per PeckShield; not traced by OAK).

**Attribution:** **pseudonymous** (exploiter EOA [`0xbeBa8CEfD0D75d747C5AD966Dc17C0Bb60D84dBd`](https://arbiscan.io/address/0xbeBa8CEfD0D75d747C5AD966Dc17C0Bb60D84dBd); no one has attributed it to a named actor).

**Key teaching point:** **A vault that writes into a market must check that the market is one it should trust, not only that it came from the official factory.** When pool creation is permissionless, "deployed by our factory" proves nothing about liquidity, age or who controls the pool. A minimum-liquidity or age gate, or an allowlist of pools the vault may fund, would have stopped the vault from sending its collateral into a pool the attacker had created seconds earlier.

## Summary

On 2026-11-01 at about 03:15 UTC the attacker used one contract to create six empty Premia V3 option pools, then sent two exploit transactions one second apart. In each, a flash loan funded a small option purchase; the underwriter vault followed its normal write path and locked collateral into the attacker's empty pool; the attacker, the only participant, withdrew that collateral through the pool's liquidity functions and repaid the flash loan. Blockaid flagged the attack at 04:13 UTC, PeckShield put the loss at \$464.6K at 05:05 UTC, and GoPlus published a 13-part breakdown on 2026-11-02. The funds were bridged to Ethereum and swapped to BTC. Premia has published no statement that OAK could find.

## Timeline (UTC)

Read it as four stages. **Flaw**: vaults fund any factory-made pool. **Preparation**: six empty pools are created. **Take**: two flash-loan transactions move vault collateral into those pools and out to the attacker. **Money and response**: bridge to Ethereum, swap to BTC; alerts. Transaction times were traced by OAK on Arbitrum; alert times are from the X posts.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-01 (since when: undisclosed) | The factory lets anyone deploy an option pool for a given pair, strike, expiry and option type. The underwriter vaults write options into a pool by locking collateral there and, per GoPlus, do not check the pool's liquidity, age or whether the attacker alone controls it. | **T9.004** |
| 2026-11-01 03:14:37 | Preparation: the exploiter EOA calls the attack contract in [`0xe3c263fcae544954367998e48e13112875cfd38a3b9a240e7818bb96313831f5`](https://arbiscan.io/tx/0xe3c263fcae544954367998e48e13112875cfd38a3b9a240e7818bb96313831f5), sending 0.01 ETH; GoPlus says this creates the six option pools. The tx shows dust-sized seed transfers (under 14 tokens in total) into six pool addresses. How the 0.01 ETH was funded is undisclosed. | **T9.004** |
| 2026-11-01 03:15:39 | First exploit tx [`0x64602cbbeba5d3c7a5e2cff4f98cc118886fc6051c56fa50458abec2c90441ac`](https://arbiscan.io/tx/0x64602cbbeba5d3c7a5e2cff4f98cc118886fc6051c56fa50458abec2c90441ac): flash-borrows 0.9 WBTC, 11 WETH and 6,000 USDC from the Balancer Vault. For the pSV-WBTC/USDCe-C vault `0x45dF5EA836A15B561937Ae8373ab9eE984aea531` the buyer pays a 0.11714618 WBTC premium, and the vault sends **3.76125 WBTC** into the empty pool `0x1B25F69Cfc2b3A9fCC0A7C0944A81723d5dcD77d`. The pool then sends **4.4904 WBTC** to the attack contract. The WETH vault `0xbae43c546DFADC69576aE73C68e0694A54F08e1B` and the USDC put vault `0xD46993F25D298ebbCD31E941156C66f7e628A52a` are drained the same way, and all flash loans are repaid in the same tx. | **T9.004**, T9.002 |
| 2026-11-01 03:15:40 | Second exploit tx [`0xd7e8086df0570c5389ca27eb9bcdff290e810c094155b410a42e5bad2b3244ff`](https://arbiscan.io/tx/0xd7e8086df0570c5389ca27eb9bcdff290e810c094155b410a42e5bad2b3244ff): flash-borrows 12,000 ARB, 5,500 USDC and 4,000 USDC from the Balancer Vault and repeats the pattern against the ARB call and put vaults (GoPlus) and further USDC vaults; the vaults send USDC and ARB into attacker pools, which pay the attack contract. The attack contract swaps the proceeds within the tx (it unwraps 148.53702309 WETH). | **T9.004**, T9.002 |
| 2026-11-01 04:13:20 | Blockaid detects the exploit as "ongoing": "~\$400.5k drained from the vaults so far across ~2 txs". | — |
| 2026-11-01 (time undisclosed), by 05:05:03 | The exploiter bridges the stolen funds from Arbitrum to Ethereum, then swaps them to BTC via Chainflip and NEAR Intents (PeckShield). OAK could not trace this leg: native ETH sends are not visible over public RPC and the Arbitrum Blockscout API refused the lookup. | T7.003 |
| 2026-11-01 05:05:03 | PeckShield reports the loss as \$464.6K. | — |
| 2026-11-01 07:05 | Sprunky repeats the \$464,600 figure and lists the exploiter EOA, the exploit contract and a "helper contract". | — |
| 2026-11-02 09:46 | GoPlus publishes a 13-part root-cause breakdown with the six affected vaults and the three attack transactions. | — |
| Not published | Pause of the vaults, fix, statement, refunds or bounty: undisclosed. | response |

Key addresses:

- Exploiter EOA — [`0xbeBa8CEfD0D75d747C5AD966Dc17C0Bb60D84dBd`](https://arbiscan.io/address/0xbeBa8CEfD0D75d747C5AD966Dc17C0Bb60D84dBd)
- Exploit (attack) contract — [`0x577168C8c6fA937495C3D6961f1d7D734b2d785f`](https://arbiscan.io/address/0x577168C8c6fA937495C3D6961f1d7D734b2d785f)
- "Helper contract" per Sprunky; on-chain it receives USDC from a vault in the second tx, like the attacker-created pools — [`0x1E3aDD9C06459c069E31dB7D67e0105f2D389128`](https://arbiscan.io/address/0x1E3aDD9C06459c069E31dB7D67e0105f2D389128)
- Empty pool used in the first example (WBTC) — [`0x1B25F69Cfc2b3A9fCC0A7C0944A81723d5dcD77d`](https://arbiscan.io/address/0x1B25F69Cfc2b3A9fCC0A7C0944A81723d5dcD77d)
- Affected vaults (GoPlus): [`0x45dF5EA836A15B561937Ae8373ab9eE984aea531`](https://arbiscan.io/address/0x45dF5EA836A15B561937Ae8373ab9eE984aea531), [`0xbae43c546DFADC69576aE73C68e0694A54F08e1B`](https://arbiscan.io/address/0xbae43c546DFADC69576aE73C68e0694A54F08e1B), [`0x6A1FC0E1c60BA6564CDe4910A425F1F1a1d18C1F`](https://arbiscan.io/address/0x6A1FC0E1c60BA6564CDe4910A425F1F1a1d18C1F), [`0xDC631d88dbB5eb39f5c4Bf8B4e5298d098912fFf`](https://arbiscan.io/address/0xDC631d88dbB5eb39f5c4Bf8B4e5298d098912fFf), [`0xD46993F25D298ebbCD31E941156C66f7e628A52a`](https://arbiscan.io/address/0xD46993F25D298ebbCD31E941156C66f7e628A52a), [`0xBe3E229319f86f5ee96ee1dc0b6d55e8b68a439e`](https://arbiscan.io/address/0xBe3E229319f86f5ee96ee1dc0b6d55e8b68a439e)
- Fee recipient seen in both txs (GoPlus: consistent with a 0.3% fee, short form `0x7bf2392b…`) — [`0x7bf2392bd078c8353069cffeacc67c094079be23`](https://arbiscan.io/address/0x7bf2392bd078c8353069cffeacc67c094079be23)
- Flash-loan source — Balancer Vault [`0xba12222222228d8ba445958a75a0704d566bf2c8`](https://arbiscan.io/address/0xba12222222228d8ba445958a75a0704d566bf2c8)
- BTC addresses, bridge and swap transactions — not published in the cited sources

## Fund flow

Arbitrum leg, traced by OAK with `tools/explorer.py` on 2026-11-03 from the transfer logs of the two exploit transactions. Edges marked `verified: oak` were read from those logs. Native ETH movements are not visible over public RPC, and the Arbitrum Blockscout address API refused the lookup, so the Arbitrum-to-Ethereum bridge and the swap to BTC are relayed from PeckShield and carry no addresses. Only the largest vault-to-pool and pool-to-attacker legs are listed; the other vaults in each tx follow the same pattern. Pool-to-attacker amounts include the attacker's own deposits and the flash-loaned premium (GoPlus: "the attacker also recovered their own deposits"), so they are not net loss.

```oak-flow
as_of: 2026-11-03T12:00Z
nodes:
  - {id: atk, chain: arbitrum, address: 0xbeBa8CEfD0D75d747C5AD966Dc17C0Bb60D84dBd, role: attacker-eoa, label: "Exploiter EOA"}
  - {id: exp, chain: arbitrum, address: 0x577168C8c6fA937495C3D6961f1d7D734b2d785f, role: attack-contract, label: "Exploit contract"}
  - {id: bal, chain: arbitrum, address: 0xba12222222228d8ba445958a75a0704d566bf2c8, role: lending, label: "Balancer Vault (flash loans)"}
  - {id: vwbtc, chain: arbitrum, address: 0x45dF5EA836A15B561937Ae8373ab9eE984aea531, role: vulnerable-contract, label: "pSV-WBTC/USDCe-C vault"}
  - {id: pwbtc, chain: arbitrum, address: 0x1B25F69Cfc2b3A9fCC0A7C0944A81723d5dcD77d, role: intermediary, label: "Attacker-created empty WBTC pool"}
  - {id: vweth, chain: arbitrum, address: 0xbae43c546DFADC69576aE73C68e0694A54F08e1B, role: vulnerable-contract, label: "Premia WETH vault"}
  - {id: pweth, chain: arbitrum, address: 0xaf0dda38064f4fa44577eba22f8f9e2cbcb038ac, role: intermediary, label: "Attacker-created empty WETH pool"}
  - {id: varb, chain: arbitrum, address: 0xDC631d88dbB5eb39f5c4Bf8B4e5298d098912fFf, role: vulnerable-contract, label: "Premia ARB vault"}
  - {id: parb, chain: arbitrum, address: 0xc25b7a212327d45deb2022dbb1d57e1217a82d8e, role: intermediary, label: "Attacker-created empty ARB pool"}
  - {id: brg, chain: arbitrum, role: bridge, label: "Arbitrum to Ethereum bridge (undisclosed)"}
  - {id: chf, chain: ethereum, role: bridge, label: "Chainflip / NEAR Intents swap to BTC (undisclosed)"}
edges:
  - {from: atk, to: exp, asset: ETH, amount: 0.01, tx: 0xe3c263fcae544954367998e48e13112875cfd38a3b9a240e7818bb96313831f5, time: 2026-11-01T03:14:37Z, technique: T9.004, verified: oak}
  - {from: bal, to: exp, asset: WBTC, amount: 0.9, tx: 0x64602cbbeba5d3c7a5e2cff4f98cc118886fc6051c56fa50458abec2c90441ac, time: 2026-11-01T03:15:39Z, technique: T9.002, verified: oak}
  - {from: vwbtc, to: pwbtc, asset: WBTC, amount: 3.76125, tx: 0x64602cbbeba5d3c7a5e2cff4f98cc118886fc6051c56fa50458abec2c90441ac, time: 2026-11-01T03:15:39Z, technique: T9.004, verified: oak}
  - {from: pwbtc, to: exp, asset: WBTC, amount: 4.4904, tx: 0x64602cbbeba5d3c7a5e2cff4f98cc118886fc6051c56fa50458abec2c90441ac, time: 2026-11-01T03:15:39Z, technique: T9.004, verified: oak}
  - {from: vweth, to: pweth, asset: WETH, amount: 45.135, tx: 0x64602cbbeba5d3c7a5e2cff4f98cc118886fc6051c56fa50458abec2c90441ac, time: 2026-11-01T03:15:39Z, technique: T9.004, verified: oak}
  - {from: pweth, to: exp, asset: WETH, amount: 53.88, tx: 0x64602cbbeba5d3c7a5e2cff4f98cc118886fc6051c56fa50458abec2c90441ac, time: 2026-11-01T03:15:39Z, technique: T9.004, verified: oak}
  - {from: bal, to: exp, asset: ARB, amount: 12000, tx: 0xd7e8086df0570c5389ca27eb9bcdff290e810c094155b410a42e5bad2b3244ff, time: 2026-11-01T03:15:40Z, technique: T9.002, verified: oak}
  - {from: varb, to: parb, asset: ARB, amount: 48144, tx: 0xd7e8086df0570c5389ca27eb9bcdff290e810c094155b410a42e5bad2b3244ff, time: 2026-11-01T03:15:40Z, technique: T9.004, verified: oak}
  - {from: parb, to: exp, asset: ARB, amount: 57480, tx: 0xd7e8086df0570c5389ca27eb9bcdff290e810c094155b410a42e5bad2b3244ff, time: 2026-11-01T03:15:40Z, technique: T9.004, verified: oak}
  - {from: exp, to: brg, asset: "stolen funds (ETH-denominated, amount undisclosed)", time: 2026-11-01T05:05:03Z, technique: T7.003, verified: source, source: peckshieldpremia2026}
  - {from: brg, to: chf, asset: "bridged funds swapped to BTC (amount undisclosed)", time: 2026-11-01T05:05:03Z, technique: T7.003, verified: source, source: peckshieldpremia2026}
```

What the trace adds beyond the sources:

- **Flash-loan source.** Both exploit transactions borrow from the Balancer Vault `0xba12222222228d8ba445958a75a0704d566bf2c8` and repay it inside the same tx (for example 0.9 WBTC out and 0.9 WBTC back in the first tx).
- **Pool creation.** The first tx (03:14:37) is the only one before the exploit pair. It shows seed transfers into six pool addresses that later receive vault collateral: `0x1B25F69Cfc2b3A9fCC0A7C0944A81723d5dcD77d`, `0xaf0dda38064f4fa44577eba22f8f9e2cbcb038ac`, `0xb97235483bbe8086ed5f054800023aedab76000a`, `0x1e3add9c06459c069e31db7d67e0105f2d389128`, `0xc25b7a212327d45deb2022dbb1d57e1217a82d8e` and `0x3b38b22c64a90d342449c5b107e315daa7e3b73d`. So `0x1E3aDD9C06459c069E31dB7D67e0105f2D389128` is an attacker-created pool, not a separate helper, in the transfer logs.
- **Match with GoPlus.** The 3.76125 WBTC vault-to-pool and 4.4904 WBTC pool-to-attack-contract figures in GoPlus match the chain. The log also shows 0.0112524 WBTC from the pool to `0x7bf2392bd078c8353069cffeacc67c094079be23`.
- **In-transaction exit.** The first tx unwraps 43.23849768 WETH and the second 148.53702309 WETH (transfers to the zero address). The proceeds therefore left the exploit contract as native ETH, which this tool cannot show.
- **Limits.** The bridge and BTC legs, the exploiter's later balances and any BTC destination are not traced.

## Root-cause evidence

- **Technique:** OAK-T9.004
- **Source:** <https://x.com/GoPlusSecurity/status/2117191582361555366>; <https://x.com/blockaid_/status/2116745378674463229>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Two independent security firms describe the same mechanism. Blockaid (2026-11-01 04:13 UTC): the attacker "created empty option pools, flash-loaned, and bought options so vault collateral locked into those pools, then withdrew it as liquidity". GoPlus (2026-11-02) adds the vault-side flaw (factory-origin check only, no liquidity or age check) and the worked example, and OAK's reading of the transfer logs matches its amounts. This is third-party analysis of unverified contract behaviour: Premia has not confirmed the root cause, and the exact vault and pool functions that skip the check are not named in the sources, so the label stays below `confirmed`.

## What is not known

- Premia has published no statement that OAK could find. The official account was not located: the `@PremiaLabs` handle named in the alerts posts about a different product. The confirmed root cause, fix and any compensation are undisclosed.
- The final loss: PeckShield \$464.6K, Blockaid \$400.5K mid-attack, GoPlus "over \$400,000".
- GoPlus part 4 is cut off in the API response and part 11 was not returned, so some detail of the withdrawal steps is missing.
- The exact vault code path that accepts the empty pool, whether the vaults were paused, and the BTC destination addresses.

## Public references

- `[blockaidpremia2026]` — Blockaid on X, Premia exploit alert (2026-11-01): <https://x.com/blockaid_/status/2116745378674463229>
- `[peckshieldpremia2026]` — PeckShield on X, Premia loss and laundering path (2026-11-01): <https://x.com/PeckShieldAlert/status/2116758393067340132>
- `[sprunkypremia2026]` — Sprunky on X, attacker infrastructure map (2026-11-01): <https://x.com/sprunky_eth/status/2116788691972599910>
- `[goplusprem2026]` — GoPlus Security on X, 13-part exploit breakdown (2026-11-02): <https://x.com/GoPlusSecurity/status/2117191582361555366>
