import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createTheme, ThemeProvider} from "@mui/material";
import {purple} from "@mui/material/colors";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme({
        palette: {
            primary: {
                main: purple[700]
            }
        },
        typography: {
            fontFamily: [
                'Comfortaa'
            ].join(","),
            fontWeightBold: 900,
            fontSize: 16
        }
    })}>
        <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
