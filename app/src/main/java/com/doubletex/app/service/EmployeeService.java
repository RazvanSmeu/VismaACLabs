package com.doubletex.app.service;

import com.doubletex.app.model.Employee;
import com.doubletex.app.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Alexandru Enache
 * @date 15.02.2022
 */

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee getById(Long id) {
        return employeeRepository.getById(id);
    }
}
