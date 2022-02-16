import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Employee } from "../../types/Employee";
import { EmployeeRow } from "./EmployeeRow";

export type EmployeeTableProps = {
	employees: Employee[];
}

export function EmployeeTable({
	employees
}: EmployeeTableProps) {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>First Name</TableCell>
						<TableCell>Last Name</TableCell>
						<TableCell>Job</TableCell>
						<TableCell>Salary</TableCell>
						<TableCell>Quota</TableCell>
						<TableCell>Birthdate</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ employees.map((employee) => <EmployeeRow employee={employee} />) }
				</TableBody>
			</Table>
		</TableContainer>
	);
}