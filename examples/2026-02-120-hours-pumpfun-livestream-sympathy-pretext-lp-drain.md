# "120 Hours" — the creator told a livestream audience he had five days to live, waited for the token to reach Raydium, and pulled the liquidity while still on camera — pump.fun / Solana — 2026-02-09

**Loss:** **~\$534,000 peak market capitalisation** collapsed to near zero, with late buyers taking near-total losses. The creator's own realised take was small — roughly **\$14,000 in trading fees** plus the liquidity pulled — which is the ratio this class runs at: **the extraction is a fraction of the paper value destroyed**, because the paper value was never funded.

**OAK Techniques observed:** **OAK-T5.001** (Hard LP Drain — *primary, confirmed mechanism*. The creator waited for the token to **graduate from pump.fun's bonding curve to a Raydium pool** and then **removed the liquidity**, live on stream. The bonding-curve phase is custodial by design; the drain became possible at exactly the moment the asset moved into a pool the creator controlled. See [`techniques/T5.001-hard-lp-drain.md`](../techniques/T5.001-hard-lp-drain.md)). **OAK-T2.001** (Single-Sided Liquidity Plant — the launch structure that makes the drain terminal: the pool's depth came from buyers on one side and creator-controlled supply on the other, so withdrawal leaves no market). **OAK-T3.003** (Pump-and-Dump Coordination — recorded in its **solo-operator, live-broadcast** shape rather than the usual coordinated-group one; the promotion, the price move and the exit were one continuous performance by one person).

**No Technique covers the deception itself,** and OAK states that rather than forcing a fit: the pump was driven by a **fabricated terminal-illness claim** delivered live, with a stated intention to leave the fees to the creator's family. That is a pretext aimed at retail buyers' sympathy, and the corpus's social-engineering Techniques (T15.x) are all scoped to **operator personnel**. See Discussion.

**Attribution:** **pseudonymous.** The creator abandoned the stream and the associated accounts immediately after the drain; no identification, arrest or enforcement action is recorded in the sources cited here.

**Key teaching point:** **The bonding curve is not a safety feature, it is a delay — and the graduation to a real pool is the moment the launch becomes rug-capable.** Everything before it looks contained because the venue holds the liquidity; everything after it depends on who controls the pool. A buyer watching this stream had no way to distinguish a creator who would lock LP from one who would not, because **the decisive act had not happened yet and nothing on-chain foreshadowed it**. Two practical consequences. For detection: **the graduation event is the trigger to evaluate**, not the launch — LP ownership, lock status and creator balance at the moment a token leaves the curve are the fields that separate the outcomes, and they are all readable. For the broader picture: independent measurement put **98.6% of pump.fun tokens launched between early 2024 and early 2025** as displaying fraud or abandonment, which reframes the individual case. **This is not an incident that happened on a platform; it is the platform's base rate, with a camera on it.**

## Summary

**pump.fun** launches Solana tokens against a **bonding curve**: the platform holds the liquidity while the token trades on the curve, and once enough has been bought the token **"graduates"** — liquidity migrates to a **Raydium** pool.

On **2026-02-09** a creator launched a token called **"120 Hours"** with a **live broadcast**. He told viewers he had **about 120 hours to live** because of a terminal illness, that **all the fees would go to his family after he died**, and — repeatedly, to build credibility — that he knew nothing about rug pulls.

The token climbed quickly to roughly **\$534,000** in market capitalisation. After it **graduated from the curve to Raydium**, the creator **drained the liquidity while still live on stream**, letting the audience watch the price collapse in real time. He took approximately **\$14,000 in trading fees** alongside the pulled liquidity, then disappeared from the broadcast and abandoned the associated accounts.

The token went to near zero. Buyers who entered during the run lost substantially all of it.

## Timeline (2026-02-09)

| When | Event | OAK ref |
|---|---|---|
| Launch | Token **"120 Hours"** created on pump.fun; creator opens a **livestream** | (launch) |
| During the stream | Creator claims **~120 hours to live**, says **fees go to his family**, repeatedly denies knowing anything about rug pulls | **pretext — no OAK Technique** |
| Minutes | Market capitalisation reaches approximately **\$534,000** | **T3.003 — solo pump** |
| On graduation | Token **migrates from the bonding curve to a Raydium pool** | (rug becomes possible) |
| Immediately after, on camera | Creator **drains the liquidity**; audience watches the collapse live | **T5.001 + T2.001** |
| After | ~**\$14,000 in fees** taken; creator leaves the stream and abandons the accounts; token near zero | (exit) |

## What defenders observed

- **The pretext was the product.** There was no technical novelty: the contract was ordinary, the drain was a standard LP withdrawal, and the only engineered component was a story calibrated to suppress the audience's scepticism — a dying man leaving fees to his family, who volunteers that he would never rug. **Denying the specific thing you are about to do is a recognisable pretext move**, and it is cheaper than any contract trick in this corpus.
- **Doing it on camera was rational, not reckless.** The livestream was the distribution channel; the audience was the order book. Executing the drain live cost nothing because the creator's identity was pseudonymous and the accounts were disposable, and it maximised the time buyers spent in the position before realising.
- **The evaluable moment is graduation, not launch.** Before migration the liquidity sits with the platform; after it, with whoever controls the new pool. A monitor that scores tokens at creation is scoring the wrong instant. **LP ownership and lock status at migration** are the fields that separate this outcome from a survivable one, and they are cheap to read for every graduating token.
- **The realised take was \$14K against \$534K destroyed, and that asymmetry is the class.** Chasing these by loss size finds nothing worth the effort; the harm is distributed across many small buyers and the operator's margin is thin. It is the **volume** that matters — the 98.6% figure for pump.fun tokens over 2024–2025 — which is why OAK's coverage of this Tactic leans on cohorts and base rates rather than individual incidents.

## Public references

- `[ourcryptotalk120hours2026]` — OurCryptoTalk, "Pump.fun Rug Pull Shocks Traders After Live Stream Scam" (2026-02-09; the terminal-illness claim, the ~\$534K peak, the drain executed after graduation to Raydium while live on stream, ~\$14K in fees, the 98.6% figure for pump.fun tokens launched early 2024 → early 2025): <https://ourcryptotalk.com/news/pump-fun-live-rug-pull-solana-memecoin>
- `[soliduslabssolanarug]` — Solidus Labs, "Solana Rug Pulls & Pump-and-Dumps: What Crypto Institutions Must Know" — the measurement behind the base-rate figure: <https://www.soliduslabs.com/reports/solana-rug-pulls-pump-dumps-crypto-compliance>
- `[arxivsolanarugpull2026]` — J. Chen, Z. Li, Z. Jiang, R. He, Y. Zhou, J. Wu, Z. Zheng (Sun Yat-sen University), "From Hype to Collapse: Investigating Rug Pull Scams on Solana", arXiv 2603.24625 — independent population measurement on a **different window (tokens issued 2025-01-01 → 2025-06-30 on Orca, Raydium and Meteora)**: 100,063 tokens screened, **76,469 flagged as rug pulls** (60,402 pump-and-dump, **15,606 liquidity withdrawal**, 461 freeze-authority abuse), **≥\$151M** in traceable losses across **7,322 profiting addresses**, false-positive rate 0.26% on a 382-token audited sample. Cited for the class's scale and mechanism split, **not** as evidence about this incident or about 2026: <https://arxiv.org/abs/2603.24625>

## Discussion

OAK's T2 and T5 coverage of launch-stage extraction is anchored on named projects with teams, treasuries and something resembling a product — SafeMoon, Evolved Apes, the BSC yield-farm liquidity-plant cohort. This entry documents the other end of the distribution, where the "project" is one person with a webcam and the entire lifecycle is under an hour. The mechanism is the oldest one in the corpus; what is worth recording is **where the mechanism now lives** and how the economics changed: individually trivial losses, industrial volume, and a platform whose base rate of failure is measured in the high nineties.

The gap this case exposes is on the **deception** side. OAK maps the drain (T5.001), the launch structure (T2.001) and the promotion (T3.003), and none of those describe the actual instrument: **a fabricated personal affliction, presented live, to convert sympathy into buy pressure**. The T15 family covers social engineering *of operator personnel*; T3.004 covers *influencer amplification*, which requires an influencer; T11.005 covers *fake platforms*, which requires a platform. The corpus's nearest relative is **T15.007** (Fabricated Institutional Identity as Pretext Substrate, forward candidate) — same primitive, manufactured credibility, but that candidate is scoped to **borrowed institutional affiliation** aimed at an operator, and this is **manufactured personal circumstance** aimed at a crowd.

Two anchors do not yet make a class, and OAK should not mint one from a single livestream. The honest record is: this is a **recurring genre** on launch platforms (terminal illness, bereavement, child's medical bills), it has no home in the taxonomy, and if a second and third documented case land, the scope question is whether T15.007 widens to *fabricated-credibility pretext* with institutional and personal sub-shapes, or whether the retail-facing version belongs under T3 alongside the other demand-manufacturing Techniques. Contributors documenting one of these should record **the pretext verbatim**, because the wording is the artefact — and because it is the part that gets paraphrased away in secondhand coverage.
