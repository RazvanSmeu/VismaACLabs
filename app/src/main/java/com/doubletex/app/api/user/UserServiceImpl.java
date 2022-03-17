package com.doubletex.app.api.user;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.employee.EmployeeRepository;
import com.doubletex.app.api.user.invite.UserInvite;
import com.doubletex.app.api.user.invite.UserInviteRepository;
import com.doubletex.app.util.validation.Check;
import com.doubletex.app.util.validation.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final UserValidator validator;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, EmployeeRepository employeeRepository, UserValidator validator) {
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
        this.validator = validator;
    }

    protected User resolveUser(String userName, String password) {
        validateUserName(userName).and(validatePassword(password)).throwIfNecessary();
        Optional<User> potentialUser = userRepository.findByUserName(userName);
        if(potentialUser.isEmpty()) {
            throw new Validation("User name could not be found.");
        } else if(!potentialUser.get().getPasswordHash().equals(password)) {
            throw new Validation("Password is invalid.");
        } else {
            return potentialUser.get();
        }
    }

    public User login(String userName, String password) {
        User user = resolveUser(userName, password);
        if(user.isTokenFrozen()) {
            throw new Validation(
                "Cannot login because the user token is frozen. " +
                "Either melt the token or use the token you have to make API calls.",
                new Validation.Field(
                    "lastToken",
                    "Token is frozen"
                )
            );
        }
        user.setLatestToken(generateToken());
        if(user.getEmployee() != null) {
            user.getEmployee().getCompany(); // populate
        }
        return userRepository.save(user);
    }

    public User resume(String userToken) {
        Optional<User> userOptional = userRepository.findByLatestToken(userToken);
        if(userOptional.isPresent()) {
            return userOptional.get();
        } else {
            throw new Validation(
                "User token was invalid. Try logging in again.",
                new Validation.Field(
                    "token",
                    "Invalid for user."
                )
            );
        }
    }

    public String generateToken() {
        return ("=" + UUID.randomUUID() + UUID.randomUUID() + UUID.randomUUID()).replaceAll("[-]", "");
    }

    public User register(String userName, String password) {
        validateUserName(userName).and(validatePassword(password)).throwIfNecessary();
        Optional<User> optionalUser = userRepository.findByUserName(userName);
        if(optionalUser.isPresent()) {
            throw new Validation("User already exists.");
        } else {
            User newUser = new User();
//            Employee employee = new Employee();
            newUser.setUserName(userName);
            newUser.setPasswordHash(password);
            newUser.setSalt(generateToken());
            newUser.setLatestToken(generateToken());
//            newUser.setEmployee(employee);
//            employeeRepository.save(employee);
            return userRepository.save(newUser);
        }
    }

    public Validation validateUserName(String userName) {
        return Validation.checkAll(
            Check.that(
                userName.length() < 16,
                "userName",
                "Cannot be longer thant 16 characters."
            ),
            Check.that(
                !userName.contains(" "),
                "userName",
                "Cannot contain spaces"
            )
        );
    }

    public Validation validatePassword(String password) {
        return Validation.checkAll(
            Check.that(
                password.length() < 16,
                "password",
                "Cannot be longer than 16 characters"
            ),
            Check.that(
                !password.contains(" "),
                "password",
                "Cannot contain spaces."
            )
        );
    }

    @Override
    public User freezeToken(String userName, String password) {
        User user = resolveUser(userName, password);
        if(user.isTokenFrozen()) {
            throw new Validation("User token is already frozen.");
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
            throw new Validation("User token is not frozen");
        }
        user.setTokenFrozen(false);
        user.setLatestToken(generateToken());
        userRepository.save(user);
        return user;
    }
}
