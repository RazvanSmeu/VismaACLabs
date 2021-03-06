package com.doubletex.app.config;

import com.doubletex.app.util.validation.Validation;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ValidationExceptionAdvice {

    @ExceptionHandler(Validation.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Validation handleCustomException(Validation e) {
        e.setStackTrace(new StackTraceElement[0]);
        return e;
    }

}