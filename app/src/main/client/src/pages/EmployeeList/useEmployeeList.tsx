import { EmployeeListFilterOperation, EmployeeListPageProps } from './EmployeeListPage'
import { Employee, EMPLOYEE_SEARCH } from '../../types/Employee'
import { useDataBook } from '../../utils/useDataBook'
import * as faker from 'faker'
import { Filter } from '../../utils/Filter'
import { InMemoryScribe, NetworkScribe } from '../../utils/Scribe'
import { evolveBookControls } from '../../utils/DataBook'

export const TEST_EMPLOYEE_DATA: Employee[] = Array.from(Array(500).keys()).map(() => ({
  id: faker.datatype.number(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  jobTitle: faker.name.jobTitle().split(' ')[2],
  birthdate: faker.date.past(70).toISOString().split('T')[0],
  monthlySalary: faker.datatype.number(20) * 250 + 1000,
  monthlyHourQuota: faker.datatype.number(10) * 4 + 20,
  phoneNumber: faker.phone.phoneNumberFormat(1),
  email: faker.internet.email()
}))

function mockFilterInterpreter(employee: Employee, filter: Filter<EmployeeListFilterOperation>) {
  switch (filter.operation) {
    case EmployeeListFilterOperation.ByName:
      return employee.firstName.includes(filter.parameters[0])
    case EmployeeListFilterOperation.BirthdateBefore:
      return new Date(employee.birthdate).valueOf() < new Date(filter.parameters[0]).valueOf()
  }
}

export function useEmployeeList(): EmployeeListPageProps {
  const scribe = NetworkScribe<Employee, EmployeeListFilterOperation>(EMPLOYEE_SEARCH)
  const dataBook = useDataBook(scribe, 2)
  return {
    employeesBook: evolveBookControls(dataBook)
  }
}

export function useEmployeeListMock(): EmployeeListPageProps {
  const employeesBook = useDataBook<Employee, EmployeeListFilterOperation>(
    InMemoryScribe(TEST_EMPLOYEE_DATA, mockFilterInterpreter)
  )
  return {
    employeesBook
  }
}
