import React from "react";
import ReactDOM from "react-dom";
import Studio from "./components/studio/Studio"
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./store/configureStore";
import { Box } from '@mui/material';
import Employee from './components/employee/Employee';
import Header from "./components/header/Header";
// import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';


const store = configureStore();

const App = () => (
  <div>
    <Header />
    <Box sx={{ display: 'flex', paddingTop: 8 }}>
      <Box sx={{ width: "50%", margin: 3 }}>
        <Studio />
      </Box>
      <Box sx={{ width: "50%", margin: 3 }}>
        <Employee />
      </Box>
    </Box>
  </div>
);
ReactDOM.render(
  <ReduxProvider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</ReduxProvider>
, document.getElementById("app"));
