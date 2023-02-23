import request, { gql } from "graphql-request";

const getETHUSDPrice = async (skip = 0) => {
  const query = gql`
    query bundles {
      bundles(where: { id: 1 }) {
        ethPriceUSD
      }
    }
  `;
  const { bundles } = await request(
    "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
    query
  );
  return bundles;
};

export default getETHUSDPrice;
