# Echo Protocol — compromised single-signature admin key mints 1,000 unbacked eBTC — Echo eBTC / Monad — 2026-05-18

**Loss:** **~\$76.7M notional**: about 1,000 unauthorized eBTC minted, per [Cointelegraph](https://cointelegraph.com/news/echo-protocols-ebtc-exploited-for-76m-in-admin-key-compromise) (2026-05-19). **Realised:** about 11.29 WBTC (roughly \$867,700) borrowed against 45 eBTC deposited on Curvance, per [The Block](https://www.theblock.co/news/ecosystems/2026-05-18-echo-protocol-monad-exploit-401771); Monad co-founder Keone Hon said researchers determined about \$816,000 was stolen ([The Block](https://www.theblock.co/news/ecosystems/2026-05-18-echo-protocol-monad-exploit-401771)). The attacker still held 955 eBTC; Echo said it regained control of the keys and burned them ([The Block](https://www.theblock.co/news/ecosystems/2026-05-18-echo-protocol-monad-exploit-401771)). Cointelegraph reports the 955 eBTC at about \$73M by DeBank; The Block notes Lookonchain's figure appears to contain a typo, so the notional value of the held eBTC is not a loss figure.

**OAK Techniques observed:** **OAK-T11.014** (Operator Privileged-Key Compromise, *primary*). Echo said a compromised admin key caused the exploit on its Monad deployment ([The Block](https://www.theblock.co/news/ecosystems/2026-05-18-echo-protocol-monad-exploit-401771)). Developer Marioo said the eBTC contract "worked exactly as designed" and the cause was "operational, not technical" ([Cointelegraph](https://cointelegraph.com/news/echo-protocols-ebtc-exploited-for-76m-in-admin-key-compromise)). See [`techniques/T11.014-operator-privileged-key-compromise.md`](../techniques/T11.014-operator-privileged-key-compromise.md). **OAK-T7.003** (cross-chain bridge laundering): the borrowed WBTC was bridged to Ethereum and swapped for ETH ([Cointelegraph](https://cointelegraph.com/news/echo-protocols-ebtc-exploited-for-76m-in-admin-key-compromise)). **OAK-T7.001** (mixer-routed hop): about 384 ETH went to Tornado Cash per PeckShield as relayed by Cointelegraph; The Block says 385 ETH. The earlier version of this file filed the incident under T10.002 as a forged bridge message with a Hacken-audited committee multisig; neither source opened says that, so T10.002 and T9.004 are dropped.

**Attribution:** **unattributed.** The only address on a page opened is `0x6a0109d3c5ab56277096c75e8f5d1d1d45243415`, which Cointelegraph links to a DeBank profile as the holder of 955 eBTC; the article does not call it the attacker's address. No group or person is named.

**Key teaching point:** **Put the mint authority behind more than one signer, a timelock and a supply cap.** Marioo's account is that the admin role was a single signature with no timelock and no minting supply cap or rate limit, and that Curvance ran no supply sanity check on the new collateral ([Cointelegraph](https://cointelegraph.com/news/echo-protocols-ebtc-exploited-for-76m-in-admin-key-compromise)). A lending market that accepts a freshly minted token as collateral can lend against supply the issuer never backed; Curvance said its isolated-market design kept its other markets unaffected ([The Block](https://www.theblock.co/news/ecosystems/2026-05-18-echo-protocol-monad-exploit-401771)).

## Summary

On 2026-05-18 an attacker minted 1,000 eBTC, Echo's bitcoin liquidity token, on Monad. The pseudonymous account DCF GOD flagged it on X at about 5:55 p.m. ET, and Onchain Lens and Lookonchain followed ([The Block](https://www.theblock.co/news/ecosystems/2026-05-18-echo-protocol-monad-exploit-401771)). The attacker deposited 45 eBTC as collateral on Curvance, borrowed about 11.29 WBTC, bridged it to Ethereum, swapped it for ETH and moved the ETH to Tornado Cash, keeping 955 eBTC ([The Block](https://www.theblock.co/news/ecosystems/2026-05-18-echo-protocol-monad-exploit-401771)). Curvance paused the affected Echo eBTC market. At about 2:30 a.m. ET on 2026-05-19 Echo announced a compromised admin key, said it had regained control of the keys, and said it burned the 955 eBTC the attacker held ([The Block](https://www.theblock.co/news/ecosystems/2026-05-18-echo-protocol-monad-exploit-401771)). How the key was obtained is undisclosed.

## Timeline (UTC)

Stages: **Entry**, **Take**, **Money**, **Response**. The sources give times in ET only (The Block); they are shown as stated, not converted. Transaction hashes are not printed on either page opened and are undisclosed.

| When | What happened | OAK |
|---|---|---|
| Before 2026-05-18 (undisclosed) | The eBTC admin role is held by a single key, with no timelock and no mint cap or rate limit, per Marioo ([Cointelegraph](https://cointelegraph.com/news/echo-protocols-ebtc-exploited-for-76m-in-admin-key-compromise)). How the key was compromised is undisclosed | **T11.014** |
| 2026-05-18 (before ~5:55 p.m. ET, exact time undisclosed) | The attacker uses the admin key to mint 1,000 eBTC on Monad ([The Block](https://www.theblock.co/news/ecosystems/2026-05-18-echo-protocol-monad-exploit-401771)) | **T11.014** |
| 2026-05-18 (undisclosed) | The attacker deposits 45 eBTC (about \$3.45M, per PeckShield via Cointelegraph) on Curvance and borrows about 11.29 WBTC ([The Block](https://www.theblock.co/news/ecosystems/2026-05-18-echo-protocol-monad-exploit-401771)) | extraction |
| 2026-05-18 (undisclosed) | The WBTC is bridged to Ethereum and swapped for ETH ([Cointelegraph](https://cointelegraph.com/news/echo-protocols-ebtc-exploited-for-76m-in-admin-key-compromise)) | **T7.003** |
| 2026-05-18 (undisclosed) | About 384 ETH (The Block: 385 ETH) is sent to Tornado Cash; about 955 eBTC stays in the holder wallet ([Cointelegraph](https://cointelegraph.com/news/echo-protocols-ebtc-exploited-for-76m-in-admin-key-compromise), [The Block](https://www.theblock.co/news/ecosystems/2026-05-18-echo-protocol-monad-exploit-401771)) | **T7.001** |
| 2026-05-18, ~5:55 p.m. ET | DCF GOD flags the exploit on X; Curvance pauses the affected eBTC market; Monad says the network is not affected ([The Block](https://www.theblock.co/news/ecosystems/2026-05-18-echo-protocol-monad-exploit-401771)) | response |
| 2026-05-19, ~2:30 a.m. ET | Echo announces the compromised admin key, says it regained control of the keys and burned the 955 eBTC; pauses cross-chain functions for the Monad deployment and Aptos bridge operations as a precaution ([The Block](https://www.theblock.co/news/ecosystems/2026-05-18-echo-protocol-monad-exploit-401771)) | response |

Key addresses:

- Holder of 955 eBTC per DeBank, as linked by Cointelegraph (not stated to be the attacker): [`0x6a0109d3c5ab56277096c75e8f5d1d1d45243415`](https://debank.com/profile/0x6a0109d3c5ab56277096c75e8f5d1d1d45243415)
- Echo eBTC contract, Curvance market, Tornado Cash deposit: undisclosed on the pages opened.

## Root-cause evidence

- **Technique:** OAK-T11.014
- **Source:** <https://www.theblock.co/news/ecosystems/2026-05-18-echo-protocol-monad-exploit-401771>; <https://cointelegraph.com/news/echo-protocols-ebtc-exploited-for-76m-in-admin-key-compromise>
- **Source type:** news
- **Confidence:** corroborated
- **Evidence:** The Block reports Echo's own announcement of a compromised admin key; Cointelegraph relays an independent developer's account of the same cause. Both articles are news pieces published within a day of the incident, and Echo's announcement was not opened directly, so this is not a post-mortem. How the key was compromised, the transaction hashes and the contract addresses are undisclosed.

## Public references

- The Block, Echo Protocol Monad exploit (2026-05-18): <https://www.theblock.co/news/ecosystems/2026-05-18-echo-protocol-monad-exploit-401771>
- Cointelegraph, Echo Protocol's eBTC exploited for \$76M in admin key compromise (2026-05-19): <https://cointelegraph.com/news/echo-protocols-ebtc-exploited-for-76m-in-admin-key-compromise>
