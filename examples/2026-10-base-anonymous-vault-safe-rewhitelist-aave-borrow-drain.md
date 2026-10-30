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
| 2026-10-04, before 08:52 (undisclosed) | The attacker deploys a new contract (`0xcdFE91301356da873562EF513828a60dba1F569d`). Deployment time and funding are not published. | — |
| 2026-10-04 08:52 | The owner Safe removes the new contract from the vault whitelist, with three valid signature recoveries under the existing signer identities. | **T11.003** |
| 2026-10-04 08:53 | The owner Safe adds it back, again with three valid signatures. How the approvals were obtained is not established: stolen keys, misled signers or a legitimate actor are all open. | **T11.003** |
| About 70 seconds later | The whitelisted contract borrows aBaswstETH from the vault and sends it to the attacker's contract. Six outflows take 1,783.067 aBaswstETH in total, starting with a one-token transfer. | **T9.004** |
| 2026-10-04 | The attacker `0x0B5126e1bc27C0de77e02e97945760A674EdB034` redeems the aTokens through Aave V3 for about 1,783 wstETH (about \$6M). Part reportedly began bridging to Ethereum via Lido (unverified community tracking). | — |
| 2026-10-04 09:20 | Blockaid flags the exploit in progress at about \$2.02M across about 4 transactions. PeckShield follows at 09:56. | response |
| 2026-10-05 and after | No team claims the vault, acknowledges the loss, or announces a post-mortem, freeze, bounty or remediation (undisclosed). | response |

Key addresses:

- Vault (TransparentUpgradeableProxy) — [`0xD1895f2019c2152FC2b9022D57f19198c4CFCABC`](https://basescan.org/address/0xD1895f2019c2152FC2b9022D57f19198c4CFCABC)
- Attacker — [`0x0B5126e1bc27C0de77e02e97945760A674EdB034`](https://basescan.org/address/0x0B5126e1bc27C0de77e02e97945760A674EdB034)
- Contract that received the borrowed aBaswstETH — [`0xcdFE91301356da873562EF513828a60dba1F569d`](https://basescan.org/address/0xcdFE91301356da873562EF513828a60dba1F569d)
- Owner Safe address — full address not published

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
