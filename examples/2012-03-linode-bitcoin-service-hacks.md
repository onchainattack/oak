# Linode Server Compromise — Bitcoin Service Infrastructure Attacks — 2012-03-01/02

**Loss:** ~$228K in BTC across multiple Bitcoin services hosted on compromised Linode servers (~46,703 BTC at ~$4.89/BTC); losses concentrated at Bitcoinica (~43,554 BTC), Bitcoin Faucet, and several smaller services.
**OAK Techniques observed:** **OAK-T11.001** (Cloud/Hosting Credential Compromise — primary; Linode customer-support interface compromise enabled attacker access to administrative credentials for hosted Bitcoin services). **OAK-T5.001** (Hard LP Drain — the extracted BTC was swept from hot wallets of hosted services in single-transaction drains). **OAK-T8.005** (Operational-Security Procedural Failure — the shared-hosting concentration risk — multiple independent Bitcoin services hosted on a single infrastructure provider — was the structural vulnerability that converted a single-provider breach into a multi-service drain event).
**Attribution:** **pseudonymous** — the attacker was not publicly identified. Linode acknowledged the compromise of a customer-support interface via compromised credentials, which was used to access customer accounts. The Bitcoinica losses in this incident were additive to the May 2012 Bitcoinica breach (see `2012-05-bitfloor.md` and `2012-03-bitcoinica-exchange-hack.md`).
**Key teaching point:** **The Linode March 2012 compromise is the canonical early-Bitcoin-era demonstration of shared-hosting concentration risk: multiple independent Bitcoin services hosted at a single infrastructure provider were all compromised in a single provider-side breach. The incident is the structural predecessor to modern cloud-service concentration risk (T11.006.002, T6.007) and the earliest large-scale documentation of the principle that a host-level compromise is a multi-service compromise when Bitcoin services share infrastructure.**

## Summary

In early March 2012, Linode — a popular Linux VPS hosting provider widely used by early Bitcoin services — suffered a compromise of its customer-support interface. An attacker gained access to Linode's administrative interface, which provided root-level access to customer VPS instances. The attacker systematically targeted Bitcoin-related services hosted on Linode, extracting hot-wallet private keys from compromised servers.

Affected services included:

- **Bitcoinica** (~43,554 BTC, ~$213K at the time): The largest victim by BTC volume. The attacker accessed Bitcoinica's Linode-hosted server and extracted hot-wallet funds. Bitcoinica had previously lost ~$500K in a separate compromise and would later be hacked again in May 2012 (~$90K) before ceasing operations. The March 2012 Linode breach was one of three material breaches that collectively ended Bitcoinica.
- **Bitcoin Faucet:** Gavin Andresen's Bitcoin Faucet (which distributed small amounts of BTC to new users as an adoption mechanism) was hosted on Linode and lost its hot-wallet funds in the compromise.
- **Several smaller Bitcoin services:** Multiple other Bitcoin-related VPS instances on Linode were targeted in the same campaign.

The attacker's operational pattern — targeting Bitcoin-specific services on a single hosting provider — established an early precedent for the concentration-risk attack surface that would later scale to cloud providers (iCloud wallet backups, T11.006.002) and exchange-side custodial concentration (T11.001). The Linode case is the earliest documented example of infrastructure-layer concentration risk in the Bitcoin ecosystem.

Linode publicly acknowledged the compromise on March 2, 2012, and reset all customer passwords. The incident contributed to the early Bitcoin security community's understanding that hosting-provider security is a first-class custody surface — a lesson that would be relearned at larger scale in subsequent years.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| Pre-2012-03 | Multiple Bitcoin services — Bitcoinica, Bitcoin Faucet, and smaller operators — host VPS instances on Linode, the dominant early-Bitcoin-era VPS provider | **Shared-hosting concentration surface created** |
| 2012-03-01/02 | Attacker compromises Linode customer-support interface via compromised credentials; gains administrative access to customer VPS instances | **T11.001 credential compromise** |
| 2012-03-01/02 | Attacker targets Bitcoin-specific services hosted on Linode; extracts hot-wallet private keys; sweeps ~46,703 BTC from affected services | **T5.001 extraction** |
| 2012-03-02 | Linode publicly acknowledges compromise; resets all customer passwords | (provider incident response) |
| 2012-03 | Bitcoinica acknowledges ~43,554 BTC loss from Linode-hosted server; this is Bitcoinica's second material breach (after the ~$500K loss, before the May 2012 ~$90K breach) | **Multiple-breach operator failure** |
| 2012-03 onward | Bitcoin security community internalizes shared-hosting concentration risk as a first-class custody surface; multi-provider and dedicated-hardware deployment patterns gain adoption | (ecosystem learning) |

## Realised extraction

~46,703 BTC (~$228K at March 2012 prices). No public recovery. Perpetrator not publicly identified.

## Public references

- Linode public incident disclosure (March 2, 2012) — customer-support interface compromise acknowledgement.
- Bitcoinica incident acknowledgment — ~43,554 BTC loss attribution to Linode server compromise.
- BitcoinTalk forum threads (March 2012) — contemporaneous community discussion of the Linode compromise and affected services.
- Cross-reference: T11.001 (Credential Compromise) at `techniques/T11.001-credential-compromise.md`.
- Cross-reference: T8.005 (Operational-Security Procedural Failure) at `techniques/T8.005-operational-security-procedural-failure.md`.
- [`examples/2012-03-bitcoinica-exchange-hack.md`](../examples/2012-03-bitcoinica-exchange-hack.md) — Bitcoinica March 2012 breach (the largest Linode-compromise victim).
- [`examples/2011-07-mybitcoin.md`](../examples/2011-07-mybitcoin.md) — MyBitcoin shutdown, 2011 (the preceding early-exchange-failure precedent).
