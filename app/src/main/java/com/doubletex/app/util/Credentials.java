package com.doubletex.app.util;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.user.User;
import lombok.Value;

@Value
public class Credentials {
    User user;
    Employee employee;

    private static final ThreadLocal<Credentials> INSTANCE = new ThreadLocal<>();

    public static Employee getEmployee() {
        return get().employee;
    }

    public static User getUser() {
        return get().user;
    }

    public static Credentials get() {
        if(INSTANCE.get() == null) {
            throw new SecurityException("No credentials context was found. This could be due to the lack of authentication.");
        }
        return INSTANCE.get();
    }

    public static void set(Credentials credentials) {
        INSTANCE.set(credentials);
    }
}
