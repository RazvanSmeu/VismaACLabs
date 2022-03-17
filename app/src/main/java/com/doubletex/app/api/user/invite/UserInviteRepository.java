package com.doubletex.app.api.user.invite;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserInviteRepository extends JpaRepository<UserInvite, Long> {
    @Query("FROM UserInvite ui WHERE ui.user.id = :userId")
    List<UserInvite> getNextInvitesFor(long userId, Pageable pageable);
}
