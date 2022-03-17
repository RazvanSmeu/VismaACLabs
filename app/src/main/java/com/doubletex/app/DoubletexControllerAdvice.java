package com.doubletex.app;

import com.doubletex.app.exceptions.DoubletexBadRequest;
import com.doubletex.app.util.Validations;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;

/**
 * @author Alexandru Enache
 * @date 07.03.2022
 */

//@ControllerAdvice
public class DoubletexControllerAdvice extends ResponseEntityExceptionHandler {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class ErrorResponse {
        private int httpCode;
        private LocalDateTime time;
        private Map<String, Set<String>> validationMessages;
    }

    @ExceptionHandler(DoubletexBadRequest.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(DoubletexBadRequest doubletexBadRequest, WebRequest webRequest) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST.value(), LocalDateTime.now(), Validations.getValidationMessages());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

}
