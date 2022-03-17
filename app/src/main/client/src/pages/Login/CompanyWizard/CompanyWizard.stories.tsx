import { CompanyWizard } from './CompanyWizard'
import { useTestCompanyWizard } from './useCompanyWizard'

export default {
  title: 'DoubleTex/Company Wizard'
}

export function WithInvite() {
  return <CompanyWizard {...useTestCompanyWizard(true)} />
}

export function WithoutInvite() {
  return <CompanyWizard {...useTestCompanyWizard(false)} />
}
