import React from "react";
import "./EmployeeListPage.css";
import { EmployeeTable } from "./EmployeeTable";
import { Employee } from "../../types/Employee";
import {DataBook} from "../../utils/DataBook";
import { Filtered } from "../../utils/Filter";
import { useDataBook } from "../../utils/useDataBook";
import { NetworkScribe } from "../../utils/Scribe";
import { useEmployeeList } from "./useEmployeeList";


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
	return <EmployeeListPage {...useEmployeeList()}/>;
}