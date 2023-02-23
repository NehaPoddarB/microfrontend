import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Box >
      <AppBar position="static" sx={{ backgroundColor: 'black' }} >
        <Toolbar >
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Knoldus NashTech
            </Typography>
            <Link to="/dashboard/react/studio" style={{textDecoration: 'none'}}><Typography sx={{
              color: '#fff', marginLeft: 11, paddingTop: 0.75, ':active': {
                boxShadow: 10,
                color: '#1A73E8'
              }
            }}>Studio</Typography></Link>
            <Link to="/dashboard/react/employee" style={{textDecoration: 'none'}}><Typography sx={{
              color: "#fff", marginLeft: 8, paddingTop: 0.75, ':active': {
                boxShadow: 10,
                color: '#1A73E8'
              }
            }}>Employee</Typography></Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}