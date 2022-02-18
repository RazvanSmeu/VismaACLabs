import React from "react";
import "./EmployeeListPage.css";
import { EmployeeTable } from "./EmployeeTable";
import { Employee } from "../../types/Employee";
import {DataBook, useMockDataBook} from "../../utils/DataBook";
import {TEST_EMPLOYEE_DATA} from "./EmployeeListPage.stories";
import { Filtered } from "../../utils/Filter";

export type ByName = "ByName"
export type BirthdateBefore = "BirthdateBefore"

export type EmployeeListFilters = ByName | BirthdateBefore

export type EmployeeListPageProps = {
	employeesBook: DataBook<Employee> & Filtered<EmployeeListFilters>
}

export function EmployeeListPage({employeesBook}: EmployeeListPageProps) {
	return (
		<>
			<h2>Employees</h2>
			<EmployeeTable employeesBook={employeesBook}/>
		</>
	);
}

export function EmployeeListPageRoute() {
	const employeesBook = useMockDataBook<Employee, EmployeeListFilters>(TEST_EMPLOYEE_DATA, ts => true, 12)
	return <EmployeeListPage employeesBook={employeesBook}/>;
}