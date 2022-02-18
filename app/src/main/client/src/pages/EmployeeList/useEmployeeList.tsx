import {ByName, EmployeeListFilters, EmployeeListPageProps} from "./EmployeeListPage";
import {useMockDataBook} from "../../utils/DataBook";
import {TEST_EMPLOYEE_DATA} from "./EmployeeListPage.stories";
import {Employee} from "../../types/Employee";

export function useEmployeeList(): EmployeeListPageProps {
    return {} as any;
}

export function useEmployeeListMock(): EmployeeListPageProps {
    const employeesBook = useMockDataBook<Employee, EmployeeListFilters>(TEST_EMPLOYEE_DATA, (ts) => true, 12);
    return {
        employeesBook
    }
}