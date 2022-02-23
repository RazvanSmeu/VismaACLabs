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
        return Optional.ofNullable(userRepository.findByUserNameAndPassword(userName, password));
    }

    public Optional<User> login(String userToken) {
        return Optional.empty();
    }

    public String generateToken() {
        return UUID.randomUUID().toString();
    }

    public Optional<User> register(String userName, String password) {
        User optionalUser = userRepository.findByUserNameAndPassword(userName, password);
        if(optionalUser != null) {
            return Optional.empty();
        } else {
            User newUser = new User();
            newUser.setUserName(userName);
            newUser.setPasswordHash(password);
            newUser.setSalt(generateToken());
            newUser.setLatestToken(generateToken());
            userRepository.save(newUser);
            return Optional.of(newUser);
        }
    }
}
