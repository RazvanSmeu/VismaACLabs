package com.doubletex.app.api.user.invite;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.employee.EmployeeRepository;
import com.doubletex.app.api.user.User;
import com.doubletex.app.api.user.UserRepository;
import com.doubletex.app.util.Credentials;
import com.doubletex.app.util.validation.Check;
import com.doubletex.app.util.validation.Validation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserInviteServiceImpl implements UserInviteService {
    private final UserRepository userRepository;
    private final UserInviteRepository userInviteRepository;
    private final EmployeeRepository employeeRepository;

    public static Validation validateNotLinked(User user, Employee employee) {
        return Validation.checkAll(
            Check.that(
                user.getEmployee() == null,
                "employee",
                "User must not be linked to any employee"
            )
//            Check.that(
//                employee.getUserName() == null || employee.getUserName().isEmpty(),
//                "user",
//                "Employee must not be linked to any user"
//            )
        );
    }

    public static Validation validateCanSend(UserInvite invite) {
        return validateNotLinked(invite.getUser(), invite.getEmployee()).checking(
            Check.that(
                Credentials.getUser().getEmployee().isAdmin(),
                "User",
                "Only managers can send invites"
            )
        );
    }

    public static Validation validateCanAccept(UserInvite invite) {
        return validateNotLinked(invite.getUser(), invite.getEmployee()).checking(
            Check.that(
                Objects.equals(Credentials.getUser().getId(), invite.getUser().getId()),
                "user",
                "Cannot accept invite for another user"
            )
        );
    }

    @Override
    public void sendInvite(String userName, long employeeId) {
        if(userName.length() == 0) {
            return;
        }
        Optional<User> user = userRepository.findByUserName(userName);
        if(user.isEmpty()) {
            throw new Validation("User name wasn't found.");
        }
        Employee employee = employeeRepository.getById(employeeId);
        UserInvite invite = new UserInvite(user.get(), employee, Credentials.getEmployee());
        validateCanSend(invite).throwIfNecessary();
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
        validateCanAccept(invite).throwIfNecessary();
        user.setEmployee(employee);
        employee.setUserName(user.getUserName());
        user = userRepository.save(user);
//        employeeRepository.save(employee);
        userInviteRepository.delete(invite);
        return user;
    }
}
