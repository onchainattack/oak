# Puffer pufETH LRT depeg event — EigenLayer restaking withdrawal-cap constraint — Ethereum — 2024-07

**Loss:** structural — pufETH traded at a discount of up to \~4–7% below its underlying ETH backing on secondary markets (DEX aggregators, Uniswap pools) during the July 2024 depeg window. The dollar-denominated loss was borne by pufETH holders who sold or were liquidated against pufETH collateral during the discount window; the aggregate loss is measured as the discount-implied markdown across circulating pufETH supply at the trough. The depeg did not result in insolvency or bad debt at the protocol level — Puffer's underlying EigenLayer deposits remained fully backed — but the liquidity dislocation penalised LRT holders who needed immediate ETH access.
**OAK Techniques observed:** **OAK-T14.004** (Liquid Restaking Token Pricing Manipulation / Depeg — the pufETH discount was driven by the structural constraint that LRT withdrawals from EigenLayer were subject to EigenLayer's withdrawal queue and cap, creating a multi-day-to-week delay between a redemption request and ETH delivery. When a redemption queue backlog formed, secondary-market LRT sellers accepted a discount to ETH in exchange for immediate liquidity, and the discount widened with the queue depth). The pufETH depeg is the fourth T14.004 case in the 2024 LRT depeg sequence, following Renzo ezETH (2024-04), Ether.fi weETH (2024-05), and Kelp rsETH (2024-06).
**Attribution:** **unattributed** — structural / protocol-design-level. The depeg was driven by the EigenLayer withdrawal-cap mechanism and the redemption-queue backlog, not by a specific attacker. No attribution is relevant.

**Key teaching point:** **LRT depegs are a structural consequence of the withdrawal-cap constraint in restaking protocols, not a per-protocol failure.** The sequence of 2024 LRT depegs (Renzo ezETH in April, Ether.fi weETH in May, Kelp rsETH in June, Puffer pufETH in July) demonstrates that every major LRT protocol experienced a depeg event when the EigenLayer withdrawal queue accumulated a backlog. The underlying mechanism — secondary-market sellers accepting a discount to ETH in exchange for immediate liquidity when redemptions are capped — is protocol-agnostic. The pufETH depeg, occurring fourth in the sequence, confirms that the depeg is a structural property of the LRT design space under the EigenLayer withdrawal-cap regime, not a Renzo / Ether.fi / Kelp / Puffer-specific incident.

## Summary

Puffer Finance launched pufETH as a liquid restaking token in early 2024, allowing holders to earn EigenLayer restaking yield while retaining a liquid token for DeFi use. The architecture is the standard LRT pattern: users deposit ETH into Puffer's protocol, Puffer deposits the ETH into EigenLayer as a validator-restaked position, and pufETH is minted as a liquid receipt representing the underlying ETH + accrued restaking yield.

In July 2024, during a broader LRT redemption-demand window driven by EigenLayer points-season transitions and LRT-portfolio rebalancing, redemption requests for pufETH exceeded the EigenLayer withdrawal capacity. The EigenLayer withdrawal queue backlogged requests for several days to weeks. pufETH holders seeking immediate ETH liquidity — whether for portfolio rebalancing, DeFi position management, or risk reduction — sold pufETH on secondary markets (Uniswap V3 pools, DEX aggregators) at a discount to the pufETH/ETH redemption rate. The discount widened to approximately 4–7% at the trough, penalising sellers and creating an arbitrage opportunity for buyers who could wait out the redemption queue.

The depeg self-corrected as the EigenLayer withdrawal queue cleared and arbitrageurs bought discounted pufETH to redeem at par. The self-correction confirmed the depeg's structural nature: the discount was a liquidity premium, not a solvency event, and the underlying ETH backing was never impaired. The liquidity dislocation nonetheless caused real economic loss for pufETH holders who sold during the discount window, and the episode contributed to the LRT-sector recognition that withdrawal-cap-constrained secondary-market pricing is a structural feature of the LRT design space.

## Timeline (UTC)

| When | Event | OAK ref |
|---|---|---|
| 2024-02 | Puffer Finance launches pufETH as a liquid restaking token on EigenLayer | T14.004 (protocol launch) |
| 2024-04 | Renzo ezETH depeg event — first major LRT depeg of the 2024 cohort | T14.004 (cohort predecessor) |
| 2024-05 | Ether.fi weETH depeg event — second major LRT depeg | T14.004 (cohort predecessor) |
| 2024-06 | Kelp rsETH depeg event — third major LRT depeg | T14.004 (cohort predecessor) |
| 2024-07 | Puffer pufETH depeg event — fourth major LRT depeg; discount of ~4–7% below ETH backing at trough | **T14.004** (pufETH depeg) |
| 2024-07 (late) | EigenLayer withdrawal queue clears; pufETH discount narrows and returns to near-par as arbitrageurs absorb discounted supply | (self-correction) |
| 2024 onward | LRT protocols introduce liquidity-buffer and redemption-queue-management mitigations; the structural withdrawal-cap constraint remains through v0.1 | T14.004 (structurally open) |

## What defenders observed

- **The depeg was predictable from the redemption-queue depth.** The pufETH discount correlated with the EigenLayer withdrawal-queue backlog: as the queue grew, the discount widened; as the queue cleared, the discount narrowed. Defenders monitoring EigenLayer queue depth and LRT secondary-market prices could have forecast the depeg window and its magnitude. The queue-depth-to-discount correlation is a load-bearing LRT risk signal.
- **Arbitrageur absorption was the self-correction mechanism, not protocol-side intervention.** Puffer Finance did not (and structurally could not) inject liquidity to close the discount, because the redemption queue was at the EigenLayer layer, not the Puffer layer. Arbitrageurs — traders who bought discounted pufETH on secondary markets and waited out the redemption queue to redeem at par — were the sole discount-closing mechanism. The self-correction relied on well-capitalised arbitrageurs; in a scenario where the discount widened beyond arbitrageur risk tolerance or capital capacity, the depeg could persist.
- **The four-LRT depeg sequence establishes a structural class.** The Renzo (April), Ether.fi (May), Kelp (June), and Puffer (July) depegs are not four independent incidents — they are four instances of the same structural mechanism (withdrawal-cap-constrained secondary-market pricing) hitting four protocols in sequence. Defenders evaluating LRT risk should treat the depeg as a protocol-agnostic structural property of the LRT design space, not as a per-protocol failure that can be diversified away by holding multiple LRTs.

## What this example tells contributors writing future Technique pages

- **The 2024 LRT depeg sequence (Renzo → Ether.fi → Kelp → Puffer) is the canonical T14.004 cohort.** Contributors writing future T14.004 examples should treat the depeg as a structural property of the EigenLayer withdrawal-cap regime and should expect future LRT protocols (and LRTs on other restaking platforms) to reproduce the same redemption-queue → discount → arbitrageur-absorption → self-correction pattern.
- **The queue-depth-to-discount correlation is the operational LRT risk signal.** Contributors writing T14.004 detection guidance should surface this correlation as the primary forward-looking signal: monitor the restaking-platform withdrawal-queue depth, and flag LRT tokens whose secondary-market price begins to diverge from their redemption rate as the queue grows.

## Public references

- `[eigenlayerwithdrawals2024]` *(proposed)* — EigenLayer withdrawal queue design and the cap mechanism that created the structural constraint underlying all four 2024 LRT depegs.
- `[pufferpufeth2024]` *(proposed)* — Puffer Finance pufETH launch and mechanism design; the liquid restaking token architecture.
- `[lrtdepegcohort2024]` *(proposed)* — Cross-protocol framing of the Renzo → Ether.fi → Kelp → Puffer 2024 LRT depeg sequence as a structural class.

## Discussion

The Puffer pufETH depeg (July 2024) completes the 2024 LRT depeg sequence that OAK documents across Renzo ezETH (April), Ether.fi weETH (May), Kelp rsETH (June), and Puffer pufETH (July). The sequence establishes T14.004 as a structural class: the depeg is a protocol-agnostic consequence of the EigenLayer withdrawal-cap constraint, and every major LRT protocol experienced a depeg event when the redemption queue backlogged. The pufETH case is the fourth T14.004 worked example and confirms the structural mechanism across four independent protocol instances.

For OAK's T14.004 coverage, the pufETH example brings the technique to 4 worked examples — providing sufficient independent anchors to support continued `emerging` classification with a path to `observed` as the 2025 and subsequent LRT cohorts mature and additional depeg events are documented at other restaking platforms (Symbiotic, Karak, Jito) beyond EigenLayer.
