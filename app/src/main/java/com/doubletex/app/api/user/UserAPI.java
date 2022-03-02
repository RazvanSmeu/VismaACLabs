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

    @GetMapping("/login")
    @ResponseBody
    public User login(
        @RequestParam String userName,
        @RequestParam String password
    ) {
        return userService.login(userName, password);
    }

    @GetMapping("/resume")
    @ResponseBody
    public User resume(
            @RequestParam String userToken
    ) {
        return userService.resume(userToken);
    }

    @PutMapping("/register")
    @ResponseBody
    public User register(
            @RequestParam String userName,
            @RequestParam String password
    ) {
        return userService.register(userName, password);
    }

    @GetMapping("/freezeToken")
    @ResponseBody
    public User freezeToken(
        @RequestParam String userName,
        @RequestParam String password
    ) {
        return userService.freezeToken(userName, password);
    }

    @GetMapping("/meltToken")
    @ResponseBody
    public User meltToken(
        @RequestParam String userName,
        @RequestParam String password
    ) {
        return userService.meltToken(userName, password);
    }
}
