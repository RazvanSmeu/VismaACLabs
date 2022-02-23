package com.doubletex.app.filter;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.user.User;
import com.doubletex.app.api.user.UserService;
import com.doubletex.app.util.Credentials;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {
    private final UserService userService;

    @Autowired
    public AuthenticationFilter(UserService userService) {
        this.userService = userService;
    }

    private final static Logger LOG = LoggerFactory.getLogger(com.doubletex.app.filter.DoubletexFilter.class);

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String userToken = request.getHeader("userToken");
        Optional<User> userOptional = userService.login(userToken);
        if(userOptional.isEmpty()) {
//            response.sendError(401, "User token not found or invalid. Please log in again.");
        } else {
            User user = userOptional.get();
            Employee employee = user.getEmployee();
            Credentials credentials = new Credentials(user, employee);
            Credentials.INSTANCE.set(credentials);
        }

        filterChain.doFilter(request, response);
    }
}
