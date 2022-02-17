import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Employee } from "../../types/Employee";
import {EmployeeRow} from "./EmployeeRow";
import {createAdvancedBookControls, FilteredDataBook} from "../../utils/DataBook";
import {TableToolbar} from "../../components/TableToolbar";
import {EmployeeListFilters} from "./EmployeeListPage";

export type EmployeeTableProps = {
	employeesBook: FilteredDataBook<Employee, EmployeeListFilters>;
}

export function EmployeeTable({
	employeesBook
}: EmployeeTableProps) {
	return (
		<TableContainer component={Paper} className={"employeeTable"}>
			<TableToolbar book={createAdvancedBookControls(employeesBook)}/>
			<Table>
				<TableHead>
					<TableRow key="header">
						<TableCell width={200}>First Name</TableCell>
						<TableCell width={200}>Last Name</TableCell>
						<TableCell width={300}>Job</TableCell>
						<TableCell width={150}>Salary</TableCell>
						<TableCell width={150}>Quota</TableCell>
						<TableCell width={200}>Birthdate</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{
						employeesBook.page ?
							(employeesBook.page.map((employee) => <EmployeeRow employee={employee}/>)) :
							<div>Loading</div>
					}
				</TableBody>
			</Table>
		</TableContainer>
	);
}