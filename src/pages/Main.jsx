import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import TabPanel from "../components/common/TabPanel";
import Tokens from "../components/main/Tokens";
import TopPools from "../components/main/TopPools";
import Transactions from "../components/main/Transactions";
import { a11yProps } from "../utils/formatter";

const Main = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        aria-label="basic tabs example"
      >
        <Tab label="Top Pools" {...a11yProps(0)} />
        <Tab label="Tokens" {...a11yProps(1)} />
        <Tab label="Transactions" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={tab} index={0} content={<TopPools />} />
      <TabPanel value={tab} index={1} content={<Tokens />} />
      <TabPanel value={tab} index={2} content={<Transactions />} />
    </Box>
  );
};

export default Main;
