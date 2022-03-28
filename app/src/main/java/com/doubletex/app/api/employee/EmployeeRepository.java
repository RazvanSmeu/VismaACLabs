package com.doubletex.app.api.employee;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author Alexandru Enache
 */

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query("SELECT e FROM Employee e" +
            " WHERE e.lastName = :name")
    Employee findByName(@Param("name") String name);

    @Query("SELECT e FROM Employee e " +
            "WHERE e.company.id = :companyId " +
            "AND CONCAT(e.firstName, ' ', e.lastName) like %:name%")
    Page<Employee> search(long companyId, String name, Pageable pageable);
}
