import React from 'react';
import './App.css';
import { DoubleTexAppBar } from './components/DoubleTexAppBar';
import { Route } from 'react-router-dom';
import {EmployeeListPageRoute} from './pages/EmployeeList/EmployeeListPage';
import { EmployeeDetailsPage } from './pages/EmployeeDetails/EmployeeDetailsPage';
import {DoubleTextContentPane} from "./components/DoubleTexContentPane";
import {CssBaseline} from "@mui/material";

function App() {
  return (
    <div className="App">
            <CssBaseline enableColorScheme={false}/>
			<DoubleTexAppBar />
			<DoubleTextContentPane>
                <Route path="/employees" element={<EmployeeListPageRoute/>} />
                <Route path="/account" element={<EmployeeDetailsPage/>} />
			</DoubleTextContentPane>
    </div>
  );
}

export default App;
