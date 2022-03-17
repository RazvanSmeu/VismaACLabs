package com.doubletex.app.api.user;

import com.doubletex.app.api.user.invite.UserInvite;
import com.doubletex.app.api.user.invite.UserInviteService;
import com.doubletex.app.util.Credentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserAPI {
    private final UserService userService;
    private final UserInviteService userInviteService;

    @Autowired
    public UserAPI(UserService userService, UserInviteService userInviteService) {
        this.userService = userService;
        this.userInviteService = userInviteService;
    }

    @GetMapping("/login")
    @ResponseBody
    public User login(
        @RequestParam String userName,
        @RequestParam String password
    ) {
        return userService.login(userName, password);
    }

    @GetMapping("/resume")
    @ResponseBody
    public User resume(
            @RequestParam String userToken
    ) {
        return userService.resume(userToken);
    }

    @PutMapping("/register")
    @ResponseBody
    public User register(
            @RequestParam String userName,
            @RequestParam String password
    ) {
        return userService.register(userName, password);
    }

    @GetMapping("/freezeToken")
    @ResponseBody
    public User freezeToken(
        @RequestParam String userName,
        @RequestParam String password
    ) {
        return userService.freezeToken(userName, password);
    }

    @GetMapping("/meltToken")
    @ResponseBody
    public User meltToken(
        @RequestParam String userName,
        @RequestParam String password
    ) {
        return userService.meltToken(userName, password);
    }

    @PostMapping("/sendInvite")
    public void sendInvite(
        @RequestParam long userId,
        @RequestParam long employeeId
    ) {
        userInviteService.sendInvite(userId, employeeId);
    }

    @GetMapping(value = "/nextInvite", produces = "application/json")
    @ResponseBody
    public UserInvite.Info nextInvite() {
        return userInviteService.getNextInvite();
    }

    @PostMapping("/acceptInvite")
    public void acceptInvite(@RequestParam long inviteId) {
        userInviteService.acceptInvite(inviteId);
    }
}
