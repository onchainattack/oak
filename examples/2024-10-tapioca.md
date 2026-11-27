# Tapioca DAO — contract ownership taken after a social-engineering attack, TAP vesting drained and USDO minted — Arbitrum — 2024-10-18

**Loss:** **~\$4.4M** per Rekt and Halborn (591 ETH and 2.8M USDC per Tapioca's report), **~\$4.7M** per DL News ([Rekt](https://rekt.news/tapioca-dao-rekt); [Halborn](https://www.halborn.com/blog/post/explained-the-tapioca-dao-hack-october-2024); [DL News](https://dlnews.com/articles/defi/tapioca-dao-hacks-its-hacker-after-north-korean-attack)). **Recovered:** the team did not receive a return from the attacker; it says it used a counter-exploit to take back ETH. DL News quotes the post-mortem for **996 ETH (\$2.7M)** ([DL News](https://dlnews.com/articles/defi/tapioca-dao-hacks-its-hacker-after-north-korean-attack)); Tapioca's Discord post, relayed by Rekt and Halborn, says 1000 ETH, which Rekt says was DAO collateral in Big Bang Origins used to mint USDO for the USDO/USDC LP ([Rekt](https://rekt.news/tapioca-dao-rekt)).

**OAK Techniques observed:** **OAK-T11.014** (Operator Privileged-Key Compromise — *primary*): the attacker took ownership of the TAP vesting contract and of the USDO stablecoin contract, then claimed and sold about 30M vested TAP and added a minter to mint USDO, draining the USDO/USDC pair ([Rekt](https://rekt.news/tapioca-dao-rekt), relaying Tapioca's statement). Halborn adds that the attacker "used a compromised key" ([Halborn](https://www.halborn.com/blog/post/explained-the-tapioca-dao-hack-october-2024)). See [`techniques/T11.014-operator-privileged-key-compromise.md`](../techniques/T11.014-operator-privileged-key-compromise.md). **OAK-T15.001** (Social Engineering of Operator Personnel): Tapioca called it a social-engineering attack; DL News, citing the post-mortem, says an engineer was tricked into downloading malware ([DL News](https://dlnews.com/articles/defi/tapioca-dao-hacks-its-hacker-after-north-korean-attack)). See [`techniques/T15.001-social-engineering-of-operator-personnel.md`](../techniques/T15.001-social-engineering-of-operator-personnel.md).

**Attribution:** **inferred-weak**. DL News reports that the post-mortem says a North Korean group was behind the attack ([DL News](https://dlnews.com/articles/defi/tapioca-dao-hacks-its-hacker-after-north-korean-attack)); the post-mortem itself returned 403 and was not read, and Halborn says the exact details had not been released ([Halborn](https://www.halborn.com/blog/post/explained-the-tapioca-dao-hack-october-2024)). ZachXBT said the incident is connected on-chain to other recent malware incidents ([ZachXBT on X](https://x.com/zachxbt/status/1847249205720408138)). Attacker address printed by Rekt: see Key addresses.

**Key teaching point:** **Ownership of a vesting contract and of a stablecoin's minter set should not sit behind one team member's machine.** Halborn recommends multisig wallets and least-privilege access controls to limit what a compromised key can do, and caution toward job offers that ask a developer to download and run code ([Halborn](https://www.halborn.com/blog/post/explained-the-tapioca-dao-hack-october-2024)).

## Summary

On 2024-10-18 0xTeun reported that an address had exploited the Emergency Rescue function on a vesting contract deployed by the Tapioca deployer ([0xTeun on X](https://x.com/0xTeun/status/1847235350915145888)). Rekt reports about 30M TAP withdrawn and swapped for 591 ETH, TAP falling 97%, and USDO minted by multicall to the USDO contract; the funds were bridged to BNB Chain ([Rekt](https://rekt.news/tapioca-dao-rekt)). Tapioca then said ownership of the vesting contract and of the USDO contract had been compromised through social engineering ([Rekt](https://rekt.news/tapioca-dao-rekt)). Tapioca offered a \$1M bounty for return by 2024-10-22, later revoked ([DL News](https://dlnews.com/articles/defi/tapioca-dao-hacks-its-hacker-after-north-korean-attack)). The team then recovered ETH from the attacker with a counter-exploit whose method it did not disclose ([DL News](https://dlnews.com/articles/defi/tapioca-dao-hacks-its-hacker-after-north-korean-attack)). The old claim that the attacker returned ~94% of funds is not in any source opened.

## Timeline (UTC)

Stages: **Entry**, **Take**, **Money**, **Response**. Times are X post timestamps where given.

| When | What happened | OAK |
|---|---|---|
| Before 2024-10-18 (undisclosed) | A team member is socially engineered; per DL News, tricked into downloading malware ([DL News](https://dlnews.com/articles/defi/tapioca-dao-hacks-its-hacker-after-north-korean-attack)) | **T15.001** |
| 2024-10-18 (time undisclosed) | The attacker takes ownership of the TAP vesting contract and the USDO contract ([Rekt](https://rekt.news/tapioca-dao-rekt)) | **T11.014** |
| 2024-10-18 (time undisclosed) | About 30M vested TAP claimed and sold for 591 ETH ([Rekt](https://rekt.news/tapioca-dao-rekt)); Rekt lists transactions [`0x8cf8def40fa2beab66f46863478bea71ad8f4512003caf2fa639cc5a00550753`](https://arbiscan.io/tx/0x8cf8def40fa2beab66f46863478bea71ad8f4512003caf2fa639cc5a00550753), [`0x1abb8cf0b0af2ce19a30ce5103d51269d4600d9aeba045260feb588db89d76a4`](https://arbiscan.io/tx/0x1abb8cf0b0af2ce19a30ce5103d51269d4600d9aeba045260feb588db89d76a4), [`0x174c3deaf563be1bb6d873ba279421e8588acc888ef672bafd5efe7441aae74f`](https://arbiscan.io/tx/0x174c3deaf563be1bb6d873ba279421e8588acc888ef672bafd5efe7441aae74f) as the vesting attack; it does not say which does what | **T11.014** |
| 2024-10-18 (time undisclosed) | A minter is added to USDO and USDO minted, draining the USDO/USDC pair; Rekt's USDO mint tx is [`0x0bca43cfb5b14ea039f2b329cb6074383d54ed8240963014ccb6400befa5a4e3`](https://arbiscan.io/tx/0x0bca43cfb5b14ea039f2b329cb6074383d54ed8240963014ccb6400befa5a4e3) ([Rekt](https://rekt.news/tapioca-dao-rekt)) | **T11.014** |
| 2024-10-18 11:16 | 0xTeun posts the first alert found ([0xTeun on X](https://x.com/0xTeun/status/1847235350915145888)) | — |
| After the drain (undisclosed) | Funds bridged from Arbitrum to BNB Chain; at Rekt's writing the address held about \$4.4M in BSC-USD and USDC ([Rekt](https://rekt.news/tapioca-dao-rekt)) | — |
| Within days (undisclosed) | Team announces on Discord it recovered 1000 ETH to the DAO multisig, crediting Seal911 and EnigmaDarkLabs ([Rekt](https://rekt.news/tapioca-dao-rekt)) | response |
| 2024-10-29 (article date) | Post-mortem reported: counter-exploit recovered 996 ETH; bounty revoked ([DL News](https://dlnews.com/articles/defi/tapioca-dao-hacks-its-hacker-after-north-korean-attack)) | response |

Key addresses:

- TAP vesting contract — [`0x2997C5ddD3070A46E9938261ce0A16a237121cb0`](https://arbiscan.io/address/0x2997C5ddD3070A46E9938261ce0A16a237121cb0)
- Exploiter — [`0x70285a11489bed93686410EBC727057CAfb8129D`](https://arbiscan.io/address/0x70285a11489bed93686410EBC727057CAfb8129D)
- USDO contract — [`0xEB99062643cA5Ab880c077288345E0B14B297432`](https://arbiscan.io/address/0xEB99062643cA5Ab880c077288345E0B14B297432)
- Address Rekt lists for the Arbitrum-to-BSC bridging — [`0x69d91e56ca80f2a4d7b808b59053ea5c5505ffe2`](https://bscscan.com/address/0x69d91e56ca80f2a4d7b808b59053ea5c5505ffe2)

## Root-cause evidence

- **Technique:** OAK-T11.014 (entry T15.001)
- **Source:** <https://rekt.news/tapioca-dao-rekt>; <https://dlnews.com/articles/defi/tapioca-dao-hacks-its-hacker-after-north-korean-attack>; <https://www.halborn.com/blog/post/explained-the-tapioca-dao-hack-october-2024>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Three secondary sources relay Tapioca's own account (ownership of the vesting and USDO contracts compromised through social engineering). The operator post-mortem was not readable (403), and Tapioca's X and Discord posts were not opened directly. How the key or ownership was obtained, and which transaction did what, is not established here.

## Public references

- Rekt, "Tapioca DAO" (2024-10-21): <https://rekt.news/tapioca-dao-rekt>
- DL News, "Can you hack a hacker? Tapioca DAO's \$2.7m counter exploit says yes" (2024-10-29): <https://dlnews.com/articles/defi/tapioca-dao-hacks-its-hacker-after-north-korean-attack>
- Halborn, "Explained: The Tapioca DAO Hack (October 2024)" (2024-10-22): <https://www.halborn.com/blog/post/explained-the-tapioca-dao-hack-october-2024>
- 0xTeun, alert (2024-10-18): <https://x.com/0xTeun/status/1847235350915145888>
- ZachXBT, connection to other incidents (2024-10-18): <https://x.com/zachxbt/status/1847249205720408138>
