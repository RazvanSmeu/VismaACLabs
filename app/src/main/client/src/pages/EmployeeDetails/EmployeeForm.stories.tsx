import { useDbxFormTest } from '../../components/DataForm/useDbxForm'
import { DbxPanel } from '../../components/DbxPanel'
import { Employee, EMPLOYEE_TEMPLATE } from '../../types/Employee'
import { useSubject } from '../../utils/Subject'
import { EmployeeForm } from './EmployeeForm'

export default {
  title: 'DoubleTex/EmployeeForm',
  decorators: [Decorate]
}

function Decorate(Story: any) {
  return (
    <DbxPanel
      style={{
        maxWidth: 600
      }}>
      <Story />
    </DbxPanel>
  )
}

export function Example() {
  const props = useDbxFormTest(EMPLOYEE_TEMPLATE)
  return <EmployeeForm {...props} />
}
