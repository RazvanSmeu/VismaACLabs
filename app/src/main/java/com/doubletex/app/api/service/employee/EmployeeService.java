package com.doubletex.app.api.service.employee;

import com.doubletex.app.model.Employee;
import com.doubletex.app.util.RemoteScribe;

import java.util.List;

/**
 * @author Alexandru Enache
 * @date 15.02.2022
 */

public interface EmployeeService extends RemoteScribe<Employee, EmployeeService.FilterOperation> {
    enum FilterOperation {
        ByName,
        BirthdateBefore
    }

    Employee getById(Long id);
    List<Employee> findAll(int limit);
    Boolean delete(Long id);
    Employee create(Employee employee);
    Employee update(Employee employee);
}
