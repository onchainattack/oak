# MyBitcoin — web-wallet service shut down after a claimed breach, 51% reported stolen — MyBitcoin / Bitcoin — 2011-08-04

**Loss:** The operator said 51% of its total bitcoin holdings were stolen and that it would return the remaining 49% of each customer's balance ([Bitcoin Wiki](https://en.bitcoin.it/wiki/MyBitcoin)). No total in BTC appears on an opened page; [SiliconANGLE](https://siliconangle.com/?p=63037) estimated the site held about $250,000 worth of bitcoins. Whether the 49% was paid is undisclosed on the opened pages.

**OAK Techniques observed:** none — whether this was an outside breach or an operator exit is unproven, so neither a fraud nor an exploit Technique is declared.

**Attribution:** **pseudonymous** — the statement was signed "Tom Williams", a name also on the domain registration, which sat behind an offshore privacy service; [SiliconANGLE](https://siliconangle.com/?p=63037) says very little is known about this person. The [Bitcoin Wiki](https://en.bitcoin.it/wiki/MyBitcoin) says nobody verified that the "MyBitcoin LLC" (Nevis mailing address) existed.

**Key teaching point:** **Do not leave significant funds in a custodial web wallet whose solvency you cannot verify.** The Bitcoin Wiki notes there was never a way to verify that all balances were backed by coins in the master wallet, and [a BitcoinTalk thread](https://bitcointalk.org/index.php?topic=26260.0) from July 2011 had already argued that online wallet services invite fraud and theft.

## Summary

[Per the Bitcoin Wiki](https://en.bitcoin.it/wiki/MyBitcoin), MyBitcoin became inaccessible from 2011-07-29 and returned on 2011-08-04 to say its shopping cart interface had been compromised and that it was entering receivership; it later said 51% of holdings had been stolen. The statement dated 2011-08-04, as reported by [SiliconANGLE](https://siliconangle.com/?p=63037), said the security of its shopping-cart-interface system "had been breached" by an unknown attacker and referred to a claim process run online; the page does not carry the 51% figure. The wiki says the service presented itself as MyBitcoin LLC and that its terms promised to hold an identical quantity of unencumbered bitcoins for balances. SiliconANGLE says one user, reportedly Bruce Wagner, had 25,000 BTC there. A BitcoinTalk thread posted by jimrandomh on 2011-07-05 and bumped on 2011-08-02 says the disappearance was foreseeable; those are forum opinions, not findings.

## Timeline (UTC)

Stages: **Flaw**, **Take**, **Response**. Dates come from the Bitcoin Wiki and SiliconANGLE; times are undisclosed.

| When | What happened | OAK |
|---|---|---|
| Before 2011-07-29 (undisclosed) | Solvency never verifiable; shopping-cart-interface system later said to have been breached ([Bitcoin Wiki](https://en.bitcoin.it/wiki/MyBitcoin), [SiliconANGLE](https://siliconangle.com/?p=63037)) | none — breach vs exit unproven |
| 2011-07-29 | Site becomes inaccessible ([Bitcoin Wiki](https://en.bitcoin.it/wiki/MyBitcoin)) | none — breach vs exit unproven |
| 2011-08-04 | Site reappears with a statement of a breach and receivership; claim process announced ([SiliconANGLE](https://siliconangle.com/?p=63037)) | response |
| After 2011-08-04 (undisclosed) | Operator says 51% stolen and begins returning 49% of balances ([Bitcoin Wiki](https://en.bitcoin.it/wiki/MyBitcoin)); where the stolen coins went is undisclosed | none — breach vs exit unproven |

Key addresses: none; no address is printed in full on an opened page.

## Root-cause evidence

- **Technique:** none — breach vs exit unproven
- **Source:** <https://en.bitcoin.it/wiki/MyBitcoin>; <https://siliconangle.com/?p=63037>
- **Source type:** news
- **Confidence:** disputed
- **Evidence:** The only account of a breach is the operator's own statement. The wiki says the solvency claim could never be verified. No forensic source establishes either an outside attacker or an exit.

## Public references

- Bitcoin Wiki, "MyBitcoin": <https://en.bitcoin.it/wiki/MyBitcoin>
- SiliconANGLE, "Who is Tom Williams? MyBitcoin.com Reappears with Statement Claiming Site Was Hacked" (2011-08-05): <https://siliconangle.com/?p=63037>
- jimrandomh, "Online wallet services are an invitation to fraud and theft", BitcoinTalk (2011-07-05): <https://bitcointalk.org/index.php?topic=26260.0>
