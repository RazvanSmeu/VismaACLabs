package com.doubletex.app.api.repository;

import com.doubletex.app.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * @author Alexandru Enache
 * @date 15.02.2022
 */

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT e FROM Employee e WHERE e.name = :name")
    Employee findByName(@Param("name") String name);

}
