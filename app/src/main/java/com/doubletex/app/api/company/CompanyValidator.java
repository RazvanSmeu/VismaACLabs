package com.doubletex.app.api.company;

import com.doubletex.app.api.user.User;
import com.doubletex.app.util.validation.Check;
import com.doubletex.app.util.validation.Validation;
import com.doubletex.app.util.validation.Validator;
import org.springframework.stereotype.Service;

@Service
public class CompanyValidator extends Validator<Company> {
    public Validation validateHasNoCompany(User user) {
        return Validation.checkAll(
            Check.that(
                user.getEmployee() == null,
                "user",
                "User is already registered on another company"
            )
        );
    }
}
