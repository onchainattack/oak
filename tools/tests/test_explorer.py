"""Offline tests for tools/explorer.py logic (no network)."""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
import explorer  # noqa: E402

REAL_USDC = {"address_hash": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", "symbol": "USDC",
             "exchange_rate": "1.0", "holders_count": "4000000"}
FAKE_ETH = {"address_hash": "0x0923a3c1C705cD1Ecda3D5c4E8c91d395d02F4DB", "symbol": "ETH",
            "exchange_rate": None, "holders_count": "0"}


class TokenTrustTest(unittest.TestCase):
    def test_priced_token_is_trusted(self):
        self.assertTrue(explorer.bs_token_trusted(REAL_USDC))

    def test_counterfeit_eth_is_not(self):
        # the fake "ETH" token poisoning bots used against the Binance attacker's wallets
        self.assertFalse(explorer.bs_token_trusted(FAKE_ETH))

    def test_allowlist_overrides(self):
        explorer.TOKEN_ALLOW[FAKE_ETH["address_hash"].lower()] = {"role": "token"}
        try:
            self.assertTrue(explorer.bs_token_trusted(FAKE_ETH))
        finally:
            explorer.TOKEN_ALLOW.clear()


class AggregateTest(unittest.TestCase):
    def test_collapses_same_from_to_asset(self):
        res = {"edges": [
            {"from": "a", "to": "b", "asset": "ETH", "amount": 195460, "tx": "0x2", "time": "2026-10-29T20:38:47Z"},
            {"from": "a", "to": "b", "asset": "ETH", "amount": 2000, "tx": "0x1", "time": "2026-10-30T01:14:11Z"},
            {"from": "a", "to": "c", "asset": "ETH", "amount": 1, "tx": "0x3", "time": "2026-10-30T02:00:00Z"},
        ]}
        out = explorer.aggregate(res)["edges"]
        ab = [e for e in out if e["to"] == "b"][0]
        self.assertEqual(ab["amount"], 197460)
        self.assertEqual(ab["tx_count"], 2)
        self.assertEqual(ab["tx"], "0x2")                  # first in time
        self.assertEqual(ab["time_last"], "2026-10-30T01:14:11Z")
        ac = [e for e in out if e["to"] == "c"][0]
        self.assertNotIn("tx_count", ac)                   # single transfers stay plain

    def test_yaml_roundtrip_passes_check_flow(self):
        import check_flow
        res = {"as_of": "2026-10-30T11:40Z", "nodes": [
            {"id": "a1", "chain": "ethereum", "address": "0x5227f603c1ee34ce3c06efe6477003bdfccb2f8c", "role": "attacker-receiver"},
            {"id": "a2", "chain": "ethereum", "address": "0x8532fa14acaf483729c449b8458aeddb900543d4", "role": "intermediary"}],
            "edges": [{"from": "a1", "to": "a2", "asset": "ETH", "amount": 195460,
                       "tx": "0x551d7961652e6d9835b11988908adf86ebe480badb4ce2d7d52193b2b1b02c76",
                       "time": "2026-10-29T20:38:47.000000Z"}]}
        doc = "**OAK Techniques observed:** x\n\n## Fund flow\n\n```oak-flow\n" + explorer.to_flow_yaml(res) + "\n```\n"
        self.assertEqual(check_flow.check_text("2026-10-x.md", doc), [])


class ChainHelpersTest(unittest.TestCase):
    def test_tron_hex_to_base58(self):
        # USDT (TRC20) contract: TronGrid hex form → T… address
        self.assertEqual(explorer._tron_b58("41a614f803b6fd780986a42c78ec9c7f77e6ded13c"),
                         "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t")

    def test_solana_balance_deltas(self):
        tx = {"meta": {"fee": 5000, "preBalances": [2_000_005_000, 0], "postBalances": [1_000_000_000, 1_000_000_000],
                       "preTokenBalances": [], "postTokenBalances": []},
              "transaction": {"message": {"accountKeys": [{"pubkey": "A"}, {"pubkey": "B"}]}}}
        changes = dict(((o, a), d) for o, a, d in explorer._sol_changes(tx))
        self.assertEqual(changes[("A", "SOL")], -1)   # fee excluded
        self.assertEqual(changes[("B", "SOL")], 1)


if __name__ == "__main__":
    unittest.main()
