# PlayDapp $290M Private Key Compromise — Gaming Platform Exploit — 2024-02

**Loss:** $290M (200M PLA tokens minted by attacker via compromised deployer key, then laundered). PLA token price collapsed ~90% post-exploit.
**OAK Techniques observed:** OAK-T11.001 (Third-Party Signing Vendor Compromise) — private key compromise of the PLA token deployer address; OAK-T5.001 (Hard LP Drain) — attacker minted 200M new PLA tokens diluting existing holders; OAK-T7.002 (CEX Deposit-Address Layering) — attacker attempted to launder via centralized exchanges which were alerted and froze some addresses.
**Attribution:** **pseudonymous** — attacker address identified on-chain. PlayDapp offered $1M whitehat bounty for return; attacker did not respond. Lazarus Group attribution not publicly confirmed as of v0.1.

**Key teaching point:** The PlayDapp exploit demonstrates the **deployer-key-compromise → unlimited mint** pattern: the attacker gained access to the PLA token's deployer private key, which retained mint authority, and minted 200M PLA tokens (~$290M at pre-exploit valuation). The key management failure was structural: a deployer key with unbounded mint authority, no multisig requirement, no timelock, and no mint-cap ceiling. Detection approach: monitor token contracts for deployer-key-retained mint authority post-launch; flag any contract where the deployer EOA retains unbounded mint capability without timelock/multisig gating.

## Summary

On February 9, 2024, the PlayDapp gaming platform's PLA token contract was exploited. The attacker gained access to the deployer's private key — which retained mint authority over the PLA token — and minted 200M PLA tokens worth approximately $290M at pre-exploit market prices.

PlayDapp publicly identified the attacker's address and offered a $1M whitehat bounty for return of the funds. The attacker did not respond. PlayDapp then announced a token migration (new PDA token via airdrop snapshot) and coordinated with exchanges (Binance, Coinbase, Gate.io, etc.) to freeze the attacker's deposit addresses where possible.

The PLA token was delisted from major exchanges and the price collapsed ~90%. Snapshot-based migration to the replacement PDA token was executed in the following weeks.

## Timeline

| When | Event | OAK ref |
|---|---|---|
| 2024-02-09 | Attacker gains access to PLA token deployer private key | **T11.001 private key compromise** |
| 2024-02-09 | 200M PLA tokens minted (~$290M) | **T5.001 mint dilution** |
| 2024-02-10 | PlayDapp announces exploit, offers $1M whitehat bounty | (public disclosure) |
| 2024-02-12 | Attacker deposits tokens to exchanges; some funds frozen | **T7.002 CEX deposit** |
| 2024-02-13 | PlayDapp announces PDA token migration via snapshot | (remediation) |
| 2024-02-16 | PLA trading halted on major exchanges | (exchange coordination) |

## What defenders observed

- **Deployer key retained unbounded mint authority.** The PLA token contract's deployer EOA retained `mint` capability without a multisig, timelock, or mint-cap ceiling. This is a T1-class structural vulnerability at the token-design layer that became a T11-class exploit at the custody layer.
- **Exchange freeze coordination was partially effective.** Exchanges that received attacker-deposited PLA tokens froze accounts, but the attacker had already liquidated significant volume before the freeze window closed. Freeze response time was measured in days, not hours — slower than the Curve Finance freeze coordination benchmark.
- **Snapshot-based token migration as post-exploit remediation.** PlayDapp airdropped PDA tokens to pre-exploit PLA holders based on a snapshot. Token migration is the nuclear option for token-contract compromise but is effective when the community supports it.
- **Gaming platform risk surface is under-modeled in crypto-incident taxonomies.** PlayDapp was a gaming infrastructure provider, not a DeFi protocol. Its token was the primary on-chain artefact; the exploit was purely at the token-contract-deployer custody layer with no protocol-specific vulnerability.

## What this example tells contributors

- **Deployer-key mint authority is a T1/T11 intersection surface.** Token contracts where the deployer EOA retains unbounded mint authority should be classified as elevated risk regardless of sector (DeFi, gaming, NFT). The control: multisig + timelock + mint-cap ceiling on any post-launch mint capability.
- **Gaming-platform incidents are structurally similar to DeFi-token incidents at the custody layer.** OAK's T11 classification applies uniformly: whether the compromised deployer key belongs to a DeFi protocol, a gaming platform, or an NFT collection, the on-chain artefact (unauthorized mint from a deployer-controlled address) and the custody failure (single-EOA key with unbounded authority) are identical.
- **Exchange freeze coordination time is the primary recovery rate determinant.** PlayDapp's days-scale freeze window resulted in lower recovery than Curve Finance's hours-scale window. The freeze-response SLA comparison between these cases should inform compliance-team operational benchmarks.

## Public references

- [PlayDapp Official Announcement (February 2024)](https://playdapp.io/)
- Attacker address identified on Ethereum; exchange deposits tracked to Binance, Coinbase, Gate.io.
- PLA token contract: Ethereum mainnet; token migration to PDA executed February-March 2024.
