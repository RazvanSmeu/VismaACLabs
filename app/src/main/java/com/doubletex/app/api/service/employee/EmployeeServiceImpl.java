package com.doubletex.app.api.service.employee;

import com.doubletex.app.model.Employee;
import com.doubletex.app.api.repository.EmployeeRepository;
import com.doubletex.app.util.DataBookRequest;
import com.doubletex.app.util.DataBookResponse;
import com.doubletex.app.util.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.util.ArrayUtils;

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

    @Override
    public DataBookResponse<Employee> dataBookQuery(DataBookRequest<EmployeeService.FilterOperation> request) {
        String name = "";
        for(Filter<EmployeeService.FilterOperation> filter : request.getFilters()) {
            if(filter.getOperation() == FilterOperation.ByName) {
                name = filter.getParameters()[0];
            }
        }
        Page<Employee> page = employeeRepository.search(name, PageRequest.of(request.getPageNumber(), request.getPageSize()));

        DataBookResponse<Employee> response = new DataBookResponse<>();
        response.setPage(page.getContent().toArray(new Employee[0]));
        response.setPageLimit(page.getTotalPages());

        return response;
    }
}
