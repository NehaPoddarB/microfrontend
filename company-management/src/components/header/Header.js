import * as React from 'react';
import { Link } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Header() {
  const [alignment, setAlignment] = React.useState('studio');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <ToggleButtonGroup
        color="error"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{marginTop:6, marginLeft:'2rem'}}
      >
        <ToggleButton value="studio"><Link to="/home/company/studio" style={{ textDecoration: 'none',color:'black' }}>Studio</Link></ToggleButton>
        <ToggleButton value="employee"><Link to="/home/company/employee" style={{ textDecoration: 'none', color:'black' }}>Employee</Link></ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}