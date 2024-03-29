import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import Studio from "/src/components/studio/Studio"
import Employee from '/src/components/employee/Employee';
import Header from "/src/components/header/Header";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route, Routes } from 'react-router-dom';
// import {defineCustomElements} from "web-button-component/loader"
import {defineCustomElements} from "nash-web-components/loader";

const themeDark = createTheme({ palette: { background: { default: "#fff", }, } });
const App = () => (
  <div>
    <Header />
    <Routes>
      <Route path='/home/company' element={<Studio />} />
      <Route path='/home/company/studio' element={<Studio />} />
      <Route path='/home/company/employee' element={<Employee />} />
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
defineCustomElements(window);
customElements.define('react-element', ReactMfe);