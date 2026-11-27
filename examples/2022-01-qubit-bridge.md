# Qubit Bridge — a legacy deposit() accepted the zero address as token, minting qXETH on BNB Smart Chain with no ETH locked — Qubit Finance QBridge / Ethereum + BNB Smart Chain — 2022-01-27

**Loss:** **~\$80M** per [Halborn](https://halborn.com/explained-the-qubit-hack-january-2022/) and [Rekt](https://rekt.news/qubit-rekt); [Merkle Science](https://www.merklescience.com/blog/hack-track-analysis-of-qubit-finance-exploit) puts it at \$77.14M on its own on-chain analysis. The figures for the minted qXETH differ by source: Rekt reports 77,162 qXETH credited in one BSC transaction; Merkle Science reports 216,960.20 qXETH minted. Recovery: Rekt reports no return of funds and says Qubit "seems prepared to negotiate"; it notes a maximum Immunefi bounty of \$250k ([Rekt](https://rekt.news/qubit-rekt)).

**OAK Techniques observed:** **OAK-T10.002** (Message-Verification Bypass — *primary*). The Ethereum-side QBridge `deposit()` was called with a zero token address and no ETH; its `safeTransferFrom` call did not revert, the deposit completed and a `Deposit` event was emitted, and the bridge minted qXETH on BSC against it ([Halborn](https://halborn.com/explained-the-qubit-hack-january-2022/); [Rekt](https://rekt.news/qubit-rekt)). See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md).

**Attribution:** **pseudonymous** (Ethereum and BSC address [`0xd01ae1a708614948b2b5e0b7ab5be6afa01325c7`](https://etherscan.io/address/0xd01ae1a708614948b2b5e0b7ab5be6afa01325c7) per [Rekt](https://rekt.news/qubit-rekt) and [Merkle Science](https://www.merklescience.com/blog/hack-track-analysis-of-qubit-finance-exploit)). No source opened names a person or group.

**Key teaching point:** **A bridge entry point must prove the asset moved before it emits the event the other side mints against; a deposit function that was superseded must be removed, not left callable.** Qubit's post-mortem, as relayed by Rekt, says the old deposit function "should not be used after depositETH was newly developed, but it remained in the contract" ([Rekt](https://rekt.news/qubit-rekt)). Halborn draws the same conclusion about code review and change management ([Halborn](https://halborn.com/explained-the-qubit-hack-january-2022/)).

## Summary

Qubit Finance is a BSC-based lending protocol whose QBridge let users lock assets on Ethereum and borrow against them on BSC ([Rekt](https://rekt.news/qubit-rekt)). On 27 January 2022 the attacker called the legacy `deposit` function on the Ethereum QBridge ETH contract with data that passed its checks and with no ETH attached. The contract called `safeTransferFrom` on the token address; the Halborn write-up explains that the contract used a modified `safeTransferFrom()` built on a direct `call()`, and that against the zero address, which has no code, "the call is completed successfully without reverting" ([Halborn](https://halborn.com/explained-the-qubit-hack-january-2022/)). Merkle Science, citing CertiK, says the zero address passed the whitelist check ([Merkle Science](https://www.merklescience.com/blog/hack-track-analysis-of-qubit-finance-exploit)). The bridge treated the `Deposit` event as a real ETH deposit and minted qXETH on BSC. The attacker used the qXETH as collateral to borrow assets and swapped them into BNB; Rekt counts about 200k BNB (about \$80M) ([Rekt](https://rekt.news/qubit-rekt)). Rekt notes the feature had been audited by Theori in December 2021 ([Rekt](https://rekt.news/qubit-rekt)).

## Timeline (UTC)

**Flaw**, **Preparation**, **Take**, **Money**, **Response**. The 21:30 UTC start time is Rekt's ("approximately 21:30 PM +UTC on January 27th 2022"); Qubit's own post-mortem and CertiK's analysis were not opened, so other times are undisclosed here.

| When | What happened | OAK |
|---|---|---|
| Before 2022-01-27 | The legacy `deposit` function stays in the QBridge contract after `depositETH` is added; Qubit's post-mortem says it "should not be used after depositETH was newly developed, but it remained in the contract" ([Rekt](https://rekt.news/qubit-rekt)). A Theori audit of the X-Collateral feature is dated December 2021 ([Rekt](https://rekt.news/qubit-rekt)). | **T10.002** |
| Before the attack (time undisclosed) | The attacker's Ethereum address is funded from Tornado Cash in [`0x8d2e9fd13c3e3f59eac17ff55bb0a0b10eee965a2e768e60832b1b3d5b80ebfb`](https://etherscan.io/tx/0x8d2e9fd13c3e3f59eac17ff55bb0a0b10eee965a2e768e60832b1b3d5b80ebfb) ([Rekt](https://rekt.news/qubit-rekt)). | — |
| 2022-01-27 about 21:30 | The attacker calls `deposit` on the QBridge ETH contract with the zero token address and no ETH; the call does not revert and a `Deposit` event is emitted ([Halborn](https://halborn.com/explained-the-qubit-hack-january-2022/); [Rekt](https://rekt.news/qubit-rekt)). | **T10.002** |
| 2022-01-27 (time undisclosed) | The bridge mints qXETH on BSC to the same address; Rekt cites BSC transaction [`0x50946e3e4ccb7d39f3512b7ecb75df66e6868b9af0eee8a7e4b61ef8a459518e`](https://bscscan.com/tx/0x50946e3e4ccb7d39f3512b7ecb75df66e6868b9af0eee8a7e4b61ef8a459518e) crediting 77,162 qXETH ([Rekt](https://rekt.news/qubit-rekt)). The attacker repeats the deposit to build up qXETH ([Halborn](https://halborn.com/explained-the-qubit-hack-january-2022/)). | **T10.002** |
| 2022-01-27 (time undisclosed) | The qXETH is used as collateral; the attacker borrows WETH, BTCB, stablecoins, CAKE, BUNNY and MDX and swaps everything for about 200k BNB; Rekt says the BNB "remains in the BSC address" ([Rekt](https://rekt.news/qubit-rekt)). Merkle Science lists 16 token holdings and says the attacker swapped via PancakeSwap and sent 199 xETH to Ethereum mainnet ([Merkle Science](https://www.merklescience.com/blog/hack-track-analysis-of-qubit-finance-exploit)). | — |
| 2022-01-28 | Qubit identifies the attacker address ([Merkle Science](https://www.merklescience.com/blog/hack-track-analysis-of-qubit-finance-exploit)); Rekt publishes and says the team "seems prepared to negotiate" ([Rekt](https://rekt.news/qubit-rekt)). | response |
| As of 2022-02-01 | Merkle Science: "the ETH funds have not moved out of the attacker's wallet" ([Merkle Science](https://www.merklescience.com/blog/hack-track-analysis-of-qubit-finance-exploit)). Later movement of the funds is undisclosed in the sources opened. | — |

Key addresses:

- Attacker (Ethereum and BSC) — [`0xd01ae1a708614948b2b5e0b7ab5be6afa01325c7`](https://etherscan.io/address/0xd01ae1a708614948b2b5e0b7ab5be6afa01325c7) ([Rekt](https://rekt.news/qubit-rekt))
- Tornado funding tx — [`0x8d2e9fd13c3e3f59eac17ff55bb0a0b10eee965a2e768e60832b1b3d5b80ebfb`](https://etherscan.io/tx/0x8d2e9fd13c3e3f59eac17ff55bb0a0b10eee965a2e768e60832b1b3d5b80ebfb)
- qXETH credit tx on BSC — [`0x50946e3e4ccb7d39f3512b7ecb75df66e6868b9af0eee8a7e4b61ef8a459518e`](https://bscscan.com/tx/0x50946e3e4ccb7d39f3512b7ecb75df66e6868b9af0eee8a7e4b61ef8a459518e)

## Root-cause evidence

- **Technique:** OAK-T10.002
- **Source:** <https://halborn.com/explained-the-qubit-hack-january-2022/>; <https://rekt.news/qubit-rekt>; <https://www.merklescience.com/blog/hack-track-analysis-of-qubit-finance-exploit>
- **Source type:** security-firm
- **Confidence:** corroborated
- **Evidence:** Halborn, Rekt (quoting Qubit's post-mortem and CertiK) and Merkle Science agree on the mechanism: `deposit()` called with the zero token address and no ETH, `safeTransferFrom` not reverting, a `Deposit` event honoured by the bridge. Qubit's own post-mortem and CertiK's analysis were not opened directly. Loss and minted-amount figures differ between sources (see Loss); the attacker's later fund movement is not covered.

## Public references

- Halborn, "Explained: The Qubit Hack (January 2022)" (2022-01-31): <https://halborn.com/explained-the-qubit-hack-january-2022/>
- Rekt, "Qubit Finance - REKT" (2022-01-28): <https://rekt.news/qubit-rekt>
- Merkle Science, "Hack Track: Analysis of Qubit Finance Exploit" (2022-02-01): <https://www.merklescience.com/blog/hack-track-analysis-of-qubit-finance-exploit>
