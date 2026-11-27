# Permit2 signature phishing — a signed Permit2 message lets an attacker pull a wallet's tokens — Ethereum / EVM — 2023–2024

**Loss:** two sourced members. A PEPE holder lost \$1.39M in PEPE, MSTR and APU tokens on 2024-10-13 ([Decrypt](https://decrypt.co/286076/pepe-uniswap-permit2-phishing-attack)). A phishing-kit operator tracked by Scam Sniffer was reported to have stolen about \$5.9M from about 4,888 victims through more than 689 phishing sites created since 2023-03-27, across Ethereum, Arbitrum, Polygon and BNB Chain ([Cointelegraph](https://cointelegraph.com/news/inferno-drainer-scam-as-a-service-has-stolen-5-9m-since-march-report)). No source opened gives a Permit2-specific total across all incidents. Scam Sniffer's 2024 figures (\$494M of wallet-drainer losses, Permit signatures 56.7%) describe EIP-2612 Permit signatures, not Permit2 ([BleepingComputer](https://www.bleepingcomputer.com/news/security/cryptocurrency-wallet-drainers-stole-494-million-in-2024/)).

**OAK Techniques observed:** **OAK-T4.001** (Permit2 Signature-Based Authority Misuse — *primary*; the victim signs an off-chain Permit2 message on a phishing site and the attacker submits it on-chain to move tokens). See [`techniques/T4.001-permit2-authority-misuse.md`](../techniques/T4.001-permit2-authority-misuse.md). The earlier tags for verified-but-malicious frontend routing and compromised-frontend permit solicitation were removed: no opened page says the phishing sites routed through a verified contract in the sense of that Technique's page, and the sites were attacker-operated, not compromised.

**Attribution:** **pseudonymous.** Cointelegraph reports that the 2023 phishing sites were built from code sold by an operator for a 20% cut of proceeds; the operator is not named in OAK. The 2024 theft has no named attacker; Decrypt gives a destination address only.

**Key teaching point:** **A wallet must show the spender, token and amount of a Permit2 signature in plain words before it is signed, and treat the request like an on-chain approval.** Decrypt reports that the signature looks harmless, that nothing suspicious shows on chain at signing time, and that Permit2 authorises the full token balance by default unless the user sets a limit.

## Summary

Permit2 is a Uniswap contract at `0x000000000022D473030F116dDEE9F6B43aC78BA3` on nearly every chain Uniswap supports (zkSync uses a different address). It combines two modules: SignatureTransfer, which authorises a single nonce-scoped transfer with one signature, and AllowanceTransfer, which stores a time-bound standing allowance, per [Uniswap's documentation](https://developers.uniswap.org/docs/protocols/permit2/overview). After a one-time ERC-20 approval of Permit2, a signed message is enough for a spender to move the user's tokens.

Phishing sites ask the user to sign such a message. Decrypt reports that the victim of the October 2024 theft unknowingly signed an off-chain Permit2 signature on a phishing page, and that the signature authorised the attacker to call Permit and TransferFrom on the Permit2 contract. Cointelegraph reports Scam Sniffer found a screenshot of a drain of about \$103,000 it tied to a Permit2 exploit in May 2023, and traced the exploiter's address to phishing sites.

## Timeline (UTC)

Stages: **Entry** (phishing page), **Take** (signature submitted and tokens moved), **Money**, **Response**. The two members are separate incidents shown in order.

| When | What happened | OAK |
|---|---|---|
| 2023-03-27 onward | Phishing sites tied to one kit operator begin to appear; Scam Sniffer counts more than 689 by mid-May 2023. [Cointelegraph](https://cointelegraph.com/news/inferno-drainer-scam-as-a-service-has-stolen-5-9m-since-march-report) | **T4.001** |
| 2023-05 (day undisclosed in the article) | Scam Sniffer, alerted by a user who found a promoter in its Telegram channel, finds a screenshot of a drain of about \$103,000 and ties it to a Permit2 exploit; the transaction hash leads to an exploiter address linked to phishing sites. Scam Sniffer reports about \$5.9M from about 4,888 victims in total. [Cointelegraph](https://cointelegraph.com/news/inferno-drainer-scam-as-a-service-has-stolen-5-9m-since-march-report) | **T4.001** |
| 2024-10-13 | A PEPE holder signs a malicious Permit2 signature on a phishing site; \$1.39M of PEPE, MSTR and APU is taken. Scam Sniffer posts about it on X. [Decrypt](https://decrypt.co/286076/pepe-uniswap-permit2-phishing-attack) | **T4.001** |
| 2024-10-13, within about one hour | The stolen tokens move to a new wallet, `0x3076ce666f707776aaf75f6c44f8c4085375a66f` ([Etherscan](https://etherscan.io/address/0x3076ce666f707776aaf75f6c44f8c4085375a66f)). Later movement is undisclosed. [Decrypt](https://decrypt.co/286076/pepe-uniswap-permit2-phishing-attack) | — |
| 2024-10-14 | Decrypt publishes; Uniswap had not replied to its request for comment. No recovery is reported. | response |

## Root-cause evidence

- **Technique:** OAK-T4.001
- **Source:** <https://decrypt.co/286076/pepe-uniswap-permit2-phishing-attack>; <https://cointelegraph.com/news/inferno-drainer-scam-as-a-service-has-stolen-5-9m-since-march-report>; <https://developers.uniswap.org/docs/protocols/permit2/overview>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** Two news articles relaying Scam Sniffer's findings establish that Permit2 signatures solicited by phishing sites were used to drain wallets in 2023 and 2024. Uniswap's documentation establishes how the contract works. Undisclosed: transaction hashes for the 2024 theft (none printed), the attacker's identity, and any Permit2-specific loss total.

## Public references

- Decrypt, "Pepe Holder Loses \$1.4 Million in Uniswap Permit2 Phishing Attack" (2024-10-14): <https://decrypt.co/286076/pepe-uniswap-permit2-phishing-attack>
- Cointelegraph, Inferno Drainer scam-as-a-service has stolen \$5.9M since March (2023-05-19): <https://cointelegraph.com/news/inferno-drainer-scam-as-a-service-has-stolen-5-9m-since-march-report>
- Uniswap, Permit2 overview: <https://developers.uniswap.org/docs/protocols/permit2/overview>
- BleepingComputer, "Cryptocurrency wallet drainers stole \$494 million in 2024" (2025-01-05; Permit 56.7%, not Permit2): <https://www.bleepingcomputer.com/news/security/cryptocurrency-wallet-drainers-stole-494-million-in-2024/>
