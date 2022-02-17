import React from "react";
import "./EmployeeListPage.css";
import { EmployeeTable } from "./EmployeeTable";
import * as faker from "faker";
import { Employee } from "../../types/Employee";
import {useMockDataBook} from "../../utils/DataBook";

const TEST_EMPLOYEE_DATA: Employee[] = Array.from(Array(50).keys()).map(() => ({
	id: faker.datatype.number(),
	firstName: faker.name.firstName(),
	lastName: faker.name.lastName(),
	jobTitle: faker.name.jobTitle(),
	birthdate: faker.date.past(),
	monthlySalary: faker.datatype.number(),
	monthlyHourQuota: faker.datatype.number()
}))

export function EmployeeListPage() {
	const employeesBook = useMockDataBook(TEST_EMPLOYEE_DATA)
	return (
		<>
			<h2>Employees</h2>
			<EmployeeTable employeesBook={employeesBook}/>
		</>
	);
}