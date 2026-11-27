> **MERGED 2026-11-27 into `examples/2022-post-tornado-cash-usdc-usdt-freeze-asymmetry.md`** — its bridge half has no documented incident and its stablecoin half is the one event that file already covers. Not part of the OAK corpus; kept for the record.

**Merged into:** 2022-post-tornado-cash-usdc-usdt-freeze-asymmetry

# Stablecoin issuer freeze asymmetry and an optimistic-bridge fraud-proof gap — no sourced cohort — 2022

**Loss:** none attributable to this page. The only dated event with an opened source is the 2022-08 freeze of USDC at sanctioned Tornado Cash addresses; no opened page reports a laundering loss or a bridge loss tied to the two ideas this file once combined.

**OAK Techniques observed:** none — the one sourced event (a stablecoin issuer freezing sanctioned addresses) is an issuer compliance action, and its laundering-routing reading is carried by its own file, [`2022-post-tornado-cash-usdc-usdt-freeze-asymmetry.md`](2022-post-tornado-cash-usdc-usdt-freeze-asymmetry.md); no opened page documents a failed or absent challenger layer at any bridge, so no optimistic-bridge fraud-proof Technique is declared.

**Attribution:** **unattributed** (no attack described).

**Key teaching point:** **A cohort needs members that each have a source.** Of the two halves this file once joined, one is a single event already covered by a sibling file, and the other has no documented incident, so there is no cohort to keep.

## Summary

The earlier version joined two unrelated ideas: stablecoin freeze asymmetry after the Tornado Cash sanctions, and optimistic bridges whose challengers are absent or censored. Checked against opened pages:

- The Treasury [press release](https://home.treasury.gov/news/press-releases/jy0916) shows OFAC designated Tornado Cash on 2022-08-08. [The Block](https://www.theblock.co/post/162172/circle-freezes-usdc-funds-in-tornado-cashs-us-treasury-sanctioned-wallets) reports that Centre, through Circle, blacklisted Tornado Cash addresses, that at least 75,000 USDC was stopped, and relays Circle's statement that it had blocked the addresses associated with the designation. Tether's reaction was seen only in search snippets and a Blockworks page that returned 403, so it is not relayed here.
- The earlier claim that the Nomad exploit "surfaced" a missing challenger network is not supported: [Halborn](https://halborn.com/the-nomad-bridge-hack-a-deeper-dive) and [Mandiant](https://cloud.google.com/blog/topics/threat-intelligence/dissecting-nomad-bridge-hack) attribute the loss to a zero trusted root and do not say any watcher failed. See [`2022-08-nomad-bridge.md`](2022-08-nomad-bridge.md). The statement that smaller fraud-proof-gap incidents exist at lesser-known optimistic bridges, and the Chainalysis 2024 USDT-versus-USDC share, were not found on any opened page and are removed.

Verdict: no cohort. The remaining sourced member belongs in the sibling file above.

## Timeline (UTC)

No attack. Dated events with an opened source:

| When | What happened | OAK |
|---|---|---|
| 2022-08-08 | OFAC designates Tornado Cash ([Treasury](https://home.treasury.gov/news/press-releases/jy0916)) | — |
| 2022-08 (day not stated on the page opened) | Circle blocks the designated addresses, at least 75,000 USDC stopped (relayed) ([The Block](https://www.theblock.co/post/162172/circle-freezes-usdc-funds-in-tornado-cashs-us-treasury-sanctioned-wallets)) | response |

Key addresses: none printed on the pages opened.

## Root-cause evidence

- **Technique:** none
- **Source:** <https://home.treasury.gov/news/press-releases/jy0916>; <https://www.theblock.co/post/162172/circle-freezes-usdc-funds-in-tornado-cashs-us-treasury-sanctioned-wallets>
- **Source type:** news
- **Confidence:** reported
- **Evidence:** The pages show a sanctions designation and an issuer freeze. They show no theft, exploit or fraud-proof failure.

## Public references

- [US Treasury, press release on Tornado Cash designation](https://home.treasury.gov/news/press-releases/jy0916)
- [The Block, "Circle freezes USDC funds in Tornado Cash's US Treasury-sanctioned wallets"](https://www.theblock.co/post/162172/circle-freezes-usdc-funds-in-tornado-cashs-us-treasury-sanctioned-wallets)
