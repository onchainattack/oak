# Allbridge — a forged CCTP attestation was minted on 26 July, left to sit for 24 days, and redeemed on 19 August the moment the target router had a balance worth taking — Allbridge / Polygon → Base — 2026-08-19

**Loss:** **~\$190K USDC.** The forged message *declared* **1,000,000 USDC** and the contract credited the full amount, but the realised take was bounded by what the destination router actually held: the attacker waited until a legitimate CCTP deposit lifted the Base Router's balance to roughly **191,000 USDC** and struck about **six seconds later**. Allbridge paused the cross-chain protocol.

**OAK Techniques observed:** **OAK-T10.002** (Message-Verification Bypass — *primary, confirmed mechanism*. `receiveCctpMessage` accepted an attested message without verifying that the corresponding asset had actually been minted or that the sender was who the message claimed. See [`techniques/T10.002-message-verification-bypass.md`](../techniques/T10.002-message-verification-bypass.md)). **OAK-T9.002** (Flash-Loan-Enabled Exploit — the credited balance was converted into an extraction using an Aave flash loan. The loan is the *withdrawal mechanism*, not the flaw. See [`techniques/T9.002-flash-loan-enabled-exploit.md`](../techniques/T9.002-flash-loan-enabled-exploit.md)).

**Attribution:** **pseudonymous.** On-chain identifiers only; no named individual, group, or link to a tracked OAK actor. The operation is notable for patience rather than sophistication — the same address prepared the instrument in July and redeemed it in August.

**Key teaching point:** **An attestation with no expiry is a bearer cheque, and the 24-day gap between forging it and cashing it is the whole defensive lesson.** Every monitoring assumption in cross-chain security is tuned to atomicity: the exploit transaction is the incident, alerts fire on the block it lands in, and post-mortems reconstruct minutes. Here the *decisive* event — obtaining a valid attestation for a transfer that never happened — occurred **24 days before anything looked wrong**, generated no loss, moved no funds, and would have appeared in any log as an unremarkable failed or abandoned transfer. **Message-verification bypasses must be modelled as instruments with a shelf life, not as moments**: a defender who only watches for the redemption is watching the half of the attack that cannot be prevented any more.

## Summary

**Allbridge** is a cross-chain bridge. The relevant path here uses **Circle's CCTP**, in which a burn on the source chain produces a signed attestation that authorises a mint on the destination chain.

On **2026-07-26** the attacker caused a CCTP message to be constructed on **Polygon** simulating a **1,000,000 USDC** transfer, with **Base** as the destination domain, and obtained a **valid attestation** for it. Nothing else happened. The instrument sat unused.

On **2026-08-19**, 24 days later, the attacker called `receiveCctpMessage` with that message. Verification was insufficient — the contract confirmed the attestation was well-formed and signed but did not confirm that USDC had actually been minted to it, nor validate the message's true origin — so it credited the declared **1,000,000 USDC**. The attacker then used an **Aave flash loan** to convert the credit into a withdrawal of **999,000 USDC** against the pool.

The realised loss was far smaller than the declared figure because the destination router's real balance was the binding constraint. The attacker had been waiting for it: once an unrelated, legitimate CCTP deposit raised the **Base Router** balance to about **191,000 USDC**, the exploit landed roughly **six seconds** later. SlowMist published the analysis and stressed that cross-chain protocols must verify sender identity, message origin, and **actual asset minting** — not merely attestation validity.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2026-07-26 | Attacker constructs a CCTP message on **Polygon** simulating a 1,000,000 USDC transfer to **Base**, and obtains a **valid attestation**. No funds move; no alert fires | **T10.002 instrument prepared** |
| 2026-07-26 → 08-19 | **24 days dormant.** The forged instrument is held, unused | (the gap the defence missed) |
| 2026-08-19 | A legitimate CCTP deposit raises the **Base Router** balance to ~**191,000 USDC** | (trigger condition met) |
| 2026-08-19, ~6s later | Attacker submits the stored message to `receiveCctpMessage`; the contract credits the declared **1,000,000 USDC** | **T10.002 redemption** |
| 2026-08-19 | **Aave flash loan** used to draw **999,000 USDC** against the credited position; realised take ~**\$190K** | **T9.002** |
| post-event | Allbridge pauses the cross-chain protocol; SlowMist publishes the analysis | (operator response) |

## What defenders observed

- **The attack had a preparation phase that produced no loss and therefore no signal.** Detection built on "value left the bridge" cannot see instrument creation. What *is* visible is an attested message that is never redeemed — an outstanding, un-consumed attestation is a defensible thing to alarm on, and it is observable from the day it is issued.
- **Verification checked the envelope, not the contents.** The attestation was genuinely signed; what was never checked was whether the burn it attested to had actually occurred and minted the asset. This is the same shape as the Coreum–XRPL bridge case three weeks earlier, where relayers validated a well-formed deposit *message* and never the deposit *balance*.
- **The declared amount and the realised amount differed by a factor of five.** The contract credited 1,000,000 USDC against a router holding ~191,000. A sanity check comparing a credited amount against available backing would have capped this, and would also have surfaced the discrepancy as an alert even where it could not block.
- **The six-second reaction implies automated watching.** The attacker was not polling casually; the exploit followed the balance-raising deposit almost immediately. Bridges should assume that any exploitable condition tied to a *balance threshold* is being monitored continuously by whoever holds the instrument.
- **Pausing worked, and pausing was all that was available.** Once redemption started there was no verification step left to fail closed. The controls that would have prevented this — origin validation, mint confirmation, backing-vs-credit caps — all live before the message is accepted (OAK-M12).

## Public references

- `[slowmistallbridge2026]` — SlowMist, "A Cross-Chain Attack Spanning One Month: Analysis of the Allbridge Hack" (primary technical analysis: the 2026-07-26 forged-message construction, the 24-day dormancy, source domain Polygon / destination Base / declared 1,000,000 USDC, insufficient minting verification, the Aave flash loan, and the ~191,000 USDC Base Router balance with the ~6-second reaction): <https://slowmist.medium.com/a-cross-chain-attack-spanning-one-month-analysis-of-the-allbridge-hack-32a6183bce08>
- `[kucoinallbridge2026]` — KuCoin News, "SlowMist Reveals Allbridge Cross-Chain Bridge Attack Details: Fake CCTP Messages, Flash Loans, and Insufficient Minting Verification" (summary of the SlowMist findings and the three verification gaps — sender identity, message origin, actual asset minting): <https://www.kucoin.com/news/flash/slow-mist-reveals-allbridge-cross-chain-bridge-attack-details-fake-cctp-messages-flash-loans-and-insufficient-minting-verification>

## Discussion

OAK already carries an Allbridge Core incident from July 2026, and this is a separate event with a different mechanism — pool-ratio manipulation there, message-verification bypass here — against the same operator within a month. That alone is worth recording, because repeat incidents at one bridge under two unrelated root causes say something about review coverage that neither case says alone.

The contribution to T10.002 is temporal. Bridge-verification failures in the corpus are written as instants: a message arrives, verification is inadequate, funds leave, and the timeline spans minutes. This one separates the *forgery* from the *redemption* by more than three weeks, and in doing so exposes an assumption baked into the class — that the exploitable artefact and the exploit are the same event. A CCTP attestation is a durable, transferable authorisation with no expiry. Once minted it is inventory, and it can be held until the destination is worth draining.

That reframing changes what monitoring should look for. The redemption is unstoppable by the time it appears; the instrument, however, is visible from creation and is anomalous the entire time it remains unredeemed. Contributors documenting future cross-chain verification failures should record **when the exploitable authorisation was created**, separately from when it was used — and when the two coincide, say so explicitly, because a corpus that only records redemption times will keep suggesting these attacks are fast when some of them are merely patient.
