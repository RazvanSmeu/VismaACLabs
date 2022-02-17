import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Employee } from "../../types/Employee";
import { DataGrid } from "@mui/x-data-grid";
import {EmployeeRow} from "./EmployeeRow";
import {EmployeeTableToolbar} from "./EmployeeTableToolbar";
import {DataBook} from "../../utils/DataBook";

export type EmployeeTableProps = {
	employeesBook: DataBook<Employee>;
}

export function EmployeeTable({
	employeesBook
}: EmployeeTableProps) {
	return (
		<TableContainer component={Paper} className={"employeeTable"}>
			<EmployeeTableToolbar employeesBook={employeesBook}/>
			<Table>
				<TableHead>
					<TableRow key="header">
						<TableCell>First Name</TableCell>
						<TableCell>Last Name</TableCell>
						<TableCell>Job</TableCell>
						<TableCell>Salary</TableCell>
						<TableCell>Quota</TableCell>
						<TableCell>Birthdate</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ employeesBook.page.map((employee) => <EmployeeRow employee={employee}/>) }
				</TableBody>
			</Table>
		</TableContainer>
	);
}