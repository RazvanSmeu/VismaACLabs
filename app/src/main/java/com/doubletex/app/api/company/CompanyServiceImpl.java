package com.doubletex.app.api.company;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.employee.EmployeeRepository;
import com.doubletex.app.api.user.User;
import com.doubletex.app.api.user.UserRepository;
import com.doubletex.app.util.Credentials;
import org.springframework.stereotype.Service;

@Service
public class CompanyServiceImpl implements CompanyService{
    private final CompanyRepository companyRepository;
    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final CompanyValidator validator;

    public CompanyServiceImpl(CompanyRepository companyRepository, EmployeeRepository employeeRepository, UserRepository userRepository, CompanyValidator validator) {
        this.companyRepository = companyRepository;
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
        this.validator = validator;
    }

    @Override
    public Company create(String name) {
        User user = Credentials.getUser();
        Employee employee = new Employee();
        employee.setFirstName(user.getUserName());
        Company company = new Company();
        validator.validateHasNoCompany(user).throwIfNecessary();
        company.setName(name);
        employee.setUser(user);
        user.setEmployee(employee);
        employee.setCompany(company);
        employee = employeeRepository.save(employee);
        user = userRepository.save(user);
        Credentials.set(new Credentials(user, employee));
        company.getEmployees().add(employee);
        return companyRepository.save(company);
    }
}
