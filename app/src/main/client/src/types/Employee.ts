import {CrudMethod, Endpoint, ParamLocation} from "../utils/Http";
import {Identifiable} from "./Identifiable";

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

export const GET_EMPLOYEE = Endpoint<number, Employee>(
	CrudMethod.GET,
	'/api/employee/{id}',
	ParamLocation.Id
);
export const SET_EMPLOYEE = Endpoint<Employee, void>(
	CrudMethod.PUT,
	'/api/employee',
	ParamLocation.InBody
);