import { Button } from '@mui/material'
import React from 'react'
import { DbxForm, DbxFormProps } from '../../components/DataForm/DbxForm'
import { DbxDatePicker } from '../../components/Input/DbxDatePicker'
import { DbxInput } from '../../components/Input/DbxInput'
import { Employee } from '../../types/Employee'
import { useSubjectField, Subject } from '../../utils/Subject'
import { validateEmail } from '../../utils/validation/EmailValidation'

export type EmployeeFormProps = DbxFormProps<Employee>

export function EmployeeForm(props: EmployeeFormProps) {
  const firstName = useSubjectField(props.subject, 'firstName')
  const lastName = useSubjectField(props.subject, 'lastName')
  const email = useSubjectField(props.subject, 'email', validateEmail)
  const phoneNumber = useSubjectField(props.subject, 'phoneNumber')
  const birthdate: Subject<string> = useSubjectField(props.subject, 'birthdate')
  const jobTitle = useSubjectField(props.subject, 'jobTitle')
  const monthlySalary = useSubjectField(props.subject, 'monthlySalary')
  const monthlyHourQuota = useSubjectField(props.subject, 'monthlyHourQuota')

  return (
    <DbxForm {...props}>
      <DbxInput label='First Name' subject={firstName} />
      <DbxInput label='Last name' subject={lastName} />
      <DbxInput label='E-mail' subject={email} />
      <DbxInput label='Phone number' subject={phoneNumber} />
      <DbxDatePicker label='Birthdate' subject={birthdate} />
      <DbxInput label='Job Title' subject={jobTitle} />
      <DbxInput label='Salary' type='number' subject={monthlySalary} />
      <DbxInput label='Quota' type='number' subject={monthlyHourQuota} />
    </DbxForm>
  )
}
