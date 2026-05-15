# Kyle DeGods — Fake Hack / Insider Theft from Nuddies NFT Project — 2024-03

**Loss:** SOL stolen from Nuddies NFT project treasury. Project founder @kyledegods faked an external hack, stole treasury funds, and spent them on NFTs — then publicly performed devastation to holders.
**OAK Techniques observed:** OAK-T4 (Social Engineering/Phishing) — fake hack narrative to deceive project community; OAK-T9 (Smart Contract / Protocol Exploit) — insider treasury drain disguised as external attack.
**Attribution:** **confirmed** — @kyledegods, founder of Nuddies NFT project. ZachXBT investigation published April 2024.

**Key teaching point:** The Kyle DeGods case demonstrates the **fake hack insider theft** pattern: the project founder drains the treasury, fabricates a narrative of being hacked, and performs emotional distress to the community ("I'm devastated, my wallets were compromised") — while the stolen funds are spent on NFTs and personal purchases. The "hack" is a social engineering operation directed at the PROJECT'S OWN COMMUNITY, not at an external victim. Detection approach: when a project claims a hack, trace the stolen funds on-chain; if they flow to wallets with prior interactions with the founder or to NFT purchases on the founder's known accounts, the "hack" is self-inflicted.

## Summary

On March 3, 2024, Kyle (@kyledegods), founder of the Nuddies NFT project, made a post in his project's Discord server claiming his wallets had been hacked and project funds stolen. He publicly performed devastation and distress about the incident.

On-chain analysis by ZachXBT revealed the truth: Kyle himself stole the SOL from the project treasury and spent it on NFTs and personal purchases. The "hack" was entirely fabricated — there was no external attacker.

The deception was identified through standard on-chain tracing: the "stolen" funds flowed to wallets that interacted with Kyle's known addresses, and were spent on NFTs on marketplaces where Kyle was a known buyer.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2024-03-03 | Kyle posts in Nuddies NFT Discord claiming wallets hacked, treasury stolen | **T4 fake hack narrative** |
| 2024-03-03+ | Stolen SOL spent on NFTs from wallets traceable to Kyle | **T9 insider treasury drain** |
| 2024-04-02 | ZachXBT publishes investigation revealing fake hack | (public disclosure) |

## What defenders observed

- **Fake emotional performance as a deception technique.** Kyle's public distress (Discord posts about being "devastated") was part of the deception — it discouraged community members from investigating on-chain, because questioning a "victim" feels cruel. The emotional performance is a social engineering defense against scrutiny.
- **On-chain tracing defeats fake hack narratives.** The stolen funds were traced to NFT purchases on Kyle's known accounts. The blockchain trail doesn't support the "external attacker" narrative — the funds went to the founder's own wallets. On-chain forensics is the truth machine.
- **Project treasury as insider target.** NFT project treasuries (royalty accumulations, mint proceeds held by the team) are accessible to the founder with minimal oversight. The treasury is a single-signature wallet controlled by the founder — there is no multisig or community governance to prevent self-theft.

## What this example tells contributors

- **Fake hack is a T4 sub-technique directed at one's own community.** The social engineering target is not an external victim — it's the project's own holders, who are being deceived into accepting a loss as "unfortunate" rather than criminal. T4 should include "insider fake victim narrative" as a sub-pattern distinct from external phishing.
- **On-chain treasury drain forensics can validate or refute hack claims.** When a project claims to have been hacked, the forensic workflow is: trace stolen funds → identify destination wallets → check for interactions with team wallets → check spending patterns. If funds flow to team-linked wallets or team-associated spending (NFTs, exchanges with team KYC), the hack claim is false.
- **Project treasury single-signature is a governance vulnerability.** Any NFT project where the founder controls the treasury via a single signature has this attack surface. Multisig treasury with community signers is the mitigation.

## Public references

- [ZachXBT — Kyle DeGods Fake Hack Investigation (X/Twitter)](https://x.com/zachxbt/status/1775233644417741260)
- @kyledegods: founder of Nuddies NFT project.
- Fake hack claimed March 3, 2024. Investigation published April 2, 2024.
