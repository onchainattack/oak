# Lighter — a trader's API signing keys recovered from public signatures, then moved through a self-made public pool and withdrawn — Lighter / Ethereum — 2026-11-16

**Loss:** **~\$10.39M** (10,393,056.789298 USDC withdrawn from the Lighter contract on Ethereum, traced by OAK; Lighter's own figure is undisclosed). Lighter says **~5MM USDC** was returned to the affected trader by the Lighter Security Council. GoPlus reports ~\$15.48M affected across two accounts (714710 and 714723); Lighter has not confirmed that figure.

**OAK Techniques observed:** **OAK-T11.004** (Insufficient-Entropy Key Generation, *nearest existing fit, partial: primary*). Lighter's post-mortem says the affected accounts ran signing code other than the official SDKs that **reused signing nonces**, so the API private keys were computable from public signatures. This is a weak-randomness key-recovery failure, but at signing time, not at key generation, so T11.004 does not describe it exactly. No Technique covers nonce-reuse key recovery from public signatures; a gap is proposed in the open questions below. See [`techniques/T11.004-insufficient-entropy-key-generation.md`](../techniques/T11.004-insufficient-entropy-key-generation.md). **OAK-T7.002** (swap to ETH on CoW Settlement) and **OAK-T7.001** (onward 160 ETH transfers) for the money.

**Attribution:** **unattributed** (Lighter named [`0xb3fffca23d4444eE73349825ACD84f7b5020e387`](https://etherscan.io/address/0xb3fffca23d4444eE73349825ACD84f7b5020e387) as "the wallet believed to be associated with the attacker, which has also been flagged by the community"; GoPlus reports it as Lighter account 769455).

**Key teaching point:** **A key that signs trades must not also be able to move the whole balance into a pool the same key controls.** Lighter's fix, a wallet signature for transfers into public pools, breaks the step that turned a leaked API key into a withdrawal. Signatures that expose key material when a nonce repeats should not be public in the first place.

## Summary

On 2026-11-16 a withdrawal of 10,393,056.789298 USDC left Lighter's Ethereum contract for [`0xb3fffca23d4444eE73349825ACD84f7b5020e387`](https://etherscan.io/address/0xb3fffca23d4444eE73349825ACD84f7b5020e387) at 10:11:47 UTC. Lighter first said at 11:02:33 UTC that the incident "appears to involve a single compromised external party" and suspended withdrawals and pool creation. At 12:49:09 UTC it said the cause was "a leaked API key for a specific trader's account" and that the protocol and smart contracts were unaffected. Its post-mortem (18:20 UTC) says the affected accounts' signing code reused nonces, so the attacker computed the API keys from public signatures without any access to the accounts or to Lighter's systems. The attacker then created a public pool from the account, minted shares in an attacker-controlled account, transferred the victim's funds into the pool without minting shares for the victim, redeemed and withdrew. The USDC was swapped for ETH on CoW Settlement within minutes.

## Timeline (UTC)

**Flaw** (nonce reuse in unofficial signing code) → **Take** (key recovery, pool route, withdrawal) → **Money** (CoW swaps, ETH transfers) → **Response** (pause, Guardian, return, fixes). Times are from chain data (Blockscout, traced by OAK) and from Lighter's posts.

| When | What happened | OAK |
|---|---|---|
| Before 2026-11-16 (undisclosed) | The affected accounts' signing code, not the official Lighter SDKs, reused signing nonces; their signatures were public, so the API keys could be computed. Date of first reuse undisclosed | **T11.004** |
| 2026-11-16, before 10:11 (undisclosed) | Attacker computes the API keys, creates a public pool from the affected account, mints shares in an attacker-controlled account, transfers the victim's funds into the pool and redeems. Times of these off-chain Lighter actions undisclosed | **T11.004** |
| 2026-11-16 06:44-09:35 | Attacker wallet receives small ETH amounts and 10,525.840384 USDC ([`0xe6b8e54bb04420c42b20062d6941813f02b7e09556c44cc6e27bf6abcd78ca07`](https://etherscan.io/tx/0xe6b8e54bb04420c42b20062d6941813f02b7e09556c44cc6e27bf6abcd78ca07)); purpose undisclosed | — |
| 2026-11-16 10:11:47 | [`0x5b6f27ded0e9a66ef6fa107083e28db9914e46d7635cc5112d760b9cb2f958c9`](https://etherscan.io/tx/0x5b6f27ded0e9a66ef6fa107083e28db9914e46d7635cc5112d760b9cb2f958c9): the attacker wallet calls `withdrawPendingBalance` on the Lighter proxy and receives 10,393,056.789298 USDC | **T11.004** |
| 2026-11-16 10:13:23-10:46:23 | USDC sold on CoW Settlement for ETH/WETH in six transactions, for ~5,764.47 ETH in total (first: [`0x0c4792dc149b597582f4fd05a7941303e1293d3821f2787aded600ae33179cb6`](https://etherscan.io/tx/0x0c4792dc149b597582f4fd05a7941303e1293d3821f2787aded600ae33179cb6)) | T7.002 |
| 2026-11-16 10:19:59 onward | ETH sent out in 160 ETH steps to many addresses, one example [`0xdedaf598b2f9a1c91377222acc50b3b62191eb02c8d1b16f6fd36003291345e0`](https://etherscan.io/tx/0xdedaf598b2f9a1c91377222acc50b3b62191eb02c8d1b16f6fd36003291345e0). RektRadar and GoPlus report part going through LI.FI to Hyperliquid accounts that bought XMR1; OAK did not verify the bridge leg | T7.001 |
| 2026-11-16 11:02:33 | Lighter: "a single compromised external party"; withdrawals and pool creation suspended | response |
| 2026-11-16 12:49:09 | Lighter: cause "a leaked API key for a specific trader's account"; Guardian mode enabled; Security Council upgrade to recover funds from "an additional withdrawal attempt"; attacker wallet named | response |
| 2026-11-16 18:20-18:21 | Post-mortem published; Guardian mode deactivated by the Security Council; deposits and withdrawals back to normal; ~5MM USDC returned to the affected trader | response |

Key addresses:

- Attacker-associated wallet (named by Lighter) — [`0xb3fffca23d4444eE73349825ACD84f7b5020e387`](https://etherscan.io/address/0xb3fffca23d4444eE73349825ACD84f7b5020e387)
- Lighter ZkLighter proxy (withdrawal source, per Blockscout label) — [`0x3b4d794a66304f130a4db8f2551b0070dfcf5ca7`](https://etherscan.io/address/0x3b4d794a66304f130a4db8f2551b0070dfcf5ca7)
- CoW Settlement contract (swap counterparty) — [`0x9008d19f58aabd9ed0d60971565aa8510560ab41`](https://etherscan.io/address/0x9008d19f58aabd9ed0d60971565aa8510560ab41)
- Account 714710 on-chain address (per GoPlus) — [`0x0d1D09312665D31Ed68231b88079a245E0458F6F`](https://etherscan.io/address/0x0d1D09312665D31Ed68231b88079a245E0458F6F)
- Account 714723 on-chain address (per GoPlus) — [`0x66Cf2f85115CC20bF439720927C1f93De9672068`](https://etherscan.io/address/0x66Cf2f85115CC20bF439720927C1f93De9672068)

## Fund flow

Ethereum leg traced by OAK with `tools/explorer.py` (Blockscout, keyless) on 2026-11-17. The 160 ETH step is one of many identical transfers from the attacker wallet to different addresses; only the first is drawn. Counterfeit-name token transfers from lookalike addresses in the same wallet's history were excluded. The Hyperliquid/XMR1 leg is relayed by GoPlus and RektRadar and is not drawn.

```oak-flow
as_of: 2026-11-17T12:00Z
nodes:
  - {id: lt, chain: ethereum, address: 0x3b4d794a66304f130a4db8f2551b0070dfcf5ca7, role: vulnerable-contract, label: "Lighter ZkLighter proxy"}
  - {id: atk, chain: ethereum, address: 0xb3fffca23d4444ee73349825acd84f7b5020e387, role: attacker-eoa, label: "Attacker-associated wallet"}
  - {id: cow, chain: ethereum, address: 0x9008d19f58aabd9ed0d60971565aa8510560ab41, role: dex, label: "CoW Settlement"}
  - {id: h1, chain: ethereum, address: 0x63d09d9bd23c3ed507771db8bdd65bf557fe968c, role: intermediary, label: "First 160 ETH recipient"}
edges:
  - {from: lt, to: atk, asset: USDC, amount: 10393056.789298, tx: 0x5b6f27ded0e9a66ef6fa107083e28db9914e46d7635cc5112d760b9cb2f958c9, time: 2026-11-16T10:11:47Z, technique: T11.004, verified: oak}
  - {from: atk, to: cow, asset: USDC, amount: 1000000, tx: 0x0c4792dc149b597582f4fd05a7941303e1293d3821f2787aded600ae33179cb6, time: 2026-11-16T10:13:23Z, technique: T7.002, verified: oak}
  - {from: cow, to: atk, asset: ETH, amount: 555.70795666, tx: 0x0c4792dc149b597582f4fd05a7941303e1293d3821f2787aded600ae33179cb6, time: 2026-11-16T10:13:23Z, technique: T7.002, verified: oak}
  - {from: atk, to: cow, asset: USDC, amount: 2000000, tx: 0x3b0c442b8826dc2dc940b9e5695d078332f3b3ac90c373aa99be20b2852b3d5b, time: 2026-11-16T10:14:23Z, technique: T7.002, verified: oak}
  - {from: cow, to: atk, asset: ETH, amount: 1111.26166626, tx: 0x3b0c442b8826dc2dc940b9e5695d078332f3b3ac90c373aa99be20b2852b3d5b, time: 2026-11-16T10:14:23Z, technique: T7.002, verified: oak}
  - {from: atk, to: cow, asset: USDC, amount: 5000000, tx: 0x2a5f6efd130af6900596069b4a48c74c0e1b1dc5742577482e42c59a590060d2, time: 2026-11-16T10:15:11Z, technique: T7.002, verified: oak}
  - {from: cow, to: atk, asset: ETH, amount: 2775.36677782, tx: 0x2a5f6efd130af6900596069b4a48c74c0e1b1dc5742577482e42c59a590060d2, time: 2026-11-16T10:15:11Z, technique: T7.002, verified: oak}
  - {from: atk, to: cow, asset: USDC, amount: 360000, tx: 0xc3f01db1cccc9e2c446e2e583ab2497d3f7628a0d9e1964126a877e9b1fdf200, time: 2026-11-16T10:17:23Z, technique: T7.002, verified: oak}
  - {from: cow, to: atk, asset: ETH, amount: 199.86535956, tx: 0xc3f01db1cccc9e2c446e2e583ab2497d3f7628a0d9e1964126a877e9b1fdf200, time: 2026-11-16T10:17:23Z, technique: T7.002, verified: oak}
  - {from: atk, to: cow, asset: USDC, amount: 23182.629682, tx: 0x0e22e5c723e4f6384d1f815eece9cf84a6e44da69b8e8092fa003d1528cd2958, time: 2026-11-16T10:46:23Z, technique: T7.002, verified: oak}
  - {from: cow, to: atk, asset: ETH, amount: 12.83610306, tx: 0x0e22e5c723e4f6384d1f815eece9cf84a6e44da69b8e8092fa003d1528cd2958, time: 2026-11-16T10:46:23Z, technique: T7.002, verified: oak}
  - {from: atk, to: cow, asset: USDC, amount: 2000000, tx: 0x2470732faf5b293e62f77cd7c4167733c9f6a097c1f4ec8e8b495bd12373fffd, time: 2026-11-16T10:16:11Z, technique: T7.002, verified: oak}
  - {from: cow, to: atk, asset: WETH, amount: 1109.43216487, tx: 0x2470732faf5b293e62f77cd7c4167733c9f6a097c1f4ec8e8b495bd12373fffd, time: 2026-11-16T10:16:11Z, technique: T7.002, verified: oak}
  - {from: atk, to: h1, asset: ETH, amount: 160, tx: 0xdedaf598b2f9a1c91377222acc50b3b62191eb02c8d1b16f6fd36003291345e0, time: 2026-11-16T10:19:59Z, technique: T7.001, verified: oak}
```

## Root-cause evidence

- **Technique:** OAK-T11.004 (nearest fit; see Techniques above)
- **Source:** <https://x.com/Lighter_xyz/status/2122311006604984497>; <https://x.com/Lighter_xyz/status/2122394446343946717>; <https://x.com/GoPlusSecurity/status/2122520900046319815>; <https://www.rektradar.xyz/web3-daily-exploits-17-nov-2026-lighter-10-4m-nonce/>
- **Source type:** operator
- **Confidence:** confirmed
- **Evidence:** Lighter's 12:49 UTC post says "a leaked API key for a specific trader's account". Its post-mortem article "Signing Safely on Lighter" says "The API keys leaked through the accounts' own signatures", that the code "reused signing nonces", and lists the four-step pool route. GoPlus and RektRadar repeat the nonce-reuse mechanism independently of how Lighter wrote it, but they derive from Lighter's account. Not stated by any source: when the nonces were reused, which signing code the traders ran, and the exact times of the pool actions. The ~\$15.48M two-account figure is GoPlus's and is unconfirmed by Lighter.

## Mitigations

- **Wallet signature for fund movement into public pools** (enforced in Lighter's contract/sequencer rules, not in the API-key holder's code): an API key alone can no longer transfer funds into a public pool. This breaks the step that converted the recovered key into a withdrawable balance in this incident.
- **Non-public API signatures, IP allowlists, per-key permissions and limits, nonce-reuse monitoring and voiding affected keys**: stated by Lighter as done or in progress; enforced server-side so a leaked key cannot switch them off.
- **Guardian mode**: the contract Guardian paused withdrawals on the anomaly, and Lighter says that allowed ~5MM USDC to be returned by the Security Council.

## Open questions

- No OAK Technique covers ECDSA/EdDSA signing-nonce reuse that exposes a private key from public signatures; T11.004 is the nearest and is a partial fit. Propose a Technique under T11 in `TAXONOMY-GAPS.md`.
- Lighter has not stated the number of affected accounts or the final realized loss.
- Which tx returned the ~5MM USDC, and what the "additional withdrawal attempt" was, are undisclosed.

## Public references

- `[lighterupdate2026]` — Lighter (@Lighter_xyz), update (2026-11-16): <https://x.com/Lighter_xyz/status/2122311006604984497>
- `[lighterfirst2026]` — Lighter (@Lighter_xyz), first notice (2026-11-16): <https://x.com/Lighter_xyz/status/2122284181422284986>
- `[lighterpostmortem2026]` — Lighter, "Signing Safely on Lighter: Lessons from November 16" (2026-11-16): <https://x.com/Lighter_xyz/status/2122394446343946717>
- `[lighterreopen2026]` — Lighter (@Lighter_xyz), withdrawals resumed (2026-11-16): <https://x.com/Lighter_xyz/status/2122394646164758654>
- `[goplus2026]` — GoPlus Security, "Lighter Incident Breakdown" (2026-11-17): <https://x.com/GoPlusSecurity/status/2122520900046319815>
- `[rektradar2026]` — RektRadar, "Web3 Daily Exploits 17 Nov 2026" (2026-11-17): <https://www.rektradar.xyz/web3-daily-exploits-17-nov-2026-lighter-10-4m-nonce/>
