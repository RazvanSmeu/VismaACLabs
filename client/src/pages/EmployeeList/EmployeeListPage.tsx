import React from "react";
import "./EmployeeListPage.css";
import { EmployeeTable } from "./EmployeeTable";
import * as faker from "faker";
import { Employee } from "../../types/Employee";

const TEST_EMPLOYEE_DATA: Employee[] = Array.from(Array(10).keys()).map(() => ({
	id: faker.datatype.number(),
	firstName: faker.name.firstName(),
	lastName: faker.name.lastName(),
	jobTitle: faker.name.jobTitle(),
	birthdate: faker.date.past(),
	monthlySalary: faker.datatype.number(),
	monthlyHourQuota: faker.datatype.number()
}))

export function EmployeeListPage() {
	return (
		<>
			<h2>Employees</h2>
			<EmployeeTable employees={TEST_EMPLOYEE_DATA}/>
		</>
	);
}