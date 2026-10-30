# Predict.fun — users' wallets drained after the third-party-hosted API documentation site was likely compromised — Predict.fun / BNB Chain — 2026-10-27

**Loss:** **~400,000 USDT** from "a small number of users" per Predict.fun; press reports ~125K USDT on 2026-10-22 and ~273K on 2026-10-27. Predict.fun will reimburse in full.

**OAK Techniques observed:** **OAK-T15.002** (Supply-Chain / Vendor-Pipeline Compromise — *operator-stated, preliminary*. Predict.fun: "our API documentation site, which is hosted by a third-party provider, may have been compromised". How a documentation site led to wallet transfers — altered code samples, injected script, phished keys — is not disclosed. See [`techniques/T15.002-supply-chain-vendor-pipeline-compromise.md`](../techniques/T15.002-supply-chain-vendor-pipeline-compromise.md)).

**Attribution:** **unattributed.**

**Key teaching point:** **Developer docs are part of the attack surface for API traders,** who paste code and keys from them. A post-mortem is promised.

## Summary

The docs site was taken offline on 2026-10-27. Predict.fun is a prediction market integrated in Binance Wallet.

## Timeline (UTC)

Read it as three stages. **Get in**: a documentation site possibly compromised at a third-party host. **Take**: user wallets drained for ~400K USDT. **After**: site offline, refunds promised. The operator's 10-27 statement is explicitly preliminary.

| When | What happened | OAK |
|---|---|---|
| Before 2026-10-22 (undisclosed) | Predict.fun's API documentation site, hosted by an unnamed third-party provider, is possibly compromised. When and how it was compromised are not disclosed. API traders use the site for code samples and keys. | **T15.002** |
| Before the transfers (undisclosed) | How a documentation site led to transfers out of users' wallets (altered code, injected script, phished keys) is not disclosed. | — |
| 2026-10-22 → 10-27 | Unauthorized transfers from a "small number of users" over "a short period of time", ~400,000 USDT in total. The press-reported split (~125K USDT on 10-22, ~273K on 10-27) is recorded in this entry; the operator statement gives only the total. | T15.002 |
| After the transfers (undisclosed) | Destination wallets and any onward movement are not published. | — |
| 2026-10-27 14:33:39 | Predict.fun states that its preliminary investigation points to the third-party-hosted documentation site, takes the site offline until the investigation ends, and promises to reimburse all affected users in full. | response |
| After 2026-10-27 | A full post-mortem is promised; none is cited yet. | response |

Key addresses:

- No addresses or transaction hashes are published in the cited sources (victim wallets and receiving wallets unnamed).

## Root-cause evidence

- **Technique:** OAK-T15.002
- **Source:** <https://x.com/predictdotfun/status/2115089547528950108>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** the operator's statement is explicitly preliminary ("may have been compromised"); the transfer path is unknown.

## Public references

- `[predictfunstatement2026]` — Predict.fun on X (2026-10-27): <https://x.com/predictdotfun/status/2115089547528950108>
- `[cryptonewspredict2026]` — crypto.news, Predict.fun 400,000 USDT theft and refunds: <https://crypto.news/predict-fun-400000-usdt-theft-refunds/>
