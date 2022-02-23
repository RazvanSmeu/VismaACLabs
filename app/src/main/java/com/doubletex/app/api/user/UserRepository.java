package com.doubletex.app.api.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("Select u FROM User u WHERE u.userName = :userName AND u.passwordHash = :password")
    User findByUserNameAndPassword(String userName, String password);

    @Query("Select u FROM User u WHERE u.latestToken = :latestToken")
    User findByLatestToken(String latestToken);
}
