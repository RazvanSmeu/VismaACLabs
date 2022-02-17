import React from "react";
import "./EmployeeListPage.css";
import { EmployeeTable } from "./EmployeeTable";
import { Employee } from "../../types/Employee";
import {DataBook, Filter, Filtered, useMockDataBook} from "../../utils/DataBook";
import {TEST_EMPLOYEE_DATA} from "./EmployeeListPage.stories";

export type ByName = Filter<"ByName">
export type BirthdateBefore = Filter<"BirthdateBefore">

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
	const employeesBook = useMockDataBook<Employee, EmployeeListFilters>(TEST_EMPLOYEE_DATA, ts => ts)
	return <EmployeeListPage employeesBook={employeesBook}/>;
}