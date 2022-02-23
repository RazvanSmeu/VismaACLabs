package com.doubletex.app.api.user;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.employee.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/user")
public class UserAPI {
    private final UserService userService;

    @Autowired
    public UserAPI(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    @ResponseBody
    public Optional<User> login(
        @RequestParam String userName,
        @RequestParam String password
    ) {
        return userService.login(userName, password);
    }

    @PutMapping()
    @ResponseBody
    public Optional<User> register(
            @RequestParam String userName,
            @RequestParam String password
    ) {
        return userService.register(userName, password);
    }
}
