import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { Employee } from "../../types/Employee";

export type EmployeeRowProps = {
	employee: Employee;
}

function renderQuota(quota: number): React.ReactNode {
	var render = quota + "h";
	if(quota < 36) {
		return <span style={{ color: "#888" }}>{render} - Part time</span>
	} else if(quota  < 44) {
		return <span style={{ color: "#555" }}>{render} - Full time</span>
	} else {
		return <span style={{ color: "#000" }}>{render} - Overtime</span>
	}
}

export function EmployeeRow(props: EmployeeRowProps) {
	return (
		<TableRow key={props.employee.id}>
			<TableCell>{props.employee.firstName + " " + props.employee.lastName}</TableCell>
			<TableCell>{props.employee.telephone}</TableCell>
			<TableCell>{props.employee.email}</TableCell>
			<TableCell>{props.employee.jobTitle}</TableCell>
			<TableCell>{props.employee.monthlySalary}$</TableCell>
			<TableCell>{renderQuota(props.employee.monthlyHourQuota)}</TableCell>
			<TableCell>{props.employee.birthdate.toISOString().split('T')[0]}</TableCell>
		</TableRow>
	);
}