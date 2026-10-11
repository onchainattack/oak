# Vulcan Forged wallet-server compromise — Polygon/Ethereum — December 2021

**Loss:** approximately 4.5M PYR, worth about \$140M at the time of the attack (about 9% of total PYR supply), taken from 96 wallets whose private keys were stolen `[theblockvulcan]`. The PYR price fell from about \$31 to \$24 `[theblockvulcan]`.
**OAK Techniques observed:** OAK-T11.001 (Third-Party Signing Vendor Compromise) — primary as classified in OAK; Vulcan Forged held user wallet private keys on its own infrastructure for wallets created through Venly, and Venly's CEO stated "Venly Servers or Solutions have not been compromised" `[theblockvulcan]`. OAK-T5.001 (Hard LP / Treasury Drain) — structurally co-occurring; the stolen keys allowed direct transfer of PYR (and possibly ETH and MATIC) out of the wallets.
**Attribution:** **unattributed** pseudonymous; the attacker has not been publicly identified. Vulcan Forged said it would reimburse affected users from its treasury; about half had been reimbursed per The Block on 2021-12-13 `[theblockvulcan]`, and the company said it had refunded "a majority" by 2021-12-14 `[forkastvulcan]`.
**Corrected 2026-10-11:** Wallet count is 96 (not 148); loss is 4.5M PYR (~\$140M at attack time, not a market-cap-impact figure); the claim of a full ~\$140M refund within days was replaced by the reported partial-refund status.
**Key teaching point:** Semi-custodial wallet architectures in which the operator stores user private keys create a concentrated extraction surface — one breach exposed 96 wallets' keys and the corresponding PYR balances. The Venly-as-wallet-provider topology adds a shared-responsibility dimension: Venly said its systems were not compromised, and The Block reports the keys were stolen without describing how `[theblockvulcan]`. Vulcan Forged said it would remove the semi-custodial setup so users manage their own keys `[theblockvulcan]`.

## Summary

On 2021-12-13, an attacker obtained the private keys for 96 Vulcan Forged user wallets and drained about 4.5M PYR (about \$140M at the time) `[theblockvulcan]` `[forkastvulcan]`. Vulcan Forged is a blockchain gaming and NFT platform; it created Ethereum, Polygon and VeChain wallets for users and held their private keys, using Venly (formerly Arkane Network) for wallet creation `[theblockvulcan]`. Venly's CEO said Venly's servers and solutions had not been compromised; the keys were stolen, but the sources consulted do not describe how `[theblockvulcan]`.

The PYR price fell roughly 22% on the news. Vulcan Forged said the project's treasury would send PYR and LAVA tokens to affected users via MetaMask accounts, with ETH/MATIC losses replaced in PYR; about half had been reimbursed at the time of The Block's report `[theblockvulcan]` and a majority by the next day per Forkast `[forkastvulcan]`.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2021-12-13 | Attacker obtains private keys for 96 user wallets and drains ~4.5M PYR `[theblockvulcan]` | T11.001 / T5.001 |
| 2021-12-13 | Vulcan Forged discloses; Venly states its systems were not compromised `[theblockvulcan]` | (operator response) |
| 2021-12-13 to 2021-12-14 | Treasury-funded refunds begin: about half reimbursed on 12-13, "a majority" per 12-14 report `[theblockvulcan]` `[forkastvulcan]` | (recovery — treasury-funded reimbursement) |

## Public references

- `[theblockvulcan]` — The Block, "96 private keys stolen from Vulcan Forged in \$140 million theft" (2021-12-13): <https://www.theblock.co/amp/post/127270/96-private-keys-stolen-from-vulcan-forged-in-140-million-theft>
- `[forkastvulcan]` — Forkast, "Vulcan Forged replaces token stolen in hack" (2021-12-14): <https://forkast.news/vulcan-forged-replaces-token-stolen-hack/>
- Cross-reference: T11.001 (Third-Party Signing Vendor Compromise) at `techniques/T11.001-third-party-signing-vendor-compromise.md`.
- Cross-reference: T5.001 (Hard LP / Treasury Drain) at `techniques/T5.001-hard-lp-treasury-drain.md`.

## Discussion

Vulcan Forged illustrates the semi-custodial wallet-server concentration surface: an operator holding private keys for a user population converts one breach into a multi-wallet simultaneous drain. Because the sources indicate the keys were held by Vulcan Forged and Venly reported no compromise, the T11.001 "third-party vendor compromise" mapping is questionable; an operator-side key-storage compromise may fit better. The earlier comparisons to other named treasury-funded reimbursements (EasyFi, bZx, Vee Finance) and the claim of a full ~\$140M refund were unsourced and are removed.
