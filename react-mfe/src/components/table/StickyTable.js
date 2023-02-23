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
    <>
      <Box sx={{
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 2, background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
        // margin: "48px",
        borderRadius: "1rem",
        position: 'relative',
        marginLeft: '11rem',
        marginRight: '11rem',
        marginTop:"10rem"
      }}>
        <Typography variant="h4" sx={{
          marginLeft: 4,
          fontWeight: "bold",
          color: '#fff',
          marginTop: 2.5,
          fontSize: "1.75rem",
          lineHeight: 1.625,
          fontFamily: "Roboto,Helvetica,Arial,sans-serif"
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
            marginRight: 4, marginTop: 3, marginBottom: 3, color: "#6c757d", backgroundColor: " #fff", width: '7rem', borderRadius: 2,
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
      <Paper sx={{
        color: '#fff', backgroundColor: "#202940", border: " 0 solid rgba(0, 0, 0, 0.125)",
        borderRadius: "0.75rem", marginTop: '-3%',
        marginLeft: "11rem",
        marginRight: "11rem",
        paddingTop:'1.5rem'
      }}>
        <TableContainer sx={{
          maxHeight: 440,
          width: "max-content",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 4,
          borderRadius: 2,
          width: "100%",
          overflowX: "auto",
          backgroundColor: '#202940'
        }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead sx={{ backgroundColor: '#202940'}}>
              <TableRow sx={{"& th": {
                fontSize: "1rem",
                color: "#b1acacd1",
                backgroundColor: "#202940",
                textTransform:'uppercase',
                opacity:1
              },
              }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontSize: "1.25rem" }}
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
                          <TableCell key={column.id} align={column.align} sx={{color:"#fff"}}>
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
      </Paper>
      </>
    // </Paper>
  );
}