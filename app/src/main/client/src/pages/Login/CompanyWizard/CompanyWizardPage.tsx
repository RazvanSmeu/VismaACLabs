import React from 'react'
import { User } from '../../../types/User'
import { Subject } from '../../../utils/Subject'
import { CompanyWizard } from './CompanyWizard'
import { useCompanyWizard } from './useCompanyWizard'

export function CompanyWizardPage() {
  return (
    <div className='login-page__backdrop'>
      <CompanyWizard {...useCompanyWizard()} />
    </div>
  )
}
