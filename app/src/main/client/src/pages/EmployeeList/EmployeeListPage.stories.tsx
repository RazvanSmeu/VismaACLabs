import {Employee} from "../../types/Employee";
import faker from "faker";
import {EmployeeListFilters, EmployeeListPage} from "./EmployeeListPage";
import {createAdvancedBookControls, useMockDataBook} from "../../utils/DataBook";

export default {
    title: 'DoubleTex/EmployeeList',
}

export const TEST_EMPLOYEE_DATA: Employee[] = Array.from(Array(500).keys()).map(() => ({
    id: faker.datatype.number(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    jobTitle: faker.name.jobTitle(),
    birthdate: faker.date.past(70),
    monthlySalary: faker.datatype.number(20) * 250 + 1000,
    monthlyHourQuota: faker.datatype.number(10) * 4 + 20,
    telephone: faker.phone.phoneNumberFormat(1),
    email: faker.internet.email()
}))

function mockFilterInterpreter(employee: Employee, filterOps: EmployeeListFilters, params: string[]) {
    switch(filterOps) {
        case "ByName":
            return employee.firstName.includes(params[0])
        case "BirthdateBefore":
            return employee.birthdate.valueOf() < new Date(params[0]).valueOf()
    }
}
 
 
export function Normal() {
    const employeesBook = createAdvancedBookControls(useMockDataBook<Employee, EmployeeListFilters>(TEST_EMPLOYEE_DATA, mockFilterInterpreter));
    return <EmployeeListPage employeesBook={employeesBook}/>
}