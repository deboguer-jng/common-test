import { useEffect, useState } from "react";
import { getTopPools } from "../../subgraph";
import { priceFormat } from "../../utils/formatter";
import CommonTable from "../common/Table";

export default function TopPools() {
  const headers = [
    { text: "Pool Address", align: "left" },
    {
      text: "Total Volume Locked",
      align: "right",
    },
    {
      text: "24Hr Volume",
      align: "right",
    },
  ];

  const [topPools, setTopPools] = useState([]);

  const fetchTopPools = async (offset) => {
    const pools = await getTopPools(offset);
    setTopPools([
      ...(offset === 0 ? [] : topPools),
      ...pools.map((pool) => ({
        address: pool.id,
        tvl: priceFormat(pool.totalValueLockedUSD),
        "24hr": priceFormat(pool.poolDayData[0].volumeUSD),
      })),
    ]);
  };

  const loadNextPage = (pageNumber) => {
    const offset = pageNumber * 50;
    if (offset >= topPools.length) {
      fetchTopPools(offset);
    }
  };

  const onRefresh = async () => {
    setTopPools([]);
    await fetchTopPools(0);
  };

  useEffect(() => {
    fetchTopPools(0);
  }, []);

  return (
    <CommonTable
      onRefresh={onRefresh}
      rows={topPools}
      headers={headers}
      loadNextPage={loadNextPage}
    />
  );
}
