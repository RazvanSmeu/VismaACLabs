package com.doubletex.app.service.employee;

import com.doubletex.app.model.Employee;
import com.doubletex.app.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Alexandru Enache
 * @date 15.02.2022
 */

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee getById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    @Override
    public Boolean delete(Long id) {
        employeeRepository.deleteById(id);
        return Boolean.TRUE;
    }

    @Override
    public Employee create(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee update(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> findAll(int limit) {
        return employeeRepository.findAll(PageRequest.of(0, limit)).toList();
    }
}
