import {Employee} from "../../types/Employee";
import faker from "faker";
import {EmployeeListFilters, EmployeeListPage} from "./EmployeeListPage";
import {createAdvancedBookControls, useMockDataBook} from "../../utils/DataBook";
import { Filter } from "../../utils/Filter";

export default {
    title: 'DoubleTex/EmployeeList',
}

export const TEST_EMPLOYEE_DATA: Employee[] = Array.from(Array(500).keys()).map(() => ({
    id: faker.datatype.number(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    jobTitle: faker.name.jobTitle(),
    birthdate: faker.date.past(),
    monthlySalary: faker.datatype.number(5000),
    monthlyHourQuota: faker.datatype.number(20, 50)
}))

function mockFilterInterpreter(employee: Employee, filter: Filter<EmployeeListFilters>) {
    switch(filter.operation) {
        case "ByName":
            return employee.firstName.includes(filter.parameters[0])
        case "BirthdateBefore":
            return employee.birthdate.valueOf() < new Date(filter.parameters[0]).valueOf()
    }
}
 
 
export function Normal() {
    const employeesBook = createAdvancedBookControls(useMockDataBook<Employee, EmployeeListFilters>(TEST_EMPLOYEE_DATA, mockFilterInterpreter));
    return <EmployeeListPage employeesBook={employeesBook}/>
}