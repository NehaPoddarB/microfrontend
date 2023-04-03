import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Typography, Container } from '@mui/material';
import { useTheme, useMediaQuery } from '@material-ui/core';
import TableCards from '../TableCard/Tablecards';
// import WebButton from 'button/Button-web-component';
import '../../../../library/indexOne';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';


export default function StickyTable({ columns, rows, label, tableName, handleOpenAdd }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [noDataText, setNoDataText] = React.useState(false);
  const theme = useTheme();
  const showText = useMediaQuery(theme.breakpoints.up('md'));

  React.useEffect(()=>{
    if(rows.length === 0){
      setNoDataText(true)
    }
  },[rows])
  return (
    <>
      <Box sx={{
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 2,
        borderRadius: "1rem",
        position: 'relative',
        marginLeft: '2rem',
        marginRight: '2rem',
        marginTop: "2rem"
      }}>
        <Typography variant="h2" sx={{
          fontWeight: "bold",
          color: 'rgb(255, 86, 80)',
          marginTop: 2.5,
          fontSize: "1.75rem",
          lineHeight: 1.625,
          fontFamily: "Roboto,Helvetica,Arial,sans-serif"
        }}>
          {label}
        </Typography>
        {/* <WebButton onClick={
            handleOpenAdd
          }/> */}
        <web-button-element onClick={
          handleOpenAdd} >+ {"Add"} {tableName}</web-button-element>
        {/* <Button
          variant='contained'
          color='info'
          size='medium'
          onClick={
            handleOpenAdd
          }
          sx={{
            marginTop: 3, marginBottom: 3, width: '100 %', borderRadius: '0.25rem', height: '3rem', backgroundColor: '#0d6efd'
          }}
        >
          + {"Add"} {tableName}
        </Button> */}
      </Box>
      <Paper sx={{
        color: '#fff', border: " 0 solid rgba(0, 0, 0, 0.125)",
        borderRadius: "0.75rem",
        marginLeft: "2rem",
        marginRight: "2rem",
        marginTop: '-1rem'
      }}>
        <TableContainer sx={{
          width: "max-content",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 4,
          borderRadius: 2,
          width: "100%",
          overflowX: "auto",
        }}>
          {showText ? <Table stickyHeader aria-label="sticky table" sx={{ px: '17px', pt: '17px' }}>
            <TableHead >
              <TableRow sx={{
                "& th": {
                  fontSize: "1rem",
                  fontWeight: '700',
                  border: " 1 solid rgba(0, 0, 0, 0.125)",
                  // color: "#b1acacd1",
                  textTransform: 'uppercase',
                  opacity: 1
                },
              }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontSize: "0.875rem" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {rows.length > 0 &&
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align} sx={{ fontSize: '1rem' }} >
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
            }
          </Table> : (rows.map((row) => (
            <TableCards key={row.code} rows={row} columns={columns} />
          )))}
        </TableContainer>
        {noDataText &&   <Container maxWidth="xs"> <Box sx={{ display: 'flex', marginTop: '1rem' }}>
                 <ErrorRoundedIcon fontSize="medium" color="error" sx={{  marginRight: 1 }} />
                 <Typography
                   variant="h6"
                   fontWeight="400"
                   mb={0.5}
                   color="error"
                   alignItems="left"
                   alignContent="left"
                   sx={{  width: "100%" }}
                 >
                   No {tableName} Found
                 </Typography>
               </Box>
               </Container>}
      </Paper>
    </>
  );
}