package com.doubletex.app.api.user.invite;

import com.doubletex.app.api.user.User;

import java.util.List;

public interface UserInviteService {
    void sendInvite(long userId, long employeeId);
    UserInvite.Info getNextInvite();
    User acceptInvite(long inviteId);
}
