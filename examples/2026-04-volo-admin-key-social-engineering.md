# Volo — a compromised vault admin key drained three vaults, with social engineering reported as the likely route — Volo / Sui — 2026-04-21

**Loss:** **~\$3.5M** from three vaults (WBTC, XAUm, USDC); independent breakdowns put it at about \$2.1M WBTC, \$0.9M XAUm and \$0.5M USDC ([Bitcoin.com News](https://news.bitcoin.com/volo-protocol-loses-3-5-million-in-sui-blockchain-exploit-blocks-wbtc-bridge-attempt/)). Rekt reports ~\$3.44M clawed back and a net loss of about \$60K, covered from Volo's treasury with none passed to users, per Volo's Recovery Update #5 ([Rekt](https://rekt.news/volo-rekt)). Another outlet gave a different recovery picture at a different date (see Public references); the Rekt figure is the latest opened.

**OAK Techniques observed:** **OAK-T11.014** (Operator Privileged-Key Compromise — *primary*. GoPlus, ExVul and Bitslab each pointed to a compromised high-privilege operator key, not a flaw in the audited contracts, and the attacker's transactions used privileged functions such as `withdraw_with_account_cap_v2` ([Bitcoin.com News](https://news.bitcoin.com/volo-protocol-loses-3-5-million-in-sui-blockchain-exploit-blocks-wbtc-bridge-attempt/)). See [`techniques/T11.014-operator-privileged-key-compromise.md`](../techniques/T11.014-operator-privileged-key-compromise.md)). **OAK-T15.001** (Social Engineering of Operator Personnel — *reported, not established*: GoPlus attributed the compromise to social engineering and related fraud targeting the vault's admin account ([Bitcoin.com News](https://news.bitcoin.com/volo-protocol-loses-3-5-million-in-sui-blockchain-exploit-blocks-wbtc-bridge-attempt/)); the other firms are reported as saying it was likely ([Tekedia](https://www.tekedia.com/volo-protocol-suffered-a-3-5m-exploit-targeting-sui-blockchain/)); Volo has published no post-mortem). The earlier file also declared an access-control misconfiguration Technique on the basis of no multisig or timelock; no opened page says that, so it is dropped.

**Attribution:** **unattributed.** Volo's Recovery Update #4 said the perpetrator had been identified but not named publicly ([Rekt](https://rekt.news/volo-rekt)).

**Key teaching point:** **One admin key was enough to drain three vaults, so keep vault-admin authority off any key a single person can lose to a social-engineering attempt.** Three audits and a bug bounty did not matter once the key moved: GoPlus, ExVul and Bitslab found no flaw in the contract code ([Bitcoin.com News](https://news.bitcoin.com/volo-protocol-loses-3-5-million-in-sui-blockchain-exploit-blocks-wbtc-bridge-attempt/)). Volo's own disclosure and fast ecosystem coordination are what limited the loss.

## Summary

On 2026-04-21 three Volo vaults on Sui were drained of WBTC, XAUm and USDC, about \$3.5M. Volo announced it itself before any researcher or alert bot flagged it, froze all vaults and notified the Sui Foundation; within 30 minutes it reported ~\$500K frozen ([Rekt](https://rekt.news/volo-rekt)). On 04-22 it said it had intercepted and blocked an attempt to bridge 19.6 WBTC ([Volo on X](https://x.com/volo_sui/status/2046825746706890970)). About \$28M in the other vaults was unaffected ([Bitcoin.com News](https://news.bitcoin.com/volo-protocol-loses-3-5-million-in-sui-blockchain-exploit-blocks-wbtc-bridge-attempt/)).

## Timeline (UTC)

**Entry**, **Take**, **Money**, **Response**. Sources give dates, not clock times; no transaction hash on an opened page beyond those Rekt prints, listed below.

| When | What happened | OAK |
|---|---|---|
| Before 2026-04-21 (undisclosed) | An admin key with vault authority is compromised; how is undisclosed. GoPlus attributes it to social engineering of the vault's admin account; others say likely. | **T15.001** (reported) |
| 2026-04-21 | Three vaults (WBTC, XAUm, USDC) are drained with privileged functions ([Bitcoin.com News](https://news.bitcoin.com/volo-protocol-loses-3-5-million-in-sui-blockchain-exploit-blocks-wbtc-bridge-attempt/)); Rekt lists two attack transactions (below). | **T11.014** |
| 2026-04-21 (within hours) | About \$1.55M USDC moves off Sui to Ethereum in six transactions over about 80 minutes through Circle's CCTP ([Rekt](https://rekt.news/volo-rekt)). | none — cross-chain move of proceeds |
| 2026-04-21 | Volo discloses on X, freezes the remaining vaults and notifies the Sui Foundation; ~\$500K reported frozen within 30 minutes ([Rekt](https://rekt.news/volo-rekt)). | response |
| 2026-04-22 | Volo intercepts and blocks the bridging of 19.6 WBTC (~\$2.1M) ([Volo on X](https://x.com/volo_sui/status/2046825746706890970)); Rekt places this on a LayerZero bridge. | response |
| 2026-04-21 to 22 | NAVI pauses and reopens within about 6.5 hours; Matrixdock confirms the gold backing XAUm is intact and later freezes XAUm in the attacker's address ([Rekt](https://rekt.news/volo-rekt)). | response |
| 2026-04-23 | QuillAudits publishes the first researcher-level analysis ([Rekt](https://rekt.news/volo-rekt)). | response |
| 2026-04-25 and 2026-04-28 | Recovery Update #4: 90% of stolen funds recovered in ETH, converted to stablecoins and bridged back to Sui. Update #5: remaining ~64.9 ETH recovered, net loss ~\$60K; 100.6 XAUm returned via the Sui Foundation and the 115 XAUm sold by the attacker to be reminted via Matrixdock ([Rekt](https://rekt.news/volo-rekt)). | response |

Key addresses (Sui addresses and transaction digests as printed by Rekt; Rekt labels the first address the attacker and the second the compromised admin account, while Bitcoin.com names the second address as the attacker's, so the roles are disputed):

- Attacker, per Rekt — [`0xd763599972ea5a8cfe53d182371ee010dc52ace7e39ccff7d8803ba7100fa46a`](https://suiscan.xyz/mainnet/account/0xd763599972ea5a8cfe53d182371ee010dc52ace7e39ccff7d8803ba7100fa46a)
- Compromised admin account per Rekt, attacker per Bitcoin.com — [`0xe76970bbf9b038974f6086009799772db5190f249ce7d065a581b1ac0adaef75`](https://suiscan.xyz/mainnet/account/0xe76970bbf9b038974f6086009799772db5190f249ce7d065a581b1ac0adaef75)
- Attacker EVM address (CCTP exit, per Rekt) — [`0x0FF50710e37C0Fb6AA9B4EeeCcAa1437562Af1ca`](https://etherscan.io/address/0x0FF50710e37C0Fb6AA9B4EeeCcAa1437562Af1ca)
- Attack transaction 1 (Rekt) — [`7pTrudZb57z2acJFvC2CnBCuaU6RA1UpU9auDZQEESit`](https://suiscan.xyz/mainnet/tx/7pTrudZb57z2acJFvC2CnBCuaU6RA1UpU9auDZQEESit)
- Attack transaction 2 (Rekt) — [`AQw9wMFfxSpDoF6YAfDhPLvKbdGSkxbGkc1DnZb43RUS`](https://suiscan.xyz/mainnet/tx/AQw9wMFfxSpDoF6YAfDhPLvKbdGSkxbGkc1DnZb43RUS)

## Root-cause evidence

- **Technique:** OAK-T11.014
- **Source:** <https://news.bitcoin.com/volo-protocol-loses-3-5-million-in-sui-blockchain-exploit-blocks-wbtc-bridge-attempt/>; <https://rekt.news/volo-rekt>; <https://www.tekedia.com/volo-protocol-suffered-a-3-5m-exploit-targeting-sui-blockchain/>
- **Source type:** news
- **Confidence:** corroborated
- **Evidence:** Three security firms (GoPlus, ExVul, Bitslab), relayed by Bitcoin.com News and Tekedia, independently point to a compromised high-privilege operator key and no contract flaw; SlowMist's classification, relayed by Rekt, is private key leakage. Social engineering as the route is GoPlus's attribution and only likely elsewhere, not established. Volo promised a full post-mortem; none was found, so how the key was obtained is undisclosed.

## Public references

- Volo, Recovery Update #2 (2026-04-22): <https://x.com/volo_sui/status/2046825746706890970>
- Rekt, "Volo - Rekt" (2026-04-28): <https://rekt.news/volo-rekt>
- Bitcoin.com News, "Volo Protocol Loses $3.5 Million in Sui Blockchain Exploit, Blocks WBTC Bridge Attempt" (2026-04-22): <https://news.bitcoin.com/volo-protocol-loses-3-5-million-in-sui-blockchain-exploit-blocks-wbtc-bridge-attempt/>
- Tekedia, "Volo Protocol Suffered a $3.5M Exploit Targeting Sui Blockchain" (2026-04-23): <https://www.tekedia.com/volo-protocol-suffered-a-3-5m-exploit-targeting-sui-blockchain/>
