package com.doubletex.app.api.user.invite;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.employee.EmployeeRepository;
import com.doubletex.app.api.user.User;
import com.doubletex.app.api.user.UserRepository;
import com.doubletex.app.api.user.UserValidator;
import com.doubletex.app.util.Credentials;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserInviteServiceImpl implements UserInviteService {
    private final UserRepository userRepository;
    private final UserInviteRepository userInviteRepository;
    private final EmployeeRepository employeeRepository;
    private final UserValidator validator;

    public UserInviteServiceImpl(UserRepository userRepository, UserInviteRepository userInviteRepository, EmployeeRepository employeeRepository, UserValidator validator) {
        this.userRepository = userRepository;
        this.userInviteRepository = userInviteRepository;
        this.employeeRepository = employeeRepository;
        this.validator = validator;
    }

    @Override
    public void sendInvite(long userId, long employeeId) {
        User user = userRepository.getById(userId);
        Employee employee = employeeRepository.getById(employeeId);
        UserInvite invite = new UserInvite(user, employee, Credentials.getEmployee());
        validator.validateCanSend(invite).throwIfNecessary();
        userInviteRepository.save(invite);
    }

    @Override
    public UserInvite.Info getNextInvite() {
        List<UserInvite> list = userInviteRepository.getNextInvitesFor(Credentials.getUser().getId(), PageRequest.of(0, 1));
        return list.size() > 0 ? list.get(0).makeInfo() : null;
    }

    @Override
    public User acceptInvite(long inviteId) {
        UserInvite invite = userInviteRepository.getById(inviteId);
        User user = invite.getUser();
        Employee employee = invite.getEmployee();
        validator.validateCanAccept(invite).throwIfNecessary();
        user.setEmployee(employee);
        employee.setUser(user);
        userRepository.save(user);
        employeeRepository.save(employee);
        userInviteRepository.delete(invite);
        return user;
    }
}
