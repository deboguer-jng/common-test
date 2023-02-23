import request, { gql } from "graphql-request";

const getSwapTransactions = async (skip = 0) => {
  const query = gql`
    query swaps {
      swaps(first:50, skip: ${skip}, orderBy: timestamp, orderDirection: desc) {
        sender
        amount0
        amount1
        amountUSD
        timestamp
        token0 {
          symbol
        }
        token1 {
          symbol
        }
      }
    }
  `;
  const { swaps } = await request(
    "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
    query
  );
  return swaps;
};

export default getSwapTransactions;
