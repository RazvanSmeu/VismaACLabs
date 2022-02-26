package com.doubletex.app.api.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("Select u FROM User u WHERE u.userName = :userName")
    Optional<User> findByUserName(String userName);

    @Query("Select u FROM User u WHERE u.latestToken = :latestToken")
    Optional<User> findByLatestToken(String latestToken);
}
