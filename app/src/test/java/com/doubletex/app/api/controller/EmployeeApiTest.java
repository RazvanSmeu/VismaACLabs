package com.doubletex.app.api.controller;

import com.doubletex.app.api.service.employee.EmployeeService;
import com.doubletex.app.model.Employee;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

/**
 * @author Alexandru Enache
 * @date 19.02.2022
 */


@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@ComponentScan(value = "")
class EmployeeApiTest {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private MockMvc mvc;

    @BeforeAll
    static void beforeAll() {
    }

    @Test
    void get() throws Exception {
        Employee employeeToAdd = new Employee(1L, "Ceva");
        employeeService.create(employeeToAdd);
        RequestBuilder request = MockMvcRequestBuilders.get("/api/employee/1");
        MvcResult response = mvc.perform(request).andReturn();
        System.out.println(response);
//        assertTrue(response.)
    }
}