package com.doubletex.app.filter;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.user.User;
import com.doubletex.app.api.user.UserService;
import com.doubletex.app.util.Credentials;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
@Component
public class AuthenticationFilter extends OncePerRequestFilter {
    private final UserService userService;

    private final Logger logger = LoggerFactory.getLogger(AuthenticationFilter.class);

    @Autowired
    public AuthenticationFilter(UserService userService) {
        this.userService = userService;
    }

    private void setupCredentials(String authToken) {
        try {
            authToken = authToken.substring(7);
            User user = userService.resume(authToken);
            Employee employee = user.getEmployee();
            Credentials credentials = new Credentials(user, employee);
            Credentials.set(credentials);
        } catch(SecurityException | NullPointerException e) {
            // Do nothing
        }
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String requestURI = request.getRequestURI();
        logger.debug(requestURI);
        setupCredentials(request.getHeader("Authorization"));
        filterChain.doFilter(request, response);
    }
}
