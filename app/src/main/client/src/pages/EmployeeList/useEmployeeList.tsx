import {EmployeeListFilterOperation, EmployeeListPageProps} from "./EmployeeListPage";
import {TEST_EMPLOYEE_DATA} from "./EmployeeListPage.stories";
import {Employee} from "../../types/Employee";
import { useMockDataBook } from "../../utils/useDataBook";

export function useEmployeeList(): EmployeeListPageProps {
    return {} as any;
}

export function useEmployeeListMock(): EmployeeListPageProps {
    const employeesBook = useMockDataBook<Employee, EmployeeListFilterOperation>(TEST_EMPLOYEE_DATA, (ts) => true, 12);
    return {
        employeesBook
    }
}