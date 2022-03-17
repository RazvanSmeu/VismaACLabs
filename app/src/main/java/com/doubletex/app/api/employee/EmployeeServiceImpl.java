package com.doubletex.app.api.employee;

import com.doubletex.app.api.company.Company;
import com.doubletex.app.api.company.CompanyRepository;
import com.doubletex.app.util.Credentials;
import com.doubletex.app.util.PageRequest;
import com.doubletex.app.util.PageResponse;
import com.doubletex.app.util.Filter;
import com.doubletex.app.util.validation.Check;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Alexandru Enache
 */

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final CompanyRepository companyRepository;
    private final EmployeeValidator validator;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository, CompanyRepository companyRepository, EmployeeValidator validator) {
        this.employeeRepository = employeeRepository;
        this.companyRepository = companyRepository;
        this.validator = validator;
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
        validator
                .validate(employee)
                .checking(Check.hasNoId(employee))
                .throwIfNecessary();
        employee.setCompany(Credentials.getEmployee().getCompany());
        Credentials.getEmployee().getCompany().getEmployees().add(employee);
        companyRepository.save(Credentials.getEmployee().getCompany());
        return employeeRepository.save(employee);
    }

    @Override
    public Employee update(Employee employee) {
        validator
                .validate(employee)
                .checking(Check.hasId(employee))
                .throwIfNecessary();
        return employeeRepository.save(employee);
    }


    @Override
    public List<Employee> findAll(int limit) {
        Company company = Credentials.getEmployee().getCompany();
        return employeeRepository.findAll(org.springframework.data.domain.PageRequest.of(0, limit)).toList();
    }

    @Override
    public PageResponse<Employee> dataBookQuery(PageRequest<FilterOperation> request) {
        String name = "";
        for(Filter<EmployeeService.FilterOperation> filter : request.getFilters()) {
            if(filter.getOperation() == FilterOperation.ByName) {
                name = filter.getParameters()[0];
            }
        }
        Page<Employee> page = employeeRepository.search(name, org.springframework.data.domain.PageRequest.of(request.getPageNumber(), request.getPageSize()));

        PageResponse<Employee> response = new PageResponse<>();
        response.setPage(page.getContent());
        response.setPageLimit(page.getTotalPages());

        return response;
    }
}
