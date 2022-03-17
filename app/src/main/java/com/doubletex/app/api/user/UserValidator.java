package com.doubletex.app.api.user;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.user.invite.UserInvite;
import com.doubletex.app.util.Credentials;
import com.doubletex.app.util.validation.Check;
import com.doubletex.app.util.validation.Validation;
import com.doubletex.app.util.validation.Validator;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserValidator extends Validator<User> {
    public Validation validateNotLinked(User user, Employee employee) {
        return Validation.checkAll(
            Check.that(
                user.getEmployee() == null,
                "employee",
                "User must not be linked to any employee"
            ),
            Check.that(
                employee.getUser() == null,
                "user",
                "Employee must not be linked to any user"
            )
        );
    }

    public Validation validateCanSend(UserInvite invite) {
        return validateNotLinked(invite.getUser(), invite.getEmployee()).checking(
            Check.that(
                Credentials.getUser().getEmployee().isAdmin(),
                "User",
                "Only managers can send invites"
            )
        );
    }

    public Validation validateCanAccept(UserInvite invite) {
        return validateNotLinked(invite.getUser(), invite.getEmployee()).checking(
          Check.that(
              Objects.equals(Credentials.getUser().getId(), invite.getUser().getId()),
              "user",
              "Cannot accept invite for another user"
          )
        );
    }
}
