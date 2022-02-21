package com.doubletex.app.api.service.employee;

import com.doubletex.app.model.Employee;

import java.util.List;

/**
 * @author Alexandru Enache
 * @date 15.02.2022
 */

public interface EmployeeService {
    Employee getById(Long id);
    List<Employee> findAll(int limit);
    Boolean delete(Long id);
    Employee create(Employee employee);
    Employee update(Employee employee);

}
