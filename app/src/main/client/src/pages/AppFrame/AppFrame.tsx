import React from 'react'
import { CssBaseline } from '@mui/material'
import { Route } from 'react-router-dom'
import { EmployeeListPageRoute } from '../EmployeeList/EmployeeListPage'
import { DoubleTexAppBar } from '../../components/DoubleTexAppBar/DoubleTexAppBar'
import { DoubleTextContentPane } from '../../components/DoubleTexContentPane/DoubleTexContentPane'
import { AddProductPage } from '../AddProduct/AddProduct'
import { EmployeeDetailsPageRoute } from '../EmployeeDetails/EmployeeDetailsPage'

export default function AppFrame() {
  return (
    <div className='App'>
      <CssBaseline enableColorScheme={false} />
      <DoubleTexAppBar />
      <DoubleTextContentPane>
        <Route path='/employee' element={<EmployeeDetailsPageRoute />} />
        <Route path='/employees' element={<EmployeeListPageRoute />} />
        {/*<Route path='/account' element={<EmployeeDetailsPage />} />*/}
        <Route path='/addProduct' element={<AddProductPage />} />
      </DoubleTextContentPane>
    </div>
  )
}
