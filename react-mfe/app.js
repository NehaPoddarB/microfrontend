import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import Studio from "/src/components/studio/Studio"
import Employee from '/src/components/employee/Employee';
import Header from "/src/components/header/Header";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route, Routes } from 'react-router-dom';

const themeDark = createTheme({ palette: { background: { default: "#1a2035", }, } });
const App = () => (
  <div>
    <Header />
    <Routes>
      <Route path='/dashboard/react' element={<Studio />} />
      <Route path='/dashboard/react/studio' element={<Studio />} />
      <Route path='/dashboard/react/employee' element={<Employee />} />
    </Routes>
  </div>);

class ReactMfe extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(
      <MuiThemeProvider theme={themeDark}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>, this);
  }
}

customElements.define('react-element', ReactMfe);