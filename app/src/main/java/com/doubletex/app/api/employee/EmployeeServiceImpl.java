package com.doubletex.app.api.employee;

import com.doubletex.app.api.company.Company;
import com.doubletex.app.api.company.CompanyRepository;
import com.doubletex.app.api.user.User;
import com.doubletex.app.api.user.UserService;
import com.doubletex.app.api.user.invite.UserInviteService;
import com.doubletex.app.util.Credentials;
import com.doubletex.app.util.PageRequest;
import com.doubletex.app.util.PageResponse;
import com.doubletex.app.util.Filter;
import com.doubletex.app.util.validation.Check;
import com.doubletex.app.util.validation.Validation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * @author Alexandru Enache
 */

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final UserService userService;
    private final UserInviteService userInviteService;
    private final CompanyRepository companyRepository;

    @Override
    public Employee getById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    @Override
    public Boolean delete(Long id) {
        employeeRepository.deleteById(id);
        return Boolean.TRUE;
    }

    public Validation validateUserNameExists(Employee employee) {
        if(employee.getUserName().length() == 0) {
            return new Validation("");
        }
        Optional<User> user = userService.findByUserName(employee.getUserName());
        if(user.isEmpty()) {
            return new Validation("", new Validation.Field("user", "Cannot be found"));
        }
        return Validation.checkAll(
            Check.that(
                user.get().getEmployee() == null ||
                        Objects.equals(user.get().getEmployee().getId(), employee.getId()),
                "user",
                "User is already linked to a different employee"
            )
        );
    }

    @Override
    public Employee create(@Valid Employee employee) {
        validateUserNameExists(employee)
            .checking(Check.hasNoId(employee))
            .throwIfNecessary();
        employee.setCompany(Credentials.getEmployee().getCompany());
        Credentials.getEmployee().getCompany().getEmployees().add(employee);
        companyRepository.save(Credentials.getEmployee().getCompany());
        employee = employeeRepository.save(employee);
        userInviteService.sendInvite(employee.getUserName(), employee.getId());
        return employee;
    }

    @Override
    public Employee update(Employee employee) {
        validateUserNameExists(employee)
            .checking(Check.hasId(employee))
            .throwIfNecessary();
        employee = employeeRepository.save(employee);
        userInviteService.sendInvite(employee.getUserName(), employee.getId());
        return employee;
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
        Page<Employee> page = employeeRepository.search(Credentials.getEmployee().getCompany().getId(), name, org.springframework.data.domain.PageRequest.of(request.getPageNumber(), request.getPageSize()));

        PageResponse<Employee> response = new PageResponse<>();
        response.setPage(page.getContent());
        response.setPageLimit(page.getTotalPages());

        return response;
    }
}
