import React from 'react'
import { useDbxFormByEndpoint } from '../../components/DataForm/useDbxForm'
import { DbxPanel } from '../../components/DbxPanel'
import { Employee, EmployeeAPI, EMPLOYEE_TEMPLATE } from '../../types/Employee'
import { EmployeeForm } from './EmployeeForm'
import './EmployeeDetailsPage.css'

export function EmployeeDetailsPageRoute() {
  const urlParams = new URLSearchParams(window.location.search)
  const idFromParams = urlParams.get('id')
  const id = idFromParams === null ? 0 : +idFromParams
  console.log(id)
  const props = useDbxFormByEndpoint<Employee>(id, EMPLOYEE_TEMPLATE, EmployeeAPI)
  return (
    <>
      <h2>Employee Details</h2>
      <DbxPanel>
        <EmployeeForm {...props} />
      </DbxPanel>
    </>
  )
}
