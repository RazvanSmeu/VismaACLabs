import { Identifiable } from "./Identifiable";

export type Employee = Identifiable & {
	firstName: string;
	lastName: string;
	birthdate: Date;
	monthlySalary: number;
	monthlyHourQuota: number;
	jobTitle: string;
}