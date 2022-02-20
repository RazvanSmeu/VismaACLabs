import React from "react";
import "./EmployeeListPage.css";
import { EmployeeTable } from "./EmployeeTable";
import { Employee } from "../../types/Employee";
import {DataBook} from "../../utils/DataBook";
import {TEST_EMPLOYEE_DATA} from "./EmployeeListPage.stories";
import { Filtered } from "../../utils/Filter";
import { useDataBook, useMockDataBook } from "../../utils/useDataBook";


export enum EmployeeListFilterOperation {
	ByName = "ByName",
	BirthdateBefore = "BirthdateBefore"
}

export type EmployeeListPageProps = {
	employeesBook: DataBook<Employee> & Filtered<EmployeeListFilterOperation>
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
	const employeesBook = useDataBook<Employee, EmployeeListFilterOperation>(12, 0, async (req) => {
		return {
			pageLimit: 2,
			page: []
		};
	})
	return <EmployeeListPage employeesBook={employeesBook}/>;
}