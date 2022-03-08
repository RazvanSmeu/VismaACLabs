package com.doubletex.app.util.validation;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.function.BooleanSupplier;

@Getter
@Setter
@AllArgsConstructor
public class Check {
    private String fieldName;
    private String message;
    private boolean isOk;

    public static Check that(
        boolean isOk,
        String fieldName,
        String message
    ) {
        return new Check(fieldName, message, isOk);
    }

    public static Check notNull(Object object, String field) {
        return Check.that(
            object != null,
            field,
            "Must be defined"
        );
    }

    public static Check positive(Number number, String field) {
        return Check.that(
            number.doubleValue() >= 0,
            field,
            "Must be greater than 0"
        );
    }

    public static Check notEmpty(String string, String field) {
        return Check.that(
            !string.isEmpty(),
            field,
            "Cannot be empty"
        );
    }
}