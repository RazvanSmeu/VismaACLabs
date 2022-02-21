import { EmployeeListPage} from "./EmployeeListPage";
import { useEmployeeListMock } from "./useEmployeeList";

export default {
    title: 'DoubleTex/EmployeeList',
}
 
export function Normal() {
    return <EmployeeListPage { ...useEmployeeListMock() } />
}