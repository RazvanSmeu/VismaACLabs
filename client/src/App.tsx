import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DoubleTexAppBar } from './components/DoubleTexAppBar';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/system';
import { green, purple } from '@mui/material/colors';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { EmployeeListPage } from './pages/EmployeeList/EmployeeListPage';
import { EmployeeDetailsPage } from './pages/EmployeeDetails/EmployeeDetailsPage';

function App() {
  return (
    <div className="App">
			<DoubleTexAppBar />
			<BrowserRouter>
					<div>
						<Routes>
							<Route path="/employees">
								{/* <EmployeeListPage /> */}
							</Route>
							<Route path="/inventory">
								{/* <EmployeeListPage /> */}
							</Route>
						</Routes>
					</div>
			</BrowserRouter>
    </div>
  );
}

export default App;
