import React from 'react';
import './App.css';
import { DoubleTexAppBar } from './components/DoubleTexAppBar';
import { Route } from 'react-router-dom';
import { EmployeeListPage } from './pages/EmployeeList/EmployeeListPage';
import { EmployeeDetailsPage } from './pages/EmployeeDetails/EmployeeDetailsPage';
import {DoubleTextContentPane} from "./components/DoubleTexContentPane";

function App() {
  return (
    <div className="App">
			<DoubleTexAppBar />
			<DoubleTextContentPane>
                <Route path="/employees" element={<EmployeeListPage/>} />
                <Route path="/account" element={<EmployeeDetailsPage/>} />
			</DoubleTextContentPane>
    </div>
  );
}

export default App;
