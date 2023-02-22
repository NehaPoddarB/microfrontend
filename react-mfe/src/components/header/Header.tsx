import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Box >
      <AppBar position="static" sx={{backgroundColor:'black'}} >
        <Toolbar >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Knoldus NashTech
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}