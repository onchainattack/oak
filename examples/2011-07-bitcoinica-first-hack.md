# Bitcoinica First Server-Side Hot-Wallet Compromise — 2011-07-29

**Loss:** ~$500K (~43,000 BTC at ~$11.50/BTC in July 2011). The first material Bitcoinica breach — predating the March 2012 Linode-compromise breach (~43,554 BTC) and the May 2012 breach (~$90K) — and the first major Bitcoin exchange hack by notional value at the time.
**OAK Techniques observed:** **OAK-T11.001** (Server-Side Credential Compromise — attacker gained access to Bitcoinica's production server and extracted hot-wallet private keys). **OAK-T5.001** (Hard LP Drain — BTC swept from exchange hot wallet in a single extraction event). **OAK-T8.005** (Operational-Security Procedural Failure — the exchange's hot-wallet custody architecture and production-server access controls were insufficient for the value under custody; no cold-storage segregation).
**Attribution:** **pseudonymous** — the attacker was not publicly identified. Bitcoinica's operator ("Zhou Tong" / "bitcoinica") publicly acknowledged the breach. The lack of cold-storage segregation was publicly discussed as a structural custody failure.
**Key teaching point:** **Bitcoinica's July 2011 breach is the canonical early-Bitcoin-era exchange hot-wallet compromise — the first breach in the Bitcoinica sequence (July 2011 → March 2012 Linode → May 2012 → operator exit) that collectively ended one of the first Bitcoin margin-trading exchanges. The case established the pattern — server-side access = hot-wallet access = catastrophic loss — that would be repeated at Mt. Gox (2014, 850K BTC), Bitfinex (2016, 120K BTC), and dozens of subsequent exchange compromises. The structural lesson (segregate custody from trading infrastructure) was publicly available after Bitcoinica but not universally adopted until after the Mt. Gox collapse.**

## Summary

Bitcoinica launched in 2011 as one of the first Bitcoin margin-trading exchanges. The platform allowed users to trade BTC/USD with leverage, holding customer BTC deposits in exchange-controlled hot wallets. The platform's operator, operating under the pseudonym "Zhou Tong," maintained production-server access to the exchange infrastructure.

On July 29, 2011, an attacker gained access to Bitcoinica's production server and extracted hot-wallet private keys. The attacker swept approximately 43,000 BTC (~$500K at contemporaneous prices) from the exchange's hot wallet in a single extraction event. The breach was detected when customer withdrawal requests could not be fulfilled — the hot wallet had been drained.

Key structural failures:

- **No cold-storage segregation:** Customer deposits were held in exchange hot wallets accessible from the production server. There was no air-gapped cold-storage layer that would have confined the attacker to the portion of funds needed for daily withdrawal processing.
- **Production-server access = custody access:** The exchange's architecture collapsed the operational access surface (production-server administration) and the custody access surface (private-key access) into a single point of failure.
- **No withdrawal velocity limits:** The attacker's single-transaction sweep of ~43,000 BTC was not rate-limited. Per-block withdrawal velocity caps would have converted the extraction from a single-event drain to a multi-block event detectable before completion.
- **Single-operator custody model:** The exchange's custody infrastructure was controlled by a single operator with no multi-signature or distributed-authorisation gating.

Bitcoinica resumed operations after the July 2011 breach, partly reimbursing affected customers. The exchange was subsequently compromised in the March 2012 Linode infrastructure breach (~43,554 BTC) and again in May 2012 (~$90K). The three-breach sequence ultimately ended Bitcoinica as an operating exchange.

The July 2011 Bitcoinica breach is the canonical early-Bitcoin-era exchange hot-wallet compromise — the structural precedent for the Mt. Gox collapse three years later. Every element of the Bitcoinica pattern — production-server access = custody access, no cold-storage segregation, no withdrawal velocity limits, single-operator custody — would reappear at larger scale and with larger losses at Mt. Gox (2014, 850K BTC), Bitfinex (2016, 120K BTC), and the broader exchange-hack class.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2011 | Bitcoinica launches as one of the first Bitcoin margin-trading exchanges; BTC deposits held in exchange-controlled hot wallets; single-operator custody model | **Exchange surface creation** |
| 2011-07-29 | Attacker gains access to Bitcoinica production server; extracts hot-wallet private keys; sweeps ~43,000 BTC in single extraction | **T11.001 + T5.001** |
| 2011-07-29 | Breach detected; customer withdrawals fail; operator acknowledges compromise | (incident detection) |
| 2011-08 onward | Bitcoinica partly reimburses customers; resumes operations | (partial recovery) |
| 2012-03 | Second Bitcoinica breach via Linode compromise (~43,554 BTC) | **T11.001 repeat (infrastructure-layer)** |
| 2012-05 | Third Bitcoinica breach (~$90K); exchange ceases operations | **T11.001 repeat (final)** |
| 2014-02 | Mt. Gox collapse (850K BTC) — the same structural failures at 20x scale | **Class recurrence at scale** |

## Realised extraction

~43,000 BTC (~$500K at July 2011 prices). Partial customer reimbursement by the operator. Attacker not publicly identified.

## Public references

- BitcoinTalk forum contemporaneous discussion (July-August 2011) — primary community-source documentation of the breach.
- Bitcoinica operator ("Zhou Tong") public acknowledgment of the breach (BitcoinTalk, July 2011).
- Cross-reference: T11.001 (Server-Side Credential Compromise) at `techniques/T11.001-credential-compromise.md`.
- Cross-reference: T5.001 (Hard LP Drain) at `techniques/T5.001-hard-lp-drain.md`.
- [`examples/2012-03-bitcoinica-exchange-hack.md`](../examples/2012-03-bitcoinica-exchange-hack.md) — Bitcoinica March 2012 Linode-compromise breach (second Bitcoinica breach).
- [`examples/2014-02-mt-gox.md`](../examples/2014-02-mt-gox.md) — Mt. Gox collapse, 2014 (the same structural failures at 20x scale).
