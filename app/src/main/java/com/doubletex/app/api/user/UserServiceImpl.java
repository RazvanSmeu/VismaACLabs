package com.doubletex.app.api.user;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.employee.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, EmployeeRepository employeeRepository) {
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
    }

    protected User resolveUser(String userName, String password) {
        validateUserName(userName);
        validatePassword(password);
        Optional<User> potentialUser = userRepository.findByUserName(userName);
        if(potentialUser.isEmpty()) {
            throw new UserException("User name could not be found.");
        } else if(!potentialUser.get().getPasswordHash().equals(password)) {
            throw new UserException("Password is invalid.");
        } else {
            return potentialUser.get();
        }
    }

    public User login(String userName, String password) {
        User user = resolveUser(userName, password);
        if(user.isTokenFrozen()) {
            throw new UserException("Cannot login because the user token is frozen. " +
                    "Either melt the token or use the token you have to make API calls.");
        }
        user.setLatestToken(generateToken());
        user.getEmployee().getCompany(); // populate
        userRepository.save(user);
        return user;
    }

    public User resume(String userToken) {
        Optional<User> userOptional = userRepository.findByLatestToken(userToken);
        if(userOptional.isPresent()) {
            return userOptional.get();
        } else {
            throw new UserException("User token was invalid. Try logging in again.");
        }
    }

    public String generateToken() {
        return ("=" + UUID.randomUUID() + UUID.randomUUID() + UUID.randomUUID()).replaceAll("[-]", "");
    }

    public User register(String userName, String password) {
        validateUserName(userName);
        validatePassword(password);
        Optional<User> optionalUser = userRepository.findByUserName(userName);
        if(optionalUser.isPresent()) {
            throw new UserException("User already exists.");
        } else {
            User newUser = new User();
            Employee employee = new Employee();
            newUser.setUserName(userName);
            newUser.setPasswordHash(password);
            newUser.setSalt(generateToken());
            newUser.setLatestToken(generateToken());
            newUser.setEmployee(employee);
            employeeRepository.save(employee);
            userRepository.save(newUser);
            return newUser;
        }
    }

    public void validateUserName(String userName) {
        if(userName.length() > 16) {
            throw new UserException("User name cannot be longer than 16 characters.");
        }
        if(userName.contains(" ")) {
            throw new UserException("User name cannot contain spaces.");
        }
    }

    public void validatePassword(String password) {
        if(password.length() > 16) {
            throw new UserException("Password cannot be longer than 16 characters.");
        }
        if(password.contains(" ")) {
            throw new UserException("Password cannot contain spaces.");
        }
    }

    @Override
    public User freezeToken(String userName, String password) {
        User user = resolveUser(userName, password);
        if(user.isTokenFrozen()) {
            throw new UserException("User token is already frozen.");
        }
        user.setLatestToken(generateToken());
        user.setTokenFrozen(true);
        userRepository.save(user);
        return user;
    }

    @Override
    public User meltToken(String userName, String password) {
        User user = resolveUser(userName, password);
        if(!user.isTokenFrozen()) {
            throw new UserException("User token is not frozen");
        }
        user.setTokenFrozen(false);
        user.setLatestToken(generateToken());
        userRepository.save(user);
        return user;
    }
}
