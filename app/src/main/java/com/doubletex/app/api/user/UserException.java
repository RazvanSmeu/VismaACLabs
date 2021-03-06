package com.doubletex.app.api.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class UserException extends RuntimeException {
    public UserException(String message) {
        super(message);
    }
}
