import { durationFormatter, sizeFormatter } from "human-readable";

const sizeFormat = sizeFormatter({
  std: "JEDEC", // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal}${symbol}`,
});

const durationFormat = durationFormatter({
  // 'y' | 'mo' | 'w' | 'd' | 'h' | 'm' | 's' | 'ms'
  allowMultiples: ["y", "mo", "d", "h", "m", "s"],
  keepNonLeadingZeroes: false, // E.g. '1y 0mo 0d'
  render: (parts) =>
    `${parts.map((part) => `${part.literal}${part.symbol}`).join(" ")} ago`,
});

export const priceFormat = (str, pre) =>
  `${!pre ? "$" : ""}${sizeFormat(Math.abs(parseFloat(str).toFixed(2)))}${
    pre ? ` ${pre}` : ""
  }`;

export const dateFormat = (str) =>
  durationFormat(Date.now() - parseInt(str) * 1000);

export const addressFormat = (address) =>
  `${address.slice(0, 6)}...${address.slice(-3)}`;

export const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

export const priceOffset = (data) => {
  const pricesLength = data.tokenDayData.length;
  if (pricesLength === 0) return 0;
  const offset =
    (parseFloat(data.tokenDayData[pricesLength - 1].priceUSD) /
      parseFloat(data.tokenDayData[0].priceUSD) -
      1) *
    100;
  return offset.toFixed(2);
};
