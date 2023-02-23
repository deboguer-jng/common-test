import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createContext, useEffect, useState } from "react";
import "./App.css";
import Main from "./pages/Main";
import { getETHUSDPrice } from "./subgraph";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const Context = createContext({});

function ETHPriceWrapper({ children }) {
  const [ethPrice, setEthPrice] = useState(0);

  const fetchEthUsdPrice = async () => {
    const bundles = await getETHUSDPrice();
    setEthPrice(parseFloat(bundles[0].ethPriceUSD).toFixed(2));
  };

  useEffect(() => {
    fetchEthUsdPrice();
  }, []);

  return <Context.Provider value={{ ethPrice }}>{children}</Context.Provider>;
}

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <ETHPriceWrapper>
        <CssBaseline />
        <Container maxWidth="lg">
          <Main />
        </Container>
      </ETHPriceWrapper>
    </ThemeProvider>
  );
}

export default App;
