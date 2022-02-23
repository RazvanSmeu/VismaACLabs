package com.doubletex.app.api.employee;

import com.doubletex.app.util.PageRequest;
import com.doubletex.app.util.PageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Alexandru Enache
 */

@RestController
@RequestMapping("api/employee")
public class EmployeeAPI {
    private final EmployeeService employeeService;

    @Autowired
    public EmployeeAPI(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Employee get(@PathVariable Long id) {
        return employeeService.getById(id);
    }

    @GetMapping()
    @ResponseBody
    public List<Employee> list(@RequestParam(defaultValue = "300") String limit) {
        return employeeService.findAll(Integer.parseInt(limit));
    }

    @PostMapping()
    @ResponseBody
    public Employee create(@RequestBody Employee employee) {
        return employeeService.create(employee);
    }

    @PutMapping()
    public Employee update(@RequestBody Employee employee) {
        return employeeService.update(employee);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable Long id) {
        return employeeService.delete(id);
    }

    @PostMapping("/dataBookQuery")
    public PageResponse<Employee> search(@RequestBody PageRequest<EmployeeService.FilterOperation> request) {
        return employeeService.dataBookQuery(request);
    }
}
