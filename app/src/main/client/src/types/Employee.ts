import { EmployeeListFilterOperation } from '../pages/EmployeeList/EmployeeListPage'
import { CrudAPI, CrudMethod, Endpoint, ParamLocation } from '../utils/Endpoint'
import { PageRequest, PageResponse } from '../utils/Scribe'
import { Identifiable } from './Identifiable'

export type Employee = Identifiable & {
  firstName: string
  lastName: string
  birthdate: string
  monthlySalary: number
  monthlyHourQuota: number
  jobTitle: string
  email: string
  userName: string
}

export const EMPLOYEE_TEMPLATE = {
  id: 0,
  firstName: '',
  lastName: '',
  birthdate: new Date().toISOString().split('T')[0],
  monthlySalary: 0,
  monthlyHourQuota: 0,
  email: '',
  userName: '',
  jobTitle: ''
}

export const EmployeeAPI: CrudAPI<Employee> = {
  GET: Endpoint(CrudMethod.GET, '/api/employee/{id}', ParamLocation.Id),
  PUT: Endpoint(CrudMethod.PUT, '/api/employee', ParamLocation.InBody),
  POST: Endpoint(CrudMethod.POST, '/api/employee', ParamLocation.InBody),
  DELETE: Endpoint(CrudMethod.DELETE, '/api/employee/{id}', ParamLocation.Id)
}

export const EMPLOYEE_SEARCH = Endpoint<
  PageRequest<EmployeeListFilterOperation>,
  PageResponse<Employee>
>(CrudMethod.POST, '/api/employee/search', ParamLocation.InBody)
