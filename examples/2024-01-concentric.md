# Concentric Finance — deployer-wallet private key stolen after social engineering, vault contracts upgraded to mint LP tokens and drain vaults — Concentric / Arbitrum — 2024-01-22

**Loss:** about \$1.7M (about 715 ETH, per [Revoke.cash](https://revoke.cash/exploits/concentric) and [crypto.news](https://crypto.news/concentric-app-suffers-1-7m-social-engineering-hack-on-arbitrum/)); [CertiK](https://www.certik.com/blog/concentric-fi-incident-analysis) gives \$1,851,668.89 (just over 780 ETH, including \$154,406.53 taken from users with open approvals), and Cointelegraph says CertiK's earlier alert put initial losses at about \$1.6M. The sources differ on the total and do not reconcile it. Recovery: none reported in the sources opened; Concentric offered a \$100k reward for information leading to recovery (Revoke.cash).

**OAK Techniques observed:** **OAK-T11.014** (Operator Privileged-Key Compromise — *primary*: the deployer wallet's key controlled contract ownership and upgrade, per CertiK and [Cointelegraph](https://cointelegraph.com/news/concentric-liquidity-manager-exploited-private-key-hack)). **OAK-T15.001** (Social Engineering of Operator Personnel — per Concentric, relayed by Revoke.cash and CertiK; the attacker posed as a recruiter). **OAK-T15.003** (Operator-Endpoint Compromise — per the same relayed Concentric account, malware disguised as a skills test exposed the key). See [`techniques/T11.014-operator-privileged-key-compromise.md`](../techniques/T11.014-operator-privileged-key-compromise.md).

**Attribution:** **inferred-weak.** CertiK links the exploiter wallet to the wallet behind the 2023-12-13 OKX DEX exploit and says the funder of a Concentric wallet is linked to the earlier UnoRe exploit; that links incidents, not a named actor. No source opened attributes the incident to a state actor or to OAK-G01; [crypto.news](https://crypto.news/concentric-app-suffers-1-7m-social-engineering-hack-on-arbitrum/) mentions none.

**Key teaching point:** **Do not leave contract ownership and upgrade rights on a single deployer key.** One key moved ownership and replaced the vault code. Per Concentric, as relayed by Revoke.cash, that key was exposed by malware installed from a fake recruiter's skills test.

## Summary

On 2024-01-22 an attacker used the private key of Concentric's deployer wallet to transfer contract ownership to a second address and upgrade the Cone pool vaults to a modified implementation. The new code let the attacker burn and mint CONE-1 LP tokens (`adminMint()`, `burn()`) and redeem them for vault assets; a second contract then drained users who had approved the vaults ([CertiK](https://www.certik.com/blog/concentric-fi-incident-analysis)). Concentric said the protocol was attacked "due to a targeted social engineering attack leading to the compromise of one of their teams admin wallets" (quoted by CertiK). Cyvers detected the activity ([crypto.news](https://crypto.news/concentric-app-suffers-1-7m-social-engineering-hack-on-arbitrum/)). The sources opened describe a single deployer or admin wallet, not a multisig.

## Timeline (UTC)

Stages: **Entry**, **Take**, **Money**, **Response**. Sources give a time only for the crypto.news article (18:42 UTC).

| When | What happened | OAK |
|---|---|---|
| Before 2024-01-22 (undisclosed) | Attacker poses as a recruiter and gets a team member to install malware disguised as a skills test, per Concentric via Revoke.cash (not independently verified) | **T15.001**, T15.003 |
| Before 2024-01-22 (undisclosed) | A wallet linked to the UnoRe exploit funds a Concentric wallet: [`0x5A58D1a81c73Dc5f1d56bA41e413Ee5288c65d7F`](https://arbiscan.io/address/0x5A58D1a81c73Dc5f1d56bA41e413Ee5288c65d7F) (CertiK) | — |
| 2024-01-22 | Deployer wallet (CertiK prints only `0xeaf6`, full address not published) transfers contract ownership to `0x3F06` (full address not published) | **T11.014** |
| 2024-01-22 | `0x3F06` upgrades the Cone pool contracts to implementation [`0xF36C407F3C467e9364Ac1b2486aA199751BA177D`](https://arbiscan.io/address/0xF36C407F3C467e9364Ac1b2486aA199751BA177D); new code burns CONE-1 from `0x60d8` and mints it to `0x105f` (both full addresses not published); `adminMint()` and `burn()` redeem for vault assets | **T11.014** |
| 2024-01-22 | Second attacker contract (controller [`0xc62A25462A61f02EBAB35Cd39C5E9651426e760b`](https://arbiscan.io/address/0xc62A25462A61f02EBAB35Cd39C5E9651426e760b)) pulls assets from users who approved the vaults; 65.4 ETH (about \$155,503) goes to [`0x5c0e945fc1c83d8d10e9c6366e2cbc5241532aec`](https://arbiscan.io/address/0x5c0e945fc1c83d8d10e9c6366e2cbc5241532aec) | **T11.014** |
| 2024-01-22 | `0x105f` swaps assets to 715 ETH split across three wallets, 300 ETH to a wallet linked to the OKX exploit (CertiK). No mixer use is reported in the sources opened | — |
| 2024-01-22 | Concentric posts that the exploiter is targeting approvals and asks users to revoke approvals to the vault addresses; says it will publish a post-mortem ([Cointelegraph](https://cointelegraph.com/news/concentric-liquidity-manager-exploited-private-key-hack)) | response |

Key addresses (as printed in full by CertiK):

- Malicious vault implementation — [`0xF36C407F3C467e9364Ac1b2486aA199751BA177D`](https://arbiscan.io/address/0xF36C407F3C467e9364Ac1b2486aA199751BA177D)
- Second attacker contract controller — [`0xc62A25462A61f02EBAB35Cd39C5E9651426e760b`](https://arbiscan.io/address/0xc62A25462A61f02EBAB35Cd39C5E9651426e760b)
- Cash-out wallet 1 — [`0xFD681A9aA555391Ef772C53144db8404AEC76030`](https://arbiscan.io/address/0xFD681A9aA555391Ef772C53144db8404AEC76030)
- Cash-out wallet 2 (labelled "OKX Exploiter 2" on Etherscan, per CertiK) — [`0x1F14E38666cDd8e8975f9acC09e24E9a28fbC42d`](https://arbiscan.io/address/0x1F14E38666cDd8e8975f9acC09e24E9a28fbC42d)
- Cash-out wallet 3 — [`0x17865c33e40814d691663bC292b2F77000f94c34`](https://arbiscan.io/address/0x17865c33e40814d691663bC292b2F77000f94c34)
- User-fund destination — [`0x5c0e945fc1c83d8d10e9c6366e2cbc5241532aec`](https://arbiscan.io/address/0x5c0e945fc1c83d8d10e9c6366e2cbc5241532aec)
- Funder of a Concentric wallet — [`0x5A58D1a81c73Dc5f1d56bA41e413Ee5288c65d7F`](https://arbiscan.io/address/0x5A58D1a81c73Dc5f1d56bA41e413Ee5288c65d7F)

## Root-cause evidence

- **Technique:** OAK-T11.014
- **Source:** <https://www.certik.com/blog/concentric-fi-incident-analysis>; <https://cointelegraph.com/news/concentric-liquidity-manager-exploited-private-key-hack>; <https://revoke.cash/exploits/concentric>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** CertiK, Cointelegraph and Revoke.cash agree that a compromised deployer or admin key was used to upgrade the vaults and mint LP tokens. The recruiter and fake-skills-test account is Concentric's own, relayed by Revoke.cash, and is not independently verified. I did not open Concentric's original post or post-mortem. The CertiK analysis was published 2024-01-23, one day after the incident.

## Public references

- CertiK, "Concentric.Fi Incident Analysis" (2024-01-23): <https://www.certik.com/blog/concentric-fi-incident-analysis>
- Cointelegraph, "Concentric liquidity manager exploited in private key hack" (2024-01-22): <https://cointelegraph.com/news/concentric-liquidity-manager-exploited-private-key-hack>
- crypto.news, "Concentric app suffers \$1.7M social engineering hack on Arbitrum" (2024-01-22): <https://crypto.news/concentric-app-suffers-1-7m-social-engineering-hack-on-arbitrum/>
- Revoke.cash, "Concentric exploit": <https://revoke.cash/exploits/concentric>
