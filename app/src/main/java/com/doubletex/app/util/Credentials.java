package com.doubletex.app.util;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.user.User;
import lombok.Value;

@Value
public class Credentials {
    User user;
    Employee employee;

    public static final ThreadLocal<Credentials> INSTANCE = new ThreadLocal<>();

    public static Employee getEmployee() {
        return INSTANCE.get().employee;
    }

    public static User getUser() {
        return INSTANCE.get().user;
    }
}
