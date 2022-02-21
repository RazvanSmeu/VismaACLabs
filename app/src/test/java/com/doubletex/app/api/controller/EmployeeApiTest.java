package com.doubletex.app.api.controller;

import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author Alexandru Enache
 * @date 19.02.2022
 */


@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
class EmployeeApiTest {

//    @Autowired
//    private EmployeeService employeeService;
//
//    @Autowired
//    private MockMvc mvc;
//
//    @BeforeAll
//    static void beforeAll() {
//    }
//
//    @Test
//    void get() throws Exception {
//        Employee employeeToAdd = new Employee(1L, "Ceva");
//        employeeService.create(employeeToAdd);
//        RequestBuilder request = MockMvcRequestBuilders.get("/api/employee/1");
//        MvcResult response = mvc.perform(request).andReturn();
//        System.out.println(response);
////        assertTrue(response.)
//    }
}