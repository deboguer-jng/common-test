import request, { gql } from "graphql-request";

const getTokens = async (skip = 0) => {
  const now = new Date();
  now.setDate(now.getDate() - 7);
  const oneWeekAgo = parseInt(now.getTime() / 1000);
  const query = gql`
    query tokens {
      tokens(first:50, skip: ${skip}, orderBy: totalValueLockedUSD, orderDirection:desc, where: {txCount_gt: 10000}) {
        name
        symbol
        derivedETH
        totalValueLockedUSD
        tokenDayData(where: {date_gt: ${oneWeekAgo}}) {
          priceUSD
        }
      }
    }
  `;
  const { tokens } = await request(
    "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
    query
  );
  return tokens;
};

export default getTokens;
