import React, { useEffect } from 'react'
import './TableToolbar.css'
import { Box, IconButton, Input } from '@mui/material'
import {
  ArrowLeft,
  ArrowRight,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight
} from '@mui/icons-material'
import { AdvancedBookControls, DataBook } from '../../utils/DataBook'
import { Employee } from '../../types/Employee'
import { EmployeeListFilterOperation } from '../../pages/EmployeeList/EmployeeListPage'
import { Filter, Filtered } from '../../utils/Filter'
import { DbxInput } from '../Input/DbxInput'
import { useSubject } from '../../utils/Subject'

export type TableToolbarProps = {
  book: DataBook<Employee> & AdvancedBookControls & Filtered<EmployeeListFilterOperation>
  children?: React.ReactNode
}

export function TableToolbar({ book, children }: TableToolbarProps) {
  const searchQuery = useSubject('')

  searchQuery.onChange((newValue) => {
    book.putFilter(new Filter('search_bar', EmployeeListFilterOperation.ByName, newValue))
  })

  return (
    <div className='tableToolbar'>
      <DbxInput subject={searchQuery} />
      <Box sx={{ flexGrow: 1 }} />
      <IconButton onClick={() => book.toFirstPage()}>
        <ArrowLeft />
      </IconButton>
      <IconButton onClick={() => book.flipBackwards(10)}>
        <KeyboardDoubleArrowLeft />
      </IconButton>
      <IconButton onClick={() => book.toPreviousPage()}>
        <KeyboardArrowLeft />
      </IconButton>
      <Input
        type='number'
        value={book.pageNumber}
        onChange={(event) => book.setPageNumber(+event.target.value ?? 0)}
        className={'tableToolbar__page-number'}
      />
      <IconButton onClick={() => book.toNextPage()}>
        <KeyboardArrowRight />
      </IconButton>
      <IconButton onClick={() => book.flipForward(10)}>
        <KeyboardDoubleArrowRight />
      </IconButton>
      <IconButton onClick={() => book.toLastPage()}>
        <ArrowRight />
      </IconButton>
      {children !== undefined && (
        <>
          <Box sx={{ flexGrow: 1 }} />
          {children}
        </>
      )}
    </div>
  )
}
