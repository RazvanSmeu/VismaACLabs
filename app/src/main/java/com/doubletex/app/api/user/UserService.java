package com.doubletex.app.api.user;

import java.util.Optional;

public interface UserService {
    Optional<User> login(String userName, String password);
    Optional<User> login(String userToken);
    Optional<User> register(String userName, String password);
}
