# Predict.fun — users' wallets drained after the third-party-hosted API documentation site was likely compromised — Predict.fun / BNB Chain — 2026-10-27

**Loss:** **~400,000 USDT** from "a small number of users" per Predict.fun; press reports ~125K USDT on 2026-10-22 and ~273K on 2026-10-27. Predict.fun will reimburse in full.

**OAK Techniques observed:** **OAK-T15.002** (Supply-Chain / Vendor-Pipeline Compromise — *operator-stated, preliminary*. Predict.fun: "our API documentation site, which is hosted by a third-party provider, may have been compromised". How a documentation site led to wallet transfers — altered code samples, injected script, phished keys — is not disclosed. See [`techniques/T15.002-supply-chain-vendor-pipeline-compromise.md`](../techniques/T15.002-supply-chain-vendor-pipeline-compromise.md)).

**Attribution:** **unattributed.**

**Key teaching point:** **Developer docs are part of the attack surface for API traders,** who paste code and keys from them. A post-mortem is promised.

## Summary

The docs site was taken offline on 2026-10-27. Predict.fun is a prediction market integrated in Binance Wallet.

## Root-cause evidence

- **Technique:** OAK-T15.002
- **Source:** <https://x.com/predictdotfun/status/2115089547528950108>
- **Source type:** operator
- **Confidence:** reported
- **Evidence:** the operator's statement is explicitly preliminary ("may have been compromised"); the transfer path is unknown.

## Public references

- `[predictfunstatement2026]` — Predict.fun on X (2026-10-27): <https://x.com/predictdotfun/status/2115089547528950108>
- `[cryptonewspredict2026]` — crypto.news, Predict.fun 400,000 USDT theft and refunds: <https://crypto.news/predict-fun-400000-usdt-theft-refunds/>
