import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Employee } from "../../types/Employee";

export type EmployeeRowProps = {
	employee: Employee;
}

export function EmployeeRow(props: EmployeeRowProps) {
	return (
		<TableRow key={props.employee.id}>
			<TableCell>{props.employee.firstName}</TableCell>
			<TableCell>{props.employee.lastName}</TableCell>
			<TableCell>{props.employee.jobTitle}</TableCell>
			<TableCell>{props.employee.monthlySalary}$</TableCell>
			<TableCell>{props.employee.monthlyHourQuota}</TableCell>
			<TableCell>{props.employee.birthdate.toDateString()}</TableCell>
		</TableRow>
	);
}