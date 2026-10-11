# Bitcoinica exchange server compromise — Bitcoin — 2012-03-01

**Loss:** ~43,000 BTC (then worth about \$220,000) taken from Bitcoinica's wallet when the hosting provider Linode was hacked on 2012-03-01; Bitcoinica kept running and guaranteed user deposits `[bmlinode]`. Bitcoinica was a Bitcoin margin-trading platform; later 2012 incidents (18,500 BTC on 2012-05-11 and 40,000 BTC plus 40,000 USD from its Mt. Gox account on 2012-07-13) are separate events `[bmagain]`. Earlier text here that the March loss was 43,554 BTC from the operator's Mt. Gox account through stolen Mt. Gox API keys on a Rackspace server, and that it triggered a California class action, is not supported by sources and has been removed; the 43,554 BTC figure appears in the Bitcoin Wiki's reference title `[bciwiki]`.
**OAK Techniques observed:** **OAK-T15.003** (Operator-Endpoint Compromise — the attacker reached Bitcoinica's wallet through a compromise of its hosting provider, Linode `[bmlinode]`). **OAK-T11.001** (retained from the earlier mapping; its fit to the March event is doubtful since the March theft was of a wallet hosted at Linode rather than API-key withdrawal; the API-key mechanism belongs to the July 2012 theft, see the Corrected note).
**Attribution:** **pseudonymous**. The attacker was not publicly identified in the cited sources. Zhou Tong, who ran Bitcoinica, was accused in connection with the breaches but denied setting the compromised password in the July case `[bmagain]`.
**Key teaching point:** **Bitcoinica was robbed three times in 2012 by three different routes — a hosting-provider compromise (March), a compromised email account (May) and a leaked API key reused as a password (July) — each draining the platform's custody. The API-key-as-custody pattern is specific to the July 2012 theft: the LastPass master password protecting the Mt. Gox credentials was identical to the Mt. Gox API key Bitcoinica's server used, and the server source code containing the key had been published days earlier, with no second factor on the LastPass account `[bmagain]`.**
**Corrected 2026-10-11:** The March 2012 loss came from the Linode hosting compromise (about 43,000 BTC), not stolen Mt. Gox API keys on a Rackspace server; the API-key theft was the separate July 2012 event, and the California class-action and \$2.6B notional claims were removed.

## Summary

Bitcoinica was a Bitcoin margin-trading platform that launched on 2011-09-08 `[bciwiki]`. On 2012-03-01 an intruder hacked Linode, the hosting provider used by Bitcoinica, Slush and the Bitcoin Faucet, and emptied their wallets: Bitcoinica lost 43,000 BTC (about \$220,000), Slush 3,000 BTC and the Faucet 5 BTC `[bmagain]`. Bitcoinica reimbursed users from reserves and kept operating `[bmlinode]``[bciwiki]`. See also `2012-03-linode-bitcoin-service-hacks.md`.

On 2012-05-11 an intruder used a compromised email account to take 18,500 BTC from Bitcoinica's hot wallet and deleted the account registry; Bitcoinica shut down and opened a claims process `[bmagain]`. On 2012-07-13 a thief withdrew the maximum possible from the Mt. Gox account holding Bitcoinica's remaining funds, 40,000 BTC and 40,000 USD (about \$350,000) `[bmagain]`. Claimants faced a 30% cut, and Zhou Tong separately paid 5,000 BTC to valid claimants `[bmagain]`.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2011-09-08 | Bitcoinica launches `[bciwiki]` | (surface creation) |
| 2012-03-01 | Linode hacked; Bitcoinica loses 43,000 BTC, Slush 3,000 BTC, Faucet 5 BTC `[bmagain]` | **T15.003** |
| 2012-05-11 | Compromised email account used to take 18,500 BTC from hot wallet `[bmagain]` | (separate incident) |
| 2012-07-13 | Mt. Gox account drained of 40,000 BTC and 40,000 USD via leaked API key / reused password `[bmagain]` | (separate incident; API-key custody surface) |

## Realised extraction

About 43,000 BTC in the March event; no attacker identification in the cited sources. Bitcoinica covered the March loss itself `[bmlinode]`.

## What defenders observed

- **March 2012:** the hosting provider was the single point of failure; wallets sitting on a third party's servers were emptied in one breach `[bmlinode]`.
- **July 2012:** a credential reused across a password manager and an API key, combined with published source code, turned a code leak into a custody loss; no second factor protected the password manager `[bmagain]`.
- **Claims:** the claims process was slow and ended with haircuts `[bmagain]`.

## Public references

- Zhou Tong (Bitcoinica operator), BitcoinTalk forum thread — public disclosure of the March 1, 2012 breach (not re-verified).
- BitcoinTalk forum — contemporaneous community discussion and victim self-reports (not re-verified).
- `[mtgoxapi2011]` — Mt. Gox API documentation (2011), context only.
- `[bmlinode]` — Bitcoin Magazine, "The Bitcoinica Linode Theft and What It Means for Bitcoin" (2012-03-04): <https://bitcoinmagazine.com/articles/the-bitcoinica-linode-theft-and-what-it-means-for-bitcoin-1330805009>
- `[bmagain]` — Bitcoin Magazine, "Bitcoinica Stolen From Again" (2012-07-17): <https://bitcoinmagazine.com/articles/bitcoinica-stolen-from-again>
- `[bciwiki]` — Bitcoin Wiki, "Bitcoinica" (accessed 2026-10-11): <https://en.bitcoin.it/wiki/Bitcoinica>

## Discussion

The case shows how the same operator can be robbed repeatedly through unrelated custody weaknesses. Contributors citing the "API-key-on-server" anti-pattern should anchor it to the July 2012 theft, not the March event.
