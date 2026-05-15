# GBL Bitcoin Exchange Ponzi / Exit Scam — 2013-12

**Loss:** ~$5M (~9,640 BTC at late-2013 BTC price of ~$520). Global Bond Limited (GBL) was marketed as a Bitcoin exchange and mining-contract platform; it was in fact a Ponzi scheme that collapsed in December 2013 when the operator ceased withdrawals and deleted the platform's web presence.
**OAK Techniques observed:** **OAK-T11.005.001** (Fake-CEX / Pig-Butchering Platform — the GBL platform was a fake exchange with no real trading backend; balance displays were operator-controlled fictions). **OAK-T6.001** (Source-Verification Mismatch — GBL's claimed corporate registration in Hong Kong was either fabricated or unverifiable). **OAK-T5.001** (Hard LP Drain — the operator swept deposited BTC in a single-event exit when the scheme collapsed). **OAK-T8.005** (Operational-Security Procedural Failure — the operator's registration / hosting / identity trail was insufficiently verified by depositors).
**Attribution:** **pseudonymous** — the GBL operator(s) were not publicly identified or prosecuted. The platform's claimed operator identity and Hong Kong corporate registration could not be independently verified. The case remains unsolved.
**Key teaching point:** **GBL is the canonical early-Bitcoin-era fake-exchange Ponzi — the structural predecessor to the T11.005.001 pig-butchering class. The template — fake platform UI, fictitious trading returns, unverifiable corporate registration, single-event exit — was established at GBL in 2013 and has since scaled to the $5.8B+ annual-loss pig-butchering industry documented by the FBI IC3 in 2024. The GBL case also established the jurisdictional-investigation gap that persists in fake-exchange fraud: operators register in permissive jurisdictions (Hong Kong, Panama, Seychelles) and victims' local law enforcement cannot obtain the operator identity from the claimed registration jurisdiction.**

## Summary

Global Bond Limited (GBL) launched in 2013, marketing itself as a Bitcoin exchange and cloud-mining investment platform. The platform claimed a Hong Kong corporate registration and offered guaranteed returns on Bitcoin deposits through "Bitcoin trading" and "mining contract" products. Depositors were shown a web-based dashboard displaying fictitious balance growth and trading profits.

GBL employed the classic Ponzi feeder mechanics:

- **Guaranteed returns:** ~1-2% daily returns claimed from "Bitcoin arbitrage trading" — a structurally impossible return profile that should have been flagged by any depositor performing basic verification.
- **Affiliate/referral programme:** Existing depositors were incentivised to recruit new depositors through a multi-level referral commission structure — the standard Ponzi fuel-injection mechanism.
- **Fictitious dashboard:** The platform's balance display was a database fiction; no real exchange backend or mining infrastructure existed.

In December 2013, as the BTC price was approaching its 2013 peak (~$1,100), the GBL operator ceased processing withdrawals. The platform's website was taken offline. Depositors who attempted to contact the operator through previously used communication channels received no response. The operator swept the remaining deposited BTC (~9,640 BTC, ~$5M at contemporaneous prices) in a single-exit event.

The GBL case received significant attention in the early Bitcoin community and was covered by CoinDesk and other early crypto-news outlets. Chinese law enforcement investigated the case (many victims were based in China) but no public arrest or prosecution resulted. The operator's identity was never publicly confirmed, and the Hong Kong corporate registration was either fabricated or a shell entity with no traceable beneficial owner.

The GBL template — fake exchange UI, fictitious returns, Ponzi feeder mechanics, jurisdictional shell-game registration, single-event exit — is structurally identical to the modern pig-butchering platform class (T11.005.001). The 2013 GBL case and the 2023 JPEX Hong Kong case ($200M, 2,600+ victims) share the same operational DNA, separated by a decade of scale growth and UI sophistication improvement. The jurisdictional-investigation gap — Hong Kong as a registration jurisdiction that does not reliably respond to foreign-victim law-enforcement inquiries — was as operational at GBL in 2013 as it was at JPEX in 2023.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2013 | GBL platform launches; marketed as a Bitcoin exchange and cloud-mining investment platform with guaranteed ~1-2% daily returns; Hong Kong corporate registration claimed | **T11.005.001 platform creation** |
| 2013 | Depositors fund platform accounts with BTC; fictitious dashboard displays balance growth; affiliate referral programme drives depositor growth | **Ponzi feeder mechanics** |
| 2013-12 | GBL operator ceases withdrawals; platform website taken offline; ~9,640 BTC swept in single-exit event | **T5.001 exit extraction** |
| 2013-12 to 2014 | Chinese law enforcement investigation; no public arrest or prosecution; operator identity remains unconfirmed | **Jurisdictional investigation gap** |
| 2023-09 | JPEX Hong Kong enforcement action (~$200M, 2,600+ victims) — the same fake-CEX template, same registration jurisdiction, same structural mechanics, a decade later | **T11.005.001 class persistence** |

## Realised extraction

~9,640 BTC (~$5M at late-2013 BTC prices). No public recovery. Case unsolved.

## Public references

- CoinDesk early reporting on GBL collapse (December 2013) — the primary English-language contemporaneous source.
- BitcoinTalk forum threads (December 2013–January 2014) — contemporaneous victim and community discussion.
- Chinese law-enforcement investigation reports (2014) — limited public documentation.
- Cross-reference: T11.005.001 (Fake-CEX / Pig-Butchering Platform) at `techniques/T11.005.001-fake-cex-pig-butchering-platform.md`.
- [`examples/2023-09-jpex-hong-kong.md`](../examples/2023-09-jpex-hong-kong.md) — JPEX Hong Kong, 2023 (the same T11.005.001 template at 40x scale, same registration jurisdiction).
- [`examples/2024-2025-doj-sec-pig-butchering-enforcement-cohort.md`](../examples/2024-2025-doj-sec-pig-butchering-enforcement-cohort.md) — DOJ/SEC enforcement cohort, 2024–2025 (the modern pig-butchering enforcement wave).
