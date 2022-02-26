package com.doubletex.app.api.user;

import com.doubletex.app.api.employee.Employee;
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

    public User login(String userName, String password) {
        validateUserName(userName);
        validatePassword(password);
        Optional<User> potentialUser = userRepository.findByUserName(userName);
        if(potentialUser.isEmpty()) {
            throw new SecurityException("User name could not be found.");
        } else if(!potentialUser.get().getPasswordHash().equals(password)) {
            throw new SecurityException("Password is invalid.");
        } else {
            User user = potentialUser.get();
            user.setLatestToken(generateToken());
            userRepository.save(user);
            return user;
        }

    }

    public User resume(String userToken) {
        Optional<User> userOptional = userRepository.findByLatestToken(userToken);
        if(userOptional.isPresent()) {
            return userOptional.get();
        } else {
            throw new SecurityException("User token was invalid. Try logging in again.");
        }
    }

    public String generateToken() {
        return UUID.randomUUID().toString();
    }

    public User register(String userName, String password) {
        validateUserName(userName);
        validatePassword(password);
        Optional<User> optionalUser = userRepository.findByUserName(userName);
        if(optionalUser.isPresent()) {
            throw new SecurityException("User already exists.");
        } else {
            User newUser = new User();
            Employee employee = new Employee();
            newUser.setUserName(userName);
            newUser.setPasswordHash(password);
            newUser.setSalt(generateToken());
            newUser.setLatestToken(generateToken());
            newUser.setEmployee(employee);
            userRepository.save(newUser);
            return newUser;
        }
    }

    public void validateUserName(String userName) {
        if(userName.length() > 16) {
            throw new IllegalArgumentException("User name cannot be longer than 16 characters.");
        }
        if(userName.contains(" ")) {
            throw new IllegalArgumentException("User name cannot contain spaces.");
        }
    }

    public void validatePassword(String password) {
        if(password.length() > 16) {
            throw new IllegalArgumentException("Password cannot be longer than 16 characters.");
        }
        if(password.contains(" ")) {
            throw new IllegalArgumentException("Password cannot contain spaces.");
        }
    }
}
