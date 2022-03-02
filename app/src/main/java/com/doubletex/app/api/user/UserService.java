package com.doubletex.app.api.user;

import javax.xml.bind.ValidationException;
import java.util.Optional;

public interface UserService {
    User login(String userName, String password);
    User resume(String userToken);
    User register(String userName, String password);
    User freezeToken(String userName, String password);
    User meltToken(String userName, String password);
}
