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