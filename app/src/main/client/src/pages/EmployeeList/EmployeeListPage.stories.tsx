import {Employee} from "../../types/Employee";
import faker from "faker";
import {EmployeeListFilterOperation, EmployeeListPage} from "./EmployeeListPage";
import {useDataBook, useMockDataBook, useMockDataBookHandler} from "../../utils/useDataBook";
import { evolveBookControls } from "../../utils/DataBook";
import { Filter } from "../../utils/Filter";

export default {
    title: 'DoubleTex/EmployeeList',
}

export const TEST_EMPLOYEE_DATA: Employee[] = Array.from(Array(500).keys()).map(() => ({
    id: faker.datatype.number(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    jobTitle: faker.name.jobTitle().split(' ')[2],
    birthdate: faker.date.past(70),
    monthlySalary: faker.datatype.number(20) * 250 + 1000,
    monthlyHourQuota: faker.datatype.number(10) * 4 + 20,
    telephone: faker.phone.phoneNumberFormat(1),
    email: faker.internet.email()
}))

function mockFilterInterpreter(employee: Employee, filter: Filter<EmployeeListFilterOperation>) {
    switch(filter.operation) {
        case EmployeeListFilterOperation.ByName:
            return employee.firstName.includes(filter.parameters[0]);
        case EmployeeListFilterOperation.BirthdateBefore:
            return employee.birthdate.valueOf() < new Date(filter.parameters[0]).valueOf();
    }
}
 
export function Normal() {
    const employeesBook =
        evolveBookControls(
            useDataBook(
                useMockDataBookHandler(TEST_EMPLOYEE_DATA, mockFilterInterpreter)
            )
        );
    return <EmployeeListPage employeesBook={employeesBook}/>
}