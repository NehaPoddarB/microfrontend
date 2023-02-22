import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Container, IconButton, Tooltip, Typography } from '@mui/material';


export default function StickyTable({ columns, rows, label, handleOpenAdd }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{
      width: '100%', overflow: 'hidden', backgroundColor: '#e41a0e', ':hover': {
        boxShadow: 10,
      },
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }}>
        <Typography variant="h4" sx={{
          marginLeft: 4, fontSize: "70px",
          fontWeight: "500",
          color: "#060101",
          borderRight: " 4px solid #000"
        }}>
          {label}
        </Typography>
        <Button
          variant='contained'
          size='medium'
          onClick={
            // setOpenAdd(true);
            handleOpenAdd
          }
          sx={{
            marginRight: 2, marginTop: 1, marginBottom: 3, backgroundColor: " #fff",
            color: "black", ':hover': {
              boxShadow: 10,
              backgroundColor: " #fff"
            },
          }}
        >
          + {"Add"}
        </Button>
        {/* {openAdd && (
            <AddDialog
              handleAddClose={handleAddClose}
              openAdd={openAdd}
              onAddQuestionComplete={(event) => handleCompleteAdd(event)}
            />
          )} */}
      </Box>
      <TableContainer sx={{
        maxHeight: 440, border: "1px solid rgba(128,128,128,0.4)",
        width: "max-content",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 4,
        borderRadius: 2,
        backgroundColor: '#ffff'
      }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,  fontSize: "1.25rem", fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}