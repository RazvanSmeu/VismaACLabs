import React from 'react'
import { CssBaseline } from '@mui/material'
import { Route } from 'react-router-dom'
import { EmployeeDetailsPage } from '../EmployeeDetails/EmployeeDetailsPage'
import { EmployeeListPageRoute } from '../EmployeeList/EmployeeListPage'
import { DoubleTexAppBar } from '../../components/DoubleTexAppBar/DoubleTexAppBar'
import { DoubleTextContentPane } from '../../components/DoubleTexContentPane/DoubleTexContentPane'

export default function AppFrame() {
  return (
    <div className='App'>
      <CssBaseline enableColorScheme={false} />
      <DoubleTexAppBar />
      <DoubleTextContentPane>
        <Route path='/employees' element={<EmployeeListPageRoute />} />
        <Route path='/account' element={<EmployeeDetailsPage />} />
      </DoubleTextContentPane>
    </div>
  )
}
