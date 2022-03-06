import React from 'react'
import { CssBaseline } from '@mui/material'
import { Route } from 'react-router-dom'
import { EmployeeListPageRoute } from '../EmployeeList/EmployeeListPage'
import { DoubleTexAppBar } from '../../components/DoubleTexAppBar/DoubleTexAppBar'
import { DoubleTextContentPane } from '../../components/DoubleTexContentPane/DoubleTexContentPane'
import { EmployeeDetailsPageRoute } from '../EmployeeDetails/EmployeeDetailsPage'

export default function AppFrame() {
  return (
    <div className='App'>
      <CssBaseline enableColorScheme={false} />
      <DoubleTexAppBar />
      <DoubleTextContentPane>
        <Route path='/employee' element={<EmployeeDetailsPageRoute />} />
        <Route path='/employees' element={<EmployeeListPageRoute />} />
        {/* <Route path='/account' element={<EmployeeDetailsPage />} /> */}
      </DoubleTextContentPane>
    </div>
  )
}
