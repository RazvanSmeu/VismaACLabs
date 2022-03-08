package com.doubletex.app.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Alexandru Enache
 * @date 07.03.2022
 */

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class DoubletexNotFound extends RuntimeException {

    public DoubletexNotFound() {
        super();
    }

    public DoubletexNotFound(String message) {
        super(message);
    }
}
