# OAK Pseudocode Language Specification (PLS) v0.1.0

**Status:** draft  
**Maintainer:** @iZonex  
**Target audience:** spec authors, detection-engine implementors, code-generator authors  

This document defines the formal grammar, type system, and runtime contract for the
pseudocode language used in OAK detection specs (`detection_logic.pseudocode`).
It is the normative reference for all 134 specs — every pseudocode block across
the spec corpus MUST be parseable against this grammar.

---

## 1. Design principles

1. **Readable first.** An investigator with no compiler background must understand the logic.
2. **Compilable.** The grammar is unambiguous and mechanically translatable to Python, Rust, TypeScript.
3. **Data-source abstract.** The language references data sources by logical name; binding to a specific
   blockchain RPC, indexer API, or off-chain feed is the implementation layer's responsibility.
4. **PATH-compositional.** Every spec emits alerts via `emit(PATH_X, ...)`. PATHs are independent
   detection paths within a spec; cross-spec correlation is a higher-order concern.
5. **Deterministic.** Given the same data-source state at the same block height, the same spec
   MUST produce the same alerts.

---

## 2. Lexical grammar

### 2.1 Tokens

```
IDENTIFIER    := [a-zA-Z_][a-zA-Z0-9_]*
INTEGER       := [0-9]+
FLOAT         := [0-9]+ '.' [0-9]+
DURATION      := INTEGER ('s' | 'm' | 'h' | 'd')
STRING        := '"' [^"]* '"'   |   "'" [^']* "'"
COMMENT       := '#' .* (until end-of-line)
BLOCK_COMMENT := '/*' .* '*/'
PATH_LABEL    := 'PATH_' [A-E]
```

### 2.2 Operators

| Category | Operators |
|----------|-----------|
| Assignment | `←` (U+2190) |
| Arithmetic | `+` `−` (U+2212) `×` (U+00D7) `/` `%` |
| Comparison | `=` `≠` (U+2260) `<` `>` `≤` (U+2264) `≥` (U+2265) |
| Logical | `and` `or` `not` |
| Set membership | `∈` (U+2208) `∉` (U+2209) |
| Set operations | `∩` (U+2229) `∪` (U+222A) `−` `∅` (U+2205) |
| Range | `..` (inclusive..inclusive) |
| Pipe (comprehension) | `\|` |
| Lambda key | `→` (U+2192) or `by=` |
| Optional access | `?.` |

### 2.3 Keywords (reserved)

```
for  each  in  where  if  elif  else  and  or  not
on  event  matching  with  as  continue  break
return  emit  None  True  False  null
```

### 2.4 String interpolation

```
"text {expression} more text {expression}"
```

Expressions inside `{...}` are evaluated and coerced to string. Occurrences inside
`severity` and `guidance` fields of `emit()` are the primary use.

---

## 3. Type system

### 3.1 Primitive types

| Type | Description | Literal examples |
|------|-------------|-----------------|
| `integer` | 256-bit signed integer | `0`, `42`, `−1` |
| `number` | IEEE 754 float64 | `0.01`, `3.14`, `1e10` |
| `boolean` | `True` / `False` | `True`, `False` |
| `string` | UTF-8 string | `"hello"`, `'world'` |
| `duration` | Time interval in seconds | `30d`, `48h`, `365d` |
| `address` | 20-byte (EVM) or 32-byte (Solana/Aptos/Sui) | `0x...` |
| `selector` | 4-byte function selector | `0x8129fc1c` |
| `hash` | 32-byte keccak256/sha256 | `0x...` |
| `block_number` | Chain block height | `18500000` |
| `null` | Absent value | `null`, `∅` |

### 3.2 Collection types

| Type | Description | Construction |
|------|-------------|-------------|
| `list<T>` | Ordered, indexable | `[a, b, c]` or comprehension |
| `set<T>` | Unordered, unique | `{a, b, c}` or comprehension |
| `map<K,V>` | Key-value | `{key: value, ...}` or comprehension |
| `tuple` | Fixed-arity heterogeneous | `(a, b, c)` |

### 3.3 Domain types (opaque)

These types are produced by data-source accessors and consumed by built-in functions.
Implementations map them to concrete schemas.

| Type | Description | Produced by |
|------|-------------|-------------|
| `contract` | Deployed contract handle | `query_louper()`, `get_contract_deployment_timestamp()` |
| `tx_trace` | Transaction call trace | `get_call_trace()` |
| `event` | Contract event log entry | data source iteration |
| `pool` | DEX pool handle | `creates_new_pool()`, pool iteration |
| `vault` | ERC-4626 vault handle | vault iteration |
| `bridge` | Bridge contract handle | bridge iteration |
| `oracle` | Oracle feed handle | oracle iteration |
| `validator` | Bridge/AVS validator descriptor | validator set iteration |
| `attestation` | Device attestation result | `execute_vendor_crypto_challenge()` |
| `bundle` | MEV relay bundle | data source `bundle_data` |
| `curve` | Mathematical function (x→y) | `compute_brute_force_completion_curve()` |

### 3.4 Generics in built-in signatures

```
list<T>.map(fn: T → U): list<U>
list<T>.filter(fn: T → boolean): list<T>
list<T>.group_by(fn: T → K): map<K, list<T>>
```

---

## 4. Control flow

### 4.1 `for each` — primary iteration

```
for each <variable> in <iterable>:
    <body>

for each <variable> in <iterable> where <condition>:
    <body>

for each (<v1>, <v2>) in <iterable_of_tuples>:
    <body>
```

The `where` clause is syntactic sugar for an inline filter — it is evaluated before
the first body statement.

### 4.2 `if` / `elif` / `else`

```
if <condition>:
    <body>
elif <condition>:
    <body>
else:
    <body>
```

### 4.3 Ternary expression (inline conditional)

```
<value_if_true> if <condition> else <value_if_false>

# Multi-branch
value1 if condition1 else
value2 if condition2 else
value3
```

### 4.4 `on event` — reactive trigger

```
on event <variable> ∈ <event_source> matching <selector_set>:
    <body>
```

Semantics: the body executes once per matched event. This is the primary
continuous-monitoring construct. Inside the body, `E.block`, `E.tx`, `E.from`,
`E.signature`, `E.args` are available.

### 4.5 `with chain_fork(<block>)` — sandboxed simulation

```
with chain_fork(<block>):
    <body>
```

Semantics: the body executes against a temporary fork of chain state at the given
block. State mutations inside the body are discarded. Used by PATHs that need to
simulate "what if" scenarios (e.g., setFee(MAX), process invalid message).

### 4.6 `with chain_fork():` — default to current block

```
with chain_fork():
    <body>
```

Forks at the current detection block.

### 4.7 `as(<role>)` — identity switch inside fork

```
with chain_fork():
    as(owner): call setFee(MAX)
```

Switches `tx.origin` and `msg.sender` to the specified role address for the
duration of the call.

---

## 5. Expressions

### 5.1 Comprehension forms

```
# List comprehension
[<expr> for <var> in <iterable>]
[<expr> for <var> in <iterable> if <condition>]
[<expr> for <var> in <iterable> where <condition>]

# Set comprehension
{<expr> for <var> in <iterable>}
{<expr> for <var> in <iterable> where <condition>}

# Map comprehension
{<key_expr>: <value_expr> for <var> in <iterable>}
```

### 5.2 Set operations

```
A ∩ B    # intersection
A ∪ B    # union
A − B    # difference
A ∈ B    # membership test
A ∉ B    # non-membership
∅        # empty set
len(A)   # cardinality
```

### 5.3 Aggregation expressions

```
sum(<expr> for <var> in <iterable>)
sum(<expr> for <var> in <iterable> where <condition>)
len(<iterable>)
max(<iterable>)
min(<iterable>)
mean(<iterable>)
abs(<number>)
round(<number>)
```

### 5.4 Lambda-like key arguments

```
sorted(<iterable>, by=<expr>)
sorted(<iterable>, by=<expr>, descending)
group_by(<iterable>, key=<expr>)
max(<iterable>, key=<expr>)
min(<iterable>, key=<expr>)
```

### 5.5 Range

```
0..N           # inclusive range: 0, 1, ..., N
0..min_blocks  # variable endpoint
```

### 5.6 Slice notation

```
list[start:end]       # Python-style slice
list[−window:]        # last `window` elements (negative index from end)
list[:n]              # first n elements
```

### 5.7 Optional chaining

```
obj?.field            # null if obj is null, otherwise obj.field
obj?.method(args)     # null if obj is null
```

### 5.8 Generator expressions (lazy)

```
# In aggregation calls:
sum(v.stake for v in B.validator_set)
any(condition for x in collection)
all(condition for x in collection)
```

---

## 6. Function definitions

### 6.1 Scalar helper

```
func_name(param1, param2, ..., paramN) := <expression>
```

### 6.2 Conditional helper (multi-branch)

```
func_name(p) :=
    value1 if condition1 else
    value2 if condition2 else
    value3
```

### 6.3 Block helper (multi-statement)

```
func_name(p) :=
    stmt1
    stmt2
    ...
    stmtN
    return <expression>
```

### 6.4 Visibility and scope

- Helpers are file-private (scoped to the spec).
- No cross-spec function imports.
- Parameters are pass-by-value.
- Recursion is not permitted.

---

## 7. `emit()` specification

### 7.1 Signature

```
emit(PATH_X, <keyword_args>...)
```

### 7.2 Required keyword arguments

| Argument | Type | Description |
|----------|------|-------------|
| `PATH_X` | keyword | The detection path that fired (PATH_A through PATH_E) |

### 7.3 Standard keyword arguments (all PATHs SHOULD include)

| Argument | Type | Description |
|----------|------|-------------|
| `severity` | `"critical"` \| `"high"` \| `"medium"` \| `"low"` | Alert severity |
| `guidance` | `string` (interpolated) | Human-readable operator guidance |
| `chain` | `string` | Chain where the alert fired |

### 7.4 Spec-specific keyword arguments

Defined per spec in `output_alert`. Every argument listed in the spec's `output_alert`
field MUST appear in at least one `emit()` call.

### 7.5 Semantics

- Each `emit()` produces exactly one alert.
- PATHs are independent: PATH_A and PATH_B firing on the same transaction produce
  two alerts with distinct `detection_path` values.
- `severity` is per-emit, not per-spec. The same PATH may emit at different severities
  depending on parameter thresholds.
- `guidance` strings use f-string-style interpolation. Variables in `{...}` are
  evaluated in the current scope.

---

## 8. Data source interface

### 8.1 Contract

The pseudocode references data sources by their logical name as declared in the
spec's `data_sources` field. The implementation layer resolves each logical name
to a concrete data provider.

### 8.2 Standard data source catalog

| Logical name | Provides | Example implementations |
|-------------|----------|------------------------|
| `tx_call_trace` | Per-transaction EVM call traces (Parity trace_* or debug_traceTransaction) | Erigon, Geth debug, QuickNode |
| `contract_bytecode` | Deployed contract bytecode by address | Etherscan, Sourcify, RPC eth_getCode |
| `contract_source` | Verified Solidity/Vyper source | Etherscan, Sourcify |
| `contract_storage` | Per-slot storage reads (eth_getStorageAt) | Any RPC |
| `contract_events` | Contract event logs (eth_getLogs) | Any RPC, The Graph |
| `contract_deployment` | Contract deployment timestamps and deployer addresses | Etherscan, Blockscout |
| `dex_trades` | DEX swap events with price/volume | Dune, The Graph, DefiLlama |
| `reference_price_feed` | CEX/DEX mid-market reference prices | Chainlink, Pyth, Binance API |
| `oracle_feed` | Oracle-reported values (Chainlink, Tellor, UMA) | Oracle contract events |
| `mempool_transaction` | Pending transactions before inclusion | Flashbots, bloXroute, local node txpool |
| `bundle_data` | MEV relay bundle contents | Flashbots, bloXroute, Eden, ultrasound |
| `mev_relay_feed` | Bundle metadata (builder, relay, block) | mevboost.pics, eigenphi |
| `governance_events` | Governance proposal/approval/execution events | Tally, Boardroom, contract events |
| `bridge_message_logs` | Cross-chain message events (sent/received) | LayerZero Scan, Wormhole Explorer |
| `audit_report_feed` | Published audit reports with facet/bytecode lists | Solidity Finance, Trail of Bits, OpenZeppelin |
| `breach_disclosure_feed` | Third-party breach disclosures | HaveIBeenPwned, vendor security bulletins |
| `token_prices` | Per-token USD/ETH price series | DefiLlama, CoinGecko, Dune |
| `avs_event_feed` | EigenLayer AVS events (yield, slashing, operator changes) | EigenLayer subgraph, contract events |
| `withdrawal_queue_state` | LRT withdrawal queue snapshots | Contract storage reads |
| `validator_set_attestation` | Bridge/AVS validator set composition and stake | Contract storage, staking explorer |
| `staking_rewards` | Validator staking reward history | Staking indexers, reward events |
| `relayer_authorization_events` | Cross-chain relayer set changes | Bridge contract events |
| `liquidation_events` | Lending protocol liquidation events | The Graph, Dune, contract events |
| `lending_protocol_state` | Lending pool state (borrow limits, collateral ratios) | Contract storage reads |
| `domain_registration` | New domain registration feed | CertSpotter, WhoisXML, ZoneFiles |
| `certificate_transparency_log` | Certificate transparency log entries | CertSpotter, crt.sh |
| `token_deployment_events` | Token contract deployment events | Contract deployment monitoring |
| `authority_graph` | On-chain authority/ownership relationship graph | mg-detectors-rs, custom indexers |
| `simulation_environment` | Forked-chain simulation capability | Tenderly, Anvil, Ganache |
| `funder_graph` | Cross-address funding relationship graph | Chainalysis, TRM, Elliptic, mg-detectors-rs |

### 8.3 Data source access pattern

Data sources are accessed through iteration (the `for each ... in DATASOURCE` pattern)
or through point queries (`eth_call()`, `getStorageAt()`, `simulate_call()`).
Implementations MUST provide:

- **Iteration:** a cursor/stream interface that yields typed records
- **Point query:** a request/response interface with block-height parameter
- **Simulation:** a sandboxed EVM fork with state override capability

---

## 9. PATH composition semantics

### 9.1 PATH independence

PATH_A through PATH_E within a spec are independent detection paths — they share
helper functions and parameters but do not share mutable state. An alert from PATH_A
does not suppress or amplify PATH_B.

### 9.2 Cross-PATH correlation (PATH E convention)

By convention, PATH_E performs cross-PATH correlation: it consumes the aggregated
outputs of PATH_A through PATH_D over a time window. PATH_E alerts indicate
multi-signal convergence, not a single-signal detection.

The pseudocode naming convention for this pattern:

```
PATH_A_ALERTS   # the accumulated alerts from PATH_A over a window
PATH_B_ALERTS   # same for PATH_B
...
```

This is not a language feature — it is a naming convention. Implementations
must provide a temporal windowed store of prior emits to serve as input
to PATH_E.

### 9.3 Explicit cross-spec composition

Not defined in PLS v0.1.0. Cross-spec correlation (e.g., "this T9.001 alert
and this T9.002 alert share a funder cluster") is a higher-order concern
addressed by the correlation engine, not by the pseudocode language.

---

## 10. EBNF grammar (normative)

This grammar defines the parseable subset. It is the reference for transpiler
implementations and spec validators.

```ebnf
(* Top-level *)
spec           := { helper_def } { path_def } ;
helper_def     := IDENTIFIER '(' [ param_list ] ')' ':=' helper_body ;
helper_body    := expression | conditional_block | statement_block ;
param_list     := IDENTIFIER { ',' IDENTIFIER } ;

(* PATH blocks *)
path_def       := comment? for_each_stmt | comment? on_event_stmt
                | comment? with_stmt | comment? if_stmt_standalone ;

(* Statements *)
statement      := assignment | for_each_stmt | if_stmt | emit_stmt
                | on_event_stmt | with_stmt | return_stmt
                | continue_stmt | break_stmt | expression_stmt ;
statement_block:= statement { statement } ;

assignment     := IDENTIFIER '←' expression ;
emit_stmt      := 'emit' '(' 'PATH_' [A-E] { ',' keyword_arg } ')' ;
keyword_arg    := IDENTIFIER '=' expression ;
expression_stmt:= expression ;
return_stmt    := 'return' expression ;
continue_stmt  := 'continue' ;
break_stmt     := 'break' ;

(* Control flow *)
for_each_stmt  := 'for' 'each' binding 'in' expression [ 'where' expression ] ':'
                  statement_block ;
binding        := IDENTIFIER | '(' IDENTIFIER { ',' IDENTIFIER } ')' ;

if_stmt        := 'if' expression ':' statement_block
                  { 'elif' expression ':' statement_block }
                  [ 'else' ':' statement_block ] ;
if_stmt_standalone := if_stmt ;

on_event_stmt  := 'on' 'event' IDENTIFIER '∈' expression
                  [ 'matching' expression ] ':' statement_block ;

with_stmt      := 'with' 'chain_fork' '(' [ expression ] ')' ':' statement_block ;

(* Expressions *)
expression     := conditional_expr ;
conditional_expr := logical_or { 'if' logical_or 'else' logical_or } ;
logical_or     := logical_and { 'or' logical_and } ;
logical_and    := not_expr { 'and' not_expr } ;
not_expr       := [ 'not' ] comparison ;
comparison     := set_expr { comp_op set_expr } ;
comp_op        := '=' | '≠' | '<' | '>' | '≤' | '≥' | '∈' | '∉' ;
set_expr       := additive { set_op additive } ;
set_op         := '∩' | '∪' | '−' ;
additive       := multiplicative { add_op multiplicative } ;
add_op         := '+' | '−' ;
multiplicative := unary { mul_op unary } ;
mul_op         := '×' | '/' | '%' ;
unary          := [ '−' ] primary ;

primary        := literal | IDENTIFIER | function_call
                | comprehension | '(' expression ')'
                | IDENTIFIER '?' '.' IDENTIFIER
                | IDENTIFIER '[' expression ']'
                | IDENTIFIER '[' expression ':' expression ']'
                | primary '[' '−'? expression ':' ']' ;

function_call  := IDENTIFIER '(' [ arg_list ] ')' ;
arg_list       := expression { ',' expression } | keyword_splat ;
keyword_splat  := IDENTIFIER '=' expression { ',' IDENTIFIER '=' expression } ;

comprehension  := list_comp | set_comp | map_comp ;
list_comp      := '[' expression 'for' binding 'in' expression [ 'where' expression ] ']' ;
set_comp       := '{' expression 'for' binding 'in' expression [ 'where' expression ] '}' ;
map_comp       := '{' expression ':' expression 'for' binding 'in' expression '}' ;

(* Literals *)
literal        := INTEGER | FLOAT | STRING | DURATION
                | 'True' | 'False' | 'None' | 'null' | '∅'
                | range | list_literal | set_literal | map_literal ;
range          := expression '..' expression ;
list_literal   := '[' [ expression { ',' expression } ] ']' ;
set_literal    := '{' [ expression { ',' expression } ] '}' ;
map_literal    := '{' [ expression ':' expression { ',' expression ':' expression } ] '}' ;
```

---

## 11. Built-in function catalog

Built-in functions are organized by domain. Each entry includes the signature,
return type, and the data source(s) it depends on.

### 11.1 Blockchain state — point queries

```
eth_call(address, selector, block?) → any
  Data sources: contract_storage
  Performs an eth_call (read-only) against the contract at the given block.
  Returns the ABI-decoded return value.

getStorageAt(contract, slot, block) → value
  Data sources: contract_storage
  Reads raw storage slot value at a given block.

is_contract(address) → boolean
  Data sources: contract_bytecode
  True if the address has deployed bytecode.

get_contract_deployment_timestamp(address) → timestamp
  Data sources: contract_deployment
  Returns the block timestamp of the transaction that deployed the contract.

get_contract_deployment_block(address) → block_number
  Data sources: contract_deployment
```

### 11.2 Blockchain state — trace analysis

```
get_call_trace(tx_hash) → tx_trace
  Data sources: tx_call_trace
  Returns the full internal call trace for a transaction.

find_outermost_frame(trace, target_contract) → frame | null
  Data sources: tx_call_trace
  Returns the outermost (earliest) call frame for the target contract,
  or null if the contract is not in the trace.

find_consumer_value_transfer(trace, staticcall_frame) → frame | null
  Data sources: tx_call_trace
  Returns the call frame that consumes the staticcall result for a
  value-transfer decision (liquidation, borrow, redeem, etc.).

has_cross_contract_callback(tx) → boolean
  Data sources: tx_call_trace
  True if the transaction's trace shows a callback pattern where contract A
  calls B which calls back into A before A's first frame returns.

classify_economic_action(frame) → string | null
  Data sources: tx_call_trace, contract_bytecode
  Classifies a frame's purpose: "liquidation", "borrow", "redeem", "mint", etc.
  Returns null if not an economic action.
```

### 11.3 Blockchain state — event queries

```
query_governance_events(chain, proposal_id) → proposal | null
  Data sources: governance_events
  Returns the governance proposal data (params, proposer, vote counts) or null.

find_role_grant_event(contract, role, grantee_address) → event | null
  Data sources: contract_events
  Returns the event that granted a specific role, or null.

find_relayer_addition_event(executor, relayer_address) → event | null
  Data sources: relayer_authorization_events
  Returns the event where a relayer was added to an executor.

find_corresponding_governance_proposal(change_event) → proposal | null
  Data sources: governance_events
  Cross-references a relayer/permission change against governance proposals.
```

### 11.4 Blockchain state — iterative access

```
get_avs_events(avs, lookback_blocks) → list<event>
  Data sources: avs_event_feed
  Returns AVS-related events (yield_distribution, slashing, operator_set_change,
  strategy_addition, strategy_removal, fee_change) in the window.

get_recent_avs_events(avs, lookback_blocks) → list<event>
  Data sources: avs_event_feed
  Alias for get_avs_events with event-type filtering.

get_transactions_between(start_block, end_block, address) → list<tx>
  Data sources: tx_call_trace, mempool_transaction
  Returns all transactions touching the address between two blocks.

get_trades_in_blocks(pool, from_block, max_blocks) → list<trade>
  Data sources: dex_trades
  Returns all trades for a pool within a block range.

get_view_reads_in_block(block, target_contract) → list<read>
  Data sources: tx_call_trace
  Returns all view-function reads of the target contract in a given block.

get_deployer_history(deployer, platform) → object
  Data sources: token_deployment_events, contract_deployment
  Returns {prior_launches: integer, ...} for a deployer on a platform.
```

### 11.5 DEX and price

```
reference_price(asset, block, venues) → number
  Data sources: reference_price_feed
  Returns the reference (CEX mid-market or multi-venue TWAP) price of an asset.

get_pool_price(pool, block, tx_index) → number
  Data sources: dex_trades, contract_storage
  Returns the spot price at a specific tx position within a block.

compute_output_at_price(amount_in, price) → number
  Pure function: computes swap output given input amount and price.

compute_price_move(tx, pool) → number
  Data sources: dex_trades
  Computes the price impact of a specific transaction on a pool.

get_twap(pool, from_block, to_block) → number
  Data sources: dex_trades
  Time-weighted average price over a block range.

get_cumulative_volume(pool, from_block, to_block) → number
  Data sources: dex_trades

get_first_trade_block(pool, reference_block) → integer
  Data sources: dex_trades
  Returns the block of the first trade in the pool on/before the reference block.

simulate_swap(pool, token_in, token_out, amount_in, price_limit) → number
  Data sources: simulation_environment
  Returns output amount for a simulated swap at the given price limit.

simulate_swap_at_current_price(pool, token_in, token_out, amount_in) → number
  Data sources: simulation_environment, dex_trades

compute_slippage(amount_out_min, amount_in, reserves) → number
  Pure function: computes the effective slippage parameter from raw values.

compute_slippage_band(swap) → object
  Pure function: computes the full slippage band (min_output, expected_output, band_width)
  from a swap's parameters.

compute_recent_volatility(pool, lookback_blocks) → number
  Data sources: dex_trades
  Standard deviation of log returns over the lookback window.
```

### 11.6 Simulation

```
simulate_call(contract, function_signature, args) → call_result
  Data sources: simulation_environment
  Executes a call against a forked chain state. Returns {succeeded: boolean, return_data: any}.

simulate_staticcall(target, input_calldata, block) → value
  Data sources: simulation_environment
  Executes a staticcall at a given block height. Returns the return value.

simulate_transfer(amount, from, to) → transfer_result
  Data sources: simulation_environment
  Simulates a token transfer and returns {fee: number, success: boolean}.

random_invalid_message(bridge) → message
  Data sources: contract_bytecode
  Generates a structurally-valid but unverifiable message for smoke testing.

chain_fork(block) → context_manager
  Data sources: simulation_environment
  Creates a sandboxed fork at the given block. Use with `with chain_fork(block):`.
```

### 11.7 Static analysis (bytecode/source)

```
find_external_calls_before_guard_write(bytecode) → list<call_site>
  Data sources: contract_bytecode
  Returns all CALL/DELEGATECALL/STATICCALL sites reachable before the
  SSTORE that writes the initializer guard flag.

classify_target(call_site_address, implementation_address) → string
  Data sources: contract_bytecode
  Returns "user_supplied", "known_protocol", "zero_address", or "delegatecall_target".

has_external_call_surface(facet) → boolean
  Data sources: contract_bytecode
  True if the facet bytecode contains CALL, DELEGATECALL, or STATICCALL opcodes.

has_token_transfer_logic(facet) → boolean
  Data sources: contract_bytecode
  True if the facet bytecode contains transfer/transferFrom/approve selector pushes.

has_delegatecall_forwarding(facet) → boolean
  Data sources: contract_bytecode

has_selfdestruct_capability(facet) → boolean
  Data sources: contract_bytecode

reentrancy_surface_score(contract) → integer (0-5)
  Data sources: contract_bytecode
  Scores a contract's reentrancy exposure including staticcall paths.

resolve_modifier_chain(selector) → gate | None
  Data sources: contract_bytecode, contract_source
  Traces the modifier chain guarding a function. Returns None if ungated.

resolve_authority_addresses(gate) → list<address>
  Data sources: contract_bytecode, authority_graph
  Resolves the set of addresses that control a given access gate.
```

### 11.8 Address and entity attribution

```
address_cluster_distance(address_a, address_b) → number (0.0–1.0)
  Data sources: funder_graph
  Returns the clustering distance between two addresses (0=identical entity, 1=unrelated).

shared_funding(address_set, hops) → boolean
  Data sources: funder_graph
  True if all addresses in the set share a common funder within `hops` hops.

count_same_deployer_interactions(sniper, deployer) → integer
  Data sources: dex_trades, token_deployment_events

count_distinct_legal_entities(validators) → integer
  Data sources: validator_set_attestation
  Resolves each validator address to a legal entity; returns distinct entity count.

resolve_entity(address) → entity | null
  Data sources: validator_set_attestation, funder_graph
  Maps an address to a known legal entity or cluster label.

count_stake_controlled_by_entity(entity, validator_set) → number
  Data sources: validator_set_attestation
```

### 11.9 Amount extraction and estimation

```
estimate_max_extractable_value(swap, slippage_tolerance) → number
  Pure function: amount_in × slippage × price.

estimate_gas_cost(pending_swap) → number
  Pure function: estimates the gas cost of a transaction in USD.

estimate_slippage_band_extraction(front_run, victim_swap, back_run) → number
  Pure function: computes the attacker's profit from a slippage-band sandwich.

estimate_value_at_risk(stale_value, settled_value, action, frame) → number
  Data sources: lending_protocol_state
  Estimates the USD value at risk from a stale read consumed for `action`.

compute_loss_from_stale_read(read, stale_value, settled_value) → number
  Data sources: lending_protocol_state
```

### 11.10 Classification and detection

```
is_token_buy(tx, token) → boolean
  Data sources: dex_trades, tx_call_trace

is_token_sell(tx, token) → boolean
  Data sources: dex_trades, tx_call_trace

creates_new_pool(tx) → boolean
  Data sources: tx_call_trace, contract_events
  True if the transaction deploys a new DEX liquidity pool.

is_consumed_for_value_transfer(protocol, staticcall_result) → boolean
  Data sources: tx_call_trace, contract_bytecode
  True if the staticcall result influences a value-transfer decision in the protocol.

classify_bundle(front_tx, add_liq_tx, back_tx) → string
  Data sources: bundle_data, mempool_transaction
  Returns "atomic_bundle", "mempool_snipe", or "coincidence".

detect_sandwich_around_addLiquidity(trades, creation_tx) → object | null
  Data sources: dex_trades
  Returns {sniper, profit, bundle_type} or null if no sandwich detected.

detect_queue_front_running(queue) → boolean
  Data sources: withdrawal_queue_state, avs_event_feed
  True if addresses deposit immediately before the withdrawal queue closes.

detect_queue_anomalies(queue, lookback_blocks) → list<anomaly>
  Data sources: withdrawal_queue_state

correlate_with_avs_events(actions) → number (0.0–1.0)
  Data sources: avs_event_feed
  Returns the correlation between a set of actions and AVS event timing.

check_mempool_front_run(swap) → boolean
  Data sources: mempool_transaction, bundle_data
  True if a front-run transaction was observed in the mempool before the swap.

estimate_mempool_sandwich_probability(swap_request) → number
  Data sources: mempool_transaction
  Returns estimated probability (0-1) that a pending swap will be sandwiched.

recommended_slippage(swap_request) → number
  Data sources: dex_trades
  Computes the recommended slippage tolerance based on pool depth and volatility.

correlate_swap_paths(swaps) → number (0.0–1.0)
  Data sources: tx_call_trace
  Returns the route correlation between multiple swaps (1.0=same multi-hop route).

find_common_attacker(swaps) → address | null
  Data sources: tx_call_trace, bundle_data

find_sandwich_pairs(bundle) → list<(front, victim, back)>
  Data sources: bundle_data, tx_call_trace

canonical_form(args) → hash
  Pure function: returns a canonical structural hash of call args, ignoring
  addresses/specific values — used for template matching.
```

### 11.11 Bridge and cross-chain

```
query_louper(diamond_address) → set<facet>
  Data sources: contract_bytecode, contract_storage
  Enumerates all facets and their function selectors via IDiamondLoupe.

load_audit_report_facets(audit_report) → set<facet>
  Data sources: audit_report_feed
  Returns the set of facets listed in the audit report.

load_audit_report_selectors(audit_report) → map<selector, facet_info>
  Data sources: audit_report_feed

find_supplemental_audit(diamond, facet_address) → audit_report | null
  Data sources: audit_report_feed

compute_bridge_tvl(bridge) → number
  Data sources: contract_storage, token_prices

compute_annualized_yield(rewards, stake) → number
  Pure function: annualizes a validator's reward stream.

get_authorized_relayers(executor_address) → list<address>
  Data sources: contract_storage, relayer_authorization_events

get_governance_timelock(chain, governance_contract) → duration
  Data sources: governance_events, contract_storage

compute_state_diff(contract, pre=frame, post=frame) → map<string, change>
  Pure function: diffs the contract state before and after two call frames.

is_atomic_deploy_and_init(tx) → boolean
  Data sources: contract_deployment, tx_call_trace
  True if the transaction both deploys and initializes a proxy in one atomic call.

decode_diamond_cut_facets(calldata) → list<facet>
  Data sources: contract_events
  Decodes a DiamondCut event's facet addition data.

decode_diamond_cut_action(calldata) → string
  Data sources: contract_events
  Returns "Add", "Replace", or "Remove".

decode_swap_output(receipt) → number
  Data sources: tx_call_trace, dex_trades

get_dex_spot_price(pool, quote_asset) → number
  Data sources: dex_trades, contract_storage
```

### 11.12 Statistical

```
stdev(series) → number
  Population standard deviation.

pearson_r(series_a, series_b) → number (−1.0 to 1.0)
  Pearson correlation coefficient.

gini(values) → number (0.0 to 1.0)
  Gini coefficient: 2×Σ(i×sorted[i])/(n×Σsorted) − (n+1)/n.

mean(values) → number
  Arithmetic mean.
```

### 11.13 Cryptographic

```
keccak256(bytes...) → hash
  Keccak-256 hash of the concatenated inputs.
```

### 11.14 Off-chain (T11-specific)

These functions reference data sources that do not yet exist as structured feeds.
They are formally specified so that implementors can build the feeds.

```
detect_seed_solicitation_patterns(binary, patterns) → boolean
  Data sources: contract_bytecode (companion app binary analysis)
  Scans a binary for UI strings matching seed-phrase solicitation patterns.

verify_published_checksum(binary, vendor, version) → boolean
  Data sources: breach_disclosure_feed (vendor-published checksums)

execute_vendor_crypto_challenge(device) → attestation
  Data sources: contract_bytecode (vendor attestation protocol)
  Returns {passed: boolean, se_attestation_ok, firmware_hash, ...}.

detect_seal_reapplication(packaging) → boolean
  Data sources: breach_disclosure_feed (vendor packaging specifications)

analyze_domain_content(domain) → content_signals
  Data sources: domain_registration, certificate_transparency_log
  Returns {serves_seed_solicitation_ui, impersonates_vendor_branding,
           has_firmware_update_template, has_qr_code_flow}.

match_vendor_branding(claimed_sender) → vendor | null
  Data sources: breach_disclosure_feed (vendor brand asset registry)

cluster_by_time_and_channel(campaigns, domains, solicitations, window) → list<cluster>
  Pure function: clusters alerts by time proximity and channel overlap.

estimate_overlap(cluster) → number
  Pure function: estimates victim-set intersection across a correlated cluster.

estimate_crypto_user_fraction(demographics, service_type) → number
  Data sources: breach_disclosure_feed

compute_brute_force_completion_curve(hash_scheme, iterations, entropy, hashrate) → curve
  Pure function: expected cumulative password-cracking completion over time.

cumulative_drain_curve(drain_events, from_date) → curve
  Data sources: tx_call_trace
  Observed cumulative drained value plotted against time since breach.

find_first_cloud_backup_drain(wallet) → event | null
  Data sources: breach_disclosure_feed, tx_call_trace

interview_exclusion(victim, attack_vectors) → set<attack_vector>
  Data sources: breach_disclosure_feed (victim interview data)

identify_common_service(victim_cohort) → service | null
  Data sources: breach_disclosure_feed

score_physical_access_risk(travel, border_crossings, accommodation, storage) → number
  Pure function: computes a physical-access risk score (0.0–1.0).

classify_device_vulnerability(device) → classification
  Data sources: breach_disclosure_feed (hardware vulnerability database)
  Returns {class_name, exposure_multiplier}.

estimate_zxcvbn_entropy(passphrase) → number
  Pure function: estimates BIP39 passphrase entropy using zxcvbn algorithm.

rank_by_cloud_exposure(wallets) → ranking
  Pure function: ranks wallets by cloud-exposure score.

cloud_exposure_score(wallet) → integer
  Pure function: estimated number of users exposed to cloud-backup risk.
```

---

## 12. Parameter binding

Every spec declares parameters with `type` and `default`:

```yaml
parameters:
  deviation_threshold: { type: number, default: 0.02 }
  dispute_window_blocks: { type: integer, default: 1800 }
```

Inside pseudocode, parameters are accessed as bare identifiers (e.g., `deviation_threshold`).
The implementation layer MUST:

1. Accept parameter overrides per chain (e.g., `deviation_threshold_polygon: 0.05`).
2. Validate parameter type against the declared `type` field.
3. Apply the default when no override is provided.

---

## 13. Conformance levels

| Level | Requirement |
|-------|-------------|
| **L1 — Parseable** | Pseudocode parses against the EBNF grammar without errors. |
| **L2 — Type-checked** | All variable bindings, function calls, and `emit()` arguments are consistent with declared types. Parameters match their declared types. |
| **L3 — Bound** | Every data-source reference is bound to a concrete provider. Every built-in function has an implementation. |
| **L4 — Calibrated** | All parameters have chain-specific calibrations validated against known-positive incidents. |
| **L5 — Tested** | The spec's positive fixtures pass against a test harness; negative fixtures do not produce false positives. |

Current state of the OAK spec corpus: **L1 (parseable) for most specs; no automated L2-L5 validation exists.**

---

## 14. Versioning

PLS versions track the spec corpus evolution. Breaking changes (grammar changes that
would make existing pseudocode unparseable) require a major version bump.

| PLS version | OAK version | Changes |
|-------------|-------------|---------|
| 0.1.0 | v0.2.0 | Initial formal grammar, type system, built-in catalog extracted from 134 specs |

---

## Appendix A: Operator precedence (lowest to highest)

1. `if` / `else` (ternary conditional)
2. `or`
3. `and`
4. `not`
5. `=` `≠` `<` `>` `≤` `≥` `∈` `∉`
6. `∩` `∪` `−`
7. `+` `−`
8. `×` `/` `%`
9. `−` (unary negation)
10. `.` `?.` `[]` `()` (postfix)

---

## 15. LLM Translation Guide

### 15.1 Philosophy

OAK does not mandate a single transpiler or target language. Instead, the language
specification is designed so that **any capable LLM can translate pseudocode into
production code** in the implementor's language of choice (Python, TypeScript,
Rust, Go, SQL).

The three artefacts an LLM needs for accurate translation:

1. **This PLS document** — grammar, types, control flow semantics
2. **The DSR (Data Source Schema Registry)** — concrete schemas for every `data_source`
3. **The target spec's YAML** — pseudocode + parameters + output_alert

### 15.2 Translation prompt template

```
You are an expert detection engineer translating an OAK detection spec into
production code. You have three documents for context:

1. OAK Pseudocode Language Specification (PLS v0.1.0) — grammar, types, built-in functions
2. OAK Data Source Schema Registry (DSR v0.1.0) — schemas for all data sources
3. The target spec YAML — pseudocode, parameters, output_alert

Your task: translate the pseudocode from the spec into {TARGET_LANGUAGE}.

RULES:
1. Preserve all PATHs as separate functions/classes. Each PATH = one detector.
2. Preserve helper functions as private/static methods.
3. Every built-in function call MUST be implemented. Use the DSR schemas to
   understand the data shape. If a built-in function has no existing
   implementation, generate a stub with the correct signature and a // TODO
   comment referencing the DSR schema.
4. Parameters become constructor arguments or config fields with the spec's
   default values.
5. emit(PATH_X, ...) calls become structured alert objects matching the
   spec's output_alert field.
6. Data-source iteration (for each ... in DATA_SOURCE) binds to a provider
   interface. Generate the interface. The implementor wires the concrete
   provider.
7. "Pure function" built-ins are implemented directly (no external deps).
8. Statistical built-ins (stdev, pearson_r, gini) may use standard libraries.
9. with chain_fork() blocks become try/finally with sandbox setup/teardown.
10. String interpolation in guidance uses the target language's native
    formatting (f-strings, template literals, format!).
11. Add type annotations appropriate for {TARGET_LANGUAGE}.
12. Generate unit test stubs for each positive fixture slug.

Output: a single {TARGET_LANGUAGE} file with all PATHs, helpers, data-source
interfaces, and test stubs. Include import statements.
```

### 15.3 Construct mapping table

For each pseudocode construct, the LLM should produce the target-language
equivalent. This table provides the canonical mapping.

| Pseudocode | Python | TypeScript | Rust |
|-----------|--------|------------|------|
| `x ← expr` | `x = expr` | `const x = expr` | `let x = expr;` |
| `for each x in coll:` | `for x in coll:` | `for (const x of coll) {` | `for x in &coll {` |
| `for each x in coll where cond:` | `for x in coll: if not cond: continue` | `for (const x of coll) { if (!cond) continue;` | `for x in coll.iter().filter(\|x\| cond) {` |
| `if cond: ... elif: ... else:` | `if cond: ... elif: ... else:` | `if (cond) { ... } else if { ... } else {` | `if cond { ... } else if { ... } else {` |
| `value1 if cond else value2` | `value1 if cond else value2` | `cond ? value1 : value2` | `if cond { value1 } else { value2 }` |
| `A ∩ B` | `A & B` (set) / `A.intersection(B)` | `new Set([...A].filter(x => B.has(x)))` | `a.intersection(&b)` (HashSet) |
| `A ∪ B` | `A \| B` (set) | `new Set([...A, ...B])` | `a.union(&b)` (HashSet) |
| `A − B` | `A - B` (set) | `new Set([...A].filter(x => !B.has(x)))` | `a.difference(&b)` (HashSet) |
| `x ∈ coll` | `x in coll` | `coll.has(x)` / `coll.includes(x)` | `coll.contains(&x)` |
| `x ∉ coll` | `x not in coll` | `!coll.has(x)` | `!coll.contains(&x)` |
| `∅` | `set()` / `[]` | `new Set()` / `[]` | `HashSet::new()` / `vec![]` |
| `[expr for v in coll]` | `[expr for v in coll]` | `coll.map(v => expr)` | `coll.iter().map(\|v\| expr).collect()` |
| `[expr for v in coll if cond]` | `[expr for v in coll if cond]` | `coll.filter(v => cond).map(v => expr)` | `coll.iter().filter(\|v\| cond).map(\|v\| expr).collect()` |
| `{expr for v in coll}` | `{expr for v in coll}` | `new Set(coll.map(v => expr))` | `coll.iter().map(\|v\| expr).collect::<HashSet<_>>()` |
| `len(coll)` | `len(coll)` | `coll.length` / `coll.size` | `coll.len()` |
| `sum(expr for v in coll)` | `sum(expr for v in coll)` | `coll.reduce((s, v) => s + expr, 0)` | `coll.iter().map(\|v\| expr).sum()` |
| `any(cond for v in coll)` | `any(cond for v in coll)` | `coll.some(v => cond)` | `coll.iter().any(\|v\| cond)` |
| `all(cond for v in coll)` | `all(cond for v in coll)` | `coll.every(v => cond)` | `coll.iter().all(\|v\| cond)` |
| `max(coll)` / `min(coll)` | `max(coll)` / `min(coll)` | `Math.max(...coll)` / `Math.min(...coll)` | `coll.iter().max()` / `coll.iter().min()` |
| `abs(x)` | `abs(x)` | `Math.abs(x)` | `x.abs()` |
| `obj?.field` | `obj.field if obj else None` | `obj?.field` | `obj.as_ref()?.field` |
| `sorted(coll, by=expr)` | `sorted(coll, key=lambda v: expr)` | `coll.sort((a,b) => expr_a - expr_b)` | `coll.sort_by(\|a, b\| ...)` |
| `N..M` | `range(N, M+1)` | `Array.from({length: M-N+1}, (_,i) => N+i)` | `N..=M` |
| `coll[−n:]` | `coll[-n:]` | `coll.slice(-n)` | `&coll[coll.len()-n..]` |

### 15.4 Built-in function implementation patterns

Built-in functions fall into three implementation classes:

**Class P — Pure functions** (implement directly):
```python
# Pseudocode: stdev(series) → number
def stdev(series: list[float]) -> float:
    n = len(series)
    mean = sum(series) / n
    return (sum((x - mean) ** 2 for x in series) / n) ** 0.5

# Pseudocode: gini(values) → number
def gini(values: list[float]) -> float:
    sv = sorted(values)
    n = len(sv)
    return (2 * sum((i + 1) * v for i, v in enumerate(sv)) / (n * sum(sv))) - (n + 1) / n
```

**Class D — Data-source dependent** (generate interface + provider binding):
```python
# Pseudocode: get_call_trace(tx_hash) → tx_trace
# DSR schema: tx_call_trace (see DSR.md §2.2)
# Interface:
class TxTraceProvider(Protocol):
    def get_call_trace(self, tx_hash: str) -> CallTrace: ...

# Concrete binding (Erigon):
class ErigonTraceProvider(TxTraceProvider):
    def __init__(self, rpc_url: str):
        self.rpc = Web3(HTTPProvider(rpc_url))
    def get_call_trace(self, tx_hash: str) -> CallTrace:
        raw = self.rpc.provider.make_request("trace_transaction", [tx_hash])
        return CallTrace.from_rpc(raw)
```

**Class S — Simulation** (forked environment, heavyweight):
```python
# Pseudocode: with chain_fork(block):
# Implementation: Tenderly VirtualNet or Anvil fork
class ChainFork:
    def __init__(self, block_number: int, rpc_url: str):
        self.fork_id = tenderly.create_fork(block_number)
    def __enter__(self): return self
    def __exit__(self, *args): tenderly.delete_fork(self.fork_id)
    def simulate_call(self, contract, fn, args):
        return tenderly.simulate(self.fork_id, contract, fn, args)
```

### 15.5 Data source provider interface pattern

Every data source referenced in a spec must be translated to a provider interface.
The LLM generates the interface; the implementor wires the concrete provider.

```python
# Generated from data_sources: [dex_trades, tx_call_trace, mempool_transaction]
from abc import ABC, abstractmethod

class DexTradesProvider(ABC):
    """DSR §2.4 — DEX swap events."""
    @abstractmethod
    def get_trades_in_blocks(self, pool: str, from_block: int, max_blocks: int) -> list[Trade]: ...
    @abstractmethod
    def get_twap(self, pool: str, from_block: int, to_block: int) -> float: ...
    @abstractmethod
    def get_cumulative_volume(self, pool: str, from_block: int, to_block: int) -> float: ...

class TxTraceProvider(ABC):
    """DSR §2.2 — Transaction call traces."""
    @abstractmethod
    def get_call_trace(self, tx_hash: str) -> CallTrace: ...
    @abstractmethod
    def find_outermost_frame(self, trace: CallTrace, target: str) -> Frame | None: ...

class MempoolProvider(ABC):
    """DSR §2.17 — Pending transaction pool."""
    @abstractmethod
    def get_pending_swaps(self, pool: str) -> list[PendingSwap]: ...
    @abstractmethod
    def check_front_run(self, swap: ExecutedSwap) -> bool: ...
```

### 15.6 emit() translation pattern

Every `emit(PATH_X, ...)` call becomes a structured alert object. The target
language representation depends on the runtime environment:

```python
# emit(PATH_A, oracle=O, deviation=dev(O,b), severity="high")
# becomes:
@dataclass
class OracleDeviationAlert:
    oak_technique: str = "OAK-T9.001"
    detection_path: str = "PATH_A"
    severity: str                    # "critical" | "high" | "medium" | "low"
    chain: str
    oracle_address: str
    asset: str
    deviation: float
    reference_sources: list[str]
    actor: str | None
    tx: str | None
    evidence: dict

    def emit(self):
        """Publish to alerting pipeline."""
        logger.info(f"OAK {self.oak_technique} {self.detection_path}: "
                     f"{self.severity} — {self.asset} deviation {self.deviation:.2%}")
        # Kafka, Webhook, SIEM, Slack, etc.
```

### 15.7 Guidance string interpolation

The `guidance` field in `emit()` uses f-string-style interpolation with
variables from the current scope. The LLM translates this to the target
language's native string formatting:

```
# Pseudocode:
#   guidance="Oracle {O} deviation {dev(O,b):.2%} exceeds threshold."

# Python:
guidance = f"Oracle {oracle} deviation {dev(oracle, block):.2%} exceeds threshold."

# TypeScript:
const guidance = `Oracle ${oracle} deviation ${(dev(oracle, block) * 100).toFixed(2)}% exceeds threshold.`;

# Rust:
let guidance = format!("Oracle {} deviation {:.2}% exceeds threshold.", oracle, dev(oracle, block) * 100.0);
```

### 15.8 PATH independence translation

Each PATH becomes an independent function or class. They share helper functions
and parameter config but do not share mutable state:

```python
class T9001_OraclePriceManipulation:
    """OAK-T9.001: Oracle Price Manipulation detection."""
    
    def __init__(self, params: OracleParams, providers: OracleProviders):
        self.params = params
        self.providers = providers
    
    def path_a_deviation(self, oracle: Oracle, block: int) -> list[OracleDeviationAlert]:
        """PATH A — oracle vs reference deviation, sustained."""
        ...
    
    def path_b_cross_action(self, tx: Transaction) -> list[CrossActionAlert]:
        """PATH B — same-tx input-move + price-consume by one cluster."""
        ...
    
    def path_c_vault_share(self, vault: Vault, block: int) -> list[VaultShareAlert]:
        """PATH C — vault-share invariant (donation-driven pricePerShare)."""
        ...
    
    def path_d_dispute_window(self, event: OracleEvent) -> list[DisputeWindowAlert]:
        """PATH D — pull-oracle dispute-window respect."""
        ...
```

### 15.9 Complete worked example: T9.001 PATH A

**Input pseudocode (from spec):**
```
dev(O, b) := |O.price(b) − reference_price(O.asset, b, reference_venues)|
              / reference_price(O.asset, b, reference_venues)

# PATH A — oracle vs reference deviation, sustained
for each oracle O consumed by protocol P at block b:
  if all(dev(O, b−i) > deviation_threshold for i in 0..min_blocks-1):
    emit(PATH_A, oracle=O, deviation=dev(O,b), severity=high)
```

**LLM output (Python):**
```python
from dataclasses import dataclass
from typing import Protocol, Iterable

# --- Parameters (from spec YAML) ---
@dataclass
class T9001Params:
    deviation_threshold: float = 0.02
    min_blocks: int = 1
    reference_venues: list[str] = field(default_factory=lambda: ["cex_mid", "multi_venue_twap_30m"])

# --- Provider interfaces (from DSR schemas) ---
class OracleFeedProvider(Protocol):
    """DSR §2.19 — Oracle-reported values."""
    def get_price(self, oracle_address: str, block: int) -> float: ...
    def get_oracles_for_protocol(self, protocol_address: str) -> list[str]: ...

class ReferencePriceProvider(Protocol):
    """DSR §2.14 — Reference (CEX mid-market / multi-venue TWAP) prices."""
    def reference_price(self, asset: str, block: int, venues: list[str]) -> float: ...

class OracleProtocolIndex(Protocol):
    """Maps protocol addresses to the oracles they consume."""
    def get_consumed_oracles(self, protocol_address: str) -> list[tuple[str, str]]: ...
    # returns [(oracle_address, asset), ...]

# --- Alert dataclass (from spec output_alert) ---
@dataclass
class OracleDeviationAlert:
    oak_technique: str = "OAK-T9.001"
    detection_path: str = "PATH_A"
    severity: str = "high"
    chain: str = ""
    oracle_address: str = ""
    asset: str = ""
    deviation: float = 0.0
    reference_sources: list[str] = field(default_factory=list)
    actor: str | None = None
    tx: str | None = None
    evidence: dict = field(default_factory=dict)

# --- Helper (pure function) ---
def dev(
    oracle_address: str,
    block: int,
    asset: str,
    ref_provider: ReferencePriceProvider,
    oracle_provider: OracleFeedProvider,
    venues: list[str],
) -> float:
    oracle_price = oracle_provider.get_price(oracle_address, block)
    ref_price = ref_provider.reference_price(asset, block, venues)
    if ref_price == 0:
        return float("inf")
    return abs(oracle_price - ref_price) / ref_price

# --- PATH A detector ---
def path_a_oracle_deviation(
    protocol_address: str,
    current_block: int,
    params: T9001Params,
    oracle_provider: OracleFeedProvider,
    ref_provider: ReferencePriceProvider,
    protocol_index: OracleProtocolIndex,
) -> list[OracleDeviationAlert]:
    """PATH A — oracle vs reference deviation, sustained."""
    alerts: list[OracleDeviationAlert] = []
    
    oracles = protocol_index.get_consumed_oracles(protocol_address)
    
    for oracle_address, asset in oracles:
        # Check sustained deviation across min_blocks
        sustained = all(
            dev(oracle_address, current_block - i, asset,
                ref_provider, oracle_provider, params.reference_venues)
            > params.deviation_threshold
            for i in range(params.min_blocks)
        )
        
        if sustained:
            current_deviation = dev(
                oracle_address, current_block, asset,
                ref_provider, oracle_provider, params.reference_venues,
            )
            alerts.append(OracleDeviationAlert(
                severity="high",
                oracle_address=oracle_address,
                asset=asset,
                deviation=current_deviation,
                reference_sources=params.reference_venues,
            ))
    
    return alerts
```

**LLM output (TypeScript):**
```typescript
// --- Parameters ---
interface T9001Params {
  deviationThreshold: number;   // default: 0.02
  minBlocks: number;            // default: 1
  referenceVenues: string[];    // default: ["cex_mid", "multi_venue_twap_30m"]
}

// --- Provider interfaces ---
interface OracleFeedProvider {
  getPrice(oracleAddress: string, block: number): Promise<number>;
  getOraclesForProtocol(protocolAddress: string): Promise<string[]>;
}

interface ReferencePriceProvider {
  referencePrice(asset: string, block: number, venues: string[]): Promise<number>;
}

// --- Alert type ---
interface OracleDeviationAlert {
  oakTechnique: "OAK-T9.001";
  detectionPath: "PATH_A";
  severity: "critical" | "high" | "medium" | "low";
  chain: string;
  oracleAddress: string;
  asset: string;
  deviation: number;
  referenceSources: string[];
}

// --- Helper ---
async function dev(
  oracleAddress: string, block: number, asset: string,
  oracleP: OracleFeedProvider, refP: ReferencePriceProvider,
  venues: string[],
): Promise<number> {
  const oraclePrice = await oracleP.getPrice(oracleAddress, block);
  const refPrice = await refP.referencePrice(asset, block, venues);
  if (refPrice === 0) return Infinity;
  return Math.abs(oraclePrice - refPrice) / refPrice;
}

// --- PATH A detector ---
async function pathAOracleDeviation(
  protocolAddress: string, currentBlock: number,
  params: T9001Params,
  oracleP: OracleFeedProvider, refP: ReferencePriceProvider,
  protocolIndex: { getConsumedOracles(addr: string): Promise<[string, string][]> },
): Promise<OracleDeviationAlert[]> {
  const alerts: OracleDeviationAlert[] = [];
  const oracles = await protocolIndex.getConsumedOracles(protocolAddress);

  for (const [oracleAddress, asset] of oracles) {
    const deviations = await Promise.all(
      Array.from({ length: params.minBlocks }, (_, i) =>
        dev(oracleAddress, currentBlock - i, asset, oracleP, refP, params.referenceVenues))
    );
    const sustained = deviations.every(d => d > params.deviationThreshold);

    if (sustained) {
      alerts.push({
        oakTechnique: "OAK-T9.001",
        detectionPath: "PATH_A",
        severity: "high",
        chain: "",
        oracleAddress,
        asset,
        deviation: deviations[0],
        referenceSources: params.referenceVenues,
      });
    }
  }
  return alerts;
}
```

### 15.10 Translation quality checklist

Before accepting an LLM-generated translation, verify:

- [ ] **All PATHs present.** PATH_A through PATH_E each have a corresponding function/method.
- [ ] **Helper functions translated.** Every `func_name(...) := ...` appears as a private function.
- [ ] **Parameters externalized.** All spec parameters are configurable, not hardcoded.
- [ ] **Data sources abstracted.** Every data source is behind an interface (not a concrete import).
- [ ] **emit() → alert objects.** Every emit call produces a typed alert, not a print statement.
- [ ] **Guidance strings format-correct.** String interpolation uses the target language's native formatting.
- [ ] **Set operations correct.** `∩`/`∪`/`−`/`∈`/`∉` map to the correct target-language equivalents.
- [ ] **Null safety.** `∅` and `null` checks are present; `?.` optional chaining is preserved.
- [ ] **Type annotations present.** All function signatures have type annotations.
- [ ] **Test stubs generated.** Each positive fixture slug has a corresponding test function skeleton.
- [ ] **No pseudocode left untranslated.** Search for `←`, `≠`, `∈`, `for each` — none should remain.

### 15.11 Common LLM failure modes and fixes

| Failure | Symptom | Fix in prompt |
|---------|---------|---------------|
| Treating `emit()` as `print()` | Alerts go to stdout instead of structured pipeline | Add rule: "emit() produces a structured alert object, not console output" |
| Hardcoding data-source access | `requests.get("https://api.etherscan.io/...")` | Add rule: "Every data source must be behind an interface/protocol. The concrete provider is wired separately." |
| Skipping `where` clause filter | `for x in coll: ...` without filter | Add rule: "`for each x in coll where cond:` is `for x in coll: if not cond: continue`" |
| Translating `∅` to `None` | `∅` becomes `None` instead of empty collection | Add mapping: `∅` in set context = empty set/array, not null |
| Inlining parameters | Magic numbers in code | Add rule: "Parameters become constructor args or config fields with spec defaults" |
| Ignoring `?.` (optional chaining) | `obj.field` instead of `obj?.field` | Add mapping: `?.` must be preserved for null safety |
| Guidance interpolation: format specifiers | `{divergence:.2%}` becomes `{divergence}` | Add rule: "Preserve format specifiers using the target language's equivalent" |

---

## Appendix B: Unicode operator reference

| Glyph | Unicode | Name | Keybinding suggestion |
|-------|---------|------|----------------------|
| `←` | U+2190 | LEFTWARDS ARROW | `<-` (digraph) |
| `≠` | U+2260 | NOT EQUAL TO | `!=` (digraph) |
| `≤` | U+2264 | LESS-THAN OR EQUAL TO | `<=` (digraph) |
| `≥` | U+2265 | GREATER-THAN OR EQUAL TO | `>=` (digraph) |
| `∈` | U+2208 | ELEMENT OF | `in` (digraph) |
| `∉` | U+2209 | NOT AN ELEMENT OF | `!in` (digraph) |
| `∩` | U+2229 | INTERSECTION | `&` (digraph) |
| `∪` | U+222A | UNION | `\|` (digraph) |
| `∅` | U+2205 | EMPTY SET | `{}` (digraph) |
| `−` | U+2212 | MINUS SIGN | `-` (digraph) |
| `×` | U+00D7 | MULTIPLICATION SIGN | `*` (digraph) |
| `→` | U+2192 | RIGHTWARDS ARROW | `->` (digraph) |
