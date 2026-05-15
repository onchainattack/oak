# Post-Tornado-Cash DeFi yield-protocol laundering shift — cross-chain — 2024

**Loss:** **Laundering rail, not extraction.** The DeFi yield-protocol laundering shift does not itself represent a victim loss — it is the post-extraction laundering infrastructure that replaced Tornado Cash after the August 2022 OFAC sanctions. Proceeds from Lazarus Group (OAK-G01) and other sanctioned-entity extractions in 2023–2024 were laundered through legitimate DeFi yield protocols rather than through mixers.
**OAK Techniques observed:** **OAK-T7.006** (DeFi Yield Strategy Laundering) — canonical anchor. The laundering pattern: deposit illicit proceeds into legitimate DeFi lending/yield protocols, earn yield, and withdraw to clean addresses — using the DeFi protocol's user-base as cover volume. **OAK-T7.003** (Cross-Chain Bridge Laundering) — co-occurring. Proceeds crossed chains via bridges before entering the DeFi yield layer.
**OAK-Gnn:** [OAK-G01 Lazarus Group / DPRK-attributed](../actors/OAK-G01-lazarus.md).
**Attribution:** **confirmed** — Lazarus Group (OAK-G01) is the primary documented operator of the post-Tornado-Cash DeFi yield-laundering rail. Chainalysis, TRM Labs, and Elliptic have published overlapping analyses of Lazarus's shift from Tornado Cash to DeFi yield protocols, cross-chain bridges, and instant exchanges as the primary laundering infrastructure.

**Key teaching point:** The OFAC designation of Tornado Cash (August 2022) did not eliminate the laundering surface — it shifted it. Lazarus Group adapted within months, replacing mixer-based laundering (T7.001) with DeFi yield-protocol laundering (T7.006), cross-chain bridge laundering (T7.003), and instant-exchange routing. The new rail is structurally harder to interdict than the mixer rail because DeFi yield protocols are legitimate services with large, benign user bases — the laundering volume hides in the legitimate yield-farming flow.

## Summary

After the U.S. Treasury's OFAC sanctioned Tornado Cash in August 2022, Lazarus Group and other sanctioned entities shifted their post-extraction laundering infrastructure from mixer-based routing (T7.001) to a combination of:

1. **DeFi yield-protocol deposits.** Illicit proceeds deposited into legitimate DeFi lending and yield protocols (Aave, Compound, Lido, EigenLayer) as "yield-farming" positions. The deposit is indistinguishable from legitimate yield-seeking capital at the protocol level.
2. **Yield accrual and withdrawal.** The positions accrue yield over time; withdrawals to fresh addresses carry the cover narrative of "yield farmer harvesting rewards."
3. **Cross-chain bridge routing.** Proceeds cross chains via bridges (T7.003) before entering the DeFi yield layer, fragmenting the on-chain trail across multiple chains.
4. **Instant-exchange exit.** Final exit through instant exchanges and non-KYC CEXes.

This shift was documented by Chainalysis in its 2024 crypto-crime report and by TRM Labs and Elliptic in overlapping analyses. The key structural difference from mixer-based laundering: DeFi yield protocols are not mixers — they custody user funds and return them with yield, creating a legitimate-transaction cover narrative that mixer-specific detection heuristics (deposit-withdraw-same-amount-minus-fee) do not flag.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2022-08 | OFAC sanctions Tornado Cash; the dominant mixer-based laundering rail is disrupted | (regulatory action) |
| 2022-09/12 | Lazarus Group and other sanctioned entities experiment with alternative laundering rails — cross-chain bridges, instant exchanges, DeFi yield protocols | T7.003/T7.006 (adaptation) |
| 2023 | DeFi yield-protocol laundering becomes the primary post-extraction rail for Lazarus Group extractions; Chainalysis documents the shift | T7.006 (operationalized) |
| 2024 | Chainalysis, TRM Labs, Elliptic publish overlapping analyses confirming DeFi yield-protocol laundering as the dominant sanctioned-entity laundering rail | (vendor confirmation) |

## Public references

- Chainalysis 2024 Crypto Crime Report: post-Tornado-Cash laundering infrastructure shift analysis.
- TRM Labs: Lazarus Group post-sanctions laundering adaptation research.
- Elliptic: cross-chain and DeFi yield-laundering typologies, 2023–2024.
- OFAC: Tornado Cash designation (August 2022) and subsequent sanctions actions.
