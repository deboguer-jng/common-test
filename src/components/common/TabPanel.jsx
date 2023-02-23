import { Box } from "@mui/system";
import React from "react";

export default function TabPanel(props) {
  const { content, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{content}</Box>}
    </div>
  );
}
