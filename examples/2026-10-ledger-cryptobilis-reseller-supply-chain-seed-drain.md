# Ledger / CryptoBilis — every reported victim bought from one authorised reseller, so the shared factor was the distribution channel, not the device line — CryptoBilis (Ledger reseller, Southeast Asia) / Ethereum, Tron, Bitcoin — 2026-10-09

**Loss:** **unconfirmed; analyst estimates \$72M–~\$90M.** Specter puts it **above \$86M** (the most-cited figure), tanuki42 **above \$72M**, MistTrack **almost \$90M**. Chain INK counts **98 victim wallets** (~\$888K average); Specter describes inflows from "hundreds" of victim wallets across Ethereum, Tron and Bitcoin. **Ledger has confirmed no amount.** Later estimates: **Bitquery ~\$93M across ~310 wallets** (figures vary slightly between reports). Chainalysis traced **60 BTC (~\$4.9M)** drained from three wallets of a task-scam operator to the same devices (2026-10-16). Arkham shows ten USDT transfers of \$0.5M–\$2.4M into one Tron address from ~06:00 UTC.

**OAK Techniques observed:** **OAK-T11.007** (Hardware-wallet Supply-chain / Physical-access Compromise — *primary at the parent level, inferred from the victim set*. Ledger's own statement scopes the problem to **customers of one reseller**, says **no reports involve devices bought directly from Ledger**, and says its infrastructure was not compromised. A loss cluster bounded by purchase channel is the T11.007 signature. See [`techniques/T11.007-hardware-wallet-supply-chain-physical-access-compromise.md`](../techniques/T11.007-hardware-wallet-supply-chain-physical-access-compromise.md)). **Updated 2026-10-17 — implant confirmed.** On 2026-10-10 Ledger stated that **"one of the impacted users' devices contained an unauthorized hardware implant."** Tibane Labs' teardown describes a microcontroller with an eSIM and shielded LTE module wired to the screen's internal data lines, in two variants (one under a smaller replacement battery, one under the OLED padding); Karpelès found the component behind the display of a Nano X bought in Malaysia. The Secure Element is intact, which is why Ledger's genuine check cannot see it. **Sub-Technique still not assigned, for a different reason now:** this is a *genuine device with hardware added*, which is neither T11.007.001 (counterfeit substitution) nor T11.007.002 (extraction from the chip). It is recorded as a candidate in `TAXONOMY-GAPS.md`. Ledger has **not** established that the implant caused all the losses, how or when devices were altered, or who did it; Monahan's earlier phishing explanation (T11.007.003) is no longer the leading account but is not excluded for individual victims. **OAK-T7.001** (Mixer-Routed Hop — ~430 ETH of the proceeds went to Tornado Cash. See [`techniques/T7.001-mixer-routed-hop.md`](../techniques/T7.001-mixer-routed-hop.md)).

**Attribution:** **unattributed.** Ledger has made no accusation against CryptoBilis; whether the reseller was complicit, had an insider, or was supplied tampered stock is unknown.

**Key teaching point:** **"Authorised reseller" moves the trust boundary to the reseller's stockroom.** A genuine-check that attests the secure element says nothing about what else is inside the case. Ledger's remediation — new device, **new seed**, from a channel outside the affected one — is the only response that works if the seed was captured at setup: moving funds to another address under the same seed does nothing.

## Summary

From the morning of 2026-10-09 (UTC), Ledger users in Southeast Asia reported emptied wallets. At 13:32 UTC Ledger said it was investigating "a specific issue concerning CryptoBilis," a reseller that claims to be the authorised Ledger reseller in Malaysia, and told it to pause all sales and shipments. Buyers from the past 90 days were told not to set up their devices; those who had were told to move assets to a new Ledger with a new seed phrase. Tether reportedly froze linked USDT (per MistTrack); the attacker swapped some USDT to USDD, and ~430 ETH entered Tornado Cash (Onchain Lens).

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| ≤ 90 days prior | Devices sold through CryptoBilis | **T11.007** (channel) |
| 2026-10-09 ~06:00 | USDT sweeps from victim wallets into one Tron address begin | (extraction) |
| 2026-10-09 | Specter / tanuki42 / MistTrack publish estimates | (detection) |
| 2026-10-09 13:32 | Ledger statement; CryptoBilis sales paused | (operator response) |
| 2026-10-09 | USDT freeze reported; USDD swaps; ~430 ETH to Tornado Cash | **T7.001** |
| 2026-10-10 | Ledger confirms an unauthorised hardware implant in one impacted device | **T11.007** (confirmed) |
| 2026-10-13 | Ledger asks Southeast Asia and Hong Kong resellers to pause; reviews sales policies | (operator response) |
| 2026-10-16 | SlowMist flags fake "Ledger firmware update" phishing using the incident as a lure | **T11.007.003** (follow-on) |

## Root-cause evidence

- **Technique:** OAK-T11.007
- **Source:** <https://x.com/Ledger/status/2109331538072494364>; <https://www.bleepingcomputer.com/news/security/ledger-confirms-hardware-wallet-spy-implant-behind-crypto-thefts/>
- **Source type:** operator
- **Confidence:** corroborated
- **Evidence:** Ledger scopes the drains to devices sold through CryptoBilis and (2026-10-10) confirms an unauthorised hardware implant in one impacted device; Tibane Labs and Karpelès independently describe an LTE/eSIM implant tapping the display lines. Not established: that every loss came from the implant, and who installed it. Parent Technique only: the shape (genuine device, added hardware) has no sub-Technique yet.

## Public references

- `[protosledgercryptobilis2026]` — Protos, "Ledger says Southeast Asia reseller linked to \$86M draining" (2026-10-09): <https://protos.com/ledger-says-southeast-asia-reseller-linked-to-86m-draining/>
- `[cryptotickerledger2026]` — CryptoTicker, "Ledger Hack: \$86M Drained, Reseller CryptoBilis Halted" (2026-10-09): <https://cryptoticker.io/en/ledger-hack-cryptobilis-86-million-hardware-wallet>
- `[financemagnatesledger2026]` — Finance Magnates, "Ledger Probes Reseller Supply Chain as Analysts Track \$86 Million in Suspected Drains" (2026-10-09): <https://www.financemagnates.com/cryptocurrency/ledger-probes-reseller-supply-chain-as-analysts-track-80m-in-suspected-drains/>
- `[beincryptoledger2026]` — BeInCrypto, "Ledger Pauses Reseller Sales After \$86 Million Drain Claims: Were Devices Tampered?": <https://beincrypto.com/ledger-reseller-sales-paused-drain-claims/>
- `[bleepingledgerimplant2026]` — BleepingComputer, "Ledger confirms spy chip implant behind wallet crypto thefts" (2026-10-12): <https://www.bleepingcomputer.com/news/security/ledger-confirms-hardware-wallet-spy-implant-behind-crypto-thefts/>
- `[ledgerupdatex2026]` — Ledger on X, investigation update: <https://x.com/Ledger/status/2109331538072494364>
- `[cryptonewsledgerchip2026]` — crypto.news, "Ledger confirms hidden chip in crypto wallet amid \$92M" (2026-10-13): <https://crypto.news/ledger-confirms-hidden-chip-in-crypto-wallet-amid-92m/>
- `[coindeskledgerscammer2026]` — CoinDesk, "Scammer gets scammed in Ledger spy-chip exploit, loses almost \$5 million in bitcoin" (2026-10-16): <https://coindesk.com/business/2026/10/16/scammer-gets-scammed-in-ledger-spy-chip-exploit-loses-almost-usd5-million-in-bitcoin>
- `[cryptotimesledgerphish2026]` — The Crypto Times, "Fake Ledger Firmware Update Scam Exploits CryptoBilis Hack, SlowMist Warns" (2026-10-16): <https://cryptotimes.io/2026/10/16/fake-ledger-firmware-update-scam-exploits-cryptobilis-hack-slowmist-warns>
- `[bloombergledgerreview2026]` — Bloomberg, "A \$90 Million Spyware Hack Sparks Review of Crypto Wallet Sales" (2026-10-13): <https://www.bloomberg.com/news/articles/2026-10-13/ledger-to-review-sale-policies-after-crypto-spyware-attack>
