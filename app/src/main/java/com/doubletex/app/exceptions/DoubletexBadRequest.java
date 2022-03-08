package com.doubletex.app.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Alexandru Enache
 * @date 07.03.2022
 */

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class DoubletexBadRequest extends RuntimeException {

    public DoubletexBadRequest() {
        super();
    }

    public DoubletexBadRequest(String message) {
        super(message);
    }
}
