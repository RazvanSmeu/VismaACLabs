package com.doubletex.app.api.user;

import com.doubletex.app.api.employee.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> login(String userName, String password) {
        return Optional.empty();
    }

    public Optional<User> login(String userToken) {
        return Optional.empty();
    }

    public String generateToken() {
        return UUID.randomUUID().toString();
    }

    public Optional<User> register(String userName, String password) {
        return Optional.empty();
    }
}
