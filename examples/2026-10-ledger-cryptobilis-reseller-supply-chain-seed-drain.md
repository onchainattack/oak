# Ledger / CryptoBilis — every reported victim bought from one authorised reseller, so the shared factor was the distribution channel, not the device line — CryptoBilis (Ledger reseller, Southeast Asia) / Ethereum, Tron, Bitcoin — 2026-10-09

**Loss:** **unconfirmed; analyst estimates \$72M–~\$90M.** Specter puts it **above \$86M** (the most-cited figure), tanuki42 **above \$72M**, MistTrack **almost \$90M**. Chain INK counts **98 victim wallets** (~\$888K average); Specter describes inflows from "hundreds" of victim wallets across Ethereum, Tron and Bitcoin. **Ledger has confirmed no amount.** Arkham shows ten USDT transfers of \$0.5M–\$2.4M into one Tron address from ~06:00 UTC.

**OAK Techniques observed:** **OAK-T11.007** (Hardware-wallet Supply-chain / Physical-access Compromise — *primary at the parent level, inferred from the victim set*. Ledger's own statement scopes the problem to **customers of one reseller**, says **no reports involve devices bought directly from Ledger**, and says its infrastructure was not compromised. A loss cluster bounded by purchase channel is the T11.007 signature. See [`techniques/T11.007-hardware-wallet-supply-chain-physical-access-compromise.md`](../techniques/T11.007-hardware-wallet-supply-chain-physical-access-compromise.md)). **Sub-Technique not assigned.** Mark Karpelès says a device he examined carried **an implant under the screen that read the seed during setup and still passed Ledger's genuine check**. That would make it T11.007.001-adjacent: a tampered genuine device rather than a counterfeit. **This is one person's claim, not a published teardown.** Taylor Monahan says there does not appear to be a zero-day and points to phishing, fake Google ads and fake apps (T11.007.003). OAK holds the sub-Technique open until Ledger or an independent lab publishes.

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

## Public references

- `[protosledgercryptobilis2026]` — Protos, "Ledger says Southeast Asia reseller linked to \$86M draining" (2026-10-09): <https://protos.com/ledger-says-southeast-asia-reseller-linked-to-86m-draining/>
- `[cryptotickerledger2026]` — CryptoTicker, "Ledger Hack: \$86M Drained, Reseller CryptoBilis Halted" (2026-10-09): <https://cryptoticker.io/en/ledger-hack-cryptobilis-86-million-hardware-wallet>
- `[financemagnatesledger2026]` — Finance Magnates, "Ledger Probes Reseller Supply Chain as Analysts Track \$86 Million in Suspected Drains" (2026-10-09): <https://www.financemagnates.com/cryptocurrency/ledger-probes-reseller-supply-chain-as-analysts-track-80m-in-suspected-drains/>
- `[beincryptoledger2026]` — BeInCrypto, "Ledger Pauses Reseller Sales After \$86 Million Drain Claims: Were Devices Tampered?": <https://beincrypto.com/ledger-reseller-sales-paused-drain-claims/>
