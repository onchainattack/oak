# Anonymous Base vault — the owner Safe removed and re-added an attacker contract to the whitelist inside one minute, with three valid signatures each time — unidentified vault / Base (Aave V3) — 2026-10-04

**Loss:** **~1,783 wstETH (~\$6M)** — 1,783.067 aBaswstETH across six outflows (ExVul). Blockaid's first figure was ~\$2.02M while the drain was in progress. One report puts **~\$31.7M** of further assets in the vault at the time; that is exposure, not loss. Part of the proceeds reportedly began bridging to Ethereum via Lido (unverified community tracking).

**OAK Techniques observed:** **OAK-T11.003** (In-Use Multisig Smart-Contract Manipulation — *primary at the signing layer, mechanism unconfirmed*. The vault's owner **Safe** (seven signers) had been idle for **25 days**; at **08:52 UTC** it removed a newly deployed contract from the vault whitelist and at **08:53 UTC re-enabled it**, each with **three valid ECDSA recoveries under the same signer identities** (ExVul). The first borrow followed **~70 seconds later**. See [`techniques/T11.003-multisig-contract-manipulation.md`](../techniques/T11.003-multisig-contract-manipulation.md)). **OAK-T9.004** (Access-Control Misconfiguration — the whitelist was the vault's only gate on who could borrow against its Aave position). **Whether signer keys were stolen, signers were shown a misleading payload, or someone with legitimate access acted is not established.** Aave and Base are not implicated.

**Attribution:** **unattributed.** The vault's operator has not identified itself; no post-mortem, freeze or bounty has been announced.

**Disclosure note:** Immunefi's head of security said a **whitelist weakness had been identified the previous week**, but researchers had **no disclosure channel** for an operator that does not publish who it is.

**Key teaching point:** **A whitelist is as strong as the multisig that edits it, and an anonymous multisig cannot receive a warning.** Two signed whitelist changes in one minute after 25 days of silence is a pattern a transaction-monitoring rule catches before the borrow; a timelock on whitelist additions turns those 70 seconds into a window for someone to react.

## Summary

On 2026-10-04 an unidentified vault on Base (TransparentUpgradeableProxy [`0xD1895f2019c2152FC2b9022D57f19198c4CFCABC`](https://basescan.org/address/0xD1895f2019c2152FC2b9022D57f19198c4CFCABC)) lost ~1,783 wstETH. Its owner Safe whitelisted a freshly deployed contract, which borrowed aBaswstETH against the vault's Aave V3 position and forwarded it to [`0xcdFE91301356da873562EF513828a60dba1F569d`](https://basescan.org/address/0xcdFE91301356da873562EF513828a60dba1F569d); the attacker [`0x0B5126e1bc27C0de77e02e97945760A674EdB034`](https://basescan.org/address/0x0B5126e1bc27C0de77e02e97945760A674EdB034) redeemed it through Aave for wstETH. Blockaid flagged it at 09:20 UTC; PeckShield followed at 09:56 UTC.

## Timeline (UTC)

Read it as three stages. **Flaw**: the vault lets any whitelisted address borrow its Aave receipt tokens with no collateral. **Take**: the owner Safe whitelists a new contract, which borrows and forwards the tokens for redemption. **After**: no response from the vault's operator. Signing times are from ExVul as relayed by Blockfence and The Crypto Times; The Crypto Times could not be fetched (blocked), so its claims are used only where Blockfence repeats them.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-04 (undisclosed) | The vault ([`0xD1895f2019c2152FC2b9022D57f19198c4CFCABC`](https://basescan.org/address/0xD1895f2019c2152FC2b9022D57f19198c4CFCABC)) restricts borrowing against its Aave V3 position to a whitelist, but any whitelisted address can take its aBaswstETH with no collateral, so the whitelist is the only gate (Immunefi's head of security, via crypto.news). A researcher identified this weakness the previous week but had no disclosure channel. | **T9.004** |
| About 25 days before 2026-10-04 | The vault's owner Safe (three approvals needed from seven signers) last transacts, then stays idle (ExVul). | — |
| 2026-10-04, before 08:52 (undisclosed) | The attacker deploys a new contract (`0xcdFE91301356da873562EF513828a60dba1F569d`). Deployment time and funding are not published and were not traced. | — |
| 2026-10-04 08:52 | The owner Safe removes the new contract from the vault whitelist, with three valid signature recoveries under the existing signer identities. | **T11.003** |
| 2026-10-04 08:53 | The owner Safe adds it back, again with three valid signatures. How the approvals were obtained is not established: stolen keys, misled signers or a legitimate actor are all open. | **T11.003** |
| 2026-10-04 08:55:01 to 09:12:37 | The whitelisted contract borrows aBaswstETH from the vault and receives it. Six outflows take 1,783.067 aBaswstETH in total, starting with a one-token transfer (traced by OAK, first tx `0x0ec75c3be1f55bb08a92421796675e051993cdb6cbc38d5e33cc2b7f6ef2f491`). The contract forwards it all to the attacker, first at 08:56:25. | **T9.004** |
| 2026-10-04 09:23:13 | The attacker `0x0B5126e1bc27C0de77e02e97945760A674EdB034` redeems the aTokens through Aave V3 for 1,783.067 wstETH (about \$6M), tx `0x557bfd0e8530fd3e089748ccaabaa7837877f7578b13a377008474f2e367ee8c` (traced by OAK). | — |
| 2026-10-04 09:20 | Blockaid flags the exploit in progress at about \$2.02M across about 4 transactions. PeckShield follows at 09:56. | response |
| 2026-10-04 09:24 to 2026-10-09 | The attacker moves the wstETH to the fresh wallet `0xc73448432a05deea5ea18a07d3b5d9ccf6297f8d`, which burns all 1,783.067 on Base through a withdrawal bridge contract in three calls (traced by OAK). Arrival on Ethereum is the sources' claim (unverified community tracking via Lido). | — |
| 2026-10-05 and after | No team claims the vault, acknowledges the loss, or announces a post-mortem, freeze, bounty or remediation (undisclosed). | response |

Key addresses:

- Vault (TransparentUpgradeableProxy) — [`0xD1895f2019c2152FC2b9022D57f19198c4CFCABC`](https://basescan.org/address/0xD1895f2019c2152FC2b9022D57f19198c4CFCABC)
- Attacker — [`0x0B5126e1bc27C0de77e02e97945760A674EdB034`](https://basescan.org/address/0x0B5126e1bc27C0de77e02e97945760A674EdB034)
- Contract that received the borrowed aBaswstETH — [`0xcdFE91301356da873562EF513828a60dba1F569d`](https://basescan.org/address/0xcdFE91301356da873562EF513828a60dba1F569d)
- Hop wallet (wstETH) — [`0xc73448432a05deea5ea18a07d3b5d9ccf6297f8d`](https://basescan.org/address/0xc73448432a05deea5ea18a07d3b5d9ccf6297f8d) (traced by OAK)
- Base withdrawal bridge contract — [`0xac9d11cd4d7ef6e54f14643a393f68ca014287ab`](https://basescan.org/address/0xac9d11cd4d7ef6e54f14643a393f68ca014287ab) (traced by OAK)
- Owner Safe address — full address not published

## Fund flow

**Traced by OAK on 2026-10-30 over public Base JSON-RPC** (Base's Blockscout answers HTTP 403, so the tool uses its fallback). The tool's `transfers` and `trace` cover only allowlisted tokens, and aBaswstETH and wstETH are not on that list. OAK therefore read the `Transfer` logs of the two token contracts directly through the tool's own RPC helper, in the window 2026-10-04 08:40 to 2026-10-30, and checked each hash with `tx`. Native ETH is not visible over this provider; none was needed to follow the assets.

```oak-flow
as_of: 2026-10-30T13:00Z
nodes:
  - {id: vault, chain: base, address: 0xD1895f2019c2152FC2b9022D57f19198c4CFCABC, role: victim, label: "Vault (TransparentUpgradeableProxy)"}
  - {id: atk, chain: base, address: 0xcdFE91301356da873562EF513828a60dba1F569d, role: attack-contract, label: "Whitelisted borrower contract"}
  - {id: eoa, chain: base, address: 0x0B5126e1bc27C0de77e02e97945760A674EdB034, role: attacker-eoa, label: "Attacker"}
  - {id: aave, chain: base, address: 0x99cbc45ea5bb7ef3a5bc08fb1b7e56bb2442ef0d, role: lending, label: "aBaswstETH token (Aave V3 Base)"}
  - {id: hop, chain: base, address: 0xc73448432a05deea5ea18a07d3b5d9ccf6297f8d, role: intermediary, label: "Hop wallet (wstETH)"}
  - {id: brg, chain: base, address: 0xac9d11cd4d7ef6e54f14643a393f68ca014287ab, role: bridge, label: "Base withdrawal bridge contract (burns wstETH on Base)"}
  - {id: eth, chain: ethereum, role: unknown, label: "Ethereum, via Lido (unverified community tracking)"}
edges:
  - {from: vault, to: atk, asset: aBaswstETH, amount: 1783.067, tx: 0x0ec75c3be1f55bb08a92421796675e051993cdb6cbc38d5e33cc2b7f6ef2f491, time: 2026-10-04T08:55:01Z, tx_count: 6, time_last: 2026-10-04T09:12:37Z, technique: T9.004, verified: oak}
  - {from: atk, to: eoa, asset: aBaswstETH, amount: 1783.067, tx: 0x6001ea94e6a4e7ca6426066d8f10e6a2f4db5b8a471580710f81d9325082ae29, time: 2026-10-04T08:56:25Z, tx_count: 7, time_last: 2026-10-04T09:14:15Z, verified: oak}
  - {from: eoa, to: aave, asset: "aBaswstETH burned on redemption", amount: 1783.067, tx: 0x557bfd0e8530fd3e089748ccaabaa7837877f7578b13a377008474f2e367ee8c, time: 2026-10-04T09:23:13Z, verified: oak}
  - {from: aave, to: eoa, asset: wstETH, amount: 1783.067, tx: 0x557bfd0e8530fd3e089748ccaabaa7837877f7578b13a377008474f2e367ee8c, time: 2026-10-04T09:23:13Z, verified: oak}
  - {from: eoa, to: hop, asset: wstETH, amount: 1783.067, tx: 0xe824b27ca120908d145fd071e27f43f05aff541296d76c7772c3829398cf85d2, time: 2026-10-04T09:24:15Z, tx_count: 2, time_last: 2026-10-04T10:47:23Z, verified: oak}
  - {from: hop, to: brg, asset: wstETH, amount: 1783.067, tx: 0x9c55eed4b982de648578a463f889c49d2abeec501249629becb538e4a77281bc, time: 2026-10-04T09:27:29Z, tx_count: 3, time_last: 2026-10-09T13:55:53Z, verified: oak}
  - {from: brg, to: eth, asset: wstETH, time: 2026-10-05T00:00:00Z, verified: source, source: cryptonewsbasevault2026}
```

What the trace adds beyond the sources:

- **The hashes.** Six vault outflows to `0xcdFE91301356da873562EF513828a60dba1F569d` totalling 1,783.067 aBaswstETH: 1 (`0x0ec75c3be1f55bb08a92421796675e051993cdb6cbc38d5e33cc2b7f6ef2f491`, 08:55:01), 100 (`0xa08b02678971f1dd3ada15721fd760ceb2846270e5b23a5bc6aa983bab7b459b`, 09:08:13), 500 (`0x0832709749dbeddabcee648a936cac1d8456b8e0f0c45f3f0516e4ac66c0a154`, 09:09:21), 500 (`0x212dc5e03214abe70b5e37ffcb22c8dd8710e82397badf8f687d9164eaec80ac`, 09:10:19), 500 (`0x327e47ad60274fc3bde84ddbb054fde45b97a571fa4931be5d19a5ba5806543f`, 09:11:11) and 182.067 (`0xf1c9448c615122423c5f21aad2f690e76dfe7b9e9bfc320b1d36ef79a7a9cd7e`, 09:12:37). This matches the sources' six outflows and 1,783.067 total.
- **The contract forwards to the attacker.** The contract sent the same tokens on to `0x0B5126e1bc27C0de77e02e97945760A674EdB034` in seven transfers (1, 100, 500, 500, 500, 182 and 0.067, the last two from the same interest accrual), the first at 08:56:25. The attacker's EOA signed the calls into the contract (for example `0x6001ea94e6a4e7ca6426066d8f10e6a2f4db5b8a471580710f81d9325082ae29`).
- **Redemption is one transaction.** `0x557bfd0e8530fd3e089748ccaabaa7837877f7578b13a377008474f2e367ee8c` at 09:23:13 burns 1,783.067 aBaswstETH and pays 1,783.067 wstETH to the attacker. This is after Blockaid's 09:20 alert, and the drain itself ran 08:55 to 09:14, not as a single burst.
- **Where the wstETH went (new).** The attacker sent 1 wstETH (`0xe824b27ca120908d145fd071e27f43f05aff541296d76c7772c3829398cf85d2`, 09:24:15) and then 1,782.067 wstETH (`0x20fb64ee4adceee8fb3c36b2441a32b830917afc56fe7064b46f82a58f6be145`, 10:47:23) to the fresh wallet `0xc73448432a05deea5ea18a07d3b5d9ccf6297f8d`. That wallet then sent it, in three calls, to `0xac9d11cd4d7ef6e54f14643a393f68ca014287ab`, which burns the wstETH on Base and emits a message to the OP-stack message passer: 1 on 2026-10-04 (`0x9c55eed4b982de648578a463f889c49d2abeec501249629becb538e4a77281bc`), 1,000 on 2026-10-04 12:10:59 (`0x7b8560996d362fe1f3f0edec72ca3d84286163643172b135e485b184e3723e14`) and 782.067 on 2026-10-09 13:55:53 (`0xb59dbbcc0107e5e504f8127f50175f45633f33decbd4a4f17dca6ab651f9e669`). The total is 1,783.067, so every token was withdrawn toward Ethereum. This is consistent with the community claim of bridging to Ethereum. Not traced: whether and where the withdrawals finalised on Ethereum, and any swap or Lido step after that. The edge to Ethereum remains `verified: source`. OAK did not label `0xac9d11cd4d7ef6e54f14643a393f68ca014287ab` as Lido's.
- **Lookalikes skipped.** Two zero-value "transfers" from the attacker's address appear for `0xc7343adb400551ba927cffddf8589d52bf977f8d` and `0xc734821f2abb839e32c5bc47b9fe0c6c2adb0f8d`, both sharing the `0xc734` prefix and `f8d` suffix of the real hop wallet. They carry zero value, the transactions were sent by third parties, and the first has never sent a transaction. They are address-poisoning bait, not attacker wallets, and are not in the graph.
- **Tool gap.** aBaswstETH and wstETH are not on the allowlist in `tools/address_labels.yaml`, so `transfers` and `trace` return nothing for this incident. Adding them (aBaswstETH `0x99cbc45ea5bb7ef3a5bc08fb1b7e56bb2442ef0d`, wstETH `0xc1cba3fcea344f92d9239c08c0568f6f2f0ee452` on Base) is suggested.
- **Not checked.** The owner Safe's removal and re-add of the whitelist (08:52 and 08:53) were not read on-chain, because the Safe address is unpublished. The first borrow at 08:55:01 is consistent with "about 70 seconds" only if the re-add landed near 08:53:50. Whether the 1-token borrow was a test is not established. Dollar figures are the sources' (about \$6M); OAK states amounts only.

## Root-cause evidence

- **Technique:** OAK-T11.003
- **Source:** <https://www.cryptotimes.io/2026/10/04/base-vault-hack-6m-in-wsteth-drained-after-attacker-gains-whitelist-access/>; <https://blockfence.io/anonymous-base-vault-loses-6m-after-multisig-re-whitelists-attacker-contract/>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** ExVul's trace shows the owner Safe removed and re-added the attacker contract to the whitelist one minute apart with three valid signatures each time. Whether keys were stolen or signers were misled is unknown; the operator has not identified itself. Both articles rest on the same firm's analysis.

## Public references

- `[cryptotimesbasevault2026]` — The Crypto Times, "Base Vault Hack: \$6M in wstETH Drained After Attacker Gains Whitelist Access" (2026-10-04): <https://www.cryptotimes.io/2026/10/04/base-vault-hack-6m-in-wsteth-drained-after-attacker-gains-whitelist-access/>
- `[cryptonewsbasevault2026]` — crypto.news, "Base vault's \$6M exploit exposes a disclosure gap: Immunefi": <https://crypto.news/base-vault-6m-exploit-exposes-disclosure-gap-immunefi>
- `[blockfencebasevault2026]` — Blockfence, "Anonymous Base Vault Loses \$6M After Multisig Re-Whitelists Attacker Contract": <https://blockfence.io/anonymous-base-vault-loses-6m-after-multisig-re-whitelists-attacker-contract/>
