import React from 'react';
import {CssBaseline} from "@mui/material";
import { DoubleTexAppBar } from '../../components/DoubleTexAppBar';
import { Route } from 'react-router-dom';
import { DoubleTextContentPane } from '../../components/DoubleTexContentPane';
import { EmployeeDetailsPage } from '../EmployeeDetails/EmployeeDetailsPage';
import { EmployeeListPageRoute } from '../EmployeeList/EmployeeListPage';
import { User } from '../../types/User';

export default function AppFrame() {
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

