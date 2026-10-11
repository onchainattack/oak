# Linode Server Compromise — Bitcoin Service Infrastructure Attacks — 2012-03-01/02

**Loss:** Over 46,703 BTC in total across Bitcoin services hosted on compromised Linode servers `[lnsilicon]`; Bitcoinica's CEO confirmed 43,554 BTC lost (about \$220,000 per `[bmlinode]`), Slush lost 3,000 BTC and Gavin Andresen lost 5 BTC from the Bitcoin Faucet `[bmlinode]``[lnreg]`. Linode said the intruder's activity was limited to eight customers, all with references to bitcoin `[lnreg]`.
**OAK Techniques observed:** **OAK-T11.001** (Cloud/Hosting Credential Compromise — primary; Linode customer-support interface compromise enabled attacker access to administrative credentials for hosted Bitcoin services). **OAK-T5.001** (Hard LP Drain — the extracted BTC was swept from hot wallets of hosted services in single-transaction drains). **OAK-T8.005** (Operational-Security Procedural Failure — the shared-hosting concentration risk — multiple independent Bitcoin services hosted on a single infrastructure provider — was the structural vulnerability that converted a single-provider breach into a multi-service drain event).
**Attribution:** **pseudonymous** — the attacker was not publicly identified in the cited sources. Linode described the access as coming through its "customer support interface" `[lnreg]`. The Bitcoinica losses in this incident are separate from its later May and July 2012 thefts (see `2012-03-bitcoinica-exchange-hack.md`).
**Key teaching point:** **The Linode March 2012 compromise is the canonical early-Bitcoin-era demonstration of shared-hosting concentration risk: multiple independent Bitcoin services hosted at a single infrastructure provider were all compromised in a single provider-side breach. The incident is the structural predecessor to modern cloud-service concentration risk (T11.006.002, T6.007) and the earliest large-scale documentation of the principle that a host-level compromise is a multi-service compromise when Bitcoin services share infrastructure.**
**Corrected 2026-10-11:** Loss now cites 46,703+ BTC total (Bitcoinica 43,554 BTC, Slush 3,000, Faucet 5 BTC) instead of ~\$228K at \$4.89; removed the unsupported prior-\$500K Bitcoinica loss, the root-access/key-extraction detail and the password-reset claim; Linode said eight bitcoin-related customers were touched.

## Summary

In early March 2012, Linode — a Linux VPS hosting provider used by early Bitcoin services — had an intruder obtain access via its customer support interface; The Register reported the crooks had obtained admin passwords for Linode's network gear, and Linode said activity was limited to eight customers, all referencing bitcoin `[lnreg]`. Earlier text here about root-level access to all customer VPS instances and "extracting hot-wallet private keys" is not stated in the cited sources.

Affected services included:

- **Bitcoinica** (43,554 BTC): the largest victim. Bitcoinica said its Linode-hosted hot wallet, containing over 10,000 BTC, was emptied on 2012-03-01 and that it was "committed to absorbing any loss" `[lnreg]`. The sentence in earlier text about a prior ~\$500K loss was based on an unsupported July 2011 incident and is removed; the 2012-05-11 breach took 18,500 BTC `[bmagain]`.
- **Bitcoin Faucet:** Gavin Andresen lost 5 BTC `[lnreg]``[bmagain]`. Slush also lost 3,000 BTC `[bmagain]`.
- Per Linode, eight customers in total were touched `[lnreg]`.

The attacker's operational pattern — targeting Bitcoin-specific services on a single hosting provider — established an early precedent for the concentration-risk attack surface that would later scale to cloud providers (iCloud wallet backups, T11.006.002) and exchange-side custodial concentration (T11.001). The Linode case is the earliest documented example of infrastructure-layer concentration risk in the Bitcoin ecosystem.

The Register reported the breach on 2012-03-02 and Linode said it would review and improve its security procedures `[lnreg]`. The claim that Linode reset all customer passwords is not supported by the cited sources.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|

| 2012-03-01 | Intruder obtains access via Linode's customer support interface `[lnreg]` | **T11.001 credential compromise** |
| 2012-03-01 | Bitcoin-hosting customers' wallets emptied; over 46,703 BTC in total `[lnsilicon]` | **T5.001 extraction** |
| 2012-03-02 | Press coverage; Linode says intruder touched eight bitcoin-related customers `[lnreg]` | (provider incident response) |
| 2012-03 | Bitcoinica confirms 43,554 BTC loss from its Linode-hosted hot wallet and says it will absorb it `[lnreg]` | **Multiple-breach operator failure** |
| 2012-03 onward | Bitcoin security community internalizes shared-hosting concentration risk as a first-class custody surface; multi-provider and dedicated-hardware deployment patterns gain adoption | (ecosystem learning) |

## Realised extraction

Over 46,703 BTC `[lnsilicon]`; no public recovery or perpetrator identification in the cited sources.

## Public references

- Linode public incident disclosure (March 2012) — cited via press coverage only; not re-verified.

- Cross-reference: T11.001 (Credential Compromise) at `techniques/T11.001-credential-compromise.md`.
- Cross-reference: T8.005 (Operational-Security Procedural Failure) at `techniques/T8.005-operational-security-procedural-failure.md`.
- [`examples/2012-03-bitcoinica-exchange-hack.md`](../examples/2012-03-bitcoinica-exchange-hack.md) — Bitcoinica March 2012 breach (the largest Linode-compromise victim).
- [`examples/2011-07-mybitcoin.md`](../examples/2011-07-mybitcoin.md) — MyBitcoin shutdown, 2011 (the preceding early-exchange-failure precedent).
- `[lnreg]` — The Register, "Linode bitcoin heist" (2012-03-02): <https://www.theregister.com/2012/03/02/linode_bitcoin_heist/>
- `[lnsilicon]` — SiliconANGLE, "Linode breach leads to massive heist of 46,000 BTC from Bitcoinica, Faucet" (2012-03-02): <https://siliconangle.com/2012/03/02/linode-breach-leads-to-massive-heist-of-46000-btc-from-bitcoinica-faucet/>
- `[bmlinode]` — Bitcoin Magazine, "The Bitcoinica Linode Theft and What It Means for Bitcoin" (2012-03-04): <https://bitcoinmagazine.com/articles/the-bitcoinica-linode-theft-and-what-it-means-for-bitcoin-1330805009>
- `[bmagain]` — Bitcoin Magazine, "Bitcoinica Stolen From Again" (2012-07-17): <https://bitcoinmagazine.com/articles/bitcoinica-stolen-from-again>
