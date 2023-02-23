import RefreshIcon from "@mui/icons-material/Refresh";
import {
  IconButton,
  TablePagination,
  Toolbar,
  Typography
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { addressFormat } from "../../utils/formatter";

export default function CommonTable(props) {
  const { headers, rows, loadNextPage, onRefresh } = props;
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    loadNextPage(newPage);
  };

  return (
    <Paper>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <IconButton
          onClick={() => {
            setPage(0);
            onRefresh();
          }}
        >
          <RefreshIcon />
        </IconButton>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell align={header.align} key={header.text}>
                  {header.text}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * 50, page * 50 + 50).map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.keys(row).map((cell, index) => (
                  <TableCell align={index === 0 ? "left" : "right"} key={cell}>
                    {cell === "address" ? (
                      <a
                        href={`https://etherscan.io/address/${row[cell]}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {addressFormat(row[cell])}
                      </a>
                    ) : cell === "offset" ? (
                      <Typography
                        variant="caption"
                        color={row[cell] >= 0 ? "#4caf50" : "error"}
                        display="block"
                        gutterBottom
                      >
                        {row[cell] > 0 ? `+${row[cell]}` : row[cell]}%
                      </Typography>
                    ) : (
                      row[cell]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={rows.length + 50}
        rowsPerPage={50}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={() => {}}
      />
    </Paper>
  );
}
