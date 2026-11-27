# Counterfeit-token dust lures and poisoning transfers — Ethereum and BSC — 2022-07 to 2024-06

**Loss:** one measured figure, for the poisoning variant only: at least \$83.8 million across 6,633 successful address-poisoning incidents on Ethereum and BSC between 2022-07-01 and 2024-06-30, per [Tsuchiya et al.](https://arxiv.org/html/2501.16681v1). Counterfeit-token transfers are one of three transfer types that paper counts as poisoning; it does not give a separate dollar loss for them. No opened page gives a loss figure for fake-token lures that lead to a drained wallet.

**OAK Techniques observed:** **OAK-T6.006** (Counterfeit Token Impersonation — *primary*; tokens that imitate a legitimate asset are sent to victims). **OAK-T4.003** (Address Poisoning — per the paper, the counterfeit token plants a lookalike address in the victim's history, which the victim later copies). See [`techniques/T6.006-counterfeit-token-impersonation.md`](../techniques/T6.006-counterfeit-token-impersonation.md) and [`techniques/T4.003-address-poisoning.md`](../techniques/T4.003-address-poisoning.md). A drainer-kit approval Technique is not declared: neither page describes a drainer kit.

**Attribution:** **unattributed** (no deployer, kit or operator named by an opened page).

**Key teaching point:** **Show the contract address, or hide tokens that are not on an authentic-token list, so a token that only copies a name or symbol never looks like the real asset.** The paper says most scanners show token icons or warn on counterfeit tokens using a list of authentic contracts, and that this helps users tell them apart. It also found that Trust Wallet and Phantom did not display zero-value or counterfeit token transfers in its tests.

## Summary

Two opened pages describe two uses of fake tokens sent to wallets that nobody asked for. Neither names a campaign.

- **Lure to a malicious contract.** [Trezor](https://trezor.io/support/a/dusting-attacks-airdrop-scam-tokens) says attackers airdrop scam tokens or NFTs to wallets, often on Ethereum, Solana and BNB Smart Chain, and that these carry malicious smart contracts that can drain the wallet when the user tries to sell or transfer them. It describes fake tokens posing as USDT meant to make users believe they received a large sum by mistake. Its advice is to treat unexpected assets as a scam and not interact with them.
- **Planting a lookalike address.** [Tsuchiya, Dong, Soska and Christin](https://arxiv.org/html/2501.16681v1) (arXiv, submitted 2025-01-28) measure address poisoning over two years. They count about 118.4 million counterfeit-token transfers (about 9.87 million on Ethereum, 108.5 million on BSC), sent from a lookalike address with a modified name or symbol. A victim who later copies that address sends real assets to the attacker. The paper does not describe these counterfeit tokens as drainer contracts.

The $68M WBTC address-poisoning case has its own file: [`examples/2024-05-address-poisoning-68m.md`](2024-05-address-poisoning-68m.md). The bridge-mint case of the same Technique is [`examples/2026-04-hyperbridge-merkle-proof-counterfeit-mint.md`](2026-04-hyperbridge-merkle-proof-counterfeit-mint.md).

## Timeline (UTC)

| When | What happened | OAK |
|---|---|---|
| 2022-07-01 | Start of the paper's measurement window ([source](https://arxiv.org/html/2501.16681v1)) | — |
| 2022-07-01 to 2024-06-30 | Attackers send counterfeit-token, tiny and zero-value transfers from lookalike addresses; victims later copy the planted address (per the paper) | **T6.006**, **T4.003** |
| 2022-07-01 to 2024-06-30 | Fund movement for the \$83.8M of losses: undisclosed in the opened pages | — |
| Undated | Trezor Suite hides airdropped scam tokens in a separate "Hidden" section and advises not to interact with them ([source](https://trezor.io/support/a/dusting-attacks-airdrop-scam-tokens)) | response |
| 2025-01-28 | The paper is submitted to arXiv, recommending token lists as a help for users ([source](https://arxiv.org/html/2501.16681v1)) | response |

## Root-cause evidence

- **Technique:** OAK-T6.006, OAK-T4.003
- **Source:** <https://arxiv.org/html/2501.16681v1>; <https://trezor.io/support/a/dusting-attacks-airdrop-scam-tokens>
- **Source type:** independent-researcher
- **Confidence:** corroborated
- **Evidence:** The paper measures counterfeit-token transfers as a poisoning vector on two chains. Trezor, a hardware-wallet vendor, independently describes fake-token airdrops as a lure. The two do not describe the same mechanism and no single campaign is shown end to end.

## Public references

- Tsuchiya, Dong, Soska, Christin, "Blockchain Address Poisoning" (arXiv:2501.16681, 2025-01-28): <https://arxiv.org/html/2501.16681v1>
- Trezor Support, "Dusting attacks & airdrop scam tokens": <https://trezor.io/support/a/dusting-attacks-airdrop-scam-tokens>
