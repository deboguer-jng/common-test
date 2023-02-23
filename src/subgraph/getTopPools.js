import request, { gql } from "graphql-request";

const getTopPools = async (skip = 0) => {
  const query = gql`
    query pools {
      pools(first:50, skip: ${skip} orderBy: totalValueLockedETH, orderDirection:desc, where:{volumeUSD_gt:0}) {
        id
        totalValueLockedUSD
        poolDayData(orderBy:date, first:1, orderDirection:desc){
          volumeUSD
        }
      }
    }
  `;
  const { pools } = await request(
    "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
    query
  );
  return pools;
};

export default getTopPools;
