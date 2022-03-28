package com.doubletex.app.api.user;

import com.doubletex.app.api.user.invite.UserInvite;
import com.doubletex.app.api.user.invite.UserInviteService;
import com.doubletex.app.util.Credentials;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class UserAPI {
    private final UserService userService;
    private final UserInviteService userInviteService;

    @PutMapping("/login")
    @ResponseBody
    public User login(
        @RequestParam String userName,
        @RequestParam String password
    ) {
        return userService.login(userName, password);
    }

    @PutMapping("/resume")
    @ResponseBody
    public User resume(
            @RequestParam String userToken
    ) {
        return userService.resume(userToken);
    }

    @PostMapping("/register")
    @ResponseBody
    public User register(
            @RequestParam String userName,
            @RequestParam String password
    ) {
        return userService.register(userName, password);
    }

    @PutMapping("/freezeToken")
    @ResponseBody
    public User freezeToken(
        @RequestParam String userName,
        @RequestParam String password
    ) {
        return userService.freezeToken(userName, password);
    }

    @PutMapping("/meltToken")
    @ResponseBody
    public User meltToken(
        @RequestParam String userName,
        @RequestParam String password
    ) {
        return userService.meltToken(userName, password);
    }

    @PostMapping("/sendInvite")
    public void sendInvite(
        @RequestParam String userName,
        @RequestParam long employeeId
    ) {
        userInviteService.sendInvite(userName, employeeId);
    }

    @GetMapping(value = "/nextInvite", produces = "application/json")
    @ResponseBody
    public UserInvite.Info nextInvite() {
        return userInviteService.getNextInvite();
    }

    @PutMapping("/acceptInvite")
    public void acceptInvite(@RequestParam long inviteId) {
        userInviteService.acceptInvite(inviteId);
    }
}
