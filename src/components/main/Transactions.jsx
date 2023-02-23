import { useEffect, useState } from "react";
import { getSwapTransactions } from "../../subgraph";
import { dateFormat, priceFormat } from "../../utils/formatter";
import CommonTable from "../common/Table";

export default function Transactions() {
  const headers = [
    { text: "Total Value", align: "left" },
    {
      text: "Total Amount 1",
      align: "right",
    },
    {
      text: "Total Amount 2",
      align: "right",
    },
    {
      text: "Account",
      align: "right",
    },
    {
      text: "Time",
      align: "right",
    },
  ];

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async (offset) => {
    const txs = await getSwapTransactions(offset);
    setTransactions([
      ...(offset === 0 ? [] : transactions),
      ...txs.map((tx) => ({
        totalValue: priceFormat(tx.amountUSD),
        amount0: priceFormat(tx.amount0, tx.token0.symbol.toUpperCase()),
        amount1: priceFormat(tx.amount1, tx.token1.symbol.toUpperCase()),
        address: tx.sender,
        time: dateFormat(tx.timestamp),
      })),
    ]);
  };

  const loadNextPage = (pageNumber) => {
    const offset = pageNumber * 50;
    if (offset >= transactions.length) {
      fetchTransactions(offset);
    }
  };

  const onRefresh = async () => {
    setTransactions([]);
    await fetchTransactions(0);
  };

  useEffect(() => {
    fetchTransactions(0);
  }, []);

  return (
    <CommonTable
      rows={transactions}
      headers={headers}
      onRefresh={onRefresh}
      loadNextPage={loadNextPage}
    />
  );
}
