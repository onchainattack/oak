# ZKasino gambling-platform bridge-exit — Ethereum / L2s — 2024-04-20 onward

**Corrected 2026-10-11:** Binance's role re-attributed to Binance's own statement (not Dutch authorities); TRM reports the funds were returned to origin addresses by 2024-05-09 (not left staked in Lido); the unverified ZigZag statement and the "contribution" website-rewording claim removed.

**Loss:** ~$33M (approximately 10,515 ETH) bridged by users into the ZKasino bridge contract under the representation that the bridge would return ZKAS tokens at a 1:1 ratio against bridged ETH and that the platform would launch as a functioning gambling protocol. The bridged ETH was routed (via a team-controlled multisig) to Lido for staking rather than being returned to depositors, and the ZKAS launch was deferred. TRM Labs reports the funds were later moved on and returned to their origin by 2024-05-09, after the suspect's arrest; refund mechanics for individual depositors are not confirmed here.

**OAK Techniques observed:** **OAK-T5.005** (Treasury-Management Exit — primary; the operator controlled the bridge contract and redirected user-deposited ETH to staking rather than to the promised bridge-return mechanism). **OAK-T11.005** (Operator-side Fake-Platform Fraud — structurally adjacent; the platform's operational promise — a functioning on-chain gambling protocol with a token — constituted the acquisition surface for user deposits, but the platform did not launch). **OAK-T15** (Off-chain Entry-Vector / Pre-Positioning — the platform's brand-building surface included prominent crypto-VC and influencer endorsement that produced user-side trust in the bridge-deposit mechanism).

**Attribution:** **pseudonymous** (the ZKasino operational entity was pseudonymously operated; Dutch authorities (FIOD) arrested a 26-year-old suspect on April 29, 2024 on suspicion of fraud-related offences; Binance stated that its investigations team contributed to identifying the suspect). The broader operator cohort behind the platform remained pseudonymous at v0.1 beyond the single Dutch arrest.

**Key teaching point:** **A bridge contract whose deposit-to-return ratio is represented as 1:1 but whose operator controls the returned-asset side and can unilaterally redirect the deposited side is a standing T5.005 surface regardless of whether the deposit contract itself is immutable.** The ZKasino bridge contract accepted ETH deposits and was represented as returning ZKAS at a 1:1 ratio, but the ETH was redirected to Lido staking — the operator retained control over the deposited ETH and exercised it contrary to the public representation.

## Summary

ZKasino presented as a decentralised gambling and casino platform built on Ethereum Layer 2 infrastructure, with a planned ZKAS token. The platform's public narrative positioned it as "the first on-chain casino" with backing from prominent crypto venture-capital firms and endorsements from crypto influencers. The core user-acquisition mechanism was a bridge contract: users deposited ETH into the ZKasino bridge and were represented as receiving ZKAS tokens at a 1:1 ratio against their bridged ETH upon the platform's token-generation event.

Between approximately April 7 and April 20, 2024, the bridge accumulated approximately 10,515 ETH (~$33M at the time) from depositors. On or around April 20, 2024, the bridge's operators:

1. **Redirected the bridged ETH to Lido for stETH staking** — the ETH was transferred from the bridge contract to Lido, where it was staked for stETH, making it unavailable for the promised 1:1 return to depositors.
2. **Left the ETH staked rather than returned**; the ZKasino team disputed the exit-scam characterisation and later (May 2024) announced a bridge-back process under which depositors would forfeit ZKAS allocations (Cointelegraph).
3. **Indefinitely deferred the platform launch and ZKAS token-generation event.**

The operational sequence — accumulate deposits → redirect deposited assets to operator-controlled yield → alter the public representation of the deposit terms → defer the platform launch — is the canonical T5.005 (Treasury-Management Exit) pattern at the platform-launch layer.

The Dutch Fiscal Information and Investigation Service (FIOD) arrested a 26-year-old suspect on April 29, 2024 on suspicion of fraud related to the ZKasino platform and seized assets worth over €11M, including real estate, vehicles and cryptocurrency (TRM Labs). Binance said its crime-investigation team played a significant role in identifying the suspect, reviewing the platform's contracts and using on-chain and OSINT tools before passing findings to law enforcement (ForkLog, citing Binance via Cointelegraph); this credit comes from Binance's own statement, not from the Dutch authorities.

The platform did not launch as of the v0.1 cutoff, and the ZKAS token did not reach a functioning token-generation event. Per TRM Labs, the funds began moving from Lido on April 20, went to three Ethereum addresses on April 29, and were returned to their origin by May 9, 2024.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2024-04-07 to 04-20 | ZKasino bridge accumulates ~10,515 ETH from depositors under the 1:1 bridge-return representation | **T5.005 surface created** |
| 2024-04-20 | Bridged ETH redirected to Lido staking; platform website alters the deposit-terms representation; ZKAS token launch deferred | **T5.005 execution** |
| 2024-04-20 to 04-28 | Crypto community identifies the bridge-redirect pattern and the Lido transfer; scrutiny of the operators intensifies | (community response) |
| 2024-04-29 | Dutch FIOD arrests 26-year-old suspect; seizes assets worth over €11M; Binance says its investigations team contributed to identification | (law-enforcement response) |
| 2024-05-09 | Per TRM Labs, the funds have been returned to their origin | (post-event) |
| 2024-05-28 | ZKasino announces a two-step bridge-back process for depositors who forfeit ZKAS allocations (Cointelegraph) | (post-event) |

## What defenders observed

- **Bridge-contract deposit-to-return ratio representations are not contractually enforceable unless the return side is contractually committed at the bridge layer.** ZKasino's bridge accepted ETH and the return-side token (ZKAS) did not exist at deposit time — the return was a forward promise from the operator, not a contract-enforced mechanism. The operator could redirect the ETH because the bridge contract's ETH custody was under operator control and the return-side obligation was social, not cryptographic.
- **VC / influencer endorsement does not substitute for operator-identity verification.** ZKasino's brand-building surface — crypto-VC firm names cited in marketing, influencer endorsements on social media — constituted the T15 pre-positioning layer that produced user-side trust in the bridge deposit. Reports that cited VCs or endorsers disclaimed involvement are not confirmed in the sources reviewed.
- **The ETH-to-staking redirection is the defining T5.005 signal.** Rather than exiting via direct wallet drain (T5.001 pattern), the ZKasino operators redirected depositor ETH to Lido staking — converting the ETH into a yield-bearing stETH position under operator control. The staking redirection kept the funds on-chain rather than immediately off-ramped, and (per TRM) they were later moved on and returned to origin after the arrest.

## What this example tells contributors writing future Technique pages

- **T5.005 is the primary classification for platform-launch bridge exits where the operator controls the deposited-asset side.** The ZKasino pattern — accumulate deposits via a bridge representation, redirect deposited assets to operator-controlled yield, alter the deposit-terms representation, defer the platform launch — is structurally distinct from token-level rug pulls (T5.001 / T5.002) and from fake-exchange frauds (T11.005) because the platform's smart-contract infrastructure was partially deployed and the gambling-platform operational promise was at least notionally real rather than a pure database fiction.
- **The T11.005 adjacency is structural but secondary.** ZKasino's platform did not launch, making it T11.005-adjacent (fake-platform fraud). However, the load-bearing surface for depositor loss was the operator's control over the bridged ETH combined with the alteration of the deposit-terms representation — which is T5.005's load-bearing surface (treasury-management exit) rather than T11.005's (fake platform). The distinction matters for mitigation: closing T11.005 requires regulatory-licensing enforcement; closing T5.005 requires bridge-contract-enshrined deposit-return guarantees.
- **The case anchors the "platform-launch bridge exit" sub-shape of T5.005.** This sub-shape — where the bridge contract is the deposit mechanism and the platform-launch promise is the acquisition surface — is structurally distinct from the Bybit / Safe{Wallet} T11.001 sub-shape (vendor-side UI compromise) and from the Mango Markets T16.002 sub-shape (post-exploit governance settlement). Contributors writing future T5.005 technique pages should distinguish it accordingly.

## Public references

- `[ctzkasino2024]` — Cointelegraph, "ZKasino scam suspect arrested, \$12.2M seized by Dutch authorities" (2024-05-03): <https://cointelegraph.com/news/zkasino-scam-suspect-arrested-dutch-authorities>
- `[forklogzkasino2024]` — ForkLog, "Binance Aids in Arrest of Suspect in ZKasino Fraud Case" (2024-05-08): <https://forklog.com/en/binance-aids-in-arrest-of-suspect-in-zkasino-fraud-case/>
- `[ctzkasinolido2024]` — Cointelegraph, "Zkasino sends \$33M promised refunds to Lido" (2024-04): <https://cointelegraph.com/news/zkasino-sends-33m-promised-refunds-to-lido>
- `[theblockzkasino2024]` — The Block, "ZKasino launch leads to widespread outrage as \$33 million promised to investors is sent to Lido" (2024-04): <https://www.theblock.co/amp/post/289996/zkasino-launch-leads-to-widespread-outrage-as-33-million-promised-to-investors-is-sent-to-lido>
- `[ctzkasinorefund2024]` — Cointelegraph, "ZKasino three-day refund window after exit scam allegations" (2024-05): <https://cointelegraph.com/news/zkasino-three-day-refund-window-after-exit-scam-allegations>
- `[trmzkasino2024]` — TRM Labs, "11 Million Euros Seized as FIOD Arrest Man on Suspected Casino Exit Scam" (2024-05-15; reports funds returned to origin by 2024-05-09): <https://www.trmlabs.com/resources/blog/11-million-euros-seized-as-fiod-arrest-man-on-suspected-casino-exit-scam>
- Cross-reference: T5.005 (Treasury-Management Exit) at `techniques/T5.005-treasury-management-exit.md`.
- Cross-reference: T11.005 (Operator-side Fake-Platform Fraud) at `techniques/T11.005-operator-side-fake-platform-fraud.md`.
