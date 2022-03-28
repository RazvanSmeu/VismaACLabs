package com.doubletex.app.api.employee;

import com.doubletex.app.util.PageRequest;
import com.doubletex.app.util.PageResponse;
import com.doubletex.app.util.validation.Validation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * @author Alexandru Enache
 */

@RestController
@RequestMapping("api/employee")
@RequiredArgsConstructor
public class EmployeeAPI {
    private final EmployeeService employeeService;

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
    public Employee create(@Valid @RequestBody Employee employee) {
        return employeeService.create(employee);
    }

    @PutMapping()
    public Employee update(@Valid @RequestBody Employee employee) {
        return employeeService.update(employee);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable Long id) {
        throw new Validation(
                "Could not delete.",
                new Validation.Field(
                        "id",
                        "not found"
                )
        );
//        return employeeService.delete(id);
    }

    @PostMapping("/search")
    public PageResponse<Employee> search(@RequestBody PageRequest<EmployeeService.FilterOperation> request) {
        return employeeService.dataBookQuery(request);
    }
}
