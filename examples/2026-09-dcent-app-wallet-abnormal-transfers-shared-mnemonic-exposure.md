# D'CENT — the app wallet started moving assets on its own, and the vendor's own advisory told hardware-wallet users sharing a mnemonic to run too — D'CENT / App Wallet (software) / multi-chain — 2026-09-16

**Loss:** **not established.** D'CENT has **not disclosed a confirmed loss figure**, an affected-wallet count, or which networks and assets were involved, and has not said whether the activity is continuing. **SlowMist's incident database records ~\$6.57M**; OAK carries that as **SlowMist's figure, not as an established total**, because no independent confirmation and no vendor statement supported it at time of writing. This entry is opened on the **disclosure**, not on a settled forensic account, and should be revised when D'CENT's promised follow-up notice lands.

**OAK Techniques observed:** **none — the mechanism is not established as of 2026-09-16**, and OAK does not assign a Technique to an unexplained outflow. The candidate classes were each checked and each fails for the same reason — no disclosed finding supports it: **T11.002** (Wallet-Software Distribution Compromise) would require evidence that a distributed build or update was tampered with, and none has been published; **T11.012** (Server-Side Raw Private-Key Storage) would require evidence that key material reached vendor infrastructure, which D'CENT has neither claimed nor denied; **T11.006** / **T11.006.002** (seed exfiltration at rest, implicit cloud-custody backup) would require a backup or storage path to be identified, and none has been; **T4.013** (Endpoint Infostealer) would require the compromise to sit on user devices rather than in the app, which is inconsistent with the vendor scoping the issue to the App Wallet specifically. **D'CENT has explicitly not said that seed phrases were compromised.** The mapping is deliberately left empty rather than guessed.

**Attribution:** **unattributed.** No actor identified, no attribution claimed, no on-chain identifiers published by the vendor.

**Key teaching point:** **One mnemonic across a software wallet and a hardware wallet collapses them into a single security domain, and the weaker one sets the level.** The most concrete thing in D'CENT's advisory is not what it says about the app — it is who else it tells to move funds: **users who share a mnemonic between the App Wallet and a D'CENT hardware device.** That instruction is an admission about **key derivation**, not about the app: if the same seed backs both, then whatever reached it through the software product reaches the hardware product's addresses too, and the secure element that never signed anything improperly protects nothing. The hardware wallet's guarantee is that the key **never leaves the device** — a guarantee that was already void the moment the same phrase was typed into a phone. The control is a rule with no exceptions and no convenience path: **a seed entered into general-purpose software is a hot seed forever**, hardware-wallet seeds are **generated on-device and never entered anywhere else**, and a vendor offering both products under one brand is offering **two different trust models that must not share a secret.**

## Summary

**D'CENT** is a wallet vendor that sells a **hardware wallet** and also ships the **D'CENT App Wallet**, a software-only mobile wallet that can be used standalone or alongside the hardware products.

On **2026-09-16**, D'CENT announced that it had **detected abnormal asset transfers involving the App Wallet** and had opened an urgent investigation. Its initial finding was that **the issue appears to be limited to the App Wallet**, and that the **hardware wallets showed no signs of compromise**.

The vendor advised users holding any assets in the App Wallet to **move them immediately** to a hardware wallet or another trusted address — and extended that advice to **users who use the same mnemonic phrase in both the App Wallet and a D'CENT hardware wallet.**

As of this writing D'CENT has **not described the mechanism**, has **not confirmed a loss figure or scope**, and has **not stated whether seed phrases were compromised**. It committed to a further notice covering the exact cause, the scope of losses, and its response measures.

## Timeline (2026-09-16)

| When | Event | OAK ref |
|---|---|---|
| (standing) | D'CENT ships a **hardware wallet** and a **software App Wallet** under one brand; **mnemonic sharing between the two is possible** and in use | (latent trust-model collapse) |
| 2026-09-16 | D'CENT **detects abnormal asset transfers** involving the App Wallet; opens urgent investigation | (detection — vendor-side) |
| 2026-09-16 | Public advisory: **move App Wallet assets immediately**; **same advice extended to hardware users sharing a mnemonic** | (operator response) |
| 2026-09-16 | Vendor states the issue **appears limited to the App Wallet**; hardware wallets show no signs of compromise | (preliminary scoping) |
| 2026-09-16 | **SlowMist's database records ~\$6.57M**; **no vendor-confirmed figure**, no affected-wallet count, no networks or assets named | (unconfirmed magnitude) |
| open | **Cause, scope and response measures outstanding**; no statement on whether the activity is continuing | (open item) |

## What defenders observed

- **The scope statement and the advisory contradict each other in a way that is informative.** "Limited to the App Wallet" and "hardware users sharing a mnemonic should also move funds" cannot both be a complete description of the blast radius. The second sentence is the operative one: **exposure follows the key, not the product.** A vendor that has to issue both sentences is describing a boundary that its own key-management design does not enforce.
- **An unexplained outflow is not a classification problem, it is a disclosure problem.** Nothing here is hard to map once the mechanism is known; the mechanism is simply not known, and OAK's Techniques line says so rather than picking the most plausible-sounding class. **A guessed mapping on day one becomes a cited fact by week two**, and this corpus has paid for that before.
- **The magnitude figure in circulation has one source.** ~\$6.57M appears in SlowMist's incident database and is being repeated downstream; the vendor has confirmed nothing. Any reader treating that number as established is treating **a tracker row as a disclosure**. It may well prove correct — it is not yet evidence.
- **"Move your assets now" is the whole of the available user guidance, and it is the part users can act on.** The advisory is unusually direct for a day-zero notice and does not wait for a root cause. That is the right call when the mechanism is unknown and outflows are live; it also means the population that can be helped is limited to those who see the notice within hours.
- **Wallet-vendor incidents cluster in this corpus's recent window.** The **XRPH wallet** staking flow transmitting seed phrases to a server (2026-09-03) and the **Coldcard** incident (2026-08) sit two and six weeks back respectively. The common thread is not a shared bug but a shared structure: **the wallet vendor is a single point of failure for a population that chose self-custody specifically to avoid single points of failure.**

## Public references

- `[usethebitcoindcent2026]` — UseTheBitcoin, "DCENT App Wallet Hit by Abnormal Asset Transfers" (2026-09-16; no confirmed attack method, loss figure or affected-wallet count; advisory extended to users sharing a mnemonic between App Wallet and hardware wallet): <https://usethebitcoin.com/news/dcent-wallet-alert/>
- `[blockfencedcent2026]` — Blockfence, "DCENT Probes Abnormal App Wallet Transfers, Urges Users to Move Assets" (App Wallet is software-only and can run standalone or alongside hardware products; hardware wallets show no signs of compromise; D'CENT has not said seed phrases were compromised): <https://blockfence.io/dcent-probes-abnormal-app-wallet-transfers-urges-users-to-move-assets/>
- `[slowmistzonedcent2026]` — SlowMist Hacked database, D'CENT Wallet entry (2026-09-15/16; **~\$6.57M**, attack type recorded as unknown; abnormal asset transfers in the mobile app wallet, hardware wallets unaffected). **Single-source magnitude figure, unconfirmed by the vendor**: <https://hacked.slowmist.io/>

## Discussion

This file is opened deliberately early and deliberately incomplete, and it is worth being explicit about why, because the alternative failure mode is the one this corpus has actually suffered from.

The temptation with a day-zero wallet-vendor incident is to reach for the nearest plausible Technique — a distribution compromise, a server-side key path, a backup leak — on the grounds that one of them is probably right. **One of them probably is.** But the corpus's own history (see the 2026-07 fixture-provenance sweep, and the release-file specifics corrected after it) is that a plausible mechanism written down on day one is indistinguishable from an established one by the time anyone re-reads it, and the citation trail does not record the difference. The **`none`** on the Techniques line is therefore not a gap to be filled at the first opportunity — it is the accurate state of the public record on 2026-09-16, and the same applies to the loss figure, which is recorded as **SlowMist's number** rather than as **the number**.

What the entry can carry today without waiting is the part that does not depend on the root cause at all: **the shared-mnemonic exposure**. That is established, from the vendor's own advisory, and it is true regardless of how the App Wallet was compromised. It also generalises past this incident to every vendor that sells a hardware wallet and ships a software wallet beside it — a product pairing whose commercial logic (one brand, one onboarding, one recovery phrase) runs directly against its security logic (two trust models, no shared secret).

**Revision trigger:** D'CENT's follow-up notice, or an independent forensic analysis. Either should establish the mechanism, at which point the Techniques line, the loss figure, and the timeline should be rewritten rather than appended to.
