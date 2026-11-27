# PlayDapp — PLA token minted by an unauthorised wallet, key compromise suspected — PlayDapp / Ethereum — 2024-02-09

**Loss:** **~\$290M** at market prices when minted, in two mints: 200M PLA (\$36.5M) on 2024-02-09 and 1.59B PLA (\$253.9M) on 2024-02-12 ([Elliptic](https://www.elliptic.co/blog/crypto-gaming-platform-playdapp-suffers-290-million-breach)). These are newly minted tokens, not drained reserves: circulating supply was 577M PLA before, so Elliptic expects the attacker to struggle to sell near pre-hack prices ([Elliptic](https://www.elliptic.co/blog/crypto-gaming-platform-playdapp-suffers-290-million-breach)). Recovery: none reported; PlayDapp planned a snapshot migration ([The Block](https://www.theblock.co/post/277334/crypto-gaming-platform-playdapp-loses-290-million-worth-of-tokens-in-two-exploits-elliptic)).

**OAK Techniques observed:** **OAK-T11.014** (Operator Privileged-Key Compromise — *primary, reported*; Elliptic says the first mint is "believed" to stem from a private key compromise ([Elliptic](https://www.elliptic.co/blog/crypto-gaming-platform-playdapp-suffers-290-million-breach)); the same cause is suggested by PeckShield per [BleepingComputer](https://www.bleepingcomputer.com/news/security/hackers-steal-290-million-in-crypto-from-playdapp-gaming-platform/)). See [`techniques/T11.014-operator-privileged-key-compromise.md`](../techniques/T11.014-operator-privileged-key-compromise.md). **OAK-T5.003** (Hidden-Mint Dilution — the loss is new supply minted by an unauthorised wallet). **OAK-T7.002** (CEX Deposit-Address Layering — Elliptic says tokens were sent to cryptoasset exchanges and other accounts; exchanges not named).

**Attribution:** **unattributed.** BleepingComputer says the scale has "hallmark traits" of Lazarus Group but does not confirm it, and the attack is not attributed to any known actor ([BleepingComputer](https://www.bleepingcomputer.com/news/security/hackers-steal-290-million-in-crypto-from-playdapp-gaming-platform/)).

**Key teaching point:** **Do not leave an externally owned key with the power to mint an unbounded amount of a live token, and alert on any mint that exceeds a fraction of circulating supply.** Here the second mint was 1.59B against 577M in circulation ([Elliptic](https://www.elliptic.co/blog/crypto-gaming-platform-playdapp-suffers-290-million-breach)), and it came three days after the first.

## Summary

On 2024-02-09 an unauthorised wallet minted 200M PLA ([Elliptic](https://www.elliptic.co/blog/crypto-gaming-platform-playdapp-suffers-290-million-breach)). PlayDapp said the PLA token contract had been hacked and moved its held tokens to a new wallet ([BleepingComputer](https://www.bleepingcomputer.com/news/security/hackers-steal-290-million-in-crypto-from-playdapp-gaming-platform/)). It sent on-chain messages offering a \$1M white-hat reward for return by 2024-02-13 03:00 ET, which the hacker did not take up ([The Block](https://www.theblock.co/post/277334/crypto-gaming-platform-playdapp-loses-290-million-worth-of-tokens-in-two-exploits-elliptic)). On 2024-02-12 the attacker minted 1.59B more PLA. How the key or access was obtained is undisclosed.

## Timeline (UTC)

Stages: **Entry** (undisclosed) → **Take** (two mints) → **Money** → **Response**.

| When | What happened | OAK |
|---|---|---|
| Before 2024-02-09 (undisclosed) | Attacker obtains the ability to mint PLA; a private key compromise is believed ([Elliptic](https://www.elliptic.co/blog/crypto-gaming-platform-playdapp-suffers-290-million-breach)) | **T11.014** (reported) |
| 2024-02-09 | 200M PLA minted by an unauthorised wallet, \$36.5M at the time ([Elliptic](https://www.elliptic.co/blog/crypto-gaming-platform-playdapp-suffers-290-million-breach)); transaction hash undisclosed in sources read | **T5.003** |
| 2024-02-09 to 02-10 | PlayDapp says the contract was hacked and moves its tokens to a new wallet ([BleepingComputer](https://www.bleepingcomputer.com/news/security/hackers-steal-290-million-in-crypto-from-playdapp-gaming-platform/)) | response |
| 2024-02-10 | On-chain messages offering \$1M white-hat reward if returned by 2024-02-13 ([BleepingComputer](https://www.bleepingcomputer.com/news/security/hackers-steal-290-million-in-crypto-from-playdapp-gaming-platform/)) | response |
| 2024-02-12 13:01:47 | 1.59B PLA minted, \$253.9M: [`0xc41687511e31f5612b73647c4b39e500e45dbfb2ae66789b7b8705d2336002f8`](https://etherscan.io/tx/0xc41687511e31f5612b73647c4b39e500e45dbfb2ae66789b7b8705d2336002f8) ([BleepingComputer](https://www.bleepingcomputer.com/news/security/hackers-steal-290-million-in-crypto-from-playdapp-gaming-platform/), [Elliptic](https://www.elliptic.co/blog/crypto-gaming-platform-playdapp-suffers-290-million-breach)) | **T5.003** |
| 2024-02-12 | Elliptic says tokens are already being sent to exchanges and other accounts; no exchange or address named ([Elliptic](https://www.elliptic.co/blog/crypto-gaming-platform-playdapp-suffers-290-million-breach)) | T7.002 |
| 2024-02-13 | PlayDapp pauses the PLA contract for a snapshot to migrate and suspends deposits and withdrawals; major exchanges freeze the hacker's wallets (exchanges unnamed) ([The Block](https://www.theblock.co/post/277334/crypto-gaming-platform-playdapp-loses-290-million-worth-of-tokens-in-two-exploits-elliptic), [BleepingComputer](https://www.bleepingcomputer.com/news/security/hackers-steal-290-million-in-crypto-from-playdapp-gaming-platform/)) | response |

Key addresses: none printed in full on the pages read; the minter wallet and PLA contract are undisclosed here.

## Root-cause evidence

- **Technique:** OAK-T11.014
- **Source:** <https://www.elliptic.co/blog/crypto-gaming-platform-playdapp-suffers-290-million-breach>; <https://www.bleepingcomputer.com/news/security/hackers-steal-290-million-in-crypto-from-playdapp-gaming-platform/>
- **Source type:** security-firm
- **Confidence:** reported
- **Evidence:** Elliptic calls a private key compromise "believed"; PlayDapp says the contract was hacked. No operator post-mortem on how the key was obtained was read. Price: PLA fell from \$0.18 to \$0.14 per BleepingComputer, and traded at \$0.15 on 2024-02-13 per The Block.

## Public references

- Elliptic (2024-02-12): <https://www.elliptic.co/blog/crypto-gaming-platform-playdapp-suffers-290-million-breach>
- The Block (2024-02-13): <https://www.theblock.co/post/277334/crypto-gaming-platform-playdapp-loses-290-million-worth-of-tokens-in-two-exploits-elliptic>
- BleepingComputer (2024-02-13): <https://www.bleepingcomputer.com/news/security/hackers-steal-290-million-in-crypto-from-playdapp-gaming-platform/>
