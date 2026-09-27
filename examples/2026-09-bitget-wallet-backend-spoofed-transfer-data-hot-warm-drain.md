# Bitget — no key was stolen; the approval process signed exactly what a compromised backend told it to — Bitget / hot and warm wallets / Ethereum, XRPL, Arbitrum, Avalanche, Optimism, BSC, Base — 2026-09-24

**Loss:** **\$351.6M** per Bitget's own disclosure, drawn from **hot and warm wallets** across **Ethereum, XRP Ledger, Arbitrum, Avalanche, Optimism, BNB Smart Chain and Base** (ETH, XRP, BNB, AVAX, USDT, USDC). Later reporting carries a **\$387.5M** figure (SlowMist's tracker uses it); OAK records **\$351.6M as the operator-stated figure** and the higher number as unreconciled. **Cold wallets were not affected.** Bitget states customer balances are intact and that a **user protection fund of more than \$464M** absorbs the loss; **withdrawals were suspended** pending a security review while deposits and trading continued.

**OAK Techniques observed:** **OAK-T11.001** (Third-Party Signing / Custody Vendor Compromise — *primary, operator-stated mechanism, recorded in the in-house sub-vector*. Bitget's account is that attackers **"compromised a critical backend system within our wallet infrastructure, used it to spoof transaction data, and triggered our authorization process."** That is the T11.001 shape exactly — **signatures valid, intent not** — with the substitution point sitting in the operator's own wallet backend rather than in a vendor's signing UI. The corpus already stretches T11.001 past its title for the Radiant developer-laptop case; Bitget is the second such stretch and is noted as such below. See [`techniques/T11.001-third-party-signing-vendor-compromise.md`](../techniques/T11.001-third-party-signing-vendor-compromise.md)). **OAK-T11.011** (Multi-chain Key-store Co-location — *structural, inferred*: one intrusion reached outflows on seven chains through one authorisation path; here the co-located thing is the approval pipeline, not the keys).

**Explicitly not OAK-T10.001-style key theft.** Bitget's CEO states **no private keys were stolen and no signers were bribed**; the signing layer operated normally on falsified inputs. **The initial access vector is undisclosed** — OAK does not assign T15.001 / T15.003 / T15.004 until the Mandiant / SlowMist investigation says how the backend was reached.

**Attribution:** **inferred-weak** — operator-suggested, not established. Bitget's CEO Gracy Chen said the method was *"highly consistent with known patterns of North Korean hacker organizations,"* citing IP behaviour and on-chain analysis; no group was named and no government or independent forensic firm has published an attribution. Bloomberg reports the incident as pushing the DPRK-attributed 2026 total past \$1B, which is a reporting framing, not a finding. Investigators: **Mandiant** and **SlowMist**.

**Key teaching point:** **An approval process that checks *that* a request is authorised but trusts the request's own description of *what* it is has moved its security boundary into whatever system writes the description.** Bybit's signers approved what the Safe{Wallet} UI showed them; Bitget's authorisation process approved what its wallet backend told it. The control that closes both is the same and is not a key-management control: **the approving party must reconstruct the transaction's destination and amount from an independent source** — the ledger of what the customer actually requested, re-derived outside the system that proposes the payout — and refuse on mismatch. Hot-wallet limits cap the blast radius; they do not close the class.

## Summary

At **18:31 UTC on 2026-09-24** Bitget's monitoring flagged unauthorized transfers from hot and warm wallets. By the next day the exchange put the total at **\$351.6M** across seven chains. The CEO's account: a critical wallet-backend system was compromised, used to **spoof transfer data**, and that data was fed into **Bitget's own authorization and signing process**, which approved and executed the payouts as if they were routine.

Cold storage was untouched. Withdrawals were paused; deposits and trading continued. Mandiant and SlowMist were engaged. The access vector, dwell time and the specific backend system have not been disclosed.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| undisclosed | Attacker gains access to a wallet-backend system | (entry vector — undisclosed) |
| 2026-09-24 ~18:31 | Monitoring flags unauthorized outflows from hot and warm wallets | **T11.001 — spoofed data into honest approval path** |
| 2026-09-24 | Outflows across ETH, XRPL, Arbitrum, Avalanche, Optimism, BSC, Base | (extraction) |
| 2026-09-25 | Bitget confirms \$351.6M; states no keys stolen; withdrawals suspended; protection fund >\$464M | (operator disclosure) |
| 2026-09-25 | CEO: method "highly consistent" with DPRK patterns; Mandiant and SlowMist engaged | (attribution claim — not established) |

## What defenders observed

- **The failure was upstream of the signer and the signer did its job.** Every check that asks "was this signed by an authorised key through the approved process?" answers yes. The only check that fails is "does this payout correspond to something a customer asked for?" — and that check has to be performed against data the compromised backend did not produce.
- **Seven chains from one intrusion is the co-location signal, relocated.** T11.011's diagnostic — simultaneous outflows on unrelated chains — appears here without any key store being reached. The shared component was the pipeline that tells the signers what to sign.
- **Hot/warm/cold tiering worked as designed and bounded the loss.** It is also why the number is \$351.6M rather than the exchange's balance sheet: the tier boundary is a blast-radius control, and it held.

## Public references

- `[coindeskbitget2026]` — CoinDesk, "Bitget's \$352 million hack happened via spoofed transfers, not private keys, CEO Gracy Chen says" (2026-09-25): <https://www.coindesk.com/markets/2026/09/25/bitget-s-usd351-million-hack-happened-via-spoofed-transfers-not-private-keys-ceo-gray-chen-says>
- `[thehackernewsbitget2026]` — The Hacker News, "Bitget Says Suspected North Korean Hackers Stole \$351.6M After Backend Compromise": <https://thehackernews.com/2026/09/bitget-says-suspected-north-korean.html>
- `[bloombergbitget2026]` — Bloomberg, "Crypto Theft by North Korea Tops \$1 Billion in 2026 After Bitget Attack" (2026-09-25): <https://www.bloomberg.com/news/articles/2026-09-25/bitget-hack-pushes-north-korean-crypto-haul-past-1-billion>
- `[cryptonomistbitget2026]` — The Cryptonomist, "Bitget Security Breach Costs \$387.5M, IPO Plans Intact" (source of the higher figure): <https://en.cryptonomist.ch/2026/09/26/bitget-security-breach-loss/>

## Discussion

T11.001's title names a *third-party* vendor, and its anchors (Bybit via Safe{Wallet}, WazirX via Liminal, DMM via Ginco) fit it. Radiant already sits there under a "developer-laptop sub-vector," and Bitget now adds an **in-house wallet-backend** instance. The shared mechanism — **intent substitution upstream of an honest signing layer** — is what the Technique actually describes; the vendor relationship is incidental to it. Two anchors outside the title is the point at which the title should be revisited rather than stretched a third time. Recorded here so the next T11 review takes it up; no rename is made on an operator statement with the forensic report outstanding.

Revision trigger: the Mandiant / SlowMist findings. If they show key material was in fact reached, the primary mapping moves off T11.001.
