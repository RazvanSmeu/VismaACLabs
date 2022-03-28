package com.doubletex.app.api.company;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.employee.EmployeeRepository;
import com.doubletex.app.api.user.User;
import com.doubletex.app.api.user.UserRepository;
import com.doubletex.app.util.Credentials;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService{
    private final UserRepository userRepository;
    private final CompanyValidator validator;

    @Override
    public Company create(String name) {
        User user = Credentials.getUser();
        validator.validateHasNoCompany(user).throwIfNecessary();

        // CREATION
        Company company = new Company();
        company.setName(name);

        Employee employee = new Employee();
        employee.setFirstName(user.getUserName());
        employee.setUserName(user.getUserName());
        employee.setAdmin(true);

        // LINKING
        company.getEmployees().add(employee);
        user.setEmployee(employee);
        employee.setCompany(company);
        Credentials.set(new Credentials(user, employee));

        // Cascades and saves company and employee
        user = userRepository.save(user);
        return user.getEmployee().getCompany();
    }
}
