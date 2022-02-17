import {Employee} from "../../types/Employee";
import faker from "faker";
import {EmployeeListFilters, EmployeeListPage} from "./EmployeeListPage";
import {createAdvancedBookControls, Filter, useMockDataBook} from "../../utils/DataBook";

export default {
    title: 'DoubleTex/EmployeeList',
}

export const TEST_EMPLOYEE_DATA: Employee[] = Array.from(Array(500).keys()).map(() => ({
    id: faker.datatype.number(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    jobTitle: faker.name.jobTitle(),
    birthdate: faker.date.past(),
    monthlySalary: faker.datatype.number(),
    monthlyHourQuota: faker.datatype.number()
}))

function mockFilterInterpreter(employees: Employee[], filter: EmployeeListFilters) {
    switch(filter.operation) {
        case "ByName":
            return employees.filter((emp) => emp.firstName.includes(filter.parameters[0]))
        case "BirthdateBefore":
            return employees.filter((emp) => emp.birthdate.valueOf() < new Date(filter.parameters[0]).valueOf())
    }
}

export function Normal() {
    const employeesBook = createAdvancedBookControls(useMockDataBook<Employee, EmployeeListFilters>(TEST_EMPLOYEE_DATA, mockFilterInterpreter));
    return <EmployeeListPage employeesBook={employeesBook}/>
}