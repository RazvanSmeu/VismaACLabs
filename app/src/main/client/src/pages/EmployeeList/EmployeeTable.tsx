import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import React from 'react'
import { Employee } from '../../types/Employee'
import { EmployeeRow } from './EmployeeRow'
import { DataBook, evolveBookControls } from '../../utils/DataBook'
import { TableToolbar } from '../../components/TableToolbar/TableToolbar'
import { Filtered } from '../../utils/Filter'
import { EmployeeListFilterOperation } from './EmployeeListPage'
import { PlusOne, PlusOneOutlined, PlusOneSharp, PlusOneTwoTone } from '@mui/icons-material'

export type EmployeeTableProps = {
  employeesBook: DataBook<Employee> & Filtered<EmployeeListFilterOperation>
}

export function EmployeeTable({ employeesBook }: EmployeeTableProps) {
  return (
    <TableContainer component={Paper} className={'employeeTable'}>
      <TableToolbar book={evolveBookControls(employeesBook)}>
        <IconButton>
          <PlusOneSharp />
        </IconButton>
      </TableToolbar>
      <Table>
        <TableHead>
          <TableRow key='header'>
            <TableCell width={240}>Name</TableCell>
            <TableCell width={180}>Telephone</TableCell>
            <TableCell width={260}>E-mail</TableCell>
            <TableCell width={240}>Job</TableCell>
            <TableCell width={150}>Salary</TableCell>
            <TableCell width={180}>Quota</TableCell>
            <TableCell width={200}>Birthdate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeesBook.page ? (
            employeesBook.page.map((employee) => (
              <EmployeeRow key={employee.id} employee={employee} />
            ))
          ) : (
            <div>Loading</div>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
