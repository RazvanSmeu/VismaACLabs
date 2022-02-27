import { CrudMethod, Endpoint } from "../utils/Http";
import { Identifiable } from "./Identifiable";

export type Employee = Identifiable & {
	firstName: string;
	lastName: string;
	birthdate: string;
	monthlySalary: number;
	monthlyHourQuota: number;
	jobTitle: string;
	email: string;
	phoneNumber: string;
}

export const GET_EMPLOYEE = new Endpoint<number, Employee>(CrudMethod.GET, '/api/employee/{id}');
export const SET_EMPLOYEE = new Endpoint<Employee, void>(CrudMethod.PUT, '/api/employee');