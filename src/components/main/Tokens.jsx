import { useContext, useEffect, useState } from "react";
import { Context } from "../../App";
import { getTokens } from "../../subgraph";
import { priceFormat, priceOffset } from "../../utils/formatter";
import CommonTable from "../common/Table";

export default function Tokens() {
  const { ethPrice } = useContext(Context);
  const [topTokens, setTopTokens] = useState([]);

  const headers = [
    { text: "Token Name", align: "left" },
    {
      text: "Symbol",
      align: "right",
    },
    {
      text: "Price",
      align: "right",
    },
    {
      text: "Price Change",
      align: "right",
    },
    {
      text: "TVL",
      align: "right",
    },
  ];

  const fetchTopTokens = async (offset) => {
    const tokens = await getTokens(offset);
    setTopTokens([
      ...(offset === 0 ? [] : topTokens),
      ...tokens.map((token) => ({
        name: token.name,
        symbol: token.symbol,
        price: priceFormat(token.derivedETH * ethPrice),
        offset: priceOffset(token),
        tvl: priceFormat(token.totalValueLockedUSD),
      })),
    ]);
  };

  const loadNextPage = (pageNumber) => {
    const offset = pageNumber * 50;
    if (offset >= topTokens.length) {
      fetchTopTokens(offset);
    }
  };

  const onRefresh = async () => {
    setTopTokens([]);
    await fetchTopTokens(0);
  };

  useEffect(() => {
    fetchTopTokens(0);
  }, []);

  return (
    <CommonTable
      rows={topTokens}
      onRefresh={onRefresh}
      headers={headers}
      loadNextPage={loadNextPage}
    />
  );
}
