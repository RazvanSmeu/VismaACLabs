package com.doubletex.app.repository;

import com.doubletex.app.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Alexandru Enache
 * @date 15.02.2022
 */

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    public Employee getEmployeeByName(String name);
}
