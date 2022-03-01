import React from 'react';
import './App.css';
import './dbx-globals.css';
import { DoubleTexAppBar } from './components/DoubleTexAppBar';
import { Route } from 'react-router-dom';
import {EmployeeListPageRoute} from './pages/EmployeeList/EmployeeListPage';
import { EmployeeDetailsPage } from './pages/EmployeeDetails/EmployeeDetailsPage';
import {DoubleTextContentPane} from "./components/DoubleTexContentPane";
import {CssBaseline} from "@mui/material";
import AppFrame from './pages/AppFrame/AppFrame';

function App() {
  return (
    <AppFrame />
  );
}

export default App;
