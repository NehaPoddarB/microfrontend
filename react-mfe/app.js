import React from 'react'
import ReactDOM from 'react-dom'
import Employee from './employee/Employee';
import ProductList from './ProductList';
import Studio from './studio/Studio';
import { Box } from '@mui/material';

class ReactMfe extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(
      <Box sx={{ display: 'flex', paddingTop: 8 }}>
        <Box sx={{ width: "50%", margin: 3 }}>
          <Studio />
        </Box>
        <Box sx={{ width: "50%", margin: 3 }}>
          <Employee />
        </Box>
      </Box>, this);
  }
}

customElements.define('react-element', ReactMfe);