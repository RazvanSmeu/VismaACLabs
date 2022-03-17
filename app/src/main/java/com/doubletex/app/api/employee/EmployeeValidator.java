package com.doubletex.app.api.employee;

import com.doubletex.app.util.validation.Check;
import com.doubletex.app.util.validation.Validates;
import com.doubletex.app.util.validation.Validation;
import com.doubletex.app.util.validation.Validator;
import org.springframework.stereotype.Service;

@Service
public class EmployeeValidator extends Validator<Employee> {
    @Validates
    public Validation getFirstName(String firstName) {
        return Validation.checkAll(
            Check.notNull(firstName, "firstName")
        );
    }

    @Validates
    public Validation getEmail(String email) {
        return Validation.checkAll(
            Check.that(email.contains("@"), "email", "Must contain '@'")
        ).allowIf(email.isEmpty());
    }
}
